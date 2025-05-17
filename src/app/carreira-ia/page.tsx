'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

// Componentes reutilizáveis
const SectionTitle = ({ number, title }: { number: number; title: string }) => (
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 flex items-center">
        <span className="w-10 h-10 rounded-full bg-[#3d43dd] flex items-center justify-center mr-3 text-sm">
            {number}
        </span>
        {title}
    </h2>
);

export default function EbookPage() {
    const [isHovered, setIsHovered] = useState(false);
    const [countdown, setCountdown] = useState({ hours: 11, minutes: 59, seconds: 59 });
    const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
    const [expandedFaq, setExpandedFaq] = useState(0);

    // Testimonials data
    const testimonials = [
        { name: "Ana Paula", role: "Gerente de Marketing", text: "Produtividade dobrou em 2 semanas" },
        { name: "Marcos Silva", role: "Dev Frontend", text: "Consegui proposta com salário 40% maior" },
        { name: "Carla Mendes", role: "Product Owner", text: "Promovida após aplicar as estratégias" }
    ];

    // FAQ data estendido
    const faqData = [
        {
            question: "Preciso ter conhecimento técnico para aproveitar o treinamento?",
            answer: "Não, o treinamento foi desenvolvido para profissionais de qualquer área, sem necessidade de conhecimento técnico prévio. Explicamos tudo passo a passo, desde os conceitos mais básicos até aplicações avançadas de IA na sua carreira."
        },
        {
            question: "Por quanto tempo terei acesso ao conteúdo?",
            answer: "O acesso é vitalício. Você paga uma vez e tem acesso para sempre, incluindo todas as atualizações futuras do conteúdo. À medida que novas ferramentas e técnicas de IA surgem, atualizamos o treinamento para mantê-lo sempre relevante."
        },
        {
            question: "Como funciona a garantia de 7 dias?",
            answer: "Se você não ficar satisfeito com o treinamento, por qualquer motivo, basta solicitar o reembolso em até 7 dias após a compra e devolveremos 100% do seu investimento, sem perguntas. Nosso objetivo é garantir que você tenha tempo suficiente para avaliar o valor do conteúdo."
        },
        {
            question: "Quais ferramentas de IA o treinamento aborda?",
            answer: "O treinamento cobre as principais ferramentas atuais como ChatGPT, Gemini, Claude, Midjourney, além de ferramentas específicas para produtividade, criação de conteúdo, análise de dados e automação de processos. Mantemos o conteúdo atualizado com as ferramentas mais recentes e relevantes."
        },
        {
            question: "Como recebo o acesso ao treinamento?",
            answer: "Após a confirmação do pagamento, você receberá imediatamente um e-mail com suas credenciais de acesso ao portal exclusivo. Todo o conteúdo estará disponível em uma interface web intuitiva, organizada por módulos, com acesso via computador, tablet ou smartphone."
        },
        {
            question: "O treinamento serve para qualquer área profissional?",
            answer: "Sim! Desenvolvemos o conteúdo para ser aplicável a profissionais de diversas áreas como marketing, TI, RH, finanças, vendas, design, comunicação, entre outras. As técnicas são adaptáveis para diferentes contextos profissionais e necessidades específicas."
        }
    ];

    // Contador regressivo
    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                }
                // Reiniciar o contador quando chegar a zero
                return { hours: 11, minutes: 59, seconds: 59 };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Alternar testimonial a cada 5 segundos
    useEffect(() => {
        const testimonialInterval = setInterval(() => {
            setCurrentTestimonialIndex(prev =>
                prev === testimonials.length - 1 ? 0 : prev + 1
            );
        }, 5000);

        return () => clearInterval(testimonialInterval);
    }, [testimonials.length]);

    return (
        <main className="bg-neutral-950 text-neutral-100 cursor-default">
            <Navbar />

            {/* Hero Section - Above the fold */}
            <section className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
                {/* Background effects - mais intensos */}
                <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-80"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-[#3d43dd]/10 to-neutral-950 opacity-90"></div>

                {/* Decorative lights - mais brilhantes */}
                <div className="absolute top-1/4 -left-24 w-96 h-96 rounded-full bg-[#3d43dd]/20 blur-[100px] opacity-70"></div>
                <div className="absolute bottom-1/3 -right-24 w-96 h-96 rounded-full bg-[#3d43dd]/20 blur-[100px] opacity-70"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#3d43dd]/5 blur-[80px] opacity-50"></div>

                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Flash message / Limited time offer banner */}
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-r from-[#ff5757] to-[#ff9957] py-3 px-5 rounded-lg text-white font-bold text-center mb-12 shadow-lg shadow-[#ff5757]/20"
                    >
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
                            <span className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                OFERTA RELÂMPAGO:
                            </span>
                            <span className="font-medium">50% OFF Apenas nas próximas</span>
                            <div className="flex gap-1 font-mono">
                                <div className="bg-white/20 px-2 py-1 rounded-md text-white">{countdown.hours.toString().padStart(2, '0')}</div>
                                <span>:</span>
                                <div className="bg-white/20 px-2 py-1 rounded-md text-white">{countdown.minutes.toString().padStart(2, '0')}</div>
                                <span>:</span>
                                <div className="bg-white/20 px-2 py-1 rounded-md text-white">{countdown.seconds.toString().padStart(2, '0')}</div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left column - Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="order-2 lg:order-1"
                        >
                            {/* Tag decorativa */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3d43dd]/10 border border-[#3d43dd]/30 backdrop-blur-sm mb-6">
                                <motion.span
                                    className="w-2 h-2 rounded-full bg-[#3d43dd]"
                                    animate={{ scale: [1, 1.5, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                                ></motion.span>
                                <span className="text-sm font-medium bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">
                                    Treinamento Exclusivo • Vagas Limitadas
                                </span>
                            </div>

                            {/* Título principal - mais impactante */}
                            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
                                Domine a IA e <span className="bg-gradient-to-r from-[#3d43dd] to-[#6366f1] bg-clip-text text-transparent">dispare na carreira</span> — começando hoje
                            </h1>

                            {/* Subtítulo - mais persuasivo */}
                            <p className="text-xl text-neutral-300 mb-8 leading-relaxed">
                                <span className="font-semibold text-white">Treinamento 100% prático e sem enrolação</span> para iniciantes, profissionais em transição, executivos e freelancers que querem <span className="underline decoration-[#3d43dd] decoration-2 underline-offset-2">produzir mais, aprender mais rápido e faturar mais</span> usando Inteligência Artificial.
                            </p>

                            {/* Status de inscrições */}
                            <div className="mb-8 bg-neutral-900/50 backdrop-blur-sm border border-neutral-800/50 rounded-lg p-4 flex items-center">
                                <div className="mr-3 relative">
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500 absolute top-0 left-0 animate-ping opacity-75"></div>
                                </div>
                                <div>
                                    <p className="text-white font-medium">Inscrições Abertas</p>
                                    <p className="text-neutral-400 text-sm">Apenas 23 vagas restantes neste lote</p>
                                </div>
                            </div>

                            {/* CTA Button - mais chamativo */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="mb-6"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                    className="w-full sm:w-auto px-10 py-6 bg-gradient-to-r from-[#3d43dd] to-[#6366f1] text-white rounded-xl text-xl font-bold shadow-lg shadow-[#3d43dd]/30 hover:shadow-xl hover:shadow-[#3d43dd]/50 transition-all duration-300 relative overflow-hidden"
                                >
                                    {/* Animated gradient background */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-[#4a4edf] to-[#7679f3] opacity-0"
                                        animate={{ opacity: isHovered ? 1 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    />

                                    {/* Button content */}
                                    <span className="relative z-10 flex items-center justify-center">
                                        GARANTIR MEU ACESSO AGORA
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                </motion.button>
                            </motion.div>

                            {/* Trust badges */}
                            <div className="flex flex-wrap gap-4 mb-6">
                                <div className="flex items-center text-neutral-400 text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-[#3d43dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    Pagamento 100% Seguro
                                </div>
                                <div className="flex items-center text-neutral-400 text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-[#3d43dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                                    </svg>
                                    Garantia de 7 Dias
                                </div>
                                <div className="flex items-center text-neutral-400 text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-[#3d43dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Acesso Imediato
                                </div>
                            </div>

                            {/* Testimonial slider - prova social */}
                            <div className="bg-neutral-900/40 backdrop-blur-sm p-4 rounded-lg border border-neutral-800/40">
                                <div className="overflow-hidden relative">
                                    <div className="flex items-center">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={currentTestimonialIndex}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ duration: 0.5 }}
                                                className="flex-shrink-0 w-full flex items-start gap-3"
                                            >
                                                <div className="flex-shrink-0">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#3d43dd]/60 to-[#6366f1]/60 flex items-center justify-center text-white font-bold">
                                                        {testimonials[currentTestimonialIndex].name.charAt(0)}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex text-yellow-400 mb-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                    <p className="text-white font-medium">&quot;{testimonials[currentTestimonialIndex].text}&quot;</p>
                                                    <div className="text-sm text-neutral-400 mt-1">
                                                        {testimonials[currentTestimonialIndex].name}, {testimonials[currentTestimonialIndex].role}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right column - Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="order-1 lg:order-2 flex justify-center"
                        >
                            <div className="relative w-full max-w-md rounded-xl shadow-2xl shadow-[#3d43dd]/30 overflow-hidden transform hover:rotate-2 hover:scale-105 transition-transform duration-500">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>

                                {/* Brilho ao redor da imagem */}
                                <div className="absolute inset-0 border-2 border-[#3d43dd]/50 rounded-xl z-0"></div>
                                <div className="absolute -inset-0.5 bg-[#3d43dd]/20 rounded-xl blur-md z-0"></div>

                                <Image
                                    src="/images/ebook-carreira-5-0.png"
                                    alt="Capa do Treinamento Carreira 5.0"
                                    width={500}
                                    height={700}
                                    className="w-full h-auto object-cover relative z-[1]"
                                    priority
                                />

                                {/* Badge de promoção */}
                                <div className="absolute top-5 right-5 z-20 bg-[#ff5757] text-white font-bold px-4 py-2 rounded-full transform rotate-12 shadow-lg">
                                    50% OFF
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                                        <span className="text-sm font-medium text-green-300">Inscrições Abertas</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Carreira 5.0</h3>
                                    <p className="text-sm text-neutral-300">Alavanque sua Carreira com IA</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </motion.div>
            </section>

            {/* Seção de social proof - redesenhada sem logos */}
            <section className="py-10 relative bg-neutral-900/60">
                <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#3d43dd]/5 to-transparent opacity-30"></div>

                <div className="max-w-6xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="py-3"
                    >
                        <h3 className="text-lg text-center text-neutral-400 uppercase tracking-wider font-medium mb-8">
                            <span className="bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                                Transformando carreiras em diversos setores
                            </span>
                        </h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                {
                                    area: "Marketing & Vendas",
                                    profissoes: "Marketing, Vendas, Growth, Social Media",
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                        </svg>
                                    ),
                                    stat: "+43%"
                                },
                                {
                                    area: "Tecnologia",
                                    profissoes: "Desenvolvedores, UX, Produto, DevOps",
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                        </svg>
                                    ),
                                    stat: "+51%"
                                },
                                {
                                    area: "Negócios",
                                    profissoes: "Gestores, Analistas, RH, Financeiro",
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    ),
                                    stat: "+38%"
                                },
                                {
                                    area: "Criativo",
                                    profissoes: "Design, Conteúdo, Mídia, Educação",
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    ),
                                    stat: "+47%"
                                }
                            ].map((category, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: 0.1 * i }}
                                    className="bg-neutral-900/50 border border-neutral-800/40 rounded-xl p-4 hover:border-[#3d43dd]/30 transition-all duration-300"
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-lg bg-[#3d43dd]/20 flex items-center justify-center text-[#3d43dd]">
                                            {category.icon}
                                        </div>
                                        <div className="text-white font-semibold">{category.area}</div>
                                    </div>
                                    <p className="text-neutral-400 text-sm mb-3">{category.profissoes}</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[#3d43dd] font-bold">{category.stat}</span>
                                        <span className="text-neutral-500 text-xs">aumento de produtividade</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-neutral-300 text-sm">
                                Mais de <span className="text-white font-bold">1.300+ profissionais</span> já transformaram suas carreiras com nosso treinamento
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Seção 1 - O Problema */}
            <section className="py-24 relative bg-neutral-950">
                <div className="absolute inset-0 bg-gradient-to-b from-[#3d43dd]/10 to-transparent opacity-40"></div>

                {/* Padrão de pontos decorativo */}
                <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-10"></div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 backdrop-blur-sm p-8 sm:p-12 rounded-2xl border border-neutral-800/50 shadow-2xl"
                    >
                        <SectionTitle number={1} title="O Problema" />

                        <div className="mb-10">
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="text-3xl font-bold text-white mb-4"
                            >
                                A IA está criando <span className="text-[#3d43dd]">duas classes de profissionais</span>
                            </motion.h3>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="text-xl text-neutral-300 mb-8"
                            >
                                Os que <span className="text-white font-semibold">dominam a tecnologia</span> e os que serão <span className="text-red-400 font-semibold">substituídos</span> por ela.
                                Em qual grupo você quer estar?
                            </motion.p>
                        </div>

                        <h3 className="text-2xl font-semibold text-white mb-8">Você sente que...</h3>

                        <div className="space-y-6 mb-10">
                            {[
                                {
                                    question: 'O dia acaba e sua lista de tarefas continua enorme?',
                                    explanation: 'Enquanto isso, colegas que usam IA entregam o dobro em metade do tempo'
                                },
                                {
                                    question: 'O LinkedIn parece uma feira onde só quem "faz barulho" ganha visibilidade?',
                                    explanation: 'A IA pode transformar qualquer profissional em criador de conteúdo de alto impacto'
                                },
                                {
                                    question: 'A cada nova tecnologia surgem mil jargões e você não sabe por onde começar?',
                                    explanation: 'O ritmo das mudanças acelera e quem não se adapta fica para trás'
                                },
                                {
                                    question: 'Entrevistas viraram campo minado e seu currículo nunca passa dos robôs de triagem?',
                                    explanation: 'Os processos seletivos agora são otimizados por algoritmos que identificam palavras-chave'
                                }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                    className="bg-gradient-to-r from-neutral-900/70 to-neutral-900/40 p-6 rounded-xl border border-neutral-800/30 hover:border-[#3d43dd]/20 transition-all duration-300 shadow-lg"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-[#3d43dd]/20 flex items-center justify-center flex-shrink-0 mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#3d43dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-white text-lg font-semibold mb-2">
                                                {item.question}
                                            </p>
                                            <div className="flex items-center">
                                                <div className="h-px w-10 bg-[#3d43dd]/30 mr-3"></div>
                                                <p className="text-neutral-400">
                                                    {item.explanation}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="bg-gradient-to-r from-[#3d43dd]/20 to-[#3d43dd]/5 p-8 rounded-xl border border-[#3d43dd]/30 shadow-lg"
                        >
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="w-20 h-20 rounded-full bg-[#3d43dd]/20 flex items-center justify-center flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#3d43dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-2xl font-bold text-white mb-2">A boa notícia:</h4>
                                    <p className="text-xl text-white leading-relaxed">
                                        A IA resolve tudo isso — <span className="text-[#3d43dd] font-bold">se você souber usar</span>. Aqui você aprende como dominar essa tecnologia antes que seja tarde demais.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Estatística impactante */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="mt-10 border-t border-neutral-800/50 pt-8"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-neutral-900/40 backdrop-blur-sm p-5 rounded-xl text-center">
                                    <div className="text-3xl font-bold text-white mb-2">65%</div>
                                    <p className="text-neutral-400">dos líderes de RH esperam impacto positivo da IA em até 2 anos</p>
                                </div>
                                <div className="bg-neutral-900/40 backdrop-blur-sm p-5 rounded-xl text-center">
                                    <div className="text-3xl font-bold text-white mb-2">3x</div>
                                    <p className="text-neutral-400">mais produtividade para quem domina ferramentas de IA no dia a dia</p>
                                </div>
                                <div className="bg-neutral-900/40 backdrop-blur-sm p-5 rounded-xl text-center">
                                    <div className="text-3xl font-bold text-white mb-2">52%</div>
                                    <p className="text-neutral-400">das empresas já priorizam candidatos com habilidades em IA</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Seção 2 - A Solução */}
            <section className="py-24 relative overflow-hidden">
                {/* Efeito de fundo */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3d43dd]/10 to-transparent opacity-40"></div>
                <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#3d43dd]/10 blur-[80px] opacity-60"></div>
                <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#3d43dd]/10 blur-[80px] opacity-60"></div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="bg-gradient-to-br from-neutral-900/90 to-[#3d43dd]/5 backdrop-blur-sm p-8 sm:p-12 rounded-2xl border border-neutral-800/60 shadow-2xl"
                    >
                        <SectionTitle number={2} title="A Solução" />

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bg-neutral-900/60 border border-neutral-800/50 rounded-xl p-6 mb-12"
                        >
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                Apresentando o <span className="bg-gradient-to-r from-[#3d43dd] to-[#6366f1] bg-clip-text text-transparent">Carreira 5.0</span>
                            </h3>
                            <p className="text-xl text-neutral-300">
                                O primeiro sistema completo que transforma qualquer profissional em um especialista em usar IA para avançar na carreira — mesmo com zero conhecimento técnico.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="relative"
                            >
                                <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#3d43dd]/10 rounded-full blur-3xl"></div>
                                <div className="relative bg-gradient-to-br from-[#3d43dd]/20 to-neutral-900/90 p-8 rounded-2xl border border-[#3d43dd]/30 shadow-xl">
                                    <div className="w-16 h-16 rounded-2xl bg-[#3d43dd]/30 flex items-center justify-center mb-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#3d43dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-3">Carreira 5.0:</h3>
                                    <h4 className="text-xl font-semibold bg-gradient-to-r from-[#3d43dd] to-[#6366f1] bg-clip-text text-transparent mb-4">
                                        Alavanque sua Carreira com IA
                                    </h4>
                                    <div className="h-1 w-24 bg-gradient-to-r from-[#3d43dd] to-[#6366f1] rounded-full mb-6"></div>

                                    <p className="text-lg text-neutral-300 mb-6">
                                        O primeiro treinamento focado em aplicações práticas da IA para desenvolvimento profissional e avanço de carreira — com metodologia testada e aprovada.
                                    </p>

                                    <div className="flex items-center gap-3">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-[#3d43dd]/80 to-[#6366f1]/80 flex items-center justify-center text-white text-xs border-2 border-neutral-900">
                                                    {String.fromCharCode(64 + i)}
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-sm text-neutral-400">
                                            <span className="text-white font-medium">+1.300</span> profissionais transformados
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <h3 className="text-2xl font-bold text-white mb-6">
                                    Criado para quem precisa de <span className="text-[#3d43dd]">resultados rápidos</span>
                                </h3>

                                <div className="space-y-6">
                                    {[
                                        {
                                            icon: (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            ),
                                            title: "Formato: página web exclusiva",
                                            description: "Não é um PDF perdido na pasta de downloads ou curso chatíssimo em vídeo. É uma página web privada e interativa com acesso vitalício."
                                        },
                                        {
                                            icon: (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                </svg>
                                            ),
                                            title: "Acesso vitalício + atualizações contínuas",
                                            description: "A IA evolui rápido e nosso conteúdo também. Receba todas as atualizações sem pagar mais por isso."
                                        },
                                        {
                                            icon: (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                                </svg>
                                            ),
                                            title: "Aprenda fazendo",
                                            description: "Zero teoria e 100% prática. Tutoriais passo a passo, checklists clicáveis e prompts prontos para você copiar e colar."
                                        },
                                        {
                                            icon: (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            ),
                                            title: "Comunidade fechada no Discord",
                                            description: "Grupo exclusivo para tirar dúvidas, compartilhar descobertas e fazer networking estratégico com outros profissionais."
                                        }
                                    ].map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: 0.1 * index }}
                                            className="flex items-start gap-4 bg-neutral-900/30 p-4 rounded-xl border border-neutral-800/40 hover:border-[#3d43dd]/30 transition-all duration-300"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-[#3d43dd]/20 flex items-center justify-center flex-shrink-0">
                                                <div className="text-[#3d43dd]">
                                                    {item.icon}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                                                <p className="text-neutral-300">{item.description}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Depoimentos rápidos */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mb-10"
                        >
                            <h3 className="text-xl font-semibold text-white mb-6 text-center">
                                O que nossos alunos estão falando
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    {
                                        name: "Ricardo M.",
                                        role: "Gerente de Projetos",
                                        quote: "Comecei a usar o ChatGPT para planejar reuniões e escrever documentação. Hoje economizo 2h por dia!"
                                    },
                                    {
                                        name: "Juliana S.",
                                        role: "Designer UX",
                                        quote: "Meu portfólio e LinkedIn foram completamente transformados com as dicas do treinamento."
                                    },
                                    {
                                        name: "Eduardo P.",
                                        role: "Desenvolvedor Frontend",
                                        quote: "As técnicas de automação me fizeram entregar projetos em metade do tempo."
                                    }
                                ].map((testimonial, i) => (
                                    <div key={i} className="bg-neutral-900/30 p-5 rounded-xl border border-neutral-800/40">
                                        <div className="flex text-yellow-400 mb-3">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <p className="text-neutral-300 mb-3">&quot;{testimonial.quote}&quot;</p>
                                        <div className="font-medium text-white">{testimonial.name}</div>
                                        <div className="text-sm text-neutral-400">{testimonial.role}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Call to action secundário */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="flex justify-center mt-12"
                        >
                            <motion.a
                                href="#pricing"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="group px-8 py-4 bg-white/5 text-white rounded-xl border border-[#3d43dd]/40 text-lg font-medium hover:bg-[#3d43dd]/20 hover:border-[#3d43dd]/60 transition-all duration-300 flex items-center gap-2"
                            >
                                <span>Quero Garantir Meu Acesso</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#3d43dd] group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Seção 3 - O Que Você Vai Dominar */}
            <section className="py-24 relative">
                {/* Efeitos visuais de fundo */}
                <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-10"></div>
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#3d43dd]/5 to-transparent opacity-30"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#3d43dd]/5 to-transparent opacity-30"></div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 backdrop-blur-sm p-8 sm:p-12 rounded-2xl border border-neutral-800/50 shadow-2xl"
                    >
                        <SectionTitle number={3} title="O Que Você Vai Dominar" />

                        {/* Introdução persuasiva */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="mb-12"
                        >
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                6 pilares para transformar sua carreira com IA
                            </h3>
                            <p className="text-xl text-neutral-300">
                                Um sistema completo para você sair da estagnação profissional e dar um salto quântico na carreira, mesmo sem nenhum conhecimento técnico.
                            </p>
                        </motion.div>

                        {/* Tabela aprimorada e visualmente mais atraente */}
                        <div className="overflow-hidden rounded-xl border border-neutral-800/50 mb-16 shadow-xl">
                            {/* Header */}
                            <div className="grid grid-cols-3 bg-gradient-to-r from-[#3d43dd]/20 to-[#3d43dd]/10 border-b border-neutral-800/50 p-6">
                                <div className="text-white font-bold text-lg">Pilar</div>
                                <div className="text-white font-bold text-lg">O que você recebe</div>
                                <div className="text-white font-bold text-lg">Resultado prático</div>
                            </div>

                            {/* Rows */}
                            {[
                                {
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    ),
                                    pilar: "Produtividade 5.0",
                                    recebe: "Hacks de IA para e-mails, relatórios, código, planilhas + 10 prompts prontos para copiar e colar",
                                    resultado: "+2 horas livres por dia para focar no que realmente importa"
                                },
                                {
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    ),
                                    pilar: "Upskilling Turbo",
                                    recebe: "Sistema de plano de estudo personalizado + tutores de IA para qualquer assunto + checklists de progresso",
                                    resultado: "Novas habilidades aprendidas em semanas, não meses, com feedback constante"
                                },
                                {
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                        </svg>
                                    ),
                                    pilar: "Marca Pessoal",
                                    recebe: "Templates de posts para LinkedIn + roteiro de conteúdo para 90 dias + otimização completa de perfil",
                                    resultado: "Mais visibilidade, autoridade e convites inbound sem precisar ser influencer"
                                },
                                {
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    ),
                                    pilar: "Networking Inteligente",
                                    recebe: "Scripts prontos de mensagens para conexões + coach de conversas e negociações + estratégias de follow-up",
                                    resultado: "Conexões estratégicas de alto valor sem parecer interesseiro ou fake"
                                },
                                {
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    ),
                                    pilar: "Currículo & Entrevista",
                                    recebe: "Modelos ATS-friendly para diferentes níveis + simulador de entrevista com feedback + preparação para case studies",
                                    resultado: "Seu currículo passa nos filtros de IA e você brilha nas entrevistas, com respostas imbatíveis"
                                },
                                {
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    ),
                                    pilar: "Automação No-Code",
                                    recebe: "Workflows Zapier/Make prontos para copiar + integrações com ChatGPT + automação de tarefas repetitivas",
                                    resultado: "Sistema que trabalha por você 24/7, enquanto você foca no que realmente gera valor"
                                }
                            ].map((row, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: 0.05 * index }}
                                    className={`grid grid-cols-3 p-6 ${index % 2 === 0 ? 'bg-neutral-900/40' : 'bg-neutral-900/70'} border-b border-neutral-800/30 hover:bg-neutral-900/90 transition-all duration-300`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-[#3d43dd]/20 flex items-center justify-center flex-shrink-0">
                                            <div className="text-[#3d43dd]">{row.icon}</div>
                                        </div>
                                        <div className="text-white font-semibold">{row.pilar}</div>
                                    </div>
                                    <div className="text-neutral-300">{row.recebe}</div>
                                    <div className="text-[#3d43dd] font-medium">{row.resultado}</div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Benefícios adicionais */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="mb-12"
                        >
                            <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                                <span className="w-8 h-8 rounded-full bg-[#3d43dd]/20 flex items-center justify-center mr-3 text-[#3d43dd]">+</span>
                                Benefícios Exclusivos
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {[
                                    {
                                        title: "Aplicação Imediata",
                                        description: "Veja resultados práticos nos primeiros 7 dias de uso."
                                    },
                                    {
                                        title: "Zero Jargão Técnico",
                                        description: "Linguagem simples mesmo para assuntos complexos."
                                    },
                                    {
                                        title: "Atualização Constante",
                                        description: "Conteúdo sempre renovado com as últimas ferramentas."
                                    },
                                    {
                                        title: "Estudos de Caso Reais",
                                        description: "Exemplos práticos de transformação profissional com IA."
                                    }
                                ].map((benefit, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 15 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: 0.1 * i }}
                                        className="bg-neutral-900/30 p-4 rounded-lg border border-neutral-800/30 flex items-start gap-3"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#3d43dd] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <div>
                                            <h4 className="text-white font-medium">{benefit.title}</h4>
                                            <p className="text-neutral-400">{benefit.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* CTA mais forte */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bg-gradient-to-r from-[#3d43dd]/20 to-transparent p-6 rounded-xl border border-[#3d43dd]/30"
                        >
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Pronto para dar um salto na sua carreira?</h3>
                                    <p className="text-neutral-300">Garanta agora seu acesso com desconto especial.</p>
                                </div>
                                <motion.a
                                    href="#pricing"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-6 py-3 bg-white text-[#3d43dd] rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap"
                                >
                                    Ver Preço Promocional
                                </motion.a>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* O que vem dentro */}
            <section className="py-20 relative overflow-hidden">
                {/* Efeitos visuais de fundo */}
                <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-[#3d43dd]/10 blur-[100px] opacity-40 -z-10"></div>
                <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-[#3d43dd]/10 blur-[80px] opacity-30 -z-10"></div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-br from-neutral-900/70 to-neutral-950/70 backdrop-blur-sm p-10 rounded-2xl border border-neutral-800/50 shadow-2xl relative"
                    >
                        {/* Badge decorativo */}
                        <div className="absolute -top-5 left-10 bg-[#3d43dd] text-white px-4 py-2 rounded-lg shadow-lg">
                            <span className="font-bold">BÔNUS EXCLUSIVOS</span>
                        </div>

                        <div className="pt-5">
                            <h2 className="text-3xl font-bold text-white mb-10 flex items-center">
                                <span className="w-8 h-8 rounded-full bg-[#3d43dd] flex items-center justify-center mr-3 text-sm">4</span>
                                O que mais você recebe
                            </h2>

                            <div className="grid md:grid-cols-2 gap-8 mb-10">
                                <div>
                                    <div className="space-y-6">
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: 0.1 }}
                                            className="flex items-start gap-4 bg-neutral-900/40 p-5 rounded-xl border border-neutral-800/40 hover:border-[#3d43dd]/30 hover:shadow-lg transition-all duration-300"
                                        >
                                            <div className="w-12 h-12 rounded-full bg-[#3d43dd]/20 flex items-center justify-center flex-shrink-0 mt-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3d43dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-white font-semibold text-lg mb-2">+10 seções densas com conteúdo prático</h3>
                                                <p className="text-neutral-300">
                                                    Tutoriais passo a passo, exemplos detalhados e checklists prontos-para-uso que você pode aplicar imediatamente.
                                                </p>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                            className="flex items-start gap-4 bg-neutral-900/40 p-5 rounded-xl border border-neutral-800/40 hover:border-[#3d43dd]/30 hover:shadow-lg transition-all duration-300"
                                        >
                                            <div className="w-12 h-12 rounded-full bg-[#3d43dd]/20 flex items-center justify-center flex-shrink-0 mt-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3d43dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 8l-7 5-7-5M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2h-4" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-white font-semibold text-lg mb-2">+30 modelos de prompts testados</h3>
                                                <p className="text-neutral-300">
                                                    Prompts otimizados para ChatGPT, Gemini e Claude que você pode copiar, colar e adaptar para suas necessidades.
                                                </p>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>

                                <div>
                                    <div className="space-y-6">
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: 0.3 }}
                                            className="flex items-start gap-4 bg-neutral-900/40 p-5 rounded-xl border border-neutral-800/40 hover:border-[#3d43dd]/30 hover:shadow-lg transition-all duration-300"
                                        >
                                            <div className="w-12 h-12 rounded-full bg-[#3d43dd]/20 flex items-center justify-center flex-shrink-0 mt-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3d43dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-white font-semibold text-lg mb-2">Comunidade Premium no Discord</h3>
                                                <p className="text-neutral-300">
                                                    Acesso exclusivo ao grupo fechado para networking, dúvidas e compartilhamento de estratégias avançadas.
                                                </p>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: 0.4 }}
                                            className="flex items-start gap-4 bg-neutral-900/40 p-5 rounded-xl border border-neutral-800/40 hover:border-[#3d43dd]/30 hover:shadow-lg transition-all duration-300"
                                        >
                                            <div className="w-12 h-12 rounded-full bg-[#3d43dd]/20 flex items-center justify-center flex-shrink-0 mt-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3d43dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-white font-semibold text-lg mb-2">Atualizações Vitalícias</h3>
                                                <p className="text-neutral-300">
                                                    As ferramentas mudam constantemente e nosso conteúdo é atualizado mensalmente com as últimas técnicas e estratégias.
                                                </p>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>

                            {/* Formato */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                className="mt-12 pt-10 border-t border-neutral-800/50"
                            >
                                <div className="bg-neutral-900/50 p-6 rounded-xl border border-neutral-800/50">
                                    <div className="flex flex-col md:flex-row items-start gap-6">
                                        <div className="w-16 h-16 rounded-xl bg-[#3d43dd]/20 flex items-center justify-center flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#3d43dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2">Formato Exclusivo</h3>
                                            <p className="text-neutral-300 text-lg">
                                                Acesso via página web privada, responsiva e otimizada para todos os dispositivos. Consulte no celular, tablet ou desktop e comece a aplicar imediatamente após a liberação do acesso.
                                            </p>
                                            <div className="flex gap-4 mt-4">
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#3d43dd] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span className="text-white">Acesso via login seguro</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#3d43dd] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span className="text-white">Acesso imediato</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* CTA secundário */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                className="flex justify-center mt-10"
                            >
                                <motion.a
                                    href="#pricing"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-8 py-4 bg-gradient-to-r from-[#3d43dd]/20 to-[#3d43dd]/10 text-white rounded-xl border border-[#3d43dd]/40 text-lg font-medium hover:bg-[#3d43dd]/20 transition-all duration-300 flex items-center gap-2"
                                >
                                    <span>Quero Todos Estes Benefícios</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#3d43dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                </motion.a>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Conclusão e CTA */}
            <section id="pricing" className="py-24 relative overflow-hidden">
                {/* Efeitos visuais intensificados */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#3d43dd]/10 to-neutral-950/90"></div>
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-neutral-950 to-transparent"></div>
                <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#3d43dd]/10 blur-[100px] opacity-50"></div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Não deixe a IA ser sua <span className="text-red-400">concorrente</span> — <br className="hidden md:block" />
                            faça dela sua <span className="text-[#3d43dd]">vantagem competitiva</span>
                        </h2>

                        <p className="text-xl md:text-2xl text-neutral-300 font-medium leading-relaxed max-w-3xl mx-auto">
                            Se você quer ser o profissional que domina a IA (e não o que perde espaço para ela),
                            <span className="text-white font-semibold"> este treinamento é sua virada de chave.</span>
                        </p>
                    </motion.div>

                    {/* Box Garantia */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="max-w-3xl mx-auto mb-12 bg-neutral-900/50 backdrop-blur-sm p-6 rounded-xl border border-neutral-800/50"
                    >
                        <div className="flex flex-col md:flex-row items-center gap-5">
                            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div className="text-center md:text-left">
                                <h3 className="text-xl font-bold text-white mb-2">Garantia de Satisfação de 7 Dias</h3>
                                <p className="text-neutral-300">
                                    Se você não ficar satisfeito com o treinamento por qualquer motivo, basta solicitar o reembolso em até 7 dias e devolveremos 100% do seu investimento, sem perguntas.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* CTA Box - Aprimorada */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-gradient-to-br from-[#3d43dd]/20 to-[#3d43dd]/5 p-8 md:p-12 rounded-2xl border border-[#3d43dd]/30 shadow-2xl shadow-[#3d43dd]/5 backdrop-blur-sm relative overflow-hidden"
                    >
                        {/* Tag de desconto */}
                        <div className="absolute -right-12 top-10 bg-[#ff5757] text-white px-16 py-2 transform rotate-45 font-bold shadow-lg">
                            50% OFF
                        </div>

                        {/* Badge de vagas limitadas */}
                        <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md text-white text-sm px-3 py-1 rounded-full border border-white/20 flex items-center">
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                            <span>Apenas 23 vagas restantes</span>
                        </div>

                        <div className="text-center mb-10 pt-6">
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                                Alavanque sua carreira agora mesmo
                            </h3>
                            <p className="text-xl text-neutral-300">
                                Acesso imediato após o pagamento
                            </p>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-10">
                            <div className="bg-black/40 backdrop-blur-md px-6 py-5 rounded-xl border border-neutral-800/50 relative">
                                <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">×</div>
                                <div className="text-neutral-400 text-sm mb-1 uppercase tracking-wider">Preço normal</div>
                                <div className="text-neutral-300 text-2xl line-through">R$ 197,00</div>
                                <p className="text-neutral-500 text-sm mt-1">Valor integral</p>
                            </div>

                            <div className="text-4xl text-[#3d43dd]">→</div>

                            <div className="bg-[#3d43dd]/30 px-8 py-6 rounded-xl border-2 border-[#3d43dd]/50 backdrop-blur-sm relative shadow-xl">
                                <div className="absolute -top-3 -left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-md">MELHOR OFERTA</div>
                                <div className="text-[#3d43dd] text-sm mb-1 uppercase tracking-wider font-medium">Oferta por tempo limitado</div>
                                <div className="text-white text-4xl font-bold mb-2">R$ 97,00</div>
                                <p className="text-neutral-300 text-sm">Pagamento único e acesso vitalício</p>
                            </div>
                        </div>

                        {/* Countdown element - Using the same state as the hero countdown */}
                        <div className="mb-8 flex justify-center">
                            <div className="bg-black/40 backdrop-blur-md px-5 py-3 rounded-lg border border-neutral-800/50">
                                <div className="text-neutral-400 text-sm text-center mb-2">Esta oferta expira em:</div>
                                <div className="flex items-center gap-3 justify-center">
                                    <div className="flex flex-col items-center">
                                        <div className="bg-[#3d43dd]/20 text-white font-mono font-bold text-xl px-3 py-1 rounded border border-[#3d43dd]/30">{countdown.hours.toString().padStart(2, '0')}</div>
                                        <span className="text-neutral-400 text-xs mt-1">Horas</span>
                                    </div>
                                    <div className="text-white">:</div>
                                    <div className="flex flex-col items-center">
                                        <div className="bg-[#3d43dd]/20 text-white font-mono font-bold text-xl px-3 py-1 rounded border border-[#3d43dd]/30">{countdown.minutes.toString().padStart(2, '0')}</div>
                                        <span className="text-neutral-400 text-xs mt-1">Minutos</span>
                                    </div>
                                    <div className="text-white">:</div>
                                    <div className="flex flex-col items-center">
                                        <div className="bg-[#3d43dd]/20 text-white font-mono font-bold text-xl px-3 py-1 rounded border border-[#3d43dd]/30">{countdown.seconds.toString().padStart(2, '0')}</div>
                                        <span className="text-neutral-400 text-xs mt-1">Segundos</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA principal */}
                        <div className="flex justify-center mb-8">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="relative group"
                                onClick={() => window.open('https://pay.kiwify.com.br/Y3KSd2r', '_blank')}
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3d43dd] to-[#6366f1] rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-200"></div>
                                <div className="relative px-10 py-6 bg-gradient-to-r from-[#3d43dd] to-[#6366f1] text-white rounded-xl text-xl font-bold shadow-lg shadow-[#3d43dd]/30 flex items-center gap-2">
                                    <span>GARANTIR MEU ACESSO AGORA</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                            </motion.button>
                        </div>

                        {/* Métodos de pagamento e selos de segurança */}
                        <div className="flex flex-col items-center">
                            <div className="flex items-center justify-center flex-wrap gap-4 mb-5">
                                <div className="text-neutral-400 text-sm flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#3d43dd] mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    Pagamento 100% Seguro
                                </div>
                                <div className="text-neutral-400 text-sm flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#3d43dd] mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Acesso Vitalício
                                </div>
                                <div className="text-neutral-400 text-sm flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#3d43dd] mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                                    </svg>
                                    Garantia de 7 Dias
                                </div>
                            </div>

                            <div className="flex justify-center gap-3 opacity-70">
                                <div className="p-2 rounded-md">
                                    <Image src="/images/payment-visa.png" alt="Visa" width={40} height={25} />
                                </div>
                                <div className="p-2 rounded-md">
                                    <Image src="/images/payment-mastercard.png" alt="Mastercard" width={40} height={25} />
                                </div>
                                <div className="p-2 rounded-md">
                                    <Image src="/images/payment-amex.png" alt="American Express" width={40} height={25} />
                                </div>
                                <div className="p-2 rounded-md">
                                    <Image src="/images/payment-pix.png" alt="Pix" width={40} height={25} />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* FAQ - melhorada e interativa */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-16 max-w-4xl mx-auto"
                    >
                        <h3 className="text-2xl font-bold text-white mb-8 text-center">Perguntas Frequentes</h3>

                        <div className="space-y-4">
                            {faqData.map((item, i) => (
                                <motion.div
                                    key={i}
                                    className={`bg-neutral-900/50 rounded-xl border ${expandedFaq === i ? 'border-[#3d43dd]/40' : 'border-neutral-800/40'} overflow-hidden transition-all duration-300`}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: 0.05 * i }}
                                >
                                    <div
                                        className="p-5 cursor-pointer"
                                        onClick={() => setExpandedFaq(expandedFaq === i ? -1 : i)}
                                    >
                                        <div className="flex justify-between items-center">
                                            <h4 className="text-white font-semibold">{item.question}</h4>
                                            <motion.div
                                                animate={{ rotate: expandedFaq === i ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="w-6 h-6 rounded-full bg-[#3d43dd]/20 flex items-center justify-center"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#3d43dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </motion.div>
                                        </div>
                                        <motion.div
                                            initial={false}
                                            animate={{
                                                height: expandedFaq === i ? 'auto' : 0,
                                                opacity: expandedFaq === i ? 1 : 0,
                                                marginTop: expandedFaq === i ? '0.5rem' : 0
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="text-neutral-400">
                                                {item.answer}
                                            </p>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA final após FAQ */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="mt-12 text-center"
                        >
                            <p className="text-xl text-neutral-300 mb-6">
                                Ainda com dúvidas? O melhor investimento que você pode fazer é em você mesmo!
                            </p>
                            <motion.a
                                href="#pricing"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-block px-8 py-4 bg-gradient-to-r from-[#3d43dd] to-[#6366f1] text-white rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                Garantir Meu Acesso Agora
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
} 