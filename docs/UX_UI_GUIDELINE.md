# HUEHERITAGE EXPO — UI/UX & IMPLEMENTATION GUIDELINE (NEXT.JS)

> Phiên bản: v1.1  
> Mục tiêu: Làm website giới thiệu danh lam thắng cảnh Huế phục vụ thi khoa học kỹ thuật, giao diện nghiêm túc, nổi bật nội dung, có animation hiện đại, trong đó Trang chủ đóng vai trò điều hướng và tóm tắt học thuật.

---

## 1) Mục tiêu sản phẩm

### 1.1 Mục tiêu chính
- Trình bày nội dung về danh lam thắng cảnh Huế theo hướng **học thuật + trực quan + dễ thuyết trình**.
- Thể hiện được năng lực làm sản phẩm số có cấu trúc: nội dung, dữ liệu, giao diện, trải nghiệm.
- Cho phép người xem:
  - Xem nhanh thông tin ngắn gọn,
  - Mở rộng để đọc đầy đủ nội dung,
  - Tra cứu vị trí qua bản đồ.

### 1.2 Đối tượng sử dụng
- Ban giám khảo cuộc thi.
- Giáo viên/học sinh cần tham khảo nhanh về danh lam, ẩm thực, văn hóa Huế.
- Du khách muốn xem điểm đến và thông tin cơ bản.

### 1.3 Tiêu chí đánh giá thành công
- Giao diện trang trọng, không rối mắt.
- 3 cụm nội dung trọng tâm (Danh lam, Ẩm thực, Văn hoá) nổi bật, dễ ghi nhớ.
- Animation có điểm nhấn nhưng không gây nặng máy.
- Dễ demo trong 3–5 phút.

---

## 2) Stack kỹ thuật đề xuất

- **Framework:** Next.js (App Router)
- **Ngôn ngữ:** TypeScript
- **Style:** Tailwind CSS
- **Animation:** Framer Motion
- **Data nội dung:** JSON files (tách rõ từng module)
- **Map:** Google Maps Embed (iframe)

---

## 3) Cấu trúc điều hướng (Topbar bắt buộc)

Topbar cố định gồm 7 mục:
1. **Trang chủ**
2. **Danh lam thắng cảnh**
3. **Ẩm thực**
4. **Văn hoá**
5. **Tin tức - Sự kiện**
6. **Bản đồ**
7. **Hỗ trợ - Góp ý**

Yêu cầu UX:
- Sticky topbar khi cuộn.
- Active state rõ ràng theo section.
- Mobile có menu gọn (drawer hoặc sheet).

---

## 4) Kiến trúc thông tin chi tiết theo mục

## 4.0 Trang chủ (bắt buộc, ưu tiên hiển thị khi mở website)

### Mục tiêu Trang chủ
- Tạo ấn tượng nghiêm túc, chỉn chu trong 5–10 giây đầu.
- Tóm tắt được toàn bộ phạm vi dự án trước khi đi sâu vào từng mục.
- Dẫn hướng nhanh đến 6 mục nội dung còn lại trong topbar.

### Thành phần bắt buộc
1. **Hero học thuật**
   - Tiêu đề dự án + thông điệp ngắn về giá trị văn hoá – du lịch Huế.
   - 2 CTA rõ ràng: `Khám phá danh lam` và `Xem bản đồ`.
2. **Chỉ số nhanh (Quick Stats)**
   - 15 danh lam thắng cảnh
   - Số món ẩm thực
   - Số chủ đề văn hoá
   - Số tin/sự kiện cập nhật
3. **Khối nổi bật (Featured Highlights)**
   - 3 danh lam nổi bật
   - 3 món/quán ẩm thực nổi bật
   - 2 nội dung văn hoá nổi bật
4. **Tin tức - Sự kiện gần nhất**
   - 3–4 mục mới nhất, có ngày tháng rõ ràng.
5. **Bản đồ preview**
   - Khung Google Maps rút gọn + nút mở mục Bản đồ đầy đủ.
6. **Hỗ trợ nhanh**
   - Hiển thị ngay ở cuối Trang chủ: 113, Trật tự xã, 0399029409.

### Quy tắc nội dung trên Trang chủ
- Mỗi card preview chỉ giữ **90–120 ký tự**, ngắn gọn để dễ lướt.
- Mỗi card đều có hành động thống nhất: **“Xem chi tiết”**.
- Không nhồi quá nhiều chữ ở hero; ưu tiên trực quan + điều hướng.

## 4.1 Danh lam thắng cảnh (15 địa điểm)

