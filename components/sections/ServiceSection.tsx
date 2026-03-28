'use client';

import services from '@/data/services.json';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import AnimatedCard from '../ui/AnimatedCard';
import SpotlightModal from '../ui/SpotlightModal';

type Service = (typeof services)[number];

export default function ServiceSection() {
  const [active, setActive] = useState<Service | null>(null);

  const serviceItems = useMemo(() => services.filter((item) => item.id !== 'lich-trinh-goi-y'), []);
  const itinerary = useMemo(() => services.find((item) => item.id === 'lich-trinh-goi-y') || null, []);

  return (
    <section id="dich-vu" className="bg-white/70 py-12 md:py-16">
      <div className="section-wrap">
        <h2 className="section-title">Dịch vụ du lịch</h2>
        <p className="section-subtitle">
          Tổng hợp các dịch vụ hỗ trợ hành trình tại Bình Điền: di chuyển, make up, thuê trang phục và spa.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {serviceItems.map((item, idx) => (
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

        {itinerary && (
          <div className="mt-10">
            <AnimatedCard delay={0.1}>
              <article className="overflow-hidden rounded-3xl border border-hueGold/30 bg-white shadow-sm">
                <div className="bg-gradient-to-r from-hueRed to-[#b7401f] px-6 py-5 text-white">
                  <p className="text-xs font-semibold tracking-[0.12em] text-white/85">GỢI Ý RIÊNG CHO CHUYẾN ĐI</p>
                  <h3 className="mt-2 text-2xl font-semibold">{itinerary.tenDichVu}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/90">Lộ trình tham khảo 1 ngày tại Bình Điền (tách riêng khỏi nhóm dịch vụ).</p>
                </div>

                <div className="grid gap-6 px-6 py-6 lg:grid-cols-[1.25fr_1fr]">
                  <div className="space-y-3 text-sm leading-7 text-neutral-700">
                    {(itinerary.moTaDayDu || '')
                      .split('\n')
                      .map((line) => line.trim())
                      .filter(Boolean)
                      .map((line, idx) => {
                        const isSection = /^(\d+\.|Buổi\s+sáng|Buổi\s+trưa|Buổi\s+chiều|Buổi\s+tối)/i.test(line);
                        return (
                          <p key={`${idx}-${line.slice(0, 16)}`} className={isSection ? 'font-semibold text-hueRed' : ''}>
                            {line}
                          </p>
                        );
                      })}
                  </div>

                  <div className="rounded-2xl border border-hueGold/20 bg-hueGold/5 p-4">
                    <h4 className="text-sm font-semibold text-hueRed">Mẹo sử dụng lịch trình</h4>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-700">
                      <li>Điều chỉnh khung giờ linh hoạt theo thời tiết thực tế.</li>
                      <li>Ưu tiên đặt trước xe và điểm ăn nếu đi theo nhóm.</li>
                      <li>Mang theo nước, sạc dự phòng và giày thoải mái.</li>
                    </ul>
                  </div>
                </div>
              </article>
            </AnimatedCard>
          </div>
        )}
      </div>

      <SpotlightModal
        open={!!active}
        onClose={() => setActive(null)}
        title={active?.tenDichVu || ''}
        shortDesc={active?.tomTat}
        fullDesc={active?.moTaDayDu}
        image={active?.anh?.[0]}
        images={active?.anh || []}
        enableContactEnhancements
      />
    </section>
  );
}
