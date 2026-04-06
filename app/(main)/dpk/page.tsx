'use client';

import React, { useState } from 'react';

// --- TYPE DEFINITIONS ---
interface MCQ {
  q: string;
  options: string[];
  ans: number;
  exp: string;
}

interface Essay {
  q: string;
  exp: string;
}

// --- DATA SOAL DPK TJKT (VALIDATED BASED ON KISI-KISI) ---
const mcqData: MCQ[] = [
  { q: "1. Seorang teknisi jaringan yang bertugas merancang, mengelola, dan memastikan keamanan infrastruktur jaringan di perusahaan besar disebut...", options: ["A. Web Developer", "B. Network Engineer", "C. Database Administrator", "D. UI/UX Designer", "E. Content Creator"], ans: 1, exp: "Network Engineer adalah profesi yang fokus pada analisis, perancangan, dan pemeliharaan infrastruktur jaringan." },
  { q: "2. Tren teknologi TJKT yang memungkinkan penyimpanan data dan akses aplikasi melalui internet tanpa server fisik di lokasi disebut...", options: ["A. Artificial Intelligence", "B. Cloud Computing", "C. Blockchain", "D. Internet of Things", "E. Virtual Reality"], ans: 1, exp: "Cloud Computing memindahkan pemrosesan dan penyimpanan ke server jarak jauh yang diakses melalui jaringan." },
  { q: "3. Peran utama seorang Cyber Security Specialist dalam dunia kerja TJKT adalah...", options: ["A. Membuat desain grafis", "B. Instalasi kabel listrik", "C. Menganalisis dan melindungi sistem jaringan dari peretasan", "D. Menulis kode aplikasi mobile", "E. Mengatur jadwal rapat"], ans: 2, exp: "Cyber Security fokus pada perlindungan data dan pencegahan akses ilegal pada sistem informasi." },
  { q: "4. Teknologi jaringan seluler generasi terbaru yang menawarkan kecepatan sangat tinggi dan latensi rendah adalah...", options: ["A. 2G", "B. 3G", "C. 4G LTE", "D. 5G", "E. GPRS"], ans: 3, exp: "5G adalah perkembangan teknologi telekomunikasi terkini untuk mendukung transformasi digital industri 4.0." },
  { q: "5. Seseorang yang membangun bisnis inovatif dengan memanfaatkan perkembangan teknologi digital disebut...", options: ["A. Intrapreneur", "B. Technopreneur", "C. Socialpreneur", "D. Governmentpreneur", "E. Artpreneur"], ans: 1, exp: "Technopreneur menggabungkan keahlian teknologi dengan strategi peluang usaha." },
  { q: "6. Apa tugas utama seorang Network Administrator harian di kantor?", options: ["A. Memperbaiki printer", "B. Mengonfigurasi switch/router dan memantau stabilitas koneksi", "C. Menjual hardware online", "D. Membuat video konten", "E. Membersihkan debu"], ans: 1, exp: "Administrator bertanggung jawab atas operasional teknis dan konfigurasi jaringan harian." },
  { q: "7. Kabel Fiber Optic lebih dipilih untuk jaringan backbone karena...", options: ["A. Paling murah", "B. Terbuat dari tembaga", "C. Bandwidth besar dan kebal gangguan elektromagnetik", "D. Mudah disambung tanpa alat", "E. Tanpa listrik"], ans: 2, exp: "Serat optik menggunakan cahaya, menawarkan kapasitas data tinggi dan stabilitas sinyal dari gangguan listrik." },
  { q: "8. Profesi yang bertugas mengelola layanan server dan instalasi sistem operasi adalah...", options: ["A. Graphic Designer", "B. System Administrator", "C. Hardware Tech", "D. Data Entry", "E. SEO Specialist"], ans: 1, exp: "System Administrator (SysAdmin) berfokus pada manajemen operasional server." },
  { q: "9. Contoh penerapan Internet of Things (IoT) dalam kehidupan adalah...", options: ["A. Mengetik di Word", "B. Mengontrol lampu rumah via smartphone melalui internet", "C. Kirim file via Bluetooth", "D. Dengar radio FM", "E. Cetak foto"], ans: 1, exp: "IoT melibatkan keterhubungan perangkat fisik ke internet untuk kontrol jarak jauh." },
  { q: "10. Mengenali peluang jasa instalasi CCTV dan Wi-Fi merupakan wujud dari...", options: ["A. Hobi", "B. Personal branding", "C. Analisis peluang usaha dan technopreneurship", "D. Budaya mutu", "E. Visi pasif"], ans: 2, exp: "Mengeksekusi peluang bisnis di bidang IT adalah karakteristik dasar technopreneur." },
  { q: "11. Apa kepanjangan dari K3LH dalam lingkungan TJKT?", options: ["A. Keamanan dan Kelestarian", "B. Kesehatan, Keselamatan Kerja, dan Lingkungan Hidup", "C. Kerapian dan Keindahan", "D. Kekuatan dan Keahlian", "E. Keselamatan dan Kecepatan"], ans: 1, exp: "K3LH adalah standar keselamatan kerja untuk teknisi dan perlindungan lingkungan." },
  { q: "12. Alat Pelindung Diri (APD) wajib saat memasang antena di ketinggian adalah...", options: ["A. Sarung tangan", "B. Masker", "C. Full Body Harness dan Helm", "D. Kacamata hitam", "E. Sepatu kain"], ans: 2, exp: "Harness dan helm mencegah risiko fatal jatuh saat bekerja di area tinggi." },
  { q: "13. Tindakan 'Resik' dalam budaya kerja 5R di lab komputer adalah...", options: ["A. Biarkan kabel berantakan", "B. Langsung keluar lab", "C. Membersihkan area kerja dan merapikan peralatan", "D. Buang sampah di kolong meja", "E. Nyalakan monitor terus"], ans: 2, exp: "Resik berarti menjaga kebersihan area kerja untuk mendukung performa perangkat." },
  { q: "14. Posisi duduk ergonomis di depan komputer yang benar adalah...", options: ["A. Membungkuk", "B. Punggung tegak dan layar sejajar pandangan mata", "C. Kaki di atas kursi", "D. Keyboard terlalu tinggi", "E. Layar miring bawah"], ans: 1, exp: "Ergonomi mencegah cedera tulang belakang dan kelelahan fisik pada pekerja IT." },
  { q: "15. Jenis APAR yang tepat untuk kebakaran di ruang server adalah...", options: ["A. Air", "B. CO2 atau Powder", "C. Pasir basah", "D. Selimut kain", "E. Ember air"], ans: 1, exp: "APAR berbasis gas (CO2) tidak merusak sirkuit elektronik sensitif." },
  { q: "16. Mengapa dilarang memakai cincin logam saat membongkar PC menyala?", options: ["A. Takut hilang", "B. Logam isolator", "C. Logam konduktor yang memicu sengatan/short circuit", "D. Perhiasan tergores", "E. Tidak dilarang"], ans: 2, exp: "Logam menghantarkan listrik dan sangat berbahaya jika menyentuh sirkuit aktif." },
  { q: "17. Memberikan layanan terbaik dan ramah kepada klien jasa IT disebut...", options: ["A. Budaya Mutu", "B. Pelayanan Prima", "C. Budaya Keras", "D. Personal Branding", "E. Visi Profit"], ans: 1, exp: "Service Excellence membangun kepercayaan dan loyalitas pelanggan bisnis TJKT." },
  { q: "18. Jika teman tersengat listrik di lab, langkah pertama adalah...", options: ["A. Tarik tangan korban", "B. Mematikan sakelar pusat atau putuskan arus", "C. Siram air", "D. Panggil ambulans saja", "E. Berteriak"], ans: 1, exp: "Memutus arus listrik mencegah penolong ikut tersengat." },
  { q: "19. Mengelola limbah kabel bekas agar tidak mencemari tanah masuk bagian...", options: ["A. Kesehatan Kerja", "B. Lingkungan Hidup (LH)", "C. Kerapian", "D. Marketing", "E. Hak Cipta"], ans: 1, exp: "Aspek LH fokus pada pengelolaan limbah elektronik (E-waste) secara aman." },
  { q: "20. Karakter disiplin, teliti, dan jujur merupakan bagian dari...", options: ["A. Kecerobohan", "B. Budaya Kerja profesional", "C. Biaya murah", "D. Malas belajar", "E. Rahasia dagang"], ans: 1, exp: "Budaya kerja positif menjamin kualitas hasil pekerjaan teknisi." },
  { q: "21. Kabel yang umum digunakan untuk LAN dengan konektor RJ-45 adalah...", options: ["A. Coaxial", "B. UTP (Unshielded Twisted Pair)", "C. Fiber Optic", "D. Kabel Listrik", "E. RJ-11"], ans: 1, exp: "Kabel UTP adalah standar transmisi data pada jaringan area lokal." },
  { q: "22. Perangkat jaringan Layer 2 yang menghubungkan banyak PC dalam satu LAN adalah...", options: ["A. Router", "B. Hub", "C. Switch", "D. Modem", "E. Repeater"], ans: 2, exp: "Switch lebih cerdas dari Hub karena meneruskan paket berdasarkan MAC Address." },
  { q: "23. Urutan warna pin 1 dan 2 pada standar T568B kabel Straight adalah...", options: ["A. Biru-Putih Biru", "B. Putih Oranye - Oranye", "C. Hijau-Putih Hijau", "D. Cokelat-Putih Cokelat", "E. Putih Hijau - Hijau"], ans: 1, exp: "Standar T568B diawali oleh Putih Oranye kemudian Oranye." },
  { q: "24. Perangkat yang menjadi gateway penghubung LAN ke internet adalah...", options: ["A. Switch", "B. Access Point", "C. Router", "D. LAN Card", "E. Patch Panel"], ans: 2, exp: "Router bekerja di Layer 3 untuk menghubungkan dua network yang berbeda." },
  { q: "25. Topologi yang setiap perangkatnya terhubung ke satu titik pusat (switch) disebut...", options: ["A. Bus", "B. Star", "C. Ring", "D. Mesh", "E. Tree"], ans: 1, exp: "Topologi Star mudah dikelola; jika satu PC bermasalah, yang lain tidak terganggu." },
  { q: "26. Satuan kecepatan transfer data (bandwidth) jaringan adalah...", options: ["A. m/s", "B. bps (bits per second)", "C. Watt", "D. Volt", "E. Hertz"], ans: 1, exp: "Bit per detik mengukur seberapa banyak data dikirimkan dalam waktu satu detik." },
  { q: "27. Alat untuk memancarkan sinyal Wi-Fi di dalam ruangan adalah...", options: ["A. Access Point", "B. NIC", "C. Switch", "D. Splitter", "E. ODP"], ans: 0, exp: "Access Point menjembatani koneksi kabel ke perangkat nirkabel via udara." },
  { q: "28. Kabel untuk menghubungkan dua PC secara langsung tanpa switch adalah...", options: ["A. Straight", "B. Crossover", "C. Rollover", "D. Parallel", "E. Serial"], ans: 1, exp: "Kabel Cross digunakan untuk menghubungkan dua perangkat bertipe sama (DTE ke DTE)." },
  { q: "29. Kepanjangan dari istilah LAN adalah...", options: ["A. Long Area Network", "B. Local Area Network", "C. Light Access Network", "D. Link Area Node", "E. Low Area Network"], ans: 1, exp: "Local Area Network mencakup wilayah terbatas seperti gedung atau rumah." },
  { q: "30. Keuntungan jaringan nirkabel (WLAN) dibanding kabel adalah...", options: ["A. Lebih aman", "B. Tidak pengaruh cuaca", "C. Mobilitas tinggi dan praktis", "D. Lebih stabil", "E. Jangkauan tak terbatas"], ans: 2, exp: "Nirkabel memungkinkan pengguna berpindah tempat tanpa terikat kabel fisik." },
  { q: "31. Alat untuk menguji urutan pin kabel UTP yang sudah dikrimping adalah...", options: ["A. Multimeter", "B. LAN Tester", "C. OPM", "D. Splicer", "E. Tang Potong"], ans: 1, exp: "LAN Tester menunjukkan keberhasilan koneksi 8 pin kabel melalui indikator lampu." },
  { q: "32. Alat untuk mengukur Tegangan, Arus, dan Hambatan listrik adalah...", options: ["A. Termometer", "B. Barometer", "C. Multimeter", "D. Speedtest", "E. Logic Probe"], ans: 2, exp: "Multimeter (Avometer) adalah alat ukur multifungsi teknisi hardware." },
  { q: "33. Alat pemotong ujung serat kaca Fiber Optik agar presisi adalah...", options: ["A. Stripper", "B. Crimping Tool", "C. Cleaver", "D. Cutter", "E. Tang"], ans: 2, exp: "Cleaver menjamin potongan core tegak lurus untuk meminimalisir redaman cahaya." },
  { q: "34. Alat pengukur daya sinyal cahaya di dalam kabel Fiber Optik adalah...", options: ["A. VFL", "B. OPM (Optical Power Meter)", "C. OTDR", "D. BER Test", "E. LAN Tester"], ans: 1, exp: "OPM mengukur besarnya rugi-rugi cahaya (loss) pada jalur FO." },
  { q: "35. Alat laser merah untuk deteksi fisik kabel FO yang patah secara visual adalah...", options: ["A. Senter", "B. VFL (Visual Fault Locator)", "C. Kamera IR", "D. Splicer", "E. Cleaver"], ans: 1, exp: "Sinar laser VFL akan terlihat bocor di titik kabel yang patah atau tekuk." },
  { q: "36. Alat penyambung core FO secara permanen dengan teknik peleburan panas adalah...", options: ["A. Stripper", "B. Fusion Splicer", "C. OPM", "D. Crimping Tool", "E. ODP"], ans: 1, exp: "Fusion Splicer menyatukan dua serat optik dengan tingkat presisi mikron." },
  { q: "37. Alat untuk mengupas jaket luar dan coating kabel Fiber Optik adalah...", options: ["A. Fiber Stripper", "B. Tang Crimping", "C. Gunting", "D. Solder", "E. Lem"], ans: 0, exp: "Stripper FO didesain agar tidak menggores core kaca yang rapuh." },
  { q: "38. Apa kegunaan utama dari Crimping Tool?", options: ["A. Ukur internet", "B. Sambung FO", "C. Menjepit konektor RJ-45 ke kabel UTP", "D. Potong pipa", "E. Las rak server"], ans: 2, exp: "Tang crimping menekan pin tembaga konektor agar menyentuh inti kabel UTP." },
  { q: "39. Alat ukur kompleks untuk melihat grafik redaman dan titik putus FO jarak jauh adalah...", options: ["A. OPM", "B. VFL", "C. OTDR", "D. Cleaver", "E. Multimeter"], ans: 2, exp: "OTDR (Optical Time Domain Reflectometer) menampilkan data kondisi kabel sepanjang ribuan meter." },
  { q: "40. Mengukur aki UPS 12V DC dengan Multimeter, selector harus di posisi...", options: ["A. Ohm", "B. ACV", "C. DCV (di atas 12V)", "D. Ampere", "E. Off"], ans: 2, exp: "DCV digunakan untuk tegangan searah (aki) dengan skala yang lebih tinggi dari objek ukur." }
];

