window.ANIMATION_CONFIG = window.ANIMATION_CONFIG || [];

// Berita dirender dinamis oleh script.js, jadi kita pakai hook
// yang dipanggil ulang setelah render berita selesai.
window.ANIMATION_CONFIG.push({
    selector: '.berita-card',
    type: 'fade-up',
    stagger: 120,
    duration: 700
});
