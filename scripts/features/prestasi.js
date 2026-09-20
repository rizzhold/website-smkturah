/* ============================================
   PRESTASI — Toggle "Lihat Selengkapnya"
   Klik tombol -> buka 3 card tambahan (smooth).
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btn-prestasi-toggle');
    const extra = document.getElementById('prestasi-extra');
    if (!btn || !extra) return;

    btn.addEventListener('click', () => {
        const isOpen = extra.classList.toggle('is-open');
        btn.classList.toggle('is-open', isOpen);

        btn.innerHTML = isOpen
            ? 'Tutup <i class="fas fa-chevron-up"></i>'
            : 'Lihat Selengkapnya <i class="fas fa-chevron-down"></i>';
    });
});
