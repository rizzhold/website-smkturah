window.ANIMATION_CONFIG = window.ANIMATION_CONFIG || [];

window.ANIMATION_CONFIG.push(
    // Heading utama section Galeri
    {
        selector: '.section-galeri > h2',
        type: 'fade-up'
    },
    {
        selector: '.section-galeri > p',
        type: 'fade-up',
        delay: 100
    },

    // Header tiap kategori (01, 02, 03)
    {
        selector: '.galeri-kategori-header',
        type: 'fade-up',
        stagger: 120,
        duration: 600
    },

    // Kategori 01 — Masonry
    {
        selector: '.galeri-item',
        type: 'zoom-in',
        stagger: 140,
        duration: 800
    },

    // Kategori 02 — Featured (main + mini)
    {
        selector: '.galeri-featured-main',
        type: 'zoom-in',
        duration: 800
    },
    {
        selector: '.galeri-featured-mini',
        type: 'fade-up',
        stagger: 120,
        duration: 700
    },

    // Kategori 03 — Editorial
    {
        selector: '.galeri-editorial-item',
        type: 'fade-up',
        stagger: 140,
        duration: 700
    }
);
