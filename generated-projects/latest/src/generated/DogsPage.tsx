import { useState } from "react";

const dogs = [
  { name: "Scout", breed: "Golden Retriever", notes: "Loves long walks." },
  { name: "Milo", breed: "French Bulldog", notes: "Avoid heat." },
  { name: "Luna", breed: "Husky", notes: "High energy." }
];

export function DogsPage() {
  const [selectedDog, setSelectedDog] = useState(dogs[0]);

  return (
    <section className="module-card">
      <span className="section-label">Dogs</span>
      <h3>Dogs</h3>
      <p>Manage dog profiles, breeds, notes, and owner relationships.</p>

      <div className="button-list">
        {dogs.map((dog) => (
          <button key={dog.name} onClick={() => setSelectedDog(dog)}>{dog.name}</button>
        ))}
      </div>

      <div className="detail-panel">
        <strong>{selectedDog.name}</strong>
        <span>{selectedDog.breed}</span>
        <p>{selectedDog.notes}</p>
      </div>
    </section>
  );
}