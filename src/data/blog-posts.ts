import { BlogPost } from '@/types/blog';

export const blogPosts: BlogPost[] = [
    {
        headline: "Function Calling ou Model Context Protocol? O que faz mais sentido pra sua stack de IA?",
        slug: "function-calling-vs-mcp",
        author: {
            name: "Wagner Pereira",
            profile_url: "https://github.com/wagnerpereiradev",
            avatar_url: "/images/authors/certified-wagner.png"
        },
        date: "2025-04-06T00:00:00Z",
        category: "Inteligência Artificial",
        tags: ["ia", "llm", "function-calling", "mcp", "openai"],
        cover_image: {
            url: "https://cdn.sanity.io/images/4zrzovbb/website/1aef864f9b246c740fe3cef6e1068f2220995d5e-2400x1260.png",
            alt: "Representação de interações entre LLMs e ferramentas externas",
            caption: "Reprodução (https://www.anthropic.com/news/model-context-protocol)"
        },
        reading_time: "6 min",
        summary: "Entenda as diferenças entre Function Calling, da OpenAI, e o Model Context Protocol (MCP), uma alternativa agnóstica e modular para integrar LLMs com ferramentas externas.",
        social: {
            linkedin: "https://linkedin.com/in/owrp",
            github: "https://github.com/wagnerpereiradev",
            twitter: "https://twitter.com"
        },
        body: [
            {
                type: "markdown",
                content: "### Introdução\nNos últimos meses, tenho explorado cada vez mais a integração entre LLMs e sistemas externos. Naturalmente, me deparei com duas abordagens que estão ganhando força nesse ecossistema: **Function Calling**, da OpenAI, e o emergente **Model Context Protocol (MCP)**.\n\nAmbos têm a mesma essência: permitir que modelos de linguagem deixem de ser caixas-pretas e comecem a interagir com o mundo real — bancos de dados, APIs, ferramentas, documentos, etc. Mas o jeito que fazem isso muda tudo."
            },
            {
                type: "markdown",
                content: "### Function Calling: a ponte direta entre prompt e ação\nNo function calling, você registra funções com um schema JSON, descrevendo seus parâmetros e comportamento. O modelo decide quando invocar e retorna os argumentos prontos para você executar no backend.\n\nÉ como se o modelo dissesse:\n> \"Preciso da previsão do tempo. Aqui está a função `get_weather` com os dados preenchidos.\"\n\nIsso funciona muito bem. É rápido, eficiente e ideal para quem está usando a Assistants API da OpenAI ou criando bots que precisam de lógica condicional e acesso dinâmico a APIs.\n\nMas existe uma limitação: você fica dentro do ecossistema da OpenAI. Tudo gira em torno do modelo da casa, e a orquestração das funções depende de você manualmente no backend."
            },
            {
                type: "markdown",
                content: "### Model Context Protocol: a arquitetura plugável de agentes\nAí entra o Model Context Protocol (MCP). A proposta aqui é mais ambiciosa: criar um padrão universal de comunicação entre LLMs e qualquer ferramenta externa.\n\nO MCP define um conjunto de mensagens padronizadas (`tool_use`, `tool_result`, `text_message`, etc.) e uma forma clara de descrever `resources` e `tools` que os modelos podem usar. Ou seja, um protocolo agnóstico, interoperável e modular.\n\nÉ como se o modelo dissesse:\n> \"Quais ferramentas tenho disponíveis no meu ambiente? Beleza. Vou usar essa aqui, e espero uma resposta naquele padrão.\"\n\nVocê pode plugar:\n- ferramentas customizadas\n- bancos de dados\n- RAG com vetores\n- APIs REST, GraphQL, qualquer coisa\n\nE o melhor: isso independe do modelo. Pode ser OpenAI, Claude, Mistral, Llama, Gemini — tanto faz. MCP te dá liberdade arquitetural para criar um verdadeiro sistema de agentes inteligentes, cada um com seu contexto, ferramentas e raciocínio."
            },
            {
                type: "markdown",
                content: "### Na prática: quando usar cada um?\n- Se você está criando um bot com OpenAI, que faz algumas chamadas simples para APIs ou banco, **Function Calling resolve** e é rápido de implementar.\n- Mas se está pensando em **agentes autônomos, multi-modelo**, que se comunicam com um ecossistema complexo de ferramentas e dados externos — **MCP é o futuro**."
            },
            {
                type: "markdown",
                content: "### Conclusão\nEstou estruturando soluções onde o LLM se conecta com o ambiente como um verdadeiro agente: consciente de suas ferramentas, do histórico, e do que pode ou não fazer.\n\nO MCP ainda está em construção pela comunidade, mas com potencial de se tornar um \"HTTP para LLMs\". Quem entender isso agora vai sair na frente.\n\nSe você trabalha com IA e está desenvolvendo aplicações inteligentes, vale muito a pena estudar o MCP. Quer trocar ideia ou está nessa mesma jornada? Me chama."
            }
        ]
    }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find(post => post.slug === slug);
}

export function getAllPostsSlugs(): string[] {
    return blogPosts.map(post => post.slug);
} 