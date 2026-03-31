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

// --- DATA SOAL PENDIDIKAN PANCASILA ---
const mcqData: MCQ[] = [
  { q: "1. Dalam sidang BPUPK, terdapat perbedaan pandangan dari para tokoh perumus negara mengenai dasar negara. Soekarno menekankan pada filosofi Philosofische Grondslag, sedangkan Soepomo menekankan teori negara integralistik. Perbedaan pandangan ini pada akhirnya disatukan oleh semangat...", options: ["A. Mengutamakan kepentingan golongan mayoritas", "B. Mementingkan ideologi negara barat modern", "C. Musyawarah mufakat demi persatuan bangsa", "D. Mempertahankan hukum kolonial Belanda", "E. Pembentukan negara serikat"], ans: 2, exp: "Meskipun memiliki latar belakang dan pandangan yang berbeda, para tokoh bangsa menyatukan gagasan dasar negara melalui musyawarah mufakat dengan semangat kebersamaan dan persatuan bangsa." },
  { q: "2. Perkembangan teknologi informasi dan kecerdasan buatan (AI) membawa budaya baru dari luar secara masif. Sebagai ideologi terbuka, dimensi fleksibilitas Pancasila ditunjukkan dengan cara...", options: ["A. Menolak seluruh kemajuan teknologi karena dianggap mengancam moral", "B. Menerima segala bentuk teknologi tanpa filter", "C. Menyesuaikan nilai dasar Pancasila agar sama dengan ideologi liberal", "D. Menyaring kemajuan teknologi dan budaya luar dengan nilai-nilai luhur Pancasila", "E. Menutup akses internet secara nasional"], ans: 3, exp: "Dimensi fleksibilitas berarti Pancasila mampu berinteraksi dengan perkembangan zaman dan teknologi secara dinamis, yakni dengan menjadikan nilai dasarnya sebagai penyaring/filter budaya asing." },
  { q: "3. Kedudukan Pancasila adalah sebagai sumber dari segala sumber hukum negara. Konsekuensi yuridis dari kedudukan tersebut terhadap peraturan perundang-undangan di bawahnya adalah...", options: ["A. Peraturan di bawahnya boleh berbeda jika disetujui DPR", "B. Seluruh peraturan perundang-undangan harus bersumber dan tidak boleh bertentangan dengan Pancasila", "C. Pancasila hanya berlaku untuk undang-undang dasar saja", "D. Pemerintah dapat mengesampingkan Pancasila dalam keadaan darurat", "E. Peraturan daerah bebas membuat asas sendiri"], ans: 1, exp: "Konsekuensi yuridis mutlak dari Pancasila sebagai sumber segala sumber hukum adalah bahwa seluruh aturan di bawahnya wajib selaras dan tidak boleh bertentangan dengan nilai Pancasila." },
  { q: "4. Fenomena flexing (pamer kekayaan) yang sering dilakukan oknum pejabat di media sosial memicu kemarahan publik karena dilakukan di tengah masyarakat yang masih banyak mengalami kesulitan ekonomi. Perilaku tersebut merupakan bentuk penyimpangan terhadap Pancasila, khususnya...", options: ["A. Sila pertama", "B. Sila kedua", "C. Sila ketiga", "D. Sila keempat", "E. Sila kelima"], ans: 4, exp: "Perilaku pamer kekayaan dan gaya hidup hedonis sangat bertentangan dengan nilai keadilan sosial bagi seluruh rakyat Indonesia (Sila kelima), yang menekankan pada pola hidup sederhana dan empati sosial." },
  { q: "5. Kebijakan pemerintah dalam membangun infrastruktur seperti jalan tol dan bendungan di wilayah Indonesia Timur merupakan wujud implementasi nilai praksis Pancasila. Tujuan kebijakan ini berdasarkan sila kelima adalah...", options: ["A. Menggalang dana kampanye", "B. Memusatkan pembangunan di ibu kota", "C. Mewujudkan pemerataan pembangunan dan keadilan sosial ekonomi", "D. Mencari pengakuan dari dunia internasional", "E. Melaksanakan sistem sentralisasi penuh"], ans: 2, exp: "Pembangunan infrastruktur di daerah tertinggal atau perbatasan merupakan upaya negara untuk mewujudkan pemerataan dan keadilan sosial ekonomi bagi seluruh rakyat tanpa diskriminasi wilayah." },
  { q: "6. Gerakan ekstremisme dan radikalisme merupakan contoh tantangan ideologi transnasional. Strategi paling tepat bagi pemuda untuk menghadapi tantangan tersebut adalah...", options: ["A. Menghindari segala bentuk interaksi dengan orang luar negeri", "B. Mengamalkan nilai toleransi, persatuan, dan nalar kritis berbasis Pancasila", "C. Membentuk pasukan bersenjata di lingkungan sekolah", "D. Mendukung ideologi baru yang dianggap lebih modern", "E. Bersikap apatis terhadap masalah politik"], ans: 1, exp: "Strategi terbaik menghadapi ideologi transnasional radikal adalah dengan membentengi diri melalui pemahaman nalar kritis dan pengamalan nilai-nilai toleransi Pancasila." },
  { q: "7. Bung Karno sering menyebut Pancasila sebagai Leitstar yang bersifat dinamis. Makna dari istilah Leitstar tersebut adalah...", options: ["A. Peraturan yang sangat kaku dan mutlak", "B. Simbol kebanggaan tanpa fungsi nyata", "C. Bintang penunjuk arah atau pedoman yang mengarahkan perjalanan bangsa", "D. Sistem ekonomi pasar bebas", "E. Cita-cita masa lalu yang sudah tidak relevan"], ans: 2, exp: "Leitstar (dari bahasa Jerman) berarti 'bintang penunjuk jalan'. Sebagai Leitstar Dinamis, Pancasila berfungsi memandu dan mengarahkan bangsa Indonesia menuju cita-citanya menyesuaikan zaman." },
  { q: "8. Pemikiran Prof. Dr. Soepomo dalam merumuskan dasar negara sangat menekankan pada konsep negara integralistik. Konsep ini memandang bahwa negara adalah...", options: ["A. Alat untuk melindungi kepentingan kaum elit", "B. Entitas yang memisahkan urusan agama dan negara sepenuhnya", "C. Suatu susunan masyarakat yang utuh, bersatu antara pemimpin dan rakyat", "D. Bentuk federasi dari negara-negara bagian yang independen", "E. Negara yang dikendalikan oleh kekuatan militer absolut"], ans: 2, exp: "Teori negara integralistik Soepomo menyatakan bahwa negara merupakan kesatuan organik yang utuh antara pemerintah dan seluruh rakyatnya, saling melindungi dan bersatu padu." },
  { q: "9. Contoh penerapan nilai-nilai kerakyatan (Sila ke-4 Pancasila) di lingkungan sekolah yang tepat adalah...", options: ["A. Mengutamakan pendapat siswa senior", "B. Pemilihan ketua OSIS yang dilakukan secara musyawarah dan demokratis", "C. Memaksa teman untuk memeluk agama tertentu", "D. Guru memberikan nilai secara diskriminatif", "E. Mengumpulkan dana sosial untuk korban bencana alam"], ans: 1, exp: "Sila ke-4 berkaitan dengan prinsip demokrasi, permusyawaratan, dan kebebasan berpendapat. Pemilihan OSIS secara demokratis adalah contoh paling relevan di sekolah." },
  { q: "10. Nilai Pancasila dibedakan menjadi nilai dasar, instrumental, dan praksis. Wujud dari nilai instrumental Pancasila adalah...", options: ["A. Praktik kehidupan sehari-hari masyarakat", "B. Undang-Undang Dasar 1945, Ketetapan MPR, dan Peraturan Perundang-undangan", "C. Nilai ketuhanan, kemanusiaan, persatuan, kerakyatan, dan keadilan", "D. Keyakinan pribadi masing-masing warga negara", "E. Norma kesopanan di lingkungan keluarga"], ans: 1, exp: "Nilai instrumental adalah penjabaran dari nilai dasar yang diwujudkan dalam bentuk pedoman tertulis, yakni konstitusi dan peraturan perundang-undangan (hukum positif)." },
  { q: "11. Sebagai pandangan hidup bangsa, Pancasila harus dipraktikkan di masyarakat. Salah satu bentuk sikap positif terhadap Pancasila di lingkungan masyarakat adalah...", options: ["A. Menolak membayar iuran RT", "B. Aktif dalam kegiatan ronda malam (siskamling) dan kerja bakti", "C. Membuat kegaduhan saat tetangga sedang beribadah", "D. Hanya bergaul dengan masyarakat yang seagama", "E. Menyebarkan berita hoaks di grup warga"], ans: 1, exp: "Aktif dalam siskamling dan kerja bakti adalah wujud nyata gotong royong, persatuan, dan kemanusiaan (Sila ke-2 dan ke-3) di tingkat akar rumput." },
  { q: "12. Alasan utama Pancasila disebut sebagai ideologi terbuka adalah karena Pancasila...", options: ["A. Dapat diubah nilai dasarnya kapan saja oleh MPR", "B. Berasal dari ideologi asing yang diterapkan di Indonesia", "C. Mampu berinteraksi, beradaptasi, dan menyesuaikan diri dengan perkembangan zaman tanpa mengubah nilai dasarnya", "D. Tidak memiliki landasan hukum yang kuat", "E. Merupakan gabungan dari paham liberalisme dan komunisme"], ans: 2, exp: "Ideologi terbuka berarti Pancasila bersifat dinamis, reformatif, dan mampu menyesuaikan dengan zaman namun tetap berpegang teguh pada ke-5 nilai dasarnya yang abadi." },
  { q: "13. Keterkaitan yang erat antara sila pertama (Ketuhanan) dan sila kedua (Kemanusiaan) dapat dianalisis melalui pernyataan bahwa...", options: ["A. Beragama berarti boleh memaksakan kehendak kepada umat agama lain", "B. Pengakuan terhadap Tuhan YME harus diwujudkan dalam sikap saling menghargai martabat manusia", "C. Hukum agama harus menggantikan hukum negara", "D. Negara melarang warganya untuk tidak beragama", "E. Kemanusiaan lebih tinggi derajatnya daripada ketuhanan"], ans: 1, exp: "Sila-sila Pancasila bersifat hierarkis-piramidal. Kepercayaan kepada Tuhan memanifestasikan diri pada perlakuan yang adil dan beradab terhadap sesama manusia ciptaan-Nya." },
  { q: "14. Dalam hierarki atau tata urutan peraturan perundang-undangan di Indonesia menurut UU No. 12 Tahun 2011, posisi Undang-Undang Dasar Negara Republik Indonesia Tahun 1945 adalah...", options: ["A. Setara dengan Peraturan Presiden", "B. Berada di bawah Ketetapan MPR", "C. Hukum dasar tertulis tertinggi di Indonesia", "D. Hukum dasar yang sifatnya hanya sebagai rekomendasi", "E. Berada di bawah Undang-Undang"], ans: 2, exp: "UUD 1945 menempati puncak tata urutan perundang-undangan sebagai hukum dasar tertulis dan hukum tertinggi di Negara Kesatuan Republik Indonesia." },
  { q: "15. Budi berhenti di lampu merah pada tengah malam yang sepi, bukan karena takut ditilang polisi, melainkan karena sadar akan keselamatan dirinya dan orang lain. Analisis dari ilustrasi tersebut menunjukkan bahwa Budi memiliki...", options: ["A. Ketakutan terhadap sanksi hukum (ketaatan terpaksa)", "B. Kesadaran hukum yang sangat tinggi (autonomous compliance)", "C. Niat untuk melanggar hukum secara diam-diam", "D. Ketidaktahuan terhadap peraturan lalu lintas", "E. Sikap mencari pujian dari orang lain"], ans: 1, exp: "Perilaku menaati aturan karena pemahaman atas nilai dan esensi hukum tersebut (keselamatan) tanpa paksaan disebut kesadaran hukum secara otonom." },
  { q: "16. Apabila terdapat Peraturan Daerah (Perda) yang dinilai bertentangan dengan Undang-Undang (UU), maka lembaga negara yang berwenang untuk melakukan uji materi (judicial review) terhadap peraturan di bawah UU tersebut adalah...", options: ["A. Dewan Perwakilan Rakyat (DPR)", "B. Mahkamah Konstitusi (MK)", "C. Mahkamah Agung (MA)", "D. Komisi Yudisial (KY)", "E. Presiden"], ans: 2, exp: "Menguji peraturan perundang-undangan di bawah undang-undang (seperti PP, Perpres, Perda) terhadap Undang-Undang adalah wewenang Mahkamah Agung (MA)." },
  { q: "17. Makna Pancasila sebagai sumber dari segala sumber hukum di Indonesia adalah...", options: ["A. Segala peraturan hukum yang ada harus bersumber pada Pancasila dan tidak boleh bertentangan dengan nilai-nilainya", "B. Pancasila merupakan satu-satunya undang-undang di Indonesia", "C. Hukum adat dan hukum agama dihapuskan", "D. Pemerintah boleh membuat hukum tanpa persetujuan DPR jika sesuai Pancasila", "E. Pancasila hanya digunakan sebagai hukum di bidang pidana"], ans: 0, exp: "Pancasila menjadi dasar filosofis (staatsfundamentalnorm), di mana setiap materi muatan peraturan perundang-undangan harus menjabarkan dan tidak melanggar asas Pancasila." },
  { q: "18. Setiap warga negara berkewajiban membayar pajak yang sah. Hubungan timbal balik antara kewajiban membayar pajak dan hak fasilitas negara dapat dianalisis pada pernyataan...", options: ["A. Pajak hanya digunakan untuk gaji pejabat negara", "B. Warga tidak mendapat manfaat apa-apa dari pajak", "C. Pajak yang dikumpulkan negara dikembalikan lagi kepada rakyat dalam bentuk infrastruktur, pendidikan, dan kesehatan", "D. Warga yang tidak punya NPWP tidak boleh menggunakan fasilitas jalan raya", "E. Fasilitas negara hanya boleh dipakai oleh kaum pembayar pajak terbesar"], ans: 2, exp: "Ketaatan membayar pajak (kewajiban) berbanding lurus dengan kemampuan negara menyediakan fasilitas umum (hak rakyat untuk menikmatinya)." },
  { q: "19. UUD 1945 menjamin kemerdekaan tiap-tiap penduduk untuk memeluk agamanya. Contoh perilaku taat hukum terkait kebebasan beragama di kehidupan sehari-hari adalah...", options: ["A. Melarang pembangunan tempat ibadah agama lain", "B. Memaksa teman untuk mengikuti ajaran agama kita", "C. Menghormati dan tidak mengganggu orang lain yang sedang melaksanakan ibadah", "D. Mencampuradukkan tata cara ibadah semua agama", "E. Menolak bergaul dengan orang yang berbeda keyakinan"], ans: 2, exp: "Sikap toleransi dengan menghormati ibadah orang lain adalah wujud ketaatan terhadap amanat konstitusi (Pasal 29 UUD 1945) tentang kebebasan beragama." },
  { q: "20. Urutan hierarki peraturan perundang-undangan tingkat atas di Republik Indonesia yang benar (berdasarkan UU No. 12 Tahun 2011) adalah...", options: ["A. UUD 1945 - UU/Perppu - Tap MPR - Perpres", "B. UUD 1945 - Tap MPR - UU/Perppu - Peraturan Pemerintah (PP)", "C. Tap MPR - UUD 1945 - UU - Perda", "D. UU/Perppu - UUD 1945 - Peraturan Pemerintah", "E. UUD 1945 - PP - Perpres - UU/Perppu"], ans: 1, exp: "Hierarki yang benar: UUD 1945, Ketetapan MPR, UU/Perppu, Peraturan Pemerintah (PP), Peraturan Presiden, Perda Provinsi, Perda Kab/Kota." },
  { q: "21. Seorang pengusaha menolak untuk membayar upah minimum karyawan (UMR) sesuai aturan pemerintah. Hal ini membuktikan bahwa...", options: ["A. Pengusaha melanggar hak karyawan akibat pengingkaran kewajibannya sebagai pemberi kerja", "B. Karyawan melakukan pelanggaran hak pengusaha", "C. UMR tidak wajib diikuti oleh pengusaha", "D. Pemerintah gagal mengurus pengusaha", "E. Pengusaha menggunakan hak asasi secara maksimal"], ans: 0, exp: "Kasus ini adalah contoh nyata di mana pengingkaran kewajiban hukum (oleh pengusaha) secara langsung merampas/melanggar hak hukum yang seharusnya diterima karyawan." },
  { q: "22. Salah satu ciri utama dari sistem pemerintahan yang menganut paham demokrasi konstitusional adalah...", options: ["A. Kekuasaan pemerintah bersifat absolut", "B. Pemilu tidak perlu dilaksanakan secara berkala", "C. Kekuasaan penyelenggara negara dibatasi oleh konstitusi atau hukum dasar", "D. Tidak diakuinya hak asasi manusia", "E. Kebebasan pers dibungkam sepenuhnya"], ans: 2, exp: "Esensi dari demokrasi konstitusional adalah pembatasan kekuasaan pemerintahan oleh hukum (konstitusi) agar tidak terjadi kesewenang-wenangan." },
  { q: "23. Jika terjadi pelanggaran hukum berat oleh Presiden, maka lembaga negara yang secara konstitusional berwenang untuk memberhentikan (memakzulkan) Presiden adalah...", options: ["A. Mahkamah Agung", "B. Dewan Perwakilan Rakyat", "C. Majelis Permusyawaratan Rakyat", "D. Mahkamah Konstitusi", "E. Komisi Pemilihan Umum"], ans: 2, exp: "Pemberhentian presiden dilakukan oleh MPR (Majelis Permusyawaratan Rakyat) setelah usulan dari DPR dan putusan pembuktian dari MK terlebih dahulu." },
  { q: "24. Amandemen UUD 1945 membawa dampak besar bagi sistem ketatanegaraan, salah satunya perubahan sistem pemilihan presiden. Dampak paling signifikan adalah...", options: ["A. Presiden kini dipilih seumur hidup", "B. Presiden tidak lagi dipilih oleh MPR, melainkan dipilih langsung oleh rakyat melalui Pemilu", "C. Presiden diangkat oleh Mahkamah Agung", "D. Syarat menjadi calon presiden tidak dibatasi usia", "E. Masa jabatan presiden menjadi tiga periode"], ans: 1, exp: "Pasca-amandemen, kedaulatan langsung dikembalikan ke rakyat melalui mekanisme Pemilu Presiden secara langsung, bukan lagi mandataris MPR." },
  { q: "25. Media sosial sering disalahgunakan untuk ujaran kebencian. Perilaku taat hukum di media sosial sebagai warga negara adalah...", options: ["A. Menyebarkan berita yang provokatif tanpa verifikasi", "B. Menghina pejabat publik dengan akun palsu", "C. Melakukan saring sebelum sharing (verifikasi) berita untuk menghindari hoaks dan fitnah", "D. Meretas akun sosial media teman untuk bercanda", "E. Melakukan pencurian data pribadi orang lain"], ans: 2, exp: "Tidak ikut menyebarkan hoaks dan mematuhi etika berinternet adalah wujud kepatuhan terhadap hukum pidana dan UU ITE." },
  { q: "26. Berdasarkan UUD 1945, fungsi dan wewenang Mahkamah Konstitusi (MK) antara lain adalah...", options: ["A. Mengadili perkara korupsi di tingkat kasasi", "B. Melantik menteri-menteri kabinet", "C. Menguji Undang-Undang terhadap UUD 1945 dan memutus perselisihan hasil pemilu", "D. Membuat undang-undang bersama DPR", "E. Memeriksa pengelolaan keuangan negara"], ans: 2, exp: "Pasal 24C UUD 1945 menegaskan wewenang MK: menguji UU thd UUD, memutus sengketa lembaga, membubarkan parpol, dan sengketa hasil pemilu." },
  { q: "27. Dalam bingkai keberagaman, semboyan Bhinneka Tunggal Ika berfungsi sebagai 'modal sosial'. Arti konsep modal sosial tersebut adalah...", options: ["A. Dana bantuan tunai dari pemerintah untuk warga miskin", "B. Rasa saling percaya, toleransi, dan ikatan persaudaraan antarwarga beda suku yang menjadi kekuatan untuk bangkit dari masalah", "C. Kekayaan sumber daya alam yang melimpah", "D. Besarnya anggaran pertahanan militer", "E. Keunggulan fisik para atlet nasional"], ans: 1, exp: "Modal sosial (social capital) bukan berarti uang, melainkan jaringan, kepercayaan, dan nilai-nilai bersama (toleransi/persaudaraan) yang memudahkan kerja sama bangsa." },
  { q: "28. Pasal 33 ayat (1) UUD 1945 menyatakan bahwa perekonomian disusun sebagai usaha bersama berdasar atas asas kekeluargaan. Badan usaha yang paling mencerminkan prinsip tersebut adalah...", options: ["A. Perseroan Terbatas (PT)", "B. BUMN", "C. Firma", "D. Koperasi", "E. CV"], ans: 3, exp: "Koperasi dibentuk dari, oleh, dan untuk anggota berdasarkan prinsip gotong-royong, kekeluargaan, dan demokrasi ekonomi." },
  { q: "29. Konflik antarpelajar sering diawali prasangka buruk suku/agama. Upaya preventif (pencegahan) paling efektif yang bisa dirumuskan pihak sekolah adalah...", options: ["A. Memisahkan kelas berdasarkan suku dan agama siswa", "B. Memberikan hukuman fisik yang berat bagi pelanggar", "C. Menyelenggarakan kegiatan ekstrakurikuler lintas budaya/agama dan dialog kerukunan yang melibatkan seluruh siswa", "D. Melarang siswa bergaul saat jam istirahat", "E. Mengabaikan saja karena itu masalah anak muda"], ans: 2, exp: "Dialog lintas budaya dapat memecah prasangka (stereotype) dan membangun empati (inklusivitas) antarsiswa yang beragam sebelum konflik membesar." },
  { q: "30. Alasan penolakan sistem liberalisme dalam sistem Ekonomi Pancasila adalah karena...", options: ["A. Sistem liberalisme dapat memunculkan monopoli pasar ekstrem dan kesenjangan sosial yang bertentangan dengan asas keadilan sosial", "B. Sistem liberalisme sangat mementingkan kekayaan kolektif negara", "C. Ekonomi Pancasila anti terhadap keuntungan materi", "D. Liberalisme selalu dikendalikan oleh militer", "E. Pasar bebas menurunkan kualitas produksi barang"], ans: 0, exp: "Ekonomi Pancasila menolak 'free fight liberalism' karena persaingan bebas yang mematikan akan mengeksploitasi kaum lemah dan menciptakan ketidakadilan (melanggar Sila ke-5)." },
  { q: "31. Ketika terjadi konflik antarkampung, penentuan resolusi konflik yang paling sesuai dengan karakteristik bangsa Indonesia adalah...", options: ["A. Melakukan intervensi kekuatan asing", "B. Menyelesaikan lewat pengadilan internasional", "C. Pendekatan mediasi menggunakan mekanisme musyawarah mufakat melalui kearifan lokal tokoh adat setempat", "D. Menghukum seluruh warga desa yang bertikai tanpa pengadilan", "E. Menyebar senjata kepada warga untuk membela diri"], ans: 2, exp: "Kearifan lokal yang berdasar pada musyawarah mufakat adalah instrumen resolusi konflik yang paling natural dan efektif mengembalikan harmoni di Indonesia." },
  { q: "32. Inklusivitas mutlak diperlukan dalam masyarakat Bhinneka Tunggal Ika. Makna dari inklusivitas dalam konteks keberagaman adalah...", options: ["A. Sikap menutup diri dari pergaulan dunia luar", "B. Merasa sukunya sendiri adalah yang paling hebat", "C. Sikap keterbukaan untuk menerima, menghargai, dan merangkul perbedaan dalam kelompok masyarakat tanpa diskriminasi", "D. Menganggap semua kebudayaan itu buruk", "E. Memaksakan penyeragaman budaya"], ans: 2, exp: "Inklusivitas adalah paradigma keterbukaan yang menyediakan ruang aman dan menganggap setara kelompok minoritas atau yang berbeda." },
  { q: "33. Penerapan gotong royong ekonomi tidak hanya dilakukan secara fisik. Contoh konkrit gotong royong ekonomi di era digital saat ini adalah...", options: ["A. Bermain game online secara kolektif", "B. Melakukan perundungan di kolom komentar bersama-sama", "C. Menggalang dana melalui crowdfunding (misal Kitabisa.com) untuk membiayai pengobatan masyarakat kurang mampu", "D. Menyebar spam promosi judi online", "E. Membuat akun palsu di e-commerce"], ans: 2, exp: "Crowdfunding (urun dana) online adalah wujud modernisasi konsep gotong-royong, patungan, dan tolong-menolong di era siber." },
  { q: "34. Salah satu tantangan internal (dari dalam negeri) terhadap integrasi nasional bangsa Indonesia adalah...", options: ["A. Invasi militer dari negara tetangga", "B. Adanya sikap etnosentrisme (sukuisme) ekstrem dan radikalisme agama", "C. Spionase atau intelijen asing", "D. Sabotase instalasi nuklir", "E. Serangan siber oleh peretas internasional"], ans: 1, exp: "Tantangan internal lahir dari kondisi demografis/psikologis bangsa sendiri, seperti Primordialisme, Etnosentrisme, Separatisme, dan konflik SARA." },
  { q: "35. Semboyan Bhinneka Tunggal Ika yang tertulis pada cengkeraman kaki burung Garuda Pancasila memiliki arti secara harfiah yaitu...", options: ["A. Berbeda-beda tetapi tetap satu jua", "B. Mati satu tumbuh seribu", "C. Bersatu kita teguh, bercerai kita runtuh", "D. Negara yang besar menghargai pahlawannya", "E. Gotong royong untuk kemerdekaan"], ans: 0, exp: "Semboyan dari kitab Sutasoma ini mengandung filosofi bahwa walau beraneka ragam bahasa/suku, Indonesia merupakan satu kesatuan." },
  { q: "36. Penerapan prinsip gotong royong yang nyata dalam kerangka pembangunan di desa adalah...", options: ["A. Warga menyewa kontraktor dari luar untuk selokan", "B. Kepala desa menunjuk satu warga bekerja sendirian", "C. Masyarakat secara sukarela kerja bakti memperbaiki jembatan desa yang rusak tanpa mengharapkan upah finansial", "D. Menunggu bantuan pusat turun sambil membiarkan jalan rusak", "E. Membebani seluruh perbaikan kepada TNI"], ans: 2, exp: "Karakteristik esensial gotong royong di desa adalah kerelawanan dan kebersamaan tenaga membangun fasilitas umum tanpa pamrih." },
  { q: "37. Mengidentifikasi dari contoh-contoh berikut, manakah perilaku yang mencerminkan sikap intoleran?", options: ["A. Membantu tetangga berbeda agama yang terkena musibah", "B. Melarang perayaan ibadah kelompok minoritas dengan alasan mengganggu kenyamanan", "C. Mengucapkan selamat hari raya kepada rekan kerja", "D. Mempelajari tarian daerah lain", "E. Membangun masjid bersebelahan dengan gereja harmonis"], ans: 1, exp: "Intoleransi berarti tidak adanya tenggang rasa. Melarang orang lain beribadah secara sengaja melanggar HAM dan nilai Pancasila." },
  { q: "38. Tujuan utama dari penerapan sistem Ekonomi Kerakyatan yang termaktub dalam sistem Ekonomi Pancasila adalah...", options: ["A. Memusatkan kekayaan pada pihak swasta asing", "B. Mewujudkan kemakmuran dan kesejahteraan rakyat secara bersama-sama, bukan sekadar kemakmuran perorangan", "C. Mengendalikan sumber daya oleh kelompok oligarki", "D. Memperkaya pejabat pemerintah", "E. Menguasai perdagangan komoditas dunia"], ans: 1, exp: "Ekonomi kerakyatan bertujuan mewujudkan keadilan sosial (Sila ke-5), memposisikan kemakmuran masyarakat (distribusi kekayaan yang adil) sebagai prioritas utama." },
  { q: "39. Bela negara adalah hak dan kewajiban warga negara. Bagi seorang pelajar SMA/SMK, bentuk implementasi bela negara yang paling tepat adalah...", options: ["A. Mengikuti wajib militer di perbatasan", "B. Belajar dengan giat, mematuhi tata tertib, dan berprestasi mengharumkan nama bangsa", "C. Bekerja mencari uang untuk menyumbang pajak", "D. Melakukan demonstrasi anarkis", "E. Meretas situs luar negeri"], ans: 1, exp: "Bela negara non-fisik bagi pelajar dilakukan sesuai porsinya: tekun belajar, menjaga moral, dan berprestasi demi kemajuan SDM negara." },
  { q: "40. Salah satu identifikasi bentuk ancaman nirmiliter (non-militer) di bidang ekonomi bagi Indonesia adalah...", options: ["A. Serangan bersenjata kartel narkoba", "B. Banjirnya produk impor berharga sangat murah (dumping) yang mengancam kebangkrutan UMKM lokal", "C. Agresi militer negara tetangga", "D. Gerakan pemberontakan bersenjata", "E. Wabah penyakit cacar monyet"], ans: 1, exp: "Ancaman nirmiliter tidak berbentuk fisik/senjata. Gempuran pasar bebas dan banjirnya barang impor yang mematikan produsen lokal adalah ancaman nyata bagi ketahanan nasional bangsa." }
];

