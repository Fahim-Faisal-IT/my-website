import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import SignupPage from './pages/SignupPage';
import KYCPage from './pages/KYCPage';
import VerificationWaitingPage from './pages/VerificationWaitingPage';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/kyc" element={<KYCPage />} />
        <Route path="/verification-waiting" element={<VerificationWaitingPage />} />
      </Routes>
    </Router>
  );
}

export default App;