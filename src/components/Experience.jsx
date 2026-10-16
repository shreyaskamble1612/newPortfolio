import { TiltCard } from "./TiltCard";
import "./Experience.css";

export function Experience() {
  const experiences = [
    {
      role: "Freelance Full-Stack Developer",
      company: "Polokaz",
      project: "Invite-Only Lifestyle Membership Marketplace",
      period: "Recent",
      techStack: [
        "Next.js 14",
        "Express.js",
        "TypeScript",
        "PostgreSQL",
        "Drizzle ORM",
        "Stripe",
        "Turborepo",
        "HMAC Webhooks",
      ],
      points: [
        "Collaborated with product stakeholders to architect and build a full-stack membership marketplace monorepo (Next.js, Express, PostgreSQL/Drizzle) supporting 3 user roles: members, merchants, and admins with RBAC and secure session-based authentication.",
        "Launched the membership & rewards marketplace platform supporting 3 RBAC user tiers, resulting in a 35% boost in platform user engagement and deal redemption rates.",
        "Integrated Coupontools API with signed HMAC webhook callbacks and automated background sync jobs, eliminating data discrepancies and cutting redemption processing latency by 40%.",
        "Architected database schema and high-performance queries in Drizzle ORM/PostgreSQL with secure session-based authentication, reducing API response times by 25% across high-concurrency deal browsing routes.",
      ],
      impacts: [
        { label: "User Engagement & Redemption", value: "+35%" },
        { label: "Redemption Latency", value: "-40%" },
        { label: "API Response Time", value: "-25%" },
      ],
    },
  ];

  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Work Experience</span>
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-desc">
            Commercial full-stack engineering, production marketplace architecture, and client impact.
          </p>
        </div>

        <div className="experience-list">
          {experiences.map((exp, idx) => (
            <TiltCard key={idx} maxTilt={6}>
              <div className="experience-card">
              <div className="experience-header">
                <div className="role-company">
                  <div className="company-badge-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="experience-role">{exp.role}</h3>
                    <div className="company-meta">
                      <span className="experience-company">{exp.company}</span>
                      <span className="meta-dot">•</span>
                      <span className="experience-project">{exp.project}</span>
                    </div>
                  </div>
                </div>

                <div className="experience-period-badge">
                  <span>{exp.period}</span>
                </div>
              </div>

              {/* Impact Metrics Banner */}
              <div className="impact-stats-row">
                {exp.impacts.map((stat, sIdx) => (
                  <div key={sIdx} className="impact-stat-item">
                    <span className="impact-value">{stat.value}</span>
                    <span className="impact-label">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* Bullet points */}
              <ul className="experience-bullets">
                {exp.points.map((pt, pIdx) => (
                  <li key={pIdx}>
                    <span className="bullet-dot"></span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack Pills */}
              <div className="experience-tags">
                <span className="tags-label">Technologies:</span>
                <div className="tags-flex">
                  {exp.techStack.map((tech, tIdx) => (
                    <span key={tIdx} className="exp-tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </TiltCard>
        ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
