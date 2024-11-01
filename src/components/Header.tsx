import React from 'react';
import { Link } from 'react-router-dom';
import { Bot } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold">BitBot</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/exchange" className="hover:text-blue-500">Exchange</Link>
            <Link to="/web3" className="hover:text-blue-500">Web3</Link>
            <Link to="/card" className="hover:text-blue-500">BitBot Card</Link>
            <Link to="/bot" className="hover:text-blue-500">Trading Bot</Link>
            <Link to="/launchpad" className="hover:text-blue-500">Launchpad</Link>
            <Link to="/earn" className="hover:text-blue-500">Earn</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;