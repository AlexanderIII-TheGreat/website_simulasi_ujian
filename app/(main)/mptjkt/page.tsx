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

// --- DATA SOAL MAPEL PILIHAN TJKT (VALIDATED) ---
const mcqData: MCQ[] = [
  { q: "1. Sebuah perusahaan membutuhkan jaringan yang sangat tahan terhadap kerusakan kabel tunggal. Jika satu kabel putus, data harus tetap bisa terkirim melalui jalur lain. Topologi yang paling tepat adalah...", options: ["A. Bus", "B. Star", "C. Ring", "D. Mesh", "E. Tree"], ans: 3, exp: "Topologi Mesh menyediakan redundancy maksimal karena setiap perangkat terhubung ke banyak perangkat lainnya." },
  { q: "2. Dalam arsitektur jaringan hirarki, lapisan yang berfungsi menghubungkan antar gedung dan melakukan routing antar VLAN disebut...", options: ["A. Access Layer", "B. Distribution Layer", "C. Core Layer", "D. Physical Layer", "E. Data Link Layer"], ans: 1, exp: "Distribution layer menjembatani access layer ke core dan menangani kebijakan routing serta filtering." },
  { q: "3. Administrator ingin menerapkan topologi Star di lab komputer. Perangkat pusat yang wajib ada sebagai konsentrator kabel adalah...", options: ["A. Router", "B. Switch/Hub", "C. Modem", "D. Access Point", "E. Server"], ans: 1, exp: "Topologi Star secara fisik membutuhkan Switch atau Hub sebagai titik pusat koneksi seluruh node." },
  { q: "4. Sebuah PC memiliki IP 192.168.1.50/24, namun gagal ping ke Gateway 192.168.2.1. Letak kesalahan pengalamatan tersebut adalah...", options: ["A. IP Address kelas A salah", "B. Subnet Mask terlalu pendek", "C. Gateway berada di luar subnet yang sama dengan IP host", "D. IP host harusnya angka ganjil", "E. DNS tidak terisi"], ans: 2, exp: "Gateway harus berada dalam satu segmen network yang sama agar dapat menjadi jalur keluar trafik." },
  { q: "5. Untuk menghubungkan 60 komputer dalam satu ruangan agar efisien, subnet mask yang paling tepat dianalisis adalah...", options: ["A. /24", "B. /25", "C. /26", "D. /27", "E. /28"], ans: 2, exp: "/26 memiliki total 64 IP (62 host valid), yang paling mencukupi kebutuhan 60 komputer tanpa membuang banyak alamat." },
  { q: "6. Konversi bilangan desimal 192 ke dalam bilangan biner yang benar adalah...", options: ["A. 11000000", "B. 10101000", "C. 11110000", "D. 10000000", "E. 00000011"], ans: 0, exp: "128 + 64 = 192. Maka bit ke-1 dan ke-2 bernilai satu, sisanya nol." },
  { q: "7. Angka biner 10101000 jika dikonversikan ke desimal menjadi...", options: ["A. 192", "B. 168", "C. 172", "D. 254", "E. 10"], ans: 1, exp: "Hasil penjumlahan dari 128 + 32 + 8 adalah 168." },
  { q: "8. Nilai desimal dari subnet mask /24 adalah...", options: ["A. 255.0.0.0", "B. 255.255.0.0", "C. 255.255.255.0", "D. 255.255.255.252", "E. 255.255.255.128"], ans: 2, exp: "/24 berarti 24 bit biner bernilai satu, yang mengisi 3 oktet pertama secara penuh." },
  { q: "9. Prefiks CIDR yang mewakili subnet mask 255.255.255.240 adalah...", options: ["A. /26", "B. /27", "C. /28", "D. /29", "E. /30"], ans: 2, exp: "Nilai 240 di oktet terakhir menyisakan 4 bit nol (32 - 4 = 28)." },
  { q: "10. Konversi angka desimal 10 ke biner 8-bit adalah...", options: ["A. 00001010", "B. 10100000", "C. 00001111", "D. 11110000", "E. 00000001"], ans: 0, exp: "Angka 10 dibentuk dari bit bernilai 8 dan 2 (00001010)." },
  { q: "11. Mengapa kantor disarankan menggunakan IP Private di jaringan lokal daripada IP Public?", options: ["A. Internet lebih cepat", "B. IP Private gratis dan menghemat alokasi IP Public yang terbatas", "C. IP Private lebih mahal", "D. IP Public tidak mendukung kabel UTP", "E. Agar tidak butuh router"], ans: 1, exp: "IP Private digunakan internal untuk efisiensi biaya dan keamanan karena tidak dapat dirouting langsung di internet." },
  { q: "12. Alamat IP khusus (Loopback) yang digunakan untuk menguji protokol TCP/IP pada perangkat sendiri adalah...", options: ["A. 192.168.1.1", "B. 10.0.0.1", "C. 127.0.0.1", "D. 8.8.8.8", "E. 0.0.0.0"], ans: 2, exp: "127.0.0.1 adalah Loopback Address standar untuk pengujian internal perangkat." },
  { q: "13. Manakah di bawah ini yang termasuk dalam rentang IP Private Kelas B?", options: ["A. 10.0.0.0 - 10.255.255.255", "B. 172.16.0.0 - 172.31.255.255", "C. 192.168.0.0 - 192.168.255.255", "D. 169.254.0.0 - 169.254.255.255", "E. 224.0.0.0 - 239.255.255.255"], ans: 1, exp: "Berdasarkan RFC 1918, range tersebut dikhususkan untuk IP Private kelas B." },
  { q: "14. Pada network 192.168.1.0/24, alamat IP yang valid digunakan untuk Host adalah...", options: ["A. 192.168.1.0", "B. 192.168.1.255", "C. 192.168.1.1 s/d 192.168.1.254", "D. 192.168.1.0 s/d 192.168.1.255", "E. Hanya 192.168.1.1"], ans: 2, exp: "Alamat pertama (Network) dan terakhir (Broadcast) tidak boleh diberikan ke host." },
  { q: "15. Jika Network ID adalah 192.168.10.0/30, berapakah alamat Broadcast-nya?", options: ["A. 192.168.10.1", "B. 192.168.10.2", "C. 192.168.10.3", "D. 192.168.10.4", "E. 192.168.10.255"], ans: 2, exp: "Subnet /30 memiliki total 4 IP. Jika dimulai dari .0, maka .3 adalah IP Broadcast." },
  { q: "16. Teknik membagi satu network besar menjadi beberapa network kecil untuk efisiensi disebut...", options: ["A. Routing", "B. Switching", "C. Subnetting", "D. Masking", "E. Filtering"], ans: 2, exp: "Subnetting membagi trafik broadcast dan menghemat penggunaan alamat IP." },
  { q: "17. Metode pengalamatan yang paling efisien dengan menggunakan panjang mask berbeda sesuai kebutuhan segmen disebut...", options: ["A. Static IP", "B. VLSM (Variable Length Subnet Mask)", "C. Default Classful", "D. DHCP Reservation", "E. DNS Forwarding"], ans: 1, exp: "VLSM memungkinkan fleksibilitas mask dalam satu network induk yang sama." },
  { q: "18. Network 192.168.5.64/26 memiliki Network ID sebesar...", options: ["A. 192.168.5.0", "B. 192.168.5.64", "C. 192.168.5.128", "D. 192.168.5.1", "E. 192.168.5.255"], ans: 1, exp: "Karena 64 adalah kelipatan blok /26 (64), maka alamat .64 adalah Network ID." },
  { q: "19. Berapakah jumlah subnet yang dihasilkan jika network kelas C (/24) di-subnet dengan mask /26?", options: ["A. 2 Subnet", "B. 4 Subnet", "C. 8 Subnet", "D. 16 Subnet", "E. 32 Subnet"], ans: 1, exp: "Penambahan 2 bit subnet (26-24) menghasilkan 2 pangkat 2, yaitu 4 subnet." },
  { q: "20. Pada IP 10.10.10.130/25, alamat Network-nya adalah...", options: ["A. 10.10.10.0", "B. 10.10.10.128", "C. 10.10.10.1", "D. 10.10.10.255", "E. 10.10.10.192"], ans: 1, exp: "/25 membagi network jadi blok 0-127 dan 128-255. Host 130 masuk blok kedua yang dimulai dari .128." },
  { q: "21. Lapisan model OSI yang bertanggung jawab atas pengiriman data End-to-End dan error recovery adalah...", options: ["A. Physical Layer", "B. Network Layer", "C. Transport Layer", "D. Application Layer", "E. Session Layer"], ans: 2, exp: "Transport layer (TCP/UDP) mengelola keandalan pengiriman data antar host." },
  { q: "22. Switch Layer 2 bekerja pada lapisan OSI nomor...", options: ["A. 1", "B. 2", "C. 3", "D. 4", "E. 7"], ans: 1, exp: "Layer 2 adalah Data Link Layer, di mana switch memproses MAC Address." },
  { q: "23. Protokol HTTP dan FTP bekerja pada OSI Layer...", options: ["A. Physical", "B. Network", "C. Transport", "D. Application", "E. Data Link"], ans: 3, exp: "Application layer menyediakan interface langsung antara user dan layanan jaringan." },
  { q: "24. Perangkat Router bekerja pada OSI Layer ke...", options: ["A. 1", "B. 2", "C. 3", "D. 4", "E. 5"], ans: 2, exp: "Router memproses alamat logika (IP) yang berada pada Network Layer (Layer 3)." },
  { q: "25. Kabel UTP dan Fiber Optic didefinisikan fungsinya pada OSI Layer...", options: ["A. Application", "B. Physical", "C. Network", "D. Session", "E. Transport"], ans: 1, exp: "Physical layer menangani transmisi bit data melalui media fisik." },
  { q: "26. Perintah Cisco IOS untuk masuk dari User Mode ke Privileged Mode adalah...", options: ["A. configure terminal", "B. enable", "C. interface fa0/1", "D. show ip interface brief", "E. login"], ans: 1, exp: "Perintah 'enable' digunakan untuk berpindah ke mode administratif." },
  { q: "27. Perintah untuk menyimpan konfigurasi yang sedang berjalan agar tidak hilang saat restart adalah...", options: ["A. copy running-config startup-config", "B. save configuration", "C. reload", "D. write erase", "E. exit"], ans: 0, exp: "Ini menyalin konfigurasi dari RAM ke NVRAM yang bersifat permanen." },
  { q: "28. Jenis routing yang konfigurasinya dilakukan secara manual untuk setiap network tujuan adalah...", options: ["A. OSPF", "B. RIP", "C. Static Route", "D. BGP", "E. EIGRP"], ans: 2, exp: "Static route dikonfigurasi manual oleh administrator jaringan." },
  { q: "29. Alamat rute '0.0.0.0 0.0.0.0' pada tabel routing disebut...", options: ["A. Static Route", "B. Default Route", "C. Loopback Route", "D. Connected Route", "E. Floating Route"], ans: 1, exp: "Default route meneruskan semua paket ke gateway internet jika rute spesifik tidak ditemukan." },
  { q: "30. Keuntungan utama Dynamic Routing pada jaringan berskala besar adalah...", options: ["A. Mudah dikonfigurasi di router tunggal", "B. Hemat penggunaan CPU", "C. Mencari jalur alternatif secara otomatis (Redundancy)", "D. Lebih aman", "E. Murah"], ans: 2, exp: "Protokol dinamis mendeteksi kegagalan jalur dan mengalihkan trafik tanpa campur tangan manual." },
  { q: "31. Salah satu kekurangan dari protokol OSPF dibandingkan RIP adalah...", options: ["A. Lambat konvergensi", "B. Konsumsi CPU dan RAM lebih besar", "C. Hanya untuk router Cisco", "D. Maksimal 15 hop", "E. Tidak mendukung VLSM"], ans: 1, exp: "OSPF membutuhkan resource lebih tinggi karena menyimpan database topologi yang kompleks." },
  { q: "32. Proses router OSPF mengirim paket 'Hello' untuk mencari router tetangga disebut...", options: ["A. Routing Update", "B. Neighbor Discovery", "C. LSA Flooding", "D. SPF Calculation", "E. Election"], ans: 1, exp: "Neighbor discovery membangun hubungan adjacency antar router." },
  { q: "33. Tabel yang berisi daftar jalur terbaik (Best Path) hasil kalkulasi SPF adalah...", options: ["A. Neighbor Table", "B. Database Table", "C. Routing Table", "D. ARP Table", "E. MAC Table"], ans: 2, exp: "Routing table menyimpan rute terpilih menuju network destination." },
  { q: "34. Parameter 'Process ID' pada konfigurasi OSPF Cisco digunakan untuk...", options: ["A. Menentukan alamat IP", "B. Membedakan proses OSPF lokal di satu router", "C. Menentukan wilayah Area", "D. Mengatur password", "E. Cek speed"], ans: 1, exp: "Process ID bersifat lokal dan tidak harus sama dengan router tetangga." },
  { q: "35. Perintah 'ip address 192.168.1.1 255.255.255.0' dimasukkan pada mode...", options: ["A. Global Configuration", "B. Interface Configuration", "C. Line Configuration", "D. Privileged Exec", "E. ROMMON"], ans: 1, exp: "Alamat IP harus dikonfigurasi langsung pada interface fisik atau virtual." },
  { q: "36. Status OSPF 'ExStart/Exchange' yang macet biasanya mengindikasikan masalah...", options: ["A. Kabel putus", "B. Ketidakcocokan nilai MTU", "C. Router mati", "D. Password salah", "E. Area ID beda"], ans: 1, exp: "Proses sinkronisasi database (LSDB) gagal jika nilai MTU antar sisi tidak sama." },
  { q: "37. Manakah di bawah ini yang merupakan protokol Interior Gateway Protocol (IGP)?", options: ["A. BGP", "B. OSPF", "C. HTTP", "D. DNS", "E. NAT"], ans: 1, exp: "OSPF digunakan untuk routing di dalam satu AS (Internal)." },
  { q: "38. Algoritma penentuan jalur terpendek yang digunakan oleh protokol OSPF adalah...", options: ["A. Bellman-Ford", "B. DUAL", "C. Dijkstra (SPF)", "D. Round Robin", "E. FIFO"], ans: 2, exp: "Algoritma SPF (Shortest Path First) dikembangkan oleh Edsger Dijkstra." },
  { q: "39. Admin ingin agar server lokal dapat diakses dari internet melalui satu IP Public router. Jenis NAT yang digunakan adalah...", options: ["A. Dynamic NAT", "B. Static NAT", "C. PAT", "D. NAT Pooling", "E. Redirect"], ans: 1, exp: "Static NAT melakukan pemetaan satu-ke-satu antara IP privat dan publik." },
  { q: "40. Keuntungan utama menggunakan NAT pada jaringan adalah...", options: ["A. Internet 2x lebih cepat", "B. Mengurangi latensi", "C. Menghemat IP Public dan meningkatkan keamanan dasar", "D. Tanpa kabel FO", "E. Router dingin"], ans: 2, exp: "NAT menyembunyikan struktur internal jaringan dan mengefisiensi alamat publik." }
];

