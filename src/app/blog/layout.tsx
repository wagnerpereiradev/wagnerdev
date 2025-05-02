import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | Wagner Pereira - Desenvolvedor Full Stack",
    description: "Artigos, tutoriais e dicas sobre desenvolvimento web, programação, design e muito mais.",
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