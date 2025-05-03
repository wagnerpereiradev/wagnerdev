const { spawn } = require('child_process');
const path = require('path');

// Define a função para executar um comando
function runCommand(command, args) {
    return new Promise((resolve, reject) => {
        console.log(`\n🔄 Executando: ${command} ${args.join(' ')}\n`);

        const childProcess = spawn(command, args, {
            stdio: 'inherit',
            shell: true
        });

        childProcess.on('close', (code) => {
            if (code === 0) {
                console.log(`\n✅ Concluído: ${command} ${args.join(' ')}\n`);
                resolve();
            } else {
                console.error(`\n❌ Erro ao executar: ${command} ${args.join(' ')}\n`);
                // Continuamos mesmo com erro
                resolve();
            }
        });
    });
}

// Lista de comandos a serem executados
const commands = [
    // 1. Otimização de importações
    { cmd: 'node', args: ['scripts/optimize-imports.js'] },

    // 2. Otimização de vídeos
    { cmd: 'node', args: ['scripts/video-optimizer.js'] },

    // 3. Análise do DOM
    { cmd: 'node', args: ['scripts/optimize-dom.js'] },

    // 4. Análise do LCP
    { cmd: 'node', args: ['scripts/optimize-lcp.js'] },

    // 5. Análise do bundle
    { cmd: 'npm', args: ['run', 'analyze'] }
];

// Função para executar todos os comandos em sequência
async function runAllOptimizations() {
    console.log('🚀 Iniciando otimização completa do site...\n');

    for (const command of commands) {
        try {
            await runCommand(command.cmd, command.args);
        } catch (error) {
            console.error(`Erro ao executar ${command.cmd} ${command.args.join(' ')}:`, error);
            // Continuamos com o próximo comando mesmo em caso de erro
        }
    }

    console.log('\n✨ Otimização completa! Aqui estão os próximos passos recomendados:');
    console.log('1. Revise os arquivos de análise gerados (dom-analysis.json e lcp-analysis.json)');
    console.log('2. Implemente as sugestões encontradas, priorizando os componentes mais pesados');
    console.log('3. Execute um build com "npm run build" e teste a performance');
    console.log('4. Execute os testes no PageSpeed Insights e compare os resultados');
}

// Executa todas as otimizações
runAllOptimizations().catch(console.error); 