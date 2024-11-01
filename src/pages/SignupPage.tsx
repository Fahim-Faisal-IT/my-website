import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { Bot, Apple, Smartphone } from 'lucide-react';
import Header from '../components/Header';
import TradingTable from '../components/TradingTable';
import toast from 'react-hot-toast';

const SignupPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('Logged in successfully!');
        navigate('/verification-waiting');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success('Account created successfully!');
        navigate('/kyc');
      }
    } catch (error: any) {
      const errorMessage = error.code === 'auth/wrong-password' 
        ? 'Incorrect password' 
        : error.code === 'auth/user-not-found'
        ? 'No account found with this email'
        : error.message;
      toast.error(errorMessage);
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    toast.success('Password reset instructions sent to your email');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Auth Section */}
          <div className="bg-gray-800 p-8 rounded-lg">
            <div className="flex items-center justify-center mb-8">
              <Bot className="h-12 w-12 text-blue-500" />
            </div>
            
            <div className="flex justify-center space-x-4 mb-6">
              <button
                onClick={() => setIsLogin(false)}
                className={`px-4 py-2 rounded-md ${!isLogin ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
              >
                Sign Up
              </button>
              <button
                onClick={() => setIsLogin(true)}
                className={`px-4 py-2 rounded-md ${isLogin ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
              >
                Login
              </button>
            </div>

            <form onSubmit={handleAuth} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-400">Email</label>
                <input
                  type="email"
                  required
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400">Password</label>
                <input
                  type="password"
                  required
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                {isLogin ? 'Login' : 'Sign Up'}
              </button>

              {isLogin && (
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="w-full text-sm text-blue-500 hover:text-blue-400"
                >
                  Forgot Password?
                </button>
              )}
            </form>

            <div className="mt-8">
              <div className="text-center text-gray-400 mb-4">Download Mobile App</div>
              <div className="flex justify-center space-x-4">
                <button className="flex items-center space-x-2 bg-gray-700 px-4 py-2 rounded-lg">
                  <Smartphone className="h-5 w-5" />
                  <span>Google Play</span>
                </button>
                <button className="flex items-center space-x-2 bg-gray-700 px-4 py-2 rounded-lg">
                  <Apple className="h-5 w-5" />
                  <span>App Store</span>
                </button>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">
                Earn Rewards Instantly with BitBot!
              </h1>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-800 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-500">$2.1B+</div>
                  <div className="text-gray-400">Total Rewards</div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-500">5M+</div>
                  <div className="text-gray-400">Registered Users</div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-500">180+</div>
                  <div className="text-gray-400">Countries Supported</div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-500">500+</div>
                  <div className="text-gray-400">Trading Pairs</div>
                </div>
              </div>
            </div>
            <TradingTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;