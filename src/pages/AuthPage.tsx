import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { ShieldCheck } from "lucide-react"; 

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;

      localStorage.setItem("userTelahLogin", "benar");
      if (data.user) {
        localStorage.setItem("userId", data.user.id);
      }

      navigate("/dashboard");
    } catch (err: any) {
      alert("Login Gagal: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Mengubah h-screen menjadi min-h-screen dan flex-col di mobile
    <div className="min-h-screen w-full bg-slate-100 overflow-x-hidden md:overflow-hidden relative font-sans flex flex-col md:flex-row md:items-stretch">
      
      {/* --- SISI KIRI (Branding & Logo) --- */}
      {/* flex-none di mobile dengan padding lebih kecil, flex-[1.2] di desktop */}
      <div className="relative flex-none md:flex-[1.2] bg-linear-to-br from-[#2e66a2] to-[#254292] overflow-hidden flex flex-col justify-between p-8 md:p-12 min-h-[40vh] md:min-h-screen">
        
        {/* Dekorasi Background - Ukuran disesuaikan untuk mobile */}
        <div
          style={{ borderRadius: "50%" }}
          className="absolute -top-16 -left-16 md:-top-32 md:-left-32 w-64 h-64 md:w-[600px] md:h-[600px] bg-[#3d60c1]/40 blur-3xl pointer-events-none z-0 animate-pulse"
        ></div>
        <div
          style={{ borderRadius: "50%" }}
          className="absolute -bottom-20 -right-20 md:-bottom-40 md:-right-40 w-48 h-48 md:w-[500px] md:h-[500px] bg-sky-700/30 blur-3xl pointer-events-none z-0"
        ></div>

        {/* LOGO SEBAGAI BUTTON KEMBALI */}
        <div 
          onClick={() => navigate("/")}
          className="relative z-10 flex items-center gap-3 cursor-pointer group w-fit transition-all"
          title="Kembali ke Beranda"
        >
          <div className="w-9 h-9 md:w-10 md:h-10 bg-white/20 rounded-xl md:rounded-2xl flex items-center justify-center border border-white/20 backdrop-blur-md group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
            <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-[#4ade80]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-black text-white tracking-tighter group-hover:text-sky-200 transition-colors">
              HealthLogia
            </span>
            <span className="text-[10px] hidden md:block text-white/0 transition-all font-bold uppercase tracking-widest leading-none">
              ← Kembali
            </span>
          </div>
        </div>

        <div className="relative z-10 space-y-6 md:space-y-8 mt-8 md:mt-0">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight md:leading-[1.1] tracking-tighter">
              Kesehatan Anda, <br className="hidden md:block" /> Prioritas Utama Kami.
            </h1>
            <p className="text-sm md:text-lg text-white/80 mt-3 md:mt-4 leading-relaxed max-w-md">
              HealthLogia menggunakan AI untuk membantu deteksi dini kondisi
              kesehatan Anda secara akurat dan cepat.
            </p>
          </div>
          
          {/* Statistik: Sembunyikan di layar sangat kecil, tampil di tablet ke atas */}
          <div className="hidden sm:grid grid-cols-2 gap-4 md:gap-8 max-w-md pt-6 border-t border-white/10">
            <div className="bg-white/10 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-white/10 hover:bg-white/15 transition-colors text-center md:text-left">
              <p className="text-3xl md:text-5xl font-extrabold text-white">150K+</p>
              <p className="text-[10px] md:text-sm text-white/70 mt-1 font-medium uppercase tracking-wider">Skrining Selesai</p>
            </div>
            <div className="bg-white/10 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-white/10 hover:bg-white/15 transition-colors text-center md:text-left">
              <p className="text-3xl md:text-5xl font-extrabold text-white">92%</p>
              <p className="text-[10px] md:text-sm text-white/70 mt-1 font-medium uppercase tracking-wider">Akurasi AI</p>
            </div>
          </div>
        </div>

        {/* Footer info: Sembunyikan di mobile agar tidak penuh */}
        <p className="relative z-10 text-[10px] text-white/40 font-medium hidden md:block">
          © 2026 HealthLogia AI Platform. Professional Screening Tool.
        </p>
      </div>

      {/* --- SISI KANAN (Form Login) --- */}
      {/* flex-none di mobile agar tidak terpotong, p-6 di mobile */}
      <div className="flex-none md:flex-1 bg-white/60 backdrop-blur-xl border-t md:border-t-0 md:border-l border-white/20 flex flex-col items-center justify-center p-6 md:p-12 relative min-h-[60vh]">
        <div
          style={{ borderRadius: "50%" }}
          className="absolute top-0 right-0 w-48 h-48 md:w-[300px] md:h-[300px] bg-blue-50/50 blur-3xl -z-10"
        ></div>

        {/* Card Form: rounded-[2rem] di mobile, p-6 di mobile */}
        <div
          className={`bg-white/50 backdrop-blur-2xl border border-white/80 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl w-full max-w-md relative z-10 transition-all duration-500 ${isLoading ? "opacity-80 scale-95" : "opacity-100"} hover:border-white transition-colors`}
        >
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-3xl md:text-4xl font-black text-slate-950 mb-2 tracking-tighter">
              Selamat Datang
            </h2>
            <p className="text-sm md:text-base text-slate-600 opacity-90 leading-relaxed font-medium">
              Silakan masuk ke akun Anda
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4 md:gap-5">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 md:mb-2 ml-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                placeholder="nama@email.com"
                required
                className="w-full px-4 md:px-5 py-3 md:py-4 rounded-xl md:rounded-2xl bg-white/70 border border-slate-200/80 focus:outline-none focus:border-[#7295f4] focus:ring-4 focus:ring-[#2648a6]/10 transition-all text-sm md:text-base text-slate-900 shadow-inner"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 md:mb-2 ml-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                placeholder="••••••••"
                required
                className="w-full px-4 md:px-5 py-3 md:py-4 rounded-xl md:rounded-2xl bg-white/70 border border-slate-200/80 focus:outline-none focus:border-[#7295f4] focus:ring-4 focus:ring-[#2648a6]/10 transition-all text-sm md:text-base text-slate-800 shadow-inner"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative py-3.5 md:py-4 rounded-xl md:rounded-2xl mt-4 flex items-center justify-center overflow-hidden group shadow-lg shadow-blue-500/10 transition-all active:scale-95 cursor-pointer disabled:opacity-70 disabled:cursor-wait"
            >
              {/* Background gradient button dipindah ke class agar konsisten di Tailwind v4 */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#7295f4] to-[#2648a6] opacity-90 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              
              {isLoading ? (
                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="text-white font-bold text-sm md:text-base">Memproses...</span>
                </div>
              ) : (
                <span className="relative z-10 text-white font-bold text-base md:text-lg tracking-wide">
                  Masuk Sekarang
                </span>
              )}
            </button>
          </form>

          <p className="text-center mt-6 md:mt-8 text-xs md:text-sm text-slate-500 font-medium">
            Belum punya akun?{" "}
            <span
              onClick={() => navigate("/registerpage")}
              className="text-[#264db8] font-extrabold cursor-pointer hover:underline underline-offset-4"
            >
              Daftar di sini
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}