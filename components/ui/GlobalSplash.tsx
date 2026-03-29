'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

let hasShownSplashInThisLoad = false;

export default function GlobalSplash() {
  const [showSplash, setShowSplash] = useState(() => !hasShownSplashInThisLoad);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!showSplash) return;

    hasShownSplashInThisLoad = true;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    setProgress(0);
    const frame = requestAnimationFrame(() => setProgress(100));
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, [showSplash]);

  if (!showSplash) return null;

  return (
    <div className="fixed inset-0 z-[120] bg-[#120b08]">
      <div className="section-wrap flex min-h-screen items-center py-8">
        <div className="grid w-full overflow-hidden rounded-3xl border border-hueGold/40 bg-[#1b120e] shadow-[0_30px_80px_rgba(0,0,0,0.55)] lg:grid-cols-[1.05fr_1fr]">
          <div className="relative min-h-[320px] bg-[#1a110d]">
            <div className="flex h-full min-h-[320px] items-center justify-center p-6 md:p-10">
              <div className="relative h-[220px] w-[220px] overflow-hidden rounded-full border-4 border-hueGold/80 shadow-[0_0_28px_rgba(212,160,23,0.45)] md:h-[280px] md:w-[280px]">
                <Image
                  src="/images/featured/logo-cndl.jpeg"
                  alt="Logo splash Huế"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center p-6 md:p-9">
            <span className="inline-flex w-fit rounded bg-hueGold px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-hueInk">
              HueHeritage Expo
            </span>
            <h2 className="mt-4 font-[var(--font-heading)] text-3xl leading-tight text-[#f8eecf] md:text-4xl">
              Chào mừng anh/chị đến với không gian du lịch Bình Điền - Huế số hoá
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#e7d5ac] md:text-base">
              Khám phá danh lam, văn hoá và ẩm thực Huế qua trải nghiệm trực quan.
            </p>

            <div className="mt-6">
              <div className="h-2 w-full overflow-hidden rounded-full bg-transparent">
                <div
                  className="h-full w-full rounded-full bg-hueGold transition-transform duration-[2000ms] ease-linear"
                  style={{ transform: `scaleX(${progress / 100})`, transformOrigin: 'center' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
