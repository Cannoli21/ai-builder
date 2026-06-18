import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const body = await req.json();
  const files = Array.isArray(body.files) ? body.files : [];

  const outputDir = path.join(process.cwd(), "generated-projects", "latest");

  fs.mkdirSync(outputDir, { recursive: true });

  for (const file of files) {
    if (!file || typeof file.path !== "string") continue;

    const safePath = file.path.replace(/^[/\\]+/, "");
    const fullPath = path.join(outputDir, safePath);

    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, String(file.content ?? ""), "utf8");
  }

  return NextResponse.json({
    success: true,
    outputDir,
    fileCount: files.length,
  });
}
