import { Camera, MessageSquare, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const userName = "Farisahmad"; 

  return (
    <div className="min-h-screen bg-slate-100 overflow-hidden relative font-sans p-6 md:p-12 flex items-center justify-center">
      
      {/* --- EFEK AWAN HALUS (SUDAH MUNCUL & DIHALUSKAN) --- */}
      {/* 1. Awan Biru - Kanan Tengah */}
      <div 
        style={{ 
          width: '800px', 
          height: '800px', 
          background: 'rgba(59, 130, 246, 0.25)', // Dibuat lebih soft (0.25)
          filter: 'blur(120px)', // Blur dinaikkan lagi agar seperti awan
          position: 'fixed',
          top: '5%',
          right: '-15%',
          borderRadius: '50%',
          zIndex: 0 
        }}
        className="animate-pulse"
      ></div>

      {/* 2. Awan Hijau - Kiri Bawah */}
      <div 
        style={{ 
          width: '900px', 
          height: '900px', 
          background: 'rgba(16, 185, 129, 0.2)', // Hijau soft
          filter: 'blur(130px)',
          position: 'fixed',
          bottom: '-15%',
          left: '-15%',
          borderRadius: '50%',
          zIndex: 0
        }}
      ></div>

      {/* --- KONTEN UTAMA --- */}
      <div className="max-w-5xl w-full relative z-10">
        
        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Halo {userName}, apa yang Anda keluhkan hari ini?
          </h1>
          <p className="text-lg text-slate-700 font-medium">
            Pilih metode pemeriksaan yang sesuai dengan keluhan Anda
          </p>
        </div>

        {/* DUA KARTU UTAMA (LIQUID GLASS) */}
        <div className="grid md:grid-cols-2 gap-8">
          
          <div 
            onClick={() => navigate('/upload-gejala')}
            className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="bg-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Cek Gejala Luar</h2>
            <p className="text-slate-600 mb-8 leading-relaxed h-16">
              Upload foto area tubuh yang mengalami keluhan untuk analisis visual menggunakan AI.
            </p>
            <div className="flex gap-3 flex-wrap">
              <span className="px-4 py-1.5 bg-emerald-100/60 text-emerald-700 rounded-lg text-sm font-semibold border border-emerald-200/50">Ruam Kulit</span>
              <span className="px-4 py-1.5 bg-emerald-100/60 text-emerald-700 rounded-lg text-sm font-semibold border border-emerald-200/50">Luka</span>
              <span className="px-4 py-1.5 bg-emerald-100/60 text-emerald-700 rounded-lg text-sm font-semibold border border-emerald-200/50">Bengkak</span>
            </div>
          </div>

          <div 
            onClick={() => navigate('/questionnairepage', { state: { tipeKuis: 'dalam' } })}
            className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Konsultasi Gejala Dalam</h2>
            <p className="text-slate-600 mb-8 leading-relaxed h-16">
              Ceritakan keluhan internal Anda dan AI akan membantu menganalisis kondisi kesehatan.
            </p>
            <div className="flex gap-3 flex-wrap">
              <span className="px-4 py-1.5 bg-blue-100/60 text-blue-700 rounded-lg text-sm font-semibold border border-blue-200/50">Demam</span>
              <span className="px-4 py-1.5 bg-blue-100/60 text-blue-700 rounded-lg text-sm font-semibold border border-blue-200/50">Sakit Kepala</span>
              <span className="px-4 py-1.5 bg-blue-100/60 text-blue-700 rounded-lg text-sm font-semibold border border-blue-200/50">Mual</span>
            </div>
          </div>

        </div>

        {/* --- SPANDUK PERINGATAN MEDIS (LIQUID GLASS + INTERAKSI) --- */}
        <div 
          className="mt-10 bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] p-7 flex gap-6 items-start shadow-xl relative overflow-hidden group 
          hover:border-yellow-400/50 hover:shadow-yellow-200/20 hover:-translate-y-1 transition-all duration-300 cursor-default"
        >
          
          {/* Efek Kilatan Cair (Liquid Glow) - Akan lebih terang saat di-hover */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-200/20 rounded-full blur-[80px] pointer-events-none -z-10 group-hover:bg-yellow-300/40 transition-all duration-500"></div>

          {/* Ikon Peringatan dengan Animasi Getar Kecil saat Hover */}
          <div className="bg-yellow-200/50 p-4 rounded-2xl text-yellow-800 shrink-0 shadow-inner border border-yellow-200/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-1.5 flex items-center gap-2">
              Penting untuk Diperhatikan
            </h3>
            <p className="text-slate-700 leading-relaxed font-medium opacity-90">
              HealthCheck AI adalah alat skrining awal dan bukan pengganti diagnosa medis profesional. Selalu konsultasikan hasil dengan dokter untuk mendapatkan perawatan yang tepat.
            </p>
          </div>
        </div>

        {/* TOMBOL KELUAR */}
        <div className="mt-12 text-center">
          <button onClick={() => navigate('/')} className="text-slate-400 hover:text-red-500 font-semibold transition-colors">
            Keluar Akun
          </button>
        </div>

      </div>
    </div>
  );
}