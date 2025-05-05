import { Metadata } from 'next';
import { getPostBySlug, getAllPostsSlugs } from '@/data/blog-posts';
import ClientBlogPost from '@/components/blog/ClientBlogPost';
import { notFound } from 'next/navigation';

// Função para gerar os caminhos estáticos em tempo de build
export async function generateStaticParams() {
    const slugs = getAllPostsSlugs();
    return slugs.map(slug => ({ slug }));
}

// @ts-expect-error - TypeScript não reconhece corretamente a assinatura do Next.js para páginas dinâmicas
export async function generateMetadata({ params }): Promise<Metadata> {
    // Aguardando os parâmetros conforme requerido pelo Next.js 15
    const resolvedParams = await params;
    const slug = resolvedParams.slug;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post não encontrado',
            description: 'O post que você está procurando não existe ou foi removido.'
        };
    }

    const postUrl = `https://wagnerai.me/blog/${post.slug}`;

    return {
        title: `${post.headline} | Wagner Pereira`,
        description: post.summary,
        alternates: {
            canonical: postUrl,
        },
        openGraph: {
            title: post.headline,
            description: post.summary,
            url: postUrl,
            siteName: 'Wagner Pereira - Desenvolvedor Full Stack',
            images: [
                {
                    url: post.cover_image.url,
                    width: 1200,
                    height: 628,
                    alt: post.cover_image.alt,
                }
            ],
            locale: 'pt_BR',
            type: 'article',
            publishedTime: post.date,
            authors: [post.author.name],
            tags: post.tags,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.headline,
            description: post.summary,
            images: [post.cover_image.url],
            creator: '@wagnerpereiradev',
        },
        icons: {
            icon: [
                { url: '/favicon.ico', sizes: 'any' },
                { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
                { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            ],
            apple: [
                { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
            ],
            other: [
                {
                    rel: 'manifest',
                    url: '/site.webmanifest',
                },
            ],
        },
    };
}

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function Page({ params }: PageProps) {
    // Aguardar a resolução dos parâmetros antes de usá-los
    const resolvedParams = await params;
    const { slug } = resolvedParams;

    // Verificar se o post existe
    const post = getPostBySlug(slug);

    // Se o post não existir, retornar 404
    if (!post) {
        notFound();
    }

    return <ClientBlogPost slug={slug} />;
} 