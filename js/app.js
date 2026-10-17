import { initialData } from './data.js';
import { renderCrossStitchSVG } from './stitch-font.js';

// ============================================================================
// MAXXING // PERSONAL OPERATING SYSTEM CONTROLLER
// One primary growth focus. A few supporting habits. Everything else deliberately deprioritized.
// ============================================================================

const STORAGE_KEY = 'maxxing_system_state_v1';

// Legacy keys for automatic backward compatibility migration
const LEGACY_KEYS = {
  DAILY_LOGS: 'bold_daily_logs_v3',
  Q4_GOALS: 'bold_q4_goals_v1',
  OCT_MILESTONES: 'bold_october_milestones_v4'
};

function loadStored(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.warn('Storage read failed for', key, e);
    return fallback;
  }
}

function saveStored(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('Storage write failed for', key, e);
  }
}

// ----------------------------------------------------------------------------
// STATE INITIALIZATION & MIGRATION
// ----------------------------------------------------------------------------
function initState() {
  const saved = loadStored(STORAGE_KEY, null);

  // If previous unified state exists, merge with fallback
  if (saved && typeof saved === 'object') {
    return {
      profile: { ...initialData.profile, ...(saved.profile || {}) },
      priorities: { ...initialData.priorities, ...(saved.priorities || {}) },
      todayActions: Array.isArray(saved.todayActions) ? saved.todayActions : initialData.todayActions,
      projects: Array.isArray(saved.projects) && saved.projects.length > 0 ? saved.projects : initialData.projects,
      physical: {
        profile: { ...initialData.physical.profile, ...(saved.physical?.profile || {}) },
        supportingHabits: { ...initialData.physical.supportingHabits, ...(saved.physical?.supportingHabits || {}) },
        workoutLogs: Array.isArray(saved.physical?.workoutLogs) ? saved.physical.workoutLogs : initialData.physical.workoutLogs,
        weightHistory: Array.isArray(saved.physical?.weightHistory) ? saved.physical.weightHistory : initialData.physical.weightHistory
      },
      intellectualNotes: Array.isArray(saved.intellectualNotes) && saved.intellectualNotes.length > 0 ? saved.intellectualNotes : initialData.intellectualNotes,
      contentPipeline: Array.isArray(saved.contentPipeline) ? saved.contentPipeline : initialData.contentPipeline,
      career: { ...initialData.career, ...(saved.career || {}) },
      weeklyReviews: Array.isArray(saved.weeklyReviews) ? saved.weeklyReviews : initialData.weeklyReviews,
      strategicCycles: Array.isArray(saved.strategicCycles) ? saved.strategicCycles : initialData.strategicCycles,
      settings: { ...initialData.settings, ...(saved.settings || {}) },
      fiveYearHorizon: initialData.fiveYearHorizon,
      radarCurriculum: initialData.radarCurriculum,
      selectedRadarMonth: '2026-10',
      activeRadarTriadIdx: 0,
      activeLogTag: 'ALL',
      activeActionFilter: 'all',
      searchQueryNotes: ''
    };
  }

  // Check legacy stores for migration
  const legacyLogs = loadStored(LEGACY_KEYS.DAILY_LOGS, null);
  let migratedNotes = [...initialData.intellectualNotes];
  if (Array.isArray(legacyLogs) && legacyLogs.length > 0) {
    const existingIds = new Set(migratedNotes.map(n => n.id));
    legacyLogs.forEach(l => {
      if (!existingIds.has(l.id)) {
        migratedNotes.push({
          id: l.id || 'note-' + Date.now(),
          date: l.date || new Date().toISOString().split('T')[0],
          topic: (l.tags && l.tags[0]) || 'General',
          concept: l.title || 'Migrated Insight',
          explanation: l.learned || '',
          whyItMatters: 'Preserved from daily log archive.',
          practicalExample: '',
          appliedProjectId: 'general',
          questions: '',
          references: '',
          tags: Array.isArray(l.tags) ? l.tags : ['general'],
          understanding: {
            canExplainWithoutNotes: true,
            canImplement: true,
            knowsLimitations: true
          }
        });
      }
    });
  }

  return {
    profile: initialData.profile,
    priorities: initialData.priorities,
    todayActions: initialData.todayActions,
    projects: initialData.projects,
    physical: initialData.physical,
    intellectualNotes: migratedNotes,
    contentPipeline: initialData.contentPipeline,
    career: initialData.career,
    weeklyReviews: initialData.weeklyReviews,
    strategicCycles: initialData.strategicCycles,
    settings: initialData.settings,
    fiveYearHorizon: initialData.fiveYearHorizon,
    radarCurriculum: initialData.radarCurriculum,
    selectedRadarMonth: '2026-10',
    activeRadarTriadIdx: 0,
    activeLogTag: 'ALL',
    activeActionFilter: 'all',
    searchQueryNotes: ''
  };
}

let state = initState();

