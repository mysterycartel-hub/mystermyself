-- ============================================================
-- Trading Chef Universe (TCU) — Market Kitchen Terminal Schema
-- Run this in your Supabase SQL editor after the main schema.sql
-- ============================================================

-- ── PROFILES ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      uuid UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email        text,
  display_name text,
  xp           integer DEFAULT 0,
  level        text DEFAULT 'Recruit',
  rank         text DEFAULT 'Kitchen Recruit',
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ── MISSIONS ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS missions (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title       text NOT NULL,
  description text,
  district    text,         -- e.g. 'Market Marina', 'Gold Kitchen', 'Forex Floor'
  difficulty  text,         -- 'beginner', 'intermediate', 'advanced'
  xp_reward   integer DEFAULT 0,
  is_active   boolean DEFAULT true,
  created_at  timestamptz DEFAULT now()
);

ALTER TABLE missions ENABLE ROW LEVEL SECURITY;

-- Missions are read-only for all authenticated users
CREATE POLICY "Authenticated users can view active missions"
  ON missions FOR SELECT
  USING (is_active = true);

-- ── MISSION PROGRESS ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS mission_progress (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  mission_id   uuid REFERENCES missions(id) ON DELETE CASCADE,
  status       text DEFAULT 'pending',    -- 'pending', 'in_progress', 'completed'
  completed_at timestamptz,
  created_at   timestamptz DEFAULT now()
);

ALTER TABLE mission_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own mission progress"
  ON mission_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own mission progress"
  ON mission_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own mission progress"
  ON mission_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- ── JOURNAL ENTRIES ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS journal_entries (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  symbol      text,
  timeframe   text,
  bias        text,
  setup       text,
  result      text,
  lesson      text,
  notes       text,
  ai_summary  text,
  trade_date  date,
  created_at  timestamptz DEFAULT now()
);

ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own journal entries"
  ON journal_entries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own journal entries"
  ON journal_entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own journal entries"
  ON journal_entries FOR UPDATE
  USING (auth.uid() = user_id);

-- ── CHART ANALYSES ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS chart_analyses (
  id               uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id          uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  symbol           text,
  timeframe        text,
  bias             text,
  liquidity        text,
  aoi              text,
  entry_area       text,         -- "the pass" in TCU canon
  burn_point       text,         -- stop loss in TCU canon
  tables_served    text,         -- targets in TCU canon
  invalidation     text,
  ai_summary       text,
  character_lesson text,
  screenshot_url   text,
  created_at       timestamptz DEFAULT now()
);

ALTER TABLE chart_analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own chart analyses"
  ON chart_analyses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chart analyses"
  ON chart_analyses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own chart analyses"
  ON chart_analyses FOR UPDATE
  USING (auth.uid() = user_id);

-- ── SEED DATA: Starter Missions (Market Marina - Beginner) ────
INSERT INTO missions (title, description, district, difficulty, xp_reward) VALUES
  (
    'First Steps in the Kitchen',
    'Open the Market Kitchen Terminal and view your first chart. Learn how to switch between symbols and timeframes.',
    'Market Marina',
    'beginner',
    50
  ),
  (
    'Read the Recipe',
    'Identify the current market bias on any symbol. Is the kitchen cooking bullish or bearish today?',
    'Market Marina',
    'beginner',
    75
  ),
  (
    'Spot the Leftover Container',
    'Find a Fair Value Gap (leftover container) on any 15M or 1H chart. Mark it on your analysis.',
    'Market Marina',
    'beginner',
    100
  ),
  (
    'Map the Liquidity',
    'Identify at least 2 liquidity zones (equal highs, equal lows, or session levels) on your chosen symbol.',
    'Market Marina',
    'beginner',
    100
  ),
  (
    'Journal Your First Dish',
    'Complete a full journal entry with bias, the pass, burn point, and tables served for any setup.',
    'Market Marina',
    'beginner',
    150
  ),
  (
    'Ask the Chef',
    'Use the AI Coach to get a TCU analysis on any symbol. Read the character lesson and note what you learned.',
    'Market Marina',
    'beginner',
    75
  )
ON CONFLICT DO NOTHING;
