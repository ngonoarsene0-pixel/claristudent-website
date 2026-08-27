/*
# Create subscribers table for newsletter

1. New Tables
- `subscribers`
  - `id` (uuid, primary key, auto-generated)
  - `email` (text, unique, not null) — the subscriber's email address
  - `created_at` (timestamptz, defaults to now) — when they subscribed
2. Security
- Enable RLS on `subscribers`.
- Allow anon + authenticated to INSERT (anyone can subscribe to the newsletter).
- Allow anon + authenticated to SELECT (so the app can check if an email is already subscribed).
- No UPDATE or DELETE from the client — subscription management is admin-only.
3. Notes
- This is a single-tenant, no-auth app. The frontend uses the anon key, so
  policies must include the `anon` role or the app cannot write to the table.
- A unique constraint on `email` prevents duplicate subscriptions.
*/

CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_subscribers" ON subscribers;
CREATE POLICY "anon_select_subscribers" ON subscribers FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_subscribers" ON subscribers;
CREATE POLICY "anon_insert_subscribers" ON subscribers FOR INSERT
  TO anon, authenticated WITH CHECK (true);
