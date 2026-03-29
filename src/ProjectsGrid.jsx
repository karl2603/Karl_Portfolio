import { motion } from 'framer-motion';
import { ExternalLink, Code, ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: "RailBites",
    description: "A comprehensive train food ordering system designed to deliver meals directly to passenger seats seamlessly.",
    tech: ["React", "Java", "MySQL"],
    type: "Full Stack",
  },
  {
    title: "Code On JVM Chennai",
    description: "Official community website for the Java tech community in Chennai. First-place winner in the website challenge.",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    type: "Frontend / UI",
  },
  {
    title: "Resume Analyzer",
    description: "A machine learning-powered application that analyzes resumes to provide ATS scoring and structural feedback.",
    tech: ["Python", "React", "ML Models"],
    type: "AI / ML",
  },
  {
    title: "MindCare Therapy",
    description: "A professional, accessible web platform built for a therapy company focused on user experience and booking flows.",
    tech: ["HTML", "CSS", "JavaScript", "Figma"],
    type: "Freelance Client",
  }
];

const ProjectsGrid = () => {
  return (
    <section className="py-24 px-6 lg:px-24 bg-[#050505] relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="text-sm font-mono text-primary tracking-widest uppercase mb-4">02. The Archive</h2>
            <h3 className="text-4xl md:text-5xl font-bold">More Projects</h3>
          </div>
          <button className="hidden md:flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            View full GitHub <ArrowUpRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              className="group relative p-8 rounded-2xl border border-surface bg-white/[0.02] hover:bg-white/[0.04] transition-colors overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex justify-between items-start mb-6">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-surface text-gray-300">
                  {project.type}
                </span>
                <div className="flex gap-3 text-gray-400">
                  <a href="#" className="hover:text-white transition-colors"><Code size={20} /></a>
                  <a href="#" className="hover:text-primary transition-colors"><ExternalLink size={20} /></a>
                </div>
              </div>

              <h4 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h4>
              <p className="text-gray-400 mb-8 leading-relaxed line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-3 mt-auto">
                {project.tech.map((tech, i) => (
                  <span key={i} className="text-sm font-mono text-gray-500 group-hover:text-gray-300 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;