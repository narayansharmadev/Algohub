import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import AlgorithmList from './pages/AlgorithmList';
import AlgorithmVisualizer from './pages/AlgorithmVisualizer';
import ProblemSolver from './pages/ProblemSolver';
import Leaderboard from './pages/LeaderboardPage';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-50 flex flex-col">
        <NavBar />
        <main className="flex-grow container mx-auto py-8 px-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/algorithms" element={<AlgorithmList />} />
            <Route path="/visualize/:algorithmId" element={<AlgorithmVisualizer />} />
            <Route path="/problems" element={<ProblemSolver />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
        <footer className="bg-blue-600 text-white p-4 text-center">
          <p>© 2025 AlgoHub - Learn Algorithms Interactively</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;