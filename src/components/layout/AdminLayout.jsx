import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Layers,
  FolderKanban,
  FileText,
  Users,
  MessageSquareQuote,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  ShieldAlert
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Services CMS', path: '/admin/services', icon: Layers },
  { name: 'Portfolio CMS', path: '/admin/projects', icon: FolderKanban },
  { name: 'Blog Articles', path: '/admin/blogs', icon: FileText },
  { name: 'Team Members', path: '/admin/team', icon: Users },
  { name: 'Testimonials', path: '/admin/testimonials', icon: MessageSquareQuote },
  { name: 'Leads & Inquiries', path: '/admin/leads', icon: Inbox },
  { name: 'Site & SEO CMS', path: '/admin/settings', icon: Settings },
];

export const AdminLayout = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // If not authenticated, prompt to login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#080c15] flex items-center justify-center p-4">
        <div className="glass-panel p-8 rounded-2xl max-w-md w-full text-center space-y-4 border border-slate-800">
          <div className="w-14 h-14 bg-red-500/10 text-red-400 rounded-2xl flex items-center justify-center mx-auto border border-red-500/20">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-white">Authentication Required</h2>
          <p className="text-sm text-slate-400">
            You need to be logged into the Prime Tech Admin Portal to access this dashboard.
          </p>
          <button
            onClick={() => navigate('/admin/login')}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-indigo-600/30"
          >
            Go to Admin Login
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#080c15] text-slate-100 flex">
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0a0f1d] border-r border-slate-800/80 flex flex-col justify-between transform transition-transform duration-300 md:translate-x-0 ${
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div>
          {/* Logo / Header */}
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/30">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-bold text-white text-base tracking-tight leading-none">Prime Tech</h1>
                <span className="text-[10px] text-indigo-400 uppercase tracking-widest font-semibold">Master Admin</span>
              </div>
            </Link>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="p-1 text-slate-400 hover:text-white md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-white/70" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/40">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
              alt="Admin Avatar"
              className="w-9 h-9 rounded-full object-cover border border-slate-700"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user?.name || 'Administrator'}</p>
              <p className="text-[11px] text-indigo-400 truncate capitalize">{user?.role || 'Admin'} Access</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              target="_blank"
              className="flex-1 py-1.5 px-2.5 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="py-1.5 px-2.5 text-xs text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-[#0a0f1d]/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 text-slate-400 hover:text-white md:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-sm sm:text-base font-semibold text-white">
              {navItems.find((item) => item.path === location.pathname)?.name || 'Admin Management'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Sync Active
            </span>
            <Link
              to="/"
              className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-lg transition-colors"
            >
              <span>View Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

