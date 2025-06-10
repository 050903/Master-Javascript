<?php
session_start();

// Nếu người dùng đã đăng nhập, chuyển hướng đến dashboard
if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
    header("location: dashboard.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng Nhập Nâng Cao</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
</head>
<body>
    <div class="login-container">
        <h2>Đăng Nhập</h2>

        <?php 
        if(isset($_GET['error'])){
            echo '<div class="server-error">' . htmlspecialchars($_GET['error']) . '</div>';
        }
        if(isset($_GET['message'])){
            echo '<div class="server-error" style="background-color:#e7f3ff; color:#1877f2; border-color:#1877f2;">' . htmlspecialchars($_GET['message']) . '</div>';
        }
        ?>

        <form id="loginForm" action="process_login.php" method="post">
            <div class="input-group">
                <input type="text" id="username" name="username" placeholder="Tên đăng nhập" required 
                       value="<?php echo isset($_GET['prev_u']) ? htmlspecialchars($_GET['prev_u']) : ''; ?>">
            </div>
            <div class="input-group">
                <input type="password" id="password" name="password" placeholder="Mật khẩu" required>
                <i class="fa-solid fa-eye toggle-password" id="togglePassword"></i>
            </div>
            <button type="submit" class="btn-login">Đăng Nhập</button>
        </form>
    </div>

    <script>
        const togglePassword = document.querySelector('#togglePassword');
        const password = document.querySelector('#password');

        togglePassword.addEventListener('click', function (e) {
            // toggle the type attribute
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            // toggle the eye slash icon
            this.classList.toggle('fa-eye-slash');
        });
    </script>
</body>
</html>