'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BlogPost } from '@/types/blog';
import { formatDate } from '@/utils/formatDate';
import TagList from '@/components/blog/TagList';

// Cliente-only wrapper para evitar problemas de hidratação
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    return <>{children}</>;
};

interface BlogCardProps {
    post: BlogPost;
    index: number;
}

interface TooltipPosition {
    x: number;
    y: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
    // URL da imagem do autor
    const avatarUrl = post.author.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author.name.replace(/\s+/g, '')}`;

    // Estados para controlar a visibilidade e posição dos tooltips
    const [showHeadlineTooltip, setShowHeadlineTooltip] = useState(false);
    const [showSummaryTooltip, setShowSummaryTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>({ x: 0, y: 0 });

    // Refs para os timers
    const headlineTimerRef = useRef<NodeJS.Timeout | null>(null);
    const summaryTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Limpar timers ao desmontar o componente
    useEffect(() => {
        return () => {
            if (headlineTimerRef.current) clearTimeout(headlineTimerRef.current);
            if (summaryTimerRef.current) clearTimeout(summaryTimerRef.current);
        };
    }, []);

    // Manipuladores de eventos para a headline
    const handleHeadlineMouseEnter = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        setTooltipPosition({ x: clientX, y: clientY });

        headlineTimerRef.current = setTimeout(() => {
            setShowHeadlineTooltip(true);
        }, 2000);
    };

    const handleHeadlineMouseMove = (e: React.MouseEvent) => {
        if (showHeadlineTooltip) {
            const { clientX, clientY } = e;
            setTooltipPosition({ x: clientX, y: clientY });
        }
    };

    const handleHeadlineMouseLeave = () => {
        if (headlineTimerRef.current) {
            clearTimeout(headlineTimerRef.current);
            headlineTimerRef.current = null;
        }
        setShowHeadlineTooltip(false);
    };

    // Manipuladores de eventos para o resumo
    const handleSummaryMouseEnter = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        setTooltipPosition({ x: clientX, y: clientY });

        summaryTimerRef.current = setTimeout(() => {
            setShowSummaryTooltip(true);
        }, 2000);
    };

    const handleSummaryMouseMove = (e: React.MouseEvent) => {
        if (showSummaryTooltip) {
            const { clientX, clientY } = e;
            setTooltipPosition({ x: clientX, y: clientY });
        }
    };

    const handleSummaryMouseLeave = () => {
        if (summaryTimerRef.current) {
            clearTimeout(summaryTimerRef.current);
            summaryTimerRef.current = null;
        }
        setShowSummaryTooltip(false);
    };

    return (
        <ClientOnly>
            <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-900/80 to-neutral-900/60 border border-neutral-800/50 shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#3d43dd]/20 backdrop-blur-sm"
                itemScope
                itemType="https://schema.org/BlogPosting"
            >
                <Link
                    href={`/blog/${post.slug}`}
                    className="absolute inset-0 z-10"
                    aria-label={`Ver post: ${post.headline}`}
                    title={post.headline}
                    itemProp="url"
                >
                    <span className="sr-only">Ler artigo</span>
                </Link>

                {/* Imagem de capa */}
                <div className="relative overflow-hidden h-48 w-full">
                    {post.cover_image.url && (
                        <Image
                            src={post.cover_image.url}
                            alt={post.cover_image.alt || post.headline}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority={index < 6}
                            className="object-cover transition-all duration-500 group-hover:scale-110"
                            itemProp="image"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 z-[1]"></div>

                    {/* Categoria */}
                    <div className="absolute top-3 left-3 z-[2]">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#3d43dd] to-[#6366f1] text-white shadow-md">
                            {post.category}
                        </span>
                    </div>

                    {/* Data de publicação */}
                    <div className="absolute bottom-3 right-3 z-[2]">
                        <time
                            dateTime={post.date}
                            className="text-xs text-neutral-300 bg-black/40 px-2 py-1 rounded-md backdrop-blur-sm"
                            itemProp="datePublished"
                        >
                            {formatDate(post.date)}
                        </time>
                    </div>
                </div>

                {/* Conteúdo */}
                <div className="flex flex-col flex-grow p-5">
                    <h3
                        className="text-xl font-bold mb-2 text-white group-hover:text-[#777bed] transition-colors line-clamp-2"
                        itemProp="headline"
                        onMouseEnter={handleHeadlineMouseEnter}
                        onMouseMove={handleHeadlineMouseMove}
                        onMouseLeave={handleHeadlineMouseLeave}
                    >
                        {post.headline}
                    </h3>

                    <p
                        className="text-sm text-neutral-400 line-clamp-3 mb-4"
                        itemProp="description"
                        onMouseEnter={handleSummaryMouseEnter}
                        onMouseMove={handleSummaryMouseMove}
                        onMouseLeave={handleSummaryMouseLeave}
                    >
                        {post.summary}
                    </p>

                    {/* Informações do autor */}
                    <div className="flex items-center gap-2 mb-4">
                        <div className="relative w-7 h-7 overflow-hidden rounded-full ring-2 ring-[#3d43dd]/30">
                            <Image
                                src={avatarUrl}
                                alt={post.author.name}
                                width={28}
                                height={28}
                                className="object-cover"
                            />
                        </div>
                        <span className="text-xs text-neutral-300">{post.author.name}</span>
                    </div>

                    <div className="mt-auto pt-4 border-t border-neutral-800/50 flex justify-between items-center">
                        {/* Tags */}
                        <div className="relative z-20">
                            <TagList tags={post.tags.slice(0, 3)} variant="small" />
                        </div>

                        {/* Tempo de leitura */}
                        <div className="relative z-20 flex items-center gap-1 text-xs font-medium text-neutral-500">
                            <svg
                                className="w-3.5 h-3.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                            </svg>
                            <span>{post.reading_time}</span>
                        </div>
                    </div>

                    {/* Info oculta do autor para SEO */}
                    <div className="hidden" itemProp="author" itemScope itemType="https://schema.org/Person">
                        <meta itemProp="name" content={post.author.name} />
                        {post.author.profile_url && (
                            <meta itemProp="url" content={post.author.profile_url} />
                        )}
                    </div>
                </div>

                {/* Tooltips */}
                {showHeadlineTooltip && (
                    <div
                        className="fixed z-50 px-4 py-2 bg-black/90 backdrop-blur-md text-white text-sm rounded-xl shadow-xl border border-neutral-700/50 max-w-xs"
                        style={{
                            left: `${tooltipPosition.x + 10}px`,
                            top: `${tooltipPosition.y - 10}px`,
                            transform: 'translate(0, -100%)'
                        }}
                    >
                        {post.headline}
                    </div>
                )}

                {showSummaryTooltip && (
                    <div
                        className="fixed z-50 px-4 py-2 bg-black/90 backdrop-blur-md text-white text-sm rounded-xl shadow-xl border border-neutral-700/50 max-w-xs"
                        style={{
                            left: `${tooltipPosition.x + 10}px`,
                            top: `${tooltipPosition.y - 10}px`,
                            transform: 'translate(0, -100%)'
                        }}
                    >
                        {post.summary}
                    </div>
                )}
            </motion.article>
        </ClientOnly>
    );
} 