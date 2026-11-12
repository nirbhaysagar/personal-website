import { initialData } from './data.js';
import { renderCrossStitchSVG } from './stitch-font.js';
import {
  initSupabase,
  isSupabaseConnected,
  loadSupabaseConfig,
  saveSupabaseConfig,
  testConnection,
  fetchCloudDailyLogs,
  upsertCloudDailyLog,
  deleteCloudDailyLog,
  fetchCloudMilestones,
  upsertCloudMilestone,
  SQL_SCHEMA
} from './supabase.js';

// ============================================================================
// APP LOGIC: BOLD EDITORIAL BLUEPRINT & LOCAL DATA CONTROLLER
// ============================================================================

const STORAGE_KEYS = {
  DAILY_LOGS: 'bold_daily_logs_v3',
  Q4_GOALS: 'bold_2m_6m_targets_v1',
  BUCKET_LIST: 'bold_2m_6m_targets_v1',
  TARGET_MILESTONES: 'bold_2m_milestones_v1'
};

function initQ4Goals() {
  const source = initialData.q4Goals || initialData.bucketList || [];
  const saved = loadStored(STORAGE_KEYS.Q4_GOALS, null);
  if (!saved || !Array.isArray(saved)) return source;
  const savedMap = {};
  saved.forEach(item => {
    if (item && item.id) savedMap[item.id] = item.completed;
  });
  return source.map(item => ({
    ...item,
    completed: savedMap[item.id] !== undefined ? savedMap[item.id] : item.completed
  }));
}

// Initialize milestone states from localStorage if previously stored
const savedMilestones = loadStored(STORAGE_KEYS.TARGET_MILESTONES, {});
const targetsSource = initialData.novemberTargets || initialData.octoberTargets || initialData.septemberTargets || [];
targetsSource.forEach(t => {
  if (t.milestones) {
    t.milestones.forEach(m => {
      if (savedMilestones[m.id] !== undefined) {
        m.completed = savedMilestones[m.id];
      }
    });
    const completedCount = t.milestones.filter(m => m.completed).length;
    t.currentValue = t.milestones.length > 0 ? Math.round((completedCount / t.milestones.length) * t.targetValue) : 0;
  }
});

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function detectDisciplineFromContent(tags, text) {
  const combined = ((tags || []).join(' ') + ' ' + (text || '')).toLowerCase();
  if (combined.includes('ai') || combined.includes('memory') || combined.includes('embedding') || combined.includes('hnsw') || combined.includes('vector') || combined.includes('llm') || combined.includes('agent')) {
    return 'ai-cognition';
  }
  if (combined.includes('devops') || combined.includes('system') || combined.includes('docker') || combined.includes('envoy') || combined.includes('redis') || combined.includes('linux') || combined.includes('queue') || combined.includes('postgres')) {
    return 'systems-devops';
  }
  if (combined.includes('gtm') || combined.includes('sales') || combined.includes('growth') || combined.includes('orbit') || combined.includes('marketing') || combined.includes('conversion') || combined.includes('merchant')) {
    return 'gtm-growth';
  }
  if (combined.includes('cinema') || combined.includes('film') || combined.includes('lighting') || combined.includes('narrative') || combined.includes('script') || combined.includes('story') || combined.includes('shot')) {
    return 'cinema-narrative';
  }
  if (combined.includes('first-principles') || combined.includes('cadence') || combined.includes('focus') || combined.includes('greene') || combined.includes('doctrine') || combined.includes('feynman') || combined.includes('psychology')) {
    return 'first-principles';
  }
  return 'software-craft';
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
    const cleanTags = tags.length > 0 ? tags : ['general'];
    const title = l.title || '';
    const learned = l.learned || '';
    const discipline = l.discipline || detectDisciplineFromContent(cleanTags, title + ' ' + learned);

    return {
      id: l.id || 'log-' + Date.now(),
      date: l.date || new Date().toISOString().split('T')[0],
      title: title,
      discipline: discipline,
      learned: learned,
      implementation: l.implementation || '',
      crossDomain: l.crossDomain || '',
      mastery: {
        explainable: l.mastery?.explainable ?? true,
        implemented: l.mastery?.implemented ?? Boolean(l.implementation),
        edgeTested: l.mastery?.edgeTested ?? false
      },
      tags: cleanTags
    };
  });
}

const q4GoalsList = initQ4Goals();

let state = {
  profile: initialData.profile,
  projects: initialData.projects,
  targets: targetsSource,
  novemberTargets: targetsSource,
  octoberTargets: targetsSource,
  get septemberTargets() { return this.targets; },
  fiveYearHorizon: initialData.fiveYearHorizon,
  bucketList: q4GoalsList,
  q4Goals: q4GoalsList,
  radarCurriculum: initialData.radarCurriculum,
  selectedRadarMonth: '2026-11',
  selectedRadarTrack: 'all',
  activeRadarTriadIdx: 0,
  dailyLogs: normalizeDailyLogs(loadStored(STORAGE_KEYS.DAILY_LOGS, initialData.dailyLogs)),
  activeLogTag: 'ALL',
  activeDisciplineFilter: 'ALL',
  logSearchQuery: ''
};

let activePulledFolderId = targetsSource.find(t => t.id.includes('05'))?.id || targetsSource[0]?.id; // Lumen AI memory spec opened by default

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
  if (t.id.includes('01') || t.id.includes('orb')) {
    // 1. Orbit Growth & Revenue (1,000 Users, 75+ Paid)
    return `
      <div class="artifact-badge-card">
        <div class="lanyard-slot" aria-hidden="true"></div>
        <div class="badge-header">
          <span class="badge-org">ORBIT // 60-DAY SPRINT</span>
          <span class="spec-status-stamp">[DEC 31 RUNWAY]</span>
        </div>
        <div class="badge-barcode">||| | |||| || ||| |||||</div>
        <div class="badge-details">
          <div><strong>USERS:</strong> 0 / 1,000 REGISTERED</div>
          <div><strong>PAID:</strong> 0 / 75+ PAYING SUBSCRIBERS</div>
          <div><strong>CHANNELS:</strong> DIRECT FOUNDER OUTREACH &amp; LOOPS</div>
          <div><strong>RETENTION:</strong> AUTOMATED CART RECOVERY</div>
        </div>
        <svg class="badge-runner-doodle" viewBox="0 0 80 45" fill="none" stroke="#1a1a1a" stroke-width="2.5" stroke-linecap="round">
          <circle cx="20" cy="12" r="5"/>
          <path d="M 20 17 L 22 28 L 32 32 M 22 28 L 14 38 M 20 20 L 10 24 M 20 20 L 30 18"/>
          <circle cx="60" cy="12" r="5"/>
          <path d="M 60 17 L 58 28 L 48 32 M 58 28 L 66 38 M 60 20 L 70 24 M 60 20 L 50 18"/>
        </svg>
      </div>
    `;
  } else if (t.id.includes('02') || t.id.includes('xg') || t.id.includes('x-growth')) {
    // 2. X / Twitter Authority (2,000 High-Signal Followers)
    return `
      <div class="artifact-graph-sheet">
        <div class="washi-tape-strip" aria-hidden="true"></div>
        <div style="font-family: var(--font-heading); font-size: 11px; font-weight: 700; margin-bottom: 10px; color: #1a1a1a; letter-spacing: 0.04em;">
          X / TWITTER // BUILDER MOAT MANIFEST
        </div>
        <div class="funnel-bar-item">
          <span style="min-width: 120px;">FOLLOWERS (2,000):</span>
          <div class="funnel-bar-track"><div class="funnel-bar-fill" style="width: 0%;"></div></div>
          <span>0 / 2,000</span>
        </div>
        <div class="funnel-bar-item">
          <span style="min-width: 120px;">MODEL PROFILE:</span>
          <div class="funnel-bar-track"><div class="funnel-bar-fill" style="width: 100%;"></div></div>
          <span>MARC LOU / LEVELS</span>
        </div>
        <div class="funnel-bar-item">
          <span style="min-width: 120px;">TOPIC AUTHORITY:</span>
          <div class="funnel-bar-track"><div class="funnel-bar-fill" style="width: 100%;"></div></div>
          <span>SAAS &amp; GROWTH</span>
        </div>
        <span style="font-family: 'Caveat', cursive; font-size: 1.15rem; color: #2e5c38; display: block; margin-top: 8px;">
          * Build in public: transparent SaaS numbers, teardowns &amp; zero vanity fluff!
        </span>
      </div>
    `;
  } else if (t.id.includes('03') || t.id.includes('xl') || t.id.includes('x-launch')) {
    // 3. X Launch Playbook ($500 in 7-10 Days & 100 Users in 48-72h)
    return `
      <div class="artifact-qa-sheet">
        <svg class="binder-clip-graphic" viewBox="0 0 40 50" fill="none" aria-hidden="true">
          <path d="M 12 18 C 12 6, 28 6, 28 18" stroke="#888888" stroke-width="2.5" fill="none"/>
          <path d="M 16 18 C 16 10, 24 10, 24 18" stroke="#aaaaaa" stroke-width="1.8" fill="none"/>
          <polygon points="6,18 34,18 30,42 10,42" fill="#1a1a1a"/>
          <line x1="8" y1="20" x2="32" y2="20" stroke="#444" stroke-width="1.5"/>
        </svg>

        <div style="font-family: var(--font-heading); font-size: 11px; font-weight: 700; margin-bottom: 10px; color: #1a1a1a; letter-spacing: 0.04em;">
          X LAUNCH PROTOCOL // RAPID MONETIZATION
        </div>
        <div style="font-family: var(--font-mono); font-size: 0.78rem; line-height: 1.6; color: #333;">
          &bull; Launch Engine: <strong>$500 IN 7–10 DAYS FROM ANY ASSET</strong><br>
          &bull; Initial Traction: <strong>FIRST 100 USERS IN 48–72 HOURS VIA X</strong><br>
          &bull; Playbook: <strong>HIGH-PULL HOOKS &amp; PROOF THREADS</strong><br>
          &bull; Status: <strong>FRAMEWORK COMPILED &amp; READY TO TEST</strong>
        </div>
        <div class="qa-stamp-circle">[DISTRIBUTION SOLVED // $500 REPEATABLE]</div>
      </div>
    `;
  } else if (t.id.includes('04') || t.id.includes('ds') || t.id.includes('dec-sprint')) {
    // 4. Mid-December Side Project Launch ($500 in 2 Weeks)
    return `
      <div class="artifact-cassette-card">
        <div class="cassette-body">
          <div class="cassette-label-strip">
            MID-DECEMBER SPRINT &bull; 2-WEEK VALIDATION
          </div>
          <div class="cassette-spools">
            <div class="spool-hole"></div>
            <span style="font-family: var(--font-mono); font-size: 9px; font-weight: 700; letter-spacing: 2px;">$500 TEST</span>
            <div class="spool-hole"></div>
          </div>
          <div style="font-family: var(--font-mono); font-size: 0.76rem; color: #bbb; text-align: center; line-height: 1.5;">
            Deploy Side Project Mid-Dec &bull; Window: Dec 15 &rarr; Dec 31<br>
            <span style="color: #ffbe1a; font-weight: 700;">[ORGANIC X DISTRIBUTION ONLY &bull; TARGET: $500 IN 2 WKS]</span>
          </div>
        </div>
      </div>
    `;
  } else if (t.id.includes('05') || t.id.includes('ag') || t.id.includes('agy-100k')) {
    // 5. Personal Profit & Agency System (₹1 Lakh)
    return `
      <div class="artifact-spiral-sheet">
        <div class="spiral-holes" aria-hidden="true">
          <div class="spiral-ring"></div>
          <div class="spiral-ring"></div>
          <div class="spiral-ring"></div>
          <div class="spiral-ring"></div>
          <div class="spiral-ring"></div>
        </div>
        <div class="artifact-spiral-title">CAPITAL OS // ₹1 LAKH &amp; AGENCY SYSTEM</div>
        <div class="spiral-tier-block">
          <span class="spiral-tier-label">NET PROFIT TARGET:</span>
          ₹1,00,000 INR accumulated personal runway by Dec 31.
        </div>
        <div class="spiral-tier-block">
          <span class="spiral-tier-label">AGENCY ARCHITECTURE:</span>
          Structured client pipeline &bull; Distribution retainers &bull; Delivery SOPs.
        </div>
        <div class="spiral-tier-block">
          <span class="spiral-tier-label">CLIENT OFFER:</span>
          Productized social distribution &bull; Launch systems &bull; GTM loops.
        </div>
        <span class="spiral-hand-note">* Building a sovereign agency machine, not ad-hoc tasks [Cycle Initiated].</span>
      </div>
    `;
  } else {
    // 6. AgentTrace (AOS): Autonomous Agent Observability Engine & YC Batch
    return `
      <div class="artifact-badge-card" style="border-left: 3px solid #06b6d4;">
        <div class="lanyard-slot" aria-hidden="true"></div>
        <div class="badge-header">
          <span class="badge-org">AGENTTRACE // AOS HARD TECH</span>
          <span class="spec-status-stamp">[YC CANDIDATE]</span>
        </div>
        <div class="badge-barcode">||| | |||| || ||| |||||</div>
        <div class="badge-details">
          <div><strong>SYSTEM:</strong> AUTONOMOUS AGENT OBSERVABILITY</div>
          <div><strong>MILESTONE:</strong> YC APPLICATION &amp; DEMO VIDEO</div>
          <div><strong>SDK BENCHMARK:</strong> SUB-15MS TRACE REPLAY</div>
          <div><strong>STATUS:</strong> CORE TRACE DAG ENGINE IN SPRINT</div>
        </div>
        <div style="font-family: var(--font-mono); font-size: 0.72rem; color: #06b6d4; font-weight: 700; margin-top: 6px;">
          [THE AOS TARGET &bull; FOUNDATIONAL INFRASTRUCTURE]
        </div>
      </div>
    `;
  }
}

