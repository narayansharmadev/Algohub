import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Algorithm data organized by categories
const algorithmCategories = [
  {
    name: "Sorting Algorithms",
    algorithms: [
      { id: "bubble-sort", name: "Bubble Sort", difficulty: "Easy", description: "A simple comparison-based algorithm that repeatedly steps through the list" },
      { id: "selection-sort", name: "Selection Sort", difficulty: "Easy", description: "Simple in-place comparison sort algorithm" },
      { id: "insertion-sort", name: "Insertion Sort", difficulty: "Easy", description: "Builds the sorted array one item at a time" },
      { id: "merge-sort", name: "Merge Sort", difficulty: "Medium", description: "Efficient, stable, divide and conquer algorithm" },
      { id: "quick-sort", name: "Quick Sort", difficulty: "Medium", description: "Efficient divide and conquer sorting algorithm" },
      { id: "heap-sort", name: "Heap Sort", difficulty: "Medium", description: "Comparison-based sort that uses a binary heap data structure" }
    ]
  },
  {
    name: "Search Algorithms",
    algorithms: [
      { id: "linear-search", name: "Linear Search", difficulty: "Easy", description: "Simple search that checks each element one by one" },
      { id: "binary-search", name: "Binary Search", difficulty: "Easy", description: "Search algorithm that finds a target value in a sorted array" },
      { id: "jump-search", name: "Jump Search", difficulty: "Medium", description: "Search algorithm for sorted arrays that jumps ahead by fixed steps" }
    ]
  },
  {
    name: "Graph Algorithms",
    algorithms: [
      { id: "bfs", name: "Breadth-First Search (BFS)", difficulty: "Medium", description: "Explores all neighbor nodes at the present depth before moving to next level" },
      { id: "dfs", name: "Depth-First Search (DFS)", difficulty: "Medium", description: "Explores as far as possible along each branch before backtracking" },
      { id: "dijkstra", name: "Dijkstra's Algorithm", difficulty: "Hard", description: "Finds shortest paths between nodes in a graph" },
      { id: "a-star", name: "A* Search", difficulty: "Hard", description: "Finds shortest path using heuristics to guide search" }
    ]
  },
  {
    name: "Dynamic Programming",
    algorithms: [
      { id: "fibonacci", name: "Fibonacci Sequence", difficulty: "Easy", description: "Calculate nth Fibonacci number efficiently" },
      { id: "knapsack", name: "0/1 Knapsack", difficulty: "Medium", description: "Optimization problem for maximizing value with weight constraints" }
    ]
  }
];

const AlgorithmList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  
  // Filter algorithms based on search and difficulty filter
  const filteredCategories = algorithmCategories.map(category => {
    const filteredAlgos = category.algorithms.filter(algo => {
      const matchesSearch = algo.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = filterDifficulty === 'All' || algo.difficulty === filterDifficulty;
      return matchesSearch && matchesDifficulty;
    });
    
    return {
      ...category,
      algorithms: filteredAlgos
    };
  }).filter(category => category.algorithms.length > 0);

  // Difficulty options for filter
  const difficultyOptions = ['All', 'Easy', 'Medium', 'Hard'];

  return (
    <div className="min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">Algorithm Visualizer</h2>
      
      {/* Search and Filter */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-1/2">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search algorithms..."
            className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-auto">
          <select
            className="w-full md:w-auto p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
          >
            {difficultyOptions.map(option => (
              <option key={option} value={option}>{option} Difficulty</option>
            ))}
          </select>
        </div>
      </div>

      {/* Check if no algorithms match the filter */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-8">
          <p className="text-xl text-gray-600">No algorithms found matching your criteria.</p>
          <button 
            onClick={() => {setSearchTerm(''); setFilterDifficulty('All');}}
            className="mt-4 text-blue-600 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
      
      {/* Algorithm Categories */}
      {filteredCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="mb-10">
          <h3 className="text-2xl font-semibold mb-4 pl-2 border-l-4 border-blue-600">{category.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.algorithms.map((algo, algoIndex) => (
              <div 
                key={algoIndex} 
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden border border-gray-200"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-semibold">{algo.name}</h4>
                    <span className={`text-sm px-2 py-1 rounded ${
                      algo.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      algo.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {algo.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{algo.description}</p>
                  <Link 
                    to={`/visualize/${algo.id}`} 
                    className="w-full block text-center text-white bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg font-medium"
                  >
                    Visualize
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlgorithmList;