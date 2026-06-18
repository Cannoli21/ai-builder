const revenue = [
  { label: "Mon", value: 80 },
  { label: "Tue", value: 120 },
  { label: "Wed", value: 60 },
  { label: "Thu", value: 150 },
  { label: "Fri", value: 90 }
];

export function RevenueTracker() {
  const total = revenue.reduce((sum, day) => sum + day.value, 0);

  return (
    <section className="module-card">
      <span className="section-label">Revenue Module</span>
      <h3>RevenueTracker</h3>
      <p>Show weekly revenue and unpaid balances.</p>

      <div className="metric-card">
        <strong>{"$" + total}</strong>
        <span>Weekly revenue</span>
      </div>

      <div className="bar-chart">
        {revenue.map((day) => (
          <div key={day.label}>
            <span style={{ height: day.value }}></span>
            <small>{day.label}</small>
          </div>
        ))}
      </div>
    </section>
  );
}