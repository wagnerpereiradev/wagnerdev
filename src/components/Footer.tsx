'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { useToast } from '@/components/ui/Toast';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const [hoveredLink, setHoveredLink] = useState<number | null>(null);
    const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);
    const [emailInput, setEmailInput] = useState('');
    const { showToast, ToastComponent } = useToast();

    const footerLinks = [
        { title: 'Início', href: '#hero' },
        { title: 'Sobre', href: '#about' },
        { title: 'Projetos', href: '#projects' },
        { title: 'Tecnologias', href: '#technologies' },
        { title: 'Contato', href: '#contact' },
    ];

    const legalLinks = [
        { title: 'Política de Privacidade', href: '#' },
        { title: 'Termos de Uso', href: '#' },
    ];

    const socialLinks = [
        {
            title: 'GitHub',
            href: 'https://github.com/wagnerpereiradev',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" clipRule="evenodd" />
                </svg>
            ),
            gradientFrom: '#333',
            gradientTo: '#24292e',
            hoverGlow: 'rgba(36, 41, 46, 0.5)'
        },
        {
            title: 'WhatsApp',
            href: 'https://wa.me/5511943527017',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            ),
            gradientFrom: '#25D366',
            gradientTo: '#128C7E',
            hoverGlow: 'rgba(37, 211, 102, 0.5)'
        },
        {
            title: 'Instagram',
            href: 'https://instagram.com/wagner.mi6',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
            ),
            gradientFrom: '#E1306C',
            gradientTo: '#F77737',
            hoverGlow: 'rgba(225, 48, 108, 0.5)'
        },
        {
            title: 'LinkedIn',
            href: 'https://linkedin.com/in/owrp',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
            ),
            gradientFrom: '#0A66C2',
            gradientTo: '#004182',
            hoverGlow: 'rgba(10, 102, 194, 0.5)'
        },
    ];

    return (
        <footer className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-black">
            {ToastComponent}
            {/* Fundo moderno com gradiente e partículas */}
            <div className="absolute inset-0 z-0">
                {/* Gradiente de fundo estilo Apple */}
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 to-black">
                    <div className="absolute inset-0 opacity-50 bg-[url('/images/grid-pattern.svg')]"></div>
                </div>

                {/* Camada de gradientes sutis */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#3d43dd]/3 via-transparent to-[#3d43dd]/3"></div>

                {/* Linha superior com gradiente */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3d43dd]/30 to-transparent"></div>

                {/* Efeitos de luz com blur */}
                <div className="absolute top-20 left-[15%] w-64 h-64 rounded-full bg-[#3d43dd]/5 blur-[100px] animate-pulse"
                    style={{ animationDuration: '15s' }} />
                <div className="absolute bottom-40 right-[10%] w-80 h-80 rounded-full bg-[#3d43dd]/4 blur-[120px] animate-pulse"
                    style={{ animationDuration: '20s' }} />

                {/* Partículas decorativas */}
                {[...Array(6)].map((_, i) => {
                    // Posições fixas para cada partícula
                    const positions = [
                        { left: "12%", top: "25%" },
                        { left: "48%", top: "44%" },
                        { left: "82%", top: "30%" },
                        { left: "28%", top: "55%" },
                        { left: "80%", top: "48%" },
                        { left: "54%", top: "55%" }
                    ];

                    return (
                        <motion.div
                            key={i}
                            className="hidden md:block absolute w-1 h-1 rounded-full bg-[#3d43dd]/20"
                            style={{
                                left: positions[i].left,
                                top: positions[i].top
                            }}
                            animate={{
                                opacity: [0.1, 0.5, 0.1],
                                y: [0, -20, 0],
                            }}
                            transition={{
                                duration: 5 + i,
                                repeat: Infinity,
                                delay: i * 0.5,
                            }}
                        />
                    );
                })}
            </div>

            {/* Conteúdo do footer com novo design */}
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Container central com divisão de conteúdo */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
                    {/* Coluna da esquerda: Logo e informações principais */}
                    <div className="lg:col-span-4">
                        {/* Logo em formato de cartão flutuante */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mb-8"
                        >
                            <div className="relative bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 backdrop-blur-md p-6 rounded-2xl border border-white/5 shadow-xl overflow-hidden group">
                                {/* Brilho no canto */}
                                <div className="absolute top-0 right-0 w-20 h-20 bg-[#3d43dd]/10 rounded-full blur-xl opacity-70 transform translate-x-1/3 -translate-y-1/3 group-hover:opacity-100 transition-opacity duration-700"></div>

                                {/* Logo central */}
                                <div className="flex items-center justify-center mb-4">
                                    <div className="bg-gradient-to-br from-[#3d43dd] to-[#6366f1] p-3 rounded-2xl shadow-lg shadow-[#3d43dd]/20 group-hover:shadow-[#3d43dd]/30 transition-all duration-300">
                                        <span className="text-2xl font-extrabold text-white">WP</span>
                                    </div>
                                </div>

                                {/* Descrição */}
                                <div className="text-center">
                                    <div className="flex items-center justify-center mb-3">
                                        <div className="h-px w-10 bg-gradient-to-r from-transparent via-neutral-700 to-transparent"></div>
                                        <span className="mx-3 text-xs text-neutral-500 font-medium tracking-wider">DESENVOLVEDOR FULLSTACK</span>
                                        <div className="h-px w-10 bg-gradient-to-r from-transparent via-neutral-700 to-transparent"></div>
                                    </div>
                                    <p className="text-neutral-400 text-sm">
                                        Transformando ideias em experiências digitais impactantes
                                    </p>
                                </div>

                                {/* Divisor decorativo */}
                                <div className="mt-5 pt-5 border-t border-neutral-800/50">
                                    <motion.div
                                        className="flex items-center justify-center gap-4"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        {/* Botão CTA principal */}
                                        <Link
                                            href="#contact"
                                            className="px-4 py-2 text-sm text-white bg-gradient-to-r from-[#3d43dd] to-[#6366f1] rounded-lg shadow-md hover:shadow-lg hover:shadow-[#3d43dd]/20 transition-all duration-300"
                                        >
                                            Contato
                                        </Link>
                                        <Link
                                            href="#projects"
                                            className="px-4 py-2 text-sm text-neutral-300 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300"
                                        >
                                            Projetos
                                        </Link>
                                    </motion.div>
                                </div>

                                {/* Partículas de fundo */}
                                {[...Array(3)].map((_, i) => {
                                    // Posições fixas para cada partícula de fundo
                                    const positions = [
                                        { left: "30%", top: "35%" },
                                        { left: "60%", top: "45%" },
                                        { left: "40%", top: "65%" },
                                    ];

                                    return (
                                        <motion.div
                                            key={i}
                                            className="absolute w-1 h-1 rounded-full bg-[#3d43dd]/20"
                                            style={{
                                                left: positions[i].left,
                                                top: positions[i].top,
                                            }}
                                            animate={{
                                                opacity: [0.2, 0.6, 0.2],
                                                scale: [1, 1.5, 1],
                                            }}
                                            transition={{
                                                duration: 3 + i,
                                                repeat: Infinity,
                                                delay: i * 0.7,
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Localização estilizada */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mb-8"
                        >
                            <div className="bg-gradient-to-br from-neutral-900/30 to-neutral-950/30 backdrop-blur-md p-5 rounded-xl border border-white/5 hover:border-white/10 transition-all duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-[#3d43dd]/10 flex items-center justify-center flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#3d43dd]">
                                            <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-white text-sm font-medium mb-1">Localização</h4>
                                        <p className="text-neutral-400 text-sm">São Paulo, SP - Brasil</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Coluna central: Links e navegação */}
                    <div className="lg:col-span-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="bg-gradient-to-br from-neutral-900/30 to-neutral-950/30 backdrop-blur-md p-6 rounded-xl border border-white/5 h-full"
                        >
                            <h3 className="text-lg font-medium text-white mb-6 flex items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#3d43dd] mr-2"></span>
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-300">
                                    Links Rápidos
                                </span>
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                                {/* Links de navegação */}
                                <div>
                                    <h4 className="text-neutral-400 text-xs font-medium uppercase tracking-wider mb-4">Navegação</h4>
                                    <ul className="space-y-3">
                                        {footerLinks.map((link, index) => (
                                            <motion.li
                                                key={index}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.1 + index * 0.05 }}
                                                onMouseEnter={() => setHoveredLink(index)}
                                                onMouseLeave={() => setHoveredLink(null)}
                                            >
                                                <Link
                                                    href={link.href}
                                                    className="group text-neutral-400 hover:text-white transition-colors duration-300 flex items-center"
                                                >
                                                    <span className={`h-0.5 w-0 group-hover:w-3 ${hoveredLink === index ? 'w-3' : 'w-0'} bg-[#3d43dd] mr-2 transition-all duration-300`}></span>
                                                    {link.title}
                                                </Link>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Informações de contato */}
                                <div>
                                    <h4 className="text-neutral-400 text-xs font-medium uppercase tracking-wider mb-4">Contato</h4>
                                    <ul className="space-y-4">
                                        <motion.li
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.3 }}
                                            className="group"
                                        >
                                            <a
                                                href="mailto:wagnerpereiradev@gmail.com"
                                                className="text-neutral-400 hover:text-white transition-colors duration-300 flex items-start gap-3 group-hover:-translate-y-0.5 transform transition-transform duration-300"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-[#3d43dd]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#3d43dd]/20 transition-colors duration-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#3d43dd]">
                                                        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                                                        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                                                    </svg>
                                                </div>
                                                <div className="flex flex-col min-w-0 flex-1">
                                                    <span className="text-xs text-neutral-500">Email:</span>
                                                    <span className="text-sm break-all">wagnerpereiradev@gmail.com</span>
                                                </div>
                                            </a>
                                        </motion.li>

                                        <motion.li
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.4 }}
                                            className="group"
                                        >
                                            <a
                                                href="tel:+5511943527017"
                                                className="text-neutral-400 hover:text-white transition-colors duration-300 flex items-start gap-3 group-hover:-translate-y-0.5 transform transition-transform duration-300"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-[#3d43dd]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#3d43dd]/20 transition-colors duration-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#3d43dd]">
                                                        <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-neutral-500">Telefone:</span>
                                                    <span className="text-sm">+55 11 94352-7017</span>
                                                </div>
                                            </a>
                                        </motion.li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Coluna da direita: Newsletter e redes sociais */}
                    <div className="lg:col-span-4">
                        {/* Card de Newsletter */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mb-8"
                        >
                            <div className="bg-gradient-to-br from-[#3d43dd]/10 to-neutral-950/80 backdrop-blur-md p-6 rounded-xl border border-[#3d43dd]/20 shadow-xl overflow-hidden relative group">
                                {/* Efeito de brilho */}
                                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#3d43dd]/10 rounded-full blur-2xl opacity-70 group-hover:opacity-90 transition-opacity duration-700"></div>

                                {/* Ícone decorativo */}
                                <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-[#3d43dd]/20 to-transparent backdrop-blur-xl border border-[#3d43dd]/30 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3d43dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>

                                <h3 className="text-lg font-medium text-white mb-2 relative z-10">
                                    Fique atualizado
                                </h3>

                                <p className="text-neutral-400 text-sm mb-5 relative z-10">
                                    Receba atualizações e novidades sobre tecnologia e projetos
                                </p>

                                {/* Formulário com design moderno */}
                                <form className="relative z-10" onSubmit={async (e) => {
                                    e.preventDefault();

                                    if (!emailInput || !emailInput.includes('@')) {
                                        showToast('Por favor, informe um email válido.', 'warning');
                                        return;
                                    }

                                    // Estado local para controlar o estado do formulário
                                    const buttonEl = e.currentTarget.querySelector('button');
                                    const originalText = buttonEl?.innerHTML || '';

                                    try {
                                        if (buttonEl) {
                                            buttonEl.innerHTML = '<svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>';
                                            buttonEl.disabled = true;
                                        }

                                        const response = await fetch('/api/newsletter', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({ email: emailInput }),
                                        });

                                        const data = await response.json();

                                        if (!response.ok) {
                                            throw new Error(data.message || 'Erro ao processar inscrição');
                                        }

                                        // Sucesso
                                        setEmailInput('');
                                        showToast('Inscrição realizada com sucesso! Verifique seu email para confirmar.', 'success');

                                    } catch (error) {
                                        console.error('Erro ao enviar formulário:', error);
                                        showToast(error instanceof Error ? error.message : 'Ocorreu um erro ao processar sua inscrição. Tente novamente.', 'error');
                                    } finally {
                                        // Restaura o botão
                                        if (buttonEl) {
                                            buttonEl.innerHTML = originalText;
                                            buttonEl.disabled = false;
                                        }
                                    }
                                }}>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            placeholder="Seu email"
                                            value={emailInput}
                                            onChange={(e) => setEmailInput(e.target.value)}
                                            className="w-full px-4 py-3 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-[#3d43dd]/50 focus:border-[#3d43dd]/50 placeholder-neutral-500"
                                        />
                                        <button
                                            type="submit"
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#3d43dd] to-[#6366f1] text-white p-2 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                            </svg>
                                        </button>
                                    </div>
                                    <p className="text-neutral-500 text-xs mt-3">
                                        Nunca compartilhamos seus dados. Você pode cancelar a qualquer momento.
                                    </p>
                                </form>
                            </div>
                        </motion.div>

                        {/* Redes sociais estilizadas */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <div className="bg-gradient-to-br from-neutral-900/30 to-neutral-950/30 backdrop-blur-md p-6 rounded-xl border border-white/5">
                                <h3 className="text-lg font-medium text-white mb-5 flex items-center">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#3d43dd] mr-2"></span>
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-300">
                                        Conecte-se
                                    </span>
                                </h3>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {socialLinks.map((link, index) => (
                                        <motion.a
                                            key={index}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 backdrop-blur-md border border-white/5 rounded-xl p-4 flex flex-col items-center gap-3 hover:border-[#3d43dd]/20 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.2 + index * 0.1 }}
                                            onMouseEnter={() => setHoveredSocial(index)}
                                            onMouseLeave={() => setHoveredSocial(null)}
                                        >
                                            {/* Efeito de brilho no hover */}
                                            <div
                                                className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-700 rounded-xl"
                                                style={{
                                                    background: hoveredSocial === index ?
                                                        `radial-gradient(circle at center, ${link.hoverGlow} 0%, transparent 70%)` :
                                                        'none'
                                                }}
                                            />

                                            {/* Ícone com gradiente */}
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${hoveredSocial === index ?
                                                `bg-gradient-to-br from-${link.gradientFrom} to-${link.gradientTo}` :
                                                'bg-neutral-800/80'
                                                }`}>
                                                <div className="text-white">
                                                    {link.icon}
                                                </div>
                                            </div>

                                            <span className="text-neutral-400 text-xs font-medium group-hover:text-white transition-colors duration-300">
                                                {link.title}
                                            </span>
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Separador decorativo */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="h-px w-full bg-gradient-to-r from-transparent via-neutral-800 to-transparent my-12"
                />

                {/* Rodapé com copyright e links legais - estilo Apple */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Logo animado minimalista */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="hidden md:block"
                    >
                        <div className="flex items-center gap-2">
                            <div className="bg-[#3d43dd] w-6 h-6 rounded-lg flex items-center justify-center shadow-md shadow-[#3d43dd]/20">
                                <span className="text-xs font-bold text-white">W</span>
                            </div>
                            <span className="text-sm text-neutral-500">
                                Wagner <span className="text-neutral-400">Pereira</span>
                            </span>
                        </div>
                    </motion.div>

                    {/* Copyright */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="text-neutral-500 text-sm order-2 md:order-1 text-center md:text-left"
                    >
                        © {currentYear} <span className="text-[#3d43dd]">Wagner Pereira</span>. Todos os direitos reservados.
                    </motion.p>

                    {/* Links legais */}
                    <div className="flex gap-8 order-1 md:order-2">
                        {legalLinks.map((link, index) => (
                            <motion.a
                                key={index}
                                href={link.href}
                                className="text-neutral-500 hover:text-white text-sm transition-colors duration-300 group"
                                whileHover={{ x: 3 }}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.7 + index * 0.1 }}
                            >
                                <span className="relative">
                                    {link.title}
                                    <span className="absolute -bottom-1 left-0 right-0 h-px transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 bg-gradient-to-r from-[#3d43dd]/50 to-transparent origin-left"></span>
                                </span>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
} 