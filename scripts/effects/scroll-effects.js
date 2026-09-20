/* ============================================
   SCROLL EFFECTS
   - Smooth scroll (Lenis)
   - Scroll progress bar
   - Hero parallax + zoom-out (auto-reset setelah hero lewat)
   ============================================ */

(function () {
    'use strict';

    // ============================================
    // 1. SMOOTH SCROLL (Lenis)
    // ============================================
    let lenis = null;

    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.15,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            smoothTouch: false,
            wheelMultiplier: 1,
            touchMultiplier: 1.5,
            infinite: false
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        const nativeScrollTo = window.scrollTo.bind(window);
        window.scrollTo = function (opts, y) {
            if (typeof opts === 'object' && opts !== null && lenis) {
                if (typeof opts.top === 'number') {
                    lenis.scrollTo(opts.top, {
                        duration: 1.0,
                        easing: (t) => 1 - Math.pow(1 - t, 3)
                    });
                    return;
                }
            }
            nativeScrollTo(opts, y);
        };

        window.lenis = lenis;
        window.smoothScrollTo = (target, opts = {}) =>
            lenis.scrollTo(target, { duration: 1.0, ...opts });
    }

    // ============================================
    // 2. SCROLL PROGRESS BAR
    // ============================================
    const progressBar = document.getElementById('scroll-progress');

    function updateProgress() {
        if (!progressBar) return;
        const h = document.documentElement;
        const scrollTop = h.scrollTop || document.body.scrollTop;
        const scrollHeight = h.scrollHeight - h.clientHeight;
        const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        progressBar.style.width = pct + '%';
    }

    // ============================================
    // 3. HERO PARALLAX + ZOOM-OUT
    // Cuma aktif saat hero masih kelihatan.
    // Begitu hero lewat, transform-nya di-reset.
    // ============================================
    const heroSection = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image-container');
    const heroText = document.querySelector('.hero-text');

    function resetHeroTransform() {
        if (heroImage) heroImage.style.transform = '';
        if (heroText) {
            heroText.style.transform = '';
            heroText.style.opacity = '';
        }
    }

    function updateHeroParallax() {
        // Cuma di desktop
        if (window.innerWidth < 993) return;
        if (!heroSection || (!heroImage && !heroText)) return;

        const rect = heroSection.getBoundingClientRect();

        // Kalau hero udah lewat (scroll melebihi tinggi hero), reset dan skip
        if (rect.bottom < 0) {
            resetHeroTransform();
            return;
        }

        const scrolled = window.scrollY;
        const vh = window.innerHeight;
        const progress = Math.min(scrolled / vh, 1); // 0..1

        if (heroImage) {
            const ty = scrolled * 0.28;
            const scale = 1 + progress * 0.08;
            heroImage.style.transform = `translate3d(0, ${ty}px, 0) scale(${scale})`;
        }

        if (heroText) {
            const ty = -scrolled * 0.18;
            const opacity = Math.max(1 - progress * 1.3, 0);
            heroText.style.transform = `translate3d(0, ${ty}px, 0)`;
            heroText.style.opacity = opacity;
        }
    }

    // ============================================
    // 4. MASTER RAF LOOP
    // ============================================
    let ticking = false;

    function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            updateProgress();
            updateHeroParallax();
            ticking = false;
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    if (lenis) {
        lenis.on('scroll', () => {
            updateProgress();
            updateHeroParallax();
        });
    }

    onScroll();
})();
