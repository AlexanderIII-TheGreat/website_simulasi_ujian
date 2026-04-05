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

// --- DATA SOAL KONSENTRASI KEAHLIAN TJKT ---
const mcqData: MCQ[] = [
  { q: "1. Di dalam RouterOS MikroTik, fitur yang berfungsi untuk menerjemahkan alamat IP privat menjadi alamat IP publik agar perangkat lokal dapat mengakses internet disebut...", options: ["A. Web Proxy", "B. NAT (Network Address Translation)", "C. DHCP Server", "D. Bandwidth Test", "E. IP Pool"], ans: 1, exp: "NAT (Network Address Translation) digunakan untuk memetakan alamat IP lokal ke IP publik melalui internet gateway agar jaringan privat bisa terhubung ke internet." },
  { q: "2. Teknologi yang memungkinkan pengelompokan perangkat di jaringan LAN secara logika meskipun secara fisik berada pada segmen switch yang berbeda disebut...", options: ["A. Wide Area Network (WAN)", "B. Virtual Local Area Network (VLAN)", "C. Storage Area Network (SAN)", "D. Personal Area Network (PAN)", "E. Metropolitan Area Network (MAN)"], ans: 1, exp: "VLAN (Virtual LAN) mengklasifikasikan jaringan secara virtual tanpa dibatasi oleh koneksi fisik pada switch." },
  { q: "3. Jika sebuah jaringan memiliki trafik broadcast yang terlalu tinggi dan mengganggu performa, VLAN dapat membantu dengan cara...", options: ["A. Meningkatkan kecepatan fisik kabel", "B. Menghapus alamat IP", "C. Membagi satu broadcast domain menjadi beberapa domain yang lebih kecil", "D. Mengubah kabel UTP menjadi Fiber Optic", "E. Menambah beban trafik"], ans: 2, exp: "VLAN bekerja dengan membagi domain siaran (broadcast domain) sehingga trafik broadcast dari satu segmen tidak mengganggu segmen lainnya." },
  { q: "4. Fitur MikroTik yang digunakan untuk mengarahkan trafik dari internet masuk ke server internal tertentu berdasarkan nomor port disebut...", options: ["A. Src-NAT", "B. Dst-NAT (Port Forwarding)", "C. Action Log", "D. Out Interface", "E. IP Route"], ans: 1, exp: "Dst-NAT (Destination NAT) digunakan untuk melewatkan trafik masuk dari luar menuju alamat dan port spesifik di jaringan lokal." },
  { q: "5. Manakah konfigurasi NAT MikroTik yang paling umum digunakan untuk membagikan koneksi internet ke client lokal?", options: ["A. Chain: dstnat, Action: redirect", "B. Chain: srcnat, Action: masquerade", "C. Chain: input, Action: accept", "D. Chain: forward, Action: fasttrack", "E. Chain: output, Action: drop"], ans: 1, exp: "Action 'masquerade' pada chain 'srcnat' adalah standar konfigurasi untuk memberikan akses internet ke jaringan lokal dengan menyamarkan IP lokal menjadi IP publik." },
  { q: "6. Jenis routing yang tabel rutenya diperbarui secara otomatis melalui pertukaran informasi antar router menggunakan protokol tertentu disebut...", options: ["A. Static Routing", "B. Default Routing", "C. Dynamic Routing", "D. Manual Routing", "E. Transparent Routing"], ans: 2, exp: "Dynamic routing menggunakan protokol (seperti OSPF atau BGP) untuk mempelajari jalur rute secara otomatis dan dinamis sesuai perubahan topologi." },
  { q: "7. Dalam proses routing, router memeriksa alamat IP tujuan pada paket data dan mencocokannya dengan informasi yang tersimpan di...", options: ["A. ARP Table", "B. Routing Table", "C. DHCP Lease List", "D. MAC Address Table", "E. Neighbor List"], ans: 1, exp: "Routing Table adalah database yang berisi rute-rute menuju segmen jaringan tujuan yang menjadi panduan router meneruskan paket." },
  { q: "8. Layanan server yang berfungsi memberikan alamat IP, Gateway, dan DNS secara otomatis kepada client yang terhubung disebut...", options: ["A. DNS Server", "B. FTP Server", "C. DHCP Server", "D. Mail Server", "E. Web Server"], ans: 2, exp: "DHCP (Dynamic Host Configuration Protocol) mengotomatisasi pengalamatan perangkat client agar tidak terjadi konflik IP manual." },
  { q: "9. Dalam layanan remote server, port default yang digunakan oleh protokol SSH (Secure Shell) adalah...", options: ["A. 21", "B. 22", "C. 23", "D. 80", "E. 443"], ans: 1, exp: "SSH bekerja secara default pada port 22 untuk menyediakan akses remote yang terenkripsi dan aman." },
  { q: "10. Layanan yang berfungsi memetakan nama domain (seperti google.com) menjadi alamat IP adalah...", options: ["A. DHCP Server", "B. Proxy Server", "C. DNS Server", "D. Database Server", "E. FTP Server"], ans: 2, exp: "DNS (Domain Name System) menerjemahkan nama yang mudah diingat manusia menjadi alamat IP yang dimengerti oleh mesin." },
  { q: "11. Protokol yang digunakan untuk pengiriman dan penerimaan surat elektronik (email) adalah...", options: ["A. HTTP dan FTP", "B. SMTP dan POP3/IMAP", "C. SSH dan Telnet", "D. DHCP dan DNS", "E. ICMP dan SNMP"], ans: 1, exp: "SMTP digunakan untuk mengirim email, sedangkan POP3 atau IMAP digunakan untuk menerima email." },
  { q: "12. Layanan server yang digunakan untuk membagikan file dan dokumen secara terpusat dalam jaringan adalah...", options: ["A. File Server", "B. Mail Server", "C. Database Server", "D. Web Server", "E. DNS Server"], ans: 0, exp: "File server (seperti Samba atau FTP) difungsikan untuk penyimpanan dan pertukaran file antar pengguna dalam jaringan." },
  { q: "13. Software web server yang sangat populer digunakan pada sistem operasi Linux adalah...", options: ["A. Winbox", "B. Putty", "C. Apache atau Nginx", "D. Microsoft Word", "E. TablePlus"], ans: 2, exp: "Apache dan Nginx merupakan layanan web server (HTTP) yang paling banyak digunakan di lingkungan server Linux." },
  { q: "14. Sebuah network memiliki IP 192.168.10.0/27. Berapakah jumlah host maksimal yang dapat digunakan pada network tersebut?", options: ["A. 14 Host", "B. 30 Host", "C. 62 Host", "D. 126 Host", "E. 254 Host"], ans: 1, exp: "Prefix /27 menyediakan 32 total IP. Dikurangi 1 IP Network dan 1 IP Broadcast, maka sisa IP untuk host adalah 30." },
  { q: "15. Perintah terminal Linux untuk menginstal layanan baru (misal DNS server) pada distro berbasis Debian/Ubuntu adalah...", options: ["A. ip addr show", "B. systemctl start", "C. apt-get install", "D. nan /etc/network", "E. reboot"], ans: 2, exp: "Perintah 'apt-get install' atau 'apt install' adalah standar manajemen paket di Debian/Ubuntu untuk instalasi software." },
  { q: "16. Client mendapatkan IP 169.254.x.x dan tidak bisa terkoneksi ke server. Masalah ini biasanya mengindikasikan...", options: ["A. Kabel FO putus", "B. Konflik IP Statis", "C. Gagal mendapatkan respon dari DHCP Server (APIPA)", "D. Salah konfigurasi DNS", "E. Firewall memblokir port 80"], ans: 2, exp: "IP 169.254.x.x (APIPA) muncul otomatis saat client gagal mendapatkan pengalamatan dari server DHCP." },
  { q: "17. Permasalahan jaringan yang disebabkan oleh rusaknya konektor RJ-45 atau kabel UTP yang terjepit termasuk kategori gangguan pada...", options: ["A. Layer Aplikasi", "B. Layer Transport", "C. Layer Fisik (Physical Layer)", "D. Layer Sesi", "E. Layer Presentasi"], ans: 2, exp: "Kabel dan konektor adalah komponen perangkat keras yang berada pada lapisan fisik (Layer 1) model OSI." },
  { q: "18. Faktor penghambat sinyal nirkabel yang disebabkan oleh benda logam atau dinding beton tebal disebut...", options: ["A. Absorpsi dan Refleksi", "B. Modulasi", "C. Enkripsi", "D. Routing", "E. Switching"], ans: 0, exp: "Gelombang radio dapat diserap (absorpsi) atau dipantulkan (refleksi) oleh benda padat seperti logam dan beton, sehingga memperlemah sinyal." },
  { q: "19. Gangguan pada Wi-Fi frekuensi 2.4 GHz yang disebabkan oleh tumpang tindih kanal dari akses poin tetangga disebut...", options: ["A. Low Signal", "B. Interference (Interferensi)", "C. No SSID found", "D. Hardware Failure", "E. Battery Drain"], ans: 1, exp: "Interferensi terjadi ketika dua atau lebih perangkat menggunakan frekuensi atau kanal yang sama secara berdekatan." },
  { q: "20. Keuntungan utama menggunakan frekuensi 5 GHz dibandingkan 2.4 GHz pada jaringan nirkabel adalah...", options: ["A. Jangkauan sinyal lebih jauh", "B. Lebih tahan terhadap dinding tebal", "C. Bandwidth lebih besar dan kanal lebih bersih dari interferensi", "D. Harga perangkat jauh lebih murah", "E. Mendukung semua perangkat jadul"], ans: 2, exp: "Frekuensi 5 GHz menawarkan throughput data yang lebih tinggi dan kepadatan trafik yang lebih rendah dibanding 2.4 GHz." },
  { q: "21. Topologi jaringan yang setiap node-nya terhubung langsung ke switch pusat sebagai titik fokus komunikasi adalah...", options: ["A. Bus", "B. Ring", "C. Star", "D. Mesh", "E. Tree"], ans: 2, exp: "Topologi Star menggunakan perangkat pusat (switch/hub) sebagai konsentrator seluruh koneksi perangkat." },
  { q: "22. Mengapa teknisi harus melakukan survei lokasi (site survey) sebelum memasang jaringan nirkabel?", options: ["A. Untuk menghitung keuntungan penjualan", "B. Menentukan titik akses poin terbaik guna meminimalisir area blank spot", "C. Menghitung jumlah meja kantor", "D. Mencari kabel bekas", "E. Mengukur suhu ruangan"], ans: 1, exp: "Site survey memastikan cakupan sinyal merata dan menghindari hambatan fisik yang dapat mengganggu koneksi." },
  { q: "23. Perangkat jaringan yang bekerja pada Layer 3 (Network) dan berfungsi menentukan jalur terbaik paket data adalah...", options: ["A. Hub", "B. Switch Layer 2", "C. Router", "D. Access Point", "E. Repeater"], ans: 2, exp: "Router bertugas melakukan proses routing atau pengiriman paket antar jaringan yang berbeda segment." },
  { q: "24. Teknologi nirkabel jarak jauh (Outdoor) yang digunakan untuk menghubungkan dua gedung tanpa kabel FO disebut...", options: ["A. Bluetooth P2P", "B. Wireless Point-to-Point (PtP)", "C. Infrared Link", "D. Wi-Fi Indoor", "E. NFC Mesh"], ans: 1, exp: "Point-to-Point menggunakan radio nirkabel outdoor dan antena sektoral/grid untuk menjembatani jaringan antar lokasi yang berjauhan." },
  { q: "25. Standar IEEE untuk jaringan nirkabel (Wi-Fi) yang umum digunakan saat ini adalah...", options: ["A. 802.3", "B. 802.1Q", "C. 802.11", "D. 802.15", "E. 802.1X"], ans: 2, exp: "IEEE 802.11 adalah kumpulan standar yang mengatur komunikasi pada jaringan lokal nirkabel (WLAN)." },
  { q: "26. Mengidentifikasi kebutuhan user yang sering melakukan video call membutuhkan parameter jaringan utama berupa...", options: ["A. Storage yang besar", "B. Monitor resolusi 4K", "C. Latensi rendah dan jitter yang stabil (QoS)", "D. Kabel UTP kategori 3", "E. Mouse gaming"], ans: 2, exp: "Layanan real-time seperti VoIP dan Video Call sangat sensitif terhadap delay (latensi) dan variasi delay (jitter)." },
  { q: "27. Teknik pembatasan kecepatan internet bagi user di MikroTik melalui menu Queues disebut...", options: ["A. Load Balancing", "B. Bandwidth Management", "C. Firewall Filter", "D. IP Binding", "E. Hotspot Setup"], ans: 1, exp: "Bandwidth management melalui Queues digunakan untuk mengontrol kecepatan upload dan download setiap pengguna." },
  { q: "28. Perintah 'nslookup' atau 'dig' pada terminal digunakan untuk menguji layanan...", options: ["A. Remote Server", "B. DHCP Server", "C. DNS Server", "D. Web Server", "E. FTP Server"], ans: 2, exp: "Perintah tersebut digunakan untuk melakukan kueri terhadap sistem nama domain (DNS)." },
  { q: "29. Layanan remote access yang mengirimkan data secara teks polos (tidak aman) dibandingkan SSH adalah...", options: ["A. SFTP", "B. Telnet", "C. HTTPS", "D. SCP", "E. VPN"], ans: 1, exp: "Telnet tidak melakukan enkripsi data, sehingga username dan password dapat terbaca dengan mudah oleh penyadap." },
  { q: "30. Teknik penggabungan beberapa jalur internet ISP untuk mendapatkan total bandwidth yang lebih besar disebut...", options: ["A. Failover", "B. Load Balancing", "C. Subnetting", "D. Bridge Mode", "E. NAT"], ans: 1, exp: "Load Balancing mendistribusikan beban trafik ke beberapa ISP untuk optimalisasi performa." },
  { q: "31. Fungsi utama Radius Server atau User Manager pada jaringan Wi-Fi sekolah adalah...", options: ["A. Mempercepat speed download", "B. Manajemen autentikasi, otorisasi, dan accounting (AAA) akun pengguna", "C. Menyimpan file tugas siswa", "D. Memblokir virus", "E. Mematikan router otomatis"], ans: 1, exp: "Radius server digunakan untuk mengelola akses akun pengguna secara terpusat dan aman." },
  { q: "32. Port switch yang digunakan untuk menghubungkan dua switch agar bisa membawa trafik banyak VLAN sekaligus disebut...", options: ["A. Access Port", "B. Console Port", "C. Trunk Port", "D. LAN Port", "E. WAN Port"], ans: 2, exp: "Trunk port berfungsi sebagai jalur pipa yang membawa data dari berbagai ID VLAN yang berbeda antar perangkat jaringan." },
  { q: "33. Perintah terminal Linux 'systemctl restart apache2' bertujuan untuk...", options: ["A. Mematikan komputer", "B. Menginstal web server", "C. Memuat ulang konfigurasi dan menjalankan kembali layanan web server", "D. Menghapus folder web", "E. Melihat alamat IP"], ans: 2, exp: "Restart layanan diperlukan setelah admin melakukan perubahan konfigurasi agar perubahan tersebut diterapkan." },
  { q: "34. Media transmisi yang kebal terhadap gangguan elektromagnetik (EMI) karena menggunakan cahaya sebagai pembawa data adalah...", options: ["A. Kabel Coaxial", "B. Kabel UTP", "C. Fiber Optic", "D. Kabel STP", "E. Kabel Telepon"], ans: 2, exp: "Fiber optic menggunakan serat kaca dan cahaya, sehingga tidak terpengaruh oleh gelombang listrik di sekitarnya." },
  { q: "35. Pada konfigurasi IP statis Linux di file /etc/network/interfaces, parameter 'gateway' diisi dengan...", options: ["A. IP address komputer sendiri", "B. Alamat MAC switch", "C. Alamat IP router sebagai jalur keluar", "D. Nama domain", "E. Alamat email admin"], ans: 2, exp: "Gateway adalah alamat IP router yang menjadi gerbang bagi komputer untuk berkomunikasi dengan jaringan luar." },
  { q: "36. Agar router MikroTik dapat menerjemahkan nama situs menjadi IP, maka pada menu IP -> DNS harus dikonfigurasi...", options: ["A. IP Server ISP atau Google (contoh: 8.8.8.8)", "B. IP Address client", "C. Password wifi", "D. Nama router", "E. Alamat MAC"], ans: 0, exp: "DNS Server (IP DNS) diperlukan agar router dan client dapat mengakses internet menggunakan nama domain." },
  { q: "37. Fitur MikroTik yang digunakan untuk memblokir akses situs web tertentu secara praktis adalah...", options: ["A. IP Pool", "B. Web Proxy (Access)", "C. DHCP Client", "D. Neighbor Discovery", "E. System Identity"], ans: 1, exp: "Web Proxy memungkinkan pemfilteran konten atau situs berdasarkan URL atau kata kunci." },
  { q: "38. Dalam load balancing, metode yang membagi trafik berdasarkan urutan jalur ISP secara bergantian disebut...", options: ["A. PCC (Per Connection Classifier)", "B. NTH", "C. Round Robin", "D. ECMP", "E. Failover"], ans: 2, exp: "Round Robin membagi beban secara berurutan antar jalur yang tersedia." },
  { q: "39. Tindakan 'hardening' pada server SSH untuk mencegah serangan brute force yang paling tepat adalah...", options: ["A. Membiarkan port default 22", "B. Menggunakan password yang pendek", "C. Mengubah port default dan menggunakan otentikasi kunci (SSH Key)", "D. Mematikan firewall", "E. Menghapus user root"], ans: 2, exp: "Mengganti port default dan beralih ke SSH Key meningkatkan keamanan dari upaya login otomatis peretas." },
  { q: "40. Perangkat yang digunakan untuk menyatukan inti kaca serat optik menggunakan panas suhu tinggi adalah...", options: ["A. Stripper", "B. Cleaver", "C. Fusion Splicer", "D. Optical Power Meter (OPM)", "E. Visual Fault Locator (VFL)"], ans: 2, exp: "Fusion splicer adalah alat presisi untuk menyambung serat optik secara permanen dengan teknik peleburan panas." }
];