function renderNovemberTargets() {
  const container = document.getElementById('targets-list');
  const daysLeftEl = document.getElementById('nov-days-left') || document.getElementById('oct-days-left') || document.getElementById('sep-days-left') || document.getElementById('target-days-left');
  const monthElapsedEl = document.getElementById('nov-month-elapsed') || document.getElementById('oct-month-elapsed') || document.getElementById('sep-month-elapsed') || document.getElementById('target-month-elapsed');
  const avgProgressEl = document.getElementById('nov-avg-progress') || document.getElementById('oct-avg-progress') || document.getElementById('sep-avg-progress') || document.getElementById('target-avg-progress');
  const ribbonEl = document.getElementById('november-days-ribbon') || document.getElementById('october-days-ribbon');

  const now = new Date();
  const year = now.getFullYear();
  const targetEndDate = new Date(2026, 11, 31, 23, 59, 59); // Dec 31, 2026
  const sprintStartDate = new Date(2026, 10, 1, 0, 0, 0); // Nov 01, 2026
  const totalSprintDays = 61; // 30 days Nov + 31 days Dec
  const elapsedDays = Math.max(1, Math.min(totalSprintDays, Math.floor((now - sprintStartDate) / (1000 * 60 * 60 * 24)) + 1));
  const daysLeft = Math.max(0, Math.ceil((targetEndDate - now) / (1000 * 60 * 60 * 24)));
  const elapsedPercent = Math.min(100, Math.round((elapsedDays / totalSprintDays) * 100));

  const targets = state.novemberTargets || state.octoberTargets || state.targets || state.septemberTargets || [];

  const totalProg = targets.reduce((acc, t) => {
    const pct = Math.min(100, Math.round((t.currentValue / t.targetValue) * 100));
    return acc + pct;
  }, 0);
  const avgProgress = targets.length > 0 ? Math.round(totalProg / targets.length) : 0;

  if (daysLeftEl) daysLeftEl.textContent = `${daysLeft}`;
  if (monthElapsedEl) monthElapsedEl.textContent = `${elapsedPercent}%`;
  if (avgProgressEl) avgProgressEl.textContent = `${avgProgress}%`;

  // Render 60-Day Runway Timeline Ribbon
  if (ribbonEl) {
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const currentDayInMonth = Math.min(Math.max(now.getDate(), 1), daysInMonth);
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const monthPrefix = month === 10 ? 'Nov' : 'Dec';
    ribbonEl.innerHTML = `
      <div class="ribbon-header">
        <span class="ribbon-title">60-DAY RUNWAY TIMELINE &bull; NOV 01 &rarr; DEC 31, 2026</span>
        <span class="ribbon-status">[DAY ${String(elapsedDays).padStart(2, '0')} / ${totalSprintDays} ACTIVE &bull; ${daysLeft} DAYS REMAINING TO DEC 31]</span>
      </div>
      <div class="ribbon-grid" role="region" aria-label="60-day sprint progress ribbon" style="grid-template-columns: repeat(${daysInMonth}, minmax(0, 1fr));">
        ${daysArray.map(d => {
          let statusClass = 'day-future';
          let marker = '&middot;';
          let tooltip = `${monthPrefix} ${String(d).padStart(2, '0')} — Upcoming Sprint Runway (${daysLeft}d to Dec 31)`;
          if (d < currentDayInMonth) {
            statusClass = 'day-past';
            marker = '&#10003;';
            tooltip = `${monthPrefix} ${String(d).padStart(2, '0')} — Completed Runway ✓`;
          } else if (d === currentDayInMonth) {
            statusClass = 'day-current';
            marker = '&#9679;';
            tooltip = `Day ${String(d).padStart(2, '0')} — Active Sprint Today (${daysLeft}d to Dec 31)`;
          }
          return `
            <div class="day-cell ${statusClass}" data-tooltip="${tooltip}" data-day="${d}" tabindex="0" role="button" aria-label="${tooltip}">
              <span class="day-num">${String(d).padStart(2, '0')}</span>
              <span class="day-marker">${marker}</span>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  if (!container) return;

  const tabOffsets = [
    '16px',
    'calc(16px + 15%)',
    'calc(16px + 30%)',
    'calc(16px + 45%)',
    'calc(16px + 60%)',
    'calc(16px + 75%)'
  ];

  container.innerHTML = targets.map((t, idx) => {
    const pct = Math.min(100, Math.round((t.currentValue / t.targetValue) * 100));
    const formattedDeadline = t.deadline ? t.deadline.replace('2026-12-', 'Dec ').replace('2026-11-', 'Nov ').replace('2026-10-', 'Oct ').replace('2026-09-', 'Sep ') : 'Dec 31';
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
    const isDossierCleared = (milestones.length > 0 && completedCount === milestones.length) || pct === 100;

    const milestonesHtml = milestones.map(m => {
      const groupTag = m.group ? m.group.trim().toUpperCase() : '';
      return `
        <li class="dossier-check-item ${m.completed ? 'completed' : ''}" data-target-id="${t.id}" data-milestone-id="${m.id}">
          <span class="dossier-check-box">${m.completed ? '✓' : ''}</span>
          <div class="dossier-check-content">
            ${groupTag ? `<span class="dossier-subtarget-group" data-group="${groupTag}">[${groupTag}]</span>` : ''}
            <span class="dossier-check-text">${m.text}</span>
          </div>
        </li>
      `;
    }).join('');

    return `
      <article class="folder-item ${t.theme || 'folder-manila'} ${isPulled ? 'pulled-out' : ''}" data-id="${t.id}">
        <!-- Staggered Folder Tab -->
        <div class="folder-tab-strip" style="--tab-offset: ${tabOffset};">
          <div class="folder-tab" data-folder-trigger="${t.id}" title="Click to pull out folder">
            <span class="folder-tab-num">0${idx + 1}</span>
            <span class="folder-tab-title">${t.tabTitle || t.code}</span>
            <span class="folder-tab-status">${isPulled ? '[OPEN]' : (isDossierCleared ? '[CLEARED ✓]' : '[PULL]')}</span>
          </div>
        </div>

        <!-- Folder Lip (Collapsed summary bar) -->
        <div class="folder-lip" data-folder-trigger="${t.id}">
          <div class="folder-lip-left">
            <span class="folder-code-badge">${t.code}</span>
            <h3 class="folder-lip-title">${t.title}</h3>
            <span class="folder-lip-cat">&bull; ${t.category}</span>
            ${isDossierCleared ? `<span class="folder-cleared-pill">[CLEARED ✓]</span>` : ''}
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
              ${isDossierCleared ? `
                <div class="dossier-cleared-stamp" aria-label="Dossier Complete Stamp">
                  <div class="stamp-seal">
                    <span class="stamp-seal-badge">CLEARED // COMPLETE</span>
                    <span class="stamp-seal-title">2-MONTH DOSSIER // 2026</span>
                    <span class="stamp-seal-sub">ALL SUBTARGETS VERIFIED &#10003;</span>
                  </div>
                </div>
              ` : ''}
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
      const targets = state.novemberTargets || state.octoberTargets || state.targets || state.septemberTargets || [];
      const target = targets.find(t => t.id === targetId);
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

          // Recalculate target progress dynamically
          const targetPct = target.milestones.length > 0 ? Math.round((completedCount / target.milestones.length) * 100) : 0;
          target.currentValue = Math.round((completedCount / target.milestones.length) * target.targetValue);

          // Update folder lip mini meter
          const folderEl = container.querySelector(`.folder-item[data-id="${targetId}"]`);
          if (folderEl) {
            const miniFill = folderEl.querySelector('.folder-mini-fill');
            const miniPct = folderEl.querySelector('.folder-mini-pct');
            if (miniFill) miniFill.style.width = `${targetPct}%`;
            if (miniPct) miniPct.textContent = `${targetPct}%`;

            // Update dossier metric deck
            const largePct = folderEl.querySelector('.dossier-pct-large');
            const metricVal = folderEl.querySelector('.dossier-metric-val');
            const meterTrack = folderEl.querySelector('.spec-meter-track');
            if (largePct) largePct.textContent = `${targetPct}%`;
            if (metricVal) metricVal.innerHTML = `<strong>${target.currentValue}</strong> / ${target.targetValue} ${target.unit}`;
            if (meterTrack) {
              const totalBlocks = 20;
              const filled = Math.round((targetPct / 100) * totalBlocks);
              meterTrack.innerHTML = Array.from({ length: totalBlocks }, (_, i) => 
                `<span class="spec-tick ${i < filled ? 'filled' : ''}"></span>`
              ).join('');
            }
          }

          // Update overall aggregate pace in diagnostic ruler
          const totalP = targets.reduce((acc, tg) => {
            const p = tg.milestones && tg.milestones.length > 0 
              ? Math.round((tg.milestones.filter(m => m.completed).length / tg.milestones.length) * 100)
              : 0;
            return acc + p;
          }, 0);
          const avgP = targets.length > 0 ? Math.round(totalP / targets.length) : 0;
          const avgProgressEl = document.getElementById('nov-avg-progress') || document.getElementById('oct-avg-progress') || document.getElementById('target-avg-progress');
          if (avgProgressEl) avgProgressEl.textContent = `${avgP}%`;

          // Persist to localStorage and Cloud Database
          const saved = loadStored(STORAGE_KEYS.TARGET_MILESTONES, {});
          saved[milestone.id] = milestone.completed;
          saveStored(STORAGE_KEYS.TARGET_MILESTONES, saved);
          upsertCloudMilestone(milestone.id, milestone.completed);
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

let currentBucketHorizonFilter = 'ALL';

function setupBucketHorizonFilters() {
  const buttons = document.querySelectorAll('[data-horizon-filter]');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentBucketHorizonFilter = btn.getAttribute('data-horizon-filter') || 'ALL';
      renderBucketList();
    });
  });
}

function renderBucketList() {
  const container = document.getElementById('bucket-list-container');
  const countBadge = document.getElementById('bucket-count-badge');
  const summaryText = document.getElementById('bucket-summary-text');
  if (!container) return;

  const fullList = state.q4Goals || state.bucketList || [];
  const filteredList = currentBucketHorizonFilter === 'ALL'
    ? fullList
    : fullList.filter(item => item.horizon === currentBucketHorizonFilter);

  const total = filteredList.length;
  const completed = filteredList.filter(b => b.completed).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  if (countBadge) {
    const scopeLabel = currentBucketHorizonFilter === 'ALL' ? 'TOTAL' : currentBucketHorizonFilter;
    countBadge.textContent = `[${scopeLabel}: ${completed}/${total} COMPLETED • ${percent}%]`;
  }

  if (summaryText) {
    if (currentBucketHorizonFilter === '2-MONTH') {
      summaryText.textContent = '2-Month Sprint deliverables (deadline: Dec 31, 2026). Click any goal to toggle completion.';
    } else if (currentBucketHorizonFilter === '6-MONTH') {
      summaryText.textContent = '6-Month Strategic Horizon deliverables (deadline: May 31, 2027). Click to toggle.';
    } else {
      summaryText.textContent = 'All 2-Month Sprints & 6-Month Strategic Horizon deliverables. Click any goal to toggle completion.';
    }
  }

  container.innerHTML = filteredList.map(item => `
    <div class="bucket-item-row ${item.completed ? 'completed' : ''}" data-id="${item.id}" role="checkbox" aria-checked="${item.completed}">
      <span class="bucket-box">${item.completed ? '✓' : ''}</span>
      <span class="bucket-horizon-pill ${item.horizon === '2-MONTH' ? 'pill-2m' : 'pill-6m'}">${item.horizon || 'TARGET'}</span>
      <span class="bucket-cat">${item.category}</span>
      <span class="bucket-text">${item.text}</span>
    </div>
  `).join('');

  container.querySelectorAll('.bucket-item-row').forEach(row => {
    row.addEventListener('click', () => {
      const id = row.getAttribute('data-id');
      const item = fullList.find(b => b.id === id);
      if (item) {
        item.completed = !item.completed;
        saveStored(STORAGE_KEYS.Q4_GOALS, fullList);
        saveStored(STORAGE_KEYS.BUCKET_LIST, fullList);
        upsertCloudMilestone(item.id, item.completed).catch(err => console.warn('Supabase milestone sync error:', err));
        renderBucketList();
        renderSixMonthHorizon();
      }
    });
  });
}

// ----------------------------------------------------------------------------
// RENDER 6-MONTH STRATEGIC HORIZON & TARGET VIEW SWITCHER
// ----------------------------------------------------------------------------

function renderSixMonthHorizon() {
  const container = document.getElementById('six-month-container');
  if (!container) return;

  const allGoals = state.q4Goals || state.bucketList || [];
  const list = allGoals.filter(g => g.horizon === '6-MONTH');

  container.innerHTML = list.map((item, idx) => {
    const isCompleted = Boolean(item.completed);
    return `
      <div class="six-month-card ${isCompleted ? 'is-completed' : ''}" data-id="${item.id}" role="checkbox" aria-checked="${isCompleted}" style="cursor: pointer;">
        <div>
          <div class="six-month-cat">
            <span>[0${idx + 1}/07]</span> &bull; <span>${escapeHtml(item.category)}</span>
          </div>
          <h4 class="six-month-title">${escapeHtml(item.text)}</h4>
        </div>
        <div class="six-month-meta">
          <span>DEADLINE: MAY 31, 2027</span>
          <span style="font-weight: 700; ${isCompleted ? 'color: var(--accent-emerald, #10b981);' : ''}">${isCompleted ? '[✓ COMPLETED]' : '[· IN PROGRESS]'}</span>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.six-month-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      const item = allGoals.find(g => g.id === id);
      if (item) {
        item.completed = !item.completed;
        saveStored(STORAGE_KEYS.Q4_GOALS, allGoals);
        saveStored(STORAGE_KEYS.BUCKET_LIST, allGoals);
        upsertCloudMilestone(item.id, item.completed).catch(err => console.warn('Supabase sync error:', err));
        renderSixMonthHorizon();
        renderBucketList();
      }
    });
  });
}

