/**
 * Interface para definir a estrutura de anúncios no blog
 */
export interface Ad {
    /** ID único do anúncio para referência */
    id: string;

    /** Título principal do anúncio */
    title: string;

    /** Descrição detalhada do anúncio */
    description: string;

    /** URL da imagem do anúncio */
    imageUrl: string;

    /** Texto alternativo para a imagem */
    alt: string;

    /** Texto do botão de call-to-action */
    cta: string;

    /** Link para onde o anúncio redireciona */
    link: string;

    /** 
     * Tema de cores hexadecimal
     * Pode ser com ou sem o caractere #
     * Exemplos: '#FF0000', 'FF0000', '#1a2b3c', '1a2b3c'
     */
    theme: string;

    /** Posição onde o anúncio pode aparecer ('in-content', 'sidebar', 'footer') */
    position: 'in-content' | 'sidebar' | 'footer';

    /** Se o anúncio é destaque (terá estilo visual diferenciado) */
    featured?: boolean;

    /** Data de início da campanha */
    startDate?: string;

    /** Data de término da campanha */
    endDate?: string;

    /** Prioridade do anúncio (quanto maior, mais chances de ser exibido) */
    priority?: number;

    /** Tags para categorização e segmentação */
    tags?: string[];

    /** Ícone adicional para o anúncio (URL ou nome do ícone) */
    icon?: string;

    /** Efeitos visuais especiais */
    effects?: {
        /** Efeito de pulsar */
        pulse?: boolean;
        /** Efeito de brilho */
        glow?: boolean;
        /** Efeito de animação ao passar o mouse */
        hover?: 'zoom' | 'flip' | 'slide' | 'none';
    };

    /** Métricas e estatísticas */
    stats?: {
        /** Impressões do anúncio */
        impressions?: number;
        /** Cliques no anúncio */
        clicks?: number;
        /** Taxa de conversão */
        conversionRate?: number;
    };
} 