### Dữ liệu tối thiểu mỗi địa điểm
- `id`
- `tenDiaDiem`
- `gioiThieuNgan` (1–2 câu)
- `gioiThieuDayDu`
- `anh[]` (ít nhất 1 ảnh)
- `dichVu[]` (ví dụ: tham quan, chèo thuyền, cắm trại, ăn uống gần đó)
- `toaDo` (lat/lng, nếu có)
- `diaChi`

### Hiển thị
- Màn hình chính: grid card nổi bật (ảnh + tên + mô tả ngắn + tag dịch vụ).
- Mở chi tiết: panel/modal với thông tin đầy đủ:
  - Giới thiệu,
  - Gallery ảnh,
  - Dịch vụ,
  - Nút “Xem trên bản đồ”.

## 4.2 Ẩm thực

### Dữ liệu tối thiểu
- `id`
- `tenMon`
- `tenQuan`
- `mucGia`
- `moTaNgan`
- `anh`
- `diaChi` (nếu có)

### Hiển thị
- Card list rõ ràng 3 dòng chính: **Tên món – Tên quán – Mức giá**.
- Mở rộng: thông tin thêm (ảnh lớn, địa chỉ, gợi ý món tương tự).

## 4.3 Văn hoá

### Dữ liệu tối thiểu
- `id`
- `chuDe`
- `tomTat`
- `noiDungDayDu`
- `anh`
- `diemNhan` (quote/sự kiện/giá trị văn hoá)

### Hiển thị
- Dạng timeline/chuyên đề để tăng tính học thuật.
- Có phần “Điểm nhấn” cho mỗi mục.

## 4.4 Tin tức - Sự kiện

### Dữ liệu tối thiểu
- `id`
- `tieuDe`
- `thoiGian`
- `diaDiem`
- `moTaNgan`
- `anh` (optional)

### Hiển thị
- Danh sách sự kiện mới nhất.
- Có 1 card “Sự kiện nổi bật”.

## 4.5 Bản đồ

- Nhúng Google Maps (iframe).
- Có ghi chú nhóm điểm:
  - Danh lam,
  - Ẩm thực,
  - Văn hoá/sự kiện.

## 4.6 Hỗ trợ - Góp ý

Hiển thị rõ, dễ thấy:
- **113 — Công an**
- **Trật tự xã**
- **0399029409**

Kèm form góp ý:
- Họ tên
- Số điện thoại
- Nội dung góp ý

---

## 5) Chiến lược animation (yêu cầu nổi bật)

## 5.1 Nguyên tắc
- Animation phục vụ nội dung, không phô diễn quá mức.
- “Nhìn lướt thấy gọn; bấm vào thấy sâu”.
- Tốc độ mượt, đồng bộ, không giật.

## 5.2 Cụ thể cho 3 mục trọng tâm

### A. Danh lam thắng cảnh
- Card xuất hiện theo **stagger reveal** khi vào viewport.
- Hover card: zoom ảnh nhẹ + glow viền.
- Mở chi tiết: modal/panel với hiệu ứng scale + fade + backdrop blur.

### B. Ẩm thực
- Card xuất hiện bằng slide-up + fade.
- Hover: nâng card nhẹ + shadow sâu.
- Mở chi tiết: transition mềm, ưu tiên ảnh món và mức giá.

### C. Văn hoá
- Timeline reveal theo chiều dọc.
- Icon/điểm mốc animate theo nhịp cuộn.
- Mở rộng nội dung bằng accordion hoặc modal highlight.

## 5.3 Accessibility cho animation
- Tôn trọng `prefers-reduced-motion`.
- Không dùng animation gây mỏi mắt (flash/chớp mạnh).

---

## 6) Hệ thống thiết kế (Design System)

### 6.1 Tone giao diện
- Nghiêm túc, tinh tế, có chiều sâu văn hoá Huế.

### 6.2 Màu sắc
- Chủ đạo: đỏ đô Huế.
- Nhấn: vàng hoàng cung.
- Nền: sáng trung tính để tăng độ đọc.

### 6.3 Typography
- Tiêu đề: serif sang trọng.
- Nội dung: sans-serif dễ đọc.
- Tối ưu cỡ chữ cho desktop + mobile.

### 6.4 Khoảng cách & bố cục
- Section spacing rộng để thoáng.
- Grid đều, căn chỉnh nhất quán.
- Ưu tiên hierarchy rõ: Title > Subtitle > Body > Meta.

---

## 7) Kiến trúc thư mục Next.js đề xuất

