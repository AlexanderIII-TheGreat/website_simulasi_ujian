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

// --- DATA SOAL BAHASA JAWA ---
const mcqData: MCQ[] = [
  { q: "1. Tembang macapat iku cacahe ana 11. Ing ngisor iki kang kalebu jenis tembang macapat yaiku ...", options: ["A. Langgam", "B. Keroncong", "C. Campursari", "D. Sinom", "E. Lelagon"], ans: 3, exp: "Tembang macapat ana 11: Mijil, Kinanthi, Sinom, Asmaradana, Dhandhanggula, Gambuh, Maskumambang, Durma, Pangkur, Megatruh, lan Pocung." },
  { q: "2. Cacahe wanda (suku kata) saben sagatra sajrone tembang macapat diarani ...", options: ["A. Guru gatra", "B. Guru lagu", "C. Guru wilangan", "D. Guru swara", "E. Guru basa"], ans: 2, exp: "Guru wilangan yaiku cacahe wanda saben sagatra. Guru gatra yaiku cacahe baris saben sapada, dene guru lagu yaiku tibaning swara ing pungkasaning gatra." },
  { q: "3. 'Dina Minggu, 12 Mei 2026 jam 08.00 WIB, warga Desa Mondokan nganakake kerja bakti ngresiki kalen.' Unsur 'Kapan' (When) sajrone pethilan pawarta kasebut yaiku ...", options: ["A. Warga Desa Mondokan", "B. Dina Minggu, 12 Mei 2026", "C. Kerja bakti", "D. Ngresiki kalen", "E. Ing Desa Mondokan"], ans: 1, exp: "Unsur 'Kapan' nuduhake wektu kedadeyan, yaiku Dina Minggu, 12 Mei 2026." },
  { q: "4. Perangan sesorah kang isine ngucapake salam marang para tamu kang rawuh diarani ...", options: ["A. Salam pambuka", "B. Purwaka basa", "C. Surasa basa", "D. Wasana basa", "E. Salam panutup"], ans: 0, exp: "Salam pambuka yaiku salam kang diucapake ing wiwitan sesorah (contone: Assalamu'alaikum, Sugeng enjang)." },
  { q: "5. Wong tuwa marang wong enom kang diajeni (dihormati) amarga nduweni pangkat kang luwih dhuwur nggunakake ragam basa ...", options: ["A. Ngoko Lugu", "B. Ngoko Alus", "C. Krama Lugu", "D. Krama Alus", "E. Krama Desa"], ans: 1, exp: "Ngoko alus digunakake dening wong tuwa marang wong enom kang diajeni/dihormati (pangkat/kedudukan)." },
  { q: "6. Tokoh Pandhawa lima sing kembar yaiku ...", options: ["A. Yudhistira lan Bima", "B. Arjuna lan Karna", "C. Nakula lan Sadewa", "D. Bima lan Arjuna", "E. Yudhistira lan Sadewa"], ans: 2, exp: "Nakula lan Sadewa iku satriya kembar Pandhawa anake Prabu Pandhu Dewanata karo Dewi Madrim." },
  { q: "7. Geguritan kang isih kaiket dening aturan guru gatra, guru lagu, lan guru wilangan diarani ...", options: ["A. Geguritan gagrag lawas", "B. Geguritan gagrag anyar", "C. Tradhisional", "D. Gancaran", "E. Pacelathon"], ans: 0, exp: "Geguritan gagrag lawas nduweni paugeran (aturan) tartamtu, dene gagrag anyar luwih bebas." },
  { q: "8. Paraga ing sandiwara kang nduweni watak becik, jujur, lan dadi lakon utama diarani ...", options: ["A. Antagonis", "B. Tritagonis", "C. Protagonis", "D. Figuran", "E. Sutradara"], ans: 2, exp: "Protagonis yaiku paraga kang nduweni watak utama kang becik." },
  { q: "9. Serat Wedhatama iku karya sastra kang misuwur banget, dianggit dening ...", options: ["A. Sri Susuhunan Pakubuwana IV", "B. Sri Sultan Hamengkubuwana IV", "C. R.Ng. Ranggawarsita", "D. KGPAA Mangkunegara IV", "E. Yasadipura"], ans: 3, exp: "Serat Wedhatama ditulis dening Kanjeng Gusti Pangeran Adipati Arya (KGPAA) Mangkunegara IV." },
  { q: "10. Artikel kang isine nggambarake sawijining kahanan kanthi cetha saengga pamaca kaya-kaya weruh dhewe diarani ...", options: ["A. Narasi", "B. Argumentasi", "C. Persuasi", "D. Eksposisi", "E. Dheskripsi"], ans: 4, exp: "Artikel deskripsi tujuane menehi gambaran visual utawa kahanan samubarang marang pamaca." },
  { q: "11. 'Bapak Kepala Sekolah ingkang satuhu kinurmatan.' Ragam basa kang digunakake ing pambuka sesorah kasebut yaiku ...", options: ["A. Ngoko Lugu", "B. Ngoko Alus", "C. Krama Lugu", "D. Krama Alus", "E. Kedhaton"], ans: 3, exp: "Nggunakake tembung-tembung krama inggil (kinurmatan) kanggo ngajeni paraga, mula kalebu Krama Alus." },
  { q: "12. Ukara Ngoko Lugu 'Kowe mau bengi apa wis mangan?' yen diowahi dadi Ngoko Alus yaiku ...", options: ["A. Panjenengan mau bengi apa wis dhahar?", "B. Kowe mau bengi apa wis dhahar?", "C. Panjenengan wau dalu punapa sampun nedha?", "D. Sampeyan mau bengi apa wis nedha?", "E. Panjenengan wau dalu punapa sampun dhahar?"], ans: 0, exp: "Ngoko alus nggunakake 'Panjenengan' nanging kriya (mangan) diganti krama inggil (dhahar)." },
  { q: "13. 'Ngelmu iku kalakone kanthi laku.' Makna filosofis saka gatra pethilan tembang Pocung kasebut yaiku ...", options: ["A. Golek ilmu iku kudu pinter", "B. Ilmu iku digayuh kanthi tumindak utawa proses nyata", "C. Ilmu iku kudu disinauni saben wektu", "D. Golek ilmu kudu wani rekasa", "E. Wong ilmu bakal sukses"], ans: 1, exp: "Tegese 'kalakone kanthi laku' yaiku ilmu ora mung teori, nanging kudu dipraktekake utawa dilakoni." },
  { q: "14. 'Gunung njeblug, ombak gedhe padha ngguyu.' Geguritan kasebut nggunakake majas ...", options: ["A. Metafora", "B. Hiperbola", "C. Personifikasi", "D. Ironi", "E. Simile"], ans: 2, exp: "Personifikasi yaiku ngibaratake barang mati kaya manungsa (bisa ngguyu)." },
  { q: "15. Ing ngisor iki kang kalebu panemu (opini) wartawan sing nerak (melanggar) etika jurnalistik yaiku ...", options: ["A. Nulis adhedhasar fakta", "B. Nyelipake tuduhan pribadi marang salah siji pihak", "C. Nggunakake basa baku", "D. Wawancara karo narasumber", "E. Nulis wektu kedadeyan"], ans: 1, exp: "Wartawan kudu netral lan objektif, ora kena nyampurake fakta karo tuduhan pribadi." },
  { q: "16. Kumbakarna tetep dianggep pahlawan sanajan mbelani Ngalengka amarga dheweke ...", options: ["A. Mbelani Rahwana kang salah", "B. Kepengin entuk pangkat", "C. Mbelani tanah wutah getihe (negara), dudu mbelani angkara murka", "D. Sengit marang Rama", "E. Dipaksa prajurit"], ans: 2, exp: "Kumbakarna dadi patuladhan amarga rasa nasionalisme mbelani negara Ngalengka, sanajan ngerti Rahwana salah." },
  { q: "17. Kedaling lesan, artikulasi, lan unjal napas nalika dadi pranatacara diarani teknik ...", options: ["A. Wirama (Olah Swara)", "B. Wiraga (Olah Bawa)", "C. Wirasa (Olah Rasa)", "D. Olah busana", "E. Olah basa"], ans: 0, exp: "Wirama utawa olah swara gegayutan karo vokalisasi lan cethaning pangucap." },
  { q: "18. Bapak marang anak nggunakake basa Ngoko Lugu. Tembung sing bener yaiku ...", options: ["A. Pundhutna", "B. Jupukna", "C. Kula aturi mendhet", "D. Dipunpendhet", "E. Pundhutaken"], ans: 1, exp: "Ngoko lugu nggunakake tembung kriya kasar utawa lugu, yaiku 'Jupukna'." },
  { q: "19. 'Kopi Jreeng! Rasane nendhang nganti tekan langit pitu!' Pariwara kasebut nggunakake majas ...", options: ["A. Metafora", "B. Sindiran", "C. Hiperbola", "D. Simile", "E. Ironi"], ans: 2, exp: "Hiperbola yaiku nggambarake samubarang kanthi leluwihan (nganti tekan langit pitu)." },
  { q: "20. Ing lakon 'Sinta Obong', Dewi Sinta mlebu geni kanggo mbuktekake ...", options: ["A. Kasetyan lan kasucianing dhiri", "B. Kekuwatane", "C. Yen dadi bojone Rahwana", "D. Kanggo mateni prajurit", "E. Kuciwane marang Anoman"], ans: 0, exp: "Sinta obong minangka simbol pembuktian kasetyan lan kasucian Sinta marang Prabu Rama." },
  { q: "21. Argumen sing trep kanggo artikel 'Pangolahan Sampah ing Sekolah' yaiku ...", options: ["A. Sampah dipilah dadi organik lan anorganik supaya bisa didaur ulang", "B. Sampah kudu diobong", "C. Siswa kudu bayar dhendha", "D. Sekolah nggantungake tukang kebon", "E. Murid ora nggawa jajan"], ans: 0, exp: "Argumen sing logis yaiku menehi solusi pemilahan sampah kanggo njaga lingkungan." },
  { q: "22. Pituduh laku sajrone naskah sandiwara kang ditulis ing njero kurung diarani ...", options: ["A. Prolog", "B. Epilog", "C. Dialog", "D. Kramagung", "E. Monolog"], ans: 3, exp: "Kramagung yaiku petunjuk gerak utawa ekspresi tokoh ing naskah drama." },
  { q: "23. 'Srengenge wis angslup ing kulon, dalan wis sepi.' Latar wektu lan swasana pethilan cerkak kasebut yaiku ...", options: ["A. Esuk, sepi", "B. Sore, regeng", "C. Surup (sore), sepi", "D. Bengi, medeni", "E. Awan, sumuk"], ans: 2, exp: "Srengenge angslup tegese sore utawa surup, kahanan dalan sepi nuduhake swasana tintrim." },
  { q: "24. Tembang macapat Kinanthi nduweni watak ...", options: ["A. Sedhih", "B. Seneng, asih, lan mituturi", "C. Sereng, nepsu", "D. Guyonan", "E. Kejam"], ans: 1, exp: "Kinanthi nduweni watak seneng lan tresna asih, cocog kanggo menehi pitutur (nasihat)." },
  { q: "25. Tegese watak 'Adigung' sajrone pupuh Gambuh yaiku ...", options: ["A. Ngendelake kekuwatane", "B. Ngendelake kaluhurane/kasugihane", "C. Ngendelake kepinterane", "D. Seneng pamer", "E. Seneng gawe serik"], ans: 1, exp: "Adigang (kidang/fisik), Adigung (gajah/pangkat-bandha), Adiguna (ula/kepinteran)." },
  { q: "26. Slogan sing persuasif kanggo nglestarekake basa Jawa yaiku ...", options: ["A. Basa Jawa iku kuna", "B. Sapa ora bisa basa Jawa diukum", "C. Basa Jawa iku angel", "D. Lestarèkaké budayamu, guneman nganggo basa Jawa!", "E. Basa Jawa kanggo wong tuwa"], ans: 3, exp: "Opsi D ngajak (persuasi) kanthi cara sing positif kanggo njaga budaya." },
  { q: "27. Struktur plot novel nalika perkara wiwit dadi ruwet lan puncak masalah diarani ...", options: ["A. Orientasi", "B. Komplikasi", "C. Resolusi", "D. Reorientasi", "E. Koda"], ans: 1, exp: "Komplikasi yaiku bagean alur sing nuduhake anane konflik utawa masalah." },
  { q: "28. Teknik maca geguritan sing gegayutan karo obahing awak lan ekspresi wajah yaiku ...", options: ["A. Wicara", "B. Wirama", "C. Wirasa", "D. Wiraga", "E. Wicaksana"], ans: 3, exp: "Wiraga tegese olah raga utawa obahing awak nalika maca geguritan." },
  { q: "29. Sujono seneng tetulung nanging ora tau pamer. Nilai pendidikan karakter kasebut yaiku ...", options: ["A. Sombong", "B. Pinter nanging pelit", "C. Tulung-tinulung lan andhap asor", "D. Sugih lan pamer", "E. Seneng dhewe"], ans: 2, exp: "Sikap Sujono nuduhake watak luhur yaiku andhap asor (rendah hati) lan gelem tetulung." },
  { q: "30. Ukara sing nerak (salah) unggah-ungguh basa tumrap awake dhewe yaiku ...", options: ["A. Kula sampun nedha", "B. Kula badhe siram rumiyin", "C. Kula nembe wangsul", "D. Kula badhe tilem", "E. Kula boten mangertos"], ans: 1, exp: "Tembung 'siram' iku krama inggil kanggo wong liya, kanggo awake dhewe kudu 'adus'." },
  { q: "31. Ragam basa sing trep digunakake Ketua OSIS nalika sambutan ing ngarep Guru yaiku ...", options: ["A. Ngoko Lugu", "B. Ngoko Alus", "C. Krama Alus", "D. Krama Lugu", "E. Basa pasaran"], ans: 2, exp: "Murid marang guru kudu nggunakake Krama Alus minangka wujud kurmat." },
  { q: "32. Makna filosofis upacara adat Tedhak Siten yaiku ...", options: ["A. Bocah cepet rabi", "B. Pangarep-arep supaya bocah mandhiri ngadhepi urip", "C. Buwang sial", "D. Pengetan ulang taun", "E. Asal saka lemah"], ans: 1, exp: "Tedhak siten (mudhun lemah) minangka simbol ngenalake bocah marang alam supaya mbesuke mandhiri." },
  { q: "33. 'Bapak sampun wangsul saking kantor.' Ukara sing luwih bener yaiku ...", options: ["A. Bapak sampun kondur saking kantor", "B. Bapak wis bali", "C. Bapak sampun mulih", "D. Bapak nembe wangsul", "E. Bapak sampun kesah"], ans: 0, exp: "Kanggo bapak (wong sing diajeni) tembung sing bener 'kondur', dudu 'wangsul'." },
  { q: "34. Tembang Pangkur nggambarake kahanan manungsa kang kudu ...", options: ["A. Seneng-seneng", "B. Mungkur (nyingkiri) hawa napsu", "C. Golek bandha", "D. Golek pangkat", "E. Mati"], ans: 1, exp: "Pangkur asale saka tembung 'mungkur', tegese manungsa kudu wiwit nyingkiri hawa napsu donyawi." },
  { q: "35. Tegese asas 'cover both side' sajrone nulis pawarta yaiku ...", options: ["A. Siji narasumber", "B. Nutupi kesalahan", "C. Adil lan seimbang saka rong pihak", "D. Nggedhekake masalah", "E. Maca ngarep mburi"], ans: 2, exp: "Cover both side tegese menehi porsi informasi sing padha marang pihak-pihak sing dadi sumber berita." },
  { q: "36. Geguritan kang isine nyemoni (nyindir) kahanan masarakat diarani geguritan ...", options: ["A. Ode", "B. Elegi", "C. Romansa", "D. Satire", "E. Balada"], ans: 3, exp: "Satire yaiku puisi sing ngandhut sindiran utawa kritik sosial." },
  { q: "37. Adipati Karna mbelani Kurawa amarga netepi darmaning ksatria lan ...", options: ["A. Musuh Arjuna", "B. Kepengin dadi raja", "C. Males budi kabecikane Duryudana", "D. Diancam dipateni", "E. Ora ngerti sadulure"], ans: 2, exp: "Karna mbelani Duryudana amarga rasa utang budi wis diangkat drajate." },
  { q: "38. Tembung geguritan asale saka lingga 'gurit' kang tegese ...", options: ["A. Tembang", "B. Tulisan utawa tatahan", "C. Omongan", "D. Sindiran", "E. Sastra"], ans: 1, exp: "Gurit tegese tulisan utawa coretan ing jaman biyen." },
  { q: "39. Sikap sing bener nalika nanggapi basa kasar ing media sosial yaiku ...", options: ["A. Melu misuh", "B. Pura-pura ora weruh", "C. Tetep nggunakake basa sing sopan", "D. Ngelaporake kabeh wong", "E. Nge-hack akun"], ans: 2, exp: "Unggah-ungguh basa tetep kudu dijaga sanajan ana ing media sosial." },
  { q: "40. Fungsi utama 'Gunungan' ing pagelaran wayang yaiku ...", options: ["A. Gaman dhalang", "B. Tandha dhalang ngombe", "C. Nggambarake angin", "D. Tandha pambuka, panutup, lan ganti adegan", "E. Simbol kewan"], ans: 3, exp: "Gunungan utawa kayon digunakake dhalang minangka transisi adegan lan pambuka/panutup." }
];

