import { TiltCard } from "./TiltCard";
import "./About.css";

export function About() {
  const highlights = [
    {
      title: "Strong CS Fundamentals",
      description: "Data Structures & Algorithms, OOP, System Design, Operating Systems, DBMS, and Computer Networks.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      ),
    },
    {
      title: "Competitive Problem Solver",
      description: "500+ problems solved on LeetCode with strong algorithmic optimization skills. 2-Star on CodeChef (Rating: 1552).",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="7"></circle>
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
        </svg>
      ),
    },
    {
      title: "Full-Stack & Microservices",
      description: "Hands-on engineering across Spring Boot, Next.js, Node.js, Express, WebRTC, Socket.IO, PostgreSQL, and AWS.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
          <line x1="6" y1="6" x2="6.01" y2="6"></line>
          <line x1="6" y1="18" x2="6.01" y2="18"></line>
        </svg>
      ),
    },
    {
      title: "Industry Best Practices",
      description: "Secure coding, unit & integration testing, HMAC webhooks, session auth, Agile/Scrum, and documentation.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      ),
    },
  ];

  return (
    <section id="about" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">About Me</span>
          <h2 className="section-title">Engineering Reliable & Scalable Systems</h2>
          <p className="section-desc">
            B.Tech Information Technology student at Walchand College of Engineering, Sangli.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-bio-card">
            <h3 className="about-bio-title">Hello! I'm Shreyas Kamble</h3>
            <p className="about-text">
              I am an Information Technology undergraduate at <strong>Walchand College of Engineering, Sangli</strong> (Aug 2022 – Jun 2026, CGPA: 7.6).
              I have practical experience building enterprise-grade applications using <strong>Java, Spring Boot, Next.js, Node.js, PostgreSQL, and AWS</strong>.
            </p>
            <p className="about-text">
              From architecting multi-tier RBAC marketplaces and telemedicine platforms with WebRTC video calling, to building microservices and AI-powered RAG chatbots,
              I focus on clean code, system performance, and robust security practices.
            </p>

            <div className="about-info-list">
              <div className="info-item">
                <span className="info-label">Education:</span>
                <span className="info-value">B.Tech IT, WCE Sangli</span>
              </div>
              <div className="info-item">
                <span className="info-label">Batch:</span>
                <span className="info-value">2022 – 2026 (CGPA 7.6)</span>
              </div>
              <div className="info-item">
                <span className="info-label">Location:</span>
                <span className="info-value">Sangli, Maharashtra, India</span>
              </div>
              <div className="info-item">
                <span className="info-label">Availability:</span>
                <span className="info-value highlight-avail">Open for SDE / Internships</span>
              </div>
            </div>

            <div className="about-cta">
              <a href="#experience" className="btn btn-primary btn-sm">
                View Experience
              </a>
              <a href="#contact" className="btn btn-secondary btn-sm" style={{ marginLeft: "12px" }}>
                Contact Me
              </a>
            </div>
          </div>

          <div className="about-highlights-grid">
            {highlights.map((item, index) => (
              <TiltCard key={index} maxTilt={10}>
                <div className="highlight-card">
                  <div className="highlight-icon">{item.icon}</div>
                  <h4 className="highlight-title">{item.title}</h4>
                  <p className="highlight-desc">{item.description}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
