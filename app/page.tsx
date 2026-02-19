"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Cpu,
  Layers,
  Terminal,
  Zap,
  BookOpen,
  Code,
  Settings,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div className="bg-[#0a0a0a] text-white selection:bg-cyan-500 selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter hover:opacity-80 transition-opacity">
            <Zap className="h-6 w-6 text-cyan-400" />
            <span>BITNBOLT<span className="text-cyan-400">.</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="/learn" className="hover:text-cyan-400 transition-colors">Learn</Link>
            <Link href="/blog" className="hover:text-cyan-400 transition-colors">Blog</Link>
            <a href="#levels" className="hover:text-cyan-400 transition-colors">Levels</a>
            <a href="#kit" className="hover:text-cyan-400 transition-colors">The Kit</a>
          </div>
          <Link href="#kit" className="bg-white text-black px-4 py-2 text-sm font-bold hover:bg-cyan-400 transition-colors">
            Get The Kit
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={targetRef} className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-cyan-900/20 via-[#0a0a0a] to-[#0a0a0a]" />

        {/* Abstract Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <motion.div
          style={{ opacity, scale }}
          className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-block mb-4 px-3 py-1 bg-white/5 border border-white/10 text-cyan-400 text-xs font-mono uppercase tracking-widest"
          >
            v2.0 Now Available
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50"
          >
            MASTER THE <br />
            <span className="text-cyan-400">HARDWARE.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            From simple circuits to complex IoT systems. Learn to build with the BitnBolt Arduino Kit—your gateway to understanding the physical world through code.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/learn" className="group relative px-8 py-4 bg-white text-black font-bold text-lg overflow-hidden transition-all hover:bg-cyan-400">
              <span className="relative z-10 flex items-center gap-2">
                Start Learning <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link href="/blog" className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold text-lg hover:bg-white/5 transition-colors">
              Explore Projects
            </Link>
          </motion.div>
        </motion.div>

        {/* Tech decorative elements */}
        <div className="absolute bottom-10 left-10 hidden md:block opacity-30 font-mono text-xs">
          <div>SYS_STATUS: ONLINE</div>
          <div>CORE_TEMP: 42°C</div>
        </div>
        <div className="absolute bottom-10 right-10 hidden md:block opacity-30 font-mono text-xs text-right">
          <div>MODULES_ACTIVE: 12</div>
          <div>SENSOR_DATA: STREAMING</div>
        </div>
      </section>

      {/* Levels Section */}
      <section id="levels" className="py-32 relative bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">PROGRESSIVE MASTERY</h2>
            <div className="h-1 w-20 bg-cyan-400 mb-6" />
            <p className="text-xl text-gray-400 max-w-2xl">
              Our curriculum is designed to take you from absolute beginner to hardware expert through three distinct levels of complexity.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                level: "LEVEL 01",
                title: "Fundamentals",
                desc: "Understand current, voltage, and basic components. Build your first blinking LED and sensor circuits.",
                icon: <Zap className="w-8 h-8 text-green-400" />,
                color: "group-hover:border-green-400",
                bg: "group-hover:bg-green-400/5",
                text: "text-green-400"
              },
              {
                level: "LEVEL 02",
                title: "Integration",
                desc: "Combine multiple sensors and logic. Create smart home prototypes and data logging systems.",
                icon: <Layers className="w-8 h-8 text-yellow-400" />,
                color: "group-hover:border-yellow-400",
                bg: "group-hover:bg-yellow-400/5",
                text: "text-yellow-400"
              },
              {
                level: "LEVEL 03",
                title: "Advanced Systems",
                desc: "Master communication protocols (I2C, SPI), wireless control, and complex algorithm implementation.",
                icon: <Cpu className="w-8 h-8 text-cyan-400" />,
                color: "group-hover:border-cyan-400",
                bg: "group-hover:bg-cyan-400/5",
                text: "text-cyan-400"
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className={`group border border-white/10 bg-[#111] p-8 transition-all duration-300 ${item.color} ${item.bg}`}
              >
                <div className="mb-6 flex justify-between items-start">
                  <span className={`font-mono text-sm tracking-widest ${item.text}`}>{item.level}</span>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  {item.desc}
                </p>
                <Link href="/blog" className="inline-flex items-center text-sm font-bold hover:gap-2 transition-all">
                  VIEW PROJECTS <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* The Product/Board Section */}
      <section id="kit" className="py-32 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-3 py-1 mb-6 bg-cyan-900/20 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase">
              Hardware
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">
              THE BITNBOLT <br /><span className="text-cyan-400">DEV BOARD</span>
            </h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Designed specifically for education. No more messy breadboards or confusing wiring.
              Our all-in-one development board integrates all essential sensors and modules directly onto the PCB,
              allowing you to focus on the code and logic.
            </p>

            <ul className="space-y-4 mb-10">
              {['Integrated OLED Display', 'Wifi & Bluetooth Module', 'Precision 6-Axis Gyro', 'Environmental Sensors'].map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-cyan-400" />
                  {feat}
                </li>
              ))}
            </ul>

            <button className="px-8 py-4 bg-white text-black font-bold hover:bg-cyan-400 transition-colors">
              Get The Board
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square bg-gradient-to-br from-[#1a1a1a] to-black border border-white/10 flex items-center justify-center group overflow-hidden"
          >
            {/* Abstract visual for the board - replace with actual image later */}
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[shimmer_3s_infinite]" />
            <div className="relative w-3/4 h-3/4 border border-cyan-500/20 bg-[#0a0a0a] flex items-center justify-center">
              <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-1 p-2 opacity-20">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div key={i} className="bg-cyan-500/50 rounded-none w-1 h-1" />
                ))}
              </div>
              <Cpu className="w-32 h-32 text-cyan-500/50" />
              <div className="absolute bottom-4 right-4 font-mono text-xs text-cyan-500">
                MODEL: BNB-V2
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Curriculum Preview Section */}
      <section id="curriculum" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">STRUCTURED LEARNING</h2>
              <div className="h-1 w-20 bg-cyan-400" />
            </div>
            <p className="text-gray-400 max-w-md text-right md:text-left">
              Follow our meticulously crafted chapters to master every aspect of the BitnBolt ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { num: "01", title: "Getting Started", topics: "Setup, IDE Configuration, First Upload" },
              { num: "02", title: "Digital I/O", topics: "Variables, Loops, Button Inputs, LED Control" },
              { num: "03", title: "Analog World", topics: "Potentiometers, PWM, Light Sensors" },
              { num: "04", title: "Communication", topics: "Serial Monitor, UART, Debugging" },
              { num: "05", title: "Display Tech", topics: "OLED Libraries, Graphics, Text Rendering" },
              { num: "06", title: "Motors & Motion", topics: "Servo Control, DC Motors, H-Bridges" },
            ].map((chapter, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="block"
              >
                <Link href="/learn" className="group flex gap-6 p-6 border border-white/5 hover:border-cyan-500/50 hover:bg-[#111] transition-all cursor-pointer">
                  <span className="text-4xl font-bold text-white/10 group-hover:text-cyan-500/20 font-mono transition-colors">
                    {chapter.num}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{chapter.title}</h3>
                    <p className="text-sm text-gray-500 font-mono">{chapter.topics}</p>
                  </div>
                  <div className="ml-auto flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-5 h-5 text-cyan-400" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/10 bg-black text-sm text-gray-400">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 font-bold text-xl text-white mb-6">
              <Zap className="h-6 w-6 text-cyan-400" />
              <span>BITNBOLT<span className="text-cyan-400">.</span></span>
            </div>
            <p className="max-w-sm mb-8">
              Empowering the next generation of hardware engineers through accessible tools and comprehensive education.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'GitHub', 'Discord'].map((social) => (
                <a key={social} href="#" className="hover:text-white transition-colors">{social}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Platform</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Tutorials</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Store</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Resources</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Hardware Specs</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Downloads</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Support</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2024 BitnBolt Inc. All rights reserved.</p>
          <p className="font-mono text-xs">DESIGNED FOR BUILDERS</p>
        </div>
      </footer>
    </div>
  );
}
