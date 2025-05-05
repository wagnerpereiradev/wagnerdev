import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | Wagner Pereira - Desenvolvedor Full Stack",
    description: "Artigos, tutoriais e dicas sobre desenvolvimento web, programação, design e muito mais.",
    keywords: "blog, desenvolvimento web, programação, tecnologia, dicas, tutoriais, nextjs, react, javascript, typescript",
    alternates: {
        canonical: "https://wagnerai.me/blog",
    },
    openGraph: {
        title: "Blog | Wagner Pereira - Desenvolvedor Full Stack",
        description: "Artigos, tutoriais e dicas sobre desenvolvimento web, programação, design e muito mais.",
        url: "https://wagnerai.me/blog",
        siteName: "Wagner Pereira - Desenvolvedor Full Stack",
        images: [
            {
                url: "/images/blog-og-image.png",
                width: 1200,
                height: 630,
                alt: "Blog - Wagner Pereira",
            }
        ],
        locale: "pt_BR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Blog | Wagner Pereira - Desenvolvedor Full Stack",
        description: "Artigos, tutoriais e dicas sobre desenvolvimento web, programação, design e muito mais.",
        images: ["/images/blog-og-image.png"],
        creator: "@wagnerpereiradev",
    },
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
        </>
    );
} 