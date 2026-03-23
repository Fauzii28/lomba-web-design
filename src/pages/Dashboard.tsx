import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Hapus data login dari localStorage
    localStorage.removeItem('userTelahLogin');
    
    // Lempar kembali ke Landing Page
    navigate('/');
  };

  const handleKeKuis = () => {
    navigate('/questionnairepage');
    // Nanti kita buatkan halaman QuestionnairePage.tsx
    
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Dashboard */}
        <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-800">Dashboard Pasien</h1>
            <p className="text-slate-500">Pantau riwayat skrining kesehatanmu di sini.</p>
          </div>
          <button onClick={handleLogout} className="text-red-500 font-semibold hover:bg-red-50 px-4 py-2 rounded-lg transition-colors">
            Keluar Akun
          </button>
        </div>

        {/* Menu Utama */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-start gap-4">
            <div className="bg-pink-100 text-pink-600 p-4 rounded-2xl">
              {/* Harusnya pakai ikon, kita pakai teks dulu */}
              <span className="font-bold text-xl">🔍</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800">Skrining AI Baru</h3>
            <p className="text-slate-500">Mulai sesi kuesioner baru untuk menganalisis gejala yang sedang Anda rasakan.</p>
            <button onClick={handleKeKuis} className="mt-auto bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              Mulai Tes
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}