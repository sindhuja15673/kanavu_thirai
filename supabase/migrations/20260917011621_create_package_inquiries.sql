/*
# Create package_inquiries table

1. New Tables
- `package_inquiries`
  - `id` (uuid, primary key)
  - `package_name` (text, which package the inquiry is about: Silver/Gold/Platinum)
  - `name` (text, customer's full name)
  - `phone` (text, customer's phone number)
  - `email` (text, customer's email address)
  - `event_name` (text, name/type of the event)
  - `message` (text, optional additional message)
  - `created_at` (timestamptz, when the inquiry was submitted)

2. Security
- Enable RLS on `package_inquiries`.
- Allow anon + authenticated to INSERT (public form submissions, no sign-in required).
- No SELECT/UPDATE/DELETE for anon — only the site owner should see inquiries via the Supabase dashboard.
*/

CREATE TABLE IF NOT EXISTS package_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  package_name text NOT NULL,
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  event_name text NOT NULL,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE package_inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_inquiries" ON package_inquiries;
CREATE POLICY "anon_insert_inquiries" ON package_inquiries FOR INSERT
  TO anon, authenticated WITH CHECK (true);