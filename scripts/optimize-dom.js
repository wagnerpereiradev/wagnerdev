const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Caminho base do projeto
const basePath = path.join(__dirname, '..');

// Função para analisar o DOM de um arquivo
function analyzeDOM(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');
        const fileName = path.basename(filePath);

        // Extrair todas as ocorrências de elementos JSX no arquivo
        const divCount = (content.match(/<div/g) || []).length;
        const spanCount = (content.match(/<span/g) || []).length;
        const totalElements = divCount + spanCount +
            (content.match(/<[a-z][a-z0-9]*/gi) || []).length;

        // Extrair as classes do tailwind para ver quantas são usadas
        const tailwindClasses = [];
        const classRegex = /className="([^"]+)"/g;
        let match;

        while ((match = classRegex.exec(content)) !== null) {
            const classes = match[1].split(' ');
            tailwindClasses.push(...classes);
        }

        const uniqueTailwindClasses = new Set(tailwindClasses);

        // Verifica se há arrays muito grandes sendo renderizados
        const manyItemsRegex = /\.map\(\([^)]+\)\s*=>\s*{/g;
        const manyItemsCount = (content.match(manyItemsRegex) || []).length;

        // Verifica se há muitas divs aninhadas
        let maxNesting = 0;
        let currentNesting = 0;

        for (const line of lines) {
            if (line.includes('<div') || line.includes('<span')) {
                currentNesting++;
                maxNesting = Math.max(maxNesting, currentNesting);
            } else if (line.includes('</div>') || line.includes('</span>')) {
                currentNesting--;
            }
        }

        return {
            fileName,
            filePath: filePath.replace(basePath, ''),
            totalElements,
            divCount,
            spanCount,
            tailwindClassCount: tailwindClasses.length,
            uniqueTailwindClassCount: uniqueTailwindClasses.size,
            maxNesting,
            manyItemsCount,
            lineCount: lines.length,
            suggestions: []
        };
    } catch (error) {
        console.error(`❌ Erro ao analisar ${filePath}:`, error.message);
        return null;
    }
}

// Analisa os resultados e fornece sugestões
function provideSuggestions(analysis) {
    // Limite de elementos para DOM grande
    const DOM_LIMIT = 200;
    // Limite de aninhamento para DOM profundo
    const NESTING_LIMIT = 5;

    if (analysis.totalElements > DOM_LIMIT) {
        analysis.suggestions.push(
            `Reduza o número de elementos (${analysis.totalElements}). Considere paginar, virtualizar listas ou fragmentar o componente.`
        );
    }

    if (analysis.maxNesting > NESTING_LIMIT) {
        analysis.suggestions.push(
            `Reduza o aninhamento de elementos (${analysis.maxNesting} níveis). Divida em subcomponentes ou simplifique a estrutura HTML.`
        );
    }

    if (analysis.manyItemsCount > 2) {
        analysis.suggestions.push(
            `Componente renderiza ${analysis.manyItemsCount} listas/arrays. Considere virtualização ou paginação para listas grandes.`
        );
    }

    if (analysis.tailwindClassCount > 100) {
        analysis.suggestions.push(
            `Usa ${analysis.tailwindClassCount} classes Tailwind (${analysis.uniqueTailwindClassCount} únicas). Considere criar classes utilitárias ou componentes para reutilização.`
        );
    }

    if (analysis.lineCount > 400) {
        analysis.suggestions.push(
            `Componente muito grande (${analysis.lineCount} linhas). Divida em subcomponentes menores ou use React.memo para otimizar renderizações.`
        );
    }

    return analysis;
}

// Encontrar todos os arquivos de componentes React
const files = glob.sync('src/components/**/*.{tsx,jsx}', { cwd: basePath });

// Processar cada arquivo
const results = [];
files.forEach(file => {
    const fullPath = path.join(basePath, file);
    const analysis = analyzeDOM(fullPath);
    if (analysis) {
        const analysisWithSuggestions = provideSuggestions(analysis);
        if (analysisWithSuggestions.suggestions.length > 0) {
            results.push(analysisWithSuggestions);
        }
    }
});

// Ordenar por número total de elementos
results.sort((a, b) => b.totalElements - a.totalElements);

// Mostrar resultados
console.log('🔍 Análise de Componentes React\n');

results.forEach(result => {
    console.log(`\n📄 ${result.fileName} (${result.filePath})`);
    console.log(`   - Elementos: ${result.totalElements} (${result.divCount} divs, ${result.spanCount} spans)`);
    console.log(`   - Classes Tailwind: ${result.tailwindClassCount} (${result.uniqueTailwindClassCount} únicas)`);
    console.log(`   - Profundidade máxima: ${result.maxNesting} níveis`);
    console.log(`   - Listas/arrays: ${result.manyItemsCount}`);
    console.log(`   - Linhas de código: ${result.lineCount}`);

    if (result.suggestions.length > 0) {
        console.log('\n   ⚠️ Sugestões:');
        result.suggestions.forEach((suggestion, index) => {
            console.log(`   ${index + 1}. ${suggestion}`);
        });
    }
});

// Mostrar componentes com mais elementos
const topComponents = results.slice(0, 5);
console.log('\n\n🔴 Componentes com maior número de elementos:');
topComponents.forEach((component, index) => {
    console.log(`${index + 1}. ${component.fileName}: ${component.totalElements} elementos`);
});

// Mostrar estatísticas gerais
const totalElements = results.reduce((sum, result) => sum + result.totalElements, 0);
const componentsWithProblems = results.length;
const totalComponents = files.length;

console.log(`\n📊 Estatísticas Gerais:`);
console.log(`   - Total de elementos no DOM: ${totalElements}`);
console.log(`   - Componentes com possíveis problemas: ${componentsWithProblems} de ${totalComponents} (${Math.round(componentsWithProblems / totalComponents * 100)}%)`);
console.log(`\n✅ Análise completa. Execute npm run optimize-dom para atualizar esta análise após realizar alterações.`);

// Salvar os resultados em um arquivo JSON para referência
const outputPath = path.join(basePath, 'dom-analysis.json');
fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf8');
console.log(`\n💾 Resultados salvos em dom-analysis.json`); 