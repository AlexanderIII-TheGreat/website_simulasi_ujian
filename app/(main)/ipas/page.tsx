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

// --- DATA SOAL IPAS ---
const mcqData: MCQ[] = [
  { q: "6. Sekelompok murid ingin mengamati ekosistem di halaman sekolah. Langkah awal yang paling tepat dalam merancang penelitian tersebut adalah...", options: ["A. Menulis laporan hasil pengamatan", "B. Menentukan komponen biotik dan abiotik yang akan diamati", "C. Menghitung jumlah seluruh hewan di dunia", "D. Membeli alat laboratorium termahal", "E. Menebang pohon untuk melihat akar"], ans: 1, exp: "Langkah awal penelitian ekosistem adalah menentukan batasan area dan mengidentifikasi komponen biotik (hidup) serta abiotik (mati) agar pengamatan terfokus." },
  { q: "7. Dalam sebuah ekosistem kebun, populasi ulat meningkat drastis hingga merusak tanaman. Analisis ilmiah yang paling tepat mengenai penyebabnya adalah...", options: ["A. Jumlah produsen terlalu banyak", "B. Menurunnya jumlah predator alami ulat", "C. Tanah kekurangan unsur hara", "D. Terjadi gerhana bulan", "E. Ulat melakukan asimilasi budaya"], ans: 1, exp: "Ketidakseimbangan populasi biasanya disebabkan terganggunya rantai makanan, yakni berkurangnya predator (seperti burung) yang mengontrol ulat." },
  { q: "8. Hasil pengujian air sungai menunjukkan nilai pH 4,0 dan banyak ikan mati. Kesimpulan ilmiah yang tepat adalah...", options: ["A. Air sungai bersifat basa kuat", "B. Terjadi pencemaran zat asam yang merusak ekosistem", "C. Ikan mati karena kedinginan", "D. Air sungai aman langsung diminum", "E. pH 4,0 menunjukkan oksigen tinggi"], ans: 1, exp: "pH di bawah 7 menunjukkan sifat asam. Nilai pH 4,0 adalah kondisi asam ekstrem yang mematikan biota air, menandakan adanya pencemaran kimia." },
  { q: "9. Seorang petani mendorong gerobak dengan gaya 100 N sejauh 5 meter. Dalam konsep fisika, petani tersebut telah melakukan usaha karena...", options: ["A. Petani merasa sangat lelah", "B. Adanya gaya yang menyebabkan perpindahan benda", "C. Gerobak memiliki massa berat", "D. Matahari bersinar terik", "E. Petani menggunakan energi kinetik"], ans: 1, exp: "Usaha (W) didefinisikan sebagai hasil kali gaya (F) dengan perpindahan (s) yang searah dengan gaya tersebut (W = F x s)." },
  { q: "10. Dalam penelitian perubahan zat, murid mencampur cuka dan soda kue hingga balon mengembang. Hal ini menunjukkan terjadinya...", options: ["A. Perubahan fisika sementara", "B. Pembentukan gas CO2 sebagai hasil reaksi kimia", "C. Penambahan massa secara gaib", "D. Perubahan warna pada balon", "E. Pencairan zat padat"], ans: 1, exp: "Munculnya gas sebagai zat baru hasil interaksi kimia antara cuka dan soda kue merupakan ciri utama perubahan kimia." },
  { q: "11. Indonesia mengalami musim hujan pada bulan Oktober-Maret. Fenomena ini dipengaruhi gerak semu matahari saat posisi matahari berada di...", options: ["A. Belahan Bumi Utara", "B. Belahan Bumi Selatan", "C. Garis khatulistiwa secara tetap", "D. Jarak terjauh dari bumi", "E. Belakang bulan"], ans: 1, exp: "Saat matahari di BBS, tekanan udara di Australia rendah sehingga angin muson barat yang kaya uap air bertiup menuju Indonesia." },
  { q: "12. Pada eksperimen perkaratan, paku di air terbuka lebih cepat berkarat dibanding paku di minyak. Variabel bebas dalam penelitian ini adalah...", options: ["A. Jenis paku yang dipakai", "B. Waktu pengamatan", "C. Jenis cairan (media) dan akses udara", "D. Kecepatan angin", "E. Jumlah karat"], ans: 2, exp: "Variabel bebas adalah faktor yang sengaja diubah peneliti (jenis cairan/media) untuk melihat pengaruhnya terhadap objek." },
  { q: "13. Masyarakat pesisir pantai mayoritas bekerja sebagai nelayan. Hal ini menunjukkan pengaruh kondisi geografis terhadap aktivitas...", options: ["A. Politik", "B. Ekonomi", "C. Geologi inti bumi", "D. Perubahan cuaca", "E. Kasta sosial"], ans: 1, exp: "Bentang alam menentukan ketersediaan sumber daya alam yang memengaruhi mata pencaharian atau sektor ekonomi penduduk." },
  { q: "14. Urutan lapisan penyusun bumi yang benar dari bagian terdalam hingga terluar adalah...", options: ["A. Kerak - Mantel - Inti", "B. Inti Dalam - Inti Luar - Mantel - Kerak", "C. Mantel - Kerak - Inti", "D. Kerak - Inti Luar - Inti Dalam", "E. Atmosfer - Kerak - Mantel"], ans: 1, exp: "Struktur fisik bumi terdiri dari inti padat (dalam), inti cair (luar), mantel (tengah), dan kerak (permukaan)." },
  { q: "15. Limbah B3 bersifat korosif jika memiliki karakteristik...", options: ["A. Mudah terbakar api", "B. Memiliki pH ≤ 2 atau pH ≥ 12,5 yang merusak material", "C. Berwarna sangat pekat", "D. Mengandung bakteri", "E. Berasal dari limbah rumah tangga"], ans: 1, exp: "Zat korosif didefinisikan berdasarkan tingkat keasaman (pH) ekstrem yang mampu menyebabkan karat atau kerusakan jaringan." },
  { q: "16. Dampak negatif pembangunan industri di pedesaan terhadap lingkungan fisik adalah...", options: ["A. Meningkatnya pendapatan daerah", "B. Terbukanya lapangan kerja", "C. Polusi udara dan limbah mencemari lahan tani", "D. Meningkatnya kualitas sekolah", "E. Percepatan konektivitas"], ans: 2, exp: "Aktivitas industri sering menghasilkan emisi dan limbah kimia yang jika tidak dikelola akan merusak ekosistem sekitarnya." },
  { q: "17. Tujuan utama pengembangan ekonomi daerah berbasis potensi lokal adalah...", options: ["A. Menghabiskan sumber daya alam", "B. Meningkatkan kemandirian ekonomi masyarakat setempat", "C. Memaksa warga pindah ke kota", "D. Memonopoli harga barang", "E. Membeli bahan baku impor"], ans: 1, exp: "Pemanfaatan potensi lokal bertujuan untuk memberdayakan ekonomi warga sekitar dan menjaga keberlanjutan daerah." },
  { q: "18. Indonesia berada di posisi silang dunia. Secara politik, hal ini memberikan keuntungan berupa...", options: ["A. Indonesia menjadi negara terluas", "B. Memiliki peran strategis dalam hubungan diplomasi", "C. Bebas dari kerjasama internasional", "D. Bebas dari bencana gempa", "E. Penduduk menjadi seragam"], ans: 1, exp: "Letak geografis di jalur perdagangan dunia membuat posisi geopolitik Indonesia sangat penting dalam diplomasi internasional." },
  { q: "19. Contoh perubahan materi yang melibatkan pembentukan zat baru (reaksi kimia) adalah...", options: ["A. Es mencair menjadi air", "B. Kayu dipotong jadi meja", "C. Kertas dibakar menjadi abu", "D. Gula larut dalam teh", "E. Besi dipanaskan membara"], ans: 2, exp: "Pembakaran menghasilkan zat baru (abu dan gas) yang sifat kimianya berbeda dari zat asal (kertas)." },
  { q: "20. Pembangunan pelabuhan di wilayah terpencil akan memicu interaksi sosial berupa...", options: ["A. Isolasi masyarakat", "B. Proses akulturasi budaya", "C. Penurunan jumlah penduduk", "D. Hilangnya kekayaan alam", "E. Munculnya kasta baru"], ans: 1, exp: "Konektivitas ruang memfasilitasi pertemuan antarbudaya yang berujung pada pertukaran atau pencampuran budaya (akulturasi)." },
  { q: "23. Kerjasama bilateral Indonesia-Jepang di bidang otomotif bertujuan meningkatkan stabilitas politik dengan...", options: ["A. Menguasai militer lawan", "B. Memperkuat hubungan diplomatik dan iklim investasi", "C. Menghapus sistem demokrasi", "D. Membuat senjata bersama", "E. Mengisolasi diri"], ans: 1, exp: "Kerjasama ekonomi bilateral memperkuat legitimasi politik dan kepercayaan antarnegara dalam hubungan internasional." },
  { q: "24. Tujuan kerjasama bilateral dalam program pertukaran pelajar adalah...", options: ["A. Meningkatkan limbah B3", "B. Memindahkan penduduk paksa", "C. Meningkatkan kualitas SDM dan misi kemanusiaan", "D. Menciptakan konflik antar siswa", "E. Menjual aset negara"], ans: 2, exp: "Kerjasama pendidikan fokus pada pengembangan kompetensi manusia dan saling pengertian antarbudaya negara mitra." },
  { q: "25. Jika sebuah benda didorong dengan gaya besar tetapi tidak berpindah tempat, maka usahanya...", options: ["A. Maksimal", "B. Sama dengan besar gaya", "C. Bernilai nol (W = 0)", "D. Berlipat ganda", "E. Tergantung massa"], ans: 2, exp: "Dalam mekanika, usaha (W) bernilai nol jika perpindahan (s) benda adalah nol, meskipun gaya (F) sudah diberikan." },
  { q: "26. Perjanjian ekstradisi antarnegara merupakan contoh kerjasama bilateral di bidang...", options: ["A. Ekonomi", "B. Politik dan Hukum", "C. Budaya", "D. Teknologi", "E. Geologi"], ans: 1, exp: "Ekstradisi berkaitan dengan penegakan hukum dan stabilitas keamanan negara yang diatur dalam kerjasama politik." },
  { q: "27. Benda bermassa 2 kg bergerak dengan kecepatan 4 m/s. Energi kinetiknya adalah...", options: ["A. 4 Joule", "B. 8 Joule", "C. 16 Joule", "D. 32 Joule", "E. 64 Joule"], ans: 2, exp: "Ek = 1/2 x m x v^2. Ek = 1/2 x 2 x 4^2 = 16 Joule." },
  { q: "28. Manfaat ekonomi dari kegiatan impor bagi masyarakat adalah...", options: ["A. Menghancurkan industri lokal", "B. Memenuhi kebutuhan barang yang belum diproduksi di dalam negeri", "C. Mengurangi devisa secara sengaja", "D. Memutus diplomasi", "E. Menambah beban pajak"], ans: 1, exp: "Impor berfungsi menjaga ketersediaan barang-barang kebutuhan yang belum mampu dihasilkan secara mandiri di dalam negeri." },
  { q: "29. Latar belakang geografis terbentuknya ASEAN adalah...", options: ["A. Adanya kesamaan letak wilayah dan kemiripan nasib", "B. Keinginan menjajah Eropa", "C. Semua negara bahasanya sama", "D. Serangan alien", "E. Posisi di kutub selatan"], ans: 0, exp: "Negara-negara di Asia Tenggara memiliki kedekatan letak geografis dan kepentingan keamanan kawasan yang serupa." },
  { q: "30. Gerhana bulan terjadi saat posisi benda langit berada pada urutan...", options: ["A. Matahari - Bulan - Bumi", "B. Matahari - Bumi - Bulan", "C. Bumi - Matahari - Bulan", "D. Matahari - Merkurius - Bulan", "E. Bulan - Matahari - Bumi"], ans: 1, exp: "Gerhana bulan terjadi ketika Bumi berada di antara Matahari dan Bulan dalam satu garis lurus, sehingga bayangan Bumi menutupi Bulan." },
  { q: "31. Contoh kontak sosial primer (langsung) adalah...", options: ["A. Ayah mengirim pesan WhatsApp", "B. Guru memberi materi lewat YouTube", "C. Kakak dan adik berdiskusi di ruang tamu", "D. Penjual baju live Instagram", "E. Siswa baca pengumuman di mading"], ans: 2, exp: "Kontak sosial primer terjadi secara tatap muka (langsung) tanpa perantara media alat komunikasi." },
  { q: "32. Interaksi melalui telepon atau email diklasifikasikan sebagai kontak sosial...", options: ["A. Primer", "B. Sekunder", "C. Tersier", "D. Individual", "E. Statis"], ans: 1, exp: "Kontak sekunder adalah interaksi yang menggunakan perantara atau alat media komunikasi." },
  { q: "33. Gotong royong merupakan bentuk interaksi asosiatif karena bertujuan untuk...", options: ["A. Menimbulkan perpecahan", "B. Membangun persatuan dan penyelesaian masalah bersama", "C. Menciptakan kecemburuan", "D. Menguntungkan satu pihak", "E. Mencari musuh"], ans: 1, exp: "Interaksi asosiatif adalah proses sosial yang mengarah pada kesatuan dan kerjasama positif antarwarga." },
  { q: "34. Kendala utama dalam proses koalisi antar organisasi biasanya disebabkan oleh...", options: ["A. Terlalu banyak uang", "B. Perbedaan kepentingan dan tujuan yang belum padu", "C. Lokasi rapat yang nyaman", "D. Pemikiran yang identik", "E. Waktu yang singkat"], ans: 1, exp: "Koalisi menggabungkan kelompok berbeda, sehingga benturan visi dan kepentingan sering menjadi hambatan integrasi." },
  { q: "35. Motivasi utama persaingan dalam status sosial di masyarakat adalah...", options: ["A. Mencari hukuman", "B. Mendapatkan pengakuan, prestise, dan hak istimewa", "C. Penolakan keluarga", "D. Penurunan standar hidup", "E. Kebebasan dari hukum"], ans: 1, exp: "Status sosial sering dikaitkan dengan kehormatan (prestise) dan hak tertentu yang menjadi penggerak kompetisi individu." },
  { q: "36. Dampak penyampaian pesan persuasif dalam sosialisasi bahaya narkoba adalah...", options: ["A. Membuat masyarakat marah", "B. Perubahan perilaku secara sukarela atas kesadaran diri", "C. Keinginan melanggar aturan", "D. Ketidakpedulian total", "E. Kebingungan bahasa"], ans: 1, exp: "Pesan persuasif bertujuan memengaruhi pikiran orang lain agar bertindak sesuai harapan tanpa paksaan." },
  { q: "37. Contoh sosialisasi tipe formal di masyarakat adalah...", options: ["A. Nasihat kakek saat makan", "B. Aturan tata tertib RT yang tertulis dan disahkan", "C. Dongeng ibu sebelum tidur", "D. Obrolan di pos ronda", "E. Meniru cara bicara teman"], ans: 1, exp: "Sosialisasi formal didasarkan pada peraturan resmi, lembaga hukum, atau dokumen tertulis yang disepakati." },
  { q: "38. Faktor pendorong proses asimilasi budaya adalah...", options: ["A. Sikap tertutup", "B. Adanya musuh bersama dari luar", "C. Kurang ilmu budaya", "D. Perbedaan fisik mencolok", "E. Persaingan ekonomi"], ans: 1, exp: "Toleransi dan adanya ancaman/musuh bersama dari luar dapat mempercepat penyatuan dua budaya yang berbeda." },
  { q: "39. Kelompok interaksi sosial yang bersifat integratif (menuju persatuan) adalah...", options: ["A. Konflik dan kontravensi", "B. Kerjasama, akomodasi, asimilasi", "C. Tawuran dan perselisihan", "D. Penghinaan dan rasisme", "E. Boikot dan sabotase"], ans: 1, exp: "Opsi B adalah bentuk-bentuk interaksi asosiatif yang membangun harmoni dan kesatuan sosial." },
  { q: "40. Lembaga keluarga sangat krusial dalam pembentukan kepribadian karena...", options: ["A. Memberi banyak uang jajan", "B. Agen sosialisasi pertama yang menanamkan nilai dan moral", "C. Anak harus di rumah terus", "D. Memaksa anak bekerja", "E. Wajah anggota keluarga mirip"], ans: 1, exp: "Keluarga adalah lingkungan sosial pertama (lembaga primer) yang membangun fondasi karakter dasar setiap individu." },
  { q: "41. Fungsi utama lembaga pendidikan sebagai agen sosialisasi sekunder adalah...", options: ["A. Mengajarkan cara main game", "B. Memberikan ilmu dan kemandirian untuk dunia kerja", "C. Menggantikan tugas memasak", "D. Mengharuskan beli buku", "E. Memberi kebebasan tanpa aturan"], ans: 1, exp: "Sekolah mentransfer kompetensi intelektual dan keterampilan teknis yang dibutuhkan individu di masa depan." },
  { q: "42. Dampak ketidakadilan dalam pembagian bantuan sosial terhadap solidaritas warga adalah...", options: ["A. Warga makin rajin", "B. Muncul kecemburuan sosial dan konflik internal", "C. Bantuan terserap cepat", "D. Pujian dari pemerintah", "E. Hujan meteor"], ans: 1, exp: "Ketidakadilan merusak rasa saling percaya (trust) dan memicu perpecahan dalam struktur sosial masyarakat." },
  { q: "43. Hubungan antara kesenjangan ekonomi dengan sektor pendidikan adalah...", options: ["A. Anak miskin banyak jadi sarjana", "B. Angka putus sekolah tinggi pada keluarga prasejahtera", "C. Semua sekolah fasilitasnya sama", "D. Gaji guru naik otomatis", "E. Harga buku menurun"], ans: 1, exp: "Kondisi ekonomi memengaruhi aksesibilitas terhadap layanan pendidikan berkualitas; ekonomi rendah cenderung memicu putus sekolah." },
  { q: "44. Dampak kriminalitas terhadap tatanan kehidupan masyarakat adalah...", options: ["A. Meningkatnya rasa aman", "B. Terciptanya ketakutan dan terganggunya aktivitas ekonomi", "C. Warga sering liburan", "D. Polisi berkurang", "E. Harga rumah naik"], ans: 1, exp: "Kejahatan merusak ketertiban umum dan menghambat produktivitas serta kenyamanan hidup warga." },
  { q: "45. Penyelesaian sengketa lahan melalui jalur pengadilan disebut...", options: ["A. Kompromi", "B. Mediasi", "C. Adjudikasi", "D. Konsiliasi", "E. Arbitrase"], ans: 2, exp: "Adjudikasi adalah bentuk akomodasi atau penyelesaian konflik melalui sistem hukum formal/lembaga peradilan." }
];

