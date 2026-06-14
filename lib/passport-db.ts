import { createServerClient } from './supabase'
import { getLevelFromXP, PASSPORT_BADGES, PASSPORT_MISSIONS } from './passport'
import type { District } from './districts'

export interface PassportRow {
  id: string
  user_id: string
  username: string | null
  display_name: string | null
  xp: number
  level: string
  created_at: string
  updated_at: string
}

export interface PassportFull {
  profile: PassportRow
  stamps: string[]          // district IDs
  badges: string[]          // badge IDs
  missions: string[]        // mission IDs
  xpEvents: Array<{ event_type: string; xp_amount: number; description: string; created_at: string }>
}

// ── Create or fetch passport profile ─────────────────────────
export async function getOrCreatePassport(userId: string, email: string): Promise<PassportRow> {
  const supabase = createServerClient()

  const { data: existing } = await supabase
    .from('passport_profiles')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (existing) return existing as PassportRow

  // Generate a username from email
  const base = email.split('@')[0].replace(/[^a-z0-9]/gi, '').toLowerCase().slice(0, 16)
  const username = `${base}${Math.floor(Math.random() * 9000) + 1000}`

  const { data: created, error } = await supabase
    .from('passport_profiles')
    .insert({ user_id: userId, username, display_name: username, xp: 0, level: 'Recruit' })
    .select('*')
    .single()

  if (error) throw new Error(`Failed to create passport: ${error.message}`)

  // Award first-step XP
  await awardXP(userId, 50, 'first_login', 'account_created', 'Welcome to the Scott-King Coast!')

  return created as PassportRow
}

// ── Collect a district stamp ──────────────────────────────────
export async function collectStamp(userId: string, district: District): Promise<{ alreadyHad: boolean; xpAwarded: number }> {
  const supabase = createServerClient()

  const { data: existing } = await supabase
    .from('passport_stamps')
    .select('id')
    .eq('user_id', userId)
    .eq('district_id', district.id)
    .single()

  if (existing) return { alreadyHad: true, xpAwarded: 0 }

  const { error } = await supabase
    .from('passport_stamps')
    .insert({
      user_id: userId,
      district_id: district.id,
      district_name: district.name,
      stamp_code: district.passportStamp,
    })

  if (error) throw new Error(`Failed to collect stamp: ${error.message}`)

  await awardXP(userId, 50, 'visit_district', district.id, `Visited ${district.name}`)

  // Check if all stamps collected
  const { count } = await supabase
    .from('passport_stamps')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)

  if (count === 9) {
    await awardXP(userId, 500, 'complete_mission', 'complete_coast_tour', 'Completed the full Coast Tour!')
    await awardBadge(userId, 'coast-captain', 'Coast Captain')
    await completeMission(userId, 'complete-coast-tour')
  }

  // Check visit mission
  await completeMission(userId, `visit-${district.id}`)

  // Auto-award badges based on district
  if (district.id === 'market-marina')  await awardBadge(userId, 'market-reader', 'Market Reader')
  if (district.id === 'route-harbor')   await awardBadge(userId, 'route-runner', 'Route Runner')
  if (district.id === 'flavor-district') await awardBadge(userId, 'flavor-certified', 'Flavor Certified')
  if (district.id === 'blueprint-bay')  await awardBadge(userId, 'blueprint-builder', 'Blueprint Builder')
  if (district.id === 'fantasy-island') await awardBadge(userId, 'fantasy-legend', 'Fantasy Legend')
  if (district.id === 'library-vault')  await awardBadge(userId, 'vault-keeper', 'Vault Keeper')
  if (district.id === 'legacy-point')   await awardBadge(userId, 'legacy-student', 'Legacy Student')

  // Navigator badge at 3 stamps
  if ((count ?? 0) >= 3) await awardBadge(userId, 'coast-navigator', 'Coast Navigator')

  return { alreadyHad: false, xpAwarded: 50 }
}

