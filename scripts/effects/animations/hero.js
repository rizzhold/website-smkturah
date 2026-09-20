window.ANIMATION_CONFIG = window.ANIMATION_CONFIG || [];

// Hero udah auto-animate via CSS (lihat animations.css),
// di sini kita daftarkan elemen2 lain di dalam hero
window.ANIMATION_CONFIG.push(
    {
        selector: '.dark-section',
        type: 'fade-up',
        duration: 700
    }
);
