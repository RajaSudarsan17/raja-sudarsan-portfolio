// Single source of truth for portfolio content. Every micro-frontend reads from here.

export const profile = {
  name: "Raja Sudarsan",
  title: "Associate MERN Stack Developer",
  tagline: "Associate MERN developer with 1 year of experience building client platform features, 3D product websites and internal business apps.",
  location: "Chennai, Tamil Nadu, India",
  email: "rajasudarsan17@gmail.com",
  linkedin: "https://www.linkedin.com/in/raja-sudarsan-75873a257",
  resume: "/Raja_Sudarsan_Resume.pdf",
  summary:
    "Associate MERN Stack Developer at KIAQ with 1 year of professional experience on client projects. I architected and built an admin approval workflow and four documented public APIs for a business-directory platform with React, TypeScript, Node.js, Express and MongoDB, and verified them with a 63-request test collection. I also built 3D product websites with Next.js and Three.js, and an internal finance app for the manufacturing sector. A B.Tech in Information Technology (2026), data skills (SQL, Python, Power BI, Tableau) and an IEEE paper on explainable retail AI round it out.",
};

export const stats = [
  { value: "1 yr", label: "Professional MERN experience" },
  { value: "2", label: "Client projects" },
  { value: "4", label: "Public API endpoints shipped, Swagger-documented" },
  { value: "IEEE", label: "Xplore paper, ICONSTEM 2025" },
];

export const experiences = [
  {
    role: "Associate MERN Stack Developer",
    company: "KIAQ",
    period: "Current role / 1 year",
    place: "Full-time",
    points: [
      "Architected and built the admin listing-approval workflow for a local business directory platform: pending queue, approve and reject with a reason, and status rules, across React and Node.js, Express and MongoDB.",
      "Delivered 4 public REST endpoints (categories, services, business list, business detail) with validated filters for category, rating, price, verified, sort and pagination, documented in Swagger and returning only approved listings.",
      "Designed the route, controller, service, repository and validation layers for these APIs and the matching React and Redux Toolkit Query data flow.",
      "Verified the API with a 63-request Postman collection (63 of 63 passing, responses in about 10 to 150 ms) and traced a bug that exposed pending listings on the public Explore page.",
      "Worked in a team of 3+ on feature branches and pull requests into a shared dev branch, resolving merge conflicts; ran services with Docker Compose behind an API gateway.",
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "Industrial manufacturing sector",
    period: "Product websites and internal business apps",
    place: "Chennai",
    points: [
      "Built public product websites with 3D product explorers, exploded part views and fitment tools in Next.js and Three.js.",
      "Built a request-for-quote flow with schema validation, database storage and email notification.",
      "Built an internal quotation, GST invoicing and finance ledger app with role-based access, audit logging and CSV and PDF reports.",
      "Hardened it with session-cookie auth, hashed passwords, rate limits, CSRF checks, parameterised SQL and integration tests.",
      "Containerised Node.js and Next.js apps with multi-stage Docker builds, non-root containers and health-check endpoints; deployed on Render and Vercel.",
      "Own the path from React and Next.js front end to Node APIs, PostgreSQL and Vercel deployment.",
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
    name: "3D Industrial Product Website",
    kicker: "Website / manufacturing",
    year: "2026",
    summary:
      "Public website for an emission-control products manufacturer, built as a product experience rather than a brochure.",
    points: [
      "Product catalogue with a page for every system.",
      "3D Explorer: every product viewable in 3D, part by part.",
      "Fitment Studio: check how a system fits a vehicle or engine.",
      "Light and dark theme, scroll-driven animation and SEO metadata.",
      "Branch, commit and fast-forward merge workflow with auto-deploy from main.",
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind", "Three.js", "Motion", "Docker", "Vercel"],
    href: "",
    cta: "",
  },
  {
    name: "3D Power Systems Website",
    kicker: "Website / power equipment",
    year: "2026",
    summary:
      "Website for a diesel engine and generator set business, with 3D at the core of the experience.",
    points: [
      "Live 3D product hero and a catalogue with a product page for each item.",
      "3D Explorer with exploded, part-by-part views.",
      "Teardown page showing the working sequence with live readings.",
      "Generator set fitment studio and a compliance guide.",
      "Factory World: the production line rebuilt in 3D.",
      "Quote request form validated with Zod, stored in Postgres and emailed through Resend.",
      "Smooth scrolling with Lenis, GSAP and Motion; owner-gated release before going public.",
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "Three.js", "GSAP", "Lenis", "Postgres", "Zod", "Vercel"],
    href: "",
    cta: "",
  },
  {
    name: "Quotation, Invoicing & Finance App",
    kicker: "Private business app / internal",
    year: "2026",
    summary:
      "Internal management system covering quotations, GST invoices, a full finance ledger and reports in one place.",
    points: [
      "Quotation and tax invoice PDFs filled onto company templates; bulk invoice import and payment tracking.",
      "Finance ledger: payments made and received, transfers, budgets, recurring payments and period lock.",
      "Reports as JSON, CSV and bank-format PDF: statement of account, income and expenditure, GST, cash forecast, audit trail.",
      "Role-based access (owner, admin, finance, purchase, production, viewer) with forced first-login password change.",
      "Security: HttpOnly session cookies, hashed passwords, rate limits, CSRF checks, parameterised SQL and an audit log.",
      "Integration tests against an isolated database schema.",
      "Containerised with a multi-stage Docker build, a non-root user and a health-check endpoint.",
    ],
    stack: ["React (Vite)", "Node.js", "Serverless API", "PostgreSQL", "Docker", "pdf-lib", "Three.js", "Vercel"],
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
  "MERN Stack": ["MongoDB", "Express.js", "React", "Node.js", "REST APIs", "Swagger / OpenAPI", "JavaScript", "TypeScript", "HTML5", "CSS3"],
  "Architecture & Engineering": ["API design", "Layered architecture", "Request validation", "Data modelling", "Monorepos", "Git workflow", "Pull requests"],
  Security: ["Authentication", "Role-based access", "Input validation (Zod)", "Rate limiting", "CSRF protection", "Audit logging", "Secure cookies"],
  "Frontend & Testing": ["React", "TypeScript", "Vite", "Redux Toolkit Query", "Responsive design", "Code splitting", "Lazy loading", "Postman", "Integration testing"],
  "Web, 3D & Cloud": ["Next.js", "TypeScript", "Tailwind CSS", "Three.js", "GSAP", "Motion", "Docker", "Vercel", "Render", "PostgreSQL"],
  "Data Analytics & BI": ["SQL", "Python", "Power BI", "Tableau", "Excel (Pivot, VLOOKUP)", "Data Modeling", "ETL"],
  "ML & Libraries": ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn", "TensorFlow", "XGBoost"],
  Databases: ["MongoDB", "PostgreSQL", "MySQL", "SQL Server"],
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
