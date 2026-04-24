import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Download, Check, Menu, X } from 'lucide-react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { FaJava, FaInstagram, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { 
  SiC, SiPython, SiJavascript, SiReact, 
  SiReactrouter, SiRedux, SiTailwindcss, SiSpringboot, 
  SiMysql, SiNpm, SiGit, SiGithub, SiNotion, SiVercel, 
  SiNetlify, SiRender 
} from 'react-icons/si';
import './App.css';

const ease = [0.16, 1, 0.3, 1];
const transition = { duration: 1.2, ease };

const Magnetic = ({ children, strength = 0.15 }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isTouchDevice = typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches;

  if (isTouchDevice) {
    return <div className="magnetic-wrapper">{children}</div>;
  }

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
              hidden: { y: "100%", rotate: 2, opacity: 0 },
              visible: { y: 0, rotate: 0, opacity: 1, transition: { duration: 1.2, ease, delay: delayOffset + index * 0.04 } }
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

const AmbientBackground = () => (
  <div className="ambient-background">
    <div className="noise-overlay"></div>
    <div className="glow-orb orb-1"></div>
    <div className="glow-orb orb-2"></div>
  </div>
);

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState('default');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return; 
    }

    const updateMousePosition = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    
    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.closest('.hero-image-main')) setCursorState('default');
      else if (target.closest('.project-card')) setCursorState('view');
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

  if (isTouchDevice) return null;

  const variants = {
    default: { width: 16, height: 16, x: mousePosition.x - 8, y: mousePosition.y - 8, opacity: 1, backgroundColor: "#fff" },
    hover: { width: 64, height: 64, x: mousePosition.x - 32, y: mousePosition.y - 32, opacity: 1, backgroundColor: "#fff", scale: 1.2 },
    view: { width: 80, height: 80, x: mousePosition.x - 40, y: mousePosition.y - 40, opacity: 1, backgroundColor: "#fff" },
    hidden: { opacity: 0, width: 0, height: 0 }
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

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navItems = ['About', 'Projects', 'Services', 'Pricing', 'Skills'];

  return (
    <>
      <motion.nav 
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.2, ease }}
      >
        <Magnetic>
          <div className="nav-logo interactive">Karl</div>
        </Magnetic>
        <div className="nav-links desktop-nav">
          {navItems.map((item) => (
            <Magnetic key={item} strength={0.3}>
              <a href={`#${item.toLowerCase()}`} className="nav-link interactive">
                {item}
              </a>
            </Magnetic>
          ))}
          <Magnetic strength={0.8}>
            <a href="https://forms.gle/hDzDzdS4Ty5shrM37" className="nav-btn interactive">
              <div className="btn-inner">Start Project</div>
            </a>
          </Magnetic>
        </div>
        <button 
          className="mobile-menu-btn interactive"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            <div className="mobile-menu-bg-text">KARL</div>
            <div className="mobile-menu-content">
              {navItems.map((item, i) => (
                <div key={item} className="mobile-nav-link-wrapper">
                  <motion.a
                    href={`#${item.toLowerCase()}`}
                    className="mobile-nav-link interactive"
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ opacity: 0, y: 40, rotate: 2 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ duration: 0.8, ease, delay: 0.1 + i * 0.1 }}
                  >
                    {item}
                  </motion.a>
                </div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.1 + navItems.length * 0.1 }}
                className="mobile-btn-wrapper"
              >
                <a
                  href="#contact"
                  className="btn-primary interactive"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="btn-text">Start Project</span>
                </a>
              </motion.div>
            </div>
            <div className="mobile-menu-footer">
              <motion.div 
                className="social-links"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <a href="https://github.com/karl2603" className="interactive"><FiGithub size={24} /></a>
                <a href="https://www.linkedin.com/in/karlarvindraj/" className="interactive"><FiLinkedin size={24} /></a>
                <a href="https://www.instagram.com/_._karl_._/" className="interactive"><FaInstagram size={24} /></a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 1000], [0, 200]);
  const yImage = useTransform(scrollY, [0, 1000], [0, -100]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <motion.div className="hero-content" style={{ y: isMobile ? 0 : yText }}>
          
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
            I design and build Software Applications that don’t break, from high performance React frontends to scalable Java backends.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.4 }}
            className="hero-cta-group"
          >
            <Magnetic strength={0.4}>
              <a href="#work" className="btn-primary interactive group">
                <span className="btn-text">View Projects</span>
                <span className="btn-icon">
                  <ArrowRight size={18} className="arrow-icon" color="#000" />
                </span>
              </a>
            </Magnetic>
            <Magnetic strength={0.4}>
              <a href="/KarlResume.pdf" download="KarlResume.pdf" className="btn-outline interactive group">
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
          <div className="hero-image-main">
            <motion.img 
              style={{ y: isMobile ? 0 : yImage }}
              src="./profile.jpg" 
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
          <span className="label-text">About</span>
        </div>
        
        <div className="about-grid">
          <h2 className="about-headline">
            Turning complex ideas into <span className="italic-display text-muted">production grade systems.</span>
          </h2>
          
          <div className="about-content-right">
            <p className="about-paragraph">
              I focus on building real world software that is reliable, scalable, and maintainable. I approach development as system design, not just coding, combining strong fundamentals with modern full-stack tools to create applications that perform consistently and handle real usage.
            </p>
            <p className="about-paragraph">
              From designing scalable <span className="about-highlight">Spring Boot services</span> to building responsive <span className="about-highlight">React interfaces</span>, I focus on clean architecture and predictable performance. Every system I build is structured to be efficient, maintainable, and capable of handling growth without compromising stability.
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
      title: "Novaport AI Agent",
      type: "Personal Project",
      description: "An AI-powered assistant designed to streamline workflows and automate repetitive tasks. Built with a focus on real-time interaction, clean UI, and seamless integration with modern APIs to deliver a practical and responsive user experience.",
      tech: ["React", "Tailwind CSS", "Python", "Gemini AI"],
      category: "AI-Full Stack",
      year: "2026",
      link: "https://novaport-ai.vercel.app/",
      image: "./Novaport.png"
    },
    {
      title: "Crust & Crunch",
      type: "Freelance Project",
      description: "A modern, high-conversion website built for a cafe brand, focusing on visual appeal and user engagement. Designed and developed to enhance brand identity while ensuring smooth navigation and strong performance across devices.",
      tech: ["React", "Tailwind CSS", "3D Animated", "React Forms", "Vercel"],
      category: "Frontend",
      year: "2026",
      link: "https://crust-and-crunch.vercel.app/",
      image: "./CrustCrunch.png"
    },
    {
      title: "MindCare Clinic",
      type: "Freelance Project",
      description: "A professional website developed for a therapy clinic, focusing on trust, accessibility, and user comfort. Designed to present services clearly while maintaining a calm and structured user experience.",
      tech: ["React", "React Forms", "Netlify"],
      category: "Frontend",
      year: "2026",
      link: "https://happymindcare.in/",
      image: "./Mindcare.png"
    },
    {
      title: "Task Flow",
      type: "Personal Project",
      description: "A productivity-focused task management application built to organize workflows efficiently. Features a clean interface, intuitive interactions, and structured state management to ensure reliability and ease of use.",
      tech: ["React", "React Router", "CSS"],
      category: "Frontend",
      year: "2025",
      link: "https://task-flow-phi-eight.vercel.app/",
      image: "./Taskflow.png"
    },
    {
      title: "GitHub Explorer",
      type: "Personal Project",
      description: "A dynamic web application that fetches and visualizes GitHub user data using external APIs. Built with Axios for efficient data handling and designed to provide quick insights into repositories and activity.",
      tech: ["React", "Axios", "GitHub API"],
      category: "Frontend",
      year: "2025",
      link: "https://git-hub-explorer-psi.vercel.app/",
      image: "./GithubExpo.png"
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
          <span className="label-text">Projects</span>
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
                <img src={project.image} alt={project.title} className="project-image" loading="lazy" />
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
                    View  <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
      desc: "Designing scalable, maintainable, and highly performant interfaces using React, Redux, and modern styling systems to deliver responsive, consistent, and production-ready user experiences."
    },
    {
      num: "02",
      title: "Backend Engineering",
      desc: "Building secure and scalable REST APIs and backend services using Spring Boot and Java, ensuring clean architecture, reliable data handling, and efficient database interactions."
    },
    {
      num: "03",
      title: "Systems Optimization",
      desc: "Improving existing systems by refactoring codebases, optimizing rendering performance, tuning database queries, and streamlining deployment workflows for faster and more efficient applications."
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
      name: "Frontend Build",
      price: "₹6,000+",
      desc: "Clean, responsive frontend development focused on performance, usability, and accurate implementation of design.",
      features: ["React Development", "Responsive Design", "Multi Page", "Basic SEO Setup", "Contact Forms Integration", "Basic Maintenance"
      ],
      highlight: false
    },
    {
      name: "Full-Stack Application",
      price: "₹15,000+",
      desc: "Complete web application development including frontend, backend, and database integration for real-world use.",
      features: ["React Frontend", "Spring Boot Backend", "MySQL Database", "REST API Integration", "Deployment Setup", "Maintenance Support", "Domain Purchase"
      ],
      highlight: true
    },
    {
      name: "Custom Work",
      price: "Custom",
      desc: "Flexible development for unique requirements, feature additions, or improvements to existing applications.",
      features: ["Feature Development", "Bug Fixes", "Performance Improvements", "UI Enhancements", "API Integration", "Database Management", "Ongoing Support"
      ],
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
          <span className="label-text">Services & Pricing</span>
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
            <Magnetic strength={0.4}>
              <a href="https://forms.gle/hDzDzdS4Ty5shrM37" target="_blank" rel="noopener noreferrer" className={`pricing-btn interactive ${tier.highlight ? 'btn-primary' : 'btn-outline'}`}>
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
        { name: "JDBC", icon: <FaJava className="opacity-60" /> }, 
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
    if (window.innerWidth <= 768) return; 

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
          <span className="label-text">Tech Stack</span>
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
    { year: "Feb 2026 - Present", role: "Web Developer", company: "Freelance", desc: "Working with clients to design and build responsive, high-performance websites and web applications. Focused on clean UI, reliable backend integration, and delivering production-ready solutions tailored to real business needs." },
    { year: "Dec 2024 - Jan 2025", role: "Frontend Developer Intern", company: "CodeBind Technologies", desc: "Contributed to frontend development using React, improving UI consistency and performance. Worked with reusable components, handled state management, and collaborated on building responsive and maintainable interfaces." },
    { year: "Aug 2023 - Present", role: "Computer Science Student", company: "SRM University", desc: "Pursuing a degree in Computer Science with a focus on core programming, data structures, and system design. Building practical projects to apply concepts in real-world scenarios and strengthen problem-solving skills." }
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
          <span className="label-text">Experience</span>
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
  const [status, setStatus] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.target;
    const data = new FormData(form);
    try {
      const response = await fetch('https://formspree.io/f/xpqkrwqr', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus(''), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus(''), 3000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus(''), 3000);
    }
  };

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
            Let’s build something <br />
            <span className="italic-display text-muted">that actually works.</span>
          </h2>
          <p className="contact-desc">
            I’m currently open to freelance projects and collaboration opportunities. If you have something in mind, Better Call Karl!
          </p>
          <div className="contact-links mt-12 flex flex-col gap-6">
            <Magnetic strength={0.4}>
              <a href="mailto:arvindrajkarl@gmail.com" className="email-link interactive">
                arvindrajkarl@gmail.com
              </a>
            </Magnetic>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleFormSubmit}>
          <div className="input-row">
            <div className="input-group">
              <input type="text" id="name" name="name" required className="interactive" placeholder=" " />
              <label htmlFor="name">Name</label>
              <div className="input-line"></div>
            </div>
            <div className="input-group">
              <input type="email" id="email" name="email" required className="interactive" placeholder=" " />
              <label htmlFor="email">Email</label>
              <div className="input-line"></div>
            </div>
          </div>
          <div className="input-group">
            <textarea id="message" name="message" required rows="1" className="interactive" placeholder=" "></textarea>
            <label htmlFor="message">Project Details</label>
            <div className="input-line"></div>
          </div>
          <div className="submit-btn-wrapper">
            <Magnetic strength={0.8}>
              <button type="submit" className="btn-primary interactive group" disabled={status === 'sending'}>
                <span className="btn-text">
                  {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                </span>
                {status !== 'success' && <ArrowRight size={18} className="arrow-icon" color="#000" />}
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
          <Magnetic strength={0.6}><a href="https://github.com/karl2603" className="footer-social-btn interactive"><FiGithub size={20} /></a></Magnetic>
          <Magnetic strength={0.6}><a href="https://www.linkedin.com/in/karlarvindraj/" className="footer-social-btn interactive"><FiLinkedin size={20} /></a></Magnetic>
          <Magnetic strength={0.6}><a href="https://www.instagram.com/_._karl_._/" className="footer-social-btn interactive"><FaInstagram size={20} /></a></Magnetic>
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