const essayData: Essay[] = [
  { q: "1. (Analisis Fiber Optic) Jelaskan perbedaan antara kabel Single Mode dan Multi Mode, serta sebutkan minimal dua alat kerja wajib dalam penyambungan serat optik!", exp: "<b>Pembahasan:</b><br/>- <b>Single Mode</b>: Memiliki core kecil (~9 mikron), menggunakan sinar laser, untuk transmisi jarak jauh, bandwidth besar.<br/>- <b>Multi Mode</b>: Core lebih besar (50-62.5 mikron), menggunakan LED, untuk jarak pendek (dalam gedung).<br/>- <b>Alat Kerja</b>: <i>Fusion Splicer</i> (penyambung), <i>Cleaver</i> (pemotong), dan <i>Stripper</i> (pengupas)." },
  { q: "2. (Layanan Server) Analisislah apa yang terjadi jika dalam sebuah jaringan lokal terdapat dua buah DHCP Server yang aktif bersamaan (Rogue DHCP)?", exp: "<b>Pembahasan:</b><br/>Terjadi kondisi <b>DHCP Conflict</b>. Client akan menerima konfigurasi IP dari server yang merespon paling cepat. Jika Rogue DHCP memberikan gateway/DNS yang salah, client tidak bisa internetan. Selain itu, dapat menyebabkan duplikasi IP address yang mengganggu stabilitas jaringan." },
  { q: "3. (Monitoring Jaringan) Sebutkan dan jelaskan fungsi 3 perintah terminal yang umum digunakan untuk melakukan monitoring atau troubleshooting jaringan!", exp: "<b>Pembahasan:</b><br/>1. <b>Ping</b>: Mengecek konektivitas dan latensi ke host tujuan.<br/>2. <b>Traceroute</b>: Melacak jalur/hop yang dilewati paket data untuk mendeteksi titik masalah.<br/>3. <b>Netstat / SS</b>: Melihat daftar koneksi aktif dan port yang sedang terbuka pada server." },
  { q: "4. (Keamanan Jaringan) Jelaskan apa yang dimaksud dengan serangan DDoS dan analisislah salah satu strategi mitigasinya pada sisi Router!", exp: "<b>Pembahasan:</b><br/><b>DDoS</b> adalah serangan membanjiri server dengan trafik palsu dari banyak sumber agar layanan lumpuh. <b>Mitigasi</b>: Menggunakan fitur <i>Firewall Filter</i> (Raw) untuk melakukan dropping trafik sebelum masuk ke CPU, menerapkan <i>Connection Limit</i>, atau menggunakan layanan scrubbing center." },
  { q: "5. (Konfigurasi MikroTik) Analisislah mengapa fitur 'Masquerade' pada NAT sangat penting dalam jaringan kantor yang menggunakan IP privat?", exp: "<b>Pembahasan:</b><br/>IP privat (192.168.x.x) tidak dikenali di internet global. Fitur <b>Masquerade</b> berfungsi mengganti alamat sumber paket data dari IP privat menjadi IP publik router secara dinamis. Tanpa ini, paket data client bisa terkirim ke internet namun balasan (reply) tidak akan pernah sampai kembali ke client." }
];

