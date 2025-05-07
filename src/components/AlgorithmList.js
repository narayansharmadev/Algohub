// src/pages/AlgorithmList.js
import React from 'react';
import { Link } from 'react-router-dom';


const algorithms = [
    { name: 'Bubble Sort', path: '/visualize/bubble-sort' },
    { name: 'Merge Sort', path: '/visualize/merge-sort' },
    { name: 'Quick Sort', path: '/visualize/quick-sort' },
    { name: 'Dijkstras Algorithm', path: '/visualize/dijkstra' },
    { name: 'Binary Search', path: '/visualize/binary-search' },
    { name: 'Breadth-First Search (BFS)', path: '/visualize/bfs' },
    { name: 'Depth-First Search (DFS)', path: '/visualize/dfs' },
  ];

const AlgorithmList = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-3xl font-bold text-center mb-6">Algorithm List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {algorithms.map((algo, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">{algo.name}</h3>
            <Link to={algo.path} className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded inline-block">Visualize</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlgorithmList;
