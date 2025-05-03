import { Ad } from '@/types/ad';

/**
 * Dados dos anúncios que podem ser exibidos nas páginas do blog
 */
export const ads: Ad[] = [
    {
        id: 'perrin',
        title: 'PerrinXisZ no YouTube',
        description: 'Live todos os dias as 18 até as 22!',
        imageUrl: 'https://yt3.googleusercontent.com/jYJgQnyugcTkol1u0w2INgVgx_peJywMx2FIIJANNm1xj5ILN62YJ1QGQ3TiNW9QJa78gBaOaw=s160-c-k-c0x00ffffff-no-rj',
        alt: 'PerrinXisZ no YouTube',
        cta: 'Inscreva-se',
        link: 'https://www.youtube.com/@perrinxisz',
        theme: '#ff0000', // Vermelho do YouTube
        position: 'in-content',
        featured: true,
        priority: 10,
        icon: '🎥',
        tags: ['youtube', 'gaming', 'live'],
        effects: {
            pulse: false,
            glow: false,
            hover: 'none'
        },
        stats: {
            impressions: 15420,
            clicks: 2354,
            conversionRate: 15.3
        }
    }
];

/**
 * Exemplo completo de anúncio com todas as propriedades disponíveis
 * ---------------------------------------------------------------------
 * Este é um exemplo de referência que mostra todas as propriedades
 * possíveis de um anúncio. Use-o como modelo para criar novos anúncios.
 * 
const adExemplo: Ad = {
    // Propriedades obrigatórias
    id: 'exemplo-completo',                                // ID único para referência
    title: 'Título do Anúncio',                            // Título principal
    description: 'Descrição detalhada do anúncio',         // Descrição/subtítulo
    imageUrl: 'https://exemplo.com/imagem.jpg',            // URL da imagem
    alt: 'Texto alternativo para a imagem',                // Alt text para acessibilidade
    cta: 'Clique Aqui',                                    // Texto do botão call-to-action
    link: 'https://exemplo.com/destino',                   // Link para redirecionamento
    theme: '#3F51B5',                                      // Cor hexadecimal (com ou sem #)
    position: 'in-content',                                // Posição: 'in-content', 'sidebar' ou 'footer'
    
    // Propriedades opcionais de destaque
    featured: true,                                        // Se é um anúncio em destaque
    priority: 10,                                          // Prioridade (quanto maior, mais importante)
    
    // Metadados opcionais
    startDate: '2023-11-01',                               // Data de início da campanha
    endDate: '2023-12-31',                                 // Data de término da campanha
    icon: '✨',                                            // Ícone adicional (pode ser emoji ou URL)
    tags: ['exemplo', 'modelo', 'referência'],             // Tags para categorização
    
    // Efeitos visuais opcionais
    effects: {
        pulse: true,                                       // Efeito de pulsação
        glow: true,                                        // Efeito de brilho/glow
        hover: 'zoom'                                      // Efeito ao passar o mouse: 'zoom', 'flip', 'slide', 'none'
    },
    
    // Estatísticas de desempenho opcionais
    stats: {
        impressions: 5000,                                 // Número de impressões
        clicks: 250,                                       // Número de cliques
        conversionRate: 5.0                                // Taxa de conversão (%)
    }
};
*/

/**
 * Função para obter anúncios pelo ID
 */
export function getAdById(id: string): Ad | undefined {
    return ads.find(ad => ad.id === id);
}

/**
 * Função para obter anúncios por posição
 */
export function getAdsByPosition(position: string): Ad[] {
    return ads.filter(ad => ad.position === position);
}

/**
 * Função para obter anúncios aleatórios por posição
 */
export function getRandomAdByPosition(position: string): Ad | undefined {
    const positionAds = getAdsByPosition(position);
    if (positionAds.length === 0) return undefined;

    const randomIndex = Math.floor(Math.random() * positionAds.length);
    return positionAds[randomIndex];
}

/**
 * Função para obter múltiplos anúncios por IDs
 */
export function getAdsByIds(ids: string[]): Ad[] {
    return ids.map(id => getAdById(id)).filter((ad): ad is Ad => ad !== undefined);
} 