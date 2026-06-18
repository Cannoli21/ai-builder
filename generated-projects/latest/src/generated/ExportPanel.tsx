import { useState } from "react";

export function ExportPanel() {
  const [status, setStatus] = useState("Ready");

  function exportVideo() {
    setStatus("Exporting...");
    setTimeout(() => setStatus("Export complete"), 900);
  }

  return (
    <section className="module-card">
      <span className="section-label">Export Module</span>
      <h3>ExportPanel</h3>
      <p>Configure and export finished product videos.</p>

      <div className="export-panel">
        <div><strong>Format</strong><span>MP4 1080p</span></div>
        <div><strong>Duration</strong><span>24 seconds</span></div>
        <div><strong>Status</strong><span>{status}</span></div>
      </div>

      <button className="primary-action" onClick={exportVideo}>Export Video</button>
    </section>
  );
}