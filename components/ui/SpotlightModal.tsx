'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp, MapPin, Sparkles, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  shortDesc?: string;
  fullDesc?: string;
  image?: string;
  chips?: string[];
  address?: string;
};

export default function SpotlightModal({
  open,
  onClose,
  title,
  shortDesc,
  fullDesc,
  image,
  chips = [],
  address
}: Props) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (open) setExpanded(false);
  }, [open, title]);

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
    const scrollY = window.scrollY;

    const prevBodyOverflow = body.style.overflow;
    const prevBodyPosition = body.style.position;
    const prevBodyTop = body.style.top;
    const prevBodyWidth = body.style.width;
    const prevBodyTouchAction = body.style.touchAction;
    const prevHtmlOverflow = documentElement.style.overflow;

    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    body.style.touchAction = 'none';
    documentElement.style.overflow = 'hidden';

    return () => {
      body.style.overflow = prevBodyOverflow;
      body.style.position = prevBodyPosition;
      body.style.top = prevBodyTop;
      body.style.width = prevBodyWidth;
      body.style.touchAction = prevBodyTouchAction;
      documentElement.style.overflow = prevHtmlOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0">
            {image ? (
              <Image src={image} alt={title} fill className="object-cover" />
            ) : (
              <div className="h-full w-full bg-neutral-900" />
            )}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(196,155,61,0.26),transparent_38%),linear-gradient(130deg,rgba(16,8,7,0.9),rgba(14,10,9,0.76))]" />
            <div className="absolute inset-0 backdrop-blur-[2px]" />
          </div>

          <div className="absolute inset-0 overflow-y-auto px-3 py-4 sm:px-6 sm:py-8">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="mx-auto w-full max-w-6xl"
              role="dialog"
              aria-modal="true"
              aria-label={title}
            >
              <div className="relative overflow-hidden rounded-[28px] border border-hueGold/30 bg-[#0f0b0a]/70 shadow-[0_28px_80px_rgba(0,0,0,0.5)] backdrop-blur-md">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 z-20 rounded-full border border-white/35 bg-black/45 p-2 text-white transition hover:bg-black/65"
                  aria-label="Đóng"
                >
                  <X size={18} />
                </button>

                <div className="grid min-h-[70vh] lg:grid-cols-[1.05fr_1fr]">
                  <div className="relative min-h-[320px] border-b border-white/15 lg:min-h-full lg:border-b-0 lg:border-r lg:border-white/15">
                    {image ? (
                      <Image src={image} alt={title} fill className="object-cover" />
                    ) : (
                      <div className="h-full w-full bg-neutral-900" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0908]/85 via-[#120d0b]/45 to-transparent" />

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
                    </div>
                  </div>

                  <div className="flex flex-col bg-gradient-to-b from-white to-[#f8f4ed]">
                    <div className="border-b border-neutral-200/80 px-5 py-4 sm:px-7">
                      <p className="text-xs font-semibold tracking-[0.12em] text-hueRed/90">THÔNG TIN CHI TIẾT</p>
                    </div>

                    <div className="flex-1 px-5 py-5 sm:px-7 sm:py-6">
                      <div className={`relative ${expanded ? '' : 'max-h-[250px] overflow-hidden sm:max-h-[290px]'}`}>
                        {fullDesc ? (
                          <p className="text-[15px] leading-8 text-neutral-800">{fullDesc}</p>
                        ) : (
                          <p className="text-[15px] leading-8 text-neutral-600">
                            Nội dung chi tiết đang được cập nhật.
                          </p>
                        )}

                        {!expanded && fullDesc && fullDesc.length > 220 && (
                          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#f8f4ed] to-transparent" />
                        )}
                      </div>

                      {fullDesc && fullDesc.length > 220 && (
                        <button
                          type="button"
                          onClick={() => setExpanded((v) => !v)}
                          className="mt-3 inline-flex items-center gap-2 rounded-full border border-hueGold/60 bg-white px-4 py-2 text-sm font-semibold text-hueRed transition hover:bg-hueGold/10"
                        >
                          {expanded ? (
                            <>
                              Thu gọn <ChevronUp size={16} />
                            </>
                          ) : (
                            <>
                              Xem đầy đủ <ChevronDown size={16} />
                            </>
                          )}
                        </button>
                      )}

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

                      {address && (
                        <p className="mt-5 inline-flex items-start gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 shadow-sm">
                          <MapPin size={16} className="mt-0.5 text-hueRed" />
                          <span>
                            <span className="font-semibold text-neutral-900">Địa chỉ:</span> {address}
                          </span>
                        </p>
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
