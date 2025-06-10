// js/main.js
'use strict';

// Tổ chức code vào một đối tượng App
const App = {
    // --- DOM Elements ---
    elements: {
        body: document.body,
        themeToggle: document.getElementById('theme-toggle'),
        menuToggle: document.getElementById('menu-toggle'),
        mainNav: document.querySelector('.main-nav'),
        scrollToTopBtn: document.getElementById('scroll-to-top'),
    },

    // --- Trạng thái ---
    state: {
        currentTheme: 'light',
    },

    // --- Icons ---
    icons: {
        moon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
        sun: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
    },

    // --- Hàm khởi tạo ---
    init() {
        this.loadTheme();
        this.updateTheme();
        this.attachEventListeners();
    },

    // --- Gắn sự kiện ---
    attachEventListeners() {
        this.elements.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.elements.menuToggle.addEventListener('click', () => this.toggleMenu());
        window.addEventListener('scroll', () => this.handleScroll());
        this.elements.scrollToTopBtn.addEventListener('click', () => this.scrollToTop());
    },

    // --- Xử lý Theme ---
    toggleTheme() {
        this.state.currentTheme = this.state.currentTheme === 'light' ? 'dark' : 'light';
        this.updateTheme();
        this.saveTheme();
    },
    updateTheme() {
        this.elements.body.classList.toggle('dark-theme', this.state.currentTheme === 'dark');
        this.elements.themeToggle.innerHTML = this.state.currentTheme === 'dark' ? this.icons.sun : this.icons.moon;
    },
    saveTheme() {
        localStorage.setItem('proSiteTheme', this.state.currentTheme);
    },
    loadTheme() {
        const savedTheme = localStorage.getItem('proSiteTheme');
        if (savedTheme) {
            this.state.currentTheme = savedTheme;
        }
    },

    // --- Xử lý Menu Mobile ---
    toggleMenu() {
        this.elements.menuToggle.classList.toggle('active');
        this.elements.mainNav.classList.toggle('active');
    },

    // --- Xử lý nút Scroll to Top ---
    handleScroll() {
        const shouldBeVisible = window.scrollY > 300;
        this.elements.scrollToTopBtn.classList.toggle('visible', shouldBeVisible);
    },
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Cuộn lên mượt mà
        });
    },
};

// Khởi chạy ứng dụng
document.addEventListener('DOMContentLoaded', () => App.init());