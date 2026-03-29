'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Facebook, MapPin, Phone, Sparkles, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

type MapEntry = {
  label: string;
  url: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  shortDesc?: string;
  fullDesc?: string;
  fullDescTitle?: string;
  image?: string;
  images?: string[];
  videos?: string[];
  chips?: string[];
  address?: string;
  mapUrls?: string[];
  mapEntries?: MapEntry[];
  showMapEntriesList?: boolean;
  enableContactEnhancements?: boolean;
};

type MediaItem = {
  type: 'image' | 'video';
  src: string;
};

export default function SpotlightModal({
  open,
  onClose,
  title,
  shortDesc,
  fullDesc,
  fullDescTitle,
  image,
  images = [],
  videos = [],
  chips = [],
  address,
  mapUrls = [],
  mapEntries = [],
  showMapEntriesList = true,
  enableContactEnhancements = false
}: Props) {
  const [mainIndex, setMainIndex] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);
  const scrollLockYRef = useRef(0);

  const galleryImages = useMemo(() => {
    if (images.length > 0) return images;
    return image ? [image] : [];
  }, [images, image]);

  const mediaItems = useMemo<MediaItem[]>(() => {
    const media: MediaItem[] = galleryImages.map((src) => ({ type: 'image', src }));
    media.push(...videos.map((src) => ({ type: 'video' as const, src })));
    return media;
  }, [galleryImages, videos]);

  const hasMedia = mediaItems.length > 0;
  const currentMedia = hasMedia ? mediaItems[Math.min(mainIndex, mediaItems.length - 1)] : null;
  const isVideoActive = currentMedia?.type === 'video';
  const safeBgImage = galleryImages[bgIndex] || galleryImages[0] || '';

  const normalizedMapEntries = useMemo(() => {
    if (!showMapEntriesList) return [] as MapEntry[];

    const out: MapEntry[] = [];

    for (const e of mapEntries) {
      if (!e || typeof e.label !== 'string' || typeof e.url !== 'string') continue;
      const label = e.label.trim();
      const url = e.url.trim();
      if (!label || !url) continue;
      if (!out.some((x) => x.url === url)) out.push({ label, url });
    }

    for (const u of mapUrls) {
      if (typeof u !== 'string' || !u.trim()) continue;
      const url = u.trim();
      if (!out.some((x) => x.url === url)) {
        out.push({ label: `Google Maps ${out.length + 1}`, url });
      }
    }

    return out;
  }, [mapEntries, mapUrls, showMapEntriesList]);
  const detailLines = useMemo(() => {
    const normalized = (fullDesc || '')
      .replace(/\s+(?=\d+\.\s+)/g, '\n')
      .replace(/\s+(?=[IVXLCDM]{1,6}\.\s+)/gi, '\n');

    const lines = normalized.split('\n');

    if (fullDescTitle) {
      const firstIdx = lines.findIndex((line) => line.trim().length > 0);
      if (firstIdx >= 0 && lines[firstIdx].trim().toLowerCase() === fullDescTitle.trim().toLowerCase()) {
        lines.splice(firstIdx, 1);
      }
    }

    return lines;
  }, [fullDesc, fullDescTitle]);

  useEffect(() => {
    if (open) {
      setMainIndex(0);
      setBgIndex(0);
    }
  }, [open, title]);


  useEffect(() => {
    if (!open || isVideoActive || galleryImages.length <= 1) return;

    let timer: number | null = null;

    const schedule = () => {
      const delay = 9000 + Math.floor(Math.random() * 5000); // 9s -> 14s
      timer = window.setTimeout(() => {
        setBgIndex((prev) => {
          if (galleryImages.length <= 1) return 0;
          let next = prev;
          while (next === prev) {
            next = Math.floor(Math.random() * galleryImages.length);
          }
          return next;
        });
        schedule();
      }, delay);
    };

    schedule();
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [open, isVideoActive, galleryImages.length]);

  useEffect(() => {
    if (mainIndex >= mediaItems.length) setMainIndex(0);
  }, [mainIndex, mediaItems.length]);

  useEffect(() => {
    if (bgIndex >= galleryImages.length) setBgIndex(0);
  }, [bgIndex, galleryImages.length]);

  useEffect(() => {
    if (!open) return;

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;

    const { body, documentElement } = document;
    const lockY = window.scrollY;
    scrollLockYRef.current = lockY;

    const prevBody = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      touchAction: body.style.touchAction
    };
    const prevHtmlOverflow = documentElement.style.overflow;

    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${lockY}px`;
    body.style.width = '100%';
    body.style.touchAction = 'none';
    documentElement.style.overflow = 'hidden';

    return () => {
      body.style.overflow = prevBody.overflow;
      body.style.position = prevBody.position;
      body.style.top = prevBody.top;
      body.style.width = prevBody.width;
      body.style.touchAction = prevBody.touchAction;
      documentElement.style.overflow = prevHtmlOverflow;
      window.scrollTo(0, scrollLockYRef.current);
    };
  }, [open]);

  const nextMain = () => {
    if (mediaItems.length === 0) return;
    setMainIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const prevMain = () => {
    if (mediaItems.length === 0) return;
    setMainIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="pointer-events-none absolute inset-0">
            {!isVideoActive && safeBgImage ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={safeBgImage}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.4, ease: 'easeInOut' }}
                >
                  <Image src={safeBgImage} alt={title} fill className="object-cover" priority />
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="h-full w-full bg-neutral-900" />
            )}

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(196,155,61,0.16),transparent_38%),linear-gradient(130deg,rgba(16,8,7,0.9),rgba(14,10,9,0.8))]" />
          </div>

          <div className="absolute inset-0 overflow-hidden px-3 py-4 sm:px-6 sm:py-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="mx-auto flex h-full w-full max-w-6xl items-center"
              role="dialog"
              aria-modal="true"
              aria-label={title}
            >
              <div className="relative h-[88vh] w-full overflow-hidden rounded-[28px] border border-hueGold/30 bg-[#0f0b0a]/72 shadow-[0_18px_42px_rgba(0,0,0,0.42)]">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 z-20 rounded-full border border-white/35 bg-black/45 p-2 text-white transition hover:bg-black/65"
                  aria-label="Đóng"
                >
                  <X size={18} />
                </button>

                <div className="grid h-full min-h-0 lg:grid-cols-[1.05fr_1fr]">
                  <div className="relative min-h-[320px] border-b border-white/15 lg:min-h-full lg:border-b-0 lg:border-r lg:border-white/15">
                    <AnimatePresence mode="wait">
                      {currentMedia ? (
                        <motion.div
                          key={`${currentMedia.type}-${currentMedia.src}`}
                          className="absolute inset-0 will-change-[opacity]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2, ease: 'linear' }}
                        >
                          {currentMedia.type === 'image' ? (
                            <Image src={currentMedia.src} alt={title} fill className="object-cover" />
                          ) : (
                            <video
                              src={currentMedia.src}
                              autoPlay
                              muted
                              loop
                              playsInline
                              preload="metadata"
                              controls={false}
                              className="h-full w-full bg-black object-contain"
                            />
                          )}
                        </motion.div>
                      ) : (
                        <div className="h-full w-full bg-neutral-900" />
                      )}
                    </AnimatePresence>

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0908]/85 via-[#120d0b]/45 to-transparent" />

                    {mediaItems.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={prevMain}
                          className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/40 bg-black/40 p-2.5 text-white transition hover:bg-black/70"
                          aria-label="Media trước"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={nextMain}
                          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/40 bg-black/40 p-2.5 text-white transition hover:bg-black/70"
                          aria-label="Media tiếp theo"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </>
                    )}

                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                      <p className="inline-flex items-center gap-1.5 rounded-full border border-hueGold/45 bg-hueGold/20 px-3 py-1 text-[11px] font-semibold tracking-[0.14em] text-hueGold">
                        <Sparkles size={13} /> DANH LAM THẮNG CẢNH HUẾ
                      </p>

                      <h3 className="mt-3 font-[var(--font-heading)] text-3xl leading-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl">
                        {title}
                      </h3>

                      {shortDesc && (
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/90 sm:text-base">{shortDesc}</p>
                      )}

                      {mediaItems.length > 1 && (
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          {mediaItems.map((media, index) => {
                            const active = index === mainIndex;
                            return (
                              <button
                                key={`${media.type}-${media.src}-${index}`}
                                type="button"
                                onClick={() => {
                                  if (mediaItems.length === 0) return;
                                  setMainIndex(index);
                                }}
                                aria-label={`Media ${index + 1}`}
                                className={`h-2.5 w-2.5 rounded-full border transition ${
                                  active
                                    ? 'border-hueGold bg-hueGold shadow-[0_0_10px_rgba(196,155,61,0.9)]'
                                    : 'border-white/60 bg-white/35 hover:bg-white/55'
                                }`}
                              />
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex h-full min-h-0 flex-col bg-[#f8f9f4]">
                    <div className="border-b border-neutral-200/80 px-5 py-4 sm:px-7">
                      <p className="text-xs font-semibold tracking-[0.12em] text-hueRed/90">THÔNG TIN CHI TIẾT</p>
                    </div>

                    <div className="flex min-h-0 flex-1 flex-col px-5 py-5 sm:px-7 sm:py-6">
                      {fullDescTitle && (
                        <h4 className="mb-3 text-lg font-semibold text-hueRed">{fullDescTitle}</h4>
                      )}

                      <div className="relative min-h-0 flex-1 rounded-xl overflow-y-auto pr-1">
                        {fullDesc ? (
                          <div className="space-y-2 text-[15px] leading-8 text-neutral-800">
                            {detailLines.map((rawLine, idx) => {
                              const line = rawLine.trim();
                              if (!line) return <div key={`blank-${idx}`} className="h-2" />;

                              const isRoman = /^[IVXLCDM]{1,8}\.\s+/i.test(line);
                              const isNumeric = /^\d+[\-.)]?\s+/.test(line);

                              const prevHeading = (() => {
                                for (let i = idx - 1; i >= 0; i--) {
                                  const t = (detailLines[i] || '').trim();
                                  if (/^\d+[\-.)]?\s+/.test(t)) return t;
                                }
                                return '';
                              })();
                              const inPriceSection = /bảng giá|giá tham khảo/i.test(prevHeading);

                              if (inPriceSection) {
                                const priceLine = line.match(/^[\-•*+]?\s*([^:]{2,120}):\s*(.+)$/i);
                                if (priceLine && !/https?:\/\//i.test(line) && !/SĐT\s*:/i.test(line)) {
                                  const label = priceLine[1].trim();
                                  const value = priceLine[2].trim();
                                  return (
                                    <div
                                      key={`${idx}-${line.slice(0, 24)}`}
                                      className="grid w-full grid-cols-[1fr_auto] items-start gap-3 rounded-lg border border-neutral-200 bg-white px-3 py-2"
                                    >
                                      <span className="font-medium text-neutral-800">{label}</span>
                                      <span className="text-right text-sm font-semibold text-hueRed">{value}</span>
                                    </div>
                                  );
                                }
                              }

                              if (enableContactEnhancements) {
                                const match = line.match(/^-\s*(.+?):\s*(https?:\/\/\S+)\s*\|\s*SĐT:\s*([0-9\s.+-]+)/i);
                                if (match) {
                                  const pageName = match[1].trim();
                                  const fbUrl = match[2].trim();
                                  const phoneRaw = match[3].trim();
                                  const phoneHref = phoneRaw.replace(/\s+/g, '');

                                  return (
                                    <div
                                      key={`${idx}-${line.slice(0, 24)}`}
                                      className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2"
                                    >
                                      <a
                                        href={fbUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex min-w-0 items-center gap-1.5 font-medium text-[#1877F2] hover:underline"
                                      >
                                        <Facebook size={14} />
                                        <span className="truncate">{pageName}</span>
                                      </a>

                                      <span className="text-neutral-400">|</span>

                                      <div className="inline-flex min-w-0 items-center justify-start gap-1.5 text-neutral-700">
                                        <Phone size={14} />
                                        <span>SĐT:</span>
                                        <a
                                          href={`tel:${phoneHref}`}
                                          className="min-w-0 truncate font-medium text-hueRed hover:underline"
                                        >
                                          {phoneRaw}
                                        </a>
                                      </div>
                                    </div>
                                  );
                                }

                                const contactOnly = line.match(/^-\s*(.+?)\s*\|\s*SĐT:\s*([0-9\s.+-]+)/i);
                                if (contactOnly) {
                                  const contactName = contactOnly[1].trim();
                                  const phoneRaw = contactOnly[2].trim();
                                  const phoneHref = phoneRaw.replace(/\s+/g, '');
                                  return (
                                    <div
                                      key={`${idx}-${line.slice(0, 24)}`}
                                      className="flex w-full items-center justify-between gap-3 rounded-lg border border-neutral-200 bg-white px-3 py-2"
                                    >
                                      <span className="font-medium text-neutral-800">{contactName}</span>
                                      <a
                                        href={`tel:${phoneHref}`}
                                        className="inline-flex items-center gap-1.5 font-medium text-hueRed hover:underline"
                                      >
                                        <Phone size={14} />
                                        {phoneRaw}
                                      </a>
                                    </div>
                                  );
                                }

                                const mapMatch = line.match(/^-\s*(.+?):\s*(https?:\/\/\S+)$/i);
                                if (mapMatch && /maps\.app\.goo\.gl/i.test(mapMatch[2])) {
                                  const placeName = mapMatch[1].trim();
                                  const mapUrl = mapMatch[2].trim();
                                  return (
                                    <a
                                      key={`${idx}-${line.slice(0, 24)}`}
                                      href={mapUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex w-full items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 font-medium text-[#0f766e] hover:underline"
                                    >
                                      <MapPin size={14} />
                                      {placeName}
                                    </a>
                                  );
                                }
                              }

                              return (
                                <p
                                  key={`${idx}-${line.slice(0, 24)}`}
                                  className={isRoman ? 'font-bold text-neutral-900' : isNumeric ? 'font-semibold text-neutral-900' : ''}
                                >
                                  {line}
                                </p>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="text-[15px] leading-8 text-neutral-600">
                            Nội dung chi tiết đang được cập nhật.
                          </p>
                        )}

                      </div>


                      {chips.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                          {chips.map((chip) => (
                            <span
                              key={chip}
                              className="rounded-full border border-hueGold/45 bg-hueGold/10 px-3 py-1 text-xs font-medium text-hueRed"
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                      )}

                      {(address || normalizedMapEntries.length > 0) && (
                        <div className="mt-5 space-y-2">
                          {normalizedMapEntries.length === 0 && address && (
                            <p className="inline-flex items-start gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 shadow-sm">
                              <MapPin size={18} className="mt-0.5 text-hueRed" />
                              <span>
                                <span className="font-semibold text-neutral-900">Địa chỉ:</span> {address}
                              </span>
                            </p>
                          )}

                          {normalizedMapEntries.map((entry, idx) => {
                            const raw = entry.label.trim();
                            let place = raw;
                            let addressPart = '';

                            if (raw.includes(':')) {
                              const [first, ...rest] = raw.split(':');
                              place = first.trim();
                              addressPart = rest.join(':').trim();
                            } else if (raw.includes(',')) {
                              const [first, ...rest] = raw.split(',');
                              place = first.trim();
                              addressPart = rest.join(',').trim();
                            }

                            return (
                              <a
                                key={`${entry.url}-${idx}`}
                                href={entry.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 shadow-sm transition hover:bg-hueGold/10"
                              >
                                <MapPin size={20} className="mt-0.5 text-hueRed" />
                                <span>
                                  <span className="font-semibold text-neutral-900">{place}:</span>
                                  {addressPart ? <span className="text-neutral-700"> {addressPart}</span> : null}
                                </span>
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
