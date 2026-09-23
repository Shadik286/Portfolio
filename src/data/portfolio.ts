export const portfolioData = {
  personal: {
    name: "Md. Shadikur Rahman Shadik",
    shortName: "Shadik",
    title: "AI / Software Engineer",
    location: "Sylhet, Bangladesh",
    email: "rahmansadik286@gmail.com",
    phone: "+880 1817932639",
    photo: "/shadik.jpg",
    social: {
      github: "https://github.com/Shadik286",
      linkedin: "https://linkedin.com/in/shadikrahman286",
      codeforces: "https://codeforces.com/profile/sdKrhMn286",
      atcoder: "https://atcoder.jp/users/sadik286",
    }
  },
  about: {
    codeCard: {
      filename: "shadik.cpp",
    },
  },
  skills: {
    languages: ["C", "C++", "Java", "Python", "JavaScript", "TypeScript", "Dart"],
    frontendMobile: ["HTML5", "CSS3", "React", "Next.js", "Flutter", "Tailwind CSS"],
    backend: ["Node.js", "Prisma", "REST API", "JWT", "OAuth 2.0"],
    databases: ["PostgreSQL", "MySQL", "pgvector", "ChromaDB"],
    ai: ["PyTorch", "CNN", "ANN", "RAG", "LLM API Integration", "NumPy", "Pandas", "scikit-learn"],
    tools: ["Git", "GitHub", "Supabase", "Vercel", "cPanel", "FastAPI Cloud", "Cloudinary"],
    core: ["Data Structures & Algorithms", "OOP", "DBMS"]
  },
  projects: [
    {
      id: "renten",
      name: "Renten",
      category: "Property Management System",
      description: "A Flutter app and web ecosystem carrying payments, subscriptions and billing logic.",
      techStack: ["Flutter", "Next.js", "TypeScript", "PostgreSQL", "Prisma"],
      image: "/projects/renten.svg",
      metrics: [
        { value: "42", label: "REST endpoints" },
        { value: "23", label: "DB tables" },
        { value: "13", label: "App screens" },
      ],
      features: [
        "13-screen Flutter mobile application",
        "42 REST API endpoints",
        "23-table PostgreSQL database",
        "bKash payment gateway",
        "Subscription billing & coupon redemption",
        "JWT authentication with refresh tokens",
        "PIN login & biometric unlock",
        "Cloudinary uploads & PDF report generation",
        "Bangla and English localization"
      ],
      github: "",
      live: "https://androidcontentapp.xyz/SDKRenten/"
    },
    {
      id: "inventra",
      name: "Inventra",
      category: "Inventory Management System",
      description: "Products, sales, suppliers and dues in one workspace.",
      techStack: ["React", "TypeScript", "FastAPI", "Python", "PostgreSQL"],
      image: "/projects/inventra.svg",
      metrics: [
        { value: "SPA", label: "React + TS" },
        { value: "v1", label: "API" },
        { value: "2", label: "Deploys" },
      ],
      features: [
        "React + TypeScript SPA",
        "FastAPI backend",
        "Supabase PostgreSQL",
        "Versioned API routes",
        "Deployment architecture"
      ],
      github: "",
      live: ""
    },
    {
      id: "study-maite",
      name: "Study mAIte",
      category: "AI Study Assistant",
      description: "Turns lecture PDFs into notes and quizzes over a RAG pipeline.",
      techStack: ["Flutter", "FastAPI", "pgvector", "Gemini API"],
      image: "/projects/study-maite.svg",
      metrics: [
        { value: "RAG", label: "Pipeline" },
        { value: "PDF", label: "Ingest" },
        { value: "pgvector", label: "Embeddings" },
      ],
      features: [
        "RAG pipeline",
        "Vector embeddings via pgvector",
        "Lecture PDF processing with PyMuPDF",
        "Automatic note & quiz generation",
        "Gemini API integration"
      ],
      github: "",
      live: "https://androidcontentapp.xyz/SDKStudyMaiteNB/"
    },
    {
      id: "researchers-bot",
      name: "Researchers-Bot",
      category: "Academic Paper Search API",
      description: "One search API over arXiv, PubMed Central and Crossref.",
      techStack: ["Node.js", "TypeScript"],
      image: "/projects/researchers-bot.svg",
      metrics: [
        { value: "9", label: "Sources" },
        { value: "REST", label: "API" },
        { value: "Cache", label: "+ retry" },
      ],
      features: [
        "REST API aggregating 9 academic sources",
        "Integration with arXiv, PubMed Central, Crossref",
        "Rate limiting & Retry logic",
        "Caching mechanisms"
      ],
      github: "https://github.com/Shadik286/Researchers-Bot",
      live: ""
    }
  ],
  research: {
    title: "TRICON-AV",
    subtitle: "Tri-Level Consistency Modelling for Audio-Visual Deepfake Detection",
    tech: "PyTorch",
    description: "An AI research project focusing on audio-visual deepfake detection through multimodal deep learning and cross-modal consistency modelling.",
    visuals: ["Audio \u2192 Model", "Video \u2192 Model", "Cross-modal consistency \u2192 Detection"]
  },
  experience: [
    {
      role: "Mentor \u2014 Developer Team",
      company: "BDApps Sylhet Region",
      period: "05/2025 \u2013 Present",
      achievements: [
        "Mentoring Campus Ambassadors, She Squad Leaders, and developers",
        "Helping developers build web and Android applications",
        "Training on bdApps API integration",
        "Guiding hosting and cloud deployment"
      ]
    },
    {
      role: "Campus Ambassador",
      company: "bdApps",
      period: "02/2024 \u2013 01/2025",
      achievements: [
        "Promoting bdApps among students",
        "Helping peers with API integration",
        "Assisting with application deployment"
      ]
    }
  ],
  competitiveProgramming: {
    platforms: [
      { name: "Codeforces", rank: "Specialist", maxRating: 1576 },
      { name: "AtCoder", rank: "6 Kyu", maxRating: null }
    ],
    international: [
      { event: "ICPC Dhaka Regional 2025", result: "61st", detail: "Among 310+ teams" },
      { event: "Meta Hacker Cup 2023", result: "Rank 2954", detail: "Round 2" }
    ],
    national: [
      { event: "CUET IUPC 2025", result: "27th", detail: "Among 130+ teams" },
      { event: "MU IUPC 2025", result: "29th", detail: "Among 90+ teams" },
      { event: "DUET IUPC 2025", result: "30th", detail: "Among 130+ teams" },
      { event: "SUST IUPC 2026", result: "48th", detail: "" },
      { event: "AUST IUPC 2025", result: "50th", detail: "Among 130+ teams" },
      { event: "UU IUPC 2025", result: "56th", detail: "Among 120+ teams" },
      { event: "UIU IUPC 2025", result: "71st", detail: "Among 160+ teams" },
      { event: "BUET IUPC 2024", result: "91st", detail: "" },
      { event: "SEC IUJPC 2022", result: "45th", detail: "" }
    ]
  },
  leadership: [
    {
      role: "General Secretary",
      organization: "SEC Programming Club",
      period: "09/2025 \u2013 08/2026"
    },
    {
      role: "Joint Secretary & CP Trainer",
      organization: "SEC Programming Club",
      period: "02/2025 \u2013 11/2025"
    },
    {
      role: "Management Coordinator",
      organization: "CSE Society, SEC",
      period: "09/2025 \u2013 08/2026"
    }
  ],
  education: {
    degree: "B.Sc. (Engg.) in Computer Science & Engineering",
    institution: "Sylhet Engineering College",
    period: "02/2022 \u2013 08/2026",
    cgpa: "3.78 / 4.00",
    thesis: "TRICON-AV \u2014 Audio-Visual Deepfake Detection using Multimodal Deep Learning"
  }
};
