import { useState } from "react";

const dogs = [
  { name: "Scout", breed: "Golden Retriever", notes: "Loves long walks." },
  { name: "Milo", breed: "French Bulldog", notes: "Avoid heat." },
  { name: "Luna", breed: "Husky", notes: "High energy." }
];

export function DogProfileCards() {
  const [selectedDog, setSelectedDog] = useState(dogs[0]);

  return (
    <section className="module-card">
      <span className="section-label">Dog Profile Module</span>
      <h3>DogProfileCards</h3>
      <p>Track each dog, breed, notes, and care instructions.</p>

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