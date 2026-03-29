import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Sparkles, Environment } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Code2, Cpu } from 'lucide-react';
import { ReactLenis } from 'lenis/react';

// --- 1. The 3D Glass Object ---
const GlassTorus = () => {
  const mesh = useRef();
  
  useFrame((state, delta) => {
    mesh.current.rotation.x += delta * 0.2;
    mesh.current.rotation.y += delta * 0.15;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={mesh} scale={1.5}>
        <torusKnotGeometry args={[1, 0.3, 256, 32]} />
        <MeshTransmissionMaterial 
          backside
          backsideThickness={5}
          thickness={2}
          roughness={0}
          transmission={1}
          ior={1.5}
          chromaticAberration={1}
          anisotropy={1}
          color="#ffffff"
        />
      </mesh>
    </Float>
  );
};

// --- 2. Main Application ---
export default function App() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <main className="relative min-h-[250vh] bg-[#050505]">
        
        {/* --- FIXED 3D CANVAS BACKGROUND --- */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={2} />
            <Environment preset="city" />
            <GlassTorus />
            <Sparkles count={300} scale={12} size={2} speed={0.4} opacity={0.4} color="#ffffff" />
          </Canvas>
        </div>

        {/* --- SCROLLING HTML OVERLAY --- */}
        <div className="relative z-10 w-full">
          
          {/* HERO SECTION */}
          <section className="h-screen w-full flex flex-col items-center justify-center pointer-events-none">
            <motion.div style={{ y: y1, opacity }} className="text-center mix-blend-difference">
              <h1 className="font-anton text-[12vw] leading-none tracking-wider text-white uppercase ml-4">
                KARL ARVINDRAJ
              </h1>
              <div className="flex items-center justify-center gap-6 mt-6">
                <div className="h-[1px] w-16 bg-white" />
                <p className="font-manrope text-xl tracking-[0.3em] uppercase text-white font-light">
                  Java Full Stack Architect
                </p>
                <div className="h-[1px] w-16 bg-white" />
              </div>
            </motion.div>
          </section>

          {/* BRUTALIST PROJECT SHOWCASE */}
          <section className="min-h-screen w-full px-6 md:px-24 py-32 pointer-events-auto">
            <motion.div style={{ y: y2 }} className="max-w-7xl mx-auto flex flex-col gap-32">
              
              {/* Project 1: NammaCommute AI */}
              <div className="group relative flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/20 pb-12 hover:border-white transition-colors duration-500 cursor-pointer">
                <div className="max-w-2xl">
                  <div className="flex gap-4 mb-6">
                    <span className="px-4 py-1 rounded-full border border-white/30 text-xs tracking-widest uppercase backdrop-blur-md">React.js</span>
                    <span className="px-4 py-1 rounded-full border border-white/30 text-xs tracking-widest uppercase backdrop-blur-md">Spring Boot</span>
                  </div>
                  <h2 className="font-anton text-6xl md:text-8xl tracking-wide uppercase group-hover:pl-8 transition-all duration-500 ease-out">
                    NammaCommute AI
                  </h2>
                </div>
                <div className="flex flex-col items-end text-right mt-8 md:mt-0">
                  <p className="max-w-xs text-gray-400 font-light mb-6">Urban mobility engine utilizing real-time data processing for transit route optimization.</p>
                  <div className="p-4 rounded-full bg-white text-black group-hover:scale-110 transition-transform duration-300">
                    <ArrowUpRight size={32} strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              {/* Project 2: RailBites */}
              <div className="group relative flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/20 pb-12 hover:border-white transition-colors duration-500 cursor-pointer">
                <div className="max-w-2xl">
                  <div className="flex gap-4 mb-6">
                    <span className="px-4 py-1 rounded-full border border-white/30 text-xs tracking-widest uppercase backdrop-blur-md">Java</span>
                    <span className="px-4 py-1 rounded-full border border-white/30 text-xs tracking-widest uppercase backdrop-blur-md">MySQL</span>
                  </div>
                  <h2 className="font-anton text-6xl md:text-8xl tracking-wide uppercase group-hover:pl-8 transition-all duration-500 ease-out">
                    RailBites
                  </h2>
                </div>
                <div className="flex flex-col items-end text-right mt-8 md:mt-0">
                  <p className="max-w-xs text-gray-400 font-light mb-6">Comprehensive food ordering infrastructure designed specifically for transit ecosystems.</p>
                  <div className="p-4 rounded-full bg-white text-black group-hover:scale-110 transition-transform duration-300">
                    <ArrowUpRight size={32} strokeWidth={1.5} />
                  </div>
                </div>
              </div>

            </motion.div>
          </section>

          {/* FOOTER */}
          <section className="h-[50vh] w-full flex items-center justify-center bg-white text-black pointer-events-auto">
            <div className="text-center">
              <h2 className="font-anton text-[8vw] leading-none tracking-wider uppercase">
                INITIATE PROTOCOL
              </h2>
              <p className="mt-4 font-manrope font-semibold tracking-widest uppercase">
                Currently based in Chennai • Available for architecture & engineering
              </p>
            </div>
          </section>

        </div>
      </main>
    </ReactLenis>
  );
}