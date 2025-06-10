function checklogin() {
    var form = document.getElementById('flogin');
    var usernameInput = form.u;
    var passwordInput = form.p;
    var statusMessageDiv = document.getElementById('statusMessage');

    // Xóa bỏ thông báo lỗi PHP nếu có (khi người dùng bắt đầu nhập)
    var phpErrorMessage = document.querySelector('.error-message');
    if (phpErrorMessage) {
        phpErrorMessage.remove(); 
    }
    var phpSuccessMessage = document.querySelector('.message');
    if (phpSuccessMessage && phpSuccessMessage.textContent === 'Đăng nhập thành công!') {
        phpSuccessMessage.remove();
    }


    statusMessageDiv.textContent = ''; // Xóa thông báo JS trước đó
    statusMessageDiv.className = 'message';

    if (usernameInput.value.trim() === '') {
        // alert("Bạn chưa nhập username"); // Có thể bỏ alert để UX mượt hơn
        usernameInput.focus();
        statusMessageDiv.textContent = 'Lỗi JS: Bạn chưa nhập username.';
        statusMessageDiv.className = 'error-message';
        return false;
    }

    if (passwordInput.value.trim() === '') {
        // alert("Bạn chưa nhập password"); // Có thể bỏ alert để UX mượt hơn
        passwordInput.focus();
        statusMessageDiv.textContent = 'Lỗi JS: Bạn chưa nhập password.';
        statusMessageDiv.className = 'error-message';
        return false;
    }

    // Nếu JS kiểm tra thành công, cho phép form submit đến process_login.php
    statusMessageDiv.textContent = 'Đang gửi dữ liệu đến server...';
    statusMessageDiv.className = 'message'; // Đặt lại class thành 'message'

    return true; // Cho phép form submit
}