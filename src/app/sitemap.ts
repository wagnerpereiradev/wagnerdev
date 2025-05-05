import { MetadataRoute } from 'next';
import { getAllPostsSlugs } from '@/data/blog-posts';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://wagnerai.me';

    // URLs estáticas
    const staticUrls = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
    ];

    // URLs dos posts do blog
    const blogSlugs = getAllPostsSlugs();
    const blogUrls = blogSlugs.map(slug => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    return [...staticUrls, ...blogUrls];
} 