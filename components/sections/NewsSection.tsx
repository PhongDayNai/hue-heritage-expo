'use client';

import news from '@/data/news.json';
import Image from 'next/image';
import { useState } from 'react';
import AnimatedCard from '../ui/AnimatedCard';
import SpotlightModal from '../ui/SpotlightModal';

type News = (typeof news)[number];

export default function NewsSection() {
  const [active, setActive] = useState<News | null>(null);

  return (
    <section id="tin-tuc" className="bg-white/70 py-12 md:py-16">
      <div className="section-wrap">
        <h2 className="section-title">Tin tức - Sự kiện</h2>
        <p className="section-subtitle">Cập nhật các hoạt động mới nhất liên quan đến du lịch, văn hoá và phát triển địa phương.</p>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {news.map((item, idx) => (
            <AnimatedCard key={item.id} delay={idx * 0.06}>
              <article
                className="cursor-pointer overflow-hidden rounded-2xl border border-hueGold/20 bg-white"
                onClick={() => setActive(item)}
              >
                <div className="relative h-40">
                  <Image src={item.anh?.[0] || '/images/featured/binhdien-1.jpg'} alt={item.tieuDe} fill className="object-cover" />
                </div>
                <div className="space-y-2 p-4">
                  <p className="text-xs font-medium text-hueRed">{new Date(item.thoiGian).toLocaleDateString('vi-VN')}</p>
                  <h3 className="line-clamp-2 text-base font-semibold text-hueInk">{item.tieuDe}</h3>
                  <p className="line-clamp-3 text-sm text-neutral-700">{item.moTaNgan}</p>
                  <p className="text-xs text-neutral-600">{item.diaDiem}</p>
                </div>
              </article>
            </AnimatedCard>
          ))}
        </div>
      </div>

      <SpotlightModal
        open={!!active}
        onClose={() => setActive(null)}
        title={active?.tieuDe || ''}
        shortDesc={active?.moTaNgan}
        fullDesc={active?.moTaDayDu || active?.moTaNgan}
        image={active?.anh?.[0]}
        images={active?.anh || []}
        videos={active?.videos || []}
        chips={active ? [new Date(active.thoiGian).toLocaleDateString('vi-VN')] : []}
        address={active?.diaDiem}
      />
    </section>
  );
}
