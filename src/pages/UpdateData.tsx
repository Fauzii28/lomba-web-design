import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ChevronLeft, User, Mail, MapPin, Briefcase, Save } from 'lucide-react';

export default function UpdateDataPage() {
  const navigate = useNavigate();

  // --- SISTEM: Tambahkan State untuk Pekerjaan dan Lokasi ---
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [job, setJob] = useState(""); // State baru
  const [location, setLocation] = useState(""); // State baru
  const [loading, setLoading] = useState(false);

  // --- SISTEM: Ambil data user saat ini ---
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setFullName(user.user_metadata?.full_name || "");
        setEmail(user.email || "");
        // Ambil data job dan location dari metadata
        setJob(user.user_metadata?.job || "");
        setLocation(user.user_metadata?.location || "");
      }
    };
    fetchUser();
  }, []);

  // --- SISTEM: Fungsi Simpan (Sekarang mengirim 3 data) ---
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        data: { 
          full_name: fullName,
          job: job,        // Kirim data pekerjaan
          location: location // Kirim data lokasi
        }
      });

      if (error) throw error;
      alert("Profil berhasil diperbarui!");
      navigate('/profile');
    } catch (error: any) {
      alert("Gagal memperbarui: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 relative font-sans">
      <div className="fixed top-[-10%] right-[-10%] w-150 h-150 bg-blue-200/30 blur-[120px] rounded-full z-0"></div>

      <nav className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-lg z-[100] border-b border-white/20">
        <div className="max-w-350 mx-auto pt-3 pb-3 px-8 flex justify-between items-center">
          <button onClick={() => navigate('/profile')} className="flex items-center gap-2 text-slate-600 hover:text-[#1e3a8a] font-bold transition-all">
            <ChevronLeft className="w-5 h-5" /> Kembali
          </button>
          <div className="flex items-center gap-2 font-black text-xl text-[#1e3a8a]">Update Profile</div>
          <div className="w-20"></div>
        </div>
      </nav>

      <main className="relative z-10 pt-25 pb-10 px-6 flex justify-center">
        <div className="max-w-2xl w-full bg-white/60 backdrop-blur-md border border-white/80 rounded-[3rem] p-8 md:p-12 shadow-xl">
          <h2 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-tight">Informasi Personal</h2>
          
          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Nama Lengkap</label>
                <div className="flex items-center gap-3 bg-white/50 border border-slate-200 p-4 rounded-2xl focus-within:border-[#1e3a8a] transition-all">
                  <User size={18} className="text-slate-400" />
                  <input 
                    type="text" 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-transparent border-none outline-none text-sm font-semibold w-full text-slate-700" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Email Utama</label>
                <div className="flex items-center gap-3 bg-white/50 border border-slate-200 p-4 rounded-2xl focus-within:border-[#1e3a8a] transition-all opacity-70">
                  <Mail size={18} className="text-slate-400" />
                  <input type="email" value={email} readOnly className="bg-transparent border-none outline-none text-sm font-semibold w-full text-slate-700 cursor-not-allowed" />
                </div>
              </div>

              {/* SISTEM: Bind State Pekerjaan */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Pekerjaan</label>
                <div className="flex items-center gap-3 bg-white/50 border border-slate-200 p-4 rounded-2xl focus-within:border-[#1e3a8a] transition-all">
                  <Briefcase size={18} className="text-slate-400" />
                  <input 
                    type="text" 
                    value={job} 
                    onChange={(e) => setJob(e.target.value)}
                    className="bg-transparent border-none outline-none text-sm font-semibold w-full text-slate-700" 
                  />
                </div>
              </div>

              {/* SISTEM: Bind State Lokasi */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Lokasi</label>
                <div className="flex items-center gap-3 bg-white/50 border border-slate-200 p-4 rounded-2xl focus-within:border-[#1e3a8a] transition-all">
                  <MapPin size={18} className="text-slate-400" />
                  <input 
                    type="text" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-transparent border-none outline-none text-sm font-semibold w-full text-slate-700" 
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#1e3a8a] text-white p-5 rounded-3xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-[#152c6b] transition-all shadow-xl shadow-blue-900/10 mt-10 disabled:opacity-50"
            >
              <Save size={18} /> {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}