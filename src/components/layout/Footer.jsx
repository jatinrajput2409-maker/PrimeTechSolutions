import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Twitter, 
  Linkedin,
  MessageCircle
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full bg-slate-100 dark:bg-[#050811] border-t border-slate-200 dark:border-slate-800/80 pt-16 pb-12 relative overflow-hidden transition-colors duration-300">
      {/* Subtle Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-[1px]">
                <div className="w-full h-full bg-white dark:bg-[#0b0f19] rounded-[11px] flex items-center justify-center">
                  <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Prime Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">Solutions</span>
              </span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-sm">
              We engineer world-class digital products, custom web & mobile software, and AI solutions for high-growth startups and businesses worldwide.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://wa.me/916266208406"
                target="_blank" 
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-1.5 hover:bg-emerald-500/20 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp: +91 6266208406</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <li>
                <Link to="/" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-indigo-600 dark:hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Case Studies</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Engineering Insights</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Contact & Quote</Link>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4">
              Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <li>
                <Link to="/services" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Full-Stack Web Dev</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-indigo-600 dark:hover:text-white transition-colors">AI & LLM Integration</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Cloud & DevOps</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Mobile App Dev</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-indigo-600 dark:hover:text-white transition-colors">UI/UX Systems</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Technical SEO</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-4">
              Headquarters & Contact
            </h4>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-indigo-500 mt-1 shrink-0" />
                <span>Harda, Madhya Pradesh (MP), India - 461331</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href="tel:+916266208406" className="text-slate-900 dark:text-white hover:text-indigo-600 font-bold transition-colors">
                  +91 6266208406
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-500 shrink-0" />
                <a href="mailto:contact@primetech.solutions" className="hover:text-indigo-600 dark:hover:text-white transition-colors">
                  contact@primetech.solutions
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Prime Tech Solutions. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-indigo-600 dark:hover:text-slate-200 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-indigo-600 dark:hover:text-slate-200 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-indigo-600 dark:hover:text-slate-200 transition-colors cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
