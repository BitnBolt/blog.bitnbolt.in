"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap,
    ChevronRight,
    ChevronDown,
    BookOpen,
    Code,
    Terminal,
    Cpu,
    ArrowLeft,
    CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import Header from '../components/Header';

// Data Structure
const curriculum = [
    {
        id: "00",
        title: "Architecture (IoT)",
        desc: "Understanding the foundational architecture of Internet of Things systems.",
        modules: [
            {
                id: "m1",
                title: "Introduction to IoT Architecture",
                content: `The Internet of Things (IoT) is a system of interrelated computing devices, mechanical and digital machines, provided with unique identifiers (UIDs) and the ability to transfer data over a network without requiring human-to-human or human-to-computer interaction. We will explore the 4-stage architecture: Sensors coverage, Data Acquisition Systems, Edge Analytics, and Cloud Analytics.`,
                code: null
            },
            {
                id: "m2",
                title: "Microcontrollers vs Microprocessors",
                content: `What drives the brain of your device? We compare Microcontrollers (MCU) like the ESP32/Arduino used in embedded systems versus Microprocessors (MPU) like the Raspberry Pi used for heavier computing tasks.`,
                code: null
            },
            {
                id: "m3",
                title: "Sensors & Actuators Ecosystem",
                content: `Deep dive into the perception layer. How sensors (Input) capture real-world data like temperature, motion, and light, and how actuators (Output) perform actions like spinning motors or sounding alarms.`,
                code: null
            }
        ]
    },
    {
        id: "01",
        title: "Basic Electronics (BE)",
        desc: "The physics and components that power hardware projects.",
        modules: [
            {
                id: "m1",
                title: "Voltage, Current, and Resistance",
                content: `The holy trinity of electronics. specific focus on Ohm's Law (V=IR) and how it governs every circuit you will ever build. Visualization of water flow analogy.`,
                code: null
            },
            {
                id: "m2",
                title: "Active vs Passive Components",
                content: `Distinguishing between components that require external power to operate (Transistors, ICs) and those that don't (Resistors, Capacitors, Inductors). Practical identification on your PCB.`,
                code: null
            },
            {
                id: "m3",
                title: "Circuit Logic & Schematics",
                content: `Learning to read circuit diagrams. Understanding Series vs Parallel connections and how they affect voltage and current distribution in your project.`,
                code: null
            }
        ]
    },
    {
        id: "02",
        title: "Programming (C++ / Python)",
        desc: "Coding the logic for embedded systems and data processing.",
        modules: [
            {
                id: "m1",
                title: "C++ for Embedded Systems",
                content: `Why C++? It's close to the hardware. We cover memory management, pointers, and the specific flavor of C++ used in the Arduino ecosystem.`,
                code: `// C++ Pointer Example
int val = 10;
int *ptr = &val;

void setup() {
  Serial.begin(9600);
  Serial.print("Address: ");
  Serial.println((int)ptr);
}`
            },
            {
                id: "m2",
                title: "Python for Data Scripting",
                content: `Python is the language of data. We'll look at how to use Python scripts to read serial data from your board and process it on your computer.`,
                code: `import serial
import time

ser = serial.Serial('COM3', 9600)
while True:
    data = ser.readline()
    print(data.decode('utf-8'))`
            },
            {
                id: "m3",
                title: "Object Oriented Programming",
                content: `Structuring your code with Classes and Objects to create reusable libraries for your custom sensors and modules.`,
                code: null
            }
        ]
    },
    {
        id: "03",
        title: "25 Essentials Projects",
        desc: "Core curriculum projects for the 3rd Semester standard.",
        modules: [
            {
                id: "m1",
                title: "Project 1-5: The Basics",
                content: "1. Blinking LED\n2. Traffic Light System\n3. Button Control\n4. Potentiometer Dimmer\n5. RGB Color Mixing.",
                code: null
            },
            {
                id: "m2",
                title: "Project 6-15: Sensors & Display",
                content: "Integrating Ultrasonic sensors, OLED displays, DHT11 Temp/Humidity readings, and Light Dependent Resistors.",
                code: null
            },
            {
                id: "m3",
                title: "Project 16-25: Automation",
                content: "Relay control for AC appliances, Servo Motor logic gates, IR Remote control, and automatic plant watering systems.",
                code: null
            }
        ]
    },
    {
        id: "04",
        title: "Web Development",
        desc: "Building dashboards to control and monitor hardware.",
        modules: [
            {
                id: "m1",
                title: "HTML/CSS for Dashboards",
                content: "Designing a responsive control panel interface. Using Flexbox and Grid to layout your sensor data cards.",
                code: null
            },
            {
                id: "m2",
                title: "JavaScript Fetch API",
                content: "How to make asynchronous HTTP requests from your web page to your hardware (ESP32 Web Server) to toggle pins without reloading the page.",
                code: `fetch('http://192.168.1.100/toggle')
  .then(response => response.json())
  .then(data => console.log(data));`
            },
            {
                id: "m3",
                title: "Real-time Data with WebSockets",
                content: "Upgrading from HTTP polling to full-duplex communication using WebSockets for instant sensor feedback.",
                code: null
            }
        ]
    },
    {
        id: "05",
        title: "App Development",
        desc: "Mobile control via WiFi and Bluetooth.",
        modules: [
            {
                id: "m1",
                title: "Bluetooth Classic vs BLE",
                content: "Understanding the difference between standard Serial Bluetooth (HC-05) and Bluetooth Low Energy (BLE) for modern apps.",
                code: null
            },
            {
                id: "m2",
                title: "MIT App Inventor Basics",
                content: "Rapid prototyping of Android apps. Drag-and-drop interface to create a custom controller for your robot car.",
                code: null
            },
            {
                id: "m3",
                title: "Building a Native Control App",
                content: "Using frameworks like Flutter or React Native to build a cross-platform professional app to communicate with your IoT device.",
                code: null
            }
        ]
    },
    {
        id: "06",
        title: "TinyML",
        desc: "Machine Learning on the Edge.",
        modules: [
            {
                id: "m1",
                title: "What is Edge AI?",
                content: "Running inference directly on the microcontroller without sending data to the cloud. Benefits: Latency, Privacy, and Power.",
                code: null
            },
            {
                id: "m2",
                title: "Gesture Recognition",
                content: "Training a TensorFlow Lite model to recognize accelerometer patterns (Magic Wand) and deploying it to the board.",
                code: null
            },
            {
                id: "m3",
                title: "Voice Keyword Spotting",
                content: "Training a model to recognize simple voice commands like 'ON' and 'OFF' using the built-in microphone.",
                code: null
            }
        ]
    },
    {
        id: "07",
        title: "Real Time Projects",
        desc: "Industrial and Commercial grade application blogs.",
        modules: [
            {
                id: "m1",
                title: "Smart Agriculture System",
                content: "Soil moisture monitoring, automated irrigation based on weather forecasts, and NPK sensor integration.",
                code: null
            },
            {
                id: "m2",
                title: "Home Energy Monitor",
                content: "Non-invasive current sensing (CT Sensors) to track power usage and calculate monthly electricity bills in real-time.",
                code: null
            }
        ]
    }
];

