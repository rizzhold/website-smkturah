/* ============================================
   BERITA TERKINI
   - Render kartu dari window.BERITA_DATA
   - Toggle "Baca Selengkapnya"
   - Navigasi carousel prev/next
   ============================================ */

function renderBeritaCards() {
    const track = document.getElementById('berita-track');
    const template = document.getElementById('berita-card-template');
    if (!track || !template || !window.BERITA_DATA) return;

    track.innerHTML = '';

    window.BERITA_DATA.forEach(b => {
        const node = template.content.cloneNode(true);

        const img = node.querySelector('.berita-banner');
        img.src = b.image;
        img.alt = b.title;

        node.querySelector('.berita-date-text').textContent = b.date;
        node.querySelector('.berita-title').textContent = b.title;

        const contentInner = node.querySelector('.berita-full-content-inner');
        if (contentInner) {
            const contentArr = b.content && b.content.length
                ? b.content
                : [b.shortDesc || 'Konten berita belum tersedia.'];
            contentInner.innerHTML = contentArr.map(p => `<p>${p}</p>`).join('');
        }

        const btn = node.querySelector('.berita-readmore');
        if (btn) btn.setAttribute('data-berita-id', b.id);

        track.appendChild(node);
    });

    setupBeritaNav();
    setupBeritaToggle();

    if (typeof window.reinitAnimations === 'function') {
        window.reinitAnimations();
    }
}

function setupBeritaToggle() {
    const track = document.getElementById('berita-track');
    if (!track || track.dataset.toggleReady === 'true') return;

    track.dataset.toggleReady = 'true';

    track.addEventListener('click', (e) => {
        const btn = e.target.closest('.berita-readmore');
        if (!btn) return;

        e.preventDefault();

        const card = btn.closest('.berita-card');
        if (!card) return;

        const isExpanded = card.classList.toggle('is-expanded');

        btn.innerHTML = isExpanded
            ? 'Tutup <span class="arrow">&uarr;</span>'
            : 'Baca Selengkapnya <span class="arrow">&rarr;</span>';

        const wrapper = document.querySelector('.berita-track-wrapper');
        const prevBtn = document.querySelector('.berita-nav-prev');
        const nextBtn = document.querySelector('.berita-nav-next');
        if (wrapper && prevBtn && nextBtn) {
            const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
            prevBtn.disabled = wrapper.scrollLeft <= 4;
            nextBtn.disabled = wrapper.scrollLeft >= maxScroll - 4;
        }
    });
}

function setupBeritaNav() {
    const wrapper = document.querySelector('.berita-track-wrapper');
    const prevBtn = document.querySelector('.berita-nav-prev');
    const nextBtn = document.querySelector('.berita-nav-next');
    if (!wrapper || !prevBtn || !nextBtn) return;

    const step = () => {
        const card = wrapper.querySelector('.berita-card');
        if (!card) return wrapper.clientWidth;
        const track = wrapper.querySelector('.berita-track');
        const gap = parseFloat(getComputedStyle(track).gap) || 24;
        return card.offsetWidth + gap;
    };

    const updateBtns = () => {
        const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
        prevBtn.disabled = wrapper.scrollLeft <= 4;
        nextBtn.disabled = wrapper.scrollLeft >= maxScroll - 4;
    };

    prevBtn.addEventListener('click', () => {
        wrapper.scrollBy({ left: -step(), behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
        wrapper.scrollBy({ left: step(), behavior: 'smooth' });
    });

    wrapper.addEventListener('scroll', updateBtns, { passive: true });
    window.addEventListener('resize', updateBtns);
    updateBtns();
}

renderBeritaCards();
