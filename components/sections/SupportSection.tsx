'use client';

import { FormEvent, MouseEvent, useRef, useState } from 'react';
import support from '@/data/support.json';

type ToastState = { type: 'success' | 'error' | 'info'; message: string } | null;

const RECEIVER_EMAIL = 'dhphong266@gmail.com';

export default function SupportSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [toast, setToast] = useState<ToastState>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [debugLogs, setDebugLogs] = useState<string[]>([]);

  const pushLog = (msg: string) => {
    const line = `[${new Date().toLocaleTimeString('vi-VN')}] ${msg}`;
    console.log('[SupportForm]', line);
    setDebugLogs((prev) => [line, ...prev].slice(0, 10));
  };

  const showToast = (type: 'success' | 'error' | 'info', message: string, timeout = 3200) => {
    setToast({ type, message });
    pushLog(`Toast(${type}): ${message}`);
    setTimeout(() => setToast(null), timeout);
  };

  const handleButtonClick = (_e: MouseEvent<HTMLButtonElement>) => {
    pushLog('Click nút "Gửi góp ý"');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    pushLog('onSubmit đã chạy');

    if (isSubmitting) {
      pushLog('Bị chặn vì isSubmitting=true');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const fullName = String(formData.get('Ho ten') || '').trim();
    const phone = String(formData.get('So dien thoai') || '').trim();
    const message = String(formData.get('Noi dung gop y') || '').trim();

    pushLog(`Payload: hoTen="${fullName}", sdt="${phone}", noiDungLength=${message.length}`);

    setIsSubmitting(true);
    showToast('info', 'Đang mở ứng dụng email để gửi góp ý...');

    const subject = '[Hue Heritage] Góp ý mới từ trang Hỗ trợ';
    const body = `Họ tên: ${fullName}\nSố điện thoại: ${phone || '(không có)'}\n\nNội dung góp ý:\n${message}`;
    const mailtoUrl = `mailto:${RECEIVER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    pushLog(`Điều hướng mailto: ${mailtoUrl.slice(0, 120)}...`);
    window.location.href = mailtoUrl;

    formRef.current?.reset();
    setIsSubmitting(false);
    showToast('success', 'Đã mở ứng dụng email. Anh kiểm tra và bấm gửi trong app mail nhé ✅', 4500);
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

          <form ref={formRef} className="rounded-2xl border border-hueGold/20 bg-white/5 p-5" noValidate onSubmit={handleSubmit}>
            <h3 className="text-lg font-semibold text-hueGold">Góp ý nhanh</h3>
            <p className="mt-1 text-xs text-white/70">Góp ý sẽ mở ứng dụng email để gửi tới: {RECEIVER_EMAIL}</p>

            <div className="mt-4 space-y-3">
              <input
                name="Ho ten"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm outline-none placeholder:text-white/50"
                placeholder="Họ tên"
              />
              <input
                name="So dien thoai"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm outline-none placeholder:text-white/50"
                placeholder="Số điện thoại"
              />
              <textarea
                name="Noi dung gop y"
                className="h-28 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm outline-none placeholder:text-white/50"
                placeholder="Nội dung góp ý"
              />

              {toast && (
                <div
                  className={`rounded-lg px-3 py-2 text-sm ${
                    toast.type === 'success'
                      ? 'bg-emerald-500/20 text-emerald-200'
                      : toast.type === 'error'
                        ? 'bg-rose-500/20 text-rose-200'
                        : 'bg-sky-500/20 text-sky-200'
                  }`}
                >
                  {toast.message}
                </div>
              )}

              <button
                type="submit"
                onClick={handleButtonClick}
                disabled={isSubmitting}
                className="rounded-xl bg-hueGold px-5 py-2.5 text-sm font-semibold text-hueInk transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Đang gửi...' : 'Gửi góp ý'}
              </button>

              <div className="rounded-lg border border-white/20 bg-black/20 p-3 text-xs text-white/80">
                <p className="font-semibold text-hueGold">Client debug log</p>
                {debugLogs.length === 0 ? (
                  <p className="mt-1 text-white/60">Chưa có log. Anh bấm thử nút để kiểm tra event.</p>
                ) : (
                  <ul className="mt-2 space-y-1">
                    {debugLogs.map((log) => (
                      <li key={log} className="break-all">
                        • {log}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
