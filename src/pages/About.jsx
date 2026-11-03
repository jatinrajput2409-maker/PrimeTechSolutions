import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Target, 
  Compass, 
  Linkedin, 
  Twitter, 
  Github, 
  Sparkles,
  MapPin,
  Phone
} from 'lucide-react';
import { teamService } from '../services/api';

const timelineMilestones = [
  {
    year: '2021',
    title: 'The Inception in Harda (MP)',
    desc: 'Founded with a core conviction: high-velocity engineering, direct client collaboration, and modern software craftsmanship can scale startups faster than bloated agencies.'
  },
  {
    year: '2022',
    title: 'Startup & MVP Acceleration',
    desc: 'Delivered rapid MVPs for emerging businesses, helping founders deploy full-stack React and Node.js platforms within weeks.'
  },
  {
    year: '2024',
    title: 'AI & Enterprise Systems',
    desc: 'Pioneered custom AI automation, WhatsApp dispatch systems, and scalable MongoDB/PostgreSQL microservices.'
  },
  {
    year: '2026',
    title: 'Full-Scale Digital Studio',
    desc: 'Serving high-growth startups across India and internationally with a dedicated engineering center in Harda, Madhya Pradesh.'
  }
];

export const About = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchTeam();
  }, []);

  return (
    <div className="pt-28 pb-20 w-full overflow-hidden">
      
      {/* Hero Header */}
      <section className="relative py-16 text-center w-full px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Story & Principles</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight"
        >
          Engineers, Builders, & <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500">
            Startup Enablers.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto"
        >
          Headquartered in Harda, Madhya Pradesh (India), Prime Tech Solutions builds world-class software with extreme velocity, obsessive polish, and transparent collaboration.
        </motion.p>
      </section>

      {/* Mission & Vision Cards (Full Width) */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-2xl border border-slate-200 dark:border-slate-800"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Our Mission</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
              To equip ambitious startups and local enterprises with cutting-edge full-stack engineering firepower, transforming bold product ideas into reliable, high-converting digital platforms.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-2xl border border-slate-200 dark:border-slate-800"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-6">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Our Vision</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
              To bridge the gap between world-class engineering standards and responsive customer accessibility—enabling founders to launch digital solutions at lightning speed with direct WhatsApp communication.
            </p>
          </motion.div>

        </div>
      </section>

      {/* Timeline Section (Full Width) */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-16">
        <div className="text-center mb-14">
          <span className="text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">Evolution</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">Our Journey of Continuous Delivery</h2>
        </div>

        <div className="relative border-l border-indigo-500/40 ml-4 sm:ml-32 space-y-10 max-w-4xl mx-auto">
          {timelineMilestones.map((m, idx) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-8 group"
            >
              <div className="absolute -left-3 top-1.5 w-6 h-6 rounded-full bg-slate-900 border-2 border-indigo-500 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
              </div>

              <div className="sm:absolute sm:-left-32 sm:top-1 text-indigo-600 dark:text-indigo-400 font-extrabold text-lg">
                {m.year}
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{m.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Members Section (Full Width) */}
      <section className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-16 border-t border-slate-200 dark:border-slate-800">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">Leadership & Brainpower</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">Meet The Engineering Minds</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            A dynamic collective of full-stack engineers, cloud architects, and product designers based out of Harda (MP).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 group"
            >
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 space-y-2">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
                  {member.name}
                </h4>
                <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  {member.role}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {member.bio}
                </p>

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  {member.socialLinks?.linkedin && (
                    <a
                      href={member.socialLinks.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.socialLinks?.github && (
                    <a
                      href={member.socialLinks.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default About;