function setupTargetViewSwitcher() {
  const buttons = document.querySelectorAll('.target-view-btn');
  const panes = {
    '2-month': document.getElementById('target-view-2month'),
    '6-month': document.getElementById('target-view-6month'),
    'checklist': document.getElementById('target-view-checklist')
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const view = btn.getAttribute('data-target-view');

      Object.entries(panes).forEach(([k, pane]) => {
        if (!pane) return;
        if (k === view) {
          pane.style.display = 'block';
          pane.classList.add('active');
        } else {
          pane.style.display = 'none';
          pane.classList.remove('active');
        }
      });

      if (view === '6-month') {
        renderSixMonthHorizon();
      } else if (view === 'checklist') {
        renderBucketList();
      }
    });
  });
}

// ----------------------------------------------------------------------------
// RENDER INTELLECTUAL RADAR · POLYMATH INTAKE ENGINE
// ----------------------------------------------------------------------------

let currentRadarTriad = null;

function extractToIntakeDailyLog(title, creator, takeaway, type) {
  const titleInput = document.getElementById('log-title-input');
  const textInput = document.getElementById('log-text-input');
  const disciplineSelect = document.getElementById('log-discipline-select');
  const tagsInput = document.getElementById('log-tags-input');
  const crossInput = document.getElementById('log-crossdomain-input');
  const dailySection = document.getElementById('section-daily');
  const deepBtn = document.getElementById('mode-deep-btn');

  if (titleInput && textInput) {
    titleInput.value = `Synthesis: ${title}`;
    textInput.value = `Source: ${creator}\n\nCore Mental Model & Extraction:\n${takeaway}\n\nImmediate Action & Synthesis in Orbit, Script, and Engineering:\n`;
    
    // Auto detect discipline
    let disc = 'first-principles';
    const combo = (title + ' ' + creator + ' ' + takeaway).toLowerCase();
    if (combo.includes('ai') || combo.includes('llm') || combo.includes('memory') || combo.includes('neural') || combo.includes('karpathy') || combo.includes('hassabis')) {
      disc = 'ai-cognition';
    } else if (combo.includes('devops') || combo.includes('system') || combo.includes('linux') || combo.includes('docker') || combo.includes('torvalds')) {
      disc = 'systems-devops';
    } else if (combo.includes('sales') || combo.includes('gtm') || combo.includes('orbit') || combo.includes('hormozi') || combo.includes('market')) {
      disc = 'gtm-growth';
    } else if (combo.includes('cinema') || combo.includes('film') || combo.includes('director') || combo.includes('nolan') || combo.includes('script')) {
      disc = 'cinema-narrative';
    } else if (combo.includes('code') || combo.includes('software') || combo.includes('debug') || combo.includes('typescript')) {
      disc = 'software-craft';
    }
    if (disciplineSelect) disciplineSelect.value = disc;

    if (crossInput) {
      crossInput.value = `Connects ${creator}'s doctrine -> Practical compounding in Orbit and personal systems`;
    }

    if (tagsInput) {
      tagsInput.value = `polymath, intake, ${type}, ${disc.split('-')[0]}`;
    }

    // Switch to deep extraction mode
    if (deepBtn && !deepBtn.classList.contains('active')) {
      deepBtn.click();
    }

    if (dailySection) {
      dailySection.scrollIntoView({ behavior: 'smooth' });
      textInput.focus();
      const composerCard = document.querySelector('.polymath-composer-card');
      if (composerCard) {
        composerCard.classList.add('is-new');
        setTimeout(() => composerCard.classList.remove('is-new'), 2000);
      }
    }
  }
}

