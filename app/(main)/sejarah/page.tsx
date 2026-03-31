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

// --- DATA SOAL SEJARAH ---
const mcqData: MCQ[] = [
  { q: "1. Sejarah adalah ilmu yang bertugas menyelidiki perubahan-perubahan, kejadian-kejadian dan peristiwa yang merupakan realitas dari masa lalu. Pernyataan tersebut merupakan pengertian sejarah menurut....", options: ["A. R. Moh. Ali", "B. Sartono Kartodirdjo", "C. Ibnu Khaldun", "D. J.V. Bryce", "E. Kuntowijoyo"], ans: 0, exp: "Pengertian tersebut merupakan rumusan baku dari sejarawan Indonesia, R. Moh. Ali, yang menekankan sejarah sebagai ilmu yang meneliti realitas perubahan di masa lalu." },
  { q: "2. Kata sejarah berasal dari bahasa Inggris 'History' yang berarti...", options: ["A. Pohon silsilah", "B. Masa lampau umat manusia", "C. Sesuatu yang telah terjadi", "D. Penyelidikan", "E. Cerita tokoh besar"], ans: 1, exp: "Dalam bahasa Inggris, history berarti masa lampau umat manusia. (Sedangkan syajarotun dari Arab berarti pohon, dan historia dari Yunani berarti penyelidikan)." },
  { q: "3. Ciri sejarah sebagai ilmu adalah...", options: ["A. Fiktif, empiris, memiliki metode", "B. Empiris, memiliki objek, memiliki teori, dan metode", "C. Unik, abadi, dan penting", "D. Subjektif, imajinatif, dan intuitif", "E. Mengandung nilai seni dan emosi"], ans: 1, exp: "Sebagai sebuah ilmu (sains), sejarah harus memenuhi syarat ilmiah: empiris (berdasarkan pengalaman/fakta), memiliki objek (aktivitas manusia), memiliki teori, dan memiliki metode keilmuan." },
  { q: "4. Mempelajari sejarah dalam kurun waktu tertentu, tetapi dengan ruang lingkup yang lebih luas disebut pendekatan..", options: ["A. Diakronik", "B. Sinkronik", "C. Kronologis", "D. Periodisasi", "E. Anakronik"], ans: 1, exp: "Pendekatan sinkronik meluas dalam ruang tetapi menyempit dalam waktu (menganalisis struktur/kondisi sosial, ekonomi, politik pada suatu masa tertentu secara mendalam)." },
  { q: "5. Cerita berupa narasi yang disusun dari memori, kesan, atau tafsiran manusia terhadap kejadian atau peristiwa yang terjadi pada waktu lampau disebut...", options: ["A. Sejarah sebagai Peristiwa", "B. Sejarah sebagai Ilmu", "C. Sejarah sebagai Seni", "D. Sejarah sebagai Kisah", "E. Mitos"], ans: 3, exp: "Sejarah sebagai kisah adalah rekonstruksi atau cerita masa lalu yang disusun kembali oleh manusia (sejarawan) berdasarkan ingatan atau tafsiran atas jejak-jejak masa lalu." },
  { q: "6. Ciri utama peristiwa sejarah adalah...", options: ["A. Subjektif, fiktif, dan logis", "B. Abadi, unik, dan penting", "C. Berulang-ulang, sementara, dan biasa", "D. Statis, tidak berubah, dan mutlak", "E. Empiris, teoritis, dan metodologis"], ans: 1, exp: "Tiga ciri utama peristiwa sejarah adalah: Abadi (dikenang sepanjang masa), Unik/Einmalig (hanya terjadi satu kali dan tak terulang sama persis), dan Penting (berdampak besar)." },
  { q: "7. Teori Arus Balik yang menyatakan bahwa Agama Hindu disebarkan oleh orang Indonesia yang pergi ke India untuk belajar lalu kembali menyebarkannya, dikemukakan oleh...", options: ["A. N.J. Krom", "B. J.C. Van Leur", "C. F.D.K. Bosch", "D. C.C. Berg", "E. Majumdar"], ans: 2, exp: "F.D.K. Bosch mengemukakan Teori Arus Balik, menyoroti peran aktif kaum intelektual Nusantara yang menimba ilmu ke India dan kembali menyebarkan agama di tanah air." },
  { q: "8. Akulturasi bidang seni rupa antara India dan Indonesia tampak pada relief Candi Borobudur. Pengaruh dari India tampak berupa...", options: ["A. Motif wayang kulit", "B. Relief cerita Karmawibhangga dan Jataka", "C. Kaligrafi Arab", "D. Patung hewan mitologi Tiongkok", "E. Ukiran motif daun flora Nusantara"], ans: 1, exp: "Candi Borobudur memuat relief ajaran Buddha (pengaruh India) seperti Jataka, Lalitavistara, dan Karmawibhangga yang dipadukan dengan teknik pahat dan latar alam Nusantara." },
  { q: "9. Pesatnya perkembangan kerajaan Sriwijaya sebagai Kerajaan Maritim di Asia Tenggara karena...", options: ["A. Memiliki militer darat yang terkuat", "B. Letaknya strategis di jalur perdagangan internasional (Selat Malaka)", "C. Menghasilkan rempah-rempah terbanyak", "D. Tidak adanya kerajaan pesaing", "E. Menguasai jalur sutra darat"], ans: 1, exp: "Sriwijaya memegang hegemoni maritim karena menguasai Selat Malaka dan Selat Sunda yang merupakan urat nadi pelayaran dunia antara India dan Tiongkok." },
  { q: "10. Kerajaan-kerajaan yang bercorak Buddha di Indonesia adalah...", options: ["A. Majapahit dan Singasari", "B. Demak dan Banten", "C. Sriwijaya dan Mataram Kuno (Wangsa Syailendra)", "D. Kutai dan Tarumanegara", "E. Kediri dan Pajajaran"], ans: 2, exp: "Sriwijaya adalah pusat agama Buddha di Asia Tenggara. Mataram Kuno pada masa Dinasti Syailendra juga bercorak Buddha (dibuktikan dengan Candi Borobudur)." },
  { q: "11. Raja Kutai yang pernah mengadakan upacara pengorbanan dan memberikan hadiah 20.000 ekor sapi kepada para Brahmana adalah...", options: ["A. Kudungga", "B. Aswawarman", "C. Mulawarman", "D. Purnawarman", "E. Airlangga"], ans: 2, exp: "Fakta ini tercatat jelas pada Prasasti Yupa. Kedermawanan ini dilakukan oleh Raja Mulawarman di tanah suci Waprakeswara." },
  { q: "12. Agama Hindu masuk ke Indonesia dibawa oleh para pedagang India. Pernyataan tersebut sesuai dengan teori...", options: ["A. Teori Brahmana", "B. Teori Ksatria", "C. Teori Waisya", "D. Teori Sudra", "E. Teori Arus Balik"], ans: 2, exp: "Teori Waisya yang dikemukakan oleh N.J. Krom menyatakan bahwa kasta pedagang (Waisya) dari India adalah penyebar utama agama dan budaya Hindu di Nusantara." },
  { q: "13. Yupa merupakan tugu batu bertulis peninggalan dari kerajaan...", options: ["A. Sriwijaya", "B. Majapahit", "C. Tarumanegara", "D. Kutai", "E. Kediri"], ans: 3, exp: "Yupa (tiang batu pengikat hewan kurban) yang bertuliskan huruf Pallawa dan bahasa Sanskerta adalah bukti sejarah tertua kerajaan Kutai di Kalimantan Timur." },
  { q: "14. Kerajaan Tarumanegara memiliki banyak prasasti sebagai peninggalan sejarahnya. Berikut ini yang BUKAN merupakan prasasti Tarumanegara adalah...", options: ["A. Prasasti Ciaruteun", "B. Prasasti Kebon Kopi", "C. Prasasti Tugu", "D. Prasasti Kedukan Bukit", "E. Prasasti Lebak"], ans: 3, exp: "Prasasti Kedukan Bukit adalah peninggalan Kerajaan Sriwijaya. (Prasasti Tarumanegara: Ciaruteun, Kebon Kopi, Tugu, Jambu, Cidanghiang, Muara Cianten, Pasir Awi)." },
  { q: "15. Sumpah palapa yang diucapkan oleh seorang patih kerajaan Majapahit yang bertekad menyatukan seluruh nusantara, bernama...", options: ["A. Hayam Wuruk", "B. Raden Wijaya", "C. Gajah Mada", "D. Ken Arok", "E. Nambi"], ans: 2, exp: "Mahapatih Gajah Mada mengucapkan Sumpah Palapa pada saat diangkat menjadi Amangkubhumi Majapahit (1336 M), berjanji tidak akan menikmati palapa sebelum menyatukan Nusantara." },
  { q: "16. Salah satu tujuan bangsa Eropa ke Nusantara adalah memburu kekayaan, kebanggaan/superioritas, dan penyebaran agama yang dikenal dengan istilah...", options: ["A. Vini, Vidi, Vici", "B. Devide et Impera", "C. Gold, Glory, Gospel (3G)", "D. Reconquista", "E. Merkantilisme"], ans: 2, exp: "Motivasi imperialisme Barat dirangkum dalam 3G: Gold (mencari kekayaan rempah), Glory (kejayaan nasional), dan Gospel (menyebarkan agama Nasrani)." },
  { q: "17. Hubungan India dengan Indonesia pada awalnya merupakan hubungan dalam bidang...", options: ["A. Politik", "B. Perdagangan", "C. Militer", "D. Pendidikan", "E. Agama"], ans: 1, exp: "Sebelum masuknya pengaruh budaya dan agama Hindu-Buddha, interaksi awal Nusantara dengan India murni didorong oleh kepentingan jalur perdagangan rempah-rempah maritim." },
  { q: "18. Perlawanan Kesultanan Demak dalam menghadapi Portugis di Malaka (1513) dan di Sunda Kelapa (1527) dipimpin oleh...", options: ["A. Sultan Trenggono dan Sultan Agung", "B. Pati Unus (Pangeran Sabrang Lor) dan Fatahillah", "C. Raden Patah dan Sunan Kalijaga", "D. Sultan Hasanuddin dan Pangeran Diponegoro", "E. Tuanku Imam Bonjol dan Pattimura"], ans: 1, exp: "Ekspedisi Demak ke Malaka dipimpin oleh Pati Unus (1513), sedangkan pengusiran Portugis dari Sunda Kelapa (1527) dipimpin oleh Fatahillah." },
  { q: "19. Bangsa Barat yang pertama kali berhasil mencapai wilayah rempah-rempah Maluku adalah...", options: ["A. Spanyol", "B. Belanda", "C. Inggris", "D. Portugis", "E. Prancis"], ans: 3, exp: "Portugis di bawah pimpinan Antonio de Abreu tiba di Maluku (Ternate) pada tahun 1512, menjadikannya bangsa Eropa pertama yang mencapai kepulauan rempah-rempah." },
  { q: "20. Strategi Belanda yang paling berhasil dalam menghadapi perlawanan dari penguasa lokal bangsa Indonesia, yaitu dengan melakukan politik...", options: ["A. Etis", "B. Tanam Paksa", "C. Devide et Impera (Adu domba)", "D. Pintu Terbuka", "E. Asimilasi"], ans: 2, exp: "Belanda menggunakan Devide et Impera (politik pecah belah) untuk mencampuri konflik internal kerajaan lokal, seperti dalam Perang Makassar dan Perang Banten." },
  { q: "21. Dampak pendudukan Jepang terhadap perekonomian di Indonesia adalah...", options: ["A. Peningkatan kesejahteraan petani", "B. Terjadinya eksploitasi besar-besaran dan sistem ekonomi autarki yang menyengsarakan", "C. Industrialisasi modern di seluruh Jawa", "D. Berkembangnya sistem perbankan syariah", "E. Bebasnya perdagangan ekspor-impor"], ans: 1, exp: "Jepang menerapkan sistem Autarki (setiap daerah memenuhi kebutuhan perangnya sendiri). Seluruh hasil pertanian disita untuk militer Jepang, menyebabkan kelaparan massal." },
  { q: "22. Gerakan yang didirikan untuk mengerahkan segala potensi masyarakat Indonesia guna membantu Jepang dalam Perang Asia Timur Raya disebut...", options: ["A. MIAI", "B. Cuo Sangi In", "C. Putera (Pusat Tenaga Rakyat) dan Jawa Hokokai", "D. PETA", "E. Seinendan"], ans: 2, exp: "Putera (dipimpin Empat Serangkai) dibentuk untuk memobilisasi rakyat, yang kemudian diganti menjadi Jawa Hokokai untuk mengerahkan tenaga rakyat secara langsung." },
  { q: "23. Sistem kerja paksa tanpa upah pada masa pemerintahan Jepang dikenal dengan sebutan...", options: ["A. Kerja Rodi", "B. Romusha", "C. Pelayaran Hongi", "D. Cultuurstelsel", "E. Jugun Ianfu"], ans: 1, exp: "Romusha adalah panggilan bagi para pekerja paksa Indonesia zaman Jepang yang dikerahkan membangun infrastruktur militer dalam kondisi sangat tidak manusiawi." },
  { q: "24. Tujuan utama dibentuknya organisasi Fujinkai oleh Jepang pada tahun 1943 adalah...", options: ["A. Mendidik wanita menjadi tenaga militer tempur di garis depan", "B. Memobilisasi wanita untuk mendukung perang (dapur umum, palang merah)", "C. Memperjuangkan emansipasi wanita di ranah politik", "D. Menyekolahkan wanita ke Tokyo", "E. Mengumpulkan perhiasan dari kaum wanita"], ans: 1, exp: "Fujinkai adalah himpunan wanita yang dibentuk Jepang agar para wanita dapat digerakkan membantu barisan belakang peperangan (medis, pertanian, menjahit seragam)." },
  { q: "25. Salah satu dampak tidak langsung dari organisasi Putera (Pusat Tenaga Rakyat) bagi perjuangan Bangsa Indonesia adalah...", options: ["A. Terkumpulnya logistik melimpah untuk Jepang", "B. Melemahnya semangat juang rakyat", "C. Dimanfaatkan oleh para tokoh nasionalis untuk membangkitkan semangat kebangsaan", "D. Tumbuhnya paham fasisme di kalangan rakyat", "E. Dibubarkannya PPKI"], ans: 2, exp: "Bukannya murni melayani Jepang, tokoh seperti Soekarno menggunakan fasilitas radio Putera untuk membangkitkan nasionalisme rakyat Indonesia secara terselubung." },
  { q: "26. Tokoh Supriyadi melakukan pemberontakan bersenjata terhadap kekejaman militer Jepang di daerah...", options: ["A. Tasikmalaya", "B. Singaparna", "C. Blitar", "D. Indramayu", "E. Pontianak"], ans: 2, exp: "Supriyadi adalah komandan (Shodancho) PETA yang memimpin pemberontakan PETA di Blitar pada tanggal 14 Februari 1945 karena tak tahan melihat penderitaan Romusha." },
  { q: "27. Pada tahun 1602 Belanda mendirikan VOC yang bertujuan melakukan monopoli terhadap...", options: ["A. Perdagangan tekstil", "B. Perdagangan budak", "C. Perdagangan rempah-rempah di Nusantara", "D. Pertambangan emas", "E. Perdagangan senjata"], ans: 2, exp: "VOC dibentuk murni untuk mengamankan dan memonopoli perdagangan rempah-rempah yang bernilai sangat tinggi di pasar Eropa." },
  { q: "28. Kongsi dagang VOC dibentuk oleh Pemerintah Belanda dengan tujuan utama...", options: ["A. Menyebarkan agama Protestan", "B. Menghindari persaingan antar pedagang Belanda dan menghadapi kongsi asing (EIC)", "C. Membantu kerajaan Mataram", "D. Membayar hutang luar negeri", "E. Mencari jalur pelayaran baru"], ans: 1, exp: "Penyatuan kongsi-kongsi dagang ke dalam VOC ditujukan agar pedagang Belanda tidak saling mematikan dan menjadi kuat melawan saingan dari Inggris, Spanyol, dan Portugis." },
  { q: "29. Pembuatan Jalan Raya Pos dari Anyer sampai dengan Panarukan oleh Daendels utamanya bertujuan untuk...", options: ["A. Memperlancar transportasi warga pribumi", "B. Kepentingan pertahanan militer untuk menahan serangan Inggris di Jawa", "C. Jalur pariwisata gubernur", "D. Jalur perdagangan budak antar kota", "E. Memperindah tata kota"], ans: 1, exp: "Daendels diutus oleh Prancis ke Jawa dengan tugas mempertahankan Jawa dari Inggris. Jalan Grote Postweg dibangun agar mobilitas tentara bisa dilakukan cepat." },
  { q: "30. Golongan di Negara Belanda yang menuntut agar sistem Tanam Paksa (Cultuurstelsel) dihapuskan karena menindas rakyat Hindia Belanda adalah golongan...", options: ["A. Konservatif", "B. Militer", "C. Liberal dan Humanis", "D. Kaum Bangsawan", "E. Raja dan Ratu"], ans: 2, exp: "Tokoh seperti Eduard Douwes Dekker (Multatuli) dan Baron van Hoevell dari golongan Liberal menentang tanam paksa atas dasar kemanusiaan dan ekonomi pasar bebas." },
  { q: "31. Pada tanggal 31 Desember 1799 VOC resmi dibubarkan. Faktor penyebab utamanya adalah...", options: ["A. Dikuasai oleh EIC (Inggris)", "B. Perlawanan Pangeran Diponegoro", "C. Pegawainya banyak korupsi, hutang menumpuk, dan besarnya biaya perang", "D. Berhentinya produksi rempah di Maluku", "E. Pemberontakan Trunojoyo"], ans: 2, exp: "Kebangkrutan VOC disebabkan oleh penyakit korupsi pegawai yang kronis, pembagian dividen yang tidak rasional, serta biaya perang menghadapi raja-raja lokal yang mahal." },
  { q: "32. Kabinet Parlementer pertama yang dibentuk pada masa awal kemerdekaan (November 1945) dipimpin oleh Perdana Menteri...", options: ["A. Ir. Soekarno", "B. Drs. Moh. Hatta", "C. Sutan Syahrir", "D. Amir Sjarifuddin", "E. Moh. Natsir"], ans: 2, exp: "Maklumat 14 November 1945 mengubah sistem pemerintahan menjadi parlementer. Sutan Syahrir diangkat sebagai Perdana Menteri pertama Indonesia." },
  { q: "33. Bung Tomo memiliki peranan besar dalam peristiwa 10 November 1945. Peranannya adalah...", options: ["A. Bernegosiasi dengan Jenderal Mallaby", "B. Menembak jatuh pesawat Inggris", "C. Menggalang dana logistik luar negeri", "D. Membakar semangat juang rakyat Surabaya melalui pidato di Radio Pemberontakan", "E. Menandatangani gencatan senjata"], ans: 3, exp: "Sutomo (Bung Tomo) menggunakan siaran radio untuk memompa keberanian dan heroisme arek-arek Suroboyo agar tidak menyerah terhadap ultimatum Sekutu." },
  { q: "34. Maklumat pemerintah yang berisi tentang anjuran pembentukan partai politik dikeluarkan pada tanggal...", options: ["A. 18 Agustus 1945", "B. 3 November 1945", "C. 14 November 1945", "D. 5 Oktober 1945", "E. 10 November 1945"], ans: 1, exp: "Maklumat Pemerintah 3 November 1945 (ditandatangani Wapres Moh. Hatta) menghapus sistem partai tunggal dan membuka keran multipartai dalam perpolitikan." },
  { q: "35. Naskah teks Proklamasi ditandatangani oleh Soekarno dan Moh. Hatta atas usulan dari...", options: ["A. Sayuti Melik", "B. Sukarni", "C. Ahmad Subardjo", "D. B.M. Diah", "E. Chaerul Saleh"], ans: 1, exp: "Sukarni (tokoh golongan muda) yang mengusulkan agar naskah proklamasi tidak perlu ditandatangani semua yang hadir, cukup Soekarno-Hatta 'Atas nama bangsa Indonesia'." },
  { q: "36. Bendera Merah Putih yang pertama kali berkibar saat Proklamasi Kemerdekaan yaitu bendera...", options: ["A. Bendera Pusaka hasil jahitan tangan Ibu Fatmawati", "B. Bendera yang dibawa dari Jepang", "C. Bendera robekan dari Hotel Yamato", "D. Bendera peninggalan Kerajaan Majapahit", "E. Bendera milik Laksamana Maeda"], ans: 0, exp: "Bendera historis ini dijahit sendiri oleh istri Presiden Soekarno, Ibu Fatmawati, dan dikenal sebagai Bendera Pusaka Sang Saka Merah Putih." },
  { q: "37. Tokoh pahlawan nasional yang nama aslinya adalah R.M. Suwardi Suryaningrat dan sangat berjasa dalam bidang pendidikan adalah...", options: ["A. Douwes Dekker", "B. Tjipto Mangoenkoesoemo", "C. Ki Hajar Dewantara", "D. Dr. Soetomo", "E. Wahid Hasyim"], ans: 2, exp: "R.M. Suwardi Suryaningrat membuang gelar kebangsawanannya menjadi Ki Hajar Dewantara agar dapat merakyat, dan ia diangkat sebagai Bapak Pendidikan Nasional." },
  { q: "38. Pada tanggal 21 Mei 1998 Presiden Soeharto mengundurkan diri dan menyerahkan kekuasaan kepada Wakil Presiden, yaitu...", options: ["A. Megawati Soekarnoputri", "B. Try Sutrisno", "C. B.J. Habibie", "D. Abdurrahman Wahid", "E. Harmoko"], ans: 2, exp: "Pengunduran diri Soeharto menandai berakhirnya Orde Baru. Secara konstitusional, mandat kepresidenan beralih ke tangan Wapres B.J. Habibie." },
  { q: "39. Pada tanggal 20 Mei 1998 Presiden Soeharto mengundang para tokoh nasional/agama untuk meminta pertimbangan dalam membentuk...", options: ["A. Komite Reformasi dan Kabinet Reformasi", "B. Dewan Keamanan Nasional", "C. Partai Golongan Karya Raya", "D. Mahkamah Konstitusi", "E. Satuan Tugas Anti Korupsi"], ans: 0, exp: "Usaha terakhir Soeharto meredam krisis adalah menawarkan pembentukan Komite Reformasi untuk reshuffle kabinet, namun para tokoh yang diundang menolak bergabung." },
  { q: "40. Maksud dan tujuan utama diadakannya gerakan Reformasi 1998 oleh masyarakat adalah...", options: ["A. Mengganti ideologi Pancasila", "B. Mendirikan negara agama", "C. Memperbaiki tatanan kehidupan berbangsa yang demokratis serta terbebas dari KKN", "D. Mengembalikan sistem penjajahan", "E. Melindungi kekayaan pejabat Orde Baru"], ans: 2, exp: "Gerakan reformasi menuntut agenda utama: penghapusan Dwifungsi ABRI, pemberantasan Korupsi Kolusi Nepotisme (KKN), dan penegakan supremasi hukum." }
];

