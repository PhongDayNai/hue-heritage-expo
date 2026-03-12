'use client';

import scenic from '@/data/scenic.json';
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
        15 địa điểm được trình bày theo cấu trúc: giới thiệu ngắn - hình ảnh - dịch vụ, bấm vào để xem chi tiết đầy đủ.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {featured.map((item, idx) => (
          <AnimatedCard key={item.id} delay={(idx % 6) * 0.05}>
            <article
              onClick={() => setActive(item)}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-hueGold/25 bg-white"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={item.anh[0]}
                  alt={item.tenDiaDiem}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                <h3 className="absolute bottom-3 left-4 right-4 text-lg font-semibold text-white">
                  {item.tenDiaDiem}
                </h3>
              </div>

              <div className="space-y-3 p-4">
                <p className="line-clamp-3 text-sm text-neutral-700">{item.gioiThieuNgan}</p>
                <div className="flex flex-wrap gap-2">
                  {item.dichVu.slice(0, 3).map((dv) => (
                    <span key={dv} className="rounded-full border border-hueGold/35 bg-hueGold/10 px-2.5 py-1 text-xs text-hueRed">
                      {dv}
                    </span>
                  ))}
                </div>
                <button className="text-sm font-semibold text-hueRed">Xem chi tiết</button>
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
