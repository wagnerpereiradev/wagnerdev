import { getAllPostsSlugs, getPostBySlug } from '@/data/blog-posts';

// Interface estendida para permitir imagens
type SitemapEntry = {
    url: string;
    lastModified?: string | Date;
    // Propriedade para imagens (será serializada no XML pela API do Next.js)
    images?: Array<{
        loc: string;
        title?: string;
        caption?: string;
    }>;
};

export default function sitemap(): Array<SitemapEntry> {
    const baseUrl = 'https://wagnerai.me';

    // URLs estáticas
    const staticUrls = [
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
        },
    ];

    // URLs dos posts do blog com imagens
    const blogSlugs = getAllPostsSlugs();
    const blogUrls = blogSlugs.map(slug => {
        const post = getPostBySlug(slug);
        const entry: SitemapEntry = {
            url: `${baseUrl}/blog/${slug}`,
            lastModified: post?.date ? new Date(post.date) : new Date(),
        };

        // Adicionar a imagem de capa, se existir
        if (post?.cover_image?.url) {
            entry.images = [
                {
                    loc: post.cover_image.url.startsWith('http')
                        ? post.cover_image.url
                        : `${baseUrl}${post.cover_image.url}`,
                    title: post.cover_image.alt || post.headline,
                }
            ];
        }

        return entry;
    });

    return [...staticUrls, ...blogUrls];
} 