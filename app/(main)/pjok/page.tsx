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

// --- DATA SOAL PJOK ---
const mcqData: MCQ[] = [
  { q: "1. Dalam perlombaan lari jarak pendek (sprint), jenis start yang diwajibkan bagi seluruh pelari adalah...", options: ["A. Start melayang (flying start)", "B. Start berdiri (bunch start)", "C. Start jongkok (crouching start)", "D. Start menengah (medium start)", "E. Start panjang (long start)"], ans: 2, exp: "Lari jarak pendek (100m, 200m, 400m) menggunakan start jongkok untuk memaksimalkan tolakan dan percepatan awal dari balok start." },
  { q: "2. Pada start jongkok, saat wasit memberikan aba-aba 'Siap', posisi badan yang benar adalah...", options: ["A. Panggul diangkat ke atas lebih tinggi dari bahu, berat badan dibawa ke depan", "B. Lutut kaki belakang menempel di tanah, kedua lengan lurus menopang badan", "C. Pelari menolak ke depan dengan kekuatan penuh", "D. Badan ditegakkan dan pandangan lurus jauh ke depan", "E. Bahu ditarik ke belakang dan pinggang diturunkan"], ans: 0, exp: "Pada aba-aba 'Siap', lutut diangkat, panggul dinaikkan sedikit lebih tinggi dari bahu, dan berat badan bergeser ke lengan untuk persiapan menolak." },
  { q: "3. Rangkaian atau urutan teknik dasar dalam nomor atletik lompat jauh yang benar adalah...", options: ["A. Awalan, melayang, tolakan, mendarat", "B. Tolakan, awalan, melayang, mendarat", "C. Awalan, tolakan, melayang, mendarat", "D. Melayang, awalan, tolakan, mendarat", "E. Awalan, tolakan, mendarat, melayang"], ans: 2, exp: "Teknik lompat jauh secara berurutan: lari awalan, tumpuan/tolakan di papan, melayang di udara, dan mendarat di bak pasir." },
  { q: "4. Dalam cabang olahraga tolak peluru, gaya menolak dengan cara membelakangi arah tolakan disebut gaya...", options: ["A. Gaya Ortodoks", "B. Gaya O'Brien", "C. Gaya Straddle", "D. Gaya Flop", "E. Gaya Glide menyamping"], ans: 1, exp: "Gaya O'Brien (gaya membelakangi) diciptakan oleh Parry O'Brien, di mana atlet membelakangi sektor tolakan sebelum meluncur." },
  { q: "5. Kuda-kuda merupakan sikap dasar dalam olahraga pencak silat. Fungsi utama pembentukan kuda-kuda yang kokoh adalah...", options: ["A. Mengelabui pandangan lawan sebelum menyerang", "B. Memperindah gerakan saat pertandingan seni", "C. Sebagai dasar tumpuan untuk menjaga keseimbangan saat menyerang maupun bertahan", "D. Melakukan lompatan setinggi mungkin", "E. Mempersiapkan otot lengan untuk memukul"], ans: 2, exp: "Kuda-kuda adalah menapakkan kaki untuk memperkokoh posisi tubuh agar tidak mudah dijatuhkan dan sebagai pijakan serangan/belaan." },
  { q: "6. Teknik untuk menggagalkan atau membelokkan serangan lawan dengan cara mengadakan kontak langsung terhadap anggota badan lawan dalam pencak silat disebut...", options: ["A. Hindaran", "B. Elakan", "C. Tangkisan", "D. Pukulan", "E. Tendangan"], ans: 2, exp: "Tangkisan adalah usaha pembelaan dengan mengadakan kontak fisik langsung (membentur) serangan lawan untuk mengalihkan arahnya." },
  { q: "7. Teknik serangan dalam pencak silat menggunakan sisi telapak tangan dengan lintasan dari luar ke dalam atau atas ke bawah disebut...", options: ["A. Pukulan lurus", "B. Tebasan", "C. Tusukan", "D. Bandul", "E. Tamparan"], ans: 1, exp: "Tebasan adalah serangan yang memanfaatkan sisi luar telapak tangan, mengarah ke leher/wajah dengan lintasan menyamping atau menurun." },
  { q: "8. Kesalahan yang sering terjadi pada saat melakukan guling ke belakang (backward roll) pada senam lantai adalah...", options: ["A. Dagu merapat ke dada", "B. Kedua lutut ditekuk rapat mendekati dada", "C. Tolakan kedua tangan tidak kuat dan kepala tidak menunduk", "D. Posisi punggung membulat", "E. Sikap akhir jongkok keseimbangan"], ans: 2, exp: "Tolakan tangan yang lemah dan kepala yang menengadah menyebabkan guling ke belakang gagal dilakukan karena leher terlipat." },
  { q: "9. Tiga prinsip dasar dalam senam irama adalah...", options: ["A. Kekuatan, kelincahan, dan keseimbangan", "B. Irama, kelentukan tubuh (fleksibilitas), dan kontinuitas gerakan", "C. Kecepatan, kelincahan, dan ketepatan", "D. Keseimbangan, keindahan, dan kekuatan", "E. Daya ledak, stamina, dan kelentukan"], ans: 1, exp: "Unsur terpenting senam irama: kesesuaian gerak dengan irama, kelentukan tubuh, serta kontinuitas (aliran gerak tak terputus)." },
  { q: "10. Pada renang gaya bebas (freestyle), teknik gerakan kaki yang benar adalah...", options: ["A. Menendang ke samping bersamaan seperti katak", "B. Mengayun naik turun secara bergantian dengan pusat gerakan pada pangkal paha", "C. Mengayun naik turun bersamaan seperti gerakan lumba-lumba", "D. Diam agar tidak menghambat laju tubuh", "E. Menendang dari lutut secara menyilang"], ans: 1, exp: "Gerakan kaki gaya bebas dilakukan naik turun bergantian, dan kekuatan cambukan berasal dari pangkal paha, bukan lutut." },
  { q: "11. Pada jalan cepat (race walking), teknik gerakan lutut saat kaki menapak tanah adalah...", options: ["A. Harus ditekuk untuk meredam benturan", "B. Diangkat setinggi pinggang", "C. Harus dalam keadaan lurus (tidak ditekuk) sampai kaki belakang melangkah maju", "D. Diluruskan lalu ditekuk saat menyentuh tanah", "E. Sedikit ditekuk untuk menambah kecepatan"], ans: 2, exp: "Sesuai peraturan, kaki yang menumpu di depan harus lurus (lutut tidak ditekuk) sesaat setelah menyentuh tanah hingga posisi tegak." },
  { q: "12. Teknik ayunan lengan yang benar pada jalan cepat adalah...", options: ["A. Lengan diluruskan dan diayun setinggi bahu", "B. Siku ditekuk sekitar 90 derajat dan diayunkan seirama dengan langkah kaki", "C. Lengan diayun menyilang melewati dada hingga pinggang", "D. Lengan diletakkan di belakang punggung", "E. Lengan dikepal dan diputar ke arah luar"], ans: 1, exp: "Siku ditekuk 90 derajat dan diayunkan maju mundur secara rileks dekat badan untuk membantu ritme langkah." },
  { q: "13. Pada lompat tinggi, gaya di mana posisi perut pelompat menghadap ke arah mistar saat melayang di udara disebut gaya...", options: ["A. Gaya Gunting (Scissors)", "B. Gaya Flop", "C. Gaya Straddle (Guling perut)", "D. Gaya Ortodoks", "E. Gaya Eastern Cut-off"], ans: 2, exp: "Gaya straddle dicirikan dengan tubuh atlet melayang tengkurap (perut menghadap mistar), berbeda dengan gaya flop yang membelakangi mistar." },
  { q: "14. Pesilat memancing lawan agar menyerang lebih dulu, lalu melakukan hindaran disusul serangan balik. Taktik ini disebut...", options: ["A. Serangan langsung", "B. Bertahan pasif", "C. Serangan balasan (counter attack)", "D. Sapuan bawah", "E. Tangkisan luar"], ans: 2, exp: "Counter attack memadukan belaan dengan serangan cepat saat pertahanan lawan terbuka akibat serangannya sendiri." },
  { q: "15. Gerakan loncat harimau (tiger sprong) pada dasarnya adalah pengembangan dari senam lantai...", options: ["A. Guling belakang", "B. Guling depan dengan awalan loncatan melayang", "C. Sikap lilin", "D. Loncat kangkang", "E. Kayang"], ans: 1, exp: "Loncat harimau dilakukan dengan meloncat melayang ke depan, mendarat dengan telapak tangan, dan langsung disambung guling depan." },
  { q: "16. Komponen utama yang dinilai dalam rangkaian (routine) senam lantai guling depan dilanjut lenting tengkuk adalah...", options: ["A. Kekuatan otot lengan saja", "B. Kecepatan lari awalan", "C. Kelancaran koneksi antargerak, keseimbangan, dan postur akhir", "D. Seberapa jauh melompat", "E. Jumlah putaran"], ans: 2, exp: "Dalam routine, transisi atau aliran gerak (flow) yang mulus antar elemen tanpa hilang keseimbangan adalah kriteria penilaian utama." },
  { q: "17. Dalam koreografi pemanasan senam irama, gerakan awal sebaiknya difokuskan pada...", options: ["A. Gerakan high impact", "B. Loncat-loncat setinggi mungkin", "C. Gerakan isolation (persendian kepala, bahu, pinggul) secara perlahan", "D. Pendinginan", "E. Angkat beban ringan"], ans: 2, exp: "Pemanasan harus bertahap, dimulai dari gerakan isolasi persendian kecil sebelum masuk ke pergerakan seluruh tubuh." },
  { q: "18. Bentuk peregangan dalam senam irama dengan cara mengayunkan tungkai berulang tanpa ditahan disebut...", options: ["A. Static stretching", "B. Dynamic stretching (peregangan dinamis)", "C. Ballistic stretching", "D. PNF stretching", "E. Isolation movement"], ans: 1, exp: "Dynamic stretching melibatkan pergerakan aktif ritmis, sangat cocok untuk pemanasan senam irama." },
  { q: "19. Posisi tubuh (body position) yang membedakan renang gaya punggung dengan gaya lainnya adalah...", options: ["A. Tubuh menghadap ke dasar kolam (telungkup)", "B. Tubuh dimiringkan konstan", "C. Tubuh telentang menghadap ke atas", "D. Kepala selalu di bawah air", "E. Dada membusung memecah air"], ans: 2, exp: "Gaya punggung dilakukan dengan tubuh telentang, sehingga wajah selalu di atas air untuk memudahkan pernapasan." },
  { q: "20. Kesalahan perenang gaya punggung pemula adalah 'panggul yang tenggelam'. Hal ini disebabkan oleh...", options: ["A. Mengambil napas terlalu cepat", "B. Kepala terlalu diangkat (mendongak) melihat ke ujung jari kaki", "C. Kepakan kaki terlalu cepat", "D. Ayunan tangan lebar", "E. Mata tertutup"], ans: 1, exp: "Jika kepala ditekuk ke depan melihat kaki, secara biomekanika panggul akan tenggelam dan menambah hambatan air." },
  { q: "21. Menggiring bola dengan memantulkannya ke lantai menggunakan satu tangan secara bergantian atau bersamaan dalam basket disebut...", options: ["A. Passing", "B. Shooting", "C. Dribbling", "D. Rebounding", "E. Pivot"], ans: 2, exp: "Dribbling adalah teknik dasar membawa bola bergerak dengan cara memantulkannya ke lantai menggunakan satu tangan." },
  { q: "22. Pemain A dijaga ketat oleh lawan yang lebih tinggi dengan tangan terentang. Teknik passing yang paling efektif adalah...", options: ["A. Chest pass", "B. Overhead pass", "C. Baseball pass", "D. Bounce pass (Operan pantul)", "E. Hook pass"], ans: 3, exp: "Bounce pass efektif menghindari blokade lawan tinggi karena bola dipantulkan ke bawah melewati celah pertahanan." },
  { q: "23. Cara memegang raket seolah berjabat tangan, di mana ibu jari dan telunjuk membentuk huruf 'V', disebut pegangan...", options: ["A. Backhand grip", "B. Forehand grip (English grip)", "C. American grip", "D. Frying pan grip", "E. Combination grip"], ans: 1, exp: "Pegangan jabat tangan yang membentuk huruf V di gagang raket adalah ciri khas pegangan forehand yang universal." },
  { q: "24. Teknik servis ganda bulutangkis yang efektif membatasi serangan lawan di awal reli adalah...", options: ["A. Servis panjang forehand", "B. Servis pendek backhand (Short serve)", "C. Servis lob tinggi", "D. Servis drive", "E. Servis flick"], ans: 1, exp: "Servis pendek backhand melayang tipis di atas net, memaksa lawan mengangkat bola sehingga kita mendapat peluang menyerang." },
  { q: "25. Mengoper bola jarak dekat dengan akurasi tinggi dalam sepak bola paling baik menggunakan...", options: ["A. Punggung kaki", "B. Ujung kaki", "C. Kaki bagian dalam (inner foot)", "D. Kaki bagian luar", "E. Tumit kaki"], ans: 2, exp: "Kaki bagian dalam memiliki bidang perkenaan datar dan luas, membuat operan pendek menjadi sangat akurat." },
  { q: "26. Kegunaan taktis menahan bola (control) dalam sepak bola adalah untuk...", options: ["A. Menunggu waktu habis", "B. Menghentikan bola agar mudah direbut", "C. Menenangkan diri", "D. Menguasai bola sepenuhnya untuk mengatur tempo dan menyiapkan umpan/tembakan", "E. Mendapat teguran wasit"], ans: 3, exp: "Control adalah kunci transisi permainan agar pemain punya stabilitas untuk mengambil keputusan selanjutnya." },
  { q: "27. Saat menerima servis keras (spike) dari lawan dalam bola voli, teknik yang paling tepat adalah...", options: ["A. Passing atas jari", "B. Passing bawah lengan disatukan dan diluruskan", "C. Blocking sendirian", "D. Menyundul", "E. Menendang"], ans: 1, exp: "Passing bawah (bump) menggunakan lengan bawah sangat efektif meredam kekuatan bola keras seperti servis/smash." },
  { q: "28. Servis melambungkan bola, melompat, dan memukul di titik tertinggi layaknya smash disebut...", options: ["A. Underhand serve", "B. Tennis serve", "C. Jump serve", "D. Float serve", "E. Hook serve"], ans: 2, exp: "Jump serve adalah servis agresif dengan melompat untuk menghasilkan kecepatan dan kekuatan maksimal." },
  { q: "29. Evaluasi kegagalan smash bola voli yang tersangkut di net disebabkan karena...", options: ["A. Melompat terlalu tinggi", "B. Perkenaan bola saat tubuh mulai turun dari titik tertinggi lompatan", "C. Memukul di depan kepala", "D. Lecutan pergelangan tangan", "E. Mendarat mengeper"], ans: 1, exp: "Jika memukul saat tubuh sudah turun, titik perkenaan bola menjadi rendah sehingga menabrak net." },
  { q: "30. Prinsip memberikan beban latihan sedikit lebih berat dari kemampuan normal secara bertahap disebut...", options: ["A. Specificity", "B. Reversibility", "C. Overload (Beban lebih)", "D. Individuality", "E. Overtraining"], ans: 2, exp: "Overload principle bermakna tubuh akan meningkat kemampuannya jika diberi beban melebihi aktivitas normal harian." },
  { q: "31. Kemampuan mengubah arah dengan cepat tanpa hilang keseimbangan disebut...", options: ["A. Speed", "B. Flexibility", "C. Endurance", "D. Agility (Kelincahan)", "E. Strength"], ans: 3, exp: "Kelincahan (agility) adalah kombinasi kecepatan dan keseimbangan untuk merubah posisi secepat mungkin." },
  { q: "32. Latihan untuk meningkatkan daya ledak (explosive power) otot tungkai adalah...", options: ["A. Jogging 30 menit", "B. Sit up 50 kali", "C. Plyometrics (seperti jump box atau loncat katak)", "D. Push up", "E. Peregangan statis"], ans: 2, exp: "Plyometrics melatih serabut otot untuk memendek dan memanjang cepat bertenaga, cocok untuk daya ledak." },
  { q: "33. Latihan daya tahan jantung-paru (cardiovascular endurance) yang paling sesuai adalah...", options: ["A. Angkat beban maksimal", "B. Senam lantai", "C. Lari jarak jauh (cross country) minimal 30 menit", "D. Sprint 100m", "E. Tolak peluru"], ans: 2, exp: "Daya tahan kardiovaskular dilatih dengan aktivitas aerobik durasi panjang intensitas sedang, seperti lari jarak jauh/sepeda." },
  { q: "34. Dalam prinsip FITT, huruf 'I' merujuk pada takaran berat latihan, yaitu...", options: ["A. Interval", "B. Intention", "C. Intensity (Intensitas)", "D. Internal", "E. Improvement"], ans: 2, exp: "FITT = Frequency (kekerapan), Intensity (berat ringannya beban), Time (durasi), Type (jenis)." },
  { q: "35. Tes TKJI SMA untuk mengukur kekuatan dan ketahanan otot lengan/bahu adalah...", options: ["A. Lari 60 meter", "B. Lari 1200 meter", "C. Baring duduk (sit up)", "D. Gantung angkat tubuh (pull up) 60 detik", "E. Loncat tegak"], ans: 3, exp: "Pull up mengukur kapasitas kekuatan isotonik dan ketahanan otot lengan (bicep) serta punggung/bahu." },
  { q: "36. Ciri pergaulan sehat pada usia remaja adalah...", options: ["A. Membentuk geng eksklusif", "B. Mengikuti semua tren tanpa filter", "C. Saling menghargai perbedaan, memiliki batasan norma, dan mendorong hal positif", "D. Keluyuran malam", "E. Mencoba narkotika"], ans: 2, exp: "Pergaulan sehat menjunjung norma sosial, saling memotivasi ke arah baik, dan tidak melanggar batasan hukum." },
  { q: "37. Upaya penerapan pola makan sehat dan bergizi seimbang adalah...", options: ["A. Memperbanyak fast food", "B. Minum minuman kemasan manis", "C. Mengonsumsi sayur/buah kaya serat dan membatasi gula, garam, lemak", "D. Menghindari karbohidrat sama sekali", "E. Makan sekali porsi besar"], ans: 2, exp: "Sesuai panduan Kemenkes, membatasi Gula-Garam-Lemak dan memperbanyak serat buah/sayur adalah kunci gizi seimbang." },
  { q: "38. Virus HIV menular melalui jalur berikut, KECUALI...", options: ["A. Seks bebas dengan penderita", "B. Jarum suntik bergantian", "C. Transfusi darah tercemar", "D. Berenang di kolam yang sama atau berpelukan dengan penderita", "E. Ibu hamil ke janin"], ans: 3, exp: "HIV rapuh di luar tubuh, TIDAK menular melalui sentuhan kulit (berpelukan) atau fasilitas umum seperti kolam renang." },
  { q: "39. Prinsip mendapatkan dan mempertahankan berat badan ideal secara PJOK adalah...", options: ["A. Menghindari makan malam penuh", "B. Obat pelangsing tanpa olahraga", "C. Keseimbangan kalori (in vs out) dipadu olahraga dan istirahat", "D. Pakai jaket plastik agar keringat banyak", "E. Puasa berhari-hari hanya minum"], ans: 2, exp: "Manajemen keseimbangan kalori (masuk vs keluar) dibantu metabolisme olahraga adalah cara sehat jaga berat badan." },
  { q: "40. Tindakan operasional standar pertama melihat orang tenggelam (jika tidak mahir renang penyelamatan) adalah...", options: ["A. Langsung terjun ke air", "B. Teriak minta tolong lalu mencoba meraih dari darat pakai galah/pelampung", "C. Meninggalkan korban", "D. Menunggu korban di dasar air", "E. Memotret kejadian"], ans: 1, exp: "Standar non-profesional (Reach & Throw): coba menggapai pakai tongkat/melempar pelampung dari darat agar diri sendiri aman." }
];

