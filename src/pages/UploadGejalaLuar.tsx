import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, ImageIcon } from 'lucide-react';

export default function UploadGejalaLuar() {
  const navigate = useNavigate();
  const [deskripsi, setDeskripsi] = useState('');

  const handleLanjut = () => {
    // Membawa 'surat pengantar' tipe kuis luar, 
    // plus data tambahan (deskripsi & foto jika nanti sudah berfungsi) ke halaman kuis
    navigate('/questionnairepage', { 
      state: { tipeKuis: 'luar', deskripsiAwal: deskripsi } 
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] overflow-hidden relative font-sans p-6 md:p-12 flex flex-col items-center">
      
      {/* Efek Latar Belakang Awan (Sama seperti Dashboard & Result) */}
      <div className="fixed top-[-10%] left-[-10%] w-125 h-125 bg-emerald-400/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-150 h-150 bg-blue-300/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="w-full max-w-3xl mb-6">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" /> Kembali ke Dashboard
        </button>
      </div>

      {/* Kartu Utama */}
      <div className="max-w-3xl w-full bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-8 md:p-10 shadow-xl mb-6">
        <h1 className="text-3xl font-black text-slate-800 mb-2">Pemeriksaan Gejala Luar</h1>
        <p className="text-slate-600 mb-8">Upload foto area yang mengalami keluhan dan jelaskan gejala yang Anda rasakan.</p>

        {/* Area Upload Foto */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-slate-700 mb-2">Upload Foto Gejala</label>
          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-10 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-100/50 transition-colors cursor-pointer group">
            <Upload className="w-10 h-10 text-slate-400 group-hover:text-emerald-500 mb-3 transition-colors" />
            <span className="font-semibold text-slate-700">Drag & Drop foto atau klik untuk upload</span>
            <span className="text-sm text-slate-500 mt-1">PNG, JPEG hingga 10MB</span>
          </div>
        </div>

        {/* Area Text Deskripsi */}
        <div className="mb-8">
          <label className="block text-sm font-bold text-slate-700 mb-2">Jelaskan Gejala Anda</label>
          <textarea 
            rows={4}
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            placeholder="Contoh: Muncul ruam merah di lengan kiri sejak 3 hari yang lalu, terasa gatal terutama di malam hari..."
            className="w-full rounded-2xl border border-slate-200 p-4 bg-white/50 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
          ></textarea>
          <p className="text-xs text-slate-500 mt-2">Jelaskan dengan detail kapan gejala muncul, seberapa parah, dan faktor yang mempengaruhi.</p>
        </div>

        {/* Tombol Lanjut */}
        <button 
          onClick={handleLanjut}
          className="w-full bg-emerald-400 hover:bg-emerald-500 text-white font-bold text-lg py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all"
        >
          Lanjutkan ke Pertanyaan
        </button>
      </div>

      {/* Spanduk Tips */}
      <div className="max-w-3xl w-full bg-blue-50/80 backdrop-blur-md border border-blue-100 rounded-2xl p-6 flex gap-4 shadow-sm">
        <div className="bg-blue-100 p-3 rounded-xl h-fit text-blue-600">
          <ImageIcon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800 mb-2">Tips Foto yang Baik</h3>
          <ul className="text-sm text-slate-600 list-disc list-inside space-y-1">
            <li>Pastikan area yang difoto terlihat jelas dengan pencahayaan yang baik.</li>
            <li>Ambil foto dari jarak yang cukup dekat untuk detail yang jelas.</li>
            <li>Hindari foto yang blur atau terlalu gelap.</li>
          </ul>
        </div>
      </div>

    </div>
  );
}