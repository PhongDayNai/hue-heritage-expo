'use client';

import { FormEvent, useRef, useState } from 'react';
import support from '@/data/support.json';

type ToastState = { type: 'success' | 'error'; message: string } | null;

export default function SupportSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    setIsSubmitting(true);
    setToast(null);

    try {
      const res = await fetch('https://formsubmit.co/ajax/dhphong266@gmail.com', {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: formData
      });

      const payload = await res.json().catch(() => null);
      const ok = res.ok && (payload?.success === true || payload?.success === 'true');

      if (!ok) {
        const apiMsg = typeof payload?.message === 'string' ? payload.message : '';
        throw new Error(apiMsg || 'Gửi góp ý thất bại');
      }

      setToast({ type: 'success', message: 'Đã gửi góp ý thành công ✅' });
      formRef.current?.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Gửi chưa thành công, anh thử lại giúp em nhé.';
      setToast({ type: 'error', message });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setToast(null), 3200);
    }
  };

  return (
    <section id="ho-tro" className="bg-hueInk py-12 text-white md:py-16">
      <div className="section-wrap">
        <h2 className="text-2xl font-semibold text-hueGold md:text-3xl">Hỗ trợ - Góp ý</h2>
        <p className="mt-2 max-w-3xl text-sm text-white/75 md:text-base">
          Kênh hỗ trợ nhanh và tiếp nhận góp ý để nâng cao chất lượng thông tin du lịch địa phương.
        </p>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-hueGold/20 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-hueGold">Liên hệ hỗ trợ</h3>
            <div className="mt-4 space-y-3">
              {support.hotlines.map((item) => (
                <div
                  key={`${item.label}-${item.phone}`}
                  className="rounded-2xl border border-hueGold/30 bg-gradient-to-br from-white/10 to-white/5 px-5 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-base font-semibold text-white">{item.label}</p>
                      <p className="mt-1 text-xs text-white/70">{item.role}</p>
                    </div>
                    <span className="rounded-full border border-hueGold/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-hueGold">
                      Ưu tiên
                    </span>
                  </div>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <a
                      href={`tel:${item.phone}`}
                      className="inline-flex items-center justify-center rounded-lg bg-hueGold px-3 py-2 text-sm font-semibold text-hueInk hover:brightness-105"
                    >
                      📞 {item.phone}
                    </a>
                    <a
                      href={item.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-lg border border-white/25 px-3 py-2 text-sm font-medium text-white hover:bg-white/10"
                    >
                      Facebook trật tự xã
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form ref={formRef} className="rounded-2xl border border-hueGold/20 bg-white/5 p-5" method="POST" onSubmit={handleSubmit}>
            <h3 className="text-lg font-semibold text-hueGold">Góp ý nhanh</h3>
            <p className="mt-1 text-xs text-white/70">Biểu mẫu gửi trực tiếp tới: dhphong266@gmail.com (miễn phí)</p>

            <input type="hidden" name="_subject" value="[Hue Heritage] Góp ý mới từ trang Hỗ trợ" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="mt-4 space-y-3">
              <input
                name="Họ tên"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm outline-none placeholder:text-white/50"
                placeholder="Họ tên"
                required
              />
              <input
                name="Số điện thoại"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm outline-none placeholder:text-white/50"
                placeholder="Số điện thoại"
              />
              <textarea
                name="Nội dung góp ý"
                className="h-28 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm outline-none placeholder:text-white/50"
                placeholder="Nội dung góp ý"
                required
              />

              {toast && (
                <div
                  className={`rounded-lg px-3 py-2 text-sm ${
                    toast.type === 'success' ? 'bg-emerald-500/20 text-emerald-200' : 'bg-rose-500/20 text-rose-200'
                  }`}
                >
                  {toast.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl bg-hueGold px-5 py-2.5 text-sm font-semibold text-hueInk transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Đang gửi...' : 'Gửi góp ý'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
