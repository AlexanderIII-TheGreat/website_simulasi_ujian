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

// --- DATA SOAL BAHASA INDONESIA ---
const mcqData: MCQ[] = [
  { q: "1. Hutan bakau di pesisir utara Jawa memiliki peran vital dalam menahan laju abrasi. Selain itu, ekosistem ini menjadi tempat berkembang biak berbagai jenis ikan dan kepiting bakau. Keberadaannya sangat bergantung pada kesadaran masyarakat sekitar untuk tidak melakukan penebangan liar. Ide pokok paragraf tersebut adalah...", options: ["A. Tempat berkembang biak ikan", "B. Penebangan liar di pesisir utara", "C. Peran vital hutan bakau", "D. Kesadaran masyarakat sekitar", "E. Jenis-jenis kepiting bakau"], ans: 2, exp: "Paragraf tersebut secara keseluruhan membahas fungsi atau peran penting (vital) dari hutan bakau, sedangkan kalimat lainnya adalah kalimat penjelas." },
  { q: "2. Pengusaha: 'Kami tawarkan kerja sama pengadaan bahan baku dengan diskon 10% jika Anda berlangganan selama setahun.' Pemasok: 'Menarik, tapi bisakah diskonnya menjadi 15% mengingat kami akan mengambil dalam kuantitas besar setiap bulannya?' Kutipan di atas termasuk ke dalam struktur teks negosiasi bagian...", options: ["A. Orientasi", "B. Pengajuan", "C. Penawaran", "D. Persetujuan", "E. Penutup"], ans: 2, exp: "Terdapat proses tawar-menawar (negosiasi) antara pengusaha dan pemasok untuk mencapai kesepakatan persentase diskon." },
  { q: "3. Pergi berlayar ke Pulau Bali, Singgah sebentar membeli roti. Jika selalu ingkar janji, Tiada lagi orang yang simpati. Makna tersirat pantun tersebut adalah...", options: ["A. Larangan pergi ke Pulau Bali", "B. Anjuran membeli roti saat berlayar", "C. Orang yang suka berbohong akan dijauhi", "D. Janji harus ditepati di atas kapal", "E. Hilangnya simpati karena roti"], ans: 2, exp: "Makna pantun ada pada baris ke-3 dan 4 (isi), yaitu peringatan bahwa kebiasaan ingkar janji akan membuat seseorang kehilangan simpati/kepercayaan." },
  { q: "4. Kendaraan bermotor bertenaga listrik kini mulai mendominasi jalanan ibu kota. Penggunaannya diklaim mampu mengurangi polusi udara secara signifikan karena tidak menghasilkan emisi gas karbon. Di sisi lain, infrastruktur stasiun pengisian daya masih perlu diperbanyak. Gagasan utama dari teks di atas adalah...", options: ["A. Kendaraan listrik tidak butuh bensin", "B. Emisi karbon menyebabkan polusi", "C. Dampak positif dan kendala penggunaan kendaraan listrik", "D. Stasiun pengisian daya sulit dicari", "E. Dominasi kendaraan bermotor di ibu kota"], ans: 2, exp: "Paragraf ini merangkum dua gagasan utama: dampak positif (mengurangi emisi) dan kendala infrastruktur kendaraan listrik." },
  { q: "5. Lidah buaya memiliki berbagai khasiat untuk kesehatan kulit. Getahnya sering digunakan untuk mengobati luka bakar ringan karena memberikan efek dingin. Selain itu, ekstrak lidah buaya banyak dipakai sebagai bahan dasar pelembap wajah. Gagasan utama paragraf tersebut adalah...", options: ["A. Cara mengobati luka bakar", "B. Ekstrak lidah buaya untuk wajah", "C. Khasiat lidah buaya untuk kulit", "D. Getah dingin lidah buaya", "E. Tanaman obat keluarga"], ans: 2, exp: "Inti dari paragraf tersebut terletak di awal kalimat (deduktif) yang menjelaskan berbagai manfaat lidah buaya bagi kulit." },
  { q: "6. Batik merupakan warisan budaya Indonesia yang telah diakui oleh UNESCO. Motif batik di setiap daerah memiliki corak dan filosofi yang berbeda-beda. [...]. Oleh karena itu, kita wajib melestarikannya. Kalimat yang tepat untuk melengkapi teks rumpang di atas adalah...", options: ["A. Harga batik tulis sangat mahal.", "B. Kekayaan ragam motif ini menjadi identitas bangsa.", "C. Pembuatan batik membutuhkan lilin dan canting.", "D. Batik kini banyak dicetak menggunakan mesin.", "E. Turis asing sangat menyukai batik."], ans: 1, exp: "Kalimat B menjaga koherensi paragraf dengan menyambungkan gagasan tentang perbedaan corak dan kesimpulan untuk melestarikannya sebagai identitas." },
  { q: "7. Anggrek hitam (Coelogyne pandurata) merupakan spesies flora endemik Kalimantan Timur yang terancam punah. Penyusutan habitat akibat alih fungsi lahan menjadi faktor utama berkurangnya populasi bunga eksotis ini. Gagasan teks tersebut membahas tentang...", options: ["A. Keindahan bunga anggrek", "B. Cara membudidayakan anggrek", "C. Ancaman kepunahan anggrek hitam", "D. Flora endemik di Indonesia", "E. Alih fungsi lahan sawit"], ans: 2, exp: "Fokus utama teks tersebut adalah menceritakan kondisi anggrek hitam yang statusnya terancam punah beserta penyebabnya." },
  { q: "8. Ibu: 'Sudah malam, kenapa kamu masih bermain ponsel, Riko?' | Riko: 'Sebentar lagi, Bu. Riko mau menyelesaikan game ini.' | Ibu: 'Waktu belajarmu sudah habis hanya untuk bermain. Besok kamu bisa mengantuk di sekolah.' Keterkaitan peristiwa dalam drama dengan kehidupan sehari-hari adalah...", options: ["A. Anak yang selalu mematuhi perintah orang tua", "B. Bermain game meningkatkan konsentrasi belajar", "C. Kebiasaan menunda waktu tidur karena bermain gawai", "D. Ibu yang terlalu mengekang anaknya", "E. Pentingnya bermain ponsel di malam hari"], ans: 2, exp: "Situasi kecanduan gawai hingga lupa waktu istirahat adalah fenomena yang sangat sering terjadi di kehidupan sehari-hari pelajar saat ini." },
  { q: "9. Budi: 'Aku tidak mengambil uangmu!' (Sambil tersenyum lebar dan melompat-lompat kegirangan). | Andi: 'Tapi hanya kamu yang ada di kelas tadi!' Kelemahan kutipan drama tersebut terletak pada...", options: ["A. Dialog yang terlalu panjang", "B. Tokoh Budi tidak memiliki alasan", "C. Ketidaksesuaian emosi dialog dengan petunjuk lakuan", "D. Tokoh Andi terlalu menuduh", "E. Tidak ada latar tempat"], ans: 2, exp: "Petunjuk lakuan (kramagung) 'tersenyum dan melompat' bertentangan dengan dialog Budi yang sedang dituduh mencuri dan membela diri." },
  { q: "10. Sinta: 'Kepalaku rasanya mau pecah menghadapi ujian matematika ini!' Majas yang digunakan Sinta adalah...", options: ["A. Personifikasi", "B. Metafora", "C. Hiperbola", "D. Simile", "E. Ironi"], ans: 2, exp: "Hiperbola adalah majas yang melebih-lebihkan suatu kenyataan secara tidak masuk akal (kepala pecah karena ujian)." },
  { q: "11. (1) Tekan tombol power. (2) Colokkan steker pada stopkontak. (3) Masukkan dokumen. (4) Tekan tombol Start. Urutan yang tepat agar menjadi prosedur menggunakan mesin fotokopi adalah...", options: ["A. (1) - (2) - (3) - (4)", "B. (2) - (1) - (3) - (4)", "C. (3) - (1) - (2) - (4)", "D. (2) - (3) - (1) - (4)", "E. (4) - (3) - (2) - (1)"], ans: 1, exp: "Langkah logis dan aman: hubungkan arus listrik (2), hidupkan mesin (1), masukkan dokumen (3), mulai fotokopi (4)." },
  { q: "12. Menjaga kebersihan lingkungan sekolah adalah tanggung jawab bersama. [...]. Dengan lingkungan yang bersih, proses belajar mengajar akan terasa lebih nyaman. Kalimat yang tepat untuk melengkapi bagian rumpang adalah...", options: ["A. Siswa yang terlambat akan dihukum.", "B. Penjaga sekolah selalu datang pagi.", "C. Setiap siswa wajib membuang sampah pada tempatnya.", "D. Ujian akhir semester akan dilaksanakan.", "E. Kantin sekolah menjual makanan sehat."], ans: 2, exp: "Membuang sampah pada tempatnya adalah tindakan konkret yang menyambungkan gagasan tanggung jawab kebersihan dengan kenyamanan belajar." },
  { q: "13. Ki Hajar Dewantara lahir dengan nama Raden Mas Soewardi Soerjaningrat. Beliau mendirikan perguruan Taman Siswa. [...]. Karena jasa-jasanya, hari kelahirannya diperingati sebagai Hari Pendidikan Nasional.", options: ["A. Ia menyukai pertunjukan wayang.", "B. Perjuangan beliau difokuskan pada pendidikan bagi kaum pribumi.", "C. Keluarganya adalah keturunan keraton Yogyakarta.", "D. Ia pernah diasingkan ke Belanda.", "E. Buku-bukunya banyak dibaca pemuda."], ans: 1, exp: "Kalimat B sangat relevan menjembatani informasi tentang Taman Siswa dan gelar pahlawan pendidikan nasionalnya." },
  { q: "14. Senja menyapa di ujung barat cakrawala. [...]. Angin berhembus perlahan membawa aroma petrikor dari sisa hujan sore tadi. Kalimat deskriptif yang tepat untuk teks di atas adalah...", options: ["A. Matahari mulai bersinar terang", "B. Langit perlahan berubah warna menjadi jingga keemasan", "C. Suara burung gagak terdengar menakutkan", "D. Jalanan kota mulai dipadati kendaraan", "E. Nelayan bersiap untuk melaut"], ans: 1, exp: "Teks bernuansa alam yang puitis paling cocok dilanjutkan dengan deskripsi visual pergantian warna langit saat senja." },
  { q: "15. Tanaman anggrek membutuhkan adaptasi agar tidak mati saat dipindahkan ke pot baru. Proses penyesuaian diri makhluk hidup terhadap lingkungan baru disebut...", options: ["A. Fotosintesis", "B. Aklimatisasi", "C. Metamorfosis", "D. Reboisasi", "E. Evaporasi"], ans: 1, exp: "Dalam ilmu biologi/pertanian, penyesuaian fisiologis terhadap lingkungan baru disebut aklimatisasi." },
  { q: "16. Banyak remaja kini memiliki 'kecenderungan' untuk menggunakan media sosial secara berlebihan. Sinonim kata bercetak kutip adalah...", options: ["A. Kemauan", "B. Kebiasaan", "C. Tendensi", "D. Paksaan", "E. Larangan"], ans: 2, exp: "Kecenderungan memiliki makna leksikal yang sama persis dengan 'tendensi' (condong pada suatu hal)." },
  { q: "17. PU: Semua siswa SMK Negeri 1 Mondokan wajib mengikuti ekstrakurikuler. | PK: Anton adalah siswa SMK Negeri 1 Mondokan. Kesimpulan yang tepat adalah...", options: ["A. Anton mungkin mengikuti ekstrakurikuler.", "B. Anton tidak wajib mengikuti ekstrakurikuler.", "C. Semua siswa wajib seperti Anton.", "D. Anton wajib mengikuti kegiatan ekstrakurikuler.", "E. Anton siswa yang rajin ekstrakurikuler."], ans: 3, exp: "Penarikan kesimpulan silogisme menggunakan rumus: K = S (Subjek PK) + P (Predikat PU)." },
  { q: "18. Data Penjualan Keripik: Jan=50, Feb=60, Mar=70. Kesimpulan yang tepat berdasarkan tren data tersebut adalah...", options: ["A. Penjualan semua produk naik tajam.", "B. Sirup paling banyak terjual.", "C. Penjualan keripik mengalami peningkatan setiap bulannya.", "D. Abon tidak laku dijual.", "E. Kenaikan tertinggi di bulan Februari."], ans: 2, exp: "Angka 50, 60, dan 70 menunjukkan tren peningkatan penjualan keripik yang stabil secara berurutan setiap bulannya." },
  { q: "19. Para pekerja terus melakukan perbaikan jalan, 'sehingga' cuaca sedang hujan deras. Konjungsi pengganti yang benar untuk kata kutipan adalah...", options: ["A. Walaupun", "B. Karena", "C. Maka", "D. Agar", "E. Dan"], ans: 0, exp: "Kondisi bekerja dan hujan deras menunjukkan hubungan perlawanan (konsesif), sehingga konjungsi yang tepat adalah 'walaupun' atau 'meskipun'." },
  { q: "20. (1) Kopi adalah minuman populer. (2) Budidaya kopi butuh iklim sejuk. (3) Harga teh di pasaran sedang menurun. (4) Indonesia adalah penghasil kopi terbesar. Kalimat sumbang ditunjukkan oleh nomor...", options: ["A. (1)", "B. (2)", "C. (3)", "D. (4)", "E. Tidak ada"], ans: 2, exp: "Seluruh paragraf membahas tentang kopi, tiba-tiba kalimat (3) membahas tentang teh sehingga memutus kepaduan paragraf." },
  { q: "21. Untuk meminimalisir kesalahan data, pegawai tata usaha harus [...] dokumen tersebut dengan cermat. Kata berimbuhan yang tepat adalah...", options: ["A. Dipelajari", "B. Mempelajari", "C. Pelajari", "D. Pembelajar", "E. Terpelajar"], ans: 1, exp: "Kalimat aktif membutuhkan verba berimbuhan me- yang menyatakan tindakan subjek (pegawai tata usaha mempelajari)." },
  { q: "22. (1) Tarik tuas rem. (2) Nyalakan mesin (starter). (3) Putar kunci ke ON. (4) Putar gas perlahan. Urutan mengendarai motor matic yang benar adalah...", options: ["A. (3) - (2) - (4) - (1)", "B. (2) - (3) - (4) - (1)", "C. (3) - (4) - (2) - (1)", "D. (1) - (2) - (3) - (4)", "E. (4) - (1) - (3) - (2)"], ans: 0, exp: "Logika operasional: Kontak ON (3) -> Starter menyala (2) -> Gas untuk jalan (4) -> Rem untuk berhenti (1)." },
  { q: "23. (1) Program ini membekali keterampilan. (2) SMKN 1 Mondokan menjalin kerja sama industri. (3) Diharapkan lulusan terserap kerja. (4) Kerja sama berupa kelas industri. Urutan paragraf padu adalah...", options: ["A. (2) - (4) - (1) - (3)", "B. (2) - (1) - (4) - (3)", "C. (1) - (2) - (3) - (4)", "D. (4) - (2) - (1) - (3)", "E. (3) - (2) - (4) - (1)"], ans: 0, exp: "Diawali pernyataan umum (2), dijelaskan bentuk kerja samanya (4), tujuan program (1), dan harapan akhirnya (3)." },
  { q: "24. Penulisan alamat surat lamaran pekerjaan yang tepat sesuai PUEBI adalah...", options: ["A. Kepada Yth. Bapak Direktur PT. Maju Jaya, Jln. Merdeka 10, Jakarta", "B. Yth. Direktur PT Maju Jaya\\nJalan Merdeka 10\\nJakarta", "C. Yth: Direktur P.T. Maju Jaya, Jl. Merdeka 10 Jakarta.", "D. Kpd Yth. Dir. PT Maju Jaya\\nJln Merdeka no 10 JKT", "E. Yth. Bapak Direktur PT Maju Jaya\\nJalan Merdeka 10, Jakarta"], ans: 1, exp: "Aturan baku: Tanpa kata 'Kepada', tanpa titik pada PT, 'Jalan' tidak disingkat, tanpa titik di akhir baris, dan tidak memakai sapaan Bapak/Ibu sebelum jabatan." },
  { q: "25. Ibu membeli berbagai macam buah apel jeruk dan anggur. Perbaikan tanda baca yang tepat adalah...", options: ["A. Ibu membeli berbagai macam buah: apel, jeruk, dan anggur.", "B. Ibu membeli berbagai macam buah, apel, jeruk, dan anggur.", "C. Ibu membeli berbagai macam buah; apel, jeruk dan anggur.", "D. Ibu membeli, berbagai macam buah: apel, jeruk, dan anggur.", "E. Ibu membeli berbagai macam buah, apel, jeruk dan anggur."], ans: 0, exp: "Tanda titik dua (:) digunakan di akhir pernyataan lengkap yang diikuti pemerincian. Tanda koma (,) memisahkan rincian." },
  { q: "26. Penulisan judul buku yang tepat sesuai dengan kaidah PUEBI adalah...", options: ["A. Laskar Pelangi Dan Sang Pemimpi", "B. Sejarah Perkembangan Sastra di Indonesia", "C. Tenggelamnya Kapal van Der wijck", "D. Panduan Praktis Menanam Anggrek Di Rumah", "E. Menelusuri Jejak Sejarah Ke pelosok Negeri"], ans: 1, exp: "Setiap awal kata pada judul ditulis kapital, kecuali kata depan/konjungsi (di, ke, dari, dan, yang) yang letaknya di tengah." },
  { q: "27. (1) Biji kopi dikeringkan. (2) Petani memetik biji kopi merah. (3) Penyangraian menentukan cita rasa. (4) Setelah kering, kopi disangrai. Susunan kalimat acak menjadi padu adalah...", options: ["A. (2) - (1) - (4) - (3)", "B. (1) - (2) - (3) - (4)", "C. (2) - (4) - (1) - (3)", "D. (4) - (3) - (2) - (1)", "E. (2) - (1) - (3) - (4)"], ans: 0, exp: "Proses berurutan: Memetik (2), menjemur/mengeringkan (1), menyangrai setelah kering (4), dan kesimpulan proses (3)." },
  { q: "28. Kebiasaan membuang sampah di sungai menyumbat air. Saat hujan, air meluap ke permukiman. Akibatnya, banjir sering melanda. Kesimpulan paragraf tersebut adalah...", options: ["A. Bantaran sungai harus dibersihkan setiap tahun.", "B. Membuang sampah sembarangan di sungai menyebabkan banjir saat hujan.", "C. Volume air meningkat saat musim hujan.", "D. Permukiman warga selalu terendam banjir.", "E. Air tersumbat karena kurang tempat sampah."], ans: 1, exp: "Kesimpulan merangkum hubungan sebab-akibat pokok: sampah di sungai memicu banjir saat musim penghujan." },
  { q: "29. Pasien disarankan membeli obat di 'apotik' setelah mendengar 'nasehat' apoteker. Kata baku yang tepat untuk mengganti kata kutipan adalah...", options: ["A. apotek, nasihat", "B. apotik, nasihat", "C. apotek, nasehat", "D. apoteek, nasihat", "E. apoteker, nasehat"], ans: 0, exp: "Bentuk baku menurut KBBI adalah 'apotek' dan 'nasihat'." },
  { q: "30. Ayah sedang membaca koran 'tetapi' ibu sedang memasak. Konjungsi yang tepat untuk mengganti kata kutipan adalah...", options: ["A. dan", "B. sehingga", "C. sedangkan", "D. walaupun", "E. karena"], ans: 2, exp: "Kalimat ini menyatakan perbandingan dua kegiatan berbeda pada waktu bersamaan, maka konjungsi yang tepat adalah 'sedangkan'." },
  { q: "31. (1) Penggunaan gawai pada anak dibatasi. (2) Layar ganggu kognitif. (3) Berisiko gangguan penglihatan. (4) Harga gawai terbaru semakin terjangkau. (5) Orang tua wajib mengawasi. Kalimat sumbang ditunjukkan nomor...", options: ["A. (1)", "B. (2)", "C. (3)", "D. (4)", "E. (5)"], ans: 3, exp: "Gagasan paragraf adalah dampak negatif gawai dan pengawasan. Kalimat (4) membahas harga, keluar dari konteks (sumbang)." },
  { q: "32. Pemerintah daerah mencanangkan program 'reboisasi' di kawasan perbukitan yang rawan longsor. Makna istilah tersebut adalah...", options: ["A. Penebangan pohon selektif", "B. Penanaman kembali hutan yang gundul", "C. Pembuatan sengkedan pertanian", "D. Pengalihan fungsi lahan", "E. Pembangunan bendungan"], ans: 1, exp: "Reboisasi adalah istilah kehutanan untuk penanaman kembali kawasan yang telah ditebang (gundul)." },
  { q: "33. Bisnis kuliner semakin ketat. Pemilik usaha tidak bisa hanya mengandalkan penjualan luring di toko fisik. [...]. Dengan begitu, produk dapat menjangkau konsumen yang lebih luas. Kalimat untuk melengkapi rumpang adalah...", options: ["A. Pembeli suka memasak sendiri.", "B. Mereka harus memanfaatkan pemasaran digital dan aplikasi pesan antar.", "C. Harga bahan baku fluktuatif.", "D. Kemasan harus berbahan premium.", "E. Karyawan diberi pelatihan."], ans: 1, exp: "Kalimat B menjembatani perpindahan ide dari masalah penjualan 'offline' menuju solusi jangkauan luas (digital/online)." },
  { q: "34. 'Istri direktur yang baru itu sangat ramah.' Kalimat ini ambigu. Perbaikan agar menjadi lugas (jika maksudnya direkturnya yang baru) adalah...", options: ["A. Yang baru itu istri direktur sangat ramah.", "B. Sangat ramah istri direktur yang baru itu.", "C. Istri dari direktur yang baru itu sangat ramah kepada semua karyawan.", "D. Direktur yang baru istrinya itu sangat ramah.", "E. Istri direktur, yang baru itu, sangat ramah."], ans: 2, exp: "Menyisipkan preposisi 'dari' menegaskan kepemilikan status 'baru' menempel pada sang direktur, bukan istrinya." },
  { q: "35. (1) Tidur cukup penting bagi kesehatan. (2) Sel tubuh regenerasi saat tidur. (3) Kurang tidur menurunkan imun. (4) Pemuda menyukai kopi hitam untuk begadang. (5) Idealnya istirahat 7-8 jam per hari. Kalimat yang harus dieliminasi adalah...", options: ["A. (1)", "B. (2)", "C. (3)", "D. (4)", "E. (5)"], ans: 3, exp: "Paragraf membahas pentingnya tidur secara medis. Kalimat (4) tentang kebiasaan minum kopi tidak koheren dan harus dihapus." },
  { q: "36. Sebelum melakukan [...], para [...] tersebut melakukan pemanasan ringan di pinggir lapangan. Kata baku yang tepat untuk mengisi rumpang adalah...", options: ["A. aktifitas, atlit", "B. aktivitas, atlet", "C. aktifitas, atlet", "D. aktivitas, atlit", "E. aktipitas, atlet"], ans: 1, exp: "Penulisan baku yang diakui KBBI adalah 'aktivitas' (pakai v) dan 'atlet'." },
  { q: "37. Penulisan alamat tujuan surat yang paling tepat dan sesuai kaidah PUEBI adalah...", options: ["A. Kepada Yth. Bapak Direktur HRD...", "B. Yth. Direktur HRD PT Maju Mundur,\\nJln. Diponegoro 15", "C. Yth. Direktur HRD PT Maju Mundur\\nJalan Diponegoro 15\\nJakarta", "D. Yth. Bpk. Direktur HRD PT. Maju Mundur", "E. Kpd Yth. Dir. HRD PT Maju Mundur..."], ans: 2, exp: "Tidak memakai 'Kepada', tanpa sapaan Bapak jika ada jabatan, 'PT' tanpa titik, 'Jalan' tidak disingkat, tanpa titik di akhir baris." },
  { q: "38. Pemerintah sedang menyusun 'sistim' baru untuk mempermudah pelayanan. Kata baku yang tepat untuk mengganti kata kutipan adalah...", options: ["A. sistem", "B. sistim", "C. sistym", "D. system", "E. sistematik"], ans: 0, exp: "Kata serapan bahasa Inggris 'system' dibakukan dalam bahasa Indonesia menjadi 'sistem'." },
  { q: "39. Masyarakat di sekitar 'gunung merapi' telah diimbau mengungsi. Perbaikan ejaan kapitalisasi yang tepat adalah...", options: ["A. disekitar Gunung Merapi", "B. di sekitar gunung Merapi", "C. di sekitar Gunung Merapi", "D. disekitar gunung merapi", "E. di sekitar Gunung merapi"], ans: 2, exp: "Preposisi 'di' dipisah jika menunjukkan tempat (di sekitar). Nama geografi yang diikuti nama diri diawali huruf kapital (Gunung Merapi)." },
  { q: "40. Penulisan judul karangan 'pengaruh media sosial terhadap prestasi belajar siswa di sekolah' yang benar (Title Case) adalah...", options: ["A. Pengaruh Media Sosial Terhadap Prestasi Belajar Siswa di Sekolah", "B. Pengaruh Media Sosial terhadap Prestasi Belajar Siswa Di Sekolah", "C. Pengaruh Media Sosial terhadap Prestasi Belajar Siswa di Sekolah", "D. Pengaruh Media Sosial Terhadap Prestasi Belajar Siswa Di Sekolah", "E. Pengaruh media sosial..."], ans: 2, exp: "Setiap kata diawali huruf kapital, kecuali preposisi (terhadap, di) yang terletak di tengah judul." }
];

