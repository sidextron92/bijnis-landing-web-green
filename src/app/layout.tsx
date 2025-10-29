import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/layout/SmoothScroll';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Bijnis | India\'s 60-Minute Factory to Retailer Supply Chain',
  description: 'India\'s fastest 60-minute factory to retailer supply chain solution. Revolutionizing logistics and distribution.',
  keywords: ['supply chain', 'logistics', 'fast delivery', '60 minute delivery', 'factory to retailer', 'India'],
  authors: [{ name: 'Bijnis Team' }],
  openGraph: {
    title: 'Bijnis | India\'s 60-Minute Factory to Retailer Supply Chain',
    description: 'India\'s fastest 60-minute factory to retailer supply chain solution',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className={`${outfit.className} antialiased`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
