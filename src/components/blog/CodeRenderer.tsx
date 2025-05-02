'use client';

import { useState } from 'react';
import { CodeBlock } from '@/types/blog';
import { motion } from 'framer-motion';

interface CodeRendererProps {
    block: CodeBlock;
}

export default function CodeRenderer({ block }: CodeRendererProps) {
    const { language, content } = block;
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            className="my-8 rounded-xl overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center justify-between bg-neutral-900 px-4 py-2 border-b border-neutral-800">
                <div className="flex items-center">
                    <span className="text-neutral-400 text-sm font-mono mr-2">{language}</span>
                    <div className="flex space-x-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
                    </div>
                </div>
                <button
                    onClick={handleCopy}
                    className="text-neutral-400 hover:text-white text-sm transition-colors"
                >
                    {copied ? (
                        <span className="flex items-center text-green-400">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Copiado!
                        </span>
                    ) : (
                        <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                            Copiar
                        </span>
                    )}
                </button>
            </div>
            <div className="bg-neutral-950 p-4 overflow-x-auto">
                <pre className="text-neutral-300 font-mono text-sm">
                    <code>{content}</code>
                </pre>
            </div>
        </motion.div>
    );
} 