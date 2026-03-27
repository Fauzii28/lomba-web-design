import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X, Loader2 } from 'lucide-react';
// IMPORT INI DITAMBAHKAN UNTUK MENYIMPAN DATA
import { supabase } from '../lib/supabase';

export default function UploadGejalaLuar() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [deskripsi, setDeskripsi] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Fungsi Pilih File
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  // FUNGSI INI YANG DIPERBARUI LOGIKANYA
  const handleLanjut = async () => {
    if (!selectedFile) return alert("Upload foto dulu, King!");

    setIsAnalyzing(true);
    
    // Siapkan data untuk dikirim ke Backend Python
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      // 1. Tembak Backend Python
      const response = await fetch('https://fauzi28-healthlogia-api.hf.space/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error("Gagal akses AI");
      const result = await response.json();
      
      // 2. Simpan Prediksi AI ke Supabase
      const { data, error: sbError } = await supabase
        .from('konsultasi_kesehatan')
        .insert([
          { 
            jenis_periksa: 'foto', 
            deskripsi_gejala: deskripsi || "Pemeriksaan Foto AI",
            hasil_diagnosa: result.prediction,
            tingkat_akurasi: parseInt(result.confidence) || 0
          }
        ])
        .select()
        .single();

      if (sbError) {
        throw sbError;
      }

      // 3. Pindah ke Kuesioner dengan membawa ID yang baru dibuat
      navigate('/questionnaire', { 
        state: { 
          idKonsultasi: data.id,
          deskripsiAwal: deskripsi,
          tipeKuis: 'luar' 
        } 
      });

    } catch (error) {
      console.error("Error AI/Supabase:", error);
      alert("Gagal konek ke AI, pastikan backend sudah jalan dan internet stabil!");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] overflow-hidden relative font-sans p-6 md:p-12 flex flex-col items-center">
      {/* Latar Belakang */}
      <div className="fixed top-[-10%] left-[-10%] w-125 h-125 bg-emerald-400/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-150 h-150 bg-blue-300/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="w-full max-w-3xl mb-6">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium">
          <ArrowLeft className="w-5 h-5" /> Kembali ke Dashboard
        </button>
      </div>

      <div className="max-w-3xl w-full bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-8 md:p-10 shadow-xl mb-6">
        <h1 className="text-3xl font-black text-slate-800 mb-2">Pemeriksaan Gejala Luar</h1>
        <p className="text-slate-600 mb-8">Upload foto area yang mengalami keluhan dan jelaskan gejala yang Anda rasakan.</p>

        {/* Area Upload Foto */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-slate-700 mb-2">Upload Foto Gejala</label>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
          
          {!previewUrl ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 rounded-2xl p-10 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-100/50 transition-colors cursor-pointer group"
            >
              <Upload className="w-10 h-10 text-slate-400 group-hover:text-emerald-500 mb-3 transition-colors" />
              <span className="font-semibold text-slate-700">Klik untuk upload foto</span>
            </div>
          ) : (
            <div className="relative rounded-2xl overflow-hidden border border-slate-200">
              <img src={previewUrl} alt="Preview" className="w-full h-64 object-cover" />
              <button onClick={removeFile} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg">
                <X size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Area Deskripsi */}
        <div className="mb-8">
          <label className="block text-sm font-bold text-slate-700 mb-2">Jelaskan Gejala Anda</label>
          <textarea 
            rows={4}
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            placeholder="Contoh: Muncul ruam merah di lengan kiri..."
            className="w-full rounded-2xl border border-slate-200 p-4 bg-white/50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
          ></textarea>
        </div>

        <button 
          onClick={handleLanjut}
          disabled={isAnalyzing || !selectedFile}
          className={`w-full text-white font-bold text-lg py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 ${isAnalyzing ? 'bg-slate-400' : 'bg-emerald-400 hover:bg-emerald-500'}`}
        >
          {isAnalyzing ? (
            <> <Loader2 className="animate-spin" /> Sedang Menganalisis... </>
          ) : (
            'Lanjutkan ke Pertanyaan'
          )}
        </button>
      </div>
    </div>
  );
}