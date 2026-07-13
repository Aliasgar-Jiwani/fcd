-- ═══════════════════════════════════════════════════════════
-- CLASSROOM QUIZ — Supabase Table Setup
-- Run this in: Supabase Dashboard → SQL Editor
-- ═══════════════════════════════════════════════════════════

-- 1. Create the key-value table
CREATE TABLE IF NOT EXISTS quiz_state (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Enable Row Level Security (required by Supabase)
ALTER TABLE quiz_state ENABLE ROW LEVEL SECURITY;

-- 3. Allow public read/write (no login needed for quiz)
CREATE POLICY "Allow public read"
  ON quiz_state FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert"
  ON quiz_state FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update"
  ON quiz_state FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete"
  ON quiz_state FOR DELETE
  USING (true);

-- 4. Enable Realtime for this table
ALTER PUBLICATION supabase_realtime ADD TABLE quiz_state;

-- Done! Your quiz app is ready to use.
