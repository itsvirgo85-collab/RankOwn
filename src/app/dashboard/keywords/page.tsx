"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";

type KeywordRow = {
  keyword: string;
  volume: number | null;
  cpc: number | null;
  competition: number | null;
  competitionLevel: string | null;
  source: string;
};

export default function KeywordsPage() {
  const [seed, setSeed] = useState("");
  const [country, setCountry] = useState("US");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [results, setResults] = useState<KeywordRow[] | null>(null);
  const [meta, setMeta] = useState<{ source: string; fetchedAt: string } | null>(null);

  async function onSearch() {
    if (!seed.trim()) return;
    setLoading(true);
    setError(null);
    setHint(null);
    setResults(null);
    setMeta(null);

    try {
      const res = await fetch("/api/keywords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seed: seed.trim(), country }),
        credentials: "same-origin",
      });

      const text = await res.text();
      let data: any = null;
      try {
        data = JSON.parse(text);
      } catch {
        setError(
          res.ok
            ? "Server returned invalid response. Redeploy the latest version and hard-refresh the page."
            : `Request failed (${res.status}). You may need to sign in with Google first, or the API is not deployed yet.`
        );
        setHint("Open /login, sign in with Google (allow Ads), then try again after a hard refresh.");
        return;
      }

      if (!res.ok) {
        setError(data.error || "Keyword research failed");
        if (data.hint) setHint(data.hint);
        return;
      }

      setResults(data.keywords || []);
      setMeta({ source: data.source, fetchedAt: data.fetchedAt });
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <header className="bg-white border-b border-slate-200 px-8 py-5 sticky top-0 z-10">
        <h1 className="text-xl font-semibold text-slate-900">Keyword Research</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Free via Google Ads Keyword Planner API — no third-party paid data
        </p>
      </header>

      <div className="p-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSearch()}
                placeholder="Enter a seed keyword (e.g. seo tools)"
                className="w-full rounded-xl border border-slate-300 pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700"
            >
              <option value="US">United States</option>
              <option value="GB">United Kingdom</option>
              <option value="PK">Pakistan</option>
              <option value="IN">India</option>
              <option value="CA">Canada</option>
              <option value="AU">Australia</option>
            </select>
            <button
              onClick={onSearch}
              disabled={loading || !seed.trim()}
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60 inline-flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Search
            </button>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Source: Google Ads Keyword Planner. Sign in with Google (Ads access) and set GOOGLE_ADS_CUSTOMER_ID.
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 text-red-800 text-sm p-4 mb-6">
            <p className="font-medium">{error}</p>
            {hint && <p className="mt-2 text-red-700">{hint}</p>}
          </div>
        )}

        {meta && (
          <div className="mb-4 flex flex-wrap gap-3 text-xs text-slate-500">
            <span className="bg-slate-100 px-2 py-1 rounded">Source: {meta.source}</span>
            <span className="bg-slate-100 px-2 py-1 rounded">
              Fetched: {new Date(meta.fetchedAt).toLocaleString()}
            </span>
            <span className="bg-slate-100 px-2 py-1 rounded">Country: {country}</span>
          </div>
        )}

        {results && results.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-left text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-medium">Keyword</th>
                    <th className="px-4 py-3 font-medium">Avg monthly searches</th>
                    <th className="px-4 py-3 font-medium">CPC (USD)</th>
                    <th className="px-4 py-3 font-medium">Competition</th>
                    <th className="px-4 py-3 font-medium">Level</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((row) => (
                    <tr key={row.keyword} className="border-b border-slate-100">
                      <td className="px-4 py-3 font-medium text-slate-900">{row.keyword}</td>
                      <td className="px-4 py-3">{row.volume ?? "—"}</td>
                      <td className="px-4 py-3">{row.cpc != null ? row.cpc.toFixed(2) : "—"}</td>
                      <td className="px-4 py-3">
                        {row.competition != null ? row.competition.toFixed(2) : "—"}
                      </td>
                      <td className="px-4 py-3">{row.competitionLevel ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {results && results.length === 0 && !error && (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-sm text-slate-500">
            No keyword ideas returned.
          </div>
        )}

        {!results && !error && !loading && (
          <div className="rounded-2xl border border-slate-200 bg-white p-16 text-center">
            <Search className="w-10 h-10 text-slate-300 mx-auto mb-4" />
            <h3 className="font-semibold text-slate-900 mb-2">Google Keyword Planner</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Free official data. Requires Google sign-in with Ads scope and a Google Ads customer ID in env.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
