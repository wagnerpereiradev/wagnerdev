'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';
import dynamic from 'next/dynamic';

// Importando o componente de vídeo dinamicamente para evitar problemas de hidratação
const VideoBackground = dynamic(() => import('./VideoBackground'), {
    ssr: false,  // Importante: Desativa SSR para este componente
    loading: () => null
});

// Lista reduzida de tecnologias para diminuir o DOM
const technologies = [
    "JavaScript", "React", "Next.js", "TypeScript",
    "Node.js", "Python", "TailwindCSS"
];

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, -150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const [isMobile, setIsMobile] = useState(false);
    const [isClient, setIsClient] = useState(false);

    // Detectar lado do cliente
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Detectar dispositivo móvel
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Executar imediatamente
        handleResize();

        // Adicionar apenas após a montagem do componente
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <motion.section
            ref={containerRef}
            className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
            style={{ opacity }}
        >
            {/* Background com vídeo e efeitos */}
            <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
                {/* Overlay com gradiente simplificado */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/30 to-black z-10"></div>

                {/* Efeito de grade e ruído com renderização constante */}
                <div className="absolute inset-0 opacity-50 bg-[url('/images/grid-pattern.svg')] z-10"></div>
                <div className="absolute inset-0 mix-blend-overlay bg-[url('/images/noise-pattern.svg')] z-10"></div>

                {/* Efeito de cor para adicionar consistência entre servidor e cliente */}
                <div className="absolute inset-0 bg-[#3d43dd]/15 mix-blend-color-dodge z-10"></div>

                {/* Background estático para mobile, vídeo apenas para desktop */}
                {isClient && !isMobile && (
                    <Suspense fallback={null}>
                        <VideoBackground />
                    </Suspense>
                )}
            </div>

            {/* Conteúdo principal otimizado */}
            <div className="relative z-30 w-full max-w-6xl mx-auto px-4 flex flex-col items-center">
                <motion.div
                    className="relative z-30 flex flex-col items-center pt-28 pb-12 md:py-12"
                    style={{ y }}
                >
                    {/* Foto de perfil com efeitos simplificados */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                        }}
                        transition={{
                            duration: 0.8,
                            type: "spring",
                            stiffness: 100
                        }}
                        className="relative mb-10"
                    >
                        {/* Container da foto simplificado */}
                        <div className="w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 rounded-full relative overflow-hidden p-1 
                            bg-gradient-to-r from-[#3d43dd]/80 to-[#6366f1]/80">
                            <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/10">
                                <Image
                                    src="https://avatars.githubusercontent.com/u/99822078?v=4"
                                    alt="Perfil"
                                    width={192}
                                    height={192}
                                    priority
                                    className="w-full h-full object-cover"
                                    sizes="(max-width: 768px) 144px, 192px"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Subtítulo */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-center mb-4"
                    >
                        <span className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#3d43dd]/10 backdrop-blur-sm border border-[#3d43dd]/20 text-xs sm:text-sm font-medium text-white/90">
                            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-[#3d43dd]"></span>
                            </span>
                            <TypeAnimation
                                sequence={[
                                    'Desenvolvedor Full Stack',
                                    2000,
                                    'Especialista em Web',
                                    2000,
                                    'UI/UX Designer',
                                    2000,
                                    'Consultor de IA',
                                    2000,
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                                className="font-medium"
                            />
                        </span>
                    </motion.div>

                    {/* Título principal simplificado */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 text-center leading-tight px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="mb-2"
                        >
                            <span className="text-white font-light">Crio soluções digitais</span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.1 }}
                            className="inline-block relative"
                        >
                            <span className="relative z-10 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#3d43dd] via-[#6366f1] to-[#818cf8]">
                                com elegância
                            </span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.4 }}
                        >
                            <span className="text-white font-light">e inteligência</span>
                        </motion.div>
                    </h1>

                    {/* Carrossel de tecnologias simplificado e reduzido */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.7, duration: 0.8 }}
                        className="w-full max-w-3xl overflow-hidden mb-8 sm:mb-12 px-4"
                    >
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                            {technologies.map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full border border-white/10 bg-black/30 backdrop-blur-sm text-white/70 text-xs sm:text-sm font-medium inline-flex items-center gap-2"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#3d43dd]"></span>
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Botão de scroll simplificado */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2, duration: 0.8 }}
                    >
                        <a
                            href="#profile"
                            className="inline-flex items-center justify-center p-3 sm:p-4 rounded-full bg-gradient-to-br from-[#3d43dd] to-[#6366f1] text-white border border-white/10"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                                stroke="currentColor"
                                className="w-5 h-5 sm:w-6 sm:h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                                />
                            </svg>
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
} 