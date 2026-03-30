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

// --- DATA SOAL ---
const mcqData: MCQ[] = [
  { q: "1. Seni rupa adalah cabang seni yang membentuk karya seni dengan media yang bisa ditangkap mata dan dirasakan dengan rabaan. Berdasarkan fungsinya, seni rupa dibagi menjadi dua, yaitu...", options: ["A. Seni rupa 2 dimensi dan 3 dimensi", "B. Seni rupa murni dan seni rupa terapan", "C. Seni lukis dan seni patung", "D. Seni kriya dan seni desain", "E. Seni tradisional dan seni modern"], ans: 1, exp: "Berdasarkan fungsinya, seni rupa dibagi menjadi Seni Murni (estetika) dan Seni Terapan (kegunaan praktis)." },
  { q: "2. Seorang desainer interior merancang sebuah kursi yang tidak hanya indah secara visual tetapi juga ergonomis dan nyaman saat diduduki. Hal ini menunjukkan bahwa karya tersebut mengutamakan nilai...", options: ["A. Estetis semata", "B. Ekonomis", "C. Fungsional/Guna", "D. Simbolis", "E. Budaya"], ans: 2, exp: "Parameter 'ergonomis' membuktikan benda tersebut memenuhi nilai fungsional (kegunaan) sebagai alat." },
  { q: "3. Perhatikan karya: (1) Lukisan Abstrak, (2) Poster, (3) Patung Pahlawan, (4) Kemasan, (5) Instalasi. Karya seni rupa murni ditunjukkan nomor...", options: ["A. (1) dan (2)", "B. (2) dan (4)", "C. (1) dan (5)", "D. (3) dan (4)", "E. (4) dan (5)"], ans: 2, exp: "Lukisan abstrak dan instalasi dibuat murni untuk ekspresi estetis, bukan fungsi praktis seperti poster/kemasan." },
  { q: "4. Keberadaan relief pada dinding candi Borobudur memiliki fungsi utama sebagai...", options: ["A. Benda pakai sehari-hari", "B. Media narasi spiritual dan sejarah", "C. Hiasan semata", "D. Konstruksi penahan bangunan", "E. Sarana promosi kerajaan"], ans: 1, exp: "Relief candi dipahat sebagai media edukasi yang menceritakan perjalanan spiritual (agama) dan sejarah masyarakat." },
  { q: "5. Andi melihat karya seni yang hanya dapat dinikmati dari satu arah pandang dan memiliki dimensi panjang serta lebar. Karya tersebut tergolong...", options: ["A. Seni Rupa 3 Dimensi", "B. Seni Rupa 2 Dimensi", "C. Seni Rupa 4 Dimensi", "D. Seni Instalasi", "E. Seni Performans"], ans: 1, exp: "Hanya memiliki panjang (X) dan lebar (Y) pada bidang datar adalah definisi mutlak karya 2 dimensi." },
  { q: "6. Dalam berkarya seni rupa 2 dimensi, unsur fisik yang paling mendasar dan terbentuk dari gabungan titik-titik yang bersambung adalah...", options: ["A. Bidang", "B. Warna", "C. Garis", "D. Tekstur", "E. Gelap Terang"], ans: 2, exp: "Garis didefinisikan sebagai batas limit suatu benda yang terbentuk oleh pergerakan titik yang bersambungan rapat." },
  { q: "7. Untuk menciptakan kesan kedalaman atau volume pada objek 2 dimensi yang datar, unsur yang krusial diolah adalah...", options: ["A. Warna primer", "B. Jenis kanvas", "C. Gelap Terang (Value)", "D. Garis lengkung", "E. Tekstur nyata"], ans: 2, exp: "Gradasi pencahayaan (gelap terang) memanipulasi mata sehingga gambar datar tampak memiliki ilusi ruang/volume." },
  { q: "8. Menggunakan cat air dengan sapuan tipis dan transparan sehingga warna kertas masih membayang adalah ciri...", options: ["A. Teknik Plakat", "B. Teknik Aquarel", "C. Teknik Pointilis", "D. Teknik Dusel", "E. Teknik Arsir"], ans: 1, exp: "Aquarel menggunakan banyak air dengan sapuan tipis agar warna bersifat tembus pandang (transparan)." },
  { q: "9. Secara psikologis, pemilihan warna hangat (merah, kuning) pada poster bertujuan untuk...", options: ["A. Memberikan kesan tenang", "B. Menarik perhatian dan memberi kesan semangat", "C. Memberikan kesan misterius", "D. Menunjukkan kesedihan", "E. Kesan dingin"], ans: 1, exp: "Warna hangat menstimulasi energi, memicu semangat, dan sangat agresif menarik perhatian mata audiens." },
  { q: "10. Proporsi teko terlihat janggal dibandingkan cangkir di sebelahnya. Prinsip yang perlu diperbaiki adalah...", options: ["A. Kesatuan (Unity)", "B. Keseimbangan (Balance)", "C. Proporsi (Perbandingan)", "D. Irama (Rhythm)", "E. Pusat Perhatian"], ans: 2, exp: "Proporsi mengatur rasio atau perbandingan ukuran ideal antar objek di dalam satu komposisi." },
  { q: "11. Menempelkan potongan-potongan kertas, kain, atau bahan utuh pada satu bidang permukaan disebut...", options: ["A. Mozaik", "B. Kolase", "C. Montase", "D. Lukis", "E. Grafis"], ans: 1, exp: "Kolase adalah seni menyusun komposisi dengan merekatkan berbagai material utuh ke atas latar datar." },
  { q: "12. Keunggulan teknik cetak saring (sablon) dibandingkan melukis manual pada kaos adalah...", options: ["A. Hasil lebih artistik tak terulang", "B. Dapat memproduksi banyak dengan desain konsisten", "C. Waktu lebih lama", "D. Hanya satu warna", "E. Tanpa alat khusus"], ans: 1, exp: "Seni grafis mampu mereproduksi satu master desain ke ratusan salinan dengan detail yang 100% konsisten." },
  { q: "13. Apresiasi seni rupa berasal dari bahasa Latin 'appretiatus' yang artinya...", options: ["A. Melihat dan menyentuh", "B. Membeli dan menjual", "C. Menilai dan menghargai", "D. Membuat dan memamerkan", "E. Mengkritik dan menjatuhkan"], ans: 2, exp: "Appretiatus bermakna proses mengamati, menilai secara objektif, dan memberikan penghargaan atas karya." },
  { q: "14. Mendeskripsikan segala sesuatu secara kasat mata tanpa memberikan penilaian disebut tahap...", options: ["A. Interpretasi", "B. Analisis Formal", "C. Deskripsi", "D. Evaluasi", "E. Kreasi"], ans: 2, exp: "Tahap deskripsi wajib bersikap objektif, hanya mencatat fakta visual mentah tanpa opini." },
  { q: "15. 'Garis liar dan warna merah menyimbolkan kemarahan'. Tahapan kritik ini adalah...", options: ["A. Deskripsi", "B. Analisis Formal", "C. Interpretasi", "D. Penilaian", "E. Penyajian"], ans: 2, exp: "Menghubungkan unsur fisik rupa dengan makna konseptual atau simbol pesan adalah esensi interpretasi." },
  { q: "16. Tingkatan apresiasi tertinggi yang mampu menganalisis dan memberi kritik membangun disebut...", options: ["A. Empatik", "B. Estetis", "C. Kritis", "D. Pasif", "E. Subjektif"], ans: 2, exp: "Apresiasi kritis menggunakan pisau analisis teori akademis untuk membedah dan mengevaluasi karya secara mendalam." },
  { q: "17. Mencatat teknik dan memahami pesan karya mencerminkan kegiatan...", options: ["A. Apresiasi aktif", "B. Apresiasi pasif", "C. Dokumentasi semata", "D. Rekreasi visual", "E. Koleksi seni"], ans: 0, exp: "Apresiasi aktif terwujud melalui proaktivitas berinteraksi (mencatat, bertanya, menganalisis) dengan karya." },
  { q: "18. Salah satu fungsi kritik seni bagi seniman pembuat karya adalah...", options: ["A. Menjatuhkan mental", "B. Meningkatkan harga instan", "C. Sebagai bahan evaluasi meningkatkan kualitas", "D. Memaksakan kehendak", "E. Menghapus gaya"], ans: 2, exp: "Kritik memberikan wawasan dari sudut pandang luar yang berguna sebagai evaluasi untuk penyempurnaan karya." },
  { q: "19. Ciri utama karya 3 dimensi yang membedakannya dengan 2 dimensi adalah...", options: ["A. Warna lebih cerah", "B. Memiliki ukuran panjang, lebar, dan volume/ruang", "C. Hanya dilihat dari depan", "D. Dibuat pada bidang datar", "E. Tanpa tekstur"], ans: 1, exp: "Kehadiran ruang nyata (kedalaman/volume) adalah ciri mutlak karya 3D yang bisa diitari dari segala arah." },
  { q: "20. Patung untuk memperingati jasa atau peristiwa bersejarah disebut patung...", options: ["A. Religi", "B. Arsitektur", "C. Monumen", "D. Dekorasi", "E. Seni"], ans: 2, exp: "Monumen didirikan untuk menjaga memori kolektif masyarakat terhadap sejarah atau pahlawan masa lalu." },
  { q: "21. Membuat patung tanah liat dengan cara memijit, menambah, dan mengurangi bahan disebut teknik...", options: ["A. Pahat", "B. Butsir (Modeling)", "C. Cor", "D. Las", "E. Rakit"], ans: 1, exp: "Teknik butsir sangat ideal untuk bahan plastis (lembek) karena mudah dimanipulasi dengan tangan." },
  { q: "22. Bahan batu andesit yang keras paling sesuai dikerjakan dengan...", options: ["A. Butsir", "B. Cor", "C. Pahat dengan palu dan tatah", "D. Cetak saring", "E. Las"], ans: 2, exp: "Material masif/keras hanya bisa diproses secara subtraktif (dikurangi) menggunakan kekuatan alat pahat." },
  { q: "23. Karakteristik utama seni instalasi adalah...", options: ["A. Lukisan digantung", "B. Patung kecil di meja", "C. Penyusunan benda yang menyatu dan mengonstruksi ruang", "D. Karya digital", "E. Kerajinan tradisional"], ans: 2, exp: "Seni instalasi merancang sebuah lingkungan, mengubah ruang sekitarnya menjadi bagian integral dari karya." },
  { q: "24. Prinsip 'Keseimbangan' (Balance) dicapai dengan cara...", options: ["A. Satu warna saja", "B. Menempatkan objek simetris/asimetris agar tidak berat sebelah", "C. Ukuran sekecil mungkin", "D. Bahan mahal", "E. Tanpa tekstur"], ans: 1, exp: "Keseimbangan mengatur distribusi bobot visual agar tatanan karya stabil dan nyaman dipandang." },
  { q: "25. Contoh hasil karya seni kriya (craft) adalah...", options: ["A. Lukisan Monalisa", "B. Patung Liberty", "C. Anyaman rotan dan keramik fungsional", "D. Desain grafis", "E. Foto dokumenter"], ans: 2, exp: "Kriya mengandalkan keterampilan tangan (handcraft) untuk membuat benda yang memiliki kegunaan praktis." },
  { q: "26. Tahap konseptualisasi diawali dengan melakukan...", options: ["A. Membeli bahan", "B. Menentukan ide, gagasan, dan tema karya", "C. Finishing", "D. Memotret", "E. Menjual"], ans: 1, exp: "Sebelum eksekusi fisik, karya berawal dari pikiran: merumuskan tema, pesan, dan ide dasar penciptaan." },
  { q: "27. Menggabungkan limbah botol menjadi bentuk robot menggunakan teknik...", options: ["A. Pahat", "B. Cor", "C. Rakit (Assembling)", "D. Butsir", "E. Tenun"], ans: 2, exp: "Merakit berarti menyatukan berbagai potongan/komponen terpisah menjadi satu konstruksi bentuk yang utuh." },
  { q: "28. Proses pembakaran (firing) dalam pembuatan keramik bertujuan untuk...", options: ["A. Mewarnai", "B. Mengubah tanah liat menjadi keras dan kedap air secara permanen", "C. Melunakkan kembali", "D. Membersihkan", "E. Menambah berat"], ans: 1, exp: "Suhu ekstrem memicu reaksi kimiawi yang mematikan sifat lembek tanah, mengubahnya jadi padat dan anti-air." },
  { q: "29. Perbedaan mendasar patung dan arsitektur sebagai karya 3D terletak pada...", options: ["A. Bahan", "B. Nilai keindahan", "C. Fungsi ruang (arsitektur memiliki ruang beraktivitas manusia)", "D. Teknik", "E. Biaya"], ans: 2, exp: "Arsitektur merancang ruang kosong yang bisa dihuni manusia, sedangkan patung berupa massa bervolume padat." },
  { q: "30. Tekstur permukaan yang dapat dirasakan langsung dengan rabaan disebut...", options: ["A. Tekstur semu", "B. Tekstur nyata", "C. Tekstur visual", "D. Tekstur ilusi", "E. Tekstur bayangan"], ans: 1, exp: "Tekstur nyata berarti kasat mata dan rabaan kulit merasakan kualitas kekasaran yang sama secara fisik." },
  { q: "31. Dokumentasi karya seni rupa penting sebagai...", options: ["A. Kebutuhan medsos", "B. Bukti otentik portofolio dan arsip perjalanan kekaryaan", "C. Agar cepat laku", "D. Meniru karya orang", "E. Administrasi sekolah"], ans: 1, exp: "Dokumentasi mengawetkan jejak rekam estetis karya sebagai bukti portofolio yang abadi." },
  { q: "32. Posisi kamera ideal agar lukisan 2D tidak distorsi perspektif adalah...", options: ["A. Sudut atas", "B. Sudut bawah", "C. Tegak lurus sejajar dengan titik tengah karya", "D. Samping kiri", "E. Samping kanan"], ans: 2, exp: "Posisi tegak lurus mencegah ilusi optik di mana lukisan terlihat melengkung atau menyempit ukurannya." },
  { q: "33. Background polos/netral saat memotret patung bertujuan untuk...", options: ["A. Hemat biaya", "B. Menonjolkan objek agar fokus dan tak terganggu latar", "C. Menutupi cacat", "D. Foto lebih gelap", "E. Pantulan flash"], ans: 1, exp: "Latar yang bising menciptakan distraksi. Latar netral mengisolasi mata murni pada detail karya utama." },
  { q: "34. Cara mengatasi pantulan cahaya (refleksi) dari kaca bingkai adalah...", options: ["A. Flash lurus ke kaca", "B. Di ruang gelap", "C. Mengatur sudut cahaya dari samping atau lepas kaca", "D. Pakai HP biasa", "E. Tingkatkan ISO"], ans: 2, exp: "Lampu yang digeser menyamping (45 derajat) mencegah pantulan sinar menembak kembali ke lensa kamera." },
  { q: "35. Pencahayaan terbaik agar warna natural adalah...", options: ["A. Cahaya lilin", "B. Neon warna-warni", "C. Cahaya matahari tak langsung (diffused) atau lampu studio", "D. Lampu jalan", "E. Senter"], ans: 2, exp: "Cahaya difusi (lembut) memiliki spektrum putih netral sehingga warna cat terekam sangat akurat sesuai aslinya." },
  { q: "36. Untuk menunjukkan skala instalasi ruang luas, teknik fotonya adalah...", options: ["A. Close up", "B. Macro", "C. Wide shot menyertakan elemen pembanding (manusia)", "D. Selfie", "E. Blur"], ans: 2, exp: "Elemen manusia di lensa wide memberi konteks ukuran sesungguhnya agar apresiator bisa mengira-ngira besarnya karya." },
  { q: "37. Langkah pertama dalam dokumentasi karya seni adalah...", options: ["A. Mengedit foto", "B. Mempersiapkan karya dan membersihkannya dari debu", "C. Mencetak", "D. Unggah internet", "E. Beli kamera"], ans: 1, exp: "Karya harus bersih sempurna secara fisik agar kotoran/debu tidak ikut terekam ke dalam file master foto." },
  { q: "38. Dalam portofolio, selain hasil akhir juga diperlukan foto...", options: ["A. Makanan", "B. Proses berkarya (work in progress) dan sketsa", "C. Liburan", "D. Nota bahan", "E. Komentar"], ans: 1, exp: "Foto WIP menceritakan proses kognitif dan teknis bagaimana seniman merumuskan dan memecahkan ide karyanya." },
  { q: "39. Format file foto digital untuk arsip master berkualitas tinggi adalah...", options: ["A. GIF", "B. RAW atau JPG resolusi tinggi", "C. MP4", "D. DOCX", "E. TXT"], ans: 1, exp: "Format RAW tidak mengompresi data sensor, menjaganya tetap fleksibel untuk diedit atau dicetak ukuran raksasa." },
  { q: "40. Jika bayangan foto patung terlalu keras menutupi tekstur, solusinya...", options: ["A. Hard light", "B. Menggunakan diffuser/reflector untuk melembutkan cahaya", "C. Matikan lampu", "D. Filter B/W", "E. Dekatkan kamera"], ans: 1, exp: "Diffuser memecah arah cahaya menyebar merata, sehingga bayangan yang pekat menjadi halus bergradasi." }
];