const essayData: Essay[] = [
  { q: "1. Sebutkan dan jelaskan tiga kegiatan konkret pelestarian lingkungan yang dapat dilakukan murid di sekolah!", exp: "1) <b>Pemilahan Sampah:</b> Memisahkan sampah organik dan anorganik untuk didaur ulang. 2) <b>Pembuatan Kompos:</b> Mengolah sampah taman menjadi pupuk. 3) <b>Penghematan Energi:</b> Mematikan lampu/kipas kelas saat tidak digunakan." },
  { q: "2. Jelaskan dampak nyata perubahan iklim yang dirasakan di wilayah Indonesia!", exp: "1) <b>Ketidakpastian Musim:</b> Musim hujan/kemarau ekstrem yang memicu banjir atau kekeringan. 2) <b>Kenaikan Permukaan Laut:</b> Mencairnya es kutub mengancam wilayah pesisir dan pulau kecil." },
  { q: "3. Mengapa beton ringan (hebel) dianggap lebih unggul dibanding bata merah dalam konstruksi modern?", exp: "1) <b>Efisiensi:</b> Ukuran lebih besar mempercepat pemasangan. 2) <b>Struktur:</b> Massa lebih ringan mengurangi beban fondasi bangunan. 3) <b>Isolasi:</b> Lebih baik dalam meredam panas dan suara." },
  { q: "4. Rancanglah sebuah rencana mitigasi bencana gempa bumi sederhana untuk lingkungan sekolah!", exp: "1) <b>Jalur Evakuasi:</b> Memasang rambu petunjuk ke titik kumpul aman. 2) <b>Simulasi:</b> Latihan rutin prosedur berlindung (drop, cover, hold on). 3) <b>P3K:</b> Menyiapkan tas siaga bencana di setiap gedung." },
  { q: "5. Sebutkan tiga faktor non-harga yang menyebabkan kurva permintaan meningkat (bergeser ke kanan)!", exp: "1) <b>Pendapatan:</b> Naiknya gaji konsumen meningkatkan daya beli. 2) <b>Selera:</b> Adanya tren atau produk yang sedang viral. 3) <b>Ekspektasi:</b> Dugaan harga akan naik di masa depan memicu pembelian sekarang." }
];

