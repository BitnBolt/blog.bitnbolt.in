"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import {
    Zap,
    Filter,
    Layers,
    Cpu,
    Search,
    ArrowRight,
    Clock,
    Tag,
    X
} from 'lucide-react';
import Link from 'next/link';



const levels = ["All", "Easy", "Medium", "Hard"];
// Remove static categories

export default function BlogPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [categories, setCategories] = useState<string[]>(["All"]);
    const [loading, setLoading] = useState(true);
    const [activeLevel, setActiveLevel] = useState("All");
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    useEffect(() => {
        // Fetch Categories
        fetch('/api/categories').then(res => res.json()).then(data => {
            if (data.success) {
                setCategories(["All", ...data.data.map((c: any) => c.name)]);
            }
        });

        // Fetch Blogs
        fetch('/api/blogs')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setProjects(data.data.map((blog: any) => ({
                        id: blog._id,
                        title: blog.title,
                        shortDescription: blog.shortDescription,
                        tags: blog.tags || [],
                        level: blog.level,
                        category: blog.category,
                        time: blog.readTime,
                        image: blog.image || "bg-gradient-to-br from-purple-900 to-indigo-900",
                        slug: blog.slug
                    })));
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const filteredProjects = projects.filter(project => {
        const levelMatch = activeLevel === "All" || project.level === activeLevel;
        const categoryMatch = activeCategory === "All" || project.category === activeCategory;
        const searchMatch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
        return levelMatch && categoryMatch && searchMatch;
    });

    return (
        <div className="h-screen bg-[#0a0a0a] text-white flex flex-col font-sans overflow-hidden">
            {/* Shared Header with Search */}
            <Header
                searchComponent={
                    <>
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            className="w-full bg-[#111] border border-white/10 px-10 py-2 text-sm text-white focus:outline-none focus:border-cyan-400 focus:bg-white/5 transition-colors placeholder:text-gray-600"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </>
                }
            />

            <div className="flex flex-1 pt-16 h-full overflow-hidden relative">

                {/* Mobile Filter Overlay */}
                {isMobileFilterOpen && (
                    <div
                        className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm"
                        onClick={() => setIsMobileFilterOpen(false)}
                    />
                )}

                {/* Left Sidebar - Filters */}
                <aside className={`
                    fixed inset-y-0 left-0 z-50 w-64 bg-[#0a0a0a] border-r border-white/10 h-full overflow-hidden flex flex-col shrink-0 transition-transform duration-300
                    md:static md:translate-x-0
                    ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    {/* Mobile Close Button */}
                    <div className="md:hidden flex justify-between items-center p-4 border-b border-white/10">
                        <span className="font-bold text-gray-200 uppercase tracking-wider text-sm">Filters</span>
                        <button onClick={() => setIsMobileFilterOpen(false)}>
                            <X className="w-6 h-6 text-gray-400" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        <div className="mb-8">
                            <h3 className="font-bold text-gray-400 text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
                                <Filter className="w-3 h-3" /> Difficulty Level
                            </h3>
                            <div className="space-y-1">
                                {levels.map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => { setActiveLevel(level); setIsMobileFilterOpen(false); }}
                                        className={`w-full text-left px-3 py-2 text-sm font-mono transition-colors border-l-2 ${activeLevel === level
                                            ? "border-cyan-400 text-cyan-400 bg-cyan-400/5"
                                            : "border-transparent text-gray-500 hover:text-white hover:border-white/20"
                                            }`}
                                    >
                                        {level.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="font-bold text-gray-400 text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
                                <Layers className="w-3 h-3" /> Categories
                            </h3>
                            <div className="space-y-1">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => { setActiveCategory(category); setIsMobileFilterOpen(false); }}
                                        className={`w-full text-left px-3 py-2 text-sm font-mono transition-colors border-l-2 ${activeCategory === category
                                            ? "border-cyan-400 text-cyan-400 bg-cyan-400/5"
                                            : "border-transparent text-gray-500 hover:text-white hover:border-white/20"
                                            }`}
                                    >
                                        {category.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-[#111] border-t border-white/10 shrink-0">
                        <div className="text-xs text-gray-400 mb-2">New to Arduino?</div>
                        <Link href="/learn" className="text-sm font-bold text-cyan-400 hover:underline flex items-center gap-1">
                            Start the Course <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                </aside>

                {/* Main Content Area - Project Grid */}
                <main className="flex-1 md:ml-0 p-6 md:p-12 h-full overflow-y-auto">
                    <div className="mb-8 flex flex-row items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold mb-2">PROJECT LIBRARY</h1>
                            <p className="text-gray-400 text-sm">Explore {filteredProjects.length} projects to build with your kit.</p>
                        </div>

                        {/* Mobile Filter Toggle */}
                        <div className="md:hidden shrink-0">
                            <button
                                className="p-3 bg-white/5 border border-white/10 text-cyan-400 rounded-lg hover:bg-white/10 transition-colors"
                                onClick={() => setIsMobileFilterOpen(true)}
                                aria-label="Open filters"
                            >
                                <Filter className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center h-64 text-cyan-400">Loading Projects...</div>
                    ) : (
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            <AnimatePresence>
                                {filteredProjects.map((project) => (
                                    <Link href={`/blog/${project.id}`} key={project.id}>
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.2 }}
                                            className="group bg-[#0a0a0a] border border-white/10 hover:border-cyan-400/50 transition-all duration-300 flex flex-col h-auto min-h-[320px] relative overflow-hidden cursor-pointer rounded-lg"
                                        >
                                            {/* Image Placeholder */}
                                            <div className={`h-40 w-full ${project.image} relative overflow-hidden bg-cover bg-center shrink-0`}>
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur px-2 py-1 text-xs font-mono border border-white/10 rounded">
                                                    {project.level}
                                                </div>
                                            </div>

                                            <div className="p-6 flex flex-col flex-1 overflow-hidden">
                                                <div className="flex items-center gap-2 text-xs text-cyan-400 mb-2 font-mono uppercase tracking-wider">
                                                    <Tag className="w-3 h-3" /> {project.category}
                                                </div>
                                                <h3 className="text-xl font-bold mb-2 leading-tight group-hover:text-cyan-400 transition-colors line-clamp-2">
                                                    {project.title}
                                                </h3>
                                                <p className="text-sm text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                                                    {project.shortDescription}
                                                </p>

                                                <div className="flex flex-wrap gap-1 mb-4">
                                                    {project.tags.slice(0, 3).map((tag: string) => (
                                                        <span key={tag} className="text-[10px] bg-white/5 px-2 py-1 rounded text-gray-400 font-mono">
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4 text-xs text-gray-500 font-mono">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" /> {project.time}
                                                    </span>
                                                    <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1 text-white">
                                                        VIEW <ArrowRight className="w-3 h-3" />
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </Link>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {!loading && filteredProjects.length === 0 && (
                        <div className="text-center py-20 text-gray-500">
                            <Cpu className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p>No projects found matching your filters.</p>
                            <button
                                onClick={() => { setActiveLevel("All"); setActiveCategory("All"); setSearchQuery("") }}
                                className="text-cyan-400 hover:underline mt-2 text-sm"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
