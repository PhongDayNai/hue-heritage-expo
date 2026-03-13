'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, X } from 'lucide-react';
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
    <>
      <div className="hidden border-b border-hueGold/25 bg-hueRed py-1 text-[12px] text-[#f4ddb0] md:block font-[var(--font-body)]">
        <div className="section-wrap flex items-center justify-between">
          <span>HueHeritage Expo - Nền tảng giới thiệu danh lam, văn hoá và ẩm thực Huế</span>
          <div className="flex items-center gap-4">
            <Link href="/ho-tro" className="hover:text-white">
              Liên hệ
            </Link>
          </div>
        </div>
      </div>

      <header className="border-b-2 border-hueGold/80 bg-[linear-gradient(140deg,#1a0c06_0%,#3b1a08_55%,#5d2d10_100%)]">
        <div className="section-wrap flex items-center gap-4 py-4">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-hueGold/80 bg-[radial-gradient(circle,#d4a017_0%,#7a4c08_100%)] text-2xl shadow-[0_0_20px_rgba(212,160,23,0.35)]">
            🏯
          </div>

          <div>
            <p className="font-[var(--font-heading)] text-xl leading-tight text-hueGold md:text-2xl">Trang thông tin Du lịch Huế</p>
            <p className="mt-1 text-[11px] text-[#e8d5a0] md:text-xs">Khám phá danh lam - văn hoá - ẩm thực theo trải nghiệm hiện đại</p>
          </div>

          <div className="ml-auto hidden overflow-hidden rounded-md border border-hueGold/70 bg-white/10 md:flex">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-44 bg-transparent px-3 py-2 text-sm text-white placeholder:text-[#ccb075] focus:outline-none"
            />
            <button className="bg-hueGold px-3 text-hueInk" aria-label="Tìm kiếm">
              <Search size={16} />
            </button>
          </div>

          <button
            className="ml-auto rounded-lg border border-white/30 p-2 text-white lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Mở menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <nav className="sticky top-0 z-50 border-b border-hueGold/70 bg-hueRed/95 backdrop-blur">
        <div className="section-wrap hidden items-center lg:flex">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`border-r border-hueGold/20 px-4 py-3 text-sm font-medium transition ${
                  active ? 'bg-hueGold text-hueInk' : 'text-[#f5e6c0] hover:bg-hueGold hover:text-hueInk'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
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
      </nav>
    </>
  );
}
