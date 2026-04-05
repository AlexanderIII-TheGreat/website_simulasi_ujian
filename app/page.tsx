import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: "Exam Simulation",
  description: "Exam Simulation",
};

export default function Home() {
  const subjects = [
    {
      id: 'bahasaindonesia',
      title: 'Bahasa Indonesia',
      icon: '📚',
      description: 'Uji kemampuan literasi dan pemahaman kaidah kebahasaanmu.',
      color: 'from-blue-500 to-blue-600',
      shadow: 'shadow-blue-500/30',
      href: '/bahasaindonesia',
    },
    {
      id: 'senibudaya',
      title: 'Seni Budaya',
      icon: '🎨',
      description: 'Eksplorasi wawasanmu tentang apresiasi dan kreasi seni rupa.',
      color: 'from-sky-500 to-blue-500',
      shadow: 'shadow-sky-500/30',
      href: '/senibudaya',
    },
    {
      id: 'pjok',
      title: 'PJOK',
      icon: '🏃‍♂️',
      description: 'Latih pemahaman tentang teknik olahraga dan kebugaran jasmani.',
      color: 'from-cyan-500 to-blue-500',
      shadow: 'shadow-cyan-500/30',
      href: '/pjok',
    },
    {
      id: 'ppkn',
      title: 'PPKN',
      icon: '🏛️',
      description: 'Uji pemahamanmu mengenai wawasan kebangsaan.',
      color: 'from-purple-500 to-purple-600',
      shadow: 'shadow-purple-500/30',
      href: '/ppkn',
    },
    {
      id: 'matematika',
      title: 'Matematika',
      icon: '📐',
      description: 'Uji kemampuanmu mengenai wawasan kebangsaan.',
      color: 'from-purple-500 to-purple-600',
      shadow: 'shadow-purple-500/30',
      href: '/matematika',
    },
        {
      id: 'Sejarah',
      title: 'Sejarah',
      icon: '🏛️',
      description: 'Uji kemampuanmu mengenai wawasan sejarah.',
      color: 'from-purple-500 to-purple-600',
      shadow: 'shadow-purple-500/30',
      href: '/sejarah',
    },
    {
      id: 'informatika',
      title: 'Informatika',
      icon: '💻',
      description: 'Uji kemampuanmu mengenai wawasan informatika.',
      color: 'from-purple-500 to-purple-600',
      shadow: 'shadow-purple-500/30',
      href: '/informatika',
    },
    {
      id: 'bahasainggris',
      title: 'Bahasa Inggris',
      icon: '📚',
      description: 'Uji kemampuan literasi dan pemahaman kaidah kebahasaanmu.',
      color: 'from-blue-500 to-blue-600',
      shadow: 'shadow-blue-500/30',
      href: '/bahasainggris',
    },
    {
      id: 'Pendidikan Agama Islam',
      title: 'Pendidikan Agama Islam',
      icon: '📚',
      description: 'Uji kemampuan literasi dan pemahaman kaidah keagamaanmu.',
      color: 'from-blue-500 to-blue-600',
      shadow: 'shadow-blue-500/30',
      href: '/pai',
    },
    {
      id: 'bahasa jawa',
      title: 'Bahasa Jawa',
      icon: '📚',
      description: 'Uji kemampuan literasi dan pemahaman kaidah kebahasaanmu.',
      color: 'from-blue-500 to-blue-600',
      shadow: 'shadow-blue-500/30',
      href: '/jawa',
    },
    {
      id: 'ipas',
      title: 'IPAS',
      icon: '📚',
      description: 'Uji kemampuan literasi dan pemahaman kaidah keilmuanmu.',
      color: 'from-green-500 to-green-600',
      shadow: 'shadow-green-500/30',
      href: '/ipas',
    },
    {
      id: 'Konsentrasi Keahlian TJKT',
      title: 'Konsentrasi Keahlian TJKT',
      icon: '📚',
      description: 'Uji kemampuan literasi dan pemahaman kaidah keilmuanmu.',
      color: 'from-green-500 to-green-600',
      shadow: 'shadow-green-500/30',
      href: '/konsentrasi',
    },

  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Hero Section */}
      <header className="w-full bg-blue-600 text-white relative overflow-hidden flex flex-col items-center justify-center pt-24 pb-32 px-6">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
        <div className="absolute top-0 w-full h-full bg-gradient-to-b from-blue-700/50 to-transparent"></div>
        
        <div className="relative z-10 text-center max-w-3xl mx-auto animate-fade-in-up">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-blue-500/30 border border-blue-400/50 backdrop-blur-sm text-blue-50 text-sm font-semibold tracking-wide uppercase">
            Platform Ujian Interaktif
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
            Selamat Datang di <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-white">
              Simulasi PSAJ
            </span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
            Persiapkan dirimu menghadapi Penilaian Sumatif Akhir Jenjang dengan berlatih melalui soal-soal interaktif yang telah kami sediakan.
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-10 left-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
        <div className="absolute -bottom-10 right-10 w-40 h-40 bg-cyan-400 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
      </header>

      {/* Main Content - Subject Cards */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 -mt-20 relative z-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subjects.map((subject, index) => (
            <Link href={subject.href} key={subject.id}>
              <div 
                className={`bg-white rounded-3xl p-8 shadow-xl ${subject.shadow} hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-50 group h-full flex flex-col animate-fade-in-up`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-3xl mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  {subject.icon}
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {subject.title}
                </h2>
                <p className="text-slate-500 leading-relaxed mb-8 flex-1">
                  {subject.description}
                </p>
                <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                  <span>Mulai Mengerjakan</span>
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Features Info */}
        <div className="mt-24 text-center animate-fade-in-up" style={{ animationDelay: "500ms" }}>
          <h3 className="text-2xl font-bold text-slate-800 mb-10">Kenapa Berlatih di Sini?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 text-xl shadow-sm">⚡</div>
              <h4 className="font-bold text-slate-800 mb-2">Interaktif & Cepat</h4>
              <p className="text-sm text-slate-500">Feedback jawaban langsung tanpa harus menunggu hingga akhir.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 text-xl shadow-sm">⏪</div>
              <h4 className="font-bold text-slate-800 mb-2">Fitur Review Jawaban</h4>
              <p className="text-sm text-slate-500">Dapat kembali ke soal sebelumnya untuk mengubah atau sekadar melihat jawabanmu.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 text-xl shadow-sm">📊</div>
              <h4 className="font-bold text-slate-800 mb-2">Evaluasi Instan</h4>
              <p className="text-sm text-slate-500">Dapatkan nilai akhir dan review pembahasan esai secara instan & akurat.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm border-t border-slate-800">
        <p>© {new Date().getFullYear()} Simulasi PSAJ. Selamat Berjuang!</p>
      </footer>

      {/* Minimal Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp { 
          from { opacity: 0; transform: translateY(30px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        .animate-fade-in-up { 
          animation: fadeInUp 0.6s ease-out forwards; 
          opacity: 0;
        }
      `}} />
    </div>
  );
}
