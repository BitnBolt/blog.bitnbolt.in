"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronRight,
    ChevronDown,
    Plus,
    Trash2,
    Save,
    FileText,
    FolderPlus,
    FilePlus,
    Edit3
} from 'lucide-react';
import TiptapEditor from '../components/TiptapEditor';
import AdminLayout from '../components/AdminLayout';

interface Module {
    _id: string;
    id: string; // compatibility
    title: string;
    content: string;
    chapterId: string;
}

interface Chapter {
    _id: string;
    id: string; // compatibility
    title: string;
    description: string;
    modules: Module[];
}

export default function AdminLearnPage() {
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedChapters, setExpandedChapters] = useState<string[]>([]);
    const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
    const [editorContent, setEditorContent] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    // Initial Fetch
    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const res = await fetch('/api/learn');
            const data = await res.json();
            if (Array.isArray(data)) {
                setChapters(data);
                // Auto expand first chapter if exists
                if (data.length > 0) {
                    setExpandedChapters([data[0]._id]);
                }
            }
        } catch (error) {
            console.error("Failed to fetch learn content", error);
        } finally {
            setLoading(false);
        }
    };

    // Selection Handler
    useEffect(() => {
        if (selectedModuleId) {
            const module = findModule(selectedModuleId);
            if (module) {
                setEditorContent(module.content || "");
            }
        } else {
            setEditorContent("");
        }
    }, [selectedModuleId, chapters]);

    const findModule = (id: string) => {
        for (const ch of chapters) {
            const mod = ch.modules.find(m => m._id === id);
            if (mod) return mod;
        }
        return null;
    };

    const handleChapterClick = (id: string) => {
        setExpandedChapters(prev =>
            prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
        );
    };

    // Actions
    const createChapter = async () => {
        const title = prompt("Enter Chapter Title:");
        if (!title) return;

        try {
            const res = await fetch('/api/learn/chapters', {
                method: 'POST',
                body: JSON.stringify({ title, description: '' }),
                headers: { 'Content-Type': 'application/json' }
            });
            if (res.ok) fetchContent();
        } catch (err) {
            alert("Failed to create chapter");
        }
    };

    const deleteChapter = async (id: string) => {
        if (!confirm("Delete this chapter and all its modules?")) return;
        try {
            await fetch(`/api/learn/chapters/${id}`, { method: 'DELETE' });
            fetchContent();
            if (selectedModuleId && findModule(selectedModuleId)?.chapterId === id) {
                setSelectedModuleId(null);
            }
        } catch (err) {
            alert("Failed to delete");
        }
    };

    const createModule = async (chapterId: string) => {
        const title = prompt("Enter Module Title:");
        if (!title) return;

        try {
            const res = await fetch('/api/learn/modules', {
                method: 'POST',
                body: JSON.stringify({
                    title,
                    chapterId,
                    content: "<h1>New Module</h1><p>Start writing...</p>"
                }),
                headers: { 'Content-Type': 'application/json' }
            });
            if (res.ok) {
                await fetchContent();
                // Optionally select the new module?
            }
        } catch (err) {
            alert("Failed to create module");
        }
    };

    const deleteModule = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm("Delete this module?")) return;
        try {
            await fetch(`/api/learn/modules/${id}`, { method: 'DELETE' });
            if (selectedModuleId === id) setSelectedModuleId(null);
            fetchContent();
        } catch (err) {
            alert("Failed to delete");
        }
    };

    const saveContent = async () => {
        if (!selectedModuleId) return;
        setIsSaving(true);
        try {
            await fetch(`/api/learn/modules/${selectedModuleId}`, {
                method: 'PUT',
                body: JSON.stringify({ content: editorContent }),
                headers: { 'Content-Type': 'application/json' }
            });
            // Update local state to reflect changes without full refetch if we want speed
            // But full refetch ensures consistency
            fetchContent();
        } catch (err) {
            alert("Failed to save");
        } finally {
            setIsSaving(false);
        }
    };

    const updateModuleTitle = async (id: string, currentTitle: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const newTitle = prompt("Edit Title", currentTitle);
        if (newTitle && newTitle !== currentTitle) {
            await fetch(`/api/learn/modules/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ title: newTitle }),
                headers: { 'Content-Type': 'application/json' }
            });
            fetchContent();
        }
    };

    const updateChapterTitle = async (id: string, currentTitle: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const newTitle = prompt("Edit Chapter Title", currentTitle);
        if (newTitle && newTitle !== currentTitle) {
            await fetch(`/api/learn/chapters/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ title: newTitle }),
                headers: { 'Content-Type': 'application/json' }
            });
            fetchContent();
        }
    };


    return (
        <AdminLayout title="Learn Curriculum">
            <div className="flex h-[calc(100vh-(--spacing(16)))] bg-[#0a0a0a]">

                {/* Sidebar */}
                <aside className="w-80 border-r border-white/10 flex flex-col h-full bg-[#111]">
                    <div className="p-4 border-b border-white/10 flex justify-between items-center">
                        <h2 className="font-bold text-gray-200 uppercase tracking-wider text-sm">Curriculum</h2>
                        <button onClick={createChapter} className="p-1 hover:bg-white/10 rounded text-cyan-400" title="Add Chapter">
                            <FolderPlus size={18} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {loading && <div className="text-gray-500 text-sm text-center">Loading...</div>}

                        {!loading && chapters.map(chapter => {
                            const isExpanded = expandedChapters.includes(chapter._id);
                            return (
                                <div key={chapter._id} className="select-none">
                                    <div
                                        onClick={() => handleChapterClick(chapter._id)}
                                        className="flex items-center justify-between p-2 hover:bg-white/5 rounded cursor-pointer group"
                                    >
                                        <div className="flex items-center gap-2 overflow-hidden">
                                            {isExpanded ? <ChevronDown size={14} className="text-gray-500" /> : <ChevronRight size={14} className="text-gray-500" />}
                                            <span className="font-bold text-sm text-gray-300 truncate">{chapter.title}</span>
                                        </div>
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={(e) => updateChapterTitle(chapter._id, chapter.title, e)}
                                                className="p-1 hover:text-cyan-400 text-gray-500"
                                            >
                                                <Edit3 size={12} />
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); createModule(chapter._id); }}
                                                className="p-1 hover:text-green-400 text-gray-500"
                                                title="Add Module"
                                            >
                                                <FilePlus size={14} />
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); deleteChapter(chapter._id); }}
                                                className="p-1 hover:text-red-400 text-gray-500"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden pl-4 border-l border-white/5 ml-2 mt-1"
                                            >
                                                {chapter.modules.map(module => (
                                                    <div
                                                        key={module._id}
                                                        onClick={() => setSelectedModuleId(module._id)}
                                                        className={`flex items-center justify-between p-2 rounded cursor-pointer text-sm mb-1 group ${selectedModuleId === module._id ? 'bg-cyan-900/20 text-cyan-400' : 'text-gray-400 hover:text-gray-200'}`}
                                                    >
                                                        <div className="flex items-center gap-2 truncate">
                                                            <FileText size={12} />
                                                            <span className="truncate">{module.title}</span>
                                                        </div>
                                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                                                            <button
                                                                onClick={(e) => updateModuleTitle(module._id, module.title, e)}
                                                                className="p-1 hover:text-cyan-400 text-gray-500"
                                                            >
                                                                <Edit3 size={12} />
                                                            </button>
                                                            <button
                                                                onClick={(e) => deleteModule(module._id, e)}
                                                                className="p-1 hover:text-red-400 text-gray-500"
                                                            >
                                                                <Trash2 size={12} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                                {chapter.modules.length === 0 && (
                                                    <div className="text-xs text-gray-600 p-2 italic">No modules</div>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </aside>

                {/* Editor Area */}
                <main className="flex-1 flex flex-col h-full bg-[#0a0a0a] overflow-hidden">
                    {selectedModuleId ? (
                        <>
                            <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#111]">
                                <h1 className="text-lg font-bold text-gray-200">
                                    Editing: <span className="text-cyan-400">{findModule(selectedModuleId)?.title}</span>
                                </h1>
                                <button
                                    onClick={saveContent}
                                    disabled={isSaving}
                                    className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded font-bold disabled:opacity-50 transition-colors"
                                >
                                    <Save size={16} />
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </header>
                            <div className="flex-1 overflow-hidden p-6">
                                <TiptapEditor content={editorContent} onChange={setEditorContent} />
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                            <FolderPlus size={48} className="mb-4 opacity-20" />
                            <p>Select a module to edit or create a new one.</p>
                        </div>
                    )}
                </main>
            </div>
        </AdminLayout>
    );
}