function persistState() {
  saveStored(STORAGE_KEY, {
    profile: state.profile,
    priorities: state.priorities,
    todayActions: state.todayActions,
    projects: state.projects,
    physical: state.physical,
    intellectualNotes: state.intellectualNotes,
    contentPipeline: state.contentPipeline,
    career: state.career,
    weeklyReviews: state.weeklyReviews,
    strategicCycles: state.strategicCycles,
    settings: state.settings
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function showToast(message) {
  let toast = document.getElementById('maxxing-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'maxxing-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: var(--ink-primary);
      color: var(--bg-canvas);
      border: 1.5px solid var(--rule-strong);
      padding: 10px 18px;
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      box-shadow: 4px 4px 0px var(--rule-strong);
      z-index: 9999;
      pointer-events: none;
      transition: opacity 0.25s ease, transform 0.25s ease;
      opacity: 0;
      transform: translateY(10px);
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
  }, 2200);
}

// ----------------------------------------------------------------------------
// 1. PRECISION TIME CADENCE MONITOR
// ----------------------------------------------------------------------------
function updateTimeCadence() {
  const now = new Date();
  const timeEl = document.getElementById('live-time-display');
  if (timeEl) {
    const pad = n => String(n).padStart(2, '0');
    timeEl.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  }

  // Reference year 2026 October sprint cadence
  const year = 2026;
  const monthIdx = 9; // October (0-indexed)
  const totalDaysInMonth = 31;
  const currentDay = Math.min(Math.max(now.getDate(), 1), 31);
  const daysLeftInMonth = Math.max(0, totalDaysInMonth - currentDay);
  const monthPct = Math.round((currentDay / totalDaysInMonth) * 100);

  const monthFill = document.getElementById('hero-month-fill');
  const monthDaysLeft = document.getElementById('hero-month-days-left');
  const monthPctLeft = document.getElementById('hero-month-pct-left');
  const dateStr = document.getElementById('cadence-date-str');

  if (monthFill) monthFill.style.width = `${monthPct}%`;
  if (monthDaysLeft) monthDaysLeft.textContent = daysLeftInMonth;
  if (monthPctLeft) monthPctLeft.textContent = `${monthPct}%`;
  if (dateStr) dateStr.textContent = `OCT 2026 • DAY ${String(currentDay).padStart(2, '0')} / 31`;

  // Quarter progress (Q4: Oct, Nov, Dec = 92 days)
  const daysElapsedQ4 = (currentDay - 1);
  const totalDaysQ4 = 92;
  const daysLeftQ4 = Math.max(0, totalDaysQ4 - daysElapsedQ4);
  const q4Pct = Math.round((daysElapsedQ4 / totalDaysQ4) * 100);

  const yearFill = document.getElementById('hero-year-fill');
  const yearDaysLeft = document.getElementById('hero-year-days-left');
  const yearPctLeft = document.getElementById('hero-year-pct-left');

  if (yearFill) yearFill.style.width = `${Math.max(q4Pct, 5)}%`;
  if (yearDaysLeft) yearDaysLeft.textContent = daysLeftQ4;
  if (yearPctLeft) yearPctLeft.textContent = `${q4Pct}%`;
}

// ----------------------------------------------------------------------------
// 2. COMMAND CENTER
// ----------------------------------------------------------------------------
function getFlagshipProject() {
  const flagship = state.projects.find(p => p.id === state.settings.flagshipProjectId) ||
                   state.projects.find(p => p.isFlagship) ||
                   state.projects[0];
  return flagship;
}

function renderCommandCenter() {
  // 1. North Star & 90-Day Objective
  const northStarEl = document.getElementById('display-north-star');
  const cycleObjEl = document.getElementById('display-cycle-objective');
  if (northStarEl) northStarEl.textContent = state.profile.northStar || initialData.profile.northStar;
  if (cycleObjEl) cycleObjEl.textContent = state.profile.current90DayObjective || initialData.profile.current90DayObjective;

  // 2. Current Focus (Flagship Spotlight)
  const flagship = getFlagshipProject();
  if (flagship) {
    const titleEl = document.getElementById('focus-project-title');
    const phaseEl = document.getElementById('focus-phase-display');
    const headlineEl = document.getElementById('focus-headline-text');
    const rationaleEl = document.getElementById('focus-rationale-text');
    const actionEl = document.getElementById('focus-next-action-text');
    const milestoneEl = document.getElementById('focus-next-milestone');
    const evidencePill = document.getElementById('focus-evidence-pill');
    const quickStatFlagship = document.getElementById('quick-stat-flagship');

    if (titleEl) titleEl.textContent = flagship.title;
    if (phaseEl) phaseEl.textContent = (flagship.phase || 'BUILDING').toUpperCase();
    if (headlineEl) headlineEl.textContent = flagship.tagline || flagship.problem;
    if (rationaleEl) rationaleEl.textContent = flagship.whyChosen || flagship.description;
    if (actionEl) actionEl.textContent = flagship.nextAction || 'Continue core deliverable execution';
    if (milestoneEl) milestoneEl.textContent = flagship.nextMilestone || 'Next sprint release';
    if (quickStatFlagship) quickStatFlagship.textContent = `${flagship.title} (${flagship.progress}%)`;

    if (evidencePill) {
      if (flagship.evidence?.status === 'VERIFIED_DELIVERABLE' || flagship.evidence?.url) {
        evidencePill.className = 'evidence-status-pill verified';
        evidencePill.textContent = 'VERIFIED PROOF';
      } else {
        evidencePill.className = 'evidence-status-pill';
        evidencePill.textContent = 'IN PROGRESS';
      }
    }
  }

  // 3. Today's Actions List
  renderTodayActions();

  // 4. Progress Snapshot
  renderSnapshotMetrics();

  // 5. Recent Activity
  renderRecentActivity();
}

function renderTodayActions() {
  const container = document.getElementById('actions-list-container');
  if (!container) return;

  let actions = state.todayActions;
  if (state.activeActionFilter === 'must-do') {
    actions = actions.filter(a => a.isMustDo);
  } else if (state.activeActionFilter === 'completed') {
    actions = actions.filter(a => a.status === 'completed');
  }

  if (actions.length === 0) {
    container.innerHTML = `
      <div style="padding: 24px; text-align: center; font-family: var(--font-mono); font-size: 0.82rem; color: var(--ink-muted); background: var(--bg-canvas); border: 1px dashed var(--rule-dashed);">
        [NO ACTIONS IN THIS VIEW &bull; CLICK "+ ADD ACTION" TO RECORD A MUST-DO]
      </div>
    `;
    return;
  }

  container.innerHTML = actions.map(action => {
    const isCompleted = action.status === 'completed';
    const tierClass = action.isMustDo ? 'must-do' : 'optional';
    const tierLabel = action.isMustDo ? 'MUST-DO' : 'OPTIONAL';

    return `
      <div class="action-item ${tierClass} ${isCompleted ? 'completed' : ''}" data-id="${action.id}">
        <input type="checkbox" class="action-check-box" data-action="toggle-complete" ${isCompleted ? 'checked' : ''} aria-label="Toggle ${escapeHtml(action.title)}">
        <div class="action-content">
          <div class="action-title-row">
            <span class="action-title">${escapeHtml(action.title)}</span>
            <span class="action-tier-badge ${tierClass}">${tierLabel}</span>
            <span class="action-proj-badge">${escapeHtml(action.category || '')}</span>
          </div>
          ${action.notes ? `<div class="action-notes-line">${escapeHtml(action.notes)}</div>` : ''}
        </div>
        <div class="action-controls">
          ${!isCompleted ? `
            <button class="mini-action-btn" data-action="postpone" title="Postpone to tomorrow">→ Tomorrow</button>
          ` : ''}
          <button class="mini-action-btn" data-action="delete" title="Delete action">&times;</button>
        </div>
      </div>
    `;
  }).join('');
}

function renderSnapshotMetrics() {
  const flagship = getFlagshipProject();
  const metricFlagship = document.getElementById('metric-flagship-progress');
  const metricFlagshipSub = document.getElementById('metric-flagship-sub');
  if (metricFlagship && flagship) {
    metricFlagship.textContent = `${flagship.progress}%`;
    metricFlagshipSub.textContent = `${flagship.title}: ${flagship.nextMilestone.slice(0, 24)}...`;
  }

  const metricWorkout = document.getElementById('metric-workout-count');
  if (metricWorkout) {
    const workoutsThisWeek = (state.physical.workoutLogs || []).filter(w => w.completed).length;
    metricWorkout.textContent = `${workoutsThisWeek} / 4`;
  }

  const metricNotes = document.getElementById('metric-notes-count');
  if (metricNotes) {
    metricNotes.textContent = String((state.intellectualNotes || []).length);
  }

  const metricContent = document.getElementById('metric-content-count');
  if (metricContent) {
    const readyCount = (state.contentPipeline || []).filter(c => c.status === 'Ready').length;
    const pubCount = (state.contentPipeline || []).filter(c => c.status === 'Published').length;
    metricContent.textContent = `${readyCount} READY • ${pubCount} PUB`;
  }
}

function renderRecentActivity() {
  const stream = document.getElementById('recent-activity-stream');
  if (!stream) return;

  const events = [];

  // Completed actions
  (state.todayActions || []).filter(a => a.status === 'completed').slice(0, 3).forEach(a => {
    events.push({
      time: 'TODAY',
      tag: 'ACTION',
      text: `Completed: "${a.title}"`
    });
  });

  // Recent workouts
  (state.physical.workoutLogs || []).slice(0, 2).forEach(w => {
    events.push({
      time: w.date.slice(5),
      tag: 'TRAINING',
      text: `Verified Workout: ${w.type} (${w.exercises.length} exercises logged)`
    });
  });

  // Recent intellectual notes
  (state.intellectualNotes || []).slice(0, 2).forEach(n => {
    events.push({
      time: n.date.slice(5),
      tag: 'INTELLECT',
      text: `Synthesized applied note: "${n.concept}" [${n.topic}]`
    });
  });

  // Recent published/draft content
  (state.contentPipeline || []).slice(0, 1).forEach(c => {
    events.push({
      time: 'RECENT',
      tag: 'X PIPELINE',
      text: `${c.status}: "${c.title}"`
    });
  });

  if (events.length === 0) {
    stream.innerHTML = `<div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--ink-muted);">No activity recorded yet.</div>`;
    return;
  }

  stream.innerHTML = events.slice(0, 6).map(e => `
    <div class="activity-event-item">
      <span class="activity-time">${escapeHtml(e.time)}</span>
      <span class="activity-badge-tag">${escapeHtml(e.tag)}</span>
      <span class="activity-text">${escapeHtml(e.text)}</span>
    </div>
  `).join('');
}

// ----------------------------------------------------------------------------
// 3. PROJECT MAXXING SECTION
// ----------------------------------------------------------------------------
function renderProjectsSection() {
  const flagshipContainer = document.getElementById('flagship-hero-container');
  const backlogContainer = document.getElementById('secondary-backlog-grid');
  const retrosContainer = document.getElementById('retros-feed');

  const flagship = getFlagshipProject();
  if (!flagship || !flagshipContainer) return;

  const phases = ["Idea", "Research", "Validation", "Building", "Testing", "Launch", "Iteration", "Completed"];
  const currentPhaseIdx = phases.indexOf(flagship.phase || 'Building');

  flagshipContainer.innerHTML = `
    <div class="flagship-top-badge">
      <span class="flagship-crown-pill">★ DESIGNATED FLAGSHIP PROJECT</span>
      <span class="flagship-role-pill">ROLE: ${escapeHtml(flagship.role)} &bull; ${escapeHtml(flagship.category)}</span>
    </div>

    <div class="flagship-title-row">
      <h2 class="flagship-main-title">${escapeHtml(flagship.title)}</h2>
      <span class="flagship-progress-badge">${flagship.progress}% PROGRESS</span>
    </div>

    <p class="flagship-tagline">${escapeHtml(flagship.tagline)}</p>

    <!-- Phase Stepper -->
    <div class="phase-stepper-wrap">
      <span class="phase-stepper-label">LIFECYCLE PHASE PROGRESSION:</span>
      <div class="phase-steps-bar">
        ${phases.map((p, idx) => {
          let cls = 'phase-step-pill';
          if (idx === currentPhaseIdx) cls += ' active';
          else if (idx < currentPhaseIdx) cls += ' completed';
          return `<span class="${cls}">${escapeHtml(p)}</span>`;
        }).join('')}
      </div>
    </div>

    <!-- Flagship Details Grid -->
    <div class="flagship-grid-details">
      <div class="flagship-col">
        <span class="fdetail-label">PROBLEM BEING SOLVED:</span>
        <p class="fdetail-text">${escapeHtml(flagship.problem || flagship.description)}</p>
        <span class="fdetail-label" style="margin-top: 10px;">INTENDED USERS:</span>
        <p class="fdetail-text">${escapeHtml(flagship.intendedUsers || 'Founders & Operators')}</p>
      </div>
      <div class="flagship-col">
        <span class="fdetail-label">WHY I CHOSE THIS:</span>
        <p class="fdetail-text">${escapeHtml(flagship.whyChosen || 'High revenue potential & strategic leverage.')}</p>
        <span class="fdetail-label" style="margin-top: 10px;">NEXT ACTION &amp; MILESTONE:</span>
        <p class="fdetail-text"><strong>Action:</strong> ${escapeHtml(flagship.nextAction)}<br><strong>Milestone:</strong> ${escapeHtml(flagship.nextMilestone)}</p>
      </div>
    </div>

    <!-- Delivery Evidence Box -->
    <div class="evidence-box">
      <div class="evidence-header">
        <span class="evidence-title">VERIFIED DELIVERY EVIDENCE REQUIRED</span>
        <span class="evidence-status-pill verified">${escapeHtml(flagship.evidence?.status || 'VERIFIED')}</span>
      </div>
      <p class="evidence-desc">
        ${escapeHtml(flagship.evidence?.description || 'Active software deliverable.')}
        ${flagship.evidence?.url && flagship.evidence.url !== '#' ? ` &bull; <a href="${escapeHtml(flagship.evidence.url)}" target="_blank" rel="noopener noreferrer" style="color: var(--accent-olive); font-weight: 700;">[View Live Demo / Evidence &rarr;]</a>` : ''}
      </p>
      <div class="evidence-rule-alert">
        * Policy: A project cannot be designated as completed without verifiable evidence of delivery (working demo, repository, or validated customer transactions).
      </div>
    </div>

    <!-- Actions Bar -->
    <div class="flagship-actions-bar">
      <button class="mini-tool-btn" id="open-eval-modal-btn">⚖ Evaluate Project</button>
      <button class="mini-tool-btn" id="open-retro-modal-btn">📝 Record Milestone Retrospective</button>
      <button class="mini-tool-btn" id="advance-phase-btn">Advance Lifecycle Phase &rarr;</button>
    </div>
  `;

  // Retrospectives Feed
  if (retrosContainer) {
    const retros = flagship.retrospectives || [];
    if (retros.length === 0) {
      retrosContainer.innerHTML = `
        <div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--ink-muted); padding: 12px; background: var(--bg-canvas); border: 1px dashed var(--rule-dashed);">
          No retrospectives recorded yet for this flagship. Click "Record Milestone Retrospective" after shipping.
        </div>
      `;
    } else {
      retrosContainer.innerHTML = retros.map(r => `
        <div class="retro-item-card">
          <div class="retro-top-row">
            <span class="retro-milestone-title">RETRO // ${escapeHtml(r.milestone)}</span>
            <span class="retro-date">${escapeHtml(r.date)}</span>
          </div>
          <div class="retro-2col">
            <div class="retro-point"><strong>Intended:</strong> ${escapeHtml(r.intended)}</div>
            <div class="retro-point"><strong>Accomplished:</strong> ${escapeHtml(r.actual)}</div>
            <div class="retro-point"><strong>What Worked:</strong> ${escapeHtml(r.worked)}</div>
            <div class="retro-point"><strong>What Failed:</strong> ${escapeHtml(r.failed)}</div>
          </div>
          <div class="retro-learned-block">
            <strong>Key Learning:</strong> ${escapeHtml(r.learned)}<br>
            <strong>What Happens Next:</strong> ${escapeHtml(r.next)}
          </div>
        </div>
      `).join('');
    }
  }

  // Secondary Project Backlog
  if (backlogContainer) {
    const secondaryProjects = state.projects.filter(p => p.id !== flagship.id);
    backlogContainer.innerHTML = secondaryProjects.map(p => `
      <div class="backlog-card">
        <div class="backlog-card-header">
          <span class="backlog-phase-badge">${escapeHtml(p.phase || 'Backlog')}</span>
          <span style="font-family: var(--font-mono); font-size: 0.72rem; font-weight: 700;">${p.progress}%</span>
        </div>
        <h3 class="backlog-card-title">${escapeHtml(p.title)}</h3>
        <p class="backlog-card-tagline">${escapeHtml(p.tagline || p.description)}</p>
        <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--ink-muted); margin-bottom: 8px;">
          <strong>Next Action:</strong> ${escapeHtml(p.nextAction || 'In Backlog')}
        </div>
        <button class="backlog-promote-btn" data-action="promote-flagship" data-id="${p.id}">★ Promote to Flagship</button>
      </div>
    `).join('');
  }
}

// ----------------------------------------------------------------------------
// 4. PHYSICAL MAXXING SECTION
// ----------------------------------------------------------------------------
function renderPhysicalSection() {
  const profile = state.physical.profile;
  const habits = state.physical.supportingHabits;

  const currentWeightEl = document.getElementById('pstat-current-weight');
  const goalWeightEl = document.getElementById('pstat-goal-weight');
  const heightEl = document.getElementById('pstat-height');
  const bfEl = document.getElementById('pstat-bf');

  if (currentWeightEl) currentWeightEl.textContent = `${profile.weight} ${profile.unit}`;
  if (goalWeightEl) goalWeightEl.textContent = `${profile.goalWeight} ${profile.unit}`;
  if (heightEl) heightEl.textContent = `${profile.height} ${profile.heightUnit}`;
  if (bfEl) bfEl.textContent = profile.targetBodyFat || '12–14%';

  // Habits
  const sleepEl = document.getElementById('habit-sleep-val');
  const proteinEl = document.getElementById('habit-protein-val');
  const recoveryEl = document.getElementById('habit-recovery-val');
  const stepsEl = document.getElementById('habit-steps-val');

  if (sleepEl) sleepEl.textContent = `${habits.sleepAverage}h / ${habits.sleepHoursTarget}h`;
  if (proteinEl) proteinEl.textContent = `${habits.proteinTarget}${habits.proteinUnit} Target`;
  if (recoveryEl) recoveryEl.textContent = habits.recoveryScore || 'High';
  if (stepsEl) stepsEl.textContent = `${habits.stepsDailyTarget.toLocaleString()} Target`;

  // Workout History
  const historyContainer = document.getElementById('workout-history-list');
  const historyCount = document.getElementById('workout-history-count');
  const logs = state.physical.workoutLogs || [];

  if (historyCount) historyCount.textContent = `${logs.length} Sessions Logged`;

  if (historyContainer) {
    if (logs.length === 0) {
      historyContainer.innerHTML = `
        <div style="padding: 24px; text-align: center; font-family: var(--font-mono); font-size: 0.8rem; color: var(--ink-muted); border: 1px dashed var(--rule-dashed);">
          No workout sessions logged yet. Record your first session above.
        </div>
      `;
      return;
    }

    historyContainer.innerHTML = logs.map(w => `
      <div class="workout-session-card">
        <div class="session-top-row">
          <span class="session-type-title">${escapeHtml(w.type)}</span>
          <span class="session-date-pill">${escapeHtml(w.date)} &bull; ${w.completed ? '✓ Completed' : 'Partial'}</span>
        </div>
        <table class="session-exercises-table">
          <thead>
            <tr>
              <th>EXERCISE</th>
              <th>SETS</th>
              <th>REPS</th>
              <th>WEIGHT</th>
            </tr>
          </thead>
          <tbody>
            ${(w.exercises || []).map(ex => `
              <tr>
                <td><strong>${escapeHtml(ex.name)}</strong></td>
                <td>${escapeHtml(String(ex.sets))}</td>
                <td>${escapeHtml(String(ex.reps))}</td>
                <td>${escapeHtml(String(ex.weight))}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        ${w.notes ? `<div class="session-notes-box"><strong>Notes & RPE:</strong> ${escapeHtml(w.notes)}</div>` : ''}
      </div>
    `).join('');
  }
}

// ----------------------------------------------------------------------------
// 5. INTELLECTUAL MAXXING SECTION
// ----------------------------------------------------------------------------
function renderIntellectualSection() {
  const notesContainer = document.getElementById('knowledge-notes-feed');
  const countBadge = document.getElementById('klibrary-count-badge');
  const tagFilterBar = document.getElementById('knote-tag-filter-bar');

  let notes = state.intellectualNotes || [];

  // Extract all distinct tags
  const tagsSet = new Set(['ALL']);
  notes.forEach(n => {
    (n.tags || []).forEach(t => tagsSet.add(t.toUpperCase()));
  });

  if (tagFilterBar) {
    tagFilterBar.innerHTML = Array.from(tagsSet).map(tag => {
      const isActive = state.activeLogTag === tag;
      return `<button class="knote-tag-pill ${isActive ? 'active' : ''}" data-tag="${escapeHtml(tag)}">${tag === 'ALL' ? 'ALL NOTES' : '#' + escapeHtml(tag.toLowerCase())}</button>`;
    }).join('');
  }

  // Filter by tag
  if (state.activeLogTag && state.activeLogTag !== 'ALL') {
    notes = notes.filter(n => (n.tags || []).some(t => t.toUpperCase() === state.activeLogTag));
  }

  // Filter by search query
  if (state.searchQueryNotes) {
    const q = state.searchQueryNotes.toLowerCase();
    notes = notes.filter(n =>
      (n.concept && n.concept.toLowerCase().includes(q)) ||
      (n.explanation && n.explanation.toLowerCase().includes(q)) ||
      (n.topic && n.topic.toLowerCase().includes(q)) ||
      (n.tags && n.tags.some(t => t.toLowerCase().includes(q)))
    );
  }

  if (countBadge) countBadge.textContent = `${notes.length} Notes Filtered`;

  if (!notesContainer) return;

  if (notes.length === 0) {
    notesContainer.innerHTML = `
      <div style="padding: 24px; text-align: center; font-family: var(--font-mono); font-size: 0.8rem; color: var(--ink-muted); border: 1px dashed var(--rule-dashed);">
        No applied knowledge notes match your search or filter criteria.
      </div>
    `;
    return;
  }

  notesContainer.innerHTML = notes.map(n => {
    const proj = state.projects.find(p => p.id === n.appliedProjectId);
    const projLabel = proj ? proj.title : 'General System';

    return `
      <div class="knote-card" data-id="${n.id}">
        <div class="knote-header-row">
          <h4 class="knote-concept-title">${escapeHtml(n.concept)}</h4>
          <span class="knote-proj-pill">${escapeHtml(projLabel)}</span>
        </div>
        <p class="knote-own-words">${escapeHtml(n.explanation)}</p>
        ${n.practicalExample ? `
          <div class="knote-example-box">
            <strong>Practical Implementation:</strong> ${escapeHtml(n.practicalExample)}
          </div>
        ` : ''}
        ${n.questions ? `
          <div style="font-family: var(--font-mono); font-size: 0.74rem; color: var(--ink-muted); margin-bottom: 8px;">
            <strong>Open Questions &amp; Edge Cases:</strong> ${escapeHtml(n.questions)}
          </div>
        ` : ''}
        <div class="knote-understanding-prompts">
          <span class="prompts-title">UNDERSTANDING SELF-PROMPTS:</span>
          <div class="prompts-list">
            <label class="prompt-check-item">
              <input type="checkbox" ${n.understanding?.canExplainWithoutNotes ? 'checked' : ''} data-check="explain" data-id="${n.id}">
              <span>Can I explain this clearly without looking at notes?</span>
            </label>
            <label class="prompt-check-item">
              <input type="checkbox" ${n.understanding?.canImplement ? 'checked' : ''} data-check="implement" data-id="${n.id}">
              <span>Can I implement this in working code?</span>
            </label>
            <label class="prompt-check-item">
              <input type="checkbox" ${n.understanding?.knowsLimitations ? 'checked' : ''} data-check="limitations" data-id="${n.id}">
              <span>Do I understand its precise failure modes &amp; when NOT to use it?</span>
            </label>
          </div>
        </div>
        <div class="knote-footer-strip">
          <span>Date: ${escapeHtml(n.date)} &bull; ${n.references ? `Ref: ${escapeHtml(n.references)}` : ''}</span>
          <span>${(n.tags || []).map(t => `#${escapeHtml(t)}`).join(' ')}</span>
        </div>
      </div>
    `;
  }).join('');

  // Render intake radar triad
  renderRadarTriad();
}

function renderRadarTriad() {
  const triadContainer = document.getElementById('radar-triad-container');
  if (!triadContainer) return;

  const curData = state.radarCurriculum?.months?.[state.selectedRadarMonth || '2026-10'];
  if (!curData || !curData.triads || curData.triads.length === 0) return;

  const triad = curData.triads[state.activeRadarTriadIdx % curData.triads.length];
  if (!triad) return;

  triadContainer.innerHTML = `
    <!-- Video Intel Card -->
    <div class="radar-card" style="background: var(--bg-canvas); border: 1.5px solid var(--rule-strong); padding: 18px; box-shadow: 2px 2px 0px var(--rule-strong);">
      <div style="font-family: var(--font-mono); font-size: 0.68rem; font-weight: 700; color: var(--tape-red); margin-bottom: 4px;">${escapeHtml(triad.video.badge)}</div>
      <h4 style="font-family: var(--font-sans); font-size: 0.95rem; font-weight: 700; color: var(--ink-primary); margin-bottom: 6px;">${escapeHtml(triad.video.title)}</h4>
      <p style="font-family: var(--font-mono); font-size: 0.74rem; color: var(--ink-secondary); margin-bottom: 10px;">${escapeHtml(triad.video.takeaway)}</p>
      <a href="${escapeHtml(triad.video.url)}" target="_blank" rel="noopener noreferrer" style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-olive); font-weight: 700;">[Watch Video &rarr;]</a>
    </div>

    <!-- Article / Essay Card -->
    <div class="radar-card" style="background: var(--bg-canvas); border: 1.5px solid var(--rule-strong); padding: 18px; box-shadow: 2px 2px 0px var(--rule-strong);">
      <div style="font-family: var(--font-mono); font-size: 0.68rem; font-weight: 700; color: #184890; margin-bottom: 4px;">${escapeHtml(triad.article.badge)}</div>
      <h4 style="font-family: var(--font-sans); font-size: 0.95rem; font-weight: 700; color: var(--ink-primary); margin-bottom: 6px;">${escapeHtml(triad.article.title)}</h4>
      <p style="font-family: var(--font-mono); font-size: 0.74rem; color: var(--ink-secondary); margin-bottom: 10px;">${escapeHtml(triad.article.takeaway)}</p>
      <a href="${escapeHtml(triad.article.url)}" target="_blank" rel="noopener noreferrer" style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-olive); font-weight: 700;">[Read Essay &rarr;]</a>
    </div>

    <!-- Book Chapter Card -->
    <div class="radar-card" style="background: var(--bg-canvas); border: 1.5px solid var(--rule-strong); padding: 18px; box-shadow: 2px 2px 0px var(--rule-strong);">
      <div style="font-family: var(--font-mono); font-size: 0.68rem; font-weight: 700; color: var(--accent-olive); margin-bottom: 4px;">${escapeHtml(triad.book.badge)}</div>
      <h4 style="font-family: var(--font-sans); font-size: 0.95rem; font-weight: 700; color: var(--ink-primary); margin-bottom: 6px;">${escapeHtml(triad.book.title)} &bull; ${escapeHtml(triad.book.chapter)}</h4>
      <p style="font-family: var(--font-mono); font-size: 0.74rem; color: var(--ink-secondary); margin-bottom: 10px;">${escapeHtml(triad.book.takeaway)}</p>
      <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--ink-muted);">${escapeHtml(triad.book.pages)}</span>
    </div>
  `;
}

// ----------------------------------------------------------------------------
// 6. X & PUBLIC PRESENCE
// ----------------------------------------------------------------------------
function renderXSection() {
  const grid = document.getElementById('pipeline-stages-grid');
  if (!grid) return;

  const stages = ['Idea', 'Draft', 'Ready', 'Published'];
  const pipeline = state.contentPipeline || [];

  grid.innerHTML = stages.map(stage => {
    const items = pipeline.filter(item => item.status === stage);

    return `
      <div class="pipeline-col">
        <div class="pipeline-col-header">
          <span class="col-stage-name">${escapeHtml(stage.toUpperCase())}</span>
          <span class="col-count-badge">${items.length}</span>
        </div>
        <div class="pipeline-cards-list">
          ${items.length === 0 ? `
            <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--ink-muted); text-align: center; padding: 12px; border: 1px dashed var(--rule-dashed);">
              Empty stage
            </div>
          ` : items.map(c => `
            <div class="content-item-card" data-id="${c.id}">
              <span class="content-cat-badge">${escapeHtml(c.category)}</span>
              <h5 class="content-item-title">${escapeHtml(c.title)}</h5>
              <div class="content-item-draft">${escapeHtml(c.draft)}</div>
              ${c.metrics && c.status === 'Published' ? `
                <div class="content-manual-metrics">
                  [MANUAL LOG] ${c.metrics.impressions} Impr &bull; ${c.metrics.likes} Likes &bull; ${c.metrics.reposts} RTs
                </div>
              ` : ''}
              <div class="content-card-actions">
                <button class="stage-move-btn" data-action="copy-draft" data-id="${c.id}">Copy</button>
                <button class="stage-move-btn" data-action="next-stage" data-id="${c.id}">Advance &rarr;</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

// ----------------------------------------------------------------------------
// 7. CAREER & INCOME
// ----------------------------------------------------------------------------
function renderCareerSection() {
  const roleEl = document.getElementById('career-role-title');
  const respList = document.getElementById('career-responsibilities-ul');
  const skillsGrid = document.getElementById('skills-matrix-grid');
  const tbody = document.getElementById('income-experiments-tbody');

  if (roleEl) roleEl.textContent = state.career.currentRole;

  if (respList && state.career.responsibilities) {
    respList.innerHTML = state.career.responsibilities.map(r => `<li>${escapeHtml(r)}</li>`).join('');
  }

  if (skillsGrid && state.career.skillsToDevelop) {
    skillsGrid.innerHTML = state.career.skillsToDevelop.map(s => `
      <div class="skill-card">
        <div class="skill-name-row">
          <span class="skill-name">${escapeHtml(s.name)}</span>
          <span class="skill-pct">${s.progress}%</span>
        </div>
        <div class="skill-meter-track">
          <div class="skill-meter-fill" style="width: ${s.progress}%;"></div>
        </div>
        <p class="skill-details-text">${escapeHtml(s.details)}</p>
      </div>
    `).join('');
  }

  if (tbody && state.career.incomeExperiments) {
    tbody.innerHTML = state.career.incomeExperiments.map(exp => `
      <tr>
        <td><strong>${escapeHtml(exp.name)}</strong></td>
        <td><span class="exp-status-pill">${escapeHtml(exp.status)}</span></td>
        <td><strong>${escapeHtml(exp.targetIncome)}</strong></td>
        <td>${escapeHtml(exp.currentIncome)}</td>
        <td style="color: var(--ink-secondary); font-size: 0.74rem;">${escapeHtml(exp.notes)}</td>
      </tr>
    `).join('');
  }
}

// ----------------------------------------------------------------------------
// 8. WEEKLY REVIEW ENGINE
// ----------------------------------------------------------------------------
function renderWeeklyReviewSection() {
  const reviewsContainer = document.getElementById('past-reviews-list');
  const countBadge = document.getElementById('reviews-count-badge');
  const dateInput = document.getElementById('review-week-date');

  const reviews = state.weeklyReviews || [];
  if (countBadge) countBadge.textContent = `${reviews.length} Reviews Archived`;

  if (dateInput && !dateInput.value) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }

  if (reviewsContainer) {
    if (reviews.length === 0) {
      reviewsContainer.innerHTML = `<div style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--ink-muted);">No reviews saved yet.</div>`;
      return;
    }

    reviewsContainer.innerHTML = reviews.map(rev => `
      <div class="past-review-item">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
          <strong style="font-family: var(--font-mono); font-size: 0.88rem; color: var(--ink-primary);">WEEK OF ${escapeHtml(rev.weekStarting)}</strong>
          <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-olive); font-weight: 700;">FINALIZED REVIEW</span>
        </div>
        <div style="font-family: var(--font-sans); font-size: 0.86rem; font-weight: 600; color: var(--ink-primary); margin-bottom: 4px;">
          Next Week Focus: "${escapeHtml(rev.answers?.nextWeekOutcome || '')}"
        </div>
        <div class="review-summary-quote">
          ${escapeHtml(rev.generatedSummary || rev.answers?.shippedWork || '')}
        </div>
      </div>
    `).join('');
  }
}

