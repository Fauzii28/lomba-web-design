import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HeartPulse, 
  ArrowUpRight, 
  Activity, 
  Phone,
  Mail,
  Menu,
  X
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  // 1. STATE UNTUK NAVBAR SCROLL & MOBILE MENU
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateKeLogin = () => {
    navigate('/login');
    setIsMobileMenuOpen(false); // Tutup menu saat pindah halaman
  };

  // 2. FUNGSI SMOOTH SCROLL UNTUK NAVBAR
  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Tutup menu mobile setelah klik
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 3. FUNGSI UNTUK TOMBOL FEEDBACK (Membuka Halaman Baru)
  const handleFeedback = () => {
    navigate('/feedback'); // Mengarahkan ke route /feedback
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D9EAF5] via-[#E6F2F8] to-[#F8FAFC] text-slate-800 font-sans overflow-hidden relative">
      
      {/* --- FLOATING STICKERS (Sembunyikan di Mobile) --- */}
      <motion.div 
        animate={{ y: [0, -10, 0] }} 
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="hidden md:block absolute top-[45%] right-10 bg-[#8DA5BA]/20 backdrop-blur-sm text-[#4A647A] font-black text-xs px-6 py-2 rounded-full rotate-12 tracking-widest pointer-events-none z-0 shadow-sm"
      >
        MEDICAL
      </motion.div>

      {/* 1. NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-md py-3' : 'bg-transparent py-4 md:py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 font-black text-xl md:text-2xl text-[#1e3a8a] cursor-pointer z-50">
            <div className="bg-[#1e3a8a] p-1.5 rounded-lg shadow-sm">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-[#4ade80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>                                                                                                                
            </div>
            HealthLogia
          </motion.div>
          
          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10 font-bold text-[14px] text-slate-500 uppercase tracking-widest">
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-slate-800 border-b-2 border-slate-800 pb-1">Beranda</a>
            <a href="#carakerja" onClick={(e) => scrollToSection(e, 'carakerja')} className="hover:text-slate-800 transition-colors">Cara Kerja</a>
            <a href="#tentang" onClick={(e) => scrollToSection(e, 'tentang')} className="hover:text-slate-800 transition-colors">Tentang Kami</a>
            <a href="#kontak" onClick={(e) => scrollToSection(e, 'kontak')} className="hover:text-slate-800 transition-colors">Kontak</a>
          </div>
          
          {/* Desktop CTA Button */}
          <motion.button 
            onClick={navigateKeLogin} 
            whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="hidden lg:flex bg-white pl-6 pr-2 py-2 rounded-full font-bold text-sm items-center gap-4 shadow-sm text-slate-700 cursor-pointer"
          >
            Masuk 
            <div className="bg-[#4ade80] p-2 rounded-full">
               <ArrowUpRight className="w-4 h-4 text-white" />
            </div>
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#1e3a8a] z-50 bg-white/50 backdrop-blur-sm rounded-lg"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl shadow-xl lg:hidden border-t border-slate-100 p-6 flex flex-col gap-6"
            >
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMobileMenuOpen(false); }} className="text-xl font-black text-[#1e3a8a]">BERANDA</a>
              <a href="#carakerja" onClick={(e) => scrollToSection(e, 'carakerja')} className="text-xl font-black text-[#1e3a8a]">CARA KERJA</a>
              <a href="#tentang" onClick={(e) => scrollToSection(e, 'tentang')} className="text-xl font-black text-[#1e3a8a]">TENTANG KAMI</a>
              <a href="#kontak" onClick={(e) => scrollToSection(e, 'kontak')} className="text-xl font-black text-[#1e3a8a]">KONTAK</a>
              <button 
                onClick={navigateKeLogin}
                className="mt-4 bg-[#1e3a8a] text-white px-8 py-4 rounded-full font-bold text-sm w-full"
              >
                MASUK SEKARANG
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 2. HERO SECTION */}
      {/* Mengubah layout menjadi flex-col di mobile, grid di layar besar */}
      <section className="relative pt-32 md:pt-40 pb-20 px-6 md:px-10 max-w-7xl mx-auto flex flex-col-reverse lg:grid lg:grid-cols-12 gap-10 lg:gap-2 items-center min-h-[auto] lg:min-h-screen">
        
        {/* KIRI: TEKS */}
        <div className="lg:col-span-5 flex flex-col gap-6 relative z-20 text-center lg:text-left items-center lg:items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/60 w-fit shadow-sm">
            <Activity className="w-4 h-4 text-slate-700" />
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-wider text-slate-700">Cek kesehatan lebih praktis</span>
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-4xl md:text-6xl lg:text-[45px] font-black text-slate-900 leading-[1.1] md:leading-[0.95] tracking-tight drop-shadow-sm uppercase flex flex-col">
            <span>SOLUSI CERDAS</span>
            <span>PANTAU KESEHATAN</span>
            <span className="text-2xl md:text-5xl lg:text-[40px] mt-2">DENGAN CARA YANG</span>
            <span className="text-[#1e3a8a] mt-2 md:mt-4">BARU DAN UNIK</span>
          </motion.h1>
          
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-[#4A647A] text-sm md:text-base max-w-md leading-relaxed font-medium">
            Analisis gejala atau konsultasi keluhan menggunakan AI canggih. Dapatkan skrining awal dan saran tindakan dalam hitungan detik.
          </motion.p>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className='w-full lg:w-fit flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 mt-4'>
            <motion.button 
              onClick={navigateKeLogin} 
              whileHover={{ scale: 1.05, backgroundColor: "#152c6b" }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#1e3a8a] text-white rounded-full font-bold text-sm md:text-md w-full sm:w-fit pl-8 pr-3 py-3 flex items-center justify-between sm:justify-start gap-6 shadow-xl cursor-pointer"
            >
              Cek Sekarang
              <div className="bg-white/20 p-2 rounded-full">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </motion.button>
            <motion.div whileHover={{ scale: 1.1, rotate: 10 }} className="hidden sm:flex bg-white/40 p-3 md:p-4 rounded-full backdrop-blur-sm border border-white/60 shadow-md cursor-pointer">
              <HeartPulse className="w-8 h-8 md:w-10 md:h-10 text-[#1e3a8a]" />
            </motion.div>
          </motion.div>
        </div>

        {/* KANAN: GAMBAR */}
        {/* Disesuaikan ukurannya untuk mobile agar tidak melebar */}
        <div className="lg:col-span-7 relative w-full h-[300px] sm:h-[400px] lg:h-full mt-10 lg:mt-0 flex justify-center items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute lg:top-6 lg:left-[15%] w-[250px] sm:w-[320px] h-[350px] sm:h-[450px] z-10 cursor-pointer"
          >
            <div className="w-full h-full bg-white/40 backdrop-blur-xl rounded-t-[150px] sm:rounded-t-[200px] rounded-b-[30px] sm:rounded-b-[40px] shadow-2xl border-4 border-white/60 overflow-hidden relative">
              <motion.img 
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
                src="src/img/paru.jpg" 
                className="w-full h-full object-cover mt-2 sm:mt-5 scale-110" 
                alt="Doctor" 
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
            transition={{ 
              opacity: { duration: 1, delay: 0.3 },
              scale: { duration: 1, delay: 0.3 },
              y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
            }}
            className="hidden md:flex absolute lg:top-10 lg:right-0 w-[300px] lg:w-[350px] z-0 items-center justify-center pointer-events-none"
          >
            <img src="/doctor.jpg" className="w-full object-contain mix-blend-multiply opacity-80 rounded-full" alt="Lungs 3D" />
          </motion.div>
        </div>
      </section>

      {/* 3. CARA KERJA */}
      {/* Padding dan margin disesuaikan untuk layar kecil */}
      <section id='carakerja' className="relative pt-20 lg:pt-30 z-30 px-6 lg:px-12 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:-mt-20">
        
        {/* Card 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          whileHover={{ y: -8, scale: 1.02 }}
          className="bg-white/60 backdrop-blur-md p-6 sm:p-8 rounded-[30px] border border-white shadow-lg relative cursor-pointer"
        >
          <div className="absolute top-6 right-6 bg-[#4565bd] p-2 rounded-full"><ArrowUpRight className="w-4 h-4 text-white" /></div>
          <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
             <motion.img whileHover={{ scale: 1.1 }} src="https://plus.unsplash.com/premium_photo-1661432571518-975c430f529e?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Microscope" className="object-cover w-full h-full mix-blend-multiply transition-transform duration-300" />
          </div>
          <h3 className="font-black text-[#1e3a8a] text-lg sm:text-xl leading-tight text-center sm:text-left">Ambil Foto</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-3 leading-relaxed text-center sm:text-left">Scan kondisi fisik atau gejala luar menggunakan fitur Computer Vision kami.</p>
        </motion.div>

        {/* Card 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ y: -8, scale: 1.02 }}
          className="bg-white/60 backdrop-blur-md p-6 sm:p-8 rounded-[30px] border border-white shadow-lg relative cursor-pointer"
        >
          <div className="absolute top-6 right-6 bg-[#4565bd] p-2 rounded-full"><ArrowUpRight className="w-4 h-4 text-white" /></div>
          <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 bg-teal-100 rounded-full flex items-center justify-center overflow-hidden">
             <motion.img whileHover={{ scale: 1.1 }} src="https://plus.unsplash.com/premium_photo-1726837223703-a7b3e0752141?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Stethoscope" className="object-cover w-full h-full mix-blend-multiply transition-transform duration-300" />
          </div>
          <h3 className="font-black text-[#1e3a8a] text-lg sm:text-xl leading-tight text-center sm:text-left">Input Keluhan</h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-3 leading-relaxed text-center sm:text-left">Tuliskan apa yang Anda rasakan untuk dianalisis oleh algoritma kesehatan kami.</p>
        </motion.div>

        {/* Card 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ y: -8, scale: 1.02 }}
          className="bg-[#3757b0] p-6 sm:p-8 rounded-[30px] shadow-xl relative cursor-pointer sm:col-span-2 lg:col-span-1"
        >
          <div className="absolute top-6 right-6 bg-white p-2 rounded-full"><ArrowUpRight className="w-4 h-4 text-[#1e3a8a]" /></div>
          <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 bg-blue-800 rounded-full flex items-center justify-center overflow-hidden">
             <motion.img whileHover={{ scale: 1.1 }} src="https://images.unsplash.com/photo-1619691249147-c5689d88016b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlhZ25vc2lzfGVufDB8fDB8fHww" alt="Result" className="object-cover w-full h-full mix-blend-screen opacity-50 transition-transform duration-300" />
          </div>
          <h3 className="font-black text-white text-lg sm:text-xl leading-tight text-center sm:text-left">Hasil & Validasi</h3>
          <p className="text-xs sm:text-sm text-blue-100 mt-3 leading-relaxed text-center sm:text-left">Dapatkan diagnosis awal dan lakukan kuesioner tambahan untuk akurasi tinggi.</p>
        </motion.div>
      </section>

      {/* 4. ABOUT SECTION */}
      {/* Disesuaikan layout gridnya untuk mobile (gambar di atas teks) */}
      <section id='tentang' className="py-20 px-6 md:px-8 lg:pt-30 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Kiri: Hospital Image & Overlay */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="relative flex items-center justify-center lg:justify-start px-2 cursor-pointer order-2 lg:order-1"
        >
          <div className="rounded-[40px] overflow-hidden shadow-2xl h-[300px] md:h-[400px] w-full lg:w-[85%] border-8 border-white bg-white">
            <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} src="src/img/logo.jpg" alt="Hospital" className="w-full h-full object-cover" />
          </div>

          <motion.div 
            animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-4 md:top-8 right-0 md:right-[-20px] lg:right-[-50px] bg-white/95 backdrop-blur-md p-4 md:p-5 rounded-[20px] md:rounded-[30px] shadow-2xl border border-slate-100 max-w-[180px] md:max-w-[200px] z-10"
          >
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <div className="bg-[#1e3a8a] text-white p-1 rounded font-bold text-[10px]">
                <svg className="w-3 h-3 md:w-4 md:h-4 text-[#4ade80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg> 
              </div>
              <span className="text-[10px] md:text-[12px] font-black tracking-widest text-slate-600 uppercase">HealthLogia</span>
            </div>
            <div className="text-[10px] md:text-[11px] font-black mb-1 md:mb-2 text-slate-800 tracking-tight">DIDIRIKAN<br/>2026</div>
            <p className="text-[10px] md:text-[12px] font-semibold text-slate-500 leading-tight">Berkomitmen pada kesehatan dan kesejahteraan Anda.</p>
          </motion.div>
        </motion.div>

        {/* Kanan: About Text */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="flex flex-col gap-4 md:gap-6 relative px-2 order-1 lg:order-2 text-center lg:text-left items-center lg:items-start"
        >
          <div className="bg-[#4ade80] text-white text-[10px] font-black px-4 py-1.5 rounded-full w-fit uppercase tracking-widest shadow-sm">Inovasi Kesehatan</div>
          <h2 className="text-3xl md:text-[44px] font-black text-[#1e3a8a] leading-[1.1] tracking-tight">ASISTEN MEDIS ANDA</h2>
          <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed max-w-md">
            HealthLogia adalah manifestasi teknologi dalam membantu masyarakat memahami kondisi kesehatan lebih awal. Dengan AI, kami mempermudah akses informasi medis secara cepat dan terjangkau.
          </p>
          <div className="flex items-center justify-center lg:justify-start gap-8 mt-2 md:mt-4">
             <div className="flex items-center gap-3">
               <motion.div whileHover={{ rotate: 15 }} className="p-3 bg-white shadow-sm border border-slate-100 rounded-full cursor-pointer"><Phone className="w-4 h-4 text-[#1e3a8a]"/></motion.div>
               <div className="text-left">
                 <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Hubungi Kami</div>
                 <div className="font-black text-slate-700 text-sm">+62 812-3456-7890</div>
               </div>
             </div>
          </div>
        </motion.div>
      </section>

      {/* 5. FOOTER & CONTACT SECTION */}
      {/* Penyesuaian padding dan flex-col untuk layar kecil */}
      <footer id='kontak' className="bg-[#1e3a8a] text-white pt-12 md:pt-15 pb-8 md:pb-10 px-6 md:px-10 rounded-t-[30px] md:rounded-t-[50px] mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-10 border-b border-white/10 pb-10 md:pb-16 text-center sm:text-left">
          
          {/* Brand Kolom */}
          <div className="flex flex-col gap-4 md:gap-6 items-center sm:items-start">
            <div className="flex items-center gap-2 font-black text-xl md:text-2xl">
              <div className="bg-white p-1 rounded-md">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-[#4ade80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>                    
              </div>
              HealthLogia
            </div>
            <p className="text-blue-100/60 text-xs md:text-sm leading-relaxed font-medium max-w-[250px] sm:max-w-none">
              Transformasi digital kesehatan untuk masyarakat yang lebih peduli pada deteksi dini.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4 md:gap-6">
            <h4 className="font-black text-base md:text-lg uppercase tracking-wider">Navigasi</h4>
            <div className="flex flex-col gap-2 md:gap-3 text-blue-100/70 text-xs md:text-sm font-semibold">
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#4ade80] transition-colors">Beranda</a>
              <a href="#carakerja" onClick={(e) => scrollToSection(e, 'carakerja')} className="hover:text-[#4ade80] transition-colors">Cara Kerja AI</a>
              <a href="#tentang" onClick={(e) => scrollToSection(e, 'tentang')} className="hover:text-[#4ade80] transition-colors">Tentang Kami</a>
              <a href="#kontak" onClick={(e) => scrollToSection(e, 'kontak')} className="hover:text-[#4ade80] transition-colors">Kontak Tim</a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-4 md:gap-6 items-center sm:items-start">
            <h4 className="font-black text-base md:text-lg uppercase tracking-wider">Kontak Kami</h4>
            <div className="flex flex-col gap-3 md:gap-4 text-blue-100/70 text-xs md:text-sm">
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <Mail className="w-4 h-4 md:w-5 md:h-5 text-[#4ade80]" />
                <p>support@healthlogia.unma.ac.id</p>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <Phone className="w-4 h-4 md:w-5 md:h-5 text-[#4ade80]" />
                <p>+62 812-3456-7890</p>
              </div>
            </div>
          </div>

          {/* Feedback */}
          <div className="flex flex-col gap-4 md:gap-6 items-center sm:items-start">
            <h4 className="font-black text-base md:text-lg uppercase tracking-wider">Dukung Inovasi</h4>
            <p className="text-blue-100/60 text-xs md:text-sm leading-relaxed font-medium max-w-[250px] sm:max-w-none">
              Bantu kami menyempurnakan AI ini dengan memberikan masukan atau bergabung sebagai mitra medis.
            </p>
            <motion.button 
              onClick={handleFeedback} 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#4ade80] text-[#1e3a8a] py-2 md:py-3 px-6 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-black/20 w-full sm:w-auto mt-2"
            >
              Kirim Feedback
            </motion.button>
          </div>
        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto pt-6 md:pt-8 flex flex-col text-center text-blue-100/40 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">
          <div>© 2026 NGAWANGKONG TEAM UNMA. ALL RIGHTS RESERVED.</div>
        </div>
      </footer>

    </div>
  );
}