// js/countdown.js
'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const countdownElement = document.getElementById('countdown');
    
    // Kiểm tra xem phần tử countdown có tồn tại trên trang không
    if (countdownElement) {
        const destinationURL = 'index.html';
        let secondsRemaining = parseInt(countdownElement.textContent) || 5;

        const timer = setInterval(() => {
            secondsRemaining--;
            countdownElement.textContent = secondsRemaining;

            if (secondsRemaining <= 0) {
                clearInterval(timer);
                window.location.href = destinationURL;
            }
        }, 1000);
    }
});