// ── Award XP ──────────────────────────────────────────────────
export async function awardXP(
  userId: string,
  amount: number,
  eventType: string,
  eventRef: string,
  description: string,
): Promise<void> {
  const supabase = createServerClient()

  await supabase.from('passport_xp_events').insert({
    user_id: userId,
    xp_amount: amount,
    event_type: eventType,
    event_ref: eventRef,
    description,
  })

  await supabase.rpc('increment_passport_xp', { p_user_id: userId, p_amount: amount })
    .then(async ({ error }) => {
      if (error) {
        // Fallback: manual increment
        const { data: profile } = await supabase
          .from('passport_profiles')
          .select('xp')
          .eq('user_id', userId)
          .single()

        const newXP = (profile?.xp ?? 0) + amount
        const newLevel = getLevelFromXP(newXP)
        await supabase
          .from('passport_profiles')
          .update({ xp: newXP, level: newLevel, updated_at: new Date().toISOString() })
          .eq('user_id', userId)
      }
    })

  // Check for Legend badge
  const { data: profile } = await supabase
    .from('passport_profiles')
    .select('xp')
    .eq('user_id', userId)
    .single()

  if (profile && profile.xp >= 6000) {
    await awardBadge(userId, 'founder', 'Founder Status')
  }
}

// ── Award a badge (idempotent) ────────────────────────────────
export async function awardBadge(userId: string, badgeId: string, badgeName: string): Promise<void> {
  const supabase = createServerClient()
  await supabase.from('passport_badges').upsert(
    { user_id: userId, badge_id: badgeId, badge_name: badgeName },
    { onConflict: 'user_id,badge_id', ignoreDuplicates: true }
  )
}

// ── Complete a mission (idempotent) ───────────────────────────
export async function completeMission(userId: string, missionId: string): Promise<void> {
  const supabase = createServerClient()
  await supabase.from('passport_missions').upsert(
    { user_id: userId, mission_id: missionId },
    { onConflict: 'user_id,mission_id', ignoreDuplicates: true }
  )
}

// ── Get full passport data ────────────────────────────────────
export async function getFullPassport(userId: string): Promise<PassportFull | null> {
  const supabase = createServerClient()

  const [profileRes, stampsRes, badgesRes, missionsRes, xpRes] = await Promise.all([
    supabase.from('passport_profiles').select('*').eq('user_id', userId).single(),
    supabase.from('passport_stamps').select('district_id').eq('user_id', userId),
    supabase.from('passport_badges').select('badge_id').eq('user_id', userId),
    supabase.from('passport_missions').select('mission_id').eq('user_id', userId),
    supabase.from('passport_xp_events').select('event_type,xp_amount,description,created_at').eq('user_id', userId).order('created_at', { ascending: false }).limit(10),
  ])

  if (!profileRes.data) return null

  return {
    profile: profileRes.data as PassportRow,
    stamps: (stampsRes.data ?? []).map((r: { district_id: string }) => r.district_id),
    badges: (badgesRes.data ?? []).map((r: { badge_id: string }) => r.badge_id),
    missions: (missionsRes.data ?? []).map((r: { mission_id: string }) => r.mission_id),
    xpEvents: (xpRes.data ?? []) as PassportFull['xpEvents'],
  }
}

// ── Get public passport by username ──────────────────────────
export async function getPassportByUsername(username: string): Promise<PassportFull | null> {
  const supabase = createServerClient()
  const { data: profile } = await supabase
    .from('passport_profiles')
    .select('*')
    .eq('username', username)
    .single()
  if (!profile) return null
  return getFullPassport(profile.user_id)
}

// ── Validate JWT and return user_id ──────────────────────────
export async function validateToken(token: string): Promise<string | null> {
  const supabase = createServerClient()
  const { data: { user }, error } = await supabase.auth.getUser(token)
  if (error || !user) return null
  return user.id
}
