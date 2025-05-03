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
      // Adicionando os domínios específicos como remotePatterns em vez de 'domains'
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
    // Configurações de otimização de imagem
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // A propriedade 'domains' foi removida pois está depreciada
    // Use 'remotePatterns' em vez disso
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

    // Nota: As seguintes propriedades foram removidas pois não são mais necessárias 
    // ou são inválidas na versão atual do Next.js:
    // - 'staticGenerationAsyncStorage': não é mais uma opção válida
    // - 'instrumentationHook': não é mais necessário, agora 'instrumentation.js' está disponível por padrão
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
