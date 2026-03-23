import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah halaman reload
    
    // Skenario 1: Simpan data login palsu ke localStorage
    localStorage.setItem('userTelahLogin', 'benar');
    
    // Arahkan ke Dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-pink-100">
        <h2 className="text-3xl font-black text-slate-800 mb-2 text-center">Selamat Datang</h2>
        <p className="text-slate-500 text-center mb-8">Silakan masuk ke akun HealthCheck Anda</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
            <input type="email" placeholder="contoh@email.com" required 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
            <input type="password" placeholder="••••••••" required 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400" />
          </div>
          
          <button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl mt-4 transition-colors">
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}