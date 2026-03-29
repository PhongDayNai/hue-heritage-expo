import scenic from '@/data/scenic.json';
import food from '@/data/food.json';
import culture from '@/data/culture.json';
import news from '@/data/news.json';
import AnimatedCard from '../ui/AnimatedCard';

const stats = [
  { label: 'Danh lam thắng cảnh', value: scenic.length },
  { label: 'Món ăn tiêu biểu', value: food.length },
  { label: 'Chuyên đề văn hoá', value: culture.length },
  { label: 'Tin/Sự kiện cập nhật', value: news.length }
];

export default function HomeOverview() {
  return (
    <section className="section-wrap py-12 md:py-16">
      <h2 className="section-title">Trang chủ tổng quan</h2>
      <p className="section-subtitle">
        Tóm tắt nhanh phạm vi dự án trước khi đi vào chi tiết từng mục trong topbar.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, idx) => (
          <AnimatedCard key={item.label} delay={idx * 0.05} className="rounded-2xl border border-hueGold/20 bg-white p-5">
            <p className="text-sm text-neutral-600">{item.label}</p>
            <p className="mt-2 text-3xl font-semibold text-hueRed">{item.value}</p>
          </AnimatedCard>
        ))}
      </div>
    </section>
  );
}
