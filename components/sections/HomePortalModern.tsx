'use client';

import culture from '@/data/culture.json';
import food from '@/data/food.json';
import news from '@/data/news.json';
import scenic from '@/data/scenic.json';
import library from '@/data/library.json';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import SpotlightModal from '../ui/SpotlightModal';

const quickLinks = [
  { icon: '🎟️', label: 'Vé điện tử', href: '/ho-tro' },
  { icon: '🗺️', label: 'Bản đồ', href: '/ban-do' },
  { icon: '🍜', label: 'Ẩm thực', href: '/am-thuc' },
  { icon: '🏨', label: 'Lưu trú', href: '/ho-tro' },
  { icon: '📞', label: 'Liên hệ', href: '/ho-tro' },
  { icon: '📰', label: 'Tin tức', href: '/tin-tuc' }
];

const infoCards = [
  { icon: '🎟️', title: 'Vé tham quan', text: 'Tổng hợp hình thức mua vé thuận tiện cho từng nhóm du khách.' },
  { icon: '🚌', title: 'Di chuyển', text: 'Gợi ý phương tiện phù hợp theo từng tuyến tham quan trong ngày.' },
  { icon: '🗺️', title: 'Điểm đến', text: 'Sắp xếp lộ trình ghé thăm theo khu vực trung tâm và ngoại thành.' },
  { icon: '💰', title: 'Chi phí', text: 'Mức chi phí tham khảo cho vé, ăn uống và dịch vụ đi kèm.' }
];

type Scenic = (typeof scenic)[number];

const ALBUM_BATCH = 9; // ~3 hàng ở layout 3 cột

