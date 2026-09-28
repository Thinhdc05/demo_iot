# 🌐 UPJ IoT Enterprise - Mock Web Platform

Hệ thống giao diện Web Mockup tương tác hoàn chỉnh cho nền tảng **Hạ tầng Tự động hóa & Giám sát IoT Công nghiệp (UPJ IoT Enterprise v1.2)**.

Dự án được xây dựng dưới dạng Static Web App (Zero-build, chỉ gồm HTML5 + Tailwind CSS + Vanilla JS) tương thích 100% với **GitHub Pages**, sẵn sàng triển khai ngay để chia sẻ cho team và đối tác xem trước trực quan.

---

## 🚀 Danh mục các trang giao diện (Site Map)

| STT | Trang | File | Mô tả chức năng |
| :---: | :--- | :--- | :--- |
| **1** | **Tổng quan (Dashboard)** | [`index.html`](index.html) / [`dashboard.html`](dashboard.html) | Bảng điều khiển trung tâm, telemetry realtime, công tắc relay đèn, điều tốc quạt PWM 3 cấp, chỉ số node. |
| **2** | **Hệ thống & Không gian** | [`system_and_Space.html`](system_and_Space.html) | Phân cấp không gian vật lý theo phòng/tầng (Khách, Bếp, Ngủ, Sân thượng, Tủ điện), giám sát môi trường và Gateway phụ trách. |
| **3** | **Bảng điều khiển Thiết bị** | [`device.html`](device.html) | Chi tiết thiết bị ngoại vi, test còi báo động Gas MQ-2, thanh tra chân GPIO ESP32 và nạp cấu hình NVS Flash. |
| **4** | **Cổng ESP32 Gateway** | [`device.html#gateways`](device.html#gateways) | Giám sát trạng thái 3 Gateway, IP/MAC mTLS, thông số mạng Mesh. |
| **5** | **Kịch bản Tự động hóa** | [`rule.html`](rule.html) | Trình thiết lập luật IF-THEN, bộ biên dịch phân tán LittleFS Flash chạy Edge khi mất kết nối mạng. |
| **6** | **Thống kê Năng lượng & Logs** | [`stat.html`](stat.html) | Phân tích phụ tải điện EVN kWh lũy kế, chi phí tạm tính, Log Explorer thời gian thực và xuất dữ liệu CSV. |
| **7** | **Trợ lý AI Cấu hình** | [`AI.html`](AI.html) | **Gemini Generative IoT Copilot**: Phân tích ngôn ngữ tự nhiên thành cấu hình chân GPIO và payload MQTT nạp trực tiếp. |
| **8** | **Quản trị Thành viên & RBAC** | [`admin.html`](admin.html) | Phân quyền bảo mật Layer 3, phiên xác thực mTLS, phân vùng ACL và modal mời thành viên mới. |
| **9** | **Hồ sơ Cá nhân** | [`profile.html`](profile.html) | Thông tin tài khoản SUPER_ADMIN, sao chép API Key Token và nhật ký kiểm toán. |

---

## ✨ Các tính năng tương tác (Mock App Features)

- **Điều hướng mượt mà**: Sidebar tự động nhận diện trang hiện tại, active tab chuẩn xác, hỗ trợ chuyển trang liền mạch giữa tất cả 8 màn hình.
- **Spotlight Command Palette (`⌘K` / `Ctrl+K`)**: Bấm vào thanh tìm kiếm trên header hoặc ấn phím tắt `⌘K` / `Ctrl+K` để tìm nhanh trang, thiết bị, phòng hoặc chạy lệnh tức thì.
- **Hộp thoại Thông báo (Notifications)**: Bấm vào biểu tượng chuông trên header để xem danh sách cảnh báo IoT (khí gas, Gateway tái kết nối, AI provisioning) kèm tính năng "Đánh dấu đã đọc".
- **Hộp thoại "+ Thêm thiết bị" toàn cục**: Bấm nút "+ Thêm thiết bị" ở góc trên bên phải trên bất kỳ trang nào để mở modal thêm thiết bị ngoại vi, chọn GPIO và lưu vào Gateway.
- **Hệ thống Toast Notification**: Mọi thao tác (bật/tắt relay, đổi tốc độ quạt, test còi, xuất CSV, nạp flash, mời thành viên, copy token) đều hiển thị thông báo toast nổi với hiệu ứng hiện đại.
- **Chế độ Sáng / Tối (Dark / Light Mode)**: Bấm nút `dark_mode` trên thanh header để chuyển đổi theme trực tiếp.

---

## 📦 Hướng dẫn Deploy lên GitHub Pages (Xem trực tiếp)

Chỉ với 3 bước đơn giản:

### Bước 1: Tạo Repository mới trên GitHub
1. Truy cập [github.com/new](https://github.com/new).
2. Đặt tên repository (ví dụ: `demo_IOT`).
3. Chọn chế độ **Public** rồi bấm **Create repository**.

### Bước 2: Push mã nguồn lên GitHub
Mở terminal (PowerShell hoặc Git Bash) tại thư mục dự án và chạy:

```bash
# Thêm remote repository của bạn
git remote add origin https://github.com/<YOUR_USERNAME>/demo_IOT.git

# Đổi nhánh chính sang main
git branch -M main

# Đẩy code lên GitHub
git push -u origin main
```

### Bước 3: Bật GitHub Pages
1. Tại trang repository trên GitHub, vào tab **Settings** ⚙️.
2. Ở menu bên trái, chọn mục **Pages**.
3. Tại phần **Build and deployment**:
   - Source: chọn **Deploy from a branch**.
   - Branch: chọn **`main`**, thư mục chọn **`/ (root)`**.
   - Bấm **Save**.
4. Sau khoảng 1-2 phút, GitHub sẽ cung cấp link xem trực tiếp dạng:
   👉 **`https://<YOUR_USERNAME>.github.io/demo_IOT/`**

Tất cả thành viên trong team có thể mở link này trên máy tính hoặc điện thoại để trải nghiệm giao diện demo mượt mà như một web thật!