function renderRadarSection() {
  const container = document.getElementById('radar-triad-container');
  const trackBar = document.getElementById('radar-track-bar');
  const subtitleEl = document.getElementById('radar-focus-subtitle');
  const monthSelect = document.getElementById('radar-month-select');
  if (!container || !state.radarCurriculum) return;

  const currentMonthKey = state.selectedRadarMonth || '2026-10';
  if (monthSelect && monthSelect.value !== currentMonthKey) {
    monthSelect.value = currentMonthKey;
  }

  const monthData = state.radarCurriculum.months[currentMonthKey] || state.radarCurriculum.months['2026-10'];
  if (!monthData) return;

  if (subtitleEl) {
    subtitleEl.innerHTML = `
      <span class="focus-lbl">ACTIVE FOCUS:</span>
      <span class="focus-txt">${monthData.focusSummary}</span>
    `;
  }

  // Render Track Pills
  if (trackBar) {
    const tracks = state.radarCurriculum.tracks || [];
    trackBar.innerHTML = tracks.map(t => {
      const isActive = (state.selectedRadarTrack || 'all') === t.id;
      return `
        <button type="button" class="radar-track-pill ${isActive ? 'active' : ''}" data-track-id="${t.id}" role="tab" aria-selected="${isActive}">
          <span class="pill-dot"></span>
          <span class="pill-name">${t.name}</span>
        </button>
      `;
    }).join('');

    trackBar.querySelectorAll('.radar-track-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        state.selectedRadarTrack = btn.getAttribute('data-track-id');
        state.activeRadarTriadIdx = 0;
        renderRadarSection();
      });
    });
  }

  // Filter triads by track
  const availableTriads = (state.selectedRadarTrack && state.selectedRadarTrack !== 'all')
    ? monthData.triads.filter(t => t.trackId === state.selectedRadarTrack)
    : monthData.triads;

  const triadsToChooseFrom = availableTriads.length > 0 ? availableTriads : monthData.triads;
  const triadIdx = (state.activeRadarTriadIdx || 0) % triadsToChooseFrom.length;
  currentRadarTriad = triadsToChooseFrom[triadIdx];

  if (!currentRadarTriad) return;

  // Render the 3 Triad Cards: Video Intel, Substack Essay, Book Chapter
  container.innerHTML = `
    <!-- 01: Video Intel -->
    <article class="radar-card radar-card-video">
      <div class="radar-card-header">
        <div class="radar-card-badge-row">
          <span class="radar-format-badge format-video">01 · Video</span>
          <span class="radar-meta-badge">${currentRadarTriad.video.badge}</span>
        </div>
      </div>
      <div class="radar-card-body">
        <h4 class="radar-card-title">${currentRadarTriad.video.title}</h4>
        <div class="radar-creator-line">Source: <strong>${currentRadarTriad.video.creator}</strong></div>
        <div class="radar-takeaway">
          <span class="takeaway-label">Core Insight</span>
          <p class="takeaway-text">${currentRadarTriad.video.takeaway}</p>
        </div>
      </div>
      <div class="radar-card-footer">
        <a href="${currentRadarTriad.video.url}" target="_blank" rel="noopener noreferrer" class="radar-link-btn" title="Open video in new tab">
          <span>Watch Video</span>
          <span class="btn-arrow">&nearr;</span>
        </a>
        <button type="button" class="radar-extract-btn" data-type="video" data-title="${encodeURIComponent(currentRadarTriad.video.title)}" data-creator="${encodeURIComponent(currentRadarTriad.video.creator)}" data-takeaway="${encodeURIComponent(currentRadarTriad.video.takeaway)}">
          <span>Log to Daily &rarr;</span>
        </button>
      </div>
    </article>

    <!-- 02: Substack / Longform Essay -->
    <article class="radar-card radar-card-essay">
      <div class="radar-card-header">
        <div class="radar-card-badge-row">
          <span class="radar-format-badge format-essay">02 · Essay</span>
          <span class="radar-meta-badge">${currentRadarTriad.article.badge}</span>
        </div>
      </div>
      <div class="radar-card-body">
        <h4 class="radar-card-title">${currentRadarTriad.article.title}</h4>
        <div class="radar-creator-line">Author: <strong>${currentRadarTriad.article.author}</strong></div>
        <div class="radar-takeaway">
          <span class="takeaway-label">Core Insight</span>
          <p class="takeaway-text">${currentRadarTriad.article.takeaway}</p>
        </div>
      </div>
      <div class="radar-card-footer">
        <a href="${currentRadarTriad.article.url}" target="_blank" rel="noopener noreferrer" class="radar-link-btn" title="Open article in new tab">
          <span>Read Essay</span>
          <span class="btn-arrow">&nearr;</span>
        </a>
        <button type="button" class="radar-extract-btn" data-type="essay" data-title="${encodeURIComponent(currentRadarTriad.article.title)}" data-creator="${encodeURIComponent(currentRadarTriad.article.author)}" data-takeaway="${encodeURIComponent(currentRadarTriad.article.takeaway)}">
          <span>Log to Daily &rarr;</span>
        </button>
      </div>
    </article>

    <!-- 03: Book Chapter / Specific Drill -->
    <article class="radar-card radar-card-book">
      <div class="radar-card-header">
        <div class="radar-card-badge-row">
          <span class="radar-format-badge format-book">03 · Book</span>
          <span class="radar-meta-badge">${currentRadarTriad.book.badge}</span>
        </div>
      </div>
      <div class="radar-card-body">
        <h4 class="radar-card-title">${currentRadarTriad.book.title}</h4>
        <div class="radar-creator-line">Author: <strong>${currentRadarTriad.book.author}</strong> &bull; <em>${currentRadarTriad.book.chapter}</em> (${currentRadarTriad.book.pages})</div>
        <div class="radar-takeaway">
          <span class="takeaway-label">Application</span>
          <p class="takeaway-text">${currentRadarTriad.book.takeaway}</p>
        </div>
      </div>
      <div class="radar-card-footer">
        <span class="radar-book-pill">Reading Track</span>
        <button type="button" class="radar-extract-btn" data-type="book" data-title="${encodeURIComponent(currentRadarTriad.book.title + ' — ' + currentRadarTriad.book.chapter)}" data-creator="${encodeURIComponent(currentRadarTriad.book.author)}" data-takeaway="${encodeURIComponent(currentRadarTriad.book.takeaway)}">
          <span>Log to Daily &rarr;</span>
        </button>
      </div>
    </article>
  `;

  // Attach extraction listeners
  container.querySelectorAll('.radar-extract-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-type') || 'intake';
      const title = decodeURIComponent(btn.getAttribute('data-title') || '');
      const creator = decodeURIComponent(btn.getAttribute('data-creator') || '');
      const takeaway = decodeURIComponent(btn.getAttribute('data-takeaway') || '');
      extractToIntakeDailyLog(title, creator, takeaway, type);
    });
  });
}