function generateWeeklyReviewDraft() {
  // Aggregate recent accomplishments from the past 7 days
  const completedActions = (state.todayActions || []).filter(a => a.status === 'completed');
  const recentWorkouts = (state.physical.workoutLogs || []).filter(w => w.completed);
  const recentNotes = (state.intellectualNotes || []).slice(0, 3);
  const flagship = getFlagshipProject();

  const shipped = completedActions.map(a => a.title).join('; ') || 'Continued flagship execution sprint.';
  const learnings = recentNotes.map(n => `${n.concept} (${n.topic})`).join('; ') || 'Deepened systems thinking.';
  const flagshipProg = flagship ? `${flagship.title} reached ${flagship.progress}% progress; next milestone: ${flagship.nextMilestone}` : '';
  const training = `${recentWorkouts.length} workouts verified with progressive overload tracking.`;

  const p1 = document.getElementById('review-prompt-1');
  const p2 = document.getElementById('review-prompt-2');
  const p3 = document.getElementById('review-prompt-3');
  const p4 = document.getElementById('review-prompt-4');
  const p5 = document.getElementById('review-prompt-5');
  const p6 = document.getElementById('review-prompt-6');
  const p7 = document.getElementById('review-prompt-7');
  const p8 = document.getElementById('review-prompt-8');
  const p9 = document.getElementById('review-prompt-9');
  const p10 = document.getElementById('review-prompt-10');
  const summaryBox = document.getElementById('review-summary-text');

  if (p1) p1.value = shipped;
  if (p2) p2.value = learnings;
  if (p3) p3.value = flagshipProg;
  if (p4) p4.value = training;
  if (p5) p5.value = 'Direct customer and merchant outbound video audits.';
  if (p6) p6.value = 'Spending too much time on non-flagship side projects.';
  if (p7) p7.value = 'Cold outbound telephone follow-ups.';
  if (p8) p8.value = 'Converting pilot e-commerce accounts to paid recurring subscribers.';
  if (p9) p9.value = 'Convert 3 paid Shopify pilot accounts on Orbit recurring tier.';
  if (p10) p10.value = 'Checking social analytics during morning execution blocks.';

  if (summaryBox) {
    summaryBox.value = `High-velocity week characterized by ${recentWorkouts.length} completed workouts and shipping ${completedActions.length} core tasks. Flagship priority remains locked on ${flagship ? flagship.title : 'Orbit'} outbound. Next week's single critical outcome: Convert 3 paid pilot merchants.`;
  }

  showToast('Weekly review draft generated from live records!');
}

