'use client';

import { useState } from 'react';
import { CodeBlock } from '@/types/blog';
import { motion } from 'framer-motion';
import { Highlight, themes } from 'prism-react-renderer';

interface CodeRendererProps {
    block: CodeBlock;
}

const languageNames: { [key: string]: string } = {
    js: 'JavaScript',
    jsx: 'React JSX',
    ts: 'TypeScript',
    tsx: 'React TSX',
    html: 'HTML',
    css: 'CSS',
    json: 'JSON',
    yaml: 'YAML',
    md: 'Markdown',
    py: 'Python',
    // Adicione mais mapeamentos conforme necessário
};

export default function CodeRenderer({ block }: CodeRendererProps) {
    const { language, content } = block;
    const [copied, setCopied] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const displayLanguage = languageNames[language.toLowerCase()] || language;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Falha ao copiar o código:', err);
        }
    };

    return (
        <motion.div
            className="my-8 group relative"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Container principal com borda sutil */}
            <div className="rounded-xl overflow-hidden ring-1 ring-neutral-800/50 bg-black/20 backdrop-blur-sm">
                <div className="bg-black/40 rounded-xl overflow-hidden">
                    {/* Cabeçalho do bloco de código */}
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-800/30">
                        <div className="flex items-center space-x-4">
                            {/* Indicadores de janela com hover effect */}
                            <div className="flex space-x-1.5">
                                <div className="w-3 h-3 rounded-full bg-neutral-800 transition-colors duration-200 group-hover:bg-red-500/70" />
                                <div className="w-3 h-3 rounded-full bg-neutral-800 transition-colors duration-200 group-hover:bg-yellow-500/70" />
                                <div className="w-3 h-3 rounded-full bg-neutral-800 transition-colors duration-200 group-hover:bg-green-500/70" />
                            </div>

                            {/* Badge da linguagem */}
                            <span className="text-xs font-medium px-2 py-1 rounded-md bg-neutral-900/50 text-neutral-400 transition-colors duration-200 group-hover:text-neutral-300 ring-1 ring-neutral-800/30">
                                {displayLanguage}
                            </span>
                        </div>

                        {/* Botão de copiar com animação suave */}
                        <motion.button
                            onClick={handleCopy}
                            className="text-neutral-500 hover:text-neutral-300 text-sm transition-all duration-200 px-2 py-1 rounded-md hover:bg-neutral-800/30 cursor-pointer"
                            whileTap={{ scale: 0.97 }}
                            animate={{ opacity: isHovered || copied ? 1 : 0.7 }}
                        >
                            {copied ? (
                                <span className="flex items-center text-green-400">
                                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Copiado!
                                </span>
                            ) : (
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    Copiar
                                </span>
                            )}
                        </motion.button>
                    </div>

                    {/* Área do código com scroll suave e padding responsivo */}
                    <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent hover:scrollbar-thumb-neutral-600 transition-colors duration-200">
                        <div className="p-2 sm:p-4 min-w-full">
                            <Highlight
                                theme={themes.nightOwl}
                                code={content}
                                language={language.toLowerCase()}
                            >
                                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                                    <pre className={`${className} text-sm sm:text-base font-mono`} style={{ ...style, background: 'transparent' }}>
                                        {tokens.map((line, i) => (
                                            <div key={i} {...getLineProps({ line })} className="table-row hover:bg-neutral-800/20 transition-colors duration-150">
                                                <span className="table-cell text-right pr-4 select-none text-neutral-600 text-xs sm:text-sm w-[2.5em] sm:w-[3em]">
                                                    {i + 1}
                                                </span>
                                                <span className="table-cell pl-4 border-l border-neutral-800/20">
                                                    <span className="inline-block min-w-full">
                                                        {line.map((token, key) => (
                                                            <span key={key} {...getTokenProps({ token })} />
                                                        ))}
                                                    </span>
                                                </span>
                                            </div>
                                        ))}
                                    </pre>
                                )}
                            </Highlight>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
} 