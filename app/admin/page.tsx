"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, Lock } from 'lucide-react';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                router.push('/admin/dashboard');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-md bg-[#111] border border-white/10 p-8 rounded-none">
                <div className="flex justify-center mb-8">
                    <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter">
                        <Zap className="h-8 w-8 text-cyan-400" />
                        <span>ADMIN<span className="text-cyan-400">PANEL</span></span>
                    </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">ACCESS CODE</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#0a0a0a] border border-white/10 py-3 pl-10 pr-4 text-white focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-gray-700 font-mono"
                                placeholder="Enter secure password"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-900/20 border border-red-500/50 text-red-500 text-sm p-3 text-center font-mono">
                            ERROR: {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-cyan-400 text-black font-bold py-3 hover:bg-cyan-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'AUTHENTICATING...' : 'ENTER SYSTEM'}
                    </button>
                </form>
            </div>
        </div>
    );
}
