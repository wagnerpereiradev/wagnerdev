/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Desativando temporariamente para resolver problema de tipagem
    // ignoreDuringBuilds: true,
  },
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
    // Otimização de imagens do YouTube para thumbnails
    domains: ['i.ytimg.com', 'img.youtube.com'],
  },
  // Otimização de cache para melhorar performance
  poweredByHeader: false,
  // Compressão de arquivos
  compress: true,
  // Otimização de ReactStrictMode
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
    // Melhorar o carregamento de módulos
    optimizePackageImports: [
      'framer-motion',
      'react-type-animation'
    ],
  },
  // Configuração de headers para melhorar caching e performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
      {
        // Caching especial para arquivos estáticos
        source: '/(images|fonts|favicon.ico)/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
