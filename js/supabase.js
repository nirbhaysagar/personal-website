// ============================================================================
// SUPABASE CLOUD DATABASE SYNC ENGINE
// Zero-downtime, offline-first cloud persistence for Bold Personal OS
// ============================================================================

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const CONFIG_KEY = 'bold_supabase_credentials';

const SQL_SCHEMA_BASE = `-- Supabase Schema for Personal Operating System (Bold OS)
-- Run this in your Supabase Project -> SQL Editor

create table if not exists public.daily_logs (
  id text primary key,
  title text not null,
  text text,
  discipline text default 'software-craft',
  tags jsonb default '[]'::jsonb,
  code_snippet text,
  cross_bridge text,
  feynman_mastery jsonb default '{"explain": false, "code": false, "edges": false}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.target_milestones (
  id text primary key,
  completed boolean default false,
  updated_at timestamptz default now()
);

create table if not exists public.journal_entries (
  id text primary key,
  title text not null,
  slug text not null,
  type text not null,
  category text not null,
  excerpt text,
  content jsonb,
  tags jsonb default '[]'::jsonb,
  reading_time text,
  status text default 'published',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable Row Level Security (RLS) with public access via Anon Key
alter table public.daily_logs enable row level security;
alter table public.target_milestones enable row level security;
alter table public.journal_entries enable row level security;

create policy "Allow anon access to daily_logs" on public.daily_logs
  for all using (true) with check (true);

create policy "Allow anon access to target_milestones" on public.target_milestones
  for all using (true) with check (true);

create policy "Allow anon access to journal_entries" on public.journal_entries
  for all using (true) with check (true);
`;

export const LETTERS_SQL = `-- Letters: anyone can read, only the writer passphrase can publish or edit.
create table if not exists public.letters (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  published_on date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists letters_published_on_idx
  on public.letters (published_on desc, created_at desc);

create table if not exists public.site_secrets (
  id integer primary key,
  writer_key text not null
);

alter table public.letters enable row level security;
alter table public.site_secrets enable row level security;
revoke all on table public.site_secrets from anon, authenticated;

create or replace function public.writer_ok()
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  expected text;
  provided text;
  headers json;
begin
  select writer_key into expected from public.site_secrets where id = 1;
  begin
    headers := current_setting('request.headers', true)::json;
  exception when others then
    headers := '{}'::json;
  end;
  provided := coalesce(
    headers->>'x-writer-key',
    nullif(current_setting('request.header.x-writer-key', true), ''),
    ''
  );
  return expected is not null and provided <> '' and provided = expected;
end;
$$;

create or replace function public.check_writer()
returns boolean
language sql
security definer
set search_path = public
as $$
  select public.writer_ok();
$$;

grant execute on function public.check_writer() to anon, authenticated;
grant select, insert, update, delete on table public.letters to anon, authenticated;

drop policy if exists "Anyone can read letters" on public.letters;
create policy "Anyone can read letters"
  on public.letters for select
  using (true);

drop policy if exists "Writer can publish letters" on public.letters;
create policy "Writer can publish letters"
  on public.letters for insert
  with check (public.writer_ok());

drop policy if exists "Writer can revise letters" on public.letters;
create policy "Writer can revise letters"
  on public.letters for update
  using (public.writer_ok())
  with check (public.writer_ok());

drop policy if exists "Writer can remove letters" on public.letters;
create policy "Writer can remove letters"
  on public.letters for delete
  using (public.writer_ok());

-- Set your own passphrase. Do not commit the real one.
-- insert into public.site_secrets (id, writer_key)
-- values (1, 'your-long-private-passphrase')
-- on conflict (id) do update set writer_key = excluded.writer_key;
`;

export const SQL_SCHEMA = `${SQL_SCHEMA_BASE}\n${LETTERS_SQL}`;

let client = null;
let currentConfig = null;

export function loadSupabaseConfig() {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (!raw) return { url: '', anonKey: '' };
    return JSON.parse(raw) || { url: '', anonKey: '' };
  } catch (e) {
    console.error('Failed to parse Supabase config:', e);
    return { url: '', anonKey: '' };
  }
}

export function saveSupabaseConfig(url, anonKey) {
  if (!url || !anonKey) {
    localStorage.removeItem(CONFIG_KEY);
    client = null;
    currentConfig = null;
    return;
  }
  const cleanUrl = url.trim().replace(/\/+$/, '');
  const cleanKey = anonKey.trim();
  currentConfig = { url: cleanUrl, anonKey: cleanKey };
  localStorage.setItem(CONFIG_KEY, JSON.stringify(currentConfig));
  client = createClient(cleanUrl, cleanKey);
}

export function isSupabaseConnected() {
  return client !== null;
}

export async function initSupabase() {
  const config = loadSupabaseConfig();
  if (config && config.url && config.anonKey) {
    try {
      client = createClient(config.url, config.anonKey);
      currentConfig = config;
      return true;
    } catch (e) {
      console.warn('Failed to initialize Supabase client:', e);
      client = null;
      return false;
    }
  }
  return false;
}

// ----------------------------------------------------------------------------
// DATA SYNC OPERATIONS
// ----------------------------------------------------------------------------