const essayData: Essay[] = [
  { q: "1. Jelaskan 3 jenis profesi (job profile) bidang TJKT dan satu teknologi yang harus dikuasai!", exp: "1. <b>Network Engineer</b>: Rancang infrastruktur, kuasai SDN. 2. <b>Cyber Security</b>: Proteksi sistem, kuasai alat enkripsi AI. 3. <b>Cloud Architect</b>: Rancang komputasi awan, kuasai AWS/Azure." },
  { q: "2. Bagaimana langkah Technopreneur dalam membangun personal branding dan validasi peluang usaha?", exp: "<b>Personal Branding</b>: Portofolio di LinkedIn & sertifikasi (CCNA). <b>Validasi</b>: Riset pasar kebutuhan internet di desa dan hitung biaya operasional (Business Plan)." },
  { q: "3. Jelaskan prosedur K3LH saat instalasi kabel di dalam rak server aktif!", exp: "Wajib APD isolator (sepatu karet), lepas perhiasan logam, gunakan alat kerja bertangkai karet, dan pastikan manajemen kabel rapi agar tidak menyentuh bodi logam rak." },
  { q: "4. Sebutkan 4 perangkat utama untuk membangun LAN di lab dengan 20 komputer!", exp: "1. 20 Unit <b>PC/Client</b>. 2. 1 Unit <b>Switch 24 Port</b>. 3. <b>Kabel UTP & RJ-45</b>. 4. <b>Router</b> (sebagai gateway internet)." },
  { q: "5. Jelaskan perbedaan kabel Straight dan Crossover beserta contohnya!", exp: "<b>Straight</b>: Ujung sama, untuk perangkat beda level (PC ke Switch). <b>Cross</b>: Ujung silang (1-3, 2-6), untuk perangkat selevel (PC ke PC langsung)." }
];

