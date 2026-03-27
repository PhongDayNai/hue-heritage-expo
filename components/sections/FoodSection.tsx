'use client';

import food from '@/data/food.json';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import AnimatedCard from '../ui/AnimatedCard';
import SpotlightModal from '../ui/SpotlightModal';

type Food = (typeof food)[number] & {
  moTaDayDu?: string;
};

export default function FoodSection() {
  const [active, setActive] = useState<Food | null>(null);
  const [expandedRestaurantId, setExpandedRestaurantId] = useState<string | null>(null);

  const intro = useMemo(
    () => food.find((item) => item.id === 'anh-huong-den-am-thuc-binh-dien') as Food | undefined,
    []
  );
  const foodItems = useMemo(() => food.filter((item) => item.id !== 'anh-huong-den-am-thuc-binh-dien'), []);

  const sections = useMemo(() => {
    const order = ['Các quán ăn', 'Các món vỉa hè', 'Đặc sản'];
    const grouped = new Map<string, Food[]>();

    for (const key of order) grouped.set(key, []);

    for (const item of foodItems) {
      const key = item.tenQuan || 'Khác';
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key)!.push(item as Food);
    }

    return Array.from(grouped.entries()).filter(([, items]) => items.length > 0);
  }, [foodItems]);

  return (
    <section id="am-thuc" className="bg-white/70 py-12 md:py-16">
      <div className="section-wrap">
        <h2 className="section-title">Ẩm thực Huế</h2>
        <p className="section-subtitle">
          Mỗi mục hiển thị ngắn gọn: Tên món - Tên quán - Mức giá; mở chi tiết để xem thêm thông tin.
        </p>

        {intro && (
          <article className="mt-8 rounded-2xl border border-hueGold/30 bg-white p-5 md:p-6">
            <h3 className="text-xl font-semibold text-hueRed">Giới thiệu ẩm thực Bình Điền</h3>
            <p className="mt-3 text-sm leading-7 text-neutral-700 line-clamp-5">{intro.moTaDayDu || intro.moTaNgan}</p>
            <button
              type="button"
              className="mt-4 text-sm font-semibold text-hueRed"
              onClick={() => setActive(intro)}
            >
              Xem chi tiết
            </button>
          </article>
        )}

        <div className="mt-8 space-y-10">
          {sections.map(([sectionName, items], sectionIdx) => (
            <div key={sectionName}>
              <h3 className="mb-4 text-xl font-semibold text-hueRed">{sectionName}</h3>

              {sectionName === 'Các quán ăn' ? (
                <div className="space-y-3">
                  {items.map((item, idx) => {
                    const isExpanded = expandedRestaurantId === item.id;
                    const preview = item.moTaNgan || item.moTaDayDu || 'Đang cập nhật nội dung.';
                    const full = item.moTaDayDu || item.moTaNgan || 'Đang cập nhật nội dung.';

                    return (
                      <AnimatedCard key={item.id} delay={(sectionIdx * 0.05) + idx * 0.05}>
                        <article className="rounded-xl border border-hueGold/20 bg-white p-4 text-sm">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h4 className="font-semibold text-hueRed">{item.tenMon}</h4>
                              <p className={`${isExpanded ? 'mt-2 whitespace-pre-line text-neutral-700' : 'mt-2 line-clamp-1 text-neutral-700'}`}>
                                {isExpanded ? full : preview}
                              </p>
                            </div>
                            <button
                              type="button"
                              className="shrink-0 text-xs font-semibold text-hueRed"
                              onClick={() => setExpandedRestaurantId(isExpanded ? null : item.id)}
                            >
                              {isExpanded ? 'Thu gọn' : 'Mở rộng'}
                            </button>
                          </div>
                        </article>
                      </AnimatedCard>
                    );
                  })}
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {items.map((item, idx) => (
                    <AnimatedCard key={item.id} delay={(sectionIdx * 0.05) + idx * 0.05}>
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
              )}
            </div>
          ))}
        </div>
      </div>

      <SpotlightModal
        open={!!active}
        onClose={() => setActive(null)}
        title={active?.tenMon || ''}
        shortDesc={active ? `${active.tenQuan} · ${active.mucGia}` : ''}
        fullDesc={(active as any)?.moTaDayDu || active?.moTaNgan}
        image={active?.anh?.[0]}
        images={active?.anh || []}
        videos={active?.videos || []}
        chips={active ? [active.tenQuan, active.mucGia] : []}
        address={active?.diaChi}
        mapUrls={((active as any)?.mapUrls as string[]) || ((active as any)?.mapUrl ? [(active as any).mapUrl] : [])}
      />
    </section>
  );
}