const essayData: Essay[] = [
  { q: "1. Sebutkan 3 hal utama yang harus dipertimbangkan sebelum memberikan pengalamatan IP pada jaringan kantor!", exp: "1) <b>Subnetting</b>: Memilih mask yang efisien sesuai jumlah user. 2) <b>Segmentasi</b>: Pemisahan blok IP untuk server dan user. 3) <b>Gateway & DNS</b>: Memastikan jalur keluar internet valid." },
  { q: "2. Analisislah penyebab lampu indikator port switch mati saat kabel UTP dicolokkan!", exp: "Kemungkinan: Kabel UTP putus di dalam, konektor RJ-45 tidak terkrimping sempurna, atau terjadi kerusakan fisik pada port perangkat." },
  { q: "3. Apa solusi teknis jika LAN Tester menunjukkan lampu 1, 2, 3, dan 6 tidak menyala?", exp: "Melakukan <b>Re-crimping</b> dengan memotong konektor lama dan memasang konektor RJ-45 baru sesuai urutan standar T568B secara presisi." },
  { q: "4. Jelaskan langkah upgrade jika jaringan sekolah lambat saat jam sibuk!", exp: "Mengganti Switch lama dengan <b>Gigabit Switch</b> (1000 Mbps) dan memastikan kabel yang digunakan minimal Kategori 5e atau 6." },
  { q: "5. Buatlah desain logika singkat untuk menghubungkan kantor pusat (Gedung A) dan cabang (Gedung B)!", exp: "Gunakan 2 buah Router, hubungkan dengan kabel Fiber Optic, dan gunakan segmen IP Private berbeda (misal .1.0/24 dan .2.0/24) dengan routing OSPF." }
];

