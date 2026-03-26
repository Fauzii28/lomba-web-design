import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  User, 
  Mail, 
  MapPin, 
  Calendar, 
  ChevronLeft, 
  Edit3, 
  ShieldCheck, 
  Activity,
  LogOut,
  Camera 
} from 'lucide-react';

export default function ProfilePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profilePic, setProfilePic] = useState<string | null>(
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop"
  );
  
  const [userName, setUserName] = useState("Loading...");
  const [userEmail, setUserEmail] = useState("...");
  const [userJob, setUserJob] = useState("..."); // SISTEM: State Pekerjaan
  const [userLocation, setUserLocation] = useState("..."); // SISTEM: State Lokasi

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setUserName(user.user_metadata?.full_name || user.email?.split('@')[0]);
        setUserEmail(user.email || "");
        setUserJob(user.user_metadata?.job || "Mahasiswa Informatika");
        setUserLocation(user.user_metadata?.location || "Majalengka, Jawa Barat");
      } else {
        navigate('/login');
      }
    };

    getProfile();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.clear();
    navigate('/login');
  };

  const userDataStats = [
    { label: "Total Skrining", value: "12", icon: Activity, color: "text-blue-500" },
    { label: "Kondisi Sehat", value: "85%", icon: ShieldCheck, color: "text-emerald-500" },
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-slate-100 overflow-x-hidden relative font-sans">
      
      <div className="fixed top-[-10%] right-[-10%] w-150 h-150 bg-blue-200/30 blur-[120px] rounded-full z-0"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-150 h-150 bg-emerald-200/20 blur-[120px] rounded-full z-0"></div>

      <nav className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-lg z-[100] border-b border-white/20">
        <div className="max-w-350 mx-auto pt-3 pb-3 px-8 flex justify-between items-center">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-slate-600 hover:text-[#1e3a8a] font-bold transition-all">
            <ChevronLeft className="w-5 h-5" /> Kembali
          </button>
          <div className="flex items-center gap-2 font-black text-xl text-[#1e3a8a]">Profile</div>
          <div className="w-20"></div>
        </div>
      </nav>

      <main className="relative z-10 pt-25 pb-8 px-6 flex justify-center">
        <div className="max-w-3xl w-full">
          
          <div className="bg-white/60 backdrop-blur-md border border-white/80 rounded-[3rem] p-8 md:p-12 shadow-xl relative overflow-hidden">
            
            <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
              <div className="relative group flex items-center justify-center">
                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                <div className="w-36 h-36 bg-[#1e3a8a] rounded-full flex items-center justify-center text-white overflow-hidden cursor-pointer group-hover:shadow-2xl transition-all duration-300" onClick={triggerFileInput}>
                  {profilePic ? (
                    <img src={profilePic} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <User size={64} strokeWidth={1.5} />
                  )}
                </div>
                <button onClick={triggerFileInput} className="absolute bottom-1 right-1 bg-white p-2.5 rounded-full shadow-lg border border-slate-100 text-[#1e3a8a] hover:scale-110 transition-all">
                  <Camera size={16} />
                </button>
              </div>

              <div className="text-center md:text-left">
                <h1 className="text-3xl font-black text-slate-900 mb-1">{userName}</h1>
                <p className="text-[#1e3a8a] font-bold uppercase tracking-widest text-xs mb-4">{userJob}</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-500 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-slate-400" />
                    {userEmail}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-slate-400" />
                    {userLocation}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-12">
              {userDataStats.map((stat, i) => (
                <div key={i} className="bg-white/40 border border-white p-6 rounded-3xl shadow-md flex items-center gap-4 hover:scale-105 transition-all">
                  <div className={`p-3 rounded-2xl bg-white shadow-sm ${stat.color}`}><stat.icon size={24} /></div>
                  <div>
                    <div className="text-2xl font-black text-slate-800">{stat.value}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-4 mb-4">Pengaturan Akun</h3>
              
              <button onClick={() => navigate('/update-profile')} className="w-full flex items-center justify-between p-5 bg-white/40 hover:bg-white rounded-2xl transition-all border border-transparent hover:border-white hover:scale-105 duration-300 shadow-sm group">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Calendar size={18} /></div>
                  <span className="font-bold text-slate-700 text-sm">Update Data Diri</span>
                </div>
                <Edit3 size={16} className="text-slate-300 group-hover:text-[#1e3a8a]" />
              </button>

              <button onClick={() => navigate('/security')} className="w-full flex items-center justify-between p-5 bg-white/40 hover:bg-white rounded-2xl transition-all border border-transparent hover:border-white hover:scale-105 duration-300 shadow-sm group">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><ShieldCheck size={18} /></div>
                  <span className="font-bold text-slate-700 text-sm">Keamanan & Password</span>
                </div>
                <Edit3 size={16} className="text-slate-300 group-hover:text-[#1e3a8a]" />
              </button>

              <button onClick={handleLogout} className="w-full flex items-center gap-4 p-5 text-red-500 hover:bg-red-50 rounded-2xl transition-all font-bold text-sm mt-8">
                <LogOut size={18} /> Keluar dari Akun
              </button>
            </div>

          </div>

          <p className="text-center mt-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
            HealthLogia • Ngawangkong Team
          </p>
        </div>
      </main>
    </div>
  );
}