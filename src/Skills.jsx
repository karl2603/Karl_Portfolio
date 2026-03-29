import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: "Frontend Development",
    skills: ["React.js", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
    color: "from-primary/20 to-transparent",
    border: "group-hover:border-primary/50"
  },
  {
    title: "Backend & Systems",
    skills: ["Java", "Python", "C", "MySQL", "Spring Boot"],
    color: "from-accent/20 to-transparent",
    border: "group-hover:border-accent/50"
  },
  {
    title: "Tools & Design",
    skills: ["GitHub", "Figma", "Vite", "Responsive Design"],
    color: "from-cyan/20 to-transparent",
    border: "group-hover:border-cyan/50"
  }
];

const Skills = () => {
  return (
    <section className="py-24 px-6 lg:px-24 bg-background relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-sm font-mono text-cyan tracking-widest uppercase mb-4">03. System Specs</h2>
        <h3 className="text-4xl md:text-5xl font-bold mb-16">Technical Arsenal</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className={`group relative p-8 rounded-2xl border border-surface bg-white/[0.01] backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.03] ${category.border}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10`} />
              
              <h4 className="text-xl font-bold mb-6 text-white">{category.title}</h4>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, i) => (
                  <motion.span 
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 rounded-lg bg-surface text-sm font-medium text-gray-300 border border-white/5 cursor-default hover:text-white hover:border-white/20 transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;