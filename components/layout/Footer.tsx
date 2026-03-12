export default function Footer() {
  return (
    <footer className="mt-16 border-t border-hueGold/20 bg-hueInk text-white/90">
      <div className="section-wrap grid gap-10 py-10 md:grid-cols-3">
        <div>
          <h3 className="font-semibold text-hueGold">HueHeritage Expo</h3>
          <p className="mt-3 text-sm text-white/70">
            Nền tảng giới thiệu danh lam thắng cảnh Huế phục vụ nghiên cứu và trình bày khoa học kỹ thuật.
          </p>
        </div>
        <div>
          <h4 className="font-medium text-hueGold">Điều hướng</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>Danh lam thắng cảnh</li>
            <li>Ẩm thực</li>
            <li>Văn hoá</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-hueGold">Liên hệ</h4>
          <p className="mt-3 text-sm text-white/70">Hỗ trợ nhanh: 0399029409</p>
          <p className="text-sm text-white/70">Công an: 113</p>
        </div>
      </div>
    </footer>
  );
}
