import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Building
} from 'lucide-react';
import { leadService } from '../services/api';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceRequired: 'High-Velocity Web Engineering',
    budget: '$10,000 - $25,000',
    timeline: 'Within 1 Month',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const WHATSAPP_NUMBER = '916266208406';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // 1. Submit lead to database / backend API
      await leadService.submitLead(formData);

      // 2. Prepare detailed WhatsApp message
      const wpMessage = `*New Website Inquiry - Prime Tech Solutions*\n\n` +
        `👤 *Name:* ${formData.name}\n` +
        `📧 *Email:* ${formData.email}\n` +
        `📱 *Phone:* ${formData.phone || 'N/A'}\n` +
        `🏢 *Company:* ${formData.company || 'N/A'}\n` +
        `🛠️ *Service Required:* ${formData.serviceRequired}\n` +
        `💰 *Estimated Budget:* ${formData.budget}\n` +
        `⏳ *Timeline:* ${formData.timeline}\n` +
        `📝 *Project Details:*\n${formData.message}\n\n` +
        `_Sent via primetechsolutions.io Inquiry Form_`;

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(wpMessage)}`;

      // 3. Trigger celebratory confetti
      confetti({
        particleCount: 130,
        spread: 80,
        origin: { y: 0.6 }
      });

      setSuccess(true);

      // 4. Open WhatsApp directly in new tab/app
      window.open(whatsappUrl, '_blank');

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        serviceRequired: 'High-Velocity Web Engineering',
        budget: '$10,000 - $25,000',
        timeline: 'Within 1 Month',
        message: ''
      });

    } catch (err) {
      console.warn('API submission notice:', err.message);
      // Even if offline, still open WhatsApp with all formatted details so inquiry is never lost!
      const wpMessage = `*New Website Inquiry - Prime Tech Solutions*\n\n` +
        `👤 *Name:* ${formData.name}\n` +
        `📧 *Email:* ${formData.email}\n` +
        `📱 *Phone:* ${formData.phone || 'N/A'}\n` +
        `🏢 *Company:* ${formData.company || 'N/A'}\n` +
        `🛠️ *Service Required:* ${formData.serviceRequired}\n` +
        `💰 *Estimated Budget:* ${formData.budget}\n` +
        `⏳ *Timeline:* ${formData.timeline}\n` +
        `📝 *Project Details:*\n${formData.message}\n\n` +
        `_Sent via primetechsolutions.io Inquiry Form_`;

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(wpMessage)}`, '_blank');
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-24 w-full overflow-hidden">
      
      {/* Header */}
      <section className="text-center w-full px-4 sm:px-8 py-10">
        <span className="text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-indigo-500/30">
          Get In Touch
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
          Let’s Discuss Your Next <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500">
            High-Impact Project
          </span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Tell us about your requirements, timeline, and goals. Fill the form below to connect instantly on WhatsApp (+91 6266208406) or schedule a discovery call.
        </p>
      </section>

      {/* Main Grid: Form & Location Details */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Request A Proposal</h3>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5" />
                  Instant WhatsApp Sync
                </span>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-8">
                Submitting this form immediately routes the complete inquiry details to our WhatsApp team at <strong>+91 6266208406</strong>.
              </p>

              {success && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold">Inquiry Sent to WhatsApp!</h5>
                    <p className="text-xs mt-1 text-slate-700 dark:text-slate-300">
                      Your details have been saved and opened directly in WhatsApp. You can also chat with us anytime at +91 6266208406.
                    </p>
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 mb-1.5">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 mb-1.5">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Innovatech Labs"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 mb-1.5">
                      Service Required
                    </label>
                    <select
                      value={formData.serviceRequired}
                      onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="High-Velocity Web Engineering">High-Velocity Web Engineering</option>
                      <option value="Custom Software & Cloud Solutions">Custom Software & Cloud Solutions</option>
                      <option value="AI Integration & Workflow Automation">AI Integration & Automation</option>
                      <option value="Cross-Platform Mobile Apps">Cross-Platform Mobile Apps</option>
                      <option value="UI/UX & Product Design Systems">UI/UX & Product Design</option>
                      <option value="Growth Marketing & SEO">Growth Marketing & SEO</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 mb-1.5">
                      Estimated Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Under ₹50,000">Under ₹50,000</option>
                      <option value="₹50,000 - ₹1,50,000">₹50,000 - ₹1,50,000</option>
                      <option value="₹1,50,000 - ₹5,00,000">₹1,50,000 - ₹5,00,000</option>
                      <option value="₹5,00,000+ (Enterprise)">₹5,00,000+ (Enterprise)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 mb-1.5">
                    Project Requirements & Scope *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your requirements, target features, and any reference websites..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 via-emerald-500 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-600/25 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{loading ? 'Processing...' : 'Submit Inquiry & Chat on WhatsApp'}</span>
                </button>

              </form>
            </motion.div>
          </div>

          {/* Right Column: Harda MP Location & Direct Communication */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">Direct Communication</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Get in touch directly via phone, WhatsApp or visit our location.</p>
              </div>

              <div className="space-y-5 text-sm">
                
                {/* Mobile / WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white">Direct Mobile & WhatsApp</h5>
                    <a
                      href="tel:+916266208406"
                      className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 hover:underline block mt-0.5"
                    >
                      +91 6266208406
                    </a>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Prime%20Tech%20Solutions,%20I%20have%20a%20project%20inquiry.`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-cyan-400 font-bold hover:underline mt-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Start Instant WhatsApp Chat</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Harda Location */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white">Office Location</h5>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                      Harda, Madhya Pradesh (MP), India - 461331
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Serving national and international clients worldwide.
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white">Email Address</h5>
                    <a
                      href="mailto:contact@primetech.solutions"
                      className="text-sm text-indigo-600 dark:text-cyan-400 font-semibold hover:underline block mt-0.5"
                    >
                      contact@primetech.solutions
                    </a>
                  </div>
                </div>

              </div>

              {/* Interactive Visual Map Card */}
              <div className="rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-800 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h6 className="font-bold text-white text-base">Harda, Madhya Pradesh, India</h6>
                  <p className="text-xs text-slate-400 mt-0.5">Coordinates: 22.3444° N, 77.0945° E</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Harda+Madhya+Pradesh+India"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default Contact;
