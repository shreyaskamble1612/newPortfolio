import { TiltCard } from "./TiltCard";
import shreyasPhoto from "../assets/shreyas_photo.jpg";
import "./Home.css";

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
            Information Technology @ Walchand College of Engineering
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="text-gradient">Shreyas Kamble</span>
            <br />
            Full-Stack Software Developer
          </h1>

          <p className="hero-subtitle">
            B.Tech IT engineer passionate about building scalable, secure full-stack applications,
            distributed microservices, and AI-integrated web platforms. Proven experience in
            <strong> Spring Boot, Next.js, Node.js, PostgreSQL, and AWS</strong>.
          </p>

          {/* Quick Metrics from Resume */}
          <div className="hero-metrics">
            <div className="metric-item">
              <span className="metric-number">500+</span>
              <span className="metric-label">LeetCode Problems</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-number">2-Star</span>
              <span className="metric-label">CodeChef (1552)</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <span className="metric-number">7.6</span>
              <span className="metric-label">CGPA @ WCE Sangli</span>
            </div>
          </div>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              Explore Projects
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <a href="mailto:shreyaskamble6671@gmail.com" className="btn btn-secondary">
              Email Me Directly
            </a>
          </div>

          <div className="hero-socials">
            <span className="socials-label">Connect:</span>
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
              href="https://linkedin.com/in/shreyaskamble"
              target="_blank"
              rel="noreferrer"
              className="social-pill"
              aria-label="LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
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
            <span className="floating-icon">☕</span>
            <div className="floating-text">
              <span className="badge-name">Java & Spring Boot</span>
              <span className="badge-sub">Backend & Microservices</span>
            </div>
          </div>

          {/* Floating 3D Badge 2 */}
          <div className="floating-badge badge-top-right">
            <span className="floating-icon">⚛️</span>
            <div className="floating-text">
              <span className="badge-name">Next.js 14 & React</span>
              <span className="badge-sub">Full-Stack Modern UI</span>
            </div>
          </div>

          {/* Floating 3D Badge 3 */}
          <div className="floating-badge badge-bottom-right">
            <span className="floating-icon">🚀</span>
            <div className="floating-text">
              <span className="badge-name">PostgreSQL & AWS</span>
              <span className="badge-sub">Cloud & Databases</span>
            </div>
          </div>

          {/* 3D Tilted Photo Card */}
          <TiltCard className="hero-photo-tilt-wrapper" maxTilt={14}>
            <div className="hero-photo-card">
              <div className="photo-outer-ring"></div>
              <div className="photo-inner-wrapper">
                <img
                  src={shreyasPhoto}
                  alt="Shreyas Kamble - Full-Stack Developer"
                  className="hero-profile-img"
                />
                <div className="photo-gradient-overlay"></div>
              </div>

              <div className="photo-card-footer">
                <div className="photo-status">
                  <span className="photo-ping"></span>
                  <span className="photo-name">Shreyas Kamble</span>
                </div>
                <span className="photo-badge">B.Tech IT • WCE</span>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}

export default Home;
