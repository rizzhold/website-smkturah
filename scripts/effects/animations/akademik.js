window.ANIMATION_CONFIG = window.ANIMATION_CONFIG || [];

window.ANIMATION_CONFIG.push(
    // Heading & subteks section Jurusan
    {
        selector: '.section-jurusan .section-header h2',
        type: 'fade-up'
    },
    {
        selector: '.section-jurusan .section-header p',
        type: 'fade-up',
        delay: 100
    },

    // Heading & subteks section Ekskul
    {
        selector: '.section-ekskul .section-header h2',
        type: 'fade-up'
    },
    {
        selector: '.section-ekskul .section-header p',
        type: 'fade-up',
        delay: 100
    },

    // Card jurusan & ekskul (di-render dari JS)
    {
        selector: '.jurusan-card',
        type: 'fade-up',
        stagger: 110,
        duration: 700
    },

    // Section note hijau
    {
        selector: '.section-note',
        type: 'fade-up',
        duration: 600
    }
);
