import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import { RealtorsPortalProvider } from '@veerge/realtors-portal';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--realtor-portal-base'
});

export const metadata: Metadata = {
  title: 'Realtors Portal',
  description: `Myxellia's Realtors Portal`
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <RealtorsPortalProvider accessToken='' baseRoute={'/realtors'}>
          {children}
        </RealtorsPortalProvider>
      </body>
    </html>
  );
}
