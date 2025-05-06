import { getAllPostsSlugs, getPostBySlug } from '@/data/blog-posts';

export async function GET() {
    const baseUrl = 'https://wagnerai.me';

    // Obter slugs dos posts do blog
    const blogSlugs = getAllPostsSlugs();

    // Gerar o XML do sitemap com namespace de imagem
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
    xml += 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

    // Adicionar cada post do blog
    for (const slug of blogSlugs) {
        const post = getPostBySlug(slug);
        const lastmod = post?.date ? new Date(post.date).toISOString() : new Date().toISOString();

        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}/blog/${slug}</loc>\n`;
        xml += `    <lastmod>${lastmod}</lastmod>\n`;

        // Adicionar a imagem de capa, se existir
        if (post?.cover_image?.url) {
            xml += '    <image:image>\n';

            // URL da imagem (com URL completo se for externo ou prefixado com baseUrl se for relativo)
            const imageUrl = post.cover_image.url.startsWith('http')
                ? post.cover_image.url
                : `${baseUrl}${post.cover_image.url}`;

            xml += `      <image:loc>${imageUrl}</image:loc>\n`;

            // Adicionar título/alt da imagem se disponível
            if (post.cover_image.alt || post.headline) {
                xml += `      <image:title>${post.cover_image.alt || post.headline}</image:title>\n`;
            }

            xml += '    </image:image>\n';
        }

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