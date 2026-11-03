import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  X, 
  Layers, 
  Save, 
  ArrowUpDown 
} from 'lucide-react';
import { servicesService } from '../../services/api';

export const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Development',
    shortDesc: '',
    fullDesc: '',
    startingPrice: '$2,499',
    icon: 'Code',
    features: '',
    deliverables: '',
    isActive: true,
  });

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

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setFormData({
      title: '',
      category: 'Web Development',
      shortDesc: '',
      fullDesc: '',
      startingPrice: '$2,499',
      icon: 'Code',
      features: '',
      deliverables: '',
      isActive: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (srv) => {
    setEditingService(srv);
    setFormData({
      title: srv.title,
      category: srv.category,
      shortDesc: srv.shortDesc,
      fullDesc: srv.fullDesc,
      startingPrice: srv.startingPrice || '$2,499',
      icon: srv.icon || 'Code',
      features: Array.isArray(srv.features) ? srv.features.join('\n') : '',
      deliverables: Array.isArray(srv.deliverables) ? srv.deliverables.join('\n') : '',
      isActive: srv.isActive !== false,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      features: formData.features.split('\n').map(s => s.trim()).filter(Boolean),
      deliverables: formData.deliverables.split('\n').map(s => s.trim()).filter(Boolean),
    };

    try {
      if (editingService) {
        await servicesService.update(editingService._id, payload);
      } else {
        await servicesService.create(payload);
      }
      setModalOpen(false);
      fetchServices();
    } catch (err) {
      console.error('Save service failed:', err);
      alert('Failed to save service. Check backend connection.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await servicesService.delete(id);
      fetchServices();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-indigo-400" />
            <span>Manage Agency Services</span>
          </h2>
          <p className="text-xs text-slate-400">
            Dynamically add, edit, or adjust service offerings displayed across the website.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-indigo-600/30"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/60 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Service</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Starting Price</th>
                <th className="py-3.5 px-4">Features</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {services.map((srv) => (
                <tr key={srv._id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-4 px-4 font-semibold text-white">
                    <p className="text-sm">{srv.title}</p>
                    <p className="text-[11px] text-slate-400 truncate max-w-xs">{srv.shortDesc}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-full bg-slate-900 text-cyan-400 border border-slate-800 text-[10px] font-semibold">
                      {srv.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-emerald-400 font-bold">
                    {srv.startingPrice}
                  </td>
                  <td className="py-4 px-4 text-slate-400">
                    {srv.features?.length || 0} items
                  </td>
                  <td className="py-4 px-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(srv)}
                      className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors"
                      title="Edit Service"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(srv._id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                      title="Delete Service"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Service Edit / Create Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#0b0f19] border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white">
              {editingService ? 'Edit Service Details' : 'Create New Service Offering'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Service Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="Mobile Apps">Mobile Apps</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Starting Price Indicator</label>
                  <input
                    type="text"
                    value={formData.startingPrice}
                    onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Icon Representation</label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Code">Code (Web Dev)</option>
                    <option value="Cloud">Cloud (Cloud & DevOps)</option>
                    <option value="Cpu">Cpu (AI / ML)</option>
                    <option value="Smartphone">Smartphone (Mobile)</option>
                    <option value="Sparkles">Sparkles (UI/UX)</option>
                    <option value="BarChart3">BarChart3 (Marketing/SEO)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Short Description (for homepage card)</label>
                <input
                  type="text"
                  required
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Full Detailed Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.fullDesc}
                  onChange={(e) => setFormData({ ...formData, fullDesc: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Features (One per line)</label>
                <textarea
                  rows={3}
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Deliverables (One per line)</label>
                <textarea
                  rows={2}
                  placeholder="Deliverable 1&#10;Deliverable 2"
                  value={formData.deliverables}
                  onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
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
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-md shadow-indigo-600/30"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Service</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageServices;

