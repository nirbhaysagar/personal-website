import { initialData } from './data.js';
import { renderCrossStitchSVG } from './stitch-font.js';

// ============================================================================
// APP LOGIC: BOLD EDITORIAL BLUEPRINT & LOCAL DATA CONTROLLER
// ============================================================================

const STORAGE_KEYS = {
  DAILY_LOGS: 'bold_daily_logs_v3',
  BUCKET_LIST: 'bold_bucket_list_v3',
  TARGET_MILESTONES: 'bold_target_milestones_v1'
};

// Initialize milestone states from localStorage if previously stored
const savedMilestones = loadStored(STORAGE_KEYS.TARGET_MILESTONES, {});
if (initialData.septemberTargets) {
  initialData.septemberTargets.forEach(t => {
    if (t.milestones) {
      t.milestones.forEach(m => {
        if (savedMilestones[m.id] !== undefined) {
          m.completed = savedMilestones[m.id];
        }
      });
    }
  });
}

function normalizeDailyLogs(logs) {
  return (logs || []).map(l => {
    let tags = [];
    if (Array.isArray(l.tags) && l.tags.length > 0) {
      tags = l.tags;
    } else if (l.tag) {
      tags = l.tag.split(/[,/&]+/).map(s => s.trim().toLowerCase().replace(/\s+/g, '-')).filter(Boolean);
    } else if (l.category) {
      tags = [l.category.trim().toLowerCase().replace(/\s+/g, '-')];
    }
    return {
      id: l.id || 'log-' + Date.now(),
      date: l.date || new Date().toISOString().split('T')[0],
      title: l.title || '',
      learned: l.learned || '',
      tags: tags.length > 0 ? tags : ['general']
    };
  });
}

let state = {
  profile: initialData.profile,
  projects: initialData.projects,
  septemberTargets: initialData.septemberTargets,
  fiveYearHorizon: initialData.fiveYearHorizon,
  bucketList: loadStored(STORAGE_KEYS.BUCKET_LIST, initialData.bucketList),
  dailyLogs: normalizeDailyLogs(loadStored(STORAGE_KEYS.DAILY_LOGS, initialData.dailyLogs)),
  activeLogTag: 'ALL'
};

let activePulledFolderId = 'target-sep-05'; // Lumen AI memory spec opened by default

function loadStored(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn('Storage read failed:', e);
    return fallback;
  }
}

function saveStored(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('Storage write failed:', e);
  }
}

// ----------------------------------------------------------------------------
// RENDER TARGETS: TACTILE FILING FOLDER DECK WITH POP-OUT DOSSIERS
// ----------------------------------------------------------------------------