const essayData: Essay[] = [
  { q: "41. Mengapa sejarah dapat juga dikatakan sebagai seni?", exp: "<b>Pembahasan:</b> Sejarah dapat dikatakan sebagai seni karena dalam historiografi (penulisan sejarah), seorang sejarawan tidak sekadar merekam fakta kaku, melainkan memerlukan: <b>Intuisi</b> untuk memahami insting peristiwa, <b>Imajinasi</b> untuk membayangkan latar ruang waktu secara logis, <b>Emosi</b> agar pembaca merasakan suasana lampau, serta <b>Gaya Bahasa</b> yang lugas dan naratif agar sejarah tidak membosankan untuk dibaca." },
  { q: "42. Sebutkan faktor pendorong Agama Islam berkembang (diterima) dengan cepat di Nusantara!", exp: "<b>Pembahasan:</b> 1) Syarat masuk Islam sangat mudah (hanya membaca Syahadat). 2) Tidak ada sistem kasta (mengedepankan kesetaraan). 3) Penyebaran dilakukan dengan cara damai via perdagangan, perkawinan, dan akulturasi budaya (wayang). 4) Ritual keagamaan yang sederhana dan tidak memberatkan secara finansial. 5) Runtuhnya kerajaan Hindu-Buddha yang membuat raja-raja lokal memeluk Islam." },
  { q: "43. Sebutkan isi pokok ikrar Sumpah Pemuda 1928!", exp: "<b>Pembahasan:</b> Isi Sumpah Pemuda: <br/>1. Kami putra dan putri Indonesia, mengaku bertumpah darah yang satu, tanah air Indonesia.<br/>2. Kami putra dan putri Indonesia, mengaku berbangsa yang satu, bangsa Indonesia.<br/>3. Kami putra dan putri Indonesia, menjunjung bahasa persatuan, bahasa Indonesia." },
  { q: "44. Analisislah penyebab utama runtuhnya kongsi dagang VOC!", exp: "<b>Pembahasan:</b> VOC resmi dibubarkan pada 31 Desember 1799 karena kebangkrutan yang disebabkan oleh: 1) Korupsi yang merajalela di kalangan pegawainya. 2) Besarnya utang akibat biaya perang yang mahal melawan kerajaan lokal (Mataram, Banten, Makassar). 3) Pembagian dividen berlebihan walau kas defisit. 4) Sistem pembukuan yang buruk. 5) Persaingan ketat dengan kongsi dagang Eropa lain." },
  { q: "45. Jelaskan tujuan utama bergulirnya era Reformasi di Negara Indonesia!", exp: "<b>Pembahasan:</b> Tujuan fundamental Reformasi 1998 adalah untuk menata ulang (mereformasi) tatanan kehidupan berbangsa yang melenceng pada masa Orde Baru. Agenda utamanya meliputi: mewujudkan pemerintahan demokratis, memberantas praktik Korupsi, Kolusi, dan Nepotisme (KKN), mencabut Dwifungsi ABRI agar militer kembali ke barak, mengamandemen UUD 1945, dan menjamin kebebasan pers serta kebebasan berpendapat." }
];

