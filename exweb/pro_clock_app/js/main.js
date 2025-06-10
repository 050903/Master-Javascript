// js/main.js

// Sử dụng 'strict mode' để viết code an toàn hơn
'use strict';

// Tổ chức code vào một đối tượng App để tránh làm ô nhiễm global scope
const App = {
    // --- Thuộc tính lưu trữ trạng thái ---
    config: {
        is24HourFormat: true,
        theme: 'light'
    },

    // --- DOM Elements ---
    elements: {
        greeting: document.getElementById('greeting'),
        timeDisplay: document.getElementById('time-display'),
        dateDisplay: document.getElementById('date-display'),
        themeToggle: document.getElementById('theme-toggle'),
        formatToggle: document.getElementById('format-toggle'),
        themeIcon: document.getElementById('theme-icon')
    },

    // --- Hàm khởi tạo ứng dụng ---
    init() {
        this.loadConfig();
        this.updateTheme();
        this.updateClock();
        this.attachEventListeners();
        setInterval(() => this.updateClock(), 1000);
    },

    // --- Các hàm xử lý logic ---

    // Cập nhật đồng hồ và lời chào
    updateClock() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = this.formatTimeUnit(now.getMinutes());
        const seconds = this.formatTimeUnit(now.getSeconds());
        const day = this.formatTimeUnit(now.getDate());
        const month = this.formatTimeUnit(now.getMonth() + 1);
        const year = now.getFullYear();
        let ampm = '';

        // Xử lý định dạng 12h
        if (!this.config.is24HourFormat) {
            ampm = hours >= 12 ? ' PM' : ' AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // a hora 0 deve ser 12
        }

        // Cập nhật nội dung trên trang
        this.elements.timeDisplay.textContent = `${this.formatTimeUnit(hours)}:${minutes}:${seconds}${ampm}`;
        this.elements.dateDisplay.textContent = `Ngày ${day} tháng ${month} năm ${year}`;
        this.updateGreeting(now.getHours());
    },

    // Cập nhật lời chào theo buổi
    updateGreeting(hours) {
        let greetingText = '';
        if (hours < 12) {
            greetingText = 'Chào buổi sáng!';
        } else if (hours < 18) {
            greetingText = 'Chào buổi chiều!';
        } else {
            greetingText = 'Chào buổi tối!';
        }
        this.elements.greeting.textContent = greetingText;
    },

    // Thêm số 0 vào trước các số < 10
    formatTimeUnit(unit) {
        return unit < 10 ? '0' + unit : unit;
    },

    // Gắn các sự kiện cho nút bấm
    attachEventListeners() {
        this.elements.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.elements.formatToggle.addEventListener('click', () => this.toggleFormat());
    },

    // Chuyển đổi chế độ Sáng/Tối
    toggleTheme() {
        this.config.theme = this.config.theme === 'light' ? 'dark' : 'light';
        this.updateTheme();
        this.saveConfig();
    },

    // Cập nhật giao diện theo theme
    updateTheme() {
        document.body.classList.toggle('dark-theme', this.config.theme === 'dark');
        const moonIcon = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
        const sunIcon = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
        this.elements.themeIcon.innerHTML = this.config.theme === 'dark' ? sunIcon : moonIcon;
    },

    // Chuyển đổi định dạng 12h/24h
    toggleFormat() {
        this.config.is24HourFormat = !this.config.is24HourFormat;
        this.elements.formatToggle.textContent = this.config.is24HourFormat ? '24H' : '12H';
        this.updateClock(); // Cập nhật lại đồng hồ ngay lập tức
        this.saveConfig();
    },

    // --- Lưu và tải cài đặt từ localStorage ---
    saveConfig() {
        localStorage.setItem('proClockConfig', JSON.stringify(this.config));
    },

    loadConfig() {
        const savedConfig = localStorage.getItem('proClockConfig');
        if (savedConfig) {
            this.config = JSON.parse(savedConfig);
            // Cập nhật lại nút bấm theo config đã lưu
            this.elements.formatToggle.textContent = this.config.is24HourFormat ? '24H' : '12H';
        }
    }
};

// Khởi chạy ứng dụng khi trang đã tải xong
document.addEventListener('DOMContentLoaded', () => App.init());