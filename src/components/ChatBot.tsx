'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

// Tipo para as mensagens
type Message = {
    id: string;
    isBot: boolean;
    text: string;
    loading?: boolean;
};

// Tipo para resposta da API
type ThreadMessage = {
    id: string;
    role: 'user' | 'assistant';
    text: string;
    created_at: number;
};

// Array de mensagens de carregamento para o shimmer
const loadingMessages = [
    "Elaborando uma resposta na velocidade da luz...",
    "Pensando em algo incrível para você...",
    "Conectando os neurônios digitais...",
    "Navegando pelo universo do conhecimento...",
    "Processando informações a milhões de bits por segundo..."
];

// Custom wrapper para markdown que evita problemas de hidratação
const SafeMarkdown = ({ children }: { children: string }) => {
    // Substitui blocos de código markdown com um marcador especial
    // para processá-los separadamente e evitar problemas de hidratação
    const processContent = () => {
        const parts = [];
        let lastIndex = 0;

        // Expressão regular para encontrar blocos de código
        const codeBlockRegex = /```([\s\S]*?)```/g;
        let match;

        while ((match = codeBlockRegex.exec(children)) !== null) {
            // Adiciona texto antes do bloco de código
            if (match.index > lastIndex) {
                parts.push({
                    type: 'text',
                    content: children.slice(lastIndex, match.index)
                });
            }

            // Adiciona o bloco de código
            parts.push({
                type: 'code',
                content: match[1]
            });

            lastIndex = match.index + match[0].length;
        }

        // Adiciona o restante do texto
        if (lastIndex < children.length) {
            parts.push({
                type: 'text',
                content: children.slice(lastIndex)
            });
        }

        return parts;
    };

    const parts = processContent();

    return (
        <div className="text-sm leading-relaxed break-words">
            {parts.map((part, index) => (
                <div key={index}>
                    {part.type === 'text' ? (
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            components={{
                                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                a: ({ href, children }) => (
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#3d43dd] hover:text-[#6366f1] transition-colors underline"
                                    >
                                        {children}
                                    </a>
                                ),
                                ul: ({ children }) => <ul className="mb-3 pl-4 list-disc">{children}</ul>,
                                ol: ({ children }) => <ol className="mb-3 pl-4 list-decimal">{children}</ol>,
                                li: ({ children }) => <li className="mb-1">{children}</li>,
                                blockquote: ({ children }) => (
                                    <blockquote className="pl-3 border-l-2 border-[#3d43dd]/50 italic text-neutral-400 my-2">
                                        {children}
                                    </blockquote>
                                ),
                                // @ts-expect-error ReactMarkdown types are complex
                                code: ({ inline, children, ...props }) => {
                                    if (inline) {
                                        return (
                                            <code
                                                className="bg-neutral-800 text-neutral-200 px-1 py-0.5 rounded text-xs font-mono"
                                                {...props}
                                            >
                                                {children}
                                            </code>
                                        );
                                    }
                                    // Blocos de código em linha serão processados 
                                    // separadamente, então não precisamos nos preocupar aqui
                                    return <code {...props}>{children}</code>;
                                },
                                pre: () => null, // Evitamos que o ReactMarkdown gere tags pre
                            }}
                        >
                            {part.content}
                        </ReactMarkdown>
                    ) : (
                        // Renderização segura de blocos de código
                        <div className="my-2">
                            <pre style={{ maxWidth: '100%', boxSizing: 'border-box' }} className="bg-neutral-800/50 p-2 rounded-md overflow-x-auto custom-scrollbar">
                                <code className="text-xs font-mono" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                    {part.content}
                                </code>
                            </pre>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', isBot: true, text: "Olá! Como posso ajudar você hoje?" },
    ]);
    const [threadId, setThreadId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
    const [showScrollBottom, setShowScrollBottom] = useState(false);
    const [autoScroll, setAutoScroll] = useState(true);
    const [isTyping, setIsTyping] = useState(false);
    const chatRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messageContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Carregar threadId do localStorage quando o componente inicializar
    useEffect(() => {
        const savedThreadId = localStorage.getItem('chatbot_threadId');
        if (savedThreadId) {
            setThreadId(savedThreadId);
            fetchMessageHistory(savedThreadId);
        }
    }, []);

    // Salvar threadId no localStorage quando ele mudar
    useEffect(() => {
        if (threadId) {
            localStorage.setItem('chatbot_threadId', threadId);
        }
    }, [threadId]);

    // Fechar o chat ao clicar fora dele
    useEffect(() => {
        // Não adicionar listener se o chat não estiver aberto
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            // Verifica se o clique foi no botão flutuante para evitar comportamento conflitante
            const isClickOnFloatingButton = (event.target as Element)?.closest('.floating-chat-button');

            if (chatRef.current &&
                !chatRef.current.contains(event.target as Node) &&
                !isClickOnFloatingButton &&
                isOpen) {
                setIsOpen(false);
            }
        };

        // Usar mousedown para capturar o evento antes de outros handlers
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Scroll para a última mensagem
    useEffect(() => {
        if (autoScroll && messages.length > 0) {
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }, [messages, autoScroll]);

    // Alternar mensagens de carregamento a cada 3 segundos
    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setLoadingMessageIndex(prevIndex =>
                    (prevIndex + 1) % loadingMessages.length
                );
            }, 3000);

            return () => clearInterval(interval);
        }
    }, [isLoading]);

    // Controla a visibilidade do botão de scroll para o final e o comportamento de auto-scroll
    useEffect(() => {
        const container = messageContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            // Calcula a distância até o final do scroll
            const { scrollTop, scrollHeight, clientHeight } = container;
            const distanceToBottom = scrollHeight - scrollTop - clientHeight;

            // Mostrar botão quando não estiver próximo do final (com uma margem maior para evitar falsos positivos)
            setShowScrollBottom(distanceToBottom > 50);

            // Habilitar auto-scroll apenas quando o usuário está próximo do final
            setAutoScroll(distanceToBottom < 10);
        };

        // Adicionar o evento de scroll ao container
        container.addEventListener('scroll', handleScroll);

        // Verificar inicialmente o scroll com um pequeno atraso para garantir render completo
        setTimeout(handleScroll, 100);

        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [messages]);

    // Função para rolar até o final do chat
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        setAutoScroll(true);
    };

    // Forçar scroll para o final quando o chat é aberto
    useEffect(() => {
        if (isOpen && messages.length > 0) {
            setTimeout(() => {
                scrollToBottom();

                // Garantir que o botão não apareça imediatamente quando o chat é aberto
                setShowScrollBottom(false);
            }, 300);
        }
    }, [isOpen, messages.length]);

    // Verificação adicional para esconder o botão de scroll quando carregamentos ocorrem
    useEffect(() => {
        if (isLoading) {
            setShowScrollBottom(false);
        }
    }, [isLoading]);

    // Focus no input quando o chat é aberto
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 500);
        }
    }, [isOpen]);

    // Função para buscar o histórico de mensagens da thread
    const fetchMessageHistory = async (threadId: string) => {
        try {
            // Mostrar um loader enquanto busca as mensagens
            setIsLoading(true);

            const response = await fetch(`/api/chat?threadId=${threadId}`);

            if (!response.ok) {
                throw new Error('Falha ao buscar histórico de mensagens');
            }

            const data = await response.json();

            if (data.messages && data.messages.length > 0) {
                // Converter as mensagens da API para o formato usado pelo componente
                const formattedMessages: Message[] = [
                    // Manter a mensagem de boas-vindas
                    { id: '1', isBot: true, text: "Olá! Como posso ajudar você hoje?" }
                ];

                // Ordenar as mensagens por data (mais antigas primeiro)
                const sortedMessages = [...data.messages].sort((a, b) => a.created_at - b.created_at);

                // Converter e adicionar cada mensagem ao array
                sortedMessages.forEach((msg: ThreadMessage) => {
                    formattedMessages.push({
                        id: msg.id,
                        isBot: msg.role === 'assistant',
                        text: msg.text
                    });
                });

                // Atualizar o estado de mensagens
                setMessages(formattedMessages);
            }
        } catch (error) {
            console.error('Erro ao buscar histórico:', error);
            // Não precisamos mostrar um erro para o usuário, 
            // apenas mantemos as mensagens padrão
        } finally {
            setIsLoading(false);
        }
    };

    // Função para enviar mensagem para a API
    const sendMessage = async (userMessage: string) => {
        // Escolhe um índice aleatório para a mensagem de carregamento inicial
        setLoadingMessageIndex(Math.floor(Math.random() * loadingMessages.length));

        // Adiciona a mensagem do usuário ao chat
        const userMessageObj: Message = {
            id: Date.now().toString(),
            isBot: false,
            text: userMessage
        };

        // Efeito visual de limpar o input antes de atualizar o estado
        setInputValue('');
        // Desativa o estado de digitação
        setIsTyping(false);

        // Atualiza as mensagens com a mensagem do usuário
        setMessages(prev => [...prev, userMessageObj]);
        setIsLoading(true);

        try {
            // Adicionando um placeholder de loader que será substituído quando recebermos o primeiro delta
            const tempBotMessageId = Date.now().toString() + '-bot';

            setMessages(prev => [
                ...prev,
                {
                    id: tempBotMessageId,
                    isBot: true,
                    text: "",
                    loading: true // Sinaliza que esta mensagem está em estado de loading
                }
            ]);

            // Envia a mensagem para a API com streaming
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage,
                    threadId: threadId
                }),
            });

            if (!response.ok) {
                throw new Error('Falha ao enviar mensagem');
            }

            // Obtém o Reader para ler o stream
            const reader = response.body?.getReader();

            if (!reader) {
                throw new Error('Não foi possível obter o leitor da resposta');
            }

            // Variável para acumular o texto da resposta
            let accumulatedText = "";
            let startedReceivingText = false;

            // Função para processar o stream
            const processStream = async () => {
                while (true) {
                    const { done, value } = await reader.read();

                    if (done) {
                        break;
                    }

                    // Decodifica os dados do stream
                    const text = new TextDecoder().decode(value);

                    // Divide por linhas e processa cada evento
                    const lines = text.split('\n').filter(line => line.trim() !== '');

                    for (const line of lines) {
                        try {
                            const event = JSON.parse(line);

                            // Processa diferentes tipos de eventos
                            if (event.type === 'threadId' && !threadId) {
                                setThreadId(event.threadId);
                            } else if (event.type === 'delta') {
                                // Se for o primeiro delta, marcamos que começamos a receber texto
                                if (!startedReceivingText) {
                                    startedReceivingText = true;
                                    setIsLoading(false);
                                }

                                // Adiciona o novo texto à resposta acumulada
                                accumulatedText += event.content;

                                // Atualiza a mensagem do bot com o novo texto e remove o estado de loading
                                setMessages(prev =>
                                    prev.map(msg =>
                                        msg.id === tempBotMessageId
                                            ? { ...msg, text: accumulatedText, loading: false }
                                            : msg
                                    )
                                );
                            } else if (event.type === 'error') {
                                // Atualiza a mensagem com o erro
                                setMessages(prev =>
                                    prev.map(msg =>
                                        msg.id === tempBotMessageId
                                            ? { ...msg, text: "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.", loading: false }
                                            : msg
                                    )
                                );
                            }
                        } catch (error) {
                            console.error('Erro ao processar linha do stream:', error);
                        }
                    }
                }
            };

            // Inicia o processamento do stream
            await processStream();
        } catch (error) {
            console.error('Erro ao processar mensagem:', error);

            // Adiciona mensagem de erro ao chat
            const errorMessage: Message = {
                id: Date.now().toString() + '-error',
                isBot: true,
                text: "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente."
            };

            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    // Handler para monitorar quando o usuário está digitando
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);

        // Atualiza estado de digitação
        setIsTyping(true);

        // Limpa timeout anterior, se existir
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        // Define novo timeout para desativar o status de digitação
        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
        }, 1500);
    };

    // Handler para enviar mensagem quando o usuário pressiona Enter
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            sendMessage(inputValue.trim());
        }
    };

    // Animações para o botão e o painel de chat
    const buttonVariants = {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } },
        hover: { scale: 1.1, transition: { duration: 0.2 } },
        tap: { scale: 0.9, transition: { duration: 0.2 } }
    };

    const chatPanelVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 25
            }
        },
        exit: {
            opacity: 0,
            y: 20,
            scale: 0.9,
            transition: {
                duration: 0.2
            }
        }
    };

    return (
        <>
            {/* Botão flutuante de chat */}
            <motion.button
                className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#3d43dd] to-[#6366f1] rounded-full shadow-lg shadow-[#3d43dd]/30 text-white floating-chat-button"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(prevState => !prevState);

                    // Se estiver abrindo, garanta que o scroll vá para o final
                    if (!isOpen) {
                        setTimeout(() => {
                            scrollToBottom();
                        }, 300);
                    }
                }}
                variants={buttonVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                aria-label={isOpen ? "Fechar chat" : "Abrir chat"}
            >
                {!isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                        <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                    </svg>
                )}
                {/* Indicador de notificação */}
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></span>
            </motion.button>

            {/* Painel de chat */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={chatRef}
                        className="fixed bottom-28 right-8 z-50 w-[360px] bg-neutral-900/90 backdrop-blur-md border border-neutral-800 rounded-2xl shadow-2xl text-white"
                        variants={chatPanelVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        key="chat-panel"
                    >
                        {/* Cabeçalho do chat */}
                        <div className="p-4 border-b border-neutral-800 flex items-center gap-4">
                            <div className="relative w-10 h-10 overflow-hidden">
                                <div className="w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br from-[#3d43dd] to-[#6366f1]">
                                    <span className="text-white text-sm font-medium">IA</span>
                                </div>
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-neutral-900"></span>
                            </div>
                            <div>
                                <h3 className="font-medium text-white">Assistente Virtual</h3>
                                <p className="text-xs text-neutral-400">Respondendo em segundos</p>
                            </div>
                            {/* Botões de ação */}
                            <div className="ml-auto">
                                <button
                                    className="text-neutral-400 hover:text-white p-1.5 rounded-full hover:bg-neutral-800 transition-colors"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Impede propagação do evento
                                        setIsOpen(false);
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 6 6 18"></path>
                                        <path d="m6 6 12 12"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Corpo do chat com mensagens */}
                        <div
                            ref={messageContainerRef}
                            className="h-[350px] overflow-y-auto p-4 flex flex-col gap-5 custom-scrollbar relative"
                        >
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    className={`flex ${message.isBot ? 'items-start' : 'items-start'}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Avatar do bot - só mostrar quando não estiver no estado de loading */}
                                    {message.isBot && !message.loading && (
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-[#3d43dd] to-[#6366f1] flex-shrink-0 mt-1 mr-3 shadow-md">
                                            <span className="text-white text-xs font-medium">IA</span>
                                        </div>
                                    )}

                                    {/* Mensagem */}
                                    {message.loading ? (
                                        // Apenas texto com efeito shimmer, estilo semelhante às mensagens do bot
                                        <div className="w-full flex items-start">
                                            <div className="w-full py-3 px-4 bg-transparent rounded-2xl rounded-tl-sm">
                                                <p className="text-sm leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 via-neutral-200 to-neutral-500 animate-shimmer-text">
                                                    {loadingMessages[loadingMessageIndex]}
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            {/* Mensagem do bot */}
                                            {message.isBot ? (
                                                <div className="w-full py-3 px-4 bg-transparent border border-neutral-700/40 text-white/95 shadow-sm hover:border-neutral-700/60 transition-colors duration-200 rounded-2xl rounded-tl-sm overflow-hidden">
                                                    <SafeMarkdown>
                                                        {message.text}
                                                    </SafeMarkdown>
                                                </div>
                                            ) : (
                                                /* Mensagem do usuário - alinhada à direita com o avatar à direita */
                                                <div className="w-full flex justify-end items-start">
                                                    <div className="max-w-[80%] py-3 px-4 bg-[#1e1e1e] text-white/95 shadow-md hover:bg-neutral-800 transition-colors duration-200 mr-3 rounded-2xl rounded-tr-sm">
                                                        <p className="text-sm leading-relaxed">{message.text}</p>
                                                    </div>
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800 flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                                                        <span className="text-white text-xs font-medium">EU</span>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </motion.div>
                            ))}

                            {/* Div de referência para auto-scroll */}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Botão para rolar até o final - Posicionado no centro e acima do campo de entrada */}
                        <AnimatePresence>
                            {showScrollBottom && (
                                <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="mb-4 absolute bottom-[100px] left-1/2 transform -translate-x-1/2 z-[60] bg-[#3d43dd]/90 backdrop-blur-sm p-3 rounded-full border border-[#6366f1]/50 hover:bg-[#6366f1]/90 transition-colors"
                                    onClick={scrollToBottom}
                                    aria-label="Ir para o final"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="22"
                                        height="22"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-white"
                                    >
                                        <path d="M12 5v14" />
                                        <path d="m19 12-7 7-7-7" />
                                    </svg>
                                </motion.button>
                            )}
                        </AnimatePresence>

                        {/* Input de mensagem */}
                        <div className="p-4 border-t border-neutral-800">
                            <div className="relative group">
                                {isTyping && !isLoading && (
                                    <div className="absolute -top-5 left-4 px-3 py-1 bg-[#3d43dd]/20 backdrop-blur-xl text-[10px] font-medium text-[#6366f1] rounded-full border border-[#6366f1]/20 shadow-sm flex items-center gap-1.5 animate-pulse">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6366f1] opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6366f1]"></span>
                                        </span>
                                        <span>Digitando<span className="dots">...</span></span>
                                    </div>
                                )}
                                <input
                                    ref={inputRef}
                                    type="text"
                                    className="w-full bg-neutral-800/80 rounded-xl py-3.5 px-5 pr-14 text-sm text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#3d43dd]/70 border border-neutral-700/50 focus:border-[#6366f1]/60 transition-all shadow-inner shadow-black/10 group-hover:border-neutral-600/70"
                                    placeholder={isLoading ? "Aguarde a resposta..." : "Digite sua mensagem..."}
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    disabled={isLoading}
                                />
                                <div className="flex absolute right-3 top-1/2 transform -translate-y-1/2 gap-1">
                                    <button
                                        className={`${inputValue.trim() === '' || isLoading
                                            ? 'bg-neutral-700/30 text-neutral-500 cursor-not-allowed opacity-70 scale-95'
                                            : 'bg-[#3d43dd] text-white hover:bg-[#6366f1] hover:scale-105 active:scale-95 cursor-pointer focus:ring-2 focus:ring-[#6366f1]/60 focus:ring-offset-1 focus:ring-offset-neutral-800'
                                            } transition-all duration-200 rounded-lg p-2 shadow-md`}
                                        onClick={() => {
                                            if (inputValue.trim() !== '' && !isLoading) {
                                                const message = inputValue.trim();
                                                // Limpa o input antes de enviar para efeito visual instantâneo
                                                setInputValue('');
                                                // Desativa o estado de digitação
                                                setIsTyping(false);
                                                // Envia a mensagem
                                                sendMessage(message);
                                                // Foca o input novamente
                                                inputRef.current?.focus();
                                            }
                                        }}
                                        disabled={inputValue.trim() === '' || isLoading}
                                        aria-label="Enviar mensagem"
                                    >
                                        {isLoading ? (
                                            <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="m22 2-7 20-4-9-9-4Z" />
                                                <path d="M22 2 11 13" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                            {/* Funcionalidades extras */}
                            <div className="flex justify-center mt-3 text-xs">
                                <div className="px-3 py-1.5 bg-[#3d43dd]/15 rounded-full border border-[#6366f1]/20 text-[10px] font-medium text-[#6366f1] shadow-sm shadow-[#3d43dd]/10 flex items-center gap-1.5">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" fill="#6366f1" />
                                    </svg>
                                    <span>Alimentado por OpenAI GPT-4.1</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Adiciona as animações de shimmer e a animação das reticências para o indicador de digitação */}
            <style jsx global>{`
                @keyframes shimmer {
                    0% {
                        background-position: -200% 0;
                    }
                    100% {
                        background-position: 200% 0;
                    }
                }
                .animate-shimmer {
                    animation: shimmer 1.5s infinite linear;
                    background-size: 200% 100%;
                }
                .animate-shimmer-text {
                    animation: shimmer 3s infinite ease-in-out;
                    background-size: 200% 100%;
                }
                @keyframes pulse-glow {
                    0%, 100% {
                        opacity: 0.6;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.05);
                    }
                }
                
                /* Animação para os pontos do indicador de digitação */
                @keyframes dots {
                    0%, 20% {
                        content: ".";
                    }
                    40% {
                        content: "..";
                    }
                    60%, 100% {
                        content: "...";
                    }
                }
                .dots::after {
                    content: "";
                    animation: dots 1.5s infinite ease-in-out;
                    display: inline-block;
                    width: 12px;
                }
                
                /* Estilos modernos para as barras de rolagem */
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.1);
                    border-radius: 8px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(99, 102, 241, 0.3);
                    border-radius: 8px;
                    transition: background 0.2s ease;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(99, 102, 241, 0.5);
                }
                
                /* Estilização para a barra de rolagem no corpo do chat */
                .h-\\[350px\\]::-webkit-scrollbar {
                    width: 6px;
                }
                
                .h-\\[350px\\]::-webkit-scrollbar-track {
                    background: transparent;
                    margin: 4px;
                }
                
                .h-\\[350px\\]::-webkit-scrollbar-thumb {
                    background: rgba(99, 102, 241, 0.2);
                    border-radius: 8px;
                    transition: background 0.2s ease;
                }
                
                .h-\\[350px\\]::-webkit-scrollbar-thumb:hover {
                    background: rgba(99, 102, 241, 0.4);
                }
            `}</style>
        </>
    );
} 