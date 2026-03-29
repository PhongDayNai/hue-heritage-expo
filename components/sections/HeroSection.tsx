import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-hueGold/20 bg-hueInk">
      <div className="absolute inset-0 opacity-25">
        <Image src="/images/featured/hero-bg-20260329.jpg" alt="Huế" fill className="object-cover" priority />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-hueInk/95 via-hueInk/80 to-hueInk/50" />

      <div className="section-wrap relative z-10 py-20 md:py-28">
        <span className="inline-block rounded-full border border-hueGold/40 bg-hueGold/10 px-4 py-1 text-xs font-medium tracking-wider text-hueGold">
          DỰ ÁN KHOA HỌC KỸ THUẬT
        </span>
        <h1 className="mt-5 max-w-4xl font-[var(--font-heading)] text-4xl leading-tight text-white md:text-6xl">
          Danh lam thắng cảnh Huế
          <span className="block text-hueGold">Nền tảng số hóa trải nghiệm văn hoá - du lịch</span>
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-white/80 md:text-base">
          Website giới thiệu hệ thống danh lam, ẩm thực, văn hoá và sự kiện Huế theo hướng ngắn gọn khi lướt,
          đầy đủ khi mở chi tiết, phù hợp trình bày học thuật và triển khai thực tế.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/danh-lam" className="rounded-xl bg-hueGold px-5 py-3 text-sm font-semibold text-hueInk shadow-glow transition hover:brightness-105">
            Khám phá danh lam
          </Link>
          <Link href="/ban-do" className="rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
            Xem bản đồ
          </Link>
        </div>
      </div>
    </section>
  );
}
