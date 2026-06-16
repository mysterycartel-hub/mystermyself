# MYSTERYMYSELF LAUNCH GUIDE
**Zero-assumption. Execute top to bottom. Do not skip steps.**
Last updated: 2026-06-15
Build status: 63 routes · 0 errors · code complete

---

## WHAT THIS GUIDE IS

This guide assumes:
- You have never touched this project before
- You have access to: Supabase Dashboard, Vercel Dashboard, Anthropic Console
- You will execute every step in the exact order written
- You have no one to ask

If you hit an error, scroll to **Section 5: Expected Errors and Recovery** before doing anything else.

---

## OVERVIEW OF WHAT NEEDS TO HAPPEN

The platform code is complete and deployed. Three external services need configuration before the site is fully live:

| Service | What It Enables | Time Required |
|---|---|---|
| Supabase — SQL Schema | Database tables for Passport system | ~10 minutes |
| Supabase — Auth Config | Magic link login with correct redirect | ~5 minutes |
| Vercel — Env Vars | Connects Supabase + Anthropic to the app | ~10 minutes |
| Vercel — Redeploy | Applies the env vars to the live build | ~3 minutes |

**Total time: ~30 minutes.**

Everything else is already live. The Academy, Kitchen, Theater, Quest Board, and all district pages work right now with no configuration. Only the Passport auth system and AI Coach need the steps below.

---

## SECTION 1: SUPABASE SQL SCHEMA

This section creates the 5 database tables and 1 function that the Passport system writes to.

### Step 1.1 — Open Supabase Dashboard

1. Go to `https://supabase.com`
2. Click **Sign In** → log in to your account
3. Click your MysterMyself project (it will show your project URL like `https://xyz.supabase.co`)
4. In the left sidebar, click **SQL Editor**
5. Click **New query** (top right, or the + button)

### Step 1.2 — Run the Schema

Copy the ENTIRE block below (from the first `--` line to the last `;`). Paste it into the SQL Editor. Click **Run** (the green button or Ctrl+Enter).

