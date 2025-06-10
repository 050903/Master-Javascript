<?php
// Thay "admin123" bằng mật khẩu bạn muốn sử dụng
$passwordToHash = "admin123";

$hashedPassword = password_hash($passwordToHash, PASSWORD_DEFAULT);

echo "Mật khẩu gốc: " . $passwordToHash . "<br>";
echo "Chuỗi hash mới của bạn là: <br>";
echo "<strong>" . $hashedPassword . "</strong>";
?>