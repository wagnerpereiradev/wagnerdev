'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const pathname = usePathname();
    const router = useRouter();

    // Referência para rastrear se o usuário clicou em "Início" recentemente
    const homeClickedRef = useRef<boolean>(false);
    const homeClickTimerRef = useRef<NodeJS.Timeout | null>(null);

    const isBlogPage = pathname.startsWith('/blog');

    // Ajuste nos itens de menu para melhor lidar com a navegação entre páginas
    const menuItems = useMemo(() => [
        { name: 'Início', href: isBlogPage ? '/' : '#', id: 'hero', isHomePage: true },
        { name: 'Perfil', href: isBlogPage ? '/#profile' : '#profile', id: 'profile' },
        { name: 'Projetos', href: isBlogPage ? '/#projects' : '#projects', id: 'projects' },
        { name: 'Blog', href: '/blog', id: 'blog', isExternalPage: true },
    ], [isBlogPage]);

    // Usar useCallback para funções que não precisam ser recriadas em cada render
    // Criar referência para armazenar o tempo da última verificação
    const lastCalculationTimeRef = useRef<number>(0);

    const handleScroll = useCallback(() => {
        // Não rastrear seções ativas quando estiver na página do blog
        if (isBlogPage) return;

        // Ajusta a transparência com base na rolagem - usando requestAnimationFrame para otimização
        const updateScrollState = () => {
            if (window.scrollY > 10) {
                if (!isScrolled) {
                    setIsScrolled(true);
                }
            } else {
                if (isScrolled) {
                    setIsScrolled(false);
                }
            }

            // Se o usuário acabou de clicar em "Início", não mudar a seção ativa
            if (homeClickedRef.current) {
                // Forçar a seção ativa para ser 'hero'
                if (activeSection !== 'hero') {
                    setActiveSection('hero');
                }
                return;
            }

            // Detecta a seção ativa com base na posição da rolagem
            // Limitando a busca apenas a cada 200ms para melhorar performance
            const now = Date.now();
            if (!lastCalculationTimeRef.current || now - lastCalculationTimeRef.current > 200) {
                lastCalculationTimeRef.current = now;

                // Se estiver no topo da página, defina a seção como 'hero'
                if (window.scrollY < 100) {
                    setActiveSection('hero');
                    return;
                }

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
            }
        };

        // Usando requestAnimationFrame para melhor performance
        window.requestAnimationFrame(updateScrollState);
    }, [isBlogPage, isScrolled, activeSection, homeClickedRef]);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev);
    }, []);

    // Função melhorada para navegação
    const handleNavigation = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string, href: string) => {
        // Forçar a atualização do estado ativo imediatamente
        if (!isBlogPage && (id === 'hero' || href === '#')) {
            e.preventDefault();
            setActiveSection('hero');
            setIsMenuOpen(false);

            // Marcar que o usuário clicou em "Início" e configurar um timer
            homeClickedRef.current = true;

            // Limpar qualquer timer existente
            if (homeClickTimerRef.current) {
                clearTimeout(homeClickTimerRef.current);
            }

            // Definir um novo timer (manter o bloqueio por 1.5 segundos)
            homeClickTimerRef.current = setTimeout(() => {
                homeClickedRef.current = false;
            }, 1500);

            // Rolar para o topo suavemente
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            return;
        }

        // Se estiver na página do blog e quiser ir para uma seção da página inicial
        if (isBlogPage && !href.startsWith('/blog')) {
            // Se for apenas para a página inicial sem âncora
            if (href === '/' || href === '') {
                // Deixe o comportamento padrão do link
                return;
            }

            // Se for para uma âncora específica na página inicial (#profile, #projects)
            if (href.includes('#')) {
                // Não impeça o comportamento padrão para links com âncoras na página inicial
                return;
            }
        }

        // Se não estiver na página do blog (ou seja, na página inicial)
        if (!isBlogPage) {
            e.preventDefault(); // Prevenir o comportamento padrão

            // Atualizar a seção ativa imediatamente, sem esperar pelo scroll
            setActiveSection(id);
            setIsMenuOpen(false);

            // Navegação suave para âncoras na mesma página
            const targetId = href.replace('#', '');

            // Se targetId estiver vazio, rolar para o topo da página
            if (targetId === '') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                setActiveSection('hero');
            } else {
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
        }
    }, [isBlogPage]);

    // Função especial para o botão de contato
    const handleContactClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isBlogPage) {
            // Se estiver na página do blog, redirecione para a página inicial com âncora #contact
            router.push('/#contact');
            return;
        }

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
    }, [isBlogPage, router]);

    // Determinar qual item deve estar ativo
    const isItemActive = useCallback((item: { id: string, isExternalPage?: boolean, isHomePage?: boolean }) => {
        // Se estiver na página do blog, apenas o item "Blog" deve estar ativo
        if (isBlogPage) {
            return item.id === 'blog';
        }

        // Para o item Home/Início, verificar se estamos no topo ou se foi explicitamente selecionado
        if (item.isHomePage) {
            // Início fica ativo se for a seção atual (hero)
            return activeSection === 'hero';
        }

        // Na página inicial, o item correspondente à seção atual deve estar ativo
        return activeSection === item.id;
    }, [isBlogPage, activeSection]);

    useEffect(() => {
        if (!isBlogPage) {
            window.addEventListener('scroll', handleScroll);
            // Inicializar com a posição atual
            handleScroll();

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, [handleScroll, isBlogPage]);

    // Efeito para detectar a mudança de seção via URL hash quando a página carrega
    useEffect(() => {
        // Se não estiver na página de blog
        if (!isBlogPage) {
            // Verificar se há um hash na URL
            const hash = window.location.hash;
            if (hash) {
                const id = hash.replace('#', '');
                const validSections = ['hero', 'profile', 'projects', 'contact'];
                if (validSections.includes(id)) {
                    setActiveSection(id);
                }
            } else {
                // Se não houver hash, definir a seção ativa como 'hero'
                setActiveSection('hero');
            }
        }
    }, [isBlogPage]);

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled || isBlogPage
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
                                }}
                            />
                        );
                    })}
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex justify-between items-center">
                    <Link
                        href="/"
                        className="flex items-center group"
                        onClick={(e) => {
                            if (!isBlogPage) {
                                e.preventDefault();
                                setActiveSection('hero');
                                // Marcar que o usuário clicou para ir ao início
                                homeClickedRef.current = true;
                                // Limpar timer existente
                                if (homeClickTimerRef.current) {
                                    clearTimeout(homeClickTimerRef.current);
                                }
                                // Configurar novo timer
                                homeClickTimerRef.current = setTimeout(() => {
                                    homeClickedRef.current = false;
                                }, 1500);
                                // Rolar para o topo
                                window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth'
                                });
                            }
                        }}
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
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1">
                        {menuItems.map((item) => (
                            item.isExternalPage ? (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 
                                        ${isItemActive(item) ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
                                    onMouseEnter={() => setHoveredItem(item.id)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    {item.name}
                                    {isItemActive(item) && (
                                        <motion.div
                                            layoutId="activeSection"
                                            className="absolute inset-0 bg-gradient-to-br from-[#3d43dd]/20 to-[#6366f1]/10 rounded-lg -z-10"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    )}
                                    {hoveredItem === item.id && !isItemActive(item) && (
                                        <motion.div
                                            className="absolute inset-0 bg-white/5 rounded-lg -z-10"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    )}
                                </Link>
                            ) : (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    onClick={(e) => handleNavigation(e, item.id, item.href)}
                                    onMouseEnter={() => setHoveredItem(item.id)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 
                                        ${isItemActive(item) ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
                                >
                                    {item.name}
                                    {isItemActive(item) && (
                                        <motion.div
                                            layoutId="activeSection"
                                            className="absolute inset-0 bg-gradient-to-br from-[#3d43dd]/20 to-[#6366f1]/10 rounded-lg -z-10"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    )}
                                    {hoveredItem === item.id && !isItemActive(item) && (
                                        <motion.div
                                            className="absolute inset-0 bg-white/5 rounded-lg -z-10"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        />
                                    )}
                                </Link>
                            )
                        ))}
                        {isBlogPage ? (
                            <Link
                                href="/#contact"
                                className="ml-4 px-5 py-2 bg-gradient-to-r from-[#3d43dd] to-[#6366f1] text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-[#3d43dd]/20 transition-all duration-300"
                            >
                                Contato
                            </Link>
                        ) : (
                            <a
                                href="#contact"
                                onClick={handleContactClick}
                                className="ml-4 px-5 py-2 bg-gradient-to-r from-[#3d43dd] to-[#6366f1] text-white rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-[#3d43dd]/20 transition-all duration-300"
                            >
                                Contato
                            </a>
                        )}
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

            {/* Mobile menu */}
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
                                        <Link
                                            key={item.id}
                                            href={item.href}
                                            className={`px-4 py-3 rounded-lg transition-all duration-200 
                                                ${isItemActive(item)
                                                    ? 'bg-gradient-to-r from-[#3d43dd]/20 to-[#6366f1]/10 text-white'
                                                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                                                }`}
                                            onClick={(e) => {
                                                if (item.isHomePage && !isBlogPage) {
                                                    e.preventDefault();
                                                    setIsMenuOpen(false);
                                                    setActiveSection('hero');

                                                    // Marcar que o usuário clicou em "Início"
                                                    homeClickedRef.current = true;

                                                    // Limpar timer existente
                                                    if (homeClickTimerRef.current) {
                                                        clearTimeout(homeClickTimerRef.current);
                                                    }

                                                    // Configurar novo timer
                                                    homeClickTimerRef.current = setTimeout(() => {
                                                        homeClickedRef.current = false;
                                                    }, 1500);

                                                    window.scrollTo({
                                                        top: 0,
                                                        behavior: 'smooth'
                                                    });
                                                } else {
                                                    setIsMenuOpen(false);
                                                    if (!isBlogPage && !item.isExternalPage) {
                                                        e.preventDefault();
                                                        setActiveSection(item.id);
                                                        const targetSection = document.getElementById(item.id);
                                                        if (targetSection) {
                                                            setTimeout(() => {
                                                                targetSection.scrollIntoView({
                                                                    behavior: 'smooth',
                                                                    block: 'start'
                                                                });
                                                            }, 100);
                                                        }
                                                    }
                                                }
                                            }}
                                        >
                                            <div className="flex items-center">
                                                <div className={`w-1 h-1 rounded-full ${isItemActive(item) ? 'bg-[#3d43dd]' : 'bg-neutral-600'} mr-2`}></div>
                                                {item.name}
                                            </div>
                                        </Link>
                                    ))}

                                    <Link
                                        href={isBlogPage ? '/#contact' : '#contact'}
                                        className="mt-2 px-4 py-3 bg-gradient-to-r from-[#3d43dd] to-[#6366f1] text-white rounded-lg font-medium flex items-center justify-center shadow-lg shadow-[#3d43dd]/10"
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            if (!isBlogPage) {
                                                const contactSection = document.getElementById('contact');
                                                if (contactSection) {
                                                    setTimeout(() => {
                                                        contactSection.scrollIntoView({
                                                            behavior: 'smooth',
                                                            block: 'start'
                                                        });
                                                    }, 100);
                                                }
                                            }
                                        }}
                                    >
                                        Contato
                                    </Link>
                                </nav>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}