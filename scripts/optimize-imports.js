const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Caminho base do projeto
const basePath = path.join(__dirname, '..');

// Função para verificar se um arquivo contém importações de framer-motion
function checkAndOptimizeImports(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        let newContent = content;

        // Verificar e otimizar importações do framer-motion
        if (content.includes('framer-motion')) {
            console.log(`Analisando: ${filePath}`);

            // Aqui precisamos detectar os imports completos das bibliotecas que foram modificados pelo modularizeImports
            // Padrão de detecção mais específico
            const framerPattern = /(import\s+\{[^}]+\}\s+from\s+['"]framer-motion\/[^'"]+['"])/g;
            if (framerPattern.test(newContent)) {
                newContent = newContent.replace(/(import\s+\{[^}]+\}\s+from\s+['"])framer-motion\/[^'"]+(['"])/g, '$1framer-motion$2');
                modified = true;
                console.log(`✅ Otimizado import framer-motion em: ${filePath}`);
            }
        }

        // Verificar e otimizar importações do react-type-animation
        if (content.includes('react-type-animation')) {
            console.log(`Analisando react-type-animation: ${filePath}`);

            // Padrão mais específico para react-type-animation
            const typeAnimationPattern = /(import\s+\{[^}]+\}\s+from\s+['"]react-type-animation\/[^'"]+['"])/g;
            if (typeAnimationPattern.test(newContent)) {
                newContent = newContent.replace(/(import\s+\{[^}]+\}\s+from\s+['"])react-type-animation\/[^'"]+(['"])/g, '$1react-type-animation$2');
                modified = true;
                console.log(`✅ Otimizado import react-type-animation em: ${filePath}`);
            }
        }

        // Salvar o arquivo se foi modificado
        if (modified) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`📝 Arquivo salvo: ${filePath}`);
        }

        return modified;
    } catch (error) {
        console.error(`❌ Erro ao processar ${filePath}:`, error.message);
        return false;
    }
}

// Encontrar todos os arquivos React/TypeScript no projeto
const files = glob.sync('src/**/*.{tsx,jsx,ts,js}', { cwd: basePath });

// Processar cada arquivo
let totalModified = 0;
files.forEach(file => {
    const fullPath = path.join(basePath, file);
    const modified = checkAndOptimizeImports(fullPath);
    if (modified) totalModified++;
});

console.log(`\n🎉 Concluído! ${totalModified} arquivo(s) otimizado(s).`);

if (totalModified > 0) {
    console.log(`\n⚠️ Agora reinicie o servidor de desenvolvimento com: npm run dev`);
} 