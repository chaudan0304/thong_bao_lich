# 🏫 THÔNG BÁO LỊCH TỰU TRƯỜNG & KHAI GIẢNG NĂM HỌC 2026 - 2027
### 🎈 Trường Tiểu Học Quỳnh Lộc B

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Responsive](https://img.shields.io/badge/Design-16%3A9_Widescreen-brightgreen?style=for-the-badge)]()

---

## 📖 Giới Thiệu
Trang web thông báo trực quan, sinh động về **Lịch Tựu Trường** và **Lễ Khai Giảng** năm học mới 2026 - 2027. Được thiết kế theo phong cách poster học đường chuẩn tỷ lệ **16:9 Widescreen**, kết hợp các hiệu ứng tương tác hiện đại giúp nhà trường dễ dàng truyền thông đến phụ huynh và học sinh.

---

## ✨ Tính Năng Nổi Bật

- 🎨 **Thiết kế Widescreen 16:9 chuẩn banner**: Phù hợp trình chiếu trên tivi trường học, máy chiếu, bảng thông báo điện tử hoặc chia sẻ mạng xã hội.
- 📱 **Trang thông báo đa dạng**:
  - **Trang Tổng Hợp (`index.html`)**: Thông báo kết hợp cả ngày Tựu Trường và Khai Giảng.
  - **Trang Tựu Trường (`tuu-truong.html`)**: Trang chuyên biệt cho sự kiện Tựu Trường.
  - **Trang Khai Giảng (`khai-giang.html`)**: Trang chuyên biệt cho Lễ Khai Giảng.
- ⏱️ **Đồng Hồ Đếm Ngược (Countdown Timer)**: Đếm ngược thời gian thực chính xác tới từng giây cho các mốc sự kiện.
- 📸 **Khung ảnh Polaroid & Xem chi tiết (Lightbox)**: Trình diễn các hình ảnh hoạt động của học sinh, nhấn vào để phóng to ảnh.
- 📥 **Tải Banner HD**: Hỗ trợ xuất ảnh chất lượng cao trực tiếp từ trình duyệt để lưu về máy hoặc in ấn.
- 🎊 **Hiệu ứng pháo hoa chào mừng (Confetti)**: Bắn pháo hoa giấy rực rỡ tạo không khí ngày hội.
- 🎵 **Hiệu ứng âm thanh trường học**: Phát giai điệu chào đón bằng Web Audio API không cần load file âm thanh nặng.
- 🖥️ **Chế độ Toàn Màn Hình (Fullscreen 16:9)**: Xem trải nghiệm mượt mà, không bị che bởi thanh công cụ trình duyệt.

---

## 📁 Cấu Trúc Thư Mục

```text
thong_bao_lich/
├── assets/                  # Thư mục hình ảnh học sinh & hoạt động
│   ├── anh1.jpg ... anh6.jpg
│   └── photo1.jpg ... photo4.jpg
├── .gitignore               # Cấu hình bỏ qua file không cần thiết
├── index.html               # Trang thông báo tổng hợp chính
├── khai-giang.html          # Trang thông báo Lễ Khai Giảng
├── tuu-truong.html          # Trang thông báo Ngày Tựu Trường
├── style.css                # Bộ định dạng phong cách chính & hiệu ứng
├── tuu-truong.css           # Định dạng bổ sung cho trang Tựu Trường
├── script.js                # Xử lý logic, tương tác, đếm ngược, âm thanh
├── tuu-truong.js            # Xử lý logic trang Tựu Trường
└── README.md                # Tài liệu hướng dẫn dự án
```

---

## 🚀 Hướng Dẫn Sử Dụng

### 1. Chạy Trực Tiếp Trên Máy Tính
Không cần cài đặt môi trường phức tạp hay máy chủ backend:
1. Clone hoặc tải mã nguồn về máy:
   ```bash
   git clone https://github.com/chaudan0304/thong_bao_lich.git
   ```
2. Mở file `index.html` bằng bất kỳ trình duyệt web nào (Google Chrome, Microsoft Edge, Firefox, Cốc Cốc,...).

### 2. Tùy Biến Lại Thông Tin
Để sử dụng cho trường học hoặc năm học khác, bạn có thể chỉnh sửa:
- **Tên trường & Tiêu đề**: Sửa trong thẻ `<header class="school-header">` ở các file HTML.
- **Thời gian đếm ngược**: Sửa biến `tuuTruongTarget` và `khaiGiangTarget` trong file [`script.js`](file:///d:/Thong_bao_lich/script.js) (định dạng `YYYY-MM-DDTHH:mm:ss+07:00`).
- **Hình ảnh**: Thay thế các ảnh trong thư mục [`assets/`](file:///d:/Thong_bao_lich/assets).

---

## 🛠️ Công Nghệ Sử Dụng

- **Frontend Core**: HTML5, CSS3, JavaScript (ES6+)
- **Phông chữ Google Fonts**: *Nunito*, *Montserrat*, *Caveat*, *Dancing Script*, *Pacifico*
- **Icons**: Font Awesome 6
- **Thư viện mở rộng**:
  - [html2canvas](https://html2canvas.hertzen.com/): Chụp và tải ảnh banner.
  - [canvas-confetti](https://www.kirilv.com/canvas-confetti/): Hiệu ứng pháo hoa hạt giấy.
  - **Web Audio API**: Tạo âm thanh chuông trường trực tiếp qua code.

---

## 👨‍💻 Tác Giả & Bản Quyền

- **Phát triển bởi**: Nguyễn Văn Châu Đàn
- **GitHub**: [@chaudan0304](https://github.com/chaudan0304)
- **Dự án**: Thông Báo Lịch Tựu Trường & Khai Giảng
