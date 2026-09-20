/* ============================================
   AKADEMIK — Render Slider Card Jurusan & Ekskul
   Card di-render dari JURUSAN_DATA & EKSKUL_DATA.
   ============================================ */

/* ------------------------------------------
   TEMPLATE CARD
   ------------------------------------------ */
function buatCardJurusan(data) {
    const nama = data.name || data.nama || '';
    const desc = data.shortDesc || data.description || '';

    return `
        <div class="jurusan-card">
            <img src="${data.image}" alt="${nama}" class="jurusan-banner">
            <div class="jurusan-body">
                <h3>${nama}</h3>
                <p>${desc}</p>
                <button class="btn-readmore btn-detail" data-jurusan="${data.id}">
                    Selengkapnya &rarr;
                </button>
            </div>
        </div>
    `;
}

function buatCardEkskul(data) {
    const nama = data.name || data.nama || '';
    const desc = data.shortDesc || data.description || '';

    return `
        <div class="jurusan-card">
            <img src="${data.image}" alt="${nama}" class="jurusan-banner">
            <div class="jurusan-body">
                <h3>${nama}</h3>
                <p>${desc}</p>
                <button class="btn-readmore btn-ekskul-detail" data-ekskul="${data.id}">
                    Selengkapnya &rarr;
                </button>
            </div>
        </div>
    `;
}

/* ------------------------------------------
   RENDER JURUSAN SLIDER
   ------------------------------------------ */
function renderJurusanSlider() {
    const slider = document.getElementById('jurusan-slider');
    if (!slider || !window.JURUSAN_DATA) return;

    slider.innerHTML = window.JURUSAN_DATA
        .filter(item => !item.hide)
        .map(buatCardJurusan)
        .join('');
}

/* ------------------------------------------
   RENDER EKSKUL SLIDER
   ------------------------------------------ */
function renderEkskulSlider() {
    const slider = document.getElementById('ekskul-slider');
    if (!slider || !window.EKSKUL_DATA) return;

    slider.innerHTML = window.EKSKUL_DATA
        .filter(item => !item.hide)
        .map(buatCardEkskul)
        .join('');
}

/* ------------------------------------------
   INIT
   ------------------------------------------ */
renderJurusanSlider();
renderEkskulSlider();
