-- ============================================================
-- MysterMyself — V3 Passport System Schema
-- Run this in your Supabase SQL editor AFTER schema.sql
-- ============================================================

-- ── PASSPORT PROFILES ────────────────────────────────────────
-- One row per user. Extends auth.users via user_id FK.
CREATE TABLE IF NOT EXISTS passport_profiles (
  id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id         uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  username        text UNIQUE,                          -- chosen handle, e.g. @coastrider
  display_name    text,
  xp              integer NOT NULL DEFAULT 0,
  level           text NOT NULL DEFAULT 'Recruit',      -- Recruit | Navigator | Explorer | Captain | Admiral | Legend
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
);

ALTER TABLE passport_profiles ENABLE ROW LEVEL SECURITY;
-- Users can read their own profile
CREATE POLICY "Own profile read"   ON passport_profiles FOR SELECT USING (auth.uid() = user_id);
-- Users can update their own profile
CREATE POLICY "Own profile update" ON passport_profiles FOR UPDATE USING (auth.uid() = user_id);
-- Public read for username lookups (public profiles)
CREATE POLICY "Public username read" ON passport_profiles FOR SELECT USING (username IS NOT NULL);
-- Service role can do anything
CREATE POLICY "Service role all profiles" ON passport_profiles USING (auth.role() = 'service_role');

-- ── XP EVENT LOG ─────────────────────────────────────────────
-- Every XP transaction is recorded here for auditability
CREATE TABLE IF NOT EXISTS passport_xp_events (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  xp_amount    integer NOT NULL,
  event_type   text NOT NULL,  -- visit_district | complete_mission | share | purchase | bonus
  event_ref    text,           -- slug or ID of the thing that triggered it
  description  text,
  created_at   timestamptz DEFAULT now()
);

ALTER TABLE passport_xp_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own xp events read"   ON passport_xp_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service role all xp"  ON passport_xp_events USING (auth.role() = 'service_role');

-- ── DISTRICT STAMPS ──────────────────────────────────────────
-- One row per user per district (collected stamps)
CREATE TABLE IF NOT EXISTS passport_stamps (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id       uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  district_id   text NOT NULL,            -- matches District.id in lib/districts.ts
  district_name text NOT NULL,
  stamp_code    text NOT NULL,            -- e.g. ORIGIN, GOLD, ROUTE
  collected_at  timestamptz DEFAULT now(),
  UNIQUE(user_id, district_id)            -- one stamp per district per user
);

ALTER TABLE passport_stamps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own stamps read"      ON passport_stamps FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service role all stamps" ON passport_stamps USING (auth.role() = 'service_role');

-- ── BADGE AWARDS ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS passport_badges (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id     text NOT NULL,             -- matches PassportBadge.id in lib/passport.ts
  badge_name   text NOT NULL,
  awarded_at   timestamptz DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

ALTER TABLE passport_badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own badges read"      ON passport_badges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service role all badges" ON passport_badges USING (auth.role() = 'service_role');

-- ── MISSION COMPLETIONS ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS passport_missions (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mission_id   text NOT NULL,             -- matches PassportMission.id in lib/passport.ts
  completed_at timestamptz DEFAULT now(),
  UNIQUE(user_id, mission_id)
);

ALTER TABLE passport_missions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own missions read"     ON passport_missions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service role all missions" ON passport_missions USING (auth.role() = 'service_role');

-- ── HELPER FUNCTION: Recalculate level from XP ───────────────
CREATE OR REPLACE FUNCTION recalculate_passport_level(xp_amount integer)
RETURNS text AS $$
BEGIN
  IF xp_amount >= 6000 THEN RETURN 'Legend';
  ELSIF xp_amount >= 3000 THEN RETURN 'Admiral';
  ELSIF xp_amount >= 1500 THEN RETURN 'Captain';
  ELSIF xp_amount >= 750  THEN RETURN 'Explorer';
  ELSIF xp_amount >= 250  THEN RETURN 'Navigator';
  ELSE RETURN 'Recruit';
  END IF;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ── TRIGGER: Auto-update level when XP changes ───────────────
CREATE OR REPLACE FUNCTION sync_passport_level()
RETURNS TRIGGER AS $$
BEGIN
  NEW.level = recalculate_passport_level(NEW.xp);
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS passport_level_sync ON passport_profiles;
CREATE TRIGGER passport_level_sync
  BEFORE UPDATE OF xp ON passport_profiles
  FOR EACH ROW EXECUTE FUNCTION sync_passport_level();

-- ── VIEW: Full passport summary ───────────────────────────────
CREATE OR REPLACE VIEW passport_summary AS
SELECT
  p.user_id,
  p.username,
  p.display_name,
  p.xp,
  p.level,
  p.created_at,
  (SELECT COUNT(*) FROM passport_stamps  s WHERE s.user_id = p.user_id) AS stamps_count,
  (SELECT COUNT(*) FROM passport_badges  b WHERE b.user_id = p.user_id) AS badges_count,
  (SELECT COUNT(*) FROM passport_missions m WHERE m.user_id = p.user_id) AS missions_count
FROM passport_profiles p;
