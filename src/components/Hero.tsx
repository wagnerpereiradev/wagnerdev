'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
    const videoRef = useRef<HTMLIFrameElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, -150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    // Spring for smooth title animation
    const titleSpring = useSpring(0, { stiffness: 70, damping: 15 });
    useEffect(() => {
        titleSpring.set(1);
    }, [titleSpring]);

    return (
        <motion.section
            ref={containerRef}
            className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
            style={{ opacity }}
        >
            {/* Video Background com overlay melhorado */}
            <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
                {/* Overlay com gradiente */}
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/10 to-black z-10"></div>

                {/* Efeito de ruído sutil */}
                <div className="absolute inset-0 opacity-5 mix-blend-overlay bg-[url('/noise-pattern.svg')] z-10"></div>

                {/* Gradiente com a cor principal */}
                <div className="absolute inset-0 bg-[#3d43dd]/10 mix-blend-overlay z-10"></div>

                {/* Vídeo de fundo */}
                <iframe
                    ref={videoRef}
                    src="https://www.youtube.com/embed/Evaf-2l0-QA?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&playlist=Evaf-2l0-QA"
                    title="Background Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    className="absolute w-[300%] h-[300%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{
                        opacity: 0.4,
                        zIndex: 1,
                    }}
                />
            </div>

            {/* Partículas e efeitos decorativos */}
            <div className="absolute inset-0 z-20">
                {/* Partículas superiores */}
                <motion.div
                    className="absolute top-[20%] left-[15%] w-64 h-64 rounded-full bg-[#3d43dd]/5 blur-[80px]"
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />

                {/* Partículas inferiores */}
                <motion.div
                    className="absolute bottom-[15%] right-[20%] w-96 h-96 rounded-full bg-[#3d43dd]/10 blur-[100px]"
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />

                {/* Partícula menor à esquerda */}
                <motion.div
                    className="absolute bottom-[30%] left-[25%] w-32 h-32 rounded-full bg-[#3d43dd]/15 blur-[60px]"
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                        y: [0, -20, 0],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
            </div>

            {/* Linhas decorativas */}
            <div className="absolute inset-0 z-20">
                {/* Linha superior */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3d43dd]/30 to-transparent"></div>

                {/* Linha inferior */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3d43dd]/30 to-transparent"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-30 max-w-5xl mx-auto px-4 flex flex-col items-center">
                {/* Container com backdrop blur */}
                <motion.div
                    className="relative z-30 flex flex-col items-center py-12"
                    style={{ y }}
                >
                    {/* Foto de perfil com efeitos avançados */}
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
                    >
                        {/* Animação de anel externo */}
                        <motion.div
                            className="absolute -inset-3 rounded-full opacity-40"
                            animate={{
                                background: [
                                    "radial-gradient(circle, rgba(61,67,221,0.3) 0%, rgba(61,67,221,0) 70%)",
                                    "radial-gradient(circle, rgba(61,67,221,0.5) 0%, rgba(61,67,221,0) 70%)",
                                    "radial-gradient(circle, rgba(61,67,221,0.3) 0%, rgba(61,67,221,0) 70%)"
                                ]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Container da foto */}
                        <motion.div
                            className="w-40 h-40 lg:w-44 lg:h-44 rounded-full relative overflow-hidden backdrop-blur-sm p-1"
                            animate={{
                                boxShadow: [
                                    "0 0 20px rgba(61, 67, 221, 0.3)",
                                    "0 0 30px rgba(61, 67, 221, 0.6)",
                                    "0 0 20px rgba(61, 67, 221, 0.3)"
                                ],
                                background: [
                                    "linear-gradient(225deg, rgba(61,67,221,0.8) 0%, rgba(61,67,221,0.2) 100%)",
                                    "linear-gradient(225deg, rgba(61,67,221,0.2) 0%, rgba(61,67,221,0.8) 100%)",
                                    "linear-gradient(225deg, rgba(61,67,221,0.8) 0%, rgba(61,67,221,0.2) 100%)"
                                ]
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/10">
                                <Image
                                    src="https://avatars.githubusercontent.com/u/99822078?v=4"
                                    alt="Perfil"
                                    width={176}
                                    height={176}
                                    priority
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Efeito de brilho na imagem */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-tr from-[#3d43dd]/30 via-white/5 to-transparent rounded-full"
                                animate={{
                                    opacity: [0, 0.5, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }}
                            />
                        </motion.div>
                    </motion.div>

                    {/* Subtítulo acima do título principal */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-center mb-4"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3d43dd]/10 backdrop-blur-sm border border-[#3d43dd]/20 text-sm font-medium text-white/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3d43dd] animate-pulse"></span>
                            Desenvolvedor Full Stack
                        </span>
                    </motion.div>

                    {/* Título principal com animações refinadas */}
                    <motion.h1
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-center leading-tight"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.7 }}
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
                            className="bg-clip-text text-transparent bg-gradient-to-r from-[#3d43dd] via-[#6366f1] to-[#818cf8] inline-block relative"
                        >
                            <span className="relative z-10">
                                com elegância
                                <motion.span
                                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#3d43dd]/0 via-[#3d43dd] to-[#3d43dd]/0 rounded-full"
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

                    {/* Tags abaixo do título */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-4 mb-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.7, duration: 1 }}
                    >
                        {[
                            {
                                text: "Web Development", delay: 0, icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 10h-4v4h4z"></path>
                                        <path d="M2 2v20h20V2H2zM5 5h14v4H5V5zm0 10h14v5H5v-5z"></path>
                                    </svg>
                                )
                            },
                            {
                                text: "Inteligência Artificial", delay: 0.2, icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2a8 8 0 1 0 8 8 8 8 0 0 0-8-8Z"></path>
                                        <path d="M12 8v8"></path>
                                        <path d="M8 12h8"></path>
                                        <path d="M2 22 8 8"></path>
                                        <path d="M16 22 8 8"></path>
                                        <path d="m22 8-8 8"></path>
                                    </svg>
                                )
                            },
                            {
                                text: "UI/UX Design", delay: 0.4, icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                        <path d="M12 17h.01"></path>
                                    </svg>
                                )
                            }
                        ].map((item, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{
                                    scale: 1.05,
                                    backgroundColor: "rgba(61, 67, 221, 0.2)"
                                }}
                                transition={{
                                    delay: 1.9 + item.delay,
                                    duration: 0.5,
                                }}
                                className="px-5 py-2.5 rounded-full border border-white/10 bg-black/30 backdrop-blur-md text-white/80 text-sm font-medium inline-flex items-center gap-2"
                            >
                                {item.icon}
                                {item.text}
                            </motion.span>
                        ))}
                    </motion.div>

                    {/* Botão de scroll */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.2, duration: 0.8 }}
                        className="relative"
                    >
                        <motion.div
                            className="absolute -inset-2 rounded-full opacity-70 blur-md"
                            animate={{
                                background: [
                                    "radial-gradient(circle, rgba(61,67,221,0.7) 0%, rgba(61,67,221,0) 70%)",
                                    "radial-gradient(circle, rgba(61,67,221,0.4) 0%, rgba(61,67,221,0) 70%)",
                                    "radial-gradient(circle, rgba(61,67,221,0.7) 0%, rgba(61,67,221,0) 70%)"
                                ]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        />

                        <motion.a
                            href="#profile"
                            className="relative inline-flex items-center justify-center p-4 rounded-full bg-[#3d43dd] text-white shadow-lg z-10"
                            whileHover={{ scale: 1.1 }}
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
                                className="w-6 h-6"
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
        </motion.section>
    );
} 