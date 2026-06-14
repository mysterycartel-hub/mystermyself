import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Lazy singleton — only initializes when first called, avoids build-time crash
// when env vars are not set.
let _client: SupabaseClient | null = null
let _serverClient: SupabaseClient | null = null

export function getSupabaseClient(): SupabaseClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) {
      throw new Error(
        'Supabase not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local'
      )
    }
    _client = createClient(url, key)
  }
  return _client
}

// Server-side client (service role) — call only from API routes / server components
export function createServerClient(): SupabaseClient {
  if (!_serverClient) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) {
      throw new Error(
        'Supabase server client not configured. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local'
      )
    }
    _serverClient = createClient(url, key, { auth: { persistSession: false } })
  }
  return _serverClient
}
