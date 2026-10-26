"use client";

import { useState } from "react";
import { Search, Crown, Loader2, ExternalLink } from "lucide-react";

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
  const [results, setResults] = useState<KeywordRow[] | null>(null);
  const [meta, setMeta] = useState<{ source: string; fetchedAt: string } | null>(null);

  async function onSearch() {
    if (!seed.trim()) return;
    setLoading(true);
    setError(null);
    setResults(null);
    setMeta(null);

    try {
      const res = await fetch("/api/keywords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seed: seed.trim(), country }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Keyword research failed");
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
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Keyword Research</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Search volume, CPC and competition — with clear data source
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-500">Free plan:</span>
          <span className="font-medium text-slate-900">Limited daily searches</span>
        </div>
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
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
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
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition disabled:opacity-60 inline-flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Search
            </button>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Results show source and fetch time. Free tier uses limited provider quota. No invented volumes.
          </p>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <Crown className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="font-medium text-slate-900">Need higher limits?</p>
              <p className="text-sm text-slate-600">Pro unlocks higher daily keyword research volume.</p>
            </div>
          </div>
          <button className="rounded-lg bg-slate-900 text-white text-sm font-medium px-4 py-2 hover:bg-slate-800 transition">
            Upgrade
          </button>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 text-red-800 text-sm p-4 mb-6">
            {error}
            {error.includes("DATAFORSEO") && (
              <p className="mt-2 text-red-700">
                Add <code className="bg-red-100 px-1 rounded">DATAFORSEO_LOGIN</code> and{" "}
                <code className="bg-red-100 px-1 rounded">DATAFORSEO_PASSWORD</code> in Vercel env, then redeploy.
              </p>
            )}
          </div>
        )}

        {meta && (
          <div className="mb-4 flex flex-wrap gap-3 text-xs text-slate-500">
            <span className="bg-slate-100 px-2 py-1 rounded">Source: {meta.source}</span>
            <span className="bg-slate-100 px-2 py-1 rounded">Fetched: {new Date(meta.fetchedAt).toLocaleString()}</span>
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
                    <th className="px-4 py-3 font-medium">Volume</th>
                    <th className="px-4 py-3 font-medium">CPC (USD)</th>
                    <th className="px-4 py-3 font-medium">Competition</th>
                    <th className="px-4 py-3 font-medium">Level</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((row) => (
                    <tr key={row.keyword} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">{row.keyword}</td>
                      <td className="px-4 py-3 text-slate-700">{row.volume ?? "—"}</td>
                      <td className="px-4 py-3 text-slate-700">{row.cpc != null ? row.cpc.toFixed(2) : "—"}</td>
                      <td className="px-4 py-3 text-slate-700">{row.competition != null ? row.competition.toFixed(2) : "—"}</td>
                      <td className="px-4 py-3 text-slate-700">{row.competitionLevel ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {results && results.length === 0 && !error && (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500 text-sm">
            No keywords returned for this seed.
          </div>
        )}

        {!results && !error && !loading && (
          <div className="rounded-2xl border border-slate-200 bg-white p-16 text-center">
            <Search className="w-10 h-10 text-slate-300 mx-auto mb-4" />
            <h3 className="font-semibold text-slate-900 mb-2">Search keywords</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              Enter a seed keyword to get related ideas with volume and CPC from a verified data provider.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
