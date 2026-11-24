// Single source of truth for portfolio content. Every micro-frontend reads from here.

export const profile = {
  name: "Raja Sudarsan",
  title: "Associate MERN Stack Developer",
  tagline: "Associate MERN developer at KIAQ with 1 year of experience, shipping client projects, 3D websites and business apps.",
  location: "Chennai, Tamil Nadu, India",
  email: "rajasudarsan17@gmail.com",
  linkedin: "https://www.linkedin.com/in/raja-sudarsan-75873a257",
  resume: "/Raja_Sudarsan_Resume.pdf",
  summary:
    "Associate MERN Stack Developer at KIAQ with 1 year of professional experience and 2 client projects delivered, plus an Information Technology degree (B.Tech 2026). I build full-stack products with MongoDB, Express, React and Node.js, and use Next.js and Three.js for rich 3D front ends. I built the websites for Maxmoc Motor Works and Green Boy India and the Maxmoc invoicing and finance management app. On top of that I bring real data skills: SQL, Python, Power BI and Tableau, and an IEEE paper on explainable retail AI.",
};

export const stats = [
  { value: "1 yr", label: "Professional MERN experience" },
  { value: "2", label: "Client projects delivered at KIAQ" },
  { value: "3", label: "Own products shipped: 2 websites, 1 app" },
  { value: "IEEE", label: "Xplore paper, ICONSTEM 2025" },
];

export const experiences = [
  {
    role: "Associate MERN Stack Developer",
    company: "KIAQ",
    period: "Current role / 1 year",
    place: "Full-time",
    points: [
      "Working as an Associate MERN Stack Developer with 1 year of professional experience.",
      "Worked on 2 client projects with the MongoDB, Express, React and Node.js stack.",
      "Deliver to client requirements and reviews as part of a development team.",
    ],
  },
  {
    role: "Full-Stack Developer (MERN)",
    company: "Maxmoc Motor Works / Green Boy India",
    period: "Websites, apps and management systems",
    place: "Chennai",
    points: [
      "Built and shipped the Maxmoc Motor Works website: product catalogue, 3D Explorer, Fitment Studio and light/dark theme, deployed on Vercel.",
      "Built the Green Boy India website: live 3D product hero, 3D teardown, fitment studio, 3D factory world and an RFQ contact form wired to a database and email.",
      "Built the MMW Invoice management app: quotations, GST tax invoices, finance ledger, reports and role-based access for the team.",
      "Own the full path: React and Next.js front ends, serverless and Node APIs, PostgreSQL, deployment and ongoing fixes.",
    ],
  },
  {
    role: "Data Analyst Intern",
    company: "Maxmoc",
    period: "Jun 2024 - Aug 2024",
    place: "Remote / Chennai",
    points: [
      "Collected, cleaned and explored business datasets to surface trends and insights for stakeholders.",
      "Built automated reports and interactive dashboards in Power BI and Tableau, cutting manual reporting time.",
      "Wrote optimized SQL to extract, join and aggregate data from multiple sources.",
      "Worked with cross-functional teams to turn business requirements into analysis using Python, SQL and Excel.",
    ],
  },
];

