import { motion } from 'framer-motion';
import { Database, Server, Layout, ExternalLink, Code } from 'lucide-react';

const FeaturedProject = () => {
  return (
    <section className="py-32 px-6 lg:px-24 bg-background relative z-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-sm font-mono text-accent tracking-widest uppercase mb-4">01. Case Study</h2>
        <h3 className="text-4xl md:text-5xl font-bold mb-16">NammaCommute AI</h3>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Project Details */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              An AI-powered urban mobility web application designed to optimize transit routes and improve daily commuting in Chennai. Built to handle real-time data processing and deliver a seamless user interface.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <Layout className="text-primary mt-1" size={24} />
                <div>
                  <h4 className="font-semibold text-white">Frontend Architecture</h4>
                  <p className="text-sm text-gray-500">React.js & Tailwind CSS delivering a responsive, mobile-first interface.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Server className="text-accent mt-1" size={24} />
                <div>
                  <h4 className="font-semibold text-white">Backend Logic</h4>
                  <p className="text-sm text-gray-500">Java Spring Boot handling complex route calculations and REST APIs.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Database className="text-cyan mt-1" size={24} />
                <div>
                  <h4 className="font-semibold text-white">Database Design</h4>
                  <p className="text-sm text-gray-500">MySQL schema optimized for high-read transit data operations.</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a href="#" className="flex items-center gap-2 text-sm font-mono text-primary hover:text-white transition-colors">
                <ExternalLink size={16} /> Live Demo
              </a>
              <a href="#" className="flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-white transition-colors">
                <Code size={16} /> View Source
              </a>
            </div>
          </div>

          {/* Visual Showcase (Glassmorphic Mockup) */}
          <div className="lg:col-span-7 relative group perspective-1000">
            <motion.div 
              whileHover={{ rotateY: -5, rotateX: 5 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative rounded-2xl border border-surface bg-white/5 backdrop-blur-xl overflow-hidden shadow-2xl"
            >
              {/* Mockup Header */}
              <div className="h-10 border-b border-surface bg-black/40 flex items-center px-4 gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
                <div className="ml-4 text-xs font-mono text-gray-500">app.nammacommute.ai</div>
              </div>
              {/* Image Placeholder */}
              <div className="aspect-video bg-[#111] flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 opacity-50 mix-blend-overlay"></div>
                 <span className="text-gray-600 font-mono">[Interactive Transit Map Interface]</span>
              </div>
            </motion.div>
            
            {/* Ambient Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent opacity-20 blur-3xl -z-10 group-hover:opacity-40 transition-opacity duration-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProject;