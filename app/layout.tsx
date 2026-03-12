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
      <body className="font-[var(--font-body)] antialiased">{children}</body>
    </html>
  );
}