function renderTactileArtifact(t, idx) {
  if (t.id === 'target-sep-05') {
    // 1. Lumen AI Memory: Cobalt Blue Spiral Notebook Sheet (Reference 4)
    return `
      <div class="artifact-spiral-sheet">
        <div class="spiral-holes" aria-hidden="true">
          <div class="spiral-ring"></div>
          <div class="spiral-ring"></div>
          <div class="spiral-ring"></div>
          <div class="spiral-ring"></div>
          <div class="spiral-ring"></div>
        </div>
        <div class="artifact-spiral-title">LUMEN // 3-TIER MEMORY SPEC</div>
        <div class="spiral-tier-block">
          <span class="spiral-tier-label">TIER 1 // RAW EVENT STREAM:</span>
          Append-only chronological log of conversation turns, user inputs, and episodic context.
        </div>
        <div class="spiral-tier-block">
          <span class="spiral-tier-label">TIER 2 // CANONICAL SYNTHESIS:</span>
          Offline consolidation worker clustering entities, beliefs, and core persona state into structured JSON.
        </div>
        <div class="spiral-tier-block">
          <span class="spiral-tier-label">TIER 3 // VECTOR RETRIEVAL:</span>
          PostgreSQL + pgvector with HNSW index. Cosine distance query with sub-25ms response.
        </div>
        <span class="spiral-hand-note">* HNSW recall 99.2% on 100k test memory vectors &bull; latency &lt; 20ms</span>
      </div>
    `;
  } else if (t.id === 'target-sep-01') {
    // 2. Orbit User Acquisition: Lanyard ID Badge & Barcode (Reference 4)
    return `
      <div class="artifact-badge-card">
        <div class="lanyard-slot" aria-hidden="true"></div>
        <div class="badge-header">
          <span class="badge-org">ORBIT // GTM</span>
          <span class="spec-status-stamp">[VERIFIED]</span>
        </div>
        <div class="badge-barcode">||| | |||| || ||| |||||</div>
        <div class="badge-details">
          <div><strong>OPERATOR:</strong> BOLD (CMO)</div>
          <div><strong>MISSION:</strong> 400 ACTIVE D2C STORES</div>
          <div><strong>CHANNEL:</strong> SHOPIFY + DIRECT FOUNDER DM</div>
        </div>
        <svg class="badge-runner-doodle" viewBox="0 0 80 45" fill="none" stroke="#1a1a1a" stroke-width="2.5" stroke-linecap="round">
          <circle cx="20" cy="12" r="5"/>
          <path d="M 20 17 L 22 28 L 32 32 M 22 28 L 14 38 M 20 20 L 10 24 M 20 20 L 30 18"/>
          <circle cx="60" cy="12" r="5"/>
          <path d="M 60 17 L 58 28 L 48 32 M 58 28 L 66 38 M 60 20 L 70 24 M 60 20 L 50 18"/>
        </svg>
      </div>
    `;
  } else if (t.id === 'target-sep-02') {
    // 3. Orbit Conversion: Graph Paper Memo & Funnel Sketch (Reference 2)
    return `
      <div class="artifact-graph-sheet">
        <div class="washi-tape-strip" aria-hidden="true"></div>
        <div style="font-family: var(--font-heading); font-size: 11px; font-weight: 700; margin-bottom: 12px; color: #1a1a1a; letter-spacing: 0.04em;">
          ONBOARDING DROP-OFF AUDIT
        </div>
        <div class="funnel-bar-item">
          <span style="min-width: 90px;">01. LANDING:</span>
          <div class="funnel-bar-track"><div class="funnel-bar-fill" style="width: 100%;"></div></div>
          <span>100%</span>
        </div>
        <div class="funnel-bar-item">
          <span style="min-width: 90px;">02. AUTH STORE:</span>
          <div class="funnel-bar-track"><div class="funnel-bar-fill" style="width: 68%;"></div></div>
          <span>68%</span>
        </div>
        <div class="funnel-bar-item">
          <span style="min-width: 90px;">03. SETUP WIZARD:</span>
          <div class="funnel-bar-track"><div class="funnel-bar-fill" style="width: 42%;"></div></div>
          <span>42%</span>
        </div>
        <div class="funnel-bar-item">
          <span style="min-width: 90px;">04. ACTIVE SYNC:</span>
          <div class="funnel-bar-track"><div class="funnel-bar-fill" style="width: 28%;"></div></div>
          <span>28%</span>
        </div>
        <span style="font-family: 'Caveat', cursive; font-size: 1.15rem; color: #2e5c38; display: block; margin-top: 10px;">
          * Step 2 drop-off reduced by 14% after removing optional tax ID requirement!
        </span>
      </div>
    `;
  } else if (t.id === 'target-sep-03') {
    // 4. Distribution: Cassette Tape Card (Reference 1)
    return `
      <div class="artifact-cassette-card">
        <div class="cassette-body">
          <div class="cassette-label-strip">
            Unheard tracks // AI systems logs
          </div>
          <div class="cassette-spools">
            <div class="spool-hole"></div>
            <span style="font-family: var(--font-mono); font-size: 9px; font-weight: 700; letter-spacing: 2px;">SIDE A</span>
            <div class="spool-hole"></div>
          </div>
          <div style="font-family: var(--font-mono); font-size: 0.76rem; color: #bbb; text-align: center;">
            3x Weekly Architecture Essays &bull; X Audience 114 &rarr; 300+
          </div>
        </div>
      </div>
    `;
  } else {
    // 5. Merchant QA: Inspection Matrix Ticket with Binder Clip (Reference 1 & 3)
    return `
      <div class="artifact-qa-sheet">
        <svg class="binder-clip-graphic" viewBox="0 0 40 50" fill="none" aria-hidden="true">
          <path d="M 12 18 C 12 6, 28 6, 28 18" stroke="#888888" stroke-width="2.5" fill="none"/>
          <path d="M 16 18 C 16 10, 24 10, 24 18" stroke="#aaaaaa" stroke-width="1.8" fill="none"/>
          <polygon points="6,18 34,18 30,42 10,42" fill="#1a1a1a"/>
          <line x1="8" y1="20" x2="32" y2="20" stroke="#444" stroke-width="1.5"/>
        </svg>

        <div style="font-family: var(--font-heading); font-size: 11px; font-weight: 700; margin-bottom: 10px; color: #1a1a1a; letter-spacing: 0.04em;">
          CHECKOUT QA AUDIT TICKET
        </div>
        <div style="font-family: var(--font-mono); font-size: 0.78rem; line-height: 1.6; color: #333;">
          &bull; Multi-currency checkout precision: <strong>PASS (100%)</strong><br>
          &bull; Discount code apportioning: <strong>PASS (0 error)</strong><br>
          &bull; 50 simulated customer carts: <strong>SYNCED</strong><br>
          &bull; Concurrent webhook load test: <strong>QUEUED</strong>
        </div>
        <div class="qa-stamp-circle">[QA INSPECTION // APPROVED]</div>
      </div>
    `;
  }
}

