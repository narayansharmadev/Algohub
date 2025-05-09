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
  
  // Find the algorithm from all algorithm sources
  useEffect(() => {
    const allAlgorithms = {
      ...sortingAlgorithms,
      ...searchAlgorithms,
      ...graphAlgorithms
    };
    
    const foundAlgorithm = allAlgorithms[algorithmId];
    
    if (foundAlgorithm) {
      setAlgorithm(foundAlgorithm);
      setCode(foundAlgorithm.implementation);
      
      // Generate initial data based on algorithm type
      generateData(foundAlgorithm.type, dataSize);
    } else {
      // Algorithm not found, redirect to algorithm list
      navigate('/algorithms');
    }
  }, [algorithmId, navigate]);
  
  // Generate data based on algorithm type
  const generateData = (type, size) => {
    if (type === 'sorting') {
      // Random array for sorting
      const newData = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
      setData(newData);
    } else if (type === 'search') {
      // Sorted array for searching
      const newData = Array.from({ length: size }, (_, i) => i * Math.floor((100 / size)) + 1);
      setData(newData);
    } else if (type === 'graph') {
      // Simple graph representation for graph algorithms
      // For simplicity, creating a circular graph where each node connects to adjacent nodes
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
  };
  
  // Handle code change from editor
  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };
  
  // Run the algorithm and generate visualization steps
  const runAlgorithm = () => {
    if (!algorithm) return;
    
    try {
      // Create function from code string
      // Note: This is for educational purposes and has security implications in production
      const runFunction = new Function('data', code);
      
      // Run algorithm with current data and collect steps
      const steps = runFunction([...data]);
      
      // Reset visualization
      setVisualizationSteps(steps);
      setCurrentStep(0);
      setIsPlaying(false);
    } catch (error) {
      console.error("Error running algorithm:", error);
      alert(`Error running algorithm: ${error.message}`);
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
  
  if (!algorithm) {
    return <div className="text-center py-10">Loading...</div>;
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