import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// IMPORT TOOLS
import { analisisGejalaLuar } from '../lib/gemini'; 
import { supabase } from '../lib/supabase';

export default function UploadGejalaLuar() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [deskripsi, setDeskripsi] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  // --- 1. LOGIKA PENGELOLA FILE ---
  const handleBoxClick = () => fileInputRef.current?.click();

  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      alert("Tolong upload file gambar (PNG/JPG).");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) processFile(e.target.files[0]);
  };

  // --- 2. LOGIKA DRAG & DROP (YANG TADI HILANG) ---
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const hapusFoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImage(null);
    setPreviewUrl(null);
  };

  // --- 3. FUNGSI UTAMA KE GEMINI & SUPABASE ---
  const jalankanAnalisis = async () => {
    if (!selectedImage || !deskripsi.trim()) {
      alert("Lengkapi foto dan deskripsi dulu, King!");
      return;
    }

    setIsScanning(true);

    try {
      // Step A: Panggil Gemini AI
      const hasilAI = await analisisGejalaLuar(selectedImage, deskripsi);

      // Step B: Simpan ke Supabase
      const { data, error: sbError } = await supabase
        .from('konsultasi_kesehatan')
        .insert([
          {
            deskripsi_gejala: deskripsi,
            hasil_diagnosa: hasilAI.disease,
            tingkat_akurasi: hasilAI.accuracy,
            saran_medis: hasilAI.advice.join('|'),
            foto_url: previewUrl, 
            tipe_pemeriksaan: 'luar'
          }
        ])
        .select()
        .single();

      if (sbError) throw sbError;

      // Step C: Pindah ke Result Page
      navigate('/result', { state: { idKonsultasi: data.id } });

    } catch (error) {
      console.error(error);
      alert("Gagal menganalisis. Cek API Key atau koneksi database.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 flex flex-col items-center font-sans">
      <div className="w-full max-w-3xl mb-6">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium">
          <ArrowLeft className="w-5 h-5" /> Kembali
        </button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl w-full bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
        <h1 className="text-3xl font-black text-slate-800 mb-2">Pemeriksaan Gejala Luar</h1>
        <p className="text-slate-500 mb-8 font-medium">Unggah foto area kulit yang bermasalah untuk dianalisis oleh AI.</p>

        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

        {/* AREA UPLOAD DENGAN DRAG & DROP */}
        <div 
          onClick={handleBoxClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-[32px] p-6 flex flex-col items-center justify-center min-h-[280px] cursor-pointer transition-all duration-300 ${
            isDragging ? 'border-blue-500 bg-blue-50 scale-[1.02]' : 
            previewUrl ? 'border-emerald-400 bg-white' : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400'
          }`}
        >
          {previewUrl ? (
            <div className="relative group w-full h-full flex justify-center">
              <img src={previewUrl} className="max-h-64 rounded-2xl object-contain shadow-md" alt="Preview" />
              <button 
                onClick={hapusFoto}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-white p-5 rounded-2xl shadow-sm inline-block mb-4 text-slate-400">
                <Upload className="w-10 h-10" />
              </div>
              <p className="font-black text-slate-700 text-lg">Tarik foto ke sini</p>
              <p className="text-slate-400 text-sm mt-1 font-medium text-balance">Atau klik untuk memilih file dari perangkat</p>
            </div>
          )}
        </div>

        {/* INPUT DESKRIPSI */}
        <div className="mt-10">
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Detail Keluhan</label>
          <textarea 
            value={deskripsi} 
            onChange={(e) => setDeskripsi(e.target.value)}
            className="w-full rounded-[24px] border border-slate-200 p-5 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all resize-none font-medium bg-slate-50/50"
            placeholder="Jelaskan sudah berapa lama gejala muncul, apakah gatal, perih, atau bengkak?"
            rows={4}
          />
        </div>

        {/* TOMBOL ANALISIS */}
        <button 
          onClick={jalankanAnalisis} 
          disabled={isScanning}
          className="w-full mt-10 bg-[#1e3a8a] hover:bg-[#2563eb] text-white font-black py-5 rounded-[24px] shadow-xl shadow-blue-900/20 transition-all active:scale-[0.98] disabled:bg-slate-300 disabled:shadow-none uppercase tracking-widest text-sm"
        >
          {isScanning ? "AI Sedang Bekerja..." : "Mulai Analisis Sekarang"}
        </button>
      </motion.div>

      {/* OVERLAY SCANNING (FULL SCREEN) */}
      <AnimatePresence>
        {isScanning && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[200] bg-slate-950/90 backdrop-blur-2xl flex flex-col items-center justify-center text-white"
          >
            <div className="relative w-72 h-72 mb-10 border-4 border-emerald-400 rounded-[40px] overflow-hidden shadow-[0_0_60px_rgba(74,222,128,0.3)] bg-slate-900">
              {previewUrl && <img src={previewUrl} className="w-full h-full object-cover opacity-40" alt="Scanning" />}
              <motion.div 
                animate={{ top: ['-5%', '105%', '-5%'] }} 
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} 
                className="absolute left-0 right-0 h-1.5 bg-emerald-400 shadow-[0_0_30px_#4ade80] z-10" 
              />
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-black tracking-widest uppercase mb-2 text-emerald-400">Scanning...</h2>
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">Computer Vision by HealthLogia</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}