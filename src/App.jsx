// import { useState } from "react";
// import FolderNav from "./components/FolderNav";
// import HomePage from "./pages/HomePage";
// import ExperiencePage from "./pages/ExperiencePage";
// import ProjectsPage from "./pages/ProjectsPage";
// import ContactPage from "./pages/ContactPage";
// import CursorFollower from "./components/CursorFollower";
// import { TABS } from "./data";

// export default function App() {
//   const [active, setActive] = useState("home");
//   const activeColor = TABS.find((t) => t.id === active).color;

//   return (
//     <>
//       <CursorFollower />

//       <div className="site-wrap">
//         <div className="sky-bg" />

//         <div className="page-frame">
//           <h1 className="logo">Samantha Hilborn</h1>

//           <FolderNav active={active} setActive={setActive} />

//           <div
//             className="panel"
//             style={{ "--panel-color": activeColor }}
//           >
//             {active === "home" && <HomePage goTo={setActive} />}
//             {active === "experience" && <ExperiencePage />}
//             {active === "projects" && <ProjectsPage />}
//             {active === "contact" && <ContactPage />}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
import { useState } from "react";
import FolderNav from "./components/FolderNav";
import CursorFollower from "./components/CursorFollower";

import HomePage from "./pages/HomePage";
import ExperiencePage from "./pages/ExperiencePage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";

import { TABS } from "./data";

export default function App() {
  const [active, setActive] = useState("home");

  const activeColor = TABS.find(
    (tab) => tab.id === active
  ).color;

  return (
    <>
      <CursorFollower />

      <div className="site-wrap">
        <div className="sky-bg" />

        <div className="page-frame">
          <h1 className="logo">Samantha Hilborn</h1>

          <FolderNav
            active={active}
            setActive={setActive}
          />

          <div
            className={`panel panel-${active}`}
            style={{ "--panel-color": activeColor }}
          >
            {active === "home" && (
              <HomePage goTo={setActive} />
            )}

            {active === "experience" && (
              <ExperiencePage />
            )}

            {active === "projects" && (
              <ProjectsPage />
            )}

            {active === "contact" && (
              <ContactPage />
            )}
          </div>
        </div>
      </div>
    </>
  );
}