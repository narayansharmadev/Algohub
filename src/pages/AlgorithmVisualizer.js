
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';
import Visualizer from '../components/Visualizer';
import { sortingAlgorithms } from '../algorithms/sortingAlgorithms';
import { searchAlgorithms } from '../algorithms/searchAlgorithms';
import { graphAlgorithms } from '../algorithms/graphAlgorithms';

const AlgorithmVisualizer = () => {
  const { algorithmId } = useParams();
  const navigate = useNavigate();
  const [algorithm, setAlgorithm] = useState(null);
  const [code, setCode] = useState('');
  const [data, setData] = useState([]);
  const [visualizationSteps, setVisualizationSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500); // milliseconds
  const [dataSize, setDataSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Find the algorithm from all algorithm sources
  useEffect(() => {
    const loadAlgorithm = () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log("Loading algorithm with ID:", algorithmId);
        console.log("Available sorting algorithms:", Object.keys(sortingAlgorithms));
        console.log("Available search algorithms:", Object.keys(searchAlgorithms));
        console.log("Available graph algorithms:", Object.keys(graphAlgorithms));
        
        // Combine all algorithm sources
        const allAlgorithms = {
          ...sortingAlgorithms,
          ...searchAlgorithms,
          ...graphAlgorithms
        };
        
        console.log("All available algorithms:", Object.keys(allAlgorithms));
        
        const foundAlgorithm = allAlgorithms[algorithmId];
        
        if (foundAlgorithm) {
          console.log("Found algorithm:", foundAlgorithm.name);
          setAlgorithm(foundAlgorithm);
          setCode(foundAlgorithm.implementation);
          
          // Generate initial data based on algorithm type
          generateData(foundAlgorithm.type, dataSize);
          setLoading(false);
        } else {
          console.error(`Algorithm with ID "${algorithmId}" not found`);
          setError(`Algorithm "${algorithmId}" not found`);
          setLoading(false);
          
          // Redirect after a short delay
          setTimeout(() => {
            navigate('/algorithms');
          }, 2000);
        }
      } catch (err) {
        console.error("Error loading algorithm:", err);
        setError(`Error loading algorithm: ${err.message}`);
        setLoading(false);
      }
    };
    
    loadAlgorithm();
  }, [algorithmId, navigate, dataSize]);
  
  // Generate data based on algorithm type
  const generateData = (type, size) => {
    try {
      if (type === 'sorting') {
        // For sorting algorithms, create array of objects with values and state
        const newData = Array.from({ length: size }, (_, i) => ({
          id: i,
          value: Math.floor(Math.random() * 100) + 1,
          state: ''
        }));
        setData(newData);
      } else if (type === 'search') {
        // For search algorithms, create sorted array
        const newData = Array.from({ length: size }, (_, i) => ({
          id: i,
          value: i * Math.floor((100 / size)) + 1,
          state: ''
        }));
        setData(newData);
      } else if (type === 'graph') {
        // Simple graph representation
        const nodes = Array.from({ length: Math.min(10, size) }, (_, i) => `Node ${i}`);
        const edges = [];
        
        for (let i = 0; i < nodes.length; i++) {
          // Connect to next node (circular)
          edges.push([i, (i + 1) % nodes.length, Math.floor(Math.random() * 10) + 1]);
          
          // Add some random connections for more interesting graphs
          if (nodes.length > 3 && Math.random() > 0.5) {
            let target;
            do {
              target = Math.floor(Math.random() * nodes.length);
            } while (target === i || target === (i + 1) % nodes.length);
            
            edges.push([i, target, Math.floor(Math.random() * 10) + 1]);
          }
        }
        
        setData({ nodes, edges });
      }
    } catch (err) {
      console.error("Error generating data:", err);
      setError(`Error generating data: ${err.message}`);
    }
  };
  
  // Handle code change from editor
  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };
  
  // Run the algorithm and generate visualization steps
  const runAlgorithm = () => {
    if (!algorithm) return;
    
    try {
      setError(null);
      
      // For safety, we're using the algorithm's visualize function directly
      // rather than evaluating code string
      const steps = algorithm.visualize(data);
      
      // Reset visualization
      setVisualizationSteps(steps);
      setCurrentStep(0);
      setIsPlaying(false);
    } catch (error) {
      console.error("Error running algorithm:", error);
      setError(`Error running algorithm: ${error.message}`);
    }
  };
  
  // Control visualization playback
  const playVisualization = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    
    if (currentStep >= visualizationSteps.length - 1) {
      setCurrentStep(0);
    }
    
    setIsPlaying(true);
  };
  
  // Effect for auto-advancing steps during playback
  useEffect(() => {
    let timer;
    
    if (isPlaying && visualizationSteps.length > 0) {
      timer = setTimeout(() => {
        if (currentStep < visualizationSteps.length - 1) {
          setCurrentStep(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, speed);
    }
    
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, visualizationSteps, speed]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-blue-500 border-blue-200 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading algorithm...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-6 text-center">
        <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-semibold text-red-800 mb-2">Error</h3>
        <p className="text-red-700">{error}</p>
        <p className="mt-4 text-gray-600">Redirecting to algorithm list...</p>
      </div>
    );
  }
  
  if (!algorithm) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-gray-600">Algorithm not found. Redirecting...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mb-6">
        <h2 className="text-3xl font-bold">{algorithm.name}</h2>
        <p className="text-gray-600 mt-2">{algorithm.description}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side: Code editor */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Code Implementation</h3>
          <CodeEditor 
            initialCode={code} 
            onCodeChange={handleCodeChange} 
            language="javascript" 
          />
          <div className="mt-4 flex justify-between">
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={runAlgorithm}
            >
              Run Algorithm
            </button>
            <button 
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
              onClick={() => setCode(algorithm.implementation)}
            >
              Reset Code
            </button>
          </div>
        </div>
        
        {/* Right side: Visualization */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Visualization</h3>
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Data Size</label>
                <div className="flex items-center space-x-2 mt-1">
                  <input 
                    type="range" 
                    min="5" 
                    max={algorithm.type === 'graph' ? 20 : 50}
                    value={dataSize}
                    onChange={(e) => setDataSize(parseInt(e.target.value))}
                    className="w-32"
                  />
                  <span>{dataSize}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Animation Speed</label>
                <div className="flex items-center space-x-2 mt-1">
                  <input 
                    type="range" 
                    min="50" 
                    max="2000"
                    step="50"
                    value={speed}
                    onChange={(e) => setSpeed(parseInt(e.target.value))}
                    className="w-32"
                  />
                  <span>{speed}ms</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2 mb-4">
              <button 
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={() => generateData(algorithm.type, dataSize)}
              >
                Generate New Data
              </button>
              <button 
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
                onClick={runAlgorithm}
              >
                Visualize
              </button>
            </div>
          </div>
          
          <Visualizer 
            algorithm={algorithmId}
            data={data}
            speed={speed}
            visualizationSteps={visualizationSteps}
            currentStep={currentStep}
            isPlaying={isPlaying}
            onStepChange={setCurrentStep}
            algorithmType={algorithm.type}
          />
          
          {visualizationSteps.length > 0 && (
            <div className="mt-4 flex justify-between items-center">
              <div className="flex space-x-4">
                <button 
                  className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
                  onClick={() => setCurrentStep(0)}
                  disabled={currentStep === 0}
                >
                  First
                </button>
                <button 
                  className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
                  onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                  disabled={currentStep === 0}
                >
                  Previous
                </button>
                <button 
                  className={`px-3 py-1 ${isPlaying ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white rounded transition`}
                  onClick={playVisualization}
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button 
                  className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
                  onClick={() => setCurrentStep(prev => Math.min(visualizationSteps.length - 1, prev + 1))}
                  disabled={currentStep >= visualizationSteps.length - 1}
                >
                  Next
                </button>
                <button 
                  className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
                  onClick={() => setCurrentStep(visualizationSteps.length - 1)}
                  disabled={currentStep >= visualizationSteps.length - 1}
                >
                  Last
                </button>
              </div>
              <div className="text-gray-600">
                Step {currentStep + 1} of {visualizationSteps.length}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;