export const projects = [
  {
    name: "Maxmoc Motor Works Website",
    kicker: "Live website / maxmoc.com",
    year: "2026",
    summary:
      "Public website for Maxmoc Motor Works, a maker of emission aftertreatment systems. Built as a product experience, not a brochure.",
    points: [
      "Product catalogue for SCR, HC-SCR, DOC + DPF, RECD, ATCU and marine SCR systems.",
      "3D Explorer: every product viewable in 3D, part by part.",
      "Fitment Studio: check how a system fits a vehicle or engine.",
      "Light and dark theme, scroll-driven animation and SEO metadata.",
      "Branch, commit and fast-forward merge workflow; auto-deploy to Vercel from main.",
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind", "Three.js", "Motion", "Vercel"],
    href: "https://maxmoc.com",
    cta: "Visit maxmoc.com",
  },
  {
    name: "Green Boy India Website",
    kicker: "Website / Green Boy India",
    year: "2026",
    summary:
      "Website for Green Boy India: diesel engines, generator sets and hybrid power systems, with 3D at the core of the experience.",
    points: [
      "Live 3D product hero and a catalogue with a product page for each item.",
      "3D Explorer with exploded, part-by-part views.",
      "Teardown page: working sequence with live readings.",
      "Genset fitment studio and a CPCB IV+ guide.",
      "Factory World: the production line rebuilt in 3D.",
      "RFQ contact form validated with Zod, stored in Postgres and emailed through Resend.",
      "Smooth scrolling with Lenis, GSAP and Motion; owner-gated release before going public.",
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "Three.js", "GSAP", "Lenis", "Postgres", "Zod", "Vercel"],
    href: "",
    cta: "",
  },
  {
    name: "MMW Invoice Management App",
    kicker: "Private business app / app.maxmoc.com",
    year: "2026",
    summary:
      "Internal management system for Maxmoc Motor Works: quotations, GST invoices, a full finance ledger and reports in one place.",
    points: [
      "Quotation and tax invoice PDFs filled onto the company templates; bulk invoice import and payment tracking.",
      "Finance ledger: payments made and received, transfers, budgets, recurring payments and period lock.",
      "Reports as JSON, CSV and bank-format PDF: statement of account, income and expenditure, GST, cash forecast, audit trail.",
      "Role-based access (owner, admin, finance, purchase, production, viewer) with forced first-login password change.",
      "Security: HttpOnly session cookies, hashed passwords, rate limits, CSRF checks, parameterised SQL and an audit log.",
      "Integration tests against an isolated database schema.",
    ],
    stack: ["React (Vite)", "Node.js", "Serverless API", "PostgreSQL", "pdf-lib", "Three.js", "Vercel"],
    href: "",
    cta: "",
  },
  {
    name: "Smart Retail AI",
    kicker: "Research / IEEE Xplore, ICONSTEM 2025",
    year: "2025",
    summary:
      "Co-authored a hybrid, explainable AI framework for retail SMEs covering demand forecasting, recommendations and dynamic pricing.",
    points: [
      "Hybrid LSTM + XGBoost demand forecaster using weather, promotions and holidays; more reliable than ARIMA baselines.",
      "Recommendation engine combining collaborative and content-based filtering with NLP sentiment analysis.",
      "Constrained reinforcement learning module for pricing that respects fairness, brand and regulatory limits.",
      "SHAP attribution and counterfactual reasoning for transparent decisions.",
    ],
    stack: ["Python", "TensorFlow", "XGBoost", "Scikit-learn", "NLP", "SHAP", "Pandas"],
    href: "https://doi.org/10.1109/ICONSTEM65670.2025.11374677",
    cta: "Read the paper",
  },
  {
    name: "This Portfolio",
    kicker: "React, Three.js, micro-frontends",
    year: "2026",
    summary:
      "The site you are on: an interactive 3D career island with page routing and a mouse swarm that re-themes per page.",
    points: [
      "React 19 + TypeScript + Vite in an npm-workspaces monorepo.",
      "Three.js (react-three-fiber) island that flattens into a map on scroll, with clickable buildings that open summary cards and pages.",
      "Shared package for data, routing config and the swarm; 3D and swarm load as lazy chunks.",
      "Deployed on Vercel.",
    ],
    stack: ["React", "TypeScript", "Three.js", "Vite", "Tailwind", "Motion", "Vercel"],
    href: "",
    cta: "",
  },
  {
    name: "Smart Grid Energy Analysis",
    kicker: "Data project / time-series forecasting",
    year: "2024",
    summary:
      "End-to-end analysis of large energy consumption time series to forecast demand and support smart grid load balancing.",
    points: [
      "EDA to find usage trends, anomalies and seasonality.",
      "Cleaned data: missing values, outliers and feature normalization.",
      "ARIMA and LSTM forecasts tuned with hyperparameter search and cross-validation.",
      "Dashboards in Matplotlib, Seaborn, Tableau and Power BI.",
    ],
    stack: ["Python", "Pandas", "TensorFlow", "SQL", "Tableau", "Power BI"],
    href: "",
    cta: "",
  },
];

export const skills: Record<string, string[]> = {
  "MERN Stack": ["MongoDB", "Express.js", "React", "Node.js", "REST APIs", "JavaScript", "HTML5", "CSS3"],
  "Web, 3D & Cloud": ["Next.js", "TypeScript", "Tailwind CSS", "Three.js", "GSAP", "Motion", "Vercel", "PostgreSQL"],
  "Data Analytics & BI": ["SQL", "Python", "Power BI", "Tableau", "Excel (Pivot, VLOOKUP)", "Data Modeling", "ETL"],
  "ML & Libraries": ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn", "TensorFlow", "XGBoost"],
  Databases: ["MongoDB", "PostgreSQL", "MySQL", "SQL Server"],
  Concepts: ["EDA", "Statistics", "Machine Learning", "Time-series Forecasting", "NLP", "Dashboards"],
  Tools: ["Git", "GitHub", "Jupyter", "VS Code", "Java (beginner)"],
};

export const certifications = [
  { name: "Microsoft Data Analysis Fundamentals", issuer: "Microsoft" },
  { name: "Data Analysis Professional Certificate", issuer: "LinkedIn Learning" },
  { name: "SQL (Intermediate)", issuer: "Certified" },
  { name: "Power BI Specialist", issuer: "Certified" },
  { name: "Python for Data Science", issuer: "Online certification" },
];

export const education = [
  { name: "B.Tech, Information Technology", place: "St. Joseph's Institute of Technology, Chennai", when: "2022 - 2026" },
  { name: "Higher Secondary (XII): 91%", place: "Sri Chaitanya Techno School, Coimbatore", when: "2022" },
  { name: "Secondary (X): 81%", place: "Parvathy's Anugrahaa International School, Dindigul", when: "2020" },
];