const essayData: Essay[] = [
  { q: "41. Sebutna lan jelasna filosofi saka tembang Maskumambang, Mijil, lan Pocung!", exp: "<b>Maskumambang:</b> Nggambarake jabang bayi sing isih kumambang ing kandhungan ibune.<br/><b>Mijil:</b> Nggambarake bayi sing wis mijil utawa lair ing donya.<br/><b>Pocung:</b> Nggambarake pungkasaning urip manungsa nalika wis mati lan dipocong." },
  { q: "42. Gawea teks perangan Salam Pambuka lan Atur Pakurmatan pranatacara perpisahan sekolah!", exp: "<b>Salam Pambuka:</b> Assalamu'alaikum Wr. Wb. Sugeng enjang.<br/><b>Atur Pakurmatan:</b> Dhumateng Bapak Kepala Sekolah ingkang kinurmatan. Bapak Ibu Guru ingkang pantes sinudarsana. Sarta kanca-kanca kelas XII ingkang kula tresnani." },
  { q: "43. Owahana ukara iki dadi Krama Alus: 'Simbah lagi lara untu, mulane ora bisa mangan sega sing atos.'", exp: "<b>Krama Alus:</b> Eyang nembe gerah waja, pramila boten saged dhahar sekul ingkang atos." },
  { q: "44. Sebutna lan jelasna apa sing diarani 4W nalika maca geguritan!", exp: "<b>Wicara:</b> Cethaning pangucap.<br/><b>Wirama:</b> Irama utawa lagu swara.<br/><b>Wirasa:</b> Penghayatan utawa ekspresi emosi.<br/><b>Wiraga:</b> Patrap utawa obahing awak." },
  { q: "45. Tulisen ukara 'Bapak maca koran ing teras' nganggo Aksara Jawa!", exp: "<b>Jawaban:</b> ꦧꦥꦏ꧀ꦩꦕꦏꦺꦴꦫꦤ꧀ꦲꦶꦁꦠꦺꦫꦱ꧀" }
];

