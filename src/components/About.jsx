import { TiltCard } from "./TiltCard";
import "./About.css";

export function About() {
  const highlights = [
    {
      title: "Rapid Time-to-Market",
      description: "Ship functional MVPs and product features fast, helping you test ideas and onboard users without technical debt.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      ),
    },
    {
      title: "High-Converting Responsive UX",
      description: "Mobile-first, lightning-fast interfaces with modern aesthetics, tailored to keep users engaged and boost conversion rates.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="18" x2="12.01" y2="18"></line>
        </svg>
      ),
    },
    {
      title: "Production Security & Scale",
      description: "Battle-tested backend engineering with Spring Boot, Next.js, Stripe payments, RBAC auth, and scalable AWS cloud infrastructure.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      ),
    },
    {
      title: "Direct & Transparent Collaboration",
      description: "Clear milestone-based delivery, constant communication via WhatsApp/Slack, and thorough technical documentation.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
    },
  ];

  return (
    <section id="about" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Client Value & Philosophy</span>
          <h2 className="section-title">Why Work With Me? Building Products That Grow.</h2>
          <p className="section-desc">
            Full-stack technical ownership, rapid milestone-driven delivery, and dependable results for founders and businesses.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-bio-card">
            <h3 className="about-bio-title">Hello! I'm Shreyas Kamble</h3>
            <p className="about-text">
              I am a <strong>Full-Stack Freelance Engineer</strong> who partners with founders, agencies, and companies
              to turn concepts into high-performing, scalable digital products.
            </p>
            <p className="about-text">
              Backed by computer science training from <strong>Walchand College of Engineering</strong> and commercial experience
              building multi-role marketplaces (Polokaz), real-time healthcare platforms (HealthConnect), and enterprise microservices,
              I ensure your application is fast, secure, and ready to scale.
            </p>

            <div className="about-info-list">
              <div className="info-item">
                <span className="info-label">Core Services:</span>
                <span className="info-value">Full-Stack Apps, MVPs, Microservices</span>
              </div>
              <div className="info-item">
                <span className="info-label">Engagement:</span>
                <span className="info-value">Fixed Price & Milestone Contracts</span>
              </div>
              <div className="info-item">
                <span className="info-label">Availability:</span>
                <span className="info-value highlight-avail">Open for New Projects</span>
              </div>
              <div className="info-item">
                <span className="info-label">Communication:</span>
                <span className="info-value">WhatsApp, Email, Slack, Video Calls</span>
              </div>
            </div>

            <div className="about-cta">
              <a href="#contact" className="btn btn-primary btn-sm">
                Discuss Your Project
              </a>
              <a
                href="https://wa.me/918767206376?text=Hi%20Shreyas,%20I'd%20like%20to%20discuss%20a%20project%20with%20you!"
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary btn-sm"
                style={{ marginLeft: "12px" }}
              >
                Chat on WhatsApp
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
