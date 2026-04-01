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

// --- DATA SOAL PENDIDIKAN AGAMA ISLAM (PAI) ---
const mcqData: MCQ[] = [
  { q: "1. Perhatikan potongan ayat Q.S. Al-Hujurat: 10 berikut:<div dir=\"rtl\" class=\"text-3xl text-emerald-800 font-bold my-4 leading-relaxed\">إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ فَأَصْلِحُوا بَيْنَ أَخَوَيْكُمْ</div>Lafaz <b>الْمُؤْمِنُونَ</b> mengandung hukum bacaan tajwid...", options: ["A. Idzhar syafawi", "B. Alif lam qamariyah", "C. Alif lam syamsiyah", "D. Idghom bighunnah", "E. Ikhfa haqiqi"], ans: 1, exp: "Lafaz tersebut mengandung alif lam yang bertemu dengan huruf mim (salah satu huruf qamariyah). Hukum bacaannya adalah Alif Lam Qamariyah, di mana huruf lam (ل) dibaca jelas." },
  { q: "2. Pergaulan bebas di kalangan remaja saat ini sangat mengkhawatirkan karena sering berujung pada tindakan zina yang merusak masa depan. Berdasarkan kandungan Q.S. Al-Isra ayat 32, cara yang paling tepat untuk menghindari perilaku tersebut adalah...", options: ["A. Membatasi pertemanan hanya dengan sesama jenis secara ekstrem", "B. Menjauhi segala bentuk aktivitas yang dapat mendekatkan diri pada zina seperti pacaran dan berduaan (khalwat)", "C. Menerapkan hukuman rajam tanpa pengadilan", "D. Memperbanyak teman dari kalangan non-muslim", "E. Mengizinkan pacaran asalkan diawasi oleh orang tua"], ans: 1, exp: "Q.S. Al-Isra ayat 32 berbunyi <i>Walaa taqrabuz zina</i> (Dan janganlah kamu mendekati zina). Ayat ini melarang segala bentuk aktivitas yang menjadi jalan atau 'mendekatkan' seseorang pada perzinaan." },
  { q: "3. Q.S. At-Taubah ayat 122 menjelaskan tentang pentingnya menuntut ilmu, bahkan dalam kondisi peperangan. Perilaku yang mencerminkan etos menuntut ilmu sesuai makna ayat tersebut adalah...", options: ["A. Semua umat Islam wajib pergi ke medan perang tanpa kecuali", "B. Menuntut ilmu umum lebih diutamakan daripada ilmu agama", "C. Sebagian umat Islam harus memperdalam ilmu agama (tafaqquh fid-din) untuk memberi pengajaran kepada kaumnya", "D. Mencari harta kekayaan sebanyak-banyaknya untuk bekal dakwah", "E. Menyebarkan ilmu tanpa perlu memahaminya secara mendalam"], ans: 2, exp: "Ayat ini menekankan pembagian tugas. Tidak semua orang harus pergi berperang; sebagian harus tinggal untuk mendalami agama (tafaqquh fid-din) agar bisa memberikan pengajaran kepada kaumnya." },
  { q: "4. Perhatikan potongan ayat Q.S. Ali Imran: 190-191 berikut!<div dir=\"rtl\" class=\"text-3xl text-emerald-800 font-bold my-4 leading-relaxed\">وَيَتَفَكَّرُونَ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ</div>Arti yang tepat dari potongan ayat tersebut adalah...", options: ["A. Sesungguhnya dalam penciptaan langit dan bumi", "B. Dan silih bergantinya malam dan siang", "C. Terdapat tanda-tanda bagi orang-orang yang berakal", "D. Dan mereka memikirkan tentang penciptaan langit dan bumi", "E. Maha Suci Engkau, maka peliharalah kami dari siksa neraka"], ans: 3, exp: "Kata <i>yatafakkaruuna</i> berarti 'mereka memikirkan', <i>fii khalqis-samaawaati</i> berarti 'dalam/tentang penciptaan langit', dan <i>wal-ardh</i> berarti 'dan bumi'." },
  { q: "5. Dalam rapat OSIS terjadi perselisihan pendapat yang cukup tajam antara ketua dan anggota. Ketua OSIS yang memahami prinsip musyawarah dalam Q.S. Ali Imran ayat 159 sebaiknya mengambil sikap...", options: ["A. Memaksakan kehendaknya karena ia adalah pemimpin tertinggi", "B. Membubarkan rapat dan mengambil keputusan secara sepihak", "C. Bersikap lemah lembut, memaafkan, memohonkan ampun, lalu mencari kesepakatan bersama secara musyawarah", "D. Memarahi anggota yang tidak setuju dengan idenya", "E. Mengundurkan diri dari jabatan ketua agar lepas dari tanggung jawab"], ans: 2, exp: "Q.S. Ali Imran 159 mengajarkan pemimpin agar bersikap lemah lembut, memaafkan, memohonkan ampun, dan bermusyawarah (wa syaawirhum fil amr) dalam menyelesaikan urusan." },
  { q: "6. Q.S. Ar-Rum ayat 41 menjelaskan bahwa kerusakan di darat dan di laut disebabkan oleh perbuatan tangan manusia. Contoh perilaku menjaga kelestarian lingkungan sebagai implementasi langsung dari ayat tersebut adalah...", options: ["A. Membuang limbah cair pabrik langsung ke sungai", "B. Melakukan reboisasi hutan yang gundul dan membatasi penggunaan plastik sekali pakai", "C. Menebang pohon secara masif untuk pembangunan perumahan elit", "D. Menggunakan kendaraan berbahan bakar fosil secara berlebihan", "E. Membakar tumpukan sampah di lingkungan padat penduduk"], ans: 1, exp: "Implementasi dari kesadaran bahwa manusia berpotensi merusak bumi adalah dengan melakukan aksi perbaikan (reboisasi/penghijauan) dan pencegahan polusi." },
  { q: "7. Musibah gempa bumi dan banjir yang melanda suatu daerah menimbulkan kerugian. Bagi seorang mukmin, sikap yang tepat dan hikmah yang dapat diambil sesuai Q.S. Al-Baqarah: 155-156 adalah...", options: ["A. Menyalahkan pemerintah pusat atas keterlambatan penanganan bencana", "B. Merasa Allah SWT tidak adil karena menimpakan musibah berulang kali", "C. Mengucapkan istirja' (innalillahi wa inna ilaihi raji'un) dan meyakini bahwa musibah adalah ujian untuk menghapus dosa", "D. Pasrah total dan enggan melakukan usaha perbaikan", "E. Menuntut ganti rugi materi kepada pihak lain"], ans: 2, exp: "Sikap orang yang sabar ketika ditimpa musibah adalah mengembalikan semuanya kepada Allah dengan kalimat istirja', karena musibah adalah ladang pahala kesabaran." },
  { q: "8. Syu'abul iman (cabang iman) terbagi menjadi tiga klasifikasi besar: hati/niat, lisan, dan perbuatan. Berikut ini yang termasuk cabang iman dari ranah perbuatan (anggota badan) adalah...", options: ["A. Membaca kitab suci Al-Qur'an", "B. Mencintai Allah dan Rasul-Nya", "C. Menyingkirkan duri atau rintangan yang mengganggu dari jalanan", "D. Mengajarkan ilmu kepada orang lain", "E. Berdzikir mengingat Allah SWT"], ans: 2, exp: "Membaca Al-Qur'an, dzikir, dan mengajar adalah perbuatan lisan. Mencintai Allah adalah niat/hati. Menyingkirkan gangguan di jalan murni melibatkan tindakan anggota badan (perbuatan)." },
  { q: "9. Budi menemukan dompet temannya yang jatuh di kantin. Meskipun berisi uang banyak, ia langsung mengembalikannya kepada pemiliknya tanpa mengambil sedikit pun. Perilaku Budi mencerminkan peneladanan terhadap Asmaul Husna...", options: ["A. Al-Karim (Maha Mulia)", "B. Al-Matin (Maha Kokoh)", "C. Al-Mukmin (Maha Pemberi Keamanan)", "D. Al-Jami' (Maha Mengumpulkan)", "E. Al-Akhir (Maha Akhir)"], ans: 2, exp: "Al-Mukmin berarti Maha Pemberi rasa aman dan Maha Terpercaya. Dengan bersikap jujur dan mengembalikan barang, Budi telah memberikan rasa aman dan bisa dipercaya." },
  { q: "10. Perilaku yang paling tepat mencerminkan iman kepada Malaikat Raqib dan Atid dalam kehidupan sehari-hari adalah...", options: ["A. Rajin bersedekah agar rezekinya ditambah oleh malaikat", "B. Selalu berhati-hati dalam berucap dan bertindak karena meyakini setiap amal baik dan buruk selalu dicatat", "C. Mempersiapkan bekal kematian karena takut malaikat Izrail datang", "D. Menunggu datangnya hari kiamat", "E. Selalu mencuci muka agar didoakan malaikat"], ans: 1, exp: "Tugas utama Malaikat Raqib dan Atid adalah mencatat amal perbuatan manusia. Meyakininya berarti memiliki muraqabatullah (merasa diawasi) sehingga berhati-hati dalam bertindak." },
  { q: "11. Al-Qur'an diturunkan sebagai penyempurna kitab-kitab sebelumnya. Kedudukan Al-Qur'an terhadap kitab-kitab samawi terdahulu (Taurat, Zabur, Injil) adalah sebagai...", options: ["A. Pengganti seluruh sejarah nabi tanpa terkecuali", "B. Pembenar (mushaddiq) dan batu ujian/penjaga (muhaimin) atas keaslian ajaran kitab-kitab sebelumnya", "C. Kitab yang hanya berlaku khusus untuk bangsa Arab", "D. Kumpulan hukum yang bertentangan dengan ajaran nabi-nabi terdahulu", "E. Pelengkap khusus kitab Taurat saja"], ans: 1, exp: "Al-Qur'an membenarkan inti ajaran tauhid di kitab sebelumnya (mushaddiq) dan menjadi tolak ukur (muhaimin) untuk meluruskan penyimpangan yang telah dilakukan manusia." },
  { q: "12. Pasangan sifat wajib dan mustahil bagi Rasul yang benar adalah...", options: ["A. Shidiq (Jujur) >< Khianat (Menipu)", "B. Amanah (Dapat dipercaya) >< Kizib (Dusta)", "C. Tabligh (Menyampaikan) >< Kitman (Menyembunyikan)", "D. Fathanah (Cerdas) >< Khianat (Menipu)", "E. Shidiq (Jujur) >< Baladah (Bodoh)"], ans: 2, exp: "Pasangan yang benar: Shidiq >< Kizib, Amanah >< Khianat, Tabligh >< Kitman, dan Fathanah >< Baladah." },
  { q: "13. Manusia yang meninggal dunia akan melewati alam akhirat secara berurutan. Urutan tahapan peristiwa kehidupan yang dialami manusia setelah kematian yang benar adalah...", options: ["A. Yaumul Barzakh – Yaumul Ba'ats – Yaumul Mahsyar – Yaumul Hisab/Mizan – Yaumul Jaza'", "B. Yaumul Ba'ats – Yaumul Barzakh – Yaumul Mahsyar – Yaumul Hisab – Yaumul Jaza'", "C. Yaumul Mahsyar – Yaumul Barzakh – Yaumul Ba'ats – Yaumul Jaza' – Yaumul Hisab", "D. Yaumul Barzakh – Yaumul Hisab – Yaumul Ba'ats – Yaumul Mahsyar – Yaumul Jaza'", "E. Yaumul Ba'ats – Yaumul Mahsyar – Yaumul Barzakh – Yaumul Jaza' – Yaumul Hisab"], ans: 0, exp: "Urutan yang benar: Barzakh (alam kubur) -> Ba'ats (kebangkitan) -> Mahsyar (tempat berkumpul) -> Hisab & Mizan (perhitungan amal) -> Jaza' (balasan surga/neraka)." },
  { q: "14. Andi telah belajar dengan giat dan tahajud agar lolos seleksi Polisi, namun ia dinyatakan tidak lulus. Sikap tawakal yang benar bagi Andi adalah...", options: ["A. Mengurung diri di kamar karena merasa usahanya sia-sia", "B. Menyalahkan panitia seleksi dan sistem penerimaan", "C. Meyakini bahwa kegagalan tersebut adalah skenario terbaik dari Allah, tetap bersabar, dan kembali mencoba peluang lain", "D. Berhenti beribadah karena merasa doanya tidak dikabulkan", "E. Memaksakan diri menyuap panitia agar bisa lulus"], ans: 2, exp: "Tawakal adalah berserah diri setelah berusaha maksimal (ikhtiar). Jika gagal, orang beriman meyakini rencana Allah selalu lebih baik, sabar, dan tidak putus asa." },
  { q: "15. Berikut ini yang merupakan contoh dari takdir muallaq (bisa diubah dengan ikhtiar/usaha) adalah...", options: ["A. Kematian dan ajal seseorang", "B. Terlahir sebagai laki-laki atau perempuan", "C. Seseorang yang asalnya bodoh dan miskin menjadi cerdas dan sukses karena rajin belajar dan bekerja keras", "D. Pergerakan tata surya", "E. Hari terjadinya kiamat"], ans: 2, exp: "Takdir muallaq pelaksanaannya terkait (bergantung) pada ikhtiar manusia, seperti kepandaian, kekayaan, dan kesehatan. Kematian/jenis kelamin adalah takdir mubram (mutlak)." },
  { q: "16. Di era digital, banyak remaja terjebak memaksakan diri membeli barang mahal demi pamer di media sosial (foya-foya/riya'). Dampak negatif dari sifat tersebut secara mental dan akhlak adalah...", options: ["A. Mendapatkan pengakuan dan status sosial yang tinggi secara permanen", "B. Menjadikan seseorang lebih dermawan kepada sesama", "C. Menimbulkan sifat kikir, tidak peduli pada penderitaan orang lain, dan menghilangkan rasa syukur", "D. Mempercepat datangnya rezeki yang lebih berlimpah", "E. Membantu menggerakkan ekonomi negara"], ans: 2, exp: "Foya-foya (israf) dan Riya' merusak spiritualitas. Pelakunya kehilangan empati sosial demi penampilan, dan lupa bersyukur karena selalu melihat ke atas." },
  { q: "17. Hasad (dengki) adalah sifat tercela yang dapat memakan amal kebaikan. Cara yang paling tepat untuk menghindari sifat hasad dalam pergaulan adalah...", options: ["A. Menjauhi pergaulan sama sekali agar tidak melihat kesuksesan orang", "B. Membanding-bandingkan harta diri sendiri dengan orang yang lebih sukses", "C. Senantiasa bersyukur atas nikmat (qana'ah) dan mendoakan keberkahan bagi orang lain", "D. Mencari-cari kesalahan dan kekurangan orang yang sukses", "E. Melakukan persaingan dengan cara curang"], ans: 2, exp: "Obat utama hasad adalah qana'ah (merasa cukup dan bersyukur) serta ikut mendoakan kebaikan saudara sesama muslim yang mendapat nikmat." },
  { q: "18. Rasulullah SAW menyebutkan bahwa tanda-tanda orang munafik (nifaq) ada tiga. Berikut ini ciri-ciri orang munafik yang disebutkan dalam hadis tersebut, <i>kecuali</i>...", options: ["A. Apabila berbicara ia berdusta", "B. Apabila berjanji ia mengingkari", "C. Apabila dipercaya (diberi amanah) ia berkhianat", "D. Apabila membaca Al-Qur'an hatinya keras", "E. Ketiga tanda di atas (A, B, C) adalah benar ciri orang munafik"], ans: 3, exp: "Hadis riwayat Bukhari Muslim menyebutkan 3 tanda mutlak munafik: bicara dusta, janji ingkar, dipercaya berkhianat. Opsi D tidak disebutkan dalam redaksi hadis tersebut." },
  { q: "19. Saat membuka grup kelas, Doni membaca berita yang menjelek-jelekkan salah satu gurunya tanpa sumber jelas. Adab bermedia sosial menurut pandangan Islam (Tabayyun) yang harus dilakukan Doni adalah...", options: ["A. Langsung menyebarkannya kembali ke grup lain agar semua tahu", "B. Melakukan pengecekan, konfirmasi, dan meneliti kebenaran berita tersebut ke sumber yang valid", "C. Ikut-ikutan memberikan komentar kebencian", "D. Menjadikan bahan bercandaan dengan teman sebangku", "E. Memblokir kontak teman tanpa bertanya"], ans: 1, exp: "Tabayyun berarti mengecek kebenaran suatu informasi secara teliti agar tidak menimpakan musibah/fitnah kepada orang lain karena ketidaktahuan (Q.S. Al-Hujurat: 6)." },
  { q: "20. Berbakti kepada orang tua (birrul walidain) adalah kewajiban abadi. Di bawah ini yang merupakan contoh perilaku berbakti kepada orang tua yang sudah meninggal dunia adalah...", options: ["A. Membangunkan makam yang megah dan mewah dari pualam", "B. Meratapi dan menangisi kepergiannya secara berlebihan setiap hari", "C. Mendoakan ampunan bagi mereka, melunasi utangnya, dan menyambung tali silaturahmi dengan kerabat orang tua", "D. Meminta doa restu di kuburannya agar sukses ujian", "E. Menyimpan barang peninggalannya sebagai jimat"], ans: 2, exp: "Sesuai tuntunan Rasulullah, cara berbakti pada orang tua yang wafat adalah: menshalatkan, memohonkan ampunan, menunaikan utangnya, dan menyambung silaturahmi sahabat/kerabatnya." },
  { q: "21. Kesimpulan manfaat perilaku kompetitif secara sehat dalam kebaikan (Fastabiqul Khairat) di lingkungan sekolah adalah...", options: ["A. Menciptakan permusuhan dan rasa egois antar siswa", "B. Mendorong siswa untuk berprestasi, menghargai waktu, disiplin, dan saling memotivasi", "C. Membuat siswa menghalalkan segala cara saat ujian", "D. Membentuk kelompok-kelompok yang merasa paling unggul", "E. Mengabaikan teman yang kurang pintar"], ans: 1, exp: "Fastabiqul khairat bukan kompetisi saling menjatuhkan, melainkan kompetisi amal shaleh yang iklimnya menumbuhkan motivasi, disiplin, dan sinergi." },
  { q: "22. Tindakan yang mencerminkan sikap demokratis yang sesuai dengan ajaran Islam dalam pengambilan keputusan adalah...", options: ["A. Pemimpin memutuskan secara mutlak tanpa mendengar bawahan", "B. Melakukan pemungutan suara dengan politik uang", "C. Berdebat hingga emosi untuk membuktikan siapa yang paling cerdas", "D. Menghargai perbedaan pendapat dan melaksanakan hasil musyawarah yang telah disepakati bersama dengan ikhlas", "E. Memaksakan ide yang didukung oleh donatur terbesar"], ans: 3, exp: "Demokrasi syura dalam Islam menuntut kedewasaan intelektual: bebas berpendapat tanpa caci-maki, dan mematuhi hasil mufakat secara tawakal (ikhlas)." },
  { q: "23. Perhatikan tata cara shalat jenazah berikut secara acak!<br/>(1) Membaca doa untuk jenazah (Allahummaghfirlahu...)<br/>(2) Takbiratul ihram dan membaca surat Al-Fatihah<br/>(3) Membaca doa untuk keluarga lalu salam<br/>(4) Membaca shalawat atas Nabi Muhammad SAW<br/><br/>Urutan tata cara shalat jenazah yang benar adalah...", options: ["A. 1 – 2 – 3 – 4", "B. 2 – 4 – 1 – 3", "C. 2 – 1 – 4 – 3", "D. 4 – 2 – 1 – 3", "E. 2 – 3 – 4 – 1"], ans: 1, exp: "Takbir 1 (Al-Fatihah), Takbir 2 (Shalawat), Takbir 3 (Doa khusus jenazah), Takbir 4 (Doa keluarga/penutup + Salam)." },
  { q: "24. Berikut ini yang termasuk RUKUN Khutbah Jumat adalah...", options: ["A. Khatib berdiri bagi yang mampu", "B. Khatib dalam keadaan suci dari hadas dan najis", "C. Membaca hamdalah, shalawat Nabi, wasiat takwa, membaca ayat Al-Qur'an, dan mendoakan kaum muslimin", "D. Berpakaian sopan, rapi, dan menutup aurat", "E. Melaksanakan khutbah di atas mimbar"], ans: 2, exp: "Berdiri, suci, dan menutup aurat adalah Syarat Khatib. Sedangkan Hamdalah, Shalawat, Wasiat Takwa, Ayat, dan Doa adalah Rukun (materi wajib yang diucapkan)." },
  { q: "25. Pak Hasan menyetorkan uangnya ke Bank Syariah. Keuntungan dari usaha dibagi dua antara Pak Hasan dan Bank. Jika rugi, ditanggung murni oleh Pak Hasan selaku pemilik modal. Jenis akad syariah ini disebut...", options: ["A. Musyarakah", "B. Murabahah", "C. Wadiah", "D. Mudharabah", "E. Qardh"], ans: 3, exp: "Mudharabah adalah akad kerja sama di mana 100% modal berasal dari satu pihak (Shahibul Maal) dan pihak lain bertindak sebagai pengelola murni (Mudharib)." },
  { q: "26. Perbedaan mendasar antara Asuransi Syariah dengan Asuransi Konvensional terletak pada pengelolaannya, yaitu pada asuransi syariah menggunakan sistem...", options: ["A. Pemindahan risiko (Risk transfer) sepenuhnya kepada perusahaan asuransi", "B. Tolong-menolong saling menanggung risiko (Risk sharing) antar peserta melalui dana Tabarru'", "C. Keuntungan hangus jika tidak ada klaim selama masa polis", "D. Perusahaan asuransi menjadi pemilik sah dana premi peserta", "E. Perjudian (Maisir) dan ketidakpastian (Gharar)"], ans: 1, exp: "Asuransi Syariah didasarkan pada tolong-menolong (ta'awun). Peserta mengumpulkan dana kebajikan (Tabarru') untuk saling menanggung risiko musibah sesama peserta." },
  { q: "27. Dalam hukum Munakahat, suatu perkawinan dipandang sah jika memenuhi rukun nikah. Berikut ini yang merupakan Rukun Pernikahan adalah...", options: ["A. Memiliki rumah pribadi dan pekerjaan tetap", "B. Melaksanakan resepsi secara besar-besaran", "C. Calon Suami, Calon Istri, Wali, Dua Orang Saksi adil, dan Ijab Qabul", "D. Persetujuan dari ketua RT dan kelurahan setempat", "E. Adanya perjanjian pranikah"], ans: 2, exp: "Jumhur ulama menyepakati 5 rukun nikah: Mempelai Pria, Mempelai Wanita, Wali, minimal 2 Saksi, dan Ijab Qabul." },
  { q: "28. Rendi adalah pemuda mapan. Namun, ia memiliki nafsu besar dan sangat khawatir dirinya akan terjerumus perzinaan jika tidak segera menikah. Hukum menikah bagi Rendi dalam kondisi tersebut adalah...", options: ["A. Sunnah", "B. Mubah", "C. Wajib", "D. Makruh", "E. Haram"], ans: 2, exp: "Hukum asal nikah adalah sunnah. Menjadi WAJIB bagi orang yang sudah mampu dan khawatir/yakin dirinya akan jatuh ke dalam zina jika tidak segera menikah." },
  { q: "29. Seorang suami menjatuhkan talak (cerai) kepada istrinya yang dalam keadaan sedang mengandung (hamil). Masa Iddahnya adalah...", options: ["A. Tiga kali masa suci dari haid (Quru')", "B. Tiga bulan sepuluh hari", "C. Empat bulan sepuluh hari", "D. Sampai istri tersebut melahirkan kandungannya", "E. Satu tahun penuh tanpa keluar rumah"], ans: 3, exp: "Sesuai Q.S. At-Thalaq: 4, perempuan hamil yang dicerai (baik cerai hidup/mati), masa iddahnya selesai tepat ketika ia telah melahirkan kandungannya." },
  { q: "30. Menurut Undang-Undang Republik Indonesia Nomor 1 Tahun 1974 tentang Perkawinan, tujuan perkawinan adalah...", options: ["A. Membentuk keluarga (rumah tangga) yang bahagia dan kekal berdasarkan Ketuhanan Yang Maha Esa", "B. Menggabungkan dua harta keluarga besar menjadi satu aset", "C. Untuk menaikkan status kependudukan warga negara", "D. Mengurangi beban negara dalam hal penanggulangan kemiskinan", "E. Sebagai syarat mutlak untuk melamar pekerjaan"], ans: 0, exp: "Bab I Pasal 1 UU No. 1 Tahun 1974 secara eksplisit menyebutkan tujuan tersebut: bahagia, kekal, dan berdasar Ketuhanan YME." },
  { q: "31. Seseorang dapat kehilangan hak mewarisinya (terhalang/Mawani'). Di bawah ini yang merupakan sebab seseorang terhalang mewarisi adalah...", options: ["A. Karena berbeda kewarganegaraan dengan jenazah", "B. Karena anak tersebut merupakan anak angkat (adopsi)", "C. Karena melakukan pembunuhan terhadap pewaris, dan berbeda agama (Murtad/Non-Muslim)", "D. Karena anak tersebut cacat mental", "E. Karena istri tidak memiliki pekerjaan"], ans: 2, exp: "Mawani' mutlak dalam waris ada 3: Status sebagai budak, melakukan pembunuhan terhadap pewaris, dan berlainan agama (muslim & kafir tidak saling mewarisi)." },
  { q: "32. Suami meninggal dunia meninggalkan 1 Istri dan 2 Anak Perempuan. Berdasarkan aturan <i>Furudhul Muqaddarah</i>, bagian pasti yang diterima oleh Istri dalam kondisi ini adalah...", options: ["A. 1/2", "B. 1/4", "C. 1/8", "D. 1/3", "E. 2/3"], ans: 2, exp: "Bagian Istri adalah 1/4 jika suami TIDAK meninggalkan anak. Jika suami meninggalkan keturunan (anak), maka bagian istri menyusut menjadi 1/8." },
  { q: "33. Sunan Kalijaga menyisipkan nilai-nilai tauhid dalam lakon-lakon pewayangan (seperti Jimat Kalimosodo). Pendekatan dakwah ini dapat disimpulkan sebagai jalur...", options: ["A. Jalur pendidikan pesantren", "B. Jalur perdagangan maritim", "C. Jalur pernikahan politis", "D. Jalur asimilasi seni, budaya, dan kesenian lokal", "E. Jalur militer dan penaklukan"], ans: 3, exp: "Wali Songo mengislamkan budaya Hindu-Jawa melalui akulturasi kesenian (wayang, tembang) sebagai medium transfer tauhid yang mudah dicerna rakyat." },
  { q: "34. Kerajaan Islam pertama di Pulau Jawa yang didirikan oleh Raden Patah, dan menjadi pusat perjuangan Walisongo adalah...", options: ["A. Kerajaan Samudera Pasai", "B. Kesultanan Banten", "C. Kerajaan Mataram Islam", "D. Kesultanan Demak Bintoro", "E. Kesultanan Ternate"], ans: 3, exp: "Demak Bintoro adalah Kerajaan Islam pelopor di Jawa dan pusat konsolidasi dakwah serta perlawanan anti-kolonial (khususnya melawan Portugis)." },
  { q: "35. Ulama asal Banten yang menjadi Imam di Masjidil Haram Makkah, serta menulis lebih dari 100 kitab rujukan pesantren (salah satunya Tafsir Marah Labib) adalah...", options: ["A. Syekh Hamzah Fansuri", "B. Syekh Abdurrauf As-Singkili", "C. Syekh Muhammad Nawawi Al-Bantani", "D. K.H. Ahmad Dahlan", "E. K.H. Hasyim Asy'ari"], ans: 2, exp: "Syekh Nawawi Al-Bantani digelari 'Sayyid Ulama Hijaz' berkat keluasan ilmunya di Makkah. Karya-karyanya menjadi rujukan utama pesantren Nusantara." },
  { q: "36. Masa keemasan (The Golden Age) Islam terjadi pada masa Dinasti Abbasiyah di Baghdad. Bukti paling menonjol atas kemajuan ilmu pengetahuan pada masa itu adalah berdirinya perpustakaan akbar bernama...", options: ["A. Universitas Al-Azhar", "B. Istana Al-Hamra", "C. Observatorium Maragha", "D. Baitul Hikmah (House of Wisdom)", "E. Taj Mahal"], ans: 3, exp: "Baitul Hikmah menjadi pusat literasi dunia tempat berkumpulnya sarjana dari berbagai agama untuk menerjemahkan naskah Yunani, Persia, dan India ke bahasa Arab." },
  { q: "37. Kekuasaan Islam di Andalusia (Spanyol) runtuh secara tragis. Faktor internal penyebab utama kemunduran dan keruntuhan tersebut adalah...", options: ["A. Kalahnya kualitas ilmuwan muslim dibanding ilmuwan Eropa", "B. Perpecahan politik umat Islam, munculnya penguasa-penguasa kecil (muluk at-thawaif) yang saling berperang memperebutkan takhta", "C. Habisnya sumber daya alam", "D. Serangan dari tentara Mongol", "E. Kegagalan sistem pertanian"], ans: 1, exp: "Islam di Spanyol runtuh dari dalam karena emirat-emirat kecil saling bermusuhan demi takhta, yang memudahkan Spanyol Kristen melakukan perebutan kembali (Reconquista)." },
  { q: "38. Jamaluddin Al-Afghani mencetuskan gagasan pembaruan 'Pan-Islamisme'. Tujuan utama gerakan tersebut adalah...", options: ["A. Memisahkan antara urusan agama secara total dari wilayah kenegaraan", "B. Membujuk negara-negara barat agar berinvestasi di Timur Tengah", "C. Membangkitkan rasa solidaritas, persatuan, dan kebangkitan umat Islam secara global untuk menyingkirkan dominasi penjajahan Barat", "D. Menyerang kebudayaan Barat melalui perang terbuka", "E. Menyeragamkan mazhab Islam di dunia"], ans: 2, exp: "Pan-Islamisme adalah seruan persatuan ukhuwah islamiyah global bagi seluruh negara Muslim untuk bersatu melawan keterbelakangan dan penjajahan kolonial." },
  { q: "39. Agama Islam menjadi agama dengan pertumbuhan tercepat di Eropa dan Amerika. Faktor sosiologis dan intelektual yang memengaruhinya adalah...", options: ["A. Ekspansi militer oleh negara Timur Tengah", "B. Pemaksaan keyakinan oleh kaum imigran", "C. Tingginya minat masyarakat Barat yang rasional mencari kebenaran, mempelajari Islam lewat kajian ilmiah, serta dakwah damai komunitas muslim", "D. Peran organisasi ekstrem", "E. Dukungan finansial dari pemerintah Amerika"], ans: 2, exp: "Ajaran Islam yang rasional/logis, kepastian tauhid, serta akhlak baik komunitas muslim menjadi magnet konversi intelektual terbesar bagi masyarakat Barat." },
  { q: "40. Konsep ajaran Islam sebagai <i>Rahmatan Lil Alamin</i> menuntut umatnya menjadi rahmat bagi seluruh alam. Kesimpulan peran ajaran ini dalam perdamaian dunia adalah...", options: ["A. Umat Islam diperintahkan mengedepankan toleransi, kasih sayang, menebar kedamaian, dan menjaga keharmonisan hidup dengan semua manusia", "B. Umat Islam harus memerangi semua penganut agama lain", "C. Hanya diwajibkan berbuat baik kepada sesama muslim saja", "D. Menutup diri dari pergaulan internasional", "E. Mencampuradukkan ajaran akidah dan ibadah semua agama"], ans: 0, exp: "Rahmatan Lil Alamin mengajarkan etika kemanusiaan universal: menjaga keadilan, perlindungan HAM, kelestarian alam, dan persaudaraan sesama manusia." }
];