```sql
-- ============================================================
-- MYSTERYMYSELF PASSPORT SYSTEM — DATABASE SCHEMA
-- Run this ONCE in Supabase SQL Editor
-- Do not run again — use IF NOT EXISTS guards already included
-- ============================================================

-- ── TABLE 1: passport_profiles ────────────────────────────────
-- One row per user. Stores XP total and current level.
create table if not exists passport_profiles (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null unique references auth.users(id) on delete cascade,
  username     text unique,
  display_name text,
  avatar_url   text,
  bio          text,
  xp           integer not null default 0,
  level        text    not null default 'Recruit',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists passport_profiles_user_id_idx on passport_profiles(user_id);
create index if not exists passport_profiles_username_idx on passport_profiles(username);

-- ── TABLE 2: passport_xp_events ──────────────────────────────
-- Every XP award is logged here. Append-only event log.
create table if not exists passport_xp_events (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  xp_amount   integer not null,
  event_type  text    not null,
  event_ref   text,
  description text,
  created_at  timestamptz not null default now()
);

create index if not exists passport_xp_events_user_id_idx   on passport_xp_events(user_id);
create index if not exists passport_xp_events_created_at_idx on passport_xp_events(created_at desc);

-- ── TABLE 3: passport_stamps ──────────────────────────────────
-- One row per district per user. Unique constraint prevents duplicates.
create table if not exists passport_stamps (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  district_id   text not null,
  district_name text,
  stamp_code    text,
  earned_at     timestamptz not null default now(),
  unique(user_id, district_id)
);

create index if not exists passport_stamps_user_id_idx on passport_stamps(user_id);

-- ── TABLE 4: passport_badges ──────────────────────────────────
-- One row per badge per user. Idempotent — duplicates ignored.
create table if not exists passport_badges (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  badge_id   text not null,
  badge_name text,
  earned_at  timestamptz not null default now(),
  unique(user_id, badge_id)
);

create index if not exists passport_badges_user_id_idx on passport_badges(user_id);

-- ── TABLE 5: passport_missions ────────────────────────────────
-- One row per mission per user. Idempotent — duplicates ignored.
create table if not exists passport_missions (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  mission_id   text not null,
  completed_at timestamptz not null default now(),
  unique(user_id, mission_id)
);

create index if not exists passport_missions_user_id_idx on passport_missions(user_id);

-- ── TABLE 6: leads ────────────────────────────────────────────
-- Email lead capture from LeadMagnetForm on home page.
create table if not exists leads (
  id         uuid primary key default gen_random_uuid(),
  name       text,
  email      text not null,
  interest   text,
  division   text default 'website',
  source     text default 'website',
  created_at timestamptz not null default now(),
  unique(email)
);

create index if not exists leads_email_idx on leads(email);

-- ── RPC FUNCTION: increment_passport_xp ─────────────────────
-- Called by the XP award code path. Atomically increments XP
-- and updates level. Falls back to manual update if RPC fails.
create or replace function increment_passport_xp(p_user_id uuid, p_amount integer)
returns void
language plpgsql
security definer
as $$
declare
  new_xp integer;
  new_level text;
begin
  -- Atomically increment XP
  update passport_profiles
  set    xp         = xp + p_amount,
         updated_at = now()
  where  user_id    = p_user_id
  returning xp into new_xp;

  -- Derive level from XP using the same thresholds as lib/passport.ts
  new_level := case
    when new_xp >= 6000 then 'Legend'
    when new_xp >= 3000 then 'Admiral'
    when new_xp >= 1500 then 'Captain'
    when new_xp >= 750  then 'Explorer'
    when new_xp >= 250  then 'Navigator'
    else                     'Recruit'
  end;

  -- Update level
  update passport_profiles
  set    level      = new_level,
         updated_at = now()
  where  user_id    = p_user_id;
end;
$$;

-- ── ROW LEVEL SECURITY ────────────────────────────────────────
-- Enable RLS on all tables. Service role bypasses RLS automatically.
-- Anon/authenticated roles use the policies below.

alter table passport_profiles  enable row level security;
alter table passport_xp_events enable row level security;
alter table passport_stamps    enable row level security;
alter table passport_badges    enable row level security;
alter table passport_missions  enable row level security;
alter table leads              enable row level security;

-- Drop policies if they already exist (safe re-run)
drop policy if exists "service_role_all_profiles"   on passport_profiles;
drop policy if exists "public_read_profiles"        on passport_profiles;
drop policy if exists "owner_read_profiles"         on passport_profiles;
drop policy if exists "service_role_all_xp"         on passport_xp_events;
drop policy if exists "owner_read_xp"               on passport_xp_events;
drop policy if exists "service_role_all_stamps"     on passport_stamps;
drop policy if exists "owner_read_stamps"           on passport_stamps;
drop policy if exists "service_role_all_badges"     on passport_badges;
drop policy if exists "owner_read_badges"           on passport_badges;
drop policy if exists "service_role_all_missions"   on passport_missions;
drop policy if exists "owner_read_missions"         on passport_missions;
drop policy if exists "service_role_all_leads"      on leads;

-- passport_profiles: service role has full access; public can read any profile
create policy "service_role_all_profiles" on passport_profiles
  for all using (auth.role() = 'service_role');

create policy "public_read_profiles" on passport_profiles
  for select using (true);

create policy "owner_read_profiles" on passport_profiles
  for select using (auth.uid() = user_id);

-- passport_xp_events: service role writes; owner reads own
create policy "service_role_all_xp" on passport_xp_events
  for all using (auth.role() = 'service_role');

create policy "owner_read_xp" on passport_xp_events
  for select using (auth.uid() = user_id);

-- passport_stamps: service role writes; owner reads own
create policy "service_role_all_stamps" on passport_stamps
  for all using (auth.role() = 'service_role');

create policy "owner_read_stamps" on passport_stamps
  for select using (auth.uid() = user_id);

-- passport_badges: service role writes; owner reads own
create policy "service_role_all_badges" on passport_badges
  for all using (auth.role() = 'service_role');

create policy "owner_read_badges" on passport_badges
  for select using (auth.uid() = user_id);

-- passport_missions: service role writes; owner reads own
create policy "service_role_all_missions" on passport_missions
  for all using (auth.role() = 'service_role');

create policy "owner_read_missions" on passport_missions
  for select using (auth.uid() = user_id);

-- leads: service role only (no public read)
create policy "service_role_all_leads" on leads
  for all using (auth.role() = 'service_role');
```

