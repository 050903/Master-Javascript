<?php
// Bắt đầu phiên để kiểm tra xem người dùng có thực sự đăng nhập không
// session_start(); 

// Trong ứng dụng thực tế, bạn sẽ kiểm tra session ở đây để đảm bảo
// người dùng đã đăng nhập hợp lệ trước khi cho phép truy cập trang này.
// if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
//     header("Location: login.php"); // Chuyển hướng về trang đăng nhập nếu chưa đăng nhập
//     exit();
// }
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng Nhập Thành Công!</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #e6ffe6; /* Màu xanh nhẹ */
            margin: 0;
            text-align: center;
        }
        .container {
            background-color: #fff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 400px;
        }
        h1 {
            color: #28a745; /* Màu xanh lá cây */
            margin-bottom: 20px;
        }
        p {
            color: #333;
            font-size: 1.1em;
            margin-bottom: 30px;
        }
        .button {
            background-color: #007bff;
            color: white;
            padding: 12px 25px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1em;
            text-decoration: none;
            display: inline-block;
        }
        .button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Chúc mừng, bạn đã đăng nhập thành công!</h1>
        <p>Chào mừng bạn đến với khu vực dành riêng cho thành viên.</p>
        <a href="login.php" class="button">Quay lại trang đăng nhập</a>
    </div>
</body>
</html>