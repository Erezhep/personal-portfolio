import { useState, useEffect, useRef } from "react";
import profileImage from "./assets/profile.jpg";

const tokens = {
  bg0: "#080c10",
  bg1: "#0d1117",
  bg2: "#121920",
  bg3: "#1a2332",
  border: "rgba(0,220,180,0.12)",
  borderHover: "rgba(0,220,180,0.28)",
  cyan: "#00ddb4",
  cyanGlow: "rgba(0,221,180,0.18)",
  text: "#e8edf3",
  textMuted: "#7a8fa6",
  textFaint: "#3d5066",
};

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  body {
    background: ${tokens.bg0};
    color: ${tokens.text};
    font-family: 'DM Sans', sans-serif;
    font-size: 16px;
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
  }

  a { color: inherit; text-decoration: none; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${tokens.bg0}; }
  ::-webkit-scrollbar-thumb { background: ${tokens.textFaint}; border-radius: 2px; }

  .font-display { font-family: 'Syne', sans-serif; }
  .font-mono { font-family: 'JetBrains Mono', monospace; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .fade-up { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
  .fade-in { animation: fadeIn 0.6s ease both; }

  .nav-link {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    color: ${tokens.textMuted};
    letter-spacing: 0.06em;
    position: relative;
    transition: color 0.2s;
  }

  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0; right: 0;
    height: 1px;
    background: ${tokens.cyan};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.25s ease;
  }

  .nav-link:hover { color: ${tokens.cyan}; }
  .nav-link:hover::after { transform: scaleX(1); }

  .stat-card {
    background: ${tokens.bg2};
    border: 1px solid ${tokens.border};
    border-radius: 12px;
    padding: 1.5rem;
    transition: border-color 0.25s, transform 0.25s;
    cursor: default;
  }

  .stat-card:hover {
    border-color: ${tokens.borderHover};
    transform: translateY(-3px);
  }

  .project-card {
    background: ${tokens.bg2};
    border: 1px solid ${tokens.border};
    border-radius: 14px;
    padding: 1.75rem;
    transition: border-color 0.3s, transform 0.3s, background 0.3s;
    position: relative;
    overflow: hidden;
  }

  .project-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, ${tokens.cyan}, transparent);
    transform: scaleX(0);
    transition: transform 0.4s ease;
  }

  .project-card:hover {
    border-color: ${tokens.borderHover};
    transform: translateY(-5px);
    background: ${tokens.bg3};
  }

  .project-card:hover::before { transform: scaleX(1); }

  .skill-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(0,221,180,0.06);
    border: 1px solid rgba(0,221,180,0.15);
    border-radius: 6px;
    padding: 6px 14px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    color: ${tokens.cyan};
    letter-spacing: 0.03em;
    transition: background 0.2s, border-color 0.2s;
  }

  .skill-badge:hover {
    background: rgba(0,221,180,0.12);
    border-color: rgba(0,221,180,0.35);
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: ${tokens.cyan};
    color: ${tokens.bg0};
    font-family: 'Syne', sans-serif;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.04em;
    padding: 12px 28px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.2s;
  }

  .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }

  .btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    color: ${tokens.cyan};
    font-family: 'Syne', sans-serif;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.04em;
    padding: 11px 28px;
    border-radius: 8px;
    border: 1px solid rgba(0,221,180,0.35);
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s, transform 0.2s;
  }

  .btn-outline:hover {
    background: rgba(0,221,180,0.08);
    border-color: ${tokens.cyan};
    transform: translateY(-1px);
  }

  .section-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${tokens.cyan};
  }

  .timeline-item { position: relative; padding-left: 2rem; }

  .timeline-item::before {
    content: '';
    position: absolute;
    left: 0; top: 6px;
    width: 8px; height: 8px;
    border-radius: 50%;
    background: ${tokens.cyan};
    box-shadow: 0 0 0 3px rgba(0,221,180,0.15);
  }

  .timeline-item::after {
    content: '';
    position: absolute;
    left: 3.5px; top: 18px; bottom: -1.5rem;
    width: 1px;
    background: ${tokens.border};
  }

  .timeline-item:last-child::after { display: none; }

  .grid-bg {
    background-image:
      linear-gradient(rgba(0,221,180,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,221,180,0.03) 1px, transparent 1px);
    background-size: 48px 48px;
  }

  @media (max-width: 768px) {
    .hide-mobile { display: none !important; }
  }
