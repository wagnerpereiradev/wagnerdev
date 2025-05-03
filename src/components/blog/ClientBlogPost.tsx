'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { formatDate } from '@/utils/formatDate';
import { getPostBySlug } from '@/data/blog-posts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContentRenderer from '@/components/blog/ContentRenderer';
import AuthorCard from '@/components/blog/AuthorCard';
import TagList from '@/components/blog/TagList';
import ShareButtons from '@/components/blog/ShareButtons';
import AdContainer from '@/components/blog/AdContainer';
import Link from 'next/link';

interface ClientBlogPostProps {
    slug: string;
}

export default function ClientBlogPost({ slug }: ClientBlogPostProps) {
    const router = useRouter();
    const contentRef = useRef<HTMLDivElement>(null);

    const post = getPostBySlug(slug);

    useEffect(() => {
        if (!post) {
            router.push('/blog');
        }
    }, [post, router]);

    if (!post) {
        return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
    }

    return (
        <main className="bg-neutral-950 text-neutral-100 pt-17">
            <Navbar />

            {/* Imagem de capa em largura total */}
            <div className="flex m-auto justify-center bg-black pb-0 sm:pb-14">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-2 w-full h-[33vh] sm:h-[33vh] sm:max-w-4xl overflow-hidden rounded-b-4xl"
                >
                    <Image
                        src={post.cover_image.url}
                        alt={post.cover_image.alt}
                        width={1200}
                        height={628}
                        className="w-full h-full object-cover"
                        style={{ width: '100%', height: 'auto' }}
                        quality={85}
                        priority={true}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1200px"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2hN4pMwAAAABJRU5ErkJggg=="
                    />

                    {/* Legenda da imagem no topo */}
                    {post.cover_image.caption && (
                        <div className="absolute bottom-6 right-6 max-w-xs p-2 bg-[rgba(0,0,0,0.6)] backdrop-blur-lg rounded-2xl">
                            <p className="text-sm text-neutral-300 text-right">{post.cover_image.caption}</p>
                        </div>
                    )}
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="absolute z-1 filter blur-[250px] w-full h-[33vh] sm:h-[33vh] sm:max-w-4xl hidden lg:block overflow-hidden"
                >
                    <Image
                        src={post.cover_image.url}
                        alt={post.cover_image.alt}
                        width={1200}
                        height={628}
                        className="w-full h-full object-cover opacity-50"
                        style={{ width: '100%', height: 'auto' }}
                        quality={10}
                        priority={false}
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1200px"
                    />
                </motion.div>
            </div>

            <header className="relative pt-14 pb-16 overflow-hidden">
                {/* Fundo com gradiente e efeitos */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-neutral-950">
                        <div className="absolute inset-0 opacity-50 bg-[url('/images/grid-pattern.svg')]"></div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[rgba(61,67,221,0.03)] via-transparent to-[rgba(61,67,221,0.03)]"></div>
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(61,67,221,0.15)] to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(61,67,221,0.15)] to-transparent"></div>
                </div>

                {/* Elementos decorativos com opacidade reduzida */}
                <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-[rgba(61,67,221,0.03)] blur-[100px] animate-pulse"
                    style={{ animationDuration: '8s' }} />
                <div className="absolute bottom-20 right-[10%] w-96 h-96 rounded-full bg-[rgba(61,67,221,0.03)] blur-[120px] animate-pulse"
                    style={{ animationDuration: '10s' }} />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Tag decorativa */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-center mb-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(61,67,221,0.1)] border border-[rgba(61,67,221,0.2)] backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-[#3d43dd] animate-pulse"></span>
                            <span className="text-sm font-medium bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">
                                {post.category}
                            </span>
                        </div>
                    </motion.div>

                    {/* Título do post */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6 leading-tight"
                    >
                        {post.headline}
                    </motion.h1>

                    {/* Metadados do post */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-neutral-400 mb-8"
                    >
                        <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{post.reading_time}</span>
                        </div>

                        <div className="hidden sm:block w-1 h-1 rounded-full bg-neutral-700" />

                        <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{formatDate(post.date)}</span>
                        </div>

                        <div className="hidden sm:block w-1 h-1 rounded-full bg-neutral-700" />

                        <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>{post.author.name}</span>
                        </div>
                    </motion.div>

                    {/* Tags */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex justify-center mb-10"
                    >
                        <TagList tags={post.tags} />
                    </motion.div>

                    {/* Resumo */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mb-12"
                    >
                        <div className="bg-[rgba(23,23,23,0.3)] backdrop-blur-sm border border-[rgba(38,38,38,0.5)] rounded-xl p-6">
                            <p className="text-lg text-neutral-300 leading-relaxed">{post.summary}</p>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* Anúncio antes do conteúdo - mostra o primeiro anúncio definido no post */}
            {post.ads && post.ads.length > 0 && (
                <div className="max-w-3xl mx-auto px-3 sm:px-4 lg:px-8 -mt-3 mb-8">
                    <AdContainer
                        adIds={post.ads}
                        maxAds={post.ads.length}
                        position="in-content"
                        rotationInterval={60} // Alternar a cada 1 minuto
                    />
                </div>
            )}

            {/* Conteúdo do artigo */}
            <div ref={contentRef} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <ContentRenderer blocks={post.body} />

                {/* Botões de compartilhamento e autor */}
                <div className="mt-16 sm:mt-20 border-t border-neutral-800 pt-8">
                    <ShareButtons
                        url={`https://wagnerai.me/blog/${post.slug}`}
                        title={post.headline}
                        summary={post.summary}
                    />

                    <div className="mt-8">
                        <AuthorCard author={post.author} socialLinks={post.social} />
                    </div>

                    {/* Anúncio após o card do autor - rotaciona todos os anúncios definidos no post */}
                    <div className="mt-10 sm:mt-12">
                        {post.ads && post.ads.length > 0 ? (
                            <AdContainer
                                adIds={post.ads}
                                maxAds={post.ads.length}
                                position="footer"
                                rotationInterval={60} // Alternar a cada 1 minuto
                            />
                        ) : (
                            <AdContainer position="footer" maxAds={1} />
                        )}
                    </div>
                </div>
            </div>

            {/* CTA e navegação */}
            <section className="py-16 bg-neutral-950">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden p-0.5 rounded-3xl bg-gradient-to-r from-[rgba(61,67,221,0.6)] via-[rgba(99,102,241,0.6)] to-[rgba(61,67,221,0.6)] shadow-2xl">
                        <div className="bg-[rgba(0,0,0,0.8)] backdrop-blur-xl rounded-[22px] p-12 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-50"></div>

                            <div className="relative z-10 text-center">
                                <h2 className="text-3xl font-bold mb-4">Gostou do conteúdo?</h2>
                                <p className="text-neutral-400 mb-8 max-w-2xl mx-auto">
                                    Confira outros artigos ou entre em contato para discutirmos seu próximo projeto.
                                </p>
                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                    <Link
                                        href="/blog"
                                        className="px-6 py-3 rounded-lg bg-neutral-800 text-white font-medium hover:bg-neutral-700 transition-colors"
                                    >
                                        Ver mais artigos
                                    </Link>
                                    <Link
                                        href="#contact"
                                        className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#3d43dd] to-[#6366f1] text-white font-medium hover:shadow-lg hover:shadow-[rgba(61,67,221,0.2)] transition-all"
                                    >
                                        Entre em contato
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
} 