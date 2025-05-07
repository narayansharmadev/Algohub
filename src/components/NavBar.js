import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-2xl font-bold">AlgoHub</h1>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/algorithms" className="hover:underline">Visualizer</Link></li>
          <li><Link to="/leaderboard" className="hover:underline">Problem Solver</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
