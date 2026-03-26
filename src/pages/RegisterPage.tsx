import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase'; 

export default function RegisterPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: fullName, 
          },
        },
      });

      if (error) throw error;

      if (data.user && !data.session) {
        alert("Pendaftaran Berhasil! Silakan cek email kamu untuk verifikasi.");
      } else {
        alert("Pendaftaran Berhasil! Akun kamu sudah siap digunakan.");
      }
      
      navigate('/login'); 
      
    } catch (err: any) {
      alert("Gagal Daftar: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 overflow-hidden relative font-sans flex items-center justify-center p-6">
      
      <div style={{ width: '700px', height: '700px' }} className="fixed -top-[10%] -left-[10%] bg-sky-500/25 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
      <div style={{ width: '600px', height: '600px' }} className="fixed -bottom-[10%] -right-[10%] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className={`bg-white/40 backdrop-blur-2xl border border-white/60 p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md relative z-10 transition-all duration-500 ${isLoading ? 'opacity-80 scale-[0.98]' : ''}`}>
        
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Daftar Akun</h2>
          <p className="text-slate-600 font-medium opacity-80">Mulai perjalanan sehatmu hari ini</p>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Nama Lengkap</label>
            <input 
              type="text" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              placeholder="Masukkan nama Anda" 
              required 
              className="w-full px-5 py-4 rounded-2xl bg-white/50 border border-white/80 focus:outline-none focus:border-[#7295f4] focus:ring-4 focus:ring-[#2648a6]/10 transition-all duration-500 text-slate-800 shadow-inner"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="email@contoh.com" 
              required 
              className="w-full px-5 py-4 rounded-2xl bg-white/50 border border-white/80 focus:outline-none focus:border-[#7295f4] focus:ring-4 focus:ring-[#2648a6]/10 transition-all duration-500 text-slate-800 shadow-inner"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Minimal 8 karakter" 
              required 
              className="w-full px-5 py-4 rounded-2xl bg-white/50 border border-white/80 focus:outline-none focus:border-[#7295f4] focus:ring-4 focus:ring-[#2648a6]/10 transition-all duration-500 text-slate-800 shadow-inner"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-linear-to-r from-[#7295f4] to-[#2648a6] hover:from-[#5e7aca] hover:to-[#244190] text-white font-bold py-4 rounded-2xl mt-4 shadow-lg shadow-[#2648a6]/30 transition-all duration-500 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Mendaftarkan...</span>
              </>
            ) : (
              "Buat Akun Sekarang"
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-slate-500 font-medium">
          Sudah punya akun? <span onClick={() => navigate('/login')} className="text-[#264db8] font-bold cursor-pointer hover:underline">Masuk</span>
        </p>
      </div>
    </div>
  );
}