import './globals.css';
import { Orbitron, Inter } from 'next/font/google';
import type { ReactNode } from 'react';

// Load fonts from Google.  The variable option makes the font available via a CSS
// custom property, allowing us to reference it in our Tailwind config.  See
// Next.js font docs for more details【304612721802482†L23-L64】.
const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  variable: '--font-orbitron',
});
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jedi Path Quiz',
  description: 'Discover your Jedi destiny through an interactive, ranked‑choice quiz.',
  openGraph: {
    title: 'Jedi Path Quiz',
    description: 'Take the Jedi Path Quiz and unlock your destiny.',
    url: '/',
    siteName: 'Jedi Path Quiz',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Starry background with lightsaber glow',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jedi Path Quiz',
    description: 'Discover your Jedi destiny through our interactive quiz.',
    images: ['/twitter-image.png'],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col items-center justify-start">
        {children}
      </body>
    </html>
  );
}