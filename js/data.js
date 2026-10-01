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
      tagline: "E-commerce growth & merchant intelligence platform",
      category: "GROWTH & PRODUCT",
      status: "ACTIVE — BUILDING",
      progress: 72,
      role: "CMO / Marketing & Growth",
      tech: ["GTM", "Product Positioning", "User Acquisition", "Content", "E-commerce Integration"],
      description: "Leading marketing, growth, and positioning for Orbit. Conducting user research, merchant journey testing, and driving user acquisition toward October targets.",
      link: "#",
      metrics: "Target: 500 Users — 5% Conversion Goal"
    },
    {
      id: "proj-lumen",
      title: "Lumen / Sheldon",
      tagline: "AI memory engine & personal second-brain architecture",
      category: "AI & RESEARCH",
      status: "ARCHITECTURE — PROTOTYPE",
      progress: 48,
      role: "Creator & Systems Architect",
      tech: ["AI Memory", "RAG", "PostgreSQL", "pgvector", "Supabase", "Prisma", "TypeScript"],
      description: "Researching and prototyping an AI memory system with hierarchical storage: raw journal streams, canonical memory, and abstract knowledge retrieval for autonomous agents.",
      link: "#",
      metrics: "Architecture Prototype Phase — Vector Retrieval Pipeline"
    }
  ],

  octoberTargets: [
    {
      id: "target-oct-01",
      code: "SPEC // ORB-01",
      theme: "folder-manila",
      tabPos: 1,
      tabTitle: "[01] ORBIT ACQUISITION",
      title: "Orbit User Acquisition & Merchant Scale",
      category: "ACQUISITION & GTM",
      targetValue: 500,
      currentValue: 240,
      unit: "users",
      status: "IN PROGRESS",
      deadline: "2026-10-31",
      notes: "Push toward the 500 active merchant store milestone through direct brand onboarding and ecosystem distribution.",
      mission: "Systematically scale Orbit's merchant base across Shopify and WooCommerce stores. Establish repeatable founder-to-founder distribution channels and high-converting acquisition loops in US & India.",
      milestones: [
        { id: "m-orb01-1", text: "Curate verified outreach ledger of 250 high-growth Shopify Plus store operators", completed: true },
        { id: "m-orb01-2", text: "Deploy self-serve merchant onboarding v2 with zero-friction store connection", completed: true },
        { id: "m-orb01-3", text: "Conduct 20 white-glove onboarding and retention interviews with store founders", completed: false },
        { id: "m-orb01-4", text: "Launch merchant referral flywheel offering analytics upgrades for store invites", completed: false }
      ],
      tactileMemo: "Direct merchant outreach via Twitter/X and LinkedIn is converting at ~24%. Focus on high-GMV apparel and D2C brands!",
      techDetails: {
        focus: "Storefront API, Automated Ingestion & Growth Loops",
        metrics: "500 Active Merchant Stores • < 2 min Store Connection",
        deliverable: "Automated merchant ingestion queue & live referral ledger"
      }
    },
    {
      id: "target-oct-02",
      code: "SPEC // ORB-02",
      theme: "folder-sage",
      tabPos: 2,
      tabTitle: "[02] CONVERSION FUNNEL",
      title: "Orbit Conversion Funnel & Retention Engine",
      category: "GROWTH & CRO",
      targetValue: 5.0,
      currentValue: 3.5,
      unit: "%",
      status: "OPTIMIZING",
      deadline: "2026-10-31",
      notes: "Targeting 5% visitor-to-active conversion via streamlined merchant setup and live demo sandbox.",
      mission: "Eliminate drop-off across the onboarding funnel. Ensure every merchant reaches their first 'aha moment' (discovering actionable checkout drop-off insights) within 90 seconds of connection.",
      milestones: [
        { id: "m-orb02-1", text: "Map PostHog funnel analytics across every step from landing to first report", completed: true },
        { id: "m-orb02-2", text: "Deploy interactive demo sandbox with sample store data on homepage", completed: true },
        { id: "m-orb02-3", text: "Automate daily intelligence digest via WhatsApp and email for store owners", completed: false },
        { id: "m-orb02-4", text: "A/B test pricing copy: 'Revenue Intelligence' vs 'Checkout Recovery'", completed: false }
      ],
      tactileMemo: "Interactive sandbox demo increased signup intent by 18% in early user tests. Make it the hero CTA!",
      techDetails: {
        focus: "PostHog Funnel Tracking & Instant Demo Sandbox",
        metrics: "5.0% Conversion Target (Current: 3.5%) • 45s Time-to-Value",
        deliverable: "High-converting 3-step onboarding flow with real-time feedback"
      }
    },
    {
      id: "target-oct-03",
      code: "SPEC // DIST-01",
      theme: "folder-lavender",
      tabPos: 3,
      tabTitle: "[03] X / DISTRIBUTION",
      title: "Technical Thought Leadership & Audience Growth",
      category: "DISTRIBUTION",
      targetValue: 500,
      currentValue: 260,
      unit: "followers",
      status: "ACTIVE",
      deadline: "2026-10-31",
      notes: "Scaling from 114 to 500+ builders; publishing breakdowns on AI memory, systems, and growth engineering.",
      mission: "Establish a high-signal technical presence around AI memory systems, distributed architecture, and startup growth. Attract ambitious founders, engineers, and collaborators.",
      milestones: [
        { id: "m-dist01-1", text: "Lock in consistent 4x weekly publishing schedule on engineering breakthroughs", completed: true },
        { id: "m-dist01-2", text: "Publish deep architectural breakdown on 3-tier second-brain AI memory engines", completed: true },
        { id: "m-dist01-3", text: "Release open-source interactive canvas playground for ecommerce journey modeling", completed: false },
        { id: "m-dist01-4", text: "Host technical discussion on agent memory indexing and retrieval benchmarks", completed: false }
      ],
      tactileMemo: "Audience grows fastest when sharing exact schema models, benchmarks, and production edge cases. Authenticity wins.",
      techDetails: {
        focus: "Long-form Systems Essays & Interactive Architecture Diagrams",
        metrics: "500 Engaged Technical Followers • 20+ Reposts per Deep Thread",
        deliverable: "4 High-signal architectural essays with custom blueprint visuals"
      }
    },
    {
      id: "target-oct-04",
      code: "SPEC // QA-01",
      theme: "folder-ochre",
      tabPos: 4,
      tabTitle: "[04] MERCHANT QA",
      title: "Orbit Real-Time Webhooks & Multi-Currency Engine QA",
      category: "PRODUCT QA",
      targetValue: 100,
      currentValue: 85,
      unit: "%",
      status: "TESTING",
      deadline: "2026-10-25",
      notes: "Verify zero discrepancy in order totals, discount code apportioning, and high-frequency webhook sync.",
      mission: "Guarantee rock-solid data integrity between merchant ecommerce stores and Orbit's analytics pipeline. Handle high-volume sales events with zero dropped webhooks or calculation discrepancies.",
      milestones: [
        { id: "m-qa01-1", text: "Build automated test suite for multi-currency currency conversions and tax rates", completed: true },
        { id: "m-qa01-2", text: "Audit complex discount edge cases (stacked coupon codes and tiered cart thresholds)", completed: true },
        { id: "m-qa01-3", text: "Implement idempotency key tracking to eliminate duplicate webhook ingestion", completed: true },
        { id: "m-qa01-4", text: "Run 48-hour continuous stress test simulating 500 concurrent order events", completed: false }
      ],
      tactileMemo: "Idempotency ledger completely eliminated duplicate order records during webhook retries. 0 error rate!",
      techDetails: {
        focus: "Webhook Replay Harness & Discrepancy Auditor",
        metrics: "100% Test Suite Coverage • 0 Discrepancy Tolerance",
        deliverable: "Automated regression runner for merchant cart & order sync"
      }
    },
    {
      id: "target-oct-05",
      code: "SPEC // LUM-01",
      theme: "folder-slate",
      tabPos: 5,
      tabTitle: "[05] LUMEN AI SPEC",
      title: "Lumen AI Memory Prototype & TypeScript SDK",
      category: "AI & SYSTEMS",
      targetValue: 100,
      currentValue: 60,
      unit: "%",
      status: "PROTOTYPING",
      deadline: "2026-10-31",
      notes: "Deploy functional prototype of 3-tier memory engine with sub-30ms vector recall for personal agent use.",
      mission: "Build and benchmark the working prototype of Lumen (Sheldon): an autonomous second-brain memory engine that combines episodic chronological streams, canonical profile synthesis, and HNSW vector search.",
      milestones: [
        { id: "m-lum01-1", text: "Formalize 3-tier memory schema in PostgreSQL with pgvector extension", completed: true },
        { id: "m-lum01-2", text: "Benchmark HNSW indexing: achieved 18ms latency with 99.2% recall on 100k vectors", completed: true },
        { id: "m-lum01-3", text: "Prototype consolidation worker that extracts recurring beliefs and preferences", completed: true },
        { id: "m-lum01-4", text: "Publish TypeScript SDK and interactive browser visualizer for memory graphs", completed: false }
      ],
      tactileMemo: "HNSW index gives ~18ms lookup at 99% recall vs IVFFlat's 34ms! Perfect for real-time conversation agents.",
      techDetails: {
        focus: "Hierarchical RAG, PostgreSQL / pgvector, TypeScript SDK",
        metrics: "Sub-30ms Vector Retrieval • 3-Tier Storage Hierarchy",
        deliverable: "Functional memory prototype + interactive memory playground"
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
      focus: "Scale Orbit to initial customer milestone, prototype Lumen AI memory architecture, and establish deep software foundations.",
      progress: 60,
      milestones: [
        { text: "Reach 300–500 active Orbit users with 5% conversion", done: false },
        { text: "Grow X presence from 114 to 1,000+ builders", done: false },
        { text: "Complete core architecture prototype for Lumen memory engine", done: false },
        { text: "Establish consistent 6–8h daily deep work and study cadence", done: true }
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
    { id: "bl-01", category: "COMPANY", text: "Build a bootstrapped or backed technology company to sustainable profitability", completed: false },
    { id: "bl-02", category: "PRODUCT", text: "Ship an AI product or developer infrastructure used by over 100,000 people", completed: false },
    { id: "bl-03", category: "MASTERY", text: "Become a recognized polymath across AI, software engineering, marketing, and business", completed: false },
    { id: "bl-04", category: "LANGUAGE", text: "Master Japanese and spend 3+ months living and building in Tokyo", completed: false },
    { id: "bl-05", category: "INTELLECT", text: "Publish a landmark book or essay collection on AI memory, systems, and cognition", completed: false },
    { id: "bl-06", category: "STAGE", text: "Deliver a high-impact keynote or talk on product growth and AI architecture", completed: false },
    { id: "bl-07", category: "SOVEREIGNTY", text: "Achieve 100% time, location, and financial sovereignty", completed: false },
    { id: "bl-08", category: "MENTORSHIP", text: "Fund and mentor 10 promising early-career builders on ambitious projects", completed: false }
  ],

  dailyLogs: [
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
