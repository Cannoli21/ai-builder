import { NextResponse } from "next/server";
import type { GeneratedPlan, ModuleDefinition } from "@/types/app-schema";

function titleCase(input: string) {
  return input
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function module(id: string, title: string, description: string, type: ModuleDefinition["type"]): ModuleDefinition {
  return { id, title, description, type };
}

function planFromPrompt(prompt: string): GeneratedPlan {
  const lower = prompt.toLowerCase();

  if (lower.includes("dog") || lower.includes("pet") || lower.includes("walk")) {
    return {
      projectName: "Dog Walking Business Manager",
      description: "Manage clients, dogs, walks, invoices, payments, and weekly revenue for a dog walking business.",
      modules: [
        module("dashboard", "Dashboard", "Business overview with clients, dogs, walks, invoices, and revenue.", "dashboard"),
        module("clients", "Clients", "Create, edit, and delete dog walking clients.", "crud"),
        module("dogs", "Dogs", "Manage dog profiles and connect each dog to an owner.", "crud"),
        module("walks", "Walks", "Schedule walks, track status, and mark walks complete.", "scheduler"),
        module("invoices", "Invoices", "Create invoices, track unpaid balances, and mark invoices paid.", "invoice"),
        module("revenue", "Revenue", "Review paid revenue, unpaid invoices, and weekly business performance.", "analytics"),
      ],
    };
  }

  if (lower.includes("lawn") || lower.includes("landscap")) {
    return {
      projectName: "Lawn Care Business Manager",
      description: "Manage customers, properties, jobs, invoices, payments, and weekly revenue for a lawn care business.",
      modules: [
        module("dashboard", "Dashboard", "Business overview with customers, properties, jobs, invoices, and revenue.", "dashboard"),
        module("customers", "Customers", "Create, edit, and delete lawn care customers.", "crud"),
        module("properties", "Properties", "Track service addresses, yard notes, and customer properties.", "crud"),
        module("jobs", "Jobs", "Schedule mowing, edging, cleanup, and recurring lawn jobs.", "scheduler"),
        module("invoices", "Invoices", "Create invoices, track unpaid balances, and mark invoices paid.", "invoice"),
        module("revenue", "Revenue", "Review weekly income, unpaid invoices, and job performance.", "analytics"),
      ],
    };
  }

  if (lower.includes("clean")) {
    return {
      projectName: "Cleaning Service CRM",
      description: "Manage clients, appointments, employees, invoices, payments, and cleaning revenue.",
      modules: [
        module("dashboard", "Dashboard", "Business overview with clients, appointments, employees, invoices, and revenue.", "dashboard"),
        module("clients", "Clients", "Create, edit, and delete cleaning service clients.", "crud"),
        module("appointments", "Appointments", "Schedule residential and commercial cleaning appointments.", "scheduler"),
        module("employees", "Employees", "Track cleaners, assignments, and availability.", "crud"),
        module("invoices", "Invoices", "Create invoices, track unpaid balances, and mark invoices paid.", "invoice"),
        module("revenue", "Revenue", "Review weekly revenue, unpaid invoices, and cleaning performance.", "analytics"),
      ],
    };
  }

  if (lower.includes("detailing") || lower.includes("detail") || lower.includes("car")) {
    return {
      projectName: "Mobile Detailing Business Manager",
      description: "Manage customers, bookings, packages, invoices, payments, and detailing revenue.",
      modules: [
        module("dashboard", "Dashboard", "Business overview with customers, bookings, packages, invoices, and revenue.", "dashboard"),
        module("customers", "Customers", "Create, edit, and delete detailing customers.", "crud"),
        module("bookings", "Bookings", "Schedule mobile detailing jobs and track status.", "scheduler"),
        module("packages", "Packages", "Manage detailing packages, prices, and service options.", "crud"),
        module("invoices", "Invoices", "Create invoices, track unpaid balances, and mark invoices paid.", "invoice"),
        module("revenue", "Revenue", "Review weekly detailing revenue and payment performance.", "analytics"),
      ],
    };
  }

  if (lower.includes("tattoo")) {
    return {
      projectName: "Tattoo Studio Manager",
      description: "Manage artists, appointments, customers, invoices, payments, and studio revenue.",
      modules: [
        module("dashboard", "Dashboard", "Business overview with artists, appointments, customers, invoices, and revenue.", "dashboard"),
        module("artists", "Artists", "Create, edit, and delete tattoo artist profiles.", "crud"),
        module("appointments", "Appointments", "Schedule tattoo appointments and track appointment status.", "scheduler"),
        module("customers", "Customers", "Manage customer profiles, notes, and contact information.", "crud"),
        module("invoices", "Invoices", "Create invoices, track deposits, and mark invoices paid.", "invoice"),
        module("revenue", "Revenue", "Review weekly studio revenue and unpaid balances.", "analytics"),
      ],
    };
  }

  const cleanName = titleCase(prompt).slice(0, 60) || "Business Manager";

  return {
    projectName: cleanName.includes("Manager") ? cleanName : `${cleanName} Manager`,
    description: prompt || "Manage records, schedules, invoices, payments, and revenue.",
    modules: [
      module("dashboard", "Dashboard", "Business overview and recent activity.", "dashboard"),
      module("customers", "Customers", "Create, edit, and delete customers.", "crud"),
      module("jobs", "Jobs", "Schedule work and track status.", "scheduler"),
      module("invoices", "Invoices", "Create invoices and track payments.", "invoice"),
      module("revenue", "Revenue", "Review business revenue and performance.", "analytics"),
    ],
  };
}

export async function POST(req: Request) {
  const body = await req.json();
  const prompt = String(body.prompt ?? "");
  return NextResponse.json(planFromPrompt(prompt));
}
