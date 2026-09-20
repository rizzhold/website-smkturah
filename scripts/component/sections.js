/* ============================================
   SECTION HELPER
   - Toggle "Baca Selengkapnya" (collapsible)
   - Auto count jurusan & ekskul di section-note
   ============================================ */

document.addEventListener('click', function(e) {
    const btn = e.target.closest('.btn-toggle-text');
    if (!btn) return;

    const wrapper = btn.parentElement;
    const textEl = wrapper.querySelector('.collapsible-text');
    if (!textEl) return;

    const expanded = textEl.classList.toggle('expanded');
    btn.innerHTML = expanded
        ? 'Tutup <i class="fas fa-chevron-up"></i>'
        : 'Baca Selengkapnya <i class="fas fa-chevron-down"></i>';
});

function setupAutoCount() {
    const jurusanCards = document.querySelectorAll('.section-jurusan .jurusan-card');
    const ekskulCards   = document.querySelectorAll('.section-ekskul .jurusan-card');

    const countJurusanEl = document.getElementById('count-jurusan');
    const countEkskulEl  = document.getElementById('count-ekskul');

    if (countJurusanEl) countJurusanEl.textContent = jurusanCards.length;
    if (countEkskulEl)  countEkskulEl.textContent  = ekskulCards.length;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupAutoCount);
} else {
    setupAutoCount();
}

