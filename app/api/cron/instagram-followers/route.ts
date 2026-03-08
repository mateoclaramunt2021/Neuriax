import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createClient(url, key);
}

async function sendInstagramDM(recipientId: string, message: string, accessToken: string, igAccountId: string) {
  try {
    const response = await fetch(
      `https://graph.instagram.com/v21.0/${igAccountId}/messages`,
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
    return response.ok;
  } catch {
    return false;
  }
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
      '¡Hola! 👋 Gracias por seguirnos en Instagram!\nSoy el asistente de Neuriax. Si necesitas una web, chatbot o automatización con IA, ¡estoy aquí para ayudarte! 🚀\n\n¿En qué puedo echarte una mano?';

    // Get current followers from Instagram API
    // Note: Instagram Business API doesn't have direct follower list endpoint
    // We use the approach of tracking conversations - when someone messages us for the first time
    // OR we can check recent followers through the Instagram Graph API
    
    // Alternative: Check for new conversations that haven't received a welcome message
    const { data: recentMessages } = await supabase
      .from('instagram_messages')
      .select('sender_id')
      .eq('direction', 'inbound')
      .order('created_at', { ascending: false })
      .limit(100);

    if (!recentMessages || recentMessages.length === 0) {
      return NextResponse.json({ processed: 0, message: 'No new conversations' });
    }

    // Get unique sender IDs
    const uniqueSenders = [...new Set(recentMessages.map(m => m.sender_id))];

    // Check which ones already received a welcome DM
    const { data: alreadyWelcomed } = await supabase
      .from('instagram_followers')
      .select('instagram_user_id')
      .in('instagram_user_id', uniqueSenders)
      .eq('welcome_sent', true);

    const welcomed = new Set(alreadyWelcomed?.map(f => f.instagram_user_id) || []);
    const newUsers = uniqueSenders.filter(id => !welcomed.has(id));

    let sentCount = 0;
    let failedCount = 0;

    for (const userId of newUsers) {
      // Rate limit: max 20 welcome DMs per cron run
      if (sentCount >= 20) break;

      // Check if this user is already in the followers table
      const { data: existing } = await supabase
        .from('instagram_followers')
        .select('id')
        .eq('instagram_user_id', userId)
        .single();

      if (existing) {
        // Already recorded but welcome not sent - send it
        const sent = await sendInstagramDM(userId, welcomeMessage, accessToken, igAccountId);

        if (sent) {
          await supabase
            .from('instagram_followers')
            .update({ welcome_sent: true, welcome_sent_at: new Date().toISOString() })
            .eq('instagram_user_id', userId);

          // Save the welcome message in conversations
          await supabase.from('instagram_messages').insert({
            sender_id: userId,
            direction: 'outbound',
            content: welcomeMessage,
            status: 'sent',
            is_bot: true,
            message_type: 'welcome',
          });

          sentCount++;
        } else {
          failedCount++;
        }
      } else {
        // New user - record and send welcome
        // Get username if possible
        let username = userId;
        try {
          const profileRes = await fetch(
            `https://graph.instagram.com/v21.0/${userId}?fields=name,username&access_token=${accessToken}`
          );
          if (profileRes.ok) {
            const profile = await profileRes.json();
            username = profile.username || profile.name || userId;
          }
        } catch {
          // Username fetch failed, use ID
        }

        await supabase.from('instagram_followers').insert({
          instagram_user_id: userId,
          username: username,
          welcome_sent: false,
        });

        const sent = await sendInstagramDM(userId, welcomeMessage, accessToken, igAccountId);

        if (sent) {
          await supabase
            .from('instagram_followers')
            .update({ welcome_sent: true, welcome_sent_at: new Date().toISOString() })
            .eq('instagram_user_id', userId);

          await supabase.from('instagram_messages').insert({
            sender_id: userId,
            direction: 'outbound',
            content: welcomeMessage,
            status: 'sent',
            is_bot: true,
            message_type: 'welcome',
          });

          sentCount++;
        } else {
          failedCount++;
        }
      }

      // Small delay between sends to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Log the run
    await supabase.from('instagram_token_log').insert({
      action: 'welcome_dm_cron',
      details: JSON.stringify({
        new_users: newUsers.length,
        sent: sentCount,
        failed: failedCount,
        timestamp: new Date().toISOString(),
      }),
    });

    return NextResponse.json({
      success: true,
      new_users_found: newUsers.length,
      welcome_sent: sentCount,
      failed: failedCount,
    });
  } catch (error) {
    console.error('Instagram followers cron error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
