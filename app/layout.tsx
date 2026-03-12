import type { Metadata } from 'next';
import { Playfair_Display, Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';

const heading = Playfair_Display({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-heading'
});

const body = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body'
});

export const metadata: Metadata = {
  title: 'HueHeritage Expo | Danh lam thắng cảnh Huế',
  description:
    'Website giới thiệu danh lam thắng cảnh, ẩm thực, văn hoá Huế phục vụ nghiên cứu và trình bày khoa học kỹ thuật.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${heading.variable} ${body.variable}`}>
      <body className="font-[var(--font-body)] antialiased">{children}</body>
    </html>
  );
}
