<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Đăng Nhập PHP</title>
    <script type="text/javascript" src="checklogin.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #f4f4f4;
            margin: 0;
        }
        .login-container {
            background-color: #fff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 350px; /* Tăng chiều rộng một chút để hiển thị thông báo lỗi PHP */
            text-align: center;
        }
        h2 {
            margin-bottom: 20px;
            color: #333;
        }
        label {
            display: block;
            text-align: left;
            margin-bottom: 5px;
            color: #555;
        }
        input[type="text"],
        input[type="password"] {
            width: calc(100% - 20px);
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        input[type="submit"] {
            background-color: #007bff;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            width: 100%;
        }
        input[type="submit"]:hover {
            background-color: #0056b3;
        }
        .message {
            margin-top: 15px;
            color: green;
        }
        .error-message {
            margin-top: 15px;
            color: red;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <h2>Đăng Nhập</h2>
        
        <?php
        // PHP code để hiển thị thông báo lỗi hoặc thành công từ server
        if (isset($_GET['error'])) {
            $error_message = htmlspecialchars($_GET['error']);
            echo '<p class="error-message">' . $error_message . '</p>';
        } elseif (isset($_GET['success'])) {
            echo '<p class="message">Đăng nhập thành công!</p>';
        }
        ?>

        <form onsubmit="return checklogin();" id="flogin" name="flogin" method="post" action="process_login.php">
            <label for="u">Username:</label>
            <input name="u" id="u" type="text" placeholder="Nhập username của bạn" 
                   value="<?php echo isset($_GET['prev_u']) ? htmlspecialchars($_GET['prev_u']) : ''; ?>" />
            
            <label for="p">Password:</label>
            <input name="p" id="p" type="password" placeholder="Nhập password của bạn"/>
            
            <input type="submit" name="sub" id="sub" value="Login" />
        </form>
        <div id="statusMessage" class="message"></div>
    </div>
</body>
</html>