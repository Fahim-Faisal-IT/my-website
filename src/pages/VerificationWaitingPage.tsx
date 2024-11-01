import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Clock } from 'lucide-react';
import Header from '../components/Header';

const VerificationWaitingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <Clock className="h-20 w-20 text-blue-500 mx-auto mb-6 animate-pulse" />
        
        <h1 className="text-3xl font-bold text-white mb-4">
          Verification In Progress
        </h1>
        
        <p className="text-gray-400 mb-8">
          Your documents are being reviewed. This process typically takes about 2 hours.
          We'll notify you once the verification is complete.
        </p>

        <div className="space-y-6">
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-blue-500 hover:text-blue-400">Terms of Service</a>
            <span className="text-gray-600">•</span>
            <a href="#" className="text-blue-500 hover:text-blue-400">Privacy Policy</a>
            <span className="text-gray-600">•</span>
            <a href="#" className="text-blue-500 hover:text-blue-400">Support</a>
          </div>

          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationWaitingPage;