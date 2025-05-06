import { MetadataRoute } from 'next';

export default function sitemapIndex(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://wagnerai.me/sitemap.xml',
            lastModified: new Date(),
        },
        {
            url: 'https://wagnerai.me/sitemap-blogs.xml',
            lastModified: new Date(),
        },
        {
            url: 'https://wagnerai.me/sitemap-images.xml',
            lastModified: new Date(),
        },
    ];
} 