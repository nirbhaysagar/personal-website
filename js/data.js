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
      code: "SPEC // ORB-MKT",
      theme: "folder-manila",
      tabPos: 1,
      tabTitle: "[01] ORBIT // 500 USERS",
      title: "Orbit Marketing: 500+ Users, 30+ Paid & 2 Agency Deployments",
      category: "PRODUCT GROWTH & MRR",
      targetValue: 500,
      currentValue: 165,
      unit: "Users",
      status: "ACTIVE SPRINT",
      deadline: "2026-10-31",
      notes: "Acquire 500+ total users, convert 30+ paid customers, sign 2 agencies using Orbit as core AI stack, and submit to YC W27.",
      mission: "Execute structured October marketing sprint for Orbit: scale from current traction to 500+ registered users, convert 30+ paying customers, partner with 2 agencies adopting Orbit as their core AI engine, and prepare & submit Orbit for Y Combinator W27.",
      milestones: [
        { id: "m-orb-1", text: "Acquire 500+ total users on Orbit via targeted founder marketing and viral teardowns", completed: false },
        { id: "m-orb-2", text: "Convert 30+ active paying subscribers on Orbit's core recurring tier", completed: false },
        { id: "m-orb-3", text: "Close 2 agency partners deploying Orbit as their primary AI operational stack", completed: false },
        { id: "m-orb-4", text: "Package traction deck, metrics, and submit Orbit into Y Combinator W27 batch", completed: false }
      ],
      tactileMemo: "Orbit marketing converts fastest when agencies see automated client workflows and merchants see checkout drop-off recovery.",
      techDetails: {
        focus: "500+ Users, 30+ Paid, 2 Agency Deployments, YC W27 Submission",
        metrics: "500 Total Users • 30 Paid Subscribers • 2 Agencies • YC W27",
        deliverable: "Onboarded users, paid subscription revenue & submitted YC W27 application"
      }
    },
    {
      id: "target-oct-02",
      code: "SPEC // TRACE-YC27",
      theme: "folder-sage",
      tabPos: 2,
      tabTitle: "[02] AGENTTRACE & YC W27",
      title: "AgentTrace Launch, Audience (300+ X / 150+ Waitlist) & YC W27",
      category: "SOFTWARE & VENTURES",
      targetValue: 150,
      currentValue: 52,
      unit: "Waitlist",
      status: "ACTIVE SPRINT",
      deadline: "2026-10-31",
      notes: "Submit both Orbit and AgentTrace in YC W27; full marketing push, X reach 0 → 300+ followers, waitlist 0 → 150+ users.",
      mission: "Execute full marketing sprint for AgentTrace: build technical architecture teardowns, grow newly launched X presence from 0 to 300+ followers, scale waitlist from 0 to 150+ developer users, and submit both Orbit and AgentTrace into Y Combinator W27.",
      milestones: [
        { id: "m-tr-1", text: "Submit both Orbit and AgentTrace into Y Combinator W27 batch", completed: false },
        { id: "m-tr-2", text: "Launch full marketing sprint: live trace replays, architecture breakdowns & telemetry benchmarks", completed: false },
        { id: "m-tr-3", text: "Scale new X (Twitter) profile from 0 to 300+ high-signal technical followers", completed: false },
        { id: "m-tr-4", text: "Build AgentTrace waitlist from 0 to 150+ verified AI developers and builders", completed: false }
      ],
      tactileMemo: "Submitting both Orbit and AgentTrace into YC W27 gives two strong shots on goal. High-signal X distribution fills the waitlist.",
      techDetails: {
        focus: "YC W27 Submissions, Agent Observability, 300+ X Followers, 150+ Waitlist",
        metrics: "YC W27 Submitted • 300+ X Followers • 150+ Waitlist Signups",
        deliverable: "Live AgentTrace demo, waitlist ledger & YC W27 applications"
      }
    },
    {
      id: "target-oct-03",
      code: "SPEC // REDDIT-40K",
      theme: "folder-lavender",
      tabPos: 3,
      tabTitle: "[03] REDDIT // ₹40K EARN",
      title: "Crack Reddit Code (200+ Karma) & Earn ₹40,000 Personally",
      category: "DISTRIBUTION & CAPITAL",
      targetValue: 40000,
      currentValue: 14000,
      unit: "INR Cashflow",
      status: "ACTIVE SPRINT",
      deadline: "2026-10-31",
      notes: "Crack the Reddit code (0 → 200+ karma) and earn ₹40,000 personal net income this October.",
      mission: "Master high-signal Reddit distribution: crack the developer community code to grow from 0 to 200+ karma through authentic, insightful engineering writeups; translate distribution and freelance/agency output into earning ₹40,000 personally this month.",
      milestones: [
        { id: "m-rd-1", text: "Crack the Reddit code: publish deep teardowns and high-value discussions in developer subreddits", completed: false },
        { id: "m-rd-2", text: "Grow Reddit account organically from 0 to 200+ karma with positive community sentiment", completed: false },
        { id: "m-rd-3", text: "Generate and secure ₹40,000 personal net income for October personal cashflow", completed: false },
        { id: "m-rd-4", text: "Funnel Reddit engagement into AgentTrace waitlist and agency lead pipelines", completed: false }
      ],
      tactileMemo: "Reddit punishes marketing spam but rewards raw transparency and deep technical dissection. Provide authentic value to gain 200+ karma.",
      techDetails: {
        focus: "Reddit Growth, Organic Distribution, ₹40k October Personal Income",
        metrics: "200+ Karma • ₹40,000 Personal Income Target • 0% Promo Spam",
        deliverable: "Active Reddit contributor profile & verified ₹40,000 bank cashflow"
      }
    },
    {
      id: "target-oct-04",
      code: "SPEC // SELF-FLOW",
      theme: "folder-ochre",
      tabPos: 4,
      tabTitle: "[04] DAILY RUN & FLOW",
      title: "Personal Transformation: Daily Running, Stretching, Flow State & New Schedule",
      category: "BODY & MIND PROTOCOL",
      targetValue: 31,
      currentValue: 4,
      unit: "Days Logged",
      status: "ACTIVE (DAY 04)",
      deadline: "2026-10-31",
      notes: "Run and stretch daily, unlock deep flow state, master new schedule, and become a sharper, calmer version of myself.",
      mission: "Implement a non-negotiable physical and mental protocol: daily running and mobility stretching, entering effortless deep flow states during execution blocks, adopting a strict new schedule and rhythm, and evolving into a calmer, more observant, disciplined version of myself.",
      milestones: [
        { id: "m-sf-1", text: "Run and stretch on a strict daily basis for cardiovascular stamina and full-body flexibility", completed: true },
        { id: "m-sf-2", text: "Lock in new schedule: strict morning wake-up, uninterrupted deep work blocks, and evening reset", completed: true },
        { id: "m-sf-3", text: "Enter consistent daily flow states for high-velocity coding, writing, and strategic thinking", completed: false },
        { id: "m-sf-4", text: "Embody the elevated version of self: calm under pressure, observant, sharp deduction, better attitude", completed: false }
      ],
      tactileMemo: "The run calibrates the lungs; the stretch calms the nervous system. A disciplined schedule makes flow states predictable and repeatable.",
      techDetails: {
        focus: "Daily Running, Mobility Stretching, Flow States, Daily Routine",
        metrics: "31/31 Days Running & Stretching • 4+ Hours Daily Flow State",
        deliverable: "Daily workout log, disciplined calendar blocks & transformed personal presence"
      }
    },
    {
      id: "target-oct-05",
      code: "SPEC // CRAFT-READ",
      theme: "folder-slate",
      tabPos: 5,
      tabTitle: "[05] SCRIPT & 3 BOOKS",
      title: "Creative Craft & Knowledge Expansion: Movie Script & Read 3 Books",
      category: "INTELLECT & CREATIVITY",
      targetValue: 3,
      currentValue: 1,
      unit: "Books Read",
      status: "ACTIVE SPRINT",
      deadline: "2026-10-31",
      notes: "Work on the movie screenplay, read 3 books, and absorb broader sets of knowledge that spark deep interest.",
      mission: "Expand intellectual range and creative execution: advance the feature movie screenplay through daily writing sprints, read and extract mental models from 3 high-impact books, and immerse in a broader horizon of multidisciplinary knowledge (systems, cinema, human psychology, and technology).",
      milestones: [
        { id: "m-cr-1", text: "Work consistently on movie script: outline scenes, character dialogue, and advance screenplay pages", completed: false },
        { id: "m-cr-2", text: "Read Book 01: Deep dive on systems thinking and foundational mental models", completed: true },
        { id: "m-cr-3", text: "Read Book 02: Narrative structure, cinematic worldbuilding, and character psychology", completed: false },
        { id: "m-cr-4", text: "Read Book 03 & synthesize cross-disciplinary notes into broader personal knowledge bank", completed: false }
      ],
      tactileMemo: "Screenwriting tests storytelling architecture; books provide the mental ammunition. Constant curiosity keeps the mind sharp.",
      techDetails: {
        focus: "Movie Screenplay Development, 3 Books Read, Polymath Knowledge",
        metrics: "Active Screenplay Sprints • 3 Completed Books • Written Synthesis",
        deliverable: "Screenplay draft pages, 3 book executive summaries & knowledge journal"
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
    { id: "q4-15", category: "CRAFT", text: "Learn and master cardistry tricks, sleight-of-hand card cuts, and tactile flourishes", completed: false }
  ],
  get bucketList() {
    return this.q4Goals;
  },

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
