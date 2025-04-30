'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-neutral-950/90 backdrop-blur-md py-4' : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <a href="#" className="text-2xl font-bold text-neutral-100">
                        Wagner
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {[
                            { name: 'Início', href: '#' },
                            { name: 'Perfil', href: '#profile' },
                            { name: 'Projetos', href: '#projects' },
                            { name: 'Contato', href: '#contact' }
                        ].map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className="text-neutral-300 hover:text-neutral-100 transition-colors"
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden text-neutral-300 focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
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

            {/* Mobile menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-neutral-900 border-t border-neutral-800"
                    >
                        <div className="px-4 py-2">
                            <nav className="flex flex-col space-y-4 py-4">
                                {[
                                    { name: 'Início', href: '#' },
                                    { name: 'Perfil', href: '#profile' },
                                    { name: 'Projetos', href: '#projects' },
                                    { name: 'Contato', href: '#contact' }
                                ].map((item, index) => (
                                    <a
                                        key={index}
                                        href={item.href}
                                        className="text-neutral-300 hover:text-neutral-100 transition-colors py-2"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
} 