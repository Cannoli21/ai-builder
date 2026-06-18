import { useState } from "react";

type Client = { id: number; name: string; dog: string; phone: string };

export function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([
    { id: 1, name: "Maya Brooks", dog: "Scout", phone: "904-555-0188" },
    { id: 2, name: "Jordan Lee", dog: "Milo", phone: "904-555-0141" }
  ]);
  const [name, setName] = useState("");
  const [dog, setDog] = useState("");
  const [phone, setPhone] = useState("");

  function addClient() {
    if (!name.trim() || !dog.trim()) return;
    setClients([...clients, { id: Date.now(), name, dog, phone: phone || "No phone" }]);
    setName("");
    setDog("");
    setPhone("");
  }

  function removeClient(id: number) {
    setClients(clients.filter((client) => client.id !== id));
  }

  return (
    <section className="module-card">
      <span className="section-label">Clients</span>
      <h3>Clients</h3>
      <p>Create, view, and remove dog walking clients.</p>

      <div className="form-grid">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Client name" />
        <input value={dog} onChange={(e) => setDog(e.target.value)} placeholder="Dog name" />
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
        <button onClick={addClient}>Add Client</button>
      </div>

      <div className="data-list">
        {clients.map((client) => (
          <div key={client.id} className="data-row">
            <div>
              <strong>{client.name}</strong>
              <span>{client.dog} · {client.phone}</span>
            </div>
            <button onClick={() => removeClient(client.id)}>Remove</button>
          </div>
        ))}
      </div>
    </section>
  );
}