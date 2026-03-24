
import { Camera, MessageSquare, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  
  // Nanti nama ini bisa diambil dari memori login, 
  // untuk sekarang kita buat statis sesuai desainmu.
  const userName = "Farisahmad"; 

  return (
    <div className="min-h-screen bg-[#F8FAFC] overflow-hidden relative font-sans p-6 md:p-12 flex items-center justify-center">
      
      {/* --- EFEK LATAR BELAKANG AWAN BIRU (MESH GRADIENT) --- */}
      <div className="fixed top-[-10%] left-[-10%] w-125 h-125 bg-blue-400/30 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-150 h-150 bg-cyan-300/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-5xl w-full relative z-10">
        
        {/* --- HEADER (SAPAAN) --- */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">
            Halo {userName}, apa yang Anda keluhkan hari ini?
          </h1>
          <p className="text-lg text-slate-600">
            Pilih metode pemeriksaan yang sesuai dengan keluhan Anda
          </p>
        </div>

        {/* --- DUA FITUR UTAMA (GLASSMORPHISM) --- */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Fitur 1: Cek Gejala Luar */}
          <div 
            onClick={() => navigate('/upload-gejala')}
            className="bg-white/60 backdrop-blur-md border border-white/80 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer group"
          >
            <div className="bg-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Cek Gejala Luar</h2>
            <p className="text-slate-600 mb-8 leading-relaxed h-16">
              Upload foto area tubuh yang mengalami keluhan untuk analisis visual menggunakan AI.
            </p>
            <div className="flex gap-3 flex-wrap">
              <span className="px-4 py-1.5 bg-emerald-100/80 text-emerald-700 rounded-lg text-sm font-semibold border border-emerald-200/50">Ruam Kulit</span>
              <span className="px-4 py-1.5 bg-emerald-100/80 text-emerald-700 rounded-lg text-sm font-semibold border border-emerald-200/50">Luka</span>
              <span className="px-4 py-1.5 bg-emerald-100/80 text-emerald-700 rounded-lg text-sm font-semibold border border-emerald-200/50">Bengkak</span>
            </div>
          </div>

          {/* Fitur 2: Konsultasi Gejala Dalam (Tersambung ke Kuis) */}
          <div 
            onClick={() => navigate('/questionnairepage', { state: { tipeKuis: 'dalam' } })}
            className="bg-white/60 backdrop-blur-md border border-white/80 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer group"
          >
            <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Konsultasi Gejala Dalam</h2>
            <p className="text-slate-600 mb-8 leading-relaxed h-16">
              Ceritakan keluhan internal Anda dan AI akan membantu menganalisis kondisi kesehatan.
            </p>
            <div className="flex gap-3 flex-wrap">
              <span className="px-4 py-1.5 bg-blue-100/80 text-blue-700 rounded-lg text-sm font-semibold border border-blue-200/50">Demam</span>
              <span className="px-4 py-1.5 bg-blue-100/80 text-blue-700 rounded-lg text-sm font-semibold border border-blue-200/50">Sakit Kepala</span>
              <span className="px-4 py-1.5 bg-blue-100/80 text-blue-700 rounded-lg text-sm font-semibold border border-blue-200/50">Mual</span>
            </div>
          </div>

        </div>

        {/* --- SPANDUK PERINGATAN MEDIS --- */}
        <div className="mt-10 bg-yellow-50/70 backdrop-blur-md border border-yellow-200/80 rounded-3xl p-6 flex gap-5 items-start shadow-lg">
          <div className="bg-yellow-200/60 p-3 rounded-2xl text-yellow-700 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">Penting untuk Diperhatikan</h3>
            <p className="text-slate-600 leading-relaxed">
              HealthCheck AI adalah alat skrining awal dan bukan pengganti diagnosa medis profesional. Selalu konsultasikan hasil dengan dokter untuk mendapatkan perawatan yang tepat.
            </p>
          </div>
        </div>

        {/* --- TOMBOL KELUAR --- */}
        <div className="mt-8 text-center">
          <button 
            onClick={() => navigate('/')} 
            className="text-slate-400 hover:text-red-500 font-semibold transition-colors border-b border-transparent hover:border-red-500 pb-1"
          >
            Keluar Akun
          </button>
        </div>

      </div>
    </div>
  );
}