const essayData: Essay[] = [
  { q: "41. Q.S. Ali Imran: 190-191 menjelaskan tentang tanda-tanda kebesaran Allah bagi <i>Ulul Albab</i> (orang berakal). Jelaskan kandungan utama ayat tersebut dan sebutkan minimal 2 ciri Ulul Albab!", exp: "<b>Pembahasan:</b><br/><b>Kandungan:</b> Ayat ini mengisyaratkan bahwa penciptaan alam semesta serta silih bergantinya malam dan siang merupakan bukti mutlak kekuasaan Allah yang hanya bisa dipahami oleh orang berakal (Ulul Albab).<br/><b>Ciri-ciri Ulul Albab:</b><br/>1. Senantiasa berdzikir/mengingat Allah dalam setiap keadaan (berdiri, duduk, berbaring).<br/>2. Selalu bertafakur memikirkan penciptaan alam semesta dan meyakini bahwa ciptaan Allah tidak ada yang sia-sia." },
  { q: "42. Analisislah bagaimana hubungan antara Qada, Qadar, Ikhtiar, dan Tawakal, lalu berikan contoh penerapannya ketika seorang siswa SMA menghadapi kegagalan ujian masuk Perguruan Tinggi!", exp: "<b>Pembahasan:</b><br/><b>Hubungan:</b> Qada adalah rencana Allah sejak azali, Qadar adalah realisasinya (takdir). Manusia diwajibkan ber-Ikhtiar (usaha sungguh-sungguh) karena tidak tahu apa takdirnya. Setelah ikhtiar, diwajibkan Tawakal (menyerahkan hasil akhir kepada Allah).<br/><b>Contoh Kasus:</b> Siswa sudah belajar keras dan berdoa (Ikhtiar). Saat dinyatakan gagal, ia bersikap Tawakal (tidak stres/putus asa), ikhlas menerima karena meyakini ini adalah skenario terbaik dari Allah (Qada & Qadar), lalu bangkit kembali untuk mencari universitas lain." },
  { q: "43. Kewajiban berbakti kepada orang tua (Birrul Walidain) tidak terputus meskipun mereka telah meninggal dunia. Sebutkan 3 cara berbakti kepada orang tua yang sudah wafat!", exp: "<b>Pembahasan:</b><br/>Sesuai sunnah Rasulullah SAW, cara berbakti pada orang tua yang telah wafat adalah:<br/>1. <b>Mendoakan mereka dan memohonkan ampunan</b> secara rutin (doa anak saleh).<br/>2. <b>Menunaikan wasiat dan melunasi utang-utangnya</b> yang belum terpenuhi semasa hidup.<br/>3. <b>Menyambung tali silaturahmi</b> dengan kerabat serta sahabat-sahabat dekat orang tua." },
  { q: "44. (Studi Kasus Faraidh): Pak Ahmad meninggal dunia meninggalkan harta bersih Rp 240.000.000. Ahli waris terdiri dari: <b>1 Istri, 1 Ibu, dan 1 Anak Laki-laki tunggal</b>. Hitunglah bagian nominal Rupiah masing-masing!", exp: "<b>Pembahasan (Perhitungan Faraidh):</b><br/>- <b>Bagian Istri (1/8)</b> karena mayit meninggalkan anak.<br/>  1/8 x Rp 240.000.000 = <b>Rp 30.000.000</b>.<br/>- <b>Bagian Ibu (1/6)</b> karena mayit meninggalkan anak.<br/>  1/6 x Rp 240.000.000 = <b>Rp 40.000.000</b>.<br/>- <b>Bagian Anak Laki-laki ('Ashabah)</b> mengambil sisa harta.<br/>  Sisa = Rp 240.000.000 - (Rp 30 Juta + Rp 40 Juta) = <b>Rp 170.000.000</b>." },
  { q: "45. Deskripsikan peran nyata organisasi Muhammadiyah dan Nahdlatul Ulama (NU) dalam bidang pendidikan dan perjuangan kemerdekaan fisik sebelum tahun 1945!", exp: "<b>Pembahasan:</b><br/>- <b>Bidang Pendidikan:</b> Muhammadiyah mempelopori madrasah modern (ilmu umum berbalut agama). Sementara NU memproteksi kemurnian akidah umat melalui sistem pendidikan pesantren di akar rumput perdesaan.<br/>- <b>Perjuangan Kemerdekaan:</b> Keduanya gigih mengobarkan semangat anti-penjajah. Tokoh NU (K.H. Hasyim Asy'ari) mengeluarkan Fatwa Resolusi Jihad di Surabaya. Tokoh Muhammadiyah (Panglima Sudirman) dan laskar Islam (Hizbullah/Sabilillah) terjun langsung di medan perang tempur melawan Sekutu dan Belanda." }
];

