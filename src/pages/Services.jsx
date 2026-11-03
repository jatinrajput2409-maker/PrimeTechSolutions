import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Code2,
  Cloud,
  Cpu,
  Smartphone,
  Sparkles,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import { servicesService } from '../services/api';

const iconMap = {
  Code: Code2,
  Cloud: Cloud,
  Cpu: Cpu,
  Smartphone: Smartphone,
  Sparkles: Sparkles,
  BarChart3: BarChart3
};

export const Services = () => {
  const [services, setServices] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await servicesService.getAll();
        if (res.data.success) {
          setServices(res.data.services);
        }
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const categories = ['All', 'Web Development', 'Cloud & DevOps', 'AI & Machine Learning', 'Mobile Apps', 'UI/UX Design', 'Digital Marketing'];

  const filteredServices = activeCategory === 'All'
    ? services
    : services.filter(s => s.category === activeCategory);

  return (
      <div className="pt-28 pb-24 w-full overflow-hidden">

            {/* Header (Full Width) */}
            <section className="text-center w-full px-4 sm:px-8 py-12">
              <span className="text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-indigo-500/30">
                Core Offerings
              </span>
                <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
                  Specialized Engineering & <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">
                      Digital Transformation
                    </span>
                </h1>
                  <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                    From rapid prototype MVP delivery to distributed microservices and autonomous AI agents, we provide modern full-lifecycle digital craftsmanship with 24/7 WhatsApp support.
                  </p>

                  {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white border border-slate-300 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
                </section>

                    {/* Services List (Full Width) */}
                    <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-6">
                      <div className="space-y-10">
                        {filteredServices.map((service, idx) => {
                          const IconComponent = iconMap[service.icon] || Code2;
                          const isEven = idx % 2 === 0;
                          return (
                            <motion.div
                              key={service._id}
                              id={service.slug}
                              initial={{ opacity: 0, y: 30 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5 }}
                              className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800/80 relative overflow-hidden"
                            >
                              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>

                                {/* Left Column: Details */}
                                <div className="lg:col-span-7 space-y-5">
                                  <div className="flex items-center gap-3">
                                      <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                                        <IconComponent className="w-6 h-6" />
                                      </div>
                                      <div>
                                          <span className="text-xs uppercase font-bold text-cyan-600 dark:text-cyan-400 tracking-wider">
                                            {service.category}
                                          </span>
                                            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                                              {service.title}
                                            </h3>
                                          </div>
                                      </div>

                                        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                                          {service.fullDesc}
                                        </p>

                                        {/* Features List */}
                                        <div className="space-y-2.5 pt-2">
                                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400">
                                              What's Included:
                                            </h4>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                              {service.features?.map((f, i) => (
                                                  <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                                    <span>{f}</span>
                                                  </div>
                        ))}
                                                </div>
                    </div>
                                        </div>

                                        {/* Right Column: Pricing & Deliverables Box */}
                                              <div className="lg:col-span-5 bg-slate-100 dark:bg-slate-900/70 rounded-2xl p-6 border border-slate-300 dark:border-slate-800 space-y-4">
                                                <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800">
                                                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Project Engagement</span>
                                                  <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                                                    {service.startingPrice} <span className="text-xs font-normal text-slate-500">/ starting</span>
                                                  </span>
                                                </div>

                                                <div>
                                                    <p className="text-xs font-bold uppercase text-slate-700 dark:text-slate-400 tracking-wider mb-2">Deliverables</p>
                                                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                                                      {service.deliverables?.map((d, i) => (
                                                        <li key={i} className="flex items-center gap-2">
                                                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                                                          {d}
                                                        </li>
                                                      ))}
                                                    </ul>
                                                </div>

                                                  <div className="pt-4 flex flex-col sm:flex-row gap-2">
                                                    <Link
                                                      to="/contact"
                                                      className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-center font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                                                    >
                                                      <span>Start With This Service</span>
                                                      <ArrowRight className="w-4 h-4" />
                                                    </Link>
                                                    <a
                                                      href={`https://wa.me/916266208406?text=Hi%20Prime%20Tech,%20I'm%20interested%20in%20${encodeURIComponent(service.title)}`}
                                                      target="_blank"
                                                      rel="noreferrer"
                                                      className="p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl flex items-center justify-center"
                                                      title="Inquire via WhatsApp"
                                                    >
                                                      <MessageCircle className="w-4 h-4" />
                                                    </a>
                                                  </div>
                                                </div>

                                              </div>
                                            </motion.div>
                                            );
          })}
                                          </div>
                                        </section>

                                    </div>
                                    );
};

                                    export default Services;
