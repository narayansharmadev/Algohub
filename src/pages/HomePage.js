import { Link } from 'react-router-dom';
import React from 'react';


const HomePage = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold">Welcome to AlgoHub!</h1>
      <p className="mt-4 text-lg">Visualize algorithms and solve problems interactively.</p>
      <div className="mt-6 space-x-4">
        <Link to="/algorithms" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Explore Algorithms</Link>
        <Link to="/leaderboard" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">Start Solving Problems</Link>
      </div>
    </div>
  );
};

export default HomePage;
