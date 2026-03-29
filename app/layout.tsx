import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HueHeritage Expo | Danh lam thắng cảnh Huế',
  description:
    'Cổng thông tin tổng hợp danh lam thắng cảnh, ẩm thực, văn hoá và sự kiện của Bình Điền - Huế theo cách trực quan, dễ tra cứu và phù hợp trình bày học thuật.',
  icons: {
    icon: '/images/featured/logo-cndl.jpeg',
    shortcut: '/images/featured/logo-cndl.jpeg',
    apple: '/images/featured/logo-cndl.jpeg'
  },
  openGraph: {
    images: ['/images/featured/logo-cndl.jpeg']
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/featured/logo-cndl.jpeg']
  }
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
