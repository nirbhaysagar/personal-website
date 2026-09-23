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
      details: "Focusing daily execution on Orbit's September growth push (GTM, content, product validation, e-commerce positioning), while studying systems engineering and AI memory models.",
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
      progress: 65,
      role: "CMO / Marketing & Growth",
      tech: ["GTM", "Product Positioning", "User Acquisition", "Content", "E-commerce Integration"],
      description: "Leading marketing, growth, and positioning for Orbit. Conducting user research, merchant journey testing, and driving user acquisition toward September targets.",
      link: "#",
      metrics: "Target: 300–500 Users — 5% Conversion Goal"
    },
    {
      id: "proj-lumen",
      title: "Lumen / Sheldon",
      tagline: "AI memory engine & personal second-brain architecture",
      category: "AI & RESEARCH",
      status: "ARCHITECTURE — PROTOTYPE",
      progress: 35,
      role: "Creator & Systems Architect",
      tech: ["AI Memory", "RAG", "PostgreSQL", "pgvector", "Supabase", "Prisma", "TypeScript"],
      description: "Researching and prototyping an AI memory system with hierarchical storage: raw journal streams, canonical memory, and abstract knowledge retrieval for autonomous agents.",
      link: "#",
      metrics: "Architecture Design Phase — Vector Retrieval Pipeline"
    }
  ],

  septemberTargets: [
    {
      id: "target-sep-01",
      code: "SPEC // ORB-01",
      theme: "folder-manila",
      tabPos: 1,
      tabTitle: "[01] ORBIT ACQUISITION",
      title: "Orbit User Acquisition & Merchant Outreach",
      category: "ACQUISITION & GTM",
      targetValue: 400,
      currentValue: 120,
      unit: "users",
      status: "IN PROGRESS",
      deadline: "2026-09-30",
      notes: "Push toward the 300–500 active user milestone through direct merchant onboarding and founder networks.",
      mission: "Systematically scale Orbit's initial merchant base from early closed beta to hundreds of active daily ecommerce storefronts. Build high-converting distribution loops directly with D2C operators in India & US.",
      milestones: [
        { id: "m-orb01-1", text: "Curate verified outreach ledger of 120 Shopify & WooCommerce store owners", completed: true },
        { id: "m-orb01-2", text: "Deploy self-serve merchant onboarding v1 with zero-friction store connection", completed: true },
        { id: "m-orb01-3", text: "Conduct 15 white-glove onboarding sessions to capture customer friction points", completed: false },
        { id: "m-orb01-4", text: "Launch referral loop offering high-tier analytics for merchant-to-merchant invites", completed: false }
      ],
      tactileMemo: "Need to confirm Shopify App Store API permission scopes before Friday rollout. Founder outreach converts at ~22%!",
      techDetails: {
        focus: "Storefront API & Webhook Ingestion",
        metrics: "400 Active Merchant Stores • < 3 min Onboarding Time",
        deliverable: "Automated merchant ingestion queue & live referral ledger"
      }
    },
    {
      id: "target-sep-02",
      code: "SPEC // ORB-02",
      theme: "folder-sage",
      tabPos: 2,
      tabTitle: "[02] CONVERSION FUNNEL",
      title: "Orbit Conversion Rate Optimization",
      category: "GROWTH & CRO",
      targetValue: 5.0,
      currentValue: 2.8,
      unit: "%",
      status: "OPTIMIZING",
      deadline: "2026-09-30",
      notes: "Targeting 5% visitor-to-active conversion via refined merchant onboarding.",
      mission: "Eliminate cognitive friction and dropped sessions across the initial merchant setup wizard. Transform complex ecommerce integration into a 3-step, delightful setup flow.",
      milestones: [
        { id: "m-orb02-1", text: "Map full PostHog event instrumentation across onboarding steps 1 through 4", completed: true },
        { id: "m-orb02-2", text: "Prune 3 superfluous form inputs from initial merchant profile setup", completed: true },
        { id: "m-orb02-3", text: "Implement interactive instant preview demo store with mock catalog data", completed: false },
        { id: "m-orb02-4", text: "A/B test value proposition headlines: 'Revenue Intelligence' vs 'Checkout Insights'", completed: false }
      ],
      tactileMemo: "Step 2 drop-off dropped by 14% after removing optional tax ID requirement. Keep it lean!",
      techDetails: {
        focus: "PostHog Funnels & Interactive Demo Sandbox",
        metrics: "5.0% Conversion Target (Current: 2.8%) • 45s Setup Time",
        deliverable: "Streamlined 3-step onboarding flow with real-time feedback"
      }
    },
    {
      id: "target-sep-03",
      code: "SPEC // DIST-01",
      theme: "folder-lavender",
      tabPos: 3,
      tabTitle: "[03] X / DISTRIBUTION",
      title: "Audience Distribution & Technical Thought Leadership",
      category: "DISTRIBUTION",
      targetValue: 300,
      currentValue: 114,
      unit: "followers",
      status: "ACTIVE",
      deadline: "2026-09-30",
      notes: "Starting from 114; publishing insights on AI, growth, and building in public.",
      mission: "Establish a high-density, technical distribution channel around AI memory architectures, ecommerce growth engineering, and raw build logs. Attract top-tier founders, builders, and collaborators.",
      milestones: [
        { id: "m-dist01-1", text: "Lock in consistent 3x weekly publishing cadence on deep technical concepts", completed: true },
        { id: "m-dist01-2", text: "Draft and publish deep-dive breakdown thread on hierarchical AI memory tiers", completed: false },
        { id: "m-dist01-3", text: "Produce architectural diagrams comparing cosine vs dot product vector search", completed: false },
        { id: "m-dist01-4", text: "Engage in 20+ substantive technical discussions in AI & systems developer circles", completed: false }
      ],
      tactileMemo: "Audience grows when you show raw failure logs, benchmark numbers, and actual schema code, not generic advice.",
      techDetails: {
        focus: "Long-form Architecture Essays & Technical Diagrams",
        metrics: "300 Engaged Technical Followers • 15+ Retweets / Deep Thread",
        deliverable: "5 High-signal technical threads with custom blueprint visual diagrams"
      }
    },
    {
      id: "target-sep-04",
      code: "SPEC // QA-01",
      theme: "folder-ochre",
      tabPos: 4,
      tabTitle: "[04] MERCHANT QA",
      title: "Orbit Merchant Journey & Checkout QA Matrix",
      category: "PRODUCT QA",
      targetValue: 100,
      currentValue: 70,
      unit: "%",
      status: "TESTING",
      deadline: "2026-09-26",
      notes: "Verify checkout final amounts, order flow, and Orbit ↔ e-commerce synchronization.",
      mission: "Ensure bulletproof data fidelity between merchant ecommerce engines (Shopify/Woo) and Orbit's intelligence pipeline. Zero discrepancy in order totals, discount line items, and multi-currency conversions.",
      milestones: [
        { id: "m-qa01-1", text: "Build automated test suite for multi-currency conversion calculations", completed: true },
        { id: "m-qa01-2", text: "Audit discount code edge cases (tiered promotions, stacked percentage vouchers)", completed: true },
        { id: "m-qa01-3", text: "Run end-to-end checkout synchronization across 50 simulated customer carts", completed: true },
        { id: "m-qa01-4", text: "Stress-test webhook ingestion queue against 100 concurrent order spikes", completed: false }
      ],
      tactileMemo: "Found edge case: Shopify line-item refund webhooks don't always include tax apportioning. Patch ready.",
      techDetails: {
        focus: "Webhook Replay Harness & Discrepancy Auditor",
        metrics: "100% Test Suite Coverage • 0 Discrepancy Tolerance",
        deliverable: "Automated regression runner for merchant cart & order sync"
      }
    },
    {
      id: "target-sep-05",
      code: "SPEC // LUM-01",
      theme: "folder-slate",
      tabPos: 5,
      tabTitle: "[05] LUMEN AI SPEC",
      title: "Lumen AI Memory Architecture Specification",
      category: "AI & SYSTEMS",
      targetValue: 100,
      currentValue: 45,
      unit: "%",
      status: "PROTOTYPING",
      deadline: "2026-09-30",
      notes: "Document schema for raw storage, canonical memory, and vector semantic retrieval.",
      mission: "Architect and formalize the technical specification for Lumen: a 3-tier memory engine for AI agents that bridges raw chronological experience, consolidated canonical profiles, and semantic vector retrieval.",
      milestones: [
        { id: "m-lum01-1", text: "Specify 3-tier memory storage schema (Raw Event Stream → Canonical Synthesis → Vector)", completed: true },
        { id: "m-lum01-2", text: "Benchmark pgvector HNSW vs IVFFlat indexing latency on 100,000 synthetic memories", completed: true },
        { id: "m-lum01-3", text: "Prototype consolidation worker that summarizes weekly conversation clusters", completed: false },
        { id: "m-lum01-4", text: "Publish interactive schema playground and open-source architecture document", completed: false }
      ],
      tactileMemo: "HNSW index gives ~18ms lookup at 99% recall vs IVFFlat's 34ms! Perfect for real-time conversation agents.",
      techDetails: {
        focus: "Hierarchical RAG, PostgreSQL / pgvector, TypeScript SDK",
        metrics: "Sub-50ms Vector Retrieval • 3-Tier Storage Hierarchy",
        deliverable: "Open-source architectural whitepaper + interactive memory playground"
      }
    }
  ],

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
