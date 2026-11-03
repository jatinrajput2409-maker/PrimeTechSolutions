import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderKanban, 
  ExternalLink, 
  ArrowRight, 
  X, 
  Quote, 
  MessageCircle,
  Sparkles 
} from 'lucide-react';
import { projectsService } from '../services/api';

const categories = ['All', 'Fintech', 'AI Solution', 'Cloud Platform', 'E-Commerce', 'Web App'];

export const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await projectsService.getAll();
        if (res.data.success) {
          setProjects(res.data.projects);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="pt-28 pb-24 w-full overflow-hidden">
      
      {/* Header (Full Width) */}
      <section className="text-center w-full px-4 sm:px-8 py-12">
        <span className="text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-cyan-500/30">
          Selected Works & Deployments
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
          Crafted For Speed. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-500">
            Engineered For Impact.
          </span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Explore how we help venture-backed startups and modern brands launch resilient digital platforms that drive compound revenue growth.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-extrabold shadow-lg shadow-cyan-500/30'
                  : 'bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-400 hover:text-cyan-600 border border-slate-300 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid (Full Width) */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project._id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="glass-card rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col justify-between group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {project.metrics && (
                  <div className="absolute top-4 right-4 bg-indigo-600/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-indigo-400/30 text-white text-xs font-bold shadow-lg">
                    {project.metrics.label}: {project.metrics.value}
                  </div>
                )}

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs uppercase font-bold text-cyan-300 tracking-wider">
                    {project.category} • {project.client}
                  </span>
                  <h3 className="text-xl font-bold mt-1">
                    {project.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed line-clamp-2">
                  {project.summary}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.technologies?.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies?.length > 4 && (
                    <span className="px-2 py-0.5 text-[11px] text-slate-500">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-600 dark:text-cyan-400 group-hover:underline flex items-center gap-1 transition-colors">
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  {project.liveUrl && (
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <span>Live Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-[#0b0f19] border border-slate-300 dark:border-slate-700 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-slate-900 dark:text-slate-100"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/80 text-white border border-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-video">
                <img
                  src={selectedProject.coverImage}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6 text-white">
                  <span className="text-xs uppercase font-bold text-cyan-300 tracking-wider">
                    {selectedProject.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
                    {selectedProject.title}
                  </h2>
                  <p className="text-xs text-slate-300 mt-0.5">Client: {selectedProject.client}</p>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Tech Stack Pills */}
                <div>
                  <h4 className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider mb-2">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies?.map((tech) => (
                      <span key={tech} className="px-3 py-1 text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-500/30 rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Challenge & Solution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="bg-slate-100 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-2">The Challenge</h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {selectedProject.challenge || selectedProject.summary}
                    </p>
                  </div>
                  <div className="bg-slate-100 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-500 mb-2">Our Solution</h4>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {selectedProject.solution || selectedProject.summary}
                    </p>
                  </div>
                </div>

                {/* Measurable Outcome */}
                {selectedProject.outcome && (
                  <div className="bg-indigo-50 dark:bg-indigo-950/30 p-5 rounded-2xl border border-indigo-200 dark:border-indigo-500/30">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-cyan-400 mb-1">Measurable Business Outcome</h4>
                    <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-semibold">
                      {selectedProject.outcome}
                    </p>
                  </div>
                )}

                {/* Client Quote */}
                {selectedProject.clientFeedback && (
                  <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 italic text-sm text-slate-700 dark:text-slate-300 flex items-start gap-3">
                    <Quote className="w-5 h-5 text-indigo-500 shrink-0 mt-1" />
                    <div>
                      "{selectedProject.clientFeedback.quote}"
                      <p className="mt-2 font-bold text-slate-900 dark:text-white not-italic text-xs">
                        {selectedProject.clientFeedback.author} • <span className="text-slate-500 dark:text-slate-400 font-normal">{selectedProject.clientFeedback.designation}</span>
                      </p>
                    </div>
                  </div>
                )}

                {/* Footer Action */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Want a similar architecture for your startup?
                  </span>
                  <a
                    href="https://wa.me/916266208406"
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Inquire on WhatsApp</span>
                  </a>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Portfolio;
