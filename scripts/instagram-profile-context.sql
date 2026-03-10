-- ============================================
-- INSTAGRAM PROFILE CONTEXT & LEAD MANAGEMENT
-- Run this SQL in Supabase SQL Editor
-- Adds: profile caching, greeting tracking, lead purposes
-- ============================================

-- 1. New columns on instagram_followers for profile caching & context
ALTER TABLE instagram_followers ADD COLUMN IF NOT EXISTS profile_data JSONB;
ALTER TABLE instagram_followers ADD COLUMN IF NOT EXISTS last_greeting_at TIMESTAMPTZ;
ALTER TABLE instagram_followers ADD COLUMN IF NOT EXISTS lead_purpose TEXT DEFAULT 'captacion';
ALTER TABLE instagram_followers ADD COLUMN IF NOT EXISTS last_profile_fetch TIMESTAMPTZ;
ALTER TABLE instagram_followers ADD COLUMN IF NOT EXISTS lead_intel JSONB;

-- 2. New column on instagram_cold_leads for lead purpose
ALTER TABLE instagram_cold_leads ADD COLUMN IF NOT EXISTS lead_purpose TEXT DEFAULT 'captacion';

-- 3. Index for faster greeting checks
CREATE INDEX IF NOT EXISTS idx_ig_followers_greeting ON instagram_followers(last_greeting_at);
CREATE INDEX IF NOT EXISTS idx_ig_followers_purpose ON instagram_followers(lead_purpose);
