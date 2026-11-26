import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { publicationConfig } from './publication.js?v=5';
import { loadSupabaseConfig, LETTERS_SQL } from './supabase.js?v=5';

const PUBLIC_KEY = 'bold_publication_public';
const WRITER_KEY = 'bold_letters_writer_key';

let publicClient = null;
let writerClient = null;
let unlocked = false;
let editingId = null;
let letters = [];

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function readSavedPublic() {
  try {
    const saved = JSON.parse(localStorage.getItem(PUBLIC_KEY) || 'null');
    if (saved && saved.url && saved.anonKey) return saved;
  } catch (e) {
    /* ignore broken local config */
  }
  const existing = loadSupabaseConfig();
  if (existing && existing.url && existing.anonKey) return existing;
  return null;
}

function publicConfig() {
  const fromFile = publicationConfig || {};
  if (fromFile.url && fromFile.anonKey) {
    return { url: fromFile.url.trim().replace(/\/+$/, ''), anonKey: fromFile.anonKey.trim() };
  }
  const saved = readSavedPublic();
  if (!saved) return null;
  return { url: saved.url.trim().replace(/\/+$/, ''), anonKey: saved.anonKey.trim() };
}

function makeClient(cfg, writerKey) {
  const options = writerKey
    ? { global: { headers: { 'x-writer-key': writerKey } } }
    : undefined;
  return createClient(cfg.url, cfg.anonKey, options);
}

function formatDate(iso) {
  if (!iso) return '';
  const [year, month, day] = String(iso).slice(0, 10).split('-').map(Number);
  if (!year || !month || !day) return iso;
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC'
  }).toUpperCase();
}

function todayISO() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

function excerptOf(body) {
  const first = String(body || '').split(/\n{2,}/).map(part => part.trim()).find(Boolean) || '';
  const flat = first.replace(/\s+/g, ' ');
  if (flat.length <= 180) return flat;
  return `${flat.slice(0, 177).trim()}…`;
}

function paragraphs(text) {
  return String(text || '')
    .split(/\n{2,}/)
    .map(part => part.trim())
    .filter(Boolean)
    .map(part => `<p>${escapeHtml(part).replace(/\n/g, '<br>')}</p>`)
    .join('');
}

function setStatus(message) {
  const status = document.getElementById('letter-status');
  if (status) status.textContent = message || '';
}

function renderFeed() {
  const feed = document.getElementById('letters-feed');
  if (!feed) return;
  if (!letters.length) {
    feed.innerHTML = '<p class="letters-empty">No letters yet.</p>';
    return;
  }
  feed.innerHTML = letters.map(letter => `
    <button type="button" class="letter-row" data-id="${escapeHtml(letter.id)}">
      <span class="letter-row-date">${escapeHtml(formatDate(letter.published_on))}</span>
      <span>
        <span class="letter-row-title">${escapeHtml(letter.title)}</span>
        <span class="letter-row-excerpt">${escapeHtml(excerptOf(letter.body))}</span>
      </span>
    </button>
  `).join('');
  feed.querySelectorAll('.letter-row').forEach(row => {
    row.addEventListener('click', () => openReader(row.dataset.id));
  });
}

async function loadLetters() {
  const feed = document.getElementById('letters-feed');
  const cfg = publicConfig();
  if (!cfg) {
    if (feed) feed.innerHTML = '<p class="letters-empty">No letters yet.</p>';
    return;
  }
  publicClient = makeClient(cfg);
  const { data, error } = await publicClient
    .from('letters')
    .select('id, title, body, published_on, created_at')
    .order('published_on', { ascending: false })
    .order('created_at', { ascending: false });
  if (error) {
    letters = [];
    if (feed) feed.innerHTML = '<p class="letters-error">The letters could not be loaded.</p>';
    return;
  }
  letters = data || [];
  renderFeed();
}

function openReader(id) {
  const letter = letters.find(item => item.id === id);
  const dialog = document.getElementById('letter-reader');
  if (!letter || !dialog) return;
  document.getElementById('letter-reader-date').textContent = formatDate(letter.published_on);
  document.getElementById('letter-reader-title').textContent = letter.title;
  document.getElementById('letter-reader-body').innerHTML = paragraphs(letter.body);
  const actions = document.getElementById('letter-owner-actions');
  if (actions) actions.hidden = !unlocked;
  dialog.dataset.id = letter.id;
  if (!dialog.open) dialog.showModal();
}

function showCompose(letter) {
  const lock = document.getElementById('letter-lock');
  const compose = document.getElementById('letter-compose');
  const title = document.getElementById('letter-title');
  const body = document.getElementById('letter-body');
  const date = document.getElementById('letter-date');
  const publish = document.getElementById('letter-publish');
  editingId = letter ? letter.id : null;
  if (lock) lock.hidden = true;
  if (compose) compose.hidden = false;
  if (date) date.value = letter ? String(letter.published_on).slice(0, 10) : todayISO();
  if (title) title.value = letter ? letter.title : '';
  if (body) body.value = letter ? letter.body : '';
  if (publish) publish.textContent = letter ? 'Save' : 'Publish';
  setStatus('');
}

