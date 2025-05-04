'use client';

import dynamic from 'next/dynamic';
import { MarkdownBlock } from '@/types/blog';

// Importação dinâmica do ReactMarkdown com opção ssr: false para evitar problemas de hidratação
const DynamicMarkdown = dynamic(() => import('./MarkdownContent'), {
    ssr: false,
    loading: () => <div className="py-4 text-neutral-400">Carregando conteúdo...</div>
});

interface MarkdownRendererProps {
    block: MarkdownBlock;
}

export default function MarkdownRenderer({ block }: MarkdownRendererProps) {
    return (
        <div className="prose prose-invert max-w-none">
            <DynamicMarkdown block={block} />
        </div>
    );
} 