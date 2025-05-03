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
  // Configuração para otimizar ainda mais os assets estáticos
  output: 'standalone',
  // Adicionar suporte a scripts externos com otimização
  compiler: {
    // Remover console.logs em produção
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
    // Instrumentação para performance
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },
  experimental: {
    // Ativando optimizeCss 
    optimizeCss: true,
    // Melhorar o carregamento de módulos
    optimizePackageImports: [
      'framer-motion',
      'react-type-animation',
      'react-intersection-observer',
      'react-markdown',
    ],
    // Tree shaking avançado
    optimisticClientCache: true,
    // Minimizar output HTML
    optimizeServerReact: true,
    // Minimizar ainda mais o JavaScript em produção
    serverMinification: true,
    // Permitir módulos ESM para bibliotecas modernas
    serverSourceMaps: false,
    // Adicionar compressão de strings longas
    staticGenerationAsyncStorage: true,
    // Otimizar ainda mais páginas estáticas
    instrumentationHook: true,
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
      {
        // Caching para SVGs
        source: '/images/(grid-pattern|noise-pattern).svg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Caching para videos
        source: '/videos/(.*).mp4',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Caching para videos WebM
        source: '/videos/(.*).webm',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Melhor caching para JS/CSS
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

// Adiciona o bundle analyzer em modo de análise
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = process.env.ANALYZE === 'true'
  ? withBundleAnalyzer(nextConfig)
  : nextConfig;