### Step 1.3 — Verify Tables Were Created

1. In the Supabase left sidebar, click **Table Editor**
2. You should see these 6 tables listed:
   - `passport_profiles`
   - `passport_xp_events`
   - `passport_stamps`
   - `passport_badges`
   - `passport_missions`
   - `leads`
3. If any table is missing, the SQL had an error. Check Section 5 — Error 1.

### Step 1.4 — Verify the RPC Function

1. In Supabase left sidebar, click **Database** → **Functions**
2. You should see `increment_passport_xp` listed
3. If it is missing, check Section 5 — Error 2.

---

## SECTION 2: SUPABASE AUTH CONFIGURATION

This section makes magic link emails redirect users back to your domain instead of localhost.

### Step 2.1 — Set the Site URL

1. In Supabase left sidebar, click **Authentication**
2. Click **URL Configuration** (sub-menu item)
3. Find the field labeled **Site URL**
4. Set it to your production domain:
   - If domain is connected to Vercel: `https://mystermyself.com`
   - If using Vercel default URL: `https://mystermyself.vercel.app`
5. Click **Save**

### Step 2.2 — Add Redirect URLs

1. On the same **URL Configuration** page, find **Redirect URLs**
2. Click **Add URL**
3. Add this URL (replace with your actual domain):
   ```
   https://mystermyself.com/**
   ```
   The `/**` wildcard is required — it allows redirects to any page on the domain.
4. If using Vercel default URL, also add:
   ```
   https://mystermyself.vercel.app/**
   ```
5. Click **Save**

### Step 2.3 — Verify Email Templates (Optional but Recommended)

1. In Supabase left sidebar, click **Authentication** → **Email Templates**
2. Click **Magic Link**
3. Confirm the template exists and the Confirm signup URL contains `{{ .ConfirmationURL }}`
4. No changes needed unless you want custom branding

---

## SECTION 3: VERCEL ENVIRONMENT VARIABLES

This section connects the live site to Supabase and Anthropic. Without these, auth and AI Coach are offline.

### Step 3.1 — Get Your Supabase Keys

1. In Supabase left sidebar, click **Project Settings** (gear icon, bottom of sidebar)
2. Click **API** in the sub-menu
3. You need THREE values from this page:
   - **Project URL** — looks like `https://abcdefghijklm.supabase.co`
   - **anon public** key — starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (long string)
   - **service_role** key — also starts with `eyJ...` but is a different longer string
4. Keep this browser tab open — you'll paste these into Vercel next.

**Warning:** The `service_role` key has full database access. It is a server-only secret. Never put it in client-side code or share it publicly.

### Step 3.2 — Get Your Anthropic API Key

1. Go to `https://console.anthropic.com`
2. Click **API Keys** in the left sidebar
3. Click **Create Key** if you don't have one, or copy an existing key
4. The key starts with `sk-ant-api03-...`

### Step 3.3 — Add Variables to Vercel

1. Go to `https://vercel.com`
2. Click your **mystermyself** project
3. Click **Settings** in the top navigation
4. Click **Environment Variables** in the left sidebar
5. For EACH variable below, click **Add New** and fill in the fields:

---

**Variable 1 of 5:**
```
Name:   NEXT_PUBLIC_SUPABASE_URL
Value:  https://YOUR_PROJECT_REF.supabase.co
        (paste the Project URL from Step 3.1 — include the https://)
Environment: ✅ Production  ✅ Preview  ✅ Development
```

---

**Variable 2 of 5:**
```
Name:   NEXT_PUBLIC_SUPABASE_ANON_KEY
Value:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (the anon public key)
Environment: ✅ Production  ✅ Preview  ✅ Development
```

