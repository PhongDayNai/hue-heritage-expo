'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const items = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Danh lam thắng cảnh', href: '/danh-lam' },
  { label: 'Ẩm thực', href: '/am-thuc' },
  { label: 'Văn hoá', href: '/van-hoa' },
  { label: 'Tin tức - Sự kiện', href: '/tin-tuc' },
  { label: 'Bản đồ', href: '/ban-do' },
  { label: 'Hỗ trợ - Góp ý', href: '/ho-tro' }
];

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-hueGold/30 bg-hueRed/95 backdrop-blur">
      <div className="section-wrap flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold text-white">
          HueHeritage Expo
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm transition ${
                  active
                    ? 'bg-white/20 text-white'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          className="lg:hidden rounded-lg border border-white/30 p-2 text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Mở menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/15 bg-hueRed lg:hidden">
          <div className="section-wrap py-3">
            <div className="grid gap-1">
              {items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-md px-3 py-2 text-sm ${
                      active ? 'bg-white/20 text-white' : 'text-white/90 hover:bg-white/10'
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
