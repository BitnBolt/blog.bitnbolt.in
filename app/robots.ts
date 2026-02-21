import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: ['/', '/blog', '/blog/', '/learn'],
                disallow: ['/admin', '/admin/', '/api/', '/api'],
            },
        ],
        sitemap: 'https://blog.bitnbolt.in/sitemap.xml',
        host: 'https://blog.bitnbolt.in',
    };
}
