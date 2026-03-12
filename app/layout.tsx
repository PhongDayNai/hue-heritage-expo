import type { Metadata } from 'next';
import { Be_Vietnam_Pro, Merriweather } from 'next/font/google';
import './globals.css';

const heading = Merriweather({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '700', '900'],
  variable: '--font-heading'
});

const body = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
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