function renderSeptemberTargets() {
  const container = document.getElementById('targets-list');
  const daysLeftEl = document.getElementById('sep-days-left');
  const monthElapsedEl = document.getElementById('sep-month-elapsed');
  const avgProgressEl = document.getElementById('sep-avg-progress');

  const now = new Date();
  const sepTotalDays = 30;
  const currentDay = Math.min(Math.max(now.getDate(), 1), 30);
  const daysLeft = Math.max(0, sepTotalDays - currentDay);
  const elapsedPercent = Math.round((currentDay / sepTotalDays) * 100);

  const totalProg = state.septemberTargets.reduce((acc, t) => {
    const pct = Math.min(100, Math.round((t.currentValue / t.targetValue) * 100));
    return acc + pct;
  }, 0);
  const avgProgress = Math.round(totalProg / state.septemberTargets.length);

  if (daysLeftEl) daysLeftEl.textContent = `${daysLeft}`;
  if (monthElapsedEl) monthElapsedEl.textContent = `${elapsedPercent}%`;
  if (avgProgressEl) avgProgressEl.textContent = `${avgProgress}%`;

  if (!container) return;

  const tabOffsets = [
    '16px',
    'calc(16px + 18%)',
    'calc(16px + 36%)',
    'calc(16px + 54%)',
    'calc(16px + 72%)'
  ];

  container.innerHTML = state.septemberTargets.map((t, idx) => {
    const pct = Math.min(100, Math.round((t.currentValue / t.targetValue) * 100));
    const formattedDeadline = t.deadline ? t.deadline.replace('2026-', 'Sep ') : 'Sep 30';
    const isPulled = activePulledFolderId === t.id;
    const tabOffset = tabOffsets[idx] || '16px';

    // 20-segment architectural precision gauge
    const totalBlocks = 20;
    const filledBlocks = Math.round((pct / 100) * totalBlocks);
    const meterBlocks = Array.from({ length: totalBlocks }, (_, i) => 
      `<span class="spec-tick ${i < filledBlocks ? 'filled' : ''}"></span>`
    ).join('');

    // Milestones checklist items
    const milestones = t.milestones || [];
    const completedCount = milestones.filter(m => m.completed).length;
    const milestonesHtml = milestones.map(m => `
      <li class="dossier-check-item ${m.completed ? 'completed' : ''}" data-target-id="${t.id}" data-milestone-id="${m.id}">
        <span class="dossier-check-box">${m.completed ? '✓' : ''}</span>
        <span class="dossier-check-text">${m.text}</span>
      </li>
    `).join('');

    return `
      <article class="folder-item ${t.theme || 'folder-manila'} ${isPulled ? 'pulled-out' : ''}" data-id="${t.id}">
        <!-- Staggered Folder Tab -->
        <div class="folder-tab-strip" style="--tab-offset: ${tabOffset};">
          <div class="folder-tab" data-folder-trigger="${t.id}" title="Click to pull out folder">
            <span class="folder-tab-num">0${idx + 1}</span>
            <span class="folder-tab-title">${t.tabTitle || t.code}</span>
            <span class="folder-tab-status">${isPulled ? '[OPEN]' : '[PULL]'}</span>
          </div>
        </div>

        <!-- Folder Lip (Collapsed summary bar) -->
        <div class="folder-lip" data-folder-trigger="${t.id}">
          <div class="folder-lip-left">
            <span class="folder-code-badge">${t.code}</span>
            <h3 class="folder-lip-title">${t.title}</h3>
            <span class="folder-lip-cat">&bull; ${t.category}</span>
          </div>
          <div class="folder-lip-right">
            <div class="folder-mini-meter">
              <div class="folder-mini-track">
                <div class="folder-mini-fill" style="width: ${pct}%;"></div>
              </div>
              <span class="folder-mini-pct">${pct}%</span>
            </div>
            <button class="folder-pull-btn" type="button" aria-expanded="${isPulled}">
              <span class="pull-btn-icon">${isPulled ? '−' : '+'}</span>
              <span class="pull-btn-label">${isPulled ? 'TUCK IN' : 'PULL OUT'}</span>
            </button>
          </div>
        </div>

        <!-- Interior Dossier (Expanded when pulled out) -->
        <div class="folder-dossier" aria-hidden="${!isPulled}">
          <div class="dossier-paper-sheet-inner">
            <div class="dossier-paper-sheet">
              <!-- Header Bar -->
              <div class="dossier-header-bar">
                <div class="dossier-header-left">
                  <span class="dossier-stamp-code">${t.code}</span>
                  <span class="dossier-stamp-cat">${t.category}</span>
                  <span class="dossier-stamp-status">[${t.status || 'ACTIVE'}]</span>
                </div>
                <div class="dossier-header-right">
                  <span class="dossier-deadline">TARGET DATE: <strong>${formattedDeadline}</strong></span>
                </div>
              </div>

              <!-- Title & Mission Objective -->
              <div class="dossier-title-block">
                <h3 class="dossier-title">${t.title}</h3>
                <p class="dossier-mission"><strong>MISSION OBJECTIVE:</strong> ${t.mission || t.notes}</p>
              </div>

              <!-- Body Grid: Tasks + Tactile Artifact -->
              <div class="dossier-body-grid">
                
                <!-- Left: Milestones & Calibration Deck -->
                <div class="dossier-col-tasks">
                  <div class="dossier-section-title">
                    <span>ACTION MILESTONES</span>
                    <span class="dossier-count-badge" id="count-${t.id}">[${completedCount}/${milestones.length} COMPLETED]</span>
                  </div>

                  <ul class="dossier-checklist">
                    ${milestonesHtml}
                  </ul>

                  <!-- Precision Metric Deck -->
                  <div class="dossier-metric-deck">
                    <div class="dossier-metric-row">
                      <div>
                        <span class="dossier-metric-label">RECORDED PROGRESS</span>
                        <div class="dossier-metric-val"><strong>${t.currentValue}</strong> / ${t.targetValue} ${t.unit}</div>
                      </div>
                      <div class="dossier-pct-large">${pct}%</div>
                    </div>
                    <div class="spec-meter-track" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100">
                      ${meterBlocks}
                    </div>
                    <div class="spec-meter-scale" aria-hidden="true">
                      <span>0%</span>
                      <span>25%</span>
                      <span>50%</span>
                      <span>75%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>

                <!-- Right: Tactile Studio Artifact -->
                <div class="dossier-col-artifact">
                  ${renderTactileArtifact(t, idx)}
                </div>

              </div>

              <!-- Dossier Footer -->
              <div class="dossier-footer">
                <div class="dossier-memo">
                  <svg class="dossier-pen-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                  </svg>
                  <span class="dossier-memo-text">"${t.tactileMemo || t.notes}"</span>
                </div>
                <button class="dossier-return-btn" data-folder-close="${t.id}" type="button">
                  &larr; TUCK BACK INTO DECK
                </button>
              </div>

            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Setup In-Place Smooth Event Listeners (Zero DOM destruction)
  function toggleFolder(folderId) {
    const allFolders = container.querySelectorAll('.folder-item');
    const targetFolder = container.querySelector(`.folder-item[data-id="${folderId}"]`);
    if (!targetFolder) return;

    const isCurrentlyPulled = targetFolder.classList.contains('pulled-out');

    // Smoothly close all folders
    allFolders.forEach(folder => {
      folder.classList.remove('pulled-out');
      const dossier = folder.querySelector('.folder-dossier');
      if (dossier) dossier.setAttribute('aria-hidden', 'true');
      const pullBtn = folder.querySelector('.folder-pull-btn');
      if (pullBtn) {
        pullBtn.setAttribute('aria-expanded', 'false');
        const icon = pullBtn.querySelector('.pull-btn-icon');
        const label = pullBtn.querySelector('.pull-btn-label');
        if (icon) icon.textContent = '+';
        if (label) label.textContent = 'PULL OUT';
      }
      const tabStatus = folder.querySelector('.folder-tab-status');
      if (tabStatus) tabStatus.textContent = '[PULL]';
    });

    if (!isCurrentlyPulled) {
      // Pull out the selected folder smoothly
      targetFolder.classList.add('pulled-out');
      const dossier = targetFolder.querySelector('.folder-dossier');
      if (dossier) dossier.setAttribute('aria-hidden', 'false');
      const pullBtn = targetFolder.querySelector('.folder-pull-btn');
      if (pullBtn) {
        pullBtn.setAttribute('aria-expanded', 'true');
        const icon = pullBtn.querySelector('.pull-btn-icon');
        const label = pullBtn.querySelector('.pull-btn-label');
        if (icon) icon.textContent = '−';
        if (label) label.textContent = 'TUCK IN';
      }
      const tabStatus = targetFolder.querySelector('.folder-tab-status');
      if (tabStatus) tabStatus.textContent = '[OPEN]';
      activePulledFolderId = folderId;
    } else {
      activePulledFolderId = null;
    }
  }

  container.querySelectorAll('[data-folder-trigger]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      if (e.target.closest('.dossier-check-item') || e.target.closest('.dossier-return-btn')) return;
      const folderId = trigger.getAttribute('data-folder-trigger');
      toggleFolder(folderId);
    });
  });

  container.querySelectorAll('[data-folder-close]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const folderId = btn.getAttribute('data-folder-close');
      toggleFolder(folderId);
    });
  });

  // Smooth In-Place Checklist Toggle
  container.querySelectorAll('.dossier-check-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = item.getAttribute('data-target-id');
      const milestoneId = item.getAttribute('data-milestone-id');
      const target = state.septemberTargets.find(t => t.id === targetId);
      if (target && target.milestones) {
        const milestone = target.milestones.find(m => m.id === milestoneId);
        if (milestone) {
          milestone.completed = !milestone.completed;

          // Update this item in place
          item.classList.toggle('completed', milestone.completed);
          const box = item.querySelector('.dossier-check-box');
          if (box) box.textContent = milestone.completed ? '✓' : '';

          // Update count badge in place
          const completedCount = target.milestones.filter(m => m.completed).length;
          const countBadge = document.getElementById(`count-${targetId}`);
          if (countBadge) {
            countBadge.textContent = `[${completedCount}/${target.milestones.length} COMPLETED]`;
          }

          // Persist to localStorage
          const saved = loadStored(STORAGE_KEYS.TARGET_MILESTONES, {});
          saved[milestone.id] = milestone.completed;
          saveStored(STORAGE_KEYS.TARGET_MILESTONES, saved);
        }
      }
    });
  });
}

// ----------------------------------------------------------------------------
// RENDER 5-YEAR HORIZON
// ----------------------------------------------------------------------------

function renderFiveYearHorizon() {
  const container = document.getElementById('horizon-list');
  if (!container) return;

  container.innerHTML = state.fiveYearHorizon.map(h => {
    const isCurrent = h.year === '2026';
    const displayYear = h.year.replace('-', ' &ndash; ');

    return `
      <div class="timeline-entry ${isCurrent ? 'current-phase' : ''}">
        <div class="timeline-node-col" aria-hidden="true">
          <div class="timeline-node"></div>
        </div>
        <div class="timeline-body">
          <div class="timeline-overview">
            <div class="timeline-year-row">
              <span class="timeline-year">${displayYear}</span>
              ${isCurrent ? '<span class="timeline-current-badge">[CURRENT // ACTIVE]</span>' : ''}
            </div>
            <h4 class="timeline-headline">${h.headline}</h4>
            <p class="timeline-focus">${h.focus}</p>
          </div>
          <div class="timeline-milestones-col">
            <ul class="timeline-milestone-list">
              ${h.milestones.map(m => `
                <li class="milestone-item ${m.done ? 'is-done' : ''}">
                  <span class="milestone-marker">${m.done ? '[✓]' : '[·]'}</span>
                  <span class="milestone-text">${m.text}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ----------------------------------------------------------------------------
// RENDER BUCKET LIST
// ----------------------------------------------------------------------------

function renderBucketList() {
  const container = document.getElementById('bucket-list-container');
  const countBadge = document.getElementById('bucket-count-badge');
  if (!container) return;

  const total = state.bucketList.length;
  const completed = state.bucketList.filter(b => b.completed).length;
  const percent = Math.round((completed / total) * 100);

  if (countBadge) {
    countBadge.textContent = `[${completed}/${total} COMPLETED &mdash; ${percent}%]`;
  }

  container.innerHTML = state.bucketList.map(item => `
    <div class="bucket-item-row ${item.completed ? 'completed' : ''}" data-id="${item.id}">
      <span class="bucket-box">${item.completed ? '✓' : ''}</span>
      <span class="bucket-cat">${item.category}</span>
      <span class="bucket-text">${item.text}</span>
    </div>
  `).join('');

  container.querySelectorAll('.bucket-item-row').forEach(row => {
    row.addEventListener('click', () => {
      const id = row.getAttribute('data-id');
      const item = state.bucketList.find(b => b.id === id);
      if (item) {
        item.completed = !item.completed;
        saveStored(STORAGE_KEYS.BUCKET_LIST, state.bucketList);
        renderBucketList();
      }
    });
  });
}

// ----------------------------------------------------------------------------
// RENDER DAILY LOGS (MINIMAL & DYNAMIC USER TAG SYSTEM)
// ----------------------------------------------------------------------------

function getAllUniqueTags() {
  const tagCounts = {};
  state.dailyLogs.forEach(log => {
    (log.tags || []).forEach(t => {
      const clean = t.trim().toLowerCase().replace(/^#+/, '');
      if (clean) {
        tagCounts[clean] = (tagCounts[clean] || 0) + 1;
      }
    });
  });
  return tagCounts;
}

function renderTagFilterBar() {
  const filterBar = document.getElementById('tag-filter-bar');
  if (!filterBar) return;

  const tagCounts = getAllUniqueTags();
  const allTags = Object.keys(tagCounts).sort();
  const currentTag = (state.activeLogTag || 'ALL').toLowerCase();

  let html = `
    <button type="button" class="filter-tag-link ${currentTag === 'all' ? 'active' : ''}" data-tag="ALL">
      all (${state.dailyLogs.length})
    </button>
  `;

  allTags.forEach(tag => {
    const isActive = currentTag === tag ? 'active' : '';
    html += `
      <span class="filter-tag-sep">/</span>
      <button type="button" class="filter-tag-link ${isActive}" data-tag="${tag}">
        #${tag}
      </button>
    `;
  });

  filterBar.innerHTML = html;

  filterBar.querySelectorAll('.filter-tag-link').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeLogTag = btn.getAttribute('data-tag') || 'ALL';
      renderTagFilterBar();
      renderDailyLogs();
    });
  });
}



function renderDailyLogs(highlightId = null) {
  const feed = document.getElementById('log-feed');
  if (!feed) return;

  const activeTag = (state.activeLogTag || 'ALL').toLowerCase();
  const filtered = state.dailyLogs.filter(log => {
    if (activeTag === 'all') return true;
    const logTags = (log.tags || []).map(t => t.toLowerCase());
    return logTags.includes(activeTag);
  });

  if (filtered.length === 0) {
    feed.innerHTML = `
      <div class="empty-logs-notice">
        No entries found tagged #${activeTag}.
        <button type="button" class="btn-clear-filter" id="clear-tag-filter">Show all</button>
      </div>
    `;
    const clearBtn = document.getElementById('clear-tag-filter');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        state.activeLogTag = 'ALL';
        renderTagFilterBar();
        renderDailyLogs();
      });
    }
    return;
  }

  feed.innerHTML = filtered.map(log => {
    const isNew = highlightId && log.id === highlightId ? 'is-new' : '';
    const tags = Array.isArray(log.tags) ? log.tags : [];

    return `
      <article class="minimal-log-item ${isNew}" data-id="${log.id}">
        <div class="minimal-log-meta">
          <div class="minimal-log-meta-left">
            <span class="minimal-log-date">${log.date}</span>
            <div class="minimal-log-tags">
              ${tags.map(t => `<button type="button" class="minimal-tag-item" data-filter-to="${t}">#${t}</button>`).join('')}
            </div>
          </div>
          <div class="minimal-log-actions">
            <button type="button" class="minimal-action-btn" data-copy-id="${log.id}" title="Copy markdown">copy</button>
            <button type="button" class="minimal-action-btn minimal-delete-btn" data-delete-id="${log.id}" title="Delete entry">&times;</button>
          </div>
        </div>

        <h3 class="minimal-log-title">${log.title}</h3>
        <p class="minimal-log-body">${log.learned}</p>
      </article>
    `;
  }).join('');

  // Click on a tag pill in a card filters to that tag
  feed.querySelectorAll('.minimal-tag-item').forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetTag = pill.getAttribute('data-filter-to');
      if (targetTag) {
        state.activeLogTag = targetTag;
        renderTagFilterBar();
        renderDailyLogs();
      }
    });
  });

  // Copy entry to clipboard
  feed.querySelectorAll('.minimal-action-btn[data-copy-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const logId = btn.getAttribute('data-copy-id');
      const item = state.dailyLogs.find(l => l.id === logId);
      if (!item) return;

      const tagsStr = (item.tags || []).map(t => `#${t}`).join(' ');
      const snippet = `### [${item.date}] ${item.title} ${tagsStr}\n${item.learned}`;
      navigator.clipboard.writeText(snippet).then(() => {
        const orig = btn.textContent;
        btn.textContent = 'copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = orig;
          btn.classList.remove('copied');
        }, 1500);
      });
    });
  });

  // Delete entry
  feed.querySelectorAll('.minimal-delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const logId = btn.getAttribute('data-delete-id');
      if (confirm('Delete this entry?')) {
        state.dailyLogs = state.dailyLogs.filter(l => l.id !== logId);
        saveStored(STORAGE_KEYS.DAILY_LOGS, state.dailyLogs);
        renderTagFilterBar();
        renderDailyLogs();
      }
    });
  });
}