function showLock() {
  const lock = document.getElementById('letter-lock');
  const compose = document.getElementById('letter-compose');
  const setup = document.getElementById('letter-setup');
  if (lock) lock.hidden = false;
  if (compose) compose.hidden = true;
  if (setup) setup.hidden = Boolean(publicConfig());
  const saved = readSavedPublic();
  const urlInput = document.getElementById('letter-sb-url');
  const keyInput = document.getElementById('letter-sb-key');
  if (urlInput && !urlInput.value && saved) urlInput.value = saved.url || '';
  if (keyInput && !keyInput.value && saved) keyInput.value = saved.anonKey || '';
  editingId = null;
  setStatus('');
}

function openDesk() {
  const dialog = document.getElementById('letter-desk');
  if (!dialog) return;
  if (unlocked) showCompose(null);
  else showLock();
  if (!dialog.open) dialog.showModal();
}

async function unlockDesk() {
  const cfgFromFile = publicConfig();
  const urlInput = document.getElementById('letter-sb-url');
  const keyInput = document.getElementById('letter-sb-key');
  const passInput = document.getElementById('letter-passphrase');
  const passphrase = passInput ? passInput.value.trim() : '';
  let cfg = cfgFromFile;
  if (!cfg) {
    const url = urlInput ? urlInput.value.trim() : '';
    const anonKey = keyInput ? keyInput.value.trim() : '';
    if (!url || !anonKey) {
      setStatus('Add the Supabase URL and anon key first.');
      return;
    }
    cfg = { url: url.replace(/\/+$/, ''), anonKey };
    localStorage.setItem(PUBLIC_KEY, JSON.stringify(cfg));
  }
  if (!passphrase) {
    setStatus('Enter the writer passphrase.');
    return;
  }
  setStatus('Checking the desk…');
  writerClient = makeClient(cfg, passphrase);
  const { data, error } = await writerClient.rpc('check_writer');
  if (error) {
    writerClient = null;
    const missing = /check_writer|schema cache|function/i.test(error.message || '');
    setStatus(missing
      ? 'Run the letters SQL in Supabase once, and set your passphrase there.'
      : 'The desk could not be opened.');
    return;
  }
  if (!data) {
    writerClient = null;
    setStatus('That passphrase does not match.');
    return;
  }
  localStorage.setItem(WRITER_KEY, passphrase);
  if (passInput) passInput.value = '';
  unlocked = true;
  publicClient = makeClient(cfg);
  showCompose(null);
  setStatus('');
  loadLetters();
}

async function saveLetter(event) {
  event.preventDefault();
  if (!writerClient) {
    setStatus('Unlock the desk before publishing.');
    return;
  }
  const title = document.getElementById('letter-title').value.trim();
  const body = document.getElementById('letter-body').value.trim();
  const publishedOn = document.getElementById('letter-date').value;
  if (!title || !body || !publishedOn) {
    setStatus('A letter needs a date, a title, and the writing.');
    return;
  }
  setStatus(editingId ? 'Saving…' : 'Publishing…');
  const payload = {
    title,
    body,
    published_on: publishedOn,
    updated_at: new Date().toISOString()
  };
  const query = editingId
    ? writerClient.from('letters').update(payload).eq('id', editingId)
    : writerClient.from('letters').insert(payload);
  const { error } = await query;
  if (error) {
    setStatus('That did not save. The database only accepts the writer passphrase.');
    return;
  }
  document.getElementById('letter-desk').close();
  editingId = null;
  await loadLetters();
}

async function deleteOpenLetter() {
  const dialog = document.getElementById('letter-reader');
  const id = dialog ? dialog.dataset.id : '';
  const letter = letters.find(item => item.id === id);
  if (!letter || !writerClient) return;
  if (!confirm(`Delete “${letter.title}”?`)) return;
  const { error } = await writerClient.from('letters').delete().eq('id', id);
  if (error) return;
  dialog.close();
  await loadLetters();
}

function bindDialog(dialog) {
  if (!dialog) return;
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
}

async function restoreWriter() {
  const cfg = publicConfig();
  const savedKey = localStorage.getItem(WRITER_KEY);
  if (!cfg || !savedKey) return;
  const client = makeClient(cfg, savedKey);
  const { data, error } = await client.rpc('check_writer');
  if (error || !data) {
    localStorage.removeItem(WRITER_KEY);
    return;
  }
  writerClient = client;
  unlocked = true;
}

export function initLetters() {
  const sql = document.getElementById('letter-sql');
  if (sql) sql.textContent = LETTERS_SQL;
  document.getElementById('letters-write-btn')?.addEventListener('click', openDesk);
  document.getElementById('letter-close')?.addEventListener('click', () => {
    document.getElementById('letter-reader')?.close();
  });
  document.getElementById('letter-desk-close')?.addEventListener('click', () => {
    document.getElementById('letter-desk')?.close();
  });
  document.getElementById('letter-unlock')?.addEventListener('click', unlockDesk);
  document.getElementById('letter-passphrase')?.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      unlockDesk();
    }
  });
  document.getElementById('letter-form')?.addEventListener('submit', saveLetter);
  document.getElementById('letter-edit')?.addEventListener('click', () => {
    const id = document.getElementById('letter-reader')?.dataset.id;
    const letter = letters.find(item => item.id === id);
    document.getElementById('letter-reader')?.close();
    const desk = document.getElementById('letter-desk');
    if (!letter || !desk) return;
    showCompose(letter);
    if (!desk.open) desk.showModal();
  });
  document.getElementById('letter-delete')?.addEventListener('click', deleteOpenLetter);
  bindDialog(document.getElementById('letter-reader'));
  bindDialog(document.getElementById('letter-desk'));
  restoreWriter().finally(loadLetters);
}
