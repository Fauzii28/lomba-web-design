import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Activity, ShieldCheck, Stethoscope, AlertTriangle, Loader2 } from 'lucide-react';

export default function ResultPage() {
  const navigate = useNavigate();
  const [hasil, setHasil] = useState<any>(null);

  useEffect(() => {
    // KITA PAKAI DATA PALSU DULU UNTUK MENDESAIN UI
    // Nanti kalau kuis temanmu sudah jadi, kita tinggal ganti datanya di sini.
    const dataPalsu = {
      disease: "Gejala Flu Ringan",
      accuracy: 92,
      explanation: "Berdasarkan analisis AI terhadap keluhan yang Anda berikan, sistem mendeteksi adanya pola yang sangat mirip dengan gejala flu musiman ringan. Kondisi ini umumnya disebabkan oleh infeksi virus dan kelelahan.",
      advice: [
        "Perbanyak istirahat dan tidur minimal 8 jam.",
        "Minum air putih hangat untuk melegakan tenggorokan.",
        "Konsumsi vitamin C untuk menjaga daya tahan tubuh.",
        "Gunakan masker jika berinteraksi dengan orang lain."
      ]
    };

    // Simulasi loading AI (hanya untuk efek keren saat halaman dibuka)
    const timer = setTimeout(() => {
      setHasil(dataPalsu);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Tampilan layar saat simulasi loading berlangsung
  if (!hasil) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <h2 className="text-xl font-bold text-slate-700">AI Sedang Menganalisis...</h2>
        <p className="text-slate-500">Mencocokkan gejala dengan database medis</p>
      </div>
    );
  }

  // Tampilan utama setelah loading selesai
  return (
    <div className="min-h-screen bg-[#F8FAFC] overflow-hidden relative font-sans p-6 md:p-12 flex flex-col items-center">
      
      {/* EFEK LATAR BELAKANG AWAN BIRU (Glassmorphism) */}
      <div className="fixed top-[-10%] left-[-10%] w-150 h-150 bg-blue-400/30 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-150 h-150 bg-emerald-300/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      {/* Tombol Kembali */}
      <div className="w-full max-w-3xl mb-6">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" /> Kembali ke Dashboard
        </button>
      </div>

      {/* KARTU HASIL UTAMA */}
      <div className="max-w-3xl w-full bg-white/60 backdrop-blur-xl border border-white/80 rounded-4xl p-8 md:p-10 shadow-2xl relative z-10">
        
        {/* Header Hasil */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-b border-slate-200/60 pb-8 mb-8">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold mb-2">
              <Activity className="w-5 h-5" />
              <span>Hasil Skrining AI</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">
              {hasil.disease}
            </h1>
          </div>
          
          {/* Lencana Akurasi */}
          <div className="bg-linear-to-br from-emerald-400 to-emerald-600 p-4 rounded-2xl shadow-lg text-white flex flex-col items-center justify-center min-w-30 shrink-0 transform hover:scale-105 transition-transform">
            <span className="text-sm font-medium opacity-90 mb-1">Akurasi AI</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black">{hasil.accuracy}</span>
              <span className="text-lg font-bold">%</span>
            </div>
          </div>
        </div>

        {/* Penjelasan AI */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-blue-500" />
            Analisis Kondisi
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            {hasil.explanation}
          </p>
        </div>

        {/* Rekomendasi/Saran */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-blue-500" />
            Rekomendasi Tindakan
          </h2>
          <ul className="space-y-3">
            {hasil.advice.map((item: string, index: number) => (
              <li key={index} className="flex items-start gap-3">
                <div className="bg-blue-200/50 text-blue-700 p-1 rounded-full shrink-0 mt-0.5">
                  <ArrowLeft className="w-4 h-4 rotate-135" /> {/* Ikon panah miring pengganti bullet */}
                </div>
                <span className="text-slate-700 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Peringatan Medis */}
        <div className="bg-yellow-50/70 border border-yellow-200/80 rounded-2xl p-5 flex gap-4 items-start">
          <AlertTriangle className="w-6 h-6 text-yellow-600 shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-800 leading-relaxed">
            <strong>Disclaimer:</strong> Hasil ini dihasilkan oleh kecerdasan buatan untuk tujuan informasi awal. Segera kunjungi dokter atau klinik terdekat jika gejala memburuk atau tidak kunjung sembuh dalam 3 hari.
          </p>
        </div>

      </div>
    </div>
  );
}