'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, Search, X } from 'lucide-react';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';

import { useFeatureFlags } from '@/lib/useFeatureFlags';

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const [compactMobile, setCompactMobile] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [searching, setSearching] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const openedAtScrollYRef = useRef<number | null>(null);
  const { flags } = useFeatureFlags();

  const items = useMemo(
    () => [
      { label: 'TRANG CHỦ', href: '/' },
      { label: 'DANH LAM THẮNG CẢNH', href: '/danh-lam' },
      { label: 'ẨM THỰC', href: '/am-thuc' },
      ...(flags.showServices ? [{ label: 'DỊCH VỤ', href: '/dich-vu' }] : []),
      { label: 'VĂN HOÁ', href: '/van-hoa' },
      { label: 'TIN TỨC - SỰ KIỆN', href: '/tin-tuc' },
      { label: 'BẢN ĐỒ', href: '/ban-do' },
      { label: 'HỖ TRỢ - GÓP Ý', href: '/ho-tro' }
    ],
    [flags.showServices]
  );

  const currentLabel = useMemo(
    () => items.find((item) => item.href === pathname)?.label || 'TRANG CHỦ',
    [pathname, items]
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

  const onSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = keyword.trim();
    if (!q || searching) return;

    try {
      setSearching(true);
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      const first = data?.results?.[0];
      if (first?.href) {
        router.push(first.href);
      }
    } finally {
      setSearching(false);
    }
  };

  return (
    <>
      {compactMobile && (
        <div className="sticky top-0 z-[60] border-b border-hueGold/70 bg-hueRed/95 backdrop-blur lg:hidden">
          <div className="section-wrap relative flex items-center justify-between py-2.5">
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

            <div
              className={`absolute left-0 right-0 top-full z-[70] origin-top overflow-hidden border-t border-hueGold/30 bg-hueRed/95 shadow-[0_14px_30px_rgba(0,0,0,0.35)] transition-[max-height,opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? 'max-h-[460px] opacity-100 translate-y-0' : 'pointer-events-none max-h-0 opacity-0 -translate-y-1'
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
                        className={`rounded-md px-3 py-2 text-[15px] transition-all duration-300 ${
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
        </div>
      )}

      <header
        className={`border-b-2 border-hueGold/80 bg-[linear-gradient(140deg,#1a0c06_0%,#3b1a08_55%,#5d2d10_100%)] ${
          hideFullMobileHeader ? 'hidden lg:block' : ''
        }`}
      >
        <div className="section-wrap flex items-center gap-4 py-4">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-hueGold/80 shadow-[0_0_20px_rgba(212,160,23,0.35)]">
            <Image src="/images/featured/logo-cndl.jpeg" alt="Logo Huế" fill className="object-cover" />
          </div>

          <div>
            <p className="font-[var(--font-heading)] text-xl leading-tight text-hueGold md:text-2xl">Trang thông tin Du lịch Bình Điền - Huế</p>
            <p className="mt-1 text-[11px] text-[#e8d5a0] md:text-xs">Khám phá danh lam - văn hoá - ẩm thực theo trải nghiệm hiện đại</p>
          </div>

          <form
            onSubmit={onSearch}
            className="ml-auto hidden overflow-hidden rounded-md border border-hueGold/70 bg-white/10 md:flex"
          >
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Tìm kiếm..."
              className="w-44 bg-transparent px-3 py-2 text-sm text-white placeholder:text-[#ccb075] focus:outline-none"
            />
            <button className="bg-hueGold px-3 text-hueInk" aria-label="Tìm kiếm" disabled={searching}>
              <Search size={16} />
            </button>
          </form>

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
                className={`border-r border-hueGold/20 px-4 py-3 text-[15px] font-medium transition ${
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
                    className={`rounded-md px-3 py-2 text-[15px] transition ${
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
