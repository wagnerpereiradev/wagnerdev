import { Metadata } from 'next';
import { getPostBySlug } from '@/data/blog-posts';
import ClientBlogPost from '@/components/blog/ClientBlogPost';

// @ts-ignore - Contornando problema de tipagem com Next.js 15.3.1
export async function generateMetadata({ params }: any): Promise<Metadata> {
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

    return {
        title: `${post.headline} | Wagner Pereira`,
        description: post.summary,
        openGraph: {
            title: post.headline,
            description: post.summary,
            url: `https://wagnerai.me/blog/${post.slug}`,
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
    };
}

// @ts-ignore - Contornando problema de tipagem com Next.js 15.3.1
export default async function Page({ params }: any) {
    // Aguardando os parâmetros conforme requerido pelo Next.js 15
    const resolvedParams = await params;
    return <ClientBlogPost slug={resolvedParams.slug} />;
} 