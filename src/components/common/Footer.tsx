import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Phone, Mail, MapPin, MessageSquare, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';

export const Footer: React.FC = () => {
  const { settings } = useSettings();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-sm">
      {/* Top Banner: Transparent Agency Payment Notice */}
      <div className="border-b border-slate-900 bg-slate-950/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-indigo-950/20 border border-indigo-500/20 p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">
                  Direct Consulting & Milestone-Based Delivery
                </h4>
                <p className="text-xs text-slate-400">
                  VyapaarPro does not operate online payment gateways or card checkouts. All contracts & milestone payments are settled directly outside the platform.
                </p>
              </div>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center px-4 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600 text-indigo-200 hover:text-white border border-indigo-500/40 text-xs font-semibold transition shrink-0"
            >
              <span>Contact Engineering Team</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1 & 2: Brand & Description */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white">
                Vyapaar<span className="text-indigo-400">Pro</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              {settings.description}
            </p>
            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-slate-300">{settings.phone}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${(settings.whatsapp || '919876543210').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-emerald-400 transition"
                >
                  WhatsApp Consultation Available
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-slate-300">{settings.email}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-slate-400">{settings.address}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/services/business-website" className="hover:text-indigo-400 transition">
                  Business Websites
                </Link>
              </li>
              <li>
                <Link to="/services/ecommerce-website" className="hover:text-indigo-400 transition">
                  E-Commerce Stores
                </Link>
              </li>
              <li>
                <Link to="/services/custom-web-application" className="hover:text-indigo-400 transition">
                  Custom Web Apps
                </Link>
              </li>
              <li>
                <Link to="/services/android-pwa-application" className="hover:text-indigo-400 transition">
                  Android & PWAs
                </Link>
              </li>
              <li>
                <Link to="/services/ui-ux-design" className="hover:text-indigo-400 transition">
                  UI/UX & Branding
                </Link>
              </li>
              <li>
                <Link to="/services/digital-menu-qr-solutions" className="hover:text-indigo-400 transition">
                  QR Digital Menus
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Agency & Work */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-indigo-400 transition">
                  About VyapaarPro
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-indigo-400 transition">
                  Client Case Studies
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-indigo-400 transition">
                  Request Consultation
                </Link>
              </li>
              <li>
                <Link to="/app" className="hover:text-indigo-400 transition">
                  Client Portal
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-indigo-400 transition">
                  Client Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Governance & Security */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Legal & Security</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/privacy" className="hover:text-indigo-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-indigo-400 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <span className="text-slate-500 block">Row Level Security (RLS)</span>
              </li>
              <li>
                <span className="text-slate-500 block">Dedicated IP & Hosting</span>
              </li>
              <li>
                <span className="text-slate-500 block">100% Client Code Ownership</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>{settings.footer_text}</p>
          <div className="flex items-center space-x-4">
            <Link to="/privacy" className="hover:text-slate-400 transition">
              Privacy
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-slate-400 transition">
              Terms
            </Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-slate-400 transition">
              Help Desk
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
