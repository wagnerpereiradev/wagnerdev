import { MetadataRoute } from 'next';

export default function sitemapIndex(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://wagnerai.me/sitemap.xml',
            lastModified: new Date(),
        },
    ];
} 