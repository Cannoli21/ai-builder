"use client";

import { useState } from "react";
import { generateFiles } from "@/lib/builder";
import { simulateBuild } from "@/lib/runner";
import type { ProjectPlan } from "@/lib/types";

type BuildResult = {
  success: boolean;
  step: string;
  previewUrl?: string | null;
  logs: {
    command: string;
    success: boolean;
    stdout: string;
    stderr: string;
  }[];
};

type ComponentLike = string | { name?: unknown; purpose?: unknown };

function componentLabel(item: ComponentLike) {
  if (typeof item === "string") return item;

  return `${String(item.name ?? "Component")} - ${String(
    item.purpose ?? "No purpose provided"
  )}`;
}

function componentKey(item: ComponentLike, index: number) {
  if (typeof item === "string") return `${item}-${index}`;
  return `${String(item.name ?? "component")}-${index}`;
}

export function BuilderShell() {
  const [prompt, setPrompt] = useState("Build a browser-based motion editor for SaaS demo videos");
  const [plan, setPlan] = useState<ProjectPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [building, setBuilding] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");
  const [buildResult, setBuildResult] = useState<BuildResult | null>(null);
  const [generatedAppUrl, setGeneratedAppUrl] = useState<string | null>(null);

  const logs = simulateBuild();
  const files = plan ? generateFiles(plan) : [];

  async function handleGenerate() {
    setLoading(true);
    setSavedMessage("");
    setBuildResult(null);
    setGeneratedAppUrl(null);

    const response = await fetch("/api/plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    const generatedFiles = generateFiles(data);

    const generateResponse = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ files: generatedFiles }),
    });

    const generateResult = await generateResponse.json();

    setPlan(data);
    setSavedMessage(
      generateResult.success
        ? `Files saved to generated-projects/latest (${generateResult.fileCount})`
        : "File generation failed"
    );
    setLoading(false);
  }

  async function handleBuild() {
    setBuilding(true);
    setBuildResult(null);
    setGeneratedAppUrl(null);

    const response = await fetch("/api/build", { method: "POST" });
    const data = await response.json();

    setBuildResult(data);

    if (data.success && data.previewUrl) {
      setGeneratedAppUrl(data.previewUrl);
    }

    setBuilding(false);
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-6 lg:grid-cols-[380px_1fr]">
        <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-white/40">AI Builder</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">BuildLoop</h1>
          <p className="mt-3 text-sm leading-6 text-white/55">
            Prompt - Plan - Generate - Save - Build - Repair - Preview.
          </p>

          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            className="mt-6 h-36 w-full resize-none rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white outline-none placeholder:text-white/30"
          />

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-4 w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-black disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate App"}
          </button>

          <button
            onClick={handleBuild}
            disabled={!plan || building}
            className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white disabled:opacity-30"
          >
            {building ? "Building..." : "Run Build"}
          </button>

          {generatedAppUrl && (
            <a
              href={generatedAppUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex w-full items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-300"
            >
              Open Generated App
            </a>
          )}

          {savedMessage && (
            <p className="mt-3 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-xs text-emerald-300">
              {savedMessage}
            </p>
          )}

          {buildResult && (
            <p
              className={
                buildResult.success
                  ? "mt-3 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-xs text-emerald-300"
                  : "mt-3 rounded-xl border border-red-400/20 bg-red-400/10 p-3 text-xs text-red-300"
              }
            >
              Build {buildResult.success ? "passed" : "failed"} at step: {buildResult.step}
            </p>
          )}

          <div className="mt-6 space-y-3">
            {logs.map((log) => (
              <div key={log.step} className="rounded-2xl border border-white/10 bg-black/30 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{log.step}</p>
                  <span className="text-xs text-emerald-400">{log.status}</span>
                </div>
                <p className="mt-1 text-xs text-white/45">{log.message}</p>
              </div>
            ))}
          </div>
        </aside>

        <section className="grid gap-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-white/35">Planner Output</p>

            {!plan ? (
              <p className="mt-4 text-white/45">Click Generate App to call the planner API.</p>
            ) : (
              <>
                <h2 className="mt-3 text-3xl font-semibold">{plan.projectName}</h2>
                <p className="mt-2 text-white/50">{plan.description}</p>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="text-sm font-semibold">Pages</p>
                    <ul className="mt-3 space-y-2 text-sm text-white/50">
                      {(plan.pages ?? []).map((item, index) => (
                        <li key={`${item}-${index}`}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="text-sm font-semibold">Components</p>
                    <ul className="mt-3 space-y-2 text-sm text-white/50">
                      {((plan.components ?? []) as ComponentLike[]).map((item, index) => (
                        <li key={componentKey(item, index)}>{componentLabel(item)}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="text-sm font-semibold">Features</p>
                    <ul className="mt-3 space-y-2 text-sm text-white/50">
                      {(plan.features ?? []).map((item, index) => (
                        <li key={`${item}-${index}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="text-sm font-semibold">Tech Stack</p>
                    <ul className="mt-3 space-y-2 text-sm text-white/50">
                      {(plan.techStack ?? []).map((item, index) => (
                        <li key={`${item}-${index}`}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="text-sm font-semibold">User Flow</p>
                    <ul className="mt-3 space-y-2 text-sm text-white/50">
                      {(plan.userFlow ?? []).map((item, index) => (
                        <li key={`${item}-${index}`}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <p className="text-sm font-semibold">Data Models</p>
                    <ul className="mt-3 space-y-2 text-sm text-white/50">
                      {(plan.dataModels ?? []).map((item, index) => (
                        <li key={`${item}-${index}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>

          {buildResult && (
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-xs uppercase tracking-[0.35em] text-white/35">Real Build Logs</p>

              <div className="mt-4 space-y-4">
                {buildResult.logs.map((log) => (
                  <div key={log.command} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm font-semibold">{log.command}</p>
                      <span className={log.success ? "text-xs text-emerald-400" : "text-xs text-red-400"}>
                        {log.success ? "success" : "failed"}
                      </span>
                    </div>

                    <pre className="mt-3 max-h-56 overflow-auto rounded-xl bg-black p-3 text-xs text-white/50">
                      {log.stdout || log.stderr || "No output"}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-xs uppercase tracking-[0.35em] text-white/35">Generated Files</p>

              {files.length === 0 ? (
                <p className="mt-4 text-white/45">No files generated yet.</p>
              ) : (
                <div className="mt-4 space-y-3">
                  {files.map((file) => (
                    <div key={file.path} className="rounded-2xl border border-white/10 bg-black/40 p-4">
                      <p className="text-sm font-medium text-white/80">{file.path}</p>
                      <pre className="mt-3 max-h-52 overflow-auto rounded-xl bg-black p-3 text-xs text-white/50">
                        {file.content}
                      </pre>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <p className="text-xs uppercase tracking-[0.35em] text-white/35">Live Preview</p>

              <div className="mt-4 overflow-hidden rounded-3xl border border-white/10 bg-black">
                {generatedAppUrl ? (
                  <iframe
                    src={generatedAppUrl}
                    className="h-[700px] w-full"
                    title="Generated App Preview"
                  />
                ) : (
                  <div className="flex h-[700px] items-center justify-center text-white/40">
                    Build an app to see a live preview.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
