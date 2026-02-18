
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';
import Footer from '@/components/footer';
import TargetCursor from '@/components/target-cursor';
import './../components/target-cursor.css';
import { AppWrapper } from '@/components/app-wrapper';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-space-grotesk',
});


export const metadata: Metadata = {
  title: 'Bharath Kiran | Full-Stack Developer & AI Enthusiast',
  description: 'Building Digital Experiences That Matter',
};

/**
 * The root layout for the entire application.
 * It sets up the global fonts, theme, header, footer, and other providers.
 * @param {object} { children: React.ReactNode } - The child components to render within the layout.
 * @returns {JSX.Element} The root HTML structure of the application.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="icon" href="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23A020F0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='m8 3 4 8 5-5 5 15H2L8 3z'/%3e%3c/svg%3e" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body antialiased`} suppressHydrationWarning>
        <div className="flex flex-col min-h-screen">
          <TargetCursor />
          <Header />
          <main className="flex-1">
            <AppWrapper>
              {children}
            </AppWrapper>
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
