import { useNavigate } from 'react-router-dom';
// Kita pakai ikon dari lucide-react yang sudah diinstal tadi
import { LayoutList, FileText, HeartPulse, UserSquare, BrainCircuit, Search } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  // Fungsi sakti untuk tombol "Mulai" agar pindah ke halaman Login/Register buatan Bolt
  const navigateKeLogin = () => {
    navigate('/login'); // Pastikan App.tsx sudah punya jalur '/login'
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans overflow-hidden">
      
      {/* 1. HEADER / NAVBAR (Atas) */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="font-black text-3xl text-slate-900 flex items-center gap-2">
          {/* Logo kita ganti dengan ikon sirkuit otak (simbol AI) */}
          <BrainCircuit className="text-pink-500 w-8 h-8" />
          HealthLogia.
        </div>
        <div className="hidden md:flex gap-8 font-medium text-slate-600">
          <a href="#" className="hover:text-pink-500">Layanan Kesehatan</a>
          <a href="#" className="hover:text-pink-500">Scan Gambar AI</a>
          <a href="#" className="hover:text-pink-500">Konsultasi Gejala</a>
          <a href="#" className="hover:text-pink-500">Tentang Kami</a>
        </div>
        <div className="flex gap-4">
          <button onClick={navigateKeLogin} className="text-slate-700 font-semibold px-4 py-2 rounded-xl hover:bg-white transition-colors">Masuk</button>
          <button onClick={navigateKeLogin} className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-xl font-semibold shadow-md transition-all">Daftar</button>
        </div>
      </nav>



      
      {/* 2. HERO SECTION (Tampilan Utama) */}
      <section className="relative py-20 px-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        {/* --- 1. EFEK LATAR BELAKANG AWAN BIRU (MESH GRADIENT) --- */}
        <div className="absolute top-[-20%] left-[-10%] w-125 h-125 bg-blue-400/30 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 bg-cyan-300/20 rounded-full blur-[120px] pointer-events-none "></div>

        {/* Kiri: Teks Stack */}
        <div className="flex flex-col gap-8 relative z-10">
          <h1 className="text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Pahami gejala Anda dengan cara <span className="text-blue-600">yang baru dan unik</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-lg">
            Analisis gejala atau kondisi kulit Anda menggunakan AI canggih. Dapatkan skrining awal dan saran tindakan dalam hitungan detik.
          </p>
          <div className="flex gap-6 items-center">
            {/* Tombol Utama */}
            <button 
              onClick={navigateKeLogin}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              Mulai Cek Sekarang
            </button>
            {/* Tombol Tentang Kami (Efek Kaca) */}
            <a href="#" className="flex items-center gap-3 text-blue-700 font-semibold hover:text-blue-800">
              <div className="p-2.5 bg-white/60 backdrop-blur-sm rounded-full text-blue-600 border border-white/80 shadow-sm">
                <HeartPulse className="w-5 h-5" />
              </div>
              Tentang Kami
            </a>
          </div>
          {/* Pola lingkaran putus-putus disesuaikan warnanya */}
          <div className="absolute -left-20 -top-20 -z-10 w-48 h-48 border-2 border-dashed border-blue-200/50 rounded-full"></div>
        </div>

        {/* Kanan: Foto Stack */}
        {/* Kanan: Foto Stack */}
        <div className="relative z-10 flex justify-center mt-10 md:mt-0">
          
          {/* KOTAK PENGUNCI (Wrapper) - Memaksa area ini jadi kotak sempurna agar isinya bulat */}
          <div className="relative w-72 md:w-88 aspect-square">
            
            {/* Pola lingkaran putus-putus (Sekarang 100% bulat karena mengikuti Kotak Pengunci) */}
            <div className="absolute inset-0 scale-[1.2] md:scale-[1.25] -z-10 border-2 border-dashed border-blue-200/50 rounded-full"></div>
            
            {/* Foto Utama */}
            <div className="relative w-full h-full border-4 border-white/50 rounded-full p-2 bg-white/20 backdrop-blur-sm shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=600&h=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Healthy user" 
                className="rounded-full w-full h-full object-cover border-4 border-white"
              />
            </div>

            {/* --- OVERLAYS CARD TRANPARAN --- */}
            
            {/* Card Kiri Atas */}
            <div className="absolute -top-4 -left-8 md:-left-12 bg-white/60 backdrop-blur-md p-3 md:p-4 rounded-3xl shadow-xl border border-white/80 flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer">
              <div className="p-2 md:p-3 bg-white/90 rounded-2xl text-blue-600 shadow-sm"><BrainCircuit className="w-5 h-5 md:w-6 md:h-6"/></div>
              <div>
                <div className="font-bold text-lg md:text-2xl text-slate-800">Skrining AI</div>
                <div className="text-xs md:text-sm text-slate-600">Analisis Gejala Dalam</div>
              </div>
            </div>
            
            {/* Card Kanan Bawah */}
            <div className="absolute bottom-4 -right-4 md:-right-8 bg-white/60 backdrop-blur-md p-3 md:p-4 rounded-3xl shadow-xl border border-white/80 flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer">
              <div className="p-2 md:p-3 bg-white/90 rounded-2xl text-cyan-600 shadow-sm"><LayoutList className="w-5 h-5 md:w-6 md:h-6"/></div>
              <div>
                <div className="font-bold text-lg md:text-2xl text-slate-800">Scan Fisik</div>
                <div className="text-xs md:text-sm text-slate-600">Analisis Kulit & Mata</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. PARTNER BAR (Ungu to Pink Gradient) */}
      <section className="bg-linear-to-r from-green-600 to-blue-800 py-6 px-10 text-white flex justify-center items-center gap-12 font-medium opacity-90 shadow-inner">
        <span className="text-lg font-black opacity-80">MediScan Platform Partners:</span>
        <div className="flex gap-16 items-center">
            {/* Kita pakai logo generic seperti di gambar */}
            <span className="text-2xl font-bold opacity-60">Microsoft</span>
            <span className="text-2xl font-bold opacity-60"> magic leap</span>
            <span className="text-2xl font-bold opacity-60">Codecov</span>
            <span className="text-2xl font-bold opacity-60">User Testing</span>
            <span className="text-2xl font-bold opacity-60">duolingo</span>
        </div>
      </section>

      {/* 4. SEARCH TOPICS SECTION (Sesuai Desain Etech) */}
      <section className="py-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center gap-12">
        <div className="max-w-xl">
          <h2 className="text-5xl font-black mb-4">Cari Topik Kesehatan & Gejala</h2>
          <p className="text-slate-500 text-lg">Jelajahi basis pengetahuan kami untuk informasi penyakit, tips hidup sehat, dan panduan pertolongan pertama.</p>
        </div>
        <div className="relative w-full max-w-2xl bg-white p-2.5 rounded-3xl shadow-lg border border-pink-100 flex items-center">
          <Search className="absolute left-6 text-slate-400 w-6 h-6" />
          <input 
            type="text" 
            placeholder="Cari topik kesehatan atau gejala, contoh: 'ruam kulit merah gatal'" 
            className="w-full pl-16 pr-6 py-4 rounded-full border border-slate-100 focus:outline-none focus:border-pink-300 focus:ring-1 focus:ring-pink-200"
          />
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-2xl font-semibold ml-4 shadow-md transition-all">Cari Topik</button>
        </div>
      </section>

      {/* 5. BENEFITS SECTION (Metode Kita) */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Kiri: Grid Foto dengan dashed border */}
        <div className="border-4 border-dashed border-pink-200 aspect-square p-12 rounded-[50px]">
          <div className="grid grid-cols-2 gap-6 h-full w-full">
            <div className="relative group overflow-hidden rounded-3xl">
                <img src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=600&h=600&auto=format&fit=crop" alt="Dokter 1" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
            </div>
            <div className="relative group overflow-hidden rounded-3xl">
                <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&h=600&auto=format&fit=crop" alt="Pasien" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
            </div>
            <div className="relative group overflow-hidden rounded-3xl">
                <img src="https://images.unsplash.com/photo-1594824476967-48c877f12c45?q=80&w=600&h=600&auto=format&fit=crop" alt="Dokter 2" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
            </div>
            <div className="relative group overflow-hidden rounded-3xl">
                <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600&h=600&auto=format&fit=crop" alt="Analisis" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>

        {/* Kanan: Teks & List Manfaat */}
        <div className="flex flex-col gap-10">
          <div className="max-w-lg">
            <h2 className="text-5xl font-black mb-4"><span className="text-pink-500">Keunggulan</span> Skrining MediScan AI</h2>
            <p className="text-slate-500 text-lg">Proses skrining yang cepat, akurat, dan mudah digunakan untuk mendukung kesehatan Anda.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* List Item 1 */}
            <div className="flex gap-4 items-center">
              <div className="p-3 bg-pink-100 rounded-2xl text-pink-600 border border-pink-200"><BrainCircuit className="w-6 h-6"/></div>
              <div>
                <div className="font-bold text-lg text-slate-800">Cek Gejala AI</div>
                <div className="text-sm text-slate-500">Skrining awal dalam hitungan menit</div>
              </div>
            </div>
            {/* List Item 2 */}
            <div className="flex gap-4 items-center">
              <div className="p-3 bg-blue-100 rounded-2xl text-blue-600 border border-blue-200"><LayoutList className="w-6 h-6"/></div>
              <div>
                <div className="font-bold text-lg text-slate-800">Scan Gambar Fisik</div>
                <div className="text-sm text-slate-500">Analisis Kulit, Mata, Memar</div>
              </div>
            </div>
            {/* List Item 3 */}
            <div className="flex gap-4 items-center">
              <div className="p-3 bg-purple-100 rounded-2xl text-purple-600 border border-purple-200"><UserSquare className="w-6 h-6"/></div>
              <div>
                <div className="font-bold text-lg text-slate-800">Rekomendasi Ahli</div>
                <div className="text-sm text-slate-500">Temukan Dokter Terdekat</div>
              </div>
            </div>
            {/* List Item 4 */}
            <div className="flex gap-4 items-center">
              <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600 border border-emerald-200"><FileText className="w-6 h-6"/></div>
              <div>
                <div className="font-bold text-lg text-slate-800">Laporan Kesehatan</div>
                <div className="text-sm text-slate-500">Riwayat Skrining Personal</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER & LAINNYA BISA DITAMBAHKAN MANUAL DI SINI SEPERTI DI GAMBAR */}
      {/* {Section Tentang Kami START} */}
      <section>
        
      </section>
      {/* {Section Tentang Kami END} */}
    </div>
  );
}