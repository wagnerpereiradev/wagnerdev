'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';
import dynamic from 'next/dynamic';

// Importando o componente de vídeo dinamicamente para evitar problemas de hidratação
const VideoBackground = dynamic(() => import('./VideoBackground'), {
    ssr: false,  // Importante: Desativa SSR para este componente
    loading: () => null
});

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorVariant, setCursorVariant] = useState("default");
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, -150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const parallaxRotate = useTransform(scrollY, [0, 300], [0, 15]);
    const parallaxScale = useTransform(scrollY, [0, 300], [1, 0.9]);
    const [isMobile, setIsMobile] = useState(false);

    // Spring para animações suaves do título
    const titleSpring = useSpring(0, { stiffness: 70, damping: 15 });
    useEffect(() => {
        titleSpring.set(1);
    }, [titleSpring]);

    // Detectar dispositivo móvel
    useEffect(() => {
        setIsMobile(window.innerWidth < 768);

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Efeito para o cursor personalizado
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    // Variantes para o cursor personalizado
    const cursorVariants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            height: 32,
            width: 32
        },
        hovering: {
            x: mousePosition.x - 24,
            y: mousePosition.y - 24,
            height: 48,
            width: 48,
            backgroundColor: "rgba(61, 67, 221, 0.4)",
            mixBlendMode: "screen" as const
        }
    };

    // Função para alterar o estado do cursor ao passar sobre elementos interativos
    const handleMouseEnter = () => setCursorVariant("hovering");
    const handleMouseLeave = () => setCursorVariant("default");

    // Lista de tecnologias para o carrossel
    const technologies = [
        "JavaScript", "React", "Next.js", "TypeScript",
        "Node.js", "Python", "TailwindCSS",
        "Framer Motion", "Firebase", "AWS", "Docker", "Kotlin", "Java", "PHP"
    ];

    return (
        <motion.section
            ref={containerRef}
            className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
            style={{ opacity }}
        >
            {/* Cursor personalizado */}
            <motion.div
                ref={cursorRef}
                className="fixed top-0 left-0 rounded-full bg-[#3d43dd]/20 backdrop-blur-sm border border-[#3d43dd]/30 z-50 pointer-events-none hidden md:block"
                variants={cursorVariants}
                animate={cursorVariant}
                transition={{
                    type: "spring",
                    damping: 25,
                    stiffness: 300,
                    mass: 0.5
                }}
            />

            {/* Background com vídeo e efeitos avançados */}
            <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
                {/* Overlay com gradiente refinado */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/30 to-black z-10"></div>

                {/* Efeito de ruído avançado */}
                <div className="absolute inset-0 opacity-100 mix-blend-overlay bg-[url('/images/noise-pattern.svg')] z-10"></div>

                {/* Gradiente com a cor principal */}
                <div className="absolute inset-0 bg-[#3d43dd]/15 mix-blend-color-dodge z-10"></div>

                {/* Malha geométrica sutil */}
                <div className="absolute inset-0 opacity-50 bg-[url('/images/grid-pattern.svg')] z-10"></div>

                {/* Vídeo de fundo com componente dinâmico */}
                {!isMobile && <VideoBackground />}

                {/* Camada superior com grão cinemático */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-40 mix-blend-overlay z-15"></div>
            </div>

            {/* Efeitos de partículas e elementos decorativos - reduzindo ainda mais para dispositivos móveis */}
            <div className="absolute inset-0 z-20">
                {/* Uma única partícula principal em dispositivos móveis, duas em desktop */}
                <motion.div
                    className="absolute top-[15%] left-[10%] w-48 h-48 sm:w-72 sm:h-72 rounded-full bg-[#3d43dd]/10 blur-[100px]"
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 6, // Reduzido de 12 para 6
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                />

                <motion.div
                    className="absolute bottom-[10%] right-[25%] w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-[#3d43dd]/10 blur-[100px] hidden md:block"
                    animate={{
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: 5, // Reduzido de 10 para 5
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                />

                {/* Partículas menores flutuantes - reduzidas para apenas uma em dispositivos móveis */}
                <div className="absolute inset-0">
                    {/* Mostrando apenas 1 partícula em dispositivos móveis */}
                    <motion.div
                        className="absolute w-2 h-2 rounded-full bg-[#3d43dd]/50"
                        style={{
                            top: "65%",
                            left: "20%",
                            willChange: "transform, opacity" // Otimização para navegadores
                        }}
                        animate={{
                            y: [0, -15, 0],
                            opacity: [0.3, 0.7, 0.3],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: 0.2,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Estas partículas serão visíveis apenas em desktop */}
                    <motion.div
                        className="absolute w-2 h-2 rounded-full bg-[#3d43dd]/50 hidden md:block"
                        style={{
                            top: "75.22%",
                            left: "14.85%",
                            willChange: "transform, opacity"
                        }}
                        animate={{
                            y: [0, -15, 0],
                            opacity: [0.3, 0.7, 0.3],
                        }}
                        transition={{
                            duration: 2.8,
                            repeat: Infinity,
                            delay: 0.5,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div
                        className="absolute w-2 h-2 rounded-full bg-[#3d43dd]/50 hidden md:block"
                        style={{
                            top: "73.24%",
                            left: "66.22%",
                            willChange: "transform, opacity"
                        }}
                        animate={{
                            y: [0, -15, 0],
                            opacity: [0.3, 0.7, 0.3],
                        }}
                        transition={{
                            duration: 3.2,
                            repeat: Infinity,
                            delay: 1.2,
                            ease: "easeInOut"
                        }}
                    />
                    {/* Removendo completamente partículas adicionais em dispositivos pequenos */}
                </div>
            </div>

            {/* Linhas decorativas simplificadas */}
            <div className="absolute inset-0 z-20">
                {/* Linha superior com animação */}
                <motion.div
                    className="absolute top-0 left-0 right-0 h-px"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <div className="w-full h-full bg-gradient-to-r from-transparent via-[#3d43dd]/40 to-transparent"></div>
                </motion.div>

                {/* Linha inferior com animação */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-px"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                >
                    <div className="w-full h-full bg-gradient-to-r from-transparent via-[#3d43dd]/40 to-transparent"></div>
                </motion.div>

                {/* Removendo linhas laterais em todos os dispositivos para aumentar performance */}
            </div>

            {/* Conteúdo principal aprimorado */}
            <div className="relative z-30 w-full max-w-6xl mx-auto px-4 flex flex-col items-center">
                <motion.div
                    className="relative z-30 flex flex-col items-center pt-28 pb-12 md:py-12"
                    style={{ y }}
                >
                    {/* Foto de perfil com efeitos visuais ultra-aprimorados */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                        }}
                        transition={{
                            duration: 1.5,
                            type: "spring",
                            stiffness: 100
                        }}
                        className="relative mb-10"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            rotate: parallaxRotate,
                            scale: parallaxScale
                        }}
                    >
                        {/* Círculo de energia externa */}
                        <motion.div
                            className="absolute -inset-4 rounded-full"
                            animate={{
                                opacity: [0.3, 0.5, 0.3],
                                background: [
                                    "radial-gradient(circle, rgba(61,67,221,0.4) 0%, rgba(61,67,221,0) 70%)",
                                    "radial-gradient(circle, rgba(61,67,221,0.6) 0%, rgba(61,67,221,0) 70%)",
                                    "radial-gradient(circle, rgba(61,67,221,0.4) 0%, rgba(61,67,221,0) 70%)"
                                ]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Anéis orbitais decorativos */}
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute rounded-full border border-[#3d43dd]/20"
                                style={{
                                    inset: `-${(i + 1) * 8}px`,
                                }}
                                animate={{
                                    rotate: [0, 360],
                                    opacity: [0.1, 0.3, 0.1]
                                }}
                                transition={{
                                    rotate: {
                                        duration: 15 + i * 5,
                                        repeat: Infinity,
                                        ease: "linear"
                                    },
                                    opacity: {
                                        duration: 3,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        ease: "easeInOut"
                                    }
                                }}
                            />
                        ))}

                        {/* Container da foto com efeitos 3D */}
                        <motion.div
                            className="w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 rounded-full relative overflow-hidden backdrop-blur-sm p-1"
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 0 35px rgba(61, 67, 221, 0.7)"
                            }}
                            animate={{
                                boxShadow: [
                                    "0 0 20px rgba(61, 67, 221, 0.3)",
                                    "0 0 35px rgba(61, 67, 221, 0.6)",
                                    "0 0 20px rgba(61, 67, 221, 0.3)"
                                ],
                                background: [
                                    "conic-gradient(from 180deg at 50% 50%, rgba(61,67,221,0.8) 0%, rgba(99,102,241,0.4) 50%, rgba(61,67,221,0.8) 100%)",
                                    "conic-gradient(from 220deg at 50% 50%, rgba(61,67,221,0.8) 0%, rgba(99,102,241,0.4) 50%, rgba(61,67,221,0.8) 100%)",
                                    "conic-gradient(from 360deg at 50% 50%, rgba(61,67,221,0.8) 0%, rgba(99,102,241,0.4) 50%, rgba(61,67,221,0.8) 100%)"
                                ]
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/10">
                                <Image
                                    src="https://avatars.githubusercontent.com/u/99822078?v=4"
                                    alt="Perfil"
                                    width={192}
                                    height={192}
                                    priority
                                    className="w-full h-full object-cover scale-110"
                                />
                            </div>

                            {/* Reflexo na imagem */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-tr from-[#3d43dd]/10 via-white/30 to-transparent rounded-full"
                                animate={{
                                    rotateZ: [0, 180, 360],
                                    opacity: [0, 0.6, 0],
                                }}
                                transition={{
                                    rotateZ: {
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "linear"
                                    },
                                    opacity: {
                                        duration: 4,
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        ease: "easeInOut"
                                    }
                                }}
                            />
                        </motion.div>
                    </motion.div>

                    {/* Subtítulo elevado com animação */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-center mb-4"
                    >
                        <span className="inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#3d43dd]/10 backdrop-blur-sm border border-[#3d43dd]/20 text-xs sm:text-sm font-medium text-white/90 shadow-[0_0_15px_rgba(61,67,221,0.2)]">
                            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3d43dd] opacity-75"></span>
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

                    {/* Título principal com efeito de digitação e gradientes dinâmicos */}
                    <motion.h1
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 sm:mb-8 text-center leading-tight px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.7 }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
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
                            <span className="relative z-10 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#3d43dd] via-[#6366f1] to-[#818cf8] animate-gradient-x">
                                com elegância
                                <motion.span
                                    className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-[#3d43dd]/0 via-[#3d43dd] to-[#3d43dd]/0 rounded-full"
                                    initial={{ width: 0, opacity: 0, left: "50%" }}
                                    animate={{ width: "100%", opacity: 0.7, left: "0%" }}
                                    transition={{ duration: 1, delay: 1.5 }}
                                />
                            </span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.4 }}
                        >
                            <span className="text-white font-light">e inteligência</span>
                        </motion.div>
                    </motion.h1>

                    {/* Carrossel de tecnologias em movimento contínuo */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.7, duration: 1 }}
                        className="w-full max-w-3xl overflow-hidden mb-8 sm:mb-12 px-4"
                    >
                        <motion.div
                            className="flex space-x-4 sm:space-x-8 whitespace-nowrap"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 20,
                                    ease: "linear"
                                }
                            }}
                        >
                            {[...technologies, ...technologies].map((tech, index) => (
                                <motion.span
                                    key={index}
                                    whileHover={{ scale: 1.1, color: "#3d43dd" }}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    className="px-3 py-1.5 sm:px-5 sm:py-2 rounded-full border border-white/10 bg-black/30 backdrop-blur-sm text-white/70 text-xs sm:text-sm font-medium inline-flex items-center gap-2"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#3d43dd]"></span>
                                    {tech}
                                </motion.span>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Botão de scroll sofisticado */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.2, duration: 0.8 }}
                        className="relative"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Efeito de pulso ao redor do botão */}
                        <div className="absolute -inset-3 sm:-inset-4">
                            {[...Array(2)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute inset-0 rounded-full opacity-0"
                                    animate={{
                                        scale: [1, 1.5, 1.8],
                                        opacity: [0, 0.4, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.8,
                                        ease: "easeOut"
                                    }}
                                    style={{
                                        background: "radial-gradient(circle, rgba(61,67,221,0.6) 0%, rgba(61,67,221,0) 70%)"
                                    }}
                                />
                            ))}
                        </div>

                        <motion.a
                            href="#profile"
                            className="relative inline-flex items-center justify-center p-3 sm:p-4 rounded-full bg-gradient-to-br from-[#3d43dd] to-[#6366f1] text-white shadow-lg shadow-[#3d43dd]/30 z-10 border border-white/10"
                            whileHover={{
                                scale: 1.1,
                                boxShadow: "0 0 20px rgba(61, 67, 221, 0.6)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            animate={{
                                y: [0, 8, 0],
                            }}
                            transition={{
                                y: {
                                    repeat: Infinity,
                                    duration: 1.5,
                                    ease: "easeInOut"
                                },
                            }}
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
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Estilos para animações adicionais */}
            <style jsx global>{`
                @media (max-height: 700px) and (max-width: 768px) {
                    .min-h-screen {
                        min-height: 100vh;
                        padding-top: 4rem;
                    }
                }
                
                @keyframes animate-gradient-x {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }
                
                .animate-gradient-x {
                    background-size: 200% 200%;
                    animation: animate-gradient-x 15s ease infinite;
                }
            `}</style>
        </motion.section>
    );
} 