export type ModuleType = "dashboard" | "crud" | "scheduler" | "invoice" | "analytics";

export interface ModuleDefinition {
  id: string;
  title: string;
  description: string;
  type: ModuleType;
}

export interface GeneratedPlan {
  projectName: string;
  description: string;
  modules: ModuleDefinition[];
  pages?: string[];
  components?: { name: string; purpose: string }[];
  features?: string[];
  techStack?: string[];
  userFlow?: string[];
  dataModels?: string[];
}
