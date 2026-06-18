export function DashboardPage() {
  return (
    <section className="module-card">
      <span className="section-label">Dashboard</span>
      <h3>Dashboard</h3>
      <p>Show clients, scheduled walks, unpaid invoices, and weekly revenue.</p>

      <div className="metric-grid">
        <div className="metric-card"><strong>12</strong><span>Active Clients</span></div>
        <div className="metric-card"><strong>18</strong><span>Dogs Managed</span></div>
        <div className="metric-card"><strong>8</strong><span>Walks Scheduled</span></div>
        <div className="metric-card"><strong>$240</strong><span>Unpaid Invoices</span></div>
      </div>

      <div className="data-list">
        <div className="data-row"><div><strong>Next Walk</strong><span>Scout at 9:00 AM</span></div><span>Scheduled</span></div>
        <div className="data-row"><div><strong>Invoice Due</strong><span>Maya Brooks · $80</span></div><span>Unpaid</span></div>
        <div className="data-row"><div><strong>Weekly Revenue</strong><span>$500 collected this week</span></div><span>Healthy</span></div>
      </div>
    </section>
  );
}