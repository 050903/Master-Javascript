<?php
// Khởi tạo session
session_start();
 
// Kiểm tra xem người dùng đã đăng nhập chưa, nếu chưa thì chuyển hướng về trang đăng nhập
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}
?>
 
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Chào mừng</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="login-container" style="text-align: center;">
        <h2>Xin Chào, <b><?php echo htmlspecialchars($_SESSION["username"]); ?></b>!</h2>
        <p>Bạn đã đăng nhập thành công vào hệ thống.</p>
        <p>
            <a href="logout.php" class="btn-login" style="background-color:#dc3545; text-decoration:none;">Đăng Xuất</a>
        </p>
    </div>
</body>
</html>