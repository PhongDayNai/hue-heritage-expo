'use client';

import { useState } from 'react';
import { useFeatureFlags } from '@/lib/useFeatureFlags';

export default function AdminMiniPanel() {
  const { flags, loading, setFlags } = useFeatureFlags();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const toggleServices = async () => {
    const next = !flags.showServices;
    setSaving(true);
    setMessage('');

    try {
      const res = await fetch('/api/admin/feature-flags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ showServices: next })
      });

      if (!res.ok) throw new Error('update_failed');

      const updated = await res.json();
      setFlags({ showServices: !!updated.showServices });
      setMessage(`Đã ${updated.showServices ? 'hiện' : 'ẩn'} mục Dịch vụ.`);

      setTimeout(() => {
        window.location.reload();
      }, 350);
    } catch {
      setMessage('Cập nhật thất bại, vui lòng thử lại.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="section-wrap py-6 md:py-8">
      <div className="rounded-2xl border border-hueGold/30 bg-white p-5">
        <h2 className="text-lg font-semibold text-hueRed">Admin mini</h2>
        <p className="mt-1 text-sm text-neutral-600">Bật/tắt nhanh một số mục hiển thị trên website.</p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-700">
            Dịch vụ: {loading ? 'Đang tải...' : flags.showServices ? 'Đang hiện' : 'Đang ẩn'}
          </span>

          <button
            type="button"
            onClick={toggleServices}
            disabled={loading || saving}
            className="rounded-lg border border-hueGold/50 bg-hueGold/10 px-4 py-2 text-sm font-semibold text-hueRed disabled:opacity-60"
          >
            {saving ? 'Đang cập nhật...' : flags.showServices ? 'Ẩn Dịch vụ' : 'Hiện Dịch vụ'}
          </button>
        </div>

        {message && <p className="mt-3 text-sm text-neutral-600">{message}</p>}
      </div>
    </section>
  );
}
