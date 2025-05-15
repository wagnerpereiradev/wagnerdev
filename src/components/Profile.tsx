'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';

export default function Profile() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorVariant, setCursorVariant] = useState('default');
    const [typingText, setTypingText] = useState('');
    const fullText = 'Especialista em soluções de Inteligência Artificial e WebServices que transformam o potencial dos negócios. Desenvolvo agentes de IA personalizados, automações inteligentes e APIs que conectam sistemas e elevam a eficiência operacional dos meus clientes.';
    const ref = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollY } = useScroll();

    // Efeito de scroll para animações baseadas na posição da tela
    const opacity = useTransform(scrollY, [0, 300], [0, 1]);
    const y = useTransform(scrollY, [0, 300], [100, 0]);

    // Efeito para rastrear a posição do mouse - otimizado com useCallback e throttling
    const mouseMove = useCallback((e: MouseEvent) => {
        // Usando requestAnimationFrame para limitar atualizações
        if (!window.requestAnimationFrame) {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
            return;
        }

        // Throttling para reduzir updates em dispositivos móveis
        if (window.innerWidth < 768) return;

        window.requestAnimationFrame(() => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        });
    }, []);

    useEffect(() => {
        // Não adiciona o listener em dispositivos móveis
        if (window.innerWidth < 768) return;

        window.addEventListener('mousemove', mouseMove, { passive: true });
        return () => {
            window.removeEventListener('mousemove', mouseMove);
        };
    }, [mouseMove]);

    // Efeito de digitação com performance melhorada
    useEffect(() => {
        // Usando requestAnimationFrame para melhor performance
        let currentIndex = 0;
        let rafId: number;
        let lastUpdateTime = 0;
        const typingSpeed = 20; // ms entre cada caractere

        const updateTyping = (timestamp: number) => {
            if (!lastUpdateTime) lastUpdateTime = timestamp;

            const deltaTime = timestamp - lastUpdateTime;

            if (deltaTime >= typingSpeed) {
                if (currentIndex <= fullText.length) {
                    setTypingText(fullText.slice(0, currentIndex));
                    currentIndex++;
                    lastUpdateTime = timestamp;
                }
            }

            if (currentIndex <= fullText.length) {
                rafId = requestAnimationFrame(updateTyping);
            }
        };

        rafId = requestAnimationFrame(updateTyping);

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [fullText]);

    // Variantes para o cursor
    const variants = {
        default: {
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            opacity: 0.5,
        },
        hover: {
            height: 64,
            width: 64,
            x: mousePosition.x - 32,
            y: mousePosition.y - 32,
            backgroundColor: "rgba(61, 67, 221, 0.3)",
            mixBlendMode: "difference" as const,
            opacity: 0.8,
        }
    };

    // Funções para mudar o estado do cursor
    const textEnter = useCallback(() => setCursorVariant('hover'), []);
    const textLeave = useCallback(() => setCursorVariant('default'), []);

    const socialLinks = [
        {
            name: 'GitHub',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        fillRule="evenodd"
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                    />
                </svg>
            ),
            url: 'https://github.com/wagnerpereiradev',
        },
        {
            name: 'WhatsApp',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            ),
            url: 'https://wa.me/5511943527017',
        },
        {
            name: 'Instagram',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
            url: 'https://instagram.com/wagnerai.me',
        },
        {
            name: 'LinkedIn',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        fillRule="evenodd"
                        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
            url: 'https://linkedin.com/in/owrp',
        },
    ];

    // Otimização das tecnologias com useMemo
    const technologies = useMemo(() => [
        { name: 'Next.js', logo: 'https://images.ctfassets.net/23aumh6u8s0i/6pjUKboBuFLvCKkE3esaFA/5f2101d6d2add5c615db5e98a553fc44/nextjs.jpeg' },
        { name: 'LangChain', logo: 'https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/langchain.png' },
        { name: 'OpenAI API', logo: 'https://img.icons8.com/fluent-systems-filled/512/FFFFFF/chatgpt.png' },
        { name: 'Claude API', logo: 'https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/claude-color.png' },
        { name: 'DeepSeek API', logo: 'https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/deepseek-color.png' },
        { name: 'Qwen API', logo: 'https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/qwen.png' },
        { name: 'Google Cloud', logo: 'https://static.wikia.nocookie.net/logopedia/images/f/f4/GCloud_-_%281%29.svg/revision/latest/scale-to-width-down/250?cb=20190828135105' },
        { name: 'Amazon Web Services', logo: 'https://img.icons8.com/m_outlined/600/FFFFFF/amazon-web-services.png' },
        { name: 'Git', logo: 'https://pachecoandre.com.br/assets/imgs/posts/git.png' },
        { name: 'GitHub', logo: 'https://img.icons8.com/ios11/512/FFFFFF/github.png' },
        { name: 'Docker', logo: 'https://static-00.iconduck.com/assets.00/docker-icon-1024x1024-mv7uzno8.png' },
        { name: 'Java', logo: 'https://static-00.iconduck.com/assets.00/java-icon-1511x2048-6ikx8301.png' },
        { name: 'Kotlin', logo: 'https://cdn.worldvectorlogo.com/logos/kotlin-2.svg' },
        { name: 'TypeScript', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/2048px-Typescript_logo_2020.svg.png' },
        { name: 'Tailwind CSS', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2560px-Tailwind_CSS_Logo.svg.png' },
        { name: 'Vite', logo: 'https://raw.githubusercontent.com/vitejs/vite/main/docs/public/logo.svg' },
        { name: 'Electron', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Electron_Software_Framework_Logo.svg/1200px-Electron_Software_Framework_Logo.svg.png' },
        { name: 'Android Studio', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Android_Studio_icon_%282023%29.svg/2048px-Android_Studio_icon_%282023%29.svg.png' },
        { name: 'WordPress', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Wordpress_Blue_logo.png' },
        { name: 'Node.js', logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968322.png' },
        { name: 'Figma', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Figma-logo.svg/1200px-Figma-logo.svg.png' },
        { name: 'Adobe Illustrator', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Adobe_Illustrator_CC_icon.svg/2101px-Adobe_Illustrator_CC_icon.svg.png' },
        { name: 'Adobe Photoshop', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/1051px-Adobe_Photoshop_CC_icon.svg.png' },
        { name: 'Framer Motion', logo: 'https://user-images.githubusercontent.com/22095598/123793419-f5528800-d8e1-11eb-8c5f-e2dad45a9c81.png' },
        { name: 'Vercel', logo: 'https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/vercel.png' },
        { name: 'PNPM', logo: 'https://static-00.iconduck.com/assets.00/file-type-light-pnpm-icon-2048x2048-5ykb4rad.png' }
    ], []);

    // Ordenações predefinidas para evitar diferenças de hidratação
    const firstRowTechnologies = useMemo(() => [...technologies], [technologies]);
    const secondRowTechnologies = useMemo(() => {
        // Ordenação pseudo-aleatória determinística (não usa Math.random())
        // Usando um algoritmo determinístico baseado no nome das tecnologias
        return [...technologies].sort((a, b) => {
            // Calculando um valor hash simples a partir dos nomes
            const hashA = a.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const hashB = b.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

            // Usando o valor hash para determinar a ordem
            return hashA - hashB;
        });
    }, [technologies]);

    // Outra variação de ordenação para elementos duplicados
    const secondRowDuplicates = useMemo(() => {
        // Usando uma ordenação diferente para elementos duplicados
        return [...technologies].sort((a, b) => {
            // Ordenando pelo comprimento do nome e logo URL (ambos determinísticos)
            const lengthDiff = a.name.length - b.name.length;
            if (lengthDiff !== 0) return lengthDiff;

            // Se os nomes tiverem o mesmo tamanho, usa a primeira letra como critério de desempate
            return a.name.charCodeAt(0) - b.name.charCodeAt(0);
        });
    }, [technologies]);

    return (
        <section id="profile"
            ref={sectionRef}
            className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Cursor personalizado */}
            <motion.div
                className="cursor hidden md:block fixed top-0 left-0 w-8 h-8 bg-[#3d43dd] rounded-full pointer-events-none z-50"
                variants={variants}
                animate={cursorVariant}
                transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            />

            {/* Fundo com gradiente refinado */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-black to-black">
                    <div className="absolute inset-0 opacity-50 bg-[url('/images/grid-pattern.svg')]"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#3d43dd]/5 via-transparent to-[#3d43dd]/5"></div>

                {/* Imagem elegante de fundo com overlay */}
                <div className="absolute inset-0 z-0 opacity-20">
                    <Image
                        src="/images/morumbi-image.jpeg"
                        alt="Fundo elegante mostrando vista do Morumbi"
                        fill
                        className="object-cover"
                        priority={false}
                        sizes="100vw"
                        quality={75}
                        style={{ mixBlendMode: 'soft-light' }}
                    />
                </div>

                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3d43dd]/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3d43dd]/20 to-transparent"></div>
            </div>

            {/* Elementos decorativos com opacidade reduzida para melhor consistência */}
            <div className="absolute top-20 left-[10%] w-40 h-40 sm:w-64 sm:h-64 rounded-full bg-[#3d43dd]/5 blur-[100px] animate-pulse opacity-70"
                style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-20 right-[10%] w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-[#3d43dd]/5 blur-[120px] animate-pulse opacity-70"
                style={{ animationDuration: '10s' }} />

            {/* Conteúdo principal com animação de fade-in e slide-up */}
            <motion.div
                style={{ opacity, y }}
                className="max-w-7xl mx-auto relative z-10">

                {/* Card principal do perfil - layout atualizado */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Coluna da esquerda - foto e redes sociais */}
                    <div className="lg:col-span-5 flex flex-col items-center lg:sticky lg:top-32">
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                type: "spring",
                                stiffness: 100,
                                damping: 15,
                                delay: 0.2
                            }}
                        >
                            {/* Círculo decorativo externo com efeito de pulsação */}
                            <motion.div
                                className="absolute -inset-6 rounded-full bg-gradient-to-r from-[#3d43dd]/10 to-[#6366f1]/10 blur-xl"
                                animate={{
                                    scale: [1, 1.05, 1],
                                    opacity: [0.5, 0.7, 0.5],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }}
                            />

                            {/* Anéis orbitais ao redor da foto de perfil */}
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute rounded-full border border-[#3d43dd]/20"
                                    style={{
                                        inset: `-${(i + 1) * 8}px`,
                                    }}
                                    animate={{
                                        rotate: [0, 360],
                                        opacity: [0.1, 0.3, 0.1]
                                    }}
                                    transition={{
                                        rotate: {
                                            duration: 15 + i * 5,
                                            repeat: Infinity,
                                            ease: "linear"
                                        },
                                        opacity: {
                                            duration: 3,
                                            repeat: Infinity,
                                            repeatType: "reverse",
                                            ease: "easeInOut"
                                        }
                                    }}
                                />
                            ))}

                            {/* Imagem de perfil com efeitos visuais aprimorados */}
                            <motion.div
                                className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 overflow-hidden rounded-full border-2 border-[#3d43dd]/30 shadow-xl cursor-pointer"
                                whileHover={{
                                    scale: 1.03,
                                    boxShadow: "0 0 30px rgba(61, 67, 221, 0.3)"
                                }}
                                onMouseEnter={textEnter}
                                onMouseLeave={textLeave}
                            >
                                <div className="absolute inset-0 bg-gradient-to-tl from-[#3d43dd]/20 via-transparent to-transparent mix-blend-overlay z-10" />
                                <Image
                                    src="/images/wagner-portait.png"
                                    alt="Foto do perfil"
                                    fill
                                    sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, 320px"
                                    className="object-cover"
                                    priority
                                    fetchPriority="high"
                                />

                                {/* Efeito de brilho com movimento */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-tr from-[#3d43dd]/40 via-transparent to-transparent mix-blend-overlay"
                                    animate={{
                                        opacity: [0, 0.5, 0],
                                        rotate: [0, 5],
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        repeatType: "reverse"
                                    }}
                                />
                            </motion.div>

                            {/* Linha decorativa abaixo da foto */}
                            <motion.div
                                className="absolute -bottom-2 left-1/2 w-40 h-1 bg-gradient-to-r from-[#3d43dd]/0 via-[#3d43dd] to-[#3d43dd]/0 rounded-full transform -translate-x-1/2"
                                initial={{ width: 0, opacity: 0 }}
                                whileInView={{ width: 160, opacity: 0.7 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                            />
                        </motion.div>

                        {/* Status "Disponível para Projetos" */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="mt-6 mb-8"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-sm">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                <span className="text-sm font-medium text-green-500">
                                    Disponível para Projetos
                                </span>
                            </div>
                        </motion.div>

                        {/* Redes sociais com efeitos aprimorados */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4"
                        >
                            {socialLinks.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative p-4 bg-neutral-900/80 hover:bg-[#3d43dd] text-neutral-400 hover:text-white rounded-full transition-all hover:scale-110 hover:rotate-3 cursor-pointer backdrop-blur-sm border border-neutral-800/50 hover:border-[#3d43dd]"
                                    aria-label={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                                    whileHover={{
                                        rotate: [0, -5, 5, 0],
                                        transition: { duration: 0.5 }
                                    }}
                                    onMouseEnter={textEnter}
                                    onMouseLeave={textLeave}
                                >
                                    <motion.span
                                        className="absolute -inset-1 bg-gradient-to-r from-[#3d43dd] to-[#6366f1] rounded-full blur opacity-0 group-hover:opacity-70 transition-opacity duration-500"
                                    />
                                    <span className="relative">
                                        {link.icon}
                                    </span>
                                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs bg-neutral-900 px-2 py-1 rounded pointer-events-none">
                                        {link.name}
                                    </span>
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>

                    {/* Coluna da direita - informações do perfil */}
                    <div className="lg:col-span-7">
                        <div className="bg-neutral-900/30 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-10 border border-neutral-800/30">
                            {/* Tag de destaque */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="mb-6 flex flex-wrap gap-3"
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3d43dd]/10 border border-[#3d43dd]/20 backdrop-blur-sm">
                                    <span className="w-2 h-2 rounded-full bg-[#3d43dd] animate-pulse"></span>
                                    <span className="text-sm font-medium bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">
                                        Especialista em IA
                                    </span>
                                </div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm">
                                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                                    <span className="text-sm font-medium text-purple-300">
                                        Engenheiro de WebServices
                                    </span>
                                </div>
                            </motion.div>

                            {/* Nome */}
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 cursor-pointer"
                                onMouseEnter={textEnter}
                                onMouseLeave={textLeave}
                            >
                                <span className="bg-gradient-to-r from-[#3d43dd] via-[#6366f1] to-[#818cf8] bg-clip-text text-transparent inline-block">
                                    Wagner Pereira
                                </span>
                                <motion.span
                                    className="inline-block h-8 sm:h-9 lg:h-10 w-[3px] ml-2 bg-white/70"
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                />
                            </motion.h1>

                            {/* Linha decorativa */}
                            <motion.div
                                className="h-px w-32 bg-gradient-to-r from-[#3d43dd] to-[#6366f1] rounded mb-8"
                                initial={{ width: 0, opacity: 0 }}
                                whileInView={{ width: 128, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            />
                            <Image
                                src="https://raw.githubusercontent.com/wagnerpereiradev/wagnerpereiradev/547d10ba55493858a9f58d59f7db365a9ca95674/profile-3d-contrib/profile-night-green.svg"
                                alt="Gráfico 3D de contribuições GitHub"
                                width={500}
                                height={200}
                                style={{ borderRadius: "2em", border: "1px solid #212121", filter: "blur(50px) saturate(2.5)", position: "absolute", zIndex: -1, opacity: 0.6 }}
                            />
                            {/* Descrição com efeito de digitação */}
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="text-base sm:text-lg text-neutral-300 mb-8 leading-relaxed"
                                onMouseEnter={textEnter}
                                onMouseLeave={textLeave}
                            >
                                {typingText}
                            </motion.p>

                            {/* Estatísticas chave */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
                            >
                                {[
                                    { value: "30+", label: "Projetos de IA" },
                                    { value: "2023+", label: "Atuando com IA Generativa" },
                                    { value: "25+", label: "APIs Desenvolvidas" },
                                    { value: "100%", label: "Foco em soluções escaláveis" }
                                ].map((stat, i) => (
                                    <motion.div
                                        key={`stat-${i}`}
                                        className="bg-neutral-800/40 backdrop-blur-sm rounded-xl p-4 border border-neutral-700/20"
                                        whileHover={{
                                            y: -5,
                                            backgroundColor: "rgba(61, 67, 221, 0.1)",
                                            borderColor: "rgba(61, 67, 221, 0.3)"
                                        }}
                                    >
                                        <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#3d43dd] via-[#6366f1] to-[#818cf8] bg-clip-text text-transparent">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-neutral-400">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Áreas de atuação */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                                className="mb-8"
                            >
                                <h3 className="text-lg font-medium text-white mb-4">Áreas de Atuação</h3>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        "Agentes de IA", "APIs e WebServices", "Automação de Processos",
                                        "Chatbots Avançados", "Fine-tuning de LLMs", "RAG Systems",
                                        "Integração de APIs", "Big Data"
                                    ].map((area) => (
                                        <span
                                            key={area}
                                            className="px-3 py-1.5 bg-neutral-800/30 text-neutral-300 rounded-full text-sm border border-neutral-700/20"
                                        >
                                            {area}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Botões de Ação */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.7, duration: 0.5 }}
                                className="flex flex-wrap gap-4"
                            >
                                <motion.a
                                    href="#contact"
                                    className="group rounded-full relative inline-flex items-center gap-2 p-1 overflow-hidden"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.97 }}
                                    onMouseEnter={textEnter}
                                    onMouseLeave={textLeave}
                                >
                                    {/* Gradiente animado de fundo */}
                                    <motion.div
                                        className="absolute -inset-2 bg-gradient-to-r from-[#3d43dd] via-[#6366f1] to-[#3d43dd] rounded-full opacity-70 blur-md"
                                        animate={{
                                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                        }}
                                        transition={{
                                            duration: 5,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                        style={{
                                            backgroundSize: "200% 200%"
                                        }}
                                    />

                                    {/* Efeito de brilho que se move */}
                                    <div className="absolute inset-0 w-1/4 h-full bg-white/20 blur-md skew-x-15 transform -translate-x-full group-hover:translate-x-[400%] transition-all duration-1000 ease-in-out"></div>

                                    {/* Conteúdo do botão com animação */}
                                    <div className="relative inline-flex items-center gap-3 px-7 py-3.5 bg-gradient-to-br from-neutral-900 to-neutral-900/90 backdrop-blur-sm rounded-full text-white font-medium shadow-lg shadow-[#3d43dd]/25 group-hover:shadow-[#3d43dd]/40 transition-all duration-300">
                                        {/* Ícone animado */}
                                        <motion.div
                                            animate={{ rotate: [0, 10, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                                                <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                                            </svg>
                                        </motion.div>
                                        <span className="relative group-hover:translate-x-1 transition-transform duration-300">
                                            Entre em contato
                                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white/30 group-hover:w-full transition-all duration-300"></span>
                                        </span>

                                        {/* Seta animada */}
                                        <motion.div
                                            className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12h14"></path>
                                                <path d="m12 5 7 7-7 7"></path>
                                            </svg>
                                        </motion.div>
                                    </div>
                                </motion.a>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Seção de tecnologias - versão com carrossel aprimorado */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="mt-16 sm:mt-24"
                >
                    {/* Título da seção */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-center mb-12 px-4 sm:px-6 lg:px-8"
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">
                            <span className="bg-gradient-to-r from-[#3d43dd] to-[#6366f1] bg-clip-text text-transparent">
                                Tecnologias
                            </span>
                            {" "}
                            <span className="relative inline-block">
                                que utilizo
                                <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3d43dd]/50 to-transparent"></div>
                            </span>
                        </h2>
                        <p className="text-neutral-400 max-w-2xl mx-auto">
                            Habilidades técnicas e ferramentas que fazem parte do meu arsenal para desenvolvimento de soluções digitais.
                        </p>
                    </motion.div>

                    {/* Container de viewport completa */}
                    <div className="relative w-screen left-[50%] right-[50%] -mx-[50vw] my-8">
                        <div className="overflow-hidden py-8 relative">
                            {/* Gradientes laterais para efeito de fade */}
                            <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-black to-transparent z-10"></div>
                            <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-black to-transparent z-10"></div>

                            {/* Versão animada para todos os dispositivos */}
                            <>
                                {/* Framer Motion Carousel - Primeira linha - animação para direita */}
                                <motion.div
                                    className="flex gap-8 py-4 mb-8 pl-8 pr-8"
                                    animate={{ x: [0, -2400] }}
                                    transition={{
                                        x: {
                                            repeat: Infinity,
                                            repeatType: "loop",
                                            duration: 80,
                                            ease: "linear",
                                        }
                                    }}
                                    style={{ willChange: "transform" }}
                                >
                                    {/* Tecnologias em ordem fixa para evitar erros de hidratação */}
                                    {firstRowTechnologies.map((tech, index) => (
                                        <motion.div
                                            key={`${tech.name}-${index}`}
                                            className="flex-shrink-0 w-32 h-32 bg-neutral-900/30 backdrop-blur-sm border border-neutral-800/30 rounded-xl flex flex-col items-center justify-center p-4 relative group"
                                            whileHover={{
                                                y: -5,
                                                scale: 1.03,
                                                transition: { duration: 0.2 }
                                            }}
                                        >
                                            <div className="absolute inset-0 bg-[#3d43dd]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                            <div className="h-16 w-16 mb-3 flex items-center justify-center relative z-10">
                                                <Image
                                                    src={tech.logo}
                                                    alt={tech.name}
                                                    width={50}
                                                    height={50}
                                                    className="object-contain max-h-16 group-hover:scale-105 transition-transform"
                                                    style={{ width: "auto", height: "auto" }}
                                                    loading="lazy"
                                                    sizes="50px"
                                                />
                                            </div>
                                            <p className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors text-center relative z-10">{tech.name}</p>
                                        </motion.div>
                                    ))}
                                    {/* Adicionando menos itens duplicados */}
                                    {firstRowTechnologies.slice(0, 8).map((tech, index) => (
                                        <motion.div
                                            key={`${tech.name}-dup-${index}`}
                                            className="flex-shrink-0 w-32 h-32 bg-neutral-900/30 backdrop-blur-sm border border-neutral-800/30 rounded-xl flex flex-col items-center justify-center p-4 relative group"
                                            whileHover={{
                                                y: -5,
                                                scale: 1.03,
                                                transition: { duration: 0.2 }
                                            }}
                                        >
                                            <div className="absolute inset-0 bg-[#3d43dd]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                            <div className="h-16 w-16 mb-3 flex items-center justify-center relative z-10">
                                                <Image
                                                    src={tech.logo}
                                                    alt={tech.name}
                                                    width={50}
                                                    height={50}
                                                    className="object-contain max-h-16 group-hover:scale-105 transition-transform"
                                                    style={{ width: "auto", height: "auto" }}
                                                    loading="lazy"
                                                    sizes="50px"
                                                />
                                            </div>
                                            <p className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors text-center relative z-10">{tech.name}</p>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                {/* Framer Motion Carousel - Segunda linha - animação para esquerda (direção oposta) */}
                                <motion.div
                                    className="flex gap-8 py-4 pl-8 pr-8"
                                    animate={{ x: [-2400, 0] }}
                                    transition={{
                                        x: {
                                            repeat: Infinity,
                                            repeatType: "loop",
                                            duration: 90,
                                            ease: "linear",
                                        }
                                    }}
                                    style={{ willChange: "transform" }}
                                >
                                    {/* Tecnologias em ordem reversa fixa para evitar erros de hidratação */}
                                    {secondRowTechnologies.map((tech, index) => (
                                        <motion.div
                                            key={`${tech.name}-reverse-${index}`}
                                            className="flex-shrink-0 w-32 h-32 bg-neutral-900/30 backdrop-blur-sm border border-neutral-800/30 rounded-xl flex flex-col items-center justify-center p-4 relative group"
                                            whileHover={{
                                                y: -5,
                                                scale: 1.03,
                                                transition: { duration: 0.2 }
                                            }}
                                        >
                                            <div className="absolute inset-0 bg-[#3d43dd]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                            <div className="h-16 w-16 mb-3 flex items-center justify-center relative z-10">
                                                <Image
                                                    src={tech.logo}
                                                    alt={tech.name}
                                                    width={50}
                                                    height={50}
                                                    className="object-contain max-h-16 group-hover:scale-105 transition-transform"
                                                    style={{ width: "auto", height: "auto" }}
                                                    loading="lazy"
                                                    sizes="50px"
                                                />
                                            </div>
                                            <p className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors text-center relative z-10">{tech.name}</p>
                                        </motion.div>
                                    ))}
                                    {/* Itens duplicados em ordem diferente mas determinística */}
                                    {secondRowDuplicates.slice(0, 10).map((tech, index) => (
                                        <motion.div
                                            key={`${tech.name}-rev-dup-${index}`}
                                            className="flex-shrink-0 w-32 h-32 bg-neutral-900/30 backdrop-blur-sm border border-neutral-800/30 rounded-xl flex flex-col items-center justify-center p-4 relative group"
                                            whileHover={{
                                                y: -5,
                                                scale: 1.03,
                                                transition: { duration: 0.2 }
                                            }}
                                        >
                                            <div className="absolute inset-0 bg-[#3d43dd]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                            <div className="h-16 w-16 mb-3 flex items-center justify-center relative z-10">
                                                <Image
                                                    src={tech.logo}
                                                    alt={tech.name}
                                                    width={50}
                                                    height={50}
                                                    className="object-contain max-h-16 group-hover:scale-105 transition-transform"
                                                    style={{ width: "auto", height: "auto" }}
                                                    loading="lazy"
                                                    sizes="50px"
                                                />
                                            </div>
                                            <p className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors text-center relative z-10">{tech.name}</p>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </>

                            {/* Simplificando indicadores de deslizamento */}
                            <div className="mt-8 flex justify-center gap-1 px-4 sm:px-6 lg:px-8">
                                <div className="w-12 h-1 bg-[rgba(61,67,221,0.5)] rounded-full"></div>
                                <div className="w-12 h-1 bg-[rgba(61,67,221,0.3)] rounded-full"></div>
                                <div className="w-12 h-1 bg-[rgba(61,67,221,0.3)] rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
} 