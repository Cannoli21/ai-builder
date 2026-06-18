import { useState } from "react";

const templates = ["Launch Video", "SaaS Walkthrough", "Feature Reveal"];

export function TemplateBrowser() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);

  return (
    <section className="module-card">
      <span className="section-label">Template Module</span>
      <h3>TemplateBrowser</h3>
      <p>Browse reusable SaaS demo and promo templates.</p>

      <div className="template-grid">
        {templates.map((template) => (
          <button key={template} onClick={() => setSelectedTemplate(template)}>
            {template}
          </button>
        ))}
      </div>

      <p className="status-line">Selected: {selectedTemplate}</p>
    </section>
  );
}