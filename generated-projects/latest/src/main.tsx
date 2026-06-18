import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Dashboard } from "./generated/Dashboard";
import { Clients } from "./generated/Clients";
import { Dogs } from "./generated/Dogs";
import { Walks } from "./generated/Walks";
import { Invoices } from "./generated/Invoices";
import { Revenue } from "./generated/Revenue";
import "./styles.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <main className="app">
      <section className="hero">
        <p className="eyebrow">Business OS</p>
        <h1>Dog Walking Business Manager</h1>
        <p className="description">Manage clients, dogs, walks, invoices, payments, and weekly revenue for a dog walking business.</p>

        <div className="grid">
          <button onClick={() => setActivePage("Dashboard")} className={activePage === "Dashboard" ? "card card-active" : "card"}>
            <span>Dashboard</span>
            <p>Business overview with clients, dogs, walks, invoices, and revenue.</p>
          </button>
          <button onClick={() => setActivePage("Clients")} className={activePage === "Clients" ? "card card-active" : "card"}>
            <span>Clients</span>
            <p>Create, edit, and delete dog walking clients.</p>
          </button>
          <button onClick={() => setActivePage("Dogs")} className={activePage === "Dogs" ? "card card-active" : "card"}>
            <span>Dogs</span>
            <p>Manage dog profiles and connect each dog to an owner.</p>
          </button>
          <button onClick={() => setActivePage("Walks")} className={activePage === "Walks" ? "card card-active" : "card"}>
            <span>Walks</span>
            <p>Schedule walks, track status, and mark walks complete.</p>
          </button>
          <button onClick={() => setActivePage("Invoices")} className={activePage === "Invoices" ? "card card-active" : "card"}>
            <span>Invoices</span>
            <p>Create invoices, track unpaid balances, and mark invoices paid.</p>
          </button>
          <button onClick={() => setActivePage("Revenue")} className={activePage === "Revenue" ? "card card-active" : "card"}>
            <span>Revenue</span>
            <p>Review paid revenue, unpaid invoices, and weekly business performance.</p>
          </button>
        </div>

        <section className="component-showcase">
          <span className="section-label">{activePage}</span>
          <h2>{activePage}</h2>
          <div className="screen-stack">
            {activePage === "Dashboard" && <Dashboard />}
            {activePage === "Clients" && <Clients />}
            {activePage === "Dogs" && <Dogs />}
            {activePage === "Walks" && <Walks />}
            {activePage === "Invoices" && <Invoices />}
            {activePage === "Revenue" && <Revenue />}
          </div>
        </section>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);