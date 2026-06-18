import { useState } from "react";

export function MotionCanvas() {
  const [playing, setPlaying] = useState(false);
  const [zoom, setZoom] = useState(100);

  return (
    <section className="module-card">
      <span className="section-label">Canvas Module</span>
      <h3>MotionCanvas</h3>
      <p>Preview animated scenes in the browser.</p>

      <div className={playing ? "canvas-stage is-playing" : "canvas-stage"}>
        <div className="mock-window">
          <div className="mock-topbar"><span></span><span></span><span></span></div>
          <div className="mock-scene">
            <div className="scene-object primary"></div>
            <div className="scene-object secondary"></div>
            <div className="scene-object glow"></div>
          </div>
        </div>

        <div className="control-row">
          <button onClick={() => setPlaying(!playing)}>{playing ? "Pause" : "Play"}</button>
          <button onClick={() => setZoom(Math.max(50, zoom - 10))}>Zoom -</button>
          <button onClick={() => setZoom(Math.min(150, zoom + 10))}>Zoom {zoom}%</button>
        </div>
      </div>
    </section>
  );
}