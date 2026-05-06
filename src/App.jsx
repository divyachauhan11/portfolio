import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&family=Manrope:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #060608;
    --bg2: #0d0d12;
    --bg3: #12121a;
    --cyan: #00e5ff;
    --gold: #ffd166;
    --rose: #ff6b9d;
    --text: #e8e8f0;
    --muted: #6b6b80;
    --border: rgba(0,229,255,0.12);
    --glow: 0 0 30px rgba(0,229,255,0.25);
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Manrope', sans-serif;
    overflow-x: hidden;
  }

  /* SCROLLBAR */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--cyan); border-radius: 2px; }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.2rem 4rem;
    background: rgba(6,6,8,0.85);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    transition: all 0.3s;
  }
  .nav-logo {
    font-family: 'Syne', sans-serif;
    font-size: 1.4rem; font-weight: 800;
    color: var(--cyan);
    letter-spacing: -0.5px;
  }
  .nav-logo span { color: var(--gold); }
  .nav-links { display: flex; gap: 2.5rem; list-style: none; }
  .nav-links a {
    font-family: 'DM Mono', monospace;
    font-size: 0.78rem; color: var(--muted);
    text-decoration: none; letter-spacing: 1px;
    text-transform: uppercase;
    transition: color 0.2s;
    position: relative;
  }
  .nav-links a::after {
    content: ''; position: absolute; bottom: -4px; left: 0;
    width: 0; height: 1px; background: var(--cyan);
    transition: width 0.3s;
  }
  .nav-links a:hover { color: var(--cyan); }
  .nav-links a:hover::after { width: 100%; }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex; align-items: center;
    padding: 0 4rem;
    position: relative;
    overflow: hidden;
  }
  .hero-grid {
    position: absolute; inset: 0; opacity: 0.04;
    background-image: linear-gradient(var(--cyan) 1px, transparent 1px),
      linear-gradient(90deg, var(--cyan) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  .hero-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    pointer-events: none;
  }
  .hero-blob-1 {
    width: 500px; height: 500px;
    background: rgba(0,229,255,0.06);
    top: -100px; right: -100px;
  }
  .hero-blob-2 {
    width: 350px; height: 350px;
    background: rgba(255,107,157,0.05);
    bottom: 0; left: 30%;
  }
  .hero-content { position: relative; z-index: 1; max-width: 820px; }
  .hero-tag {
    display: inline-flex; align-items: center; gap: 0.6rem;
    font-family: 'DM Mono', monospace;
    font-size: 0.75rem; color: var(--cyan);
    letter-spacing: 2px; text-transform: uppercase;
    margin-bottom: 1.5rem;
    padding: 0.4rem 1rem;
    border: 1px solid rgba(0,229,255,0.3);
    border-radius: 2px;
    background: rgba(0,229,255,0.05);
  }
  .hero-tag-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--cyan);
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.8); }
  }
  .hero-name {
    font-family: 'Syne', sans-serif;
    font-size: clamp(3.5rem, 8vw, 7rem);
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -2px;
    margin-bottom: 0.4rem;
  }
  .hero-name .line1 { color: var(--text); }
  .hero-name .line2 {
    background: linear-gradient(90deg, var(--cyan), var(--gold));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .hero-role {
    font-family: 'DM Mono', monospace;
    font-size: 1rem; color: var(--muted);
    margin: 1.5rem 0 2rem;
    letter-spacing: 0.5px;
  }
  .hero-role span { color: var(--gold); }
  .hero-desc {
    font-size: 1.05rem; color: var(--muted);
    line-height: 1.8; max-width: 520px;
    margin-bottom: 3rem;
  }
  .hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; }
  .btn-primary {
    padding: 0.9rem 2.2rem;
    background: var(--cyan);
    color: #000; font-weight: 700;
    font-family: 'DM Mono', monospace;
    font-size: 0.85rem; letter-spacing: 1px;
    border: none; border-radius: 2px;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
    display: inline-block;
  }
  .btn-primary:hover {
    background: #fff; transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0,229,255,0.3);
  }
  .btn-outline {
    padding: 0.9rem 2.2rem;
    background: transparent;
    color: var(--text); font-weight: 500;
    font-family: 'DM Mono', monospace;
    font-size: 0.85rem; letter-spacing: 1px;
    border: 1px solid var(--border);
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
    display: inline-block;
  }
  .btn-outline:hover {
    border-color: var(--cyan); color: var(--cyan);
    transform: translateY(-2px);
  }
  .hero-scroll {
    position: absolute; bottom: 2.5rem; left: 50%;
    transform: translateX(-50%);
    display: flex; flex-direction: column;
    align-items: center; gap: 0.5rem;
    font-family: 'DM Mono', monospace;
    font-size: 0.65rem; color: var(--muted);
    letter-spacing: 2px; text-transform: uppercase;
    animation: float 3s ease-in-out infinite;
  }
  @keyframes float {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(-8px); }
  }
  .scroll-line {
    width: 1px; height: 50px;
    background: linear-gradient(var(--cyan), transparent);
  }

  /* SECTIONS COMMON */
  section { padding: 6rem 4rem; }
  .section-label {
    font-family: 'DM Mono', monospace;
    font-size: 0.72rem; color: var(--cyan);
    letter-spacing: 3px; text-transform: uppercase;
    margin-bottom: 1rem;
    display: flex; align-items: center; gap: 1rem;
  }
  .section-label::after {
    content: ''; flex: 1; max-width: 60px;
    height: 1px; background: var(--cyan); opacity: 0.4;
  }
  .section-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 800; letter-spacing: -1px;
    margin-bottom: 0.8rem;
    line-height: 1.1;
  }
  .section-sub {
    color: var(--muted); font-size: 1rem;
    line-height: 1.7; max-width: 520px;
    margin-bottom: 3.5rem;
  }

  /* ABOUT */
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem; align-items: center;
  }
  .about-stats {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 1.5rem; margin-top: 2.5rem;
  }
  .stat-card {
    padding: 1.5rem;
    border: 1px solid var(--border);
    border-radius: 4px;
    background: var(--bg2);
    transition: all 0.3s;
  }
  .stat-card:hover {
    border-color: rgba(0,229,255,0.3);
    box-shadow: var(--glow);
    transform: translateY(-3px);
  }
  .stat-num {
    font-family: 'Syne', sans-serif;
    font-size: 2.5rem; font-weight: 800;
    color: var(--cyan); line-height: 1;
  }
  .stat-label { font-size: 0.8rem; color: var(--muted); margin-top: 0.3rem; }

  .about-visual {
    position: relative;
    display: flex; justify-content: center; align-items: center;
  }
  .about-avatar {
    width: 320px; height: 380px;
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 4px;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    position: relative; overflow: hidden;
  }
  .avatar-code {
    font-family: 'DM Mono', monospace;
    font-size: 0.8rem; color: var(--cyan);
    opacity: 0.7; text-align: left;
    padding: 1.5rem;
    line-height: 2;
  }
  .avatar-code .kw { color: var(--rose); }
  .avatar-code .str { color: var(--gold); }
  .avatar-code .fn { color: var(--cyan); }
  .avatar-corner {
    position: absolute;
    width: 20px; height: 20px;
    border-color: var(--cyan);
    border-style: solid;
    opacity: 0.5;
  }
  .avatar-corner.tl { top: 10px; left: 10px; border-width: 2px 0 0 2px; }
  .avatar-corner.tr { top: 10px; right: 10px; border-width: 2px 2px 0 0; }
  .avatar-corner.bl { bottom: 10px; left: 10px; border-width: 0 0 2px 2px; }
  .avatar-corner.br { bottom: 10px; right: 10px; border-width: 0 2px 2px 0; }

  /* SKILLS */
  .skills-section { background: var(--bg2); }
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
  }
  .skill-cat {
    padding: 2rem;
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 4px;
    transition: all 0.3s;
  }
  .skill-cat:hover {
    border-color: rgba(0,229,255,0.3);
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  }
  .skill-cat-icon {
    font-size: 2rem; margin-bottom: 1rem;
  }
  .skill-cat-title {
    font-family: 'Syne', sans-serif;
    font-weight: 700; font-size: 1rem;
    margin-bottom: 1.2rem; color: var(--text);
  }
  .skill-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .skill-tag {
    padding: 0.3rem 0.8rem;
    font-family: 'DM Mono', monospace;
    font-size: 0.7rem; letter-spacing: 0.5px;
    border-radius: 2px;
    background: rgba(0,229,255,0.08);
    border: 1px solid rgba(0,229,255,0.15);
    color: var(--cyan);
  }
  .skill-tag.gold {
    background: rgba(255,209,102,0.08);
    border-color: rgba(255,209,102,0.2);
    color: var(--gold);
  }
  .skill-tag.rose {
    background: rgba(255,107,157,0.08);
    border-color: rgba(255,107,157,0.2);
    color: var(--rose);
  }

  /* PROJECTS */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 2rem;
  }
  .project-card {
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 6px;
    overflow: hidden;
    transition: all 0.3s;
    position: relative;
    cursor: default;
  }
  .project-card:hover {
    border-color: rgba(0,229,255,0.3);
    transform: translateY(-6px);
    box-shadow: 0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(0,229,255,0.1);
  }
  .project-header {
    padding: 2rem 2rem 1.5rem;
    border-bottom: 1px solid var(--border);
    position: relative;
  }
  .project-num {
    font-family: 'DM Mono', monospace;
    font-size: 0.7rem; color: var(--muted);
    letter-spacing: 2px; margin-bottom: 0.8rem;
  }
  .project-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.4rem; font-weight: 800;
    letter-spacing: -0.5px; margin-bottom: 0.5rem;
  }
  .project-status {
    display: inline-flex; align-items: center; gap: 0.4rem;
    font-family: 'DM Mono', monospace;
    font-size: 0.65rem; letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 0.25rem 0.7rem;
    border-radius: 2px;
    position: absolute; top: 2rem; right: 2rem;
  }
  .status-live {
    background: rgba(0,229,255,0.1);
    border: 1px solid rgba(0,229,255,0.3);
    color: var(--cyan);
  }
  .status-wip {
    background: rgba(255,209,102,0.1);
    border: 1px solid rgba(255,209,102,0.3);
    color: var(--gold);
  }
  .status-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: currentColor;
    animation: pulse 1.5s infinite;
  }
  .project-body { padding: 1.5rem 2rem 2rem; }
  .project-desc {
    color: var(--muted); font-size: 0.9rem;
    line-height: 1.75; margin-bottom: 1.5rem;
  }
  .project-techs { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; }
  .tech-badge {
    font-family: 'DM Mono', monospace;
    font-size: 0.68rem; letter-spacing: 0.5px;
    padding: 0.25rem 0.7rem;
    border-radius: 2px;
    background: var(--bg3);
    border: 1px solid var(--border);
    color: var(--muted);
  }
  .project-features {
    display: flex; flex-direction: column; gap: 0.5rem;
  }
  .feature-item {
    display: flex; align-items: flex-start; gap: 0.7rem;
    font-size: 0.85rem; color: var(--muted);
  }
  .feature-icon { color: var(--cyan); font-size: 0.7rem; margin-top: 0.15rem; flex-shrink: 0; }

  /* PROJECT VISUAL */
  .project-visual {
    height: 160px;
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
  }
  .pv-weather {
    background: linear-gradient(135deg, #0a1628, #112244);
  }
  .pv-todo {
    background: linear-gradient(135deg, #160a1a, #281040);
  }
  .pv-job {
    background: linear-gradient(135deg, #0a1a12, #0d2a1e);
  }
  .weather-icon-big { font-size: 4rem; }
  .orbit-ring {
    position: absolute; border-radius: 50%;
    border: 1px solid; opacity: 0.15;
    animation: spin 10s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* EDUCATION */
  .education-section { background: var(--bg2); }
  .edu-timeline { position: relative; padding-left: 2rem; }
  .edu-timeline::before {
    content: ''; position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 1px; background: var(--border);
  }
  .edu-item {
    position: relative; margin-bottom: 3rem;
    padding: 2rem;
    background: var(--bg3);
    border: 1px solid var(--border);
    border-radius: 4px;
    transition: all 0.3s;
  }
  .edu-item:hover {
    border-color: rgba(0,229,255,0.3);
    box-shadow: var(--glow);
  }
  .edu-dot {
    position: absolute; left: -2.55rem; top: 2.2rem;
    width: 10px; height: 10px; border-radius: 50%;
    background: var(--cyan);
    box-shadow: 0 0 10px var(--cyan);
  }
  .edu-year {
    font-family: 'DM Mono', monospace;
    font-size: 0.72rem; color: var(--cyan);
    letter-spacing: 2px; margin-bottom: 0.5rem;
  }
  .edu-degree {
    font-family: 'Syne', sans-serif;
    font-size: 1.2rem; font-weight: 700;
    margin-bottom: 0.3rem;
  }
  .edu-school {
    color: var(--muted); font-size: 0.9rem; margin-bottom: 1rem;
  }
  .edu-grade {
    display: inline-flex; align-items: center; gap: 0.5rem;
    padding: 0.4rem 1rem;
    background: linear-gradient(135deg, rgba(0,229,255,0.1), rgba(255,209,102,0.1));
    border: 1px solid rgba(0,229,255,0.2);
    border-radius: 2px;
    font-family: 'DM Mono', monospace;
    font-size: 0.85rem;
  }
  .grade-val {
    font-weight: 700;
    background: linear-gradient(90deg, var(--cyan), var(--gold));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 1rem;
  }

  /* CONTACT */
  .contact-wrap {
    max-width: 700px; margin: 0 auto; text-align: center;
  }
  .contact-card {
    margin-top: 3rem;
    padding: 3rem;
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 6px;
    position: relative; overflow: hidden;
  }
  .contact-card::before {
    content: '';
    position: absolute; top: 0; left: 50%; transform: translateX(-50%);
    width: 60%; height: 1px;
    background: linear-gradient(90deg, transparent, var(--cyan), transparent);
  }
  .contact-links {
    display: flex; justify-content: center; flex-wrap: wrap;
    gap: 1rem; margin-top: 2rem;
  }
  .contact-link {
    display: flex; align-items: center; gap: 0.6rem;
    padding: 0.8rem 1.5rem;
    border: 1px solid var(--border);
    border-radius: 3px;
    font-family: 'DM Mono', monospace;
    font-size: 0.8rem; color: var(--muted);
    text-decoration: none;
    transition: all 0.2s;
    background: var(--bg3);
  }
  .contact-link:hover {
    border-color: var(--cyan); color: var(--cyan);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0,229,255,0.1);
  }

  /* FOOTER */
  footer {
    text-align: center;
    padding: 2rem 4rem;
    border-top: 1px solid var(--border);
    font-family: 'DM Mono', monospace;
    font-size: 0.72rem; color: var(--muted);
  }
  footer span { color: var(--cyan); }

  /* ANIMATIONS */
  .fade-in {
    opacity: 0; transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .fade-in.visible {
    opacity: 1; transform: translateY(0);
  }

  /* MOBILE */
  @media (max-width: 768px) {
    .nav { padding: 1rem 1.5rem; }
    .nav-links { display: none; }
    section { padding: 4rem 1.5rem; }
    .hero { padding: 0 1.5rem; }
    .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
    .about-visual { display: none; }
    .projects-grid { grid-template-columns: 1fr; }
    .hero-name { font-size: 3rem; }
  }
`;

const useInView = (ref) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return visible;
};

const FadeIn = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const visible = useInView(ref);
  return (
    <div
      ref={ref}
      className={`fade-in ${visible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const projects = [
  {
    num: "01",
    title: "WeatherVerse",
    status: "live",
    visual: "weather",
    desc: "A dynamic weather application built with React that fetches real-time atmospheric data from OpenWeatherMap API. Features beautiful UI with location-based forecasts, hourly & 7-day predictions.",
    techs: ["React", "OpenWeatherMap API", "Axios", "CSS Modules", "Geolocation API"],
    features: [
      "Real-time weather via OpenWeatherMap REST API",
      "Search by city name or use current GPS location",
      "5-day forecast with hourly breakdown",
      "Dynamic backgrounds that change with weather conditions",
    ],
  },
  {
    num: "02",
    title: "TaskFlow",
    status: "live",
    visual: "todo",
    desc: "A full-featured task management system built with PHP Laravel. Includes user authentication, category management, priority levels, due dates, and a clean admin dashboard.",
    techs: ["PHP", "Laravel", "MySQL", "Blade Templates", "Bootstrap"],
    features: [
      "Laravel Breeze authentication with roles",
      "CRUD operations with soft deletes",
      "Priority & category filtering system",
      "Responsive Blade-powered dashboard",
    ],
  },
  {
    num: "03",
    title: "HireHub",
    status: "wip",
    visual: "job",
    desc: "A comprehensive job portal platform in active development using Laravel. Connecting employers and job seekers with advanced search, application tracking, and recruiter dashboards.",
    techs: ["Laravel", "MySQL", "Vue.js", "Livewire", "Tailwind CSS"],
    features: [
      "Multi-role auth: Employer, Job Seeker, Admin",
      "Advanced job search with filters & geolocation",
      "Resume builder & application tracker",
      "Real-time notifications via Laravel Echo (WIP)",
    ],
  },
];

const skills = [
  {
    icon: "⚛️",
    title: "Frontend",
    tags: [
      { label: "React.js", type: "" },
      { label: "HTML5", type: "" },
      { label: "CSS3", type: "" },
      { label: "JavaScript", type: "" },
      { label: "Tailwind", type: "" },
    ],
  },
  {
    icon: "🛠️",
    title: "Backend",
    tags: [
      { label: "PHP", type: "gold" },
      { label: "Laravel", type: "gold" },
      { label: "REST APIs", type: "gold" },
      { label: "MySQL", type: "gold" },
    ],
  },
  {
    icon: "🗄️",
    title: "Database & Tools",
    tags: [
      { label: "MySQL", type: "rose" },
      { label: "Git", type: "rose" },
      { label: "GitHub", type: "rose" },
      { label: "Postman", type: "rose" },
      { label: "VS Code", type: "rose" },
    ],
  },
  {
    icon: "🌐",
    title: "Concepts",
    tags: [
      { label: "MVC Pattern", type: "" },
      { label: "RESTful APIs", type: "" },
      { label: "Responsive Design", type: "" },
      { label: "OOP", type: "" },
    ],
  },
];

const education = [
  {
    year: "2021 — Present",
    degree: "B.Tech — Computer Science & Engineering",
    school: "IMS Engineering College, Ghaziabad (AKTU)",
    grade: "9.0 CGPA",
    gradeLabel: "Current CGPA",
  },
  {
    year: "2021",
    degree: "Class 12th — Science (PCM + CS)",
    school: "UP Board",
    grade: "85%",
    gradeLabel: "Percentage",
  },
];

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handler = () => {
      const sections = ["home", "about", "skills", "projects", "education", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <style>{style}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">
          Dev<span>.</span>Portfolio
        </div>
        <ul className="nav-links">
          {["Home", "About", "Skills", "Projects", "Education", "Contact"].map((n) => (
            <li key={n}>
              <a href={`#${n.toLowerCase()}`}
                style={{ color: activeSection === n.toLowerCase() ? "var(--cyan)" : "" }}
              >{n}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="hero-grid" />
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-content">
          <div className="hero-tag">
            <span className="hero-tag-dot" />
            Available for Opportunities
          </div>
          <h1 className="hero-name">
            <div className="line1">Full Stack</div>
            <div className="line2">Developer</div>
          </h1>
          <p className="hero-role">
            React · Laravel · PHP · MySQL{" "}
            <span>// Building digital experiences</span>
          </p>
          <p className="hero-desc">
            Passionate Computer Science student at IMS Engineering College with a 9.0 CGPA, crafting
            modern web applications that blend clean code with compelling user experiences.
          </p>
          <div className="hero-btns">
            <a href="#projects" className="btn-primary">View Projects →</a>
            <a href="#contact" className="btn-outline">Get In Touch</a>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line" />
          Scroll
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="about-grid">
          <div>
            <FadeIn>
              <div className="section-label">About Me</div>
              <h2 className="section-title">Crafting Code,<br />Creating Impact</h2>
              <p style={{ color: "var(--muted)", lineHeight: "1.85", marginBottom: "1rem" }}>
                I'm a final-year B.Tech CSE student with a deep passion for full-stack web development.
                I love turning complex problems into elegant, performant digital solutions — from
                pixel-perfect frontends in React to robust backends with Laravel.
              </p>
              <p style={{ color: "var(--muted)", lineHeight: "1.85" }}>
                Currently building <strong style={{ color: "var(--gold)" }}>HireHub</strong> — a
                full-featured job portal — while maintaining a strong academic record with a 9.0 CGPA.
              </p>
            </FadeIn>
            <div className="about-stats">
              {[
                { num: "9.0", label: "CGPA at IMS Engg. College" },
                { num: "85%", label: "12th Grade Score" },
                { num: "3+", label: "Projects Built" },
                { num: "2+", label: "Years Coding" },
              ].map((s, i) => (
                <FadeIn key={i} delay={i * 100}>
                  <div className="stat-card">
                    <div className="stat-num">{s.num}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
          <FadeIn delay={200}>
            <div className="about-visual">
              <div className="about-avatar">
                <div className="avatar-corner tl" />
                <div className="avatar-corner tr" />
                <div className="avatar-corner bl" />
                <div className="avatar-corner br" />
                <pre className="avatar-code">{`<span class="kw">const</span> developer = {
  <span class="fn">name</span>: <span class="str">"Your Name"</span>,
  <span class="fn">role</span>: <span class="str">"Full Stack Dev"</span>,
  <span class="fn">cgpa</span>: <span class="str">9.0</span>,
  <span class="fn">stack</span>: [
    <span class="str">"React"</span>, <span class="str">"Laravel"</span>,
    <span class="str">"PHP"</span>, <span class="str">"MySQL"</span>
  ],
  <span class="fn">status</span>: <span class="str">"Hiring Ready ✓"</span>
}`}
                </pre>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="skills-section">
        <FadeIn>
          <div className="section-label">Tech Stack</div>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-sub">
            A curated set of tools I use to build fast, scalable, and beautiful web applications.
          </p>
        </FadeIn>
        <div className="skills-grid">
          {skills.map((cat, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="skill-cat">
                <div className="skill-cat-icon">{cat.icon}</div>
                <div className="skill-cat-title">{cat.title}</div>
                <div className="skill-tags">
                  {cat.tags.map((t, j) => (
                    <span key={j} className={`skill-tag ${t.type}`}>{t.label}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <FadeIn>
          <div className="section-label">Work</div>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-sub">
            Real-world applications built with industry-standard technologies — from API-driven
            React apps to full Laravel platforms.
          </p>
        </FadeIn>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <FadeIn key={i} delay={i * 120}>
              <div className="project-card">
                {/* Visual Banner */}
                <div className={`project-visual pv-${p.visual}`}>
                  {p.visual === "weather" && (
                    <>
                      <div className="orbit-ring" style={{ width: 140, height: 140, borderColor: "var(--cyan)" }} />
                      <div className="orbit-ring" style={{ width: 100, height: 100, borderColor: "var(--gold)", animationDuration: "7s", animationDirection: "reverse" }} />
                      <span style={{ fontSize: "3.5rem", position: "relative", zIndex: 1 }}>🌤️</span>
                    </>
                  )}
                  {p.visual === "todo" && (
                    <>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", padding: "1rem" }}>
                        {["Design homepage", "Build API routes", "Write tests"].map((t, idx) => (
                          <div key={idx} style={{
                            display: "flex", alignItems: "center", gap: "0.6rem",
                            padding: "0.4rem 0.8rem",
                            background: "rgba(255,107,157,0.08)",
                            border: "1px solid rgba(255,107,157,0.2)",
                            borderRadius: "3px", fontSize: "0.72rem",
                            fontFamily: "DM Mono, monospace",
                            color: idx < 2 ? "var(--muted)" : "var(--rose)"
                          }}>
                            <span style={{ color: idx < 2 ? "var(--rose)" : "var(--gold)" }}>{idx < 2 ? "✓" : "○"}</span>
                            <span style={{ textDecoration: idx < 2 ? "line-through" : "none", opacity: idx < 2 ? 0.5 : 1 }}>{t}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  {p.visual === "job" && (
                    <>
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>💼</div>
                        <div style={{ fontFamily: "DM Mono, monospace", fontSize: "0.7rem", color: "var(--gold)", letterSpacing: "2px" }}>IN PROGRESS</div>
                        <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.4rem", justifyContent: "center" }}>
                          {[1, 2, 3].map(d => (
                            <div key={d} style={{
                              width: "6px", height: "6px", borderRadius: "50%",
                              background: "var(--gold)", opacity: 0.3 + d * 0.25,
                              animation: `pulse ${d * 0.5 + 1}s infinite`
                            }} />
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Card Content */}
                <div className="project-header">
                  <div className="project-num">{p.num} / 03</div>
                  <div className="project-title">{p.title}</div>
                  <div className={`project-status ${p.status === "live" ? "status-live" : "status-wip"}`}>
                    <span className="status-dot" />
                    {p.status === "live" ? "Complete" : "In Progress"}
                  </div>
                </div>

                <div className="project-body">
                  <p className="project-desc">{p.desc}</p>
                  <div className="project-techs">
                    {p.techs.map((t, j) => (
                      <span key={j} className="tech-badge">{t}</span>
                    ))}
                  </div>
                  <div className="project-features">
                    {p.features.map((f, j) => (
                      <div key={j} className="feature-item">
                        <span className="feature-icon">▸</span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="education-section">
        <FadeIn>
          <div className="section-label">Education</div>
          <h2 className="section-title">Academic Background</h2>
          <p className="section-sub">
            Strong academic foundation with consistent high performance across both school and college.
          </p>
        </FadeIn>
        <div className="edu-timeline">
          {education.map((e, i) => (
            <FadeIn key={i} delay={i * 150}>
              <div className="edu-item">
                <div className="edu-dot" />
                <div className="edu-year">{e.year}</div>
                <div className="edu-degree">{e.degree}</div>
                <div className="edu-school">{e.school}</div>
                <div className="edu-grade">
                  <span className="grade-val">{e.grade}</span>
                  <span style={{ color: "var(--muted)", fontSize: "0.75rem" }}>{e.gradeLabel}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <FadeIn>
          <div className="contact-wrap">
            <div className="section-label" style={{ justifyContent: "center" }}>Contact</div>
            <h2 className="section-title" style={{ textAlign: "center" }}>
              Let's Build Something<br />
              <span style={{
                background: "linear-gradient(90deg, var(--cyan), var(--gold))",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>Together</span>
            </h2>
            <p style={{ color: "var(--muted)", lineHeight: "1.8", textAlign: "center" }}>
              I'm actively looking for internships and full-time opportunities. Whether you have a
              project, an idea, or just want to connect — my inbox is always open.
            </p>
            <div className="contact-card">
              <p style={{ color: "var(--muted)", marginBottom: "0.5rem", fontFamily: "DM Mono, monospace", fontSize: "0.75rem", letterSpacing: "1px" }}>
                REACH OUT VIA
              </p>
              <div className="contact-links">
                <a href="mailto:chauhandivya2204@gmail.com" className="contact-link">
                  ✉️ chauhandivya2204@gmail.com
                </a>
                <a href="https://github.com/divyachauhan11" className="contact-link" target="_blank" rel="noreferrer">
                  🐙 GitHub
                </a>
                <a href="https://linkedin.com/in/divya-chauhan-336919290/" className="contact-link" target="_blank" rel="noreferrer">
                  💼 LinkedIn
                </a>
              </div>
              <div style={{ marginTop: "2rem" }}>
                <a href="mailto:chauhandivya2204@gmail.com" className="btn-primary">
                  Send Message →
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* FOOTER */}
      <footer>
        Designed & Built with <span>♥</span> · Full Stack Developer · IMS Engineering College · CGPA <span>9.0</span>
      </footer>
    </>
  );
}