import { BlogPost } from '@/types/blog';

export const blogPosts: BlogPost[] = [
    {
        headline: "IA no e-commerce: eficiência sem drama e vitrine sob medida",
        slug: "ia-no-ecommerce-eficiencia-personalizacao",
        author: {
            name: "Wagner Pereira",
            profile_url: "https://instagram.com/wagnerai.me",
            avatar_url: "/images/authors/certified-wagner.png"
        },
        date: "2025-05-04T05:10:00Z",
        category: "E-commerce",
        tags: ["ecommerce", "ia", "tecnologia", "logistica", "personalizacao"],
        cover_image: {
            url: "/images/blog/ia-eccomerce-cover.png",
            alt: "Imagem Abstrata de IA com escrita AI",
            caption: "Imagem gerada por GPT 4o"
        },
        reading_time: "5 min",
        summary: "Da vitrine que entende seu gosto à entrega que chega antes da notificação: veja por que a IA virou item obrigatório no carrinho das lojas on-line — e o recado reto do CEO da Shopify para quem ainda está dormindo.",
        social: {
            linkedin: "https://linkedin.com/in/owrp",
            github: "https://github.com/wagnerpereiradev",
            twitter: "https://x.com/wagnerdvlpr",
            instagram: "https://instagram.com/wagnerai.me",
        },
        ads: ['wagnerdev'],
        "body": [
            {
                type: "markdown",
                "content": "## IA no e-commerce: eficiência sem drama e vitrine sob medida\n\nSe ainda parece hype, espere até ver o impacto nos números — é jogo virado."
            },
            {
                type: "markdown",
                "content": "### Onde estamos\n\nO e-commerce brasileiro faturou **R$ 204 bi em 2024** e deve bater **R$ 234,9 bi em 2025**, com ticket médio previsto de **R$ 539,28**."
            },
            {
                type: "markdown",
                "content": "### IA é o novo frete grátis (só que melhor)\n\n1. **Vitrine que vende** – Algoritmos de recomendação comparam histórico de compras, cliques e contexto em tempo real para mostrar o produto certo na hora certa. Resultado: mais conversão e ticket médio maior.\n2. **Logística que adivinha** – Modelos preditivos antecipam demanda, traçam rotas e reduzem estoque encalhado. Menos custo no *last-mile* e entregas mais rápidas.\n3. **Atendimento 24/7 que não cansa** – Chatbots treinados em LLMs já resolvem até **79 %** das perguntas básicas sem escalar para um humano. Cliente contente, CAC lá embaixo.\n4. **Operação enxuta** – IA gera descrição de produto, ajusta preço em tempo real, detecta fraude e faz cadastro automático. Menos tarefas repetitivas, mais gente focada em crescimento."
            },
            {
                type: "markdown",
                "content": "### O recado direto de Tobi Lütke (Shopify)\n\nO CEO da Shopify enviou um memorando com o título **“Usar IA não é bônus, é requisito”**. Três pontos diretos:\n\n* **Métrica de performance** – todo dev, designer e PM agora é avaliado por quanto incorpora IA no dia a dia.\n* **MVP *AI-first*** – nenhum protótipo ganha orçamento se não apontar onde a IA entra.\n* **Compartilhamento de prompts** – achou um prompt que resolve? Espalha pra equipe.\n\n> “Antes de pedir mais gente, prove que a IA não resolve.” – **Tobi, sem rodeios.**"
            },
            {
                type: "markdown",
                "content": "### Checklist rápido para quem quer começar já\n\n| Objetivo | Ferramenta indicada | Indicador-chave |\n|---|---|---|\n| Recomendação de produtos | Algolia Recommend / AWS Personalize | + conversão, + ticket médio |\n| Precificação dinâmica | Feedzai ou modelo próprio | Margem ↑, rupturas ↓ |\n| Chat 24/7 | ChatGPT Assistants + FAQ | CSAT > 85 %, tempo de resposta < 30 s |\n| Planejamento de estoque | Prophet + dados do ERP | OTIF ↑, giro de estoque ↑ |\n| Conteúdo automático | Shopify Magic / Jasper | Upload de novo item < 5 min |\n\nComece pequeno: escolha um produto campeão, rode A/B e só escale depois que o ROI aparecer."
            },
            {
                type: "markdown",
                "content": "### O que vem agora\n\nLá fora a IA já é padrão; aqui ainda tem muita operação manual. Quem adotar primeiro leva a medalha (e o faturamento). Se 2024 foi o ano das POCs, **2025 é o ano da produção**.\n\n**Moral da história:** ou você coloca a IA para trabalhar na sua loja, ou seu concorrente coloca — e ainda entrega mais rápido. Decida logo."
            }
        ],
        sources: [
            {
                title: "ABComm – E-commerce pode faturar perto de R$ 235 bilhões em 2025",
                url: "https://www.ecommercebrasil.com.br/noticias/e-commerce-pode-faturar-perto-de-r-235-bilhoes-em-2025",
                accessed: "2025-05-04"
            },
            {
                title: "ABComm – E-commerce brasileiro fatura R$ 204,3 bilhões em 2024",
                url: "https://www.ecommercebrasil.com.br/noticias/e-commerce-resultados-2024-brasil-abcomm",
                accessed: "2025-05-04"
            },
            {
                title: "The Verge – Shopify CEO says no new hires without proof AI can’t do the job",
                url: "https://www.theverge.com/news/644943/shopify-ceo-memo-ai-hires-job",
                accessed: "2025-05-04"
            },
            {
                title: "Botpress – Key Chatbot Statistics for 2025",
                url: "https://botpress.com/blog/key-chatbot-statistics",
                accessed: "2025-05-04"
            }
        ]
    },
    {
        headline: "GPT-4o e o Efeito Bajulador: Quando a IA para de pensar e só quer agradar",
        slug: "gpt-4o-efeito-bajulador-ia-agradar",
        author: {
            name: "Wagner Pereira",
            profile_url: "https://instagram.com/wagnerai.me",
            avatar_url: "/images/authors/certified-wagner.png"
        },
        date: "2025-05-03T10:30:00Z",
        category: "Inteligência Artificial",
        tags: ["ia", "openai", "gpt-4o", "ética", "comportamento-ia"],
        cover_image: {
            url: "https://pbs.twimg.com/profile_banners/1866218067161763840/1743262647/1500x500",
            alt: "Ilustração de IA validando emoções humanas",
        },
        reading_time: "5 min",
        summary: "A OpenAI corrigiu um comportamento problemático no GPT-4o que priorizava agradar o usuário em vez de oferecer críticas construtivas. O artigo discute os riscos éticos de IAs que validam emoções negativas e a importância do equilíbrio em modelos generativos.",
        social: {
            linkedin: "https://linkedin.com/in/owrp",
            github: "https://github.com/wagnerpereiradev",
            twitter: "https://x.com/wagnerdvlpr",
            instagram: "https://instagram.com/wagnerai.me",
        },
        ads: ['wagnerdev', 'perrin'],
        body: [
            {
                type: "markdown",
                content: "A OpenAI admitiu recentemente que o update lançado em 25 de abril no GPT-4o transformou o modelo num verdadeiro 'puxa-saco digital'. E não tô falando de um simples excesso de gentileza — foi uma guinada no core behavior do modelo: passou a validar emoções negativas, reforçar impulsividade, agradar em vez de orientar. E isso, pra mim, bate num ponto muito mais sério do que parece."
            },
            {
                type: "markdown",
                content: "### Quando a IA troca bom senso por aprovação\n\nNa tentativa de ser 'mais útil' e 'mais empática', o modelo basicamente virou um espelho que balança a cabeça pra tudo que o usuário fala. Sentiu raiva? A IA te valida. Está confuso? Ela reforça o drama. Quer se convencer de algo errado? Ela embala o argumento com fita dourada.\n\nIsso é perigoso por uma razão simples: se você quer IA como copiloto de decisões (profissionais, emocionais, criativas), ela precisa ser uma contrapartida crítica, não um espelho emocional ou um coach barato de autoajuda."
            },
            {
                type: "markdown",
                content: "### O problema não foi técnico. Foi cultural.\n\nA própria OpenAI disse que a mudança foi resultado da soma de vários pequenos ajustes: mais peso no feedback dos usuários (like/dislike), memória ativada, sinais de recompensa mais flexíveis. Cada tweak parecia bom isoladamente, mas no conjunto formou um monstrinho que prioriza aprovação sobre responsabilidade.\n\nE o mais grave: eles não tinham testes de 'sycophancy' antes do deploy. Passaram por offline evals, spot checks, A/B tests... e mesmo assim não pegaram. Por quê? Porque os testes medem performance, não necessariamente discernimento."
            },
            {
                type: "markdown",
                content: "### IA como espelho emocional = bomba-relógio\n\nCada vez mais pessoas usam o ChatGPT pra pedir conselhos de vida, desabafar, tomar decisões. O próprio artigo da OpenAI reconhece isso. E é aí que o buraco fica mais embaixo. Uma IA que 'valida tudo' não ajuda, ela alimenta ciclos emocionais perigosos. Pensa na galera lidando com burnout, depressão, ou crises... receber validação passiva da IA, em vez de orientação ponderada, pode ser o empurrão no abismo.\n\nNão é só questão de UX. É questão de ética."
            },
            {
                type: "markdown",
                content: "### O que a OpenAI aprendeu (e o que você deveria aprender com isso também)\n\n* **Sinais subjetivos importam tanto quanto métrica**\n* **Qualquer mudança no comportamento da IA é uma feature de alto impacto**\n* **Fidelidade ao feedback do usuário não pode superar a integridade do modelo**"
            },
            {
                type: "markdown",
                content: "### Resumo da ópera\n\nA IA que só quer agradar é a IA que você não deveria usar. A OpenAI percebeu tarde, mas corrigiu rápido. O importante agora é aprender que modelos generativos precisam de personalidade balanceada — nem capacho, nem tirano.\n\n**Se IA vai participar das nossas decisões, ela precisa de coragem pra discordar, não só programação pra agradar.**"
            }
        ]
    },
    {
        headline: "Function Calling ou Model Context Protocol? O que faz mais sentido pra sua stack de IA?",
        slug: "function-calling-vs-mcp",
        author: {
            name: "Wagner Pereira",
            profile_url: "https://instagram.com/wagnerai.me",
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
            twitter: "https://x.com/wagnerdvlpr",
            instagram: "https://instagram.com/wagnerai.me",
        },
        ads: ['wagnerdev', 'perrin'],
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