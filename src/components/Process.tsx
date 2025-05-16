'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

export default function Process() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    // Estado para controlar a etapa atual do processo
    const [currentStep, setCurrentStep] = useState(0);
    const steps = [
        {
            title: "Descobrir",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            )
        },
        {
            title: "Mão na Massa",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                </svg>
            )
        },
        {
            title: "Mensurar Resultados",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
            )
        }
    ];

    // Efeito para alternar entre as etapas automaticamente
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % steps.length);
        }, 3000); // Muda a cada 3 segundos

        return () => clearInterval(intervalId);
    }, [steps.length]);

    // Configuração do efeito de scroll
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    // Dados das etapas do processo
    const processSteps = [
        {
            number: 1,
            title: "Descobrir",
            description: "Investigo o contexto de negócio, os requisitos técnicos e as necessidades reais dos usuários. Entrevistas, análise de dados e validações iniciais orientam as decisões de projeto.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            )
        },
        {
            number: 2,
            title: "Mão na Massa",
            description: "Transformo os insights em protótipos funcionais e código em produção desde as primeiras sprints. Integro serviços de IA, APIs e arquitetura escalável para validar o produto rapidamente.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                </svg>
            )
        },
        {
            number: 3,
            title: "Mensurar Resultados",
            description: "Acompanho métricas de performance, comportamento de uso e testes de impacto. Esses dados alimentam ciclos de melhoria contínua até que a solução atinja (ou supere) as metas estabelecidas.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
            )
        }
    ];

    return (
        <section
            id="process"
            ref={sectionRef}
            className="relative py-24 md:py-32 overflow-hidden"
        >
            {/* Fundo e efeitos decorativos */}
            <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-75"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-[#3d43dd]/5 to-neutral-950 opacity-80"></div>

            {/* Luzes e efeitos no fundo - semelhante aos outros componentes */}
            <div className="absolute top-1/4 -left-24 w-72 h-72 rounded-full bg-[#3d43dd]/10 blur-[80px] opacity-50"></div>
            <div className="absolute bottom-1/3 -right-24 w-72 h-72 rounded-full bg-[#3d43dd]/10 blur-[80px] opacity-50"></div>

            <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8" ref={containerRef}>
                <motion.div
                    style={{ opacity, y }}
                >
                    {/* Tag decorativa - igual às outras seções */}
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
                                Metodologia de Trabalho
                            </span>
                        </div>
                    </motion.div>

                    {/* Título principal com animação - seguindo exatamente o padrão do Projects */}
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
                                Meu{" "}
                                <span className="bg-gradient-to-r from-[#3d43dd] to-[#6366f1] bg-clip-text text-transparent relative inline-block">
                                    Processo
                                    <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3d43dd]/50 to-transparent"></div>
                                </span>
                            </h2>
                        </div>
                    </motion.div>

                    {/* Descrição */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-neutral-400 max-w-2xl mx-auto text-center leading-relaxed mb-16"
                    >
                        Da descoberta à mensuração de resultados, meu método de desenvolvimento é focado em entregar soluções de alto impacto que transformam ideias em produtos excepcionais.
                    </motion.p>

                    {/* Componente de fluxo animado - versão ultra compacta */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex justify-center mb-16 items-center"
                    >
                        <motion.div
                            className="relative h-14 w-auto px-6 rounded-full bg-neutral-900/80 backdrop-blur-xl border border-neutral-800/30 flex items-center justify-between overflow-hidden shadow-lg"
                        >
                            {/* Conteúdo animado - layout compacto */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex items-center gap-3"
                                >
                                    {/* Ícone */}
                                    <motion.div
                                        className="text-[#3d43dd]"
                                        animate={{ rotate: [0, 5, -5, 0] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            {currentStep === 0 && <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />}
                                            {currentStep === 1 && <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />}
                                            {currentStep === 2 && <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />}
                                        </svg>
                                    </motion.div>

                                    {/* Título */}
                                    <motion.h3
                                        className="text-lg font-bold text-white whitespace-nowrap"
                                    >
                                        {steps[currentStep].title}
                                    </motion.h3>
                                </motion.div>
                            </AnimatePresence>

                            {/* Separador */}
                            <div className="mx-4 h-5 w-px bg-neutral-700/50"></div>

                            {/* Dots indicadores */}
                            <div className="flex gap-1.5">
                                {[0, 1, 2].map((idx) => (
                                    <motion.div
                                        key={idx}
                                        className={`h-2 w-2 rounded-full ${idx === currentStep ? 'bg-[#3d43dd]' : 'bg-neutral-600'}`}
                                        animate={{
                                            scale: idx === currentStep ? [1, 1.2, 1] : 1,
                                            opacity: idx === currentStep ? 1 : 0.5
                                        }}
                                        transition={{
                                            duration: 1,
                                            repeat: idx === currentStep ? Infinity : 0,
                                            repeatType: "reverse"
                                        }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Cards com etapas do processo */}
                    <motion.div
                        className="grid md:grid-cols-3 gap-6 md:gap-8 mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={`step-${index}`}
                                className="relative backdrop-blur-sm rounded-2xl overflow-hidden border border-neutral-800/30"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                    duration: 0.5,
                                    delay: 0.2 + (index * 0.1)
                                }}
                            >
                                <div className="bg-neutral-900/50 h-full relative">
                                    {/* Gradiente de fundo */}
                                    <div
                                        className="absolute inset-0 opacity-10"
                                        style={{
                                            background: "radial-gradient(circle at 30% 30%, #3d43dd, transparent 70%)"
                                        }}
                                    ></div>

                                    {/* Padrão decorativo */}
                                    <div className="absolute inset-0 opacity-10 bg-[url('/images/grid-pattern.svg')] bg-repeat"></div>

                                    <div className="p-8 md:p-10 relative z-10 h-full flex flex-col">
                                        {/* Cabeçalho com número e ícone */}
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="min-w-12 h-12 flex items-center justify-center rounded-xl bg-[#3d43dd]/10 border border-[#3d43dd]/30">
                                                <div className="text-[#3d43dd]">
                                                    {step.icon}
                                                </div>
                                            </div>
                                            <div>
                                                <span className="text-sm text-neutral-400 font-medium">Etapa {step.number}</span>
                                                <h3 className="text-2xl font-bold text-white bg-gradient-to-r from-white to-neutral-200 bg-clip-text text-transparent">
                                                    {step.title}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Descrição do processo */}
                                        <p className="text-neutral-300 leading-relaxed text-base md:text-lg flex-grow">
                                            {step.description}
                                        </p>

                                        {/* Indicador visual na parte inferior */}
                                        <div className="h-1 w-20 mt-8 bg-gradient-to-r from-[#3d43dd]/70 to-transparent rounded-full"></div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Frase final em destaque */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-center mb-8"
                    >
                        <div className="relative inline-block max-w-3xl py-6 px-8 md:px-12 rounded-xl bg-gradient-to-b from-neutral-900/40 to-neutral-900/80 backdrop-blur-md border border-neutral-800/30">
                            {/* Indicador de citação */}
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-3xl text-[#3d43dd]">❝</div>

                            <p className="text-lg md:text-xl text-neutral-300 italic">
                                Meu princípio orientador: <span className="text-white font-medium">aprender constantemente</span>,
                                <span className="text-white font-medium"> entregar valor com agilidade</span> e
                                <span className="text-white font-medium"> evoluir a cada release</span>.
                            </p>

                            {/* Linha decorativa abaixo do texto */}
                            <motion.div
                                className="absolute -bottom-1 left-1/2 w-32 h-px bg-gradient-to-r from-[#3d43dd]/0 via-[#3d43dd] to-[#3d43dd]/0 rounded-full transform -translate-x-1/2"
                                initial={{ width: 0, opacity: 0 }}
                                whileInView={{ width: 200, opacity: 0.7 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                            />
                        </div>
                    </motion.div>

                    {/* Botão de ação - Para completar a experiência */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex justify-center mt-8"
                    >
                        <motion.a
                            href="#projects"
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 10px 15px -3px rgba(61, 67, 221, 0.3)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3d43dd] to-[#6366f1] text-white rounded-full font-medium transition-all duration-300"
                        >
                            Ver projetos entregues
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                            </svg>
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
} 