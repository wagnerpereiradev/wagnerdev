'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

type Testimonial = {
    id: number;
    name: string;
    role: string;
    company: string;
    content: string;
    avatar?: string;
    initials: string;
    rating: number;
    color: string;
};

export default function Testimonials() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.05, 0.8, 1], [1, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.05, 0.8, 1], [0, 0, 0, -100]);

    const testimonials: Testimonial[] = [
        {
            id: 1,
            name: "Carla Mendes",
            role: "CEO",
            company: "TechVision",
            content: "Wagner é um desenvolvedor excepcional. Seu trabalho no nosso site aumentou nossa conversão em 45% e proporcionou uma experiência de usuário impecável.",
            initials: "CM",
            rating: 5,
            color: "from-blue-500 to-purple-500"
        },
        {
            id: 2,
            name: "Lucas Oliveira",
            role: "Diretor de Marketing",
            company: "Innova Digital",
            content: "Trabalhamos com o Wagner em diversos projetos e sempre ficamos impressionados com sua capacidade técnica e criatividade. Altamente recomendado!",
            initials: "LO",
            rating: 5,
            color: "from-green-500 to-teal-500"
        },
        {
            id: 3,
            name: "Mariana Costa",
            role: "Empreendedora",
            company: "EcoStart",
            content: "A implementação do nosso sistema por Wagner foi perfeita. Ele entendeu exatamente nossas necessidades e entregou além das expectativas, no prazo e com qualidade.",
            initials: "MC",
            rating: 5,
            color: "from-orange-500 to-pink-500"
        }
    ];

    return (
        <section id="testimonials" className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden" ref={containerRef}>
            {/* Fundo aprimorado com gradientes e efeitos */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-black to-neutral-950">
                    <div className="absolute inset-0 opacity-50 bg-[url('/images/grid-pattern.svg')]"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#3d43dd]/5 via-transparent to-[#3d43dd]/5"></div>

                {/* Linhas decorativas superior e inferior */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3d43dd]/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3d43dd]/20 to-transparent"></div>

                {/* Partículas flutuantes em animação */}
                <motion.div
                    className="absolute left-[10%] top-[15%] w-1 h-1 rounded-full bg-[#3d43dd]/40"
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.4, 0.8, 0.4],
                        scale: [1, 1.5, 1]
                    }}
                    transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                />
                <motion.div
                    className="absolute left-[80%] top-[20%] w-1 h-1 rounded-full bg-[#3d43dd]/40"
                    animate={{
                        y: [0, -15, 0],
                        opacity: [0.4, 0.6, 0.4],
                        scale: [1, 1.3, 1]
                    }}
                    transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", delay: 2 }}
                />
            </div>

            <motion.div
                className="relative z-10 max-w-7xl mx-auto"
                style={{ opacity, y }}
            >
                <div className="text-center mb-16">
                    {/* Tag decorativa */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-center mb-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3d43dd]/10 border border-[#3d43dd]/20 backdrop-blur-sm">
                            <motion.span
                                className="w-2 h-2 rounded-full bg-[#3d43dd]"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                            ></motion.span>
                            <span className="text-sm font-medium bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">
                                Feedback
                            </span>
                        </div>
                    </motion.div>

                    {/* Título principal com animação */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-center mb-8"
                    >
                        <div className="relative inline-block">
                            <motion.div
                                className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-[#3d43dd]/10 blur-xl"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 0.8, 0.5]
                                }}
                                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                            />
                            <motion.div
                                className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-[#3d43dd]/10 blur-xl"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 0.8, 0.5]
                                }}
                                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                            />
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                                <span className="bg-gradient-to-r from-[#3d43dd] to-[#6366f1] bg-clip-text text-transparent">
                                    Vozes
                                </span>
                                {" "}
                                <span className="relative inline-block">
                                    do Impacto
                                    <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3d43dd]/50 to-transparent"></div>
                                </span>
                            </h2>
                        </div>
                    </motion.div>

                    <motion.p
                        className="text-neutral-400 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Experiências reais de parceiros que transformaram suas visões em resultados tangíveis
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="flex items-center mb-4">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-blue-500/30 flex items-center justify-center">
                                    {testimonial.avatar ? (
                                        <Image
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${testimonial.color}`}>
                                            <span className="text-white font-semibold text-sm">{testimonial.initials}</span>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                                    <p className="text-sm text-neutral-400">{testimonial.role} - {testimonial.company}</p>
                                </div>
                            </div>

                            <div className="mb-4 flex">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={i < testimonial.rating ? "text-yellow-400 text-lg" : "text-neutral-600 text-lg"}>★</span>
                                ))}
                            </div>

                            <p className="text-neutral-300 italic">&ldquo;{testimonial.content}&rdquo;</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
} 