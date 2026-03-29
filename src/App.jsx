import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import { ReactLenis } from 'lenis/react';
import { ArrowUpRight, Code2, Terminal, Database } from 'lucide-react';

// --- 1. Custom Magnetic Cursor ---
const Cursor = () => {
  const cursorRef = useRef(null);
  useEffect(() => {
    const moveCursor = (e) => {
      // Smoothly follow mouse
      cursorRef.current.animate({
        left: `${e.clientX}px`,
        top: `${e.clientY}px`
      }, { duration: 500, fill: 'forwards' });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-8 h-8 border border-[#E2FF31] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-transform duration-100 ease-out"
    />
  );
};

// --- 2. 3D Interactive Hero Object ---
const LiquidCore = () => {
  const meshRef = useRef();
  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });

  return (
    <Sphere ref={meshRef} args={[1.5, 64, 64]} scale={1.8}>
      <MeshDistortMaterial 
        color="#E2FF31" 
        attach="material" 
        distort={0.4} 
        speed={2} 
        roughness={0.2} 
        metalness={0.8}
        wireframe={true}
      />
    </Sphere>
  );
};

// --- 3. Main Application ---
export default function App() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <ReactLenis root options={{ lerp: 0.05 }}>
      <Cursor />
      <main className="min-h-screen bg-[#030303] selection:bg-[#E2FF31] selection:text-black">
        
        {/* --- HERO SECTION --- */}
        <section className="relative h-screen w-full flex items-center justify-between px-8 md:px-24 overflow-hidden">
          {/* Background Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E2FF31] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

          {/* Left: Heavy Typography */}
          <motion.div 
            style={{ y, opacity }}
            className="relative z-10 flex flex-col items-start w-full md:w-1/2"
          >
            <motion.div 
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="px-4 py-2 border border-white/10 rounded-full text-xs font-mono uppercase tracking-widest mb-8 bg-white/5 backdrop-blur-md"
            >
              System Active • Chennai, IN
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-syne text-[5rem] md:text-[8rem] font-bold leading-[0.9] tracking-tighter text-white uppercase"
            >
              Karl <br/>
              <span className="text-transparent border-text" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}>Arvindraj</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
              className="mt-8 text-xl text-gray-400 font-light max-w-md font-space"
            >
              Java Full Stack Architect. Bridging the gap between brutalist frontend aesthetics and highly scalable backend infrastructure.
            </motion.p>
          </motion.div>

          {/* Right: 3D Canvas */}
          <div className="absolute right-0 top-0 h-full w-full md:w-1/2 z-0 opacity-60 md:opacity-100">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <LiquidCore />
            </Canvas>
          </div>
        </section>

        {/* --- BENTO BOX PROJECTS SECTION --- */}
        <section className="py-32 px-8 md:px-24 relative z-10 bg-[#030303]">
          <h2 className="font-syne text-5xl md:text-7xl font-bold uppercase mb-16 tracking-tighter">
            Selected <span className="text-[#E2FF31]">Works</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Project 1: NammaCommute (Spans 2 columns) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="md:col-span-2 relative group rounded-[2rem] bg-[#0A0A0A] border border-white/5 p-8 overflow-hidden hover:border-[#E2FF31]/30 transition-colors duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#E2FF31]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start">
                  <div className="p-4 bg-black/50 rounded-full border border-white/10 backdrop-blur-md">
                    <Terminal size={24} className="text-[#E2FF31]" />
                  </div>
                  <ArrowUpRight size={32} className="text-gray-600 group-hover:text-white transition-colors group-hover:rotate-45 duration-300" />
                </div>
                <div>
                  <h3 className="font-syne text-4xl font-bold mb-2">NammaCommute AI</h3>
                  <p className="text-gray-400 font-space text-lg">AI-powered urban mobility & transit optimization app.</p>
                  <div className="flex gap-2 mt-4 font-mono text-xs uppercase text-gray-500">
                    <span>React</span> • <span>Spring Boot</span> • <span>MySQL</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Project 2: Code On JVM */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="relative group rounded-[2rem] bg-[#0A0A0A] border border-white/5 p-8 overflow-hidden hover:border-[#E2FF31]/30 transition-colors duration-500"
            >
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="p-4 bg-black/50 rounded-full border border-white/10 w-fit backdrop-blur-md">
                  <Code2 size={24} className="text-[#E2FF31]" />
                </div>
                <div>
                  <h3 className="font-syne text-2xl font-bold mb-2">Code On JVM</h3>
                  <p className="text-gray-400 font-space text-sm">Award-winning Java tech community platform.</p>
                </div>
              </div>
            </motion.div>

            {/* Project 3: RailBites */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="relative group rounded-[2rem] bg-[#0A0A0A] border border-white/5 p-8 overflow-hidden hover:border-[#E2FF31]/30 transition-colors duration-500"
            >
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="p-4 bg-black/50 rounded-full border border-white/10 w-fit backdrop-blur-md">
                  <Database size={24} className="text-[#E2FF31]" />
                </div>
                <div>
                  <h3 className="font-syne text-2xl font-bold mb-2">RailBites</h3>
                  <p className="text-gray-400 font-space text-sm">Full-stack train food delivery infrastructure.</p>
                </div>
              </div>
            </motion.div>

             {/* Project 4: MindCare (Spans 2 columns) */}
             <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="md:col-span-2 relative group rounded-[2rem] bg-[#0A0A0A] border border-white/5 p-8 overflow-hidden hover:border-[#E2FF31]/30 transition-colors duration-500"
            >
              <div className="relative z-10 flex flex-col h-full justify-between">
                <ArrowUpRight size={32} className="absolute top-8 right-8 text-gray-600 group-hover:text-white transition-colors group-hover:rotate-45 duration-300" />
                <div className="mt-auto">
                  <h3 className="font-syne text-4xl font-bold mb-2">MindCare Therapy</h3>
                  <p className="text-gray-400 font-space text-lg">Freelance client platform prioritizing accessible UX and seamless booking flows.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- FOOTER / CONTACT --- */}
        <section className="py-32 px-8 md:px-24 border-t border-white/5 flex flex-col items-center justify-center text-center">
          <motion.h2 
            whileHover={{ scale: 1.05 }}
            className="font-syne text-6xl md:text-9xl font-black uppercase tracking-tighter text-transparent border-text cursor-pointer hover:text-[#E2FF31] transition-colors duration-300"
            style={{ WebkitTextStroke: '2px rgba(255,255,255,0.2)' }}
          >
            Initiate Contact
          </motion.h2>
          <p className="mt-8 font-mono text-gray-500 uppercase tracking-widest text-sm">
            Available for Internships & Freelance Architecture
          </p>
        </section>

      </main>
    </ReactLenis>
  );
}