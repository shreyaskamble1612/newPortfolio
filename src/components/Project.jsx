import { useState } from "react";
import { TiltCard } from "./TiltCard";
import "./Project.css";

export function Project() {
  const [activeFilter, setActiveFilter] = useState("All");

  const projectsData = [
    {
      id: 1,
      title: "HealthConnect – Scalable Telemedicine Platform",
      category: "Full Stack & AI",
      badge: "Featured / Telehealth",
      subtitle: "Next.js, Node.js, Express.js, MongoDB, WebRTC, Socket.IO, AWS, FastAPI",
      description:
        "A full-scale telemedicine platform with real-time video consultations, microservices backend, and an AI-powered RAG medical chatbot.",
      keyPoints: [
        "Engineered scalable platform supporting 20+ concurrent video consultation sessions via WebRTC and Socket.IO.",
        "Built modular microservices (Express.js, FastAPI, Socket.IO) with Next.js client for high availability.",
        "Integrated AI medical chatbot using Together AI LLMs & ChromaDB (RAG pipeline) achieving sub-2s latency and 85–95% intent accuracy.",
        "Automated WhatsApp appointment confirmations via Twilio API, reducing patient no-shows by 15–30%.",
      ],
      tags: ["Next.js", "WebRTC", "Socket.IO", "FastAPI", "ChromaDB (RAG)", "MongoDB", "AWS", "Twilio"],
      githubUrl: "https://github.com/shreyaskamble1612",
    },
    {
      id: 2,
      title: "Enterprise Inventory Management System",
      category: "Spring Boot & Java",
      badge: "Enterprise Backend",
      subtitle: "React.js, Java Spring Boot, MongoDB, JWT Authentication",
      description:
        "Full-stack multi-user inventory management system built with Spring Boot microservices, secure JWT authentication, and reactive tracking.",
      keyPoints: [
        "Engineered, tested, and documented 16+ RESTful APIs for user management, item CRUD, category filters, and real-time quantity updates.",
        "Applied secure coding principles for role-based access control (RBAC), multi-user sessions, and token validations.",
        "Designed a responsive React.js dashboard with live search, filtering, and edge-case error prevention.",
      ],
      tags: ["Java", "Spring Boot", "React.js", "MongoDB", "JWT", "RESTful APIs", "Secure Coding"],
      githubUrl: "https://github.com/shreyaskamble1612",
    },
    {
      id: 3,
      title: "Polokaz – Lifestyle Membership Marketplace",
      category: "Full Stack & AI",
      badge: "Client Production",
      subtitle: "Next.js 14, Express.js, TypeScript, PostgreSQL, Drizzle ORM, Stripe, Turborepo",
      description:
        "An invite-only lifestyle membership monorepo marketplace with 3 RBAC user tiers, webhook synchronization, and payment infrastructure.",
      keyPoints: [
        "Designed and launched monorepo marketplace for members, merchants, and admins with RBAC, boosting engagement by 35%.",
        "Integrated Coupontools API with signed HMAC webhooks and automated background sync, reducing latency by 40%.",
        "Architected schema and optimized Drizzle ORM / PostgreSQL queries, cutting API latency by 25% across high-traffic deal routes.",
      ],
      tags: ["Next.js 14", "TypeScript", "Express.js", "PostgreSQL", "Drizzle ORM", "Stripe", "HMAC Webhooks"],
      githubUrl: "https://github.com/shreyaskamble1612",
    },
  ];

  const categories = ["All", "Full Stack & AI", "Spring Boot & Java"];

  const filteredProjects =
    activeFilter === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Featured Work</span>
          <h2 className="section-title">Engineered Projects</h2>
          <p className="section-desc">
            Production-grade systems, microservices architectures, and real-time applications from my portfolio.
          </p>

          <div className="project-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeFilter === cat ? "active" : ""}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <TiltCard key={project.id} maxTilt={9} className="project-tilt-wrapper">
              <div className="project-card">
                <div className="project-card-banner">
                  <div className="banner-visual">
                    <div className="banner-icon-circle">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                        <polyline points="2 17 12 22 22 17"></polyline>
                        <polyline points="2 12 12 17 22 12"></polyline>
                      </svg>
                    </div>
                    <span className="project-badge">{project.badge}</span>
                  </div>
                </div>

                <div className="project-card-content">
                  <div className="project-category">{project.category}</div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-subtitle-text">{project.subtitle}</p>
                  <p className="project-description">{project.description}</p>

                  {/* Detailed highlights */}
                  <ul className="project-key-bullets">
                    {project.keyPoints.map((point, kIdx) => (
                      <li key={kIdx}>
                        <span className="bullet-indicator">▸</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="project-tags">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="project-tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="project-links">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="project-link-btn demo-btn"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                      </svg>
                      <span>View on GitHub</span>
                    </a>
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

export const Projects = Project;
export default Project;
