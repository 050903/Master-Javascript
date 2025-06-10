<?php
session_start();

// Kiểm tra xem form đã được submit chưa
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // --- Dữ liệu người dùng đúng (thay vì database, ta dùng biến) ---
    $valid_username = "admin";
    // Mật khẩu đã được băm. Mật khẩu gốc là "123456"
    // Bạn có thể tạo chuỗi này bằng cách chạy: echo password_hash("123456", PASSWORD_DEFAULT);
    $hashed_password = '$2y$10$ybKONyO2h60OAYgMzHPGUuus3r/kM2DBGKl.rpWlsCRwXxJiTRha2'; // Đây là ví dụ, hãy tạo hash của riêng bạn

    // Lấy dữ liệu từ form VỚI TÊN ĐÚNG
    $username = trim($_POST['username']); // SỬA TỪ 'u' THÀNH 'username'
    $password = trim($_POST['password']); // SỬA TỪ 'p' THÀNH 'password'

    // Kiểm tra dữ liệu đầu vào
    if (empty($username) || empty($password)) {
        // Dòng này sẽ không còn bị kích hoạt sai nữa
        header("location: login.php?error=Vui lòng nhập đầy đủ thông tin.");
        exit();
    }

    // Xác thực người dùng
    if ($username === $valid_username && password_verify($password, $hashed_password)) {
        // Mật khẩu chính xác, bắt đầu một phiên mới
        
        // Tái tạo ID session để chống tấn công Session Fixation
        session_regenerate_id(true);

        // Lưu dữ liệu vào biến session
        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $username;                            
        
        // Chuyển hướng người dùng đến trang dashboard
        header("location: dashboard.php");
        exit();
    } else {
        // Đăng nhập thất bại
        header("location: login.php?error=Tên đăng nhập hoặc mật khẩu không đúng.&prev_u=" . urlencode($username));
        exit();
    }
} else {
    // Nếu không phải POST, chuyển về trang login
    header("location: login.php");
    exit();
}
?>