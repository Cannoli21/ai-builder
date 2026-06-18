import { ProjectPlan } from "./types";

export function createPlan(prompt: string): ProjectPlan {
  return {
    projectName: "VisionLab",
    description: prompt || "An interactive web app for perception experiments.",
    pages: ["Home", "Blind Spot", "Purkinje Tree", "Afterimages"],
    components: [
      { name: "Hero", purpose: "Landing section with project title and CTA" },
      { name: "ExperimentCard", purpose: "Interactive card for each perception experiment" },
      { name: "BuilderPanel", purpose: "Panel for configuring and customizing experiments" },
      { name: "PreviewPanel", purpose: "Live preview of generated experiments" },
    ],
    features: [
      "Prompt-to-plan conversion",
      "Generated app preview",
      "Build status timeline",
      "Repair loop simulation"
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    designSystem: "Apple Vision Pro inspired dark interface",
    userFlow: ["Home → Experiment Select → Configure → Preview → Run"],
    dataModels: ["Experiment", "UserSession", "Result"],
  };
}
