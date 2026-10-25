import { User, CreditCard, Bell } from "lucide-react";

export default function SettingsPage() {
  return (
    <>
      <header className="bg-white border-b border-slate-200 px-8 py-5 sticky top-0 z-10">
        <h1 className="text-xl font-semibold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage your account and plan</p>
      </header>

      <div className="p-8 max-w-3xl space-y-6">
        <SettingsCard
          icon={<User className="w-5 h-5 text-slate-600" />}
          title="Account"
          description="Manage your profile and connected Google account."
        />
        <SettingsCard
          icon={<CreditCard className="w-5 h-5 text-slate-600" />}
          title="Plan & Billing"
          description="You are on the Free plan. Upgrade for unlimited keywords and competitor tools."
          action="Upgrade to Pro"
        />
        <SettingsCard
          icon={<Bell className="w-5 h-5 text-slate-600" />}
          title="Notifications"
          description="Email alerts for ranking changes and audit issues."
        />
      </div>
    </>
  );
}

function SettingsCard({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
        <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
        {action && (
          <button className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-700">
            {action} →
          </button>
        )}
      </div>
    </div>
  );
}
