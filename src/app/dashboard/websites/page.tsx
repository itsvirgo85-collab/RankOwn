import { Globe, Plus, Link2 } from "lucide-react";

export default function WebsitesPage() {
  return (
    <>
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Websites</h1>
          <p className="text-sm text-slate-500 mt-0.5">Connect and manage your properties</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition shadow-sm">
          <Plus className="w-4 h-4" />
          Connect Website
        </button>
      </header>

      <div className="p-8">
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-14 text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-5">
            <Link2 className="w-7 h-7 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            No websites connected
          </h2>
          <p className="text-slate-600 max-w-md mx-auto mb-6 text-[15px] leading-relaxed">
            Connect your Google Search Console property to start seeing real performance data.
          </p>
          <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition">
            <Plus className="w-4 h-4" />
            Connect Google Search Console
          </button>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
          <h3 className="font-semibold text-slate-900 mb-3">How connection works</h3>
          <ol className="space-y-2 text-sm text-slate-600 list-decimal list-inside">
            <li>Sign in with your Google account</li>
            <li>Select a verified Search Console property</li>
            <li>We pull clicks, impressions, queries and pages</li>
            <li>Data is refreshed automatically</li>
          </ol>
        </div>
      </div>
    </>
  );
}
