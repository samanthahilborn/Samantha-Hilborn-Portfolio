import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "../data";
import SocialRow from "../components/SocialRow";
import "./ProjectsPage.css";

const wrapIndex = (index, total) => (index + total) % total;

export default function ProjectsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const [cardSpacing, setCardSpacing] = useState(300);

  const dragStart = useRef(null);
  const didDrag = useRef(false);

  // moves carousel left/right
  const moveCarousel = (direction) => {
    setActiveIndex((current) =>
      wrapIndex(current + direction, PROJECTS.length)
    );
  };

  // figures out where each card should sit
  const getOffset = (index) => {
    let offset = index - activeIndex;
    const total = PROJECTS.length;
  
    if (offset > total / 2) {
      offset -= total;
    }
  
    if (offset < -total / 2) {
      offset += total;
    }
  
    return offset;
  };

  // changes spacing depending on screen size
  useEffect(() => {
    const updateSpacing = () => {
      if (window.innerWidth <= 640) {
        setCardSpacing(210);
      } else if (window.innerWidth <= 1050) {
        setCardSpacing(230);
      } else if (window.innerWidth <= 1450) {
        setCardSpacing(260);
      } else {
        setCardSpacing(300);
      }
    };

    updateSpacing();

    window.addEventListener("resize", updateSpacing);

    return () => {
      window.removeEventListener("resize", updateSpacing);
    };
  }, []);

  // keyboard controls
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }

      if (!selectedProject && event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          wrapIndex(current - 1, PROJECTS.length)
        );
      }

      if (!selectedProject && event.key === "ArrowRight") {
        setActiveIndex((current) =>
          wrapIndex(current + 1, PROJECTS.length)
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  // start dragging
  const handlePointerDown = (event) => {
    if (event.target.closest("button, a")) return;

    dragStart.current = event.clientX;
    didDrag.current = false;

    setIsDragging(true);

    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  // while dragging
  const handlePointerMove = (event) => {
    if (dragStart.current === null) return;

    const nextDragX = event.clientX - dragStart.current;

    if (Math.abs(nextDragX) > 5) {
      didDrag.current = true;
    }

    setDragX(nextDragX);
  };

  // finish drag
  const finishDrag = () => {
    if (dragStart.current === null) return;

    if (dragX < -70) {
      moveCarousel(1);
    } else if (dragX > 70) {
      moveCarousel(-1);
    }

    dragStart.current = null;

    setDragX(0);
    setIsDragging(false);
  };

  return (
    <div className="panel-inner projects-page">

      {/* HEADER */}
      <div className="projects-header">
        <div>
          <p className="projects-eyebrow">
            SELECTED WORK / 2026
          </p>

          <h1>My Projects</h1>
        </div>

        <p className="projects-intro">
          Drag through my projects, click a card to bring it
          forward, then open it for a closer look.
        </p>
      </div>

      {/* CAROUSEL */}
      <div
        className={`project-carousel-stage ${
          isDragging ? "is-dragging" : ""
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
      >
        {PROJECTS.map((project, index) => {
          const offset = getOffset(index);
          const distance = Math.abs(offset);
          const isVisible = distance <= 2;

          const x = offset * cardSpacing + dragX * 0.8;

          const y = distance * 42;

          const rotation =
            offset * 6 + dragX * 0.01;

          const scale =
            offset === 0
              ? 1
              : distance === 1
              ? 0.94
              : 0.88;

          const opacity = isVisible ? 1 : 0;

          const isActive = index === activeIndex;

          return (
            <article
              key={project.n}
              className={`project-carousel-card ${
                isActive ? "is-active" : ""
              }`}
              style={{
                transform: `
                  translate(-50%, -50%)
                  translate3d(${x}px, ${y}px, 0)
                  rotate(${rotation}deg)
                  scale(${scale})
                `,
                zIndex: isVisible ? 20 - distance : 0,
                opacity,
                pointerEvents: isVisible ? "auto" : "none",
                visibility: isVisible ? "visible" : "hidden",
              }}
              onClick={() => {
                if (didDrag.current) {
                  didDrag.current = false;
                  return;
                }

                setActiveIndex(index);
              }}
            >

              {/* CARD TOP */}
              <div className="project-card-topline">
                <span>{project.n}</span>
                <span>{project.tag}</span>
              </div>

              {/* CARD IMAGE / BANNER */}
              <div className="project-card-visual">
                <span className="project-card-spark">
                  ✦
                </span>

                <p>{project.name}</p>

                <span className="project-card-number">
                  {project.n}
                </span>
              </div>

              {/* CARD CONTENT */}
              <div className="project-card-copy">

                <h2>{project.title}</h2>

                <p>{project.desc}</p>

                <div className="project-stack">
                  {project.stack.map((item) => (
                    <span key={item}>
                      {item}
                    </span>
                  ))}
                </div>

                {/* EXPAND PROJECT BUTTON */}
                <button
                  className="project-details-btn"
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();

                    setSelectedProject(project);
                  }}
                >
                  See project

                  <span aria-hidden="true">
                    ↗
                  </span>
                </button>

              </div>
            </article>
          );
        })}
      </div>

      {/* CAROUSEL CONTROLS */}
      <div className="project-carousel-controls">

        <button
          type="button"
          className="project-arrow"
          onClick={() => moveCarousel(-1)}
          aria-label="Previous project"
        >
          ←
        </button>

        <div className="project-dots">
          {PROJECTS.map((project, index) => (
            <button
              key={project.n}
              type="button"
              className={
                index === activeIndex
                  ? "is-active"
                  : ""
              }
              onClick={() =>
                setActiveIndex(index)
              }
              aria-label={`Show ${project.title}`}
            />
          ))}
        </div>

        <button
          type="button"
          className="project-arrow"
          onClick={() => moveCarousel(1)}
          aria-label="Next project"
        >
          →
        </button>

      </div>

      <SocialRow />

      {/* EXPANDED PROJECT WINDOW */}
      {selectedProject && (
        <div
          className="project-modal-backdrop"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              setSelectedProject(null);
            }
          }}
        >
          <section
            className="project-modal"
            role="dialog"
            aria-modal="true"
          >

            {/* CLOSE BUTTON */}
            <button
              className="project-modal-close"
              type="button"
              onClick={() =>
                setSelectedProject(null)
              }
              aria-label="Close project details"
            >
              ×
            </button>

            <p className="project-modal-kicker">
              {selectedProject.n}
              {" / "}
              {selectedProject.tag}
            </p>

            <h2>
              {selectedProject.title}
            </h2>

            <p className="project-modal-description">
              {selectedProject.longDesc ||
                selectedProject.desc}
            </p>

            {/* TECHNOLOGIES */}
            <div className="project-modal-section">

              <span className="project-modal-label">
                Built with
              </span>

              <div className="project-modal-stack">
                {selectedProject.stack.map(
                  (item) => (
                    <span key={item}>
                      {item}
                    </span>
                  )
                )}
              </div>

            </div>

            {/* OPTIONAL HIGHLIGHTS */}
            {selectedProject.highlights?.length >
              0 && (
              <div className="project-modal-section">

                <span className="project-modal-label">
                  Highlights
                </span>

                <ul>
                  {selectedProject.highlights.map(
                    (item) => (
                      <li key={item}>
                        {item}
                      </li>
                    )
                  )}
                </ul>

              </div>
            )}

            {/* LINKS */}
            <div className="project-modal-actions">

              {selectedProject.repo ? (
                <a
                  href={selectedProject.repo}
                  target="_blank"
                  rel="noreferrer"
                >
                  View repository ↗
                </a>
              ) : (
                <span className="project-link-placeholder">
                  Repository link coming soon
                </span>
              )}

              {selectedProject.live && (
                <a
                  href={selectedProject.live}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit live site ↗
                </a>
              )}

            </div>

          </section>
        </div>
      )}
    </div>
  );
}