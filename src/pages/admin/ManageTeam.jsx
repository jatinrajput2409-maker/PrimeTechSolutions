import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, Users, X, Save, Linkedin, Twitter, Github } from 'lucide-react';
import { teamService } from '../../services/api';

export const ManageTeam = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    department: 'Engineering',
    bio: '',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    linkedin: '',
    twitter: '',
    github: ''
  });

  const fetchTeam = async () => {
    try {
      const res = await teamService.getAll();
      if (res.data.success) {
        setTeam(res.data.team);
      }
    } catch (err) {
      console.error('Error fetching team:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const openCreateModal = () => {
    setEditingMember(null);
    setFormData({
      name: '',
      role: '',
      department: 'Engineering',
      bio: '',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com'
    });
    setModalOpen(true);
  };

  const openEditModal = (m) => {
    setEditingMember(m);
    setFormData({
      name: m.name,
      role: m.role,
      department: m.department || 'Engineering',
      bio: m.bio || '',
      image: m.image,
      linkedin: m.socialLinks?.linkedin || '',
      twitter: m.socialLinks?.twitter || '',
      github: m.socialLinks?.github || ''
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      role: formData.role,
      department: formData.department,
      bio: formData.bio,
      image: formData.image,
      socialLinks: {
        linkedin: formData.linkedin,
        twitter: formData.twitter,
        github: formData.github
      }
    };

    try {
      if (editingMember) {
        await teamService.update(editingMember._id, payload);
      } else {
        await teamService.create(payload);
      }
      setModalOpen(false);
      fetchTeam();
    } catch (err) {
      console.error('Save team member error:', err);
      alert('Failed to save team member.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this team member from the website?')) return;
    try {
      await teamService.delete(id);
      fetchTeam();
    } catch (err) {
      console.error('Delete team member error:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-400" />
            <span>Manage Team Members</span>
          </h2>
          <p className="text-xs text-slate-400">
            Showcase technical founders, lead architects, and design directors.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-indigo-600/30"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((m) => (
          <div key={m._id} className="glass-panel rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="aspect-square relative overflow-hidden">
                <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-cyan-400 font-semibold text-[10px] border border-slate-700">
                  {m.department}
                </span>
              </div>

              <div className="p-4 space-y-1">
                <h4 className="text-sm font-bold text-white">{m.name}</h4>
                <p className="text-xs text-indigo-400 font-medium">{m.role}</p>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{m.bio}</p>
              </div>
            </div>

            <div className="p-3 border-t border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-400">
                {m.socialLinks?.linkedin && <Linkedin className="w-3.5 h-3.5" />}
                {m.socialLinks?.github && <Github className="w-3.5 h-3.5" />}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(m)}
                  className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(m._id)}
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
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
              {editingMember ? 'Edit Team Member' : 'Add Team Member'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Role / Job Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Profile Photo URL</label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Short Bio</label>
                <textarea
                  rows={2}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">LinkedIn</label>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full px-2 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Twitter</label>
                  <input
                    type="url"
                    value={formData.twitter}
                    onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                    className="w-full px-2 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">GitHub</label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full px-2 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
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
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1 shadow-md shadow-indigo-600/30"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Member</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTeam;

