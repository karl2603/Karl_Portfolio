/* App.jsx */
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Download, Check } from 'lucide-react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { FaJava, FaInstagram, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { 
  SiC, SiPython, SiJavascript, SiReact, 
  SiReactrouter, SiRedux, SiTailwindcss, SiSpringboot, 
  SiMysql, SiNpm, SiGit, SiGithub, SiNotion, SiVercel, 
  SiNetlify, SiRender 
} from 'react-icons/si';
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

// --- Ambient Background ---
const AmbientBackground = () => (
  <div className="ambient-background">
    <div className="noise-overlay"></div>
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
    default: { width: 16, height: 16, x: mousePosition.x - 8, y: mousePosition.y - 8, opacity: 1, backgroundColor: "#fff" },
    hover: { width: 64, height: 64, x: mousePosition.x - 32, y: mousePosition.y - 32, opacity: 1, backgroundColor: "#fff", scale: 1.2 },
    view: { width: 80, height: 80, x: mousePosition.x - 40, y: mousePosition.y - 40, opacity: 1, backgroundColor: "#fff" }
  };

  return (
    <motion.div
      className="custom-cursor"
      variants={variants}
      animate={cursorState}
      transition={{ type: 'spring', stiffness: 300, damping: 25, mass: 0.1 }}
    >
      <AnimatePresence>
        {cursorState === 'view' && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.5 }}
            className="cursor-text"
          >
            Explore
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
        <div className="nav-logo interactive">Karl</div>
      </Magnetic>
      <div className="nav-links">
        {['About', 'Work', 'Services', 'Pricing', 'Stack'].map((item) => (
          <Magnetic key={item} strength={0.2}>
            <a href={`#${item.toLowerCase()}`} className="nav-link interactive">
              {item}
            </a>
          </Magnetic>
        ))}
        <Magnetic strength={0.3}>
          <a href="#contact" className="nav-btn interactive">
            <div className="btn-inner">Start Project</div>
          </a>
        </Magnetic>
      </div>
    </motion.nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 1000], [0, 200]);
  const yImage = useTransform(scrollY, [0, 1000], [0, -100]);

  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <motion.div className="hero-content" style={{ y: yText }}>
          
          <h1 className="hero-title">
            <motion.span 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1, ease }}
              style={{ display: 'inline-block' }}
            >
              Karl
            </motion.span>
            <br/>
            <motion.span 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1, ease, delay: 0.1 }} 
              className="italic-display text-muted"
              style={{ display: 'inline-block' }}
            >
              Full Stack Developer.
            </motion.span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.3 }}
            className="hero-subtitle"
          >
            I'm a 3rd-year Computer Science student and full-stack developer based in Chennai. I build robust Java backend architectures and pair them with pixel-perfect, highly interactive React frontends.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.4 }}
            className="hero-cta-group"
          >
            <Magnetic strength={0.2}>
              <a href="#work" className="btn-primary interactive group">
                <span className="btn-text">View Work</span>
                <span className="btn-icon">
                  <ArrowRight size={18} className="arrow-icon" color="#000" />
                </span>
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a href="/resume.pdf" download="Resume.pdf" className="btn-outline interactive group">
                <span className="btn-text">Download Resume</span>
                <Download size={18} className="group-hover:translate-y-1 transition-transform" />
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-visuals"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease, delay: 0.2 }}
        >
          <div className="hero-image-main interactive">
            <motion.img 
              style={{ y: yImage }}
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
              alt="Karl - Full Stack Developer" 
            />
            <div className="hero-image-overlay"></div>
          </div>
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
          <span className="label-text">The Philosophy</span>
        </div>
        
        <div className="about-grid">
          <h2 className="about-headline">
            Bridging academic rigor with <span className="italic-display text-muted">production-grade engineering.</span>
          </h2>
          
          <div className="about-content-right">
            <p className="about-paragraph">
              Currently navigating my 3rd year of Computer Science, I view engineering not merely as writing scripts, but as crafting resilient systems. My methodology fuses low-level computational logic with bleeding-edge full-stack technologies to deliver products that dominate their category. 
            </p>
            <p className="about-paragraph">
              Whether architecting a distributed <span className="about-highlight">Spring Boot microservice</span>, designing relational database schemas, or choreographing a fluid <span className="about-highlight">React frontend</span>, my goal remains identical: absolute precision. Code that looks exceptional on the surface and performs flawlessly under intense operational pressure.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "FinTech Enterprise Dashboard",
      type: "Freelance",
      description: "A highly secure, performant financial platform visualizing real-time data. Engineered with an immutable state management system and seamless API integration to ensure zero downtime and accurate financial reporting.",
      tech: ["React", "Redux", "Spring Boot", "MySQL"],
      category: "Full Stack",
      year: "2024",
      link: "#",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2370&auto=format&fit=crop"
    },
    {
      title: "Aura Digital Experience",
      type: "Personal Project",
      description: "An Awwwards-caliber marketing site demonstrating complex DOM manipulation, Framer Motion animations, and scroll-triggered storytelling. Designed to push the boundaries of frontend performance and visual aesthetics.",
      tech: ["JavaScript", "Tailwind CSS", "Vercel"],
      category: "Frontend",
      year: "2023",
      link: "#",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
    },
    {
      title: "Distributed Commerce API",
      type: "Freelance",
      description: "A robust backend microservice architecture handling authentication, inventory management, and ledger processing. Optimized for high concurrency, relational data integrity, and rapid scaling under heavy loads.",
      tech: ["Java", "Spring Boot", "JDBC", "Render"],
      category: "Backend Architecture",
      year: "2023",
      link: "#",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2668&auto=format&fit=crop"
    }
  ];

  return (
    <section className="projects-section" id="work">
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={transition}
      >
        <div className="section-label">
          <span className="number">02</span>
          <span className="label-text">Selected Work</span>
        </div>
      </motion.div>
      <div className="projects-stack">
        {projects.map((project, index) => (
          <motion.div 
            key={index}
            className="project-card interactive"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...transition, delay: index * 0.1 }}
          >
            <div className="project-image-container">
              <div className="project-image-wrapper">
                <img src={project.image} alt={project.title} className="project-image" />
              </div>
            </div>
            
            <div className="project-info">
              <div className="project-meta">
                <span className="project-category">{project.category}</span>
                <span className="project-year">{project.year}</span>
              </div>
              <div className="project-title-wrapper">
                <h3 className="project-title">{project.title}</h3>
                <span className="project-type-indicator">[{project.type}]</span>
              </div>
              <p className="project-desc">{project.description}</p>
              
              <div className="project-footer">
                <div className="project-tech">
                  {project.tech.map((t, i) => <span key={i}>{t}</span>)}
                </div>
                <Magnetic strength={0.1}>
                  <a href={project.link} className="project-link interactive group">
                    View Case Study <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </Magnetic>
              </div>
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
      title: "Frontend Architecture",
      desc: "Building scalable, maintainable, and highly performant component systems utilizing React, Redux, and modern CSS frameworks to deliver pixel-perfect user interfaces."
    },
    {
      num: "02",
      title: "Backend Engineering",
      desc: "Designing and implementing robust REST APIs and microservices utilizing Spring Boot and Java, focusing on security, scalability, and optimal database interactions."
    },
    {
      num: "03",
      title: "Systems Optimization",
      desc: "Refactoring legacy infrastructure, improving rendering cycles, optimizing SQL queries, and deploying via robust CI/CD pipelines for maximum application efficiency."
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
          <span className="number">03</span>
          <span className="label-text">Core Expertise</span>
        </div>
      </motion.div>
      
      <div className="services-list">
        {services.map((service, index) => (
          <motion.div 
            key={index}
            className="service-row interactive group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...transition, delay: index * 0.1 }}
          >
            <div className="service-num">{service.num}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-desc">{service.desc}</p>
            <div className="service-icon">
              <ArrowUpRight size={24} />
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
      name: "Frontend Foundation",
      price: "$2,000+",
      desc: "High-performance React implementation with strict adherence to design specifications and smooth animations.",
      features: ["Component Architecture", "State Management (Redux)", "Responsive Layout", "Performance Audit"],
      highlight: false
    },
    {
      name: "Full-Stack System",
      price: "$5,000+",
      desc: "End-to-end architecture bridging secure backend services with premium, interactive frontends.",
      features: ["Spring Boot Backend", "MySQL Database Design", "React/Redux Frontend", "REST API Development", "Deployment Pipeline"],
      highlight: true
    },
    {
      name: "Enterprise Retainer",
      price: "Custom",
      desc: "Ongoing technical partnership for scaling systems, adding features, and refactoring legacy codebases.",
      features: ["Architecture Consulting", "Codebase Refactoring", "Scalability Planning", "Security Hardening"],
      highlight: false
    }
  ];

  return (
    <section className="pricing" id="pricing">
      <motion.div 
        className="section-header center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={transition}
      >
        <div className="section-label mx-auto">
          <span className="number">04</span>
          <span className="label-text">Investment</span>
        </div>
      </motion.div>

      <div className="pricing-grid">
        {tiers.map((tier, index) => (
          <motion.div 
            key={index}
            className={`pricing-card interactive ${tier.highlight ? 'highlight' : ''}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...transition, delay: index * 0.15 }}
          >
            {tier.highlight && <div className="popular-badge">Most Popular</div>}
            <div className="pricing-header">
              <h3 className="tier-name">{tier.name}</h3>
              <div className="tier-price">{tier.price}</div>
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
              <a href="https://forms.gle/YOUR_GOOGLE_FORM_LINK" target="_blank" rel="noopener noreferrer" className={`pricing-btn interactive ${tier.highlight ? 'btn-primary' : 'btn-outline'}`}>
                <span className="btn-text">Get Started</span>
              </a>
            </Magnetic>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const TechStack = () => {
  const stack = [
    { 
      category: "Programming Languages", 
      items: [
        { name: "C", icon: <SiC color="#A8B9CC" /> }, 
        { name: "Python", icon: <SiPython color="#3776AB" /> }, 
        { name: "Java", icon: <FaJava color="#007396" /> }
      ] 
    },
    { 
      category: "Backend & Database", 
      items: [
        { name: "Java", icon: <FaJava color="#007396" /> }, 
        { name: "MySQL", icon: <SiMysql color="#4479A1" /> },
        { name: "JDBC", icon: <FaJava color="#007396" /> }, 
        { name: "Spring Boot", icon: <SiSpringboot color="#6DB33F" /> }
      ] 
    },
    { 
      category: "Frontend Ecosystem", 
      items: [
        { name: "HTML5", icon: <FaHtml5 color="#E34F26" /> }, 
        { name: "CSS3", icon: <FaCss3Alt color="#1572B6" /> }, 
        { name: "JavaScript", icon: <SiJavascript color="#F7DF1E" /> }, 
        { name: "React", icon: <SiReact color="#61DAFB" className="spin-icon" /> }, 
        { name: "React Router", icon: <SiReactrouter color="#CA4245" /> }, 
        { name: "Redux", icon: <SiRedux color="#764ABC" /> }, 
        { name: "Tailwind CSS", icon: <SiTailwindcss color="#06B6D4" /> }
      ] 
    },
    { 
      category: "Tools & Deployment", 
      items: [
        { name: "NPM", icon: <SiNpm color="#CB3837" /> }, 
        { name: "Git", icon: <SiGit color="#F05032" /> }, 
        { name: "GitHub", icon: <SiGithub color="#FFFFFF" /> }, 
        { name: "Notion", icon: <SiNotion color="#FFFFFF" /> }, 
        { name: "Vercel", icon: <SiVercel color="#FFFFFF" /> }, 
        { name: "Netlify", icon: <SiNetlify color="#00C7B7" /> }, 
        { name: "Render", icon: <SiRender color="#46E3B7" /> }
      ] 
    }
  ];

  const handleMouseMove = (e) => {
    const cards = document.querySelectorAll('.bento-box');
    for(const card of cards) {
      const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  return (
    <section className="tech-stack" id="stack" onMouseMove={handleMouseMove}>
       <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={transition}
      >
        <div className="section-label">
          <span className="number">05</span>
          <span className="label-text">Technical Arsenal</span>
        </div>
      </motion.div>

      <div className="bento-stack-grid">
        {stack.map((group, index) => (
          <motion.div 
            key={index}
            className="bento-box interactive"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...transition, delay: index * 0.1 }}
          >
            <h3 className="bento-category">{group.category}</h3>
            <div className="bento-items">
              {group.items.map((item, i) => (
                <div key={i} className="skill-card">
                  <div className="skill-icon">{item.icon}</div>
                  <span className="skill-name">{item.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Experience = () => {
  const experiences = [
    { year: "2023 - Present", role: "Software Engineer", company: "Independent", desc: "Architecting end-to-end full-stack applications. Bridging sophisticated Java/Spring Boot backends with highly interactive, visually striking React frontends for various global clients, ensuring high performance and scalability." },
    { year: "2022 - 2023", role: "Frontend Architect", company: "TechNova Inc.", desc: "Led a massive refactor of legacy infrastructure. Integrated Redux for deterministic state management, heavily optimized React rendering cycles to improve load times by 40%, and deployed via robust CI/CD pipelines." },
    { year: "2021 - Present", role: "Computer Science Undergrad", company: "University", desc: "Currently a 3rd-year student concentrating on core algorithms, distributed systems, and advanced software design. Actively honing a rigorous, mathematical approach to solving complex engineering challenges." }
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
          <span className="number">06</span>
          <span className="label-text">The Journey</span>
        </div>
      </motion.div>

      <div className="experience-list">
        {experiences.map((exp, index) => (
          <motion.div 
            key={index} 
            className="experience-item interactive group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...transition, delay: index * 0.1 }}
          >
            <div className="exp-year">{exp.year}</div>
            <div className="exp-content">
              <h3 className="exp-role">{exp.role}</h3>
              <h4 className="exp-company">{exp.company}</h4>
              <p className="exp-desc">{exp.desc}</p>
            </div>
            <div className="exp-icon">
              <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
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
        className="contact-wrapper interactive"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
      >
        <div className="contact-text">
          <h2 className="contact-title">
            Let's construct <br/>
            <span className="italic-display text-muted">excellence.</span>
          </h2>
          <p className="contact-desc">
            Currently available for engineering roles and high-end technical partnerships. Connect with me to discuss architectural requirements or potential collaborations.
          </p>
          <div className="contact-links mt-12 flex flex-col gap-6">
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
            <label htmlFor="message">Project Scope</label>
            <div className="input-line"></div>
          </div>
          <div className="submit-btn-wrapper">
             <Magnetic strength={0.2}>
               <button type="submit" className="btn-primary interactive group">
                  <span className="btn-text">Initialize</span>
                  <ArrowRight size={18} className="arrow-icon" color="#000" />
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
        <div className="footer-logo interactive">Karl.</div>
        <div className="footer-socials">
          <Magnetic strength={0.2}><a href="#" className="footer-social-btn interactive"><FiGithub size={20} /></a></Magnetic>
          <Magnetic strength={0.2}><a href="#" className="footer-social-btn interactive"><FiLinkedin size={20} /></a></Magnetic>
          <Magnetic strength={0.2}><a href="#" className="footer-social-btn interactive"><FaInstagram size={20} /></a></Magnetic>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Karl. All rights reserved.</p>
        <p>Chennai, India</p>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="app-container">
      <AmbientBackground />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Services />
        <Pricing />
        <TechStack />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}