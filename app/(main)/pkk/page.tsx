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

// --- DATA SOAL PRODUK KREATIF & KEWIRAUSAHAAN (PKK) TJKT ---
const mcqData: MCQ[] = [
  { q: "1. Ciri utama dari produksi massal pada pembuatan perangkat keras jaringan seperti konektor RJ-45 adalah...", options: ["A. Produk memiliki variasi yang sangat banyak", "B. Biaya produksi per unit menjadi sangat tinggi", "C. Menggunakan mesin yang bersifat khusus dan otomatis", "D. Tenaga kerja harus memiliki keahlian seni tinggi", "E. Waktu pengerjaan unit sangat lama"], ans: 2, exp: "Produksi massal mengandalkan otomatisasi mesin khusus untuk menghasilkan barang dalam jumlah besar dengan biaya per unit yang rendah[cite: 117, 120]." },
  { q: "2. Tahap menentukan alur atau urutan proses produksi dari bahan baku hingga menjadi produk jadi disebut...", options: ["A. Routing", "B. Scheduling", "C. Dispatching", "D. Follow-up", "E. Evaluating"], ans: 0, exp: "Routing adalah penetapan urutan pengerjaan produk dari awal hingga akhir[cite: 123, 124]." },
  { q: "3. Tahapan menempatkan komponen elektronik ke dalam PCB pada produksi switch disebut...", options: ["A. Packaging", "B. Assembly", "C. Quality Control", "D. Marketing", "E. Labeling"], ans: 1, exp: "Assembly atau perakitan adalah proses penyatuan komponen menjadi satu kesatuan produk[cite: 129, 131]." },
  { q: "4. Keunggulan utama perakitan manual dibandingkan otomatis dalam perakitan PC server adalah...", options: ["A. Kecepatan produksi lebih tinggi", "B. Fleksibilitas menangani variasi spesifikasi kustom", "C. Biaya jangka panjang lebih murah", "D. Menghilangkan faktor human error", "E. Tidak memerlukan tenaga kerja"], ans: 1, exp: "Tenaga manusia lebih fleksibel dalam menangani permintaan kustomisasi dibandingkan mesin[cite: 135, 137]." },
  { q: "5. Titik kemacetan di mana beban kerja melebihi kapasitas operasional sehingga menghambat aliran produksi disebut...", options: ["A. Overload", "B. Breakdown", "C. Bottleneck", "D. Deadline", "E. Feedback"], ans: 2, exp: "Bottleneck adalah hambatan di satu titik yang memperlambat seluruh proses produksi[cite: 141, 144]." },
  { q: "6. Alat yang digunakan untuk menguji titik putus dan kualitas sambungan pada kabel fiber optik adalah...", options: ["A. Multimeter Digital", "B. OTDR", "C. Crimping Tool", "D. LAN Tester", "E. Splicer"], ans: 1, exp: "OTDR digunakan untuk mendeteksi jarak titik putus dan kualitas kabel optik[cite: 147, 149]." },
  { q: "7. Perangkat telekomunikasi di Indonesia harus lulus sertifikasi dari lembaga...", options: ["A. Kementerian Pertanian", "B. POSTEL (Kominfo)", "C. Badan Meteorologi", "D. Kementerian Pariwisata", "E. Dinas Pendidikan"], ans: 1, exp: "Sertifikasi perangkat telekomunikasi dilakukan oleh POSTEL di bawah Kominfo[cite: 153, 155]." },
  { q: "8. Teknik meningkatkan visibilitas website jasa IT di mesin pencari secara organik disebut...", options: ["A. Social Media Ads", "B. SEO", "C. Email Marketing", "D. Direct Selling", "E. Affiliate Marketing"], ans: 1, exp: "SEO (Search Engine Optimization) bertujuan menaikkan peringkat web secara organik[cite: 159, 161]." },
  { q: "9. Keyword paling efektif untuk SEO jasa penarikan kabel fiber optik di Jakarta adalah...", options: ["A. Jual Kabel Murah", "B. Jasa Instalasi Fiber Optic Jakarta", "C. Internet Cepat", "D. Teknologi Masa Depan", "E. Cara pasang kabel"], ans: 1, exp: "Keyword yang spesifik menyangkut jenis jasa dan lokasi lebih efektif[cite: 165, 166]." },
  { q: "10. Platform media sosial untuk membangun portofolio profesional teknisi jaringan adalah...", options: ["A. TikTok", "B. LinkedIn", "C. Instagram", "D. Snapchat", "E. Facebook Gaming"], ans: 1, exp: "LinkedIn adalah media sosial khusus untuk profesional dan jejaring karier[cite: 170, 172]." },
  { q: "11. Perlindungan hukum bagi pencipta kode program (software) masuk ke dalam kategori...", options: ["A. Paten", "B. Hak Cipta", "C. Merek", "D. Desain Industri", "E. Rahasia Dagang"], ans: 1, exp: "Software atau program komputer dilindungi oleh UU Hak Cipta[cite: 176, 178]." },
  { q: "12. Lisensi software yang memperbolehkan pengguna memodifikasi kode sumbernya disebut...", options: ["A. Proprietary License", "B. Open Source License", "C. Trial License", "D. Freeware", "E. Shareware"], ans: 1, exp: "Open Source memberikan kebebasan modifikasi kode sumber oleh siapa saja[cite: 182, 184]." },
  { q: "13. Biaya kabel Rp1.000.000, konektor Rp200.000, dan upah Rp500.000. Total biaya produksinya adalah...", options: ["A. Rp1.200.000", "B. Rp1.500.000", "C. Rp1.700.000", "D. Rp2.000.000", "E. Rp2.500.000"], ans: 2, exp: "Total Biaya = Bahan Baku + Upah (1.000.000 + 200.000 + 500.000 = 1.700.000)[cite: 188, 191]." },
  { q: "14. Biaya yang jumlahnya tetap sama setiap bulan meskipun produksi berubah disebut...", options: ["A. Variable Cost", "B. Fixed Cost", "C. Overhead Cost", "D. Selling Price", "E. Margin"], ans: 1, exp: "Fixed Cost tidak bergantung pada jumlah output produksi[cite: 194, 196]." },
  { q: "15. Kondisi di mana total pendapatan perusahaan sama dengan total biaya disebut...", options: ["A. Break Even Point (BEP)", "B. Profit Margin", "C. Return of Investment", "D. Cash Flow", "E. Defisit"], ans: 0, exp: "BEP adalah titik impas di mana tidak rugi dan tidak untung[cite: 200, 201]." },
  { q: "16. Dalam analisis SWOT, munculnya kompetitor baru dengan harga lebih murah merupakan...", options: ["A. Strength", "B. Weakness", "C. Opportunity", "D. Threat", "E. Treatment"], ans: 3, exp: "Kompetitor luar merupakan ancaman eksternal (Threat) bagi bisnis[cite: 206, 210]." },
  { q: "17. Memiliki teknisi bersertifikat internasional CCNA dalam perusahaan IT merupakan...", options: ["A. Strength", "B. Weakness", "C. Opportunity", "D. Threat", "E. Ambition"], ans: 0, exp: "CCNA adalah keunggulan kompetensi internal (Strength)[cite: 212, 213]." },
  { q: "18. Strategi menambah jenis layanan baru dari jasa internet ke jasa CCTV disebut...", options: ["A. Likuidasi", "B. Diversifikasi Produk", "C. Monopoli", "D. Akuisisi", "E. Reseller"], ans: 1, exp: "Menambah variasi jenis layanan disebut diversifikasi[cite: 218, 220]." },
  { q: "19. Layanan purna jual berupa garansi selama 1 tahun bertujuan untuk...", options: ["A. Merugikan perusahaan", "B. Meningkatkan kepercayaan pelanggan", "C. Mengurangi pelanggan", "D. Mempersulit teknisi", "E. Menaikkan pajak"], ans: 1, exp: "Garansi menjamin kualitas dan memberikan rasa aman bagi pembeli[cite: 224, 226]." },
  { q: "20. Langkah pertama saat menerima keluhan pelanggan tentang jaringan mati adalah...", options: ["A. Meminta biaya perbaikan", "B. Mendengarkan dan melakukan troubleshoot", "C. Menyalahkan pelanggan", "D. Memutus kontrak", "E. Mengganti semua perangkat"], ans: 1, exp: "Layanan pelanggan dimulai dengan mendengarkan keluhan secara empati[cite: 230, 232]." },
  { q: "21. Jika biaya tetap Rp5.000.000 dan margin per unit Rp200.000, maka BEP unitnya adalah...", options: ["A. 15 unit", "B. 20 unit", "C. 25 unit", "D. 30 unit", "E. 50 unit"], ans: 2, exp: "BEP = Biaya Tetap / Margin = 5.000.000 / 200.000 = 25 unit[cite: 236, 239]." },
  { q: "22. Perintah resmi untuk memulai proses produksi disebut...", options: ["A. Routing", "B. Scheduling", "C. Dispatching", "D. Follow-up", "E. Evaluating"], ans: 2, exp: "Dispatching adalah tahap pemberian perintah kerja produksi[cite: 242, 245]." },
  { q: "23. Perakitan menggunakan alat bantu (jig) agar posisi komponen presisi disebut...", options: ["A. Manual murni", "B. Semi-otomatis", "C. Perakitan acak", "D. Tradisional", "E. Borongan"], ans: 1, exp: "Penggunaan alat bantu jig masuk dalam perakitan semi-otomatis[cite: 248, 250]." },
  { q: "24. Kriteria utama yang diuji pada perangkat Access Point adalah...", options: ["A. Berat kemasan", "B. Estetika lampu", "C. Stabilitas sinyal", "D. Jumlah karyawan", "E. Jenis baut"], ans: 2, exp: "Kualitas AP ditentukan oleh stabilitas dan kekuatan jangkauan sinyalnya[cite: 254, 257]." },
  { q: "25. Pengujian ketahanan perangkat pada suhu ekstrem secara terus menerus disebut...", options: ["A. Beta Test", "B. Stress Test", "C. Unit Test", "D. UAT", "E. Market Test"], ans: 1, exp: "Stress test menguji perangkat hingga batas ekstremnya[cite: 260, 262]." },
  { q: "26. Artikel blog 'Cara Memperbaiki WiFi' termasuk dalam strategi...", options: ["A. Hard Selling", "B. Content Marketing", "C. Direct Marketing", "D. Telemarketing", "E. Personal Selling"], ans: 1, exp: "Content marketing menarik pelanggan lewat edukasi atau informasi bermanfaat[cite: 266, 268]." },
  { q: "27. Keunggulan Google Ads dibandingkan brosur fisik adalah...", options: ["A. Biaya cetak mahal", "B. Target audiens lebih spesifik", "C. Tidak butuh internet", "D. Lokasi terbatas", "E. Hasil tidak terukur"], ans: 1, exp: "Iklan digital memungkinkan penargetan audiens yang sangat akurat[cite: 272, 274]." },
  { q: "28. Pendaftaran Merek dagang dilakukan melalui lembaga...", options: ["A. Kominfo", "B. DJKI", "C. BSSN", "D. Kemendikbud", "E. Polri"], ans: 1, exp: "DJKI adalah badan resmi pendaftaran Hak Kekayaan Intelektual di Indonesia[cite: 278, 280]." },
  { q: "29. Perlindungan HAKI untuk bentuk fisik luar casing CPU yang unik adalah...", options: ["A. Hak Paten", "B. Hak Cipta", "C. Desain Industri", "D. Rahasia Dagang", "E. Indikasi Geografis"], ans: 2, exp: "Desain Industri melindungi bentuk estetis dan konfigurasi fisik produk[cite: 284, 287]." },
  { q: "30. Biaya RJ-45 yang berubah mengikuti jumlah instalasi disebut...", options: ["A. Fixed Cost", "B. Variable Cost", "C. Semi-Fixed Cost", "D. Sunk Cost", "E. Opportunity Cost"], ans: 1, exp: "Variable cost berfluktuasi seiring dengan volume produksi[cite: 290, 292]." },
  { q: "31. Rumus menghitung Laba Kotor adalah...", options: ["A. Penjualan - HPP", "B. Penjualan - Pajak", "C. Laba Bersih + Biaya", "D. Modal + Untung", "E. Pendapatan / Unit"], ans: 0, exp: "Laba kotor adalah hasil penjualan dikurangi harga pokok produksi[cite: 296, 297]." },
  { q: "32. Kenaikan harga hardware impor akibat kurs rupiah melemah termasuk dalam...", options: ["A. Strength", "B. Weakness", "C. Opportunity", "D. Threat", "E. Strategy"], ans: 3, exp: "Masalah ekonomi eksternal merupakan ancaman bagi keberlangsungan bisnis[cite: 302, 306]." },
  { q: "33. Evaluasi usaha bulanan bertujuan untuk...", options: ["A. Mencari kesalahan staf", "B. Memperbaiki strategi usaha", "C. Menutup usaha", "D. Mengurangi cuti", "E. Menghindari pajak"], ans: 1, exp: "Evaluasi dilakukan untuk menilai kinerja dan mengoreksi strategi bisnis[cite: 308, 310]." },
  { q: "34. Maintenance rutin 3 bulan sekali bagi pelanggan termasuk layanan...", options: ["A. Promosi", "B. Purna jual", "C. Penjualan rugi", "D. Penipuan", "E. Overhead"], ans: 1, exp: "Layanan purna jual mencakup perawatan berkala pasca-transaksi[cite: 314, 316]." },
  { q: "35. Portofolio teknisi jaringan agar dilirik perusahaan sebaiknya diunggah di...", options: ["A. Instagram", "B. TikTok", "C. LinkedIn", "D. Pinterest", "E. Snapchat"], ans: 2, exp: "LinkedIn adalah wadah profesional untuk menunjukkan rekam jejak kerja[cite: 320, 323]." },
  { q: "36. Penyusutan nilai laptop operasional karena pemakaian disebut...", options: ["A. Apresiasi", "B. Depresiasi", "C. Inflasi", "D. Deflasi", "E. Investasi"], ans: 1, exp: "Depresiasi adalah berkurangnya nilai aset tetap akibat usia dan penggunaan[cite: 326, 328]." },
  { q: "37. Quality Control pada perakitan kabel LAN bertujuan untuk...", options: ["A. Mempercepat kirim", "B. Mengurangi bahan", "C. Memastikan fungsi kabel", "D. Menghitung absen", "E. Variasi warna"], ans: 2, exp: "QC memastikan produk bebas cacat dan berfungsi sesuai spesifikasi[cite: 332, 335]." },
  { q: "38. Produk TJKT yang paling mungkin diproduksi massal adalah...", options: ["A. Jasa servis panggil", "B. Router tipe standar", "C. Instalasi gedung", "D. Web kustom", "E. Konsultasi siber"], ans: 1, exp: "Perangkat hardware standar lebih mudah diproduksi massal dibanding jasa kustom[cite: 338, 340]." },
  { q: "39. Cara menangani komplain pelanggan internet mati yang paling tepat adalah...", options: ["A. Tutup telepon", "B. Empati dan beri estimasi perbaikan", "C. Salahkan cuaca", "D. Minta servis sendiri", "E. Minta biaya tambahan"], ans: 1, exp: "Komunikasi yang solutif menjaga kepuasan dan loyalitas pelanggan[cite: 344, 346]." },
  { q: "40. Risiko jangka panjang strategi 'Banting Harga' di bawah pasar adalah...", options: ["A. Pelanggan makin banyak", "B. Sulit tutup operasional dan kualitas turun", "C. Kompetitor takut", "D. Pajak makin besar", "E. Gaji karyawan naik"], ans: 1, exp: "Harga terlalu rendah merusak margin keuntungan dan menghambat operasional[cite: 350, 351]." }
];

