import type { Metadata, Viewport } from 'next';
import { Atkinson_Hyperlegible, IBM_Plex_Mono } from 'next/font/google';
import Script from 'next/script';
import { ThemeProvider, LanguageProvider } from '@/context';
import './globals.css';

/* Atkinson Hyperlegible was drawn for the Braille Institute to stay readable
   at any size. Plex Mono is only used for code and the puzzle clues. */
const text = Atkinson_Hyperlegible({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-text',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://parsadera.netlify.app';
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

const DESCRIPTION =
  "Parsa Derakhshan is a full-stack developer in Ottawa, working on the Canadian Coast Guard's internal web applications in C#, .NET and Vue.";

export const metadata: Metadata = {
  title: 'Parsa Derakhshan, full-stack developer in Ottawa',
  description: DESCRIPTION,
  authors: [{ name: 'Parsa Derakhshan' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Parsa Derakhshan, full-stack developer in Ottawa',
    description: DESCRIPTION,
    siteName: 'Parsa Derakhshan',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Parsa Derakhshan, full-stack developer at the Canadian Coast Guard' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og.png'],
    title: 'Parsa Derakhshan, full-stack developer in Ottawa',
    description: DESCRIPTION,
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
    { media: '(prefers-color-scheme: dark)', color: '#111316' },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${text.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>

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