export default function SimulasiTJKTPage() {
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
    <div className="min-h-screen bg-slate-900 py-12 px-4 font-sans text-slate-100 flex flex-col items-center">
      {view === 'landing' && (
        <div className="bg-slate-800 rounded-3xl p-10 md:p-16 shadow-2xl text-center max-w-2xl w-full border-t-8 border-cyan-500 animate-fade-in-up">
          <div className="text-6xl mb-6 text-cyan-400">🌐💻</div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">Simulasi PSAJ Konsentrasi TJKT</h1>
          <p className="text-slate-300 mb-8 text-lg">Uji penguasaan teknik jaringan, administrasi server, fiber optic, dan mikrotik. Berisi 40 soal pilihan ganda dan 5 uraian analitis sesuai standar SMK.</p>
          <button onClick={handleStart} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:-translate-y-1 tracking-wider uppercase">Masuk Terminal Ujian</button>
        </div>
      )}

      {view === 'quiz' && (
        <div className="bg-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl max-w-3xl w-full border-t-4 border-cyan-500 animate-fade-in-up">
          <div className="flex justify-between items-center mb-3 text-cyan-400 font-mono font-bold text-sm">
            <span>PACKET: {currentIndex + 1} / {mcqData.length}</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3 mb-8 overflow-hidden shadow-inner">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-500" style={{ width: `${((currentIndex + 1) / mcqData.length) * 100}%` }}></div>
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-8 leading-relaxed">{mcqData[currentIndex].q}</h2>
          <div className="flex flex-col gap-3">
            {mcqData[currentIndex].options.map((opt, i) => {
              const hasAnswered = answers[currentIndex] !== null;
              const isCorrect = i === mcqData[currentIndex].ans;
              const isSelected = i === answers[currentIndex];
              let btnClass = "text-left p-4 rounded-xl border-2 transition-all ";
              if (!hasAnswered) btnClass += "border-slate-600 bg-slate-700 hover:border-cyan-400 hover:bg-slate-600 cursor-pointer";
              else btnClass += isCorrect ? "border-emerald-500 bg-emerald-900/30 text-emerald-400 font-bold" : isSelected ? "border-rose-500 bg-rose-900/30 text-rose-400" : "border-slate-800 opacity-40";
              return <button key={i} onClick={() => handleAnswer(i)} disabled={hasAnswered} className={btnClass}>{opt}</button>;
            })}
          </div>
          {answers[currentIndex] !== null && (
            <div className="mt-8 p-6 rounded-2xl bg-slate-900/50 border border-cyan-900/50 animate-fade-in">
              <h4 className="font-bold text-cyan-400 mb-2 font-mono">System Analysis:</h4>
              <p className="text-slate-300 italic">{mcqData[currentIndex].exp}</p>
            </div>
          )}
          <div className="mt-8 flex justify-between">
            <button onClick={handlePrevious} disabled={currentIndex === 0} className={`font-bold py-3 px-6 rounded-xl ${currentIndex === 0 ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-slate-600 text-white hover:bg-slate-500'}`}>Back</button>
            {answers[currentIndex] !== null && <button onClick={handleNext} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg font-mono uppercase">{currentIndex === mcqData.length - 1 ? 'Execute' : 'Forward'}</button>}
          </div>
        </div>
      )}

      {view === 'essay' && (
        <div className="bg-slate-800 rounded-3xl p-8 md:p-12 shadow-xl max-w-4xl w-full border-t-8 border-cyan-500 animate-fade-in-up">
          <h2 className="text-3xl font-extrabold text-white mb-8 text-center tracking-tight font-mono tracking-widest uppercase">Network Documentation (Esai)</h2>
          <div className="flex flex-col gap-6 font-mono">
            {essayData.map((item, index) => (
              <div key={index} className="bg-slate-900/40 border border-slate-700 p-6 rounded-2xl">
                <h3 className="font-bold text-cyan-300 mb-4 text-lg border-b border-cyan-900/50 pb-2">{item.q}</h3>
                <p className="text-slate-300 leading-loose" dangerouslySetInnerHTML={{ __html: item.exp }} />
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <button onClick={handleStart} className="bg-slate-700 hover:bg-slate-600 text-cyan-400 font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:-translate-y-1 border border-cyan-900/50">System Reboot</button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50 p-4 animate-fade-in">
          <div className="bg-slate-800 rounded-3xl p-10 text-center max-w-md w-full shadow-2xl border-4 border-cyan-600">
            <div className="text-5xl mb-4 font-mono text-cyan-500">{"</>"}</div>
            <h2 className="text-2xl font-bold text-white mb-2 font-mono">Simulasi Selesai!</h2>
            <p className="text-slate-400 mb-8 font-mono">Network Proficiency Score:</p>
            <div className="relative w-44 h-44 mx-auto mb-8 flex justify-center items-center rounded-full shadow-inner border-8 border-slate-700" style={{ background: `conic-gradient(#0891b2 ${finalScore}%, #1e293b 0)` }}>
              <div className="absolute inset-3 bg-slate-800 rounded-full flex justify-center items-center shadow-lg"><span className="text-6xl font-black text-cyan-400 font-mono tracking-tighter">{finalScore}</span></div>
            </div>
            <h3 className="text-lg font-bold text-slate-300 mb-8 px-4 font-mono">
              {finalScore >= 85 ? "Excellent! Koneksi otak dan materi sangat stabil. 🌟" : finalScore >= 70 ? "Good Job! Terus asah skill sysadmin dan networking-mu. 👍" : "Critical Error! Bacalah kembali manual jaringan dan server. 💪"}
            </h3>
            <button onClick={() => { setShowModal(false); setView('essay'); window.scrollTo(0,0); }} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg font-mono tracking-widest">CHECK DOCUMENTATION</button>
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