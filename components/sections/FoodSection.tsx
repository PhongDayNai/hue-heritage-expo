'use client';

import food from '@/data/food.json';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
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
    const order = ['Các quán ăn', 'Đặc sản', 'Các món vỉa hè'];
    const grouped = new Map<string, Food[]>();

    for (const key of order) grouped.set(key, []);

    for (const item of foodItems) {
      const key = item.tenQuan || 'Khác';
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key)!.push(item as Food);
    }

    return Array.from(grouped.entries()).filter(([, items]) => items.length > 0);
  }, [foodItems]);

  const activeMapEntries = useMemo(() => {
    if (!active) return [] as { label: string; url: string }[];

    const fromData = (active as any)?.mapEntries;
    if (Array.isArray(fromData) && fromData.length > 0) {
      return fromData
        .filter((e: any) => e && typeof e.label === 'string' && typeof e.url === 'string')
        .map((e: any) => ({ label: e.label.trim(), url: e.url.trim() }))
        .filter((e: any) => e.label && e.url);
    }

    const lines = ((active as any)?.moTaDayDu || '')
      .split('\n')
      .map((line: string) => line.trim())
      .filter(Boolean);

    const entries: { label: string; url: string }[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!/^https?:\/\//i.test(line)) continue;

      const url = line;
      let label = lines[i - 1] || '';
      label = label.replace(/^[-+•]\s*/, '').replace(/^Gợi ý:\s*/i, '').trim();

      if (!label) continue;

      if (/gần chợ Bình Điền$/i.test(label) && !/TX\s*Hương\s*Trà/i.test(label)) {
        label = `${label}, TX Hương Trà`;
      }

      label = label.replace(/Tp\.Huế/gi, 'TP. Huế').replace(/TP\.Huế/g, 'TP. Huế');

      if (!entries.some((e) => e.url === url)) {
        entries.push({ label, url });
      }
    }

    return entries;
  }, [active]);

  return (
    <section id="am-thuc" className="bg-white/70 py-12 md:py-16">
      <div className="section-wrap">
        <h2 className="section-title">Ẩm thực Huế</h2>
        <p className="section-subtitle">
          Khám phá ẩm thực Bình Điền theo từng nhóm món, bấm vào từng mục để xem thông tin chi tiết.
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
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    {items.map((item, idx) => {
                      const isExpanded = expandedRestaurantId === item.id;

                      return (
                        <AnimatedCard key={item.id} delay={(sectionIdx * 0.05) + idx * 0.05}>
                          <button
                            type="button"
                            onClick={() => setExpandedRestaurantId(isExpanded ? null : item.id)}
                            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                              isExpanded
                                ? 'border-hueRed bg-hueRed text-white'
                                : 'border-hueGold/30 bg-white text-hueInk hover:border-hueGold/60 hover:bg-hueGold/10'
                            }`}
                          >
                            {item.tenMon}
                          </button>
                        </AnimatedCard>
                      );
                    })}
                  </div>

                  <motion.div layout className="relative">
                    <AnimatePresence mode="popLayout">
                      {expandedRestaurantId && (() => {
                        const selected = items.find((item) => item.id === expandedRestaurantId);
                        if (!selected) return null;

                      const full = selected.moTaDayDu || selected.moTaNgan || 'Đang cập nhật nội dung.';
                      const lines = full
                        .split('\n')
                        .map((line) => line.trim())
                        .filter(Boolean);
                      const mapUrl = ((selected as any).mapUrl as string | undefined) || ((selected as any).mapUrls as string[] | undefined)?.[0];

                      return (
                        <motion.article
                          key={selected.id}
                          layout
                          initial={{ opacity: 0, y: 10, scale: 0.99 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.99 }}
                          transition={{ duration: 0.22, ease: 'easeOut' }}
                          className="overflow-hidden rounded-xl border border-hueGold/45 bg-hueGold/10 p-5 text-sm"
                        >
                          <div className="grid gap-4 md:grid-cols-[300px_1fr]">
                            <div className="relative h-60 overflow-hidden rounded-xl border border-hueGold/20 bg-neutral-100">
                              {selected.anh?.[0] ? (
                                <Image src={selected.anh[0]} alt={selected.tenMon} fill className="object-cover" />
                              ) : (
                                <div className="flex h-full items-center justify-center px-3 text-center text-xs font-medium text-neutral-500">
                                  Chưa có ảnh từ thư mục nguồn
                                </div>
                              )}
                            </div>

                            <div>
                              <h4 className="text-base font-semibold leading-6 text-hueRed">{selected.tenMon}</h4>
                              <div className="mt-3 space-y-2 leading-7 text-neutral-700">
                                {lines.map((line, lineIdx) => {
                                  const contactMatch = line.match(/^Liên hệ:\s*(.+)$/i);
                                  const phones = contactMatch
                                    ? (contactMatch[1].match(/\d[\d\s]{7,}\d/g) || []).map((p) => p.trim())
                                    : [];

                                  if (contactMatch && phones.length > 0) {
                                    return (
                                      <p key={`${selected.id}-line-${lineIdx}`}>
                                        <span>Liên hệ: </span>
                                        {phones.map((phone, idxPhone) => (
                                          <span key={`${selected.id}-phone-${idxPhone}`}>
                                            {idxPhone > 0 ? ' · ' : ''}
                                            <a
                                              href={`tel:${phone.replace(/\s+/g, '')}`}
                                              className="font-medium text-hueRed underline-offset-2 hover:underline"
                                            >
                                              {phone}
                                            </a>
                                          </span>
                                        ))}
                                      </p>
                                    );
                                  }

                                  return <p key={`${selected.id}-line-${lineIdx}`}>{line}</p>;
                                })}
                              </div>

                              <div className="mt-4 border-t border-hueGold/20 pt-3">
                                {mapUrl ? (
                                  <a
                                    href={mapUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center text-sm font-medium text-hueRed underline-offset-2 hover:underline"
                                  >
                                    📍 {selected.diaChi || 'Mở Google Maps'}
                                  </a>
                                ) : (
                                  <p className="text-sm text-neutral-600">📍 {selected.diaChi || 'Đang cập nhật địa chỉ'}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.article>
                      );
                    })()}
                  </AnimatePresence>
                </motion.div>
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
        fullDescTitle={(active as any)?.id === 'anh-huong-den-am-thuc-binh-dien' ? 'Giới thiệu ẩm thực Bình Điền' : undefined}
        image={active?.anh?.[0]}
        images={active?.anh || []}
        videos={active?.videos || []}
        chips={active ? [active.tenQuan, active.mucGia] : []}
        address={active?.diaChi}
        mapUrls={((active as any)?.mapUrls as string[]) || ((active as any)?.mapUrl ? [(active as any).mapUrl] : [])}
        mapEntries={activeMapEntries}
      />
    </section>
  );
}
