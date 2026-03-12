'use client';

import scenic from '@/data/scenic.json';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import AnimatedCard from '../ui/AnimatedCard';
import SpotlightModal from '../ui/SpotlightModal';

type Scenic = (typeof scenic)[number];

export default function ScenicSection() {
  const [active, setActive] = useState<Scenic | null>(null);
  const featured = useMemo(() => scenic, []);

  return (
    <section id="danh-lam" className="section-wrap py-12 md:py-16">
      <h2 className="section-title">Danh lam thắng cảnh</h2>
      <p className="section-subtitle">
        Khám phá 15 danh lam tiêu biểu của Huế với phần giới thiệu cô đọng, hình ảnh trực quan và gợi ý dịch vụ đi kèm. Bấm vào từng địa điểm để mở thông tin chi tiết nổi bật và đầy đủ hơn.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {featured.map((item, idx) => (
          <AnimatedCard key={item.id} delay={(idx % 6) * 0.05}>
            <article
              onClick={() => setActive(item)}
              className="group relative cursor-pointer overflow-hidden rounded-[26px] border border-hueGold/35 bg-neutral-950 shadow-[0_20px_55px_rgba(31,26,23,0.35)]"
            >
              <div className="relative h-[370px] overflow-hidden">
                <Image
                  src={item.anh[0]}
                  alt={item.tenDiaDiem}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a08]/88 via-[#251612]/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-36 bg-[radial-gradient(ellipse_at_bottom,rgba(196,155,61,0.35),transparent_70%)]" />

                <motion.div
                  initial={{ opacity: 0.35, scale: 0.95 }}
                  animate={{ opacity: [0.35, 0.55, 0.35], scale: [0.95, 1.05, 0.95] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.15 }}
                  className="pointer-events-none absolute -left-8 top-8 h-28 w-28 rounded-full border border-hueGold/35 bg-hueGold/15 blur-[1px]"
                />
                <motion.div
                  initial={{ opacity: 0.25, y: 0 }}
                  animate={{ opacity: [0.2, 0.45, 0.2], y: [0, -8, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.1 }}
                  className="pointer-events-none absolute right-6 top-10 h-2 w-2 rounded-full bg-hueGold shadow-[0_0_16px_rgba(196,155,61,0.9)]"
                />
                <motion.div
                  initial={{ opacity: 0.22, rotate: -10 }}
                  animate={{ opacity: [0.18, 0.34, 0.18], rotate: [-10, 8, -10] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.2 }}
                  className="pointer-events-none absolute bottom-24 right-8 h-14 w-14 rounded-xl border border-white/25"
                />

                <div className="absolute left-4 right-4 bottom-4 rounded-2xl border border-white/20 bg-gradient-to-br from-black/45 via-black/35 to-black/20 p-4 backdrop-blur-[2px]">
                  <h3 className="text-xl font-semibold leading-tight text-white drop-shadow-md">{item.tenDiaDiem}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/90">{item.gioiThieuNgan}</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.dichVu.slice(0, 3).map((dv) => (
                      <span
                        key={dv}
                        className="rounded-full border border-hueGold/50 bg-gradient-to-r from-hueGold/20 to-white/10 px-2.5 py-1 text-[11px] font-medium text-white"
                      >
                        {dv}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 inline-flex items-center rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white transition group-hover:bg-hueGold/80 group-hover:text-hueInk">
                    Xem chi tiết
                  </div>
                </div>
              </div>
            </article>
          </AnimatedCard>
        ))}
      </div>

      <SpotlightModal
        open={!!active}
        onClose={() => setActive(null)}
        title={active?.tenDiaDiem || ''}
        shortDesc={active?.gioiThieuNgan}
        fullDesc={active?.gioiThieuDayDu}
        image={active?.anh?.[0]}
        chips={active?.dichVu || []}
        address={active?.diaChi}
      />
    </section>
  );
}
