import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase'; // Pastikan path ke supabase.ts benar

interface Question {
  id: number;
  question: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,  
    question: 'Berapa lama Anda mengalami gejala ini?',
    options: ['Kurang dari 24 jam', '1-3 hari', '4-7 hari', 'Lebih dari 1 minggu'],
  },
  {
    id: 2,
    question: 'Apakah gejala semakin memburuk seiring waktu?',
    options: ['Ya, semakin parah', 'Tidak, tetap sama', 'Tidak, semakin membaik', 'Berubah-ubah'],
  },
  {
    id: 3,
    question: 'Apakah Anda mengalami demam?',
    options: ['Ya, di atas 38°C', 'Ya, tapi ringan', 'Tidak', 'Tidak yakin'],
  },
  {
    id: 4,
    question: 'Apakah ada riwayat penyakit serupa di keluarga?',
    options: ['Ya, ada', 'Tidak ada', 'Tidak yakin', 'Tidak relevan'],
  },
  {
    id: 5,
    question: 'Apakah Anda sudah mencoba pengobatan sendiri?',
    options: ['Ya, dan membantu', 'Ya, tapi tidak efektif', 'Belum mencoba', 'Menggunakan obat rutin'],
  },
];

export default function QuestionnairePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { idKonsultasi } = location.state || {};

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [analyzing, setAnalyzing] = useState(false);
  const [isStoring, setIsStoring] = useState(false);
  
  // FIX: Tambahkan state answers agar tidak error
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = async () => {
    if (!selectedAnswer || isStoring) return;

    setIsStoring(true);
    try {
      // FIX: Simpan ke variabel lokal dulu karena state React telat update
      const updatedAnswers = { ...answers, [currentStep]: selectedAnswer };
      setAnswers(updatedAnswers);

      const { error } = await supabase
        .from('jawaban_kuisioner')
        .insert([
          { 
            id_konsultasi: idKonsultasi, 
            pertanyaan: currentQuestion.question, 
            jawaban: selectedAnswer 
          }
        ]);

      if (error) throw error;

      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
        setSelectedAnswer('');
      } else {
        // FIX: Kirim data jawaban terbaru langsung ke fungsi analisis
        startAnalysis(updatedAnswers);
      }
    } catch (err: any) {
      console.error("Gagal simpan jawaban:", err.message);
      alert("Koneksi terputus, King! Gagal simpan jawaban.");
    } finally {
      setIsStoring(false);
    }
  };

  // FIX: Terima parameter freshAnswers agar logika pakar berjalan akurat
  // FIX: Terima parameter freshAnswers agar logika pakar berjalan akurat
  const startAnalysis = async (freshAnswers: Record<number, string>) => {
    setAnalyzing(true);

    setTimeout(async () => {
      const semuaJawaban = Object.values(freshAnswers).join(' ');
      
      // KUNCI JAWABAN: Kita cek user ini datang dari Gejala Luar (AI) atau Dalam (Teks)
      const { tipeKuis } = location.state || {}; 

      try {
        if (tipeKuis === 'luar') {
          // JIKA GEJALA LUAR: 
          // JANGAN TIMPA hasil diagnosa AI! Kita cuma tambahin saran medisnya aja.
          const advice = "Jaga kebersihan area kulit|Gunakan salep/krim yang sesuai|Konsultasi ke Dokter Kulit jika memburuk";
          
          const { error } = await supabase
            .from('konsultasi_kesehatan')
            .update({ saran_medis: advice }) // CUMA UPDATE SARAN, TEBAKAN AI BIARKAN AMAN
            .eq('id', idKonsultasi);
            
          if (error) throw error;

        } else {
          // JIKA GEJALA DALAM: 
          // Pakai logika IF/ELSE bawaan kamu untuk nebak penyakitnya.
          let disease = "Observasi Gejala Ringan";
          let accuracy = 75;
          let advice = "Pantau suhu tubuh tiap 4 jam|Minum air hangat|Istirahat total";

          if (semuaJawaban.includes('di atas 38°C') && semuaJawaban.includes('4-7 hari')) {
            disease = "Indikasi Infeksi Virus (Flu/Tipus)";
            accuracy = 88;
            advice = "Segera cek darah ke laboratorium|Konsumsi paracetamol jika panas|Isolasi mandiri sementara";
          } else if (semuaJawaban.includes('Ya, semakin parah')) {
            disease = "Gangguan Kesehatan Akut";
            accuracy = 82;
            advice = "Segera konsultasi ke fasilitas kesehatan|Hindari makanan pedas & asam|Cukupi asupan cairan";
          } else if (semuaJawaban.includes('Kurang dari 24 jam')) {
            disease = "Kelelahan Fisik (Fatigue)";
            accuracy = 95;
            advice = "Tidur minimal 8 jam|Kurangi aktivitas berat|Minum vitamin booster";
          }

          const { error } = await supabase
            .from('konsultasi_kesehatan')
            .update({
              hasil_diagnosa: disease,
              tingkat_akurasi: accuracy,
              saran_medis: advice,
            })
            .eq('id', idKonsultasi);
            
          if (error) throw error;
        }

        // Kalau sukses, pindah ke halaman Result!
        navigate('/result', { state: { idKonsultasi } });
        
      } catch (err: any) {
        console.error("Gagal update hasil:", err.message);
        setAnalyzing(false);
      }
    }, 3000);
  };

  // --- RENDERING TETAP SAMA (DESIGN TIDAK DIUBAH) ---
  if (analyzing) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white max-w-2xl w-full text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-20 h-20 mx-auto mb-6 flex items-center justify-center"
          >
            <Loader2 className="w-16 h-16 text-emerald-600" />
          </motion.div>
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">
            AI sedang menganalisis data Kamu...
          </h2>
          <p className="text-slate-600 text-lg mb-8 font-medium">
            Membandingkan jawaban Kamu dengan basis pengetahuan medis kami.
          </p>
          <div className="w-full bg-slate-200 rounded-full h-3 mb-4">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 3, ease: 'easeInOut' }}
              className="bg-linear-to-r from-emerald-500 to-blue-500 h-3 rounded-full"
            />
          </div>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Sedang diproses...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[120px] -z-10"></div>

      <div className="max-w-3xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-4 px-2">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
              Pertanyaan {currentStep + 1} / {questions.length}
            </span>
            <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="bg-linear-to-r from-emerald-500 to-blue-500 h-2 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
            />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white/40 backdrop-blur-2xl rounded-[40px] shadow-2xl p-10 border border-white/60"
          >
            <h2 className="text-3xl font-black text-slate-900 mb-10 leading-tight tracking-tight">
              {currentQuestion.question}
            </h2>

            <div className="space-y-4 mb-10">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.01, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(option)}
                  className={`w-full p-6 rounded-3xl border-2 transition-all text-left flex items-center gap-5 ${
                    selectedAnswer === option
                      ? 'border-emerald-500 bg-emerald-50/50 shadow-lg shadow-emerald-500/5'
                      : 'border-white bg-white/40 hover:border-emerald-200 hover:bg-white/60'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                      selectedAnswer === option
                        ? 'border-emerald-500 bg-emerald-500 scale-110'
                        : 'border-slate-300 bg-white/50'
                    }`}
                  >
                    {selectedAnswer === option && (
                      <Check className="w-4 h-4 text-white stroke-[3px]" />
                    )}
                  </div>
                  <span className={`text-lg font-bold transition-colors ${selectedAnswer === option ? 'text-emerald-900' : 'text-slate-700'}`}>
                    {option}
                  </span>
                </motion.button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              disabled={!selectedAnswer || isStoring}
              className="w-full py-5 bg-linear-to-r from-emerald-600 to-emerald-500 text-white rounded-2xl font-black text-xl shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isStoring ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  {currentStep < questions.length - 1 ? 'Lanjutkan' : 'Mulai Analisis AI'}
                  <ArrowRight className="w-6 h-6" />
                </>
              )}
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}