export default function SimulasiBahasaJawa() {
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
      const newAnswers = [...prev];
      newAnswers[currentIndex] = index;
      return newAnswers;
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

  const handleGoToEssays = () => {
    setShowModal(false);
    setView('essay');
    window.scrollTo(0, 0);
  };

  const finalScore = Math.round((score / mcqData.length) * 100);

  return (
    <div className="min-h-screen bg-[#fdfaf1] py-12 px-4 font-sans text-slate-900 flex flex-col items-center border-t-8 border-amber-600">
      {view === 'landing' && (
        <div className="bg-white rounded-3xl p-10 md:p-16 shadow-xl text-center max-w-2xl w-full mx-auto animate-fade-in-up">
          <div className="text-6xl mb-6">🎭</div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-amber-800 mb-4">Simulasi PSAJ Bahasa Jawa</h1>
          <p className="text-slate-600 mb-8 text-lg">Uji kawruhmu babagan tembang macapat, unggah-ungguh basa, wayang, lan sastra Jawa. Kasedhiya 40 soal pilihan ganda lan 5 uraian.</p>
          <button onClick={handleStart} className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:-translate-y-1">Mulai Pasinaon</button>
        </div>
      )}

      {view === 'quiz' && (
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl max-w-3xl w-full mx-auto animate-fade-in-up">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-bold text-amber-600 uppercase">Pitakonan {currentIndex + 1} / {mcqData.length}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full transition-all duration-500" style={{ width: `${((currentIndex + 1) / mcqData.length) * 100}%` }}></div>
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-slate-800 mb-8 leading-relaxed">{mcqData[currentIndex].q}</h2>
          <div className="flex flex-col gap-3">
            {mcqData[currentIndex].options.map((opt, i) => {
              const isCorrect = i === mcqData[currentIndex].ans;
              const isSelected = i === answers[currentIndex];
              const hasAnswered = answers[currentIndex] !== null;
              let btnClass = "text-left p-4 rounded-xl border-2 transition-all ";
              if (!hasAnswered) btnClass += "border-slate-200 bg-white hover:border-amber-500 hover:bg-amber-50 cursor-pointer";
              else btnClass += isCorrect ? "border-emerald-500 bg-emerald-50 text-emerald-800" : isSelected ? "border-rose-500 bg-rose-50 text-rose-800" : "border-slate-100 opacity-50";
              return <button key={i} onClick={() => handleAnswer(i)} disabled={hasAnswered} className={btnClass}>{opt}</button>;
            })}
          </div>
          {answers[currentIndex] !== null && (
            <div className="mt-8 p-6 rounded-2xl bg-amber-50 border border-amber-200 animate-fade-in">
              <h4 className="font-bold text-amber-800 mb-2">Andharane (Penjelasan):</h4>
              <p className="text-slate-700">{mcqData[currentIndex].exp}</p>
            </div>
          )}
          <div className="mt-8 flex justify-between">
            <button onClick={handlePrevious} disabled={currentIndex === 0} className={`font-bold py-3 px-6 rounded-xl ${currentIndex === 0 ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-slate-500 text-white hover:bg-slate-600'}`}>Sadurunge</button>
            {answers[currentIndex] !== null && <button onClick={handleNext} className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-xl">{currentIndex === mcqData.length - 1 ? 'Selesai' : 'Sabanjure'}</button>}
          </div>
        </div>
      )}

      {view === 'essay' && (
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl max-w-4xl w-full mx-auto animate-fade-in-up">
          <h2 className="text-3xl font-extrabold text-amber-800 mb-6 text-center tracking-tight">Kunci Jawaban Uraian (Esai)</h2>
          <div className="flex flex-col gap-6">
            {essayData.map((item, index) => (
              <div key={index} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                <h3 className="font-bold text-amber-900 mb-4 text-lg border-b border-amber-200 pb-2">{item.q}</h3>
                <p className="text-slate-700 leading-loose" dangerouslySetInnerHTML={{ __html: item.exp }} />
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <button onClick={handleStart} className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:-translate-y-1">Mbaleni Simulasi</button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md flex justify-center items-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-10 text-center max-w-md w-full shadow-2xl transform scale-100 transition-transform border-4 border-amber-500">
            <div className="text-5xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Simulasi Rampung!</h2>
            <p className="text-slate-500 mb-8 tracking-wide">Hasil kawruhmu babagan basa Jawa yaiku:</p>
            <div className="relative w-44 h-44 mx-auto mb-8 flex justify-center items-center rounded-full shadow-inner border-8 border-slate-50" style={{ background: `conic-gradient(#d97706 ${finalScore}%, #e2e8f0 0)` }}>
              <div className="absolute inset-3 bg-white rounded-full flex justify-center items-center shadow-lg"><span className="text-6xl font-black text-amber-600">{finalScore}</span></div>
            </div>
            <h3 className="text-lg font-bold text-slate-700 mb-8 px-4 leading-relaxed">{finalScore >= 85 ? "Mumpuni banget! Engkau prigel ing basa lan sastra Jawa. 🌟" : finalScore >= 70 ? "Apik banget! Terus sinau supaya luwih prigel. 👍" : "Aja mutung! Terus sinau supaya budayamu ora ilang. 💪"}</h3>
            <button onClick={handleGoToEssays} className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:-translate-y-1 uppercase tracking-widest">Ndeleng Kunci Uraian</button>
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