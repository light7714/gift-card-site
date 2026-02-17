import type { Metadata } from 'next';
import { Satisfy, Playfair_Display, Poppins } from 'next/font/google';
import AmbientHearts from '@/components/AmbientHearts';
import './globals.css';

const headingFont = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading'
});

const bodyFont = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body'
});

const cuteFont = Satisfy({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-cute'
});

export const metadata: Metadata = {
  title: 'Our Gift Story',
  description: 'A romantic surprise gift experience'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable} ${cuteFont.variable}`}>
      <body className="gradient-bg font-[var(--font-body)]">
        <AmbientHearts />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