// ----------------------------------------------------------------------------
// TACTILE FOLDER TABS CONTROLLER
// ----------------------------------------------------------------------------

function setupFolderTabs() {
  const tabs = document.querySelectorAll('.folder-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.folder-pane').forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-tab');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

// ----------------------------------------------------------------------------
// EVENT LISTENERS (NEW LOGS, TAG SYSTEM & EXPORT)
// ----------------------------------------------------------------------------

function setupEventListeners() {
  const logForm = document.getElementById('daily-log-form');
  if (logForm) {
    logForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const titleInput = document.getElementById('log-title-input');
      const textInput = document.getElementById('log-text-input');
      const tagsInput = document.getElementById('log-tags-input');

      const title = titleInput ? titleInput.value.trim() : '';
      const text = textInput ? textInput.value.trim() : '';
      const rawTags = tagsInput ? tagsInput.value.trim() : '';

      if (!title || !text) {
        alert('Please provide a title and what you learned.');
        return;
      }

      let tags = [];
      if (rawTags) {
        tags = rawTags.split(/[,]+/)
          .map(t => t.trim().toLowerCase().replace(/^#+/, '').replace(/\s+/g, '-'))
          .filter(Boolean);
      }
      if (tags.length === 0) {
        tags = ['general'];
      }

      const today = new Date().toISOString().split('T')[0];
      const newEntry = {
        id: 'log-' + Date.now(),
        date: today,
        title: title,
        learned: text,
        tags: tags
      };

      state.dailyLogs.unshift(newEntry);
      saveStored(STORAGE_KEYS.DAILY_LOGS, state.dailyLogs);

      state.activeLogTag = 'ALL';
      renderTagFilterBar();
      renderDailyLogs(newEntry.id);

      if (titleInput) titleInput.value = '';
      if (textInput) textInput.value = '';
      if (tagsInput) tagsInput.value = '';
    });
  }

  const exportBtn = document.getElementById('export-logs-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      let md = `# WHAT I LEARNED TODAY — BOLD\n\n`;
      state.dailyLogs.forEach(l => {
        const tagLine = (l.tags || []).map(t => `#${t}`).join(' ');
        md += `## [${l.date}] ${l.title} ${tagLine ? `(${tagLine})` : ''}\n`;
        md += `${l.learned}\n\n---\n\n`;
      });
      const blob = new Blob([md], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `what-i-learned-${new Date().toISOString().split('T')[0]}.md`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  // Live Time Display (UTC / Local)
  function updateLiveTime() {
    const timeEl = document.getElementById('live-time-display');
    if (timeEl) {
      const now = new Date();
      timeEl.textContent = `${now.toLocaleTimeString()} LOCAL / UTC ${now.toISOString().substring(11, 19)}`;
    }
  }
  updateLiveTime();
  setInterval(updateLiveTime, 1000);
}

function renderCrossStitchHero() {
  const container = document.getElementById('hero-stitch-canvas');
  if (container) {
    container.innerHTML = renderCrossStitchSVG('BOLD', {
      cellSize: 15,
      strokeWidth: 3.2,
      color: '#ffffff',
      letterSpacing: 2
    });
  }
}

// ----------------------------------------------------------------------------
// HERO TIME CADENCE GRAPHS (CURRENT MONTH & YEAR REMAINING)
// ----------------------------------------------------------------------------

function updateHeroCadenceGraphs() {
  const monthFillEl = document.getElementById('hero-month-fill');
  const monthPinEl = document.getElementById('hero-month-pin');
  const yearFillEl = document.getElementById('hero-year-fill');
  const yearPinEl = document.getElementById('hero-year-pin');
  const monthDaysLeftEl = document.getElementById('hero-month-days-left');
  const monthPctLeftEl = document.getElementById('hero-month-pct-left');
  const yearDaysLeftEl = document.getElementById('hero-year-days-left');
  const yearPctLeftEl = document.getElementById('hero-year-pct-left');
  const dateStrEl = document.getElementById('cadence-date-str');

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();

  // Days in month calculation
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthDaysElapsed = Math.min(date, daysInMonth);
  const monthDaysLeft = Math.max(0, daysInMonth - monthDaysElapsed);
  const monthPctElapsed = Math.min(100, Math.max(0, Math.round((monthDaysElapsed / daysInMonth) * 100)));
  const monthPctRemaining = Math.max(0, 100 - monthPctElapsed);

  // Day of year & Days in year
  const startOfYear = new Date(year, 0, 1);
  const endOfYear = new Date(year, 11, 31);
  const totalDaysInYear = Math.round((endOfYear - startOfYear) / (1000 * 60 * 60 * 24)) + 1;
  const dayOfYear = Math.floor((now - startOfYear) / (1000 * 60 * 60 * 24)) + 1;
  const yearDaysLeft = Math.max(0, totalDaysInYear - dayOfYear);
  const yearPctElapsed = Math.min(100, Math.max(0, Math.round((dayOfYear / totalDaysInYear) * 100)));
  const yearPctRemaining = Math.max(0, 100 - yearPctElapsed);

  // Text metrics
  if (monthDaysLeftEl) monthDaysLeftEl.textContent = `${monthDaysLeft}`;
  if (monthPctLeftEl) monthPctLeftEl.textContent = `${monthPctRemaining}%`;
  if (yearDaysLeftEl) yearDaysLeftEl.textContent = `${yearDaysLeft}`;
  if (yearPctLeftEl) yearPctLeftEl.textContent = `${yearPctRemaining}%`;

  if (dateStrEl) {
    const monthName = now.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    dateStrEl.textContent = `${monthName} ${year} • DAY ${dayOfYear} / ${totalDaysInYear}`;
  }

  // Update Month Gauge
  if (monthFillEl) {
    monthFillEl.style.width = `${monthPctElapsed}%`;
    if (monthFillEl.parentElement) {
      monthFillEl.parentElement.setAttribute('aria-valuenow', monthPctElapsed);
    }
  }
  if (monthPinEl) {
    monthPinEl.style.left = `${monthPctElapsed}%`;
  }

  // Update Year Gauge
  if (yearFillEl) {
    yearFillEl.style.width = `${yearPctElapsed}%`;
    if (yearFillEl.parentElement) {
      yearFillEl.parentElement.setAttribute('aria-valuenow', yearPctElapsed);
    }
  }
  if (yearPinEl) {
    yearPinEl.style.left = `${yearPctElapsed}%`;
  }
}

// ----------------------------------------------------------------------------
// INITIAL BOOTSTRAP
// ----------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  renderCrossStitchHero();
  updateHeroCadenceGraphs();
  setupFolderTabs();
  renderSeptemberTargets();
  renderFiveYearHorizon();
  renderBucketList();
  renderTagFilterBar();
  renderDailyLogs();
  setupEventListeners();
});
