import { Geist_Mono as GeistMono, Geist as GeistSans } from 'next/font/google';
import './globals.css';
import type { Metadata } from 'next';

// Configuração das fontes
const geistSans = GeistSans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
  weight: ["400", "500", "600", "700"]
});

const geistMono = GeistMono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
  weight: ["400", "500", "700"]
});

export const metadata: Metadata = {
  title: 'Wagner Pereira | Desenvolvedor Full Stack',
  description: 'Desenvolvedor Full Stack especializado em criar experiências digitais modernas. Atuo com desenvolvimento web, mobile, consultoria e design de interfaces.',
  keywords: 'desenvolvedor full stack, web, mobile, UX/UI, TypeScript, React, Next.js, Node.js, design, portfolio, Wagner',
  authors: [{ name: 'Wagner Pereira' }],
  creator: 'Wagner Pereira',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark scroll-smooth">
      <head>
        {/* Preload dos recursos principais para evitar CLS (Cumulative Layout Shift) */}
        <link rel="preload" href="/images/noise-pattern.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/images/grid-pattern.svg" as="image" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://avatars.githubusercontent.com" />
        <link rel="dns-prefetch" href="https://upload.wikimedia.org" />
        <link rel="dns-prefetch" href="https://api.dicebear.com" />

        {/* Meta tags adicionais de performance */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-neutral-950 text-neutral-100`}
      >
        {children}
      </body>
    </html>
  );
}
