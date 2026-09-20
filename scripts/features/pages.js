/* ============================================
   DETAIL JURUSAN & EKSKUL — PAGE OVERLAY
   ============================================ */

const detailOverlay = document.getElementById('detail-overlay');
const detailOverlayContent = document.getElementById('detail-overlay-content');

/* ------------------------------------------
   BUKA OVERLAY
   ------------------------------------------ */
function openDetailOverlay(htmlContent) {
    detailOverlayContent.innerHTML = htmlContent;
    detailOverlay.classList.add('is-open');
    detailOverlay.scrollTop = 0;
    document.body.style.overflow = 'hidden';
}

/* ------------------------------------------
   TUTUP OVERLAY
   ------------------------------------------ */
function closeDetailOverlay() {
    detailOverlay.classList.remove('is-open');
    document.body.style.overflow = '';

    setTimeout(() => {
        if (!detailOverlay.classList.contains('is-open')) {
            detailOverlayContent.innerHTML = '';
        }
    }, 350);
}
window.goBackToBeranda = closeDetailOverlay;

/* ------------------------------------------
   ESC UNTUK TUTUP
   ------------------------------------------ */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && detailOverlay.classList.contains('is-open')) {
        closeDetailOverlay();
    }
});

/* ------------------------------------------
   AUTO-CLOSE KALAU NAV DIKLIK
   ------------------------------------------ */
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        if (detailOverlay.classList.contains('is-open')) {
            closeDetailOverlay();
        }
    });
});

/* ------------------------------------------
   RENDER GALERI FOTO 3 KOLOM
   ------------------------------------------ */
function renderGaleriFotos(photos, fallbackName) {
    if (!photos || !photos.length) return '';

    return `
        <h2><i class="fas fa-images"></i> Galeri Kegiatan</h2>
        <div class="detail-galeri-grid">
            ${photos.map(p => `
                <figure class="detail-galeri-item">
                    <img src="${p.src}" alt="${p.tag || fallbackName}" loading="lazy">
                    ${p.tag ? `<figcaption class="detail-galeri-tag">${p.tag}</figcaption>` : ''}
                </figure>
            `).join('')}
        </div>
    `;
}

/* ------------------------------------------
   RENDER DETAIL JURUSAN
   ------------------------------------------ */
function renderJurusanDetail(jurusanId) {
    const data = window.JURUSAN_DATA.find(item => item.id === jurusanId);
    if (!data) return;

    let photos = data.photos || [];
    if (!photos.length && window.AKADEMIK_DATA) {
        const akad = window.AKADEMIK_DATA.find(a => a.id === jurusanId);
        if (akad && akad.photos) photos = akad.photos;
    }

    const html = `
        <div class="detail-jurusan-wrapper">
            <button class="btn-back" onclick="goBackToBeranda()">
                <i class="fas fa-arrow-left"></i> Kembali
            </button>

            <div class="detail-hero">
                <div class="detail-hero-media">
                    <span class="badge-jurusan">${data.badge || 'Program Keahlian'}</span>
                    <img src="${data.image}" alt="${data.name}" class="detail-hero-img">
                </div>
                <div class="detail-hero-content">
                    <h1>${data.name}</h1>
                    <p class="detail-hero-desc">${data.fullDesc || data.shortDesc || data.description || ''}</p>
                </div>
            </div>

            <div class="detail-content">
                <h2><i class="fas fa-book-open"></i> Materi Utama yang Dipelajari</h2>
                <div class="kegiatan-grid">
                    ${(data.materi || []).map((item, i) => `
                        <div class="kegiatan-card">
                            <span class="kegiatan-num">${String(i + 1).padStart(2, '0')}</span>
                            <p>${item}</p>
                        </div>
                    `).join('')}
                </div>

                <h2><i class="fas fa-briefcase"></i> Prospek Kerja Alumni</h2>
                <div class="kegiatan-grid">
                    ${(data.prospekKerja || data.prospek || []).map((item, i) => `
                        <div class="kegiatan-card">
                            <span class="kegiatan-num">${String(i + 1).padStart(2, '0')}</span>
                            <p>${item}</p>
                        </div>
                    `).join('')}
                </div>

                ${renderGaleriFotos(photos, data.name)}
            </div>
        </div>
    `;

    openDetailOverlay(html);
}

/* ------------------------------------------
   RENDER DETAIL EKSKUL
   ------------------------------------------ */
function renderEkskulDetail(ekskulId) {
    const data = window.EKSKUL_DATA.find(item => item.id === ekskulId);
    if (!data) return;

    let photos = data.photos || [];
    if (!photos.length && window.EKSKUL_DETAIL_DATA) {
        const eks = window.EKSKUL_DETAIL_DATA.find(a => a.id === ekskulId);
        if (eks && eks.photos) photos = eks.photos;
    }

    const html = `
        <div class="detail-jurusan-wrapper">
            <button class="btn-back" onclick="goBackToBeranda()">
                <i class="fas fa-arrow-left"></i> Kembali
            </button>

            <div class="detail-hero">
                <div class="detail-hero-media">
                    <span class="badge-jurusan">${data.badge || 'Ekstrakurikuler'}</span>
                    <img src="${data.image}" alt="${data.name}" class="detail-hero-img">
                </div>
                <div class="detail-hero-content">
                    <h1>${data.name}</h1>
                    <p class="detail-hero-desc">${data.fullDesc || data.shortDesc || data.description || ''}</p>

                    <div class="detail-hero-meta">
                        <div class="meta-chip">
                            <i class="far fa-clock"></i>
                            <div class="meta-chip-text">
                                <span class="meta-label">Jadwal Latihan</span>
                                <span class="meta-value">${data.jadwal || 'Akan diinfokan'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="detail-content">
                <h2><i class="fas fa-list-check"></i> Kegiatan Utama</h2>
                <div class="kegiatan-grid">
                    ${(data.kegiatan || []).map((item, i) => `
                        <div class="kegiatan-card">
                            <span class="kegiatan-num">${String(i + 1).padStart(2, '0')}</span>
                            <p>${item}</p>
                        </div>
                    `).join('')}
                </div>

                ${renderGaleriFotos(photos, data.name)}
            </div>
        </div>
    `;

    openDetailOverlay(html);
}

/* ------------------------------------------
   EVENT LISTENER GLOBAL
   ------------------------------------------ */
document.addEventListener('click', function(e) {
    const btnJurusan = e.target.closest('.btn-detail');
    if (btnJurusan) {
        e.preventDefault();
        renderJurusanDetail(btnJurusan.getAttribute('data-jurusan'));
        return;
    }

    const btnEkskul = e.target.closest('.btn-ekskul-detail');
    if (btnEkskul) {
        e.preventDefault();
        renderEkskulDetail(btnEkskul.getAttribute('data-ekskul'));
        return;
    }
});
