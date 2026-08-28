// Data penampung global jika belum ada
if (typeof JURUSAN_DATA === 'undefined') {
    window.JURUSAN_DATA = [];
}
if (typeof EKSKUL_DATA === 'undefined') {
    window.EKSKUL_DATA = [];
}

// Logika Navigasi Tab Utama (Navbar)
const navItems = document.querySelectorAll('.nav-item');
const pageSections = document.querySelectorAll('.page-section');

navItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const targetPage = this.getAttribute('data-page');

        pageSections.forEach(section => section.classList.remove('active-page'));
        navItems.forEach(nav => nav.classList.remove('active'));

        const targetEl = document.getElementById(targetPage);
        if (targetEl) targetEl.classList.add('active-page');
        this.classList.add('active');

        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Logika Switch Halaman via Tombol Hero/Lainnya
document.querySelectorAll('.switch-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('data-target');
        
        pageSections.forEach(section => section.classList.remove('active-page'));
        navItems.forEach(nav => nav.classList.remove('active'));

        const targetEl = document.getElementById(target);
        if (targetEl) targetEl.classList.add('active-page');
        
        const activeNav = document.querySelector(`.nav-item[data-page="${target}"]`);
        if (activeNav) activeNav.classList.add('active');
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Dynamic Renderer Jurusan & Ekskul
const detailContainer = document.getElementById('detail-jurusan');
const detailEkskulContainer = document.getElementById('detail-ekskul');

// 1. RENDER DETAIL JURUSAN (Struktur Asli Kamu yang Work)
function renderJurusanDetail(jurusanId) {
    const data = window.JURUSAN_DATA.find(item => item.id === jurusanId);

    if (!data) {
        console.error("Data jurusan tidak ditemukan untuk ID:", jurusanId);
        return;
    }

    detailContainer.innerHTML = `
        <div class="detail-jurusan-wrapper">
            <button class="btn-back">&larr; Kembali ke Beranda</button>
            
            <div class="detail-header">
                <span class="badge-jurusan">${data.badge || 'Program Keahlian'}</span>
                <h1>${data.name}</h1>
            </div>

            <img src="${data.image}" alt="${data.name}" class="detail-banner">

            <div class="detail-content">
                <h2>Deskripsi Program Keahlian</h2>
                <p>${data.fullDesc || data.description || ''}</p>

                <h2>Materi Utama yang Dipelajari</h2>
                <ul class="detail-list">
                    ${(data.materi || []).map(item => `<li><i class="fas fa-check-circle" style="color: #064e3b; margin-right: 8px;"></i>${item}</li>`).join('')}
                </ul>

                <h2>Prospek Kerja Alumni</h2>
                <ul class="detail-list">
                    ${(data.prospekKerja || data.prospek || []).map(item => `<li><i class="fas fa-briefcase" style="color: #064e3b; margin-right: 8px;"></i>${item}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;

    // Tampilkan Halaman Detail Jurusan
    pageSections.forEach(sec => sec.classList.remove('active-page'));
    navItems.forEach(nav => nav.classList.remove('active'));

    detailContainer.classList.add('active-page');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Listener Tombol Kembali Jurusan
    const backBtn = detailContainer.querySelector('.btn-back');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            detailContainer.classList.remove('active-page');
            document.getElementById('beranda').classList.add('active-page');
            const berandaNav = document.querySelector('.nav-item[data-page="beranda"]');
            if (berandaNav) berandaNav.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// 2. RENDER DETAIL EKSKUL (Mengikuti Alur Asli yang Work)
function renderEkskulDetail(ekskulId) {
    const data = window.EKSKUL_DATA.find(item => item.id === ekskulId);

    if (!data) {
        console.error("Data ekskul tidak ditemukan untuk ID:", ekskulId);
        return;
    }

    detailEkskulContainer.innerHTML = `
        <div class="detail-jurusan-wrapper">
            <button class="btn-back">&larr; Kembali ke Beranda</button>
            
            <div class="detail-header">
                <span class="badge-jurusan">${data.badge || 'Ekstrakurikuler'}</span>
                <h1>${data.name}</h1>
            </div>

            <img src="${data.image}" alt="${data.name}" class="detail-banner">

            <div class="detail-content">
                <h2>Deskripsi Ekstrakurikuler</h2>
                <p>${data.fullDesc || data.description || ''}</p>

                <h2>Kegiatan Utama</h2>
                <ul class="detail-list">
                    ${(data.kegiatan || []).map(item => `<li><i class="fas fa-check-circle" style="color: #064e3b; margin-right: 8px;"></i>${item}</li>`).join('')}
                </ul>

                <h2>Jadwal Latihan Rutin</h2>
                <p style="font-weight: 600; color: #065f46; background: #f0fdf4; padding: 12px 16px; border-radius: 10px; display: inline-block; border: 1px solid #bbf7d0; margin-top: 10px;">
                    <i class="far fa-clock"></i> ${data.jadwal || 'Akan diinfokan'}
                </p>
            </div>
        </div>
    `;

    // Tampilkan Halaman Detail Ekskul
    pageSections.forEach(sec => sec.classList.remove('active-page'));
    navItems.forEach(nav => nav.classList.remove('active'));

    detailEkskulContainer.classList.add('active-page');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Listener Tombol Kembali Ekskul
    const backBtn = detailEkskulContainer.querySelector('.btn-back');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            detailEkskulContainer.classList.remove('active-page');
            document.getElementById('beranda').classList.add('active-page');
            const berandaNav = document.querySelector('.nav-item[data-page="beranda"]');
            if (berandaNav) berandaNav.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Event Delegation Tombol Selengkapnya (Jurusan & Ekskul)
document.addEventListener('click', function(e) {
    const btnJurusan = e.target.closest('.btn-detail');
    if (btnJurusan) {
        e.preventDefault();
        const jurusanTarget = btnJurusan.getAttribute('data-jurusan');
        renderJurusanDetail(jurusanTarget);
        return;
    }

    const btnEkskul = e.target.closest('.btn-ekskul-detail');
    if (btnEkskul) {
        e.preventDefault();
        const ekskulTarget = btnEkskul.getAttribute('data-ekskul');
        renderEkskulDetail(ekskulTarget);
        return;
    }
});

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
}
