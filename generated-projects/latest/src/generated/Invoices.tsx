import { useEffect, useMemo, useState } from "react";

type Invoice = { id: number; client: string; amount: number; paid: boolean };

const defaultInvoices: Invoice[] = [
  { id: 1, client: "Maya Brooks", amount: 80, paid: false },
  { id: 2, client: "Jordan Lee", amount: 45, paid: true }
];

export function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem("dogwalk_invoices");
    return saved ? JSON.parse(saved) : defaultInvoices;
  });

  useEffect(() => {
    localStorage.setItem("dogwalk_invoices", JSON.stringify(invoices));
  }, [invoices]);

  const unpaid = useMemo(
    () => invoices.filter((invoice) => !invoice.paid).reduce((sum, invoice) => sum + invoice.amount, 0),
    [invoices]
  );

  function createInvoice() {
    setInvoices([...invoices, { id: Date.now(), client: "New Client", amount: 60, paid: false }]);
  }

  function markPaid(id: number) {
    setInvoices(invoices.map((invoice) => invoice.id === id ? { ...invoice, paid: true } : invoice));
  }

  return (
    <section className="module-card">
      <span className="section-label">Invoices</span>
      <h3>Invoices</h3>
      <p>Create invoices, track unpaid balances, and mark invoices paid.</p>

      <div className="metric-card">
        <strong>{"$" + unpaid}</strong>
        <span>Unpaid balance</span>
      </div>

      <button className="primary-action" onClick={createInvoice}>Create Invoice</button>

      <div className="data-list">
        {invoices.map((invoice) => (
          <div key={invoice.id} className="data-row">
            <div>
              <strong>{invoice.client}</strong>
              <span>{"$" + invoice.amount} · {invoice.paid ? "Paid" : "Unpaid"}</span>
            </div>
            {!invoice.paid && <button onClick={() => markPaid(invoice.id)}>Mark Paid</button>}
          </div>
        ))}
      </div>
    </section>
  );
}