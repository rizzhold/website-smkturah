/* ============================================
   ANIMATIONS ENGINE
   ============================================ */

window.ANIMATION_CONFIG = window.ANIMATION_CONFIG || [];

(function () {
    'use strict';

    // ---------- 1. APPLY CONFIG ----------
    function applyConfig(config) {
        const els = document.querySelectorAll(config.selector);
        if (!els.length) return;

        els.forEach((el, i) => {
            if (el.hasAttribute('data-anim') && !config.force) return;

            el.setAttribute('data-anim', config.type || 'fade-up');

            const baseDelay = config.delay || 0;
            const stagger = config.stagger || 0;
            const totalDelay = baseDelay + stagger * i;

            if (totalDelay > 0) {
                el.style.setProperty('--anim-delay', totalDelay + 'ms');
            }

            if (config.duration) {
                el.style.transitionDuration = config.duration + 'ms';
            }
        });
    }

    // ---------- 2. COUNTER SETUP ----------
    // Scan elemen dan set data-counter dari textContent-nya
    function setupCounters() {
        // Hero stat (contoh: "80%")
        const heroStat = document.querySelector('.stat-box h3');
        if (heroStat && !heroStat.dataset.counter) {
            const txt = heroStat.textContent.trim();
            const match = txt.match(/^(\d+(?:\.\d+)?)(.*)$/);
            if (match) {
                heroStat.dataset.counter = match[1];
                heroStat.dataset.counterSuffix = match[2] || '';
                heroStat.textContent = '0' + (match[2] || '');
            }
        }

        // Dark stat items (di Profil: "30%", "95%")
        document.querySelectorAll('.dark-stat-item h4').forEach(el => {
            if (el.dataset.counter) return;
            const txt = el.textContent.trim();
            const match = txt.match(/^(\d+(?:\.\d+)?)(.*)$/);
            if (match) {
                el.dataset.counter = match[1];
                el.dataset.counterSuffix = match[2] || '';
                el.textContent = '0' + (match[2] || '');
            }
        });
    }

    // ---------- 3. COUNTER LOGIC ----------
    function startCounter(el) {
        if (el.dataset.counterDone === 'true') return;
        el.dataset.counterDone = 'true';

        const target = parseFloat(el.dataset.counter);
        const suffix = el.dataset.counterSuffix || '';
        const duration = parseInt(el.dataset.counterDuration || '1400', 10);
        const startTime = performance.now();

        el.classList.add('counter-anim');

        function tick(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutCubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = target * eased;

            el.textContent = (Number.isInteger(target)
                ? Math.round(value)
                : value.toFixed(1)) + suffix;

            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                el.textContent = (Number.isInteger(target)
                    ? target
                    : target.toFixed(1)) + suffix;
            }
        }

        requestAnimationFrame(tick);
    }

    // ---------- 4. INTERSECTION OBSERVER ----------
    let observer;

    function setupObserver() {
        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');

                    if (entry.target.dataset.counter) {
                        startCounter(entry.target);
                    }

                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -60px 0px'
        });

        document.querySelectorAll('[data-anim], [data-counter]').forEach(el => {
            observer.observe(el);
        });
    }

    // ---------- 5. NAVBAR SHRINK ----------
    function setupNavbar() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        let lastState = false;
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY > 30;
            if (scrolled !== lastState) {
                navbar.classList.toggle('is-scrolled', scrolled);
                lastState = scrolled;
            }
        }, { passive: true });
    }

    // ---------- 6. INIT ----------
    function init() {
        window.ANIMATION_CONFIG.forEach(applyConfig);
        setupCounters();          // ← SEBELUM observer, biar counter ke-detect
        setupObserver();
        setupNavbar();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose re-init
    window.reinitAnimations = function () {
        window.ANIMATION_CONFIG.forEach(applyConfig);
        setupCounters();
        if (observer) {
            document.querySelectorAll('[data-anim]:not(.is-visible)').forEach(el => {
                observer.observe(el);
            });
        }
    };
})();
