import Link from "next/link";
import { ArrowRight, BarChart3, Search, Shield, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-xl tracking-tight">RankOwn</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition"
            >
              Log in
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-sm text-blue-700 mb-6">
          <Zap className="w-4 h-4" />
          Built on real Google data
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-slate-900 mb-6">
          Own your rankings.
          <br />
          <span className="text-blue-600">Understand your site.</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
          Connect your Google Search Console and Analytics. Get clear insights,
          technical audits, and keyword tools — without fake metrics.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-base font-semibold text-white hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
          >
            Start Free with Google
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-sm text-slate-500">No credit card required</p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Search className="w-6 h-6 text-blue-600" />}
            title="Real Search Data"
            description="Pull accurate clicks, impressions, queries and positions directly from your Google Search Console."
          />
          <FeatureCard
            icon={<Shield className="w-6 h-6 text-blue-600" />}
            title="Technical SEO Audit"
            description="Instantly check titles, meta descriptions, headings, canonicals, status codes and more."
          />
          <FeatureCard
            icon={<BarChart3 className="w-6 h-6 text-blue-600" />}
            title="Clean Dashboard"
            description="Everything in one place. Clear labels for actual vs estimated data. No confusion."
          />
        </div>
      </section>

      {/* Trust */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Built for accuracy, not hype
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            RankOwn never invents search volumes or traffic numbers. Every metric
            shows its source and when it was last updated.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between text-sm text-slate-500">
          <span>© 2026 RankOwn</span>
          <span>Own your search performance</span>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}