---

**Variable 3 of 5:**
```
Name:   SUPABASE_SERVICE_ROLE_KEY
Value:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (the service_role key)
Environment: ✅ Production  (do NOT check Preview or Development unless required)
```

---

**Variable 4 of 5:**
```
Name:   ANTHROPIC_API_KEY
Value:  sk-ant-api03-... (your Anthropic API key)
Environment: ✅ Production  ✅ Preview
```

---

**Variable 5 of 5:**
```
Name:   NEXT_PUBLIC_SITE_URL
Value:  https://mystermyself.com
        (or https://mystermyself.vercel.app if domain not yet connected)
Environment: ✅ Production  ✅ Preview  ✅ Development
```

---

### Step 3.4 — Verify All 5 Variables Are Saved

After adding all 5, your Environment Variables page should show:
```
NEXT_PUBLIC_SUPABASE_URL          ●●●●●●  Production Preview Development
NEXT_PUBLIC_SUPABASE_ANON_KEY     ●●●●●●  Production Preview Development
SUPABASE_SERVICE_ROLE_KEY         ●●●●●●  Production
ANTHROPIC_API_KEY                 ●●●●●●  Production Preview
NEXT_PUBLIC_SITE_URL              ●●●●●●  Production Preview Development
```

---

## SECTION 4: REDEPLOY AND VERIFY

Env vars only apply to new builds. The current build does not have them. You must trigger a redeploy.

### Step 4.1 — Trigger Redeploy

**Option A (Vercel Dashboard — no code needed):**
1. In your Vercel project, click **Deployments** in the top navigation
2. Find the most recent deployment (top of the list)
3. Click the **three-dot menu (⋯)** on that deployment
4. Click **Redeploy**
5. Check "Use existing Build Cache" if it appears — then click **Redeploy**

**Option B (push an empty commit — triggers autodeploy):**
```bash
git commit --allow-empty -m "trigger redeploy with env vars"
git push origin main
```

### Step 4.2 — Wait for Build to Complete

1. In Vercel → Deployments, watch the new deployment
2. It will show: **Building** → **Ready**
3. Build time: ~2–3 minutes
4. If it shows **Error**, see Section 5 — Error 3

### Step 4.3 — Smoke Test: Authentication

1. Open your site: `https://mystermyself.com` (or Vercel URL)
2. Navigate to `/passport/login`
3. Enter your own email address
4. Click **Send Magic Link**
5. Check your email — you should receive a magic link email from Supabase within 60 seconds
6. If no email arrives within 2 minutes, see Section 5 — Error 4
7. Click the link in the email
8. You should be redirected to `/passport` and see your Passport dashboard loaded
9. If you see an error page instead, see Section 5 — Error 5

### Step 4.4 — Smoke Test: Supabase Writes

1. After logging in at `/passport`, the site automatically creates your passport profile
2. Go to Supabase Dashboard → Table Editor → **passport_profiles**
3. You should see one row with your user ID and email-derived username
4. If the table is empty, see Section 5 — Error 6

### Step 4.5 — Smoke Test: XP Write

1. Navigate to `/academy`
2. Click **Level 0 — Market Child**
3. Read through the lesson (scroll to bottom triggers the `markLessonViewed` event)
4. Go back to Supabase → Table Editor → **passport_xp_events**
5. You should see an event row (if authenticated — XP syncs only when logged in)
6. If no row appears, the local XP still works — the Supabase sync is an optional enhancement

### Step 4.6 — Smoke Test: AI Coach

1. Navigate to `/kitchen`
2. Find the AI Coach panel
3. Send a message: "What is my first step in the kitchen?"
4. You should see a streaming response from the Trading Chef
5. If you see "AI Coach offline" or no response, see Section 5 — Error 7

---

## SECTION 5: EXPECTED ERRORS AND RECOVERY

### Error 1: SQL ran but tables are missing in Table Editor

**Cause:** The SQL Editor showed success but RLS or a permission issue prevented table creation.

