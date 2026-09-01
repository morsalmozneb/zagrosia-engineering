# Zagrosia Timesheet Portal — Supabase Setup

Run this in Supabase SQL Editor (https://supabase.com/dashboard/project/jftemrpvbwfwmztccpon/sql)

```sql
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard/project/jftemrpvbwfwmztccpon/sql)

CREATE TABLE IF NOT EXISTS timesheets (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  period_key text NOT NULL DEFAULT 'default',
  data jsonb NOT NULL DEFAULT '{}',
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, period_key)
);

ALTER TABLE timesheets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own timesheets" ON timesheets
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own timesheets" ON timesheets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own timesheets" ON timesheets
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own timesheets" ON timesheets
  FOR DELETE USING (auth.uid() = user_id);
```
