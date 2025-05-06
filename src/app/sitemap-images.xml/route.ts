import { getAllPostsSlugs, getPostBySlug } from '@/data/blog-posts';

type SitemapImageEntry = {
    loc: string;
    image_loc: string;
    title?: string;
    caption?: string;
};

function generateSitemapXml(entries: SitemapImageEntry[]): string {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
    xml += 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

    entries.forEach((entry) => {
        xml += '  <url>\n';
        xml += `    <loc>${entry.loc}</loc>\n`;
        xml += '    <image:image>\n';
        xml += `      <image:loc>${entry.image_loc}</image:loc>\n`;

        if (entry.title) {
            xml += `      <image:title>${entry.title}</image:title>\n`;
        }

        if (entry.caption) {
            xml += `      <image:caption>${entry.caption}</image:caption>\n`;
        }

        xml += '    </image:image>\n';
        xml += '  </url>\n';
    });

    xml += '</urlset>';
    return xml;
}

export async function GET() {
    const baseUrl = 'https://wagnerai.me';
    const entries: SitemapImageEntry[] = [];

    // Obter imagens dos posts do blog
    const blogSlugs = getAllPostsSlugs();

    for (const slug of blogSlugs) {
        const post = getPostBySlug(slug);

        if (post?.cover_image?.url) {
            entries.push({
                loc: `${baseUrl}/blog/${slug}`,
                image_loc: post.cover_image.url.startsWith('http')
                    ? post.cover_image.url
                    : `${baseUrl}${post.cover_image.url}`,
                title: post.cover_image.alt || post.headline,
            });
        }
    }

    // Gerar o XML do sitemap
    const xml = generateSitemapXml(entries);

    // Retornar o XML com o tipo de conteúdo correto
    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
} 