export default function SimulasiSejarahPage() {
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
    <div className="bg-[#fdfbf7] rounded-3xl p-10 md:p-16 shadow-xl text-center max-w-2xl w-full mx-auto animate-fade-in-up border-t-8 border-amber-700">
      <div className="text-6xl mb-6 flex justify-center gap-4">
        <span>📜</span><span>🏛️</span><span>⏳</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-amber-900 mb-4 tracking-tight font-serif">Simulasi Ujian Sejarah</h1>
      <p className="text-amber-800/80 mb-8 text-lg leading-relaxed">
        Buka kembali lembaran masa lalu Nusantara. Terdapat 40 soal pilihan ganda komprehensif dan 5 ulasan esai histografi untuk mempersiapkan ujianmu.
      </p>
      <button 
        onClick={handleStart}
        className="bg-amber-700 hover:bg-amber-800 text-amber-50 font-semibold py-4 px-10 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-amber-700/40 text-lg"
      >
        Mulai Ekspedisi Waktu 🧭
      </button>
    </div>
  );

  const renderQuiz = () => {
    const currentQuestion = mcqData[currentIndex];
    const progressPercentage = ((currentIndex + 1) / mcqData.length) * 100;
    const hasAnswered = answers[currentIndex] !== null;
    const selectedOption = answers[currentIndex];

    return (
      <div className="bg-[#fdfbf7] rounded-3xl p-8 md:p-12 shadow-xl max-w-3xl w-full mx-auto animate-fade-in-up border-t-4 border-amber-700">
        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-bold text-amber-700 uppercase tracking-wider">
            Arsip {currentIndex + 1} / {mcqData.length}
          </span>
        </div>
        <div className="w-full bg-amber-100 rounded-full h-3 mb-8 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-amber-600 to-orange-400 h-full rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* Question */}
        <h2 className="text-xl md:text-2xl font-medium text-amber-950 mb-8 leading-relaxed whitespace-pre-wrap font-serif">
          {currentQuestion.q}
        </h2>

        {/* Options */}
        <div className="flex flex-col gap-3 font-serif">
          {currentQuestion.options.map((opt, i) => {
            const isCorrect = i === currentQuestion.ans;
            const isSelected = i === selectedOption;
            
            let btnClass = "text-left p-4 rounded-xl border-2 transition-all duration-200 ";
            
            if (!hasAnswered) {
              btnClass += "border-amber-200 bg-white hover:border-amber-500 hover:bg-amber-50 text-amber-900 cursor-pointer hover:translate-x-1";
            } else {
              btnClass += "cursor-default ";
              if (isCorrect) {
                btnClass += "border-emerald-600 bg-emerald-50 text-emerald-900";
              } else if (isSelected && !isCorrect) {
                btnClass += "border-rose-600 bg-rose-50 text-rose-900";
              } else {
                btnClass += "border-amber-100 bg-amber-50/50 text-amber-900/40 opacity-60";
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
          <div className={`mt-8 p-6 rounded-2xl animate-fade-in shadow-sm ${selectedOption === currentQuestion.ans ? 'bg-emerald-50/80 border border-emerald-200' : 'bg-rose-50/80 border border-rose-200'}`}>
            <h4 className={`font-bold text-lg mb-3 flex items-center gap-2 ${selectedOption === currentQuestion.ans ? 'text-emerald-800' : 'text-rose-800'}`}>
              {selectedOption === currentQuestion.ans ? '✅ Fakta Sejarah Tepat!' : '❌ Terjadi Distorsi Fakta'}
            </h4>
            <p className="text-amber-950/80 leading-relaxed font-serif">
              <strong className="text-amber-900">Catatan Sejarawan:</strong> {currentQuestion.exp}
            </p>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-8 flex justify-between">
          <button 
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-md ${currentIndex === 0 ? 'bg-amber-100 text-amber-400 cursor-not-allowed' : 'bg-amber-800/60 hover:bg-amber-800 text-white transform hover:-translate-y-1'}`}
          >
            ⏮️ Sebelumnya
          </button>
          {hasAnswered ? (
            <button 
              onClick={handleNext}
              className={`font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-md transform hover:-translate-y-1 ${currentIndex === mcqData.length - 1 ? 'bg-orange-600 hover:bg-orange-700 text-white hover:shadow-orange-600/40' : 'bg-amber-700 hover:bg-amber-800 text-white hover:shadow-amber-700/40'}`}
            >
              {currentIndex === mcqData.length - 1 ? 'Selesaikan Ekspedisi 🏆' : 'Lanjut ke Arsip Berikutnya ⏭️'}
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  };

  const renderEssays = () => (
    <div className="bg-[#fdfbf7] rounded-3xl p-8 md:p-12 shadow-xl max-w-4xl w-full mx-auto animate-fade-in-up border-t-8 border-amber-700">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-amber-900 mb-3 font-serif">Kajian Historiografi (Uraian)</h2>
        <p className="text-amber-700/80">Kuasai narasi masa lampau ini untuk menaklukkan soal esai analisis.</p>
      </div>
      
      <div className="flex flex-col gap-6">
        {essayData.map((item, index) => (
          <div key={index} className="bg-amber-50/40 border border-amber-200/60 p-6 md:p-8 rounded-2xl hover:shadow-md transition-shadow">
            <h3 className="font-bold text-amber-900 mb-4 text-lg border-b border-amber-200 pb-2 font-serif">{item.q}</h3>
            <p className="text-amber-950/80 leading-relaxed font-serif" dangerouslySetInnerHTML={{ __html: item.exp }}></p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button 
          onClick={handleStart}
          className="bg-amber-900 hover:bg-amber-950 text-amber-50 font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:-translate-y-1"
        >
          🔄 Baca Ulang Arsip Sejarah
        </button>
      </div>
    </div>
  );

  const finalScore = Math.round((score / mcqData.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-[#fdfbf7] to-orange-50 py-12 px-4 font-sans flex flex-col items-center">
      
      {/* Main View Manager */}
      {view === 'landing' && renderLanding()}
      {view === 'quiz' && renderQuiz()}
      {view === 'essay' && renderEssays()}

      {/* Final Score Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-amber-950/70 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in">
          <div className="bg-[#fdfbf7] rounded-3xl p-10 text-center max-w-md w-full shadow-2xl transform scale-100 transition-transform">
            <div className="text-5xl mb-4">🕰️</div>
            <h2 className="text-2xl font-bold text-amber-900 mb-2 font-serif">Perjalanan Selesai!</h2>
            <p className="text-amber-700/80 mb-8">Kecakapan literasi sejarahmu mencapai angka:</p>
            
            <div className="relative w-44 h-44 mx-auto mb-8 flex justify-center items-center rounded-full shadow-inner border-4 border-amber-100" 
                 style={{ background: `conic-gradient(#b45309 ${finalScore}%, #fef3c7 0)` }}>
              <div className="absolute inset-3 bg-[#fdfbf7] rounded-full flex justify-center items-center shadow-sm">
                <span className="text-6xl font-black text-amber-700">{finalScore}</span>
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-amber-900 mb-8 px-4 font-serif leading-relaxed">
              {finalScore >= 85 ? "Luar Biasa! Engkau adalah pewaris ingatan bangsa yang sejati. 🌟" : finalScore >= 70 ? "Cukup Baik! Mari lebih teliti merangkai kepingan masa lalu. 👍" : "Jangan Menyerah! Jas Merah: Jangan Sekali-kali Meninggalkan Sejarah. 💪"}
            </h3>
            
            <button 
              onClick={handleGoToEssays}
              className="w-full bg-amber-700 hover:bg-amber-800 text-amber-50 font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:-translate-y-1"
            >
              Lanjutkan ke Ulasan Uraian 📖
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