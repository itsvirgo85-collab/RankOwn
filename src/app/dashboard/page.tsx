import {
  Plus,
  MousePointerClick,
  Eye,
  TrendingUp,
  Globe,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

export default function DashboardOverview() {
  return (
    <>
      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Overview</h1>
          <p className="text-sm text-slate-500 mt-0.5">Your search performance at a glance</p>
        </div>
        <Link
          href="/dashboard/websites"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Connect Website
        </Link>
      </header>

      <div className="p-8">
        {/* Empty State */}
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-5">
            <Globe className="w-7 h-7 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            Connect your first website
          </h2>
          <p className="text-slate-600 max-w-md mx-auto mb-6 text-[15px] leading-relaxed">
            Link Google Search Console to see real clicks, impressions, top queries and more.
          </p>
          <Link
            href="/dashboard/websites"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
          >
            <Plus className="w-4 h-4" />
            Connect Search Console
          </Link>
        </div>

        {/* Stats Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 opacity-50 pointer-events-none">
          <StatCard title="Clicks" value="—" subtitle="Last 28 days" icon={<MousePointerClick className="w-5 h-5 text-blue-600" />} />
          <StatCard title="Impressions" value="—" subtitle="Last 28 days" icon={<Eye className="w-5 h-5 text-blue-600" />} />
          <StatCard title="Avg. Position" value="—" subtitle="Last 28 days" icon={<TrendingUp className="w-5 h-5 text-blue-600" />} />
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 gap-5">
          <QuickCard
            title="Keyword Research"
            description="Find keyword ideas with search volume and competition data."
            href="/dashboard/keywords"
            badge="Free: 20/day"
          />
          <QuickCard
            title="Technical Audit"
            description="Check titles, metas, headings, status codes and more."
            href="/dashboard/audit"
          />
        </div>
      </div>
    </>
  );
}

function StatCard({ title, value, subtitle, icon }: { title: string; value: string; subtitle: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-slate-500">{title}</span>
        {icon}
      </div>
      <div className="text-3xl font-bold text-slate-900 mb-1">{value}</div>
      <div className="text-sm text-slate-500">{subtitle}</div>
    </div>
  );
}

function QuickCard({ title, description, href, badge }: { title: string; description: string; href: string; badge?: string }) {
  return (
    <Link href={href} className="rounded-2xl border border-slate-200 bg-white p-6 hover:border-slate-300 hover:shadow-sm transition group">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition" />
      </div>
      <p className="text-sm text-slate-600 mb-3 leading-relaxed">{description}</p>
      {badge && (
        <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded">
          {badge}
        </span>
      )}
    </Link>
  );
}
