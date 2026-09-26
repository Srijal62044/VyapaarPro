import React from 'react';
import { SEO } from '../../components/common/SEO';
import { useSettings } from '../../contexts/SettingsContext';

export const TermsPage: React.FC = () => {
  const { settings } = useSettings();

  return (
    <div className="py-12 lg:py-20">
      <SEO title="Terms of Service | VyapaarPro" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Terms of Service</h1>
          <p className="text-xs text-slate-400 mt-2">Effective: September 2026</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">1. Nature of Services</h2>
            <p>
              VyapaarPro is a professional digital services agency delivering custom business websites, web applications, mobile apps, UI/UX designs, and technical maintenance. VyapaarPro is NOT an automated self-checkout SaaS or marketplace.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">2. Scope Consultation & Pricing</h2>
            <p>
              Prices shown in the service catalogue represent fixed estimates, starting investments, or require a custom quote. Final engagement costs and delivery timelines are formalized in a separate written project scope agreed with the client.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">3. Offline Invoicing & Milestone Payments</h2>
            <p>
              All financial settlements occur outside of this website via corporate invoices (e.g. NEFT, RTGS, IMPS, or official bank transfer). Milestone schedules dictate invoice releases.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">4. Independent Cloud Deployment</h2>
            <p>
              The client's final website or application is NOT hosted inside VyapaarPro. Each client's software is developed, configured, and deployed independently on the client's preferred server, cloud provider, or domain.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">5. Source Code Ownership</h2>
            <p>
              Upon complete settlement of agreed project milestone invoices, full ownership of custom code, design files, and database schemas transfers to the client without recurring licensing fees.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
