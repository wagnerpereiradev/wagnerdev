'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    // Memoize menu items para evitar recriações em cada render
    const menuItems = useMemo(() => [
        { name: 'Início', href: '#', id: 'hero' },
        { name: 'Perfil', href: '#profile', id: 'profile' },
        { name: 'Projetos', href: '#projects', id: 'projects' },
    ], []);

    // Usar useCallback para funções que não precisam ser recriadas em cada render
    const handleScroll = useCallback(() => {
        // Ajusta a transparência com base na rolagem
        if (window.scrollY > 10) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }

        // Detecta a seção ativa com base na posição da rolagem
        const sections = ['hero', 'profile', 'projects', 'contact'];
        const sectionPositions = sections.map(id => {
            const element = document.getElementById(id);
            if (!element) return null;
            return {
                id,
                top: element.offsetTop - 100,
                bottom: element.offsetTop + element.offsetHeight - 100
            };
        }).filter(Boolean);

        const currentPosition = window.scrollY + window.innerHeight / 3;

        for (const section of sectionPositions) {
            if (section && currentPosition >= section.top && currentPosition <= section.bottom) {
                setActiveSection(section.id);
                break;
            }
        }
    }, []);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev);
    }, []);

    // Função melhorada para navegação suave tanto em desktop quanto em mobile
    const handleNavigation = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault(); // Prevenir comportamento padrão para controlar a navegação
        setActiveSection(id);
        setIsMenuOpen(false);

        // Navegação suave opcional para melhorar a experiência
        const targetId = e.currentTarget.getAttribute('href')?.replace('#', '');

        // Se targetId estiver vazio, rolar para o topo da página
        if (targetId === '') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else if (targetId) {
            const element = document.getElementById(targetId);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 10);
            }
        }
    }, []);

    // Função especial para o botão de contato
    const handleContactClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setActiveSection('contact');
        setIsMenuOpen(false);

        const contactSection = document.getElementById('contact');
        if (contactSection) {
            setTimeout(() => {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 10);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // Inicializar com a posição atual
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
                ? 'bg-neutral-950/80 backdrop-blur-md py-3'
                : 'bg-transparent py-6'
                }`}
        >
            {/* Adicionar uma animação para o estilo global */}
            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 0.3; }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-in-out forwards;
                    animation-delay: 0.3s;
                }
            `}</style>

            {/* Efeitos de luz e partículas decorativas - apenas visíveis quando scrolled */}
            {isScrolled && (
                <div className="absolute inset-0 overflow-hidden">
                    {/* Gradiente sutil */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#3d43dd]/3 via-transparent to-[#3d43dd]/3"></div>

                    {/* Linha inferior com gradiente - ajustado para evitar borda branca */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3d43dd]/30 to-transparent opacity-0 animate-fadeIn"></div>

                    {/* Efeito de luz com blur */}
                    <div className="absolute top-1/2 left-[15%] w-40 h-40 rounded-full bg-[#3d43dd]/5 blur-[80px] opacity-70"></div>

                    {/* Partículas decorativas */}
                    {[...Array(3)].map((_, i) => {
                        // Posições fixas para cada partícula
                        const positions = [
                            { left: "25%", top: "30%" },
                            { left: "60%", top: "40%" },
                            { left: "75%", top: "65%" }
                        ];

                        return (
                            <motion.div
                                key={i}
                                className="hidden lg:block absolute w-1 h-1 rounded-full bg-[#3d43dd]/20"
                                style={{
                                    left: positions[i].left,
                                    top: positions[i].top,
                                }}
                                animate={{
                                    opacity: [0.1, 0.5, 0.1],
                                    y: [0, -5, 0],
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
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex justify-between items-center">
                    <a
                        href="#"
                        className="flex items-center group"
                        onClick={(e) => handleNavigation(e, 'hero')}
                    >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3d43dd] to-[#6366f1] p-0.5 flex items-center justify-center mr-2 group-hover:shadow-lg group-hover:shadow-[#3d43dd]/20 transition-all duration-300 overflow-hidden">
                            <div className="w-full h-full rounded-lg overflow-hidden relative">
                                <Image
                                    src="https://avatars.githubusercontent.com/u/99822078?v=4"
                                    alt="Avatar"
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-white group-hover:text-[#3d43dd] transition-colors">
                                Wagner
                            </span>
                            <span className="text-xs text-neutral-400 tracking-wider">DESENVOLVEDOR</span>
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1">
                        {menuItems.map((item) => (
                            <a
                                key={item.id}
                                href={item.href}
                                onClick={(e) => handleNavigation(e, item.id)}
                                onMouseEnter={() => setHoveredItem(item.id)}
                                onMouseLeave={() => setHoveredItem(null)}
                                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeSection === item.id
                                    ? 'text-white'
                                    : 'text-neutral-400 hover:text-white'
                                    }`}
                            >
                                {item.name}
                                {activeSection === item.id && (
                                    <motion.div
                                        layoutId="activeSection"
                                        className="absolute inset-0 bg-gradient-to-br from-[#3d43dd]/20 to-[#6366f1]/10 rounded-lg -z-10"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                                {hoveredItem === item.id && activeSection !== item.id && (
                                    <motion.div
                                        className="absolute inset-0 bg-white/5 rounded-lg -z-10"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            onClick={handleContactClick}
                            className="ml-4 px-5 py-2 bg-gradient-to-r from-[#3d43dd] to-[#6366f1] text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-[#3d43dd]/20 transition-all duration-300"
                        >
                            Contato
                        </a>
                    </nav>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden text-neutral-300 focus:outline-none"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 backdrop-blur-md border border-white/5 flex items-center justify-center hover:border-[#3d43dd]/20 transition-all duration-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile menu - usando AnimatePresence para garantir animações suaves */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden relative"
                    >
                        <div className="bg-neutral-950/90 backdrop-blur-xl border-t border-[#3d43dd]/10">
                            {/* Efeitos de luz para o menu mobile */}
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3d43dd]/5 blur-[50px]"></div>
                                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3d43dd]/20 to-transparent"></div>
                            </div>

                            <div className="px-4 py-2 relative z-10">
                                <nav className="flex flex-col space-y-2 py-4">
                                    {menuItems.map((item) => (
                                        <motion.a
                                            key={item.id}
                                            href={item.href}
                                            className={`px-4 py-3 rounded-lg transition-all duration-200 ${activeSection === item.id
                                                ? 'bg-gradient-to-r from-[#3d43dd]/20 to-[#6366f1]/10 text-white'
                                                : 'text-neutral-300 hover:text-white hover:bg-white/5'
                                                }`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setActiveSection(item.id);
                                                setIsMenuOpen(false);

                                                // Código especial para o link "Início"
                                                if (item.id === 'hero') {
                                                    console.log('Clicou em Início, rolando para o topo');
                                                    // Usar setTimeout para garantir que o menu feche primeiro
                                                    setTimeout(() => {
                                                        window.scrollTo({
                                                            top: 0,
                                                            behavior: 'smooth'
                                                        });
                                                    }, 100);
                                                } else {
                                                    // Para outros links, manter o comportamento atual
                                                    const element = document.getElementById(item.id);
                                                    if (element) {
                                                        setTimeout(() => {
                                                            element.scrollIntoView({
                                                                behavior: 'smooth',
                                                                block: 'start'
                                                            });
                                                        }, 100);
                                                    }
                                                }
                                            }}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.2, delay: 0.1 * (menuItems.indexOf(item) + 1) }}
                                        >
                                            <div className="flex items-center">
                                                <div className={`w-1 h-1 rounded-full ${activeSection === item.id ? 'bg-[#3d43dd]' : 'bg-neutral-600'} mr-2`}></div>
                                                {item.name}
                                            </div>
                                        </motion.a>
                                    ))}
                                    <motion.a
                                        href="#contact"
                                        className="mt-2 px-4 py-3 bg-gradient-to-r from-[#3d43dd] to-[#6366f1] text-white rounded-lg font-medium flex items-center justify-center shadow-lg shadow-[#3d43dd]/10"
                                        onClick={handleContactClick}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: 0.3 }}
                                    >
                                        Contato
                                    </motion.a>
                                </nav>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
} 