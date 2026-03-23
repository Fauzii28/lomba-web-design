import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, Loader2 } from 'lucide-react';

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

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [analyzing, setAnalyzing] = useState(false);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    // Simpan jawaban ke memori sementara (menggantikan Supabase)
    const newAnswers = { ...answers, [currentQuestion.id]: selectedAnswer };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedAnswer('');
    } else {
      setAnalyzing(true);

      // Simulasi loading AI berpikir selama 3 detik
      setTimeout(() => {
        const mockDiseases = [
          'Flu Musiman',
          'Infeksi Saluran Pernapasan Atas',
          'Dermatitis Kontak',
          'Alergi Kulit',
          'Gastritis',
        ];
        const disease = mockDiseases[Math.floor(Math.random() * mockDiseases.length)];
        const accuracy = Math.floor(Math.random() * 20) + 75;

        // BIKIN OBJEK HASIL ANALISIS
        const finalResult = {
          disease: disease,
          accuracy: accuracy,
          explanation: `Berdasarkan gejala yang Anda laporkan dan jawaban pertanyaan, sistem AI kami mengidentifikasi kemungkinan ${disease}. Kondisi ini umumnya terjadi karena berbagai faktor seperti infeksi virus, bakteri, atau reaksi alergi. Gejala yang Anda alami konsisten dengan pola yang sering ditemukan pada kasus serupa.`,
          advice: 'Istirahat yang cukup|Perbanyak minum air putih|Konsumsi makanan bergizi|Hindari aktivitas berat|Konsultasi dengan dokter jika gejala memburuk',
          answers: newAnswers
        };

        // SIMPAN HASIL KE LOCAL STORAGE (Agar bisa dibaca oleh ResultPage)
        localStorage.setItem('hasilSkrining', JSON.stringify(finalResult));

        // Pindah ke halaman hasil
        navigate('/result');
      }, 3000);
    }
  };

  if (analyzing) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-gray-200 max-w-2xl w-full text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-20 h-20 mx-auto mb-6"
          >
            <Loader2 className="w-20 h-20 text-emerald-600" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            AI sedang menganalisis data Anda...
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Sistem kami sedang memproses jawaban Anda dan membandingkan dengan database medis untuk memberikan hasil terbaik.
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 3, ease: 'easeInOut' }}
              className="bg-linear-to-r from-emerald-500 to-blue-500 h-3 rounded-full"
            />
          </div>
          <p className="text-sm text-gray-500">Mohon tunggu sebentar...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center p-8">
      <div className="max-w-3xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-600">
              Pertanyaan {currentStep + 1} dari {questions.length}
            </span>
            <span className="text-sm font-medium text-emerald-600">
              {Math.round(progress)}% selesai
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="bg-linear-to-r from-emerald-500 to-blue-500 h-3 rounded-full transition-all duration-500"
            />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-200"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 leading-tight">
              {currentQuestion.question}
            </h2>

            <div className="space-y-4 mb-8">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(option)}
                  className={`w-full p-6 rounded-2xl border-2 transition-all text-left flex items-center gap-4 ${
                    selectedAnswer === option
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/50'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      selectedAnswer === option
                        ? 'border-emerald-500 bg-emerald-500'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedAnswer === option && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="text-lg font-medium text-gray-900">{option}</span>
                </motion.button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="w-full py-4 bg-linear-to-r from-emerald-600 to-emerald-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {currentStep < questions.length - 1 ? 'Lanjutkan' : 'Selesai & Analisis'}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}