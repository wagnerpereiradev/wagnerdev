'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useMemo, useCallback } from 'react';
import Image from 'next/image';

type Project = {
    id: number;
    title: string;
    description: string;
    stack: string[];
    stackDetails?: string[];
    repoUrl?: string;
    demoUrl?: string;
    logo?: string;
    features?: string[];
    highlight?: string;
    primaryColor: string;
    category?: string;
    year?: string;
};

export default function Projects() {
    const [activeProject, setActiveProject] = useState<number | null>(null);
    const [filter, setFilter] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.05, 0.8, 1], [1, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.05, 0.8, 1], [0, 0, 0, -100]);

    const projects: Project[] = useMemo(() => [
        {
            id: 1,
            title: 'LajeAI',
            description: 'Agente de IA especializado em cálculos complexos de engenharia para orçamentos precisos de projetos de lajes.',
            stack: ['Next.js', 'OpenAI API', 'Google Maps API', 'MySQL'],
            stackDetails: [
                'Frontend: Next.js',
                'Backend: OpenAI API + Google Maps API',
                'Banco de Dados: MySQL'
            ],
            features: [
                'Cálculos estruturais automatizados',
                'Orçamentos detalhados de materiais',
                'Análise de viabilidade técnica',
                'Recomendações para otimização de recursos'
            ],
            logo: 'https://lajeai.vercel.app/assets/img/laje-ai-icon.svg',
            demoUrl: 'https://lajeai.vercel.app',
            primaryColor: '#FF3102',
            category: 'Inteligência Artificial',
            year: '2025'
        },
        {
            id: 2,
            title: 'ANLIN – Digital Out Of Home',
            description: 'Ecossistema completo para rede de mídia digital em telas físicas (modelo franquia).',
            stack: ['Next.js', 'AWS', 'Electron', 'Kotlin', 'Tizen OS'],
            stackDetails: [
                'Frontend Admin: Next.js',
                'Infraestrutura AWS: S3 (vídeos), Lambda (serverless), API Gateway, Aurora DB',
                'Player Windows: Electron + React (Vite)',
                'Player Android TV: Kotlin / Java',
                'Smart TVs Samsung: Tizen OS com app custom'
            ],
            highlight: 'Automações de conteúdo dinâmico via cloud, sistema de estruturação geolocalizada (estado/cidade/empresa/ponto)',
            logo: 'https://anlin.com.br/wp-content/uploads/2025/04/anlin-logo-vertical-white.png',
            demoUrl: 'https://anlin.vercel.app',
            primaryColor: '#555555',
            category: 'Mídia Digital',
            year: '2025'
        },
        {
            id: 3,
            title: 'Agente do Clima',
            description: 'Agente especialista no GHG Protocol para diagnóstico de pegada de carbono de pessoas físicas e jurídicas.',
            stack: ['PHP', 'OpenAI API', 'MySQL', 'PDF Generator'],
            stackDetails: [
                'PHP',
                'OpenAI API (GPT para diagnósticos personalizados)',
                'MySQL',
                'Biblioteca de geração de PDF'
            ],
            features: [
                'Cálculos complexos de pegada de carbono',
                'Diagnóstico adaptado para PF e PJ',
                'Geração de relatórios detalhados em PDF',
                'Extrato de pegada de carbono personalizado',
                'Recomendações para redução de emissões'
            ],
            logo: 'https://agentedoclima.com/app/assets/img/logo_chat.png',
            demoUrl: 'https://agentedoclima.com',
            primaryColor: '#6352b9',
            category: 'Sustentabilidade',
            year: '2024'
        },
        {
            id: 4,
            title: 'BCI Cursos',
            description: 'Plataforma especializada para Formação de DPO (Data Protection Officer) com conteúdo completo sobre proteção de dados.',
            stack: ['WordPress', 'Elementor', 'WooCommerce', 'Mercado Pago'],
            stackDetails: [
                'WordPress + Elementor',
                'WooCommerce + Integração com Mercado Pago',
                'Plugin de Plataforma de Cursos'
            ],
            features: [
                'Formação especializada para DPOs',
                'Conteúdo completo sobre LGPD',
                'Certificação profissional',
                'Módulos de aprendizado progressivo',
                'Material didático especializado'
            ],
            highlight: 'Especialização de profissionais para atuação na área de proteção de dados em conformidade com a LGPD e regulamentações internacionais.',
            logo: 'https://bcicursos.com.br/wp-content/uploads/2023/09/favicon.png',
            demoUrl: 'https://bcicursos.com.br',
            primaryColor: '#000AFF',
            category: 'Educação',
            year: '2023'
        }
    ], []);

    // Obter categorias únicas para filtros
    const categories = useMemo(() => {
        const uniqueCategories = new Set(projects.map(project => project.category).filter(Boolean) as string[]);
        return Array.from(uniqueCategories);
    }, [projects]);

    // Projetos filtrados
    const filteredProjects = useMemo(() => {
        if (!filter) return projects;
        return projects.filter(project => project.category === filter);
    }, [projects, filter]);

    const toggleProject = useCallback((id: number) => {
        setActiveProject(prev => prev === id ? null : id);
    }, []);

    const handleFilterChange = useCallback((category: string | null) => {
        setFilter(category);
    }, []);

    return (
        <section id="projects" className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Fundo aprimorado com gradientes e efeitos */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-black to-neutral-950">
                    <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('/images/grid-pattern.svg')]"></div>
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
                    className="absolute left-[20%] top-[30%] w-1.5 h-1.5 rounded-full bg-[#3d43dd]/30"
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.3, 0.7, 0.3],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 7, repeat: Infinity, repeatType: "reverse", delay: 1 }}
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
                <motion.div
                    className="absolute left-[85%] top-[60%] w-1.5 h-1.5 rounded-full bg-[#3d43dd]/30"
                    animate={{
                        y: [0, -25, 0],
                        opacity: [0.3, 0.7, 0.3],
                        scale: [1, 1.5, 1]
                    }}
                    transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", delay: 3 }}
                />
                <motion.div
                    className="absolute left-[15%] top-[70%] w-1 h-1 rounded-full bg-[#3d43dd]/40"
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.4, 0.8, 0.4],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", delay: 4 }}
                />
            </div>

            {/* Elementos decorativos com tamanho e animação otimizados */}
            <motion.div
                className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-[#3d43dd]/5 blur-[100px]"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.div
                className="absolute bottom-20 right-[10%] w-96 h-96 rounded-full bg-[#3d43dd]/5 blur-[120px]"
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", delay: 2 }}
            />

            {/* Elementos de luz */}
            <div className="absolute top-1/3 left-0 w-full h-1/3 bg-gradient-to-r from-[#3d43dd]/0 via-[#3d43dd]/5 to-[#3d43dd]/0 blur-3xl pointer-events-none"></div>

            {/* Linhas decorativas verticais */}
            <div className="absolute h-full w-px top-0 left-[20%] opacity-20 bg-gradient-to-b from-transparent via-[#3d43dd]/10 to-transparent"></div>
            <div className="absolute h-full w-px top-0 right-[20%] opacity-20 bg-gradient-to-b from-transparent via-[#3d43dd]/10 to-transparent"></div>

            <div className="max-w-7xl mx-auto relative z-10" ref={containerRef}>
                <motion.div
                    style={{ opacity, y }}
                    className="mb-16"
                >
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
                                Portfólio
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
                                    Projetos
                                </span>
                                {" "}
                                <span className="relative inline-block">
                                    Desenvolvidos
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
                        className="text-lg text-neutral-400 max-w-2xl mx-auto text-center leading-relaxed"
                    >
                        Conheça alguns dos projetos que desenvolvi, combinando tecnologias modernas
                        para criar soluções inovadoras e eficientes para problemas reais.
                    </motion.p>
                </motion.div>

                {/* Filtros de categoria com design refinado */}
                {categories.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-3 mb-16"
                    >
                        <div className="bg-black/20 backdrop-blur-sm p-1.5 rounded-full border border-neutral-800/30 flex flex-wrap justify-center">
                            <motion.button
                                onClick={() => handleFilterChange(null)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden ${!filter
                                    ? 'text-white'
                                    : 'text-neutral-400 hover:text-white'}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {!filter && (
                                    <motion.div
                                        className="absolute inset-0 bg-[#3d43dd] rounded-full -z-10"
                                        layoutId="categoryIndicator"
                                        transition={{ type: "spring", duration: 0.5 }}
                                    />
                                )}
                                Todos
                            </motion.button>
                            {categories.map((category) => (
                                <motion.button
                                    key={category}
                                    onClick={() => handleFilterChange(category)}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden ${filter === category
                                        ? 'text-white'
                                        : 'text-neutral-400 hover:text-white'}`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {filter === category && (
                                        <motion.div
                                            className="absolute inset-0 bg-[#3d43dd] rounded-full -z-10"
                                            layoutId="categoryIndicator"
                                            transition={{ type: "spring", duration: 0.5 }}
                                        />
                                    )}
                                    {category}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}

                <AnimatePresence>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 30 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.1,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                                layout
                                className="group"
                            >
                                <div className="relative bg-neutral-900/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-neutral-800/30 hover:border-neutral-700/50 transition-all duration-500 h-full flex flex-col transform hover:translate-y-[-8px] hover:shadow-2xl hover:shadow-[#3d43dd]/10">
                                    {/* Gradiente de fundo do card com cor principal do projeto */}
                                    <div
                                        className="absolute inset-0 opacity-10 group-hover:opacity-25 transition-opacity duration-500"
                                        style={{
                                            background: `radial-gradient(circle at 30% 30%, ${project.primaryColor}, transparent 70%)`
                                        }}
                                    ></div>

                                    {/* Padrão decorativo */}
                                    <div className="absolute inset-0 opacity-5 mix-blend-overlay bg-[url('/images/grid-pattern.svg')] bg-repeat"></div>

                                    <div className="relative flex flex-col gap-8 p-8 z-10 h-full">
                                        {/* Cabeçalho do projeto com logo e título */}
                                        <div className="flex items-start gap-6">
                                            {/* Logo */}
                                            <motion.div
                                                className="w-16 h-16 md:w-20 md:h-20 relative bg-black/70 rounded-2xl flex items-center justify-center p-3 border border-neutral-800/50 group-hover:border-[#3d43dd]/30 transition-all duration-500 overflow-hidden"
                                                whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0], transition: { duration: 0.5 } }}
                                            >
                                                {project.logo ? (
                                                    <Image
                                                        src={project.logo}
                                                        alt={`${project.title} logo`}
                                                        fill
                                                        className="object-contain p-3"
                                                    />
                                                ) : (
                                                    <div className="text-3xl font-bold" style={{ color: project.primaryColor }}>
                                                        {project.title.charAt(0)}
                                                    </div>
                                                )}

                                                {/* Efeito de brilho no logo */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-1000 rounded-2xl"
                                                    style={{
                                                        backgroundSize: '200% 100%',
                                                        animation: 'shimmer 2s infinite'
                                                    }}
                                                ></div>
                                            </motion.div>

                                            {/* Título e indicadores */}
                                            <div className="flex-1">
                                                <h3 className="text-xl md:text-2xl font-bold mb-2">
                                                    <span className="bg-gradient-to-r from-white to-neutral-200 bg-clip-text text-transparent">
                                                        {project.title}
                                                    </span>
                                                </h3>

                                                {/* Categoria e ano como badges */}
                                                <div className="flex items-center flex-wrap gap-2">
                                                    {project.category && (
                                                        <span
                                                            className="px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5"
                                                            style={{ backgroundColor: `${project.primaryColor}30`, color: project.primaryColor }}
                                                        >
                                                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.primaryColor }}></span>
                                                            {project.category}
                                                        </span>
                                                    )}
                                                    {project.year && (
                                                        <span className="px-3 py-1 bg-neutral-800/50 text-neutral-300 rounded-full text-xs inline-flex items-center gap-1.5">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <circle cx="12" cy="12" r="10"></circle>
                                                                <polyline points="12 6 12 12 16 14"></polyline>
                                                            </svg>
                                                            {project.year}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Descrição */}
                                        <p className="text-neutral-300 text-base leading-relaxed">
                                            {project.description}
                                        </p>

                                        {/* Stack de Tecnologias */}
                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {project.stack.map((tech, idx) => (
                                                <motion.span
                                                    key={tech}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.1 + idx * 0.05 }}
                                                    className="px-3 py-1 bg-black/60 text-neutral-300 rounded-full text-xs border border-neutral-800/50 hover:border-[#3d43dd]/30 hover:bg-[#3d43dd]/5 transition-colors duration-300"
                                                    whileHover={{ scale: 1.05, y: -2 }}
                                                >
                                                    {tech}
                                                </motion.span>
                                            ))}
                                        </div>

                                        {/* Controles e ações */}
                                        <div className="flex items-center justify-between pt-4 border-t border-neutral-800/30">
                                            {/* Botão Ver Detalhes */}
                                            <motion.button
                                                onClick={() => toggleProject(project.id)}
                                                className="text-sm text-neutral-400 flex items-center gap-1.5 hover:text-white transition-colors group/btn"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <span className="relative">
                                                    {activeProject === project.id ? 'Ocultar detalhes' : 'Ver detalhes'}
                                                    <span className="absolute left-0 right-0 bottom-0 h-px bg-neutral-700 scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></span>
                                                </span>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className={`transition-transform duration-300 ${activeProject === project.id ? 'rotate-180' : ''}`}
                                                >
                                                    <polyline points="6 9 12 15 18 9"></polyline>
                                                </svg>
                                            </motion.button>

                                            {/* Links rápidos */}
                                            <div className="flex gap-2">
                                                {project.demoUrl && (
                                                    <motion.a
                                                        href={project.demoUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 rounded-full bg-black/40 border border-neutral-800/50 hover:border-[#3d43dd]/30 hover:bg-[#3d43dd]/5 transition-all duration-300"
                                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        title="Ver demo"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-300">
                                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                            <polyline points="15 3 21 3 21 9"></polyline>
                                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                                        </svg>
                                                    </motion.a>
                                                )}

                                                {project.repoUrl && (
                                                    <motion.a
                                                        href={project.repoUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 rounded-full bg-black/40 border border-neutral-800/50 hover:border-[#3d43dd]/30 hover:bg-[#3d43dd]/5 transition-all duration-300"
                                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        title="Ver código"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-300">
                                                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                                        </svg>
                                                    </motion.a>
                                                )}
                                            </div>
                                        </div>

                                        {/* Detalhes Expandidos com AnimatePresence para transições suaves */}
                                        <AnimatePresence>
                                            {activeProject === project.id && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.4 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div
                                                        className="space-y-6 rounded-2xl p-6 border border-neutral-800/50 mt-6"
                                                        style={{
                                                            background: `linear-gradient(145deg, rgba(0,0,0,0.7), rgba(0,0,0,0.9))`,
                                                            boxShadow: `0 0 30px ${project.primaryColor}15 inset`
                                                        }}
                                                    >
                                                        {/* Linha decorativa no topo */}
                                                        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#3d43dd]/30 to-transparent mb-6"></div>

                                                        {project.stackDetails && (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: 0.1 }}
                                                                className="relative"
                                                            >
                                                                {/* Elemento decorativo */}
                                                                <div className="absolute -left-3 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#3d43dd]/30 to-transparent"></div>

                                                                <h4 className="text-white font-medium mb-4 flex items-center gap-2 pl-2">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                                                                    </svg>
                                                                    <span className="bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">
                                                                        Stack Completo
                                                                    </span>
                                                                </h4>
                                                                <ul className="space-y-2 ml-2 grid grid-cols-1 lg:grid-cols-2 gap-2">
                                                                    {project.stackDetails.map((detail, i) => (
                                                                        <motion.li
                                                                            key={i}
                                                                            className="text-neutral-400 flex items-center gap-2 bg-black/20 p-2 rounded-lg backdrop-blur-sm border border-neutral-800/20"
                                                                            initial={{ opacity: 0, x: -10 }}
                                                                            animate={{ opacity: 1, x: 0 }}
                                                                            transition={{ delay: 0.1 + i * 0.05 }}
                                                                        >
                                                                            <span className="min-w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.primaryColor }}></span>
                                                                            <span className="text-sm">{detail}</span>
                                                                        </motion.li>
                                                                    ))}
                                                                </ul>
                                                            </motion.div>
                                                        )}

                                                        {project.features && (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: 0.2 }}
                                                                className="relative"
                                                            >
                                                                {/* Elemento decorativo */}
                                                                <div className="absolute -left-3 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#3d43dd]/30 to-transparent"></div>

                                                                <h4 className="text-white font-medium mb-4 flex items-center gap-2 pl-2">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                                    </svg>
                                                                    <span className="bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">
                                                                        Funcionalidades
                                                                    </span>
                                                                </h4>
                                                                <ul className="space-y-3 ml-2">
                                                                    {project.features.map((feature, i) => (
                                                                        <motion.li
                                                                            key={i}
                                                                            className="text-neutral-400 flex items-start gap-2"
                                                                            initial={{ opacity: 0, x: -10 }}
                                                                            animate={{ opacity: 1, x: 0 }}
                                                                            transition={{ delay: 0.2 + i * 0.05 }}
                                                                        >
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1" style={{ color: project.primaryColor }}>
                                                                                <polyline points="9 11 12 14 22 4"></polyline>
                                                                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                                                            </svg>
                                                                            <span className="text-sm">{feature}</span>
                                                                        </motion.li>
                                                                    ))}
                                                                </ul>
                                                            </motion.div>
                                                        )}

                                                        {project.highlight && (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: 0.3 }}
                                                                className="relative"
                                                            >
                                                                {/* Elemento decorativo */}
                                                                <div className="absolute -left-3 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#3d43dd]/30 to-transparent"></div>

                                                                <h4 className="text-white font-medium mb-4 flex items-center gap-2 pl-2">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                                                    </svg>
                                                                    <span className="bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">
                                                                        Destaque
                                                                    </span>
                                                                </h4>
                                                                <div className="ml-2">
                                                                    <motion.div
                                                                        className="relative p-4 rounded-lg overflow-hidden"
                                                                        style={{ backgroundColor: `${project.primaryColor}15` }}
                                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                                        animate={{ opacity: 1, scale: 1 }}
                                                                        transition={{ delay: 0.35 }}
                                                                    >
                                                                        {/* Efeito de brilho decorativo */}
                                                                        <div className="absolute top-0 right-0 w-32 h-32 opacity-20"
                                                                            style={{
                                                                                background: `radial-gradient(circle, ${project.primaryColor}80, transparent 70%)`,
                                                                                transform: 'translate(30%, -30%)'
                                                                            }}
                                                                        ></div>

                                                                        <p className="text-neutral-300 text-sm relative z-10">
                                                                            &ldquo;{project.highlight}&rdquo;
                                                                        </p>
                                                                    </motion.div>
                                                                </div>
                                                            </motion.div>
                                                        )}

                                                        {/* Links completos para os botões grandes */}
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.4 }}
                                                            className="flex flex-wrap gap-4 pt-4 justify-center"
                                                        >
                                                            {project.demoUrl && (
                                                                <motion.a
                                                                    href={project.demoUrl}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="relative group/link"
                                                                    whileHover={{ scale: 1.02 }}
                                                                    whileTap={{ scale: 0.98 }}
                                                                >
                                                                    <div className="absolute -inset-2 rounded-full opacity-30 blur-md transition-opacity duration-500 group-hover/link:opacity-50"
                                                                        style={{ background: `linear-gradient(to right, ${project.primaryColor}, ${project.primaryColor}aa)` }}></div>
                                                                    <div className="relative inline-flex items-center gap-2 px-6 py-2 rounded-full text-white text-sm font-medium transition-colors"
                                                                        style={{ backgroundColor: project.primaryColor }}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                                            <polyline points="15 3 21 3 21 9"></polyline>
                                                                            <line x1="10" y1="14" x2="21" y2="3"></line>
                                                                        </svg>
                                                                        Ver Demo Completo
                                                                    </div>
                                                                </motion.a>
                                                            )}

                                                            {project.repoUrl && (
                                                                <motion.a
                                                                    href={project.repoUrl}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex items-center gap-2 px-6 py-2 bg-black/60 text-white rounded-full text-sm font-medium border border-neutral-800/50 hover:border-[#3d43dd]/30 hover:bg-[#3d43dd]/5 transition-all"
                                                                    whileHover={{ scale: 1.02, y: -2 }}
                                                                    whileTap={{ scale: 0.98 }}
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                                                    </svg>
                                                                    Acessar Repositório
                                                                </motion.a>
                                                            )}
                                                        </motion.div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </AnimatePresence>

                {/* Seção de CTA aprimorada */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-24 text-center relative"
                >
                    {/* Elementos decorativos */}
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3d43dd]/20 to-transparent -z-10"></div>
                    <div className="absolute top-1/2 transform -translate-y-1/2 left-0 w-24 h-24 rounded-full bg-[#3d43dd]/5 blur-[80px]"></div>
                    <div className="absolute top-1/2 transform -translate-y-1/2 right-0 w-32 h-32 rounded-full bg-[#3d43dd]/5 blur-[100px]"></div>

                    <div className="relative inline-flex flex-col items-center p-8 md:p-10 rounded-3xl bg-gradient-to-b from-black/60 to-black/80 backdrop-blur-md border border-[#3d43dd]/20 shadow-[0_0_50px_rgba(61,67,221,0.1)]">
                        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10 mix-blend-overlay rounded-3xl"></div>

                        <motion.div
                            className="w-16 h-16 mb-6 relative"
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#3d43dd] to-[#6366f1] opacity-20 blur-xl"></div>
                            <div className="absolute inset-2 rounded-full border-2 border-dashed border-[#3d43dd]/30"></div>
                            <div className="absolute inset-4 rounded-full bg-black flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#3d43dd]">
                                    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                                    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                                </svg>
                            </div>
                        </motion.div>

                        <motion.h3
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            viewport={{ once: true }}
                            className="text-2xl font-medium mb-4 bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent"
                        >
                            Tem um projeto em mente?
                        </motion.h3>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            viewport={{ once: true }}
                            className="text-neutral-400 max-w-2xl mb-8 text-center"
                        >
                            Vamos transformar suas ideias em realidade. Entre em contato para discutirmos
                            seu projeto e encontrar a melhor solução tecnológica para suas necessidades.
                        </motion.p>

                        <motion.a
                            href="#contact"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 }}
                            viewport={{ once: true }}
                            className="relative group inline-block"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#3d43dd] to-[#6366f1] rounded-full blur opacity-30 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative inline-flex items-center gap-2 px-8 py-3 bg-[#3d43dd] rounded-full text-white font-medium transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                                    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                                </svg>
                                Iniciar um projeto
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path>
                                </svg>
                            </div>
                        </motion.a>
                    </div>
                </motion.div>
            </div>

            {/* Estilos para animação do brilho */}
            <style jsx global>{`
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
            `}</style>
        </section>
    );
} 