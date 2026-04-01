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

// --- DATA SOAL INFORMATIKA ---
const mcqData: MCQ[] = [
  { q: "1. Ada berapa solusi yang dapat dilakukan dalam metode penalaran abduktif…", options: ["A. Lima", "B. Tiga", "C. Empat", "D. Dua", "E. Enam"], ans: 2, exp: "Metode penalaran abduktif memiliki 4 kriteria/solusi untuk menguji hipotesis, yaitu: Simplicity, Coherence, Predictability, dan Comprehension." },
  { q: "2. Jika P bernilai benar dan Q bernilai salah, maka nilai kebenaran untuk P implikasi Q adalah…", options: ["A. Benar", "B. Salah", "C. Benar dan Salah", "D. Salah dan Benar", "E. Tidak bisa dipastikan"], ans: 1, exp: "Dalam tabel kebenaran Implikasi (P → Q), pernyataan hanya akan bernilai SALAH jika anteseden (P) bernilai BENAR dan konsekuen (Q) bernilai SALAH." },
  { q: "3. Berikut merupakan pengertian algoritme yang tepat adalah…", options: ["A. Kumpulan proses penyelesaian masalah komputasi yang terdapat dalam satuan device.", "B. Urutan penyelesaian masalah yang disusun secara sistematis.", "C. Langkah komputasi untuk mengolah data sehingga dapat menghasilkan suatu informasi.", "D. Proses computer untuk menghasilkan informasi.", "E. Aturan komputasi yang dibuat programmer."], ans: 1, exp: "Algoritma secara mendasar didefinisikan sebagai langkah-langkah logis dan urutan penyelesaian masalah yang disusun secara sistematis." },
  { q: "4. Berikut kata penghubung Disjungsi yang benar adalah…", options: ["A. 'Dan, ^'", "B. 'Atau, v'", "C. 'Jika, ^'", "D. 'Jika, v'", "E. 'Atau, ^'"], ans: 1, exp: "Disjungsi adalah pernyataan majemuk dalam logika matematika yang menggunakan kata penghubung 'atau' dan disimbolkan dengan 'v'." },
  { q: "5. Berapakah ukuran kertas A4?", options: ["A. 21 cm x 22 cm", "B. 22 cm x 33 cm", "C. 22 cm x 29.7 cm", "D. 21 cm x 33 cm", "E. 21 cm x 29.7 cm"], ans: 4, exp: "Standar internasional (ISO 216) untuk ukuran kertas A4 adalah 210 mm x 297 mm, atau sama dengan 21 cm x 29.7 cm." },
  { q: "6. Ada empat elemen penting dalam logika proposisi, yaitu…", options: ["A. Subjek, Predikat, Objek, Kopula", "B. Subjek, Objek, Kopula, Kuantor", "C. Subjek, Predikat, Kopula, Kuantor", "D. Subjek, Predikat, Objek, Kuantor", "E. Subjek, Objek, Kopula, Kuantor"], ans: 2, exp: "Kalimat proposisi memiliki 4 elemen utama: Kuantor (penunjuk jumlah), Subjek (hal yang dibicarakan), Kopula (kata penghubung), dan Predikat (sifat/keterangan)." },
  { q: "7. Yang bukan istilah dalam logika matematika adalah…", options: ["A. Negasi", "B. Disjungsi", "C. Implikasi", "D. Proposisi", "E. Biimplikasi"], ans: 3, exp: "Negasi, disjungsi, implikasi, dan biimplikasi adalah *operator logika*. Sedangkan 'Proposisi' adalah bentuk kalimat deklaratifnya itu sendiri, bukan nama operasinya." },
  { q: "8. Abduktif adalah metode penalaran yang dilakukan dengan mengambil salah satu argumentasi. Ada beberapa solusi yang dapat dilakukan kecuali…", options: ["A. Comprehensive", "B. Simplicity", "C. Generalisasi", "D. Coherence", "E. Predictability"], ans: 2, exp: "Solusi abduktif meliputi Simplicity, Coherence, Predictability, dan Comprehensive. Generalisasi adalah bagian dari penalaran Induktif." },
  { q: "9. Berapakah ukuran kertas F4?", options: ["A. 21 cm x 22 cm", "B. 22 cm x 33 cm", "C. 22 cm x 29.7 cm", "D. 21 cm x 33 cm", "E. 21 cm x 29.7 cm"], ans: 3, exp: "Kertas F4 (sering disebut kertas Folio) umumnya memiliki ukuran lebar 21 cm (atau 21.5 cm) dan panjang 33 cm." },
  { q: "10. Berikut ini yang merupakan kekurangan dari pola pikir…", options: ["A. Memiliki pemikiran yang konstruktif", "B. Melakukan sesuatu dengan bertahap", "C. Memaksakan kehendaknya untuk mengikuti aturan dan merasa dirinya paling tahu segalanya.", "D. Membuat rencana secara bertahap", "E. Pola pikirnya masih lambat."], ans: 2, exp: "Memaksakan kehendak dan merasa paling tahu adalah ciri pola pikir tertutup (fixed mindset) dan arogan, yang sangat menghambat proses belajar dan kolaborasi." },
  { q: "11. Istilah yang sering digunakan dalam logika matematika adalah…", options: ["A. Modus ponen, modus tollens, modus penambahan", "B. Negasi, konjungsi, disjungsi, implikasi, biimplikasi", "C. Negasi, deduktif, konjungsi, implikasi, silogisme.", "D. Disjungsi, deduktif, induktif, modus ponen", "E. Implikasi, biimplikasi, deduktif, induktif"], ans: 1, exp: "Kelima istilah tersebut (Negasi, konjungsi, disjungsi, implikasi, biimplikasi) adalah operator dasar untuk menyusun tabel kebenaran dalam logika matematika." },
  { q: "12. Berikut ini yang bukan merupakan solusi dari abduktif yaitu…", options: ["A. Simplicity", "B. Coherence", "C. Predictability", "D. Comprehensive", "E. Biimplikai"], ans: 4, exp: "Biimplikasi adalah istilah operasi dalam logika matematika (Jika dan hanya jika), bukan kriteria pemecahan argumen abduktif." },
  { q: "13. Urutan penyelesaian masalah adalah….", options: ["A. Logika", "B. Algoritma", "C. Peta", "D. Kategori", "E. Cara"], ans: 1, exp: "Algoritma pada dasarnya adalah urutan langkah-langkah yang logis untuk menyelesaikan sebuah masalah." },
  { q: "14. Dalam metode penalaran manusia dapat dikategorikan menjadi…", options: ["A. 5", "B. 4", "C. 3", "D. 2", "E. 1"], ans: 2, exp: "Ada 3 jenis metode penalaran utama, yaitu Deduktif, Induktif, dan Abduktif." },
  { q: "15. Ciri khusus yang dapat diidentifikasikan dari pernyataan atau metode silogisme negative adalah…", options: ["A. 'tidak' atau 'bukan'", "B. 'jika' dan 'hanya jika'", "C. 'atau'", "D. 'dan'", "E. 'jika' dan 'maka'"], ans: 0, exp: "Pernyataan negatif selalu menggunakan kata sangkalan seperti 'tidak' atau 'bukan' untuk meniadakan suatu keadaan." },
  { q: "16. Untuk menentukan validasi argument yang dinyatakan, anda harus memperhatikan beberapa aspek berikut. Manakah yang bukan aspek…", options: ["A. Tetapkan premis atau hipnotis dan ambil simpulannya.", "B. Aspek penggunaan dalam proposisi", "C. Buatlah tanda pada setiap barisan pernyataan yang dianggap benar.", "D. Gunakan mekanisme table kebenaran.", "E. Jika ditemukan barisan pernyataan kritis bernilai salah."], ans: 1, exp: "Aspek penggunaan dalam proposisi tidak termasuk dalam langkah-langkah prosedural memvalidasi argumen logika matematika." },
  { q: "17. Apakah pengertian dari Drag and Drop?", options: ["A. Klik tombol R ditahan, digeser, kemudian tombol R dilepas", "B. Klik tombol L ditahan, digeser, kemudian tombol R dilepas", "C. Klik tombol L ditahan, digeser ke tempat yang diinginkan, kemudian tombol L dilepas", "D. Klik tombol R ditahan, digeser, kemudian tombol L dilepas", "E. Klik tombol L ditahan, digeser, kemudian tombol L dilepas"], ans: 2, exp: "Drag and Drop (Seret dan Lepas) dilakukan dengan menekan tombol klik Kiri (Left/L) mouse ditahan, digeser, lalu dilepas." },
  { q: "18. Manakah yang termasuk contoh aktivitas yang dapat menggunakan metode deduktif…", options: ["A. Menguraikan secara detail Langkah ide tersebut.", "B. Menjadikan pedoman menentukan penyelesaian.", "C. Menyeimbangkan pola kerja otak.", "D. Tetapkan premis dan ambil simpulnya.", "E. Melakukan operasi perhitungan dengan aturan operator atau rumus tertentu"], ans: 4, exp: "Penalaran deduktif bergerak dari aturan umum ke khusus. Menerapkan rumus matematika ke soal spesifik adalah metode deduktif nyata." },
  { q: "19. Apakah nama dari bagian gambar yang ditunjukkan oleh nomor 2 (pada antarmuka Word)?", options: ["A. Menu Bar", "B. Sub Menu Bar", "C. Tittle Bar", "D. Sub Tittle Bar", "E. Lembar Kerja"], ans: 0, exp: "Dalam anatomi window aplikasi perkantoran, baris di bawah judul yang berisi susunan tab (File, Home, Insert) disebut Menu Bar atau Ribbon." },
  { q: "20. Apakah nama dari bagian gambar yang ditunjukkan oleh nomor 3 (pada antarmuka Word)?", options: ["A. Menu Bar", "B. Sub Menu Bar", "C. Tittle Bar", "D. Sub Tittle Bar", "E. Lembar Kerja"], ans: 4, exp: "Area putih kosong dan luas di tengah layar yang digunakan untuk mengetik dokumen disebut Lembar Kerja (Workspace)." },
  { q: "21. 'Jika ia rajin maka ia kaya' dan 'jika ia kaya maka ia senang'. 'Jika ia rajin maka ia seneng'. Maka kesimpulan dari pernyataan diatas adalah…", options: ["A. Analogi", "B. Generalisasi", "C. Modus Tollens", "D. Silogisme", "E. Modus Ponen"], ans: 3, exp: "Pola (P → Q) dan (Q → R) berkesimpulan (P → R) adalah bentuk rumus penarikan kesimpulan Silogisme." },
  { q: "22. Berikut contoh pernyataan yang tidak termasuk dalam kategori proposisi yaitu…", options: ["A. 12+5=17", "B. 20-9=11", "C. 4x+y=34", "D. Setiap angka dikalikan 0 maka menghasilkan 0", "E. Universitas negeri sebelas maret adalah PTN."], ans: 2, exp: "Proposisi adalah kalimat deklaratif yang sudah pasti nilai benar/salahnya. '4x+y=34' adalah kalimat terbuka karena nilainya bergantung pada x dan y." },
  { q: "23. Tujuan penalaran adalah untuk…", options: ["A. Menghasilkan masalah", "B. Mendapatkan konklusi", "C. Menghasilkan rumusan", "D. Mendapatkan jawaban", "E. Menghasilkan aliran tertentu"], ans: 1, exp: "Penalaran (reasoning) adalah proses berpikir logis untuk menarik sebuah kesimpulan (konklusi) dari premis yang ada." },
  { q: "24. Pengertian tentang Microsoft Word adalah?", options: ["A. Pengolah Angka", "B. Pengolah Kata", "C. Presentasi", "D. Edit Foto", "E. Design Grafis"], ans: 1, exp: "Microsoft Word adalah software buatan Microsoft yang berfungsi utama sebagai aplikasi Word Processor (Pengolah Kata)." },
  { q: "25. Metode membalikkan nilai sebelumnya yang semula benar menjadi salah yaitu…", options: ["A. Konjungsi", "B. Negasi", "C. Disjungsi", "D. Implikasi", "E. Biimplikasi"], ans: 1, exp: "Negasi atau ingkaran (~) adalah operasi yang membalikkan nilai kebenaran. Benar menjadi Salah, dan sebaliknya." },
  { q: "26. Contoh aktivitas yang dapat menggunakan deduktif dalam pengambilan simpulannya yaitu…", options: ["A. Analogi yang dilakukan dengan mempertimbangkan keseragaman.", "B. Melakukan operasi perhitungan dengan aturan, operator atau rumus tertentu.", "C. Memprediksi kebenaran jawaban.", "D. Menerapkan Teknik analisis.", "E. Menggambarkan model kenyataan."], ans: 1, exp: "Menerapkan aturan baku atau rumus (umum) untuk menghitung angka tertentu (khusus) adalah wujud logika deduktif." },
  { q: "27. Mendeskripsi, merancang, dan Menyusun jenis pembuktian langsung, tak langsung, ataupun dengan konsep induksi matematis merupakan contoh aktivitas dari metode…", options: ["A. Negasi", "B. Induktif", "C. Pola berfikir", "D. Abduktif", "E. Deduktif"], ans: 4, exp: "Dalam keilmuan, pembuktian matematis secara konseptual adalah proses logika yang bersifat deduktif absolut." },
  { q: "28. Salah satunya adalah konjungsi. Apakah yang dimaksud konjungsi itu?", options: ["A. Teknik penggabungan", "B. Teknik pembalikan", "C. Teknik perbandingan", "D. Teknik penalaran", "E. Teknik penulisan"], ans: 0, exp: "Konjungsi ('Dan') berfungsi untuk menggabungkan dua pernyataan tunggal menjadi satu pernyataan majemuk." },
  { q: "29. Dibawah ini yang bukan termasuk elemen penting logika proposisi adalah...", options: ["A. Subjek", "B. Kopula", "C. Objek", "D. Predikat", "E. Kuantor"], ans: 2, exp: "4 elemen utama kalimat proposisi kategori adalah: Kuantor, Subjek, Kopula, dan Predikat. Objek tidak termasuk elemen wajib." },
  { q: "30. Ada beberapa manfaat ide dan gagasan dibawah yang tidak termasuk manfaat ide dan gagasan adalah…", options: ["A. Dapat menjadi solusi alternatif.", "B. Memberikan peran aktif dan positif", "C. Mendorong lahirnya inofasi baru", "D. Memberikan dampak negatif", "E. Memberikan contoh dan teladan"], ans: 3, exp: "Memberikan dampak negatif jelas bukan sebuah 'manfaat' dari pemunculan ide/gagasan." },
  { q: "31. Apakah fungsi dari tombol di gambar ini? (Simbol B, I, U)", options: ["A. Bold, Inchi, Underline", "B. Bold, Italic, Meter", "C. Bold, Italic, Underline", "D. Base, Italic, Underline", "E. Base, Inchi, Underline"], ans: 2, exp: "Tombol pemformatan teks dasar di Word: B (Bold/Tebal), I (Italic/Miring), dan U (Underline/Garis Bawah)." },
  { q: "32. Perlakuan atau Tindakan yang dilakukan atau dikenakan pada subjek. Pernyataan tersebut merupakan pengertian dari…", options: ["A. Subjek", "B. Predikat", "C. Kopula", "D. Kuantor", "E. Proporsi"], ans: 1, exp: "Predikat berfungsi menjelaskan tindakan, perlakuan, keadaan, atau sifat yang dikenakan kepada Subjek." },
  { q: "33. Berikut tahapan untuk mengategorikan dan menggambarkan ide dalam sebuah system pemetaan (Mind Map) kecuali…", options: ["A. Menentukan pokok permasalahan sebagai ide utama.", "B. Setelah menentukan ide utama, kemudian menjelaskan komponen pendukungnya.", "C. Dari sub tema kembangkan sub-sub item.", "D. Identifikasi setiap cabang-cabang yang mungkin ada.", "E. Rangkaian ide utama dan subtema saling terhubung"], ans: 1, exp: "Dalam Peta Minda (Mind Map), kita tidak dituntut untuk 'menjelaskan' panjang lebar, melainkan hanya merangkai kata kunci (keywords) yang ringkas." },
  { q: "34. Penarikan kesimpulan yang bergerak dari pernyataan benar yang khusus ke umum di sebut….", options: ["A. Umum", "B. Khusus", "C. Campuran", "D. Induktif", "E. Deduktif"], ans: 3, exp: "Metode induktif mengumpulkan fakta-fakta spesifik/khusus untuk ditarik menjadi sebuah kesimpulan umum (Generalisasi)." },
  { q: "35. Metode penarikan poin simpulan terhadap kasus yang bersifat khusus merupakan pengertian dari metode…", options: ["A. Entimen", "B. Transduktif", "C. Silogisme", "D. Analogi", "E. Generalisasi"], ans: 2, exp: "Silogisme menggunakan premis umum dan premis khusus untuk menghasilkan kesimpulan yang spesifik pada kasus/subjek tersebut (Deduksi)." },
  { q: "36. Premis 1: Jika supri merokok maka ia sakit jantung. Premis 2: Supri tidak sakit jantung. Kesimpulan: Supri tidak merokok. Maka penarikan kesimpulan tersebut menggunakan prinsip…", options: ["A. Silogisme", "B. Modus ponen", "C. Modus tollens", "D. Analogi", "E. Generalisasi"], ans: 2, exp: "Rumus Modus Tollens: Jika P → Q, dan diketahui ~Q (Tidak sakit jantung), maka kesimpulannya adalah ~P (Tidak merokok)." },
  { q: "37. Yang tidak termasuk aspek penggunaan dalam proposisi adalah…", options: ["A. Aspek bentuk", "B. Aspek sifat", "C. Aspek luas", "D. Aspek kualitas dan kuantitas", "E. Aspek gerak"], ans: 4, exp: "Dalam logika, proposisi dianalisis berdasar bentuk, sifat, luas, dan kualitas. Tidak ada yang namanya 'Aspek gerak'." },
  { q: "38. Pengertian tentang Microsoft Excel adalah?", options: ["A. Pengolah Angka", "B. Pengolah Kata", "C. Presentasi", "D. Edit Foto", "E. Design Grafis"], ans: 0, exp: "Microsoft Excel adalah software Spreadsheet yang dikhususkan untuk pengolahan data angka, tabel, dan formula perhitungan aritmatika." },
  { q: "39. Apakah nama dari bagian gambar yang ditunjukkan oleh nomor 1 (Area paling atas)?", options: ["A. Menu Bar", "B. Sub Menu Bar", "C. Tittle Bar", "D. Sub Tittle Bar", "E. Lembar Kerja"], ans: 2, exp: "Baris paling atas pada jendela aplikasi yang menampilkan nama dokumen dan nama aplikasi selalu disebut Title Bar (Baris Judul)." },
  { q: "40. Dalam Menyusun suatu program langkah pertama yang harus dilakukan adalah...", options: ["A. Membuat program", "B. Membuat algoritma", "C. Membeli computer", "D. Prosesor", "E. Membuat program"], ans: 1, exp: "Sebelum menulis kode (coding), seorang programmer wajib merancang algoritmanya terlebih dahulu agar alur logika aplikasi terstruktur." }
];

