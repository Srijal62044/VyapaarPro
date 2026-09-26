import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  Code2,
  Cpu,
  Layers,
  Users,
  Target,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { useSettings } from '../../contexts/SettingsContext';

export const AboutPage: React.FC = () => {
  const { settings } = useSettings();

  return (
    <div className="py-12 lg:py-20">
      <SEO
        title="About VyapaarPro | Digital Engineering Agency"
        description="Learn how VyapaarPro helps modern enterprises scale with custom websites, applications, and transparent milestone development."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Intro */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Agency Profile</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            We Engineer Practical Digital Growth for Real Businesses
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            VyapaarPro was founded on a simple realization: small and mid-sized enterprises don't need cookie-cutter website builders or generic marketplace themes that break down under pressure. They need dependable, fast, custom digital systems engineered by real developers who communicate clearly.
          </p>
        </div>

        {/* Agency Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Modern Engineering</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We leverage modern React, TypeScript, Next.js, and PostgreSQL. No spaghetti code, no abandoned plugins, and zero unnecessary bloat.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Honest Business Model</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We never take surprise gateway percentages or lock you into recurring monthly storefront fees. You pay milestone invoices directly via normal bank transfer.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Total Independence</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every client deliverable is hosted independently on your cloud or server. If you decide to transition to an internal tech team later, full source code is already yours.
            </p>
          </div>
        </div>

        {/* Core Principles */}
        <div className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
          <h2 className="text-2xl font-bold text-white">Our Non-Negotiable Standards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span><strong>Mobile-First Design:</strong> 85%+ of your customers visit on mobile. Every layout is tested across real Android and iOS screens.</span>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span><strong>Sub-Second Loading:</strong> Optimized Core Web Vitals, asset compression, and clean code that Google ranks higher.</span>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span><strong>Lead-Generation Centric:</strong> We build explicit conversion funnels with WhatsApp triggers and inquiry capture.</span>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span><strong>Milestone Phasing:</strong> Projects progress through distinct milestones so you verify each stage before development continues.</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center py-6">
          <h3 className="text-xl font-bold text-white mb-3">Ready to Discuss Your Project?</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
            Consult directly with our engineering team. We'll examine your requirements and provide an honest estimate.
          </p>
          <div className="flex items-center justify-center space-x-3">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
            >
              Contact Engineering
            </Link>
            <Link
              to="/services"
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-semibold transition"
            >
              Browse Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
