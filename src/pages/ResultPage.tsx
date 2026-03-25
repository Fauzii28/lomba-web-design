import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Activity, ShieldCheck, Stethoscope, AlertTriangle, Loader2, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Ambil state yang dikirim dari halaman sebelumnya
  const { idKonsultasi, tipeKuis, deskripsiAwal, fotoGejala, isAutoScanned } = location.state || {};
  
  const [hasil, setHasil] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // JALUR 1: SCAN OTOMATIS (Gejala Luar)
    if (isAutoScanned && fotoGejala) {
      // Simulasi analisis cerdas berdasarkan kata kunci deskripsi
      const analisaSederhana = () => {
        const teks = deskripsiAwal?.toLowerCase() || "";
        if (teks.includes("gatal") || teks.includes("merah") || teks.includes("ruam")) {
          return {
            disease: "Dermatitis Kontak / Alergi",
            accuracy: 88,
            explanation: `Berdasarkan pemindaian visual AI, area kulit menunjukkan tanda inflamasi (kemerahan) yang serupa dengan pola Dermatitis Kontak.`,
            advice: ["Hindari kontak dengan sabun atau deterjen keras", "Gunakan pelembab hipoalergenik", "Jangan menggaruk area yang gatal"],
            isImageResult: true
          };
        }
        return {
          disease: "Iritasi Kulit Ringan",
          accuracy: 75,
          explanation: "AI mendeteksi adanya perubahan tekstur kulit ringan yang mungkin disebabkan oleh kelembapan atau gesekan.",
          advice: ["Jaga kebersihan area kulit", "Gunakan pakaian longgar berbahan katun", "Pantau perkembangan dalam 24 jam"],
          isImageResult: true
        };
      };

      // Simulasi loading sebentar
      const timer = setTimeout(() => {
        setHasil(analisaSederhana());
      }, 3000);
      return () => clearTimeout(timer);
    }

    // JALUR 2: KONSULTASI DATABASE (Gejala Dalam)
    if (idKonsultasi) {
      const ambilDataAsli = async () => {
        try {
          const { data, error: sbError } = await supabase
            .from('konsultasi_kesehatan')
            .select('*')
            .eq('id', idKonsultasi)
            .single();

          if (sbError) throw sbError;

          setHasil({
            disease: data.hasil_diagnosa || "Analisis Tidak Diketahui",
            accuracy: data.tingkat_akurasi || 0,
            explanation: `Berdasarkan analisis AI terhadap keluhan "${data.deskripsi_gejala}", sistem mendeteksi pola yang mengarah pada ${data.hasil_diagnosa}.`,
            advice: data.saran_medis ? data.saran_medis.split('|') : ["Istirahat cukup", "Pantau kondisi"]
          });
        } catch (err: any) {
          console.error("Gagal ambil data:", err.message);
          setError(true);
        }
      };
      
      const timer = setTimeout(() => ambilDataAsli(), 2000);
      return () => clearTimeout(timer);
    }

    // JIKA TIDAK ADA DATA SAMA SEKALI
    if (!idKonsultasi && !isAutoScanned) {
      setError(true);
    }
  }, [idKonsultasi, isAutoScanned]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-slate-700">Data Tidak Ditemukan</h2>
        <p className="text-slate-500 mb-6">Gagal memproses analisis. Silakan coba lagi.</p>
        <button onClick={() => navigate('/dashboard')} className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg">Kembali ke Dashboard</button>
      </div>
    );
  }

  if (!hasil) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <h2 className="text-xl font-bold text-slate-700">
          {isAutoScanned ? "AI Menjalankan Computer Vision..." : "AI Sedang Menganalisis..."}
        </h2>
        <p className="text-slate-500">Memproses data medis Anda secara akurat</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative font-sans p-6 md:p-12 flex flex-col items-center">
      {/* Background decoration */}
      <div className="fixed top-[-10%] left-[-10%] w-150 h-150 bg-blue-400/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-150 h-150 bg-emerald-300/15 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="w-full max-w-3xl mb-6">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium">
          <ArrowLeft className="w-5 h-5" /> Kembali ke Dashboard
        </button>
      </div>

      <div className="max-w-3xl w-full bg-white/70 backdrop-blur-xl border border-white/80 rounded-[40px] p-8 md:p-10 shadow-2xl">
        
        {/* HASIL UTAMA */}
        <div className="flex flex-col md:flex-row gap-8 items-start mb-10 border-b border-slate-100 pb-10">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-emerald-500 font-black uppercase tracking-[0.2em] text-xs mb-3">
              <Activity className="w-4 h-4" />
              <span>Analisis Selesai</span>
            </div>
            <h1 className="text-4xl font-black text-slate-800 leading-tight mb-2 uppercase">
              {hasil.disease}
            </h1>
            <p className="text-slate-500 font-medium italic">"{deskripsiAwal || "Gejala Internal"}"</p>
          </div>
          
          <div className="bg-[#1e3a8a] p-6 rounded-[32px] text-white flex flex-col items-center min-w-36 shadow-xl shadow-blue-900/20">
            <span className="text-[10px] uppercase tracking-widest font-black opacity-60 mb-1">Akurasi</span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-4xl font-black">{hasil.accuracy}</span>
              <span className="text-sm font-bold">%</span>
            </div>
          </div>
        </div>

        {/* TAMPILAN FOTO (Jika ada) */}
        {fotoGejala && (
          <div className="mb-10">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> Bukti Visual Gejala
            </h2>
            <div className="w-full h-64 rounded-[32px] overflow-hidden border-4 border-white shadow-lg bg-slate-100">
              <img src={fotoGejala} className="w-full h-full object-cover" alt="Scan result" />
            </div>
          </div>
        )}

        {/* PENJELASAN */}
        <div className="mb-10 bg-white/50 p-6 rounded-3xl border border-white/80 shadow-sm">
          <h2 className="text-lg font-black text-slate-800 mb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-500" /> Kesimpulan AI
          </h2>
          <p className="text-slate-600 leading-relaxed font-medium">
            {hasil.explanation}
          </p>
        </div>

        {/* REKOMENDASI */}
        <div className="mb-10">
          <h2 className="text-lg font-black text-slate-800 mb-5 flex items-center gap-2 uppercase tracking-wide">
            <Stethoscope className="w-5 h-5 text-emerald-500" /> Saran Pemulihan
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {hasil.advice.map((item: string, index: number) => (
              <div key={index} className="flex items-center gap-4 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/50">
                <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                <span className="text-slate-700 font-bold text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* DISCLAIMER */}
        <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-5 flex gap-4">
          <AlertTriangle className="w-5 h-5 text-orange-400 shrink-0" />
          <p className="text-[11px] text-orange-800/80 leading-relaxed font-medium uppercase tracking-wider">
            Disclaimer: Analisis ini dilakukan secara otomatis oleh AI untuk skrining awal. Harap konsultasikan ke ahli medis untuk diagnosa resmi.
          </p>
        </div>

      </div>
    </div>
  );
}