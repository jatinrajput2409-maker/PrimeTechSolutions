import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Eye, MessageSquare, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import { blogService } from '../services/api';

export const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState({ name: '', email: '', comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [commentSuccess, setCommentSuccess] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await blogService.getBySlug(slug);
        if (res.data.success) {
          setBlog(res.data.blog);
          setComments(res.data.blog.comments || []);
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.name || !newComment.email || !newComment.comment) return;
    setSubmitting(true);
    try {
      const res = await blogService.addComment(slug, newComment);
      if (res.data.success) {
        setComments(res.data.comments);
        setNewComment({ name: '', email: '', comment: '' });
        setCommentSuccess(true);
        setTimeout(() => setCommentSuccess(false), 4000);
      }
    } catch (err) {
      console.error('Failed to post comment:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-24 text-center">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-500 text-sm">Loading article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="pt-32 pb-24 text-center max-w-md mx-auto px-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Article Not Found</h2>
        <p className="text-slate-500 text-sm mb-6">The engineering article you are looking for does not exist or has been moved.</p>
        <Link to="/blog" className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold">
          Back to Journal
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 w-full overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-8">
        
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>

        {/* Header */}
        <div className="space-y-4 mb-8">
          <span className="px-3.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-600/20 text-indigo-700 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider border border-indigo-200 dark:border-indigo-500/30">
            {blog.category}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-y border-slate-200 dark:border-slate-800 py-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-3">
              <img
                src={blog.author?.avatar}
                alt={blog.author?.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-300 dark:border-slate-700"
              />
              <div>
                <p className="font-bold text-slate-900 dark:text-white">{blog.author?.name}</p>
                <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">{blog.author?.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-500" />
                {blog.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-cyan-500" />
                {blog.views} reads
              </span>
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-emerald-500" />
                {comments.length} comments
              </span>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="rounded-2xl overflow-hidden aspect-video border border-slate-200 dark:border-slate-800 mb-10 shadow-xl">
          <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
        </div>

        {/* Article Body */}
        <div className="text-slate-800 dark:text-slate-200 text-base leading-relaxed space-y-6 font-normal">
          {blog.content.split('\n\n').map((para, i) => {
            if (para.startsWith('### ')) {
              return (
                <h3 key={i} className="text-2xl font-bold text-slate-900 dark:text-white pt-4 pb-2 border-b border-slate-200 dark:border-slate-800">
                  {para.replace('### ', '')}
                </h3>
              );
            }
            if (para.startsWith('- ')) {
              const items = para.split('\n');
              return (
                <ul key={i} className="space-y-2 list-disc pl-5 text-slate-700 dark:text-slate-300">
                  {items.map((item, idx) => (
                    <li key={idx}>{item.replace('- ', '')}</li>
                  ))}
                </ul>
              );
            }
            if (/^\d+\./.test(para)) {
              const items = para.split('\n');
              return (
                <ol key={i} className="space-y-2 list-decimal pl-5 text-slate-700 dark:text-slate-300">
                  {items.map((item, idx) => (
                    <li key={idx}>{item.replace(/^\d+\.\s*/, '')}</li>
                  ))}
                </ol>
              );
            }
            return <p key={i}>{para}</p>;
          })}
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-2 items-center">
            <span className="text-xs uppercase font-bold text-slate-500 mr-2">Tags:</span>
            {blog.tags.map((t) => (
              <span key={t} className="px-3 py-1 bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold">
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* Comments Section */}
        <section className="mt-16 pt-10 border-t border-slate-200 dark:border-slate-800 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-500" />
              <span>Discussion ({comments.length})</span>
            </h3>
          </div>

          {/* New Comment Form */}
          <form onSubmit={handleCommentSubmit} className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Join the Conversation</h4>
            
            {commentSuccess && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thank you! Your comment has been posted successfully.</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-400 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex"
                  value={newComment.name}
                  onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-400 mb-1">Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. alex@example.com"
                  value={newComment.email}
                  onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-400 mb-1">Your Comment / Feedback</label>
              <textarea
                rows={3}
                required
                placeholder="Share your technical perspectives..."
                value={newComment.comment}
                onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="py-2.5 px-5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-colors shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitting ? 'Posting...' : 'Post Comment'}</span>
            </button>
          </form>

          {/* Comment List */}
          <div className="space-y-3">
            {comments.map((c, i) => (
              <div key={c._id || i} className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{c.name}</span>
                  <span className="text-[11px] text-slate-400">
                    {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'Recently'}
                  </span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {c.comment}
                </p>
              </div>
            ))}
          </div>

        </section>

      </div>
    </div>
  );
};

export default BlogDetail;
