'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { getRandomAdByPosition, getAdById } from '@/data/ads';
import AdBanner from './AdBanner';
import { Ad } from '@/types/ad';
import { motion, AnimatePresence } from 'framer-motion';

interface AdContainerProps {
    /** IDs específicos de anúncios para exibir */
    adIds?: string[];
    /** Posição alternativa para buscar anúncios aleatórios se os IDs não forem fornecidos */
    position?: 'in-content' | 'sidebar' | 'footer';
    /** Máximo de anúncios para exibir */
    maxAds?: number;
    /** Classes CSS adicionais */
    className?: string;
    /** Layout em grade para múltiplos anúncios (apenas quando houver 2 ou mais) */
    grid?: boolean;
    /** Duração em segundos para rotação de anúncios */
    rotationInterval?: number;
    /** Mostrar indicadores de navegação */
    showIndicators?: boolean;
    /** Mostrar controles de navegação (setas) */
    showControls?: boolean;
    /** Mostrar contador de tempo */
    showTimer?: boolean;
}

/**
 * Componente aprimorado que exibe anúncios em uma página
 * Inclui rotação automática, controles de navegação, indicadores visuais
 * e animações suaves para uma experiência de usuário premium
 */
export default function AdContainer({
    adIds,
    position = 'in-content',
    maxAds = 2,
    className = '',
    grid = false,
    rotationInterval = 60, // Padrão: 60 segundos (1 minuto)
    showIndicators = true,
    showControls = true,
    showTimer = true
}: AdContainerProps) {
    const [currentAdIndex, setCurrentAdIndex] = useState(0);
    const [ads, setAds] = useState<Ad[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [remainingTime, setRemainingTime] = useState(rotationInterval);
    const [isPaused, setIsPaused] = useState(false);
    const [direction, setDirection] = useState(0); // -1: esquerda, 1: direita
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const countdownRef = useRef<NodeJS.Timeout | null>(null);

    // Buscar anúncios baseado nas props
    useEffect(() => {
        if (!adIds || adIds.length === 0) {
            // Se não houver IDs específicos, buscar um anúncio aleatório por posição
            const randomAd = getRandomAdByPosition(position);
            if (randomAd) {
                setAds([randomAd]);
            }
        } else {
            // Se houver IDs específicos, buscar esses anúncios respeitando duplicatas
            const fetchedAds: Ad[] = [];

            // Processamos cada ID individualmente para preservar duplicatas
            adIds.slice(0, maxAds).forEach(id => {
                const ad = getAdById(id);
                if (ad) {
                    fetchedAds.push(ad);
                }
            });

            setAds(fetchedAds);
        }
        setIsLoaded(true);
    }, [adIds, position, maxAds]);

    // Limpar intervalos
    const clearIntervals = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        if (countdownRef.current) {
            clearInterval(countdownRef.current);
            countdownRef.current = null;
        }
    }, []);

    // Configurar/limpar intervalos para rotação - usando useCallback para evitar recriações desnecessárias
    const setupIntervals = useCallback(() => {
        if (isPaused || ads.length <= 1) return;

        // Limpar intervalos existentes
        clearIntervals();

        // Configurar novo intervalo para alternar anúncios
        intervalRef.current = setInterval(() => {
            setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
            setRemainingTime(rotationInterval);
            setDirection(1);
        }, rotationInterval * 1000);

        // Intervalo para atualizar o contador regressivo
        countdownRef.current = setInterval(() => {
            setRemainingTime(prev => Math.max(0, prev - 1));
        }, 1000);
    }, [isPaused, ads.length, rotationInterval, clearIntervals]);

    // Efeito para rotação automática de anúncios
    useEffect(() => {
        // Resetar o tempo restante quando muda o índice
        setRemainingTime(rotationInterval);

        // Configurar intervalos
        setupIntervals();

        // Limpar intervalos quando o componente for desmontado
        return clearIntervals;
    }, [ads.length, rotationInterval, currentAdIndex, isPaused, setupIntervals, clearIntervals]);

    // Mudar para um anúncio específico
    const handleIndicatorClick = (index: number) => {
        setDirection(index > currentAdIndex ? 1 : -1);
        setCurrentAdIndex(index);
        setRemainingTime(rotationInterval);
    };

    // Controle de navegação: anúncio anterior
    const handlePrev = () => {
        setDirection(-1);
        setCurrentAdIndex((prevIndex) => (prevIndex - 1 + ads.length) % ads.length);
        setRemainingTime(rotationInterval);
    };

    // Controle de navegação: próximo anúncio
    const handleNext = () => {
        setDirection(1);
        setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
        setRemainingTime(rotationInterval);
    };

    // Pausar/retomar rotação automática
    const togglePause = () => {
        setIsPaused(!isPaused);
    };

    // Se não tiver anúncios, não renderizar nada
    if (!isLoaded || ads.length === 0) return null;

    // Se tiver apenas 1 anúncio ou não estiver em modo grid
    if (ads.length === 1 || !grid) {
        // Se tiver múltiplos anúncios, mostrar apenas o atual com base no índice
        const adToShow = ads.length > 1 ? ads[currentAdIndex] : ads[0];

        // Calcular progresso para o timer visual
        const progress = (remainingTime / rotationInterval) * 100;

        return (
            <div className={`relative ${className}`}>
                {/* Animação de transição entre anúncios */}
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={currentAdIndex}
                        initial={{
                            opacity: 0,
                            x: direction * 20
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            transition: {
                                type: 'spring',
                                stiffness: 300,
                                damping: 30
                            }
                        }}
                        exit={{
                            opacity: 0,
                            x: direction * -20,
                            transition: { duration: 0.2 }
                        }}
                    >
                        <AdBanner ad={adToShow} />
                    </motion.div>
                </AnimatePresence>

                {/* Controles de navegação e indicadores apenas para múltiplos anúncios */}
                {ads.length > 1 && (
                    <div className="mt-2">
                        {/* Barra de navegação com todos os controles */}
                        <div className="flex items-center justify-between">
                            {/* Controles de navegação (setas) */}
                            {showControls && (
                                <div className="flex items-center gap-2">
                                    <button
                                        className="p-1.5 text-white/70 hover:text-white bg-black/20 hover:bg-black/30 rounded-full transition-all"
                                        onClick={handlePrev}
                                        aria-label="Anúncio anterior"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m15 18-6-6 6-6" />
                                        </svg>
                                    </button>

                                    <button
                                        className="p-1.5 text-white/70 hover:text-white bg-black/20 hover:bg-black/30 rounded-full transition-all"
                                        onClick={togglePause}
                                        aria-label={isPaused ? "Retomar rotação" : "Pausar rotação"}
                                    >
                                        {isPaused ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polygon points="5 3 19 12 5 21 5 3" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="6" y="4" width="4" height="16" />
                                                <rect x="14" y="4" width="4" height="16" />
                                            </svg>
                                        )}
                                    </button>

                                    <button
                                        className="p-1.5 text-white/70 hover:text-white bg-black/20 hover:bg-black/30 rounded-full transition-all"
                                        onClick={handleNext}
                                        aria-label="Próximo anúncio"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m9 18 6-6-6-6" />
                                        </svg>
                                    </button>
                                </div>
                            )}

                            {/* Indicadores (underscores) */}
                            {showIndicators && (
                                <div className="flex justify-center items-center gap-2 bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                                    {ads.map((_, index) => (
                                        <button
                                            key={index}
                                            className={`h-0.5 transition-all ${index === currentAdIndex
                                                ? 'w-6 bg-white'
                                                : 'w-4 bg-white/40 hover:bg-white/60'
                                                }`}
                                            onClick={() => handleIndicatorClick(index)}
                                            aria-label={`Ver anúncio ${index + 1}`}
                                            aria-current={index === currentAdIndex ? 'true' : 'false'}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Contador visual como spinner elegante */}
                            {showTimer && !isPaused && (
                                <motion.div
                                    className="relative h-7 w-7 flex items-center justify-center"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Círculo de fundo com efeito de blur */}
                                    <div className="absolute inset-0 rounded-full bg-black/20 backdrop-blur-sm"></div>

                                    {/* Círculo de progresso com gradiente */}
                                    <svg className="absolute inset-0" width="28" height="28" viewBox="0 0 28 28">
                                        {/* Círculo base com animação de fade */}
                                        <motion.circle
                                            cx="14"
                                            cy="14"
                                            r="12"
                                            fill="none"
                                            stroke="rgba(255,255,255,0.1)"
                                            strokeWidth="2"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                        />

                                        {/* Círculo de progresso com efeito de gradiente */}
                                        <motion.circle
                                            cx="14"
                                            cy="14"
                                            r="12"
                                            fill="none"
                                            stroke="url(#gradientProgress)"
                                            strokeWidth="2.5"
                                            strokeDasharray={`${2 * Math.PI * 12}`}
                                            strokeDashoffset={`${2 * Math.PI * 12 * (1 - progress / 100)}`}
                                            strokeLinecap="round"
                                            style={{
                                                transition: "stroke-dashoffset 1s linear"
                                            }}
                                            transform="rotate(-90, 14, 14)"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                        />

                                        {/* Definição do gradiente para o progresso */}
                                        <defs>
                                            <linearGradient id="gradientProgress" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                                                <stop offset="100%" stopColor="rgba(255,255,255,0.5)" />
                                            </linearGradient>
                                        </defs>
                                    </svg>

                                    {/* Círculo central pulsante para efeito visual */}
                                    <motion.div
                                        className="h-2 w-2 bg-white rounded-full z-10"
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            opacity: [0.7, 1, 0.7]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                </motion.div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Se tiver mais de 1 anúncio e estiver em modo grid, mostrar todos em grid
    return (
        <div className={`${className}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ads.map(ad => (
                    <motion.div
                        key={ad.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.4,
                            delay: 0.1 * ads.indexOf(ad)
                        }}
                    >
                        <AdBanner ad={ad} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
} 