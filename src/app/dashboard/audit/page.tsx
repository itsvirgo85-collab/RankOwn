"use client";

import { useState } from "react";
import {
  AlertCircle,
  Search,
  CheckCircle2,
  XCircle,
  Loader2,
  AlertTriangle,
} from "lucide-react";

type AuditResult = {
  url: string;
  statusCode: number | null;
  title: string | null;
  metaDescription: string | null;
  canonical: string | null;
  h1: string[];
  h2: string[];
  robots: string | null;
  hasViewport: boolean;
  issues: { level: "error" | "warn" | "ok"; message: string }[];
  score: number;
  fetchedAt: string;
  source: string;
};

export default function AuditPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AuditResult | null>(null);

  async function runAudit() {
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Audit failed");
        return;
      }
      setResult(data);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <header className="bg-white border-b border-slate-200 px-8 py-5 sticky top-0 z-10">
        <h1 className="text-xl font-semibold text-slate-900">URL Analyzer / Technical Audit</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Live on-page SEO checks for any public URL
        </p>
      </header>

      <div className="p-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && runAudit()}
                placeholder="https://example.com/page"
                className="w-full rounded-xl border border-slate-300 pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <button
              onClick={runAudit}
              disabled={loading || !url.trim()}
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition disabled:opacity-60 inline-flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Run Audit
            </button>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Checks HTTP status, title, meta description, H1/H2, canonical, robots, viewport. Source: live page fetch.
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 text-red-800 text-sm p-4 mb-6">{error}</div>
        )}

        {result && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">SEO Score</p>
                <p className="text-3xl font-bold text-slate-900">{result.score}/100</p>
              </div>
              <div className="text-xs text-slate-500 space-y-1 text-right">
                <div>Source: {result.source}</div>
                <div>Fetched: {new Date(result.fetchedAt).toLocaleString()}</div>
                <div className="truncate max-w-md">{result.url}</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <InfoCard label="Status Code" value={result.statusCode != null ? String(result.statusCode) : "—"} />
              <InfoCard label="Title" value={result.title || "Missing"} />
              <InfoCard label="Meta Description" value={result.metaDescription || "Missing"} />
              <InfoCard label="Canonical" value={result.canonical || "Not set"} />
              <InfoCard label="Robots" value={result.robots || "Not set"} />
              <InfoCard label="Viewport" value={result.hasViewport ? "Present" : "Missing"} />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-semibold text-slate-900 mb-3">Headings</h3>
              <p className="text-sm text-slate-600 mb-2">
                <span className="font-medium">H1:</span> {result.h1.length ? result.h1.join(" | ") : "None"}
              </p>
              <p className="text-sm text-slate-600">
                <span className="font-medium">H2:</span>{" "}
                {result.h2.length ? result.h2.slice(0, 8).join(" | ") : "None"}
                {result.h2.length > 8 ? ` (+${result.h2.length - 8} more)` : ""}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Issues</h3>
              <ul className="space-y-2">
                {result.issues.map((issue, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    {issue.level === "error" && <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />}
                    {issue.level === "warn" && <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />}
                    {issue.level === "ok" && <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />}
                    <span className="text-slate-700">{issue.message}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-500">
              Ranking keywords, traffic estimates and CPC for this URL require a rank-tracking data provider (Pro).
              This audit only reports observed on-page signals from the live HTML response.
            </div>
          </div>
        )}

        {!result && !error && !loading && (
          <div className="rounded-2xl border border-slate-200 bg-white p-16 text-center">
            <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-4" />
            <h3 className="font-semibold text-slate-900 mb-2">Analyze any public URL</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              Enter a full URL to fetch the page and run technical SEO checks.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-medium text-slate-500 mb-1">{label}</p>
      <p className="text-sm text-slate-900 break-words">{value}</p>
    </div>
  );
}
