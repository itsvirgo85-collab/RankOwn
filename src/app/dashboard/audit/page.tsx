import { AlertCircle, Search, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

export default function AuditPage() {
  return (
    <>
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Technical SEO Audit</h1>
          <p className="text-sm text-slate-500 mt-0.5">Check on-page SEO issues for any URL</p>
        </div>
      </header>

      <div className="p-8">
        {/* URL Input */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 mb-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                placeholder="https://example.com/page"
                className="w-full rounded-xl border border-slate-300 pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <button className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition">
              Run Audit
            </button>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Checks title, meta description, headings, canonical, status code, viewport and more.
          </p>
        </div>

        {/* What we check */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <CheckItem icon={<CheckCircle2 className="w-4 h-4 text-green-600" />} label="Title & Meta Description" />
          <CheckItem icon={<CheckCircle2 className="w-4 h-4 text-green-600" />} label="H1 / H2 Headings" />
          <CheckItem icon={<CheckCircle2 className="w-4 h-4 text-green-600" />} label="Canonical Tag" />
          <CheckItem icon={<CheckCircle2 className="w-4 h-4 text-green-600" />} label="Status Code" />
          <CheckItem icon={<CheckCircle2 className="w-4 h-4 text-green-600" />} label="Viewport Meta" />
          <CheckItem icon={<CheckCircle2 className="w-4 h-4 text-green-600" />} label="Robots Meta" />
        </div>

        {/* Empty State */}
        <div className="rounded-2xl border border-slate-200 bg-white p-16 text-center">
          <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-4" />
          <h3 className="font-semibold text-slate-900 mb-2">No audits yet</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            Enter a URL above to run a technical SEO audit and see issues with clear recommendations.
          </p>
        </div>
      </div>
    </>
  );
}

function CheckItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
      {icon}
      {label}
    </div>
  );
}
