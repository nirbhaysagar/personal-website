// ============================================================================
// SUPABASE CLOUD DATABASE SYNC ENGINE
// Zero-downtime, offline-first cloud persistence for Bold Personal OS
// ============================================================================

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const CONFIG_KEY = 'bold_supabase_credentials';

export const SQL_SCHEMA = `-- Supabase Schema for Personal Operating System (Bold OS)
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

-- Enable Row Level Security (RLS) with public access via Anon Key
alter table public.daily_logs enable row level security;
alter table public.target_milestones enable row level security;

create policy "Allow anon access to daily_logs" on public.daily_logs
  for all using (true) with check (true);

create policy "Allow anon access to target_milestones" on public.target_milestones
  for all using (true) with check (true);
`;

let client = null;
let currentConfig = null;

export function loadSupabaseConfig() {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse Supabase config:', e);
    return null;
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
