import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { ThemeProvider, LanguageProvider, DocumentProvider } from '@/context';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://parsaderakhshan.com';
const gaId = process.env.NEXT_PUBLIC_GA_ID ?? '';

export const metadata: Metadata = {
  title: 'Parsa Derakhshan - Full Stack Developer',
  description:
    'Portfolio of Parsa Derakhshan, a Full Stack Developer specializing in modern web technologies.',
  keywords: 'full stack developer, web development, react, next.js, javascript, portfolio',
  authors: [{ name: 'Parsa Derakhshan' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Parsa Derakhshan - Full Stack Developer',
    description:
      'Portfolio of Parsa Derakhshan, a Full Stack Developer specializing in modern web technologies.',
    siteName: 'Parsa Derakhshan Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parsa Derakhshan - Full Stack Developer',
    description:
      'Portfolio of Parsa Derakhshan, a Full Stack Developer specializing in modern web technologies.',
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/images/profile.jpg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body
        className={`${inter.className} min-h-screen transition-colors duration-300 dark:text-white text-black antialiased bg-transparent`}
      >
        <DocumentProvider>
          <ThemeProvider>
            <LanguageProvider>{children}</LanguageProvider>
          </ThemeProvider>
        </DocumentProvider>

        <Script id="mobile-viewport-height-fix" strategy="afterInteractive">
          {`
            function setVhProperty() {
              let vh = window.innerHeight * 0.01;
              document.documentElement.style.setProperty('--vh', vh + 'px');
            }
            setVhProperty();
            window.addEventListener('resize', setVhProperty, { passive: true });
            document.addEventListener('touchstart', function(){}, { passive: true });
            window.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            document.documentElement.classList.toggle('is-mobile-device', window.isMobile);
          `}
        </Script>

        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
