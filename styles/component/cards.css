/* ==========================================
   KARTU JURUSAN & EKSTRAKURIKULER
   Desktop: carousel geser untuk keduanya.
   Mobile : Jurusan jadi vertical stack,
            Ekskul tetap carousel + peek effect.

   NB: nambah kartu baru gak perlu ubah file
   ini sama sekali -- cukup tambah data di
   pages/jurusan/ atau pages/ekskul/.
   ========================================== */

.jurusan-section {
    max-width: 1200px;
    margin: 40px auto;
}

.section-header {
    text-align: left;
    margin-bottom: 25px;
}

.section-header h2 {
    font-size: 2rem;
    color: #0f172a;
    font-weight: 700;
}

.section-header p {
    color: #64748b;
    font-size: 0.95rem;
}

/* Container untuk Scroll Horizontal halus */
.jurusan-slider-container {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 15px;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
}

/* Style Scrollbar Tipis */
.jurusan-slider-container::-webkit-scrollbar {
    height: 6px;
}

.jurusan-slider-container::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
}

.jurusan-slider {
    display: flex;
    gap: 24px;
    width: max-content;
}

/* Card Jurusan */
.jurusan-card {
    background: white;
    width: 320px;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid #e2e8f0;
    box-shadow: 0 4px 12px rgba(0,0,0,0.03);
    scroll-snap-align: start;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
}

.jurusan-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.08);
}

/* Banner Img dengan Halus / Rounded Corner */
.jurusan-banner {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 16px 16px 0 0;
}

.jurusan-body {
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
}

.jurusan-body h3 {
    font-size: 1.15rem;
    color: #0f172a;
    font-weight: 700;
    margin-bottom: 10px;
}

.jurusan-body p {
    color: #64748b;
    font-size: 0.88rem;
    line-height: 1.5;
    margin-bottom: 20px;
    flex: 1;
}

/* Teks Tebal (Selengkapnya) */
.btn-readmore {
    font-weight: 800;
    color: #064e3b;
    text-decoration: none;
    font-size: 0.9rem;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: color 0.2s;
    align-self: flex-start;
}

.btn-readmore:hover {
    color: #022c22;
}

/* ===== Grid Program Akademik (halaman Akademik) ===== */
.program-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 25px;
    max-width: 1200px;
    margin: 0 auto;
}

.program-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid #e2e8f0;
    box-shadow: 0 4px 12px rgba(0,0,0,0.03);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    text-align: left;
}

.program-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.08);
}

.program-banner {
    width: 100%;
    height: 160px;
    object-fit: cover;
    display: block;
}

.program-body { padding: 20px; }
.program-body h3 { font-size: 1.05rem; color: #0f172a; font-weight: 700; margin-bottom: 8px; }
.program-body p { color: #64748b; font-size: 0.86rem; line-height: 1.5; margin: 0; }

/* ===== Mobile ===== */
@media (max-width: 992px) {
    .program-grid { grid-template-columns: 1fr; gap: 16px; }
    .program-banner { height: 180px; }
    .section-header h2 { font-size: 1.4rem; }
    .jurusan-body h3 { font-size: 1rem; }
    .jurusan-body p { font-size: 0.85rem; }

    /* Jurusan Keahlian: tumpukan vertikal */
    .section-jurusan .jurusan-slider-container {
        overflow-x: visible;
        scroll-snap-type: none;
        padding-bottom: 0;
    }
    .section-jurusan .jurusan-slider {
        flex-direction: column;
        width: 100%;
        gap: 16px;
    }
    .section-jurusan .jurusan-card { width: 100%; }
    .section-jurusan .jurusan-banner { height: 160px; }

    /* Ekstrakurikuler: tetap carousel horizontal, dengan peek effect */
    .section-ekskul .jurusan-slider { gap: 14px; }
    .section-ekskul .jurusan-card {
        width: 84%;
        min-width: 84%;
        flex: 0 0 auto;
    }
}