export default function SimulasiIPASPage() {
  const [view, setView] = useState<'landing' | 'quiz' | 'essay'>('landing');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(mcqData.length).fill(null));
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleStart = () => {
    setView('quiz');
    setCurrentIndex(0);
    setScore(0);
    setAnswers(Array(mcqData.length).fill(null));
  };

  const handleAnswer = (index: number) => {
    if (answers[currentIndex] !== null) return;
    setAnswers(prev => {
      const newArr = [...prev];
      newArr[currentIndex] = index;
      return newArr;
    });
    if (index === mcqData[currentIndex].ans) setScore(prev => prev + 1);
  };

  const handleNext = () => {
    if (currentIndex < mcqData.length - 1) setCurrentIndex(prev => prev + 1);
    else setShowModal(true);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const finalScore = Math.round((score / mcqData.length) * 100);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans text-slate-900 flex flex-col items-center">
      {view === 'landing' && (
        <div className="bg-white rounded-3xl p-10 md:p-16 shadow-xl text-center max-w-2xl w-full border-t-8 border-sky-500 animate-fade-in-up">
          <div className="text-6xl mb-6">🔬🌱</div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">Simulasi PSAJ IPAS</h1>
          <p className="text-slate-600 mb-8 text-lg">Uji pemahaman fenomena alam dan dinamika sosial. Berisi 40 soal pilihan ganda dan 5 uraian analitis sesuai kisi-kisi resmi.</p>
          <button onClick={handleStart} className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:-translate-y-1">Mulai Eksplorasi</button>
        </div>
      )}

      {view === 'quiz' && (
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl max-w-3xl w-full border-t-4 border-sky-500 animate-fade-in-up">
          <div className="flex justify-between items-center mb-3 text-sky-600 font-bold uppercase tracking-widest text-sm">
            <span>Progress: {currentIndex + 1} / {mcqData.length}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 mb-8 overflow-hidden shadow-inner">
            <div className="bg-gradient-to-r from-sky-500 to-indigo-400 h-full transition-all duration-500" style={{ width: `${((currentIndex + 1) / mcqData.length) * 100}%` }}></div>
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-8 leading-relaxed">{mcqData[currentIndex].q}</h2>
          <div className="flex flex-col gap-3">
            {mcqData[currentIndex].options.map((opt, i) => {
              const hasAnswered = answers[currentIndex] !== null;
              const isCorrect = i === mcqData[currentIndex].ans;
              const isSelected = i === answers[currentIndex];
              let btnClass = "text-left p-4 rounded-xl border-2 transition-all ";
              if (!hasAnswered) btnClass += "border-slate-200 bg-white hover:border-sky-500 hover:bg-sky-50 cursor-pointer";
              else btnClass += isCorrect ? "border-emerald-500 bg-emerald-50 text-emerald-800 font-bold" : isSelected ? "border-rose-500 bg-rose-50 text-rose-800" : "border-slate-100 opacity-50";
              return <button key={i} onClick={() => handleAnswer(i)} disabled={hasAnswered} className={btnClass}>{opt}</button>;
            })}
          </div>
          {answers[currentIndex] !== null && (
            <div className="mt-8 p-6 rounded-2xl bg-sky-50 border border-sky-100 animate-fade-in">
              <h4 className="font-bold text-sky-800 mb-2">Penjelasan Ilmiah:</h4>
              <p className="text-slate-700">{mcqData[currentIndex].exp}</p>
            </div>
          )}
          <div className="mt-8 flex justify-between">
            <button onClick={handlePrevious} disabled={currentIndex === 0} className={`font-bold py-3 px-6 rounded-xl ${currentIndex === 0 ? 'bg-slate-200 text-slate-400' : 'bg-slate-500 text-white hover:bg-slate-600'}`}>Back</button>
            {answers[currentIndex] !== null && <button onClick={handleNext} className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg">{currentIndex === mcqData.length - 1 ? 'Finish' : 'Next'}</button>}
          </div>
        </div>
      )}

      {view === 'essay' && (
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl max-w-4xl w-full border-t-8 border-sky-500 animate-fade-in-up">
          <h2 className="text-3xl font-extrabold text-slate-800 mb-8 text-center tracking-tight">Kajian Uraian (Esai)</h2>
          <div className="flex flex-col gap-6">
            {essayData.map((item, index) => (
              <div key={index} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                <h3 className="font-bold text-sky-800 mb-4 text-lg border-b border-sky-100 pb-2">{item.q}</h3>
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
          <div className="bg-white rounded-3xl p-10 text-center max-w-md w-full shadow-2xl border-4 border-sky-500">
            <div className="text-5xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Simulasi Berhasil!</h2>
            <p className="text-slate-500 mb-8 tracking-wide">Skor analisis IPAS Anda adalah:</p>
            <div className="relative w-44 h-44 mx-auto mb-8 flex justify-center items-center rounded-full shadow-inner border-8 border-slate-50" style={{ background: `conic-gradient(#0284c7 ${finalScore}%, #f1f5f9 0)` }}>
              <div className="absolute inset-3 bg-white rounded-full flex justify-center items-center shadow-lg"><span className="text-6xl font-black text-sky-600 tracking-tighter">{finalScore}</span></div>
            </div>
            <h3 className="text-lg font-bold text-slate-700 mb-8 px-4">{finalScore >= 85 ? "Luar Biasa! Kemampuan analisis fenomena Anda sangat tajam. 🌟" : finalScore >= 70 ? "Bagus! Terus asah logika sains dan sosial Anda. 👍" : "Terus semangat! Bacalah kembali konsep ekosistem dan ekonomi. 💪"}</h3>
            <button onClick={() => { setShowModal(false); setView('essay'); window.scrollTo(0,0); }} className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg uppercase tracking-widest">Cek Pembahasan Esai</button>
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