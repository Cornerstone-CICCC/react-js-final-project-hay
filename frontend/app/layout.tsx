import type { Metadata } from 'next';
import { Italiana, Julius_Sans_One, Nunito_Sans } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

import './globals.css';
import Footer from './components/Footer';
import Header from './components/Header/Header';
import SocketApp from './SocketApp';

const nunitoSans = Nunito_Sans({
  variable: '--font-nunito-sans',
  subsets: ['latin'],
});

export const juliusSansOne = Julius_Sans_One({
  variable: '--font-julius-sans-one',
  weight: '400',
  subsets: ['latin'],
});

export const italiana = Italiana({
  variable: '--font-italiana',
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Shine Studio',
  description: 'Wear it to be confident',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunitoSans.className} antialiased`}>
        <Toaster />
        <SocketApp />
        <Header />
        <main className="pb-16 md:pb-32">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
