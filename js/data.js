/* ============================================================================
   SYSTEM DATA STORE: BOLD — PERSONAL BLUEPRINT & LIFE MAP
   Real data baseline for Bold (CMO at Orbit, AI Memory Builder).
   ============================================================================ */

export const initialData = {
  profile: {
    callsign: "BOLD",
    fullName: "Bold",
    age: 23,
    role: "CMO — Marketing & Growth at Orbit",
    location: "INDIA",
    status: "BUILDING_ORBIT",
    dob: "2002-10-04",
    bio: [
      "Building at the intersection of AI, products, growth, and technology.",
      "Currently CMO at Orbit (GTM, user acquisition, product positioning).",
      "Exploring AI memory architectures, second-brain systems, and knowledge retrieval (Lumen / Sheldon).",
      "Learning by building, experimenting, and documenting the raw process."
    ],
    currentFocus: {
      headline: "Scaling Orbit user acquisition and architecting AI memory systems (Lumen).",
      details: "Focusing daily execution on Orbit's October growth push (GTM, content, product validation, e-commerce positioning), while studying systems engineering and AI memory models.",
      activeCadence: "Orbit Marketing & GTM → Merchant Journey Testing → Lumen Architecture → Technical Study & Systems Review"
    }
  },

  projects: [
    {
      id: "proj-orbit",
      title: "Orbit",
      tagline: "E-commerce growth & marketing engine ($0 → $10,000 MRR)",
      category: "GROWTH & REVENUE",
      status: "ACTIVE — SCALING",
      progress: 68,
      role: "CMO / Marketing & Growth",
      tech: ["GTM Loops", "Founder Outreach", "D2C Marketing", "Funnel CRO", "E-commerce Integration"],
      description: "Executing structured marketing for Orbit to transition from $0 to $10,000 MRR. Conducting founder outreach across 250+ D2C stores, optimizing checkout drop-off, and turning pilot merchants into paid recurring accounts.",
      link: "#",
      metrics: "Target: $10,000 MRR Milestone • 5% Visitor-to-Paid"
    },
    {
      id: "proj-agenttrace",
      title: "AgentTrace",
      tagline: "Autonomous AI agent observability & execution tracing (YC Candidate)",
      category: "AI & INFRASTRUCTURE",
      status: "IN SPRINT — YC READY",
      progress: 75,
      role: "Founder & Lead Architect",
      tech: ["Agent Telemetry", "Execution Graphs", "TypeScript", "Observability", "LLM Tracing"],
      description: "Building production observability for autonomous AI agent swarms and multi-step reasoning trajectories. Packaging live demos, benchmarks, and submitting to Y Combinator (YC).",
      link: "#",
      metrics: "YC Application Sprint • Full Telemetry & Tracing Pipeline"
    },
    {
      id: "proj-lumen",
      title: "Lumen / Sheldon",
      tagline: "Hierarchical AI memory engine & personal second-brain architecture",
      category: "AI & SYSTEMS",
      status: "ARCHITECTURE — PROTOTYPE",
      progress: 60,
      role: "Creator & Systems Architect",
      tech: ["AI Memory", "pgvector", "PostgreSQL", "HNSW Indexing", "TypeScript SDK"],
      description: "Researching and prototyping an AI memory system with hierarchical storage: raw journal streams, canonical entity memory, and sub-18ms HNSW vector retrieval for autonomous agents.",
      link: "#",
      metrics: "Sub-18ms Vector Retrieval • 99.2% Recall on 100k Vectors"
    },
    {
      id: "proj-jarvis",
      title: "Jarvis",
      tagline: "Personal autonomous executive assistant agent",
      category: "AUTONOMOUS AGENTS",
      status: "DEVELOPMENT",
      progress: 45,
      role: "Architect & Builder",
      tech: ["Autonomous Workflows", "Task Orchestration", "Local LLM Tooling", "Cron Automation"],
      description: "Crafting a personal executive assistant agent to automate daily research digests, calendar scheduling, outreach pipelines, and systems monitoring with local-first security.",
      link: "#",
      metrics: "Autonomous Daily Digest • Task Scheduling Engine"
    }
  ],

  octoberTargets: [
    {
      id: "target-oct-01",
      code: "SPEC // ORB-REV",
      theme: "folder-manila",
      tabPos: 1,
      tabTitle: "[01] ORBIT $10K MRR",
      title: "Orbit Marketing Engine: $0 → $10,000 MRR",
      category: "GROWTH & REVENUE",
      targetValue: 10000,
      currentValue: 1200,
      unit: "USD MRR",
      status: "SCALING",
      deadline: "2026-10-31",
      notes: "Engineer high-converting marketing loops, founder-to-founder outreach, and transition Orbit from $0 to $10,000 monthly recurring revenue.",
      mission: "Execute structured, high-signal marketing for Orbit. Establish automated merchant onboarding, launch viral checkout case study breakdowns, and systematically climb from early paid pilot cohorts to the $10,000 MRR milestone.",
      milestones: [
        { id: "m-orb-1", text: "Execute Orbit marketing sprint: direct founder outreach across 250+ high-GMV D2C brands", completed: true },
        { id: "m-orb-2", text: "Launch high-converting landing page with interactive checkout leak demo sandbox", completed: true },
        { id: "m-orb-3", text: "Convert pilot merchants to paid recurring tier & cross the initial $1,000 MRR mark", completed: true },
        { id: "m-orb-4", text: "Scale referral loops and affiliate distribution to compound toward $10,000 MRR", completed: false }
      ],
      tactileMemo: "Orbit marketing works best when showing exact checkout drop-off teardowns. Real revenue leaks convert merchants instantly.",
      techDetails: {
        focus: "Founder Outreach, Conversion Funnels, MRR Compounding",
        metrics: "$0 → $10,000 MRR Target • 5% Visitor-to-Paid",
        deliverable: "Predictable merchant acquisition engine & MRR dashboard"
      }
    },
    {
      id: "target-oct-02",
      code: "SPEC // TRACE-YC",
      theme: "folder-sage",
      tabPos: 2,
      tabTitle: "[02] 3 PROJECTS & YC",
      title: "Complete 3 Projects (AgentTrace, Lumen, Jarvis) & Submit to YC",
      category: "SOFTWARE & VENTURES",
      targetValue: 100,
      currentValue: 65,
      unit: "%",
      status: "IN SPRINT",
      deadline: "2026-10-31",
      notes: "Finalize production builds for AgentTrace, Lumen, and Jarvis; prepare and submit the AgentTrace application for Y Combinator.",
      mission: "Deliver three foundational AI software systems: 1) AgentTrace (agent execution graph tracer and debugger), 2) Lumen (3-tier hierarchical agent memory engine), and 3) Jarvis (personal task agent). Package AgentTrace with demo benchmarks and submit to YC.",
      milestones: [
        { id: "m-yc-1", text: "Complete AgentTrace: end-to-end agent tracing, telemetry, and debugging dashboard", completed: true },
        { id: "m-yc-2", text: "Complete Lumen: hierarchical second-brain memory engine prototype with HNSW recall", completed: true },
        { id: "m-yc-3", text: "Complete Jarvis: autonomous personal executive assistant for daily task orchestration", completed: false },
        { id: "m-yc-4", text: "Prepare founder video, product demo, traction metrics, and submit AgentTrace to YC", completed: false }
      ],
      tactileMemo: "YC cares about technical depth and demonstrable execution speed. A running AgentTrace live demo is our strongest asset.",
      techDetails: {
        focus: "Agent Observability, Memory Graphs & YC Application",
        metrics: "3 Shipped Projects • 100% YC Submission Readiness",
        deliverable: "AgentTrace repo + live demo + submitted YC application"
      }
    },
    {
      id: "target-oct-03",
      code: "SPEC // FIN-AGY",
      theme: "folder-lavender",
      tabPos: 3,
      tabTitle: "[03] ₹3L / INDUSTRY PLANT",
      title: "Industry Plant Agency & Financial Goal (₹3,00,000 Target / ₹1L+ Profit)",
      category: "AGENCY & CAPITAL",
      targetValue: 300000,
      currentValue: 115000,
      unit: "INR",
      status: "ACTIVE",
      deadline: "2026-10-31",
      notes: "Run Industry Plant Agency to fund personal operating budget and reinvestment (new phone and laptop); achieve min. ₹1 Lakh/month profit toward ₹3 Lakhs total.",
      mission: "Establish Industry Plant Agency as a focused, high-margin cashflow vehicle to secure personal runway. If systems scale smoothly, expand capacity; achieve minimum ₹1,00,000/month net personal profit, earn ₹3,00,000/- total, and upgrade to a new phone and laptop workstation.",
      milestones: [
        { id: "m-fin-1", text: "Launch Industry Plant Agency service offering and client acquisition pipeline", completed: true },
        { id: "m-fin-2", text: "Close initial client retainers to achieve min. ₹1,00,000/- monthly personal net profit", completed: true },
        { id: "m-fin-3", text: "Hit cumulative ₹3,00,000/- personal earnings target across Q4 operating window", completed: false },
        { id: "m-fin-4", text: "Reinvest earnings into high-performance workstation upgrade: buy new phone and laptop", completed: false }
      ],
      tactileMemo: "Industry Plant Agency gives immediate financial leverage. Lock in ₹1 Lakh/month profit first to manage budget, then expand.",
      techDetails: {
        focus: "B2B Agency Growth, High-Ticket Retainers, Profit Compounding",
        metrics: "₹3,00,000 Total Target • Min ₹1,00,000/mo Net Profit",
        deliverable: "Active client contracts, cashflow ledger & workstation upgrade"
      }
    },
    {
      id: "target-oct-04",
      code: "SPEC // SELF-01",
      theme: "folder-ochre",
      tabPos: 4,
      tabTitle: "[04] SELF & PRESENCE",
      title: "Identity Transformation: Fitness, Observational Mindset & Style",
      category: "SELF-MASTERY",
      targetValue: 100,
      currentValue: 60,
      unit: "%",
      status: "ACTIVE",
      deadline: "2026-10-31",
      notes: "Daily physical workouts, calm analytical observation, elevated wardrobe, new self-image, and learning to ride a bike.",
      mission: "Become version 1.0 of the elevated self: physically strong and disciplined through daily exercises, emotionally composed and calm, sharp at deductive analysis, paired with a refreshed wardrobe style, new confident personal image, and the practical mastery of learning to ride a bike.",
      milestones: [
        { id: "m-self-1", text: "Daily physical exercise regimen: build functional athletic fitness and daily discipline", completed: true },
        { id: "m-self-2", text: "Mental composure: practice calm presence, razor-sharp observation, and deductive analysis", completed: true },
        { id: "m-self-3", text: "Complete wardrobe overhaul: curate new minimalist clothing style and elevated personal image", completed: false },
        { id: "m-self-4", text: "Learn to ride a bike with complete control, technical balance, and road confidence", completed: false }
      ],
      tactileMemo: "Physical discipline grounds the mind. Observation before reaction; calm deduction over emotional impulse.",
      techDetails: {
        focus: "Daily Athletic Training, Deductive Observation, Style Upgrade",
        metrics: "31 Days of Daily Workouts • Wardrobe Refresh • Bike Mastery",
        deliverable: "Transformed daily physical routine & confident personal presence"
      }
    },
    {
      id: "target-oct-05",
      code: "SPEC // CRAFT-01",
      theme: "folder-slate",
      tabPos: 5,
      tabTitle: "[05] CINEMA & CRAFT",
      title: "Creative & Polymath Track: Movie Script, New Language & Cardistry",
      category: "INTELLECT & CRAFT",
      targetValue: 100,
      currentValue: 45,
      unit: "%",
      status: "IN PROGRESS",
      deadline: "2026-10-31",
      notes: "Complete feature movie script, initiate new language acquisition, broaden polymath knowledge, and master cardistry flourishes.",
      mission: "Expand intellectual and creative horizons through dedicated craft: complete the full draft of the movie script, initiate foundational fluency in a new language, broaden knowledge across interdisciplinary curiosities, and develop physical finger dexterity with cardistry cuts and flourishes.",
      milestones: [
        { id: "m-craft-1", text: "Complete the full feature movie script: finish screenplay draft from outline to page 110", completed: false },
        { id: "m-craft-2", text: "Start learning another language (daily grammar, vocabulary, and listening drills)", completed: true },
        { id: "m-craft-3", text: "Daily intellectual study across broad interdisciplinary curiosities (systems, cinema, science)", completed: true },
        { id: "m-craft-4", text: "Master core cardistry flourishes, one-handed cuts, and card manipulation tricks", completed: false }
      ],
      tactileMemo: "Cardistry teaches tactile patience; screenplay writing disciplines narrative structure. Polymath depth requires cross-training.",
      techDetails: {
        focus: "Screenwriting, Language Acquisition, Cardistry Sleights",
        metrics: "110-Page Movie Script • 30m Daily Language • 5 Cardistry Cuts",
        deliverable: "Finished screenplay PDF, language logbook & cardistry mechanics"
      }
    }
  ],
  // Backwards compatibility alias
  get septemberTargets() {
    return this.octoberTargets;
  },

  fiveYearHorizon: [
    {
      year: "2026",
      headline: "The Foundation & Traction Year",
      focus: "Scale Orbit to $10,000 MRR, ship AgentTrace to YC, prototype Lumen AI memory & Jarvis, launch Industry Plant Agency, and achieve complete personal transformation.",
      progress: 65,
      milestones: [
        { text: "Scale Orbit from $0 to $10,000 MRR via founder acquisition loops", done: false },
        { text: "Complete 3 software systems (AgentTrace, Lumen, Jarvis) & submit AgentTrace to YC", done: false },
        { text: "Earn min. ₹3,00,000/- with ₹1,00,000+/mo profit from Industry Plant Agency", done: false },
        { text: "Achieve physical fitness, wardrobe transformation, learn to ride a bike, and complete movie script", done: false }
      ]
    },
    {
      year: "2027",
      headline: "Scale & Deep Autonomy",
      focus: "Scale Orbit and product ecosystem; deepen software and AI engineering capabilities.",
      progress: 0,
      milestones: [
        { text: "Scale products to meaningful commercial traction & revenue", done: false },
        { text: "Deploy functional second-brain AI memory system into personal daily use", done: false },
        { text: "Expand technical breadth across distributed systems, AI agents, and RAG", done: false }
      ]
    },
    {
      year: "2028",
      headline: "Systems & Studio R&D",
      focus: "Transition from solo execution into building higher-leverage systems, products, and research.",
      progress: 0,
      milestones: [
        { text: "Launch high-impact software tool or intelligence infrastructure", done: false },
        { text: "Deepen polymathic knowledge across AI, business, and capital allocation", done: false }
      ]
    },
    {
      year: "2029",
      headline: "Leverage & Impact",
      focus: "Compound independent product revenue, invest in ambitious peers, and build enduring assets.",
      progress: 0,
      milestones: [
        { text: "Achieve complete financial and geographic sovereignty", done: false },
        { text: "Back and mentor early-stage ambitious builders", done: false }
      ]
    },
    {
      year: "2030-2031",
      headline: "Decade Horizon (Mastery)",
      focus: "Long-term compounding: enduring technologies, intellectual depth, and lifelong freedom.",
      progress: 0,
      milestones: [
        { text: "Build systems and companies that compound independently", done: false },
        { text: "Master Japanese language and explore deep international residencies", done: false }
      ]
    }
  ],

  bucketList: [
    { id: "bl-01", category: "VENTURES", text: "Submit and get funded by Y Combinator (YC) with AgentTrace", completed: false },
    { id: "bl-02", category: "REVENUE", text: "Scale Orbit from $0 to $10,000+ MRR through organic marketing loops", completed: false },
    { id: "bl-03", category: "FINANCES", text: "Earn min. ₹3,00,000/- independently with ₹1,00,000+/mo net profit from Industry Plant Agency", completed: false },
    { id: "bl-04", category: "PRODUCT", text: "Ship 3 landmark AI projects: AgentTrace, Lumen (AI Memory), and Jarvis (Autonomous Assistant)", completed: false },
    { id: "bl-05", category: "CINEMA", text: "Complete feature movie script and advance into production", completed: false },
    { id: "bl-06", category: "LIFE SKILL", text: "Learn to ride a bike with complete control and road confidence", completed: false },
    { id: "bl-07", category: "LANGUAGE", text: "Master a new language (Japanese) and spend 3+ months living and building in Tokyo", completed: false },
    { id: "bl-08", category: "CRAFT", text: "Master cardistry flourishes and sleight-of-hand card cuts", completed: false },
    { id: "bl-09", category: "HARDWARE", text: "Fund and buy a brand-new high-performance phone and laptop workstation from personal profits", completed: false },
    { id: "bl-10", category: "MASTERY", text: "Become a recognized polymath across AI, software engineering, marketing, and business", completed: false },
    { id: "bl-11", category: "SOVEREIGNTY", text: "Achieve 100% time, location, and financial sovereignty", completed: false }
  ],

  dailyLogs: [
    {
      id: "log-107",
      date: "2026-10-04",
      title: "Calibrating 31-day October sprints: velocity vs sustainable compounding",
      learned: "A 31-day cycle gives enough room for three 10-day focused milestone blocks with a 24h buffer. Pacing daily progress against the 31-day timeline prevents end-of-cycle rush and ensures software quality remains uncompromising.",
      tags: ["systems", "cadence", "focus"]
    },
    {
      id: "log-106",
      date: "2026-10-03",
      title: "HNSW index vector clustering: sub-18ms retrieval benchmarks",
      learned: "Tuning HNSW M=16 and efConstruction=64 in pgvector gives 99.2% recall with only 18ms latency across 100,000 vector embeddings. This unlocks conversational agent speed without sacrificing episodic retrieval accuracy.",
      tags: ["ai", "memory", "benchmarks"]
    },
    {
      id: "log-105",
      date: "2026-10-02",
      title: "Idempotency ledgers in high-concurrency ecommerce webhooks",
      learned: "Network retries from Shopify/WooCommerce can flood ingestion queues during peak traffic. Hashing incoming event IDs into a Redis atomic ledger with a 48h TTL drops duplicate processing to exactly 0 without blocking pipeline throughput.",
      tags: ["product", "qa", "systems"]
    },
    {
      id: "log-104",
      date: "2026-10-01",
      title: "Transitioning from heuristic search to hierarchical graph memory",
      learned: "Flat vector retrieval falls apart when context exceeds 50 sessions. By clustering episodic logs into canonical knowledge nodes at ingestion time, recall accuracy jumps from 72% to 94% with half the token overhead.",
      tags: ["ai", "memory", "systems"]
    },
    {
      id: "log-101",
      date: "2026-09-21",
      title: "Three-tier AI memory: Raw Log vs Canonical vs Abstract Knowledge",
      learned: "A second-brain agent cannot rely solely on raw vector search over raw logs. You need a 3-tier structure: 1) Raw episodic stream, 2) Canonical entity summaries, and 3) Abstract generalized knowledge. This reduces hallucination and preserves cross-session coherence.",
      tags: ["ai", "memory", "architecture"]
    },
    {
      id: "log-102",
      date: "2026-09-20",
      title: "Distribution loops must be engineered into product onboarding",
      learned: "In e-commerce SaaS, merchants care about revenue velocity, not feature lists. Positioning Orbit around speed-to-checkout and order recovery converts significantly better than generic analytics messaging.",
      tags: ["orbit", "gtm", "growth"]
    },
    {
      id: "log-103",
      date: "2026-09-19",
      title: "Testing edge cases in e-commerce cart synchronizations",
      learned: "Edge case failures in cart total recalculation during coupon application cause 80% of merchant trust degradation. Deep edge-case QA is actually a high-leverage marketing strategy.",
      tags: ["product", "qa", "systems"]
    }
  ]
};