// ----------------------------------------------------------------------------
// 9. STRATEGIC CYCLES SECTION
// ----------------------------------------------------------------------------
function renderStrategicCyclesSection() {
  const container = document.getElementById('active-cycle-container');
  if (!container) return;

  const cycle = (state.strategicCycles || [])[0];
  if (!cycle) return;

  container.innerHTML = `
    <div class="cycle-card-top">
      <div>
        <span class="cycle-active-badge">ACTIVE 90-DAY STRATEGIC CYCLE</span>
        <h3 style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; color: var(--ink-primary); margin-top: 4px;">${escapeHtml(cycle.name)}</h3>
      </div>
      <span class="cycle-dates-badge">${escapeHtml(cycle.startDate)} &rarr; ${escapeHtml(cycle.endDate)}</span>
    </div>

    <!-- Primary Outcome -->
    <div class="cycle-primary-outcome-box">
      <span class="cycle-label-small">PRIMARY STRATEGIC OUTCOME (LINKED TO FLAGSHIP):</span>
      <h4 class="cycle-outcome-title">${escapeHtml(cycle.primaryOutcome)}</h4>
    </div>

    <!-- Supporting Outcomes -->
    <div class="cycle-supporting-list">
      <span class="cycle-label-small" style="margin-bottom: 6px;">SUPPORTING OUTCOMES:</span>
      <ul>
        ${(cycle.supportingOutcomes || []).map(o => `<li>${escapeHtml(o)}</li>`).join('')}
      </ul>
    </div>

    <!-- Success Criteria -->
    <div class="criteria-checklist">
      <span class="cycle-label-small" style="margin-bottom: 4px;">MEASURABLE SUCCESS CRITERIA:</span>
      ${(cycle.successCriteria || []).map(sc => `
        <div class="criteria-item">
          <input type="checkbox" ${sc.completed ? 'checked' : ''} data-action="toggle-criteria" data-id="${sc.id}">
          <span class="criteria-type-badge">${escapeHtml(sc.type)}</span>
          <span style="flex: 1; color: var(--ink-primary);">${escapeHtml(sc.text)}</span>
        </div>
      `).join('')}
    </div>

    <!-- Constraints & Risks -->
    <div class="constraints-risks-grid">
      <div class="cr-block">
        <span class="cr-label">KNOWN CONSTRAINTS:</span>
        <p style="color: var(--ink-secondary); line-height: 1.45;">${escapeHtml((cycle.constraints || []).join(' ' ))}</p>
      </div>
      <div class="cr-block">
        <span class="cr-label">STRATEGIC RISKS:</span>
        <p style="color: var(--ink-secondary); line-height: 1.45;">${escapeHtml((cycle.risks || []).join(' ' ))}</p>
      </div>
    </div>
  `;
}

