import React, { useState } from 'react'; // TAMBAHAN: Import useState
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase'; // TAMBAHAN: Import Supabase
import { ChevronLeft, ShieldCheck, Lock, Save, ShieldAlert } from 'lucide-react';

export default function SecurityPage() {
  const navigate = useNavigate();

  // --- SISTEM: State untuk menangkap input password ---
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi dasar
    if (newPassword !== confirmPassword) {
      alert("Konfirmasi password tidak cocok!");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password minimal harus 6 karakter!");
      return;
    }

    setLoading(true);

    try {
      // --- SISTEM: Update password ke Supabase Auth ---
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      alert("Password berhasil diperbarui!");
      setNewPassword('');
      setConfirmPassword('');
      navigate('/profile');
    } catch (error: any) {
      alert("Gagal update password: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 relative font-sans">
      {/* Background Decor (TIDAK DISENTUH) */}
      <div className="fixed bottom-[-10%] left-[-10%] w-150 h-150 bg-emerald-200/20 blur-[120px] rounded-full z-0"></div>

      <nav className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-lg z-[100] border-b border-white/20">
        <div className="max-w-350 mx-auto pt-3 pb-3 px-8 flex justify-between items-center">
          <button onClick={() => navigate('/profile')} className="flex items-center gap-2 text-slate-600 hover:text-[#1e3a8a] font-bold transition-all">
            <ChevronLeft className="w-5 h-5" /> Kembali
          </button>
          <div className="flex items-center gap-2 font-black text-xl text-[#1e3a8a]">
             Keamanan Akun
          </div>
          <div className="w-20"></div>
        </div>
      </nav>

      <main className="relative z-10 pt-23 pb-10 px-6 flex justify-center">
        <div className="max-w-2xl w-full bg-white/60 backdrop-blur-md border border-white/80 rounded-[3rem] p-8 md:p-12 shadow-xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-emerald-500/10 p-3 rounded-2xl text-emerald-600"><ShieldCheck size={28} /></div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Privasi Akun</h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Ganti Password secara berkala</p>
            </div>
          </div>
          
          {/* SISTEM: Tambahkan onSubmit */}
          <form onSubmit={handleUpdatePassword} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Password Saat Ini</label>
              <div className="flex items-center gap-3 bg-white/50 border border-slate-200 p-4 rounded-2xl focus-within:border-emerald-500 transition-all">
                <Lock size={18} className="text-slate-400" />
                {/* Bagian ini dibiarkan sebagai dummy karena Supabase hanya butuh session login untuk update password */}
                <input type="password" placeholder="••••••••" className="bg-transparent border-none outline-none text-sm font-semibold w-full text-slate-700" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Password Baru</label>
              <div className="flex items-center gap-3 bg-white/50 border border-slate-200 p-4 rounded-2xl focus-within:border-emerald-500 transition-all">
                <Lock size={18} className="text-slate-400" />
                {/* SISTEM: Bind ke State newPassword */}
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="bg-transparent border-none outline-none text-sm font-semibold w-full text-slate-700" 
                  required
                />
              </div>
            </div>

            <div className="space-y-2 pb-4">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Konfirmasi Password</label>
              <div className="flex items-center gap-3 bg-white/50 border border-slate-200 p-4 rounded-2xl focus-within:border-emerald-500 transition-all">
                <ShieldAlert size={18} className="text-slate-400" />
                {/* SISTEM: Bind ke State confirmPassword */}
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="bg-transparent border-none outline-none text-sm font-semibold w-full text-slate-700" 
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#1e3a8a] text-white p-5 rounded-3xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-[#152c6b] transition-all shadow-xl shadow-blue-900/10 mt-6 disabled:opacity-50"
            >
              <Save size={18} /> {loading ? "Memperbarui..." : "Perbarui Keamanan"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}