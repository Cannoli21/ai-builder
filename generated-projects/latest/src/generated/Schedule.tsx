import { useEffect, useState } from "react";

type Walk = { id: number; dog: string; time: string; status: string };

const defaultWalks: Walk[] = [
  { id: 1, dog: "Scout", time: "9:00 AM", status: "Scheduled" },
  { id: 2, dog: "Milo", time: "1:30 PM", status: "Scheduled" }
];

export function Schedule() {
  const [walks, setWalks] = useState<Walk[]>(() => {
    const saved = localStorage.getItem("dogwalk_walks");
    return saved ? JSON.parse(saved) : defaultWalks;
  });

  useEffect(() => {
    localStorage.setItem("dogwalk_walks", JSON.stringify(walks));
  }, [walks]);

  function addWalk() {
    setWalks([...walks, { id: Date.now(), dog: "New dog", time: "3:00 PM", status: "Scheduled" }]);
  }

  function completeWalk(id: number) {
    setWalks(walks.map((walk) => walk.id === id ? { ...walk, status: "Completed" } : walk));
  }

  return (
    <section className="module-card">
      <span className="section-label">Walks</span>
      <h3>Schedule</h3>
      <p>Schedule work and track status.</p>

      <button className="primary-action" onClick={addWalk}>Schedule Walk</button>

      <div className="data-list">
        {walks.map((walk) => (
          <div key={walk.id} className="data-row">
            <div>
              <strong>{walk.dog}</strong>
              <span>{walk.time} · {walk.status}</span>
            </div>
            <button onClick={() => completeWalk(walk.id)}>Complete</button>
          </div>
        ))}
      </div>
    </section>
  );
}