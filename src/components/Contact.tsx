'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, useMemo } from 'react';
import Image from 'next/image';

type ContactMethod = {
    id: number;
    name: string;
    value: string;
    icon: React.ReactNode;
    url: string;
    color: string;
    gradient: string;
    hoverGradient: string;
    description?: string;
};

export default function Contact() {
    const containerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [50, 0, 0, -50]);

    const [hoveredItem, setHoveredItem] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<'social' | 'form'>('social');
    const [progress, setProgress] = useState<number>(0);
    const [isOpening, setIsOpening] = useState<boolean>(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const contactInfo = useMemo(() => [
        {
            id: 1,
            name: 'WhatsApp',
            value: '+55 11 94352-7017',
            description: 'Resposta rápida para mensagens de texto, áudio e chamadas de vídeo',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8"
                >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            ),
            url: 'https://wa.me/5511943527017',
            color: '#25D366',
            gradient: 'from-[#25D366]/80 to-[#128C7E]/80',
            hoverGradient: 'from-[#25D366] to-[#128C7E]'
        },
        {
            id: 2,
            name: 'Instagram',
            value: '@wagner.mi6',
            description: 'Acompanhe projetos, snippets de código e atualizações',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8"
                >
                    <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
            url: 'https://instagram.com/wagner.mi6',
            color: '#E1306C',
            gradient: 'from-[#FFD600]/80 via-[#FF7A00]/80 via-[#FF0069]/80 via-[#D300C5]/80 to-[#7638FA]/80',
            hoverGradient: 'from-[#FFD600] via-[#FF7A00] via-[#FF0069] via-[#D300C5] to-[#7638FA]'
        },
        {
            id: 3,
            name: 'LinkedIn',
            value: '/in/owrp',
            description: 'Conecte-se profissionalmente e acompanhe minha trajetória',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8"
                >
                    <path
                        fillRule="evenodd"
                        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
            url: 'https://linkedin.com/in/owrp',
            color: '#0A66C2',
            gradient: 'from-[#0A66C2]/80 to-[#004182]/80',
            hoverGradient: 'from-[#0A66C2] to-[#004182]'
        },
        {
            id: 4,
            name: 'Email',
            value: 'wagnerpereiradev@gmail.com',
            description: 'Comunicação formal para propostas e parcerias',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8"
                >
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
            ),
            url: 'mailto:wagnerpereiradev@gmail.com',
            color: '#6366f1',
            gradient: 'from-[#6366f1]/80 to-[#3d43dd]/80',
            hoverGradient: 'from-[#6366f1] to-[#3d43dd]'
        },
        {
            id: 5,
            name: 'GitHub',
            value: 'wagnerpereiradev',
            description: 'Explore repositórios e contribuições open source',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-8 h-8"
                >
                    <path fillRule="evenodd" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" clipRule="evenodd" />
                </svg>
            ),
            url: 'https://github.com/wagnerpereiradev',
            color: '#333',
            gradient: 'from-[#333]/80 to-[#24292e]/80',
            hoverGradient: 'from-[#333] to-[#24292e]'
        }
    ], []);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (hoveredItem && !isOpening) {
            timer = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(timer);
                        setIsOpening(true);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 30);
        } else if (!hoveredItem) {
            setProgress(0);
            setIsOpening(false);
        }
        return () => clearInterval(timer);
    }, [hoveredItem, isOpening]);

    useEffect(() => {
        if (isOpening && hoveredItem) {
            const item = contactInfo.find(i => i.id === hoveredItem);
            if (item) {
                window.open(item.url, '_blank');
                setIsOpening(false);
                setHoveredItem(null);
                setProgress(0);
            }
        }
    }, [isOpening, hoveredItem, contactInfo]);

    // Form handlers
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.email || !formData.message) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Submit form logic (mock for now)
        setFormStatus('submitting');

        try {
            // Simulating API call with timeout
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Success!
            setFormStatus('success');
            setFormData({ name: '', email: '', message: '' });

            // Reset form after 3 seconds
            setTimeout(() => {
                setFormStatus('idle');
            }, 3000);
        } catch (error) {
            console.error('Error submitting form:', error);
            setFormStatus('error');

            // Reset error state after 3 seconds
            setTimeout(() => {
                setFormStatus('idle');
            }, 3000);
        }
    };

    return (
        <section id="contact" className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Fundo com gradiente refinado */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-black to-neutral-950">
                    <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('/grid-pattern.svg')]"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#3d43dd]/5 via-transparent to-[#3d43dd]/5"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3d43dd]/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3d43dd]/20 to-transparent"></div>
            </div>

            {/* Elementos decorativos */}
            <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-[#3d43dd]/5 blur-[100px] animate-pulse"
                style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-20 right-[10%] w-96 h-96 rounded-full bg-[#3d43dd]/5 blur-[120px] animate-pulse"
                style={{ animationDuration: '10s' }} />

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
                            <span className="w-2 h-2 rounded-full bg-[#3d43dd] animate-pulse"></span>
                            <span className="text-sm font-medium bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">
                                Vamos Conversar
                            </span>
                        </div>
                    </motion.div>

                    {/* Título principal */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-center mb-6"
                    >
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                            <span className="bg-gradient-to-r from-[#3d43dd] to-[#6366f1] bg-clip-text text-transparent">
                                Conecte-se
                            </span>
                            {" "}
                            <span className="relative inline-block">
                                Comigo
                                <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3d43dd]/50 to-transparent"></div>
                            </span>
                        </h2>
                    </motion.div>

                    {/* Descrição */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-neutral-400 max-w-2xl mx-auto text-center leading-relaxed"
                    >
                        Vamos conversar sobre seu projeto? Estou disponível para trabalhos freelance,
                        parcerias ou apenas para trocar ideias sobre tecnologia.
                    </motion.p>
                </motion.div>

                {/* Tabs para escolher entre redes sociais e formulário */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex justify-center mb-12"
                >
                    <div className="inline-flex p-1 bg-neutral-900/50 backdrop-blur-sm rounded-full border border-neutral-800/30">
                        <button
                            onClick={() => setActiveTab('social')}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'social'
                                ? 'bg-[#3d43dd] text-white'
                                : 'text-neutral-400 hover:text-white'
                                }`}
                        >
                            Redes Sociais
                        </button>
                        <button
                            onClick={() => setActiveTab('form')}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'form'
                                ? 'bg-[#3d43dd] text-white'
                                : 'text-neutral-400 hover:text-white'
                                }`}
                        >
                            Formulário
                        </button>
                    </div>
                </motion.div>

                {/* Content Container */}
                <AnimatePresence mode="wait">
                    {/* Redes Sociais */}
                    {activeTab === 'social' && (
                        <motion.div
                            key="social"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto"
                        >
                            {contactInfo.map((item, index) => (
                                <motion.a
                                    key={item.id}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative overflow-hidden rounded-3xl bg-neutral-900/50 backdrop-blur-sm border border-neutral-800/30 hover:border-neutral-700/50 transition-all duration-500"
                                    onMouseEnter={() => setHoveredItem(item.id)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    onMouseMove={handleMouseMove}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        transition: { delay: index * 0.1, duration: 0.5 }
                                    }}
                                    whileHover={{
                                        y: -8,
                                        transition: { duration: 0.3, ease: [0.33, 1, 0.68, 1] }
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {/* Gradiente de fundo */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${hoveredItem === item.id ? item.hoverGradient : item.gradient} opacity-0 group-hover:opacity-10 transition-all duration-500 z-0`}></div>

                                    {/* Conteúdo do card */}
                                    <div className="relative flex flex-col items-center p-8 h-full z-20">
                                        {/* Ícone com efeito de rotação */}
                                        <div className={`text-white bg-gradient-to-br ${item.gradient} p-5 rounded-2xl mb-6 transform transition-all duration-500 group-hover:rotate-6 group-hover:scale-110`}>
                                            {item.icon}
                                        </div>

                                        {/* Nome da rede social */}
                                        <motion.h3
                                            className="text-2xl font-bold mb-2 text-white"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 + index * 0.1 }}
                                        >
                                            {item.name}
                                        </motion.h3>

                                        {/* Valor do contato */}
                                        <motion.p
                                            className="text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300 mb-3"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.4 + index * 0.1 }}
                                        >
                                            {item.value}
                                        </motion.p>

                                        {/* Descrição */}
                                        {item.description && (
                                            <motion.p
                                                className="text-neutral-500 text-sm text-center group-hover:text-neutral-400 transition-colors duration-300"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.5 + index * 0.1 }}
                                            >
                                                {item.description}
                                            </motion.p>
                                        )}

                                        {/* Barra de progresso elegante */}
                                        {hoveredItem === item.id && (
                                            <motion.div
                                                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"
                                                style={{
                                                    width: `${progress}%`,
                                                    left: `${mousePosition.x}px`,
                                                    transform: 'translateX(-50%)',
                                                    transition: 'width 0.03s linear, left 0.1s ease-out'
                                                }}
                                            />
                                        )}
                                    </div>
                                </motion.a>
                            ))}
                        </motion.div>
                    )}

                    {/* Formulário */}
                    {activeTab === 'form' && (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-2xl mx-auto"
                        >
                            <div className="bg-neutral-900/50 backdrop-blur-sm rounded-3xl p-8 border border-neutral-800/30">
                                <motion.form
                                    ref={formRef}
                                    onSubmit={handleFormSubmit}
                                    className="space-y-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-1">
                                                Nome
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-neutral-800/50 rounded-xl border border-neutral-700/50 text-white focus:border-[#3d43dd]/50 focus:ring-1 focus:ring-[#3d43dd]/30 transition-colors"
                                                placeholder="Seu nome completo"
                                                disabled={formStatus === 'submitting'}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-neutral-800/50 rounded-xl border border-neutral-700/50 text-white focus:border-[#3d43dd]/50 focus:ring-1 focus:ring-[#3d43dd]/30 transition-colors"
                                                placeholder="seu.email@exemplo.com"
                                                disabled={formStatus === 'submitting'}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-1">
                                                Mensagem
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                rows={5}
                                                className="w-full px-4 py-3 bg-neutral-800/50 rounded-xl border border-neutral-700/50 text-white focus:border-[#3d43dd]/50 focus:ring-1 focus:ring-[#3d43dd]/30 transition-colors resize-none"
                                                placeholder="Descreva seu projeto ou ideia..."
                                                disabled={formStatus === 'submitting'}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <motion.button
                                            type="submit"
                                            disabled={formStatus === 'submitting'}
                                            className="w-full relative group overflow-hidden"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="absolute -inset-2 bg-gradient-to-r from-[#3d43dd] to-[#6366f1] rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                                            <div className={`relative inline-flex items-center justify-center w-full gap-2 px-6 py-3 ${formStatus === 'success' ? 'bg-green-600' : formStatus === 'error' ? 'bg-red-600' : 'bg-[#3d43dd]'} rounded-full text-white font-medium transition-all duration-300`}>
                                                {formStatus === 'submitting' ? (
                                                    <>
                                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Enviando...
                                                    </>
                                                ) : formStatus === 'success' ? (
                                                    <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                        Mensagem Enviada!
                                                    </>
                                                ) : formStatus === 'error' ? (
                                                    <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                        </svg>
                                                        Erro ao enviar. Tente novamente.
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                                        </svg>
                                                        Enviar Mensagem
                                                    </>
                                                )}
                                            </div>
                                        </motion.button>
                                    </div>
                                </motion.form>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Ícones de redes sociais rodapé */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-20 text-center"
                >
                    <div className="inline-flex flex-col items-center p-8 rounded-3xl bg-gradient-to-b from-neutral-900/80 to-neutral-900/40 backdrop-blur-sm border border-neutral-800/50">
                        <motion.h3
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            viewport={{ once: true }}
                            className="text-xl font-medium mb-4 bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent"
                        >
                            Vamos transformar suas ideias em realidade
                        </motion.h3>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            viewport={{ once: true }}
                            className="text-neutral-400 max-w-xl mb-6"
                        >
                            Estou ansioso para colaborar em projetos desafiadores e inovadores.
                            Juntos, podemos criar soluções digitais que se destacam.
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap justify-center gap-3"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            viewport={{ once: true }}
                        >
                            {contactInfo.map((item, index) => (
                                <motion.a
                                    key={`footer-${item.id}`}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    className="w-10 h-10 flex items-center justify-center rounded-full"
                                    style={{ backgroundColor: item.color }}
                                >
                                    <div className="text-white w-5 h-5">
                                        {item.icon}
                                    </div>
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
} 