function setupRadarControls() {
  const monthSelect = document.getElementById('radar-month-select');
  const shuffleBtn = document.getElementById('radar-shuffle-btn');
  const aiToggleBtn = document.getElementById('radar-ai-toggle-btn');
  const aiDrawer = document.getElementById('radar-ai-drawer');
  const aiCloseBtn = document.getElementById('radar-ai-close-btn');
  const apiKeyInput = document.getElementById('radar-api-key-input');
  const saveKeyBtn = document.getElementById('radar-ai-save-btn');
  const generateBtn = document.getElementById('radar-ai-generate-btn');
  const statusEl = document.getElementById('radar-ai-status');

  if (monthSelect) {
    monthSelect.addEventListener('change', (e) => {
      state.selectedRadarMonth = e.target.value;
      state.activeRadarTriadIdx = 0;
      renderRadarSection();
    });
  }

  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', () => {
      state.activeRadarTriadIdx = (state.activeRadarTriadIdx || 0) + 1;
      renderRadarSection();
      const container = document.getElementById('radar-triad-container');
      if (container) {
        container.classList.add('triad-shuffle-pulse');
        setTimeout(() => container.classList.remove('triad-shuffle-pulse'), 300);
      }
    });
  }

  // AI Drawer toggling
  if (aiToggleBtn && aiDrawer) {
    aiToggleBtn.addEventListener('click', () => {
      const isVisible = aiDrawer.style.display !== 'none';
      aiDrawer.style.display = isVisible ? 'none' : 'block';
      if (!isVisible && apiKeyInput) {
        apiKeyInput.value = localStorage.getItem('gemini_api_key') || '';
      }
    });
  }

  if (aiCloseBtn && aiDrawer) {
    aiCloseBtn.addEventListener('click', () => {
      aiDrawer.style.display = 'none';
    });
  }

  if (saveKeyBtn && apiKeyInput && statusEl) {
    saveKeyBtn.addEventListener('click', () => {
      const key = apiKeyInput.value.trim();
      if (key) {
        localStorage.setItem('gemini_api_key', key);
        statusEl.textContent = '✓ Gemini API key saved to browser storage.';
        statusEl.className = 'radar-ai-status-msg success';
      } else {
        localStorage.removeItem('gemini_api_key');
        statusEl.textContent = 'Key removed from storage.';
        statusEl.className = 'radar-ai-status-msg';
      }
    });
  }

  if (generateBtn && apiKeyInput && statusEl) {
    generateBtn.addEventListener('click', () => {
      const key = apiKeyInput.value.trim() || localStorage.getItem('gemini_api_key');
      if (!key) {
        statusEl.textContent = 'Please paste a Gemini API key from Google AI Studio (free) to generate live custom briefs.';
        statusEl.className = 'radar-ai-status-msg active';
        apiKeyInput.focus();
        return;
      }
      generateAiRadarBrief(key);
    });
  }
}

async function generateAiRadarBrief(apiKey) {
  const statusEl = document.getElementById('radar-ai-status');
  if (!statusEl) return;
  statusEl.textContent = 'Contacting Gemini Neural Engine... synthesizing polymath intake...';
  statusEl.className = 'radar-ai-status-msg active';

  const currentMonthKey = state.selectedRadarMonth || '2026-10';
  const trackObj = (state.radarCurriculum.tracks || []).find(t => t.id === state.selectedRadarTrack) || { name: 'Polymath Synthesis', badge: 'DA VINCI × MUSK × JANE × SCOFIELD × TESLA × ALTMAN' };

  const prompt = `You are an elite polymath mentor designing a daily intake triad for an ambitious builder in ${currentMonthKey}.
The builder synthesizes:
1. Leonardo da Vinci (polymathic sketching, visual narrative, anatomy)
2. Elon Musk & Nikola Tesla (first-principles physics, extreme velocity, mental machine simulation)
3. Patrick Jane & Michael Scofield (acute deduction, baseline deviation detection, low latent inhibition, architectural system reverse-engineering)
4. Sam Altman (hyper-scaling SaaS, founder outbound, Y Combinator W27 momentum, $10k MRR to $1M/mo leverage)

Active track: "${trackObj.name}" (${trackObj.badge}).
Return ONLY a valid JSON object (no markdown formatting, no code blocks) matching this exact schema:
{
  "trackId": "${state.selectedRadarTrack || 'first_principles'}",
  "trackName": "${trackObj.name}",
  "archetype": "${trackObj.badge}",
  "video": {
    "title": "Title of high-signal YouTube video or talk",
    "creator": "Speaker or Channel",
    "duration": "Duration (e.g. 28m)",
    "url": "https://www.youtube.com/results?search_query=...",
    "badge": "YouTube · 28m",
    "takeaway": "Specific core extraction and first-principles mental model."
  },
  "article": {
    "title": "Title of Substack, blog post, or longform essay",
    "author": "Author or Publication",
    "readTime": "Reading time (e.g. 10m read)",
    "url": "https://substack.com",
    "badge": "Substack · 10m",
    "takeaway": "Key thesis and strategic takeaway."
  },
  "book": {
    "title": "Book Title",
    "author": "Author",
    "chapter": "Chapter number & title",
    "pages": "Pages or section",
    "badge": "Book · Ch. XX",
    "takeaway": "Actionable daily drill or mental model application."
  }
}`;

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 1000 }
      })
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedTriad = JSON.parse(cleanJson);

    // Save into state
    if (!state.radarCurriculum.months[currentMonthKey]) {
      state.radarCurriculum.months[currentMonthKey] = {
        monthName: currentMonthKey,
        focusSummary: 'Autonomous AI Synthesis Cycle',
        triads: []
      };
    }
    state.radarCurriculum.months[currentMonthKey].triads.unshift(parsedTriad);
    state.activeRadarTriadIdx = 0;
    statusEl.textContent = '✓ Fresh AI triad synthesized and deployed into radar!';
    statusEl.className = 'radar-ai-status-msg success';
    renderRadarSection();
  } catch (err) {
    console.error('Gemini Radar generation failed:', err);
    statusEl.textContent = `Synthesis notice: ${err.message}. Displaying pre-curated polymath curriculum.`;
    statusEl.className = 'radar-ai-status-msg error';
  }
}
// ----------------------------------------------------------------------------
// RENDER DAILY LOGS · POLYMATH & INTELLECTUAL MAXXING ENGINE
// ----------------------------------------------------------------------------

const POLY_DISCIPLINES = {
  'ai-cognition': { name: 'AI & Cognition', icon: '🧠', color: '#8b5cf6', class: 'ai-cognition', desc: 'Agent runtimes, memory graphs, LLMs, prompt evals' },
  'systems-devops': { name: 'Systems & DevOps', icon: '⚙️', color: '#06b6d4', class: 'systems-devops', desc: 'Distributed infra, low-latency queues, Envoy, Docker, Linux' },
  'gtm-growth': { name: 'GTM & Growth', icon: '📈', color: '#f59e0b', class: 'gtm-growth', desc: 'Consultative sales, offer crafting, distribution loops' },
  'software-craft': { name: 'Software Craft', icon: '🔨', color: '#10b981', class: 'software-craft', desc: 'AgentTrace, Lumen, Jarvis, full-stack pipelines, QA' },
  'cinema-narrative': { name: 'Cinema & Narrative', icon: '🎬', color: '#ec4899', class: 'cinema-narrative', desc: 'Screenwriting, visual subtext, chiaroscuro, pacing' },
  'first-principles': { name: 'First Principles', icon: '⚡', color: '#111111', class: 'first-principles', desc: 'Mental models, mathematical derivation, urgency compression' }
};

const POLYMATH_SPARK_PROMPTS = [
  "How can an Envoy graceful connection drain concept solve context switching and mental fatigue?",
  "How does Patrick Jane's mentalist cold-reading apply to high-converting B2B discovery calls for Orbit?",
  "How does Nolan's non-linear narrative cross-cutting apply to designing hierarchical graph memory in Lumen?",
  "How can database atomic idempotency locks be translated into personal non-negotiable boundaries?",
  "What would Richard Feynman strip away from your current AI architecture to make it explainable in 60 seconds?",
  "How can distributed consensus protocols (e.g. Raft) clarify multi-agent delegation in AgentTrace?",
  "How does biological muscle hypertrophy periodization apply to software shipping sprint cadences?",
  "How can cinematography motivated lighting guide spatial hierarchy in minimalist dashboard design?",
  "What is the single highest-leverage first-principles truth you learned today that breaks consensus?",
  "How does Robert Greene's Death-Ground doctrine compress execution time in your current 90-day cycle?"
];

let sparkPromptIndex = 0;

function renderPolymathStats() {
  const totalLogs = state.dailyLogs.length;
  const totalEl = document.getElementById('metric-total-logs');
  const countBadge = document.getElementById('polymath-count-val');
  const masteryEl = document.getElementById('metric-mastery-rate');
  const activeDiscEl = document.getElementById('metric-active-disciplines');
  const codeProofsEl = document.getElementById('metric-code-proofs');
  const segBar = document.getElementById('polymath-segmented-bar');
  const balanceWrap = document.querySelector('.polymath-balance-wrap');

  if (totalEl) totalEl.textContent = totalLogs;
  if (countBadge) countBadge.textContent = totalLogs;

  // Calculate deep mastery rate (logs with all 3 checkmarks)
  const fullyMastered = state.dailyLogs.filter(l => 
    l.mastery?.explainable && l.mastery?.implemented && l.mastery?.edgeTested
  ).length;
  const masteryRate = totalLogs > 0 ? Math.round((fullyMastered / totalLogs) * 100) : 0;
  if (masteryEl) masteryEl.textContent = `${masteryRate}%`;

  // Count code proofs
  const codeProofs = state.dailyLogs.filter(l => (l.implementation || '').trim().length > 0).length;
  if (codeProofsEl) codeProofsEl.textContent = codeProofs;

  // Calculate discipline counts
  const disciplineCounts = {};
  Object.keys(POLY_DISCIPLINES).forEach(k => { disciplineCounts[k] = 0; });
  state.dailyLogs.forEach(l => {
    const d = l.discipline || 'software-craft';
    disciplineCounts[d] = (disciplineCounts[d] || 0) + 1;
  });

  const activeCount = Object.values(disciplineCounts).filter(c => c > 0).length;
  if (activeDiscEl) activeDiscEl.textContent = `${activeCount}/6`;

  // Render segmented balance bar
  if (segBar && totalLogs > 0) {
    segBar.innerHTML = Object.entries(disciplineCounts).map(([key, count]) => {
      const pct = Math.round((count / totalLogs) * 100);
      if (pct === 0) return '';
      const disc = POLY_DISCIPLINES[key] || { name: key, color: '#999' };
      const shortClass = key.replace('-', '');
      return `<div class="bar-segment ${shortClass}" style="width: ${pct}%; background: ${disc.color};" title="${disc.name}: ${count} insights (${pct}%)"></div>`;
    }).join('');

    // Append legend if not present
    let legend = balanceWrap?.querySelector('.polymath-balance-legend');
    if (!legend && balanceWrap) {
      legend = document.createElement('div');
      legend.className = 'polymath-balance-legend';
      balanceWrap.appendChild(legend);
    }
    if (legend) {
      legend.innerHTML = Object.entries(disciplineCounts).map(([key, count]) => {
        const disc = POLY_DISCIPLINES[key] || { name: key, color: '#999' };
        const shortClass = key.replace('-', '');
        return `
          <div class="legend-item" title="${disc.desc}">
            <span class="legend-dot ${shortClass}" style="background: ${disc.color};"></span>
            <span>${disc.icon} ${disc.name} (${count})</span>
          </div>
        `;
      }).join('');
    }
  }
}

