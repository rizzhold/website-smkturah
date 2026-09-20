/* ============================================
   MODAL PENDAFTARAN (PPDB)
   - Buka/tutup modal
   - Submit form
   - Tampilkan halaman sukses
   ============================================ */

function setupDaftarModal() {
    const overlay = document.getElementById('daftar-modal-overlay');
    const daftarBtn = document.getElementById('daftar-btn');
    const closeBtn = document.getElementById('daftar-modal-close');
    const successClose = document.getElementById('btn-success-close');
    const form = document.getElementById('daftar-form');
    const formWrapper = document.getElementById('daftar-form-wrapper');
    const successWrapper = document.getElementById('daftar-success-wrapper');
    const successNama = document.getElementById('daftar-success-nama');

    if (!overlay || !daftarBtn) return;

    function openModal() {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (window.lenis) window.lenis.stop();

        if (formWrapper) formWrapper.style.display = '';
        if (successWrapper) successWrapper.style.display = 'none';
        if (form) form.reset();

        setTimeout(() => {
            const firstInput = document.getElementById('daftar-nama');
            if (firstInput) firstInput.focus();
        }, 350);
    }

    function closeModal() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';

        if (window.lenis) window.lenis.start();
    }

    daftarBtn.addEventListener('click', openModal);

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (successClose) successClose.addEventListener('click', closeModal);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeModal();
        }
    });

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const nama = document.getElementById('daftar-nama').value.trim();
            const email = document.getElementById('daftar-email').value.trim();
            const wa = document.getElementById('daftar-wa').value.trim();
            const jurusan = document.getElementById('daftar-jurusan').value;
            const pesan = document.getElementById('daftar-pesan').value.trim();

            if (!nama || !email || !wa || !jurusan) {
                alert('Mohon lengkapi semua kolom bertanda * ya!');
                return;
            }

            window.PENDAFTARAN_DATA.push({
                nama, email, wa, jurusan, pesan,
                tanggal: new Date().toISOString()
            });

            console.log('📝 Pendaftaran baru:', { nama, email, wa, jurusan, pesan });
            console.log('📊 Total pendaftar:', window.PENDAFTARAN_DATA.length);

            if (successNama) successNama.textContent = nama;
            if (formWrapper) formWrapper.style.display = 'none';
            if (successWrapper) successWrapper.style.display = '';
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupDaftarModal);
} else {
    setupDaftarModal();
}
