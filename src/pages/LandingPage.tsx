import { useNavigate } from 'react-router-dom';
import { 
  HeartPulse, 
  ArrowUpRight, 
  ChevronDown, 
  Activity, 
  BriefcaseMedical, 
  Trophy, 
  Droplets,
  Phone,
  Plus
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  const navigateKeLogin = () => {
    navigate('/login');
  };

  return (
    // Background gradient persis seperti desain (biru es ke putih)
    <div className="min-h-screen bg-gradient-to-br from-[#D9EAF5] via-[#E6F2F8] to-[#F8FAFC] text-slate-800 font-sans overflow-hidden relative">
      
      {/* --- FLOATING STICKERS (Aksen miring di background) --- */}
      <div className="absolute top-[40%] left-10 bg-[#8DA5BA]/20 backdrop-blur-sm text-[#4A647A] font-black text-xs px-6 py-2 rounded-full -rotate-12 tracking-widest pointer-events-none z-0 shadow-sm">WEBSITE</div>
      <div className="absolute top-[55%] left-24 bg-[#8DA5BA]/20 backdrop-blur-sm text-[#4A647A] font-black text-xs px-6 py-2 rounded-full -rotate-12 tracking-widest pointer-events-none z-0 shadow-sm">UI/UX</div>
      <div className="absolute top-[45%] right-10 bg-[#8DA5BA]/20 backdrop-blur-sm text-[#4A647A] font-black text-xs px-6 py-2 rounded-full rotate-12 tracking-widest pointer-events-none z-0 shadow-sm">MEDICAL</div>
      <div className="absolute bottom-[20%] right-10 bg-[#8DA5BA]/20 backdrop-blur-sm text-[#4A647A] font-black text-xs px-6 py-2 rounded-full -rotate-6 tracking-widest pointer-events-none z-0 shadow-sm">HAMIDA JANNAT</div>

      {/* 1. NAVBAR */}
      <nav className="pt-6 pb-4 px-8 flex justify-between items-center max-w-[1400px] mx-auto relative z-50">
        {/* Logo */}
        <div className="flex items-center gap-2 font-black text-2xl text-[#1e3a8a]">
          <div className="bg-[#1e3a8a] p-1 rounded-md">
            <Plus className="text-[#4ade80] w-5 h-5" strokeWidth={4} />
          </div>
          HealthLogia
        </div>
        
        {/* Links */}
        <div className="hidden lg:flex items-center gap-10 font-bold text-[13px] text-slate-500">
          <a href="#" className="text-slate-800 border-b-2 border-slate-800 pb-1">Home</a>
          <a href="#" className="hover:text-slate-800 transition-colors">About</a>
          <a href="#" className="hover:text-slate-800 transition-colors flex items-center gap-1">Departments <ChevronDown className="w-4 h-4" /></a>
          <a href="#" className="hover:text-slate-800 transition-colors">Doctors</a>
          <a href="#" className="hover:text-slate-800 transition-colors">Career</a>
        </div>
        
        {/* CTA Button */}
        <button onClick={navigateKeLogin} className="bg-white pl-6 pr-2 py-2 rounded-full font-bold text-sm flex items-center gap-4 shadow-sm hover:shadow-md transition-all text-slate-700">
          Masuk 
          <div className="bg-[#4ade80] p-2 rounded-full">
             <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
        </button>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative pt-12 pb-20 px-8 max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-4 items-center min-h-[700px]">
        
        {/* KIRI: TEKS (Kolom 5/12) */}
        <div className="col-span-5 flex flex-col gap-6 relative z-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/60 w-fit shadow-sm">
            <Activity className="w-4 h-4 text-slate-700" />
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-700">Cek kesehatan lebih praktis</span>
          </div>
          
          {/* Main Heading (Putih tebal) */}
         <h1 className="text-[70px] lg:text-[50px] font-black text-white leading-[0.95] tracking-tight drop-shadow-md uppercase">
  {/* Gunakan inline-flex agar ikon menempel pas setelah kata ANDA */}
  <span className="inline-flex items-center gap-4">
    PAHAMI GEJALA ANDA 
  
  </span>

  <span className="block mt-2">
    DENGAN CARA YANG
  </span>

  <span className="block text-[#1e3a8a]">
    BARU DAN UNIK
  </span>
</h1>
          
          <p className="text-[#4A647A] text-sm max-w-sm leading-relaxed font-medium mt-2">
            Analisis gejala atau kondisi kulit Anda menggunakan AI canggih.Dapatkan skrining awal dan saran tindakan dalam hitungan detik.
          </p>
          <div className=' w-fit  flex items-center gap-6 '>
            <button onClick={navigateKeLogin} className=" bg-[#1e3a8a] text-white rounded-full font-bold text-sm  mt-4 w-fit pl-8 pr-3 py-3 flex items-center gap-6 hover:bg-[#152c6b] transition-all shadow-xl hover:scale-105 transition-transform cursor-pointer">
            Tentang kami
            <div className="bg-white/20 p-2 rounded-full ">
              <ArrowUpRight className="w-4 h-4 text-white" />
            </div>
          </button>
            <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm border border-white/30 shadow-sm">
      <HeartPulse className="w-12 h-12 text-[#1e3a8a]" />
    </div>
          
          </div>
        </div>

        {/* KANAN: KOMPOSISI GAMBAR COMPLEX (Kolom 7/12) */}
        <div className="col-span-7 relative h-full w-full">
          
          {/* 1. Teks Profile Top Right */}
          <div className="absolute -top-4 right-10 bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-white flex items-center gap-3 z-30 hover:scale-105 transition-transform cursor-pointer">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" className="w-10 h-10 rounded-full object-cover" alt="Profile" />
            <div>
              <div className="font-bold text-[#1e3a8a] text-sm">@hamida_jannat</div>
              <div className="text-[10px] text-slate-500 font-semibold">Landing Page UI Designer</div>
            </div>
          </div>

          {/* 2. Dokter Center (Bentuk Kapsul/Arched) */}
          <div className="absolute top-10 left-[15%] w-[320px] h-[460px] z-10">
            <div className="w-full h-full bg-white/40 backdrop-blur-xl rounded-t-[200px] rounded-b-[40px] shadow-2xl border-4 border-white/60 overflow-hidden relative">
              <img src="https://png.pngtree.com/png-vector/20260317/ourlarge/pngtree-healthy-blue-lungs-medical-illustration-png-image_18939243.webp" className="w-full h-full object-cover mt-8 scale-110" alt="Doctor" />
            </div>
            {/* Badge Bawah Dokter */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-white flex items-center gap-3 w-[75%] hover:scale-105 transition-transform cursor-pointer">
              <div className="bg-[#1e3a8a] p-2.5 rounded-xl text-white"><BriefcaseMedical className="w-5 h-5"/></div>
              <div>
                <div className="font-black text-slate-800 text-sm">22 Years</div>
                <div className="text-[9px] font-bold text-slate-500">Medical Excellence</div>
              </div>
            </div>
          </div>

          {/* 3. Paru-Paru 3D Right */}
          <div className="absolute top-10 right-0 w-[350px] h-[400px] z-0 flex items-center justify-center">
            {/* Ganti src ini dengan gambar paru-paru transparan kamu nanti */}
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP1H2s1I08MedzxDGZbQPQGPgjlLESnhEf1g&s" className="w-full object-contain mix-blend-multiply opacity-80 rounded-full" alt="Lungs 3D" />
            
            {/* Badge Kanan Paru-Paru */}
            <div className="absolute right-[-20px] top-1/2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-white flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer">
              <Droplets className="w-4 h-4 text-slate-600" />
              <div>
                <div className="font-black text-slate-800 text-sm leading-none">6700</div>
                <div className="text-[8px] font-bold text-slate-500 leading-none mt-1">Healed Lungs</div>
              </div>
            </div>
          </div>

          {/* 4. Awards Badge Center Top */}
          <div className="absolute top-16 right-[35%] bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white flex flex-col items-center z-20 hover:scale-105 transition-transform cursor-pointer">
             <div className="text-xl font-black text-slate-800 leading-none">490</div>
             <div className="text-[8px] text-slate-500 font-bold uppercase mt-1">Awards</div>
             <Trophy className="w-6 h-6 text-slate-400 mt-2" />
          </div>

        </div>
      </section>

      {/* 3. THREE CARDS SECTION */}
      <section className="relative z-30 px-8 max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 -mt-10">
        {/* Card 1: Brain */}
        <div className="bg-white/60 backdrop-blur-md p-6 rounded-[30px] border border-white shadow-lg relative group cursor-pointer hover:-translate-y-2 transition-transform">
          <div className="absolute top-6 right-6 bg-[#4ade80] p-2 rounded-full">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
          <div className="w-32 h-32 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
             <img src="src/img/bhc.png" alt="Brain" className="object-cover w-full h-full mix-blend-multiply" />
          </div>
          <h3 className="text-center font-black text-[#1e3a8a] text-lg w-2/3 mx-auto leading-tight">Brain Health Check</h3>
        </div>

        {/* Card 2: Liver */}
        <div className="bg-white/60 backdrop-blur-md p-6 rounded-[30px] border border-white shadow-lg relative group cursor-pointer hover:-translate-y-2 transition-transform">
          <div className="absolute top-6 right-6 bg-[#4ade80] p-2 rounded-full">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
          <div className="w-32 h-32 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center overflow-hidden">
             <img src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=400&auto=format&fit=crop" alt="Liver" className="object-cover w-full h-full mix-blend-multiply" />
          </div>
          <h3 className="text-center font-black text-[#1e3a8a] text-lg w-2/3 mx-auto leading-tight">Liver Function Test</h3>
        </div>

        {/* Card 3: Kidney (Dark Blue) */}
        <div className="bg-[#1e3a8a] p-6 rounded-[30px] shadow-xl relative group cursor-pointer hover:-translate-y-2 transition-transform">
          <div className="absolute top-6 right-6 bg-white p-2 rounded-full">
            <ArrowUpRight className="w-4 h-4 text-[#1e3a8a]" />
          </div>
          <div className="w-32 h-32 mx-auto mb-4 bg-blue-800 rounded-full flex items-center justify-center overflow-hidden">
             <img src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=400&auto=format&fit=crop" alt="Kidney" className="object-cover w-full h-full mix-blend-screen opacity-50" />
          </div>
          <h3 className="text-right font-black text-white text-lg w-2/3 ml-auto leading-tight absolute bottom-8 right-8">Kidney Health Scan</h3>
        </div>
      </section>

      {/* 4. ABOUT SECTION */}
      <section className="py-24 px-8 max-w-[1400px] mx-auto grid md:grid-cols-2 gap-20 items-center">
        {/* Kiri: Hospital Image & Overlay */}
        <div className="relative flex items-center">
  {/* 1. Kontainer Gambar Utama - Dibuat w-[85%] agar ada ruang untuk kartu melayang di kanan */}
  <div className="rounded-[40px] overflow-hidden shadow-2xl h-[400px] w-[85%] border-8 border-white bg-white">
    <img 
      src="src/img/logo_hl.png" 
      alt="Hospital" 
      className="w-full h-full object-cover" // Pakai object-contain agar logo burung hantunya tidak terpotong
    />
  </div>

  {/* 2. Floating Card Nuvica - Digeser ke kanan (right-[-20px]) agar tidak menghalangi logo */}
  <div className="absolute top-8 right-[-50px] bg-white/90 backdrop-blur-md p-6 rounded-[30px] shadow-2xl border border-white max-w-[200px] z-10">
    <div className="flex items-center gap-2 mb-4">
      <div className="bg-[#1e3a8a] text-white p-1 rounded font-bold text-[10px]">
        <Plus className="w-3 h-3"/>
      </div>
      <span className="text-[12px] font-black tracking-widest text-slate-600 uppercase">HealthLogia</span>
    </div>
    <div className="text-[11px] font-black mb-2 text-slate-800 tracking-tight">
      ESTABLISHED<br/>2024
    </div>
    <p className="text-[12px] font-semibold text-slate-500 leading-tight">
      Committed to your health and well-being.
    </p>
  </div>
</div>

        {/* Kanan: About Text */}
        <div className="flex flex-col gap-6 relative">
           {/* Profile Badge Kiri Bawah Text */}
           <div className="absolute -left-32 bottom-0 bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-white flex items-center gap-3 z-30">
          </div>

          <div className="bg-[#4ade80] text-white text-[10px] font-black px-4 py-1.5 rounded-full w-fit uppercase tracking-widest shadow-sm">About Us</div>
          <h2 className="text-[44px] font-black text-[#1e3a8a] leading-[1.1] tracking-tight">
            YOUR NUVICA MEDICAL HOSPITAL
          </h2>
          <p className="text-slate-500 font-medium leading-relaxed max-w-md">
            We Combine Clinical Expertise, Innovative Technology, And A Patient-First Approach To Ensure Accurate Diagnosis And Effective Treatment.
          </p>
          <div className="flex items-center gap-8 mt-2">
             <button className="bg-[#1e3a8a] text-white pl-6 pr-3 py-2.5 rounded-full font-bold text-sm flex items-center gap-4 hover:bg-[#152c6b] transition-all shadow-md">
               Learn More <div className="bg-white/20 p-1.5 rounded-full"><ArrowUpRight className="w-3 h-3" /></div>
             </button>
             <div className="flex items-center gap-3">
               <div className="p-3 bg-white shadow-sm border border-slate-100 rounded-full"><Phone className="w-4 h-4 text-slate-400"/></div>
               <div>
                 <div className="text-[10px] text-slate-400 font-bold">For Any Questions</div>
                 <div className="font-black text-slate-700 text-sm">+8801616876080</div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 5. STATS SECTION (Bottom) */}
      <section className="py-12 px-8 max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10 border-t border-slate-300/30">
        {[
          { val: "$250M", label: "In Healthcare Funding" },
          { val: "20M+", label: "Patients Served Globally" },
          { val: "95%", label: "Patient Satisfaction Rate" },
          { val: "200+", label: "Medical Professionals" }
        ].map((stat, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="text-[40px] font-black text-[#1e3a8a] leading-none">{stat.val}</div>
            <div className="text-[10px] text-slate-500 font-bold leading-tight max-w-[120px] mx-auto">{stat.label}</div>
          </div>
        ))}
      </section>

    </div>
  );
}