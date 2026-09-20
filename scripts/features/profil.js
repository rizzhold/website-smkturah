/* ============================================
   PROFIL — Render Guru & Kepala Sekolah
   ============================================ */

function handleFotoGuruError(imgEl) {
    const icon = document.createElement('i');
    icon.className = 'fas fa-user-circle feature-icon';
    imgEl.replaceWith(icon);
}
window.handleFotoGuruError = handleFotoGuruError;

function renderGuruCards() {
    const guruGrid = document.getElementById('guru-grid');
    const kepsekContainer = document.getElementById('kepsek-container');
    if (!guruGrid || !window.GURU_DATA) return;

    const kepsekList = window.GURU_DATA.filter(g =>
        (g.jabatan || '').toLowerCase().includes('kepala sekolah')
    );
    const guruLain = window.GURU_DATA.filter(g =>
        !(g.jabatan || '').toLowerCase().includes('kepala sekolah')
    );

    if (kepsekContainer) {
        kepsekContainer.innerHTML = kepsekList.map(g => `
            <div class="feature-card feature-card--kepsek">
                <img src="${g.foto}" alt="${g.nama}" class="feature-photo" onerror="handleFotoGuruError(this)">
                <h3>${g.nama}${g.gelar ? ', ' + g.gelar : ''}</h3>
                <span class="guru-jabatan">${g.jabatan || ''}</span>
                <p>${g.keterangan || ''}</p>
            </div>
        `).join('');
    }

    guruGrid.innerHTML = guruLain.map(g => `
        <div class="feature-card">
            <img src="${g.foto}" alt="${g.nama}" class="feature-photo" onerror="handleFotoGuruError(this)">
            <h3>${g.nama}${g.gelar ? ', ' + g.gelar : ''}</h3>
            <span class="guru-jabatan">${g.jabatan || ''}</span>
            <p>${g.keterangan || ''}</p>
        </div>
    `).join('');
}

renderGuruCards();
