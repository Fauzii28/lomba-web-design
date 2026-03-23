import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Import Halaman Landing Page desain manualmu
import LandingPage from './pages/LandingPage';

import QuestionnairePage from './pages/QuestionnairePage';
// Import Halaman fungsional buatan Bolt (AuthPage.tsx)
// Catatan: Di laptopmu pastikan filenya bernama AuthPage.tsx
import AuthPage from './pages/AuthPage';

// Import Halaman Dashboard buatan Bolt (Dashboard.tsx)
// Catatan: Di laptopmu pastikan filenya bernama Dashboard.tsx
import Dashboard from './pages/Dashboard';

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

        <Route path="/questionnairepage" element={<QuestionnairePage />} />
      </Routes>
    </Router>
  );
}