`;

function SectionWrapper({ id, children, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      style={{
        padding: "6rem 0",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition:
          "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

function Container({ children, style = {} }) {
  return (
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 1.5rem", ...style }}>
      {children}
    </div>
  );
}

function SectionHeader({ label, title, subtitle }) {
  return (
    <div style={{ marginBottom: "3.5rem" }}>
      <span className="section-label">{label}</span>
      <h2
        className="font-display"
        style={{
          fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
          fontWeight: 700,
          marginTop: "0.6rem",
          lineHeight: 1.15,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p style={{ color: tokens.textMuted, marginTop: "0.75rem", maxWidth: 560, fontSize: "1.05rem" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const links = ["About", "Experience", "Projects", "Skills", "Contact"];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(8,12,16,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${tokens.border}` : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <Container>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <span className="font-mono" style={{ fontSize: 13, color: tokens.cyan, letterSpacing: "0.1em" }}>
            BE<span style={{ color: tokens.textMuted }}>/</span>ML
          </span>

          <div className="hide-mobile" style={{ display: "flex", gap: "2rem" }}>
            {links.map((l) => (
              <button
                key={l}
                className="nav-link"
                onClick={() => scrollTo(l)}
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                {l}
              </button>
            ))}
          </div>

          <a
            href="https://www.linkedin.com/in/bekarys-erezhep-b21786267"
            target="_blank"
            rel="noreferrer"
            className="btn-outline hide-mobile"
            style={{ padding: "8px 20px", fontSize: 12 }}
          >
            LinkedIn
          </a>
        </div>
      </Container>
    </nav>
  );
}