export default function HomePortalModern() {
  const [activeSpot, setActiveSpot] = useState<Scenic | null>(null);
  const [albumVisibleCount, setAlbumVisibleCount] = useState(ALBUM_BATCH);
  const [expandedAlbums, setExpandedAlbums] = useState<Record<string, boolean>>({});

  const hero = scenic[1] || scenic[0];
  const upcoming = news.slice(0, 4);
  const sideScenic = scenic.slice(0, 4);
  const hasVideo = Array.isArray(library.videos) && library.videos.length > 0;
  const hasInfographic = Array.isArray(library.infographics) && library.infographics.length > 0;

  const albums = scenic;
  const visibleAlbums = albums.slice(0, albumVisibleCount);
  const hasMoreAlbums = albumVisibleCount < albums.length;

  const toggleAlbum = (id: string) => {
    setExpandedAlbums((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      
      <div className="border-b border-hueGold/30 bg-white/90">
        <div className="section-wrap py-2 text-xs text-neutral-600">
          <span className="text-hueRed">Cổng thông tin Du lịch Huế</span>
          <span className="mx-2 text-hueGold">›</span>
          <span>Hành trình khám phá</span>
        </div>
      </div>

      <section className="relative overflow-hidden border-b border-hueGold/20 bg-hueInk">
        <div className="absolute inset-0">
          <Image src={hero.anh[0]} alt={hero.tenDiaDiem} fill priority className="object-cover opacity-35" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_45%,rgba(184,134,11,.30),transparent_45%),linear-gradient(120deg,rgba(22,10,7,.92),rgba(47,20,11,.82))]" />

        <div className="section-wrap relative z-10 grid gap-6 py-14 lg:grid-cols-[1fr_320px] lg:items-center">
          <div>
            <span className="inline-flex rounded bg-hueGold px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-hueInk">
              Di sản văn hoá thế giới
            </span>
            <h1 className="mt-4 font-[var(--font-heading)] text-4xl leading-tight text-[#f8eecf] md:text-5xl">
              Khám phá Cố đô Huế
              <span className="block text-hueGold">Không gian du lịch sống động, hiện đại và giàu bản sắc</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#e6d3a3] md:text-base">
              Lấy cảm hứng từ bố cục cổng thông tin truyền thống, giao diện mới ưu tiên trình bày rõ ràng, dễ đọc và
              có điểm nhấn thị giác để anh sử dụng khi demo sản phẩm.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/danh-lam" className="rounded-md bg-hueGold px-5 py-2.5 text-sm font-semibold text-hueInk hover:brightness-105">
                🗺️ Khám phá ngay
              </Link>
              <Link href="/tin-tuc" className="rounded-md border border-hueGold px-5 py-2.5 text-sm font-semibold text-hueGold hover:bg-white/10">
                📅 Lịch sự kiện
              </Link>
            </div>
          </div>

          <aside className="rounded-xl border border-hueGold/40 bg-white/10 p-5 backdrop-blur">
            <h3 className="border-b border-hueGold/30 pb-2 font-[var(--font-heading)] text-base text-hueGold">⚡ Sự kiện nổi bật</h3>
            <div className="mt-2 space-y-3">
              {upcoming.map((item, idx) => (
                <article key={item.id} className="border-b border-hueGold/20 pb-2 last:border-b-0 last:pb-0">
                  <p className="text-[11px] font-semibold tracking-wide text-hueGold">{item.thoiGian}</p>
                  <p className="text-sm text-[#f3dfb2]">{item.tieuDe}</p>
                  <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] ${idx === 0 ? 'bg-white/20 text-white/80' : 'bg-hueGold/20 text-hueGold'}`}>
                    {idx === 0 ? 'Đã diễn ra' : 'Sắp diễn ra'}
                  </span>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section-wrap pt-8 md:pt-10">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_300px]">
          <main>
            <div className="mb-4 flex items-center gap-3">
              <h2 className="font-[var(--font-heading)] text-2xl text-hueRed">📅 Sự kiện sắp tới</h2>
              <span className="h-[2px] flex-1 bg-gradient-to-r from-hueGold to-transparent" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {upcoming.map((item) => (
                <article key={item.id} className="overflow-hidden rounded-xl border border-[#dcc09a] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
                  <div className="relative h-40">
                    <Image src={item.anh} alt={item.tieuDe} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="p-4">
                    <p className="text-[11px] font-semibold tracking-wide text-hueGold">{item.thoiGian}</p>
                    <h3 className="mt-1 text-sm font-semibold leading-6 text-hueInk">{item.tieuDe}</h3>
                    <p className="mt-1 text-xs text-neutral-600">📍 {item.diaDiem}</p>
                  </div>
                </article>
              ))}
            </div>

            {/*
              Tạm ẩn section "Thông tin cần biết" theo yêu cầu.
              Khi cần bật lại, bỏ comment toàn bộ khối bên dưới.

              <div className="mb-4 mt-9 flex items-center gap-3">
                <h2 className="font-[var(--font-heading)] text-2xl text-hueRed">🧭 Thông tin cần biết</h2>
                <span className="h-[2px] flex-1 bg-gradient-to-r from-hueGold to-transparent" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {infoCards.map((card) => (
                  <article key={card.title} className="rounded-xl border border-[#dcc09a] border-t-[3px] border-t-hueGold bg-white p-4 text-center shadow-sm">
                    <div className="text-3xl">{card.icon}</div>
                    <h3 className="mt-2 text-sm font-semibold text-hueRed">{card.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-neutral-600">{card.text}</p>
                  </article>
                ))}
              </div>
            */}

            <div className="mb-4 mt-9 flex items-center gap-3">
              <h2 className="font-[var(--font-heading)] text-2xl text-hueRed">🖼️ Thư viện</h2>
              <span className="h-[2px] flex-1 bg-gradient-to-r from-hueGold to-transparent" />
            </div>
            <div className="mb-4 flex border-b-2 border-[#dcc09a]">
              <button className="-mb-[2px] border-b-2 border-hueRed px-4 py-2 text-sm font-medium text-hueRed">Hình ảnh</button>
              {hasVideo && <button className="px-4 py-2 text-sm font-medium text-neutral-500">Video</button>}
              {hasInfographic && <button className="px-4 py-2 text-sm font-medium text-neutral-500">Infographic</button>}
            </div>
            <div className="space-y-3">
              {visibleAlbums.map((item) => {
                const albumThumb = item.anh?.[0];
                const isExpanded = !!expandedAlbums[item.id];
                const albumImages = item.anh || [];

                return (
                  <div key={item.id} className="overflow-hidden rounded-xl border border-[#dcc09a] bg-white shadow-sm">
                    <button
                      type="button"
                      onClick={() => toggleAlbum(item.id)}
                      className="flex w-full items-center gap-3 p-3 text-left transition hover:bg-[#fbf6ea]"
                    >
                      <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-md bg-neutral-100">
                        {albumThumb ? (
                          <Image src={albumThumb} alt={item.tenDiaDiem} fill className="object-cover" />
                        ) : null}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-hueInk">{item.tenDiaDiem}</p>
                        <p className="text-xs text-neutral-500">{albumImages.length} ảnh</p>
                      </div>
                      <span className="text-xs font-semibold text-hueRed">{isExpanded ? 'Thu gọn' : 'Mở album'}</span>
                    </button>

                    {isExpanded && albumImages.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 border-t border-[#dcc09a] p-3 sm:grid-cols-3">
                        {albumImages.map((src, idx) => (
                          <figure key={`${item.id}-${idx}`} className="group relative aspect-square overflow-hidden rounded-lg">
                            <Image src={src} alt={`${item.tenDiaDiem} ${idx + 1}`} fill className="object-cover transition duration-500 group-hover:scale-105" />
                          </figure>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {hasMoreAlbums && (
              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={() => setAlbumVisibleCount((prev) => prev + ALBUM_BATCH)}
                  className="rounded-md border border-hueGold/50 bg-white px-4 py-2 text-sm font-semibold text-hueRed transition hover:bg-hueGold/10"
                >
                  Xem thêm album
                </button>
              </div>
            )}
          </main>

          <aside>
            <div className="mb-5 overflow-hidden rounded-xl border border-[#dcc09a] bg-white shadow-sm">
              <div className="bg-[linear-gradient(to_right,#7a1f1f,#5f1515)] px-4 py-2.5 font-[var(--font-heading)] text-sm text-[#f8ebc8]">
                📍 Điểm tham quan nổi bật
              </div>
              <div className="p-4">
                {sideScenic.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setActiveSpot(item)}
                    className="flex w-full gap-3 border-b border-dashed border-[#dcc09a] py-2.5 text-left transition hover:bg-[#fbf6ea] last:border-b-0"
                  >
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
                      <Image src={item.anh[0]} alt={item.tenDiaDiem} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-hueInk">{item.tenDiaDiem}</h4>
                      <p className="line-clamp-1 text-xs text-neutral-500">{item.gioiThieuNgan}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/*
              Tạm ẩn section "Liên kết nhanh" theo yêu cầu.
              Khi cần bật lại, bỏ comment toàn bộ khối bên dưới.

              <div className="mb-5 overflow-hidden rounded-xl border border-[#dcc09a] bg-white shadow-sm">
                <div className="bg-[linear-gradient(to_right,#7a1f1f,#5f1515)] px-4 py-2.5 font-[var(--font-heading)] text-sm text-[#f8ebc8]">
                  ⚡ Liên kết nhanh
                </div>
                <div className="grid grid-cols-2 gap-2 p-3">
                  {quickLinks.map((item) => (
                    <Link key={item.label} href={item.href} className="rounded border border-[#dcc09a] bg-[#f7ebcd] px-2 py-2 text-center text-xs font-medium text-hueInk transition hover:bg-hueGold">
                      <span className="mb-1 block text-base">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            */}

            <div className="overflow-hidden rounded-xl border border-[#dcc09a] bg-white shadow-sm">
              <div className="bg-[linear-gradient(to_right,#7a1f1f,#5f1515)] px-4 py-2.5 font-[var(--font-heading)] text-sm text-[#f8ebc8]">
                📊 Thống kê nhanh
              </div>
              <div className="p-4 text-sm">
                <div className="flex justify-between border-b border-dashed border-[#dcc09a] py-2"><span className="text-neutral-500">Danh lam</span><strong className="text-hueRed">{scenic.length}</strong></div>
                <div className="flex justify-between border-b border-dashed border-[#dcc09a] py-2"><span className="text-neutral-500">Ẩm thực</span><strong className="text-hueRed">{food.length}</strong></div>
                <div className="flex justify-between border-b border-dashed border-[#dcc09a] py-2"><span className="text-neutral-500">Văn hoá</span><strong className="text-hueRed">{culture.length}</strong></div>
                <div className="flex justify-between py-2"><span className="text-neutral-500">Tin sự kiện</span><strong className="text-hueRed">{news.length}</strong></div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <SpotlightModal
        open={!!activeSpot}
        onClose={() => setActiveSpot(null)}
        title={activeSpot?.tenDiaDiem || ''}
        shortDesc={activeSpot?.gioiThieuNgan}
        fullDesc={activeSpot?.gioiThieuDayDu}
        image={activeSpot?.anh?.[0]}
        chips={activeSpot?.dichVu || []}
        address={activeSpot?.diaChi}
      />
    </>
  );
}
