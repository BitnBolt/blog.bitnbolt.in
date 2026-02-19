"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash, Loader2 } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

interface ICategory {
    _id: string;
    name: string;
    slug: string;
}

export default function CategoryManager() {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [newCategory, setNewCategory] = useState("");
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/categories');
            const data = await res.json();
            if (data.success) {
                setCategories(data.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategory.trim()) return;

        setAdding(true);
        try {
            const res = await fetch('/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newCategory })
            });

            if (res.ok) {
                setNewCategory("");
                fetchCategories();
            } else {
                alert("Failed to add category");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setAdding(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this category?")) return;
        try {
            const res = await fetch(`/api/categories/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                setCategories(prev => prev.filter(c => c._id !== id));
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return (
        <AdminLayout title="Categories">
            <div className="flex items-center justify-center h-full text-gray-500">Loading...</div>
        </AdminLayout>
    );

    return (
        <AdminLayout title="Manage Categories">
            <div className="max-w-4xl mx-auto">
                <div className="bg-[#111] border border-white/10 rounded-lg p-6 mb-8">
                    <form onSubmit={handleAdd} className="flex gap-4">
                        <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="New Category Name"
                            className="flex-1 bg-[#0a0a0a] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-cyan-400 rounded-lg"
                        />
                        <button
                            type="submit"
                            disabled={adding}
                            className="bg-cyan-400 text-black px-6 font-bold hover:bg-cyan-300 transition-colors disabled:opacity-50 flex items-center gap-2 rounded-lg"
                        >
                            {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                            Add
                        </button>
                    </form>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map(cat => (
                        <div key={cat._id} className="group flex items-center justify-between bg-[#111] border border-white/10 p-4 rounded-lg hover:border-cyan-400/30 transition-all">
                            <span className="font-bold">{cat.name}</span>
                            <button
                                onClick={() => handleDelete(cat._id)}
                                className="text-gray-500 hover:text-red-400 p-2 hover:bg-red-900/10 rounded opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <Trash className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                    {categories.length === 0 && (
                        <div className="col-span-full text-center text-gray-500 py-8 border border-dashed border-white/10 rounded-lg">
                            No categories found. Start adding some!
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
