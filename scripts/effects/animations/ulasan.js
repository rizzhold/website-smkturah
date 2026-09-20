window.ANIMATION_CONFIG = window.ANIMATION_CONFIG || [];

window.ANIMATION_CONFIG.push(
    {
        selector: '.ulasan-section > h2',
        type: 'fade-up'
    },
    {
        selector: '.ulasan-section > p',
        type: 'fade-up',
        delay: 100
    },
    {
        selector: '.ulasan-overall',
        type: 'fade-up',
        delay: 150
    },
    {
        selector: '.ulasan-form-card',
        type: 'fade-right',
        delay: 200
    },
    {
        selector: '.ulasan-list-wrapper',
        type: 'fade-left',
        delay: 200
    }
);
