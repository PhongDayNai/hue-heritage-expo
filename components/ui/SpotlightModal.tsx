'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';

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
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {image ? (
              <Image src={image} alt={title} fill className="object-cover" />
            ) : (
              <div className="h-full w-full bg-neutral-900" />
            )}
            <div className="absolute inset-0 bg-black/55 backdrop-blur-[3px]" />
          </motion.div>

          <motion.div
            className="absolute inset-0 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.05 }}
          >
            <div className="min-h-screen">
              <div className="relative flex min-h-[72vh] items-end border-b border-white/20 px-4 pb-8 pt-20 sm:px-8 md:px-12">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 rounded-full border border-white/30 bg-black/40 p-2 text-white hover:bg-black/55"
                  aria-label="Đóng"
                >
                  <X size={18} />
                </button>

                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="max-w-4xl"
                >
                  <p className="mb-3 inline-block rounded-full border border-hueGold/40 bg-hueGold/10 px-3 py-1 text-xs font-medium tracking-wide text-hueGold">
                    NỘI DUNG NỔI BẬT
                  </p>
                  <h3 className="font-[var(--font-heading)] text-3xl text-white drop-shadow-lg md:text-5xl">
                    {title}
                  </h3>
                  {shortDesc && <p className="mt-4 max-w-3xl text-sm leading-7 text-white/85 md:text-base">{shortDesc}</p>}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
                className="mx-auto -mt-10 w-[calc(100%-2rem)] max-w-4xl rounded-2xl border border-white/20 bg-white/90 p-6 shadow-2xl backdrop-blur md:p-8"
              >
                {fullDesc && <p className="text-[15px] leading-8 text-neutral-800 md:text-base">{fullDesc}</p>}

                {chips.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-hueGold/40 bg-hueGold/10 px-3 py-1 text-xs text-hueRed"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                )}

                {address && (
                  <p className="mt-5 text-sm text-neutral-700">
                    <span className="font-semibold text-neutral-900">Địa chỉ:</span> {address}
                  </p>
                )}

                <div className="mt-8 border-t border-neutral-200 pt-4 text-sm text-neutral-600">
                  Cuộn để xem toàn bộ thông tin chi tiết.
                </div>
              </motion.div>

              <div className="h-10" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