function Hero() {
  const [tick, setTick] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setTick((v) => !v), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="hero"
      className="grid-bg"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: 64,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 400,
          background: "radial-gradient(ellipse, rgba(0,221,180,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Container>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(0,221,180,0.07)",
                border: `1px solid ${tokens.border}`,
                borderRadius: 24,
                padding: "6px 16px",
                marginBottom: "2rem",
                animation: "fadeIn 0.5s ease both",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: tokens.cyan,
                  boxShadow: `0 0 6px ${tokens.cyan}`,
                  display: "inline-block",
                }}
              />
              <span className="font-mono" style={{ fontSize: 11, color: tokens.cyan, letterSpacing: "0.1em" }}>
                OPEN TO OPPORTUNITIES
              </span>
            </div>

            <h1
              className="font-display fade-up"
              style={{
                fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                animationDelay: "0.1s",
              }}
            >
              Bekarys
              <br />
              <span
                style={{
                  background: `linear-gradient(135deg, ${tokens.cyan} 0%, #00b4d8 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Erezhep
              </span>
            </h1>

            <div
              className="font-mono fade-up"
              style={{
                fontSize: "clamp(0.85rem, 2vw, 1rem)",
                color: tokens.textMuted,
                marginTop: "1.2rem",
                animationDelay: "0.2s",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span style={{ color: tokens.textFaint }}>$</span>&nbsp;
              <span>Machine Learning</span>
              <span style={{ color: tokens.textFaint }}> /</span>
              <span> Computer Vision</span>
              <span style={{ color: tokens.textFaint }}> /</span>
              <span> Python</span>
              <span
                style={{
                  display: "inline-block",
                  width: 2,
                  height: "1.1em",
                  background: tokens.cyan,
                  marginLeft: 4,
                  opacity: tick ? 1 : 0,
                  transition: "opacity 0.1s",
                }}
              />
            </div>

            <p
              className="fade-up"
              style={{
                color: tokens.textMuted,
                maxWidth: 520,
                marginTop: "1.5rem",
                fontSize: "1.05rem",
                lineHeight: 1.75,
                animationDelay: "0.3s",
              }}
            >
              Python developer specializing in Machine Learning and Computer Vision.
              Building practical AI solutions — from satellite image segmentation
              to predictive modeling and data-driven applications.
            </p>

            <div
              className="fade-up"
              style={{ display: "flex", gap: "1rem", marginTop: "2.5rem", flexWrap: "wrap", animationDelay: "0.4s" }}
            >
              <a href="#projects" className="btn-primary">
                View Projects →
              </a>
              <a href="#contact" className="btn-outline">
                Contact Me
              </a>
            </div>

            <div
              className="fade-up"
              style={{ display: "flex", gap: "1.5rem", marginTop: "2.5rem", animationDelay: "0.5s" }}
            >
              {[
                { label: "GitHub", href: "https://github.com/Erezhep", icon: "GH" },
                { label: "Email", href: "mailto:bekaryserezep05@gmail.com", icon: "✉" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/bekarys-erezhep-b21786267", icon: "in" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  style={{
                    color: tokens.textMuted,
                    fontSize: 13,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = tokens.cyan)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = tokens.textMuted)}
                >
                  <span className="font-mono" style={{ fontSize: 11, opacity: 0.6 }}>
                    {s.icon}
                  </span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="hide-mobile" style={{ position: "relative" }}>
            <div style={{ position: "relative", width: 260, height: 260 }}>
              <div
                style={{
                  position: "absolute",
                  inset: -12,
                  borderRadius: "50%",
                  border: `1px solid ${tokens.border}`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: -24,
                  borderRadius: "50%",
                  border: `1px dashed ${tokens.textFaint}`,
                }}
              />

              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${tokens.bg3} 0%, #1e3045 100%)`,
                  border: `2px solid ${tokens.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: `0 0 40px ${tokens.cyanGlow}`,
                }}
              >
                <img
                  src={profileImage}
                  alt="Bekarys Erezhep"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 40%",
                    filter: "contrast(1.03) saturate(0.95)",
                  }}
                />
              </div>

              <FloatingBadge top={-10} right={-20} delay="0.6s">
                PyTorch
              </FloatingBadge>
              <FloatingBadge bottom={20} left={-30} delay="0.9s">
                CV
              </FloatingBadge>
              <FloatingBadge bottom={-10} right={10} delay="1.2s">
                Deep Learning
              </FloatingBadge>
            </div>
          </div>
        </div>

        <StatsRow />
      </Container>
    </section>
  );
}

function FloatingBadge({ children, top, bottom, left, right, delay }) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        bottom,
        left,
        right,
        background: tokens.bg2,
        border: `1px solid ${tokens.border}`,
        borderRadius: 8,
        padding: "6px 12px",
        fontSize: 11,
        fontFamily: "'JetBrains Mono', monospace",
        color: tokens.cyan,
        animation: `fadeIn 0.5s ease ${delay} both`,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  );
}

function StatsRow() {
  const stats = [
    { value: "3.64", label: "GPA / 4.00", sub: "Astana Int'l University" },
    { value: "2025", label: "Best Student", sub: "AIU-Fest Award" },
    { value: "390h", label: "ML Program", sub: "Tech Orda Certified" },
    { value: "5+", label: "Projects", sub: "ML & Computer Vision" },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1rem",
        marginTop: "4rem",
        paddingTop: "3rem",
        borderTop: `1px solid ${tokens.border}`,
      }}
    >
      {stats.map((s) => (
        <div key={s.label} className="stat-card" style={{ textAlign: "center" }}>
          <div className="font-display" style={{ fontSize: "2rem", fontWeight: 800, color: tokens.cyan, lineHeight: 1 }}>
            {s.value}
          </div>
          <div style={{ fontWeight: 500, marginTop: 6, fontSize: 14 }}>{s.label}</div>
          <div style={{ fontSize: 12, color: tokens.textMuted, marginTop: 2 }}>{s.sub}</div>
        </div>
      ))}
    </div>
  );
}

function About() {
  const achievements = [
    { icon: "🏆", title: "Best Student of AIU-Fest 2025", desc: "University-wide recognition for academic and project excellence" },
    { icon: "🥉", title: "3rd Place — Republican Olympiad", desc: "Subject Olympiad, national level competition" },
    { icon: "🤖", title: "Tech Orda ML Program", desc: "390-hour intensive machine learning certification" },
    { icon: "📡", title: "Bachelor's Thesis", desc: "Urban Area Segmentation from Satellite Imagery using Deep Learning" },
  ];

  return (
    <SectionWrapper id="about">
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
          <div>
            <SectionHeader
              label="// about me"
              title={
                <>
                  Turning raw data into
                  <br />
                  <span style={{ color: tokens.cyan }}>intelligent systems</span>
                </>
              }
            />
            <p style={{ color: tokens.textMuted, lineHeight: 1.9, marginBottom: "1.5rem" }}>
              I'm a final-year Information Technology student at Astana International University,
              specializing in Machine Learning and Computer Vision. My work centers on practical
              AI — building models that solve real problems.
            </p>
            <p style={{ color: tokens.textMuted, lineHeight: 1.9, marginBottom: "2rem" }}>
              My thesis project applies hybrid U-Net and DeepLab-inspired architectures
              to segment urban areas from satellite imagery — a challenge at the intersection
              of deep learning, geospatial analysis, and real-world impact.
            </p>

            <div
              style={{
                background: tokens.bg2,
                border: `1px solid ${tokens.border}`,
                borderRadius: 12,
                padding: "1.25rem 1.5rem",
              }}
            >
              <div className="section-label" style={{ marginBottom: "1rem" }}>
                Education
              </div>
              <div className="font-display" style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                Astana International University
              </div>
              <div style={{ color: tokens.textMuted, fontSize: 14, marginTop: 4 }}>
                Bachelor of Information Technology · 2022–2026
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: "0.75rem",
                  background: "rgba(0,221,180,0.07)",
                  border: `1px solid ${tokens.border}`,
                  borderRadius: 6,
                  padding: "4px 12px",
                }}
              >
                <span className="font-mono" style={{ fontSize: 12, color: tokens.cyan }}>
                  GPA: 3.64 / 4.00
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="section-label" style={{ marginBottom: "1.5rem" }}>
              Achievements
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {achievements.map((a) => (
                <div
                  key={a.title}
                  style={{
                    display: "flex",
                    gap: "1rem",
                    background: tokens.bg2,
                    border: `1px solid ${tokens.border}`,
                    borderRadius: 10,
                    padding: "1rem 1.25rem",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = tokens.borderHover)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = tokens.border)}
                >
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{a.icon}</span>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 14 }}>{a.title}</div>
                    <div style={{ color: tokens.textMuted, fontSize: 13, marginTop: 2 }}>{a.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}

function Experience() {
  const experiences = [
    {
      role: "Machine Learning Intern",
      company: "ITechResearch · Astana Hub",
      period: "Jan 2026 – May 2026",
      type: "Industry",
      points: [
        "Developed and evaluated ML models in Python using Scikit-learn",
        "Applied classification, regression, and ensemble learning techniques",
        "Conducted feature engineering and model evaluation",
        "Built practical machine learning projects and predictive models",
      ],
    },
    {
      role: "Mathematics Teacher",
      company: "AIPLUS",
      period: "Nov 2024 – Present",
      type: "Teaching",
      points: [
        "Teaching mathematics and preparing students for UNT examinations",
        "Developing analytical and logical thinking in students",
        "Creating personalized learning plans based on student performance",
        "Adapting complex quantitative concepts into accessible explanations",
      ],
    },
  ];

  return (
    <SectionWrapper id="experience" style={{ background: tokens.bg1 }}>
      <Container>
        <SectionHeader
          label="// experience"
          title="Where I've worked"
          subtitle="Professional experience in machine learning, mathematics, and applied problem-solving."
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {experiences.map((exp, i) => (
            <div key={i} className="timeline-item">
              <div
                style={{
                  background: tokens.bg2,
                  border: `1px solid ${tokens.border}`,
                  borderRadius: 14,
                  padding: "1.75rem 2rem",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = tokens.borderHover)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = tokens.border)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem" }}>
                  <div>
                    <h3 className="font-display" style={{ fontWeight: 700, fontSize: "1.15rem" }}>
                      {exp.role}
                    </h3>
                    <div style={{ color: tokens.cyan, fontSize: 13, marginTop: 3, fontFamily: "'JetBrains Mono', monospace" }}>
                      {exp.company}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span
                      style={{
                        background: "rgba(0,221,180,0.07)",
                        border: `1px solid ${tokens.border}`,
                        borderRadius: 4,
                        padding: "3px 10px",
                        fontSize: 11,
                        color: tokens.textMuted,
                        fontFamily: "'JetBrains Mono', monospace",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {exp.type}
                    </span>
                    <span style={{ color: tokens.textFaint, fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>
                      {exp.period}
                    </span>
                  </div>
                </div>

                <ul style={{ marginTop: "1.25rem", paddingLeft: "1rem", display: "flex", flexDirection: "column", gap: 8 }}>
                  {exp.points.map((p, j) => (
                    <li key={j} style={{ color: tokens.textMuted, fontSize: 14, lineHeight: 1.6, listStyle: "none", paddingLeft: "1rem", position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: tokens.cyan, opacity: 0.6 }}>›</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}

function Projects() {
  const projects = [
    {
      title: "Satellite Image Segmentation",
      description:
        "Deep learning project for urban area segmentation from satellite imagery using hybrid U-Net and DeepLab-inspired architectures.",
      tags: ["PyTorch", "U-Net", "DeepLab", "Computer Vision", "Satellite"],
      github: "https://github.com/Erezhep/satellite-image-segmentation",
      featured: true,
      icon: "🛰️",
    },
    {
      title: "FLL Schedule Optimizer",
      description:
        "Web application for automated competition schedule generation with constraint handling and conflict resolution.",
      tags: ["Python", "Flask", "Optimization", "Web App"],
      github: "https://github.com/Erezhep/fll-schedule-optimizer",
      featured: false,
      icon: "📅",
    },
    {
      title: "House Price Prediction",
      description:
        "Machine learning project for house price estimation using regression models and feature engineering.",
      tags: ["Scikit-learn", "Regression", "Pandas", "NumPy"],
      github: "https://github.com/Erezhep/house-price-prediction",
      featured: false,
      icon: "🏠",
    },
    {
      title: "ML Projects Collection",
      description:
        "Collection of machine learning projects covering classification, regression, and ensemble methods.",
      tags: ["Scikit-learn", "Classification", "Ensemble", "Python"],
      github: "https://github.com/Erezhep/ML-Projects",
      featured: false,
      icon: "🗂️",
    },
  ];

  return (
    <SectionWrapper id="projects">
      <Container>
        <SectionHeader
          label="// projects"
          title="Things I've built"
          subtitle="A selection of ML and Computer Vision projects — from satellite imagery to predictive modeling."
        />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {projects.map((p) => (
            <div key={p.title} className="project-card" style={p.featured ? { gridColumn: "span 2", display: "flex", gap: "2rem", alignItems: "flex-start" } : {}}>
              {p.featured && (
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    background: "rgba(0,221,180,0.1)",
                    border: `1px solid rgba(0,221,180,0.3)`,
                    borderRadius: 4,
                    padding: "3px 10px",
                    fontSize: 10,
                    color: tokens.cyan,
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: "0.1em",
                  }}
                >
                  FEATURED
                </div>
              )}

              <div style={{ fontSize: p.featured ? 40 : 28, flexShrink: 0 }}>{p.icon}</div>

              <div style={{ flex: 1 }}>
                <h3 className="font-display" style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.5rem" }}>
                  {p.title}
                </h3>
                <p style={{ color: tokens.textMuted, fontSize: 14, lineHeight: 1.7, marginBottom: "1.25rem" }}>
                  {p.description}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "1.5rem" }}>
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: `1px solid ${tokens.border}`,
                        borderRadius: 4,
                        padding: "3px 10px",
                        fontSize: 11,
                        color: tokens.textMuted,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    color: tokens.cyan,
                    fontSize: 13,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  View on GitHub ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}

function Skills() {
  const categories = [
    {
      name: "ML / AI",
      skills: ["Machine Learning", "Deep Learning", "Computer Vision", "Neural Networks", "Image Segmentation"],
    },
    {
      name: "Frameworks",
      skills: ["PyTorch", "Scikit-learn", "Flask", "Pandas", "NumPy"],
    },
    {
      name: "Engineering",
      skills: ["Python", "SQL", "Docker", "Git", "Linux"],
    },
  ];

  return (
    <SectionWrapper id="skills" style={{ background: tokens.bg1 }}>
      <Container>
        <SectionHeader
          label="// skills"
          title="Technical stack"
          subtitle="Tools and technologies I use to build ML and Python systems."
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {categories.map((cat) => (
            <div key={cat.name}>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: tokens.textFaint,
                  letterSpacing: "0.12em",
                  marginBottom: "1rem",
                }}
              >
                {cat.name}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                {cat.skills.map((s) => (
                  <span key={s} className="skill-badge">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}

function Contact() {
  const contacts = [
    {
      label: "Email",
      value: "bekaryserezep05@gmail.com",
      href: "mailto:bekaryserezep05@gmail.com",
      icon: "✉",
    },
    {
      label: "GitHub",
      value: "github.com/Erezhep",
      href: "https://github.com/Erezhep",
      icon: "GH",
    },
    {
      label: "LinkedIn",
      value: "bekarys-erezhep",
      href: "https://www.linkedin.com/in/bekarys-erezhep-b21786267",
      icon: "in",
    },
    {
      label: "Telegram",
      value: "@Bekarys_Askaruly",
      href: "https://t.me/Bekarys_Askaruly",
      icon: "TG",
    },
  ];

  return (
    <SectionWrapper id="contact">
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
          <div>
            <SectionHeader
              label="// contact"
              title={
                <>
                  Let's build something
                  <br />
                  <span style={{ color: tokens.cyan }}>together</span>
                </>
              }
            />

            <p style={{ color: tokens.textMuted, lineHeight: 1.8, marginBottom: "2rem" }}>
              I am open to ML internships, junior opportunities, and research collaborations
              in Machine Learning, Computer Vision, and Python development.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {contacts.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    background: tokens.bg2,
                    border: `1px solid ${tokens.border}`,
                    borderRadius: 10,
                    padding: "1rem 1.25rem",
                    transition: "border-color 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = tokens.borderHover;
                    e.currentTarget.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = tokens.border;
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <span className="font-mono" style={{ fontSize: 14, color: tokens.cyan, minWidth: 24 }}>
                    {c.icon}
                  </span>
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        color: tokens.textFaint,
                        fontFamily: "'JetBrains Mono', monospace",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {c.label}
                    </div>
                    <div style={{ fontSize: 14, marginTop: 2 }}>{c.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div
            style={{
              background: tokens.bg2,
              border: `1px solid ${tokens.border}`,
              borderRadius: 16,
              padding: "2rem",
            }}
          >
            <div className="section-label" style={{ marginBottom: "1rem" }}>
              Availability
            </div>

            <h3 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700 }}>
              Open to opportunities
            </h3>

            <ul style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.8rem", color: tokens.textMuted }}>
              <li>› Data Analyst</li>
              <li>› Junior ML Engineer</li>
              <li>› Computer Vision Projects</li>
              <li>› Python Development</li>
            </ul>

            <div style={{ marginTop: "2rem", color: tokens.textMuted, fontSize: 14 }}>
              Location: Astana, Kazakhstan
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${tokens.border}`, padding: "2rem 0", background: tokens.bg0 }}>
      <Container>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <span className="font-mono" style={{ fontSize: 12, color: tokens.textFaint }}>
            © 2026 Bekarys Erezhep · ML & Computer Vision
          </span>

          <div style={{ display: "flex", gap: "1.5rem" }}>
            {[
              { label: "GitHub", href: "https://github.com/Erezhep" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/bekarys-erezhep-b21786267" },
              { label: "Email", href: "mailto:bekaryserezep05@gmail.com" },
              { label: "Telegram", href: "https://t.me/your_username" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="nav-link"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.textContent = GLOBAL_CSS;
    document.head.appendChild(styleTag);
    return () => document.head.removeChild(styleTag);
  }, []);

  return (
    <div style={{ background: tokens.bg0, minHeight: "100vh" }}>
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}
