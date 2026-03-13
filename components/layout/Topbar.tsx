'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

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
  const [compactMobile, setCompactMobile] = useState(false);
  const pathname = usePathname();
  const openedAtScrollYRef = useRef<number | null>(null);

  const currentLabel = useMemo(
    () => items.find((item) => item.href === pathname)?.label || 'Trang chủ',
    [pathname]
  );

  useEffect(() => {
    setOpen(false);
    openedAtScrollYRef.current = null;
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const isMobile = window.innerWidth < 1024;
      if (!isMobile) {
        setCompactMobile(false);
        return;
      }

      const currentY = window.scrollY;
      const shouldCompact = currentY > 220;
      setCompactMobile(shouldCompact);

      if (open && openedAtScrollYRef.current !== null) {
        const delta = Math.abs(currentY - openedAtScrollYRef.current);
        if (delta > 18) {
          setOpen(false);
          openedAtScrollYRef.current = null;
        }
      }
    };

    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setCompactMobile(false);
        setOpen(false);
      } else {
        onScroll();
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const hideFullMobileHeader = compactMobile;

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

      {compactMobile && (
        <div className="sticky top-0 z-[60] border-b border-hueGold/70 bg-hueRed/95 backdrop-blur lg:hidden">
          <div className="section-wrap flex items-center justify-between py-2.5">
            <p className="truncate pr-3 text-sm font-semibold text-[#f5e6c0]">{currentLabel}</p>
            <button
              className="rounded-md border border-white/30 p-2 text-white"
              onClick={() => {
                openedAtScrollYRef.current = window.scrollY;
                setOpen((v) => !v);
              }}
              aria-label={open ? 'Đóng topbar' : 'Mở topbar'}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          <div
            className={`origin-top overflow-hidden border-t border-white/15 bg-hueRed transition-[max-height,opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open ? 'max-h-[460px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-1'
            }`}
          >
            <div className="section-wrap py-3 transition-opacity duration-300 ease-out">
              <div className="grid gap-1">
                {items.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`rounded-md px-3 py-2 text-sm transition-all duration-300 ${
                        active ? 'bg-white/20 text-white' : 'text-white/90 hover:bg-white/10 hover:translate-x-1'
                      }`}
                      onClick={() => {
                        setOpen(false);
                        openedAtScrollYRef.current = null;
                      }}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <header
        className={`border-b-2 border-hueGold/80 bg-[linear-gradient(140deg,#1a0c06_0%,#3b1a08_55%,#5d2d10_100%)] ${
          hideFullMobileHeader ? 'hidden lg:block' : ''
        }`}
      >
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
            onClick={() => {
              setOpen((v) => {
                const next = !v;
                openedAtScrollYRef.current = next ? window.scrollY : null;
                return next;
              });
            }}
            aria-label="Mở menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <nav className={`relative z-50 border-b border-hueGold/70 bg-hueRed/95 backdrop-blur lg:sticky lg:top-0 ${hideFullMobileHeader ? 'hidden lg:block' : ''}`}>
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

        <div
          className={`overflow-hidden border-t border-white/15 bg-hueRed transition-all duration-300 ease-out lg:hidden ${
            open ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="section-wrap py-3">
            <div className="grid gap-1">
              {items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-md px-3 py-2 text-sm transition ${
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
      </nav>
    </>
  );
}
