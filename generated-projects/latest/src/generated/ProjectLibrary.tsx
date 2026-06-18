import { useState } from "react";

const initialProjects = ["Founder launch", "Dashboard reveal", "Pricing walkthrough"];

export function ProjectLibrary() {
  const [projects, setProjects] = useState(initialProjects);

  function addProject() {
    setProjects([...projects, "New project " + (projects.length + 1)]);
  }

  return (
    <section className="module-card">
      <span className="section-label">Project Module</span>
      <h3>ProjectLibrary</h3>
      <p>Manage saved video projects and drafts.</p>

      <div className="project-list">
        {projects.map((project) => <div key={project}>{project}</div>)}
      </div>

      <button className="primary-action" onClick={addProject}>Create Project</button>
    </section>
  );
}