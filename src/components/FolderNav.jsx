import { TABS } from "../data";

export default function FolderNav({ active, setActive }) {
  return (
    <nav className="folder-nav" aria-label="Site sections">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`folder-tab ${active === tab.id ? "active" : ""}`}
          style={{ "--tab-color": tab.color, "--tab-text": tab.text }}
          onClick={() => setActive(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
