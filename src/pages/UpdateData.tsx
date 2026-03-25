import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Mail, MapPin, Briefcase, Save, Plus } from 'lucide-react';

export default function UpdateDataPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 relative font-sans">
      {/* Background Decor */}
      <div className="fixed top-[-10%] right-[-10%] w-150 h-150 bg-blue-200/30 blur-[120px] rounded-full z-0"></div>

      <nav className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-lg z-[100] border-b border-white/20">
        <div className="max-w-350 mx-auto pt-3 pb-3 px-8 flex justify-between items-center">
          <button onClick={() => navigate('/profile')} className="flex items-center gap-2 text-slate-600 hover:text-[#1e3a8a] font-bold transition-all">
            <ChevronLeft className="w-5 h-5" /> Kembali
          </button>
          <div className="flex items-center gap-2 font-black text-xl text-[#1e3a8a]">
             Update Profile
          </div>
          <div className="w-20"></div>
        </div>
      </nav>

      <main className="relative z-10 pt-25 pb-10 px-6 flex justify-center">
        <div className="max-w-2xl w-full bg-white/60 backdrop-blur-md border border-white/80 rounded-[3rem] p-8 md:p-12 shadow-xl">
          <h2 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-tight">Informasi Personal</h2>
          
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Nama Lengkap</label>
                <div className="flex items-center gap-3 bg-white/50 border border-slate-200 p-4 rounded-2xl focus-within:border-[#1e3a8a] transition-all">
                  <User size={18} className="text-slate-400" />
                  <input type="text" defaultValue="Faris Ahmad" className="bg-transparent border-none outline-none text-sm font-semibold w-full text-slate-700" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Email Utama</label>
                <div className="flex items-center gap-3 bg-white/50 border border-slate-200 p-4 rounded-2xl focus-within:border-[#1e3a8a] transition-all">
                  <Mail size={18} className="text-slate-400" />
                  <input type="email" defaultValue="farisahmad@unma.ac.id" className="bg-transparent border-none outline-none text-sm font-semibold w-full text-slate-700" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Pekerjaan</label>
                <div className="flex items-center gap-3 bg-white/50 border border-slate-200 p-4 rounded-2xl focus-within:border-[#1e3a8a] transition-all">
                  <Briefcase size={18} className="text-slate-400" />
                  <input type="text" defaultValue="Mahasiswa" className="bg-transparent border-none outline-none text-sm font-semibold w-full text-slate-700" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Lokasi</label>
                <div className="flex items-center gap-3 bg-white/50 border border-slate-200 p-4 rounded-2xl focus-within:border-[#1e3a8a] transition-all">
                  <MapPin size={18} className="text-slate-400" />
                  <input type="text" defaultValue="Majalengka, Jawa Barat" className="bg-transparent border-none outline-none text-sm font-semibold w-full text-slate-700" />
                </div>
              </div>
            </div>

            <button type="submit" className="w-full bg-[#1e3a8a] text-white p-5 rounded-3xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-[#152c6b] transition-all shadow-xl shadow-blue-900/10 mt-10">
              <Save size={18} /> Simpan Perubahan
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}