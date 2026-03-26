import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadGejalaLuar from './pages/UploadGejalaLuar';
import LandingPage from './pages/LandingPage';
import QuestionnairePage from './pages/QuestionnairePage';
import AuthPage from './pages/AuthPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import DeskripsiGejalaPage from './pages/GejalaDalam';
import ResultPage from './pages/ResultPage';
import ProfilePage from './pages/ProfilePage';
import UpdateData from './pages/UpdateData';   
import SecurityPage from './pages/SecurityPage';

import FeedbackPage from './pages/Feedbackpage'; 

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route path="/login" element={<AuthPage />} />
        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/deskripsi-gejala" element={<DeskripsiGejalaPage />} />
        
        <Route path="/questionnaire" element={<QuestionnairePage />} />
        <Route path="/registerpage" element={<RegisterPage />} />
        
        <Route path="/upload-gejala" element={<UploadGejalaLuar />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/update-profile" element={<UpdateData />} /> 
        
        <Route path="/security" element={<SecurityPage />} />

        <Route path="/feedback" element={<FeedbackPage />} />
      </Routes>
    </Router>
  );
}