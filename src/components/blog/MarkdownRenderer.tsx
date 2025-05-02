'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import { MarkdownBlock } from '@/types/blog';
import { HTMLAttributes } from 'react';

interface MarkdownRendererProps {
    block: MarkdownBlock;
}

// Interface compatível com os componentes do ReactMarkdown
interface CodeProps extends HTMLAttributes<HTMLElement> {
    inline?: boolean;
    className?: string;
}

export default function MarkdownRenderer({ block }: MarkdownRendererProps) {
    return (
        <div className="prose prose-invert max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeHighlight]}
                components={{
                    h1: ({ children }) => <h1 className="text-3xl font-bold mb-6 mt-8 text-white">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-2xl font-bold mb-5 mt-8 text-white">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-xl font-bold mb-4 mt-6 text-white">{children}</h3>,
                    h4: ({ children }) => <h4 className="text-lg font-bold mb-3 mt-5 text-white">{children}</h4>,
                    p: ({ children }) => <p className="mb-4 text-neutral-300 leading-relaxed">{children}</p>,
                    ul: ({ children }) => <ul className="mb-6 pl-6 list-disc text-neutral-300">{children}</ul>,
                    ol: ({ children }) => <ol className="mb-6 pl-6 list-decimal text-neutral-300">{children}</ol>,
                    li: ({ children }) => <li className="mb-2">{children}</li>,
                    a: ({ href, children }) => (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#3d43dd] hover:text-[#6366f1] transition-colors underline"
                        >
                            {children}
                        </a>
                    ),
                    blockquote: ({ children }) => (
                        <blockquote className="pl-4 border-l-4 border-[#3d43dd]/50 italic text-neutral-400 my-6">
                            {children}
                        </blockquote>
                    ),
                    code: ({ inline, className, children, ...props }: CodeProps) => {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                            <div className="bg-neutral-900 rounded-lg p-4 overflow-x-auto mb-6">
                                <code
                                    className={`${className} font-mono text-sm`}
                                    {...props}
                                >
                                    {children}
                                </code>
                            </div>
                        ) : (
                            <code
                                className="bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-200 font-mono text-sm"
                                {...props}
                            >
                                {children}
                            </code>
                        );
                    },
                    hr: () => <hr className="my-6 border-neutral-800" />,
                    strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
                    em: ({ children }) => <em className="italic text-neutral-300">{children}</em>,
                }}
            >
                {block.content}
            </ReactMarkdown>
        </div>
    );
} 