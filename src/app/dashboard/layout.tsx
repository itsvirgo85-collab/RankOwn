import Link from "next/link";
import {
  BarChart3,
  LayoutDashboard,
  Globe,
  Search,
  AlertCircle,
  Users,
  FileText,
  Settings,
  LogOut,
  Crown,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-white border-r border-slate-200 fixed left-0 top-0 flex flex-col z-20">
          <div className="p-5 border-b border-slate-200">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-lg text-slate-900">RankOwn</span>
            </Link>
          </div>

          <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
            <p className="px-3 pt-2 pb-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Main
            </p>
            <NavItem href="/dashboard" icon={<LayoutDashboard className="w-4 h-4" />} label="Overview" />
            <NavItem href="/dashboard/websites" icon={<Globe className="w-4 h-4" />} label="Websites" />
            <NavItem href="/dashboard/keywords" icon={<Search className="w-4 h-4" />} label="Keywords" />
            <NavItem href="/dashboard/audit" icon={<AlertCircle className="w-4 h-4" />} label="Technical Audit" />

            <p className="px-3 pt-5 pb-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Premium
            </p>
            <NavItem href="/dashboard/competitors" icon={<Users className="w-4 h-4" />} label="Competitors" badge="Pro" />
            <NavItem href="/dashboard/reports" icon={<FileText className="w-4 h-4" />} label="Reports" badge="Pro" />

            <p className="px-3 pt-5 pb-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Account
            </p>
            <NavItem href="/dashboard/settings" icon={<Settings className="w-4 h-4" />} label="Settings" />
          </nav>

          {/* Upgrade Card */}
          <div className="p-3">
            <div className="rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 p-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-4 h-4" />
                <span className="text-sm font-semibold">Upgrade to Pro</span>
              </div>
              <p className="text-xs text-blue-100 mb-3 leading-relaxed">
                Unlimited keywords, competitor analysis & reports.
              </p>
              <button className="w-full rounded-lg bg-white text-blue-700 text-xs font-semibold py-2 hover:bg-blue-50 transition">
                View Plans
              </button>
            </div>
          </div>

          <div className="p-3 border-t border-slate-200">
            <button className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition">
              <LogOut className="w-4 h-4" />
              Log out
            </button>
          </div>
        </aside>

        <main className="flex-1 ml-64 min-h-screen">{children}</main>
      </div>
    </div>
  );
}

function NavItem({
  href,
  icon,
  label,
  badge,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
    >
      {icon}
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="text-[10px] font-semibold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">
          {badge}
        </span>
      )}
    </Link>
  );
}