const essayData: Essay[] = [
  { q: "41. Menyusun Pembuka Surat Lamaran Berdasarkan Iklan", exp: "<b>Kasus:</b> Lowongan PT Angkasa Buana.<br/><b>Pembahasan:</b> Pembuka surat harus menyebutkan sumber dan posisi secara eksplisit. Contoh: <i>'Berdasarkan informasi lowongan pekerjaan di PT Angkasa Buana untuk posisi tenaga Administrasi, dengan ini saya yang bertanda tangan di bawah ini...'</i>" },
  { q: "42. Menemukan Gagasan Pokok & Mengembangkan Paragraf LHO", exp: "<b>Gagasan Pokok:</b> Panel surya sebagai teknologi ramah lingkungan pengubah cahaya menjadi listrik.<br/><b>Pengembangan:</b> <i>'Panel surya merupakan inovasi teknologi yang berfungsi menghasilkan listrik dari tenaga matahari. Alat ini bebas polusi karbon sehingga sangat aman bagi lingkungan...'</i>" },
  { q: "43. Melengkapi Konjungsi Paragraf Rumpang", exp: "<b>Kalimat:</b> Cuaca ekstrem melanda. [1], BPBD menghimbau waspada. Nelayan dilarang melaut [2] ombak mencapai 3 meter.<br/><b>Pembahasan:</b> Rumpang (1) diisi konjungsi antarkalimat akibat <b>'Oleh karena itu'</b>. Rumpang (2) diisi konjungsi sebab <b>'karena/sebab'</b>." },
  { q: "44. Mengubah Kata Dasar menjadi Kata Berimbuhan Imperatif", exp: "<b>Kata Dasar:</b> (Buka), (Isi), (Pilih).<br/><b>Pembahasan:</b> Dalam teks prosedur, langkah kerja diperhalus dengan partikel penegas '-lah' agar menjadi kalimat perintah baku: <b>Bukalah</b>, <b>Isilah</b>, dan <b>Pilihlah</b>." },
  { q: "45. Analisis Pemahaman Prosedur APAR di Perkantoran", exp: "<b>Pembahasan Logis:</b> Prosedur penggunaan APAR wajib dipahami seluruh pegawai (bukan hanya petugas) karena kebakaran tidak bisa diprediksi. Pemahaman merata memastikan tindakan pemadaman awal dapat dilakukan oleh siapa pun yang terdekat, mencegah api membesar sebelum tim ahli tiba." }
];

