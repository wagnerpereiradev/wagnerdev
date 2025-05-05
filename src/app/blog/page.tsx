'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { blogPosts } from '@/data/blog-posts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/blog/BlogCard';
import { useToast } from '@/components/ui/Toast';
import { ContentBlock } from '@/types/blog';

export default function BlogIndex() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { showToast, ToastComponent } = useToast();

    // Extrair categorias únicas
    const categories = ['Todos', ...new Set(blogPosts.map(post => post.category))];

    // Ordenar posts por data (do mais recente para o mais antigo)
    const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Função auxiliar para buscar texto no conteúdo do post
    const searchInContent = (blocks: ContentBlock[], term: string): boolean => {
        const lowerTerm = term.toLowerCase();
        return blocks.some(block => {
            if (block.type === 'markdown') {
                return block.content.toLowerCase().includes(lowerTerm);
            }
            if (block.type === 'code') {
                return block.content.toLowerCase().includes(lowerTerm);
            }
            return false;
        });
    };

    // Filtrar posts com base na categoria e pesquisa
    const filteredPosts = sortedPosts.filter(post => {
        const matchesCategory = !selectedCategory || selectedCategory === 'Todos' || post.category === selectedCategory;

        // Se não há termo de busca, apenas verifica a categoria
        if (searchTerm === '') {
            return matchesCategory;
        }

        // Busca principal nos metadados
        const matchesMetadata =
            post.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

        // Busca no conteúdo do corpo do post
        const matchesContent = searchInContent(post.body, searchTerm);

        // Post corresponde se está na categoria selecionada e encontrou o termo em qualquer lugar
        return matchesCategory && (matchesMetadata || matchesContent);
    });

    return (
        <main className="bg-neutral-950 text-neutral-100">
            {ToastComponent}
            <Navbar />

            <header className="relative pt-32 pb-20 overflow-hidden">
                {/* Fundo com gradiente e efeitos */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-neutral-950">
                        <div className="absolute inset-0 opacity-50 bg-[url('/images/grid-pattern.svg')]"></div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#3d43dd]/3 via-transparent to-[#3d43dd]/3"></div>
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3d43dd]/15 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3d43dd]/15 to-transparent"></div>
                </div>

                {/* Elementos decorativos */}
                <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-[#3d43dd]/3 blur-[100px] animate-pulse"
                    style={{ animationDuration: '8s' }} />
                <div className="absolute bottom-20 right-[10%] w-96 h-96 rounded-full bg-[#3d43dd]/3 blur-[120px] animate-pulse"
                    style={{ animationDuration: '10s' }} />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Tag decorativa */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-center mb-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3d43dd]/10 border border-[#3d43dd]/20 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-[#3d43dd] animate-pulse"></span>
                            <span className="text-sm font-medium bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">
                                Artigos e Tutoriais
                            </span>
                        </div>
                    </motion.div>

                    {/* Título */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-6"
                    >
                        <span className="bg-gradient-to-r from-[#3d43dd] to-[#6366f1] bg-clip-text text-transparent">
                            Blog
                        </span>
                        {" "}
                        <span className="relative inline-block">
                            Trendbyte
                            <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3d43dd]/50 to-transparent"></div>
                        </span>
                    </motion.h1>

                    {/* Descrição */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-neutral-400 max-w-2xl mx-auto text-center leading-relaxed mb-12"
                    >
                        Artigos, tutoriais e dicas sobre desenvolvimento web, programação,
                        design e muito mais para expandir seus conhecimentos técnicos.
                    </motion.p>

                    {/* Filtros e Pesquisa */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12"
                    >
                        {/* Filtro de categorias */}
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category === 'Todos' ? null : category)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${(category === 'Todos' && !selectedCategory) || category === selectedCategory
                                        ? 'bg-gradient-to-r from-[#3d43dd] to-[#6366f1] text-white'
                                        : 'bg-neutral-900/50 text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Campo de busca */}
                        <div className="relative w-full md:w-auto">
                            <input
                                type="text"
                                placeholder="Buscar em todo o conteúdo..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full md:w-64 px-4 py-2 pl-10 bg-neutral-900/50 border border-neutral-800/50 rounded-lg text-white focus:border-[#3d43dd]/50 focus:outline-none focus:ring-1 focus:ring-[#3d43dd]/30"
                            />
                            <svg
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* Lista de posts */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map((post, index) => (
                                <BlogCard key={post.slug} post={post} index={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <h3 className="text-xl text-neutral-300 mb-2">Nenhum artigo encontrado</h3>
                            <p className="text-neutral-500">Tente outra busca ou categoria</p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Newsletter */}
            <section className="py-16 bg-neutral-950">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden p-0.5 rounded-3xl bg-gradient-to-r from-[#3d43dd]/60 via-[#6366f1]/60 to-[#3d43dd]/60 shadow-2xl">
                        <div className="bg-black/80 backdrop-blur-xl rounded-[22px] p-12 sm:p-16 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-50"></div>

                            <div className="relative z-10 text-center">
                                <h2 className="text-3xl font-bold mb-4">Receba novidades em seu email</h2>
                                <p className="text-neutral-400 mb-8 max-w-2xl mx-auto">
                                    Inscreva-se para receber novos artigos, tutoriais e recursos exclusivos diretamente em sua caixa de entrada.
                                </p>

                                <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4" onSubmit={async (e) => {
                                    e.preventDefault();

                                    // Armazenar o formulário em uma referência e capturar o valor do email imediatamente
                                    const form = e.currentTarget;
                                    const emailInput = (form.querySelector('input[type="email"]') as HTMLInputElement)?.value;

                                    if (!emailInput || !emailInput.includes('@')) {
                                        showToast('Por favor, informe um email válido.', 'warning');
                                        return;
                                    }

                                    // Estado local para controlar o estado do formulário
                                    const buttonEl = form.querySelector('button');

                                    try {
                                        if (buttonEl) {
                                            // Guardamos o texto original dentro do bloco try para eliminar a variável não utilizada
                                            const loadingHtml = '<svg class="animate-spin -ml-1 mr-2 h-5 w-5 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processando...';
                                            buttonEl.innerHTML = loadingHtml;
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

                                        // Sucesso - verifique se o formulário ainda existe antes de limpar o campo
                                        const emailField = form.querySelector('input[type="email"]') as HTMLInputElement;
                                        if (emailField) {
                                            emailField.value = '';
                                        }
                                        showToast('Inscrição realizada com sucesso! Verifique seu email para confirmar.', 'success');

                                    } catch (error) {
                                        console.error('Erro ao enviar formulário:', error);
                                        showToast(error instanceof Error ? error.message : 'Ocorreu um erro ao processar sua inscrição. Tente novamente.', 'error');
                                    } finally {
                                        // Restaura o botão se ele ainda existir
                                        if (buttonEl && document.body.contains(buttonEl)) {
                                            buttonEl.innerHTML = 'Inscrever-se';
                                            buttonEl.disabled = false;
                                        }
                                    }
                                }}>
                                    <input
                                        type="email"
                                        placeholder="Seu melhor email"
                                        className="flex-1 px-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-lg text-white focus:border-[#3d43dd]/50 focus:outline-none focus:ring-1 focus:ring-[#3d43dd]/30"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#3d43dd] to-[#6366f1] text-white font-medium hover:shadow-lg hover:shadow-[#3d43dd]/20 transition-all"
                                    >
                                        Inscrever-se
                                    </button>
                                </form>

                                <p className="text-neutral-500 text-sm mt-4">
                                    Não se preocupe, você pode cancelar a qualquer momento.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
} 