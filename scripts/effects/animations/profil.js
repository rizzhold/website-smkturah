window.ANIMATION_CONFIG = window.ANIMATION_CONFIG || [];

window.ANIMATION_CONFIG.push(
    // Visi & Misi
    {
        selector: '.visi-misi-section > h2',
        type: 'fade-up'
    },
    {
        selector: '.visi-misi-card',
        type: 'fade-up',
        stagger: 150
    },
    // Sejarah
    {
        selector: '.sejarah-section > h2',
        type: 'fade-up'
    },
    {
        selector: '.sejarah-card',
        type: 'fade-up',
        delay: 100
    },
    {
        selector: '.timeline li',
        type: 'fade-left',
        stagger: 90
    },
    // Dewan Guru
    {
        selector: '.guru-section > h2',
        type: 'fade-up'
    },
    {
        selector: '.guru-section > p',
        type: 'fade-up',
        delay: 100
    },
    {
        selector: '.guru-section .feature-card',
        type: 'fade-up',
        stagger: 80
    }
);
