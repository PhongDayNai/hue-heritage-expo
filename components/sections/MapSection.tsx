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
          src="https://www.google.com/maps?output=embed&q=B%C3%ACnh%20%C4%90i%E1%BB%81n%2C%20Tx.%20H%C6%B0%C6%A1ng%20Tr%C3%A0%2C%20Hu%E1%BA%BF%2C%20Vi%E1%BB%87t%20Nam&z=15"
          className="h-[420px] w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
