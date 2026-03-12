import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createClient(url, key);
}

async function sendInstagramDM(recipientId: string, message: string, accessToken: string) {
  try {
    const response = await fetch(
      `https://graph.instagram.com/v21.0/me/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          recipient: { id: recipientId },
          message: { text: message },
        }),
      }
    );
    if (!response.ok) {
      const err = await response.json();
      console.error('Welcome DM send error:', err, 'recipientId:', recipientId);
    }
    return response.ok;
  } catch {
    return false;
  }
}

// Fetch all followers from Instagram Graph API with pagination
async function fetchAllFollowers(igAccountId: string, accessToken: string): Promise<Array<{ id: string; username?: string }>> {
  const followers: Array<{ id: string; username?: string }> = [];
  let nextUrl: string | null = `https://graph.instagram.com/v21.0/${igAccountId}/followers?fields=id,username&limit=100&access_token=${accessToken}`;

  while (nextUrl && followers.length < 500) {
    try {
      const res: Response = await fetch(nextUrl);
      if (!res.ok) {
        const errBody = await res.text();
        console.error('Followers API error:', res.status, errBody);
        break;
      }
      const data: { data?: Array<{ id: string; username?: string }>; paging?: { next?: string } } = await res.json();
      for (const f of data.data || []) {
        followers.push({ id: f.id, username: f.username });
      }
      nextUrl = data.paging?.next || null;
    } catch (e) {
      console.error('Followers fetch error:', e);
      break;
    }
  }
  return followers;
}

// GET - Check for new followers and send welcome DM
export async function GET() {
  try {
    const supabase = getSupabase();

    // Get config
    const { data: config } = await supabase
      .from('instagram_config')
      .select('*')
      .single();

    const accessToken = config?.access_token || process.env.INSTAGRAM_ACCESS_TOKEN;
    const igAccountId = config?.instagram_account_id || process.env.INSTAGRAM_ACCOUNT_ID;

    if (!accessToken || !igAccountId) {
      return NextResponse.json({ error: 'Instagram not configured' }, { status: 400 });
    }

    // Check if welcome DM feature is enabled
    const welcomeEnabled = config?.welcome_dm_enabled !== false;
    if (!welcomeEnabled) {
      return NextResponse.json({ skipped: true, reason: 'Welcome DM disabled' });
    }

    const welcomeMessage = config?.welcome_message ||
      'ey! qué tal? 👋 gracias por seguirnos! si alguna vez necesitas una web, chatbot o automatizar algo con IA, estamos por aquí 🚀 a qué te dedicas?';

    // 1. Fetch real followers from Instagram API
    const apiFollowers = await fetchAllFollowers(igAccountId, accessToken);

    if (apiFollowers.length === 0) {
      // API might not be available — log and return
      await supabase.from('instagram_token_log').insert({
        action: 'welcome_dm_cron',
        details: JSON.stringify({ error: 'No followers returned from API', timestamp: new Date().toISOString() }),
      });
      return NextResponse.json({ processed: 0, message: 'No followers from API (check permissions)' });
    }

    // 2. Get all known followers from DB
    const followerIds = apiFollowers.map(f => f.id);
    const { data: knownFollowers } = await supabase
      .from('instagram_followers')
      .select('instagram_user_id, welcome_sent')
      .in('instagram_user_id', followerIds);

    const knownMap = new Map(
      (knownFollowers || []).map(f => [f.instagram_user_id, f.welcome_sent])
    );

    // 3. Find new followers (not in DB) or not yet welcomed
    const toWelcome = apiFollowers.filter(f => {
      const known = knownMap.get(f.id);
      return known === undefined || known === false;
    });

    let sentCount = 0;
    let failedCount = 0;
    let skippedCount = 0;

    for (const follower of toWelcome) {
      // Rate limit: max 15 welcome DMs per cron run
      if (sentCount >= 15) break;

      // Skip if they already have conversations (they're talking with the bot already)
      const { count: existingConvos } = await supabase
        .from('instagram_messages')
        .select('id', { count: 'exact', head: true })
        .eq('sender_id', follower.id);

      if ((existingConvos || 0) > 0) {
        // Already in conversation — mark as welcomed, don't interrupt
        await supabase.from('instagram_followers').upsert({
          instagram_user_id: follower.id,
          username: follower.username || follower.id,
          welcome_sent: true,
          welcome_sent_at: new Date().toISOString(),
        }, { onConflict: 'instagram_user_id' });
        skippedCount++;
        continue;
      }

      // Send welcome DM
      const sent = await sendInstagramDM(follower.id, welcomeMessage, accessToken);

      // Upsert follower record
      await supabase.from('instagram_followers').upsert({
        instagram_user_id: follower.id,
        username: follower.username || follower.id,
        welcome_sent: sent,
        welcome_sent_at: sent ? new Date().toISOString() : null,
        label: 'nuevo',
      }, { onConflict: 'instagram_user_id' });

      if (sent) {
        // Save the welcome message in conversations
        await supabase.from('instagram_messages').insert({
          sender_id: follower.id,
          direction: 'outbound',
          content: welcomeMessage,
          status: 'sent',
          is_bot: true,
          message_type: 'welcome',
        });
        sentCount++;
        console.log(`👋 Welcome DM sent to @${follower.username || follower.id}`);
      } else {
        failedCount++;
      }

      // Delay between sends to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    // Log the run
    await supabase.from('instagram_token_log').insert({
      action: 'welcome_dm_cron',
      details: JSON.stringify({
        api_followers: apiFollowers.length,
        to_welcome: toWelcome.length,
        sent: sentCount,
        failed: failedCount,
        skipped: skippedCount,
        timestamp: new Date().toISOString(),
      }),
    });

    return NextResponse.json({
      success: true,
      api_followers: apiFollowers.length,
      new_followers_found: toWelcome.length,
      welcome_sent: sentCount,
      failed: failedCount,
      skipped_existing_convos: skippedCount,
    });
  } catch (error) {
    console.error('Instagram followers cron error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