// ----------------------------------------------------------------------------
// 10. 5-YEAR STRATEGIC HORIZON (ARCHITECTURAL TIMELINE SPINE)
// ----------------------------------------------------------------------------
function renderFiveYearHorizon() {
  const container = document.getElementById('horizon-list');
  if (!container) return;

  const horizonData = state.fiveYearHorizon || [];
  container.innerHTML = horizonData.map(h => {
    const isCurrent = h.year === '2026';
    const displayYear = escapeHtml(h.year).replace('-', ' &ndash; ');

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
            <h4 class="timeline-headline">${escapeHtml(h.headline)}</h4>
            <p class="timeline-focus">${escapeHtml(h.focus)}</p>
          </div>
          <div class="timeline-milestones-col">
            <ul class="timeline-milestone-list">
              ${(h.milestones || []).map(m => `
                <li class="milestone-item ${m.done ? 'is-done' : ''}">
                  <span class="milestone-marker">${m.done ? '[✓]' : '[·]'}</span>
                  <span class="milestone-text">${escapeHtml(m.text)}</span>
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
// 10. MODALS, DRAWERS & EVENT LISTENERS
// ----------------------------------------------------------------------------
function initEventListeners() {
  // Navigation smooth scroll & active spy
  const navItems = document.querySelectorAll('.nav-strip .nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const targetId = item.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');
      }
    });
  });

  // Action Filters
  document.querySelectorAll('.action-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.action-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeActionFilter = btn.dataset.filter;
      renderTodayActions();
    });
  });

  // Action Item Clicks (Complete, Postpone, Delete)
  const actionsList = document.getElementById('actions-list-container');
  if (actionsList) {
    actionsList.addEventListener('click', e => {
      const itemEl = e.target.closest('.action-item');
      if (!itemEl) return;
      const id = itemEl.dataset.id;
      const action = state.todayActions.find(a => a.id === id);
      if (!action) return;

      if (e.target.dataset.action === 'toggle-complete') {
        action.status = e.target.checked ? 'completed' : 'pending';
        persistState();
        renderTodayActions();
        renderSnapshotMetrics();
        renderRecentActivity();
        showToast(action.status === 'completed' ? 'Action completed!' : 'Action marked pending');
      } else if (e.target.dataset.action === 'postpone') {
        action.dueDate = 'Tomorrow';
        action.status = 'pending';
        persistState();
        renderTodayActions();
        showToast('Action postponed to tomorrow');
      } else if (e.target.dataset.action === 'delete') {
        state.todayActions = state.todayActions.filter(a => a.id !== id);
        persistState();
        renderTodayActions();
        renderSnapshotMetrics();
        showToast('Action removed');
      }
    });
  }

  // Add Action Modal
  const addActionBtn = document.getElementById('add-action-btn');
  const actionModalBackdrop = document.getElementById('action-modal-backdrop');
  const closeActionModalBtn = document.getElementById('close-action-modal-btn');
  const newActionForm = document.getElementById('new-action-form');

  if (addActionBtn && actionModalBackdrop) {
    addActionBtn.addEventListener('click', () => {
      actionModalBackdrop.style.display = 'flex';
      actionModalBackdrop.setAttribute('aria-hidden', 'false');
    });
  }
  if (closeActionModalBtn && actionModalBackdrop) {
    closeActionModalBtn.addEventListener('click', () => {
      actionModalBackdrop.style.display = 'none';
      actionModalBackdrop.setAttribute('aria-hidden', 'true');
    });
  }
  if (newActionForm) {
    newActionForm.addEventListener('submit', e => {
      e.preventDefault();
      const title = document.getElementById('new-action-title').value.trim();
      const category = document.getElementById('new-action-category').value.trim();
      const priority = document.getElementById('new-action-priority').value;
      const notes = document.getElementById('new-action-notes').value.trim();

      if (!title) return;

      const newAction = {
        id: 'act-' + Date.now(),
        title,
        category: category || 'GENERAL',
        projectId: state.settings.flagshipProjectId,
        isMustDo: priority === 'must-do',
        status: 'pending',
        dueDate: 'Today',
        notes
      };

      state.todayActions.unshift(newAction);
      persistState();
      renderTodayActions();
      renderSnapshotMetrics();
      newActionForm.reset();
      actionModalBackdrop.style.display = 'none';
      showToast('New action added to Today!');
    });
  }

  // Promote to Flagship
  const backlogGrid = document.getElementById('secondary-backlog-grid');
  if (backlogGrid) {
    backlogGrid.addEventListener('click', e => {
      const btn = e.target.closest('[data-action="promote-flagship"]');
      if (!btn) return;
      const id = btn.dataset.id;
      const newFlagship = state.projects.find(p => p.id === id);
      if (!newFlagship) return;

      state.projects.forEach(p => { p.isFlagship = (p.id === id); });
      state.settings.flagshipProjectId = id;
      persistState();
      renderCommandCenter();
      renderProjectsSection();
      showToast(`${newFlagship.title} is now your active Flagship!`);
    });
  }

  // Advance Phase button
  document.addEventListener('click', e => {
    if (e.target && e.target.id === 'advance-phase-btn') {
      const flagship = getFlagshipProject();
      if (!flagship) return;
      const phases = ["Idea", "Research", "Validation", "Building", "Testing", "Launch", "Iteration", "Completed"];
      const currentIdx = phases.indexOf(flagship.phase || 'Building');
      if (currentIdx < phases.length - 1) {
        const nextPhase = phases[currentIdx + 1];
        if (nextPhase === 'Completed' || nextPhase === 'Launch') {
          const evidenceUrl = prompt('Evidence of delivery required for Launch/Completion. Enter demo URL or proof link:', flagship.evidence?.url || 'https://');
          if (!evidenceUrl) {
            alert('Cannot advance phase to Launch/Completed without verified evidence of delivery.');
            return;
          }
          flagship.evidence = {
            status: 'VERIFIED_DELIVERABLE',
            description: 'Verified live demo & merchant release',
            url: evidenceUrl
          };
        }
        flagship.phase = nextPhase;
        persistState();
        renderCommandCenter();
        renderProjectsSection();
        showToast(`Phase advanced to: ${nextPhase}`);
      }
    }
  });

  // Project Evaluation Modal
  const evalModalBackdrop = document.getElementById('eval-modal-backdrop');
  const closeEvalModalBtn = document.getElementById('close-eval-modal-btn');
  const saveEvalBtn = document.getElementById('save-eval-btn');

  document.addEventListener('click', e => {
    if (e.target && e.target.id === 'open-eval-modal-btn') {
      const flagship = getFlagshipProject();
      if (flagship && flagship.evaluation) {
        document.getElementById('eval-interest').value = flagship.evaluation.interest || 8;
        document.getElementById('eval-learning').value = flagship.evaluation.learning || 8;
        document.getElementById('eval-feasibility').value = flagship.evaluation.feasibility || 8;
        document.getElementById('eval-time').value = flagship.evaluation.timeToResult || 8;
        document.getElementById('eval-demand').value = flagship.evaluation.customerDemand || 8;
        document.getElementById('eval-alignment').value = flagship.evaluation.strategicAlignment || 8;
        document.getElementById('eval-reasoning').value = flagship.evaluation.reasoning || '';
      }
      if (evalModalBackdrop) evalModalBackdrop.style.display = 'flex';
    }
  });

  if (closeEvalModalBtn && evalModalBackdrop) {
    closeEvalModalBtn.addEventListener('click', () => { evalModalBackdrop.style.display = 'none'; });
  }

  if (saveEvalBtn) {
    saveEvalBtn.addEventListener('click', () => {
      const flagship = getFlagshipProject();
      if (!flagship) return;
      flagship.evaluation = {
        interest: Number(document.getElementById('eval-interest').value) || 8,
        learning: Number(document.getElementById('eval-learning').value) || 8,
        feasibility: Number(document.getElementById('eval-feasibility').value) || 8,
        timeToResult: Number(document.getElementById('eval-time').value) || 8,
        customerDemand: Number(document.getElementById('eval-demand').value) || 8,
        strategicAlignment: Number(document.getElementById('eval-alignment').value) || 8,
        reasoning: document.getElementById('eval-reasoning').value.trim()
      };
      persistState();
      evalModalBackdrop.style.display = 'none';
      showToast('Project evaluation saved!');
    });
  }

  // Milestone Retrospective Modal
  const retroModalBackdrop = document.getElementById('retro-modal-backdrop');
  const closeRetroModalBtn = document.getElementById('close-retro-modal-btn');
  const retroForm = document.getElementById('retro-form');

  document.addEventListener('click', e => {
    if (e.target && e.target.id === 'open-retro-modal-btn') {
      if (retroModalBackdrop) {
        document.getElementById('retro-date').value = new Date().toISOString().split('T')[0];
        retroModalBackdrop.style.display = 'flex';
      }
    }
  });

  if (closeRetroModalBtn && retroModalBackdrop) {
    closeRetroModalBtn.addEventListener('click', () => { retroModalBackdrop.style.display = 'none'; });
  }

  if (retroForm) {
    retroForm.addEventListener('submit', e => {
      e.preventDefault();
      const flagship = getFlagshipProject();
      if (!flagship) return;

      const newRetro = {
        id: 'retro-' + Date.now(),
        date: document.getElementById('retro-date').value,
        milestone: document.getElementById('retro-milestone').value.trim(),
        intended: document.getElementById('retro-intended').value.trim(),
        actual: document.getElementById('retro-actual').value.trim(),
        worked: document.getElementById('retro-worked').value.trim(),
        failed: document.getElementById('retro-failed').value.trim(),
        learned: document.getElementById('retro-learned').value.trim(),
        next: document.getElementById('retro-next').value.trim()
      };

      if (!flagship.retrospectives) flagship.retrospectives = [];
      flagship.retrospectives.unshift(newRetro);
      persistState();
      renderProjectsSection();
      retroForm.reset();
      retroModalBackdrop.style.display = 'none';
      showToast('Milestone retrospective recorded!');
    });
  }

  // Workout Logger: Add Exercise Row
  const addExBtn = document.getElementById('add-exercise-row-btn');
  const exContainer = document.getElementById('exercise-rows-container');
  if (addExBtn && exContainer) {
    addExBtn.addEventListener('click', () => {
      const row = document.createElement('div');
      row.className = 'exercise-row';
      row.innerHTML = `
        <input type="text" class="ex-name-input" placeholder="Exercise name" required>
        <input type="number" class="ex-sets-input" placeholder="Sets" min="1" max="10" value="3" required>
        <input type="text" class="ex-reps-input" placeholder="Reps" value="10, 10, 8" required>
        <input type="text" class="ex-weight-input" placeholder="Weight" value="20 kg" required>
        <button type="button" class="remove-row-btn" title="Remove exercise">&times;</button>
      `;
      exContainer.appendChild(row);
    });

    exContainer.addEventListener('click', e => {
      if (e.target.classList.contains('remove-row-btn')) {
        const rows = exContainer.querySelectorAll('.exercise-row');
        if (rows.length > 1) {
          e.target.closest('.exercise-row').remove();
        } else {
          showToast('Keep at least one exercise row');
        }
      }
    });
  }

  // Workout Logger: Form Submit
  const workoutForm = document.getElementById('workout-form');
  const workoutDateInput = document.getElementById('workout-date');
  if (workoutDateInput) workoutDateInput.value = new Date().toISOString().split('T')[0];

  if (workoutForm) {
    workoutForm.addEventListener('submit', e => {
      e.preventDefault();
      const date = document.getElementById('workout-date').value;
      const type = document.getElementById('workout-type').value;
      const notes = document.getElementById('workout-notes').value.trim();
      const completed = document.getElementById('workout-completed').checked;

      const exercises = [];
      document.querySelectorAll('.exercise-row').forEach(row => {
        const name = row.querySelector('.ex-name-input')?.value.trim();
        const sets = row.querySelector('.ex-sets-input')?.value.trim();
        const reps = row.querySelector('.ex-reps-input')?.value.trim();
        const weight = row.querySelector('.ex-weight-input')?.value.trim();
        if (name) {
          exercises.push({ name, sets, reps, weight });
        }
      });

      if (exercises.length === 0) {
        alert('Please add at least one exercise.');
        return;
      }

      const newWorkout = {
        id: 'w-' + Date.now(),
        date,
        type,
        completed,
        exercises,
        notes
      };

      state.physical.workoutLogs.unshift(newWorkout);
      persistState();
      renderPhysicalSection();
      renderSnapshotMetrics();
      renderRecentActivity();
      workoutForm.reset();
      workoutDateInput.value = new Date().toISOString().split('T')[0];
      showToast('Workout session recorded successfully!');
    });
  }

  // Applied Knowledge Note Form
  const knoteForm = document.getElementById('knowledge-note-form');
  if (knoteForm) {
    knoteForm.addEventListener('submit', e => {
      e.preventDefault();
      const concept = document.getElementById('knote-concept').value.trim();
      const topic = document.getElementById('knote-topic').value.trim();
      const appliedProjectId = document.getElementById('knote-project').value;
      const explanation = document.getElementById('knote-explanation').value.trim();
      const practicalExample = document.getElementById('knote-example').value.trim();
      const questions = document.getElementById('knote-questions').value.trim();
      const references = document.getElementById('knote-references').value.trim();
      const rawTags = document.getElementById('knote-tags').value.trim();

      const tags = rawTags.split(/[, ]+/).map(t => t.trim().toLowerCase().replace(/^#/, '')).filter(Boolean);

      const newNote = {
        id: 'note-' + Date.now(),
        date: new Date().toISOString().split('T')[0],
        topic: topic || 'General',
        concept,
        explanation,
        whyItMatters: 'Applied building insight.',
        practicalExample,
        appliedProjectId,
        questions,
        references,
        tags: tags.length > 0 ? tags : ['systems'],
        understanding: {
          canExplainWithoutNotes: true,
          canImplement: true,
          knowsLimitations: false
        }
      };

      state.intellectualNotes.unshift(newNote);
      persistState();
      renderIntellectualSection();
      renderSnapshotMetrics();
      renderRecentActivity();
      knoteForm.reset();
      showToast('Applied knowledge note archived!');
    });
  }

  // Knowledge Tag Filters & Live Search
  const tagFilterBar = document.getElementById('knote-tag-filter-bar');
  if (tagFilterBar) {
    tagFilterBar.addEventListener('click', e => {
      const btn = e.target.closest('.knote-tag-pill');
      if (!btn) return;
      state.activeLogTag = btn.dataset.tag;
      renderIntellectualSection();
    });
  }

  const knoteSearch = document.getElementById('knote-search-input');
  if (knoteSearch) {
    knoteSearch.addEventListener('input', () => {
      state.searchQueryNotes = knoteSearch.value.trim();
      renderIntellectualSection();
    });
  }

  // Knowledge Understanding Prompt Checkboxes
  const notesFeed = document.getElementById('knowledge-notes-feed');
  if (notesFeed) {
    notesFeed.addEventListener('change', e => {
      const checkType = e.target.dataset.check;
      const id = e.target.dataset.id;
      if (!checkType || !id) return;
      const note = state.intellectualNotes.find(n => n.id === id);
      if (!note) return;
      if (!note.understanding) note.understanding = {};

      if (checkType === 'explain') note.understanding.canExplainWithoutNotes = e.target.checked;
      else if (checkType === 'implement') note.understanding.canImplement = e.target.checked;
      else if (checkType === 'limitations') note.understanding.knowsLimitations = e.target.checked;

      persistState();
    });
  }

  // Roll Radar Triad
  const shuffleRadarBtn = document.getElementById('radar-shuffle-btn');
  if (shuffleRadarBtn) {
    shuffleRadarBtn.addEventListener('click', () => {
      state.activeRadarTriadIdx = (state.activeRadarTriadIdx + 1);
      renderRadarTriad();
      showToast('Loaded next polymath intake triad');
    });
  }

  // Content Capture Form (X / Public Presence)
  const contentForm = document.getElementById('content-capture-form');
  if (contentForm) {
    contentForm.addEventListener('submit', e => {
      e.preventDefault();
      const title = document.getElementById('content-title').value.trim();
      const category = document.getElementById('content-category').value;
      const status = document.getElementById('content-status').value;
      const draft = document.getElementById('content-draft').value.trim();
      const projectId = document.getElementById('content-project').value;
      const publishedUrl = document.getElementById('content-pub-url').value.trim();

      const newContent = {
        id: 'x-' + Date.now(),
        title,
        category,
        status,
        draft,
        platform: 'X',
        projectId,
        publishedUrl,
        metrics: {
          impressions: 0,
          likes: 0,
          reposts: 0,
          isManual: true,
          verificationNote: 'Manually logged draft'
        }
      };

      state.contentPipeline.unshift(newContent);
      persistState();
      renderXSection();
      renderSnapshotMetrics();
      contentForm.reset();
      showToast('Saved to X content pipeline!');
    });
  }

  // Content Pipeline Card Actions (Advance Stage, Copy Draft)
  const pipelineGrid = document.getElementById('pipeline-stages-grid');
  if (pipelineGrid) {
    pipelineGrid.addEventListener('click', e => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const id = btn.dataset.id;
      const content = state.contentPipeline.find(c => c.id === id);
      if (!content) return;

      if (btn.dataset.action === 'copy-draft') {
        if (navigator.clipboard && content.draft) {
          navigator.clipboard.writeText(content.draft).then(() => {
            showToast('Draft copy copied to clipboard!');
          });
        }
      } else if (btn.dataset.action === 'next-stage') {
        const stages = ['Idea', 'Draft', 'Ready', 'Published'];
        const currentIdx = stages.indexOf(content.status);
        if (currentIdx < stages.length - 1) {
          content.status = stages[currentIdx + 1];
          if (content.status === 'Published') {
            const impressions = prompt('Enter verified Impressions (manual entry):', '500');
            const likes = prompt('Enter verified Likes (manual entry):', '25');
            content.metrics = {
              impressions: Number(impressions) || 0,
              likes: Number(likes) || 0,
              reposts: 0,
              isManual: true,
              verificationNote: 'Manually verified from X dashboard'
            };
          }
          persistState();
          renderXSection();
          renderSnapshotMetrics();
          showToast(`Advanced to ${content.status}!`);
        }
      }
    });
  }

  // Weekly Review Auto-Generate & Submit
  const genReviewBtn = document.getElementById('generate-review-btn');
  if (genReviewBtn) {
    genReviewBtn.addEventListener('click', generateWeeklyReviewDraft);
  }

  const reviewForm = document.getElementById('weekly-review-form');
  if (reviewForm) {
    reviewForm.addEventListener('submit', e => {
      e.preventDefault();
      const weekStarting = document.getElementById('review-week-date').value;
      const nextWeekOutcome = document.getElementById('review-prompt-9').value.trim();
      const summary = document.getElementById('review-summary-text').value.trim();

      const newReview = {
        id: 'rev-' + Date.now(),
        weekStarting,
        answers: {
          shippedWork: document.getElementById('review-prompt-1').value.trim(),
          deepLearnings: document.getElementById('review-prompt-2').value.trim(),
          flagshipProgress: document.getElementById('review-prompt-3').value.trim(),
          physicalTraining: document.getElementById('review-prompt-4').value.trim(),
          mostValue: document.getElementById('review-prompt-5').value.trim(),
          wastedTime: document.getElementById('review-prompt-6').value.trim(),
          avoided: document.getElementById('review-prompt-7').value.trim(),
          obstacle: document.getElementById('review-prompt-8').value.trim(),
          nextWeekOutcome,
          stopDoing: document.getElementById('review-prompt-10').value.trim()
        },
        generatedSummary: summary,
        isFinalized: true
      };

      state.weeklyReviews.unshift(newReview);
      persistState();
      renderWeeklyReviewSection();
      showToast('Weekly review finalized and archived!');
    });
  }

  // Strategic Criteria Toggle
  const cycleCard = document.getElementById('active-cycle-container');
  if (cycleCard) {
    cycleCard.addEventListener('change', e => {
      if (e.target.dataset.action === 'toggle-criteria') {
        const id = e.target.dataset.id;
        const cycle = state.strategicCycles[0];
        if (!cycle) return;
        const item = cycle.successCriteria.find(sc => sc.id === id);
        if (item) {
          item.completed = e.target.checked;
          persistState();
          showToast(item.completed ? 'Criterion achieved!' : 'Criterion unchecked');
        }
      }
    });
  }

  // Settings Drawer Toggle
  const openSettingsBtn = document.getElementById('nav-settings-btn');
  const closeSettingsBtn = document.getElementById('close-settings-btn');
  const settingsBackdrop = document.getElementById('settings-backdrop');
  const saveSettingsBtn = document.getElementById('save-settings-btn');
  const northStarInput = document.getElementById('settings-north-star');
  const flagshipSelect = document.getElementById('settings-flagship-select');
  const editNorthStarBtn = document.getElementById('edit-north-star-btn');

  function openSettings() {
    if (northStarInput) northStarInput.value = state.profile.northStar || initialData.profile.northStar;
    if (flagshipSelect) flagshipSelect.value = state.settings.flagshipProjectId || 'proj-orbit';
    if (settingsBackdrop) {
      settingsBackdrop.style.display = 'flex';
      settingsBackdrop.setAttribute('aria-hidden', 'false');
    }
  }

  function closeSettings() {
    if (settingsBackdrop) {
      settingsBackdrop.style.display = 'none';
      settingsBackdrop.setAttribute('aria-hidden', 'true');
    }
  }

  if (openSettingsBtn) openSettingsBtn.addEventListener('click', openSettings);
  if (editNorthStarBtn) editNorthStarBtn.addEventListener('click', openSettings);
  if (closeSettingsBtn) closeSettingsBtn.addEventListener('click', closeSettings);

  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener('click', () => {
      const ns = northStarInput?.value.trim();
      const fs = flagshipSelect?.value;
      if (ns) {
        state.profile.northStar = ns;
        state.settings.northStar = ns;
      }
      if (fs) {
        state.settings.flagshipProjectId = fs;
        state.projects.forEach(p => { p.isFlagship = (p.id === fs); });
      }
      persistState();
      renderCommandCenter();
      renderProjectsSection();
      closeSettings();
      showToast('Settings saved successfully!');
    });
  }

  // Export JSON & Reset Defaults
  const exportBtn = document.getElementById('export-json-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
      const dlAnchor = document.createElement('a');
      dlAnchor.setAttribute("href", dataStr);
      dlAnchor.setAttribute("download", `maxxing-system-export-${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(dlAnchor);
      dlAnchor.click();
      dlAnchor.remove();
      showToast('System data exported as JSON!');
    });
  }

  const resetBtn = document.getElementById('reset-defaults-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Reset all tracking records back to baseline initialData? This cannot be undone.')) {
        localStorage.removeItem(STORAGE_KEY);
        state = initState();
        persistState();
        renderAll();
        closeSettings();
        showToast('System restored to default baseline.');
      }
    });
  }

  // Keyboard accessibility: Escape to close modals
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const backdrops = document.querySelectorAll('.modal-backdrop');
      backdrops.forEach(b => {
        b.style.display = 'none';
        b.setAttribute('aria-hidden', 'true');
      });
    }
  });
}

// ----------------------------------------------------------------------------
// MASTER RENDER ORCHESTRATOR
// ----------------------------------------------------------------------------
function renderAll() {
  updateTimeCadence();
  renderCommandCenter();
  renderProjectsSection();
  renderPhysicalSection();
  renderIntellectualSection();
  renderXSection();
  renderCareerSection();
  renderWeeklyReviewSection();
  renderStrategicCyclesSection();
  renderFiveYearHorizon();
}

// Bootstrapping
document.addEventListener('DOMContentLoaded', () => {
  renderAll();
  initEventListeners();
  setInterval(updateTimeCadence, 1000);
});

// Run immediate render in case DOM already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  renderAll();
  initEventListeners();
  setInterval(updateTimeCadence, 1000);
}
