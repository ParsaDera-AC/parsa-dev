import type { Metadata, Viewport } from 'next';
import { Archivo, Inter } from 'next/font/google';
import Script from 'next/script';
import { ThemeProvider, LanguageProvider, DocumentProvider } from '@/context';
import './globals.css';

/* Archivo carries display duty — variable weight axis (100–900) so the
   institutional headline scale can use real weight contrast. */
const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-archivo',
  fallback: ['system-ui', 'sans-serif'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
  fallback: ['system-ui', 'sans-serif'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://parsaderakhshan.com';
const gaId = process.env.NEXT_PUBLIC_GA_ID ?? '';

/* Runs before first paint so the correct theme class is on <html> when the
   browser paints. This replaces the old approach of blocking the entire tree
   behind an `isLoaded` flag, which caused a blank frame on every load. */
const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var dark = stored ? stored === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export const metadata: Metadata = {
  title: 'Parsa Derakhshan — Full-Stack Developer',
  description:
    'Portfolio of Parsa Derakhshan, a full-stack developer specializing in modern web technologies.',
  keywords: 'full stack developer, web development, react, next.js, typescript, portfolio',
  authors: [{ name: 'Parsa Derakhshan' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Parsa Derakhshan — Full-Stack Developer',
    description:
      'Portfolio of Parsa Derakhshan, a full-stack developer specializing in modern web technologies.',
    siteName: 'Parsa Derakhshan',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parsa Derakhshan — Full-Stack Developer',
    description:
      'Portfolio of Parsa Derakhshan, a full-stack developer specializing in modern web technologies.',
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
    { media: '(prefers-color-scheme: light)', color: '#faf8f5' },
    { media: '(prefers-color-scheme: dark)', color: '#14110f' },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh bg-paper text-ink antialiased">
        <DocumentProvider>
          <ThemeProvider>
            <LanguageProvider>{children}</LanguageProvider>
          </ThemeProvider>
        </DocumentProvider>

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
