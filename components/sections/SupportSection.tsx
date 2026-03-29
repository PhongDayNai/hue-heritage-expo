import support from '@/data/support.json';

export default function SupportSection() {
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
                <div key={`${item.label}-${item.phone}`} className="rounded-xl bg-white/5 px-4 py-3">
                  <p className="text-sm font-semibold text-white">{item.label}</p>
                  <p className="mt-0.5 text-xs text-white/70">{item.role}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                    <a href={`tel:${item.phone}`} className="font-semibold text-hueGold hover:underline">
                      {item.phone}
                    </a>
                    <span className="text-white/40">|</span>
                    <a href={item.facebook} target="_blank" rel="noreferrer" className="text-white/85 hover:underline">
                      Facebook
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form className="rounded-2xl border border-hueGold/20 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-hueGold">Góp ý nhanh</h3>
            <div className="mt-4 space-y-3">
              <input className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm outline-none placeholder:text-white/50" placeholder="Họ tên" />
              <input className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm outline-none placeholder:text-white/50" placeholder="Số điện thoại" />
              <textarea className="h-28 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm outline-none placeholder:text-white/50" placeholder="Nội dung góp ý" />
              <button type="button" className="rounded-xl bg-hueGold px-5 py-2.5 text-sm font-semibold text-hueInk transition hover:brightness-105">
                Gửi góp ý
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
