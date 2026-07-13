import { supabase } from './supabase'

// ═══════════════════════════════════════════════════════════
// Key-value wrappers around quiz_state table
// All calls are try/catch wrapped; a missing key returns null.
// ═══════════════════════════════════════════════════════════

export async function dbGet(key) {
  if (!supabase) return null
  try {
    const { data, error } = await supabase
      .from('quiz_state')
      .select('value')
      .eq('key', key)
      .maybeSingle()
    if (error) { console.warn('dbGet error:', key, error.message); return null }
    return data ? data.value : null
  } catch (e) {
    console.warn('dbGet exception:', key, e)
    return null
  }
}

export async function dbSet(key, value) {
  if (!supabase) return false
  try {
    const { error } = await supabase
      .from('quiz_state')
      .upsert(
        { key, value, updated_at: new Date().toISOString() },
        { onConflict: 'key' }
      )
    if (error) { console.warn('dbSet error:', key, error.message); return false }
    return true
  } catch (e) {
    console.warn('dbSet exception:', key, e)
    return false
  }
}

export async function dbDelete(key) {
  if (!supabase) return
  try {
    await supabase.from('quiz_state').delete().eq('key', key)
  } catch (e) {
    console.warn('dbDelete exception:', key, e)
  }
}

// ═══════════════════════════════════════════════════════════
// Realtime subscription helper
// ═══════════════════════════════════════════════════════════

export function subscribeToQuizState(onChange, onStatus) {
  if (!supabase) return () => {}

  const channel = supabase
    .channel('quiz-sync')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'quiz_state' },
      () => onChange()
    )
    .subscribe((status) => {
      if (onStatus) onStatus(status)
    })

  return () => {
    supabase.removeChannel(channel)
  }
}
