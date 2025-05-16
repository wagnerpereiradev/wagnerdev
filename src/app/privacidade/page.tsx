'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function PrivacyPolicy() {
    // Rolar para o topo quando a página carregar
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="bg-neutral-950 text-neutral-100 cursor-default select-none">
            <Navbar />

            <section className="relative py-24 md:py-32 overflow-hidden">
                {/* Fundo e efeitos decorativos */}
                <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat opacity-75"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-[#3d43dd]/5 to-neutral-950 opacity-80"></div>

                {/* Luzes e efeitos no fundo */}
                <div className="absolute top-1/4 -left-24 w-72 h-72 rounded-full bg-[#3d43dd]/10 blur-[80px] opacity-50"></div>
                <div className="absolute bottom-1/3 -right-24 w-72 h-72 rounded-full bg-[#3d43dd]/10 blur-[80px] opacity-50"></div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Tag decorativa - igual às outras seções */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-center mb-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3d43dd]/10 border border-[#3d43dd]/20 backdrop-blur-sm">
                            <motion.span
                                className="w-2 h-2 rounded-full bg-[#3d43dd]"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                            ></motion.span>
                            <span className="text-sm font-medium bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">
                                Documento Legal
                            </span>
                        </div>
                    </motion.div>

                    {/* Título principal com animação */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-center mb-12"
                    >
                        <div className="relative inline-block">
                            <motion.div
                                className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-[#3d43dd]/10 blur-xl"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 0.8, 0.5]
                                }}
                                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                            />
                            <motion.div
                                className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-[#3d43dd]/10 blur-xl"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 0.8, 0.5]
                                }}
                                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                            />
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                                Política de{" "}
                                <span className="bg-gradient-to-r from-[#3d43dd] to-[#6366f1] bg-clip-text text-transparent relative inline-block">
                                    Privacidade
                                    <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3d43dd]/50 to-transparent"></div>
                                </span>
                            </h1>
                        </div>
                    </motion.div>

                    {/* Data de atualização */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-center mb-12"
                    >
                        <p className="text-neutral-400">Última atualização: 15 de Julho de 2023</p>
                    </motion.div>

                    {/* Conteúdo da política */}
                    <motion.div
                        className="prose prose-invert prose-lg max-w-none bg-neutral-900/30 backdrop-blur-sm p-8 rounded-2xl border border-neutral-800/50 shadow-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">1. Introdução</h2>
                        <p className="text-neutral-300 mb-6">
                            Esta Política de Privacidade descreve como suas informações pessoais são coletadas, usadas e compartilhadas quando você visita ou interage com o site <span className="text-[#3d43dd]">wagnerai.me</span> ("Site").
                        </p>

                        <h2 className="text-2xl font-bold text-white mb-4 mt-10">2. Informações que Coletamos</h2>
                        <p className="text-neutral-300 mb-4">
                            <strong className="text-white">Informações de Navegação:</strong> Quando você visita o Site, coletamos automaticamente certas informações sobre seu dispositivo, incluindo informações sobre seu navegador, endereço IP, fuso horário e alguns dos cookies instalados em seu dispositivo.
                        </p>
                        <p className="text-neutral-300 mb-4">
                            <strong className="text-white">Informações de Uso:</strong> Também coletamos informações sobre as páginas individuais que você visualiza, quais sites ou termos de pesquisa o encaminharam para o Site e informações sobre como você interage com o Site.
                        </p>
                        <p className="text-neutral-300 mb-6">
                            <strong className="text-white">Informações de Contato:</strong> Quando você preenche um formulário de contato ou se inscreve em nossa newsletter, coletamos seu nome e endereço de e-mail.
                        </p>

                        <h2 className="text-2xl font-bold text-white mb-4 mt-10">3. Como Usamos Suas Informações</h2>
                        <p className="text-neutral-300 mb-4">
                            Usamos as informações que coletamos para:
                        </p>
                        <ul className="list-disc pl-5 text-neutral-300 mb-6">
                            <li className="mb-2">Melhorar e otimizar nosso Site (por exemplo, analisando o comportamento dos visitantes);</li>
                            <li className="mb-2">Responder a suas solicitações, perguntas e comentários;</li>
                            <li className="mb-2">Enviar informações ou materiais que você solicitou;</li>
                            <li className="mb-2">Enviar nossa newsletter, caso você tenha se inscrito;</li>
                            <li>Proteger nosso Site contra atividades fraudulentas ou não autorizadas.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-white mb-4 mt-10">4. Compartilhamento de Informações</h2>
                        <p className="text-neutral-300 mb-6">
                            Não compartilhamos suas Informações Pessoais com terceiros, exceto conforme descrito nesta Política de Privacidade. Podemos compartilhar suas Informações Pessoais com provedores de serviços terceirizados que nos ajudam a operar nosso site, como Google Analytics, serviços de hospedagem e provedores de e-mail.
                        </p>

                        <h2 className="text-2xl font-bold text-white mb-4 mt-10">5. Cookies e Tecnologias Semelhantes</h2>
                        <p className="text-neutral-300 mb-4">
                            Este Site utiliza cookies para melhorar sua experiência enquanto você navega pelo site. Os cookies são pequenos arquivos de texto armazenados no seu dispositivo que nos ajudam a:
                        </p>
                        <ul className="list-disc pl-5 text-neutral-300 mb-6">
                            <li className="mb-2">Manter você conectado;</li>
                            <li className="mb-2">Lembrar suas preferências;</li>
                            <li className="mb-2">Entender como você usa o Site;</li>
                            <li>Melhorar o Site com base em informações de uso.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-white mb-4 mt-10">6. Google Analytics</h2>
                        <p className="text-neutral-300 mb-6">
                            Utilizamos o Google Analytics para analisar o uso do nosso site. O Google Analytics coleta informações sobre o uso do site por meio de cookies. As informações coletadas relativas ao nosso site são usadas para criar relatórios sobre o uso do site. A política de privacidade do Google está disponível em: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#3d43dd] hover:text-[#6366f1] underline">https://policies.google.com/privacy</a>
                        </p>

                        <h2 className="text-2xl font-bold text-white mb-4 mt-10">7. Seus Direitos</h2>
                        <p className="text-neutral-300 mb-4">
                            Se você é residente da União Europeia, você tem o direito de acessar as informações pessoais que mantemos sobre você e solicitar que suas informações pessoais sejam corrigidas, atualizadas ou excluídas. Se você deseja exercer este direito, entre em contato conosco.
                        </p>
                        <p className="text-neutral-300 mb-6">
                            Adicionalmente, se você é residente da União Europeia, notamos que estamos processando suas informações para cumprir contratos que possamos ter com você ou para buscar nossos interesses comerciais legítimos listados acima.
                        </p>

                        <h2 className="text-2xl font-bold text-white mb-4 mt-10">8. Retenção de Dados</h2>
                        <p className="text-neutral-300 mb-6">
                            Quando você entra em contato através do formulário no site ou se inscreve em nossa newsletter, mantemos suas informações em nossos registros até que você nos peça para excluí-las.
                        </p>

                        <h2 className="text-2xl font-bold text-white mb-4 mt-10">9. Alterações</h2>
                        <p className="text-neutral-300 mb-6">
                            Podemos atualizar esta política de privacidade de tempos em tempos para refletir, por exemplo, mudanças em nossas práticas ou por outros motivos operacionais, legais ou regulatórios. As alterações entrarão em vigor assim que a política de privacidade revisada for publicada no Site.
                        </p>

                        <h2 className="text-2xl font-bold text-white mb-4 mt-10">10. Contato</h2>
                        <p className="text-neutral-300 mb-6">
                            Para mais informações sobre nossas práticas de privacidade, se tiver dúvidas ou se quiser fazer uma reclamação, entre em contato conosco por e-mail em <a href="mailto:dpo@wagnerai.me" className="text-[#3d43dd] hover:text-[#6366f1] underline">dpo@wagnerai.me</a>.
                        </p>
                    </motion.div>

                    {/* Botão de voltar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-12 text-center"
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3d43dd]/20 to-[#3d43dd]/10 text-white rounded-full border border-[#3d43dd]/30 hover:border-[#3d43dd]/50 transition-all duration-300 group"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-[#3d43dd] group-hover:-translate-x-1 transition-transform duration-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Voltar para a página inicial
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
} 