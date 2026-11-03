import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2, Globe, Sparkles, Mail, ShieldCheck } from 'lucide-react';
import { settingsService } from '../../services/api';

export const SiteSettings = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await settingsService.get();
        if (res.data.success) {
          setFormData(res.data.settings);
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await settingsService.update(formData);
      if (res.data.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3500);
      }
    } catch (err) {
      console.error('Update settings failed:', err);
      alert('Failed to update settings.');
    }
  };

  if (loading || !formData) {
    return (
      <div className="py-20 text-center text-xs text-slate-400">
        Loading site configuration...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-indigo-400" />
            <span>Site Content Management & SEO Control</span>
          </h2>
          <p className="text-xs text-slate-400">
            Control headlines, agency metrics, contact information, and meta tags with instant live sync.
          </p>
        </div>

        {savedSuccess && (
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings Saved & Deployed!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Branding & Hero Section */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Homepage Hero Banner & Branding</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Agency Name</label>
              <input
                type="text"
                value={formData.agencyName || ''}
                onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Tagline</label>
              <input
                type="text"
                value={formData.tagline || ''}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Hero Pill Badge Text</label>
            <input
              type="text"
              value={formData.heroBadge || ''}
              onChange={(e) => setFormData({ ...formData, heroBadge: e.target.value })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Hero Sub-description</label>
            <textarea
              rows={3}
              value={formData.heroDescription || ''}
              onChange={(e) => setFormData({ ...formData, heroDescription: e.target.value })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Agency Metrics */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>Trust Metrics & Stats Counter</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Projects Shipped</label>
              <input
                type="text"
                value={formData.stats?.projectsCompleted || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  stats: { ...formData.stats, projectsCompleted: e.target.value }
                })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Satisfaction %</label>
              <input
                type="text"
                value={formData.stats?.clientSatisfaction || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  stats: { ...formData.stats, clientSatisfaction: e.target.value }
                })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Avg MVP Weeks</label>
              <input
                type="text"
                value={formData.stats?.averageDeliveryWeeks || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  stats: { ...formData.stats, averageDeliveryWeeks: e.target.value }
                })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Client Capital Raised</label>
              <input
                type="text"
                value={formData.stats?.capitalRaisedByClients || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  stats: { ...formData.stats, capitalRaisedByClients: e.target.value }
                })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Contact Info & Office */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-400" />
            <span>Contact Information & Office Address</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Inquiry Email</label>
              <input
                type="email"
                value={formData.contactEmail || ''}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Phone Number</label>
              <input
                type="text"
                value={formData.contactPhone || ''}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Physical Office Address</label>
            <input
              type="text"
              value={formData.officeAddress || ''}
              onChange={(e) => setFormData({ ...formData, officeAddress: e.target.value })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* SEO Meta Control */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Search Engine Optimization (SEO)</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Meta Title</label>
            <input
              type="text"
              value={formData.seo?.metaTitle || ''}
              onChange={(e) => setFormData({
                ...formData,
                seo: { ...formData.seo, metaTitle: e.target.value }
              })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Meta Description</label>
            <textarea
              rows={2}
              value={formData.seo?.metaDescription || ''}
              onChange={(e) => setFormData({
                ...formData,
                seo: { ...formData.seo, metaDescription: e.target.value }
              })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
          >
            <Save className="w-4 h-4" />
            <span>Save & Apply CMS Updates</span>
          </button>
        </div>

      </form>
    </div>
  );
};

export default SiteSettings;

