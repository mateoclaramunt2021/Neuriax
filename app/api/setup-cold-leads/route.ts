import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// One-time setup endpoint to create the cold leads table
// Call once after deploy: https://www.neuriax.com/api/setup-cold-leads?secret=neuriax-cron-secret-2026

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  if (secret !== process.env.CRON_SECRET && secret !== 'neuriax-cron-secret-2026') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  const supabase = createClient(url, key);

  // Try to check if table exists
  const { error: checkError } = await supabase
    .from('instagram_cold_leads')
    .select('id')
    .limit(1);

  if (checkError && checkError.message.includes('does not exist')) {
    // Table doesn't exist — try to create it via SQL
    // Since we can't run DDL via the REST API, we'll use upsert approach
    // The table must be created via Supabase Dashboard SQL Editor
    return NextResponse.json({
      error: 'Table does not exist',
      action_required: 'Create the table in Supabase Dashboard → SQL Editor. Run this SQL:',
      sql: `CREATE TABLE instagram_cold_leads (
  id SERIAL PRIMARY KEY,
  instagram_user_id TEXT UNIQUE NOT NULL,
  username TEXT,
  full_name TEXT,
  sector TEXT NOT NULL DEFAULT 'general',
  bio TEXT,
  followers_count INT DEFAULT 0,
  source_hashtag TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  first_dm_sent_at TIMESTAMPTZ,
  first_dm_message TEXT,
  followup_sent_at TIMESTAMPTZ,
  followup_message TEXT,
  responded BOOLEAN DEFAULT FALSE,
  responded_at TIMESTAMPTZ,
  converted BOOLEAN DEFAULT FALSE,
  blacklisted BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_cold_leads_status ON instagram_cold_leads(status);
CREATE INDEX idx_cold_leads_sector ON instagram_cold_leads(sector);

-- Also add cold_outreach_enabled to instagram_config
ALTER TABLE instagram_config ADD COLUMN IF NOT EXISTS cold_outreach_enabled BOOLEAN DEFAULT TRUE;
ALTER TABLE instagram_config ADD COLUMN IF NOT EXISTS cold_dm_daily_limit INT DEFAULT 8;`,
    }, { status: 400 });
  }

  if (checkError) {
    return NextResponse.json({ error: checkError.message });
  }

  // Also ensure config has cold_outreach columns by trying to update
  try {
    const { data: config } = await supabase
      .from('instagram_config')
      .select('id')
      .single();
    
    if (config) {
      await supabase
        .from('instagram_config')
        .update({ cold_outreach_enabled: true })
        .eq('id', config.id);
    }
  } catch {
    // Column might not exist yet
  }

  return NextResponse.json({
    success: true,
    message: 'Table instagram_cold_leads exists and is ready!',
  });
}
