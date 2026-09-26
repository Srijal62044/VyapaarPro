import React, { useState } from 'react';
import {
  Save,
  CheckCircle,
  Database,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Phone,
  Mail,
  Share2,
} from 'lucide-react';
import { useSettings } from '../../contexts/SettingsContext';
import { isSupabaseConfigured } from '../../lib/supabase';
import { SEO } from '../../components/common/SEO';

export const AdminSettingsPage: React.FC = () => {
  const { settings, updateSettings } = useSettings();

  const [form, setForm] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'database'>('profile');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg('');

    try {
      await updateSettings(form);
      setSuccessMsg('Agency profile and settings updated successfully.');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <SEO title="Agency Settings & Database Config | VyapaarPro Admin" />

      <div>
        <h1 className="text-2xl font-bold text-white">Agency Profile & System Settings</h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure agency brand name, contacts, social media handles, and view database migration scripts.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 space-x-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 transition cursor-pointer border-b-2 flex items-center space-x-2 ${
            activeTab === 'profile'
              ? 'border-violet-500 text-violet-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Agency Branding & Contacts</span>
        </button>

        <button
          onClick={() => setActiveTab('database')}
          className={`pb-3 transition cursor-pointer border-b-2 flex items-center space-x-2 ${
            activeTab === 'database'
              ? 'border-violet-500 text-violet-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Supabase / Database Status</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl flex items-center space-x-2">
          <CheckCircle className="w-4 h-4" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Tab 1: Profile & Contact Configuration */}
      {activeTab === 'profile' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Agency Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Tagline / Mission</label>
                <input
                  type="text"
                  value={form.tagline}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Official Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Phone Number</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  WhatsApp Direct Number
                </label>
                <input
                  type="text"
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Agency Address / Hub</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Business Description (Footer & Meta)
              </label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Footer Copyright Notice</label>
              <input
                type="text"
                value={form.footer_text}
                onChange={(e) => setForm({ ...form, footer_text: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
              />
            </div>

            {/* Social Links */}
            <div className="pt-3 border-t border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Social Profile Handles
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="url"
                  placeholder="LinkedIn URL"
                  value={form.social?.linkedin || ''}
                  onChange={(e) =>
                    setForm({ ...form, social: { ...form.social, linkedin: e.target.value } })
                  }
                  className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
                <input
                  type="url"
                  placeholder="Twitter / X URL"
                  value={form.social?.twitter || ''}
                  onChange={(e) =>
                    setForm({ ...form, social: { ...form.social, twitter: e.target.value } })
                  }
                  className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
                <input
                  type="url"
                  placeholder="GitHub URL"
                  value={form.social?.github || ''}
                  onChange={(e) =>
                    setForm({ ...form, social: { ...form.social, github: e.target.value } })
                  }
                  className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
                <input
                  type="url"
                  placeholder="Instagram URL"
                  value={form.social?.instagram || ''}
                  onChange={(e) =>
                    setForm({ ...form, social: { ...form.social, instagram: e.target.value } })
                  }
                  className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl text-xs transition shadow-md shadow-violet-600/20 flex items-center space-x-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: Database Status & Migrations */}
      {activeTab === 'database' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl text-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">Database Engine & Connection</h3>
              <p className="text-slate-400 mt-0.5">
                Target Backend: Supabase (PostgreSQL with Row Level Security).
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                isSupabaseConfigured
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
              }`}
            >
              {isSupabaseConfigured ? 'Connected to Remote Supabase' : 'Local Persistent Preview Active'}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="font-bold text-white block">Environment Variable Status:</span>
            <div className="font-mono text-[11px] space-y-1 text-slate-300">
              <div className="flex justify-between">
                <span>VITE_SUPABASE_URL:</span>
                <span className="text-slate-400">
                  {import.meta.env.VITE_SUPABASE_URL || 'Not specified (operating in local persistent mode)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>VITE_SUPABASE_ANON_KEY:</span>
                <span className="text-slate-400">
                  {import.meta.env.VITE_SUPABASE_ANON_KEY ? '••••••••••••••••' : 'Not specified'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>VITE_ADMIN_EMAIL:</span>
                <span className="text-violet-400 font-semibold">
                  {import.meta.env.VITE_ADMIN_EMAIL || 'kumarsrijal732@gmail.com'}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">Generated Database Migration Files</h4>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-[11px] text-slate-300 space-y-1">
              <p className="text-emerald-400">
                1. supabase/migrations/20260926000001_initial_vyapaarpro.sql (Schema, RLS, indexes)
              </p>
              <p className="text-indigo-400">
                2. supabase/migrations/20260926000002_seed_data.sql (Starter categories & services)
              </p>
              <p className="text-violet-400">
                3. supabase/migrations/20260926000003_admin_email_security.sql (Authorized single admin email lock)
              </p>
            </div>
            <p className="text-slate-400 leading-relaxed">
              To deploy to your live Supabase project, execute these migration files sequentially in the Supabase SQL Editor.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
