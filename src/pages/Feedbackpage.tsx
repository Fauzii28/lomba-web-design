import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, MessageSquare } from 'lucide-react';

export default function FeedbackPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D9EAF5] to-[#F8FAFC] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/80 backdrop-blur-xl p-8 rounded-[40px] shadow-2xl border border-white max-w-lg w-full"
      >
        {/* Tombol Kembali */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-500 hover:text-[#1e3a8a] mb-6 transition-colors font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="bg-[#1e3a8a] p-3 rounded-2xl">
            <MessageSquare className="w-6 h-6 text-[#4ade80]" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#1e3a8a] leading-tight">KIRIM FEEDBACK</h1>
            <p className="text-slate-500 text-sm font-medium">Bantu kami jadi lebih baik.</p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Nama Lengkap</label>
            <input type="text" className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#4ade80] transition-all" placeholder="Masukkan nama kamu..." />
          </div>
          
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Pesan / Masukan</label>
            <textarea rows={4} className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#4ade80] transition-all" placeholder="Tulis masukanmu di sini..."></textarea>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/')}
            className="w-full bg-[#1e3a8a] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-900/20 flex items-center justify-center gap-3 mt-4"
          >
            Kirim Sekarang <Send className="w-4 h-4" />
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}