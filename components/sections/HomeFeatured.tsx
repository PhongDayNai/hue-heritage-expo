import scenic from '@/data/scenic.json';
import food from '@/data/food.json';
import culture from '@/data/culture.json';
import Link from 'next/link';
import Image from 'next/image';

export default function HomeFeatured() {
  const topScenic = scenic.slice(0, 3);
  const topFood = food.slice(0, 3);
  const topCulture = culture.slice(0, 2);

  return (
    <section className="section-wrap pb-12 md:pb-16">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-hueGold/20 bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-hueRed">Danh lam nổi bật</h3>
            <Link href="/danh-lam" className="text-xs font-semibold text-hueRed">Xem tất cả</Link>
          </div>
          <div className="space-y-3">
            {topScenic.map((item) => (
              <div key={item.id} className="flex gap-3 rounded-xl border border-neutral-200 p-2">
                <div className="relative h-14 w-20 overflow-hidden rounded-lg">
                  <Image src={item.anh[0]} alt={item.tenDiaDiem} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-hueInk">{item.tenDiaDiem}</p>
                  <p className="line-clamp-1 text-xs text-neutral-600">{item.gioiThieuNgan}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-hueGold/20 bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-hueRed">Ẩm thực nổi bật</h3>
            <Link href="/am-thuc" className="text-xs font-semibold text-hueRed">Xem tất cả</Link>
          </div>
          <div className="space-y-3">
            {topFood.map((item) => (
              <div key={item.id} className="rounded-xl border border-neutral-200 p-3">
                <p className="text-sm font-semibold">{item.tenMon}</p>
                <p className="text-xs text-neutral-600">{item.tenQuan}</p>
                <p className="text-xs font-medium text-hueRed">{item.mucGia}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-hueGold/20 bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-hueRed">Văn hoá nổi bật</h3>
            <Link href="/van-hoa" className="text-xs font-semibold text-hueRed">Xem tất cả</Link>
          </div>
          <div className="space-y-3">
            {topCulture.map((item) => (
              <div key={item.id} className="rounded-xl border border-neutral-200 p-3">
                <p className="text-sm font-semibold">{item.chuDe}</p>
                <p className="line-clamp-2 text-xs text-neutral-600">{item.tomTat}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