const essayData: Essay[] = [
  { q: "41. Sebutkan 3 jenis seni rupa berdasarkan fungsinya!", exp: "1. Seni Murni (Fine Art): Dibuat murni untuk ekspresi estetika (contoh: lukisan, patung). 2. Seni Terapan (Applied Art): Memiliki fungsi guna dalam keseharian dengan tetap indah (contoh: desain kursi, keramik). 3. Seni Sosial: Digunakan untuk hajat religius atau komunal (contoh: relief candi)." },
  { q: "42. Perbedaan teknik Aquarel dan Plakat!", exp: "Aquarel menggunakan banyak campuran air sehingga hasil sapuan tipis dan transparan (tembus pandang). Sedangkan Plakat menggunakan cat kental sehingga sapuan tebal, pekat, dan menutupi latar kanvas secara penuh (opaque)." },
  { q: "43. Analisis kritik 'Lukisan abstrak jelek karena tidak mirip aslinya'.", exp: "Kritik tersebut tidak objektif karena abstrak bersifat non-representasional. Evaluasi yang benar menggunakan metode: Deskripsi (mendata visual), Analisis (mengkaji komposisi), Interpretasi (mencari makna goresan), lalu Evaluasi keberhasilan emosionalnya, bukan kemiripannya dengan alam." },
  { q: "44. Sebutkan 4 tahapan utama apresiasi seni!", exp: "1. Deskripsi (mencatat fakta kasat mata tanpa opini). 2. Analisis Formal (membedah komposisi unsur rupa). 3. Interpretasi (menafsirkan makna/simbol). 4. Evaluasi (memberikan penilaian/kritik akademis)." },
  { q: "45. Rancang konsep karya 3D tema Lingkungan Hidup bahan limbah!", exp: "Judul: Paus Penghirup Plastik. Bahan & Alat: Limbah botol/kresek, kawat strimin, tang, lem tembak. Teknik: Konstruksi & Perakitan (Assembling). Kawat dibentuk menjadi kerangka paus, lalu dirakit dengan limbah botol untuk mengkritik polusi laut." }
];

