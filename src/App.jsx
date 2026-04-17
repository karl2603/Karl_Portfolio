import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Mail, ArrowUpRight, ArrowRight, Code2, MonitorPlay, Layers, Cpu, Database, Terminal, Globe, Smartphone, Layout, Check, Sparkles } from 'lucide-react';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import './App.css';

// --- Premium Easing Curves ---
const ease = [0.16, 1, 0.3, 1];
const transition = { duration: 1.2, ease };

// --- Advanced Micro-Interactions ---
const Magnetic = ({ children, strength = 0.15 }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="magnetic-wrapper"
    >
      {children}
    </motion.div>
  );
};

const TextReveal = ({ children, delayOffset = 0 }) => {
  const words = children.split(" ");
  return (
    <span className="text-reveal-container">
      {words.map((word, index) => (
        <span key={index} className="word-mask">
          <motion.span
            variants={{
              hidden: { y: "120%", rotate: 5, opacity: 0 },
              visible: { y: 0, rotate: 0, opacity: 1, transition: { duration: 1.2, ease, delay: delayOffset + index * 0.05 } }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="word-inner"
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
};

// --- Ambient Background ---
const AmbientBackground = () => (
  <div className="ambient-background">
    <div className="noise-overlay"></div>
    <div className="grid-overlay"></div>
    <div className="glow-orb orb-1"></div>
    <div className="glow-orb orb-2"></div>
  </div>
);

// --- Custom Mouse Cursor ---
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState('default');

  useEffect(() => {
    const updateMousePosition = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    
    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.closest('.project-card')) setCursorState('view');
      else if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('.interactive')) setCursorState('hover');
      else setCursorState('default');
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const variants = {
    default: { width: 12, height: 12, x: mousePosition.x - 6, y: mousePosition.y - 6, opacity: 1, backgroundColor: "#E6C998", mixBlendMode: "normal" },
    hover: { width: 60, height: 60, x: mousePosition.x - 30, y: mousePosition.y - 30, opacity: 1, backgroundColor: "transparent", border: "1px solid #E6C998", mixBlendMode: "difference" },
    view: { width: 90, height: 90, x: mousePosition.x - 45, y: mousePosition.y - 45, opacity: 1, backgroundColor: "#E6C998", mixBlendMode: "normal" }
  };

  return (
    <motion.div
      className="custom-cursor"
      variants={variants}
      animate={cursorState}
      transition={{ type: 'spring', stiffness: 400, damping: 28, mass: 0.2 }}
    >
      <AnimatePresence>
        {cursorState === 'view' && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.5 }}
            className="cursor-text"
          >
            VIEW
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Section Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1.2, ease }}
    >
      <Magnetic>
        <div className="nav-logo interactive">
          O.E<span className="accent-text">.</span>
        </div>
      </Magnetic>
      <div className="nav-links">
        {['About', 'Projects', 'Services', 'Pricing'].map((item) => (
          <Magnetic key={item} strength={0.2}>
            <a href={`#${item.toLowerCase()}`} className="nav-link interactive">
              <span className="link-text">{item}</span>
            </a>
          </Magnetic>
        ))}
        <Magnetic strength={0.3}>
          <a href="#contact" className="nav-btn interactive">
            <div className="btn-inner">
              <span>Let's Talk</span>
            </div>
          </a>
        </Magnetic>
      </div>
    </motion.nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 1000], [0, 250]);
  const yImage = useTransform(scrollY, [0, 1000], [0, -150]);

  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <motion.div className="hero-content" style={{ y: yText }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.2 }}
            className="badge interactive"
          >
            <span className="pulse-dot"></span> Available for Freelance
          </motion.div>
          
          <h1 className="hero-title">
            <TextReveal>Digital</TextReveal><br/>
            <span className="accent-text italic-display"><TextReveal delayOffset={0.2}>Excellence.</TextReveal></span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.8 }}
            className="hero-subtitle"
          >
            I am a Software Engineer & Creative Designer specializing in high-end, immersive digital experiences. I don't just write code; I architect award-winning platforms.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 1 }}
            className="hero-cta-group"
          >
            <Magnetic strength={0.2}>
              <a href="#projects" className="btn-primary interactive group">
                <span className="btn-text">Explore Work</span>
                <span className="btn-icon">
                  <ArrowRight size={20} className="arrow-icon" />
                </span>
              </a>
            </Magnetic>
            <div className="hero-metrics">
              <div className="metric">
                <span className="metric-value">15+</span>
                <span className="metric-label">Projects</span>
              </div>
              <div className="metric-divider"></div>
              <div className="metric">
                <span className="metric-value">100%</span>
                <span className="metric-label">Client Success</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-visuals"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease, delay: 0.4 }}
        >
          <div className="hero-image-main interactive">
            <motion.img 
              style={{ y: yImage }}
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
              alt="Creative Workspace" 
            />
            <div className="hero-image-overlay"></div>
          </div>
          <motion.div 
            className="hero-floating-card glass"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles size={20} className="accent-text" />
            <span>Award Winning</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section className="about" id="about">
       <motion.div 
        className="about-wrapper"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={transition}
      >
        <div className="section-label">
          <span className="number">01</span>
          <span className="label-text">THE MINDSET</span>
        </div>
        
        <div className="about-content">
          <h2 className="about-headline">
            Where robust engineering <br />
            meets <span className="accent-text italic-display">cinematic design.</span>
          </h2>
          
          <div className="about-text-grid">
            <p className="about-paragraph">
              As a Computer Science student and independent Creative Developer, I approach the web differently. I view code not just as logic, but as a medium for interactive storytelling and brand elevation.
            </p>
            <p className="about-paragraph">
              My expertise bridges the gap between complex system architecture and award-winning frontend execution. From fluid Framer Motion choreographies to high-performance Next.js architectures, I build products that leave a lasting impression.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const TechStack = () => {
  const stack = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { category: "Motion & 3D", items: ["Framer Motion", "GSAP", "Three.js", "WebGL"] },
    { category: "Backend", items: ["Node.js", "PostgreSQL", "Prisma", "REST APIs"] },
    { category: "Design", items: ["Figma", "UI/UX Architecture", "Wireframing", "Prototyping"] }
  ];

  return (
    <section className="tech-stack" id="tech">
       <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={transition}
      >
        <div className="section-label">
          <span className="number">02</span>
          <span className="label-text">TECH ARSENAL</span>
        </div>
      </motion.div>

      <div className="bento-stack-grid">
        {stack.map((group, index) => (
          <motion.div 
            key={index}
            className="bento-box glass interactive"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...transition, delay: index * 0.1 }}
          >
            <h3 className="bento-category">{group.category}</h3>
            <div className="bento-items">
              {group.items.map((item, i) => (
                <span key={i} className="bento-pill">{item}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div 
      className="project-card interactive"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ ...transition, delay: index * 0.1 }}
    >
      <div className="project-image-container">
        <img src={project.image} alt={project.title} className="project-image" />
        <div className="project-overlay"></div>
      </div>
      
      <div className="project-info">
        <div className="project-meta">
          <span className="project-category">{project.category}</span>
          <span className="project-year">{project.year}</span>
        </div>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        
        <div className="project-footer">
          <div className="project-tech">
            {project.tech.map((t, i) => <span key={i}>{t}</span>)}
          </div>
          <a href={project.link} className="project-link interactive group">
            Explore <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Lumina Creative Studio",
      description: "A visually stunning portfolio designed for an elite creative agency. Features complex scroll-triggered motion, custom cursors, and page transitions.",
      tech: ["Next.js", "Framer Motion", "Tailwind"],
      category: "Freelance Client",
      year: "2024",
      link: "#",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
    },
    {
      title: "Aura FinTech Dashboard",
      description: "High-performance data visualization platform built for crypto traders. Engineered with real-time websocket data and a glassmorphic dark mode UI.",
      tech: ["React", "TypeScript", "Recharts"],
      category: "Freelance Client",
      year: "2023",
      link: "#",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2370&auto=format&fit=crop"
    },
    {
      title: "Nova OS Concept",
      description: "My personal exploration into web-based operating systems. Includes a fully functional window manager, custom context menus, and a virtual file system.",
      tech: ["React", "Zustand", "CSS Modules"],
      category: "Personal Project",
      year: "2024",
      link: "#",
      image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=2574&auto=format&fit=crop"
    }
  ];

  return (
    <section className="projects-section" id="projects">
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={transition}
      >
        <div className="section-label">
          <span className="number">03</span>
          <span className="label-text">SELECTED WORKS</span>
        </div>
      </motion.div>
      <div className="projects-stack">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

const Experience = () => {
  const experiences = [
    { year: "2024 - Present", role: "Creative Developer", company: "Independent", desc: "Partnering with startups and agencies worldwide to engineer visually stunning and highly performant web applications." },
    { year: "2023 - 2024", role: "Frontend Engineering Intern", company: "TechNova Inc.", desc: "Refactored legacy React architectures, improved Core Web Vitals by 35%, and engineered a comprehensive internal design system." },
    { year: "2022 - Present", role: "B.S. Computer Science", company: "University", desc: "Specializing in software architecture, algorithm optimization, and human-computer interaction." }
  ];

  return (
    <section className="experience" id="experience">
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={transition}
      >
        <div className="section-label">
          <span className="number">04</span>
          <span className="label-text">THE JOURNEY</span>
        </div>
      </motion.div>

      <div className="experience-list">
        {experiences.map((exp, index) => (
          <motion.div 
            key={index} 
            className="experience-item interactive group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...transition, delay: index * 0.1 }}
          >
            <div className="exp-year">{exp.year}</div>
            <div className="exp-content">
              <h3 className="exp-role">{exp.role}</h3>
              <h4 className="exp-company accent-text">{exp.company}</h4>
              <p className="exp-desc">{exp.desc}</p>
            </div>
            <div className="exp-icon">
              <ArrowUpRight className="group-hover:rotate-45 transition-transform duration-500" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      num: "01",
      title: "Creative Web Development",
      desc: "Transforming static designs into living, breathing web experiences. Awwwards-tier animations, smooth scrolling, and pixel-perfect implementation."
    },
    {
      num: "02",
      title: "Frontend Architecture",
      desc: "Building highly scalable, maintainable, and performant component systems utilizing React, Next.js, and TypeScript."
    },
    {
      num: "03",
      title: "UI/UX & Motion Design",
      desc: "Ensuring applications look flawless on any device while integrating advanced micro-interactions that elevate the brand."
    }
  ];

  return (
    <section className="services" id="services">
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={transition}
      >
         <div className="section-label">
          <span className="number">05</span>
          <span className="label-text">EXPERTISE</span>
        </div>
      </motion.div>
      
      <div className="services-accordion">
        {services.map((service, index) => (
          <motion.div 
            key={index}
            className="service-row glass interactive"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...transition, delay: index * 0.1 }}
          >
            <div className="service-num accent-text">{service.num}</div>
            <div className="service-content">
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Pricing = () => {
  const tiers = [
    {
      name: "Landing Page",
      price: "$1,500+",
      desc: "Perfect for a premium digital presence and converting visitors.",
      features: ["Custom UI/UX Design", "Responsive Layout", "Basic Motion Design", "SEO Optimization", "1 Week Delivery"],
      highlight: false
    },
    {
      name: "Digital Experience",
      price: "$3,500+",
      desc: "The Awwwards standard. Highly interactive, complex frontend builds.",
      features: ["Advanced Framer Motion", "Custom WebGL / 3D Elements", "CMS Integration", "Premium Page Transitions", "Performance Optimization"],
      highlight: true
    },
    {
      name: "Full Application",
      price: "Custom",
      desc: "End-to-end full-stack development for SaaS or complex dashboards.",
      features: ["Next.js / React Architecture", "Database & Auth Setup", "Complex State Management", "API Integrations", "Scalable System Design"],
      highlight: false
    }
  ];

  return (
    <section className="pricing" id="pricing">
      <motion.div 
        className="section-header center-header"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={transition}
      >
        <div className="section-label mx-auto">
          <span className="number">06</span>
          <span className="label-text">INVESTMENT</span>
        </div>
        <h2 className="pricing-headline">Transparent, Premium Pricing.</h2>
      </motion.div>

      <div className="pricing-grid">
        {tiers.map((tier, index) => (
          <motion.div 
            key={index}
            className={`pricing-card interactive ${tier.highlight ? 'highlight-card' : 'glass'}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...transition, delay: index * 0.15 }}
          >
            {tier.highlight && <div className="popular-badge">Most Popular</div>}
            <div className="pricing-header">
              <h3 className="tier-name">{tier.name}</h3>
              <div className="tier-price accent-text">{tier.price}</div>
              <p className="tier-desc">{tier.desc}</p>
            </div>
            <div className="pricing-features">
              {tier.features.map((feat, i) => (
                <div key={i} className="feature-item">
                  <Check size={18} className="accent-text" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
            <Magnetic strength={0.2}>
              <a href="#contact" className={`pricing-btn interactive ${tier.highlight ? 'btn-primary' : 'btn-outline'}`}>
                Start Project
              </a>
            </Magnetic>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <motion.div 
        className="contact-wrapper glass"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
      >
        <div className="contact-text">
          <h2 className="contact-title">
            Let's build a <br/>
            <span className="accent-text italic-display">masterpiece.</span>
          </h2>
          <p className="contact-desc">
            Currently accepting freelance projects, internships, and creative collaborations. Let's discuss your vision.
          </p>
          <div className="contact-links mt-8">
            <Magnetic strength={0.2}>
               <a href="mailto:hello@example.com" className="email-link interactive">
                  hello@example.com
               </a>
            </Magnetic>
          </div>
        </div>
        
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-row">
            <div className="input-group">
              <input type="text" id="name" required className="interactive" placeholder=" " />
              <label htmlFor="name">Name</label>
              <div className="input-line"></div>
            </div>
            <div className="input-group">
              <input type="email" id="email" required className="interactive" placeholder=" " />
              <label htmlFor="email">Email</label>
              <div className="input-line"></div>
            </div>
          </div>
          <div className="input-group">
            <textarea id="message" required rows="1" className="interactive" placeholder=" "></textarea>
            <label htmlFor="message">Project Details</label>
            <div className="input-line"></div>
          </div>
          <div className="submit-btn-wrapper">
             <Magnetic strength={0.2}>
               <button type="submit" className="btn-primary submit-btn interactive group">
                  <span className="btn-text">Send Inquiry</span>
                  <ArrowRight size={20} className="arrow-icon" />
               </button>
             </Magnetic>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo interactive">O.E<span className="accent-text">.</span></div>
        <div className="social-links">
          <Magnetic strength={0.2}><a href="#" className="interactive"><FiGithub size={24} /></a></Magnetic>
          <Magnetic strength={0.2}><a href="#" className="interactive"><FiLinkedin size={24} /></a></Magnetic>
          <Magnetic strength={0.2}><a href="#" className="interactive"><FiTwitter size={24} /></a></Magnetic>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Architected with React & Framer Motion.</p>
        <p>Premium Digital Craftsmanship.</p>
      </div>
    </footer>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="app-container">
      <AmbientBackground />
      <CustomCursor />
      <motion.div className="progress-bar" style={{ scaleX }} />
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Experience />
        <Services />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}