const essayData: Essay[] = [
  { q: "41. Pancasila disebut sebagai ideologi terbuka yang dinamis. Analisislah bagaimana dinamika amandemen UUD 1945 dibenarkan dari perspektif keluwesan Pancasila!", exp: "<b>Pembahasan:</b> Amandemen UUD 1945 adalah wujud nyata fleksibilitas Pancasila. Sebagai hukum dasar (nilai instrumental), pasal-pasal UUD 1945 boleh diubah agar lebih demokratis sesuai tuntutan zaman. Namun, batasannya tegas: <b>MPR tidak boleh mengubah Pembukaan UUD 1945</b>, karena di dalamnya memuat rumusan murni nilai dasar Pancasila yang abadi. Hal ini membuktikan Pancasila luwes di aspek instrumen tanpa kehilangan ruh utamanya." },
  { q: "42. Hukum di Indonesia sering disindir 'tajam ke bawah, tumpul ke atas'. Hubungkan kasus ketidakadilan ini dengan pentingnya integritas aparat!", exp: "<b>Pembahasan:</b> Ketidakadilan hukum (diskriminasi) melanggar asas <i>equality before the law</i> (Sila ke-2 dan ke-5). Krisis ini murni berakar pada <b>rendahnya integritas moral aparat penegak hukum</b>. Sebaik apapun produk undang-undangnya, jika hakim/jaksa mudah disuap (mafia hukum), sistem peradilan akan runtuh. Integritas aparat adalah tiang utama tegaknya keadilan." },
  { q: "43. Jelaskan makna filosofis Bhinneka Tunggal Ika sebagai 'modal sosial' dalam menghadapi krisis (misal: pandemi/bencana alam)!", exp: "<b>Pembahasan:</b> Bhinneka Tunggal Ika sebagai modal sosial (<i>social capital</i>) bermakna sebagai <b>rasa saling percaya dan ikatan persaudaraan yang kuat lintas suku/agama</b>. Saat krisis melanda, modal sosial ini teraktivasi secara otomatis berupa gerakan gotong royong dan donasi tanpa memandang identitas korban. Ikatan kolektif kerelawanan inilah yang membuat bangsa kita tangguh bertahan." },
  { q: "44. Analisislah peran nyata pelajar dalam Sishankamrata menghadapi ancaman cyber (siber) atau hoaks di internet!", exp: "<b>Pembahasan:</b> Pelajar masa kini berperan sebagai <b>pasukan Bela Negara Digital/Nirmiliter</b>. Tindakan nyatanya: (1) Meningkatkan literasi digital agar kritis terhadap sumber berita (saring sebelum sharing). (2) Tidak ikut menyebarkan hoaks provokatif. (3) Memenuhi ruang siber dengan konten positif/edukatif guna melemahkan narasi radikalisme pemecah belah bangsa." },
  { q: "45. Sebutkan contoh peran penting Negara Indonesia dalam mewujudkan perdamaian dan kemajuan di kawasan ASEAN!", exp: "<b>Pembahasan:</b> Peran krusial Indonesia meliputi: 1. Sebagai salah satu negara pemrakarsa berdirinya ASEAN (Deklarasi Bangkok 1967). 2. Memfasilitasi mediasi perdamaian negara konflik (contoh: Jakarta Informal Meeting untuk Kamboja). 3. Menggagas Komunitas Keamanan ASEAN (ASC) untuk menjaga stabilitas regional bebas dari campur tangan militer asing." }
];

