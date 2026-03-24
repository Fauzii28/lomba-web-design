import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Lightbulb } from 'lucide-react';

export default function DeskripsiGejalaPage() {
  const navigate = useNavigate();
  const [deskripsi, setDeskripsi] = useState('');

  const handleNext = () => {
    navigate('/questionnairepage', { state: { tipeKuis: 'dalam', deskripsiAwal: deskripsi } });
  };

  return (
    // h-screen mengunci tinggi, overflow-hidden mematikan scroll
    <div className="h-screen w-full bg-slate-100 overflow-hidden relative font-sans flex items-center justify-center p-6">
      
      {/* --- EFEK LATAR BELAKANG --- */}
      <div 
        style={{ width: '600px', height: '600px', borderRadius: '50%', filter: 'blur(80px)' }}
        className="absolute -top-20 -left-20 bg-blue-500/20 pointer-events-none -z-10 animate-pulse"
      ></div>
      <div 
        style={{ width: '500px', height: '500px', borderRadius: '50%', filter: 'blur(80px)' }}
        className="absolute -bottom-20 -right-20 bg-indigo-500/20 pointer-events-none -z-10"
      ></div>

      <div className="max-w-3xl w-full flex flex-col relative z-10">
        
        {/* Tombol Back */}
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-4 transition-colors group w-fit"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Kembali</span>
        </button>

        {/* --- MAIN CARD (LIQUID GLASS) --- */}
        <div className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-3xl p-8 shadow-2xl flex flex-col">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-blue-600 p-3 rounded-2xl shadow-lg">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">Konsultasi Gejala Dalam</h1>
              <p className="text-sm text-slate-600 font-medium mt-1">Jelaskan gejala yang Anda rasakan dengan detail</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2 ml-1 uppercase tracking-widest">
                Jelaskan Gejala Anda
              </label>
              
              {/* KOTAK DESKRIPSI DIKECILKAN (h-28) */}
              <textarea 
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                placeholder="Contoh: Mengalami demam sejak 2 hari yang lalu, suhu mencapai 38°C, disertai sakit kepala..."
                className="w-full h-28 px-6 py-4 rounded-3xl bg-white/60 border border-white/80 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-400/10 transition-all text-slate-800 shadow-inner resize-none text-base leading-relaxed"
              ></textarea>
              
              <p className="text-[10px] text-slate-400 mt-2 ml-2 font-medium">
                * Jelaskan dengan detail kapan gejala muncul, seberapa parah, dan faktor yang mempengaruhi
              </p>
            </div>

            {/* TOMBOL LANJUT (LINEAR GRADIENT & NO []) */}
            <button 
              onClick={handleNext}
              disabled={!deskripsi.trim()}
              style={{
                background: deskripsi.trim() 
                  ? 'linear-gradient(90deg, rgba(16, 185, 129, 0.8), rgba(20, 184, 166, 0.8))' 
                  : 'rgba(203, 213, 225, 0.5)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
              className={`w-full py-4 rounded-2xl flex items-center justify-center font-black text-lg transition-all relative overflow-hidden group
                ${deskripsi.trim() ? 'cursor-pointer active:scale-95 shadow-xl shadow-emerald-500/10' : 'cursor-not-allowed opacity-50'}`}
            >
              <div className="absolute inset-0 translate-x-full group-hover:-translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
              
              <span className="relative z-10 text-white">Lanjutkan ke Pertanyaan</span>
            </button>
          </div>
        </div>

        {/* --- TIPS CARD (TETAP ADA) --- */}
        {/* --- TIPS CARD (IPHONE LIQUID GLASS - PASTI MUNCUL & ANTI []) --- */}
        <div 
          style={{
            // 1. Dasar Kaca Transparan (Biru Sangat Tipis)
            background: 'rgba(219, 234, 254, 0.3)', 
            // 2. Backdrop Blur Tebal (Efek Kaca iPhone)
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            // 3. Border Putih Tipis
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
          className="mt-4 rounded-3xl p-5 flex gap-5 items-center shadow-xl relative overflow-hidden group transition-all duration-300"
        >
          
          {/* --- EFEK CAIRAN BERGERAK (LIQUID GLOW ANIMATION) --- */}
          {/* Lapisan 1: Gradasi Biru Cair yang Mengalir di Balik Teks */}
          <div 
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.25), rgba(79, 70, 229, 0.15), transparent)', 
            }}
            // Animate-pulse agar intensitas cahayanya naik turun
            className="absolute inset-0 w-full h-full -translate-x-[150%] skew-x-12 
                       animate-pulse pointer-events-none -z-10 group-hover:duration-700"
          ></div>
          
          {/* Lapisan 2: Overlay Glossy iPhone yang Mengalir (Cepat) */}
          <div 
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.03), transparent)',
            }}
            // Animasi 'Wuss' saat Hover (Durasi 700ms)
            className="absolute inset-0 w-full h-full -translate-x-[150%] skew-x-12 
                       group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></div>
          
          {/* Lapisan 3: Glow Flow yang Mengalir Terus Menurun (Lambat) */}
          <div 
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent)', 
            }}
            // Animate-spin agar ada efek warna berputar lambat di pojok
            className="absolute inset-0 w-full h-full animate-spin-slow pointer-events-none -z-10 opacity-70"
          ></div>


          {/* --- KONTEN CARD (Z-10 AGAR DI ATAS CAIRAN) --- */}
          <div className="bg-blue-100 p-3 rounded-xl text-blue-600 shadow-inner relative z-10 border border-blue-200/50">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div className="text-[11px] leading-snug relative z-10 space-y-1">
            <h3 className="font-bold text-slate-900 uppercase tracking-tighter mr-1 flex items-center gap-1.5">
              {/* Titik kecil biru berkedip */}
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
              Tips Foto yang Baik
            </h3>
            <ul className="text-slate-700 font-medium list-disc ml-4 space-y-1">
              <li>Pastikan area yang difoto terlihat jelas dengan pencahayaan yang baik</li>
              <li>Ambil foto dari jarak yang cukup dekat untuk detail yang jelas</li>
              <li>Hindari foto yang blur atau terlalu gelap</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}