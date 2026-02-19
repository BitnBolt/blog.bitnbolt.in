"use client";

import Link from 'next/link';
import { Zap, Search } from 'lucide-react';

export default function Header({ searchComponent }: { searchComponent?: React.ReactNode }) {
    return (
        <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/90 backdrop-blur border-b border-white/10 h-16 flex items-center px-6 justify-between shrink-0">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter hover:opacity-80 transition-opacity">
                <Zap className="h-6 w-6 text-cyan-400" />
                <span>BITNBOLT<span className="text-cyan-400">BLOG</span></span>
            </Link>

            {searchComponent && (
                <div className="md:w-96 relative hidden md:block mx-4">
                    {searchComponent}
                </div>
            )}

            <div className="flex items-center gap-4">
                <Link href="/learn" className="text-sm font-bold text-gray-400 hover:text-white transition-colors">
                    Learn
                </Link>
                <Link href="/blog" className="text-sm font-bold text-gray-400 hover:text-white transition-colors">
                    Blog
                </Link>
                <Link href="/" className="text-sm font-bold bg-white text-black px-4 py-2 hover:bg-cyan-400 transition-colors hidden sm:block">
                    Get The Kit
                </Link>
            </div>
        </nav>
    );
}
