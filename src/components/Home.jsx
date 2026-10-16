import { TiltCard } from "./TiltCard";
import shreyasPhoto from "../assets/image.png";
import "./Home.css";

// Full-Stack Freelance Engineer - Shreyas Kamble
export function Home() {
  return (
    <section id="home" className="hero-section">
      {/* Decorative Violet Ambient Gradients */}
      <div className="hero-glow hero-glow-1"></div>
      <div className="hero-glow hero-glow-2"></div>

      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-pulse"></span>
            Available for Freelance Projects & Contracts
          </div>

          <h1 className="hero-title">
            I build <span className="text-gradient">high-impact web apps</span> that scale your business.
          </h1>

          <p className="hero-subtitle">
            Hi, I'm <strong>Shreyas Kamble</strong> — a Full-Stack Freelance Engineer helping startups,
            founders, and businesses build scalable MVPs, modern web applications, and robust microservices
            using <strong>Next.js, React, Java Spring Boot, Node.js, and AWS</strong>.
          </p>

          {/* Client Trust Metrics */}
          <div className="hero-metrics">
            <div className="metric-item">
              <span className="metric-number">100%</span>
              <span className="metric-label">On-Time Milestones</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-number">+35%</span>
              <span className="metric-label">Client Engagement Lift</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-number">Full-Stack</span>
              <span className="metric-label">End-to-End Delivery</span>
            </div>
          </div>

          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">
              Start a Project / Hire Me
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <a
              href="https://wa.me/918767206376?text=Hi%20Shreyas,%20I'm%20interested%20in%20discussing%20a%20project%20with%20you!"
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp-direct"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>Instant WhatsApp Chat</span>
            </a>
          </div>

          <div className="hero-socials">
            <span className="socials-label">Profiles:</span>
            <a
              href="https://github.com/shreyaskamble1612"
              target="_blank"
              rel="noreferrer"
              className="social-pill"
              aria-label="GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/shreyas-kamble-aa465922a/"
              target="_blank"
              rel="noreferrer"
              className="social-pill"
              aria-label="LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              LinkedIn
            </a>
            <a
              href="tel:+918767206376"
              className="social-pill"
              aria-label="Phone"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              +91 8767206376
            </a>
          </div>
        </div>

        {/* 3D Visual Stage with Profile Photo */}
        <div className="hero-visual-3d-stage">
          {/* Floating 3D Badge 1 */}
          <div className="floating-badge badge-top-left">
            <span className="floating-icon">⚡</span>
            <div className="floating-text">
              <span className="badge-name">Fast Turnaround</span>
              <span className="badge-sub">Agile Milestones</span>
            </div>
          </div>

          {/* Floating 3D Badge 2 */}
          <div className="floating-badge badge-top-right">
            <span className="floating-icon">⚛️</span>
            <div className="floating-text">
              <span className="badge-name">Next.js 14 & React</span>
              <span className="badge-sub">High-Converting UIs</span>
            </div>
          </div>

          {/* Floating 3D Badge 3 */}
          <div className="floating-badge badge-bottom-right">
            <span className="floating-icon">🛡️</span>
            <div className="floating-text">
              <span className="badge-name">Secure & Scalable</span>
              <span className="badge-sub">Stripe, APIs & Cloud</span>
            </div>
          </div>

          {/* 3D Tilted Photo Card */}
          <TiltCard className="hero-photo-tilt-wrapper" maxTilt={14}>
            <div className="hero-photo-card">
              <div className="photo-outer-ring"></div>
              <div className="photo-inner-wrapper">
                <img
                  src={shreyasPhoto}
                  alt="Shreyas Kamble - Full-Stack Freelance Engineer"
                  className="hero-profile-img"
                />
                <div className="photo-gradient-overlay"></div>
              </div>

              <div className="photo-card-footer">
                <div className="photo-status">
                  <span className="photo-ping"></span>
                  <span className="photo-name">Shreyas Kamble</span>
                </div>
                <span className="photo-badge">Full-Stack Freelancer</span>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}

export default Home;
