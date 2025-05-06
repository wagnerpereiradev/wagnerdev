export async function GET() {
    const baseUrl = 'https://wagnerai.me';

    // Gerar o XML do sitemap com namespace de imagem
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<!-- Este sitemap foi gerado pelo sitemap.xml/route.ts -->\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
    xml += 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

    // Página inicial
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}</loc>\n`;
    xml += '    <image:image>\n';
    xml += `      <image:loc>${baseUrl}/images/og-image.png</image:loc>\n`;
    xml += '      <image:title>Wagner Pereira - Desenvolvedor Full Stack</image:title>\n';
    xml += '    </image:image>\n';
    xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
    xml += '    <priority>1.0</priority>\n';
    xml += '  </url>\n';

    // Página de blog
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}/blog</loc>\n`;
    xml += '    <image:image>\n';
    xml += `      <image:loc>${baseUrl}/images/blog-og-image.png</image:loc>\n`;
    xml += '      <image:title>Blog - Wagner Pereira</image:title>\n';
    xml += '    </image:image>\n';
    xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
    xml += '    <priority>0.9</priority>\n';
    xml += '  </url>\n';

    // Adicione outras páginas estáticas aqui se necessário

    xml += '</urlset>';

    // Retornar o XML com o tipo de conteúdo correto
    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
} 