'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    // Memoize menu items para evitar recriações em cada render
    const menuItems = useMemo(() => [
        { name: 'Início', href: '#home', id: 'home' },
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
        const sections = ['home', 'profile', 'projects', 'contact'];
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

    const handleSetActiveSection = useCallback((id: string) => {
        setActiveSection(id);
    }, []);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev);
    }, []);

    const handleMenuItemClick = useCallback((id: string) => {
        setActiveSection(id);
        setIsMenuOpen(false);
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
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
                ? 'bg-neutral-950/90 backdrop-blur-md py-3 shadow-lg'
                : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <a
                        href="#home"
                        className="flex items-center group"
                        onClick={() => handleSetActiveSection('home')}
                    >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-2 group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all duration-300">
                            <span className="text-xl font-bold text-white">W</span>
                        </div>
                        <span className="text-2xl font-bold text-neutral-100 group-hover:text-blue-400 transition-colors">
                            Wagner
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1">
                        {menuItems.map((item) => (
                            <a
                                key={item.id}
                                href={item.href}
                                onClick={() => handleSetActiveSection(item.id)}
                                className={`relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeSection === item.id
                                    ? 'text-white'
                                    : 'text-neutral-400 hover:text-white'
                                    }`}
                            >
                                {item.name}
                                {activeSection === item.id && (
                                    <motion.div
                                        layoutId="activeSection"
                                        className="absolute inset-0 bg-blue-500/20 rounded-md -z-10"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            onClick={() => handleSetActiveSection('contact')}
                            className="ml-4 px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md text-sm font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all"
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
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
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
                        className="md:hidden bg-neutral-900/95 backdrop-blur-md border-t border-neutral-800"
                    >
                        <div className="px-4 py-2">
                            <nav className="flex flex-col space-y-2 py-4">
                                {menuItems.map((item) => (
                                    <a
                                        key={item.id}
                                        href={item.href}
                                        className={`px-3 py-2 rounded-md transition-colors ${activeSection === item.id
                                            ? 'bg-blue-500/20 text-white'
                                            : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
                                            }`}
                                        onClick={() => handleMenuItemClick(item.id)}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                                <a
                                    href="#contact"
                                    className="mt-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md font-medium"
                                    onClick={() => handleMenuItemClick('contact')}
                                >
                                    Contato
                                </a>
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
} 