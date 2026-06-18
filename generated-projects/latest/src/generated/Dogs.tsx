import { useState } from "react";

const dogs = [
  { name: "Scout", breed: "Golden Retriever", owner: "Maya Brooks", notes: "Loves long walks." },
  { name: "Milo", breed: "French Bulldog", owner: "Jordan Lee", notes: "Avoid heat." },
  { name: "Luna", breed: "Husky", owner: "Maya Brooks", notes: "High energy." }
];

export function Dogs() {
  const [selectedDog, setSelectedDog] = useState(dogs[0]);

  return (
    <section className="module-card">
      <span className="section-label">Dogs</span>
      <h3>Dogs</h3>
      <p>Manage dog profiles and connect each dog to an owner.</p>

      <div className="button-list">
        {dogs.map((dog) => (
          <button key={dog.name} onClick={() => setSelectedDog(dog)}>{dog.name}</button>
        ))}
      </div>

      <div className="detail-panel">
        <strong>{selectedDog.name}</strong>
        <span>{selectedDog.breed} · Owner: {selectedDog.owner}</span>
        <p>{selectedDog.notes}</p>
      </div>
    </section>
  );
}