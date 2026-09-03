import { PROJECTS } from "../data";
import SocialRow from "../components/SocialRow";
import "./ProjectsPage.css";

export default function ProjectsPage() {
  return (
    <div className="panel-inner projects-page">
      <div className="projects-header">
        <h1>My Projects</h1>
        <p>
          Creative developer building minimal interfaces, small tools, and
          playful digital experiences.
        </p>
      </div>
      <div className="projects-grid">
        {PROJECTS.map((p) => (
          <article className="project-card" key={p.n}>
            <div className="project-card-top">
              <span>{p.n}</span>
              <span>{p.tag}</span>
            </div>
            <div className="project-card-banner">
              <span className="project-dot" />
              <span className="project-name">{p.name}</span>
            </div>
            <div className="project-card-body">
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="project-stack">
                {p.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
              <hr />
              <a href="#" onClick={(e) => e.preventDefault()}>
                View repository ↗
              </a>
            </div>
          </article>
        ))}
      </div>
      <SocialRow />
    </div>
  );
}
