import { useState } from "react";
import { EXPERIENCE } from "../data";
import "./ExperiencePage.css";

export default function ExperiencePage() {
  const [open, setOpen] = useState(null);

  return (
    <div className="panel-inner experience-page">
      <h1>My Experience</h1>
      <p className="hint">Click a year to expand</p>
      <div className="timeline">
        {EXPERIENCE.map((item, i) => {
          const isOpen = open === i;
          return (
            <button
              key={item.year}
              className={`timeline-card ${isOpen ? "open" : ""}`}
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="timeline-year">{item.year}</span>
              <span className="timeline-title">{item.title}</span>
              {isOpen && <span className="timeline-body">{item.body}</span>}
              <span className="timeline-toggle">{isOpen ? "−" : "+"}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
