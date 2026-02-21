import { MetadataRoute } from 'next';
import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';

const BASE_URL = 'https://blog.bitnbolt.in';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/learn`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
    ];

    // Dynamic blog posts — use slug for clean SEO-friendly URLs
    let blogPages: MetadataRoute.Sitemap = [];
    try {
        await connectToDatabase();
        const blogs = await Blog.find(
            { slug: { $exists: true, $ne: '' } },
            { slug: 1, updatedAt: 1, createdAt: 1 }
        ).sort({ createdAt: -1 });

        blogPages = blogs.map((blog) => ({
            url: `${BASE_URL}/blog/${blog.slug}`,
            lastModified: new Date(blog.updatedAt || blog.createdAt),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }));
    } catch (error) {
        console.error('Sitemap: failed to fetch blogs', error);
    }

    return [...staticPages, ...blogPages];
}