function renderDisciplineFilterBar() {
  const container = document.getElementById('discipline-filter-pills');
  if (!container) return;

  container.querySelectorAll('.discipline-pill').forEach(btn => {
    const disc = btn.getAttribute('data-discipline');
    const isActive = (state.activeDisciplineFilter || 'ALL') === disc;
    btn.classList.toggle('active', isActive);

    btn.onclick = () => {
      state.activeDisciplineFilter = disc;
      renderDisciplineFilterBar();
      renderDailyLogs();
    };
  });
}

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
      all tags (${state.dailyLogs.length})
    </button>
  `;

  allTags.forEach(tag => {
    const isActive = currentTag === tag ? 'active' : '';
    html += `
      <span class="filter-tag-sep">/</span>
      <button type="button" class="filter-tag-link ${isActive}" data-tag="${tag}">
        #${tag} (${tagCounts[tag]})
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

  renderPolymathStats();

  const activeTag = (state.activeLogTag || 'ALL').toLowerCase();
  const activeDisc = state.activeDisciplineFilter || 'ALL';
  const query = (state.logSearchQuery || '').trim().toLowerCase();

  const filtered = state.dailyLogs.filter(log => {
    // 1. Tag Filter
    if (activeTag !== 'all') {
      const logTags = (log.tags || []).map(t => t.toLowerCase());
      if (!logTags.includes(activeTag)) return false;
    }
    // 2. Discipline Filter
    if (activeDisc !== 'ALL') {
      const logDisc = log.discipline || 'software-craft';
      if (logDisc !== activeDisc) return false;
    }
    // 3. Search Query Filter
    if (query) {
      const searchable = [
        log.title,
        log.learned,
        log.implementation,
        log.crossDomain,
        (log.tags || []).join(' ')
      ].join(' ').toLowerCase();
      if (!searchable.includes(query)) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    feed.innerHTML = `
      <div class="empty-logs-notice">
        No polymath insights found matching the current filters.
        <button type="button" class="btn-clear-filter" id="clear-all-filters-btn">Reset Filters</button>
      </div>
    `;
    const clearBtn = document.getElementById('clear-all-filters-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        state.activeLogTag = 'ALL';
        state.activeDisciplineFilter = 'ALL';
        state.logSearchQuery = '';
        const searchInput = document.getElementById('polymath-search-input');
        if (searchInput) searchInput.value = '';
        const clearSearch = document.getElementById('clear-search-btn');
        if (clearSearch) clearSearch.style.display = 'none';
        renderDisciplineFilterBar();
        renderTagFilterBar();
        renderDailyLogs();
      });
    }
    return;
  }

  feed.innerHTML = filtered.map(log => {
    const isNew = highlightId && log.id === highlightId ? 'is-new' : '';
    const tags = Array.isArray(log.tags) ? log.tags : [];
    const discKey = log.discipline || 'software-craft';
    const discInfo = POLY_DISCIPLINES[discKey] || { name: 'Polymath', icon: '⚡', color: '#111', class: 'software-craft' };
    const wordCount = (log.learned || '').split(/\s+/).length;
    const readTime = Math.max(1, Math.round(wordCount / 120));

    return `
      <article class="polymath-log-card ${isNew}" data-id="${log.id}">
        <div class="polymath-card-top">
          <div class="polymath-meta-left">
            <span class="discipline-badge ${discInfo.class}">
              ${discInfo.icon} ${discInfo.name}
            </span>
            <span class="log-date-badge">${escapeHtml(log.date)} &bull; ${readTime} MIN READ</span>
            
            <div class="polymath-mastery-pills">
              <span class="mastery-pill ${log.mastery?.explainable ? 'verified' : ''}" title="${log.mastery?.explainable ? 'Can explain simply in 60s without notes' : 'Pending simple explanation test'}">
                ${log.mastery?.explainable ? '[✓ EXPLAIN]' : '[· EXPLAIN]'}
              </span>
              <span class="mastery-pill ${log.mastery?.implemented ? 'verified' : ''}" title="${log.mastery?.implemented ? 'Verified in working code or real experiment' : 'Concept only - not yet tested in code'}">
                ${log.mastery?.implemented ? '[✓ CODE]' : '[· CODE]'}
              </span>
              <span class="mastery-pill ${log.mastery?.edgeTested ? 'verified' : ''}" title="${log.mastery?.edgeTested ? 'Failure modes and boundary conditions mapped' : 'Edge cases not yet stress-tested'}">
                ${log.mastery?.edgeTested ? '[✓ EDGES]' : '[· EDGES]'}
              </span>
            </div>
          </div>

          <div class="polymath-card-actions">
            <button type="button" class="polymath-action-btn" data-copy-id="${log.id}" title="Copy formatted Markdown">copy md</button>
            <button type="button" class="polymath-action-btn polymath-delete-btn" data-delete-id="${log.id}" title="Delete entry">&times;</button>
          </div>
        </div>

        <h3 class="polymath-log-title">${escapeHtml(log.title)}</h3>
        <p class="polymath-log-body">${escapeHtml(log.learned).replace(/\n/g, '<br>')}</p>

        ${log.implementation ? `
          <div class="polymath-code-box">
            <div class="polymath-code-header">
              <span>[VERIFIABLE CODE / IMPLEMENTATION PROOF]</span>
              <button type="button" class="btn-copy-code" data-code="${encodeURIComponent(log.implementation)}">copy code</button>
            </div>
            <pre class="polymath-code-pre"><code>${escapeHtml(log.implementation)}</code></pre>
          </div>
        ` : ''}

        ${log.crossDomain ? `
          <div class="polymath-cross-strip">
            <span class="cross-badge">[POLYMATH BRIDGE]</span>
            <span>${escapeHtml(log.crossDomain)}</span>
          </div>
        ` : ''}

        <div class="polymath-tags-row">
          ${tags.map(t => `<button type="button" class="polymath-tag-pill" data-filter-to="${escapeHtml(t)}">#${escapeHtml(t)}</button>`).join('')}
        </div>
      </article>
    `;
  }).join('');

  // Click on a tag pill in a card filters to that tag
  feed.querySelectorAll('.polymath-tag-pill').forEach(pill => {
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
  feed.querySelectorAll('.polymath-action-btn[data-copy-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const logId = btn.getAttribute('data-copy-id');
      const item = state.dailyLogs.find(l => l.id === logId);
      if (!item) return;

      const tagsStr = (item.tags || []).map(t => `#${t}`).join(' ');
      let snippet = `### [${item.date}] [${(item.discipline || 'polymath').toUpperCase()}] ${item.title} ${tagsStr}\n\n${item.learned}`;
      if (item.implementation) {
        snippet += `\n\n\`\`\`\n${item.implementation}\n\`\`\``;
      }
      if (item.crossDomain) {
        snippet += `\n\n> **Polymath Bridge:** ${item.crossDomain}`;
      }

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

  // Copy code snippet
  feed.querySelectorAll('.btn-copy-code').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const code = decodeURIComponent(btn.getAttribute('data-code') || '');
      if (!code) return;
      navigator.clipboard.writeText(code).then(() => {
        const orig = btn.textContent;
        btn.textContent = 'copied!';
        setTimeout(() => { btn.textContent = orig; }, 1500);
      });
    });
  });

  // Delete entry
  feed.querySelectorAll('.polymath-delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const logId = btn.getAttribute('data-delete-id');
      if (confirm('Delete this polymath insight from your vault?')) {
        state.dailyLogs = state.dailyLogs.filter(l => l.id !== logId);
        saveStored(STORAGE_KEYS.DAILY_LOGS, state.dailyLogs);
        deleteCloudDailyLog(logId).catch(err => console.warn('Supabase delete error:', err));
        renderTagFilterBar();
        renderDailyLogs();
      }
    });
  });
}

