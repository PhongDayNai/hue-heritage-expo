'use client';

import food from '@/data/food.json';
import Image from 'next/image';
import { useState } from 'react';
import AnimatedCard from '../ui/AnimatedCard';
import SpotlightModal from '../ui/SpotlightModal';

type Food = (typeof food)[number];

export default function FoodSection() {
  const [active, setActive] = useState<Food | null>(null);

  return (
    <section id="am-thuc" className="bg-white/70 py-12 md:py-16">
      <div className="section-wrap">
        <h2 className="section-title">Ẩm thực Huế</h2>
        <p className="section-subtitle">
          Mỗi mục hiển thị ngắn gọn: Tên món - Tên quán - Mức giá; mở chi tiết để xem thêm thông tin.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {food.map((item, idx) => (
            <AnimatedCard key={item.id} delay={idx * 0.05}>
              <article
                className="group cursor-pointer overflow-hidden rounded-2xl border border-hueGold/20 bg-white"
                onClick={() => setActive(item)}
              >
                <div className="relative h-44 bg-neutral-100">
                  {item.anh?.[0] ? (
                    <Image src={item.anh[0]} alt={item.tenMon} fill className="object-cover transition duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="flex h-full items-center justify-center px-3 text-center text-xs font-medium text-neutral-500">
                      Chưa có ảnh từ thư mục nguồn
                    </div>
                  )}
                </div>
                <div className="space-y-2 p-4 text-sm">
                  <p>
                    <span className="font-semibold text-hueRed">Tên món:</span> {item.tenMon}
                  </p>
                  <p>
                    <span className="font-semibold text-hueRed">Tên quán:</span> {item.tenQuan}
                  </p>
                  <p>
                    <span className="font-semibold text-hueRed">Mức giá:</span> {item.mucGia}
                  </p>
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
        title={active?.tenMon || ''}
        shortDesc={active ? `${active.tenQuan} · ${active.mucGia}` : ''}
        fullDesc={active?.moTaNgan}
        image={active?.anh?.[0]}
        images={active?.anh || []}
        videos={active?.videos || []}
        chips={active ? [active.tenQuan, active.mucGia] : []}
        address={active?.diaChi}
      />
    </section>
  );
}