const essayData: Essay[] = [
  { q: "41. Jelaskan posisi tubuh saat aba-aba 'Bersedia', 'Siap', dan 'Ya' pada start lari jarak pendek!", exp: "<b>Bersedia:</b> Jongkok, lutut belakang menempel tanah, lengan lurus menopang di belakang garis start (jari membentuk huruf V terbalik).<br/><b>Siap:</b> Panggul diangkat sedikit lebih tinggi dari bahu, berat badan bergeser ke lengan.<br/><b>Ya/Pistol:</b> Kaki menolak kuat pada balok (take-off), badan condong lari ke depan tanpa langsung menegakkan badan." },
  { q: "42. Analisis perbedaan menendang dengan Punggung Kaki (Instep) dan Kaki Bagian Dalam (Inner Foot) dalam Sepak Bola!", exp: "<b>Kaki Bagian Dalam (Inner foot):</b> Perkenaan di sisi dalam, sangat akurat untuk operan pendek/mendatar (short pass).<br/><b>Punggung Kaki (Instep):</b> Perkenaan di kura-kura kaki, menghasilkan bola keras dan lurus. Sangat taktis untuk tembakan ke gawang (shooting) atau sapuan jauh (clearance)." },
  { q: "43. Sebutkan 3 kesalahan passing bawah bola voli dan cara perbaikannya!", exp: "1. <i>Lengan mengayun terlalu tinggi:</i> Perbaiki dengan mengunci siku dan dorongan dari lutut. 2. <i>Perkenaan bola di jari/pangkal lengan:</i> Perbaiki dengan memposisikan titik jatuh bola tepat di atas pergelangan tangan (lengan bawah). 3. <i>Lengan tertekuk:</i> Rapatkan kedua ibu jari dan kunci siku kuat-kuat agar lengan rata." },
  { q: "44. Jelaskan kepanjangan FITT dan berikan contoh program lari untuk daya tahan jantung!", exp: "<b>FITT</b> = <i>Frequency</i> (Kekerapan, misal 3x seminggu), <i>Intensity</i> (Beban, misal lari pada 70% denyut nadi maksimal), <i>Time</i> (Durasi, misal berlari nonstop 30 menit), dan <i>Type</i> (Jenis, misal lari aerobik/jogging jarak jauh)." },
  { q: "45. Analisis fenomena FOMO pada pergaulan remaja dan langkah pencegahannya!", exp: "<b>Dampak FOMO:</b> Remaja memaksakan diri ikut tren meski melanggar norma hanya karena takut tertinggal. Merusak jati diri, menyebabkan kecemasan, dan hilangnya waktu berharga.<br/><b>Pencegahan:</b> Membatasi medsos, fokus minat bakat, sadar realita vs dunia maya, dan memilih pertemanan yang tidak memaksa 'peer pressure'." }
];

