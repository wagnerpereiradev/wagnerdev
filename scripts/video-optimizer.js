const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Configurações
const videoPath = path.join(__dirname, '../public/videos/bg-hero-video.mp4');
const outputPath = path.join(__dirname, '../public/videos/bg-hero-video-optimized.mp4');
const lowResOutputPath = path.join(__dirname, '../public/videos/bg-hero-video-mobile.mp4');

// Verifica se o FFmpeg está instalado
exec('ffmpeg -version', (error) => {
    if (error) {
        console.error('FFmpeg não está instalado. Por favor, instale o FFmpeg para continuar.');
        console.error('Instalação: brew install ffmpeg (no macOS) ou visite https://ffmpeg.org/download.html');
        return;
    }

    console.log('Iniciando otimização do vídeo de fundo...');

    // Otimiza o vídeo para desktop com qualidade moderada e menor resolução
    const desktopCommand = `ffmpeg -i "${videoPath}" -vf "scale=1280:-1" -c:v libx264 -crf 28 -preset slow -tune film -an -movflags +faststart "${outputPath}"`;

    // Cria uma versão mobile ainda menor (resolução baixa, bitrate reduzido)
    const mobileCommand = `ffmpeg -i "${videoPath}" -vf "scale=640:-1" -c:v libx264 -crf 30 -preset slow -tune film -an -movflags +faststart "${lowResOutputPath}"`;

    // Executa o comando para desktop
    exec(desktopCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erro ao otimizar vídeo desktop: ${error.message}`);
            return;
        }

        // Verifica o novo tamanho
        const originalSize = (fs.statSync(videoPath).size / (1024 * 1024)).toFixed(2);
        const newSize = (fs.statSync(outputPath).size / (1024 * 1024)).toFixed(2);

        console.log(`✅ Vídeo desktop otimizado com sucesso!`);
        console.log(`📊 Tamanho original: ${originalSize}MB → Novo tamanho: ${newSize}MB`);
        console.log(`📉 Redução: ${(100 - (newSize / originalSize) * 100).toFixed(2)}%`);

        // Executa o comando para mobile
        exec(mobileCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(`Erro ao otimizar vídeo mobile: ${error.message}`);
                return;
            }

            const mobileSize = (fs.statSync(lowResOutputPath).size / (1024 * 1024)).toFixed(2);

            console.log(`✅ Vídeo mobile otimizado com sucesso!`);
            console.log(`📊 Tamanho original: ${originalSize}MB → Tamanho mobile: ${mobileSize}MB`);
            console.log(`📉 Redução: ${(100 - (mobileSize / originalSize) * 100).toFixed(2)}%`);

            console.log('\n🔄 Para usar os novos vídeos, atualize o componente VideoBackground.tsx');
        });
    });
}); 