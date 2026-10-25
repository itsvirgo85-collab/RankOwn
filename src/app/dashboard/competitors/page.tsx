import { Users, Crown, Lock } from "lucide-react";

export default function CompetitorsPage() {
  return (
    <>
      <header className="bg-white border-b border-slate-200 px-8 py-5 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold text-slate-900">Competitor Analysis</h1>
          <span className="text-[10px] font-semibold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">PRO</span>
        </div>
        <p className="text-sm text-slate-500 mt-0.5">Compare your site with competitors</p>
      </header>

      <div className="p-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-amber-600" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">Pro Feature</h2>
          <p className="text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
            Competitor analysis, keyword gap and traffic estimates are available on the Pro plan.
          </p>
          <button className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition">
            <Crown className="w-4 h-4" />
            Upgrade to Pro
          </button>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-5 opacity-60">
          <FeaturePreview title="Keyword Gap" description="See keywords competitors rank for that you don't." />
          <FeaturePreview title="Traffic Estimate" description="Estimated organic traffic comparison." />
          <FeaturePreview title="Top Pages" description="Competitor's best performing pages." />
        </div>
      </div>
    </>
  );
}

function FeaturePreview({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  );
}
