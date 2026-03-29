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
        Khám phá các danh lam thắng cảnh tiêu biểu của Bình Điền với mô tả ngắn gọn, hình ảnh trực quan và thông tin dịch vụ đi kèm. Bấm vào từng địa điểm để xem đầy đủ nội dung chi tiết.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {featured.map((item, idx) => {
          const primaryImage = item.anh?.[0];

          return (
          <AnimatedCard key={item.id} delay={(idx % 6) * 0.05}>
            <article
              onClick={() => setActive(item)}
              className="group relative cursor-pointer overflow-hidden rounded-[26px] border border-hueGold/35 bg-neutral-950 shadow-[0_20px_55px_rgba(31,26,23,0.35)]"
            >
              <div className="relative h-[370px] overflow-hidden">
                {primaryImage ? (
                  <Image
                    src={primaryImage}
                    alt={item.tenDiaDiem}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-neutral-900 text-sm text-white/70">
                    Chưa có ảnh minh họa
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a08]/88 via-[#251612]/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-36 bg-[radial-gradient(ellipse_at_bottom,rgba(196,155,61,0.35),transparent_70%)]" />


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
          );
        })}
      </div>

      <SpotlightModal
        open={!!active}
        onClose={() => setActive(null)}
        title={active?.tenDiaDiem || ''}
        shortDesc={active?.gioiThieuNgan}
        fullDesc={active?.gioiThieuDayDu}
        image={active?.anh?.[0]}
        images={active?.anh || []}
        videos={active?.videos || []}
        chips={active?.dichVu || []}
        address={active?.diaChi}
        mapUrls={((active as any)?.mapUrls as string[]) || ((active as any)?.mapUrl ? [(active as any).mapUrl] : [])}
        showMapEntriesList={false}
      />
    </section>
  );
}
