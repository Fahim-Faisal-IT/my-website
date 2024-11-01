import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage, auth } from '../lib/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { Bot, Upload } from 'lucide-react';
import Header from '../components/Header';
import toast from 'react-hot-toast';

const KYCPage = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState({
    frontId: null,
    selfieWithId: null,
    selfie: null
  });
  const [progress, setProgress] = useState(0);
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (file) {
      setImages(prev => ({ ...prev, [type]: file }));
      setProgress(prev => Math.min(prev + 33, 99));
    }
  };

  const handleVerification = async () => {
    if (!images.frontId || !images.selfieWithId || !images.selfie) {
      toast.error('Please upload all required images');
      return;
    }

    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        toast.error('Please sign in first');
        return;
      }

      const promises = Object.entries(images).map(async ([type, file]) => {
        const imageRef = ref(storage, `kyc/${userId}/${type}`);
        await uploadBytes(imageRef, file as File);
      });

      await Promise.all(promises);
      setProgress(100);
      toast.success('Documents uploaded successfully!');
      navigate('/verification-waiting');
    } catch (error) {
      toast.error('Error uploading documents');
    }
  };

  const isVerificationComplete = images.frontId && images.selfieWithId && images.selfie;

  const demoImages = {
    frontId: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop',
    selfieWithId: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop',
    selfie: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop'
  };

  const UploadBox = ({ type, label }: { type: string; label: string }) => (
    <div className="relative bg-gray-800 p-6 rounded-lg text-center">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUpload(e, type)}
        className="hidden"
        id={type}
      />
      <label
        htmlFor={type}
        className="cursor-pointer block"
      >
        {images[type as keyof typeof images] ? (
          <img
            src={URL.createObjectURL(images[type as keyof typeof images] as File)}
            alt={label}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        ) : (
          <div className="relative w-full h-64 bg-gray-700 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
            <img
              src={demoImages[type as keyof typeof demoImages]}
              alt="Demo"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <Upload className="h-12 w-12 text-gray-400 relative z-10" />
          </div>
        )}
        <span className="text-gray-300">{label}</span>
      </label>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <Bot className="h-16 w-16 text-blue-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">
            Complete Your KYC Verification
          </h1>
          <p className="text-gray-400">
            Get instant rewards after verification
          </p>
        </div>

        <div className="mb-8">
          <div className="h-2 bg-gray-700 rounded-full">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <UploadBox type="frontId" label="Front of National ID" />
          <UploadBox type="selfieWithId" label="Selfie with ID" />
          <UploadBox type="selfie" label="Selfie" />
        </div>

        <div className="text-center">
          <button
            onClick={handleVerification}
            disabled={!isVerificationComplete}
            className={`px-8 py-3 rounded-lg font-medium transition-colors ${
              isVerificationComplete
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            Complete Verification
          </button>

          <div className="mt-6 space-x-4 text-sm">
            <a href="#" className="text-blue-500 hover:text-blue-400">Terms of Service</a>
            <span className="text-gray-600">•</span>
            <a href="#" className="text-blue-500 hover:text-blue-400">Privacy Policy</a>
            <span className="text-gray-600">•</span>
            <a href="#" className="text-blue-500 hover:text-blue-400">Support</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYCPage;