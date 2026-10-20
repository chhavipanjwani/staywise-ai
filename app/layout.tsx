import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { StayWiseProvider } from '@/components/StayWiseProvider';
import { SiteChrome } from '@/components/SiteChrome';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'StayWise AI — New City. New Stay. Smarter Choices.',
  description: 'AI-powered hotel, hostel, PG, room and roommate discovery for unfamiliar cities.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} bg-[var(--bg)] text-[var(--text)] antialiased`}>
        <StayWiseProvider>
          <SiteChrome>{children}</SiteChrome>
        </StayWiseProvider>
      </body>
    </html>
  );
}
