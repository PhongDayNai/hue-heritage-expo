# Hue Heritage Expo

Website giới thiệu danh lam thắng cảnh, văn hoá và du lịch sinh thái khu vực Bình Điền - Huế.

## Website production
- https://binhdien.phongdaynai.id.vn

## Chạy bằng Docker (khuyến nghị)
Yêu cầu: Docker + Docker Compose plugin.

```bash
docker compose up -d --build
```

Sau khi chạy thành công:
- Local: http://localhost:47080
- Container mapping: `47080:3000`

Dừng dịch vụ:

```bash
docker compose down
```

## Chạy local bằng Node.js
Yêu cầu: Node.js 18+.

```bash
npm install
npm run dev
```

Mặc định Next.js chạy ở `http://localhost:3000` khi dùng `npm run dev`.

## Build production

```bash
npm run build
npm run start
```
