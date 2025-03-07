import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { DocumentProvider } from '@/context/DocumentContext';

// Optimize font loading
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', // Ensure text remains visible during font loading
  preload: true,
  fallback: ['system-ui', 'sans-serif']
});

export const metadata = {
  title: "Parsa Derakhshan - Full Stack Developer",
  description: "Portfolio of Parsa Derakhshan, a Full Stack Developer specializing in modern web technologies.",
  keywords: "full stack developer, web development, react, next.js, javascript, portfolio",
  authors: [{ name: "Parsa Derakhshan" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://parsaderakhshan.com/",
    title: "Parsa Derakhshan - Full Stack Developer",
    description: "Portfolio of Parsa Derakhshan, a Full Stack Developer specializing in modern web technologies.",
    siteName: "Parsa Derakhshan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parsa Derakhshan - Full Stack Developer",
    description: "Portfolio of Parsa Derakhshan, a Full Stack Developer specializing in modern web technologies.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
      </head>
      <body className={`${inter.className} min-h-screen transition-colors duration-300 dark:bg-black dark:text-white bg-white text-black antialiased`}>
        <DocumentProvider>
          <ThemeProvider>
            <LanguageProvider>
              {children}
            </LanguageProvider>
          </ThemeProvider>
        </DocumentProvider>
      </body>
    </html>
  );
}
