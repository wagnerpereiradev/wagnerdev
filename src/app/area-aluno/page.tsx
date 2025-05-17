'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ConteudoCarreiraIA() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [userEmail, setUserEmail] = useState('');

    // Verificar se já está autenticado no localStorage
    useEffect(() => {
        // Acessar localStorage apenas no lado do cliente
        if (typeof window !== 'undefined') {
            const authenticated = localStorage.getItem('carreira_ia_authenticated');
            const storedEmail = localStorage.getItem('carreira_ia_user_email');

            if (authenticated === 'true') {
                setIsAuthenticated(true);
                setUserEmail(storedEmail || '');
            }

            setIsLoading(false);
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch('/api/verificar-acesso', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                localStorage.setItem('carreira_ia_authenticated', 'true');
                localStorage.setItem('carreira_ia_user_email', email);
                setIsAuthenticated(true);
                setUserEmail(email);
                setError('');
            } else {
                setError(data.message || 'Erro ao verificar as credenciais. Por favor, verifique e tente novamente.');
                setPassword('');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('carreira_ia_authenticated');
        localStorage.removeItem('carreira_ia_user_email');
        setIsAuthenticated(false);
        setUserEmail('');
    };

    if (isLoading) {
        return (
            <main className="bg-neutral-950 text-neutral-100 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-t-[#3d43dd] border-neutral-800 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-neutral-300">Carregando...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-neutral-950 text-neutral-100 min-h-screen">
            <Navbar />

            {/* Background effects */}
            <div className="fixed inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-30 pointer-events-none"></div>
            <div className="fixed inset-0 bg-gradient-to-b from-neutral-950 via-[#3d43dd]/5 to-neutral-950 opacity-90 pointer-events-none"></div>
            <div className="fixed top-1/4 -left-24 w-96 h-96 rounded-full bg-[#3d43dd]/10 blur-[100px] opacity-50 pointer-events-none"></div>
            <div className="fixed bottom-1/3 -right-24 w-96 h-96 rounded-full bg-[#3d43dd]/10 blur-[100px] opacity-50 pointer-events-none"></div>

            <section className="relative py-24 px-4 z-10">
                <div className="max-w-6xl mx-auto">
                    {!isAuthenticated ? (
                        <div className="flex flex-col md:flex-row items-center gap-12">
                            {/* Coluna esquerda - Informações */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.7 }}
                                className="flex-1 max-w-xl"
                            >
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                                    Área <span className="bg-gradient-to-r from-[#3d43dd] to-[#6366f1] bg-clip-text text-transparent">Exclusiva</span> de Alunos
                                </h1>

                                <p className="text-lg text-neutral-300 mb-8">
                                    Acesse o conteúdo completo do treinamento <span className="font-semibold text-white">Carreira 5.0: Alavanque sua Carreira com IA</span> e comece sua transformação profissional agora mesmo.
                                </p>

                                <div className="space-y-6 mb-8">
                                    {[
                                        "Acesso vitalício a todo o conteúdo",
                                        "Atualizações constantes com novas ferramentas",
                                        "Comunidade exclusiva para networking",
                                        "Suporte prioritário para suas dúvidas"
                                    ].map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: 0.1 * i }}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-[#3d43dd]/20 flex items-center justify-center flex-shrink-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#3d43dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <p className="text-neutral-200">{item}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="p-4 bg-neutral-900/50 border border-neutral-800/50 rounded-lg">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-[#3d43dd]/20 flex items-center justify-center flex-shrink-0 mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3d43dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-white font-medium mb-1">Precisa de ajuda?</h3>
                                            <p className="text-neutral-400 text-sm">
                                                Se estiver com problemas para acessar, entre em contato através do email <span className="text-[#3d43dd]">suporte@wagnerai.me</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Coluna direita - Formulário */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="w-full md:w-auto md:min-w-[400px] lg:min-w-[450px]"
                            >
                                <div className="relative">
                                    {/* Efeito de brilho em torno do card */}
                                    <div className="absolute -inset-1 bg-gradient-to-r from-[#3d43dd]/20 to-[#6366f1]/20 rounded-2xl blur-lg opacity-70"></div>

                                    <div className="relative bg-neutral-900/80 backdrop-blur-sm p-8 rounded-xl border border-neutral-800/80 shadow-xl">
                                        <div className="text-center mb-8">
                                            <div className="w-16 h-16 rounded-full bg-[#3d43dd]/20 mx-auto flex items-center justify-center mb-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#3d43dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </div>
                                            <h2 className="text-2xl font-bold mb-2">Acesse sua conta</h2>
                                            <p className="text-neutral-400 text-sm">
                                                Digite seu email e a senha para acessar o treinamento
                                            </p>
                                        </div>

                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-5">
                                                <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                                                    Email
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                                        </svg>
                                                    </div>
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="w-full pl-10 pr-4 py-3 bg-neutral-800/70 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d43dd] text-white"
                                                        placeholder="Seu email de compra"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="mb-6">
                                                <div className="flex items-center justify-between mb-2">
                                                    <label htmlFor="password" className="block text-sm font-medium text-neutral-300">
                                                        Senha
                                                    </label>
                                                </div>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                        </svg>
                                                    </div>
                                                    <input
                                                        type="password"
                                                        id="password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        className="w-full pl-10 pr-4 py-3 bg-neutral-800/70 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3d43dd] text-white"
                                                        placeholder="Senha de acesso"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            {error && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="mb-4 p-3 bg-red-900/40 border border-red-800 rounded-lg text-red-200 text-sm"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                        </svg>
                                                        {error}
                                                    </div>
                                                </motion.div>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className={`w-full bg-gradient-to-r from-[#3d43dd] to-[#6366f1] hover:from-[#4a4edf] hover:to-[#7679f3] text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 shadow-lg shadow-[#3d43dd]/20 flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-t-white border-white/30 rounded-full animate-spin mr-2"></div>
                                                        Verificando...
                                                    </>
                                                ) : (
                                                    <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                        </svg>
                                                        Acessar Conteúdo
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="bg-neutral-900/70 backdrop-blur-sm p-8 rounded-xl border border-neutral-800/80 shadow-xl"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-[#3d43dd]/20 flex items-center justify-center flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3d43dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold">Bem-vindo ao Treinamento Carreira 5.0</h1>
                                    <p className="text-neutral-400">
                                        Você está conectado como <span className="text-white font-medium">{userEmail}</span>
                                    </p>
                                </div>
                            </div>

                            <p className="text-xl text-neutral-300 mb-8">
                                Você agora tem acesso ao conteúdo completo. Abaixo você encontrará todos os módulos e materiais do treinamento.
                            </p>

                            {/* Conteúdo do treinamento será adicionado aqui posteriormente */}
                            <div className="p-6 bg-neutral-800/50 rounded-lg border border-neutral-700 mb-6">
                                <h2 className="text-xl font-semibold mb-4 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#3d43dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                    Módulos do Treinamento
                                </h2>

                                <div className="bg-neutral-900/50 rounded-lg p-10 flex flex-col items-center justify-center">
                                    <div className="w-16 h-16 bg-[#3d43dd]/20 rounded-full flex items-center justify-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#3d43dd]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-white mb-2">Conteúdo em Breve</h3>
                                    <p className="text-neutral-400 text-center max-w-md">
                                        O conteúdo completo será disponibilizado em breve. Estamos preparando materiais de alta qualidade para sua jornada de aprendizado.
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center text-neutral-400 hover:text-white transition-colors duration-300"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Sair da conta
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
} 