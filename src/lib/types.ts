export type BuilderTool = {
  name: string;
  category: string;
  description: string;
  useCases: string[];
  stack: string[];
  link: string;
};

export type PlannedComponent = {
  name: string;
  purpose: string;
};

export type ProjectPlan = {
  projectName: string;
  description: string;
  pages: string[];
  components: PlannedComponent[];
  features: string[];
  techStack: string[];
  designSystem: string;
  userFlow: string[];
  dataModels: string[];
  tools?: BuilderTool[];
  aiPlannerUsed?: boolean;
};

export type BuildLog = {
  step: string;
  status: string;
  message: string;
};

export type GeneratedFile = {
  path: string;
  content: string;
};
