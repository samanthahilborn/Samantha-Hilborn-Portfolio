import { useState } from "react";
import { EXPERIENCE } from "../data";
import "./ExperiencePage.css";

export default function ExperiencePage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleExperienceClick = (index) => {
    // clicking the same card again closes it
    setActiveIndex((current) =>
      current === index ? null : index
    );
  };

  return (
    <div className="panel-inner experience-page">

      {/* =========================
          HEADER
          ========================= */}

      <header className="experience-header">
        <div>
          <p className="experience-eyebrow">
            MY JOURNEY / EXPERIENCE
          </p>

          <h1>My Experience</h1>
        </div>

        <div className="experience-header-right">
          <p>
            A timeline of the things I&apos;ve
            learned, built, and worked on along
            the way.
          </p>

          <span>CLICK A YEAR TO EXPAND</span>
        </div>
      </header>


      {/* =========================
          TIMELINE AREA
          ========================= */}

      <main className="experience-timeline-area">

        <div className="experience-timeline-scroll">

          <div className="experience-timeline">

            {/* main timeline line */}

            <div className="experience-line" />


            {EXPERIENCE.map((item, index) => {
              const isActive =
                activeIndex === index;

              const isTop =
                index % 2 === 0;

              return (
                <div
                  key={item.year}
                  className={`
                    experience-stop
                    ${isTop ? "is-top" : "is-bottom"}
                    ${isActive ? "is-active" : ""}
                  `}
                >

                  {/* =========================
                      CARD
                      ========================= */}

                  <button
                    type="button"
                    className="experience-card"
                    onClick={() =>
                      handleExperienceClick(index)
                    }
                    aria-expanded={isActive}
                  >

                    <div className="experience-card-top">

                      <span className="experience-number">
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <span className="experience-expand-icon">
                        {isActive ? "−" : "+"}
                      </span>

                    </div>


                    <span className="experience-year">
                      {item.year}
                    </span>


                    <h2>
                      {item.title}
                    </h2>


                    {/* =========================
                        EXPANDED CONTENT
                        ========================= */}

                    <div className="experience-expanded">

                      <div className="experience-expanded-inner">

                        <div className="experience-divider" />

                        <p>
                          {item.body}
                        </p>


                        {/* optional extra paragraphs
                            if you add details later */}

                        {item.details?.map(
                          (detail, detailIndex) => (
                            <p
                              key={detailIndex}
                              className="experience-extra-detail"
                            >
                              {detail}
                            </p>
                          )
                        )}


                        {/* optional skill tags */}

                        {item.skills?.length > 0 && (
                          <div className="experience-skills">
                            {item.skills.map(
                              (skill) => (
                                <span key={skill}>
                                  {skill}
                                </span>
                              )
                            )}
                          </div>
                        )}


                        <span className="experience-collapse-text">
                          Click again to close
                        </span>

                      </div>

                    </div>

                  </button>


                  {/* =========================
                      CONNECTOR
                      ========================= */}

                  <span className="experience-connector" />


                  {/* =========================
                      TIMELINE DOT
                      ========================= */}

                  <button
                    type="button"
                    className="experience-dot"
                    onClick={() =>
                      handleExperienceClick(index)
                    }
                    aria-label={`Open ${item.year} experience`}
                  >
                    <span />
                  </button>

                </div>
              );
            })}

          </div>

        </div>


        {/* tiny instruction only */}

        <div className="experience-timeline-footer">
          <span>←</span>

          <p>
            EXPLORE MY TIMELINE
          </p>

          <span>→</span>
        </div>

      </main>

    </div>
  );
}