/* ============================================
   NAVBAR & NAVIGASI
   - Anchor scroll (SPA single-page scroll)
   - Nav pill animation
   - Scroll spy (deteksi section aktif)
   - Mobile menu toggle
   ============================================ */

const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-item');
const mobileMenu = document.getElementById('mobile-menu');
const navOverlay = document.getElementById('nav-overlay');

/* ------------------------------------------
   NAV PILL
   ------------------------------------------ */
function updateNavPill() {
    if (!navLinks) return;
    if (window.innerWidth <= 992) return;

    let pill = navLinks.querySelector('.nav-pill');
    if (!pill) {
        pill = document.createElement('span');
        pill.className = 'nav-pill';
        pill.setAttribute('aria-hidden', 'true');
        navLinks.prepend(pill);
    }

    const active = navLinks.querySelector('.nav-item.active');
    if (!active) {
        pill.classList.remove('is-ready');
        return;
    }

    requestAnimationFrame(() => {
        const left   = active.offsetLeft;
        const top    = active.offsetTop;
        const width  = active.offsetWidth;
        const height = active.offsetHeight;

        pill.style.transform = `translate(${left}px, ${top}px)`;
        pill.style.width  = width + 'px';
        pill.style.height = height + 'px';
        pill.classList.add('is-ready');
    });
}

/* ------------------------------------------
   ANCHOR SCROLL (smooth via Lenis)
   ------------------------------------------ */
function smoothScrollTo(targetId) {
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    const offset = 90; // tinggi navbar
    const top = targetEl.getBoundingClientRect().top + window.scrollY - offset;

    if (window.lenis) {
        window.lenis.scrollTo(top, { duration: 1.2 });
    } else {
        window.scrollTo({ top: top, behavior: 'smooth' });
    }
}

navItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-page') || this.getAttribute('href')?.replace('#', '');
        if (!targetId) return;

        navItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');

        updateNavPill();
        smoothScrollTo(targetId);
        closeMobileMenu();
    });
});

/* ------------------------------------------
   SCROLL SPY
   Cuma deteksi section utama (bukan detail page)
   ------------------------------------------ */
function setupScrollSpy() {
    const sections = document.querySelectorAll('.page-section[id]:not(#detail-jurusan):not(#detail-ekskul)');
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                const matchingNav = document.querySelector(`.nav-item[data-page="${id}"]`);
                if (matchingNav) {
                    navItems.forEach(n => n.classList.remove('active'));
                    matchingNav.classList.add('active');
                    updateNavPill();
                }
            }
        });
    }, {
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0
    });

    sections.forEach(section => observer.observe(section));
}

/* ------------------------------------------
   MOBILE MENU
   ------------------------------------------ */
function closeMobileMenu() {
    if (navLinks) navLinks.classList.remove('active');
    if (navOverlay) navOverlay.classList.remove('active');
}

if (mobileMenu) {
    mobileMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        if (navOverlay) navOverlay.classList.toggle('active');
    });
}

if (navOverlay) {
    navOverlay.addEventListener('click', closeMobileMenu);
}

/* ------------------------------------------
   INIT
   ------------------------------------------ */
window.addEventListener('resize', updateNavPill);

window.addEventListener('load', () => {
    setTimeout(() => {
        updateNavPill();
        setupScrollSpy();
    }, 200);
});

if (document.fonts) {
    document.fonts.ready.then(() => {
        setTimeout(updateNavPill, 100);
    });
}
