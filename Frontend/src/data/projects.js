// ─────────────────────────────────────────────────────────────
// YOUR PROJECTS — replace these sample entries with your own.
//
// image: put files in Frontend/public/projects/ and use "/projects/name.jpg"
//        (leave it empty "" to show a gradient cover instead)
// color: gradient colors used when there is no image
// featured: true → shows on the Home page
// ─────────────────────────────────────────────────────────────
export const projects = [
 
  {
    slug: "ClearVision-edtech",
    title: "Clear Vision For Upsc",
    client: "Clear Vision",
    year: "2026",
    category: "EdTech",
    tags: ["EdTech", "Branding", "Web"],
    summary: "A course platform with payments, live classes and student analytics.",
    challenge:
      "The academy was selling courses over WhatsApp and Google Forms, which could not scale beyond a few hundred students.",
    solution:
      "A custom LMS with Razorpay payments, video hosting, progress tracking and an admin panel for the team.",
    results: ["10k+ students onboarded", "2x course revenue", "Fully automated enrolments"],
    image: "",
    color: ["#c8ff3d", "#2f6b12"],
    link: "https://www.clearvisionforupsc.com/",
    featured: true,
  },
    {
    slug: "ADGIPS-Hub",
    title: "ADGIPS Hub",
    client: "ADGIPS",
    year: "2025",
    category: "Education",
    tags: ["EdTech", "Web Development", "Placement Portal"],
    summary:
      "A centralized placement portal connecting students with job opportunities, placement updates and career resources.",
    challenge:
      "Students needed a centralized platform to access placement opportunities and career-related updates instead of relying on scattered information.",
    solution:
      "Built a responsive placement portal with React, Vite, Tailwind CSS, Node.js, Express and MongoDB to streamline access to placement information and career opportunities.",
    results: [
      "Centralized placement information",
      "Streamlined access to career opportunities",
      "Responsive and user-friendly interface",
    ],
    image: "",
    color: ["#6366f1", "#312e81"],
    link: "https://www.adgipshub.online/",
    featured: true,
  },
  {
    slug: "opsbot-ai",
    title: "OpsBot",
    client: "Panther Logistics",
    year: "2024",
    category: "AI",
    tags: ["AI Agent", "Automation", "Integrations"],
    summary: "An AI assistant that automates order tracking and customer support.",
    challenge:
      "The support team answered the same order-status questions hundreds of times a day.",
    solution:
      "An LLM agent connected to their ERP and WhatsApp that answers queries, raises tickets and escalates edge cases.",
    results: ["65% of tickets automated", "< 30s response time", "Saved 4 FTE hours / day"],
    image: "",
    color: ["#ff7a59", "#7a1f0e"],
    link: "",
    featured: true,
  },
  {
    slug: "Catalyst Consultants-website",
    title: "Catalyst Consultants",
    client: "Catalyst Consultants",
    year: "2025",
    category: "Web Design",
    tags: ["Web Design", "CMS", "Branding"],
    summary: "A premium marketing site and CMS for a Insurance firm.",
    challenge: "An outdated website that didn't reflect the firm's credibility or generate leads.",
    solution: "A new brand system and fast, SEO-optimised website with an easy-to-use CMS.",
    results: ["4x more inbound leads", "95+ Lighthouse score", "Team edits content without devs"],
    image: "",
    color: ["#3dd9ff", "#0d4a63"],
    link: "https://www.catalystconsultants.in/",
    featured: true,
  },

];

export const categories = ["All", ...new Set(projects.map((p) => p.category))];
