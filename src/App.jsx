import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdminLayout from './components/layout/AdminLayout';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import ManageServices from './pages/admin/ManageServices';
import ManageProjects from './pages/admin/ManageProjects';
import ManageBlogs from './pages/admin/ManageBlogs';
import ManageTeam from './pages/admin/ManageTeam';
import ManageTestimonials from './pages/admin/ManageTestimonials';
import ManageLeads from './pages/admin/ManageLeads';
import SiteSettings from './pages/admin/SiteSettings';

export function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col w-full bg-[#f8fafc] dark:bg-[#080c15] text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Show Public Navbar only on non-admin routes */}
      {!isAdminRoute && <Navbar />}

      <div className="flex-1 w-full">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Protected Dashboard */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="services" element={<ManageServices />} />
            <Route path="projects" element={<ManageProjects />} />
            <Route path="blogs" element={<ManageBlogs />} />
            <Route path="team" element={<ManageTeam />} />
            <Route path="testimonials" element={<ManageTestimonials />} />
            <Route path="leads" element={<ManageLeads />} />
            <Route path="settings" element={<SiteSettings />} />
          </Route>
        </Routes>
      </div>

      {/* Show Public Footer only on non-admin routes */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