function setupPolymathComposer() {
  const quickBtn = document.getElementById('mode-quick-btn');
  const deepBtn = document.getElementById('mode-deep-btn');
  const deepContainer = document.getElementById('deep-fields-container');
  const sparkBtn = document.getElementById('btn-spark-prompt');
  const searchInput = document.getElementById('polymath-search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');

  // Mode tabs
  if (quickBtn && deepBtn && deepContainer) {
    quickBtn.onclick = () => {
      quickBtn.classList.add('active');
      deepBtn.classList.remove('active');
      deepContainer.style.display = 'none';
    };
    deepBtn.onclick = () => {
      deepBtn.classList.add('active');
      quickBtn.classList.remove('active');
      deepContainer.style.display = 'flex';
    };
  }

  // Spark prompt button
  if (sparkBtn) {
    sparkBtn.onclick = () => {
      const prompt = POLYMATH_SPARK_PROMPTS[sparkPromptIndex % POLYMATH_SPARK_PROMPTS.length];
      sparkPromptIndex++;
      const crossInput = document.getElementById('log-crossdomain-input');
      const textInput = document.getElementById('log-text-input');
      if (deepBtn && !deepBtn.classList.contains('active')) {
        deepBtn.click();
      }
      if (crossInput) {
        crossInput.value = prompt;
        crossInput.focus();
      } else if (textInput) {
        textInput.value = textInput.value ? `${textInput.value}\n\n[POLYMATH PROMPT]: ${prompt}` : `[POLYMATH PROMPT]: ${prompt}\n\nSynthesis:\n`;
        textInput.focus();
      }
    };
  }

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.logSearchQuery = e.target.value;
      if (clearSearchBtn) {
        clearSearchBtn.style.display = e.target.value.trim().length > 0 ? 'inline-block' : 'none';
      }
      renderDailyLogs();
    });
  }

  if (clearSearchBtn && searchInput) {
    clearSearchBtn.onclick = () => {
      searchInput.value = '';
      state.logSearchQuery = '';
      clearSearchBtn.style.display = 'none';
      renderDailyLogs();
      searchInput.focus();
    };
  }
}

// ----------------------------------------------------------------------------
// TACTILE FOLDER TABS CONTROLLER
// ----------------------------------------------------------------------------

function setupFolderTabs() {
  const tabs = document.querySelectorAll('.folder-tabs-header .folder-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.folders-container .folder-pane').forEach(p => p.classList.remove('active'));

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
      const disciplineSelect = document.getElementById('log-discipline-select');
      const implementationInput = document.getElementById('log-implementation-input');
      const crossdomainInput = document.getElementById('log-crossdomain-input');
      const tagsInput = document.getElementById('log-tags-input');

      const checkExplain = document.getElementById('check-explain');
      const checkImplement = document.getElementById('check-implement');
      const checkEdge = document.getElementById('check-edge');

      const title = titleInput ? titleInput.value.trim() : '';
      const text = textInput ? textInput.value.trim() : '';
      const discipline = disciplineSelect ? disciplineSelect.value : 'software-craft';
      const implementation = implementationInput ? implementationInput.value.trim() : '';
      const crossDomain = crossdomainInput ? crossdomainInput.value.trim() : '';
      const rawTags = tagsInput ? tagsInput.value.trim() : '';

      if (!title || !text) {
        alert('Please provide a core thesis and what you learned.');
        return;
      }

      let tags = [];
      if (rawTags) {
        tags = rawTags.split(/[,]+/)
          .map(t => t.trim().toLowerCase().replace(/^#+/, '').replace(/\s+/g, '-'))
          .filter(Boolean);
      }
      if (tags.length === 0) {
        tags = [discipline.split('-')[0]];
      }

      const today = new Date().toISOString().split('T')[0];
      const newEntry = {
        id: 'log-' + Date.now(),
        date: today,
        title: title,
        discipline: discipline,
        learned: text,
        implementation: implementation,
        crossDomain: crossDomain,
        mastery: {
          explainable: checkExplain ? checkExplain.checked : true,
          implemented: checkImplement ? checkImplement.checked : Boolean(implementation),
          edgeTested: checkEdge ? checkEdge.checked : false
        },
        tags: tags
      };

      state.dailyLogs.unshift(newEntry);
      saveStored(STORAGE_KEYS.DAILY_LOGS, state.dailyLogs);
      upsertCloudDailyLog(newEntry).catch(err => console.warn('Supabase log upsert error:', err));

      state.activeLogTag = 'ALL';
      state.activeDisciplineFilter = 'ALL';
      state.logSearchQuery = '';
      const searchInput = document.getElementById('polymath-search-input');
      if (searchInput) searchInput.value = '';

      renderDisciplineFilterBar();
      renderTagFilterBar();
      renderDailyLogs(newEntry.id);

      if (titleInput) titleInput.value = '';
      if (textInput) textInput.value = '';
      if (implementationInput) implementationInput.value = '';
      if (crossdomainInput) crossdomainInput.value = '';
      if (tagsInput) tagsInput.value = '';

      // Switch back to quick mode after saving
      const quickBtn = document.getElementById('mode-quick-btn');
      if (quickBtn) quickBtn.click();
    });
  }

  const exportBtn = document.getElementById('export-logs-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const today = new Date().toISOString().split('T')[0];
      let md = `---
title: Polymath Knowledge Vault
author: BOLD Ocean
vault: Intellectual Operating System
exported_at: ${today}
total_laws: ${state.dailyLogs.length}
---

# WHAT I LEARNED — POLYMATH KNOWLEDGE VAULT

> "What I cannot create, I do not understand." — Richard Feynman

---

`;
      // Group by discipline
      const groups = {};
      Object.keys(POLY_DISCIPLINES).forEach(d => { groups[d] = []; });
      state.dailyLogs.forEach(l => {
        const d = l.discipline || 'software-craft';
        if (!groups[d]) groups[d] = [];
        groups[d].push(l);
      });

      Object.entries(groups).forEach(([discKey, logs]) => {
        if (logs.length === 0) return;
        const disc = POLY_DISCIPLINES[discKey] || { name: discKey, icon: '⚡' };
        md += `\n## ${disc.icon} ${disc.name.toUpperCase()} (${logs.length})\n\n`;

        logs.forEach(l => {
          const tagsLine = (l.tags || []).map(t => `#${t}`).join(' ');
          const masteryBadges = [
            l.mastery?.explainable ? 'Explainable' : null,
            l.mastery?.implemented ? 'Code Verified' : null,
            l.mastery?.edgeTested ? 'Edge Tested' : null
          ].filter(Boolean).join(' | ');

          md += `### [${l.date}] ${l.title}\n`;
          if (tagsLine) md += `**Tags:** ${tagsLine} ${masteryBadges ? `• **Mastery:** [${masteryBadges}]` : ''}\n\n`;
          md += `${l.learned}\n\n`;

          if (l.implementation) {
            md += `#### Implementation / Code Proof:\n\`\`\`\n${l.implementation}\n\`\`\`\n\n`;
          }

          if (l.crossDomain) {
            md += `> **Polymath Bridge:** ${l.crossDomain}\n\n`;
          }

          md += `---\n\n`;
        });
      });

      const blob = new Blob([md], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `polymath-knowledge-vault-${today}.md`;
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

  // Keep cadence graphs and 30-day November timeline dynamically updated every minute
  setInterval(() => {
    updateHeroCadenceGraphs();
    renderNovemberTargets();
  }, 60000);
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
  if (monthPctLeftEl) monthPctLeftEl.textContent = `${monthPctElapsed}%`;
  if (yearDaysLeftEl) yearDaysLeftEl.textContent = `${yearDaysLeft}`;
  if (yearPctLeftEl) yearPctLeftEl.textContent = `${yearPctElapsed}%`;

  const monthName = now.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  if (dateStrEl) {
    dateStrEl.textContent = `${monthName} ${year} • DAY ${dayOfYear} / ${totalDaysInYear}`;
  }
  const monthLabelEl = document.getElementById('cadence-month-label');
  if (monthLabelEl) {
    monthLabelEl.textContent = `MONTH // ${monthName}`;
  }
  const monthEndScaleEl = document.getElementById('cadence-month-end-scale');
  if (monthEndScaleEl) {
    monthEndScaleEl.textContent = `${daysInMonth}`;
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
// THEME SWITCHER (DARK & LIGHT MODE)
// ----------------------------------------------------------------------------

function setupThemeToggle() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  if (typeof window.updateThemeButton === 'function') {
    window.updateThemeButton(currentTheme);
  }
}

// Backwards compatibility aliases
function renderOctoberTargets() {
  renderNovemberTargets();
}
function renderSeptemberTargets() {
  renderNovemberTargets();
}

// ----------------------------------------------------------------------------
// SCROLL-SPY NAVIGATION TRACKER
// ----------------------------------------------------------------------------

function setupScrollSpy() {
  const navItems = document.querySelectorAll('.nav-strip .nav-item');
  if (!navItems.length) return;

  const sectionIds = Array.from(navItems).map(item => {
    const href = item.getAttribute('href');
    return href && href.startsWith('#') ? href.substring(1) : null;
  }).filter(Boolean);

  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
  if (!sections.length) return;

  let isTicking = false;

  function updateActiveNav() {
    const scrollPos = window.scrollY + 140; // buffer for sticky nav & header
    let currentSectionId = '';

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.id;
        break;
      }
    }

    // Edge case: if near bottom of page, activate last section
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 60)) {
      currentSectionId = sections[sections.length - 1].id;
    }

    navItems.forEach(item => {
      const href = item.getAttribute('href');
      if (currentSectionId && href === `#${currentSectionId}`) {
        item.classList.add('active');
        item.setAttribute('aria-current', 'true');
      } else {
        item.classList.remove('active');
        item.removeAttribute('aria-current');
      }
    });

    isTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!isTicking) {
      window.requestAnimationFrame(updateActiveNav);
      isTicking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (!isTicking) {
      window.requestAnimationFrame(updateActiveNav);
      isTicking = true;
    }
  }, { passive: true });

  // Initial trigger
  updateActiveNav();
}

// ----------------------------------------------------------------------------
// SUPABASE CLOUD DATABASE CONTROLLER & MODAL
// ----------------------------------------------------------------------------

