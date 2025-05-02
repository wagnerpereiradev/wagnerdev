'use client';

import { ContentBlock } from '@/types/blog';
import MarkdownRenderer from './MarkdownRenderer';
import ImageRenderer from './ImageRenderer';
import CodeRenderer from './CodeRenderer';
import VideoRenderer from './VideoRenderer';
import IframeRenderer from './IframeRenderer';

interface ContentRendererProps {
    blocks: ContentBlock[];
}

export default function ContentRenderer({ blocks }: ContentRendererProps) {
    return (
        <div>
            {blocks.map((block, index) => {
                switch (block.type) {
                    case 'markdown':
                        return <MarkdownRenderer key={`md-${index}`} block={block} />;
                    case 'img':
                        return <ImageRenderer key={`img-${index}`} block={block} />;
                    case 'code':
                        return <CodeRenderer key={`code-${index}`} block={block} />;
                    case 'video':
                        return <VideoRenderer key={`video-${index}`} block={block} />;
                    case 'iframe':
                        return <IframeRenderer key={`iframe-${index}`} block={block} />;
                    default:
                        // @ts-expect-error - Tipo de bloco não tratado explicitamente no switch
                        return <div key={`unknown-${index}`}>Bloco de tipo desconhecido: {block.type}</div>;
                }
            })}
        </div>
    );
} 