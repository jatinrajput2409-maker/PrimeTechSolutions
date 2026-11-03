import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, FileText, X, Save, MessageSquare, Eye } from 'lucide-react';
import { blogService } from '../../services/api';

export const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: 'Engineering & Architecture',
    tags: 'React, Node.js, Cloud',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    readTime: '5 min read',
    authorName: 'Aryan Sharma',
    authorRole: 'Lead Architect',
    isPublished: true,
  });

  const fetchBlogs = async () => {
    try {
      const res = await blogService.getAll();
      if (res.data.success) {
        setBlogs(res.data.blogs);
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const openCreateModal = () => {
    setEditingBlog(null);
    setFormData({
      title: '',
      summary: '',
      content: '',
      category: 'Engineering & Architecture',
      tags: 'React, Architecture, Cloud',
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      readTime: '5 min read',
      authorName: 'Aryan Sharma',
      authorRole: 'Lead Architect',
      isPublished: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (b) => {
    setEditingBlog(b);
    setFormData({
      title: b.title,
      summary: b.summary,
      content: b.content,
      category: b.category,
      tags: Array.isArray(b.tags) ? b.tags.join(', ') : '',
      coverImage: b.coverImage,
      readTime: b.readTime || '5 min read',
      authorName: b.author?.name || 'Aryan Sharma',
      authorRole: b.author?.role || 'Lead Architect',
      isPublished: b.isPublished !== false,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      summary: formData.summary,
      content: formData.content,
      category: formData.category,
      tags: formData.tags.split(',').map(s => s.trim()).filter(Boolean),
      coverImage: formData.coverImage,
      readTime: formData.readTime,
      author: {
        name: formData.authorName,
        role: formData.authorRole,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
      },
      isPublished: formData.isPublished
    };

    try {
      if (editingBlog) {
        await blogService.update(editingBlog._id, payload);
      } else {
        await blogService.create(payload);
      }
      setModalOpen(false);
      fetchBlogs();
    } catch (err) {
      console.error('Save blog error:', err);
      alert('Failed to save blog post.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this article permanently?')) return;
    try {
      await blogService.delete(id);
      fetchBlogs();
    } catch (err) {
      console.error('Delete blog error:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-400" />
            <span>Manage Blog Articles</span>
          </h2>
          <p className="text-xs text-slate-400">
            Author engineering posts, guide founders, and manage community comments.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors shadow-lg shadow-indigo-600/30"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-900/60 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
            <tr>
              <th className="py-3.5 px-4">Article</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Author</th>
              <th className="py-3.5 px-4">Engagement</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {blogs.map((b) => (
              <tr key={b._id} className="hover:bg-slate-900/40 transition-colors">
                <td className="py-4 px-4 font-semibold text-white max-w-sm">
                  <p className="text-sm truncate">{b.title}</p>
                  <p className="text-[11px] text-slate-400 truncate">{b.summary}</p>
                </td>
                <td className="py-4 px-4">
                  <span className="px-2.5 py-1 rounded-full bg-slate-900 text-indigo-400 border border-slate-800 text-[10px] font-semibold">
                    {b.category}
                  </span>
                </td>
                <td className="py-4 px-4 text-slate-300">
                  {b.author?.name || 'Prime Tech Team'}
                </td>
                <td className="py-4 px-4 text-slate-400">
                  <span className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-cyan-400" />
                      {b.views || 0}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                      {b.comments?.length || 0}
                    </span>
                  </span>
                </td>
                <td className="py-4 px-4 text-right space-x-2">
                  <button
                    onClick={() => openEditModal(b)}
                    className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(b._id)}
                    className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
              {editingBlog ? 'Edit Blog Article' : 'Draft New Article'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Estimated Read Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 5 min read"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
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
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Summary (Short teaser)</label>
                <textarea
                  rows={2}
                  required
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Full Article Content (Markdown supported)</label>
                <textarea
                  rows={8}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
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
                  <span>Publish Article</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBlogs;

