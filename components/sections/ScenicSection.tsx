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
        Khám phá 15 địa điểm danh lam tiêu biểu tại Huế với thông tin cô đọng: giới thiệu ngắn, hình ảnh trực quan và dịch vụ đi kèm. Bấm vào từng mục để xem đầy đủ nội dung chi tiết.
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
                  className="object-cover brightness-95 contrast-110 saturate-110 transition duration-700 group-hover:scale-110 group-hover:brightness-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/52 to-black/20" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,transparent_0%,transparent_36%,rgba(0,0,0,0.48)_100%)]" />

                <motion.div
                  initial={{ opacity: 0.22, scale: 0.96 }}
                  animate={{ opacity: [0.22, 0.34, 0.22], scale: [0.96, 1.02, 0.96] }}
                  transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.12 }}
                  className="pointer-events-none absolute -left-10 top-6 h-28 w-28 rounded-full border border-white/20 bg-white/5"
                />
                <motion.div
                  initial={{ opacity: 0.2, y: 0 }}
                  animate={{ opacity: [0.16, 0.32, 0.16], y: [0, -8, 0] }}
                  transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.08 }}
                  className="pointer-events-none absolute right-6 top-10 h-2 w-2 rounded-full bg-white/80 shadow-[0_0_16px_rgba(255,255,255,0.65)]"
                />
                <motion.div
                  initial={{ opacity: 0.16, rotate: -10 }}
                  animate={{ opacity: [0.14, 0.26, 0.14], rotate: [-10, 8, -10] }}
                  transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.16 }}
                  className="pointer-events-none absolute bottom-24 right-8 h-14 w-14 rounded-xl border border-white/20"
                />

                <div className="absolute left-4 right-4 bottom-4 rounded-2xl border border-white/28 bg-gradient-to-b from-black/72 via-black/66 to-black/58 p-4 shadow-[0_12px_35px_rgba(0,0,0,0.45)] backdrop-blur-[1px]">
                  <h3 className="text-xl font-semibold leading-tight text-white drop-shadow-md">{item.tenDiaDiem}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/95">{item.gioiThieuNgan}</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.dichVu.slice(0, 3).map((dv) => (
                      <span
                        key={dv}
                        className="rounded-full border border-white/35 bg-white/12 px-2.5 py-1 text-[11px] font-medium text-white"
                      >
                        {dv}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 inline-flex items-center rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold text-white transition group-hover:bg-hueGold/90 group-hover:text-hueInk">
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