const essayData: Essay[] = [
  { q: "41. Sebutkan dan jelaskan secara singkat 4 (empat) elemen yang membentuk sebuah kalimat logika proposisi!", exp: "<b>Pembahasan:</b><br/>1. <b>Kuantor</b>: Penunjuk jumlah atau cakupan dari pernyataan (misal: Semua, Sebagian).<br/>2. <b>Subjek</b>: Hal atau benda pokok yang sedang dibicarakan.<br/>3. <b>Kopula</b>: Kata penghubung antara Subjek dan Predikat (misal: adalah, bukan).<br/>4. <b>Predikat</b>: Keterangan, sifat, atau perlakuan yang dikenakan kepada Subjek." },
  { q: "42. Jelaskan perbedaan mendasar antara metode penalaran Deduktif dan Induktif beserta contohnya!", exp: "<b>Pembahasan:</b><br/><b>Deduktif</b>: Menarik kesimpulan dari pernyataan Umum ke hal Khusus. (Contoh: Semua manusia butuh minum. Budi adalah manusia. Maka, Budi butuh minum).<br/><b>Induktif</b>: Menarik kesimpulan umum berdasarkan pengamatan fakta-fakta Khusus. (Contoh: Besi dipanaskan memuai. Emas dipanaskan memuai. Maka, semua logam dipanaskan memuai)." },
  { q: "43. Tuliskan rumus (pola) dari Modus Ponens dan buatlah contoh kalimat premis hingga kesimpulannya!", exp: "<b>Pembahasan:</b><br/><b>Pola Modus Ponens:</b><br/>Premis 1: P → Q (Jika P, maka Q)<br/>Premis 2: P (P benar terjadi)<br/>Kesimpulan: Q (Maka Q pasti terjadi)<br/><br/><b>Contoh:</b><br/>Premis 1: Jika hari ini hujan, maka jalanan basah.<br/>Premis 2: Hari ini hujan.<br/>Kesimpulan: Jalanan basah." },
  { q: "44. Apa yang dimaksud dengan Peta Minda (Mind Mapping) dan sebutkan 3 manfaatnya!", exp: "<b>Pembahasan:</b><br/><b>Pengertian:</b> Peta minda adalah metode visual untuk menyusun dan menghubungkan ide-ide secara hierarkis menggunakan diagram bercabang.<br/><b>Manfaat:</b><br/>1. Merangsang kinerja otak kanan dan kiri secara seimbang.<br/>2. Memudahkan pemahaman informasi kompleks menjadi lebih terstruktur.<br/>3. Memudahkan proses brainstorming dan mengingat materi." },
  { q: "45. Jelaskan perbedaan kegunaan utama antara perangkat lunak Microsoft Word dan Microsoft Excel!", exp: "<b>Pembahasan:</b><br/><b>Microsoft Word:</b> Adalah <i>Word Processor</i> (Pengolah Kata). Digunakan untuk membuat, mengedit, memformat, dan menyusun dokumen berbasis teks (surat, proposal, makalah).<br/><b>Microsoft Excel:</b> Adalah <i>Spreadsheet</i> (Pengolah Angka). Digunakan untuk mengorganisasi data dalam bentuk tabel baris dan kolom, melakukan perhitungan otomatis dengan rumus/fungsi, dan membuat visualisasi grafik." }
];

