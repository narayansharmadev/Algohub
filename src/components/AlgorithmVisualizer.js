import { useEffect, useRef } from 'react';

const AlgorithmVisualizer = ({ algorithm }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    // Visualization logic for the algorithm here (e.g., Bubble Sort visualization)
    if (algorithm === 'Bubble Sort') {
      // Create a Bubble Sort visualization using ctx
    }
  }, [algorithm]);

  return (
    <div className="p-8">
      <h2 className="text-2xl mb-4">Visualizing: {algorithm}</h2>
      <canvas ref={canvasRef} width="500" height="300" className="border-2 border-gray-500" />
    </div>
  );
}

export default AlgorithmVisualizer;
