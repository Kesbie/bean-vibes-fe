# Quản lý tài khoản - Bean Vibes

## Tài khoản test

Đã tạo sẵn 2 tài khoản để test:

### Admin Account
- **Email:** admin@test.com
- **Password:** admin123
- **Vai trò:** Quản trị viên

### User Account  
- **Email:** user@test.com
- **Password:** user123
- **Vai trò:** Người dùng thường

## Chức năng quản lý tài khoản

### 1. Thông tin tài khoản
- **Đường dẫn:** `/profile`
- **Chức năng:**
  - Xem thông tin cá nhân
  - Cập nhật họ tên
  - Xem trạng thái email, vai trò, trạng thái tài khoản

### 2. Đổi mật khẩu
- **Đường dẫn:** `/profile` (tab "Đổi mật khẩu")
- **Chức năng:**
  - Đổi mật khẩu mới
  - Validation: ít nhất 8 ký tự, có chữ cái và số
  - Xác nhận mật khẩu

### 3. Xác thực email
- **Đường dẫn:** `/profile` (tab "Xác thực email")
- **Chức năng:**
  - Gửi email xác thực
  - Kiểm tra trạng thái xác thực
  - Hướng dẫn chi tiết

### 4. Quên mật khẩu
- **Đường dẫn:** `/profile` (tab "Quên mật khẩu")
- **Chức năng:**
  - Gửi email đặt lại mật khẩu
  - Hướng dẫn chi tiết

### 5. Đặt lại mật khẩu
- **Đường dẫn:** `/reset-password?token=xxx`
- **Chức năng:**
  - Đặt lại mật khẩu từ token
  - Validation tương tự đổi mật khẩu

### 6. Yêu cầu trở thành kiểm duyệt viên
- **Đường dẫn:** `/profile` (tab "Yêu cầu kiểm duyệt viên")
- **Chức năng:**
  - Gửi yêu cầu trở thành moderator
  - Form lý do và kinh nghiệm
  - Thông tin quyền lợi

### 7. Xác thực email từ link
- **Đường dẫn:** `/verify-email?token=xxx`
- **Chức năng:**
  - Xác thực email từ token
  - Tự động chuyển hướng sau khi xác thực

## Cách sử dụng

1. **Đăng nhập:** Sử dụng tài khoản test ở trên
2. **Truy cập profile:** Click vào avatar → "Quản lý tài khoản"
3. **Test các chức năng:**
   - Cập nhật thông tin
   - Đổi mật khẩu
   - Gửi email quên mật khẩu

## API Endpoints

### Profile Management
- `GET /profile` - Lấy thông tin profile
- `PATCH /profile` - Cập nhật thông tin
- `POST /profile/change-password` - Đổi mật khẩu

### Authentication
- `POST /auth/forgot-password` - Gửi email đặt lại mật khẩu
- `POST /auth/reset-password` - Đặt lại mật khẩu từ token
- `POST /auth/send-verification-email` - Gửi email xác thực
- `POST /auth/verify-email` - Xác thực email từ token

### Moderator Requests
- `POST /moderator-requests` - Gửi yêu cầu trở thành moderator

## Script tạo tài khoản test

```bash
cd bean-vibes-api
node scripts/createTestAccounts.js
```

## Lưu ý

- Tài khoản test đã được verify email sẵn
- Có thể sử dụng để test đầy đủ các chức năng
- Giao diện responsive, hỗ trợ mobile
- Validation đầy đủ cho tất cả form 