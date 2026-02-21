import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Tag, User } from 'lucide-react';
import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';
import Header from '../../components/Header';
import ContentViewer from '../../components/ContentViewer';
import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import mongoose from 'mongoose';

const BASE_URL = 'https://blog.bitnbolt.in';

// ── Data helpers ───────────────────────────────────────────────────────────────
async function getBlogBySlug(slug: string) {
    await connectToDatabase();
    try {
        // Primary: find by slug
        let blog = await Blog.findOne({ slug });
        if (blog) return { blog: JSON.parse(JSON.stringify(blog)), isLegacyId: false };

        // Fallback: old ObjectId-based URL — look up by _id and redirect to slug
        if (mongoose.Types.ObjectId.isValid(slug) && slug.length === 24) {
            blog = await Blog.findById(slug);
            if (blog) return { blog: JSON.parse(JSON.stringify(blog)), isLegacyId: true };
        }

        return null;
    } catch {
        return null;
    }
}

async function getAllBlogs() {
    await connectToDatabase();
    try {
        const blogs = await Blog.find({}, { content: 0 }).sort({ createdAt: -1 });
        return JSON.parse(JSON.stringify(blogs));
    } catch {
        return [];
    }
}

// ── Dynamic Metadata ──────────────────────────────────────────────────────────
export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const result = await getBlogBySlug(slug);

    if (!result) {
        return {
            title: 'Post Not Found',
            description: 'The requested blog post could not be found.',
        };
    }

    const { blog } = result;
    const canonicalUrl = `${BASE_URL}/blog/${blog.slug}`;
    const ogImage =
        blog.image && !blog.image.startsWith('bg-') ? blog.image : `${BASE_URL}/og-image.png`;

    return {
        title: blog.title,
        description: blog.shortDescription,
        keywords: [
            ...(blog.tags || []),
            blog.category,
            'Arduino',
            'IoT',
            'BitnBolt',
            'electronics tutorial',
        ],
        authors: [{ name: 'BitnBolt Team', url: BASE_URL }],
        openGraph: {
            type: 'article',
            url: canonicalUrl,
            title: blog.title,
            description: blog.shortDescription,
            siteName: 'BitnBolt',
            images: [{ url: ogImage, width: 1200, height: 630, alt: blog.title }],
            publishedTime: new Date(blog.createdAt).toISOString(),
            modifiedTime: new Date(blog.updatedAt).toISOString(),
            authors: ['BitnBolt Team'],
            tags: blog.tags || [],
        },
        twitter: {
            card: 'summary_large_image',
            title: blog.title,
            description: blog.shortDescription,
            images: [ogImage],
        },
        alternates: { canonical: canonicalUrl },
    };
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const result = await getBlogBySlug(slug);

    if (!result) notFound();

    const { blog, isLegacyId } = result!;

    // Permanent redirect from old ObjectId URL to slug URL
    if (isLegacyId) redirect(`/blog/${blog.slug}`);

    const allBlogs = await getAllBlogs();

    const publishedDate = new Date(blog.createdAt).toISOString();
    const modifiedDate = new Date(blog.updatedAt).toISOString();
    const canonicalUrl = `${BASE_URL}/blog/${blog.slug}`;
    const ogImage =
        blog.image && !blog.image.startsWith('bg-') ? blog.image : `${BASE_URL}/og-image.png`;

    const articleJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        '@id': canonicalUrl,
        headline: blog.title,
        description: blog.shortDescription,
        image: ogImage,
        datePublished: publishedDate,
        dateModified: modifiedDate,
        author: { '@type': 'Organization', name: 'BitnBolt Team', url: BASE_URL },
        publisher: {
            '@type': 'Organization',
            name: 'BitnBolt',
            url: BASE_URL,
            logo: { '@type': 'ImageObject', url: `${BASE_URL}/og-image.png` },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
        keywords: [...(blog.tags || []), blog.category].join(', '),
        articleSection: blog.category,
    };

    return (
        <div className="h-screen bg-[#0a0a0a] text-white font-sans flex flex-col overflow-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />

            <Header />

            <div className="flex flex-1 pt-16 overflow-hidden">
                {/* Left Sidebar */}
                <aside
                    className="w-80 border-r border-white/10 bg-[#0f0f0f] overflow-y-auto hidden lg:block shrink-0"
                    aria-label="Recent posts"
                >
                    <div className="p-6">
                        <Link
                            href="/blog"
                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 uppercase tracking-widest font-bold"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back to Library
                        </Link>

                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                            Recent Posts
                        </h3>
                        <nav aria-label="Recent blog posts">
                            <div className="space-y-4">
                                {allBlogs.map((b: any) => (
                                    <Link
                                        key={b._id}
                                        href={`/blog/${b.slug}`}
                                        className={`block group p-2 rounded transition-colors ${b.slug === blog.slug ? 'bg-white/5' : 'hover:bg-white/5'
                                            }`}
                                    >
                                        <h4
                                            className={`text-sm font-bold mb-1 leading-tight group-hover:text-cyan-400 transition-colors ${b.slug === blog.slug ? 'text-cyan-400' : 'text-gray-300'
                                                }`}
                                        >
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
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main
                    className="flex-1 overflow-y-auto bg-[#0a0a0a] p-6 md:p-12 lg:pr-64"
                    id="main-content"
                >
                    <div className="max-w-3xl mx-auto">
                        {/* Mobile back */}
                        <div className="lg:hidden mb-8">
                            <Link
                                href="/blog"
                                className="inline-flex items-center text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Library
                            </Link>
                        </div>

                        <header className="mb-12 border-b border-white/10 pb-8">
                            <div className="flex items-center gap-2 text-cyan-400 text-sm font-mono mb-4 uppercase tracking-wider">
                                <Tag className="w-4 h-4" />
                                {blog.category}
                                <span className="text-gray-600">•</span>
                                <span
                                    className={
                                        blog.level === 'Easy'
                                            ? 'text-green-400'
                                            : blog.level === 'Medium'
                                                ? 'text-yellow-400'
                                                : 'text-red-400'
                                    }
                                >
                                    {blog.level}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                {blog.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 font-mono">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" /> BitnBolt Team
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <time dateTime={publishedDate}>
                                        {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </time>
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
                                        <span
                                            key={tag}
                                            className="text-xs bg-white/5 text-gray-400 px-2 py-1 rounded font-mono"
                                        >
                                            #{tag}
                                        </span>
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