const essayData: Essay[] = [
  { q: "1. Jelaskan apa yang dimaksud dengan tahap 'Scheduling' dalam perencanaan produksi massal!", exp: "<b>Scheduling</b> adalah tahap penetapan jadwal waktu pengerjaan produksi. Ketepatan jadwal krusial untuk memastikan produk selesai tepat waktu, menghindari penumpukan barang, dan menjaga kepercayaan pelanggan terhadap estimasi pengiriman." },
  { q: "2. Jelaskan parameter apa saja yang diuji dalam 'Stress Test' pada switch jaringan!", exp: "<b>Stress Test</b> menguji batas beban trafik maksimal, daya tahan suhu operasional ekstrem, serta kestabilan koneksi saat ribuan request masuk bersamaan. Jika tahap ini dilewati, produk berisiko mengalami gagal fungsi mendadak saat digunakan konsumen." },
  { q: "3. Mengapa pendaftaran Hak Kekayaan Intelektual (HAKI) penting bagi startup IT?", exp: "Pendaftaran HAKI memberikan perlindungan hukum agar identitas merek atau inovasi kode program tidak diklaim oleh pihak lain, meningkatkan nilai aset perusahaan, serta memberikan rasa aman bagi investor." },
  { q: "4. Hitung BEP Unit: Biaya Tetap Rp10jt, Harga Jual Rp15jt, Biaya Variabel Rp12jt!", exp: "BEP Unit = Biaya Tetap / (Harga Jual - Biaya Variabel) = 10.000.000 / (15.000.000 - 12.000.000) = 10.000.000 / 3.000.000 = <b>3,33 unit</b> (dibulatkan menjadi 4 unit penjualan agar mulai untung)." },
  { q: "5. Mengapa Content Marketing lebih efektif dibanding Hard Selling untuk jasa IT?", exp: "Content Marketing membangun <b>Otoritas</b> dan <b>Kepercayaan</b> calon pelanggan dengan membuktikan keahlian teknis secara gratis melalui konten edukasi, sehingga pelanggan lebih cenderung menggunakan jasa yang sudah terbukti kemampuannya." }
];

