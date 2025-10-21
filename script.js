// --- DATA LIRIK PALSU (Simulasi data LRC) ---
// Format: { time: waktu_dalam_detik, text: "Baris Lirik" }
const MOCK_LRC_DATA = [
    { time: 5.0, text: "Kamu mau ke mana, buru-buru sekali?" },
    { time: 8.5, text: "Kata mereka, \"Yang lambat akan tertinggal.\"" },
    { time: 13.0, text: "Terlihat lelah di wajah, tapi tak pernah berhenti," },
    { time: 17.5, text: "Mereka bilang, \"Sukses butuh perjuangan yang brutal.\"" },
    { time: 22.0, text: "Bukan kamu, itu bayanganmu yang berlari." },
    { time: 25.5, text: "Coba lihat, apakah kamu masih di sini?" },
    { time: 29.5, text: "Berdansalah di atas karirmu," }, // CHORUS
    { time: 33.0, text: "Sebelum tubuh ini rapuh," },
    { time: 36.5, text: "Tujuannya bukan puncak, tapi senyum yang utuh." },
    { time: 41.0, text: "Bernapaslah, sejenak, jangan terburu-buru." },
    { time: 47.0, text: "Pelan-pelan saja, tak perlu mengejar." }, // OUTRO/Ending
];
// ---------------------------------------------


const audioPlayer = document.getElementById('audioPlayer');
const lyricsContainer = document.getElementById('lyricsContainer');
let currentLineIndex = 0;


// 1. Inisialisasi: Render semua lirik ke HTML
function renderInitialLyrics() {
    MOCK_LRC_DATA.forEach((line, index) => {
        const p = document.createElement('p');
        p.className = 'lyric-line';
        p.textContent = line.text;
        p.id = `line-${index}`;
        lyricsContainer.appendChild(p);
    });
}

// 2. Fungsi Utama: Sinkronisasi Lirik dengan Waktu Audio
function updateLyrics() {
    const currentTime = audioPlayer.currentTime;
    let nextIndex = currentLineIndex;

    // Cari baris lirik yang harus aktif sekarang
    for (let i = nextIndex; i < MOCK_LRC_DATA.length; i++) {
        // Cek apakah waktu audio sudah melewati waktu mulai baris lirik
        if (currentTime >= MOCK_LRC_DATA[i].time) {
            nextIndex = i;
        } else {
            // Karena lirik sudah diurutkan, kita bisa berhenti
            break; 
        }
    }

    if (nextIndex !== currentLineIndex) {
        // Nonaktifkan baris lirik sebelumnya
        const prevLine = document.getElementById(`line-${currentLineIndex}`);
        if (prevLine) {
            prevLine.classList.remove('lyric-active');
        }

        // Aktifkan baris lirik baru
        currentLineIndex = nextIndex;
        const currentLineElement = document.getElementById(`line-${currentLineIndex}`);
        if (currentLineElement) {
            currentLineElement.classList.add('lyric-active');
            
            // Opsional: Gulirkan kontainer agar baris aktif berada di tengah
            currentLineElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

// 3. Tambahkan Event Listener ke Audio Player
document.addEventListener('DOMContentLoaded', () => {
    renderInitialLyrics();
    
    // Event "timeupdate" dipicu setiap kali posisi pemutaran audio berubah (sering sekali)
    audioPlayer.addEventListener('timeupdate', updateLyrics);
});
