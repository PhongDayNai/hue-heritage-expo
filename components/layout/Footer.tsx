import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-14 border-t-2 border-hueGold bg-[linear-gradient(135deg,#1a0a04,#2d1407)] text-[#d0b27a]">
      <div className="section-wrap grid gap-8 py-10 md:grid-cols-[1.7fr_1fr_1fr]">
        <div>
          <h3 className="font-[var(--font-heading)] text-xl text-hueGold">🏯 Trang thông tin Du lịch Huế</h3>
          <p className="mt-3 text-sm leading-7">
            Cổng thông tin tổng hợp danh lam thắng cảnh, ẩm thực, văn hoá và sự kiện của Huế theo cách trực quan,
            dễ tra cứu và phù hợp trình bày học thuật.
          </p>
        </div>

        <div>
          <h4 className="border-b border-hueGold/35 pb-2 text-sm font-semibold uppercase tracking-wider text-hueGold">Điều hướng</h4>
          <div className="mt-3 grid gap-2 text-sm">
            <Link href="/danh-lam" className="hover:text-[#f0cd82]">Danh lam thắng cảnh</Link>
            <Link href="/am-thuc" className="hover:text-[#f0cd82]">Ẩm thực</Link>
            <Link href="/van-hoa" className="hover:text-[#f0cd82]">Văn hoá</Link>
          </div>
        </div>

        <div>
          <h4 className="border-b border-hueGold/35 pb-2 text-sm font-semibold uppercase tracking-wider text-hueGold">Liên hệ</h4>
          <div className="mt-3 space-y-2 text-sm">
            <p>Hỗ trợ nhanh: 0399 029 409</p>
            <p>Email: dulichhue@hue.gov.vn</p>
            <p>Địa bàn: TP Huế</p>
          </div>
        </div>
      </div>

      <div className="section-wrap border-t border-hueGold/20 py-4 text-xs">
        © 2026 Trang thông tin Du lịch Huế
      </div>
    </footer>
  );
}
