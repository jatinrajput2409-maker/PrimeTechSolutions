import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Inbox, 
  Layers, 
  FolderKanban, 
  FileText, 
  TrendingUp, 
  ArrowUpRight, 
  Eye, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  ShieldCheck 
} from 'lucide-react';
import { analyticsService, leadService } from '../../services/api';

export const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await analyticsService.get();
        if (res.data.success) {
          setStats(res.data.stats);
        }
      } catch (err) {
        console.error('Error fetching analytics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs text-slate-400">Loading live analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-indigo-900/60 via-slate-900 to-indigo-950/60 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Dynamic CMS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Prime Tech Mission Control
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Manage your marketing website content, inspect client inquiries, monitor sales pipelines, and configure SEO in real time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/leads"
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md transition-colors flex items-center gap-2"
          >
            <Inbox className="w-4 h-4" />
            <span>View Inbound Leads</span>
          </Link>
          <Link
            to="/admin/settings"
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-colors"
          >
            <span>Edit Site CMS</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Inbound Leads</span>
            <Inbox className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white">
            {stats?.totalLeads || 0}
          </p>
          <p className="text-[11px] text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>{stats?.newLeads || 0} requiring action</span>
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Lead Conversion Rate</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white">
            {stats?.conversionRate || '0%'}
          </p>
          <p className="text-[11px] text-slate-400">
            {stats?.convertedLeads || 0} deals won
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Active Services</span>
            <Layers className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white">
            {stats?.totalServices || 0}
          </p>
          <p className="text-[11px] text-slate-400">
            Full-stack engineering capabilities
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Case Studies & Blogs</span>
            <FolderKanban className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white">
            {(stats?.totalProjects || 0) + (stats?.totalBlogs || 0)}
          </p>
          <p className="text-[11px] text-slate-400">
            {stats?.totalProjects || 0} Projects • {stats?.totalBlogs || 0} Articles
          </p>
        </div>

      </div>

      {/* Recent Leads Pipeline */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-white text-base">Recent Inbound Inquiries</h3>
            <p className="text-xs text-slate-400">Leads captured from homepage and contact page CTAs</p>
          </div>
          <Link
            to="/admin/leads"
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            <span>Manage All Leads</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/60 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Service Required</th>
                <th className="py-3 px-4">Budget</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {stats?.recentLeads?.length > 0 ? (
                stats.recentLeads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-semibold text-white">{lead.name}</p>
                      <p className="text-[11px] text-slate-400">{lead.email} • {lead.company || 'N/A'}</p>
                    </td>
                    <td className="py-3 px-4 text-slate-300 font-medium">
                      {lead.serviceRequired}
                    </td>
                    <td className="py-3 px-4 text-emerald-400 font-semibold">
                      {lead.budget}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        lead.status === 'New'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : lead.status === 'Contacted'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-slate-500">
                    No inquiries recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;