export default function SimulasiPKKPage() {
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
        <div className="bg-white rounded-3xl p-10 md:p-16 shadow-2xl text-center max-w-2xl w-full border-t-8 border-indigo-600 animate-fade-in-up">
          <div className="text-6xl mb-6">🚀💼</div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">Simulasi PSAJ PKK - TJKT</h1>
          <p className="text-slate-600 mb-8 text-lg">Asah jiwa wirausaha teknologimu: Produksi massal, Analisis Keuangan, HAKI, dan Strategi Pemasaran Digital.</p>
          <button onClick={handleStart} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:-translate-y-1 uppercase tracking-widest">Buka Blueprint Bisnis</button>
        </div>
      )}

      {view === 'quiz' && (
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-3xl w-full border-t-4 border-indigo-600 animate-fade-in-up">
          <div className="flex justify-between items-center mb-3 text-indigo-600 font-bold text-sm uppercase tracking-widest">
            <span>Project: {currentIndex + 1} / {mcqData.length}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 mb-8 overflow-hidden shadow-inner">
            <div className="bg-gradient-to-r from-indigo-600 to-violet-500 h-full transition-all duration-500" style={{ width: `${((currentIndex + 1) / mcqData.length) * 100}%` }}></div>
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-8 leading-relaxed">{mcqData[currentIndex].q}</h2>
          <div className="flex flex-col gap-3">
            {mcqData[currentIndex].options.map((opt, i) => {
              const hasAnswered = answers[currentIndex] !== null;
              const isCorrect = i === mcqData[currentIndex].ans;
              const isSelected = i === answers[currentIndex];
              let btnClass = "text-left p-4 rounded-xl border-2 transition-all ";
              if (!hasAnswered) btnClass += "border-slate-200 bg-white hover:border-indigo-600 hover:bg-indigo-50 cursor-pointer";
              else btnClass += isCorrect ? "border-emerald-600 bg-emerald-50 text-emerald-900 font-bold" : isSelected ? "border-rose-600 bg-rose-50 text-rose-900" : "border-slate-100 opacity-40";
              return <button key={i} onClick={() => handleAnswer(i)} disabled={hasAnswered} className={btnClass}>{opt}</button>;
            })}
          </div>
          {answers[currentIndex] !== null && (
            <div className="mt-8 p-6 rounded-2xl bg-indigo-50 border-l-8 border-indigo-600 animate-fade-in">
              <h4 className="font-bold text-indigo-800 mb-2 uppercase tracking-tighter">Business Insight:</h4>
              <p className="text-slate-700 leading-relaxed">{mcqData[currentIndex].exp}</p>
            </div>
          )}
          <div className="mt-8 flex justify-end">
            {answers[currentIndex] !== null && <button onClick={handleNext} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-10 rounded-xl shadow-lg transition-transform hover:scale-105 uppercase">{currentIndex === mcqData.length - 1 ? 'Review Pitch' : 'Next Phase'}</button>}
          </div>
        </div>
      )}

      {view === 'essay' && (
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-4xl w-full border-t-8 border-indigo-600 animate-fade-in-up">
          <h2 className="text-3xl font-extrabold text-slate-800 mb-8 text-center tracking-tight uppercase">Dokumentasi Strategi Usaha</h2>
          <div className="flex flex-col gap-6">
            {essayData.map((item, index) => (
              <div key={index} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                <h3 className="font-bold text-indigo-700 mb-4 text-lg border-b border-indigo-100 pb-2">{item.q}</h3>
                <p className="text-slate-700 leading-loose" dangerouslySetInnerHTML={{ __html: item.exp }} />
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <button onClick={handleStart} className="bg-slate-800 hover:bg-black text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:-translate-y-1 uppercase">Re-Analyze Market</button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex justify-center items-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-10 text-center max-w-md w-full shadow-2xl border-4 border-indigo-600">
            <div className="text-5xl mb-4">🏆💰</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Pitching Selesai!</h2>
            <p className="text-slate-500 mb-8">Business IQ Anda:</p>
            <div className="relative w-44 h-44 mx-auto mb-8 flex justify-center items-center rounded-full shadow-inner border-8 border-slate-50" style={{ background: `conic-gradient(#4f46e5 ${finalScore}%, #f1f5f9 0)` }}>
              <div className="absolute inset-3 bg-white rounded-full flex justify-center items-center shadow-lg"><span className="text-6xl font-black text-indigo-600">{finalScore}</span></div>
            </div>
            <h3 className="text-lg font-bold text-slate-700 mb-8 px-4">
              {finalScore >= 85 ? "CEO Material! Visi bisnismu sangat tajam. 🌟" : finalScore >= 70 ? "Manajer Berbakat! Pahami lagi detail teknis produksinya. 👍" : "Ayo Belajar Lagi! Setiap kegagalan adalah modal menuju sukses. 💪"}
            </h3>
            <button onClick={() => { setShowModal(false); setView('essay'); window.scrollTo(0,0); }} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg uppercase tracking-widest">Buka Laporan Audit</button>
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