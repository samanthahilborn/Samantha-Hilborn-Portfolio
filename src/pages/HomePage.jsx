import { SKILLS } from "../data";
import SocialRow from "../components/SocialRow";
import girlPhoto from "../assets/girl.jpg";
import skyPhoto from "../assets/sky.jpg";
import "./HomePage.css";

export default function HomePage({ goTo }) {
  return (
    <div className="panel-inner home-page">
      <section className="hero">
        <div className="hero-photo-wrap">
          <img src={girlPhoto} alt="Portrait of Samantha" className="hero-photo" />
        </div>
        <div className="hero-copy">
          <h1>
            <span className="hi">Hi</span> my name is
            <br />
            Samantha
          </h1>
          <p className="hero-sub">
            I'm a creative developer who loves turning ideas into thoughtful,
            playful, and interactive digital experiences.
          </p>
          <button className="pill-btn" onClick={() => goTo("projects")}>
            Projects
          </button>
        </div>
      </section>

      <section className="about-box">
        <div className="about-copy">
          <h2>About Me</h2>
          <p>
            I'm Samantha, a computer science student with a love for
            creativity, design, and building things for the web. I enjoy
            creating projects that feel just as good to use as they do to
            look at.
          </p>
          <p>
            Whether I'm coding, designing, or experimenting with a new idea,
            I'm always looking for ways to make digital experiences feel a
            little more fun and a lot more human.
          </p>
        </div>
        <div className="polaroid">
          <span className="tape" />
          <img src={skyPhoto} alt="A blue sky with soft clouds" />
        </div>
      </section>

      <section className="skills-section">
        <h2>Skills</h2>
        <div className="skills-grid">
          {SKILLS.map((skill) => (
            <span className="pill-btn skill-pill" key={skill}>
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="thanks-box">
        <h2>Thank you for your curiosity</h2>
        <p>Let's keep in touch!</p>
        <button className="pill-btn" onClick={() => goTo("projects")}>
          Projects
        </button>
        <SocialRow />
      </section>
    </div>
  );
}
