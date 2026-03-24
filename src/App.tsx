import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadGejalaLuar from './pages/UploadGejalaLuar';
// Import Halaman Landing Page desain manualmu
import LandingPage from './pages/LandingPage';
import QuestionnairePage from './pages/QuestionnairePage';
// Import Halaman fungsional buatan Bolt (AuthPage.tsx)
// Catatan: Di laptopmu pastikan filenya bernama AuthPage.tsx
import AuthPage from './pages/AuthPage';
// Import Halaman Dashboard buatan Bolt (Dashboard.tsx)
// Catatan: Di laptopmu pastikan filenya bernama Dashboard.tsx
import Dashboard from './pages/Dashboard';


// --- BARU: Import Halaman Hasil (ResultPage) ---
import ResultPage from './pages/ResultPage';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Jalur Utama: Tampilkan desain kerenmu! */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Jalur Masuk/Login: Arahkan ke Halaman Auth buatan Bolt */}
        <Route path="/login" element={<AuthPage />} />
        
        {/* Jalur Dashboard: Jika user sudah login, arahkan ke halaman Bolt */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Jalur Kuis */}
        <Route path="/questionnairepage" element={<QuestionnairePage />} />

        {/* --- BARU: Jalur Halaman Hasil --- */}
        <Route path="/upload-gejala" element={<UploadGejalaLuar />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}