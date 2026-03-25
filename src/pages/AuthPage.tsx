import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); 

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); 
    setIsLoading(true); 

    setTimeout(() => {
      localStorage.setItem('userTelahLogin', 'benar');
      navigate('/dashboard');
      setIsLoading(false); 
    }, 1500);
  };

  return (
    <div className="h-screen w-full bg-slate-100 overflow-hidden relative font-sans flex items-stretch">
      
      <div className="relative flex-[1.2] bg-linear-to-br from-[#2e66a2] to-[#254292] overflow-hidden flex flex-col justify-between p-12">
        
        {/* --- EFEK AWAN RAKSASA --- */}
        <div 
          style={{ width: '600px', height: '600px', borderRadius: '50%' }}
          className="absolute -top-32 -left-32 bg-[#3d60c1]/40 blur-3xl pointer-events-none z-0 animate-pulse"
        ></div>
        <div 
          style={{ width: '500px', height: '500px', borderRadius: '50%' }}
          className="absolute -bottom-40 -right-40 bg-sky-700/30 blur-3xl pointer-events-none z-0"
        ></div>

        {/* Branding */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center border border-white/20 backdrop-blur-md">
            <svg className="w-5 h-5 text-[#4ade80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className="text-2xl font-black text-white tracking-tighter">HealthLogia</span>
        </div>

        {/* Headline Utama & Statistik */}
        <div className="relative z-10 space-y-8">
          <div className="max-w-xl">
            <h1 className="text-5xl font-black text-white leading-[1.1] tracking-tighter">
              Kesehatan Anda, <br /> Prioritas Utama Kami.
            </h1>
            <p className="text-lg text-white/80 mt-4 leading-relaxed max-w-md">
              HealthLogia menggunakan AI untuk membantu deteksi dini kondisi kesehatan Anda.
            </p>
          </div>

            <div className="grid grid-cols-2 gap-8 max-w-md pt-6 border-t border-white/10">

            <div className="bg-white/10 p-6 rounded-3xl border border-white/10 hover:bg-white/15 transition-colors">

              <p className="text-5xl font-extrabold text-white">150K+</p>

              <p className="text-white/70 mt-1 font-medium">Skrining Selesai</p>

            </div>

            <div className="bg-white/10 p-6 rounded-3xl border border-white/10 hover:bg-white/15 transition-colors">

              <p className="text-5xl font-extrabold text-white">92%</p>

              <p className="text-white/70 mt-1 font-medium">Tingkat Akurasi AI</p>

            </div>

          </div>
        </div>

        {/* Footer Kecil */}
        <p className="relative z-10 text-xs text-white/40 font-medium">
          © 2026 HealthLogia AI Platform. Professional Screening Tool.
        </p>
      </div>

      {/* SISI KANAN: FORM LOGIN */}
      <div className="flex-1 bg-white/60 backdrop-blur-xl border-l border-white/20 flex flex-col items-center justify-center p-12 relative">
        
        {/* Bulatan halus di kanan agar Card Kaca makin cantik */}
        <div style={{ width: '300px', height: '300px', borderRadius: '50%' }} className="absolute top-0 right-0 bg-blue-50/50 blur-3xl -z-10"></div>

        {/* --- CARD LOGIN (TETAP LIQUID GLASS PREMIUM) --- */}
        <div 
          className={`bg-white/50 backdrop-blur-2xl border border-white/80 p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md relative z-10 transition-all duration-500 
                     ${isLoading ? 'opacity-80 scale-95' : 'opacity-100'} hover:border-white transition-colors`}
        >
          
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-slate-950 mb-2 tracking-tighter">Selamat Datang</h2>
            <p className="text-slate-600 font-semibold opacity-90 leading-relaxed">Silakan masuk ke akun Anda</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Email</label>
              <input 
                type="email" 
                disabled={isLoading} 
                placeholder="nama@email.com" 
                required 
                className="w-full px-5 py-4 rounded-2xl bg-white/70 border border-slate-200/80 focus:outline-none focus:border-[#7295f4] focus:ring-4 focus:ring-[#2648a6]/10 transition-all text-slate-900 shadow-inner"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Password</label>
              <input 
                type="password" 
                disabled={isLoading} 
                placeholder="••••••••" 
                required 
                className="w-full px-5 py-4 rounded-2xl bg-white/70 border border-slate-200/80 focus:outline-none focus:border-[#7295f4] focus:ring-4 focus:ring-[#2648a6]/10 transition-all text-slate-800 shadow-inner"
              />
            </div>
            
            {/* TOMBOL LOGIN */}
            <button 
              type="submit" 
              disabled={isLoading} 
              style={{
                background: 'rgba(59, 130, 246, 0.2)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
              className="w-full relative py-4 rounded-2xl mt-4 flex items-center justify-center overflow-hidden group shadow-lg shadow-blue-500/10 transition-all active:scale-95 cursor-pointer disabled:opacity-70 disabled:cursor-wait"
            >
              <div className="absolute inset-0 bg-linear-to-r from-[#7295f4]/60 to-[#2648a6]/60 transition-opacity group-hover:opacity-90"></div>
              
              <div className="absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent"></div>

              {isLoading ? (
                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="text-white font-bold">Memproses...</span>
                </div>
              ) : (
                <span className="relative z-10 text-white font-bold text-lg tracking-wide">
                  Masuk Sekarang
                </span>
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-slate-500 font-medium">
            Belum punya akun? <span onClick={() => navigate('/registerpage')} className="text-[#264db8] font-extrabold cursor-pointer hover:underline underline-offset-4">Daftar di sini</span>
          </p>
        </div>

      </div>
    </div>
  );
}