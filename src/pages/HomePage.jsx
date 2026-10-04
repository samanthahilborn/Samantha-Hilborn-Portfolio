import { useRef, useState } from "react";
import { SKILLS } from "../data";
import SocialRow from "../components/SocialRow";

import girlPhoto from "../assets/girl.jpg";
import skyPhoto from "../assets/sky.jpg";

import "./HomePage.css";

const HOME_SECTIONS = [
  { id: "hero", label: "Intro" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "thanks", label: "Hello" },
];

export default function HomePage({ goTo }) {
  const [activeSection, setActiveSection] =
    useState(0);

  const scrollRef = useRef(null);

  const handleScroll = () => {
    const container = scrollRef.current;

    if (!container) return;

    const sectionHeight =
      container.clientHeight;

    if (!sectionHeight) return;

    const nextSection = Math.round(
      container.scrollTop / sectionHeight
    );

    setActiveSection(
      Math.max(
        0,
        Math.min(
          HOME_SECTIONS.length - 1,
          nextSection
        )
      )
    );
  };

  const scrollToSection = (index) => {
    const container = scrollRef.current;

    if (!container) return;

    container.scrollTo({
      top:
        index *
        container.clientHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="panel-inner home-page">

      {/* =====================================
          INTERNAL FOLDER SCROLLER
          ===================================== */}

      <div
        className="home-scroll"
        ref={scrollRef}
        onScroll={handleScroll}
      >

        {/* =====================================
            01 — HERO
            ===================================== */}

        <section
          className={`home-slide home-hero ${
            activeSection === 0
              ? "is-active"
              : ""
          }`}
        >
          <div className="home-slide-number">
            01 / 04
          </div>

          <div className="hero-layout">

            {/* PHOTO */}

            <div className="hero-visual">

              <div className="hero-photo-shadow" />

              <div className="hero-photo-frame">
                <img
                  src={girlPhoto}
                  alt="Samantha"
                  className="hero-photo"
                />

                <span className="hero-photo-star">
                  ✦
                </span>
              </div>

              <div className="hero-mini-note">
                <span>creative</span>
                <span>developer</span>
                <span>✦</span>
              </div>

            </div>


            {/* TEXT */}

            <div className="hero-copy">

              <p className="home-kicker">
                HELLO / WELCOME TO MY PORTFOLIO
              </p>

              <h1>
                Hi, my name is
                <span>Samantha.</span>
              </h1>

              <p className="hero-sub">
                I&apos;m a creative developer
                who loves turning ideas into
                thoughtful, playful, and
                interactive digital experiences.
              </p>

              <div className="hero-actions">

                <button
                  type="button"
                  className="home-primary-btn"
                  onClick={() =>
                    goTo("projects")
                  }
                >
                  View my projects
                  <span>↗</span>
                </button>

                <button
                  type="button"
                  className="home-text-btn"
                  onClick={() =>
                    scrollToSection(1)
                  }
                >
                  About me
                  <span>↓</span>
                </button>

              </div>

            </div>

          </div>


          <button
            type="button"
            className="home-next-section"
            onClick={() =>
              scrollToSection(1)
            }
            aria-label="Scroll to About Me"
          >
            <span>SCROLL</span>
            ↓
          </button>

        </section>


        {/* =====================================
            02 — ABOUT
            ===================================== */}

        <section
          className={`home-slide home-about ${
            activeSection === 1
              ? "is-active"
              : ""
          }`}
        >
          <div className="home-slide-number">
            02 / 04
          </div>

          <div className="about-layout">

            <div className="about-heading">

              <p className="home-kicker">
                A LITTLE MORE ABOUT ME
              </p>

              <h2>
                About
                <span>Me</span>
              </h2>

              <div className="about-line">
                <span>✦</span>
                <div />
              </div>

            </div>


            <div className="about-copy">

              <p className="about-lead">
                I&apos;m Samantha, a computer
                science student with a love for
                creativity, design, and building
                things for the web.
              </p>

              <p>
                I enjoy creating projects that
                feel just as good to use as they
                do to look at.
              </p>

              <p>
                Whether I&apos;m coding,
                designing, or experimenting with
                a new idea, I&apos;m always
                looking for ways to make digital
                experiences feel a little more
                fun and a lot more human.
              </p>

              <button
                type="button"
                className="about-project-link"
                onClick={() =>
                  goTo("projects")
                }
              >
                See what I&apos;ve built
                <span>↗</span>
              </button>

            </div>


            <div className="about-polaroid">

              <span className="about-tape" />

              <img
                src={skyPhoto}
                alt="Blue sky and soft clouds"
              />

              <div className="about-polaroid-caption">
                somewhere between
                <br />
                code + creativity ✦
              </div>

            </div>

          </div>


          <button
            type="button"
            className="home-next-section"
            onClick={() =>
              scrollToSection(2)
            }
            aria-label="Scroll to Skills"
          >
            <span>NEXT</span>
            ↓
          </button>

        </section>


        {/* =====================================
            03 — SKILLS
            ===================================== */}

        <section
          className={`home-slide home-skills ${
            activeSection === 2
              ? "is-active"
              : ""
          }`}
        >
          <div className="home-slide-number">
            03 / 04
          </div>

          <div className="skills-content">

            <p className="home-kicker">
              THINGS I LIKE WORKING WITH
            </p>

            <h2>
              My little
              <span> toolbox.</span>
            </h2>

            <p className="skills-intro">
              A mix of development, design, and
              tools I use to turn ideas into
              something real.
            </p>


            <div className="skills-grid">

              {SKILLS.map(
                (skill, index) => (
                  <div
                    className="skill-card"
                    key={skill}
                    style={{
                      "--skill-index":
                        index,
                    }}
                  >
                    <span className="skill-number">
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </span>

                    <span className="skill-name">
                      {skill}
                    </span>

                    <span className="skill-star">
                      ✦
                    </span>
                  </div>
                )
              )}

            </div>

          </div>


          <button
            type="button"
            className="home-next-section"
            onClick={() =>
              scrollToSection(3)
            }
            aria-label="Scroll to final section"
          >
            <span>NEXT</span>
            ↓
          </button>

        </section>


        {/* =====================================
            04 — THANK YOU
            ===================================== */}

        <section
          className={`home-slide home-thanks ${
            activeSection === 3
              ? "is-active"
              : ""
          }`}
        >
          <div className="home-slide-number">
            04 / 04
          </div>


          <div className="thanks-decoration thanks-decoration-one">
            ✦
          </div>

          <div className="thanks-decoration thanks-decoration-two">
            ✦
          </div>


          <div className="thanks-content">

            <p className="home-kicker">
              YOU MADE IT TO THE END
            </p>

            <h2>
              Thanks for
              <span>stopping by.</span>
            </h2>

            <p>
              Have a project, opportunity, or
              just something fun to talk about?
              I&apos;d love to hear from you.
            </p>


            <div className="thanks-actions">

              <button
                type="button"
                className="home-primary-btn"
                onClick={() =>
                  goTo("contact")
                }
              >
                Let&apos;s work together
                <span>↗</span>
              </button>

              <button
                type="button"
                className="home-text-btn"
                onClick={() =>
                  goTo("projects")
                }
              >
                View projects
                <span>→</span>
              </button>

            </div>


            <SocialRow />


            <button
              type="button"
              className="home-back-top"
              onClick={() =>
                scrollToSection(0)
              }
            >
              ↑ BACK TO TOP
            </button>

          </div>

        </section>

      </div>


      {/* =====================================
          SIDE SECTION NAVIGATION
          ===================================== */}

      <nav
        className="home-section-nav"
        aria-label="Home sections"
      >
        {HOME_SECTIONS.map(
          (section, index) => (
            <button
              key={section.id}
              type="button"
              className={
                activeSection === index
                  ? "is-active"
                  : ""
              }
              onClick={() =>
                scrollToSection(index)
              }
              aria-label={`Go to ${section.label}`}
            >

              <span className="home-nav-number">
                0{index + 1}
              </span>

              <span className="home-nav-dot" />

              <span className="home-nav-label">
                {section.label}
              </span>

            </button>
          )
        )}
      </nav>

    </div>
  );
}