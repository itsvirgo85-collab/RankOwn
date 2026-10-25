import { Search, Crown, Sparkles } from "lucide-react";

export default function KeywordsPage() {
  return (
    <>
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Keyword Research</h1>
          <p className="text-sm text-slate-500 mt-0.5">Find keyword opportunities with real data</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-500">Free plan:</span>
          <span className="font-medium text-slate-900">20 searches left today</span>
        </div>
      </header>

      <div className="p-8">
        {/* Search Box */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 mb-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter a seed keyword (e.g. seo tools)"
                className="w-full rounded-xl border border-slate-300 pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <select className="rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Pakistan</option>
              <option>India</option>
              <option>Canada</option>
            </select>
            <button className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition">
              Search
            </button>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Data source will be shown with every result. Free users get 20 searches per day.
          </p>
        </div>

        {/* Upgrade Banner */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <Crown className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="font-medium text-slate-900">Need more searches?</p>
              <p className="text-sm text-slate-600">Upgrade to Pro for unlimited keyword research.</p>
            </div>
          </div>
          <button className="rounded-lg bg-slate-900 text-white text-sm font-medium px-4 py-2 hover:bg-slate-800 transition">
            Upgrade
          </button>
        </div>

        {/* Empty Results */}
        <div className="rounded-2xl border border-slate-200 bg-white p-16 text-center">
          <Sparkles className="w-10 h-10 text-slate-300 mx-auto mb-4" />
          <h3 className="font-semibold text-slate-900 mb-2">No searches yet</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            Enter a seed keyword above to get keyword ideas, volume and competition data.
          </p>
        </div>
      </div>
    </>
  );
}
