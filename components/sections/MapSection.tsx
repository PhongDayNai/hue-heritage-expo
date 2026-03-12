export default function MapSection() {
  return (
    <section id="ban-do" className="section-wrap py-12 md:py-16">
      <h2 className="section-title">Bản đồ</h2>
      <p className="section-subtitle">
        Bản đồ Google Maps phục vụ tra cứu vị trí danh lam, ẩm thực và các điểm văn hoá/sự kiện.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-hueGold/25 bg-white">
        <iframe
          title="Bản đồ Huế"
          src="https://www.google.com/maps?q=Hue%20Vietnam&z=11&output=embed"
          className="h-[420px] w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
