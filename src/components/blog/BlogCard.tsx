'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BlogPost } from '@/types/blog';
import { formatDate } from '@/utils/formatDate';

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
        <motion.article
            className="group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <div className="relative h-full">
                {/* Tooltip para headline */}
                {showHeadlineTooltip && (
                    <div
                        className="fixed z-50 px-4 py-2 bg-[rgba(0,0,0,0.9)] backdrop-blur-md text-white text-sm rounded-xl shadow-xl border border-[rgba(64,64,64,0.5)] max-w-xs sm:max-w-sm"
                        style={{
                            left: `${tooltipPosition.x + 10}px`,
                            top: `${tooltipPosition.y - 10}px`,
                            transform: 'translate(0, -100%)'
                        }}
                    >
                        {post.headline}
                    </div>
                )}

                {/* Tooltip para resumo */}
                {showSummaryTooltip && (
                    <div
                        className="fixed z-50 px-4 py-2 bg-[rgba(0,0,0,0.9)] backdrop-blur-md text-white text-sm rounded-xl shadow-xl border border-[rgba(64,64,64,0.5)] max-w-xs sm:max-w-sm"
                        style={{
                            left: `${tooltipPosition.x + 10}px`,
                            top: `${tooltipPosition.y - 10}px`,
                            transform: 'translate(0, -100%)'
                        }}
                    >
                        {post.summary}
                    </div>
                )}

                <Link href={`/blog/${post.slug}`} className="block h-full">
                    <div className="h-full rounded-3xl overflow-hidden bg-[rgba(23,23,23,0.4)] backdrop-blur-sm border border-[rgba(38,38,38,0.5)] hover:border-[rgba(61,67,221,0.3)] transition-all duration-300 hover:shadow-lg hover:shadow-[rgba(61,67,221,0.05)]">
                        {/* Seção da imagem */}
                        <div className="relative aspect-[16/10] overflow-hidden">
                            <div className="absolute inset-0 bg-[rgba(23,23,23,0.5)] backdrop-blur-[2px] group-hover:backdrop-blur-0 transition-all duration-500"></div>
                            <Image
                                src={post.cover_image.url}
                                alt={post.cover_image.alt}
                                width={600}
                                height={338}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                priority={index < 3} // Carregamento prioritário para os primeiros cards
                            />

                            {/* Categoria em posição mais visível */}
                            <div className="absolute top-4 left-4 z-10">
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-[rgba(61,67,221,0.9)] text-white backdrop-blur-sm shadow-sm">
                                    {post.category}
                                </span>
                            </div>

                            {/* Gradiente de sobreposição na imagem */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-[rgba(0,0,0,0.6)] to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500"></div>

                            {/* Apenas autor e data sobre a imagem */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#3d43dd] to-[#6366f1] p-0.5 flex items-center justify-center shadow-md">
                                            <div className="w-full h-full rounded-full overflow-hidden relative">
                                                <Image
                                                    src={avatarUrl}
                                                    alt={post.author.name}
                                                    width={32}
                                                    height={32}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                        <span className="text-xs sm:text-sm text-white font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,1)]">
                                            {post.author.name}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3 text-xs sm:text-sm text-white">
                                        <div className="flex items-center gap-1">
                                            <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,1)]">{formatDate(post.date)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Conteúdo abaixo da imagem */}
                        <div className="p-4 sm:p-6">
                            {/* Headline com tooltip */}
                            <h2
                                className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-[#6366f1] transition-colors duration-300 line-clamp-2"
                                onMouseEnter={handleHeadlineMouseEnter}
                                onMouseMove={handleHeadlineMouseMove}
                                onMouseLeave={handleHeadlineMouseLeave}
                            >
                                {post.headline}
                            </h2>

                            {/* Resumo do post com tooltip */}
                            <p
                                className="text-sm sm:text-base text-neutral-400 line-clamp-2 mb-3"
                                onMouseEnter={handleSummaryMouseEnter}
                                onMouseMove={handleSummaryMouseMove}
                                onMouseLeave={handleSummaryMouseLeave}
                            >
                                {post.summary}
                            </p>

                            {/* Tempo de leitura */}
                            <div className="flex items-center gap-1 mt-2 text-xs sm:text-sm text-neutral-500">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{post.reading_time}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </motion.article>
    );
} 