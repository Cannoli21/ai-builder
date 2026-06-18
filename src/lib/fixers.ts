import fs from "fs";
import path from "path";
import type { ClassifiedError } from "./errorClassifier";

const projectDir = path.join(process.cwd(), "generated-projects", "latest");

function writeIfMissing(filePath: string, content: string) {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content, "utf8");
  }
}

function replaceInFile(filePath: string, find: string | RegExp, replacement: string) {
  if (!fs.existsSync(filePath)) return;

  const current = fs.readFileSync(filePath, "utf8");
  const next = current.replace(find, replacement);

  if (next !== current) {
    fs.writeFileSync(filePath, next, "utf8");
  }
}

function walkFiles(dir: string, extensions: string[]): string[] {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...walkFiles(fullPath, extensions));
    } else if (extensions.some((ext) => fullPath.endsWith(ext))) {
      files.push(fullPath);
    }
  }

  return files;
}

export async function applyFix(error: ClassifiedError) {
  if (error.type === "missing_css") {
    writeIfMissing(
      path.join(projectDir, "src", "styles.css"),
      `body {
  margin: 0;
  background: #000;
  color: #fff;
  font-family: Arial, sans-serif;
}`
    );

    writeIfMissing(
      path.join(projectDir, "global.d.ts"),
      `declare module "*.css";`
    );
  }

  if (error.type === "next_link") {
    const files = walkFiles(path.join(projectDir, "app"), [".tsx", ".ts"]);

    for (const file of files) {
      replaceInFile(file, /<a href="\/"([^>]*)>/g, '<Link href="/"$1>');
      replaceInFile(file, /<\/a>/g, "</Link>");

      const content = fs.readFileSync(file, "utf8");

      if (content.includes("<Link") && !content.includes('from "next/link"')) {
        fs.writeFileSync(file, `import Link from "next/link";\n\n${content}`, "utf8");
      }
    }
  }

  if (error.type === "typescript_deprecation") {
    const tsconfigPath = path.join(projectDir, "tsconfig.json");

    if (fs.existsSync(tsconfigPath)) {
      const config = JSON.parse(fs.readFileSync(tsconfigPath, "utf8"));
      config.compilerOptions = config.compilerOptions ?? {};
      config.compilerOptions.moduleResolution = "bundler";
      config.compilerOptions.ignoreDeprecations = "6.0";
      fs.writeFileSync(tsconfigPath, JSON.stringify(config, null, 2), "utf8");
    }
  }
}