export default function LearnPage() {
    const [activeChapterIndex, setActiveChapterIndex] = useState(0);
    const [activeModuleIndex, setActiveModuleIndex] = useState(0);
    const [expandedChapters, setExpandedChapters] = useState<string[]>([curriculum[0].id]);

    const activeChapter = curriculum[activeChapterIndex];
    const activeModule = activeChapter.modules[activeModuleIndex];

    const handleChapterClick = (index: number) => {
        const chapterId = curriculum[index].id;
        setExpandedChapters(prev =>
            prev.includes(chapterId)
                ? prev.filter(id => id !== chapterId)
                : [...prev, chapterId]
        );
    };

    const handleModuleClick = (cIndex: number, mIndex: number) => {
        setActiveChapterIndex(cIndex);
        setActiveModuleIndex(mIndex);

        // Auto-scroll to top of content
        const mainContent = document.getElementById('main-content');
        if (mainContent) mainContent.scrollTop = 0;
    };

    const navigateModule = (direction: 'next' | 'prev') => {
        if (direction === 'next') {
            if (activeModuleIndex < activeChapter.modules.length - 1) {
                setActiveModuleIndex(activeModuleIndex + 1);
            } else if (activeChapterIndex < curriculum.length - 1) {
                setActiveChapterIndex(activeChapterIndex + 1);
                setActiveModuleIndex(0);
                // Auto expand next chapter
                const nextHeaderId = curriculum[activeChapterIndex + 1].id;
                if (!expandedChapters.includes(nextHeaderId)) {
                    setExpandedChapters(prev => [...prev, nextHeaderId]);
                }
            }
        } else {
            if (activeModuleIndex > 0) {
                setActiveModuleIndex(activeModuleIndex - 1);
            } else if (activeChapterIndex > 0) {
                const prevChapterIndex = activeChapterIndex - 1;
                setActiveChapterIndex(prevChapterIndex);
                setActiveModuleIndex(curriculum[prevChapterIndex].modules.length - 1);
                // Auto expand prev chapter
                const prevHeaderId = curriculum[prevChapterIndex].id;
                if (!expandedChapters.includes(prevHeaderId)) {
                    setExpandedChapters(prev => [...prev, prevHeaderId]);
                }
            }
        }
    };

    return (
        <div className="h-screen bg-[#0a0a0a] text-white flex flex-col font-sans overflow-hidden">
            <Header />

            <div className="flex flex-1 pt-16 h-full overflow-hidden">
                {/* Left Sidebar - Table of Contents */}
                <aside className="w-80 border-r border-white/10 bg-[#0a0a0a] flex flex-col hidden md:flex h-full shrink-0">
                    <div className="p-6 overflow-y-auto flex-1 pb-20 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        <h3 className="font-bold text-gray-400 text-sm tracking-widest uppercase mb-6 pl-2">
                            Course Content
                        </h3>

                        <div className="space-y-4">
                            {curriculum.map((chapter, cIndex) => {
                                const isExpanded = expandedChapters.includes(chapter.id);
                                const isActiveChapter = activeChapterIndex === cIndex;

                                return (
                                    <div key={chapter.id} className="select-none">
                                        <button
                                            onClick={() => handleChapterClick(cIndex)}
                                            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors text-left ${isActiveChapter ? "bg-white/5 text-white" : "text-gray-400 hover:text-white"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className={`font-mono text-xs ${isActiveChapter ? 'text-cyan-400' : 'text-gray-500'}`}>
                                                    {chapter.id}
                                                </span>
                                                <span className="font-bold text-sm truncate w-40">{chapter.title}</span>
                                            </div>
                                            {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
                                        </button>

                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="pl-4 pr-2 py-2 space-y-1">
                                                        {chapter.modules.map((module, mIndex) => {
                                                            const isActive = isActiveChapter && activeModuleIndex === mIndex;
                                                            return (
                                                                <button
                                                                    key={module.id}
                                                                    onClick={() => handleModuleClick(cIndex, mIndex)}
                                                                    className={`w-full text-left py-2 px-3 text-sm rounded transition-all flex items-center gap-3 ${isActive
                                                                        ? "text-cyan-400 bg-cyan-400/10 border-l-2 border-cyan-400"
                                                                        : "text-gray-500 hover:text-gray-300 border-l-2 border-transparent"
                                                                        }`}
                                                                >
                                                                    <div className={`w-1.5 h-1.5 min-w-[6px] rounded-full ${isActive ? "bg-cyan-400" : "bg-gray-600"}`} />
                                                                    <span className="truncate">{module.title}</span>
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="p-6 border-t border-white/10 bg-[#0a0a0a]">
                        <div className="bg-[#111] p-4 border border-white/10">
                            <div className="text-xs text-gray-500 mb-2 uppercase tracking-widest flex justify-between">
                                <span>Progress</span>
                                <span>15%</span>
                            </div>
                            <div className="w-full h-1 bg-white/10">
                                <div className="w-[15%] h-full bg-cyan-400" />
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main id="main-content" className="flex-1 md:ml-0 p-6 md:p-12 overflow-y-auto pb-32">
                    <motion.div
                        key={`${activeChapter.id}-${activeModule.id}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-4xl mx-auto"
                    >
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 mb-8 text-sm font-mono text-gray-500">
                            <span>CHAPTER {activeChapter.id}</span>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-cyan-400">{activeModule.title.toUpperCase()}</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                            {activeModule.title}
                        </h1>

                        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/10">
                            <div className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full">
                                <BookOpen className="w-4 h-4" /> Learning Module
                            </div>
                            {activeModule.code && (
                                <div className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full">
                                    <Code className="w-4 h-4" /> Code Included
                                </div>
                            )}
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                            <p className="whitespace-pre-line leading-loose">{activeModule.content}</p>

                            {activeModule.code && (
                                <div className="bg-[#111] border border-white/10 rounded-lg overflow-hidden my-8 not-prose">
                                    <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                                        <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
                                            <Terminal className="w-3 h-3" /> main.cpp
                                        </div>
                                    </div>
                                    <pre className="p-4 font-mono text-sm text-gray-300 overflow-x-auto bg-black/50">
                                        {activeModule.code}
                                    </pre>
                                </div>
                            )}
                        </div>

                        {/* Navigation Footer */}
                        <div className="flex justify-between mt-20 pt-8 border-t border-white/10">
                            <button
                                onClick={() => navigateModule('prev')}
                                disabled={activeChapterIndex === 0 && activeModuleIndex === 0}
                                className="flex items-center gap-3 group disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <div className="w-10 h-10 rounded-full border border-white/10 group-hover:border-white/30 flex items-center justify-center transition-all bg-white/5">
                                    <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-white" />
                                </div>
                                <div className="text-left hidden sm:block">
                                    <div className="text-xs text-gray-500 font-mono uppercase">Previous</div>
                                    <div className="text-sm font-bold text-gray-300 group-hover:text-cyan-400 transition-colors">Back</div>
                                </div>
                            </button>

                            <button
                                onClick={() => navigateModule('next')}
                                disabled={activeChapterIndex === curriculum.length - 1 && activeModuleIndex === activeChapter.modules.length - 1}
                                className="flex items-center gap-3 group disabled:opacity-30 disabled:cursor-not-allowed text-right"
                            >
                                <div className="text-right hidden sm:block">
                                    <div className="text-xs text-gray-500 font-mono uppercase">Next Module</div>
                                    <div className="text-sm font-bold text-gray-300 group-hover:text-cyan-400 transition-colors">Continue</div>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transition-transform group-hover:scale-110 group-hover:bg-cyan-400">
                                    <ChevronRight className="w-4 h-4" />
                                </div>
                            </button>
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
