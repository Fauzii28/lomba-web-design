import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadGejalaLuar from './pages/UploadGejalaLuar';
import LandingPage from './pages/LandingPage';
import QuestionnairePage from './pages/QuestionnairePage';
import AuthPage from './pages/AuthPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import DeskripsiGejalaPage from './pages/GejalaDalam';
import ResultPage from './pages/ResultPage';

// --- TAMBAHKAN IMPORT INI ---
import FeedbackPage from './pages/Feedbackpage'; 

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Jalur Utama */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Jalur Masuk/Login */}
        <Route path="/login" element={<AuthPage />} />
        
        {/* Jalur Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/deskripsi-gejala" element={<DeskripsiGejalaPage />} />
        
        {/* Jalur Kuis */}
        <Route path="/questionnairepage" element={<QuestionnairePage />} />
        <Route path="/registerpage" element={<RegisterPage />} />
        
        {/* Jalur Upload & Hasil */}
        <Route path="/upload-gejala" element={<UploadGejalaLuar />} />
        <Route path="/result" element={<ResultPage />} />

        {/* --- TAMBAHKAN JALUR INI --- */}
        <Route path="/feedback" element={<FeedbackPage />} />
      </Routes>
    </Router>
  );
}