'use client';

import services from '@/data/services.json';
import Image from 'next/image';
import { useState } from 'react';
import AnimatedCard from '../ui/AnimatedCard';
import SpotlightModal from '../ui/SpotlightModal';

type Service = (typeof services)[number];

export default function ServiceSection() {
  const [active, setActive] = useState<Service | null>(null);

  return (
    <section id="dich-vu" className="bg-white/70 py-12 md:py-16">
      <div className="section-wrap">
        <h2 className="section-title">Dịch vụ du lịch</h2>
        <p className="section-subtitle">
          Tổng hợp các dịch vụ hỗ trợ hành trình tại Bình Điền: di chuyển, make up, thuê trang phục, spa và gợi ý lịch trình.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((item, idx) => (
            <AnimatedCard key={item.id} delay={idx * 0.05}>
              <article
                className="group cursor-pointer overflow-hidden rounded-2xl border border-hueGold/20 bg-white"
                onClick={() => setActive(item)}
              >
                <div className="relative h-44 bg-neutral-100">
                  {item.anh?.[0] ? (
                    <Image
                      src={item.anh[0]}
                      alt={item.tenDichVu}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center px-3 text-center text-xs font-medium text-neutral-500">
                      Chưa có ảnh minh họa
                    </div>
                  )}
                </div>

                <div className="space-y-2 p-4 text-sm">
                  <h3 className="text-base font-semibold text-hueRed">{item.tenDichVu}</h3>
                  <p className="line-clamp-2 leading-6 text-neutral-700">{item.tomTat}</p>
                  <button className="pt-1 text-sm font-semibold text-hueRed">Xem chi tiết</button>
                </div>
              </article>
            </AnimatedCard>
          ))}
        </div>
      </div>

      <SpotlightModal
        open={!!active}
        onClose={() => setActive(null)}
        title={active?.tenDichVu || ''}
        shortDesc={active?.tomTat}
        fullDesc={active?.moTaDayDu}
        image={active?.anh?.[0]}
        images={active?.anh || []}
      />
    </section>
  );
}