export default function SimulasiBahasaIndonesia() {
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
      <div className="text-6xl mb-6">📚</div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">Simulasi PSAJ Bahasa Indonesia</h1>
      <p className="text-slate-600 mb-8 text-lg leading-relaxed">Persiapkan dirimu dengan 40 soal pilihan ganda interaktif dan review 5 soal uraian komprehensif. Pahami kaidah kebahasaan dan struktur teks secara mendalam.</p>
      <button 
        onClick={handleStart}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-blue-500/40 text-lg"
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
          <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Soal {currentIndex + 1} dari {mcqData.length}</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 mb-8 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-500 ease-out" 
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
              btnClass += "border-slate-200 bg-slate-50 hover:border-blue-500 hover:bg-blue-50 text-slate-700 cursor-pointer hover:translate-x-1";
            } else {
              btnClass += "cursor-default ";
              if (isCorrect) {
                btnClass += "border-teal-500 bg-teal-50 text-teal-800";
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
          <div className={`mt-8 p-6 rounded-2xl animate-fade-in shadow-sm ${selectedOption === currentQuestion.ans ? 'bg-teal-50 border border-teal-200' : 'bg-rose-50 border border-rose-200'}`}>
            <h4 className={`font-bold text-lg mb-2 flex items-center gap-2 ${selectedOption === currentQuestion.ans ? 'text-teal-700' : 'text-rose-700'}`}>
              {selectedOption === currentQuestion.ans ? '✅ Tepat Sekali!' : '❌ Kurang Tepat'}
            </h4>
            <p className="text-slate-700 leading-relaxed">
              <strong className="text-slate-900">Pembahasan:</strong> {currentQuestion.exp}
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
              className={`font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-md transform hover:-translate-y-1 ${currentIndex === mcqData.length - 1 ? 'bg-teal-600 hover:bg-teal-700 text-white hover:shadow-teal-500/40' : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-blue-500/40'}`}
            >
              {currentIndex === mcqData.length - 1 ? 'Selesai & Lihat Nilai 🏆' : 'Pertanyaan Selanjutnya ⏭️'}
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
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-3">Review Materi Uraian</h2>
        <p className="text-slate-500">Kuasai konsep esai untuk meraih nilai maksimal pada ujian sesungguhnya.</p>
      </div>
      
      <div className="flex flex-col gap-6">
        {essayData.map((item, index) => (
          <div key={index} className="bg-slate-50 border border-slate-200 p-6 md:p-8 rounded-2xl hover:shadow-md transition-shadow">
            <h3 className="font-bold text-blue-800 mb-4 text-lg border-b border-blue-100 pb-2">{item.q}</h3>
            <p className="text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.exp }}></p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button 
          onClick={handleStart}
          className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:-translate-y-1"
        >
          🔄 Ulangi Simulasi dari Awal
        </button>
      </div>
    </div>
  );

  const finalScore = Math.round((score / mcqData.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-200 py-12 px-4 font-sans text-slate-900 flex flex-col items-center">
      
      {/* Main View Manager */}
      {view === 'landing' && renderLanding()}
      {view === 'quiz' && renderQuiz()}
      {view === 'essay' && renderEssays()}

      {/* Final Score Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-10 text-center max-w-md w-full shadow-2xl transform scale-100 transition-transform">
            <div className="text-5xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Simulasi Telah Selesai!</h2>
            <p className="text-slate-500 mb-8">Ini adalah persentase penguasaan materimu:</p>
            
            <div className="relative w-44 h-44 mx-auto mb-8 flex justify-center items-center rounded-full shadow-inner" 
                 style={{ background: `conic-gradient(#2563eb ${finalScore}%, #f1f5f9 0)` }}>
              <div className="absolute inset-3 bg-white rounded-full flex justify-center items-center shadow-sm">
                <span className="text-6xl font-black text-blue-600">{finalScore}</span>
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-slate-800 mb-8 px-4">
              {finalScore >= 85 ? "Luar Biasa! Kemampuan literasi dan tata bahasamu sangat mumpuni. 🌟" : finalScore >= 70 ? "Kerja Bagus! Pahami sedikit lagi detail PUEBI dan majas. 👍" : "Jangan Patah Semangat! Terus berlatih agar semakin terbiasa. 💪"}
            </h3>
            
            <button 
              onClick={handleGoToEssays}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:-translate-y-1"
            >
              Lanjutkan ke Review Esai 📖
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