"use client";

import dynamic from 'next/dynamic';
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Save, Layout } from 'lucide-react';
import Link from 'next/link';

import TiptapEditor from '../components/TiptapEditor';

export default function EditorPage() {
    return (
        <Suspense fallback={<div>Loading Editor...</div>}>
            <EditorContent />
        </Suspense>
    );
}

function EditorContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const blogId = searchParams.get('id');

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [shortDescription, setShortDescription] = useState('');
    const [tags, setTags] = useState('');
    const [level, setLevel] = useState('Easy');
    const [readTime, setReadTime] = useState('5 min');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch Categories
        fetch('/api/categories')
            .then(res => res.json())
            .then(data => {
                if (data.success) setCategories(data.data);
            });

        if (blogId) {
            // Fetch existing blog data
            fetch(`/api/blogs/${blogId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        const blog = data.data;
                        setTitle(blog.title);
                        setContent(blog.content);
                        setCategory(blog.category);
                        setShortDescription(blog.shortDescription || '');
                        setTags(blog.tags ? blog.tags.join(', ') : '');
                        setLevel(blog.level);
                        setReadTime(blog.readTime);
                    }
                });
        }
    }, [blogId]);

    const handleSave = async () => {
        setLoading(true);
        const tagsArray = tags.split(',').map(t => t.trim()).filter(t => t);
        const payload = { title, content, category, shortDescription, tags: tagsArray, level, readTime };

        try {
            const url = blogId ? `/api/blogs/${blogId}` : '/api/blogs';
            const method = blogId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                router.push('/admin/dashboard');
            } else {
                alert('Failed to save');
            }
        } catch (err) {
            console.error(err);
            alert('Error saving');
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col">
            {/* Toolbar */}
            <div className="border-b border-white/10 bg-[#111] h-16 flex items-center justify-between px-6 sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-gray-400" />
                    </button>
                    <h1 className="font-bold text-lg">{blogId ? 'Edit Post' : 'New Post'}</h1>
                </div>

                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 bg-cyan-400 text-black px-6 py-2 font-bold hover:bg-cyan-300 transition-colors disabled:opacity-50"
                >
                    <Save className="w-4 h-4" /> {loading ? 'Saving...' : 'Publish'}
                </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar settings */}
                <div className="w-80 border-r border-white/10 bg-[#0f0f0f] p-6 overflow-y-auto hidden lg:block">
                    <h3 className="font-bold text-gray-400 text-xs tracking-widest uppercase mb-6 flex items-center gap-2">
                        <Layout className="w-4 h-4" /> Post Settings
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-[#1a1a1a] border border-white/10 p-2 text-white outline-none focus:border-cyan-400"
                            >
                                <option value="" disabled>Select Category</option>
                                {categories.map((c: any) => (
                                    <option key={c._id} value={c.name}>{c.name}</option>
                                ))}
                            </select>
                            <div className="mt-2 text-right">
                                <Link href="/admin/categories" className="text-xs text-cyan-400 hover:underline">+ Manage Categories</Link>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Short Description</label>
                            <textarea
                                value={shortDescription}
                                onChange={(e) => setShortDescription(e.target.value)}
                                className="w-full bg-[#1a1a1a] border border-white/10 p-2 text-white outline-none focus:border-cyan-400 h-24 text-sm resize-none"
                                placeholder="Brief summary for the card..."
                                maxLength={200}
                            />
                            <div className="text-right text-xs text-gray-600 mt-1">{shortDescription.length}/200</div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Tags (comma separated)</label>
                            <input
                                type="text"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className="w-full bg-[#1a1a1a] border border-white/10 p-2 text-white outline-none focus:border-cyan-400"
                                placeholder="arduino, iot, sensors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Difficulty</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['Easy', 'Medium', 'Hard'].map(l => (
                                    <button
                                        key={l}
                                        onClick={() => setLevel(l)}
                                        className={`p-2 text-sm border ${level === l ? 'border-cyan-400 text-cyan-400 bg-cyan-400/10' : 'border-white/10 text-gray-500 hover:border-white/30'}`}
                                    >
                                        {l}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Read Time</label>
                            <input
                                type="text"
                                value={readTime}
                                onChange={(e) => setReadTime(e.target.value)}
                                className="w-full bg-[#1a1a1a] border border-white/10 p-2 text-white outline-none focus:border-cyan-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Main Editor */}
                <div className="flex-1 overflow-y-auto p-8 max-w-4xl mx-auto w-full">
                    <input
                        type="text"
                        placeholder="Enter Title Here..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-transparent text-5xl font-bold mb-8 outline-none border-b border-white/10 pb-4 placeholder:text-gray-700"
                    />

                    <div className="mb-12">
                        <TiptapEditor content={content} onChange={setContent} />
                    </div>
                </div>
            </div>
        </div>
    );
}
