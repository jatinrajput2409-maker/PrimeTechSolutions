import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  FolderKanban, 
  X, 
  Save, 
  ExternalLink,
  Star
} from 'lucide-react';
import { projectsService } from '../../services/api';

export const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    client: '',
    category: 'Web App',
    summary: '',
    challenge: '',
    solution: '',
    outcome: '',
    technologies: '',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    liveUrl: '',
    metricLabel: 'Performance Boost',
    metricValue: '+150%',
    feedbackQuote: '',
    feedbackAuthor: '',
    feedbackDesignation: '',
    isFeatured: true
  });

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

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      client: '',
      category: 'Web App',
      summary: '',
      challenge: '',
      solution: '',
      outcome: '',
      technologies: 'React, Node.js, MongoDB, Tailwind CSS',
      coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      liveUrl: 'https://demo.example.com',
      metricLabel: 'Speed Increase',
      metricValue: '+240%',
      feedbackQuote: 'Prime Tech Solutions executed beyond expectations.',
      feedbackAuthor: 'CTO',
      feedbackDesignation: 'Co-Founder',
      isFeatured: true
    });
    setModalOpen(true);
  };

  const openEditModal = (prj) => {
    setEditingProject(prj);
    setFormData({
      title: prj.title,
      client: prj.client,
      category: prj.category,
      summary: prj.summary,
      challenge: prj.challenge || '',
      solution: prj.solution || '',
      outcome: prj.outcome || '',
      technologies: Array.isArray(prj.technologies) ? prj.technologies.join(', ') : '',
      coverImage: prj.coverImage,
      liveUrl: prj.liveUrl || '',
      metricLabel: prj.metrics?.label || '',
      metricValue: prj.metrics?.value || '',
      feedbackQuote: prj.clientFeedback?.quote || '',
      feedbackAuthor: prj.clientFeedback?.author || '',
      feedbackDesignation: prj.clientFeedback?.designation || '',
      isFeatured: prj.isFeatured !== false
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      client: formData.client,
      category: formData.category,
      summary: formData.summary,
      challenge: formData.challenge,
      solution: formData.solution,
      outcome: formData.outcome,
      technologies: formData.technologies.split(',').map(s => s.trim()).filter(Boolean),
      coverImage: formData.coverImage,
      liveUrl: formData.liveUrl,
      metrics: {
        label: formData.metricLabel,
        value: formData.metricValue
      },
      clientFeedback: {
        quote: formData.feedbackQuote,
        author: formData.feedbackAuthor,
        designation: formData.feedbackDesignation
      },
      isFeatured: formData.isFeatured
    };

    try {
      if (editingProject) {
        await projectsService.update(editingProject._id, payload);
      } else {
        await projectsService.create(payload);
      }
      setModalOpen(false);
      fetchProjects();
    } catch (err) {
      console.error('Save project failed:', err);
      alert('Failed to save case study.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this case study from portfolio?')) return;
    try {
      await projectsService.delete(id);
      fetchProjects();
    } catch (err) {
      console.error('Delete project failed:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <FolderKanban className="w-6 h-6 text-cyan-400" />
            <span>Manage Case Studies & Portfolio</span>
          </h2>
          <p className="text-xs text-slate-400">
            Showcase successful client projects, metrics, tech stacks, and testimonials.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-cyan-600/30"
        >
          <Plus className="w-4 h-4" />
          <span>Add Case Study</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((prj) => (
          <div key={prj._id} className="glass-panel rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between">
            <div className="relative aspect-video">
              <img src={prj.coverImage} alt={prj.title} className="w-full h-full object-cover" />
              {prj.isFeatured && (
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-amber-500/90 text-slate-950 font-bold text-[10px] flex items-center gap-1">
                  <Star className="w-3 h-3 fill-slate-950" />
                  Featured
                </span>
              )}
            </div>

            <div className="p-5 space-y-2">
              <span className="text-[10px] font-bold uppercase text-cyan-400 tracking-wider">
                {prj.category} • {prj.client}
              </span>
              <h4 className="text-base font-bold text-white line-clamp-1">{prj.title}</h4>
              <p className="text-xs text-slate-400 line-clamp-2">{prj.summary}</p>
            </div>

            <div className="p-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-400">
                {prj.metrics?.value || 'Active'}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(prj)}
                  className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(prj._id)}
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#0b0f19] border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white">
              {editingProject ? 'Edit Project Case Study' : 'Create New Portfolio Piece'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Web App">Web App</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="AI Solution">AI Solution</option>
                    <option value="Cloud Platform">Cloud Platform</option>
                    <option value="Fintech">Fintech</option>
                    <option value="E-Commerce">E-Commerce</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Technologies (Comma separated)</label>
                  <input
                    type="text"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Cover Image URL</label>
                <input
                  type="url"
                  required
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Summary (1-2 sentences)</label>
                <textarea
                  rows={2}
                  required
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Key Metric Label</label>
                  <input
                    type="text"
                    placeholder="e.g. Volume Handled"
                    value={formData.metricLabel}
                    onChange={(e) => setFormData({ ...formData, metricLabel: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Key Metric Value</label>
                  <input
                    type="text"
                    placeholder="e.g. $120M+"
                    value={formData.metricValue}
                    onChange={(e) => setFormData({ ...formData, metricValue: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Client Feedback Quote</label>
                <textarea
                  rows={2}
                  value={formData.feedbackQuote}
                  onChange={(e) => setFormData({ ...formData, feedbackQuote: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-md shadow-cyan-600/30"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Case Study</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProjects;