export default function SimulasiMapelTJKT() {
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
    <div className="min-h-screen bg-slate-900 py-12 px-4 font-sans text-slate-100 flex flex-col items-center">
      {view === 'landing' && (
        <div className="bg-slate-800 rounded-3xl p-10 md:p-16 shadow-2xl text-center max-w-2xl w-full border-t-8 border-blue-500 animate-fade-in-up">
          <div className="text-6xl mb-6">🛰️💻</div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight uppercase">Simulasi Mapel Pilihan TJKT</h1>
          <p className="text-slate-300 mb-8 text-lg">Uji penguasaan Subnetting, OSI Layer, Cisco IOS, dan Protokol OSPF sesuai kurikulum industri.</p>
          <button onClick={handleStart} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:-translate-y-1 tracking-widest">INITIATE NETWORK TEST</button>
        </div>
      )}

      {view === 'quiz' && (
        <div className="bg-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl max-w-3xl w-full border-l-4 border-blue-500 animate-fade-in-up">
          <div className="flex justify-between items-center mb-3 text-blue-400 font-mono font-bold text-sm">
            <span>PACKET: {currentIndex + 1} / {mcqData.length}</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3 mb-8 overflow-hidden shadow-inner">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full transition-all duration-500" style={{ width: `${((currentIndex + 1) / mcqData.length) * 100}%` }}></div>
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-8 leading-relaxed font-mono">{mcqData[currentIndex].q}</h2>
          <div className="flex flex-col gap-3 font-mono">
            {mcqData[currentIndex].options.map((opt, i) => {
              const hasAnswered = answers[currentIndex] !== null;
              const isCorrect = i === mcqData[currentIndex].ans;
              const isSelected = i === answers[currentIndex];
              let btnClass = "text-left p-4 rounded-xl border-2 transition-all ";
              if (!hasAnswered) btnClass += "border-slate-600 bg-slate-700 hover:border-blue-500 hover:bg-slate-600 cursor-pointer";
              else btnClass += isCorrect ? "border-emerald-500 bg-emerald-900/30 text-emerald-400 font-bold" : isSelected ? "border-rose-500 bg-rose-900/30 text-rose-400" : "border-slate-800 opacity-40";
              return <button key={i} onClick={() => handleAnswer(i)} disabled={hasAnswered} className={btnClass}>{opt}</button>;
            })}
          </div>
          {answers[currentIndex] !== null && (
            <div className="mt-8 p-6 rounded-2xl bg-slate-900/50 border border-blue-900/50 animate-fade-in">
              <h4 className="font-bold text-blue-400 mb-2 font-mono tracking-tighter">Debug Log:</h4>
              <p className="text-slate-300 italic font-mono">{mcqData[currentIndex].exp}</p>
            </div>
          )}
          <div className="mt-8 flex justify-end">
            {answers[currentIndex] !== null && <button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-xl shadow-lg transition-transform hover:scale-105 font-mono uppercase">{currentIndex === mcqData.length - 1 ? 'End Session' : 'Next Packet'}</button>}
          </div>
        </div>
      )}

      {view === 'essay' && (
        <div className="bg-slate-800 rounded-3xl p-8 md:p-12 shadow-xl max-w-4xl w-full border-t-8 border-blue-500 animate-fade-in-up">
          <h2 className="text-3xl font-extrabold text-white mb-8 text-center tracking-tight font-mono uppercase">Network Infrastructure Docs (Esai)</h2>
          <div className="flex flex-col gap-6 font-mono">
            {essayData.map((item, index) => (
              <div key={index} className="bg-slate-900/40 border border-slate-700 p-6 rounded-2xl">
                <h3 className="font-bold text-blue-400 mb-4 text-lg border-b border-blue-900/50 pb-2">{item.q}</h3>
                <p className="text-slate-300 leading-loose" dangerouslySetInnerHTML={{ __html: item.exp }} />
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <button onClick={handleStart} className="bg-slate-700 hover:bg-slate-600 text-blue-400 font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:-translate-y-1 border border-blue-900/50 uppercase font-mono">Re-deploy Test</button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50 p-4 animate-fade-in">
          <div className="bg-slate-800 rounded-3xl p-10 text-center max-w-md w-full shadow-2xl border-4 border-blue-600">
            <div className="text-5xl mb-4 font-mono text-blue-500">{"<SCORE_VAL>"}</div>
            <h2 className="text-2xl font-bold text-white mb-2 font-mono uppercase tracking-widest">Network Analysis Terminated</h2>
            <p className="text-slate-400 mb-8 font-mono italic">Packet Delivery Success Rate:</p>
            <div className="relative w-44 h-44 mx-auto mb-8 flex justify-center items-center rounded-full shadow-inner border-8 border-slate-700" style={{ background: `conic-gradient(#3b82f6 ${finalScore}%, #1e293b 0)` }}>
              <div className="absolute inset-3 bg-slate-800 rounded-full flex justify-center items-center shadow-lg"><span className="text-6xl font-black text-blue-400 font-mono tracking-tighter">{finalScore}</span></div>
            </div>
            <h3 className="text-lg font-bold text-slate-300 mb-8 px-4 font-mono uppercase">
              {finalScore >= 85 ? "Luar Biasa! Jaringan otak Anda beroperasi di Gigabit Speed. 🌟" : finalScore >= 70 ? "Bagus! Konfigurasi materi sudah cukup stabil. 👍" : "Critical Failure! Terjadi Packet Loss pada pemahaman materi. 💪"}
            </h3>
            <button onClick={() => { setShowModal(false); setView('essay'); window.scrollTo(0,0); }} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg font-mono tracking-widest">OPEN ARCHIVE DOCS</button>
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