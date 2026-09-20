window.ANIMATION_CONFIG = window.ANIMATION_CONFIG || [];

window.ANIMATION_CONFIG.push(
    {
        selector: '.prestasi-card',
        type: 'zoom-in',
        stagger: 130,
        duration: 700
    },
    {
        selector: '.section-prestasi > h2',
        type: 'fade-up'
    },
    {
        selector: '.section-prestasi > p',
        type: 'fade-up',
        delay: 100
    }
);
