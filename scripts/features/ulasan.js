/* ============================================
   ULASAN & TESTIMONI
   - Render daftar ulasan
   - Overall rating
   - Input rating bintang
   - Form submit
   ============================================ */

let ratingTerpilih = 0;

function formatTanggalUlasan(isoDate) {
    try {
        const d = new Date(isoDate);
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(d);
    } catch (e) {
        return isoDate;
    }
}

function getInisial(nama) {
    return nama
        .split(' ')
        .slice(0, 2)
        .map(w => w.charAt(0).toUpperCase())
        .join('');
}

function buatBintangHTML(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            html += '<i class="fas fa-star"></i>';
        } else {
            html += '<i class="fas fa-star empty"></i>';
        }
    }
    return html;
}

function renderUlasan() {
    const listEl = document.getElementById('ulasan-list');
    const template = document.getElementById('ulasan-card-template');
    if (!listEl || !template || !window.ULASAN_DATA) return;

    const sorted = [...window.ULASAN_DATA].sort(
        (a, b) => new Date(b.tanggal) - new Date(a.tanggal)
    );

    listEl.innerHTML = '';

    if (sorted.length === 0) {
        listEl.innerHTML = '<div class="ulasan-empty">Belum ada ulasan. Jadilah yang pertama! ✨</div>';
    } else {
        sorted.forEach(u => {
            const node = template.content.cloneNode(true);

            node.querySelector('.ulasan-avatar').textContent = getInisial(u.nama);
            node.querySelector('.ulasan-nama').textContent = u.nama;
            node.querySelector('.ulasan-email').textContent = u.email;
            node.querySelector('.ulasan-stars').innerHTML = buatBintangHTML(u.rating);
            node.querySelector('.ulasan-pesan').textContent = u.pesan;
            node.querySelector('.ulasan-date-text').textContent = formatTanggalUlasan(u.tanggal);

            listEl.appendChild(node);
        });
    }

    updateOverallRating();

    if (typeof window.reinitAnimations === 'function') {
        window.reinitAnimations();
    }
}

function updateOverallRating() {
    const numberEl = document.getElementById('overall-number');
    const starsEl = document.getElementById('overall-stars');
    const totalEl = document.getElementById('overall-total');
    if (!numberEl || !starsEl || !totalEl) return;

    const total = window.ULASAN_DATA.length;

    if (total === 0) {
        numberEl.textContent = '0.0';
        starsEl.innerHTML = buatBintangHTML(0);
        totalEl.textContent = 'Belum ada ulasan';
        return;
    }

    const sum = window.ULASAN_DATA.reduce((acc, u) => acc + (u.rating || 0), 0);
    const avg = sum / total;
    const roundedAvg = Math.round(avg);

    numberEl.textContent = avg.toFixed(1);
    starsEl.innerHTML = buatBintangHTML(roundedAvg);
    totalEl.textContent = `Berdasarkan ${total} ulasan`;
}

function setupRatingInput() {
    const ratingInput = document.getElementById('rating-input');
    const hint = document.getElementById('rating-hint');
    if (!ratingInput) return;

    const stars = ratingInput.querySelectorAll('i');

    const paint = (max) => {
        stars.forEach(s => {
            const val = parseInt(s.getAttribute('data-value'), 10);
            if (val <= max) {
                s.classList.remove('far');
                s.classList.add('fas', 'active');
            } else {
                s.classList.remove('fas', 'active');
                s.classList.add('far');
            }
        });
    };

    stars.forEach(star => {
        star.addEventListener('mouseenter', () => {
            const val = parseInt(star.getAttribute('data-value'), 10);
            paint(val);
        });

        star.addEventListener('click', () => {
            ratingTerpilih = parseInt(star.getAttribute('data-value'), 10);
            paint(ratingTerpilih);
            if (hint) hint.textContent = `Kamu memberi ${ratingTerpilih} bintang ⭐`;
        });
    });

    ratingInput.addEventListener('mouseleave', () => {
        paint(ratingTerpilih);
    });
}

function setupUlasanForm() {
    const form = document.getElementById('ulasan-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nama = document.getElementById('ulasan-nama').value.trim();
        const email = document.getElementById('ulasan-email').value.trim();
        const pesan = document.getElementById('ulasan-pesan').value.trim();

        if (!nama || !email || !pesan) {
            alert('Mohon isi semua kolom ya!');
            return;
        }

        if (ratingTerpilih === 0) {
            alert('Jangan lupa kasih rating bintang dulu ya! ⭐');
            return;
        }

        window.ULASAN_DATA.push({
            nama: nama,
            email: email,
            rating: ratingTerpilih,
            pesan: pesan,
            tanggal: new Date().toISOString().split('T')[0]
        });

        form.reset();
        ratingTerpilih = 0;

        const ratingInput = document.getElementById('rating-input');
        if (ratingInput) {
            ratingInput.querySelectorAll('i').forEach(s => {
                s.classList.remove('fas', 'active');
                s.classList.add('far');
            });
        }
        const hint = document.getElementById('rating-hint');
        if (hint) hint.textContent = 'Klik bintang untuk memberi rating';

        renderUlasan();
    });
}

renderUlasan();
setupRatingInput();
setupUlasanForm();
