/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Configurações de otimização de imagem
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Otimização de cache para melhorar performance
  poweredByHeader: false,
  // Compressão de arquivos
  compress: true,
  // Otimização de ReactStrictMode
  reactStrictMode: true,
  // Otimização para reduzir o tamanho do bundle
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
