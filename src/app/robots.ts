import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/'],
            },
        ],
        sitemap: [
            'https://wagnerai.me/sitemap.xml',
            'https://wagnerai.me/sitemap-blogs.xml',
            'https://wagnerai.me/sitemap-images.xml'
        ],
    };
} 