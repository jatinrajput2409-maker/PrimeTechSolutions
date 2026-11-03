import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Clock, Eye, ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import { blogService } from '../services/api';

export const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchBlogs();
  }, []);

  const categories = ['All', ...new Set(blogs.map(b => b.category))];

  const filteredBlogs = blogs.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-28 pb-24 w-full overflow-hidden">
      
      {/* Header (Full Width) */}
      <section className="text-center w-full px-4 sm:px-8 py-12">
        <span className="text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-indigo-500/30">
          Engineering & Product Insights
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
          The Prime Tech <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">
            Developer & Startup Journal
          </span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Deep-dives into web performance, scalable microservice patterns, AI automation, and startup growth engineering from our Harda (MP) studio.
        </p>

        {/* Search & Categories Bar */}
        <div className="mt-8 max-w-xl mx-auto relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search architectural insights, articles, and tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-full text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors shadow-sm"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-400 hover:text-indigo-600 border border-slate-300 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Cards Grid (Full Width) */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog, idx) => (
            <motion.article
              key={blog._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col justify-between group"
            >
              <div>
                <Link to={`/blog/${blog.slug}`} className="block relative aspect-video overflow-hidden">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold text-cyan-300 border border-slate-700">
                    {blog.category}
                  </div>
                </Link>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      {blog.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-cyan-500" />
                      {blog.views || 0} reads
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                      {blog.comments?.length || 0}
                    </span>
                  </div>

                  <Link to={`/blog/${blog.slug}`}>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {blog.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-200 dark:border-slate-800/80 mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 pt-4">
                  <img
                    src={blog.author?.avatar}
                    alt={blog.author?.name}
                    className="w-7 h-7 rounded-full object-cover border border-slate-300 dark:border-slate-700"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{blog.author?.name}</p>
                    <p className="text-[10px] text-slate-500">{blog.author?.role}</p>
                  </div>
                </div>

                <Link
                  to={`/blog/${blog.slug}`}
                  className="pt-4 text-xs font-bold text-indigo-600 dark:text-cyan-400 group-hover:underline flex items-center gap-1 transition-colors"
                >
                  <span>Read</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Blog;
