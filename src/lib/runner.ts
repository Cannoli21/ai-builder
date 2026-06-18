import { BuildLog } from "./types";

export function simulateBuild(): BuildLog[] {
  return [
    {
      step: "Planning",
      status: "success",
      message: "Project plan created."
    },
    {
      step: "Generating files",
      status: "success",
      message: "React files generated."
    },
    {
      step: "Running build",
      status: "success",
      message: "Build completed successfully."
    },
    {
      step: "Repair loop",
      status: "success",
      message: "No repair needed."
    },
    {
      step: "Preview",
      status: "success",
      message: "Preview ready."
    }
  ];
}
