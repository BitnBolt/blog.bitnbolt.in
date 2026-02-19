"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash, FileText, Layers, File } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

interface IBlog {
    _id: string;
    title: string;
    category: string;
    level: string;
    createdAt: string;
}

export default function AdminDashboard() {
    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const [categoriesCount, setCategoriesCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [blogsRes, catsRes] = await Promise.all([
                fetch('/api/blogs'),
                fetch('/api/categories')
            ]);

            const blogsData = await blogsRes.json();
            const catsData = await catsRes.json();

            if (blogsData.success) setBlogs(blogsData.data);
            if (catsData.success) setCategoriesCount(catsData.data.length);

        } catch (error) {
            console.error('Failed to fetch data', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this blog?')) return;
        try {
            const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setBlogs(prev => prev.filter(b => b._id !== id));
            }
        } catch (err) {
            console.error(err);
        }
    }

    if (loading) return (
        <AdminLayout title="Dashboard">
            <div className="flex items-center justify-center h-full text-gray-500">Loading data...</div>
        </AdminLayout>
    );

    return (
        <AdminLayout
            title="Dashboard"
            actions={
                <Link href="/admin/editor" className="flex items-center gap-2 bg-cyan-400 text-black px-4 py-2 font-bold hover:bg-cyan-300 transition-colors text-sm rounded">
                    <Plus className="w-4 h-4" /> New Post
                </Link>
            }
        >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#111] border border-white/10 p-6 rounded-lg">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-cyan-400/10 text-cyan-400 rounded-lg">
                            <File className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider font-bold">Total Blogs</div>
                            <div className="text-2xl font-bold">{blogs.length}</div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#111] border border-white/10 p-6 rounded-lg">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-400/10 text-purple-400 rounded-lg">
                            <Layers className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-xs text-gray-400 uppercase tracking-wider font-bold">Categories</div>
                            <div className="text-2xl font-bold">{categoriesCount}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Blogs Table */}
            <div className="bg-[#111] border border-white/10 rounded-lg overflow-hidden">
                <div className="p-4 border-b border-white/10 font-bold bg-white/5">
                    Recent Blogs
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#0f0f0f] text-gray-400 text-xs font-bold uppercase tracking-wider">
                            <tr>
                                <th className="p-4">Title</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Level</th>
                                <th className="p-4">Date</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10 text-sm">
                            {blogs.map((blog) => (
                                <tr key={blog._id} className="hover:bg-white/5 transition-colors group">
                                    <td className="p-4 font-bold text-white max-w-xs truncate">{blog.title}</td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 bg-cyan-400/10 text-cyan-400 rounded text-xs border border-cyan-400/20 font-mono">
                                            {blog.category}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-400">{blog.level}</td>
                                    <td className="p-4 text-gray-500 font-mono">
                                        {new Date(blog.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={`/admin/editor?id=${blog._id}`}
                                                className="p-1.5 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors"
                                                title="Edit"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(blog._id)}
                                                className="p-1.5 text-red-500 hover:text-red-400 bg-red-900/10 hover:bg-red-900/20 rounded transition-colors border border-transparent hover:border-red-900/30"
                                                title="Delete"
                                            >
                                                <Trash className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {blogs.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-gray-500">
                                        <FileText className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                        <p>No blogs found.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
