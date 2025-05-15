import { NextRequest } from 'next/server';
import OpenAI from 'openai';

// Inicializa o cliente OpenAI com a chave da API
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Função para buscar o histórico de mensagens de uma thread
export async function GET(req: NextRequest) {
    const threadId = req.nextUrl.searchParams.get('threadId');

    if (!threadId) {
        return new Response(
            JSON.stringify({ error: 'ThreadId não fornecido' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    try {
        // Busca as mensagens da thread
        const result = await openai.beta.threads.messages.list(threadId);

        // Converte as mensagens para um formato mais amigável para o frontend
        const messages = result.data.map(message => {
            // Extrair o texto de cada mensagem
            const textContent = message.content
                .filter(content => content.type === 'text')
                .map(content => {
                    // Usar uma asserção de tipo mais específica
                    const textContent = content as { text: { value: string }, type: string };
                    return textContent.text.value;
                })
                .join(' ');

            return {
                id: message.id,
                role: message.role,
                text: textContent,
                created_at: message.created_at
            };
        });

        return new Response(
            JSON.stringify({ messages }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Erro ao buscar mensagens da thread:', error);
        return new Response(
            JSON.stringify({ error: 'Falha ao buscar o histórico de mensagens' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const { message, threadId } = await req.json();

        if (!message) {
            return new Response(
                JSON.stringify({ error: 'Mensagem não fornecida' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Se não houver um threadId, crie uma nova thread
        let thread;
        if (!threadId) {
            thread = await openai.beta.threads.create();
        } else {
            thread = { id: threadId };
        }

        // Adiciona a mensagem do usuário à thread
        await openai.beta.threads.messages.create(thread.id, {
            role: 'user',
            content: message,
        });

        // Cria um stream para a resposta
        const stream = openai.beta.threads.runs.stream(thread.id, {
            assistant_id: process.env.OPENAI_ASSISTANT_ID!,
        });

        return new Response(
            new ReadableStream({
                async start(controller) {
                    // Enviar o threadId para o cliente no início
                    controller.enqueue(
                        JSON.stringify({
                            type: 'threadId',
                            threadId: thread.id
                        }) + '\n'
                    );

                    // Inicia o processo de streaming
                    for await (const event of stream) {
                        if (event.event === 'thread.message.delta') {
                            if (event.data.delta.content && event.data.delta.content.length > 0) {
                                const content = event.data.delta.content[0];
                                if (content.type === 'text' && content.text && content.text.value) {
                                    // Enviar o delta de texto para o cliente
                                    controller.enqueue(
                                        JSON.stringify({
                                            type: 'delta',
                                            content: content.text.value
                                        }) + '\n'
                                    );
                                }
                            }
                        } else if (event.event === 'thread.run.completed') {
                            // Sinalizar que o streaming foi concluído
                            controller.enqueue(
                                JSON.stringify({
                                    type: 'done'
                                }) + '\n'
                            );
                        } else if (event.event === 'thread.run.failed') {
                            // Enviar mensagem de erro
                            controller.enqueue(
                                JSON.stringify({
                                    type: 'error',
                                    error: 'Falha ao processar sua mensagem'
                                }) + '\n'
                            );
                        }
                    }

                    controller.close();
                },

                cancel() {
                    // Função opcional para lidar com o cancelamento do stream
                }
            }),
            {
                headers: {
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache, no-transform',
                    'Connection': 'keep-alive',
                }
            }
        );
    } catch (error) {
        console.error('Erro ao processar a mensagem:', error);
        return new Response(
            JSON.stringify({ error: 'Falha ao processar sua mensagem' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
} 