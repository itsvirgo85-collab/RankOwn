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
  LayoutDashboard,
  LogOut,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-white border-r border-slate-200 fixed left-0 top-0 flex flex-col">
          <div className="p-5 border-b border-slate-200">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <BarChart3 className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="font-semibold text-lg text-slate-900">RankOwn</span>
            </Link>
          </div>

          <nav className="flex-1 p-3 space-y-0.5">
            <NavItem href="/dashboard" icon={<LayoutDashboard className="w-4 h-4" />} label="Overview" active />
            <NavItem href="/dashboard" icon={<Globe className="w-4 h-4" />} label="Websites" />
            <NavItem href="/dashboard" icon={<Search className="w-4 h-4" />} label="Keywords" />
            <NavItem href="/dashboard" icon={<AlertCircle className="w-4 h-4" />} label="Technical Audit" />
            <NavItem href="/dashboard" icon={<Settings className="w-4 h-4" />} label="Settings" />
          </nav>

          <div className="p-3 border-t border-slate-200">
            <button className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition">
              <LogOut className="w-4 h-4" />
              Log out
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 ml-64">
          <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">Overview</h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Your search performance at a glance
              </p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition shadow-sm">
              <Plus className="w-4 h-4" />
              Connect Website
            </button>
          </header>

          <div className="p-8">
            {/* Empty State */}
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-14 text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Connect your first website
              </h2>
              <p className="text-slate-600 max-w-md mx-auto mb-8 leading-relaxed">
                Link your Google Search Console property to see real clicks,
                impressions, top queries and technical insights.
              </p>
              <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition shadow-sm">
                <Plus className="w-4 h-4" />
                Connect with Google Search Console
              </button>
            </div>

            {/* Preview Stats (disabled until connected) */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5 opacity-40 pointer-events-none select-none">
              <StatCard
                title="Clicks"
                value="—"
                subtitle="Last 28 days"
                icon={<MousePointerClick className="w-5 h-5 text-blue-600" />}
              />
              <StatCard
                title="Impressions"
                value="—"
                subtitle="Last 28 days"
                icon={<Eye className="w-5 h-5 text-blue-600" />}
              />
              <StatCard
                title="Avg. Position"
                value="—"
                subtitle="Last 28 days"
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
  subtitle,
  icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
}) {
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
