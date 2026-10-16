import "./Skills.css";

export function Skills() {
  const skillCategories = [
    {
      title: "Programming Languages",
      description: "Core languages used for problem solving and backend architectures.",
      skills: [
        { name: "Java", level: "Primary" },
        { name: "JavaScript", level: "Advanced" },
        { name: "C++", level: "DSA / CP" },
        { name: "C", level: "Systems" },
        { name: "SQL", level: "Databases" },
      ],
    },
    {
      title: "Backend & Microservices",
      description: "Building scalable APIs, microservices, and real-time systems.",
      skills: [
        { name: "Spring Boot", level: "Enterprise" },
        { name: "Node.js", level: "Advanced" },
        { name: "Express.js", level: "Advanced" },
        { name: "RESTful APIs", level: "Expert" },
        { name: "Microservices", level: "Architecture" },
        { name: "WebRTC & Socket.IO", level: "Real-time" },
      ],
    },
    {
      title: "Frontend Technologies",
      description: "Modern, responsive, user-friendly client interfaces.",
      skills: [
        { name: "React.js", level: "Advanced" },
        { name: "Next.js 14", level: "Production" },
        { name: "Tailwind CSS", level: "Styling" },
        { name: "HTML5 & CSS3", level: "Expert" },
        { name: "Responsive UI", level: "Expert" },
      ],
    },
    {
      title: "Databases & ORMs",
      description: "Relational, NoSQL, vector search, and schema architectures.",
      skills: [
        { name: "PostgreSQL", level: "Relational" },
        { name: "MongoDB", level: "NoSQL" },
        { name: "ChromaDB (RAG)", level: "Vector DB" },
        { name: "Prisma ORM", level: "Data Access" },
        { name: "Drizzle ORM", level: "Data Access" },
      ],
    },
    {
      title: "DevOps & Cloud Tools",
      description: "Cloud infrastructure, containerization, and version control.",
      skills: [
        { name: "AWS Cloud", level: "Cloud" },
        { name: "Docker", level: "Containers" },
        { name: "Git & GitHub", level: "Version Control" },
        { name: "Linux / Bash", level: "OS & Shell" },
      ],
    },
    {
      title: "Software Practices & CS Core",
      description: "Engineering rigor, algorithms, and secure software design.",
      skills: [
        { name: "DSA & Problem Solving", level: "500+ Solved" },
        { name: "System Design & OOP", level: "Core" },
        { name: "Secure Coding & JWT/OAuth", level: "Security" },
        { name: "Unit & Integration Testing", level: "Testing" },
        { name: "Agile / Scrum & Reviews", level: "Workflow" },
      ],
    },
  ];

  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Full-Stack Capabilities</span>
          <h2 className="section-title">Technologies & Services I Deliver</h2>
          <p className="section-desc">
            Production-grade frameworks, cloud infrastructure, and software practices used to build and scale your products.
          </p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="skill-category-card">
              <div className="category-header">
                <div className="category-number">0{idx + 1}</div>
                <h3 className="category-title">{category.title}</h3>
                <p className="category-desc">{category.description}</p>
              </div>

              <div className="skill-pills-list">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-pill">
                    <span className="skill-pill-dot"></span>
                    <span className="skill-pill-name">{skill.name}</span>
                    <span className="skill-pill-level">{skill.level}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