export default function SimulasiPAIPage() {
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
    <div className="bg-white rounded-3xl p-10 md:p-16 shadow-2xl text-center max-w-2xl w-full mx-auto animate-fade-in-up border-t-8 border-emerald-600">
      <div className="text-6xl mb-6 flex justify-center gap-4">
        <span>🕌</span><span>🕋</span><span>📖</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">Simulasi Ujian PAI & BP</h1>
      <p className="text-slate-600 mb-8 text-lg leading-relaxed">
        Perdalam pemahaman Fikih, Sejarah Kebudayaan Islam, Akhlak, serta Tafsir Al-Qur'an. Berisi 40 soal pilihan ganda dan 5 uraian analitis komprehensif.
      </p>
      <button 
        onClick={handleStart}
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-emerald-600/40 text-lg uppercase tracking-wide"
      >
        Mulai Evaluasi
      </button>
    </div>
  );

  const renderQuiz = () => {
    const currentQuestion = mcqData[currentIndex];
    const progressPercentage = ((currentIndex + 1) / mcqData.length) * 100;
    const hasAnswered = answers[currentIndex] !== null;
    const selectedOption = answers[currentIndex];

    return (
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-3xl w-full mx-auto animate-fade-in-up border-t-4 border-emerald-600">
        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-bold text-emerald-600 uppercase tracking-wider">
            Soal {currentIndex + 1} dari {mcqData.length}
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 mb-8 overflow-hidden shadow-inner">
          <div 
            className="bg-gradient-to-r from-emerald-600 to-teal-400 h-full rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* Question */}
        <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100 mb-8 shadow-sm">
          <h2 
            className="text-xl md:text-2xl font-medium text-slate-800 leading-relaxed font-serif"
            dangerouslySetInnerHTML={{ __html: currentQuestion.q }}
          />
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3 font-serif">
          {currentQuestion.options.map((opt, i) => {
            const isCorrect = i === currentQuestion.ans;
            const isSelected = i === selectedOption;
            
            let btnClass = "text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center ";
            
            if (!hasAnswered) {
              btnClass += "border-slate-200 bg-white hover:border-emerald-400 hover:bg-emerald-50 text-slate-700 cursor-pointer hover:translate-x-1 hover:shadow-sm";
            } else {
              btnClass += "cursor-default ";
              if (isCorrect) {
                btnClass += "border-teal-500 bg-teal-50 text-teal-800 shadow-sm";
              } else if (isSelected && !isCorrect) {
                btnClass += "border-rose-500 bg-rose-50 text-rose-800 shadow-sm";
              } else {
                btnClass += "border-slate-100 bg-slate-50 text-slate-400 opacity-60";
              }
            }

            return (
              <button 
                key={i} 
                onClick={() => handleAnswer(i)}
                disabled={hasAnswered}
                className={btnClass}
              >
                <div className={`w-8 h-8 rounded-full flex shrink-0 items-center justify-center mr-4 font-bold text-sm ${!hasAnswered ? 'bg-slate-100 text-slate-600' : isCorrect ? 'bg-teal-200 text-teal-800' : isSelected ? 'bg-rose-200 text-rose-800' : 'bg-slate-100 text-slate-400'}`}>
                  {String.fromCharCode(65 + i)}
                </div>
                <span className="text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: opt.substring(3) }} />
              </button>
            );
          })}
        </div>

        {/* Feedback Section */}
        {hasAnswered && (
          <div className={`mt-8 p-6 rounded-2xl animate-fade-in shadow-inner border-l-4 ${selectedOption === currentQuestion.ans ? 'bg-teal-50 border-teal-500' : 'bg-rose-50 border-rose-500'}`}>
            <h4 className={`font-bold text-lg mb-4 flex items-center gap-2 ${selectedOption === currentQuestion.ans ? 'text-teal-700' : 'text-rose-700'}`}>
              {selectedOption === currentQuestion.ans ? '✅ Masya Allah, Jawaban Benar!' : '❌ Jawaban Kurang Tepat'}
            </h4>
            <div className="text-slate-700 leading-loose text-md bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm font-serif">
              <span dangerouslySetInnerHTML={{ __html: currentQuestion.exp }} />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex justify-between font-sans">
          <button 
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-sm ${currentIndex === 0 ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-white border-2 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 transform hover:-translate-x-1'}`}
          >
            &larr; Sebelumnya
          </button>
          {hasAnswered ? (
            <button 
              onClick={handleNext}
              className={`font-bold py-3 px-8 rounded-xl transition-all duration-300 shadow-md transform hover:translate-x-1 ${currentIndex === mcqData.length - 1 ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/40' : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/40'}`}
            >
              {currentIndex === mcqData.length - 1 ? 'Selesai & Cek Nilai 🏁' : 'Selanjutnya &rarr;'}
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  };

  const renderEssays = () => (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-4xl w-full mx-auto animate-fade-in-up border-t-8 border-emerald-600">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-3 tracking-tight">Kajian Uraian (Esai)</h2>
        <p className="text-slate-500">Pahami konsep analisis tauhid, fikih, dan sejarah berikut dengan saksama.</p>
      </div>
      
      <div className="flex flex-col gap-8 font-serif">
        {essayData.map((item, index) => (
          <div key={index} className="bg-slate-50 border border-slate-200 p-6 md:p-8 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <h3 
              className="font-bold text-emerald-800 mb-4 text-xl border-b-2 border-emerald-100 pb-3"
              dangerouslySetInnerHTML={{ __html: item.q }}
            />
            <div 
              className="text-slate-700 leading-loose bg-white p-5 rounded-xl border border-slate-100 shadow-inner"
              dangerouslySetInnerHTML={{ __html: item.exp }} 
            />
          </div>
        ))}
      </div>

      <div className="mt-12 text-center font-sans">
        <button 
          onClick={handleStart}
          className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-xl hover:shadow-slate-800/50 hover:-translate-y-1 tracking-wide"
        >
          &#8634; Ulangi Evaluasi PAI
        </button>
      </div>
    </div>
  );

  const finalScore = Math.round((score / mcqData.length) * 100);

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 font-sans text-slate-900 flex flex-col items-center bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-100 via-slate-100 to-teal-50">
      
      {/* Main View Manager */}
      {view === 'landing' && renderLanding()}
      {view === 'quiz' && renderQuiz()}
      {view === 'essay' && renderEssays()}

      {/* Final Score Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex justify-center items-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-10 text-center max-w-md w-full shadow-2xl transform scale-100 transition-transform">
            <div className="text-5xl mb-4 text-emerald-500">🌟</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Alhamdulillah!</h2>
            <p className="text-slate-500 mb-8">Pemahaman spiritual dan akademismu mencapai:</p>
            
            <div className="relative w-44 h-44 mx-auto mb-8 flex justify-center items-center rounded-full shadow-inner border-8 border-slate-50" 
                 style={{ background: `conic-gradient(#059669 ${finalScore}%, #e2e8f0 0)` }}>
              <div className="absolute inset-3 bg-white rounded-full flex justify-center items-center shadow-lg">
                <span className="text-6xl font-black text-emerald-600 drop-shadow-sm">{finalScore}</span>
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-slate-700 mb-8 px-4 leading-relaxed">
              {finalScore >= 85 ? "Mumtaz! Penguasaan materi agama Islammu sangat sempurna. 🏆" : finalScore >= 70 ? "Cukup Baik! Muraja'ah (ulang) kembali bagian Fikih dan Sejarah. 📖" : "Tetap Semangat! Belajar adalah ibadah bernilai pahala. 💪"}
            </h3>
            
            <button 
              onClick={handleGoToEssays}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/40 hover:-translate-y-1 tracking-wide"
            >
              Lihat Kunci Jawaban Esai &rarr;
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