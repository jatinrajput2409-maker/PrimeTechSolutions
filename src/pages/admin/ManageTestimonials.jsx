import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, MessageSquareQuote, Star, X, Save } from 'lucide-react';
import { testimonialService } from '../../services/api';

export const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  const [formData, setFormData] = useState({
    clientName: '',
    clientRole: '',
    company: '',
    feedback: '',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    projectWorkedOn: '',
    isFeatured: true
  });

  const fetchTestimonials = async () => {
    try {
      const res = await testimonialService.getAll();
      if (res.data.success) {
        setTestimonials(res.data.testimonials);
      }
    } catch (err) {
      console.error('Error fetching testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openCreateModal = () => {
    setEditingTestimonial(null);
    setFormData({
      clientName: '',
      clientRole: '',
      company: '',
      feedback: '',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      projectWorkedOn: 'MVP Development',
      isFeatured: true
    });
    setModalOpen(true);
  };

  const openEditModal = (t) => {
    setEditingTestimonial(t);
    setFormData({
      clientName: t.clientName,
      clientRole: t.clientRole,
      company: t.company,
      feedback: t.feedback,
      rating: t.rating || 5,
      avatar: t.avatar,
      projectWorkedOn: t.projectWorkedOn || '',
      isFeatured: t.isFeatured !== false
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTestimonial) {
        await testimonialService.update(editingTestimonial._id, formData);
      } else {
        await testimonialService.create(formData);
      }
      setModalOpen(false);
      fetchTestimonials();
    } catch (err) {
      console.error('Save testimonial error:', err);
      alert('Failed to save testimonial.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this client testimonial?')) return;
    try {
      await testimonialService.delete(id);
      fetchTestimonials();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <MessageSquareQuote className="w-6 h-6 text-amber-400" />
            <span>Manage Client Testimonials</span>
          </h2>
          <p className="text-xs text-slate-400">
            Publish founder endorsements and ratings to boost credibility and conversion rates.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-amber-600/30"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div key={t._id} className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(t)}
                    className="p-1 text-slate-400 hover:text-indigo-400"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(t._id)}
                    className="p-1 text-slate-400 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed italic mb-4">
                "{t.feedback}"
              </p>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
              <img
                src={t.avatar}
                alt={t.clientName}
                className="w-9 h-9 rounded-full object-cover border border-slate-700"
              />
              <div>
                <h4 className="text-xs font-bold text-white">{t.clientName}</h4>
                <p className="text-[11px] text-slate-400">{t.clientRole}, {t.company}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#0b0f19] border border-slate-700 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-white">
              {editingTestimonial ? 'Edit Client Feedback' : 'Add Client Testimonial'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Company *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Client Role / Title</label>
                  <input
                    type="text"
                    value={formData.clientRole}
                    onChange={(e) => setFormData({ ...formData, clientRole: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Rating (1 to 5 Stars)</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Client Photo URL</label>
                <input
                  type="url"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Endorsement Quote *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.feedback}
                  onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1 shadow-md shadow-amber-600/30"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Testimonial</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTestimonials;

