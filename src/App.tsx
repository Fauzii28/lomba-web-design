import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadGejalaLuar from './pages/UploadGejalaLuar';
// Import Halaman Landing Page
import LandingPage from './pages/LandingPage';
import QuestionnairePage from './pages/QuestionnairePage';
// Import Halaman AuthPage
import AuthPage from './pages/AuthPage';
// Import Halaman Dashboard
import RegisterPage from './pages/RegisterPage';

import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import UpdateDataPage from './pages/UpdateData';
import SecurityPage from './pages/SecurityPage';
import DeskripsiGejalaPage from './pages/GejalaDalam';



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
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/update-profile" element={<UpdateDataPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/deskripsi-gejala" element={<DeskripsiGejalaPage />} />
        {/* Jalur Kuis */}
        <Route path="/questionnairepage" element={<QuestionnairePage />} />
       
        <Route path="/registerpage" element={<RegisterPage />} />
        {/* --- BARU: Jalur Halaman Hasil --- */}
        <Route path="/upload-gejala" element={<UploadGejalaLuar />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}