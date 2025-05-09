import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          AlgoHub
        </Link>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-8">
          <li><Link to="/" className="hover:text-blue-200 transition">Home</Link></li>
          <li><Link to="/algorithms" className="hover:text-blue-200 transition">Algorithms</Link></li>
          <li><Link to="/problems" className="hover:text-blue-200 transition">Problem Solver</Link></li>
          <li><Link to="/leaderboard" className="hover:text-blue-200 transition">Leaderboard</Link></li>
        </ul>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden pt-2 pb-4 px-4">
          <ul className="flex flex-col space-y-2">
            <li><Link to="/" className="block py-2 hover:bg-blue-700 px-2 rounded" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link to="/algorithms" className="block py-2 hover:bg-blue-700 px-2 rounded" onClick={() => setIsMenuOpen(false)}>Algorithms</Link></li>
            <li><Link to="/problems" className="block py-2 hover:bg-blue-700 px-2 rounded" onClick={() => setIsMenuOpen(false)}>Problem Solver</Link></li>
            <li><Link to="/leaderboard" className="block py-2 hover:bg-blue-700 px-2 rounded" onClick={() => setIsMenuOpen(false)}>Leaderboard</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;