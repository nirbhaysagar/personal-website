/* ============================================================================
   MAXXING // PERSONAL OPERATING SYSTEM DATA STORE
   One primary growth focus. A few supporting habits. Everything else deliberately deprioritized.
   Real data baseline for Bold (CMO at Orbit, AI Builder & Systems Thinker).
   ============================================================================ */

export const initialData = {
  profile: {
    callsign: "BOLD",
    fullName: "Bold",
    age: 23,
    role: "CMO — Marketing & Growth at Orbit",
    location: "INDIA",
    status: "ACTIVE_FLAGSHIP_SPRINT",
    dob: "2002-10-04",
    bio: [
      "Building at the intersection of AI, products, growth, and technology.",
      "Currently CMO at Orbit: user acquisition, GTM, and merchant revenue loops.",
      "Exploring AI memory architectures, second-brain systems, and knowledge retrieval (Lumen).",
      "Learning by building, experimenting, and documenting the raw process."
    ],
    northStar: "Building enduring independence through technical competence, AI software leverage, rigorous thinking, and uncompromising physical capability.",
    vision: "Sovereign builder and entrepreneur compounding AI software ventures, cinematic craft, and physical mastery.",
    current90DayObjective: "Scale Orbit toward $10,000 MRR, maintain consistent athletic training, and master core AI agent & memory architectures.",
    currentFocus: {
      projectId: "proj-orbit",
      headline: "Scale Orbit from $0 to $10,000 MRR via high-signal merchant acquisition",
      whyItMatters: "Direct customer validation and revenue generation establish financial runway and prove market demand before scaling.",
      phase: "Building & Validation",
      nextAction: "Execute cold video audit teardowns for 20 high-volume Shopify stores",
      nextMilestone: "Convert first 10 paid pilot merchants on recurring tier",
      targetDate: "2026-10-31"
    }
  },

  priorities: {
    primary: {
      id: "p-project",
      name: "Project Maxxing (Orbit)",
      type: "PRIMARY_GROWTH_FOCUS",
      badge: "PRIMARY FOCUS",
      details: "Orbit GTM & revenue loops ($0 → $10k MRR). All peak morning creative energy reserved here."
    },
    supporting: [
      {
        id: "p-physical",
        name: "Physical Maxxing",
        type: "SUPPORTING_HABIT",
        badge: "SUPPORTING HABIT",
        details: "Athletic body recomposition, 4x/week lifting + daily mobility/running. Non-negotiable energy anchor."
      },
      {
        id: "p-intellectual",
        name: "Intellectual Maxxing",
        type: "INTEGRATED_LEARNING",
        badge: "INTEGRATED LEARNING",
        details: "Applied knowledge: study AI memory, systems internals, and sales directly through project execution."
      }
    ]
  },

  todayActions: [
    {
      id: "act-01",
      title: "Deliver 5 personalized Loom video checkout audits to Shopify store founders",
      category: "ORBIT GTM",
      projectId: "proj-orbit",
      isMustDo: true,
      status: "pending",
      dueDate: "Today",
      notes: "Highlight checkout drop-off and demonstrate live conversational BI recovery."
    },
    {
      id: "act-02",
      title: "Upper Body Hypertrophy workout: Incline DB Press, Weighted Pull-Ups & Arms",
      category: "PHYSICAL",
      projectId: "physical",
      isMustDo: true,
      status: "completed",
      dueDate: "Today",
      notes: "Target 26kg DBs on incline press with 3-second eccentric control."
    },
    {
      id: "act-03",
      title: "Synthesize note on Idempotent Webhook Hashing in Redis for e-commerce pipelines",
      category: "INTELLECT",
      projectId: "proj-orbit",
      isMustDo: false,
      status: "pending",
      dueDate: "Today",
      notes: "Connect to Orbit payment webhook edge cases."
    },
    {
      id: "act-04",
      title: "Draft X breakdown thread on Conversational BI vs 14-Tab Static Dashboards",
      category: "X / PUBLIC",
      projectId: "proj-orbit",
      isMustDo: false,
      status: "pending",
      dueDate: "Tomorrow",
      notes: "Position as builder-in-progress solving real DTC merchant pain."
    },
    {
      id: "act-05",
      title: "Weekly balance review: Track October runway against ₹40,000 cashflow milestone",
      category: "CAREER / CASHFLOW",
      projectId: "career",
      isMustDo: false,
      status: "pending",
      dueDate: "Sunday",
      notes: "Audit client retainers and allocate hardware upgrade budget."
    }
  ],

  projects: [
    {
      id: "proj-orbit",
      title: "Orbit",
      isFlagship: true,
      tagline: "E-commerce growth & marketing engine ($0 → $10,000 MRR)",
      category: "GROWTH & REVENUE",
      status: "ACTIVE — SCALING",
      phase: "Building",
      phasesList: ["Idea", "Research", "Validation", "Building", "Testing", "Launch", "Iteration", "Paused", "Completed"],
      progress: 68,
      role: "CMO / Marketing & Growth",
      problem: "E-commerce and D2C merchants suffer high checkout drop-offs and fragmented analytics without conversational clarity.",
      intendedUsers: "Founders, D2C brand operators, e-commerce marketers",
      whyChosen: "Direct path to cashflow, scalable SaaS economics, high leverage for outbound marketing mastery.",
      nextMilestone: "Convert first 10 paid pilot merchants on recurring tier ($500+ MRR)",
      nextAction: "Execute cold video audit teardowns for 20 high-volume Shopify stores",
      startDate: "2026-09-01",
      targetDate: "2026-10-31",
      demoUrl: "https://whatboldoceanisdoing.vercel.app/",
      repoUrl: "https://github.com/nirbhaysagar/personal-website",
      evidence: {
        status: "VERIFIED_DELIVERABLE",
        description: "Live merchant onboarding flow with checkout recovery and 2 pilot brand integrations.",
        url: "https://whatboldoceanisdoing.vercel.app/"
      },
      evaluation: {
        interest: 9,
        learning: 8,
        feasibility: 9,
        timeToResult: 8,
        customerDemand: 9,
        strategicAlignment: 10,
        reasoning: "Highest commercial alignment; immediately exercises B2B sales and SaaS growth loops while delivering runway."
      },
      retrospectives: [
        {
          id: "retro-orb-01",
          date: "2026-10-04",
          milestone: "Onboarding v1 & Merchant Outreach",
          intended: "Achieve 10 merchant signups via email outreach.",
          actual: "Obtained 2 active pilots; discovered cold email response was low without custom video proof.",
          worked: "Direct screen recording audits of merchant stores had an 80% response rate.",
          failed: "Generic text pitches and feature lists generated zero conversions.",
          learned: "Merchants care about order recovery and revenue velocity, not feature dashboards.",
          changes: "Shifted outbound strategy entirely to tailored Loom audit teardowns.",
          next: "Produce 20 personalized video audits for verified Shopify store owners."
        }
      ],
      tech: ["GTM Loops", "Founder Outreach", "D2C Marketing", "Funnel CRO", "E-commerce Integration"],
      description: "Executing structured marketing for Orbit to transition from $0 to $10,000 MRR. Conducting founder outreach across 250+ D2C stores, optimizing checkout drop-off, and turning pilot merchants into paid recurring accounts."
    },
    {
      id: "proj-agenttrace",
      title: "AgentTrace",
      isFlagship: false,
      tagline: "Autonomous AI agent observability & execution tracing (YC Candidate)",
      category: "AI & INFRASTRUCTURE",
      status: "IN SPRINT — YC READY",
      phase: "Testing",
      progress: 75,
      role: "Founder & Lead Architect",
      problem: "Developers building autonomous multi-agent systems lack granular execution tracing for tool failures and reasoning loops.",
      intendedUsers: "AI engineers, agentic system architects, LLM application builders",
      whyChosen: "Critical infrastructure void in the agentic ecosystem; massive venture upside and YC candidate potential.",
      nextMilestone: "Complete interactive telemetry trace replay & submit YC W27 application",
      nextAction: "Record 3-minute interactive trace replay demo with LangChain/CrewAI sample swarms",
      startDate: "2026-09-15",
      targetDate: "2026-10-25",
      demoUrl: "#",
      repoUrl: "#",
      evidence: {
        status: "PROTOTYPE_FUNCTIONAL",
        description: "Local trace ingestion engine benchmarking tool-call latencies and DAG graph rendering.",
        url: "#"
      },
      evaluation: {
        interest: 10,
        learning: 10,
        feasibility: 7,
        timeToResult: 6,
        customerDemand: 8,
        strategicAlignment: 9,
        reasoning: "Deep technical moat; directly builds AI systems credibility and positions for Y Combinator."
      },
      retrospectives: [],
      tech: ["Agent Telemetry", "Execution Graphs", "TypeScript", "Observability", "LLM Tracing"],
      description: "Building production observability for autonomous AI agent swarms and multi-step reasoning trajectories. Packaging live demos, benchmarks, and submitting to Y Combinator (YC)."
    },
    {
      id: "proj-lumen",
      title: "Lumen / Sheldon",
      isFlagship: false,
      tagline: "Hierarchical AI memory engine & personal second-brain architecture",
      category: "AI & SYSTEMS",
      status: "ARCHITECTURE — PROTOTYPE",
      phase: "Research",
      progress: 60,
      role: "Creator & Systems Architect",
      problem: "Long-term AI agents forget episodic nuance across multi-session trajectories, leading to hallucination and context drift.",
      intendedUsers: "Solo developers, autonomous research agents, personal second-brain systems",
      whyChosen: "Solves personal second-brain need while gaining rigorous proficiency in vector indexing (pgvector/HNSW).",
      nextMilestone: "Sub-18ms HNSW retrieval across 100,000 episodic embeddings",
      nextAction: "Benchmark cosine distance vs inner product with M=16 in pgvector",
      startDate: "2026-09-10",
      targetDate: "2026-11-15",
      demoUrl: "#",
      repoUrl: "#",
      evidence: {
        status: "BENCHMARKED",
        description: "Benchmark test script yielding 18ms latency on 100k test embeddings.",
        url: "#"
      },
      evaluation: {
        interest: 10,
        learning: 10,
        feasibility: 7,
        timeToResult: 6,
        customerDemand: 7,
        strategicAlignment: 8,
        reasoning: "Compounding intellectual investment; provides deep foundational mastery of vector mathematics and memory graphs."
      },
      retrospectives: [],
      tech: ["AI Memory", "pgvector", "PostgreSQL", "HNSW Indexing", "TypeScript SDK"],
      description: "Researching and prototyping an AI memory system with hierarchical storage: raw journal streams, canonical entity memory, and sub-18ms HNSW vector retrieval for autonomous agents."
    },
    {
      id: "proj-jarvis",
      title: "Jarvis",
      isFlagship: false,
      tagline: "Personal autonomous executive assistant agent",
      category: "AUTONOMOUS AGENTS",
      status: "DEVELOPMENT",
      phase: "Building",
      progress: 45,
      role: "Architect & Builder",
      problem: "Routine founder operations (daily literature digests, calendar scheduling, lead scraping) cause cognitive friction.",
      intendedUsers: "Personal founder operations",
      whyChosen: "Automates personal operating tasks while exploring deterministic state machines for agent tool calling.",
      nextMilestone: "Autonomous morning digest sent via Telegram bot at 07:00 AM",
      nextAction: "Connect local cron trigger to arXiv and Twitter API digest script",
      startDate: "2026-09-25",
      targetDate: "2026-11-01",
      demoUrl: "#",
      repoUrl: "#",
      evidence: {
        status: "IN_DEVELOPMENT",
        description: "Local Python worker parsing RSS and social streams into formatted markdown daily notes.",
        url: "#"
      },
      evaluation: {
        interest: 8,
        learning: 8,
        feasibility: 9,
        timeToResult: 8,
        customerDemand: 5,
        strategicAlignment: 7,
        reasoning: "High immediate daily utility; eliminates repetitive operational drag."
      },
      retrospectives: [],
      tech: ["Autonomous Workflows", "Task Orchestration", "Local LLM Tooling", "Cron Automation"],
      description: "Crafting a personal executive assistant agent to automate daily research digests, calendar scheduling, outreach pipelines, and systems monitoring with local-first security."
    }
  ],

  physical: {
    profile: {
      weight: 71.4,
      unit: "kg",
      height: 178,
      heightUnit: "cm",
      goalWeight: 75.0,
      targetBodyFat: "12-14%",
      objective: "Develop a lean, athletic, visibly muscular physique with functional strength and mobility.",
      trainingSplit: "Upper / Lower / Rest / Push / Pull / Legs"
    },
    supportingHabits: {
      sleepHoursTarget: 8,
      sleepAverage: 7.5,
      proteinTarget: 140,
      proteinUnit: "g",
      recoveryScore: "High",
      stepsDailyTarget: 8000
    },
    workoutLogs: [
      {
        id: "w-04",
        date: "2026-10-17",
        type: "Upper Body & Chest Hypertrophy",
        completed: true,
        exercises: [
          { name: "Incline Dumbbell Press", sets: 4, reps: "10, 10, 8, 8", weight: "26 kg" },
          { name: "Flat Barbell Bench", sets: 3, reps: "8, 8, 6", weight: "70 kg" },
          { name: "Weighted Pull-Ups", sets: 4, reps: "6, 6, 5, 5", weight: "+10 kg" },
          { name: "Cable Chest Flyes", sets: 3, reps: "12, 12, 12", weight: "15 kg" },
          { name: "Overhead Triceps Rope Extension", sets: 3, reps: "12, 10, 10", weight: "22 kg" }
        ],
        notes: "Solid chest contraction. Progressive overload achieved on incline dumbbell press with strict 3s eccentric tempo."
      },
      {
        id: "w-03",
        date: "2026-10-15",
        type: "Pull & Posterior Chain",
        completed: true,
        exercises: [
          { name: "Chest-Supported T-Bar Row", sets: 4, reps: "10, 10, 8, 8", weight: "55 kg" },
          { name: "Lat Pulldown (Neutral Grip)", sets: 3, reps: "10, 10, 8", weight: "65 kg" },
          { name: "Face Pulls", sets: 3, reps: "15, 15, 15", weight: "20 kg" },
          { name: "Incline DB Bicep Curls", sets: 3, reps: "10, 10, 8", weight: "14 kg" }
        ],
        notes: "Back engaged throughout. Focused on scapular retraction at peak contraction."
      },
      {
        id: "w-02",
        date: "2026-10-13",
        type: "Legs & Core Stability",
        completed: true,
        exercises: [
          { name: "Barbell Back Squat", sets: 4, reps: "8, 8, 8, 6", weight: "85 kg" },
          { name: "Romanian Deadlift (RDL)", sets: 3, reps: "10, 10, 10", weight: "80 kg" },
          { name: "Walking Dumbbell Lunges", sets: 3, reps: "12 steps/leg", weight: "18 kg" },
          { name: "Hanging Leg Raises", sets: 3, reps: "15, 12, 12", weight: "Bodyweight" }
        ],
        notes: "Deep controlled stretch on RDLs. Core stayed braced."
      },
      {
        id: "w-01",
        date: "2026-10-11",
        type: "Cardio & Full-Body Mobility",
        completed: true,
        exercises: [
          { name: "Zone 2 Outdoor Road Run", sets: 1, reps: "32 mins", weight: "4.5 km" },
          { name: "Hip Opener & Thoracic Spine Mobility", sets: 1, reps: "20 mins", weight: "Bodyweight" }
        ],
        notes: "Steady nasal breathing maintained. Joint stiffness dissolved."
      }
    ],
    weightHistory: [
      { date: "2026-09-20", weight: 70.2 },
      { date: "2026-09-27", weight: 70.8 },
      { date: "2026-10-04", weight: 71.1 },
      { date: "2026-10-11", weight: 71.4 }
    ]
  },

  intellectualNotes: [
    {
      id: "note-107",
      date: "2026-10-04",
      topic: "Strategic Cadence",
      concept: "Calibrating 31-Day Sprints: Velocity vs Sustainable Compounding",
      explanation: "A 31-day cycle gives enough room for three 10-day focused milestone blocks with a 24h buffer. Pacing daily progress against the 31-day timeline prevents end-of-cycle rush and ensures software quality remains uncompromising.",
      whyItMatters: "Prevents burnout and keeps execution focused on the single flagship deliverable.",
      practicalExample: "Breaking October Orbit targets into Days 1–10 (Outbound audits), Days 11–20 (Pilot onboarding), Days 21–30 (Paid conversion).",
      appliedProjectId: "proj-orbit",
      questions: "How to automate the transition between milestone blocks without losing momentum?",
      references: "Robert Greene (The 33 Strategies of War), Andy Grove (High Output Management)",
      tags: ["systems", "cadence", "focus"],
      understanding: {
        canExplainWithoutNotes: true,
        canImplement: true,
        knowsLimitations: true
      }
    },
    {
      id: "note-106",
      date: "2026-10-03",
      topic: "Vector Search & Embeddings",
      concept: "HNSW Index Tuning for Sub-18ms Episodic Memory Retrieval",
      explanation: "Tuning HNSW M=16 and efConstruction=64 in pgvector gives 99.2% recall with only 18ms latency across 100,000 vector embeddings. This unlocks conversational agent speed without sacrificing episodic retrieval accuracy.",
      whyItMatters: "Conversational agents feel snappy when context retrieval latency is below 30ms.",
      practicalExample: "Configuring postgres with CREATE INDEX ON embeddings USING hnsw (embedding vector_cosine_ops) WITH (m = 16, ef_construction = 64);",
      appliedProjectId: "proj-lumen",
      questions: "What is the memory trade-off when scaling from 100k to 10M vectors on a single instance?",
      references: "Malkov & Yashunin (2018) HNSW paper, pgvector documentation",
      tags: ["ai", "memory", "benchmarks", "pgvector"],
      understanding: {
        canExplainWithoutNotes: true,
        canImplement: true,
        knowsLimitations: true
      }
    },
    {
      id: "note-105",
      date: "2026-10-02",
      topic: "Distributed Systems & E-Commerce",
      concept: "Idempotency Ledgers in High-Concurrency Webhook Ingestion",
      explanation: "Network retries from Shopify/WooCommerce can flood ingestion queues during peak traffic. Hashing incoming event IDs into a Redis atomic ledger with a 48h TTL drops duplicate processing to exactly 0 without blocking pipeline throughput.",
      whyItMatters: "Prevents double-charging or duplicate alert dispatch in production e-commerce stacks.",
      practicalExample: "Redis SET webhook:evt_{id} 1 EX 172800 NX returns null if already processed.",
      appliedProjectId: "proj-orbit",
      questions: "How to handle out-of-order webhook delivery for state updates?",
      references: "Stripe API Webhook Idempotency Architecture",
      tags: ["product", "qa", "systems", "ecommerce"],
      understanding: {
        canExplainWithoutNotes: true,
        canImplement: true,
        knowsLimitations: true
      }
    },
    {
      id: "note-104",
      date: "2026-10-01",
      topic: "Agent Knowledge Architectures",
      concept: "Hierarchical Graph Memory vs Flat Vector Retrieval",
      explanation: "Flat vector retrieval falls apart when context exceeds 50 sessions. By clustering episodic logs into canonical knowledge nodes at ingestion time, recall accuracy jumps from 72% to 94% with half the token overhead.",
      whyItMatters: "Enables long-horizon multi-agent agents to synthesize patterns over months without drowning in prompt context.",
      practicalExample: "Summarizing 10 daily conversation logs into a single canonical entity card before generating vectors.",
      appliedProjectId: "proj-lumen",
      questions: "When does graph clustering introduce summarization bias?",
      references: "MemGPT paper, Generative Agents (Park et al.)",
      tags: ["ai", "memory", "systems"],
      understanding: {
        canExplainWithoutNotes: true,
        canImplement: true,
        knowsLimitations: true
      }
    },
    {
      id: "note-101",
      date: "2026-09-21",
      topic: "Cognitive AI Systems",
      concept: "Three-Tier Memory Schema: Episodic Log → Canonical Node → Abstract Heuristic",
      explanation: "A second-brain agent cannot rely solely on raw vector search over raw logs. You need a 3-tier structure: 1) Raw episodic stream, 2) Canonical entity summaries, and 3) Abstract generalized knowledge. This reduces hallucination and preserves cross-session coherence.",
      whyItMatters: "Foundational architecture for personal second-brain systems and persistent autonomous agents.",
      practicalExample: "Logging daily workouts in raw tier, updating 1RM estimates in canonical tier, deriving recovery rules in abstract tier.",
      appliedProjectId: "proj-lumen",
      questions: "How frequently should the abstraction worker run?",
      references: "Cognitive Architectures (Soar/ACT-R) & Modern LLM Memory Systems",
      tags: ["ai", "memory", "architecture"],
      understanding: {
        canExplainWithoutNotes: true,
        canImplement: true,
        knowsLimitations: true
      }
    },
    {
      id: "note-102",
      date: "2026-09-20",
      topic: "B2B SaaS Growth",
      concept: "Distribution Loops Embedded into Core Product Onboarding",
      explanation: "In e-commerce SaaS, merchants care about revenue velocity, not feature lists. Positioning Orbit around speed-to-checkout and order recovery converts significantly better than generic analytics messaging.",
      whyItMatters: "Lowers CAC and aligns product telemetry directly with customer economic incentives.",
      practicalExample: "Providing store owners an instant one-click audit report showing abandoned orders recoverable today.",
      appliedProjectId: "proj-orbit",
      questions: "What is the best trigger point for white-glove onboarding outreach?",
      references: "Gabriel Weinberg (Traction), Rob Fitzpatrick (The Mom Test)",
      tags: ["orbit", "gtm", "growth"],
      understanding: {
        canExplainWithoutNotes: true,
        canImplement: true,
        knowsLimitations: true
      }
    }
  ],

  contentPipeline: [
    {
      id: "x-01",
      title: "Why 14-Tab Static Dashboards Are Dying (Conversational BI)",
      draft: "Most founders spend 40 mins every Monday staring at Looker, GA4, and Shopify charts without knowing what actually broke.\n\nConversational agents that query Postgres directly and explain why checkout conversion dipped in plain English will replace 80% of passive dashboards.\n\nHere's how we're building it at Orbit.",
      category: "Building in Public",
      status: "Ready",
      platform: "X",
      projectId: "proj-orbit",
      publishedUrl: "",
      metrics: {
        impressions: 0,
        likes: 0,
        reposts: 0,
        isManual: true,
        verificationNote: "Pending release scheduled for tomorrow morning"
      }
    },
    {
      id: "x-02",
      title: "Sub-18ms Vector Retrieval with pgvector HNSW",
      draft: "Benchmark results from today: 100,000 embeddings with 1536 dims on pgvector.\n\nWith HNSW M=16 and ef_construction=64, average query latency dropped to 18ms with 99.2% recall accuracy.\n\nYou probably don't need a standalone managed vector DB for your agent memory.",
      category: "Ideas & Insights",
      status: "Draft",
      platform: "X",
      projectId: "proj-lumen",
      publishedUrl: "",
      metrics: {
        impressions: 0,
        likes: 0,
        reposts: 0,
        isManual: true,
        verificationNote: "Drafting code snippet screenshot"
      }
    },
    {
      id: "x-03",
      title: "The 23-Year-Old Founder Cadence: Physical Anchor + 1 Flagship",
      draft: "The easiest trap in your twenties is pursuing 7 projects simultaneously with mediocre velocity.\n\nThe real unlock: One flagship project (Orbit). One supporting physical routine (4x gym + daily run). Everything else ruthlessly backlogged.",
      category: "Personal Journey",
      status: "Idea",
      platform: "X",
      projectId: "proj-orbit",
      publishedUrl: "",
      metrics: {
        impressions: 0,
        likes: 0,
        reposts: 0,
        isManual: true,
        verificationNote: "Outline in notes"
      }
    },
    {
      id: "x-04",
      title: "Architectural Teardown: Autonomous Multi-Agent Telemetry DAGs",
      draft: "Published breakdown on how AgentTrace tracks multi-step tool calling cycles and detects infinite reasoning loops before they burn API credits.",
      category: "Building in Public",
      status: "Published",
      platform: "X",
      projectId: "proj-agenttrace",
      publishedUrl: "https://x.com/whatboldoceanisdoing/status/1791000",
      metrics: {
        impressions: 1420,
        likes: 86,
        reposts: 14,
        isManual: true,
        verificationNote: "Manually entered from X Analytics dashboard"
      }
    }
  ],

  career: {
    currentRole: "CMO & Growth Lead at Orbit",
    responsibilities: [
      "Leading outbound GTM strategy and direct founder acquisition loops.",
      "Optimizing merchant checkout drop-off and conversion rate architecture.",
      "Partnering with marketing/tech agencies to deploy Orbit as their AI automation stack.",
      "Packaging traction deck and product metrics for YC W27 application."
    ],
    skillsToDevelop: [
      {
        name: "DevOps & Production Infrastructure",
        status: "IN_PROGRESS",
        progress: 45,
        details: "Linux cgroups, Docker containerization, CI/CD pipelines, Nginx/Caddy reverse proxies, zero-downtime deploys."
      },
      {
        name: "AI Internals & Agent Architecture",
        status: "IN_PROGRESS",
        progress: 60,
        details: "Attention mechanisms, local LLM quantization, tool/function calling graphs, evaluation benchmarks, pgvector."
      },
      {
        name: "High-Ticket B2B Sales & Consultative Closing",
        status: "IN_PROGRESS",
        progress: 50,
        details: "Founder-to-founder video teardowns, objection handling, agency retainer negotiations, value-based pricing."
      },
      {
        name: "Full-Stack TypeScript & Systems Design",
        status: "IN_PROGRESS",
        progress: 75,
        details: "Node/Bun runtimes, PostgreSQL schema design, Redis idempotency caching, responsive UI engineering."
      }
    ],
    incomeExperiments: [
      {
        id: "exp-orbit",
        name: "Orbit SaaS Revenue Share",
        status: "ACTIVE_FLAGSHIP",
        targetIncome: "$10,000 MRR Milestone",
        currentIncome: "$0 MRR (In Pilot Phase)",
        notes: "Long-term compounding equity and recurring subscription cashflow."
      },
      {
        id: "exp-agency",
        name: "Industry Plant Agency Retainers",
        status: "ACTIVE",
        targetIncome: "₹1,00,000 / month",
        currentIncome: "₹40,000 (October Runway Target)",
        notes: "High-signal technical marketing and distribution for select e-commerce and AI founders."
      },
      {
        id: "exp-devtool",
        name: "Independent AI Developer Telemetry SaaS",
        status: "RESEARCH",
        targetIncome: "$1,500 / month",
        currentIncome: "$0",
        notes: "Potential spin-out of AgentTrace tracing SDK into paid developer tier."
      }
    ],
    monthlyLedger: {
      month: "October 2026",
      targetNet: 40000,
      currency: "INR",
      verifiedCurrent: 0,
      notes: "Strict financial discipline: allocate surplus profits toward workstation hardware fund."
    }
  },

  weeklyReviews: [
    {
      id: "rev-2026-w41",
      weekStarting: "2026-10-12",
      answers: {
        shippedWork: "Delivered Orbit self-serve merchant onboarding flow; benchmarked pgvector HNSW indexing (18ms latency on 100k vectors).",
        deepLearnings: "Idempotency hashing in Redis is essential for e-commerce webhook ingestion; personalized video audits outperform cold emails 5x.",
        flagshipProgress: "Onboarded 2 pilot Shopify merchants on Orbit; refined value proposition around automated checkout order recovery.",
        physicalTraining: "Completed 4 workouts (Chest, Back, Legs, Run & Mobility); hit 26kg DBs on incline press with clean form.",
        mostValue: "Creating personalized Loom video audits for store owners rather than mass cold pitching.",
        wastedTime: "Spending too much time tweaking CSS styling details on secondary side projects instead of outbound outreach.",
        avoided: "Direct telephone follow-ups with cold e-commerce leads.",
        obstacle: "Finding qualified D2C stores doing over $20k/mo GMV who are actively feeling checkout drop-off pain.",
        nextWeekOutcome: "Deliver 20 personalized video checkout teardowns and convert first 3 paid pilot accounts for Orbit.",
        stopDoing: "Stop checking social analytics midday; confine social activity to evening review blocks."
      },
      generatedSummary: "High technical and physical momentum achieved this week with 4 logged workouts and benchmarked pgvector indexing. Flagship focus on Orbit must remain 100% outbound-oriented: double down on custom Loom video audits and eliminate distraction on secondary tools.",
      isFinalized: true
    }
  ],

  strategicCycles: [
    {
      id: "cycle-q4-2026",
      name: "Q4 2026 Strategic Cycle: Orbit Traction & Personal Foundation",
      isCurrent: true,
      startDate: "2026-10-01",
      endDate: "2026-12-31",
      theme: "FOUNDATION, CASHFLOW & FLAGSHIP CONVICTION",
      primaryOutcome: "Scale Orbit from $0 to $10,000 MRR through validated merchant acquisition loops and YC W27 submission.",
      supportingOutcomes: [
        "Maintain 4x/week physical training and build toward a lean, athletic 75 kg frame.",
        "Deepen applied mastery of DevOps, AI agent runtimes, and high-ticket B2B sales."
      ],
      hierarchy: [
        {
          label: "TARGET",
          description: "Validate customer demand and achieve commercial product-market fit for Orbit.",
          example: "Prove merchants will pay recurring subscriptions for conversational order recovery."
        },
        {
          label: "ACTIVITY",
          description: "Conduct daily high-signal founder outreach and diagnostic store audits.",
          example: "Record and deliver tailored Loom video checkout audits to 100 Shopify/WooCommerce store owners."
        },
        {
          label: "OUTPUT",
          description: "Complete 100 video audits, onboard 20 pilot stores, submit YC W27 application.",
          example: "20 active merchant dashboards running Orbit live on store checkout."
        },
        {
          label: "OUTCOME",
          description: "Convert 10+ paid recurring merchants generating sustainable monthly revenue.",
          example: "$10,000 MRR contracted run-rate with high net merchant retention."
        }
      ],
      successCriteria: [
        { id: "sc-1", type: "outcome", text: "10+ active paid Shopify/WooCommerce merchants generating recurring revenue on Orbit", completed: false },
        { id: "sc-2", type: "output", text: "50 personalized video checkout teardowns delivered to qualified brand operators", completed: false },
        { id: "sc-3", type: "target", text: "Reach ₹1,00,000/mo personal net cashflow via agency retainers and Orbit", completed: false },
        { id: "sc-4", type: "activity", text: "4 structured gym workouts logged per week with progressive overload tracking", completed: true },
        { id: "sc-5", type: "output", text: "Package and submit both Orbit and AgentTrace into Y Combinator W27", completed: false }
      ],
      constraints: [
        "Strict focus on 1 flagship (Orbit); zero time allocated to launching unvetted secondary products during core work blocks.",
        "All study and learning notes must directly connect to active project implementation."
      ],
      risks: [
        "Diffusion of attention across too many interesting side pursuits instead of relentless sales outbound.",
        "Under-recovering physically from training or neglecting sleep leading to midday cognitive fog."
      ],
      cycleReview: null
    }
  ],

  settings: {
    northStar: "Building enduring independence through technical competence, AI software leverage, rigorous thinking, and uncompromising physical capability.",
    flagshipProjectId: "proj-orbit",
    preferredUnits: {
      weight: "kg",
      height: "cm",
      currency: "INR"
    },
    theme: "auto",
    trackingFields: {
      trackSleep: true,
      trackProtein: true,
      trackRecovery: true,
      trackWalking: true
    }
  },

  get dailyLogs() {
    return this.intellectualNotes.map(n => ({
      id: n.id,
      date: n.date,
      title: n.concept,
      learned: n.explanation,
      tags: n.tags
    }));
  },

  octoberTargets: [
    {
      id: "target-oct-01",
      code: "SPEC // ORB-MKT",
      theme: "folder-manila",
      tabPos: 1,
      tabTitle: "[01] ORBIT // 500 USERS",
      title: "Orbit Marketing & Adoption: 500+ Users, 30+ Paid & YC W27",
      category: "PRODUCT GROWTH & REVENUE",
      targetValue: 500,
      currentValue: 0,
      unit: "Users",
      status: "IN SPRINT (0%)",
      deadline: "2026-10-31",
      notes: "Scale Orbit to 500+ users, 30+ paying customers, 2 agency AI deployments, and submit into YC W27 batch.",
      mission: "Execute structured October marketing sprint for Orbit: drive direct founder-to-founder outreach, convert 30+ paying subscribers, partner with 2 agencies deploying Orbit as their core AI engine, and prepare & submit Orbit into Y Combinator W27.",
      milestones: [
        { id: "m-orb-1", group: "ACQUISITION", text: "Acquire 500+ registered users on Orbit through targeted founder marketing and teardowns", completed: false },
        { id: "m-orb-2", group: "REVENUE", text: "Convert 30+ active paying subscribers on Orbit's core recurring tier", completed: false },
        { id: "m-orb-3", group: "ENTERPRISE", text: "Onboard 2 partner agencies deploying Orbit as their primary AI operational engine", completed: false },
        { id: "m-orb-4", group: "YC W27", text: "Package traction deck, demo metrics, and submit Orbit to Y Combinator W27", completed: false }
      ],
      tactileMemo: "Orbit marketing converts fastest when agencies see automated client workflows and merchants see checkout order recovery.",
      techDetails: {
        focus: "500+ Users, 30+ Paid, 2 Agency Deployments, YC W27 Submission",
        metrics: "Target: 500 Users • 30 Paid Subscribers • 2 Agencies • YC W27 (Current: 0%)",
        deliverable: "Onboarded users, paid subscription revenue & submitted YC W27 application"
      }
    },
    {
      id: "target-oct-02",
      code: "SPEC // TRACE-DIST",
      theme: "folder-sage",
      tabPos: 2,
      tabTitle: "[02] AGENTTRACE & DISTRIBUTION",
      title: "AgentTrace Launch & Organic Distribution (X, Reddit & YC W27)",
      category: "VENTURES & AUDIENCE",
      targetValue: 150,
      currentValue: 0,
      unit: "Waitlist",
      status: "IN SPRINT (0%)",
      deadline: "2026-10-31",
      notes: "Submit both Orbit and AgentTrace in YC W27; launch full marketing, scale X to 300+ followers, waitlist to 150+ users, and crack Reddit to 200+ karma.",
      mission: "Deliver end-to-end launch and organic distribution for AgentTrace: package interactive trace telemetry demos, grow newly launched X presence to 300+ technical followers, build developer waitlist to 150+ engineers, crack the developer Reddit code to 200+ karma, and submit both Orbit and AgentTrace into Y Combinator W27.",
      milestones: [
        { id: "m-tr-1", group: "YC W27", text: "Submit both Orbit and AgentTrace into Y Combinator W27 batch", completed: false },
        { id: "m-tr-2", group: "MARKETING", text: "Launch full marketing sprint: live trace replays, architecture breakdowns & telemetry benchmarks", completed: false },
        { id: "m-tr-3", group: "X AUDIENCE", text: "Grow new X (Twitter) profile from 0 to 300+ high-signal technical followers", completed: false },
        { id: "m-tr-4", group: "WAITLIST", text: "Scale AgentTrace waitlist from 0 to 150+ verified AI developers and builders", completed: false },
        { id: "m-tr-5", group: "REDDIT CODE", text: "Crack developer Reddit distribution: publish deep technical breakdowns & reach 0 to 200+ karma", completed: false }
      ],
      tactileMemo: "Submitting both Orbit and AgentTrace into YC W27 gives two strong shots on goal. High-signal technical distribution fills the waitlist.",
      techDetails: {
        focus: "YC W27 Submissions, Agent Observability, 300+ X Followers, 150+ Waitlist, 200+ Reddit Karma",
        metrics: "Target: YC W27 Submitted • 300+ X Followers • 150+ Waitlist • 200+ Karma (Current: 0%)",
        deliverable: "Live AgentTrace demo, developer waitlist ledger & YC W27 applications"
      }
    },
    {
      id: "target-oct-03",
      code: "SPEC // FIN-40K",
      theme: "folder-lavender",
      tabPos: 3,
      tabTitle: "[03] ₹40K PERSONAL INCOME",
      title: "Personal Cashflow & Financial Discipline (₹40,000 Milestone)",
      category: "FINANCES & CAPITAL",
      targetValue: 40000,
      currentValue: 0,
      unit: "INR Cashflow",
      status: "IN SPRINT (0%)",
      deadline: "2026-10-31",
      notes: "Generate ₹40,000 personal net profit this month through focused client, agency, and distribution output.",
      mission: "Execute focused commercial discipline to secure personal runway: convert inbound interest and client projects into generating ₹40,000 personal net income this month, maintaining a zero-waste operating budget and preparing funds for future workstation hardware upgrades.",
      milestones: [
        { id: "m-rd-1", group: "CASHFLOW", text: "Generate and secure ₹40,000 personal net income for October personal runway", completed: false },
        { id: "m-rd-2", group: "PIPELINE", text: "Establish repeatable client execution pipeline and service delivery offerings", completed: false },
        { id: "m-rd-3", group: "LEDGER", text: "Maintain daily income & expenditure ledger with strict financial discipline", completed: false },
        { id: "m-rd-4", group: "RESERVE", text: "Allocate surplus profits toward personal workstation hardware fund (phone & laptop)", completed: false }
      ],
      tactileMemo: "Financial discipline buys mental clarity. Lock in ₹40,000 personal profit first to secure budget runway.",
      techDetails: {
        focus: "Personal Income Generation, High-Ticket Retainers, Financial Runway",
        metrics: "Target: ₹40,000 Personal Income Target (Current: ₹0 / 0%)",
        deliverable: "Verified ₹40,000 bank cashflow & balanced personal ledger"
      }
    },
    {
      id: "target-oct-04",
      code: "SPEC // SELF-FLOW",
      theme: "folder-ochre",
      tabPos: 4,
      tabTitle: "[04] RUN, STRETCH & FLOW",
      title: "Biological OS: Daily Running, Stretching, Flow State & Schedule",
      category: "BODY & MIND PROTOCOL",
      targetValue: 31,
      currentValue: 0,
      unit: "Days Logged",
      status: "IN SPRINT (0%)",
      deadline: "2026-10-31",
      notes: "Run and stretch daily, unlock deep flow state, master new schedule, and step into the calmer, sharper, better version of me.",
      mission: "Implement a non-negotiable physical and mental protocol: daily running and mobility stretching, entering effortless deep flow states during execution blocks, adopting a strict new schedule and rhythm, and evolving into a calmer, more observant, disciplined version of myself.",
      milestones: [
        { id: "m-sf-1", group: "CARDIO", text: "Run on a strict daily basis for cardiovascular stamina and peak mental energy", completed: false },
        { id: "m-sf-2", group: "MOBILITY", text: "Daily full-body mobility stretching for flexibility, posture, and nervous system calm", completed: false },
        { id: "m-sf-3", group: "FLOW STATE", text: "Enter consistent deep flow states for high-velocity coding, writing, and deep work", completed: false },
        { id: "m-sf-4", group: "NEW SCHEDULE", text: "Lock in new schedule: disciplined morning wake-up, uninterrupted deep blocks & evening reset", completed: false },
        { id: "m-sf-5", group: "BETTER ME", text: "Embody the elevated version of self: calm, observant, deductive analysis, better attitude", completed: false }
      ],
      tactileMemo: "The run calibrates the lungs; the stretch calms the nervous system. A disciplined schedule makes flow states repeatable.",
      techDetails: {
        focus: "Daily Running, Mobility Stretching, Flow States, Daily Routine",
        metrics: "Target: 31/31 Days Running & Stretching • 4+ Hours Daily Flow State (Current: 0%)",
        deliverable: "Daily workout log, disciplined calendar blocks & transformed personal presence"
      }
    },
    {
      id: "target-oct-05",
      code: "SPEC // CRAFT-READ",
      theme: "folder-slate",
      tabPos: 5,
      tabTitle: "[05] SCRIPT & 3 BOOKS",
      title: "Intellectual Horizon & Craft: Movie Script & Read 3 Books",
      category: "INTELLECT & CREATIVITY",
      targetValue: 3,
      currentValue: 0,
      unit: "Books Read",
      status: "IN SPRINT (0%)",
      deadline: "2026-10-31",
      notes: "Work on the movie screenplay, read 3 books, and absorb broader sets of knowledge that spark deep interest.",
      mission: "Expand intellectual range and creative execution: advance the feature movie screenplay through daily writing sprints, read and extract mental models from 3 high-impact books, enter creative flow state, and immerse in a broader horizon of multidisciplinary knowledge (systems, cinema, human psychology, and technology).",
      milestones: [
        { id: "m-cr-1", group: "SCREENPLAY", text: "Work consistently on movie script: outline scenes, character dialogue, and advance screenplay pages", completed: false },
        { id: "m-cr-2", group: "BOOK 01", text: "Read Book 01: Deep dive on systems thinking and foundational mental models", completed: false },
        { id: "m-cr-3", group: "BOOK 02", text: "Read Book 02: Narrative structure, cinematic worldbuilding, and character psychology", completed: false },
        { id: "m-cr-4", group: "BOOK 03", text: "Read Book 03: Polymath knowledge, philosophy, and strategic compounding", completed: false },
        { id: "m-cr-5", group: "KNOWLEDGE", text: "Absorb broader set of interdisciplinary knowledge that sparks deep interest & synthesize notes", completed: false }
      ],
      tactileMemo: "Screenwriting tests storytelling architecture; books provide the mental ammunition. Constant curiosity keeps the mind sharp.",
      techDetails: {
        focus: "Movie Screenplay Development, 3 Books Read, Polymath Knowledge",
        metrics: "Target: Active Screenplay Sprints • 3 Completed Books • Written Synthesis (Current: 0%)",
        deliverable: "Screenplay draft pages, 3 book executive summaries & knowledge journal"
      }
    }
  ],

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
      headline: "Independent SaaS & Creative Genesis",
      focus: "Scale own flagship SaaS to min. $15,000/mo, retire parents, release debut mixtape and 1st short film, expand to San Francisco & international travels, and launch a 2nd profitable venture.",
      progress: 0,
      milestones: [
        { text: "Scale own flagship SaaS to min. $15,000/month profit with strong retention", done: false },
        { text: "Retire parents & secure lifelong family financial peace", done: false },
        { text: "Release debut music mixtape with signature sound and creative autonomy", done: false },
        { text: "Direct and release 1st cinematic short film", done: false },
        { text: "Travel internationally (San Francisco tech ecosystem and global creative hubs)", done: false },
        { text: "Launch 2nd software project/venture and scale it to strong independent profit", done: false },
        { text: "Deploy functional second-brain AI memory system into personal daily use", done: false }
      ]
    },
    {
      year: "2028",
      headline: "The $1M/Month Horizon & Cinematic Craft",
      focus: "Scale venture and personal income to $1 Million/month, master financial markets & trading, release 2nd music project & 2 short films, enroll in international filmmaking school abroad, and compound polymathic knowledge.",
      progress: 0,
      milestones: [
        { text: "Scale income run-rate to $1 Million/month ($1M/mo)", done: false },
        { text: "Master financial markets, macroeconomic trading, and capital allocation", done: false },
        { text: "Enroll in and complete professional filmmaking course outside India", done: false },
        { text: "Direct and release 2 new cinematic short films", done: false },
        { text: "Release second music project / EP with elevated multidisciplinary production", done: false },
        { text: "Attain deeper polymathic knowledge better than ever across AI, cinema, and systems", done: false },
        { text: "Expand global travels, cultural exploration, and international founder networks", done: false }
      ]
    },
    {
      year: "2029",
      headline: "The Feature Film & $20M Liquid Sovereign",
      focus: "Direct and produce 1st full-length feature movie, 5–10x software venture leverage, accumulate min. $20 Million cash liquid reserve, and achieve total cross-sector sovereignty.",
      progress: 0,
      milestones: [
        { text: "Work on and produce 1st full-length feature movie", done: false },
        { text: "5–10x software engineering leverage and automated venture ecosystems", done: false },
        { text: "Accumulate min. $20 Million cash liquid capital reserves", done: false },
        { text: "Master high-level knowledge across all core and adjacent tech & creative sectors", done: false },
        { text: "Compound independent product revenue and back exceptional early-stage builders", done: false }
      ]
    },
    {
      year: "2030-2031",
      headline: "Enduring Sovereignty & Infinite Side Quests",
      focus: "Execute high-conviction side quests across art, technology, and philosophy; lifelong creative freedom and sovereign multi-decade compounding.",
      progress: 0,
      milestones: [
        { text: "Undertake ambitious global side quests across creative, technical, and adventurous domains", done: false },
        { text: "Build systems, creative franchises, and ventures that compound independently", done: false },
        { text: "Master Japanese language and explore deep international residencies", done: false },
        { text: "Operate with complete economic, creative, and temporal sovereignty", done: false }
      ]
    }
  ],

  q4Goals: [
    { id: "q4-01", category: "VENTURES", text: "Submit AgentTrace project to Y Combinator (YC)", completed: false },
    { id: "q4-02", category: "REVENUE", text: "Orbit marketing done right: systematically scale from $0 to $10,000 MRR", completed: false },
    { id: "q4-03", category: "SOFTWARE", text: "Complete 3 landmark projects: AgentTrace, Lumen, and Jarvis", completed: false },
    { id: "q4-04", category: "LANGUAGE", text: "Start learning another language (daily grammar, vocabulary & listening drills)", completed: false },
    { id: "q4-05", category: "FINANCES", text: "Earn min. ₹1,00,000/- net profit per month personally", completed: false },
    { id: "q4-06", category: "AGENCY", text: "Industry Plant Agency: manage personal budget now, expand capacity if things work well", completed: false },
    { id: "q4-07", category: "PHYSICAL", text: "Become a better version of myself: physically fit with daily exercises (running & mobility stretching)", completed: false },
    { id: "q4-08", category: "MINDSET", text: "Observational & deductive mindset: calm under pressure, observant, sharp at analyzing situations", completed: false },
    { id: "q4-09", category: "STYLE & IMAGE", text: "Elevate personal image: curate new wardrobe of clothes, updated style, confident presence", completed: false },
    { id: "q4-10", category: "CAPITAL", text: "Total personal earnings: ₹3,00,000/- INR minimum accumulated across Q4", completed: false },
    { id: "q4-11", category: "LIFE SKILL", text: "Learn to ride a bike with complete control, technical balance, and road confidence", completed: false },
    { id: "q4-12", category: "CINEMA", text: "Complete the full feature movie script from beat outline to final draft", completed: false },
    { id: "q4-13", category: "HARDWARE", text: "Buy a brand-new high-performance phone and laptop workstation from personal profits", completed: false },
    { id: "q4-14", category: "INTELLECT", text: "Absorb broader sets of multidisciplinary knowledge that spark deep interest (systems, cinema, science)", completed: false },
    { id: "q4-15", category: "CRAFT", text: "Learn and master cardistry tricks, sleight-of-hand card cuts, and tactile flourishes", completed: false },
    { id: "q4-16", category: "STUDY: DEVOPS", text: "Master DevOps & Production Infrastructure: Linux internals, Docker containerization, CI/CD pipelines, reverse proxies (Nginx/Caddy), zero-downtime deployments, and telemetry logging", completed: false },
    { id: "q4-17", category: "STUDY: AI BUILDING", text: "Master AI Internals & Agent Building: Transformer attention mechanisms, local LLM quantization, tool/function calling graphs, evals & prompt engineering, and deterministic state machines", completed: false },
    { id: "q4-18", category: "STUDY: SELLING & GTM", text: "Master High-Ticket Selling & Distribution: B2B consultative sales, cold outbound loops, objection handling, founder-to-founder demos, agency retainer closing, and value-based pricing", completed: false },
    { id: "q4-19", category: "STUDY: 3 SYSTEMS", text: "Deep Technical Mastery for 3 Projects: Agent observability & execution DAGs (AgentTrace), Hierarchical pgvector/HNSW & sub-18ms retrieval (Lumen), and autonomous tool-execution runtimes (Jarvis)", completed: false }
  ],

  get bucketList() {
    return this.q4Goals;
  },

  radarCurriculum: {
    tracks: [
      { id: "all", name: "All Synthesis", badge: "DA VINCI × MUSK × JANE × SCOFIELD × TESLA × ALTMAN" },
      { id: "first_principles", name: "Hard Tech & Physics", badge: "ELON MUSK & NIKOLA TESLA" },
      { id: "deduction_systems", name: "Deduction & Strategy", badge: "PATRICK JANE & MICHAEL SCOFIELD" },
      { id: "saas_venture", name: "SaaS Scale & YC", badge: "SAM ALTMAN & Y COMBINATOR" },
      { id: "cinema_story", name: "Cinema & Narrative", badge: "LEONARDO DA VINCI & VISUAL CINEMA" },
      { id: "ai_architectures", name: "AI Memory & Agents", badge: "AGENTTRACE & LUMEN ARCHITECTURE" },
      { id: "markets_capital", name: "Markets & Capital", badge: "MACRO TRADING & $20M LIQUID MOAT" }
    ],
    months: {
      "2026-10": {
        monthName: "October 2026",
        focusSummary: "Orbit $10k MRR • YC W27 Prep • Feature Screenplay • Observational Deduction & Flow",
        triads: [
          {
            trackId: "first_principles",
            trackName: "Hard Tech & Physics",
            archetype: "Elon Musk & Nikola Tesla",
            video: {
              title: "Elon Musk: The 5-Step Engineering Algorithm & First Principles Thinking",
              creator: "Everyday Astronaut / Starbase",
              duration: "24m",
              url: "https://www.youtube.com/watch?v=t705r8ICkRw",
              badge: "YouTube · 24m",
              takeaway: "Make requirements less dumb; delete parts or process steps; simplify or optimize; accelerate cycle time; automate."
            },
            article: {
              title: "Nikola Tesla's Colorado Springs Notes & High-Frequency Power Resonance",
              author: "Nikola Tesla Archive",
              readTime: "12m read",
              url: "https://teslacollection.com/",
              badge: "Archival · 12m",
              takeaway: "Master resonant frequency tuning; eliminate parasitic inductance; ground return impedance must approach zero."
            },
            book: {
              title: "Six Easy Pieces: Essentials of Physics Explained by Its Most Brilliant Teacher",
              author: "Richard P. Feynman",
              chapter: "Chapter 1: Atoms in Motion",
              pages: "pp. 1–22",
              badge: "Book · Ch. 01",
              takeaway: "All things are made of atoms — little particles that move around in perpetual motion, attracting each other when close, but repelling upon being squeezed together."
            }
          },
          {
            trackId: "deduction_systems",
            trackName: "Deduction & Strategy",
            archetype: "Patrick Jane & Michael Scofield",
            video: {
              title: "Patrick Jane: Cold Reading, Micro-Expressions & Situational Awareness Masterclass",
              creator: "Charisma on Command / Analysis",
              duration: "18m",
              url: "https://www.youtube.com/watch?v=kYJdJjY-LwM",
              badge: "YouTube · 18m",
              takeaway: "Notice baseline micro-tensions, vocal pitch fluctuations, and asymmetric shoulder posture before forming deductions."
            },
            article: {
              title: "The Architecture of Infiltration: Structural Analysis of Complex Closed Systems",
              author: "Systems Security & Blueprint Review",
              readTime: "15m read",
              url: "https://fs.blog/mental-models/",
              badge: "Essay · 15m",
              takeaway: "Break complex security structures into plumbing, HVAC, electrical grids, and personnel shift patterns."
            },
            book: {
              title: "Mastermind: How to Think Like Sherlock Holmes",
              author: "Maria Konnikova",
              chapter: "Chapter 2: The Brain Attic (What's in There and How It's Stored)",
              pages: "pp. 27–54",
              badge: "Book · Ch. 02",
              takeaway: "A mindful approach to perception: passive seeing is not active observing. System 2 deliberate reflection prevents cognitive biases."
            }
          },
          {
            trackId: "saas_venture",
            trackName: "SaaS Scale & YC",
            archetype: "Sam Altman & Y Combinator",
            video: {
              title: "Sam Altman: How to Succeed with a Startup & Build Compounding Monopolies",
              creator: "Stanford University / CS183B",
              duration: "48m",
              url: "https://www.youtube.com/watch?v=0lJKucu6HJc",
              badge: "YouTube · 48m",
              takeaway: "Build something 100 people love rather than 1,000,000 who kind of like it. High-velocity iteration beats elaborate business plans."
            },
            article: {
              title: "Do Things That Don't Scale: The Founder-Led Onboarding Playbook",
              author: "Paul Graham",
              readTime: "9m read",
              url: "https://paulgraham.com/ds.html",
              badge: "Essay · 9m",
              takeaway: "Manually recruit your initial 100 users. Build custom onboarding, sit next to them, and resolve bugs live in front of them."
            },
            book: {
              title: "Zero to One: Notes on Startups, or How to Build the Future",
              author: "Peter Thiel",
              chapter: "Chapter 5: The Last Mover Advantage",
              pages: "pp. 43–62",
              badge: "Book · Ch. 05",
              takeaway: "Proprietary technology must be at least 10x better than its closest substitute. Network effects, economies of scale, and branding create durability."
            }
          }
        ]
      }
    }
  }
};
