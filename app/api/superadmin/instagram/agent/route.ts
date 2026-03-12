import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  return createClient(url, key);
}

// GET — Agent dashboard data: config, stale chats, logs, metrics
export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const section = request.nextUrl.searchParams.get('section');

    // ─── Agent config (system prompt, toggles, triggers) ───
    const { data: config } = await supabase
      .from('instagram_config')
      .select('bot_enabled, comment_replies_enabled, alerts_enabled, system_prompt, comment_trigger_words, auto_reply_enabled')
      .single();

    const agentConfig = {
      bot_enabled: config?.bot_enabled !== false,
      comment_replies_enabled: config?.comment_replies_enabled !== false,
      alerts_enabled: config?.alerts_enabled !== false,
      system_prompt: config?.system_prompt || '',
      comment_trigger_words: config?.comment_trigger_words || 'ia,info,quiero,precio,interesado,interesada',
    };

    // ─── Stale chats: leads that haven't responded or conversations that died ───
    if (section === 'stale_chats') {
      // Find all conversations with their last message
      const { data: allMessages } = await supabase
        .from('instagram_messages')
        .select('sender_id, direction, content, created_at, is_bot, message_type, sender_name')
        .order('created_at', { ascending: false })
        .limit(5000);

      if (!allMessages || allMessages.length === 0) {
        return NextResponse.json({ agentConfig, staleChats: [], metrics: getEmptyMetrics() });
      }

      // Group by sender
      const bySender = new Map<string, typeof allMessages>();
      for (const msg of allMessages) {
        const existing = bySender.get(msg.sender_id) || [];
        existing.push(msg);
        bySender.set(msg.sender_id, existing);
      }

      // Get follower labels
      const senderIds = [...bySender.keys()];
      const { data: followers } = await supabase
        .from('instagram_followers')
        .select('instagram_user_id, username, label, lead_intel')
        .in('instagram_user_id', senderIds);

      const followerMap = new Map(
        (followers || []).map(f => [f.instagram_user_id, f])
      );

      interface StaleChat {
        senderId: string;
        name: string;
        label: string;
        lastMessage: string;
        lastMessageAt: string;
        lastDirection: string;
        hoursSinceLastMessage: number;
        totalMessages: number;
        reason: string;
        sector: string | null;
      }

      const staleChats: StaleChat[] = [];
      const now = Date.now();

      for (const [senderId, msgs] of bySender) {
        const follower = followerMap.get(senderId);
        const label = follower?.label || 'nuevo';

        // Skip spam, clients (already converted), and cold leads
        if (['spam', 'cliente'].includes(label)) continue;

        // Most recent message (msgs are already desc sorted)
        const lastMsg = msgs[0];
        const lastMsgTime = new Date(lastMsg.created_at).getTime();
        const hoursSince = (now - lastMsgTime) / (1000 * 60 * 60);

        // Skip very recent chats (< 24h)
        if (hoursSince < 24) continue;

        // Get name
        const name = follower?.username || lastMsg.sender_name || senderId;

        // Determine reason
        let reason = '';

        // 1. We sent last message and they never replied (bot or manual)
        if (lastMsg.direction === 'outbound') {
          if (hoursSince > 72) {
            reason = 'Sin respuesta hace +3 días';
          } else if (hoursSince > 48) {
            reason = 'Sin respuesta hace +2 días';
          } else {
            reason = 'Sin respuesta hace +1 día';
          }
        }

        // 2. They replied but conversation died
        if (lastMsg.direction === 'inbound' && hoursSince > 48) {
          reason = 'Respondió pero no seguimos';
        }

        // 3. Ice breaker tapped but no follow-up conversation
        const hasIceBreaker = msgs.some(m => m.message_type === 'ice_breaker');
        const totalInbound = msgs.filter(m => m.direction === 'inbound').length;
        if (hasIceBreaker && totalInbound <= 1 && hoursSince > 24) {
          reason = 'Tocó ice breaker, sin seguimiento';
        }

        if (!reason) continue;

        const intel = follower?.lead_intel as Record<string, unknown> | null;

        staleChats.push({
          senderId,
          name,
          label,
          lastMessage: lastMsg.content.substring(0, 100),
          lastMessageAt: lastMsg.created_at,
          lastDirection: lastMsg.direction,
          hoursSinceLastMessage: Math.round(hoursSince),
          totalMessages: msgs.length,
          reason,
          sector: (intel?.sector as string) || null,
        });
      }

      // Sort by hours since last message (most urgent first)
      staleChats.sort((a, b) => {
        // Prioritize "Respondió pero no seguimos" (hot leads waiting)
        if (a.reason.includes('Respondió') && !b.reason.includes('Respondió')) return -1;
        if (!a.reason.includes('Respondió') && b.reason.includes('Respondió')) return 1;
        return a.hoursSinceLastMessage - b.hoursSinceLastMessage;
      });

      return NextResponse.json({ agentConfig, staleChats: staleChats.slice(0, 50) });
    }

    // ─── Logs: recent bot actions ───
    if (section === 'logs') {
      const { data: logs } = await supabase
        .from('instagram_token_log')
        .select('action, details, created_at')
        .in('action', ['send_debug', 'welcome_dm_cron', 'setup_icebreakers', 'cold_outreach', 'cold_followup', 'cold_orchestrator'])
        .order('created_at', { ascending: false })
        .limit(30);

      // Also get recent bot messages
      const { data: botMsgs } = await supabase
        .from('instagram_messages')
        .select('sender_id, sender_name, content, message_type, status, created_at')
        .eq('is_bot', true)
        .order('created_at', { ascending: false })
        .limit(30);

      return NextResponse.json({ agentConfig, logs: logs || [], recentBotActions: botMsgs || [] });
    }

    // ─── Metrics ───
    if (section === 'metrics') {
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

      // Bot messages this week
      const { count: botMsgsWeek } = await supabase
        .from('instagram_messages')
        .select('id', { count: 'exact', head: true })
        .eq('is_bot', true)
        .gte('created_at', weekAgo);

      // Ice breakers tapped this week
      const { count: iceBreakersWeek } = await supabase
        .from('instagram_messages')
        .select('id', { count: 'exact', head: true })
        .eq('message_type', 'ice_breaker')
        .gte('created_at', weekAgo);

      // Comments replied this week
      const { count: commentRepliesWeek } = await supabase
        .from('instagram_messages')
        .select('id', { count: 'exact', head: true })
        .eq('message_type', 'comment_reply')
        .gte('created_at', weekAgo);

      // First contacts this week
      const { count: firstContactsWeek } = await supabase
        .from('instagram_messages')
        .select('id', { count: 'exact', head: true })
        .eq('message_type', 'first_contact')
        .gte('created_at', weekAgo);

      // Label distribution
      const { data: labelData } = await supabase
        .from('instagram_followers')
        .select('label')
        .not('label', 'is', null);

      const labelCounts: Record<string, number> = {};
      for (const f of labelData || []) {
        labelCounts[f.label] = (labelCounts[f.label] || 0) + 1;
      }

      // Response rate: leads we messaged who responded
      const { data: allFollowers } = await supabase
        .from('instagram_followers')
        .select('instagram_user_id, label')
        .in('label', ['lead', 'interesado', 'cliente']);

      let respondedCount = 0;
      if (allFollowers && allFollowers.length > 0) {
        for (const f of allFollowers) {
          const { count: inbound } = await supabase
            .from('instagram_messages')
            .select('id', { count: 'exact', head: true })
            .eq('sender_id', f.instagram_user_id)
            .eq('direction', 'inbound');
          if ((inbound || 0) > 0) respondedCount++;
        }
      }

      const totalLeads = (allFollowers || []).length;
      const responseRate = totalLeads > 0 ? Math.round((respondedCount / totalLeads) * 100) : 0;

      return NextResponse.json({
        agentConfig,
        metrics: {
          botMessagesWeek: botMsgsWeek || 0,
          iceBreakersWeek: iceBreakersWeek || 0,
          commentRepliesWeek: commentRepliesWeek || 0,
          firstContactsWeek: firstContactsWeek || 0,
          responseRate,
          totalLeads,
          respondedLeads: respondedCount,
          labelCounts,
        },
      });
    }

    // Default: just config
    return NextResponse.json({ agentConfig });

  } catch (error) {
    console.error('Agent API error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

function getEmptyMetrics() {
  return { botMessagesWeek: 0, iceBreakersWeek: 0, commentRepliesWeek: 0, firstContactsWeek: 0, responseRate: 0, totalLeads: 0, respondedLeads: 0, labelCounts: {} };
}

// PUT — Save agent config or send follow-ups
export async function PUT(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const body = await request.json();

    // ─── Save agent config ───
    if (body.action === 'save_config') {
      const { data: existing } = await supabase
        .from('instagram_config')
        .select('id')
        .single();

      const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };

      if (body.system_prompt !== undefined) updates.system_prompt = body.system_prompt;
      if (body.comment_replies_enabled !== undefined) updates.comment_replies_enabled = body.comment_replies_enabled;
      if (body.alerts_enabled !== undefined) updates.alerts_enabled = body.alerts_enabled;
      if (body.comment_trigger_words !== undefined) updates.comment_trigger_words = body.comment_trigger_words;
      if (body.bot_enabled !== undefined) updates.bot_enabled = body.bot_enabled;

      if (existing) {
        await supabase.from('instagram_config').update(updates).eq('id', existing.id);
      }

      return NextResponse.json({ success: true });
    }

    // ─── Send follow-up to a specific lead ───
    if (body.action === 'followup') {
      const { senderId } = body;
      if (!senderId) return NextResponse.json({ error: 'senderId required' }, { status: 400 });

      // Get access token
      const { data: config } = await supabase
        .from('instagram_config')
        .select('access_token, system_prompt')
        .single();

      const accessToken = config?.access_token || process.env.INSTAGRAM_ACCESS_TOKEN;
      if (!accessToken) return NextResponse.json({ error: 'No access token' }, { status: 400 });

      // Get conversation history
      const { data: history } = await supabase
        .from('instagram_messages')
        .select('direction, content, created_at')
        .eq('sender_id', senderId)
        .order('created_at', { ascending: true })
        .limit(20);

      // Get follower info
      const { data: follower } = await supabase
        .from('instagram_followers')
        .select('username, lead_intel, profile_data')
        .eq('instagram_user_id', senderId)
        .maybeSingle();

      // Generate AI follow-up
      const convoText = (history || []).map(m =>
        `${m.direction === 'inbound' ? 'Lead' : 'Neuri'}: ${m.content}`
      ).join('\n');

      const intel = follower?.lead_intel as Record<string, unknown> | null;
      const profile = follower?.profile_data as Record<string, unknown> | null;
      let context = '';
      if (intel?.sector) context += `Sector: ${intel.sector}. `;
      if (intel?.nombre_negocio) context += `Negocio: ${intel.nombre_negocio}. `;
      if (profile?.biography) context += `Bio: ${String(profile.biography).substring(0, 100)}. `;

      const apiKey = process.env.GROQ_API_KEY;
      if (!apiKey) return NextResponse.json({ error: 'No GROQ_API_KEY' }, { status: 500 });

      const aiRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: `Genera un mensaje de follow-up para Instagram DM. Eres Neuri, del equipo de Neuriax (agencia de IA/webs).

CONTEXTO DEL LEAD: ${context || 'Sin datos previos.'}

REGLAS:
- Máximo 2 líneas
- Tono natural, no agresivo ni insistente
- Referencia algo de la conversación anterior si es posible
- NO te disculpes por escribir de nuevo
- NO digas "te escribo de nuevo" ni "solo quería..."
- Sé directo y aporta valor o curiosidad genuina
- 1-2 emojis máximo
- Si la convo murió después de small talk, propón algo concreto
- Si ya propusiste algo y no respondieron, cambia de ángulo`
            },
            { role: 'user', content: `Conversación anterior:\n${convoText}\n\nGenera el follow-up:` },
          ],
          max_tokens: 100,
          temperature: 0.8,
        }),
      });

      if (!aiRes.ok) return NextResponse.json({ error: 'AI generation failed' }, { status: 500 });
      const aiData = await aiRes.json();
      const followupMsg = aiData.choices?.[0]?.message?.content || 'ey! todo bien? si te surge algo aquí estamos 💪';

      // Send the DM
      const dmRes = await fetch('https://graph.instagram.com/v21.0/me/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          recipient: { id: senderId },
          message: { text: followupMsg },
        }),
      });

      const sent = dmRes.ok;

      // Log the follow-up
      await supabase.from('instagram_messages').insert({
        sender_id: senderId,
        direction: 'outbound',
        content: followupMsg,
        status: sent ? 'sent' : 'failed',
        is_bot: true,
        message_type: 'setter_followup',
      });

      return NextResponse.json({ success: true, sent, message: followupMsg });
    }

    // ─── Bulk follow-up to all stale chats ───
    if (body.action === 'bulk_followup') {
      const { senderIds } = body;
      if (!senderIds || !Array.isArray(senderIds) || senderIds.length === 0) {
        return NextResponse.json({ error: 'senderIds array required' }, { status: 400 });
      }

      // Limit to 10 per batch
      const batch = senderIds.slice(0, 10);
      let sentCount = 0;
      let failedCount = 0;

      for (const senderId of batch) {
        try {
          // Call ourselves recursively (internally)
          const res = await PUT(new NextRequest(request.url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'followup', senderId }),
          }));
          const data = await res.json();
          if (data.sent) sentCount++;
          else failedCount++;

          // Delay between sends
          await new Promise(resolve => setTimeout(resolve, 2000));
        } catch {
          failedCount++;
        }
      }

      return NextResponse.json({
        success: true,
        sent: sentCount,
        failed: failedCount,
        total: batch.length,
      });
    }

    // ─── Mark lead as cold/no interest ───
    if (body.action === 'mark_cold') {
      const { senderId } = body;
      await supabase
        .from('instagram_followers')
        .upsert({
          instagram_user_id: senderId,
          label: 'spam',
        }, { onConflict: 'instagram_user_id' });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('Agent API error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