export async function fetchCloudDailyLogs() {
  if (!client) return null;
  try {
    const { data, error } = await client
      .from('daily_logs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetch daily_logs error:', error);
      return null;
    }
    return data || [];
  } catch (err) {
    console.error('Network error fetching from Supabase:', err);
    return null;
  }
}

export async function upsertCloudDailyLog(log) {
  if (!client) return;
  try {
    const payload = {
      id: log.id,
      title: log.title || 'Untitled Thought',
      text: log.learned || log.text || '',
      discipline: log.discipline || 'software-craft',
      tags: Array.isArray(log.tags) ? log.tags : [],
      code_snippet: log.codeSnippet || log.code_snippet || '',
      cross_bridge: log.crossDomainBridge || log.cross_bridge || '',
      feynman_mastery: log.feynmanMastery || log.feynman_mastery || { explain: false, code: false, edges: false },
      updated_at: new Date().toISOString()
    };
    const { error } = await client
      .from('daily_logs')
      .upsert(payload, { onConflict: 'id' });

    if (error) console.error('Supabase upsert daily_log error:', error);
  } catch (err) {
    console.error('Network error saving log to Supabase:', err);
  }
}

export async function deleteCloudDailyLog(logId) {
  if (!client) return;
  try {
    const { error } = await client
      .from('daily_logs')
      .delete()
      .eq('id', logId);

    if (error) console.error('Supabase delete daily_log error:', error);
  } catch (err) {
    console.error('Network error deleting log in Supabase:', err);
  }
}

export async function fetchCloudMilestones() {
  if (!client) return null;
  try {
    const { data, error } = await client
      .from('target_milestones')
      .select('*');

    if (error) {
      console.error('Supabase fetch target_milestones error:', error);
      return null;
    }
    const map = {};
    (data || []).forEach(row => {
      map[row.id] = row.completed;
    });
    return map;
  } catch (err) {
    console.error('Network error fetching milestones from Supabase:', err);
    return null;
  }
}

export async function upsertCloudMilestone(milestoneId, completed) {
  if (!client) return;
  try {
    const { error } = await client
      .from('target_milestones')
      .upsert({
        id: milestoneId,
        completed: Boolean(completed),
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });

    if (error) console.error('Supabase upsert milestone error:', error);
  } catch (err) {
    console.error('Network error updating milestone in Supabase:', err);
  }
}

// ============================================================================
// JOURNAL ENTRIES CLOUD CRUD
// ============================================================================

export async function fetchCloudJournalEntries() {
  if (!client) return null;
  try {
    const { data, error } = await client
      .from('journal_entries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch journal_entries notice:', error);
      return null;
    }
    return (data || []).map(row => ({
      id: row.id,
      number: row.number || row.id.replace('j-', ''),
      title: row.title,
      slug: row.slug,
      type: row.type,
      category: row.category,
      date: row.date || (row.created_at ? row.created_at.split('T')[0] : new Date().toISOString().split('T')[0]),
      displayDate: row.display_date || row.displayDate || '25 NOV 2026',
      readingTime: row.reading_time || row.readingTime || '4 min read',
      excerpt: row.excerpt || '',
      sections: typeof row.content === 'object' && row.content !== null ? row.content : {
        question: '',
        observation: '',
        exploration: typeof row.content === 'string' ? row.content : '',
        conclusion: ''
      },
      related: Array.isArray(row.tags) ? row.tags : [],
      status: row.status || 'published'
    }));
  } catch (err) {
    console.error('Network error fetching journal entries from Supabase:', err);
    return null;
  }
}

export async function upsertCloudJournalEntry(entry) {
  if (!client || !entry) return;
  try {
    const payload = {
      id: entry.id,
      title: entry.title,
      slug: entry.slug || entry.id,
      type: entry.type || 'thought',
      category: entry.category || 'Learning',
      excerpt: entry.excerpt || '',
      content: entry.sections || {},
      tags: entry.related || [],
      reading_time: entry.readingTime || '4 min read',
      status: entry.status || 'published',
      updated_at: new Date().toISOString()
    };
    const { error } = await client
      .from('journal_entries')
      .upsert(payload, { onConflict: 'id' });

    if (error) console.error('Supabase upsert journal entry error:', error);
  } catch (err) {
    console.error('Network error updating journal entry in Supabase:', err);
  }
}

export async function deleteCloudJournalEntry(entryId) {
  if (!client || !entryId) return;
  try {
    const { error } = await client
      .from('journal_entries')
      .delete()
      .eq('id', entryId);

    if (error) console.error('Supabase delete journal entry error:', error);
  } catch (err) {
    console.error('Network error deleting journal entry in Supabase:', err);
  }
}

export async function testConnection(url, anonKey) {
  try {
    const testClient = createClient(url.trim().replace(/\/+$/, ''), anonKey.trim());
    const { data, error } = await testClient
      .from('daily_logs')
      .select('id')
      .limit(1);

    if (error && error.code === '42P01') {
      // Table doesn't exist yet, but connection is valid!
      return { success: true, needsSchema: true };
    }
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, needsSchema: false };
  } catch (err) {
    return { success: false, error: err.message || 'Connection failed' };
  }
}
