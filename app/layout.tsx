import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
        />
      </head>
      <body className="font-[var(--font-body)] antialiased">{children}</body>
    </html>
  );
}
