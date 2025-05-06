import { getAllPostsSlugs, getPostBySlug } from '@/data/blog-posts';

export async function GET() {
    const baseUrl = 'https://wagnerai.me';

    // Obter slugs dos posts do blog
    const blogSlugs = getAllPostsSlugs();

    // Gerar o XML do sitemap
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Adicionar cada post do blog
    for (const slug of blogSlugs) {
        const post = getPostBySlug(slug);
        const lastmod = post?.date ? new Date(post.date).toISOString() : new Date().toISOString();

        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}/blog/${slug}</loc>\n`;
        xml += `    <lastmod>${lastmod}</lastmod>\n`;
        xml += '  </url>\n';
    }

    xml += '</urlset>';

    // Retornar o XML com o tipo de conteúdo correto
    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
} 