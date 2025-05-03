const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Caminho base do projeto
const basePath = path.join(__dirname, '..');

// Lista de elementos que geralmente contribuem para o LCP
const LCP_ELEMENTS = [
    'img',
    'image',
    'Image',
    'video',
    'background-image',
    'h1',
    'h2',
    'h3',
    'header'
];

// Padrões de classe que indicam um elemento acima da dobra (possível LCP)
const ABOVE_FOLD_PATTERNS = [
    'hero',
    'banner',
    'header',
    'landing',
    'showcase',
    'cover',
    'main-image',
    'featured',
    'jumbotron'
];

// Função para verificar código fonte e encontrar possíveis elementos LCP
function findLCPCandidates(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');
        const fileName = path.basename(filePath);

        // Encontrar possíveis elementos LCP
        const lcpCandidates = [];

        lines.forEach((line, index) => {
            // Verifica se a linha contém um elemento que pode ser LCP
            const hasLCPElement = LCP_ELEMENTS.some(el =>
                line.includes(`<${el}`) ||
                (el === 'background-image' && line.includes(el))
            );

            // Verifica se a linha contém um padrão que indica "acima da dobra"
            const isAboveFold = ABOVE_FOLD_PATTERNS.some(pattern =>
                line.toLowerCase().includes(pattern)
            );

            if (hasLCPElement || isAboveFold) {
                // Tenta extrair o elemento da linha
                let element = line.trim();

                // Verifica se é um elemento de imagem com propriedades úteis
                const isImage = element.includes('<img') || element.includes('<Image');
                const hasSrc = element.includes('src=');
                const hasSizes = element.includes('sizes=');
                const hasPriority = element.includes('priority');
                const hasLoading = element.includes('loading=');

                lcpCandidates.push({
                    lineNumber: index + 1,
                    element: element.length > 100 ? element.substring(0, 100) + '...' : element,
                    isImage,
                    hasSrc,
                    hasSizes,
                    hasPriority,
                    hasLoading,
                    suggestions: []
                });
            }
        });

        return {
            fileName,
            filePath: filePath.replace(basePath, ''),
            lcpCandidates
        };
    } catch (error) {
        console.error(`❌ Erro ao analisar ${filePath}:`, error.message);
        return null;
    }
}

// Adiciona sugestões aos candidatos a LCP
function addSuggestions(result) {
    if (!result || !result.lcpCandidates) return result;

    result.lcpCandidates.forEach(candidate => {
        // Para imagens sem priority ou loading eager
        if (candidate.isImage && candidate.hasSrc) {
            if (!candidate.hasPriority) {
                candidate.suggestions.push("Adicione o atributo 'priority' para imagens acima da dobra");
            }

            if (!candidate.hasLoading && !candidate.hasPriority) {
                candidate.suggestions.push("Adicione loading='eager' para carregar imediatamente");
            }

            if (!candidate.hasSizes) {
                candidate.suggestions.push("Adicione o atributo 'sizes' para otimizar a escolha da imagem");
            }
        }

        // Verifica se possui web font ou preload
        if (candidate.element.includes('<h1') || candidate.element.includes('<h2')) {
            candidate.suggestions.push("Use a propriedade 'font-display: optional' para fontes críticas");
            candidate.suggestions.push("Considere preload para a fonte usada neste texto");
        }
    });

    return result;
}

// Encontrar todos os principais arquivos de componentes React que podem conter LCP
const files = [
    ...glob.sync('src/components/Hero.tsx', { cwd: basePath }),
    ...glob.sync('src/components/header*.{tsx,jsx}', { cwd: basePath }),
    ...glob.sync('src/components/*anner*.{tsx,jsx}', { cwd: basePath }),
    ...glob.sync('src/components/*eader*.{tsx,jsx}', { cwd: basePath }),
    ...glob.sync('src/app/page.tsx', { cwd: basePath }),
    ...glob.sync('src/app/layout.tsx', { cwd: basePath }),
];

// Processar cada arquivo
const results = [];
files.forEach(file => {
    const fullPath = path.join(basePath, file);
    const result = findLCPCandidates(fullPath);
    if (result && result.lcpCandidates.length > 0) {
        const resultWithSuggestions = addSuggestions(result);
        results.push(resultWithSuggestions);
    }
});

// Mostrar resultados
console.log('🔍 Análise de Largest Contentful Paint (LCP)\n');

results.forEach(result => {
    console.log(`\n📄 ${result.fileName} (${result.filePath})`);
    console.log(`   Encontrados ${result.lcpCandidates.length} possíveis elementos LCP:`);

    result.lcpCandidates.forEach((candidate, index) => {
        console.log(`\n   Elemento #${index + 1} (linha ${candidate.lineNumber}):`);
        console.log(`   ${candidate.element}`);

        if (candidate.suggestions.length > 0) {
            console.log('\n   ⚠️ Sugestões:');
            candidate.suggestions.forEach((suggestion, i) => {
                console.log(`   ${i + 1}. ${suggestion}`);
            });
        }
    });
});

// Otimizações gerais para LCP
console.log('\n\n🚀 Otimizações gerais para melhorar o LCP:');
console.log('1. Pré-carregar a fonte principal: Adicione <link rel="preload"> para a fonte usada no LCP');
console.log('2. Reduzir TTFB: Verificar a performance do servidor e usar cache agressivo');
console.log('3. Eliminar recursos que bloqueiam a renderização (scripts de terceiros)');
console.log('4. Garantir que o CSS crítico seja inline e não bloqueie a renderização');
console.log('5. Usar Image component do Next.js com o atributo priority para imagens LCP');
console.log('6. Considerar serviço de CDN para assets estáticos');

// Salvar os resultados em um arquivo JSON para referência
const outputPath = path.join(basePath, 'lcp-analysis.json');
fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf8');
console.log(`\n💾 Resultados salvos em lcp-analysis.json`);
console.log(`\n✅ Análise completa. Execute 'npm run optimize-lcp' para atualizar esta análise após realizar alterações.`); 