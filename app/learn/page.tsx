"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronRight,
    ChevronDown,
    BookOpen,
    Code,
    Terminal,
    ArrowLeft,
    Loader2,
    Menu,
    X
} from 'lucide-react';
import Header from '../components/Header';
import ContentViewer from '../components/ContentViewer';

// Types matching API response
interface Module {
    id: string;
    title: string;
    content: string;
    chapterId: string;
    code?: string; // Optional legacy or future usage
}

interface Chapter {
    id: string;
    title: string;
    description: string;
    modules: Module[];
}

export default function LearnPage() {
    const [curriculum, setCurriculum] = useState<Chapter[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeChapterIndex, setActiveChapterIndex] = useState(0);
    const [activeModuleIndex, setActiveModuleIndex] = useState(0);
    const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/learn');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setCurriculum(data);
                    if (data.length > 0) {
                        setExpandedChapters([data[0].id]);
                    }
                }
            } catch (error) {
                console.error("Failed to load curriculum", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const activeChapter = curriculum[activeChapterIndex];
    const activeModule = activeChapter?.modules[activeModuleIndex];

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
        setIsMobileMenuOpen(false); // Close mobile menu on selection
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const navigateModule = (direction: 'next' | 'prev') => {
        if (!activeChapter) return;

        if (direction === 'next') {
            if (activeModuleIndex < activeChapter.modules.length - 1) {
                setActiveModuleIndex(activeModuleIndex + 1);
            } else if (activeChapterIndex < curriculum.length - 1) {
                setActiveChapterIndex(activeChapterIndex + 1);
                setActiveModuleIndex(0);
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
                const prevHeaderId = curriculum[prevChapterIndex].id;
                if (!expandedChapters.includes(prevHeaderId)) {
                    setExpandedChapters(prev => [...prev, prevHeaderId]);
                }
            }
        }
    };

    if (loading) {
        return (
            <div className="h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
                <Loader2 className="animate-spin text-cyan-400 w-10 h-10" />
            </div>
        );
    }

    if (!curriculum.length) {
        return (
            <div className="h-screen bg-[#0a0a0a] text-white flex flex-col font-sans overflow-hidden">
                <Header />
                <div className="flex-1 flex items-center justify-center flex-col text-gray-500 gap-4">
                    <BookOpen size={48} className="opacity-20" />
                    <p>No learning content available correctly.</p>
                </div>
            </div>
        );
    }

    if (!activeChapter || !activeModule) {
        return (
            <div className="h-screen bg-[#0a0a0a] text-white flex flex-col font-sans overflow-hidden">
                <Header />
                <div className="flex-1 flex items-center justify-center p-12 text-center text-gray-500">
                    Select a module to begin.
                </div>
            </div>
        )
    }

    return (
        <div className="h-screen bg-[#0a0a0a] text-white flex flex-col font-sans overflow-hidden">
            <Header />

            <div className="flex flex-1 pt-16 h-full overflow-hidden relative">

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div
                        className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}

                {/* Left Sidebar - Table of Contents */}
                <aside className={`
                    fixed inset-y-0 left-0 z-50 w-80 bg-[#0a0a0a] border-r border-white/10 flex flex-col transition-transform duration-300
                    md:static md:translate-x-0 md:z-0
                    ${isMobileMenuOpen ? 'translate-x-0 pt-0' : '-translate-x-full md:translate-x-0'}
                `}>
                    {/* Mobile Close Button */}
                    <div className="md:hidden flex justify-between items-center p-4 border-b border-white/10">
                        <span className="font-bold text-gray-200 uppercase tracking-wider text-sm">Curriculum</span>
                        <button onClick={() => setIsMobileMenuOpen(false)}>
                            <X className="w-6 h-6 text-gray-400" />
                        </button>
                    </div>

                    <div className="p-6 overflow-y-auto flex-1 pb-20 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        <h3 className="hidden md:block font-bold text-gray-400 text-sm tracking-widest uppercase mb-6 pl-2">
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
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <span className={`font-mono text-xs whitespace-nowrap ${isActiveChapter ? 'text-cyan-400' : 'text-gray-500'}`}>
                                                    {chapter.title.substring(0, 3).toUpperCase()}
                                                </span>
                                                <span className="font-bold text-sm truncate">{chapter.title}</span>
                                            </div>
                                            {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" /> : <ChevronRight className="w-4 h-4 text-gray-500 shrink-0" />}
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
                                                                    <div className={`w-1.5 h-1.5 min-w-[6px] rounded-full shrink-0 ${isActive ? "bg-cyan-400" : "bg-gray-600"}`} />
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
                                <span>{Math.round(((activeChapterIndex + 1) / curriculum.length) * ((activeModuleIndex + 1) / activeChapter.modules.length) * 100)}%</span>
                            </div>
                            <div className="w-full h-1 bg-white/10">
                                <div className="h-full bg-cyan-400" style={{ width: `${((activeChapterIndex + 1) / curriculum.length) * 100}%` }} />
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main id="main-content" className="flex-1 md:ml-0 p-6 md:p-12 overflow-y-auto pb-32">
                    <button
                        className="md:hidden flex items-center gap-2 text-cyan-400 font-bold mb-6 bg-cyan-900/10 px-4 py-2 rounded-lg border border-cyan-500/20 w-full"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu className="w-5 h-5" />
                        <span>Course Content</span>
                    </button>

                    <motion.div
                        key={`${activeChapter.id}-${activeModule.id}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-4xl mx-auto"
                    >
                        {/* Breadcrumb */}
                        <div className="flex flex-wrap items-center gap-2 mb-8 text-sm font-mono text-gray-500">
                            <span>{activeChapter.title.toUpperCase()}</span>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-cyan-400 truncate max-w-[200px]">{activeModule.title.toUpperCase()}</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight wrap-break-word">
                            {activeModule.title}
                        </h1>

                        <div className="flex items-center gap-4 mb-10 pb-6 border-b border-white/10">
                            <div className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full">
                                <BookOpen className="w-4 h-4" /> Learning Module
                            </div>
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                            <ContentViewer content={activeModule.content} />
                        </div>

                        {/* Navigation Footer */}
                        <div className="flex flex-col sm:flex-row justify-between mt-20 pt-8 border-t border-white/10 gap-4">
                            <button
                                onClick={() => navigateModule('prev')}
                                disabled={activeChapterIndex === 0 && activeModuleIndex === 0}
                                className="flex items-center gap-3 group disabled:opacity-30 disabled:cursor-not-allowed justify-start"
                            >
                                <div className="w-10 h-10 rounded-full border border-white/10 group-hover:border-white/30 flex items-center justify-center transition-all bg-white/5 shrink-0">
                                    <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-white" />
                                </div>
                                <div className="text-left">
                                    <div className="text-xs text-gray-500 font-mono uppercase">Previous</div>
                                    <div className="text-sm font-bold text-gray-300 group-hover:text-cyan-400 transition-colors">Back</div>
                                </div>
                            </button>

                            <button
                                onClick={() => navigateModule('next')}
                                disabled={activeChapterIndex === curriculum.length - 1 && activeModuleIndex === activeChapter.modules.length - 1}
                                className="flex items-center gap-3 group disabled:opacity-30 disabled:cursor-not-allowed sm:text-right justify-end"
                            >
                                <div className="text-right">
                                    <div className="text-xs text-gray-500 font-mono uppercase">Next Module</div>
                                    <div className="text-sm font-bold text-gray-300 group-hover:text-cyan-400 transition-colors">Continue</div>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transition-transform group-hover:scale-110 group-hover:bg-cyan-400 shrink-0">
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
