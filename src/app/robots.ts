import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/'],
            },
            {
                // Permitir acesso explícito aos arquivos de favicon
                userAgent: 'Googlebot-Image',
                allow: ['/favicon.ico', '/favicon-*.png', '/android-chrome-*.png', '/apple-touch-icon.png'],
            },
        ],
        sitemap: [
            'https://wagnerai.me/sitemap.xml',
            'https://wagnerai.me/sitemap-blogs.xml',
            'https://wagnerai.me/sitemap-images.xml'
        ],
    };
} 