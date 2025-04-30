'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect, useMemo } from 'react';

export default function Contact() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [50, 0, 0, -50]);

    const [hoveredItem, setHoveredItem] = useState<number | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const [isOpening, setIsOpening] = useState<boolean>(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const contactInfo = useMemo(() => [
        {
            id: 1,
            name: 'WhatsApp',
            value: '+55 11 94352-7017',
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
                    className="mb-20"
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

                {/* Grid de contatos */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 max-w-4xl mx-auto"
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
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                transition: { delay: index * 0.1, duration: 0.5 }
                            }}
                            viewport={{ once: true }}
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
                                    className="text-2xl font-bold mb-3 text-white"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    {item.name}
                                </motion.h3>

                                {/* Valor do contato */}
                                <motion.p
                                    className="text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    {item.value}
                                </motion.p>

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

                {/* Seção de email */}
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
                            className="text-xl font-medium mb-6 bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent"
                        >
                            Prefere um contato mais formal?
                        </motion.h3>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 }}
                            viewport={{ once: true }}
                            className="relative group"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#3d43dd] to-[#6366f1] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                            <a
                                href="mailto:wagnerpereiradev@gmail.com"
                                className="relative inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 rounded-full text-white font-medium transition-all duration-300 hover:bg-neutral-800"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                                Me envie um email
                            </a>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            viewport={{ once: true }}
                            className="mt-4 text-sm text-neutral-500"
                        >
                            Responderei sua mensagem o mais breve possível
                        </motion.p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
} 