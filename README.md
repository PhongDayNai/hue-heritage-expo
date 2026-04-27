# Vi Vu Binh Dien

Website giới thiệu du lịch Bình Điền, Huế: danh lam thắng cảnh, văn hoá bản địa, ẩm thực, dịch vụ, tin tức sự kiện, bản đồ và kênh hỗ trợ góp ý.

Production: [https://binhdien.phongdaynai.id.vn](https://binhdien.phongdaynai.id.vn)

## Tổng Quan

Vi Vu Bình Điền được xây dựng như một cổng thông tin du lịch trực quan cho khu vực Bình Điền. Dự án tập trung vào trải nghiệm tra cứu nhanh, nội dung giàu hình ảnh, popup chi tiết, bản đồ, liên hệ và các gợi ý khám phá phù hợp cho khách tham quan.

Ứng dụng dùng Next.js App Router, dữ liệu nội dung được quản lý bằng các file JSON trong `data/`, media nằm trong `public/assets/`, và giao diện được chia theo từng section để dễ bảo trì.

## Tính Năng Chính

- Trang chủ giới thiệu nhanh các điểm nổi bật và widget gợi ý hành trình.
- Danh lam thắng cảnh với thư viện ảnh, video, modal chi tiết và liên kết bản đồ.
- Ẩm thực địa phương, món đặc sản, quán ăn và menu hình ảnh.
- Văn hoá, tin tức, sự kiện và nội dung trải nghiệm tại Bình Điền.
- Dịch vụ du lịch có thể bật/tắt bằng feature flag runtime.
- Tìm kiếm nhanh trên header qua API `/api/search`.
- Trang bản đồ, hỗ trợ góp ý và thông tin liên hệ.
- Admin mini panel cho một số cấu hình runtime trong `data/feature-flags.json`.

## Công Nghệ

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Docker / Docker Compose

## Cấu Trúc Dự Án

```text
app/                 Routes, layout, API handlers
components/          Layout, sections, shared UI components
data/                Nội dung JSON cho danh lam, ẩm thực, văn hoá, dịch vụ
public/assets/       Ảnh và video dùng trên website
content/             Tài liệu nội dung gốc
docs/                Ghi chú thiết kế và guideline
```

Một số file dữ liệu quan trọng:

- `data/scenic.json`: danh lam thắng cảnh
- `data/food.json`: ẩm thực và quán ăn
- `data/culture.json`: văn hoá
- `data/news.json`: tin tức, sự kiện
- `data/services.json`: dịch vụ
- `data/support.json`: thông tin hỗ trợ
- `data/feature-flags.json`: cờ bật/tắt tính năng

## Chạy Local

Yêu cầu:

- Node.js 20+ hoặc 22+
- npm

Cài dependencies:

```bash
npm install
```

Chạy môi trường development:

```bash
npm run dev
```

Mở:

```text
http://localhost:3000
```

Build production:

```bash
npm run build
```

Chạy production server:

```bash
npm run start
```

## Chạy Bằng Docker

Build và chạy container:

```bash
docker compose up -d --build
```

Mặc định compose map cổng:

```text
http://localhost:47080 -> container:3000
```

Tắt container:

```bash
docker compose down
```

## Ghi Chú Vận Hành

- Khi cập nhật nội dung, ưu tiên chỉnh JSON trong `data/` và media tương ứng trong `public/assets/`.
- Khi thêm ảnh/video mới, kiểm tra lại đường dẫn trong JSON để tránh lỗi media bị thiếu.
- File video lớn đang được lưu trực tiếp trong Git; nếu repo tiếp tục tăng dung lượng, nên cân nhắc chuyển media lớn sang Git LFS hoặc object storage.
- Website production đang phục vụ tại: [https://binhdien.phongdaynai.id.vn](https://binhdien.phongdaynai.id.vn)

## License

Private project.
