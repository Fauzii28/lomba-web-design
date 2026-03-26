import { useState, useEffect } from 'react'; // TAMBAHAN: Import Hooks
import { Camera, MessageSquare, AlertTriangle, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase'; // TAMBAHAN: Import Supabase

export default function Dashboard() {
  const navigate = useNavigate();
  
  // --- SISTEM: State untuk Nama User ---
  const [userName, setUserName] = useState('User'); 

  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Mengambil full_name dari metadata yang kita set pas register
        // Jika tidak ada, fallback ke nama email sebelum tanda @
        const name = user.user_metadata?.full_name || user.email?.split('@')[0];
        setUserName(name);
      } else {
        // Jika tidak ada session (belum login), tendang ke halaman login
        navigate('/login');
      }
    };

    getUserData();
  }, [navigate]);

  // --- SISTEM: Fungsi Logout ---
  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.clear(); // Bersihkan storage
    navigate('/login');
  };
  return (
    <div className="min-h-screen bg-slate-100 overflow-hidden relative font-sans p-6 md:p-12 flex items-center justify-center">
      
      {/* --- 1. NAVBAR DASHBOARD (Sesuai Wireframe) --- */}
      <nav className="fixed top-0 left-0 right-0 bg-white/20 backdrop-blur-lg shadow-md border-b border-white/20 z-100 px-6 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo & Brand */}
          <div className="flex items-center px-4 gap-2 font-black text-2xl text-[#1e3a8a]">
            <div className="bg-[#1e3a8a] p-1 rounded-md">
              <svg className="w-5 h-5 text-[#4ade80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            </div>
            HealthLogia
          </div>

          {/* Menu Kanan */}
          <div className="flex items-center gap-6 px-4">
            <div onClick={() => navigate('/profile')} className="flex items-center gap-3 bg-white/50 px-3 py-1.5 rounded-full border border-slate-200 shadow-sm cursor-pointer hover:bg-white transition-all">
              <div className="w-7 h-7 bg-[#1e3a8a] rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-black text-slate-700 hidden sm:block">{userName}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Awan Biru - Kanan Tengah */}
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

      {/* Awan Hijau - Kiri Bawah */}
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

      {/* KONTEN UTAMA */}
      <div className="max-w-6xl w-full relative z-10 pt-15">
        
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
            className="bg-white/60 backdrop-blur-md border border-white/80 rounded-3xl p-8 shadow-xl 
                       hover:border-emerald-400 hover:shadow-emerald-100 hover:-translate-y-2 transition-all cursor-pointer group relative overflow-hidden"
          >
            {/* Animasi Cahaya Berjalan (Pakai % agar pasti kebaca) */}
            <div 
              style={{ background: 'linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.2), transparent)' }}
              className="absolute inset-0 translate-x-full group-hover:-translate-x-full transition-transform duration-1000 ease-in-out"
            ></div>

            <div className="bg-emerald-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform relative z-10">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3 relative z-10">Cek Gejala Luar</h2>
            <p className="text-slate-600 mb-8 leading-relaxed h-16 relative z-10 font-medium text-sm">
              Upload foto area tubuh yang mengalami keluhan untuk analisis visual menggunakan AI.
            </p>
            <div className="flex gap-2 flex-wrap relative z-10">
              {['Ruam Kulit', 'Luka', 'Bengkak'].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-emerald-100/80 text-emerald-700 rounded-lg text-xs font-bold border border-emerald-200/50">
                  {tag}
                </span>
              ))}
            </div>
          </div>

         <div 
            onClick={() => navigate('/deskripsi-gejala')}
            className="bg-white/60 backdrop-blur-md border border-white/80 rounded-3xl p-8 shadow-xl 
                       hover:border-blue-400 hover:shadow-blue-100 hover:-translate-y-2 transition-all cursor-pointer group relative overflow-hidden"
          >
            {/* Animasi Cahaya Berjalan */}
            <div 
              style={{ background: 'linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.2), transparent)' }}
              className="absolute inset-0 translate-x-full group-hover:-translate-x-full transition-transform duration-1000 ease-in-out"
            ></div>

            <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform relative z-10">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3 relative z-10">Konsultasi Gejala Dalam</h2>
            <p className="text-slate-600 mb-8 leading-relaxed h-16 relative z-10 font-medium text-sm">
              Ceritakan keluhan internal Anda dan AI akan membantu menganalisis kondisi kesehatan.
            </p>
            <div className="flex gap-2 flex-wrap relative z-10">
              {['Demam', 'Sakit Kepala', 'Mual'].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-blue-100/80 text-blue-700 rounded-lg text-xs font-bold border border-blue-200/50">
                  {tag}
                </span>
              ))}
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

      </div>
    </div>
  );
}