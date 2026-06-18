import { GeneratedFile, ProjectPlan } from "./types";

type ModuleType = "dashboard" | "crud" | "scheduler" | "invoice" | "analytics";

type ModuleDefinition = {
  id: string;
  title: string;
  description: string;
  type: ModuleType;
};

type PlanWithModules = ProjectPlan & {
  modules?: ModuleDefinition[];
};

function escapeText(input: unknown) {
  return String(input ?? "")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, " ");
}

function componentName(input: unknown) {
  const raw = String(input ?? "Generated").replace(/[^a-zA-Z0-9]/g, "");
  if (!raw) return "Generated";
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

function normalizeModules(plan: PlanWithModules): ModuleDefinition[] {
  if (Array.isArray(plan.modules) && plan.modules.length > 0) {
    return plan.modules.map((module) => ({
      id: String(module.id || module.title || "module").toLowerCase(),
      title: String(module.title || module.id || "Module"),
      description: String(module.description || "Generated business module."),
      type: module.type || "crud",
    }));
  }

  const pages = plan.pages?.length ? plan.pages : ["Dashboard", "Clients", "Dogs", "Walks", "Invoices", "Revenue"];

  return pages.map((page) => {
    const key = page.toLowerCase();

    let type: ModuleType = "crud";
    if (key.includes("dashboard") || key.includes("home")) type = "dashboard";
    if (key.includes("walk") || key.includes("schedule")) type = "scheduler";
    if (key.includes("invoice")) type = "invoice";
    if (key.includes("revenue") || key.includes("analytics")) type = "analytics";

    return {
      id: key.replace(/[^a-z0-9]/g, "") || "module",
      title: page === "Home" ? "Dashboard" : page,
      description: sectionDescription(page),
      type,
    };
  });
}

function sectionDescription(page: string) {
  const key = page.toLowerCase();

  if (key.includes("dashboard") || key.includes("home")) return "Business overview with clients, dogs, walks, invoices, and revenue.";
  if (key.includes("client")) return "Manage customers, contact info, dogs, and service notes.";
  if (key.includes("dog")) return "View dog profiles, care notes, and owner relationships.";
  if (key.includes("walk")) return "Schedule walks, track status, and complete appointments.";
  if (key.includes("invoice")) return "Create invoices, track payments, and view unpaid balances.";
  if (key.includes("revenue")) return "Review weekly income, unpaid balances, and business performance.";
  if (key.includes("setting")) return "Configure pricing, services, business preferences, and defaults.";

  return `${page} business screen for this generated product.`;
}

function generatedComponentCode(module: ModuleDefinition) {
  const exportName = componentName(module.title);
  const safeTitle = escapeText(module.title);
  const safePurpose = escapeText(module.description);

  if (module.type === "dashboard") {
    return `import { useMemo } from "react";

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

export function ${exportName}() {
  const unpaid = useMemo(() => invoices.filter((i) => !i.paid).reduce((sum, i) => sum + i.amount, 0), []);
  const paid = useMemo(() => invoices.filter((i) => i.paid).reduce((sum, i) => sum + i.amount, 0), []);

  return (
    <section className="module-card">
      <span className="section-label">Dashboard</span>
      <h3>${safeTitle}</h3>
      <p>${safePurpose}</p>

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
}`;
  }

  if (module.id.includes("client") || module.title.toLowerCase().includes("client")) {
    return `import { useEffect, useState } from "react";

type Client = { id: number; name: string; dog: string; phone: string };

const defaultClients: Client[] = [
  { id: 1, name: "Maya Brooks", dog: "Scout", phone: "904-555-0188" },
  { id: 2, name: "Jordan Lee", dog: "Milo", phone: "904-555-0141" }
];

export function ${exportName}() {
  const [clients, setClients] = useState<Client[]>(() => {
    const saved = localStorage.getItem("dogwalk_clients");
    return saved ? JSON.parse(saved) : defaultClients;
  });
  const [name, setName] = useState("");
  const [dog, setDog] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    localStorage.setItem("dogwalk_clients", JSON.stringify(clients));
  }, [clients]);

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
      <h3>${safeTitle}</h3>
      <p>${safePurpose}</p>

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
}`;
  }

  if (module.id.includes("dog") || module.title.toLowerCase().includes("dog")) {
    return `import { useState } from "react";

const dogs = [
  { name: "Scout", breed: "Golden Retriever", owner: "Maya Brooks", notes: "Loves long walks." },
  { name: "Milo", breed: "French Bulldog", owner: "Jordan Lee", notes: "Avoid heat." },
  { name: "Luna", breed: "Husky", owner: "Maya Brooks", notes: "High energy." }
];

export function ${exportName}() {
  const [selectedDog, setSelectedDog] = useState(dogs[0]);

  return (
    <section className="module-card">
      <span className="section-label">Dogs</span>
      <h3>${safeTitle}</h3>
      <p>${safePurpose}</p>

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
}`;
  }

  if (module.type === "scheduler") {
    return `import { useEffect, useState } from "react";

type Walk = { id: number; dog: string; time: string; status: string };

const defaultWalks: Walk[] = [
  { id: 1, dog: "Scout", time: "9:00 AM", status: "Scheduled" },
  { id: 2, dog: "Milo", time: "1:30 PM", status: "Scheduled" }
];

export function ${exportName}() {
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
      <h3>${safeTitle}</h3>
      <p>${safePurpose}</p>

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
}`;
  }

  if (module.type === "invoice") {
    return `import { useEffect, useMemo, useState } from "react";

type Invoice = { id: number; client: string; amount: number; paid: boolean };

const defaultInvoices: Invoice[] = [
  { id: 1, client: "Maya Brooks", amount: 80, paid: false },
  { id: 2, client: "Jordan Lee", amount: 45, paid: true }
];

export function ${exportName}() {
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
      <h3>${safeTitle}</h3>
      <p>${safePurpose}</p>

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
}`;
  }

  if (module.type === "analytics") {
    return `const revenue = [
  { label: "Mon", value: 80 },
  { label: "Tue", value: 120 },
  { label: "Wed", value: 60 },
  { label: "Thu", value: 150 },
  { label: "Fri", value: 90 }
];

export function ${exportName}() {
  const total = revenue.reduce((sum, day) => sum + day.value, 0);

  return (
    <section className="module-card">
      <span className="section-label">Revenue</span>
      <h3>${safeTitle}</h3>
      <p>${safePurpose}</p>

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
}`;
  }

  return `export function ${exportName}() {
  return (
    <section className="module-card">
      <span className="section-label">Workspace</span>
      <h3>${safeTitle}</h3>
      <p>${safePurpose}</p>
    </section>
  );
}`;
}

export function generateFiles(plan: PlanWithModules): GeneratedFile[] {
  const safeName = escapeText(plan.projectName);
  const safeDescription = escapeText(plan.description);
  const modules = normalizeModules(plan);

  const imports = modules
    .map((module) => {
      const name = componentName(module.title);
      return `import { ${name} } from "./generated/${name}";`;
    })
    .join("\n");

  const componentRender = modules
    .map((module) => {
      const name = componentName(module.title);
      return `            {activePage === "${escapeText(module.title)}" && <${name} />}`;
    })
    .join("\n");

  const pageCards = modules
    .map((module) => {
      const safePage = escapeText(module.title);
      const safeDesc = escapeText(module.description);

      return `          <button onClick={() => setActivePage("${safePage}")} className={activePage === "${safePage}" ? "card card-active" : "card"}>
            <span>${safePage}</span>
            <p>${safeDesc}</p>
          </button>`;
    })
    .join("\n");

  const defaultPage = escapeText(modules[0]?.title ?? "Dashboard");

  const files: GeneratedFile[] = [
    {
      path: "/package.json",
      content: `{"name":"buildloop-generated-app","version":"0.1.0","private":true,"type":"module","scripts":{"dev":"vite --host 0.0.0.0 --port 3010","build":"vite build","start":"vite --host 0.0.0.0 --port 3010"},"dependencies":{"@vitejs/plugin-react":"latest","vite":"latest","typescript":"latest","react":"latest","react-dom":"latest"},"devDependencies":{"@types/react":"latest","@types/react-dom":"latest"}}`
    },
    {
      path: "/index.html",
      content: `<div id="root"></div><script type="module" src="/src/main.tsx"></script>`
    },
    {
      path: "/tsconfig.json",
      content: `{"compilerOptions":{"target":"ES2020","lib":["DOM","DOM.Iterable","ES2020"],"skipLibCheck":true,"strict":false,"module":"ESNext","moduleResolution":"Bundler","jsx":"react-jsx","ignoreDeprecations":"6.0"},"include":["src"]}`
    },
    {
      path: "/src/main.tsx",
      content: `import React, { useState } from "react";
import { createRoot } from "react-dom/client";
${imports}
import "./styles.css";

function App() {
  const [activePage, setActivePage] = useState("${defaultPage}");

  return (
    <main className="app">
      <section className="hero">
        <p className="eyebrow">Business OS</p>
        <h1>${safeName}</h1>
        <p className="description">${safeDescription}</p>

        <div className="grid">
${pageCards}
        </div>

        <section className="component-showcase">
          <span className="section-label">{activePage}</span>
          <h2>{activePage}</h2>
          <div className="screen-stack">
${componentRender}
          </div>
        </section>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);`
    },
    {
      path: "/src/styles.css",
      content: `*{box-sizing:border-box}body{margin:0;background:#000;color:white;font-family:Inter,Arial,sans-serif}button{color:inherit;font:inherit;cursor:pointer}.app{min-height:100vh;background:radial-gradient(circle at top,rgba(255,255,255,.12),transparent 34%),radial-gradient(circle at 20% 20%,rgba(80,120,255,.10),transparent 24%),#000;padding:48px}.hero{max-width:1080px;margin:0 auto}.eyebrow,.section-label{color:rgba(255,255,255,.42);font-size:12px;letter-spacing:.35em;text-transform:uppercase}h1{margin:24px 0 0;font-size:clamp(48px,8vw,88px);line-height:.95;letter-spacing:-.06em}.description{max-width:680px;color:rgba(255,255,255,.60);font-size:18px;line-height:1.7}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:40px}.card,.component-showcase,.module-card{border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.05);border-radius:24px}.card{min-height:130px;padding:24px;text-align:left;transition:180ms ease}.card:hover,.card-active{border-color:rgba(255,255,255,.55);background:rgba(255,255,255,.10);transform:translateY(-2px)}.card span{display:block;font-size:20px;font-weight:700}.card p,.module-card p{color:rgba(255,255,255,.58);line-height:1.6}.component-showcase{margin-top:24px;padding:28px}.component-showcase h2{font-size:42px;margin:14px 0 0;letter-spacing:-.04em}.screen-stack{margin-top:24px}.module-card{padding:22px}.module-card h3{margin:10px 0;font-size:22px}.metric-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:18px}.metric-card{margin-top:16px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.06);border-radius:14px;padding:14px}.metric-card strong{display:block;font-size:32px}.metric-card span{display:block;color:rgba(255,255,255,.55);margin-top:4px}.form-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-top:18px}.form-grid input{border:1px solid rgba(255,255,255,.1);background:rgba(0,0,0,.35);color:white;border-radius:12px;padding:12px}.form-grid button,.data-row button,.button-list button{border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.08);border-radius:12px;padding:12px}.data-list{display:grid;gap:10px;margin-top:16px}.data-row{display:flex;align-items:center;justify-content:space-between;gap:12px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.06);border-radius:14px;padding:12px}.data-row span,.detail-panel span{display:block;color:rgba(255,255,255,.55);margin-top:4px}.button-list{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:16px}.detail-panel{margin-top:16px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.06);border-radius:14px;padding:14px}.bar-chart{display:flex;align-items:end;gap:12px;height:170px;margin-top:18px}.bar-chart div{display:grid;gap:8px;text-align:center}.bar-chart span{display:block;width:32px;border-radius:10px;background:rgba(255,255,255,.35)}.primary-action{margin-top:14px;border:1px solid rgba(255,255,255,.18);background:white;color:black;border-radius:14px;padding:12px 16px;font-weight:700}@media(max-width:820px){.app{padding:24px}.grid,.metric-grid,.form-grid,.button-list{grid-template-columns:1fr}}`
    }
  ];

  for (const module of modules) {
    const name = componentName(module.title);

    files.push({
      path: `/src/generated/${name}.tsx`,
      content: generatedComponentCode(module)
    });
  }

  return files;
}
