export type ClassifiedError =
  | { type: "missing_css" }
  | { type: "next_link" }
  | { type: "missing_module" }
  | { type: "typescript_deprecation" }
  | { type: "unknown" };

export function classifyError(errorText: string): ClassifiedError {
  const text = errorText.toLowerCase();

  if (text.includes("styles.css") || text.includes("*.css")) {
    return { type: "missing_css" };
  }

  if (text.includes("no-html-link-for-pages") || text.includes("use link instead of")) {
    return { type: "next_link" };
  }

  if (text.includes("cannot find module")) {
    return { type: "missing_module" };
  }

  if (text.includes("ignoredeprecations") || text.includes("moduleresolution")) {
    return { type: "typescript_deprecation" };
  }

  return { type: "unknown" };
}
