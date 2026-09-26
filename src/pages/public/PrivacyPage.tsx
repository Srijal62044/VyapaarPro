import React from 'react';
import { Shield, Sparkles } from 'lucide-react';
import { SEO } from '../../components/common/SEO';
import { useSettings } from '../../contexts/SettingsContext';

export const PrivacyPage: React.FC = () => {
  const { settings } = useSettings();

  return (
    <div className="py-12 lg:py-20">
      <SEO title="Privacy Policy | VyapaarPro" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Privacy Policy</h1>
          <p className="text-xs text-slate-400 mt-2">Last updated: September 2026</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">1. Overview</h2>
            <p>
              VyapaarPro operates as an independent digital engineering agency. We respect client confidentiality and privacy. This policy explains how we collect, store, and protect project requirements, contact details, and account credentials.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">2. Information Collected</h2>
            <p>
              When submitting a service requirement request or contact form, we collect your name, phone number, email address, organization name, and scope description. Registered clients also store authentication profile credentials.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">3. Zero Online Payment Gateway Rule</h2>
            <p>
              VyapaarPro does NOT collect credit card numbers, CVVs, net banking passwords, or UPI pins on this website. All commercial payments are executed through offline corporate bank invoices. We never store payment credentials.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">4. Row Level Security & Access Control</h2>
            <p>
              All client requests, projects, and milestone deliverables are protected with PostgreSQL Row Level Security (RLS). Clients can only query their own records. Cross-client access is strictly forbidden by database policies.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">5. Code & Asset Confidentiality</h2>
            <p>
              All proprietary business logic, schemas, and brand assets provided by clients remain 100% confidential. Upon completion of milestone deliverables and invoice clearance, all intellectual property belongs to the client.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
