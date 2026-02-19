import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Tag, User } from 'lucide-react';
import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';
import Header from '../../components/Header';
import ContentViewer from '../../components/ContentViewer';
import { notFound } from 'next/navigation';

async function getBlog(id: string) {
    await connectToDatabase();
    try {
        const blog = await Blog.findById(id);
        return blog ? JSON.parse(JSON.stringify(blog)) : null;
    } catch (error) {
        return null;
    }
}

async function getAllBlogs() {
    await connectToDatabase();
    try {
        // Exclude content for sidebar list
        const blogs = await Blog.find({}, { content: 0 }).sort({ createdAt: -1 });
        return JSON.parse(JSON.stringify(blogs));
    } catch (error) {
        return [];
    }
}

export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const [blog, allBlogs] = await Promise.all([
        getBlog(id),
        getAllBlogs()
    ]);

    if (!blog) {
        notFound();
    }

    return (
        <div className="h-screen bg-[#0a0a0a] text-white font-sans flex flex-col overflow-hidden">
            <Header />

            <div className="flex flex-1 pt-16 overflow-hidden">
                {/* Left Sidebar - Blog List */}
                <aside className="w-80 border-r border-white/10 bg-[#0f0f0f] overflow-y-auto hidden lg:block shrink-0">
                    <div className="p-6">
                        <Link href="/blog" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 uppercase tracking-widest font-bold">
                            <ArrowLeft className="w-4 h-4" /> Back to Library
                        </Link>

                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Recent Posts</h3>
                        <div className="space-y-4">
                            {allBlogs.map((b: any) => (
                                <Link
                                    key={b._id}
                                    href={`/blog/${b._id}`}
                                    className={`block group p-2 rounded transition-colors ${b._id === id ? 'bg-white/5' : 'hover:bg-white/5'}`}
                                >
                                    <h4 className={`text-sm font-bold mb-1 leading-tight group-hover:text-cyan-400 transition-colors ${b._id === id ? 'text-cyan-400' : 'text-gray-300'}`}>
                                        {b.title}
                                    </h4>
                                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                                        <span>{new Date(b.createdAt).toLocaleDateString()}</span>
                                        <span>•</span>
                                        <span>{b.readTime || '5 min'}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-[#0a0a0a] p-6 md:p-12 lg:pr-64">
                    <div className="max-w-3xl mx-auto">
                        {/* Mobile Back Button */}
                        <div className="lg:hidden mb-8">
                            <Link href="/blog" className="inline-flex items-center text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Library
                            </Link>
                        </div>

                        <header className="mb-12 border-b border-white/10 pb-8">
                            <div className="flex items-center gap-2 text-cyan-400 text-sm font-mono mb-4 uppercase tracking-wider">
                                <Tag className="w-4 h-4" />
                                {blog.category}
                                <span className="text-gray-600">•</span>
                                <span className={
                                    blog.level === 'Easy' ? 'text-green-400' :
                                        blog.level === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                                }>
                                    {blog.level}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{blog.title}</h1>

                            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 font-mono">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" /> BitnBolt Team
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" /> {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" /> {blog.readTime} read
                                </div>
                            </div>

                            {blog.shortDescription && (
                                <p className="mt-8 text-xl text-gray-300 leading-relaxed max-w-2xl border-l-4 border-cyan-400 pl-6 italic">
                                    {blog.shortDescription}
                                </p>
                            )}

                            {blog.tags && blog.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-6">
                                    {blog.tags.map((tag: string) => (
                                        <span key={tag} className="text-xs bg-white/5 text-gray-400 px-2 py-1 rounded font-mono">#{tag}</span>
                                    ))}
                                </div>
                            )}
                        </header>

                        <article>
                            <ContentViewer content={blog.content} />
                        </article>
                    </div>
                </main>
            </div>
        </div>
    );
}
