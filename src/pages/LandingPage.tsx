import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HeartPulse, 
  ArrowUpRight, 
  Activity, 
  Phone,
  Mail
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateKeLogin = () => {
    navigate('/login');
  };

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFeedback = () => {
    navigate('/feedback'); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D9EAF5] via-[#E6F2F8] to-[#F8FAFC] text-slate-800 font-sans overflow-hidden relative">
      
      <motion.div 
        animate={{ y: [0, -10, 0] }} 
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute top-[45%] right-10 bg-[#8DA5BA]/20 backdrop-blur-sm text-[#4A647A] font-black text-xs px-6 py-2 rounded-full rotate-12 tracking-widest pointer-events-none z-0 shadow-sm"
      >
        MEDICAL
      </motion.div>

      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-8 ${
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-md py-2' : 'bg-transparent py-4'
      }`}>
        <div className="max-w-350 mx-auto px-8 flex justify-between items-center">
        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 font-black text-2xl text-[#1e3a8a] cursor-pointer">
          <div className="bg-[#1e3a8a] p-1 rounded-md shadow-inner">
            <svg className="w-5 h-5 text-[#4ade80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>                                                                                                                                                            
          </div>
          HealthLogia
        </motion.div>
        
        <div className="hidden lg:flex items-center gap-10 font-bold text-[15px] text-slate-500">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-slate-800 transition-colors">Beranda</a>
          <a href="#carakerja" onClick={(e) => scrollToSection(e, 'carakerja')} className="hover:text-slate-800 transition-colors">Cara Kerja</a>
          <a href="#tentang" onClick={(e) => scrollToSection(e, 'tentang')} className="hover:text-slate-800 transition-colors">Tentang Kami</a>
          <a href="#kontak" onClick={(e) => scrollToSection(e, 'kontak')} className="hover:text-slate-800 transition-colors">Kontak</a>
        </div>
        
        <motion.button 
          onClick={navigateKeLogin} 
          whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-white pl-6 pr-2 py-2 rounded-full font-bold text-md flex items-center gap-4 shadow-sm text-slate-700 cursor-pointer"
        >
          Masuk 
          <div className="bg-[#4ade80] p-2 rounded-full">
             <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
        </motion.button>
        </div>
      </nav>

      <section className="relative pt-20 pb-45 px-10 max-w-350 mx-auto grid lg:grid-cols-12 gap-2 items-center min-h-175">
        
        <div className="col-span-5 flex flex-col gap-6 relative z-20">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/60 w-fit shadow-sm">
            <Activity className="w-4 h-4 text-slate-700" />
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-700">Cek kesehatan lebih praktis</span>
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-[70px] lg:text-[45px] font-black text-white leading-[0.95] tracking-tight drop-shadow-md uppercase">
            <span className="inline-flex items-center gap-4">SOLUSI CERDAS</span>
            <span className="inline-flex items-center gap-4">PANTAU KESEHATAN</span>
            <span className="inline-flex items-center gap-4">DENGAN CARA YANG</span>
            <span className="block text-[#1e3a8a] mt-2">BARU DAN UNIK</span>
          </motion.h1>
          
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-[#4A647A] text-sm max-w-sm leading-relaxed font-medium">
            Analisis gejala atau konsultasi keluhan menggunakan AI canggih. Dapatkan skrining awal dan saran tindakan dalam hitungan detik.
          </motion.p>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className='w-fit flex items-center gap-6'>
            <motion.button 
              onClick={navigateKeLogin} 
              whileHover={{ scale: 1.05, backgroundColor: "#152c6b" }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#1e3a8a] text-white rounded-full font-bold text-md mt-4 w-fit pl-8 pr-3 py-3 flex items-center gap-6 shadow-xl cursor-pointer"
            >
              Cek Sekarang
              <div className="bg-white/20 p-2 rounded-full ">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </motion.button>
            <motion.div whileHover={{ scale: 1.1, rotate: 10 }} className="bg-white/20 p-2 rounded-full backdrop-blur-sm border border-white/30 shadow-sm mt-4 cursor-pointer">
              <HeartPulse className="w-12 h-12 text-[#1e3a8a]" />
            </motion.div>
          </motion.div>
        </div>

        <div className="col-span-7 relative h-full w-full">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03, y: -10 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute top-6 left-[15%] w-[320px] h-115 z-10 cursor-pointer"
          >
            <div className="w-full h-full bg-white/40 backdrop-blur-xl rounded-t-[200px] rounded-b-[40px] shadow-2xl border-4 border-white/60 overflow-hidden relative">
              <motion.img 
                whileHover={{ scale: 1.15 }} 
                transition={{ duration: 0.5 }}
                src="src/img/paru.jpg" 
                className="w-full h-full object-cover mt-5 scale-110" 
                alt="Doctor" 
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, -15, 0] }}
            transition={{ 
              opacity: { duration: 1, delay: 0.3 },
              scale: { duration: 1, delay: 0.3 },
              y: { repeat: Infinity, duration: 4, ease: "easeInOut" } 
            }}
            className="absolute top-10 right-0 w-87.5 h-[400px] z-0 flex items-center justify-center pointer-events-none"
          >
            <img src="src/img/doctor.jpg" className="w-full object-contain mix-blend-multiply opacity-80 rounded-full" alt="Lungs 3D" />
          </motion.div>
        </div>
      </section>

      <section id='carakerja' className="relative pt-30 z-30 px-12 max-w-350 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 -mt-30">
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          whileHover={{ y: -12, scale: 1.02, boxShadow: "0px 20px 30px rgba(0,0,0,0.1)" }}
          className="bg-white/60 backdrop-blur-md p-6 rounded-[30px] border border-white shadow-lg relative cursor-pointer"
        >
          <div className="absolute top-6 right-6 bg-[#4565bd] p-2 rounded-full"><ArrowUpRight className="w-4 h-4 text-white" /></div>
          <div className="w-32 h-32 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
             <motion.img whileHover={{ scale: 1.1 }} src="https://plus.unsplash.com/premium_photo-1661432571518-975c430f529e?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Microscope" className="object-cover w-full h-full mix-blend-multiply transition-transform duration-300" />
          </div>
          <h3 className="font-black text-[#1e3a8a] text-xl leading-tight">Ambil Foto</h3>
          <p className="text-sm text-slate-500 mt-3 leading-relaxed">Scan kondisi fisik atau gejala luar menggunakan fitur Computer Vision kami.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ y: -12, scale: 1.02, boxShadow: "0px 20px 30px rgba(0,0,0,0.1)" }}
          className="bg-white/60 backdrop-blur-md p-6 rounded-[30px] border border-white shadow-lg relative cursor-pointer"
        >
          <div className="absolute top-6 right-6 bg-[#4565bd] p-2 rounded-full"><ArrowUpRight className="w-4 h-4 text-white" /></div>
          <div className="w-32 h-32 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center overflow-hidden">
             <motion.img whileHover={{ scale: 1.1 }} src="https://plus.unsplash.com/premium_photo-1726837223703-a7b3e0752141?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Stethoscope" className="object-cover w-full h-full mix-blend-multiply transition-transform duration-300" />
          </div>
          <h3 className="font-black text-[#1e3a8a] text-xl leading-tight">Input Keluhan</h3>
          <p className="text-sm text-slate-500 mt-3 leading-relaxed">Tuliskan apa yang Anda rasakan untuk dianalisis oleh algoritma kesehatan kami.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ y: -12, scale: 1.02, boxShadow: "0px 20px 30px rgba(0,0,0,0.2)" }}
          className="bg-[#3757b0] p-6 rounded-[30px] shadow-xl relative cursor-pointer"
        >
          <div className="absolute top-6 right-6 bg-white p-2 rounded-full"><ArrowUpRight className="w-4 h-4 text-[#1e3a8a]" /></div>
          <div className="w-32 h-32 mx-auto mb-4 bg-blue-800 rounded-full flex items-center justify-center overflow-hidden">
             <motion.img whileHover={{ scale: 1.1 }} src="https://images.unsplash.com/photo-1619691249147-c5689d88016b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlhZ25vc2lzfGVufDB8fDB8fHww" alt="Result" className="object-cover w-full h-full mix-blend-screen opacity-50 transition-transform duration-300" />
          </div>
          <h3 className="font-black text-white text-xl leading-tight">Hasil & Validasi</h3>
          <p className="text-sm text-blue-100 mt-3 leading-relaxed">Dapatkan diagnosis awal dan lakukan kuesioner tambahan untuk akurasi tinggi.</p>
        </motion.div>
      </section>

      <section id='tentang' className="py-20 px-8 pt-30 max-w-350 mx-auto grid md:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.02 }} 
          className="relative flex items-center px-4 cursor-pointer"
        >
          <div className="rounded-[40px] overflow-hidden shadow-2xl h-[400px] w-[85%] border-8 border-white bg-white">
            <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} src="src/img/logo.jpg" alt="Hospital" className="w-full h-full object-cover" />
          </div>

          <motion.div 
            animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} // Kartu kecil melayang pelan
            className="absolute top-8 right-[-50px] bg-white/90 backdrop-blur-md p-5 rounded-[30px] shadow-2xl border border-white max-w-[200px] z-10"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-[#1e3a8a] text-white p-1 rounded font-bold text-[10px]">
                <svg className="w-4 h-4 text-[#4ade80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg> 
              </div>
              <span className="text-[12px] font-black tracking-widest text-slate-600 uppercase">HealthLogia</span>
            </div>
            <div className="text-[11px] font-black mb-2 text-slate-800 tracking-tight">DIDIRIKAN<br/>2026</div>
            <p className="text-[12px] font-semibold text-slate-500 leading-tight">Berkomitmen pada kesehatan dan kesejahteraan Anda.</p>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="flex flex-col gap-6 relative px-4"
        >
          <div className="bg-[#4ade80] text-white text-[10px] font-black px-4 py-1.5 rounded-full w-fit uppercase tracking-widest shadow-sm">Inovasi Kesehatan</div>
          <h2 className="text-[44px] font-black text-[#1e3a8a] leading-[1.1] tracking-tight">ASISTEN MEDIS ANDA</h2>
          <p className="text-slate-500 font-medium leading-relaxed max-w-md">
            HealthLogia adalah manifestasi teknologi dalam membantu masyarakat memahami kondisi kesehatan lebih awal. Dengan AI, kami mempermudah akses informasi medis secara cepat dan terjangkau.
          </p>
          <div className="flex items-center gap-8 mt-2">
             <div className="flex items-center gap-3">
               <motion.div whileHover={{ rotate: 15 }} className="p-3 bg-white shadow-sm border border-slate-100 rounded-full cursor-pointer"><Phone className="w-4 h-4 text-slate-400"/></motion.div>
               <div>
                 <div className="text-[10px] text-slate-400 font-bold">For Any Questions</div>
                 <div className="font-black text-slate-700 text-sm">+62 812-3456-7890</div>
               </div>
             </div>
          </div>
        </motion.div>
      </section>

      <footer id='kontak' className="bg-[#1e3a8a] text-white pt-15 pb-10 px-10 rounded-t-[50px]">
        <div className="max-w-350 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-white/10 pb-16">
          
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 font-black text-2xl">
              <div className="bg-[#1e3a8a] p-1 rounded-md">
                <svg className="w-5 h-5 text-[#4ade80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>                    
              </div>
              HealthLogia
            </div>
            <p className="text-blue-100/60 text-sm leading-relaxed font-medium">
              Transformasi digital kesehatan untuk masyarakat yang lebih peduli pada deteksi dini.
            </p>
            <div className="flex items-center gap-4">
              <motion.a whileHover={{ y: -3 }} href="#" className="p-2 bg-white/10 rounded-full hover:bg-[#4ade80] transition-colors"></motion.a>
              <motion.a whileHover={{ y: -3 }} href="#" className="p-2 bg-white/10 rounded-full hover:bg-[#4ade80] transition-colors"></motion.a>
              <motion.a whileHover={{ y: -3 }} href="#" className="p-2 bg-white/10 rounded-full hover:bg-[#4ade80] transition-colors"></motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="font-black text-lg uppercase tracking-wider">Navigasi</h4>
            <div className="flex flex-col gap-3 text-blue-100/70 text-sm font-semibold">
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#4ade80] transition-colors">Beranda</a>
              <a href="#carakerja" onClick={(e) => scrollToSection(e, 'carakerja')} className="hover:text-[#4ade80] transition-colors">Cara Kerja AI</a>
              <a href="#tentang" onClick={(e) => scrollToSection(e, 'tentang')} className="hover:text-[#4ade80] transition-colors">Tentang Kami</a>
              <a href="#kontak" onClick={(e) => scrollToSection(e, 'kontak')} className="hover:text-[#4ade80] transition-colors">Kontak Tim</a>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="font-black text-lg uppercase tracking-wider">Kontak Kami</h4>
            <div className="flex flex-col gap-4 text-blue-100/70 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#4ade80]" />
                <p>support@healthlogia.unma.ac.id</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#4ade80]" />
                <p>+62 812-3456-7890</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="font-black text-lg uppercase tracking-wider">Dukung Inovasi</h4>
            <p className="text-blue-100/60 text-sm leading-relaxed font-medium">
              Bantu kami menyempurnakan AI ini dengan memberikan masukan atau bergabung sebagai mitra medis.
            </p>
            <motion.button 
              onClick={handleFeedback} 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#4ade80] text-[#1e3a8a] py-3 rounded-full font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-black/20 cursor-pointer"
            >
              Kirim Feedback
            </motion.button>
          </div>
        </div>

        {/* Copyright */}
        <div className="max-w-350 mx-auto pt-8 flex flex-col md:flex-row justify-between items-center text-blue-100/40 text-[10px] font-black uppercase tracking-[0.2em]">
          <div>© 2024 Ngawangkong Team. All Rights Reserved.</div>
        </div>
      </footer>

    </div>
  );
}