```txt
hue-heritage-expo/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    layout/
      Topbar.tsx
      Footer.tsx
    sections/
      ScenicSection.tsx
      FoodSection.tsx
      CultureSection.tsx
      NewsSection.tsx
      MapSection.tsx
      SupportSection.tsx
    ui/
      AnimatedCard.tsx
      SpotlightModal.tsx
  data/
    scenic.json
    food.json
    culture.json
    news.json
    support.json
  public/
    images/
      scenic/
      food/
      culture/
  docs/
    UX_UI_GUIDELINE.md
```

---

## 8) Roadmap triển khai

## Phase 1 — Foundation
- Khởi tạo Next.js + Tailwind + Framer Motion.
- Dựng layout tổng + topbar + các section trống.

## Phase 2 — Data & Components
- Chuẩn hoá dữ liệu JSON theo schema.
- Dựng card, modal, timeline, list component tái sử dụng.

## Phase 3 — Animation & Polish
- Gắn animation cho Danh lam/Ẩm thực/Văn hoá.
- Tối ưu trạng thái hover, focus, transition.

## Phase 4 — Map & Support
- Nhúng Google Maps.
- Hoàn thiện khối hotline + form góp ý.

## Phase 5 — QA cho bài thi
- Kiểm tra responsive (mobile/tablet/desktop).
- Kiểm tra tốc độ tải và lỗi giao diện.
- Rà chính tả, tính nhất quán ngôn ngữ và nội dung.

---

## 9) Tiêu chuẩn chất lượng cho bài thi (QA + Performance + Nội dung)

### 9.1 Chất lượng nội dung
- Có ghi chú **nguồn tổng hợp** cho dữ liệu danh lam/ẩm thực/sự kiện (nếu áp dụng).
- Có trường **thời điểm cập nhật** cho Tin tức - Sự kiện.
- Chính tả và cách viết thống nhất toàn site (ví dụ: Văn hoá, Ẩm thực, Góp ý).
- Khi thiếu dữ liệu thật, dùng placeholder có nhãn rõ `Đang cập nhật`.

### 9.2 Hiệu năng và kỹ thuật
- Mục tiêu LCP desktop: **< 2.5s** (demo cục bộ).
- Ảnh dùng tối ưu tải (ưu tiên `next/image`, lazy load ảnh ngoài viewport).
- Animation chỉ kích hoạt khi vào viewport, tránh chạy nền toàn trang.
- Có phương án fallback khi ảnh lỗi/tải chậm.

### 9.3 UX và Accessibility
- Mobile đọc tốt: cỡ chữ, khoảng cách, nút bấm đủ lớn.
- Điều hướng bàn phím cơ bản hoạt động (focus state rõ).
- Tôn trọng `prefers-reduced-motion` cho người dùng nhạy cảm chuyển động.

---

## 10) Checklist nghiệm thu

- [ ] Topbar đủ 7 mục đúng yêu cầu (bao gồm Trang chủ).
- [ ] Trang chủ có đủ Hero + Quick Stats + Featured + Tin gần nhất + Map preview + Hỗ trợ nhanh.
- [ ] Trang chủ thể hiện rõ “xem nhanh ngắn gọn, mở ra đầy đủ”.
- [ ] Danh lam có đủ 15 item, mỗi item có Giới thiệu/Ảnh/Dịch vụ.
- [ ] Ẩm thực có đủ Tên món/Tên quán/Mức giá.
- [ ] Có section Văn hoá riêng rõ ràng.
- [ ] Có section Tin tức - Sự kiện.
- [ ] Có Google Maps section.
- [ ] Có Hỗ trợ - Góp ý với 113, Trật tự xã, 0399029409.
- [ ] 3 mục trọng tâm có animation nổi bật và mượt.
- [ ] Nội dung ngắn gọn khi lướt, đầy đủ khi mở chi tiết.
- [ ] Tổng thể nghiêm túc, phù hợp ngữ cảnh thi khoa học kỹ thuật.

---

## 11) Ghi chú nội dung nguồn

- Nội dung hiện có từ file markdown về Bình Điền sẽ là nguồn chính cho mục Danh lam.
- Các ảnh người dùng cung cấp sẽ ưu tiên đưa vào phần nổi bật và gallery.
- Khi thiếu dữ liệu địa điểm/ẩm thực/sự kiện, sẽ bổ sung placeholder có đánh dấu để cập nhật sau.

---

## 12) Quy tắc demo trước ban giám khảo

- Mở từ Hero → Danh lam → Mở chi tiết 1 địa điểm → Ẩm thực → Văn hoá → Bản đồ → Hỗ trợ.
- Thời lượng demo khuyến nghị: 3–5 phút.
- Nhấn mạnh điểm kỹ thuật:
  - Dữ liệu có cấu trúc,
  - UI hiện đại, có animation có chủ đích,
  - Có khả năng mở rộng thành cổng thông tin thực tế.
