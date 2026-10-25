import Link from "next/link";
import {
  BarChart3,
  Globe,
  Search,
  Settings,
  Plus,
  TrendingUp,
  Eye,
  MousePointerClick,
  AlertCircle,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-white border-r border-slate-200 fixed left-0 top-0">
          <div className="p-6 border-b border-slate-200">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-lg">RankOwn</span>
            </Link>
          </div>
          <nav className="p-4 space-y-1">
            <NavItem href="/dashboard" icon={<Globe className="w-4 h-4" />} label="Overview" active />
            <NavItem href="/dashboard/keywords" icon={<Search className="w-4 h-4" />} label="Keywords" />
            <NavItem href="/dashboard/audit" icon={<AlertCircle className="w-4 h-4" />} label="Technical Audit" />
            <NavItem href="/dashboard/settings" icon={<Settings className="w-4 h-4" />} label="Settings" />
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64">
          <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">Overview</h1>
              <p className="text-sm text-slate-500">Your search performance at a glance</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition">
              <Plus className="w-4 h-4" />
              Connect Website
            </button>
          </header>

          <div className="p-8">
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Connect your first website
              </h2>
              <p className="text-slate-600 max-w-md mx-auto mb-8">
                Link your Google Search Console property to see real clicks,
                impressions, top queries and technical insights.
              </p>
              <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition">
                <Plus className="w-4 h-4" />
                Connect with Google Search Console
              </button>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-50 pointer-events-none">
              <StatCard
                title="Clicks"
                value="—"
                change="Last 28 days"
                icon={<MousePointerClick className="w-5 h-5 text-blue-600" />}
              />
              <StatCard
                title="Impressions"
                value="—"
                change="Last 28 days"
                icon={<Eye className="w-5 h-5 text-blue-600" />}
              />
              <StatCard
                title="Avg. Position"
                value="—"
                change="Last 28 days"
                icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function NavItem({
  href,
  icon,
  label,
  active = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
        active
          ? "bg-blue-50 text-blue-700"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}

function StatCard({
  title,
  value,
  change,
  icon,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-slate-500">{title}</span>
        {icon}
      </div>
      <div className="text-3xl font-bold text-slate-900 mb-1">{value}</div>
      <div className="text-sm text-slate-500">{change}</div>
    </div>
  );
}