export default function SimulasiInformatikaPage() {
  // --- STATES ---
  const [view, setView] = useState<'landing' | 'quiz' | 'essay'>('landing');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(mcqData.length).fill(null));
  const [showModal, setShowModal] = useState<boolean>(false);

  // --- HANDLERS ---
  const handleStart = () => {
    setView('quiz');
    setCurrentIndex(0);
    setScore(0);
    setAnswers(Array(mcqData.length).fill(null));
  };

  const handleAnswer = (index: number) => {
    if (answers[currentIndex] !== null) return;
    
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentIndex] = index;
      return newAnswers;
    });
    
    if (index === mcqData[currentIndex].ans) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < mcqData.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowModal(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleGoToEssays = () => {
    setShowModal(false);
    setView('essay');
    window.scrollTo(0, 0);
  };

  // --- RENDERERS ---
  const renderLanding = () => (
    <div className="bg-slate-900 rounded-3xl p-10 md:p-16 shadow-2xl text-center max-w-2xl w-full mx-auto animate-fade-in-up border-t-8 border-cyan-500">
      <div className="text-6xl mb-6 flex justify-center gap-4">
        <span>💻</span><span>⌨️</span><span>🤖</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-cyan-400 mb-4 tracking-tight font-mono">Terminal Kuis Informatika</h1>
      <p className="text-slate-300 mb-8 text-lg leading-relaxed font-mono">
        Uji kemampuan logikamu: penalaran algoritma, operasi logika matematika, dan literasi aplikasi perkantoran (Microsoft Office).
      </p>
      <button 
        onClick={handleStart}
        className="bg-cyan-600 hover:bg-cyan-500 text-slate-900 font-bold py-4 px-10 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_15px_rgba(6,182,212,0.5)] text-lg uppercase tracking-widest"
      >
        [ Execute System ]
      </button>
    </div>
  );

  const renderQuiz = () => {
    const currentQuestion = mcqData[currentIndex];
    const progressPercentage = ((currentIndex + 1) / mcqData.length) * 100;
    const hasAnswered = answers[currentIndex] !== null;
    const selectedOption = answers[currentIndex];

    return (
      <div className="bg-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl max-w-3xl w-full mx-auto animate-fade-in-up border border-slate-700">
        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-bold text-cyan-400 font-mono tracking-wider">
            COMPILE {currentIndex + 1} / {mcqData.length}
          </span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-3 mb-8 overflow-hidden shadow-inner">
          <div 
            className="bg-gradient-to-r from-cyan-600 to-blue-400 h-full rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* Question */}
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 mb-8 shadow-sm">
          <h2 
            className="text-xl md:text-2xl font-medium text-slate-100 leading-relaxed font-sans"
            dangerouslySetInnerHTML={{ __html: currentQuestion.q }}
          />
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3 font-sans">
          {currentQuestion.options.map((opt, i) => {
            const isCorrect = i === currentQuestion.ans;
            const isSelected = i === selectedOption;
            
            let btnClass = "text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center ";
            
            if (!hasAnswered) {
              btnClass += "border-slate-700 bg-slate-800 hover:border-cyan-500 hover:bg-slate-800 text-slate-300 cursor-pointer hover:translate-x-1 hover:shadow-[0_0_10px_rgba(6,182,212,0.2)]";
            } else {
              btnClass += "cursor-default ";
              if (isCorrect) {
                btnClass += "border-emerald-500 bg-emerald-900/40 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.3)]";
              } else if (isSelected && !isCorrect) {
                btnClass += "border-rose-500 bg-rose-900/40 text-rose-300";
              } else {
                btnClass += "border-slate-800 bg-slate-800/50 text-slate-500 opacity-60";
              }
            }

            return (
              <button 
                key={i} 
                onClick={() => handleAnswer(i)}
                disabled={hasAnswered}
                className={btnClass}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 font-bold text-sm ${!hasAnswered ? 'bg-slate-700 text-slate-300' : isCorrect ? 'bg-emerald-500 text-slate-900' : isSelected ? 'bg-rose-500 text-slate-900' : 'bg-slate-800 text-slate-600'}`}>
                  {String.fromCharCode(65 + i)}
                </div>
                <span className="text-lg" dangerouslySetInnerHTML={{ __html: opt.substring(3).replace(/\\n/g, '<br/>') }} />
              </button>
            );
          })}
        </div>

        {/* Feedback Section */}
        {hasAnswered && (
          <div className={`mt-8 p-6 rounded-2xl animate-fade-in shadow-inner border-l-4 ${selectedOption === currentQuestion.ans ? 'bg-emerald-900/20 border-emerald-500' : 'bg-rose-900/20 border-rose-500'}`}>
            <h4 className={`font-bold text-lg mb-4 flex items-center gap-2 font-mono ${selectedOption === currentQuestion.ans ? 'text-emerald-400' : 'text-rose-400'}`}>
              {selectedOption === currentQuestion.ans ? '> SYSTEM: TRUE' : '> SYSTEM: FALSE_ERROR'}
            </h4>
            <div className="text-slate-300 leading-loose font-sans text-md bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-sm">
              <strong className="text-cyan-400 font-mono">{'//'} Debug_Log: </strong> <span dangerouslySetInnerHTML={{ __html: currentQuestion.exp }} />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex justify-between font-mono">
          <button 
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-sm ${currentIndex === 0 ? 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700' : 'bg-slate-700 border border-slate-600 text-slate-200 hover:border-slate-500 hover:bg-slate-600 transform hover:-translate-x-1'}`}
          >
            {'< Prev'}
          </button>
          {hasAnswered ? (
            <button 
              onClick={handleNext}
              className={`font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-md transform hover:translate-x-1 ${currentIndex === mcqData.length - 1 ? 'bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 'bg-cyan-600 hover:bg-cyan-500 text-slate-900 shadow-[0_0_15px_rgba(6,182,212,0.4)]'}`}
            >
              {currentIndex === mcqData.length - 1 ? 'Compile Result' : 'Next >'}
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  };

  const renderEssays = () => (
    <div className="bg-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl max-w-4xl w-full mx-auto animate-fade-in-up border-t-8 border-cyan-500">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-cyan-400 mb-3 tracking-tight font-mono">System Documentation (Esai)</h2>
        <p className="text-slate-400 font-sans">Pelajari algoritma pemikiran dan dokumentasi teori berikut.</p>
      </div>
      
      <div className="flex flex-col gap-8 font-sans">
        {essayData.map((item, index) => (
          <div key={index} className="bg-slate-800/50 border border-slate-700 p-6 md:p-8 rounded-2xl hover:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all duration-300 transform hover:-translate-y-1">
            <h3 
              className="font-bold text-cyan-300 mb-4 text-xl border-b-2 border-slate-700 pb-3"
              dangerouslySetInnerHTML={{ __html: item.q }}
            />
            <div 
              className="text-slate-300 leading-loose bg-slate-900 p-5 rounded-xl border border-slate-800 shadow-inner"
              dangerouslySetInnerHTML={{ __html: item.exp }} 
            />
          </div>
        ))}
      </div>

      <div className="mt-12 text-center font-mono">
        <button 
          onClick={handleStart}
          className="bg-slate-800 border border-slate-600 hover:bg-slate-700 text-cyan-400 font-bold py-4 px-10 rounded-xl transition-all shadow-xl hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:-translate-y-1 tracking-widest uppercase"
        >
          [ System_Reboot ]
        </button>
      </div>
    </div>
  );

  const finalScore = Math.round((score / mcqData.length) * 100);

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 font-sans text-slate-100 flex flex-col items-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black">
      
      {/* Main View Manager */}
      {view === 'landing' && renderLanding()}
      {view === 'quiz' && renderQuiz()}
      {view === 'essay' && renderEssays()}

      {/* Final Score Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in">
          <div className="bg-slate-900 rounded-3xl p-10 text-center max-w-md w-full shadow-[0_0_30px_rgba(6,182,212,0.2)] border border-slate-800 transform scale-100 transition-transform">
            <div className="text-5xl mb-4 font-mono text-cyan-500">{"</>"}</div>
            <h2 className="text-2xl font-bold text-slate-100 mb-2 font-mono">Execution Completed</h2>
            <p className="text-slate-400 mb-8 font-sans">Akurasi logikamu mencapai:</p>
            
            <div className="relative w-44 h-44 mx-auto mb-8 flex justify-center items-center rounded-full shadow-inner border-8 border-slate-800" 
                 style={{ background: `conic-gradient(#06b6d4 ${finalScore}%, #1e293b 0)` }}>
              <div className="absolute inset-3 bg-slate-900 rounded-full flex justify-center items-center shadow-lg">
                <span className="text-6xl font-black text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">{finalScore}</span>
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-slate-300 mb-8 px-4 leading-relaxed font-sans">
              {finalScore >= 85 ? "Syntax OK! Pemahaman algoritmamu sangat tajam. 🏆" : finalScore >= 70 ? "Warning! Ada sedikit bug di pemahaman teorimu. 📈" : "Fatal Error! Jangan menyerah, baca lagi dokumentasinya. 🧠"}
            </h3>
            
            <button 
              onClick={handleGoToEssays}
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-900 font-bold py-4 px-6 rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:-translate-y-1 tracking-widest font-mono uppercase"
            >
              [ View_Docs ]
            </button>
          </div>
        </div>
      )}

      {/* Internal CSS Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
      `}} />
    </div>
  );
}