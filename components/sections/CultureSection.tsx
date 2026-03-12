'use client';

import culture from '@/data/culture.json';
import Image from 'next/image';
import { useState } from 'react';
import AnimatedCard from '../ui/AnimatedCard';
import SpotlightModal from '../ui/SpotlightModal';

type Culture = (typeof culture)[number];

export default function CultureSection() {
  const [active, setActive] = useState<Culture | null>(null);

  return (
    <section id="van-hoa" className="section-wrap py-12 md:py-16">
      <h2 className="section-title">Văn hoá Huế</h2>
      <p className="section-subtitle">
        Trình bày theo dạng chuyên đề nổi bật, ngắn gọn khi lướt và mở rộng chi tiết khi bấm vào từng mục.
      </p>

      <div className="mt-8 space-y-5">
        {culture.map((item, idx) => (
          <AnimatedCard key={item.id} delay={idx * 0.08}>
            <article
              className="grid cursor-pointer gap-0 overflow-hidden rounded-2xl border border-hueGold/25 bg-white md:grid-cols-3"
              onClick={() => setActive(item)}
            >
              <div className="relative min-h-44">
                <Image src={item.anh} alt={item.chuDe} fill className="object-cover" />
              </div>
              <div className="md:col-span-2 p-5">
                <h3 className="text-xl font-semibold text-hueRed">{item.chuDe}</h3>
                <p className="mt-2 text-sm text-neutral-700">{item.tomTat}</p>
                <p className="mt-3 text-sm italic text-neutral-600">Điểm nhấn: {item.diemNhan}</p>
                <button className="mt-3 text-sm font-semibold text-hueRed">Xem chi tiết</button>
              </div>
            </article>
          </AnimatedCard>
        ))}
      </div>

      <SpotlightModal
        open={!!active}
        onClose={() => setActive(null)}
        title={active?.chuDe || ''}
        shortDesc={active?.tomTat}
        fullDesc={active?.noiDungDayDu}
        image={active?.anh}
        chips={active?.diemNhan ? [active.diemNhan] : []}
      />
    </section>
  );
}
