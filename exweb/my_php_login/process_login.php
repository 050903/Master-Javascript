<?php
// Bắt đầu phiên (session) để lưu trữ dữ liệu người dùng nếu cần thiết
// session_start(); 

// Kiểm tra xem form đã được submit bằng phương thức POST hay chưa
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Lấy dữ liệu từ form
    $username = $_POST['u'];
    $password = $_POST['p'];

    // --- KIỂM TRA DỮ LIỆU PHÍA SERVER ---

    // 1. Kiểm tra username và password có rỗng không
    if (empty($username) || empty($password)) {
        $error = "Vui lòng nhập đầy đủ Username và Password.";
        // Chuyển hướng trở lại trang login.php với thông báo lỗi
        // và giữ lại username đã nhập để tiện cho người dùng
        header("Location: login.php?error=" . urlencode($error) . "&prev_u=" . urlencode($username));
        exit(); // Dừng kịch bản để đảm bảo chuyển hướng được thực hiện
    }

    // 2. Kiểm tra thông tin đăng nhập (Đây là phần quan trọng nhất)
    // Trong một ứng dụng thực tế, bạn sẽ truy vấn database ở đây.
    // Ví dụ đơn giản: kiểm tra với username và password cố định
    $valid_username = "admin";
    $valid_password = "123"; // KHÔNG NÊN LÀM NHƯ VẬY TRONG THỰC TẾ! Mật khẩu phải được băm (hashed)!

    if ($username === $valid_username && $password === $valid_password) {
        // Đăng nhập thành công
        // Trong ứng dụng thực tế, bạn sẽ tạo session để duy trì trạng thái đăng nhập
        // session_start();
        // $_SESSION['loggedin'] = true;
        // $_SESSION['username'] = $username; // Lưu username vào session

        header("Location: success_page.php"); // Chuyển hướng đến trang thành công
        exit(); // Rất quan trọng: Dừng script để đảm bảo chuyển hướng được thực hiện
    } else {
        // Đăng nhập thất bại
        $error = "Sai Username hoặc Password. Vui lòng thử lại.";
        header("Location: login.php?error=" . urlencode($error) . "&prev_u=" . urlencode($username));
        exit();
    }
} else {
    // Nếu người dùng cố gắng truy cập process_login.php trực tiếp mà không qua form POST
    header("Location: login.php"); // Chuyển hướng về trang đăng nhập
    exit();
}
?>