function updateDatabaseStatusUI(status, message) {
  const syncBtn = document.getElementById('db-sync-btn');
  const syncText = syncBtn ? syncBtn.querySelector('.db-sync-text') : null;
  const statusBanner = document.getElementById('db-status-banner');
  const statusText = document.getElementById('db-status-text');
  const disconnectBtn = document.getElementById('db-disconnect-btn');
  const connectBtn = document.getElementById('db-connect-btn');

  if (status === 'connected') {
    if (syncBtn) {
      syncBtn.classList.remove('syncing', 'error');
      syncBtn.classList.add('synced');
    }
    if (syncText) syncText.textContent = 'CLOUD SYNCED';
    if (statusBanner) {
      statusBanner.className = 'db-status-banner connected';
    }
    if (statusText) {
      statusText.textContent = message || 'STATUS: CONNECTED TO SUPABASE (CLOUD SYNC ACTIVE)';
    }
    if (disconnectBtn) disconnectBtn.style.display = 'inline-block';
    if (connectBtn) connectBtn.textContent = 'SAVE & RE-SYNC';
  } else if (status === 'syncing') {
    if (syncBtn) {
      syncBtn.classList.remove('synced', 'error');
      syncBtn.classList.add('syncing');
    }
    if (syncText) syncText.textContent = 'SYNCING...';
    if (statusBanner) {
      statusBanner.className = 'db-status-banner syncing';
    }
    if (statusText) statusText.textContent = message || 'STATUS: SYNCHRONIZING CLOUD & LOCAL DATA...';
  } else if (status === 'error') {
    if (syncBtn) {
      syncBtn.classList.remove('synced', 'syncing');
      syncBtn.classList.add('error');
    }
    if (syncText) syncText.textContent = 'SYNC ERROR';
    if (statusBanner) {
      statusBanner.className = 'db-status-banner error';
    }
    if (statusText) statusText.textContent = message || 'STATUS: SYNC ERROR (CHECK CREDENTIALS)';
  } else {
    // local / disconnected
    if (syncBtn) {
      syncBtn.classList.remove('synced', 'syncing', 'error');
    }
    if (syncText) syncText.textContent = 'DB SYNC';
    if (statusBanner) {
      statusBanner.className = 'db-status-banner disconnected';
    }
    if (statusText) statusText.textContent = 'STATUS: LOCAL ONLY (NOT CONNECTED TO CLOUD)';
    if (disconnectBtn) disconnectBtn.style.display = 'none';
    if (connectBtn) connectBtn.textContent = 'CONNECT & SYNC NOW';
  }
}

async function syncCloudData() {
  if (!isSupabaseConnected()) {
    updateDatabaseStatusUI('disconnected');
    return;
  }

  updateDatabaseStatusUI('syncing', 'FETCHING FROM SUPABASE CLOUD...');

  try {
    // 1. Fetch & merge daily logs
    const cloudLogs = await fetchCloudDailyLogs();
    if (Array.isArray(cloudLogs)) {
      const localMap = new Map();
      state.dailyLogs.forEach(l => localMap.set(l.id, l));

      let newlyImported = 0;
      cloudLogs.forEach(cl => {
        if (!localMap.has(cl.id)) {
          state.dailyLogs.push(cl);
          localMap.set(cl.id, cl);
          newlyImported++;
        }
      });

      state.dailyLogs.sort((a, b) => new Date(b.date) - new Date(a.date));
      saveStored(STORAGE_KEYS.DAILY_LOGS, state.dailyLogs);

      // Upload local logs that aren't yet in cloud
      const cloudIds = new Set(cloudLogs.map(c => c.id));
      for (const localLog of localMap.values()) {
        if (!cloudIds.has(localLog.id)) {
          await upsertCloudDailyLog(localLog).catch(e => console.warn('Cloud upload log err:', e));
        }
      }

      if (newlyImported > 0 && document.getElementById('log-feed')) {
        renderDisciplineFilterBar();
        renderTagFilterBar();
        renderDailyLogs();
        renderPolymathStats();
      }
    }

    // 2. Fetch & merge target milestones
    const cloudMilestones = await fetchCloudMilestones();
    if (cloudMilestones && typeof cloudMilestones === 'object') {
      const savedMilestones = loadStored(STORAGE_KEYS.TARGET_MILESTONES, {});
      let milestoneChanges = false;

      // Update state.novemberTargets
      const targets = state.novemberTargets || state.octoberTargets || state.targets || [];
      targets.forEach(t => {
        if (t.milestones) {
          t.milestones.forEach(m => {
            if (cloudMilestones[m.id] !== undefined) {
              if (m.completed !== cloudMilestones[m.id]) {
                m.completed = cloudMilestones[m.id];
                milestoneChanges = true;
              }
              savedMilestones[m.id] = m.completed;
            } else if (savedMilestones[m.id] !== undefined) {
              upsertCloudMilestone(m.id, savedMilestones[m.id]).catch(() => {});
            }
          });
          const completedCount = t.milestones.filter(m => m.completed).length;
          t.currentValue = t.milestones.length > 0 ? Math.round((completedCount / t.milestones.length) * t.targetValue) : 0;
        }
      });
      saveStored(STORAGE_KEYS.TARGET_MILESTONES, savedMilestones);

      // Update state.q4Goals
      const q4List = state.q4Goals || state.bucketList || [];
      let q4Changes = false;
      q4List.forEach(item => {
        if (cloudMilestones[item.id] !== undefined) {
          if (item.completed !== cloudMilestones[item.id]) {
            item.completed = cloudMilestones[item.id];
            q4Changes = true;
          }
        }
      });
      if (q4Changes) {
        saveStored(STORAGE_KEYS.Q4_GOALS, q4List);
        saveStored(STORAGE_KEYS.BUCKET_LIST, q4List);
      }

      if (milestoneChanges) {
        renderNovemberTargets();
      }
      if (q4Changes) {
        renderBucketList();
        renderSixMonthHorizon();
      }
    }

    updateDatabaseStatusUI('connected', 'STATUS: SYNCED WITH SUPABASE CLOUD (SAFE)');
  } catch (err) {
    console.error('Cloud sync error:', err);
    updateDatabaseStatusUI('error', `STATUS: SYNC ERROR (${err.message || 'Check network / policies'})`);
  }
}

function setupDatabaseModal() {
  const syncBtn = document.getElementById('db-sync-btn');
  const modal = document.getElementById('db-modal');
  const closeBtn = document.getElementById('db-modal-close');
  const configForm = document.getElementById('db-config-form');
  const urlInput = document.getElementById('sb-url-input');
  const keyInput = document.getElementById('sb-key-input');
  const disconnectBtn = document.getElementById('db-disconnect-btn');
  const copySqlBtn = document.getElementById('copy-sql-btn');

  if (!modal) return;

  const config = loadSupabaseConfig();
  if (config.url && urlInput) urlInput.value = config.url;
  if (config.anonKey && keyInput) keyInput.value = config.anonKey;

  if (isSupabaseConnected()) {
    updateDatabaseStatusUI('connected');
  } else {
    updateDatabaseStatusUI('disconnected');
  }

  function openModal() {
    if (typeof modal.showModal === 'function') {
      modal.showModal();
    } else {
      modal.setAttribute('open', '');
    }
  }

  function closeModal() {
    if (typeof modal.close === 'function') {
      modal.close();
    } else {
      modal.removeAttribute('open');
    }
  }

  if (syncBtn) {
    syncBtn.addEventListener('click', openModal);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  if (configForm) {
    configForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const url = urlInput ? urlInput.value.trim() : '';
      const anonKey = keyInput ? keyInput.value.trim() : '';

      if (!url || !anonKey) {
        alert('Please enter both Supabase Project URL and Anon Public Key.');
        return;
      }

      updateDatabaseStatusUI('syncing', 'VALIDATING SUPABASE CONNECTION...');
      const testRes = await testConnection(url, anonKey);
      if (!testRes.success) {
        updateDatabaseStatusUI('error', `ERROR: ${testRes.error}`);
        alert(`Supabase connection test failed:\n${testRes.error}`);
        return;
      }

      saveSupabaseConfig(url, anonKey);
      await initSupabase(url, anonKey);
      await syncCloudData();
      closeModal();
    });
  }

  if (disconnectBtn) {
    disconnectBtn.addEventListener('click', () => {
      if (confirm('Disconnect from Supabase? All data will remain safely in your browser localStorage.')) {
        saveSupabaseConfig('', '');
        initSupabase('', '');
        updateDatabaseStatusUI('disconnected');
        if (urlInput) urlInput.value = '';
        if (keyInput) keyInput.value = '';
        closeModal();
      }
    });
  }

  if (copySqlBtn) {
    copySqlBtn.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(SQL_SCHEMA).then(() => {
          const original = copySqlBtn.textContent;
          copySqlBtn.textContent = 'COPIED!';
          setTimeout(() => { copySqlBtn.textContent = original; }, 2000);
        }).catch(() => {
          alert('Could not auto-copy. Please select and copy the SQL code below.');
        });
      }
    });
  }
}

// ----------------------------------------------------------------------------
// INITIAL BOOTSTRAP
// ----------------------------------------------------------------------------

function initApp() {
  setupThemeToggle();
  renderCrossStitchHero();
  updateHeroCadenceGraphs();
  setupFolderTabs();
  renderNovemberTargets();
  renderFiveYearHorizon();
  setupTargetViewSwitcher();
  setupBucketHorizonFilters();
  renderBucketList();
  renderSixMonthHorizon();
  setupEventListeners();
  setupScrollSpy();
  setupDatabaseModal();

  initSupabase().then(() => {
    if (isSupabaseConnected()) {
      syncCloudData();
    }
  }).catch(err => {
    console.warn('Initial Supabase boot notice:', err);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