**Recovery:**
1. In Supabase SQL Editor, run this to check what exists:
   ```sql
   select table_name from information_schema.tables
   where table_schema = 'public'
   order by table_name;
   ```
2. Note which tables are missing
3. Copy only the `create table if not exists` block for the missing table(s) from Section 1
4. Run them individually
5. If you get a permission error, your Supabase user may not have CREATE TABLE rights — contact Supabase support or check if you're on the correct project

---

### Error 2: RPC function `increment_passport_xp` not found

**Cause:** The function block failed silently. The `awardXP()` code has a manual fallback, so XP still works — but atomicity is lost.

**Recovery:**
1. In Supabase SQL Editor, run only the function block:
   ```sql
   create or replace function increment_passport_xp(p_user_id uuid, p_amount integer)
   returns void language plpgsql security definer as $$
   declare
     new_xp integer;
     new_level text;
   begin
     update passport_profiles
     set xp = xp + p_amount, updated_at = now()
     where user_id = p_user_id
     returning xp into new_xp;

     new_level := case
       when new_xp >= 6000 then 'Legend'
       when new_xp >= 3000 then 'Admiral'
       when new_xp >= 1500 then 'Captain'
       when new_xp >= 750  then 'Explorer'
       when new_xp >= 250  then 'Navigator'
       else 'Recruit'
     end;

     update passport_profiles
     set level = new_level, updated_at = now()
     where user_id = p_user_id;
   end;
   $$;
   ```
2. Run it. Then check Database → Functions for `increment_passport_xp`.

---

### Error 3: Vercel build fails after adding env vars

**Cause:** The build itself is not affected by env vars — this is likely a pre-existing build error.

**What to check:**
1. Vercel → Deployments → failed build → **View Build Logs**
2. Look for red error lines starting with `Error:` or `Type error:`
3. Common causes:

**Cause A: TypeScript error**
```
Type error: Cannot find module '@/lib/...' or its corresponding type declarations
```
Recovery: The import path likely has a typo. Check the file referenced in the error.

**Cause B: Module not found**
```
Module not found: Can't resolve '...'
```
Recovery: A component is importing a file that doesn't exist at that path.

**Cause C: `dynamic` missing on API route**
```
Dynamic server usage: Route /api/... used `headers`
```
Recovery: Add `export const dynamic = 'force-dynamic'` to the top of that route file.

---

### Error 4: Magic link email never arrives

**Cause A: Supabase email rate limit.**
Supabase free tier limits to 2 emails per hour per email address.

**Recovery:** Wait 1 hour and try again, or use a different email address for testing.

**Cause B: Supabase email provider not configured.**
By default, Supabase uses its own SMTP for development. In production, you may need to configure a custom SMTP provider.

**Recovery:**
1. Supabase Dashboard → Authentication → SMTP Settings
2. Configure with SendGrid, Resend, or similar
3. Resend.com free tier: 100 emails/day, easy setup

**Cause C: Email in spam.**
Check your spam folder. Supabase emails are from `noreply@mail.supabase.io`.

---

### Error 5: Magic link clicked but redirected to wrong page or error

**Cause:** The Site URL in Supabase Auth doesn't match where the app is deployed.

