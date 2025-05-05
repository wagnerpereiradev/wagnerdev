import { Geist_Mono as GeistMono, Geist as GeistSans } from 'next/font/google';
import './globals.css';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';

// Configuração das fontes
const geistSans = GeistSans({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-geist-sans",
  weight: ["400", "500", "700"],
  preload: true
});

const geistMono = GeistMono({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-geist-mono",
  weight: ["400", "700"],
  preload: true
});

export const metadata: Metadata = {
  title: 'Wagner Pereira | Desenvolvedor Full Stack',
  description: 'Desenvolvedor Full Stack especializado em criar experiências digitais modernas. Atuo com desenvolvimento web, mobile, consultoria e design de interfaces.',
  keywords: 'desenvolvedor full stack, web, mobile, UX/UI, TypeScript, React, Next.js, Node.js, design, portfolio, Wagner',
  authors: [{ name: 'Wagner Pereira' }],
  creator: 'Wagner Pereira',
  metadataBase: new URL('https://wagnerai.me'),
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://wagnerai.me'
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://wagnerai.me',
    siteName: 'Wagner Pereira - Desenvolvedor Full Stack',
    title: 'Wagner Pereira | Desenvolvedor Full Stack',
    description: 'Desenvolvedor Full Stack especializado em criar experiências digitais modernas. Atuo com desenvolvimento web, mobile, consultoria e design de interfaces.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Wagner Pereira - Desenvolvedor Full Stack',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wagner Pereira | Desenvolvedor Full Stack',
    description: 'Desenvolvedor Full Stack especializado em criar experiências digitais modernas. Atuo com desenvolvimento web, mobile, consultoria e design de interfaces.',
    creator: '@wagnerpereiradev',
    images: ['/images/og-image.png'],
  },
  verification: {
    google: 'adicione-seu-codigo-de-verificacao-google',
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
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
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Favicons e ícones */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#3d43dd" />
        <meta name="theme-color" content="#0F0F0F" />

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

        {/* Google Analytics - Movido para o final do body e com configuração lazy */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XRTG4BZY8F"
          strategy="lazyOnload"
          defer
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XRTG4BZY8F', {
              send_page_view: false,
              'anonymize_ip': true,
              'cookie_flags': 'SameSite=None;Secure'
            });
            // Enviar pageview apenas depois que o site estiver carregado
            window.addEventListener('load', function() {
              gtag('event', 'page_view');
            });
          `}
        </Script>
      </body>
    </html>
  );
}
