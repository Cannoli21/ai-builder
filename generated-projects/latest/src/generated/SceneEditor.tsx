import { useState } from "react";

const scenes = ["Launch hero", "Feature zoom", "Pricing CTA"];

export function SceneEditor() {
  const [selectedScene, setSelectedScene] = useState(scenes[0]);

  return (
    <section className="module-card">
      <span className="section-label">Editor Module</span>
      <h3>SceneEditor</h3>
      <p>Edit scene content, layout, and timing.</p>

      <div className="editor-layout">
        <aside>
          <p>Scenes</p>
          {scenes.map((scene) => (
            <button key={scene} onClick={() => setSelectedScene(scene)}>{scene}</button>
          ))}
        </aside>

        <main>
          <p>Selected Scene</p>
          <input value={selectedScene} onChange={(e) => setSelectedScene(e.target.value)} />
          <input value="Ease out / 900ms" readOnly />
        </main>
      </div>
    </section>
  );
}