export default function SimulasiPJOKPage() {
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
    <div className="bg-white rounded-3xl p-10 md:p-16 shadow-xl text-center max-w-2xl w-full mx-auto animate-fade-in-up border-t-8 border-emerald-500">
      <div className="text-6xl mb-6 flex justify-center gap-3">
        <span>🏃‍♂️</span><span>🏅</span><span>🏀</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">Simulasi PSAJ PJOK</h1>
      <p className="text-slate-600 mb-8 text-lg leading-relaxed">
        Latih pemahamanmu tentang teknik olahraga, kebugaran jasmani, dan kesehatan diri. Terdapat 40 soal interaktif dan 5 review uraian.
      </p>
      <button 
        onClick={handleStart}
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-emerald-500/40 text-lg"
      >
        Mulai Simulasi ⚡
      </button>
    </div>
  );

  const renderQuiz = () => {
    const currentQuestion = mcqData[currentIndex];
    const progressPercentage = ((currentIndex + 1) / mcqData.length) * 100;
    const hasAnswered = answers[currentIndex] !== null;
    const selectedOption = answers[currentIndex];

    return (
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl max-w-3xl w-full mx-auto animate-fade-in-up border-t-4 border-emerald-500">
        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-bold text-emerald-600 uppercase tracking-wider">
            Pertandingan {currentIndex + 1} / {mcqData.length}
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 mb-8 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* Question */}
        <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-8 leading-relaxed whitespace-pre-wrap">
          {currentQuestion.q}
        </h2>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {currentQuestion.options.map((opt, i) => {
            const isCorrect = i === currentQuestion.ans;
            const isSelected = i === selectedOption;
            
            let btnClass = "text-left p-4 rounded-xl border-2 font-medium transition-all duration-200 ";
            
            if (!hasAnswered) {
              btnClass += "border-slate-200 bg-slate-50 hover:border-emerald-500 hover:bg-emerald-50 text-slate-700 cursor-pointer hover:translate-x-1";
            } else {
              btnClass += "cursor-default ";
              if (isCorrect) {
                btnClass += "border-emerald-500 bg-emerald-50 text-emerald-800";
              } else if (isSelected && !isCorrect) {
                btnClass += "border-rose-500 bg-rose-50 text-rose-800";
              } else {
                btnClass += "border-slate-200 bg-slate-50 text-slate-400 opacity-50";
              }
            }

            return (
              <button 
                key={i} 
                onClick={() => handleAnswer(i)}
                disabled={hasAnswered}
                className={btnClass}
              >
                <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span> 
                {opt.substring(3).replace(/\\n/g, '\n')}
              </button>
            );
          })}
        </div>

        {/* Feedback Section */}
        {hasAnswered && (
          <div className={`mt-8 p-6 rounded-2xl animate-fade-in shadow-sm ${selectedOption === currentQuestion.ans ? 'bg-emerald-50 border border-emerald-200' : 'bg-rose-50 border border-rose-200'}`}>
            <h4 className={`font-bold text-lg mb-2 flex items-center gap-2 ${selectedOption === currentQuestion.ans ? 'text-emerald-700' : 'text-rose-700'}`}>
              {selectedOption === currentQuestion.ans ? '✅ Poin Masuk!' : '❌ Miss/Kurang Tepat'}
            </h4>
            <p className="text-slate-700 leading-relaxed">
              <strong className="text-slate-900">Coach Feedback:</strong> {currentQuestion.exp}
            </p>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-8 flex justify-between">
          <button 
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-md ${currentIndex === 0 ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-slate-500 hover:bg-slate-600 text-white transform hover:-translate-y-1'}`}
          >
            ⏮️ Sebelumnya
          </button>
          {hasAnswered ? (
            <button 
              onClick={handleNext}
              className={`font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-md transform hover:-translate-y-1 ${currentIndex === mcqData.length - 1 ? 'bg-amber-500 hover:bg-amber-600 text-white hover:shadow-amber-500/40' : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-emerald-500/40'}`}
            >
              {currentIndex === mcqData.length - 1 ? 'Selesai Pertandingan 🏆' : 'Lanjut ke Soal Berikutnya ⏭️'}
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  };

  const renderEssays = () => (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl max-w-3xl w-full mx-auto animate-fade-in-up border-t-8 border-emerald-500">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-3">Review Taktik (Uraian)</h2>
        <p className="text-slate-500">Kuasai konsep esai ini untuk memaksimalkan performa di ujian sesungguhnya.</p>
      </div>
      
      <div className="flex flex-col gap-6">
        {essayData.map((item, index) => (
          <div key={index} className="bg-slate-50 border border-slate-200 p-6 md:p-8 rounded-2xl hover:shadow-md transition-shadow">
            <h3 className="font-bold text-emerald-800 mb-4 text-lg border-b border-emerald-100 pb-2">{item.q}</h3>
            <p className="text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.exp }}></p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button 
          onClick={handleStart}
          className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:-translate-y-1"
        >
          🔄 Ulangi Latihan dari Awal
        </button>
      </div>
    </div>
  );

  const finalScore = Math.round((score / mcqData.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-12 px-4 font-sans text-slate-900 flex flex-col items-center">
      
      {/* Main View Manager */}
      {view === 'landing' && renderLanding()}
      {view === 'quiz' && renderQuiz()}
      {view === 'essay' && renderEssays()}

      {/* Final Score Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-10 text-center max-w-md w-full shadow-2xl transform scale-100 transition-transform">
            <div className="text-5xl mb-4">💯</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Pluit Panjang Berbunyi!</h2>
            <p className="text-slate-500 mb-8">Ini adalah hasil performa fisik & logikamu:</p>
            
            <div className="relative w-44 h-44 mx-auto mb-8 flex justify-center items-center rounded-full shadow-inner" 
                 style={{ background: `conic-gradient(#059669 ${finalScore}%, #f1f5f9 0)` }}>
              <div className="absolute inset-3 bg-white rounded-full flex justify-center items-center shadow-sm">
                <span className="text-6xl font-black text-emerald-600">{finalScore}</span>
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-slate-800 mb-8 px-4">
              {finalScore >= 85 ? "Performa MVP! Pemahaman teori olahragamu luar biasa. 🌟" : finalScore >= 70 ? "Stamina Bagus! Pahami sedikit lagi detail taktik gerakannya. 👍" : "Jangan Menyerah! Terus berlatih seperti atlet sejati. 💪"}
            </h3>
            
            <button 
              onClick={handleGoToEssays}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:-translate-y-1"
            >
              Lihat Pembahasan Esai 📋
            </button>
          </div>
        </div>
      )}

      {/* Internal CSS Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
      `}} />
    </div>
  );
}