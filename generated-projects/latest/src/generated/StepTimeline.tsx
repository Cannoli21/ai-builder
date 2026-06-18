import { useState } from "react";

const steps = ["Intro", "Zoom", "Highlight", "CTA"];

export function StepTimeline() {
  const [activeStep, setActiveStep] = useState("Intro");

  return (
    <section className="module-card">
      <span className="section-label">Timeline Module</span>
      <h3>StepTimeline</h3>
      <p>Control animation steps without traditional keyframes.</p>

      <div className="timeline">
        {steps.map((step) => (
          <button
            key={step}
            onClick={() => setActiveStep(step)}
            className={activeStep === step ? "timeline-step active" : "timeline-step"}
          >
            {step}
          </button>
        ))}
      </div>

      <p className="status-line">Editing step: {activeStep}</p>
    </section>
  );
}