export default function SimulasiPancasilaPage() {
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
    <div className="bg-white rounded-3xl p-10 md:p-16 shadow-xl text-center max-w-2xl w-full mx-auto animate-fade-in-up border-t-8 border-red-600">
      <div className="text-6xl mb-6 flex justify-center gap-4">
        <span>🇮🇩</span><span>🏛️</span><span>🦅</span>
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">Simulasi PSAJ Pend. Pancasila</h1>
      <p className="text-slate-600 mb-8 text-lg leading-relaxed">
        Asah wawasan kebangsaan, pemahaman konstitusi, dan nilai-nilai luhur Pancasila. Tersedia 40 soal pilihan ganda interaktif dan 5 review uraian.
      </p>
      <button 
        onClick={handleStart}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-red-600/40 text-lg"
      >
        Mulai Evaluasi 🇮🇩
      </button>
    </div>
  );

  const renderQuiz = () => {
    const currentQuestion = mcqData[currentIndex];
    const progressPercentage = ((currentIndex + 1) / mcqData.length) * 100;
    const hasAnswered = answers[currentIndex] !== null;
    const selectedOption = answers[currentIndex];

    return (
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl max-w-3xl w-full mx-auto animate-fade-in-up border-t-4 border-red-600">
        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-bold text-red-600 uppercase tracking-wider">
            Soal {currentIndex + 1} / {mcqData.length}
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 mb-8 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-red-600 to-rose-400 h-full rounded-full transition-all duration-500 ease-out" 
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
              btnClass += "border-slate-200 bg-slate-50 hover:border-red-500 hover:bg-red-50 text-slate-700 cursor-pointer hover:translate-x-1";
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
              {selectedOption === currentQuestion.ans ? '✅ Tepat Sekali!' : '❌ Kurang Tepat'}
            </h4>
            <p className="text-slate-700 leading-relaxed">
              <strong className="text-slate-900">Pembahasan Dasar Negara:</strong> {currentQuestion.exp}
            </p>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-8 flex justify-between">
          <button 
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-md ${currentIndex === 0 ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-slate-500 hover:bg-slate-600 text-white transform hover:-translate-y-1'}`}
          >
            ⏮️ Sebelumnya
          </button>
          {hasAnswered ? (
            <button 
              onClick={handleNext}
              className={`font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-md transform hover:-translate-y-1 ${currentIndex === mcqData.length - 1 ? 'bg-amber-500 hover:bg-amber-600 text-white hover:shadow-amber-500/40' : 'bg-red-600 hover:bg-red-700 text-white hover:shadow-red-600/40'}`}
            >
              {currentIndex === mcqData.length - 1 ? 'Selesaikan Ujian 🏆' : 'Lanjut ke Soal Berikutnya ⏭️'}
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  };

  const renderEssays = () => (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl max-w-3xl w-full mx-auto animate-fade-in-up border-t-8 border-red-600">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-3">Review Analisis (Uraian)</h2>
        <p className="text-slate-500">Pahami konsep analisis berikut untuk menaklukkan soal esai ujian dengan sempurna.</p>
      </div>
      
      <div className="flex flex-col gap-6">
        {essayData.map((item, index) => (
          <div key={index} className="bg-slate-50 border border-slate-200 p-6 md:p-8 rounded-2xl hover:shadow-md transition-shadow">
            <h3 className="font-bold text-red-800 mb-4 text-lg border-b border-red-100 pb-2">{item.q}</h3>
            <p className="text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.exp }}></p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button 
          onClick={handleStart}
          className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:-translate-y-1"
        >
          🔄 Ulangi Evaluasi dari Awal
        </button>
      </div>
    </div>
  );

  const finalScore = Math.round((score / mcqData.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-slate-100 py-12 px-4 font-sans text-slate-900 flex flex-col items-center">
      
      {/* Main View Manager */}
      {view === 'landing' && renderLanding()}
      {view === 'quiz' && renderQuiz()}
      {view === 'essay' && renderEssays()}

      {/* Final Score Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-10 text-center max-w-md w-full shadow-2xl transform scale-100 transition-transform">
            <div className="text-5xl mb-4">⚖️</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Evaluasi Selesai!</h2>
            <p className="text-slate-500 mb-8">Nilai wawasan kebangsaanmu adalah:</p>
            
            <div className="relative w-44 h-44 mx-auto mb-8 flex justify-center items-center rounded-full shadow-inner" 
                 style={{ background: `conic-gradient(#dc2626 ${finalScore}%, #f1f5f9 0)` }}>
              <div className="absolute inset-3 bg-white rounded-full flex justify-center items-center shadow-sm">
                <span className="text-6xl font-black text-red-600">{finalScore}</span>
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-slate-800 mb-8 px-4">
              {finalScore >= 85 ? "Luar Biasa! Pemahamanmu akan Pancasila dan Konstitusi sangat kokoh. 🌟" : finalScore >= 70 ? "Cukup Baik! Pelajari kembali detail penerapan nilai dalam kasus nyata. 👍" : "Jangan Putus Asa! Tingkatkan lagi semangat literasi kebangsaanmu. 💪"}
            </h3>
            
            <button 
              onClick={handleGoToEssays}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:-translate-y-1"
            >
              Lanjutkan ke Review Esai 📝
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