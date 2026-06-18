import { NextResponse } from "next/server";
import { exec, spawn } from "child_process";
import fs from "fs";
import path from "path";
import { attemptRepair } from "@/lib/repair";

type CommandResult = {
  command: string;
  success: boolean;
  stdout: string;
  stderr: string;
};

function runCommand(command: string, cwd: string): Promise<CommandResult> {
  return new Promise((resolve) => {
    exec(command, { cwd, timeout: 120000, windowsHide: true }, (error, stdout, stderr) => {
      resolve({ command, success: !error, stdout, stderr });
    });
  });
}

function launchGeneratedApp(projectDir: string) {
  spawn("npm", ["run", "dev"], {
    cwd: projectDir,
    detached: true,
    shell: true,
    stdio: "ignore",
  }).unref();
}

async function runBuild(projectDir: string) {
  const installResult = await runCommand("npm install", projectDir);

  if (!installResult.success) {
    return { success: false, step: "npm install", logs: [installResult] };
  }

  const buildResult = await runCommand("npm run build", projectDir);

  return {
    success: buildResult.success,
    step: "npm run build",
    logs: [installResult, buildResult],
  };
}

export async function POST() {
  const projectDir = path.join(process.cwd(), "generated-projects", "latest");
  const packageJson = path.join(projectDir, "package.json");

  if (!fs.existsSync(projectDir) || !fs.existsSync(packageJson)) {
    return NextResponse.json({
      success: false,
      step: "preflight",
      repair: null,
      previewUrl: null,
      logs: [
        {
          command: "preflight",
          success: false,
          stdout: "",
          stderr: "Generated project or package.json does not exist. Click Generate App first.",
        },
      ],
    });
  }

  const firstResult = await runBuild(projectDir);

  if (firstResult.success) {
    launchGeneratedApp(projectDir);

    return NextResponse.json({
      ...firstResult,
      repaired: false,
      repair: null,
      attempts: 1,
      previewUrl: "http://localhost:3010",
    });
  }

  const errorText = firstResult.logs.map((log) => `${log.stdout}\n${log.stderr}`).join("\n");
  const repair = await attemptRepair(errorText);

  if (!repair.repaired) {
    return NextResponse.json({
      ...firstResult,
      repaired: false,
      repair,
      attempts: 1,
      previewUrl: null,
    });
  }

  const secondResult = await runBuild(projectDir);

  if (secondResult.success) {
    launchGeneratedApp(projectDir);
  }

  return NextResponse.json({
    ...secondResult,
    repaired: true,
    repair,
    attempts: 2,
    previousLogs: firstResult.logs,
    previewUrl: secondResult.success ? "http://localhost:3010" : null,
  });
}