export default function SimulasiDPKTJKT() {
  const [view, setView] = useState<'landing' | 'quiz' | 'essay'>('landing');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(mcqData.length).fill(null));
  const [showModal, setShowModal] = useState(false);

  const handleStart = () => {
    setView('quiz');
    setCurrentIndex(0);
    setScore(0);
    setAnswers(Array(mcqData.length).fill(null));
  };

  const handleAnswer = (idx: number) => {
    if (answers[currentIndex] !== null) return;
    const newAnswers = [...answers];
    newAnswers[currentIndex] = idx;
    setAnswers(newAnswers);
    if (idx === mcqData[currentIndex].ans) setScore(score + 1);
  };

  const handleNext = () => {
    if (currentIndex < mcqData.length - 1) setCurrentIndex(currentIndex + 1);
    else setShowModal(true);
  };

  const finalScore = Math.round((score / mcqData.length) * 100);

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 font-sans text-slate-900 flex flex-col items-center">
      {view === 'landing' && (
        <div className="bg-white rounded-3xl p-10 md:p-16 shadow-2xl text-center max-w-2xl w-full border-t-8 border-emerald-600 animate-fade-in-up">
          <div className="text-6xl mb-6">🛠️🔌💻</div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">Simulasi PSAJ DPK TJKT</h1>
          <p className="text-slate-600 mb-8 text-lg">Uji penguasaan dasar kejuruan: K3LH, LAN, Alat Ukur Jaringan, dan Wawasan Dunia Kerja TJKT.</p>
          <button onClick={handleStart} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:-translate-y-1 uppercase tracking-widest">Mulai Sertifikasi</button>
        </div>
      )}

      {view === 'quiz' && (
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl max-w-3xl w-full border-t-4 border-emerald-500 animate-fade-in-up">
          <div className="flex justify-between items-center mb-3 text-emerald-600 font-bold uppercase tracking-widest text-sm">
            <span>Progress: {currentIndex + 1} / {mcqData.length}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 mb-8 overflow-hidden shadow-inner">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-500" style={{ width: `${((currentIndex + 1) / mcqData.length) * 100}%` }}></div>
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-8 leading-relaxed">{mcqData[currentIndex].q}</h2>
          <div className="flex flex-col gap-3">
            {mcqData[currentIndex].options.map((opt, i) => {
              const hasAnswered = answers[currentIndex] !== null;
              const isCorrect = i === mcqData[currentIndex].ans;
              const isSelected = i === answers[currentIndex];
              let btnClass = "text-left p-4 rounded-xl border-2 transition-all ";
              if (!hasAnswered) btnClass += "border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50 cursor-pointer";
              else btnClass += isCorrect ? "border-emerald-500 bg-emerald-50 text-emerald-800 font-bold" : isSelected ? "border-rose-500 bg-rose-50 text-rose-800" : "border-slate-100 opacity-50";
              return <button key={i} onClick={() => handleAnswer(i)} disabled={hasAnswered} className={btnClass}>{opt}</button>;
            })}
          </div>
          {answers[currentIndex] !== null && (
            <div className="mt-8 p-6 rounded-2xl bg-emerald-50 border border-emerald-100 animate-fade-in">
              <h4 className="font-bold text-emerald-800 mb-2">Technical Insight:</h4>
              <p className="text-slate-700">{mcqData[currentIndex].exp}</p>
            </div>
          )}
          <div className="mt-8 flex justify-between">
            <button onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))} disabled={currentIndex === 0} className={`font-bold py-3 px-6 rounded-xl ${currentIndex === 0 ? 'bg-slate-200 text-slate-400' : 'bg-slate-500 text-white hover:bg-slate-600'}`}>Back</button>
            {answers[currentIndex] !== null && <button onClick={handleNext} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg">{currentIndex === mcqData.length - 1 ? 'Finish' : 'Next'}</button>}
          </div>
        </div>
      )}

      {view === 'essay' && (
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl max-w-4xl w-full border-t-8 border-emerald-600 animate-fade-in-up">
          <h2 className="text-3xl font-extrabold text-slate-800 mb-8 text-center tracking-tight uppercase">Manual Prosedur Teknis (Esai)</h2>
          <div className="flex flex-col gap-6">
            {essayData.map((item, index) => (
              <div key={index} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                <h3 className="font-bold text-emerald-800 mb-4 text-lg border-b border-emerald-100 pb-2">{item.q}</h3>
                <p className="text-slate-700 leading-loose" dangerouslySetInnerHTML={{ __html: item.exp }} />
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <button onClick={handleStart} className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:-translate-y-1">Restart Simulasi</button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex justify-center items-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-10 text-center max-w-md w-full shadow-2xl border-4 border-emerald-500">
            <div className="text-5xl mb-4">📜🏆</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Simulasi Kompetensi Selesai!</h2>
            <p className="text-slate-500 mb-8 tracking-wide">Skor pengetahuan dasar TJKT Anda:</p>
            <div className="relative w-44 h-44 mx-auto mb-8 flex justify-center items-center rounded-full shadow-inner border-8 border-slate-50" style={{ background: `conic-gradient(#059669 ${finalScore}%, #f1f5f9 0)` }}>
              <div className="absolute inset-3 bg-white rounded-full flex justify-center items-center shadow-lg"><span className="text-6xl font-black text-emerald-600 tracking-tighter">{finalScore}</span></div>
            </div>
            <h3 className="text-lg font-bold text-slate-700 mb-8 px-4">{finalScore >= 85 ? "Luar Biasa! Pondasi keahlian teknis Anda sangat kuat. 🌟" : finalScore >= 70 ? "Bagus! Terus asah pemahaman alat ukur dan K3LH Anda. 👍" : "Jangan menyerah! Bacalah kembali panduan K3LH dan media jaringan. 💪"}</h3>
            <button onClick={() => { setShowModal(false); setView('essay'); window.scrollTo(0,0); }} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg uppercase tracking-widest">Cek Pembahasan Esai</button>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
      `}} />
    </div>
  );
}