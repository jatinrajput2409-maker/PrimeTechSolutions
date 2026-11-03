import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  ArrowRight,
  Code2,
  Cloud,
  Cpu,
  Smartphone,
  Sparkles,
  BarChart3,
  CheckCircle2,
  Zap,
  TrendingUp,
  Star,
  Quote,
  ChevronRight,
  ExternalLink,
  MessageCircle,
  Phone
} from 'lucide-react';
import { servicesService, projectsService, testimonialService, settingsService } from '../services/api';

const iconMap = {
  Code: Code2,
  Cloud: Cloud,
  Cpu: Cpu,
  Smartphone: Smartphone,
  Sparkles: Sparkles,
  BarChart3: BarChart3
};

export const Home = () => {
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [srvRes, prjRes, tstRes, setRes] = await Promise.allSettled([
          servicesService.getAll(),
          projectsService.getAll({ featured: true }),
          testimonialService.getAll(),
          settingsService.get()
        ]);

        if (srvRes.status === 'fulfilled' && srvRes.value.data.success) {
          setServices(srvRes.value.data.services.slice(0, 6));
        }
        if (prjRes.status === 'fulfilled' && prjRes.value.data.success) {
          setProjects(prjRes.value.data.projects);
        }
        if (tstRes.status === 'fulfilled' && tstRes.value.data.success) {
          setTestimonials(tstRes.value.data.testimonials);
        }
        if (setRes.status === 'fulfilled' && setRes.value.data.success) {
          setSettings(setRes.value.data.settings);
        }
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 110,
      spread: 75,
      origin: { y: 0.6 }
    });
  };

  return (
      <div className="relative w-full overflow-hidden">

          {/* ================= HERO SECTION (FULL WIDTH) ================= */}
          <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 w-full">
            {/* Ambient Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-indigo-500/15 dark:bg-indigo-600/15 rounded-full blur-[130px] pointer-events-none -z-10" />
            <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-[110px] pointer-events-none -z-10" />

                <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
                  <div className="text-center max-w-5xl mx-auto space-y-6">

                    {/* Animated USP Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-200/90 dark:bg-slate-900/90 border border-slate-300 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-semibold shadow-sm"
                    >
                      <Zap className="w-4 h-4 text-cyan-500 animate-pulse" />
                      <span>{settings?.heroBadge || 'Quality • Speed • Innovation | Harda (MP) & Global Delivery'}</span>
                    </motion.div>

                    {/* Dynamic Headline */}
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]"
                    >
                      We Build High-Velocity <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500">
                          Digital Experiences
                      </span> That Scale Startups.
                    </motion.h1>

                    {/* Sub-headline */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal"
                    >
                      From custom web development and React mobile apps to cloud backends and AI solutions, Prime Tech Solutions partners with founders to turn concepts into market-dominating products.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                    >
                      <Link
                        to="/contact"
                        onClick={triggerConfetti}
                        className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold rounded-full shadow-lg shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                      >
                        <span>Request Project Proposal</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>

              <a
                        href="https://wa.me/916266208406?text=Hi%20Prime%20Tech%20Solutions,%20I%20want%20to%20discuss%20a%20project."
                        target="_blank"
                        rel="noreferrer"
                        className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full shadow-lg shadow-emerald-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                      >
                      <MessageCircle className="w-5 h-5" />
                      <span>WhatsApp: +91 6266208406</span>
                    </a>
                  </motion.div>

                  {/* Floating Trust Pills */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 dark:text-slate-400 font-semibold"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>99.4% Delivery On Time</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Fastest React & Node Stack</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Harda (MP) HQ • Global Reach</span>
                    </div>
                  </motion.div>

                </div>

                {/* Interactive Stack Terminal Showcase */}
                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mt-14 w-full max-w-6xl mx-auto rounded-3xl glass-panel p-3 sm:p-5 border border-slate-300 dark:border-slate-800 shadow-2xl relative"
                >
                      <div className="bg-slate-900 dark:bg-[#0b0f19] rounded-2xl overflow-hidden border border-slate-800 text-slate-100">
                        <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                            <span className="text-xs text-slate-400 font-mono ml-2">prime-tech.harda-cluster.ts</span>
                          </div>
                            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                              status: optimal_velocity (99.8)
                            </div>
                          </div>

                              <div className="p-5 sm:p-7 font-mono text-xs sm:text-sm grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#090d16]">
                                <div className="space-y-1">
                                  <p className="text-slate-500">// Prime Tech High-Velocity Startup Stack</p>
                                  <p className="text-indigo-400">const <span className="text-cyan-300">stack</span> = await <span className="text-purple-400">PrimeTechEngine</span>.deploy({`{`}</p>
                                  <p className="pl-4 text-slate-300">target: <span className="text-emerald-300">'High-Growth Startups & Businesses'</span>,</p>
                                  <p className="pl-4 text-slate-300">location: <span className="text-emerald-300">'Harda, Madhya Pradesh (India)'</span>,</p>
                                  <p className="pl-4 text-slate-300">frontend: <span className="text-emerald-300">'React + Vite + Tailwind CSS'</span>,</p>
                                  <p className="pl-4 text-slate-300">backend: <span className="text-emerald-300">'Node.js + Express Fast REST'</span>,</p>
                                  <p className="pl-4 text-slate-300">database: <span className="text-emerald-300">'MongoDB'</span>,</p>
                                  <p className="pl-4 text-slate-300">support: <span className="text-amber-300">'+91 6266208406'</span></p>
                                  <p className="text-indigo-400">{`}`});</p>
                                </div>

                                <div className="border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 space-y-3">
                                    <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Live Health & Performance Metrics</p>
                                    <div className="space-y-2.5">
                                      <div>
                                        <div className="flex justify-between text-xs mb-1">
                                          <span>Speed Index (Sub-second load)</span>
                                          <span className="text-emerald-400 font-bold">390ms</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                          <div className="w-[98%] h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full"></div>
                                        </div>
                                      </div>
                                      <div>
                                        <div className="flex justify-between text-xs mb-1">
                                          <span>Lighthouse SEO & Performance</span>
                                          <span className="text-indigo-400 font-bold">100/100</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                          <div className="w-[100%] h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                                        </div>
                                      </div>
                                      <div>
                                        <div className="flex justify-between text-xs mb-1">
                                          <span>Instant WhatsApp Dispatch</span>
                                          <span className="text-cyan-400 font-bold">Active</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                          <div className="w-[100%] h-full bg-cyan-400 rounded-full"></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>

                          </div>
                        </section>

                            {/* ================= STATS COUNTER (FULL WIDTH) ================= */}
                            <section className="py-12 border-y border-slate-200 dark:border-slate-800/80 bg-slate-100/80 dark:bg-slate-900/40 w-full">
                              <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                                  <div className="p-4">
                                      <p className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">
                                        {settings?.stats?.projectsCompleted || '150+'}
                                      </p>
                                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-semibold">Projects Shipped</p>
                                  </div>
                                  <div className="p-4">
                                      <p className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-emerald-500">
                                        {settings?.stats?.clientSatisfaction || '99.4%'}
                                      </p>
                                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-semibold">Client Satisfaction</p>
                                  </div>
                                  <div className="p-4">
                                      <p className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500">
                                        {settings?.stats?.averageDeliveryWeeks || '3-6'} Wks
                                      </p>
                                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-semibold">Average Delivery Turnaround</p>
                                  </div>
                                  <div className="p-4">
                                      <p className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-rose-500">
                                        {settings?.stats?.capitalRaisedByClients || '$60M+'}
                                      </p>
                                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-semibold">Client Capital Raised</p>
                                  </div>
                                </div>
                              </div>
                            </section>

                                {/* ================= SERVICES OVERVIEW (FULL WIDTH) ================= */}
                                <section className="py-24 w-full">
                                  <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">

                                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                                      <div>
                                          <span className="text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
                                            Full-Lifecycle Solutions
                                          </span>
                                            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
                                              Engineered For Scale, Speed & Conversion
                                            </h2>
                                          </div>
                                          <Link
                                            to="/services"
                                            className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors"
                                          >
                                            <span>Explore All Capabilities</span>
                                            <ArrowRight className="w-4 h-4" />
                                          </Link>
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {services.map((service, index) => {
                                          const IconComponent = iconMap[service.icon] || Code2;
                                          return (
                                            <motion.div
                                              key={service._id}
                                              initial={{ opacity: 0, y: 20 }}
                                              whileInView={{ opacity: 1, y: 0 }}
                                              viewport={{ once: true }}
                                              transition={{ duration: 0.5, delay: index * 0.1 }}
                                              className="glass-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between group"
                                            >
                                              <div className="space-y-4">
                                                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 dark:bg-indigo-600/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                                    <IconComponent className="w-6 h-6" />
                                                  </div>
                                                    <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider block">
                                                      {service.category}
                                                    </span>
                                                      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                                                        {service.title}
                                                      </h3>
                                                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                                          {service.shortDesc}
                                                        </p>
                                                      </div>

                                                          <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                                                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                                              Starting at <strong className="text-slate-900 dark:text-white font-bold">{service.startingPrice}</strong>
                                                            </span>
                                                            <Link
                                                              to={`/services#${service.slug}`}
                                                              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:text-cyan-500 flex items-center gap-1 transition-colors"
                                                            >
                                                              <span>Details</span>
                                                              <ArrowRight className="w-3.5 h-3.5" />
                                                            </Link>
                                                          </div>
                                                        </motion.div>
                                                        );
            })}
                                                      </div>

                                                    </div>
                                                  </section>

                                                      {/* ================= FEATURED CASE STUDIES (FULL WIDTH) ================= */}
                                                      <section className="py-24 bg-slate-100/60 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800/80 w-full">
                                                        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">

                                                          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                                                            <div>
                                                                <span className="text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
                                                                  Proven Track Record
                                                                </span>
                                                                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
                                                                    Featured Case Studies
                                                                  </h2>
                                                                </div>
                                                                <Link
                                                                  to="/portfolio"
                                                                  className="inline-flex items-center gap-1.5 text-sm font-bold text-cyan-600 dark:text-cyan-400 hover:underline transition-colors"
                                                                >
                                                                  <span>View Full Portfolio</span>
                                                                  <ArrowRight className="w-4 h-4" />
                                                                </Link>
                                                            </div>

                                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                                              {projects.slice(0, 2).map((project, index) => (
                                                                <motion.div
                                                                  key={project._id}
                                                                  initial={{ opacity: 0, y: 30 }}
                                                                  whileInView={{ opacity: 1, y: 0 }}
                                                                  viewport={{ once: true }}
                                                                  transition={{ duration: 0.6, delay: index * 0.15 }}
                                                                  className="glass-card rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 group"
                                                                >
                                                                  <div className="relative aspect-video overflow-hidden">
                                                                    <img
                                                                      src={project.coverImage}
                                                                      alt={project.title}
                                                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                                    />
                                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                                                    {project.metrics && (
                                                                        <div className="absolute top-4 right-4 bg-indigo-600/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-indigo-400/30 text-white text-xs font-bold shadow-lg">
                                                                          {project.metrics.label}: {project.metrics.value}
                                                                        </div>
                  )}

                                                                            <div className="absolute bottom-4 left-4 right-4 text-white">
                                                                              <span className="text-xs uppercase font-bold text-cyan-300 tracking-wider">
                                                                                {project.category}
                                                                              </span>
                                                                                <h3 className="text-xl sm:text-2xl font-bold mt-1">
                                                                                  {project.title}
                                                                                </h3>
                                                                            </div>
                                                                        </div>

                                                                        <div className="p-6 sm:p-8 space-y-4">
                                                                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                                                              {project.summary}
                                                                            </p>

                                                                            <div className="flex flex-wrap gap-2 pt-2">
                                                                              {project.technologies.slice(0, 5).map((tech) => (
                                                                                <span
                                                                                  key={tech}
                                                                                  className="px-2.5 py-1 text-[11px] font-semibold text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-md"
                                                                                >
                                                                                  {tech}
                                                                                </span>
                                                                              ))}
                                                                            </div>

                                                                            {project.clientFeedback && (
                                                                                <div className="mt-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 italic text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
                                                                                  <Quote className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                                                                                  <div>
                                                                                    "{project.clientFeedback.quote}"
                                                                                      <p className="mt-1 font-bold text-slate-900 dark:text-slate-200 not-italic">
                                                                                        — {project.clientFeedback.author}, {project.clientFeedback.designation}
                                                                                      </p>
                                                                                  </div>
                                                                                </div>
                  )}

                                                                                  <div className="pt-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
                                                                                    <Link
                                                                                      to={`/portfolio`}
                                                                                      className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-cyan-500 flex items-center gap-1 transition-colors"
                                                                                    >
                                                                                      <span>Read Deep-Dive Study</span>
                                                                                      <ArrowRight className="w-3.5 h-3.5" />
                                                                                    </Link>
                                                                                    {project.liveUrl && (
                                                                                      <a
                                                                                        href={project.liveUrl}
                                                                                        target="_blank"
                                                                                        rel="noreferrer"
                                                                                        className="text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 flex items-center gap-1"
                                                                                      >
                                                                                        <span>Demo Link</span>
                                                                                        <ExternalLink className="w-3 h-3" />
                                                                                      </a>
                                                                                    )}
                                                                                  </div>
                                                                                </div>
                                                                              </motion.div>
                                                                            ))}
                                                                        </div>

                                                                      </div>
      </section>

                                                                      {/* ================= TESTIMONIALS (FULL WIDTH) ================= */}
                                                                      <section className="py-24 w-full">
                                                                        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">

                                                                          <div className="text-center max-w-2xl mx-auto mb-16">
                                                                              <span className="text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
                                                                                Client Endorsements
                                                                              </span>
                                                                                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">
                                                                                  Trusted by Ambitious Founders & Tech Leaders
                                                                                </h2>
                                                                              </div>

                                                                              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                                                                {testimonials.map((t, index) => (
                                                                                  <motion.div
                                                                                    key={t._id}
                                                                                    initial={{ opacity: 0, y: 20 }}
                                                                                    whileInView={{ opacity: 1, y: 0 }}
                                                                                    viewport={{ once: true }}
                                                                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                                                                    className="glass-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between"
                                                                                  >
                                                                                    <div>
                                                                                      <div className="flex items-center gap-1 text-amber-400 mb-4">
                                                                                        {[...Array(t.rating || 5)].map((_, i) => (
                                                                                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                                                                                        ))}
                                                                                      </div>
                                                                                        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-6">
                                                                                          "{t.feedback}"
                                                                                        </p>
                                                                                    </div>

                                                                                      <div className="flex items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                                                                                        <img
                                                                                          src={t.avatar}
                                                                                          alt={t.clientName}
                                                                                          className="w-10 h-10 rounded-full object-cover border border-indigo-500/30"
                                                                                        />
                                                                                        <div>
                                                                                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t.clientName}</h4>
                                                                                          <p className="text-xs text-slate-500 dark:text-slate-400">{t.clientRole}, {t.company}</p>
                                                                                        </div>
                                                                                      </div>
                                                                                  </motion.div>
                                                                                ))}
                                                                              </div>

                                                                          </div>
                                                                      </section>

                                                                                {/* ================= HIGH-CONVERTING CTA (FULL WIDTH) ================= */}
                                                                                <section className="py-20 w-full">
                                                                                  <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
                                                                                    <div className="relative rounded-3xl overflow-hidden p-8 sm:p-14 bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white text-center shadow-2xl border border-indigo-500/30">
                                                                                      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                                                                                        <span className="px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/30 inline-block">
                                                                                          Ready To Ship Your Vision?
                                                                                        </span>
                                                                                        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                                                                                          Let's Build Something Exceptional Together.
                                                                                        </h2>
                                                                                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                                                                                          Connect directly with our engineering team in Harda (MP) or online for a free architectural evaluation and immediate proposal.
                                                                                        </p>
                                                                                          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                                                                                            <Link
                                                                                              to="/contact"
                                                                                              onClick={triggerConfetti}
                                                                                              className="px-8 py-4 bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 text-white font-bold rounded-full shadow-lg shadow-indigo-600/30 hover:scale-105 transition-transform"
                                                                                            >
                                                                                              <span>Book Free Discovery Call</span>
                                                                                            </Link>
                                                                                            <a
                                                                                              href="https://wa.me/916266208406"
                                                                                              target="_blank"
                                                                                              rel="noreferrer"
                                                                                              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-full shadow-lg shadow-emerald-600/30 hover:scale-105 transition-transform flex items-center gap-2"
                                                                                            >
                                                                                              <MessageCircle className="w-5 h-5" />
                                                                                              <span>Chat on WhatsApp (+91 6266208406)</span>
                                                                                            </a>
                                                                                          </div>
                                                                                        </div>
                                                                                      </div>
                                                                                    </div>
                                                                                </section>

                                                                            </div>
                                                                            );
};

                                                                            export default Home;
