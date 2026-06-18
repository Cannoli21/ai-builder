import { useMemo } from "react";

type Client = { id: number; name: string; dog: string; phone: string };
type Walk = { id: number; dog: string; time: string; status: string };
type Invoice = { id: number; client: string; amount: number; paid: boolean };

const clients: Client[] = [
  { id: 1, name: "Maya Brooks", dog: "Scout", phone: "904-555-0188" },
  { id: 2, name: "Jordan Lee", dog: "Milo", phone: "904-555-0141" }
];

const walks: Walk[] = [
  { id: 1, dog: "Scout", time: "9:00 AM", status: "Scheduled" },
  { id: 2, dog: "Milo", time: "1:30 PM", status: "Scheduled" }
];

const invoices: Invoice[] = [
  { id: 1, client: "Maya Brooks", amount: 80, paid: false },
  { id: 2, client: "Jordan Lee", amount: 45, paid: true }
];

export function Dashboard() {
  const unpaid = useMemo(() => invoices.filter((i) => !i.paid).reduce((sum, i) => sum + i.amount, 0), []);
  const paid = useMemo(() => invoices.filter((i) => i.paid).reduce((sum, i) => sum + i.amount, 0), []);

  return (
    <section className="module-card">
      <span className="section-label">Dashboard</span>
      <h3>Dashboard</h3>
      <p>Business overview with clients, dogs, walks, invoices, and revenue.</p>

      <div className="metric-grid">
        <div className="metric-card"><strong>{clients.length}</strong><span>Clients</span></div>
        <div className="metric-card"><strong>{clients.length}</strong><span>Dogs</span></div>
        <div className="metric-card"><strong>{walks.length}</strong><span>Walks</span></div>
        <div className="metric-card"><strong>{"$" + unpaid}</strong><span>Unpaid</span></div>
      </div>

      <div className="data-list">
        <div className="data-row"><div><strong>Next Walk</strong><span>Scout at 9:00 AM</span></div><span>Scheduled</span></div>
        <div className="data-row"><div><strong>Invoice Due</strong><span>Maya Brooks · $80</span></div><span>Unpaid</span></div>
        <div className="data-row"><div><strong>Collected</strong><span>{"$" + paid + " paid so far"}</span></div><span>Revenue</span></div>
      </div>
    </section>
  );
}