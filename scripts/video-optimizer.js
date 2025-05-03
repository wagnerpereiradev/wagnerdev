const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Configurações
const videoPath = path.join(__dirname, '../public/videos/bg-hero-video.mp4');
const outputPath = path.join(__dirname, '../public/videos/bg-hero-video-optimized.mp4');
const outputWebmPath = path.join(__dirname, '../public/videos/bg-hero-video-optimized.webm');
const lowResOutputPath = path.join(__dirname, '../public/videos/bg-hero-video-mobile.mp4');
const lowResOutputWebmPath = path.join(__dirname, '../public/videos/bg-hero-video-mobile.webm');

// Verifica se o FFmpeg está instalado
exec('ffmpeg -version', (error) => {
    if (error) {
        console.error('FFmpeg não está instalado. Por favor, instale o FFmpeg para continuar.');
        console.error('Instalação: brew install ffmpeg (no macOS) ou visite https://ffmpeg.org/download.html');
        return;
    }

    console.log('Iniciando otimização do vídeo de fundo...');

    // Otimiza o vídeo para desktop com qualidade moderada e menor resolução - MP4
    const desktopCommand = `ffmpeg -i "${videoPath}" -vf "scale=1280:-1" -c:v libx264 -crf 28 -preset slow -tune film -an -movflags +faststart "${outputPath}"`;

    // Otimiza o vídeo para desktop como WebM (melhor compressão)
    const desktopWebmCommand = `ffmpeg -i "${videoPath}" -vf "scale=1280:-1" -c:v libvpx-vp9 -crf 30 -b:v 0 -an "${outputWebmPath}"`;

    // Cria uma versão mobile ainda menor (resolução baixa, bitrate reduzido) - MP4
    const mobileCommand = `ffmpeg -i "${videoPath}" -vf "scale=640:-1" -c:v libx264 -crf 30 -preset slow -tune film -an -movflags +faststart "${lowResOutputPath}"`;

    // Cria uma versão mobile em WebM
    const mobileWebmCommand = `ffmpeg -i "${videoPath}" -vf "scale=640:-1" -c:v libvpx-vp9 -crf 32 -b:v 0 -an "${lowResOutputWebmPath}"`;

    // Função para executar comandos em sequência
    const runCommands = (commands, index = 0) => {
        if (index >= commands.length) {
            console.log('\n🎉 Otimização completa!');
            console.log('🔄 Para usar os novos vídeos, atualize o componente VideoBackground.tsx');
            return;
        }

        const { name, command, outputFile } = commands[index];
        console.log(`\n🔄 Processando ${name}...`);

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`❌ Erro ao otimizar ${name}: ${error.message}`);
                // Continua para o próximo comando mesmo com erro
                runCommands(commands, index + 1);
                return;
            }

            // Verifica o novo tamanho
            const originalSize = (fs.statSync(videoPath).size / (1024 * 1024)).toFixed(2);
            const newSize = (fs.statSync(outputFile).size / (1024 * 1024)).toFixed(2);
            const reduction = (100 - (newSize / originalSize) * 100).toFixed(2);

            console.log(`✅ ${name} otimizado com sucesso!`);
            console.log(`📊 Tamanho original: ${originalSize}MB → Novo: ${newSize}MB (${reduction}% menor)`);

            // Processa o próximo comando
            runCommands(commands, index + 1);
        });
    };

    // Lista de comandos a serem executados
    const commands = [
        { name: 'Vídeo desktop MP4', command: desktopCommand, outputFile: outputPath },
        { name: 'Vídeo desktop WebM', command: desktopWebmCommand, outputFile: outputWebmPath },
        { name: 'Vídeo mobile MP4', command: mobileCommand, outputFile: lowResOutputPath },
        { name: 'Vídeo mobile WebM', command: mobileWebmCommand, outputFile: lowResOutputWebmPath }
    ];

    // Inicia o processamento sequencial
    runCommands(commands);
}); 