**Recovery:**
1. Supabase Dashboard → Authentication → URL Configuration
2. Check Site URL — must exactly match your domain (no trailing slash)
3. Check Redirect URLs — must include your domain with `/**`
4. If you changed the Site URL, test the magic link again (old links don't update)

**Cause B: The redirect URL contains `localhost` instead of your domain.**
This means `NEXT_PUBLIC_SITE_URL` is missing or wrong in Vercel.

**Recovery:**
1. Vercel → Settings → Environment Variables
2. Find `NEXT_PUBLIC_SITE_URL` — verify it is set to `https://mystermyself.com`
3. Redeploy

---

### Error 6: passport_profiles table is empty after login

**Cause A: The register call is not firing.** The client-side code in `app/passport/page.tsx` calls `POST /api/passport/register` after auth succeeds.

**Diagnosis:**
1. Open browser DevTools → Network tab
2. Log in via magic link
3. Look for a request to `/api/passport/register`
4. If the request shows **500**: check Vercel Logs
5. If the request shows **401**: the auth token is not being passed correctly

**Vercel Logs:**
1. Vercel Dashboard → your project → **Logs** (top nav)
2. Filter by **API** or search for `passport/register`
3. Look for the error message in the log line

**Cause B: `SUPABASE_SERVICE_ROLE_KEY` is wrong or missing.**
The register route uses the service role client to write to the database.

**Recovery:**
1. Vercel → Settings → Environment Variables → find `SUPABASE_SERVICE_ROLE_KEY`
2. Compare the first 20 characters with the key in Supabase Dashboard → Project Settings → API → service_role
3. If they don't match, delete and re-add the variable
4. Redeploy

---

### Error 7: AI Coach shows "offline" or returns 503

**Cause:** `ANTHROPIC_API_KEY` is missing from Vercel env vars, or the key is invalid.

**Recovery:**
1. Vercel → Settings → Environment Variables → check `ANTHROPIC_API_KEY` exists
2. If missing: add it (see Section 3 Step 3.3)
3. If present: verify the key is valid at `https://console.anthropic.com` → API Keys
4. Redeploy after any change

**Cause B: Key exists but starts with wrong prefix.**
Valid Anthropic keys start with `sk-ant-api03-`. If yours starts with `sk-ant-` followed by different characters, it may be from an older API version.

**Recovery:** Generate a new key in Anthropic Console.

---

### Error 8: Passport loads but shows blank / no XP / no badges

**Cause:** The `getFullPassport()` function returns `null` if the profile doesn't exist, or the UI shows a loading state indefinitely.

**Diagnosis:**
1. Open browser DevTools → Console
2. Look for red errors mentioning Supabase or passport
3. Look for errors mentioning `null` on the passport object

**Cause A: Tables exist but RLS is blocking reads.**
The `getFullPassport()` function uses the service role — it should bypass RLS. If you see `permission denied` errors in Vercel Logs, the service role key is wrong.

**Recovery:** Re-verify `SUPABASE_SERVICE_ROLE_KEY` (see Error 6 recovery).

**Cause B: Profile was never created** (see Error 6).

---

### Error 9: `/api/passport/xp` returns 500

**Cause:** The `passport_xp_events` table column names don't match what the code expects.

The code inserts: `{ user_id, xp_amount, event_type, event_ref, description }`

If you see a column error in Vercel Logs like `column "amount" does not exist`, you have a schema mismatch.

**Recovery:**
1. In Supabase SQL Editor, check the column names:
   ```sql
   select column_name from information_schema.columns
   where table_name = 'passport_xp_events'
   order by ordinal_position;
   ```
2. Expected columns: `id, user_id, xp_amount, event_type, event_ref, description, created_at`
3. If columns are wrong (e.g., `amount` instead of `xp_amount`), drop and recreate:
   ```sql
   drop table if exists passport_xp_events cascade;
   ```
   Then re-run the `passport_xp_events` create block from Section 1.

---

### Error 10: Build takes > 10 minutes or hangs

**Cause:** Vercel build hung on a dependency install or Next.js compilation.

**Recovery:**
1. Vercel → Deployments → find the stuck build → **Cancel**
2. Wait 2 minutes
3. Click **Redeploy** on the previous successful deployment

---

## SECTION 6: WHAT IS ALREADY WORKING (NO ACTION NEEDED)

These systems work with zero configuration and can be tested right now at any point:

| Feature | URL | Test |
|---|---|---|
| Home page | `/` | Loads with all sections |
| Scott-King Coast map | `/coast` | 9 districts visible, interactive |
| All 9 district pages | `/coast/market-marina` etc. | Each district detail page loads |
| TCU Academy | `/academy` | Level 0 unlocked, can enter lesson |
| All 13 lessons | `/academy/market-child` etc. | Each lesson loads with content |
| Local XP progression | `/academy` | Complete lesson, XP shows in header |
| Character interrupts | Any lesson | Write "I'm scared" in journal → Melody fires |
| Kitchen Rush | `/kitchen-rush` | Scenarios run, scoring works |
| TCU Theater | `/tcu-theater` | Videos list, mark as watched, XP awards locally |
| Market Kitchen | `/kitchen` | TradingView chart loads |
| Crown Method | `/crown-method` | M·S·Crown framework accessible |
| Daily Quest board | `/passport` | Quests visible without login |
| All district redirects | `/route-harbor` etc. | Redirects to `/coast/route-harbor` |

---

## SECTION 7: COLUMN NAME REFERENCE

**Critical:** The code uses specific column names. If you ever need to inspect or query the database manually, use these exact names.

### passport_profiles
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK, auto-generated |
| `user_id` | uuid | FK to auth.users — unique per user |
| `username` | text | Auto-generated from email on first login |
| `display_name` | text | Same as username by default |
| `avatar_url` | text | nullable |
| `bio` | text | nullable |
| `xp` | integer | Total XP — NOT "total_xp" |
| `level` | text | 'Recruit'/'Navigator'/'Explorer'/'Captain'/'Admiral'/'Legend' — NOT "rank" |
| `created_at` | timestamptz | auto |
| `updated_at` | timestamptz | auto |

### passport_xp_events
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `user_id` | uuid | FK |
| `xp_amount` | integer | NOT "amount" |
| `event_type` | text | e.g., 'theater-watch', 'lesson-complete', 'first_login' |
| `event_ref` | text | lesson ID, video ID, etc. |
| `description` | text | Human-readable description |
| `created_at` | timestamptz | auto |

### passport_stamps
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `user_id` | uuid | FK |
| `district_id` | text | e.g., 'market-marina' |
| `district_name` | text | e.g., 'Market Marina' |
| `stamp_code` | text | e.g., 'GOLD' — NOT "stamp_image_url" |
| `earned_at` | timestamptz | auto |

### passport_badges
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `user_id` | uuid | FK |
| `badge_id` | text | e.g., 'coast-navigator' |
| `badge_name` | text | e.g., 'Coast Navigator' |
| `earned_at` | timestamptz | auto |

### passport_missions
| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `user_id` | uuid | FK |
| `mission_id` | text | e.g., 'visit-market-marina' |
| `completed_at` | timestamptz | auto |

---

## SECTION 8: LAUNCH SEQUENCE (CONDENSED)

If you've read everything above, this is the execution order in compact form:

```
[ ] 1. Supabase → SQL Editor → Run schema from Section 1
[ ] 2. Supabase → Table Editor → Verify 6 tables exist
[ ] 3. Supabase → Database → Functions → Verify increment_passport_xp exists
[ ] 4. Supabase → Auth → URL Configuration → Set Site URL + Redirect URLs
[ ] 5. Vercel → Settings → Environment Variables → Add all 5 vars
[ ] 6. Vercel → Deployments → Redeploy latest
[ ] 7. Wait for build to show "Ready" (~3 min)
[ ] 8. Test: /passport/login → send magic link → receive email → click link → /passport loads authenticated
[ ] 9. Test: Supabase → Table Editor → passport_profiles → confirm 1 row exists
[ ] 10. Test: /kitchen → AI Coach → send message → confirm streaming response
[ ] 11. Announce
```

---

## WHAT THIS GUIDE DOES NOT COVER

- **Domain connection to Vercel** — Vercel Dashboard → Project → Domains → Add Domain → follow their DNS instructions
- **Stripe re-enable** — see `docs/MONETIZATION_SOURCE_OF_TRUTH.md`
- **Beehiiv email integration** — see `docs/MONETIZATION_SOURCE_OF_TRUTH.md`
- **Custom SMTP for Supabase** — configure in Supabase → Authentication → SMTP Settings
- **Shopify integration** — future, not built
- **Additional AI agents** — see `docs/AI_AGENT_ARCHITECTURE.md`

---

*This guide was generated from the verified codebase at commit `c4e2f1a3`. Column names, env var names, and table structures match the exact code in production.*
