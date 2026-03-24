import { useState } from 'react'; // 1. Tambahkan useState
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // 2. State untuk loading

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); 
    setIsLoading(true); // 3. Set loading jadi true saat tombol diklik

    // Simulasi proses verifikasi selama 1.5 detik
    setTimeout(() => {
      localStorage.setItem('userTelahLogin', 'benar');
      navigate('/dashboard');
      setIsLoading(false); // Reset loading (opsional karena sudah pindah page)
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-100 overflow-hidden relative font-sans flex items-center justify-center p-6">
      
      {/* --- EFEK LATAR BELAKANG CAIR --- */}
      <div 
        style={{ width: '700px', height: '700px' }}
        className="fixed -top-[10%] -right-[10%] bg-blue-500/30 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse"
      ></div>
      <div 
        style={{ width: '600px', height: '600px' }}
        className="fixed -bottom-[10%] -left-[10%] bg-indigo-500/25 rounded-full blur-[120px] pointer-events-none -z-10"
      ></div>

      {/* --- CARD LOGIN (LIQUID GLASS) --- */}
      <div className={`bg-white/40 backdrop-blur-2xl border border-white/60 p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md relative z-10 transition-all duration-500 ${isLoading ? 'opacity-80 scale-[0.98]' : 'opacity-100'}`}>
        
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Selamat Datang</h2>
          <p className="text-slate-600 font-medium opacity-80">Silakan masuk ke akun HealthCheck Anda</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email</label>
            <input 
              type="email" 
              disabled={isLoading} // Disable input saat loading
              placeholder="contoh@email.com" 
              required 
              className="w-full px-5 py-4 rounded-2xl bg-white/50 border border-white/80 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-400/10 transition-all text-slate-800 shadow-inner disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Password</label>
            <input 
              type="password" 
              disabled={isLoading} // Disable input saat loading
              placeholder="••••••••" 
              required 
              className="w-full px-5 py-4 rounded-2xl bg-white/50 border border-white/80 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-400/10 transition-all text-slate-800 shadow-inner disabled:opacity-50"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading} // Cegah klik ganda
            className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-2xl mt-4 shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                {/* Spinner Loading Sederhana */}
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Memproses...</span>
              </>
            ) : (
              "Masuk Sekarang"
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-slate-500 font-medium">
          <span onClick={() => navigate('/registerpage')} className="text-blue-600 cursor-pointer hover:underline">Daftar di sini</span>
        </p>
      </div>
    </div>
  );
}