export default function SimulasiSeniBudaya() {
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
    <div className="bg-white rounded-3xl p-10 md:p-16 shadow-xl text-center max-w-2xl w-full mx-auto animate-fade-in-up">
      <div className="text-6xl mb-6">🎨</div>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Siap Menghadapi PSAJ Seni Budaya?</h1>
      <p className="text-slate-600 mb-8 text-lg">Uji pemahamanmu melalui 40 soal interaktif dengan pembahasan real-time, ditambah review materi esai di akhir sesi.</p>
      <button 
        onClick={handleStart}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-indigo-500/50 text-lg"
      >
        Mulai Simulasi 🚀
      </button>
    </div>
  );

  const renderQuiz = () => {
    const currentQuestion = mcqData[currentIndex];
    const progressPercentage = ((currentIndex + 1) / mcqData.length) * 100;
    const hasAnswered = answers[currentIndex] !== null;
    const selectedOption = answers[currentIndex];

    return (
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl max-w-3xl w-full mx-auto animate-fade-in-up">
        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-indigo-600">Soal {currentIndex + 1} dari {mcqData.length}</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5 mb-8">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-pink-500 h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* Question */}
        <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-6 leading-relaxed">
          {currentQuestion.q}
        </h2>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {currentQuestion.options.map((opt, i) => {
            const isCorrect = i === currentQuestion.ans;
            const isSelected = i === selectedOption;
            
            let btnClass = "text-left p-4 rounded-xl border-2 font-medium transition-all duration-200 ";
            
            if (!hasAnswered) {
              btnClass += "border-slate-200 bg-slate-50 hover:border-indigo-500 hover:bg-indigo-50 text-slate-700 cursor-pointer hover:translate-x-1";
            } else {
              btnClass += "cursor-default ";
              if (isCorrect) {
                btnClass += "border-emerald-500 bg-emerald-50 text-emerald-800";
              } else if (isSelected && !isCorrect) {
                btnClass += "border-rose-500 bg-rose-50 text-rose-800";
              } else {
                btnClass += "border-slate-200 bg-slate-50 text-slate-400 opacity-60";
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
                {opt.substring(3)}
              </button>
            );
          })}
        </div>

        {/* Feedback Section */}
        {hasAnswered && (
          <div className={`mt-6 p-5 rounded-xl animate-fade-in ${selectedOption === currentQuestion.ans ? 'bg-emerald-50 border-l-4 border-emerald-500' : 'bg-rose-50 border-l-4 border-rose-500'}`}>
            <h4 className={`font-bold mb-2 flex items-center gap-2 ${selectedOption === currentQuestion.ans ? 'text-emerald-700' : 'text-rose-700'}`}>
              {selectedOption === currentQuestion.ans ? '✅ Tepat Sekali!' : '❌ Kurang Tepat'}
            </h4>
            <p className="text-slate-700 text-sm leading-relaxed">
              <strong>Pembahasan:</strong> {currentQuestion.exp}
            </p>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-8 flex justify-between">
          <button 
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md ${currentIndex === 0 ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-slate-500 hover:bg-slate-600 text-white'}`}
          >
            ⏮️ Sebelumnya
          </button>
          {hasAnswered ? (
            <button 
              onClick={handleNext}
              className={`font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md ${currentIndex === mcqData.length - 1 ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
            >
              {currentIndex === mcqData.length - 1 ? 'Selesai & Lihat Nilai 🏆' : 'Selanjutnya ⏭️'}
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  };

  const renderEssays = () => (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl max-w-3xl w-full mx-auto animate-fade-in-up">
      <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">Review Materi Uraian</h2>
      <p className="text-center text-slate-500 mb-8">Pelajari pembahasan esai berikut untuk memantapkan pemahaman konsepmu.</p>
      
      <div className="flex flex-col gap-6">
        {essayData.map((item, index) => (
          <div key={index} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
            <h3 className="font-bold text-indigo-700 mb-3">{item.q}</h3>
            <p className="text-slate-700 leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: item.exp }}></p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <button 
          onClick={handleStart}
          className="bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-md"
        >
          🔄 Ulangi Simulasi
        </button>
      </div>
    </div>
  );

  const finalScore = Math.round((score / mcqData.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 py-12 px-4 font-sans text-slate-900 flex flex-col items-center">
      
      {/* Main Container */}
      {view === 'landing' && renderLanding()}
      {view === 'quiz' && renderQuiz()}
      {view === 'essay' && renderEssays()}

      {/* Score Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-10 text-center max-w-md w-full shadow-2xl transform scale-100 transition-transform">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Simulasi Selesai!</h2>
            <p className="text-slate-500 mb-8">Berikut adalah nilai akhirmu:</p>
            
            <div className="relative w-40 h-40 mx-auto mb-8 flex justify-center items-center rounded-full" 
                 style={{ background: `conic-gradient(#4f46e5 ${finalScore}%, #e2e8f0 0)` }}>
              <div className="absolute inset-2 bg-white rounded-full flex justify-center items-center">
                <span className="text-5xl font-extrabold text-indigo-600">{finalScore}</span>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-slate-800 mb-8">
              {finalScore >= 85 ? "Luar Biasa! Pemahamanmu sangat kuat. 🌟" : finalScore >= 70 ? "Bagus Sekali! Tinggal dipoles sedikit lagi. 👍" : "Ayo Semangat! Terus pelajari konsepnya. 💪"}
            </h3>
            
            <button 
              onClick={handleGoToEssays}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg text-lg"
            >
              Lihat Pembahasan Esai 📚
            </button>
          </div>
        </div>
      )}

      {/* Simple Inline Keyframes for Animation (If Tailwind plugins aren't active) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
      `}} />
    </div>
  );
}