import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Search,
  Shield,
  Zap,
  CheckCircle2,
  LineChart,
  Globe,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-xl tracking-tight text-slate-900">
              RankOwn
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-slate-900 transition">
              How it works
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition px-3 py-2"
            >
              Log in
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition shadow-sm"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/60 via-white to-white" />
        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 px-3.5 py-1.5 text-sm font-medium text-blue-700 mb-8">
            <Zap className="w-4 h-4" />
            Built on real Google data
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
            Own your rankings.
            <br />
            <span className="text-blue-600">Understand your site.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Connect your Google Search Console and Analytics. Get clear insights,
            technical audits, and keyword tools — without fake metrics.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-base font-semibold text-white hover:bg-blue-700 transition shadow-lg shadow-blue-600/25"
            >
              Start Free with Google
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-sm text-slate-500">No credit card required</p>
          </div>

          {/* Trust points */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Official Google data
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              No fake metrics
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Clear data sources
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            Everything you need to understand your SEO
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto">
            Focus on real data from your own website first. Then expand with keyword and competitor tools.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
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
            icon={<LineChart className="w-6 h-6 text-blue-600" />}
            title="Clean Dashboard"
            description="Everything in one place. Clear labels for actual vs estimated data. No confusion."
          />
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              How RankOwn works
            </h2>
            <p className="text-slate-600">Simple setup. Real insights.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Connect Google"
              description="Sign in with Google and securely connect your Search Console and Analytics properties."
            />
            <StepCard
              number="2"
              title="See Real Performance"
              description="View clicks, impressions, top queries and pages with clear timestamps and sources."
            />
            <StepCard
              number="3"
              title="Improve & Track"
              description="Run technical audits, research keywords, and track progress over time."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="rounded-3xl bg-slate-900 px-8 py-16 text-center">
          <Globe className="w-10 h-10 text-blue-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to own your rankings?
          </h2>
          <p className="text-slate-300 max-w-lg mx-auto mb-8">
            Start with your own website data. No credit card. No fake numbers.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-base font-semibold text-white hover:bg-blue-500 transition"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
              <BarChart3 className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-medium text-slate-700">RankOwn</span>
          </div>
          <span>© 2026 RankOwn. Own your search performance.</span>
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
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-md hover:border-slate-300 transition">
      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-[15px]">{description}</p>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-semibold flex items-center justify-center mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-[15px] leading-relaxed">{description}</p>
    </div>
  );
}
