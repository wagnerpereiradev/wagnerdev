'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Ad } from '@/types/ad';

interface AdBannerProps {
    ad: Ad;
    className?: string;
    featured?: boolean;
}

export default function AdBanner({ ad, className = '', featured = false }: AdBannerProps) {
    const [isHovered, setIsHovered] = useState(false);
    const linkRef = useRef<HTMLAnchorElement>(null);
    const [stats, setStats] = useState(ad.stats || { impressions: 0, clicks: 0, conversionRate: 0 });

    // Usar o campo featured do anúncio se fornecido
    const isFeatured = ad.featured !== undefined ? ad.featured : featured;

    // Efeito para contar uma impressão quando o anúncio é renderizado
    useEffect(() => {
        // Aqui você implementaria a lógica real para registrar impressões
        // Neste exemplo, apenas atualizamos o estado local
        setStats(prev => ({
            ...prev,
            impressions: (prev.impressions || 0) + 1
        }));
    }, []);

    // Função para verificar se uma string é um código hexadecimal válido
    function isValidHexColor(hex: string): boolean {
        // Aceita formatos como "FFF", "FFFFFF", "123ABC" sem o #
        return /^([0-9A-F]{3}){1,2}$/i.test(hex);
    }

    // Função para converter hex para rgba
    function hexToRGBA(hex: string, alpha: number): string {
        // Primeiro, garantir que o hex tem o formato RRGGBB sem #
        hex = hex.replace(/^#/, '');

        // Se for um hex curto (3 dígitos), convertê-lo para 6 dígitos
        if (hex.length === 3) {
            hex = hex.split('').map(char => char + char).join('');
        }

        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    // Preparar o tema hexadecimal
    let hexColor = '';
    let buttonStyle = {};
    let glowStyle = {};
    let gradientStyle = {};

    // Verificar se o tema é hexadecimal
    if (typeof ad.theme === 'string') {
        if (ad.theme.startsWith('#') || isValidHexColor(ad.theme)) {
            // É um hexadecimal
            hexColor = ad.theme.startsWith('#') ? ad.theme : `#${ad.theme}`;
            // Gerar estilos para hexadecimal
            const lighterHex = hexToRGBA(hexColor, 0.2); // Mais escuro (menor alpha)
            const darkerHex = hexToRGBA(hexColor, 0.1);  // Mais escuro (menor alpha)

            gradientStyle = {
                background: `linear-gradient(135deg, ${lighterHex}, ${darkerHex})`,
                backgroundColor: 'rgba(0, 0, 0, 0.8)' // Fundo preto com alta opacidade
            };

            buttonStyle = {
                backgroundColor: hexToRGBA(hexColor, 0.9),
                transition: 'all 0.2s ease'
            };

            // Efeito de glow específico para hexadecimal
            if (ad.effects?.glow) {
                glowStyle = {
                    boxShadow: `0 0 15px 2px ${hexToRGBA(hexColor, 0.4)}`
                };
            }
        } else {
            // Tema desconhecido, usar um padrão
            console.warn(`Tema desconhecido: ${ad.theme}, usando hexadecimal #666666 como fallback`);
            hexColor = '#666666';
            const lighterHex = hexToRGBA(hexColor, 0.3);
            const darkerHex = hexToRGBA(hexColor, 0.5);

            gradientStyle = {
                background: `linear-gradient(135deg, ${lighterHex}, ${darkerHex})`,
                backgroundColor: 'rgba(0, 0, 0, 0.8)'
            };

            buttonStyle = {
                backgroundColor: hexToRGBA(hexColor, 0.9),
                transition: 'all 0.2s ease'
            };
        }
    } else {
        // Objeto tema personalizado, converter para hex
        console.warn('Temas com objeto não são mais suportados, usando #666666 como fallback');
        hexColor = '#666666';
        const lighterHex = hexToRGBA(hexColor, 0.3);
        const darkerHex = hexToRGBA(hexColor, 0.5);

        gradientStyle = {
            background: `linear-gradient(135deg, ${lighterHex}, ${darkerHex})`,
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
        };

        buttonStyle = {
            backgroundColor: hexToRGBA(hexColor, 0.9),
            transition: 'all 0.2s ease'
        };
    }

    // Função para clicar no banner inteiro
    const handleBannerClick = () => {
        // Registrar clique
        setStats(prev => ({
            ...prev,
            clicks: (prev.clicks || 0) + 1,
            conversionRate: prev.impressions ? ((prev.clicks || 0) + 1) / prev.impressions * 100 : 0
        }));

        linkRef.current?.click();
    };

    // Determina os efeitos a serem aplicados
    const effects = ad.effects || {};

    // Determina a animação de hover baseada nas configurações
    const getHoverAnimation = () => {
        if (!effects.hover || effects.hover === 'none') return {};

        switch (effects.hover) {
            case 'zoom':
                return { scale: 1.015 };
            case 'flip':
                return { rotateY: 5 };
            case 'slide':
                return { x: 5 };
            default:
                return { scale: 1.005 };
        }
    };

    // Classes para efeitos
    const glowClass = effects.glow ? 'shadow-lg' : '';

    return (
        <div className="relative pt-4 mt-2">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    ...(effects.pulse ? {
                        scale: [1, 1.01, 1],
                        transition: {
                            scale: {
                                repeat: Infinity,
                                duration: 2,
                                ease: "easeInOut"
                            }
                        }
                    } : {})
                }}
                transition={{ duration: 0.3 }}
                className={`rounded-xl overflow-visible relative my-2 group cursor-pointer ${isFeatured ? 'shadow-xl' : ''} ${className} ${glowClass}`}
                style={effects.glow ? glowStyle : undefined}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleBannerClick}
                whileHover={getHoverAnimation()}
                whileTap={{ scale: 0.995 }}
            >
                {/* Container com gradiente sutil */}
                <div
                    className="rounded-2xl overflow-hidden"
                >
                    {/* Container principal - design mais flat */}
                    <div style={gradientStyle} className="backdrop-blur-sm rounded-2xl">
                        {/* Layout para mobile e desktop */}
                        <div className="flex flex-row items-stretch h-full rounded-xl">
                            {/* Imagem do anúncio - container com altura completa */}
                            <div className="w-20 sm:w-24 md:w-36 relative overflow-hidden">
                                <div className="h-full">
                                    <Image
                                        src={ad.imageUrl}
                                        alt={ad.alt}
                                        width={300}
                                        height={300}
                                        className="h-full w-full rounded-l-[14px] object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                        priority
                                    />
                                    {/* Overlay gradiente na imagem */}
                                    <div className="absolute rounded-l-[14px] inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
                                </div>
                            </div>

                            {/* Conteúdo do anúncio com padding adaptativo e flex para centralizar verticalmente */}
                            <div className="flex-1 flex flex-col justify-center p-2 pr-3 sm:p-3 md:py-3 md:pr-4">
                                {/* Tag de promoção e título em linha para mobile */}
                                <div>
                                    <div className="flex items-center mb-0.5 sm:mb-1 gap-2">
                                        <motion.span
                                            className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-wider text-neutral-400 px-1.5 py-0.5 rounded-full bg-neutral-800/50 inline-block"
                                            animate={{ opacity: [0.7, 1, 0.7] }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 2,
                                                ease: "easeInOut"
                                            }}
                                        >
                                            Ad
                                        </motion.span>

                                        {/* Ícone (se fornecido) */}
                                        {ad.icon && (
                                            <span className="text-xs mr-1">{ad.icon}</span>
                                        )}

                                        <h3 className="text-sm sm:text-base md:text-lg font-medium text-white line-clamp-1 group-hover:text-white/90 transition-colors">
                                            {ad.title}
                                        </h3>
                                    </div>
                                    <p className="text-neutral-300 text-[10px] sm:text-xs leading-tight sm:leading-relaxed line-clamp-1 sm:line-clamp-2 group-hover:text-neutral-200 transition-colors">
                                        {ad.description}
                                    </p>

                                    {/* Tags (limitadas a 3) */}
                                    {ad.tags && ad.tags.length > 0 && (
                                        <div className="flex gap-1 mt-1 flex-wrap">
                                            {ad.tags.slice(0, 3).map(tag => (
                                                <span
                                                    key={tag}
                                                    className="text-[8px] px-1.5 py-0.5 bg-white/10 text-white/70 rounded-sm"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Botão CTA */}
                                <div className="mt-1.5 sm:mt-2">
                                    <Link
                                        ref={linkRef}
                                        href={ad.link}
                                        className="inline-block px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs md:text-sm text-white font-medium transition-all"
                                        style={buttonStyle}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <span className="relative z-10 flex items-center gap-1">
                                            {ad.cta}
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Badge de destaque (se for destaque) */}
                {isFeatured && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: -5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 15,
                            delay: 0.2
                        }}
                        className="absolute -top-1 -right-2 z-20"
                    >
                        <div className="relative">
                            {/* Fita de destaque com efeito gradiente premium */}
                            <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 px-3 py-1 rounded-lg rounded-br-none font-semibold text-xs text-black shadow-lg flex items-center gap-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-amber-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                                <span>Destaque</span>
                            </div>

                            {/* Efeito de brilho sutil */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-yellow-300/0 via-yellow-300/70 to-yellow-300/0 rounded-lg opacity-0"
                                animate={{
                                    opacity: [0, 0.5, 0],
                                    left: ["-100%", "100%", "100%"]
                                }}
                                transition={{
                                    duration: 2,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                    repeatDelay: 5
                                }}
                            />

                            {/* Triângulo decorativo */}
                            <div className="absolute top-full right-0 w-0 h-0 
                                border-t-8 border-r-8 
                                border-t-amber-700 border-r-transparent"
                            />
                        </div>
                    </motion.div>
                )}

                {/* Datas de campanha (se fornecidas) */}
                {ad.startDate && ad.endDate && (
                    <div className="absolute top-1 left-1 text-[7px] text-white/60 px-1 py-0.5 bg-black/40 rounded-sm backdrop-blur-sm z-10">
                        {new Date(ad.startDate).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} - {new Date(ad.endDate).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                    </div>
                )}

                {/* Efeito de marca d'água sutil com ID no canto */}
                <div className="absolute bottom-1 right-1.5 text-[8px] text-white/20 pointer-events-none select-none">
                    {ad.id}
                </div>

                {/* Efeito de hover mais sofisticado */}
                <motion.div
                    className="absolute inset-0 pointer-events-none rounded-xl transition-opacity"
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                />
            </motion.div>
        </div>
    );
} 