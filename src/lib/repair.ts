import { classifyError } from "./errorClassifier";
import { applyFix } from "./fixers";

export async function attemptRepair(errorText: string) {
  const classified = classifyError(errorText);

  if (classified.type === "unknown") {
    return {
      repaired: false,
      type: classified.type,
      message: "Unknown error. No repair applied.",
    };
  }

  await applyFix(classified);

  return {
    repaired: true,
    type: classified.type,
    message: `Applied repair for ${classified.type}.`,
  };
}
