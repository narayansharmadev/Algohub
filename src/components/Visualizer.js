import React, { useEffect, useState, useRef } from 'react';

const Visualizer = ({ 
  algorithm, 
  data, 
  speed = 1000, 
  visualizationSteps = [],
  currentStep = 0,
  isPlaying = false,
  onStepChange
}) => {
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 400 });
  
  // Set up the canvas size based on parent container
  useEffect(() => {
    const updateCanvasSize = () => {
      if (canvasRef.current) {
        const parent = canvasRef.current.parentElement;
        setCanvasSize({
          width: parent.clientWidth,
          height: Math.min(400, window.innerHeight * 0.5)
        });
      }
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  // Draw visualization based on algorithm type and current step
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !visualizationSteps.length) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const step = visualizationSteps[currentStep] || visualizationSteps[0];
    
    if (algorithm.includes('sort')) {
      drawSortingVisualization(ctx, step, canvas);
    } else if (algorithm.includes('search')) {
      drawSearchVisualization(ctx, step, canvas);
    } else if (algorithm.includes('graph') || algorithm.includes('bfs') || algorithm.includes('dfs') || algorithm.includes('dijkstra') || algorithm.includes('a-star')) {
      drawGraphVisualization(ctx, step, canvas);
    }
  }, [algorithm, currentStep, visualizationSteps, canvasSize]);

  // Drawing functions for different algorithm types
  const drawSortingVisualization = (ctx, step, canvas) => {
    if (!step || !step.array) return;
    
    const { array, comparing, swapping } = step;
    const barWidth = Math.floor(canvas.width / array.length);
    const maxValue = Math.max(...array);
    
    array.forEach((value, index) => {
      const barHeight = (value / maxValue) * (canvas.height - 50);
      const x = index * barWidth;
      const y = canvas.height - barHeight;
      
      // Color based on state
      if (swapping && (swapping[0] === index || swapping[1] === index)) {
        ctx.fillStyle = '#FF5733'; // Red for swapping
      } else if (comparing && (comparing[0] === index || comparing[1] === index)) {
        ctx.fillStyle = '#33A1FD'; // Blue for comparing
      } else {
        ctx.fillStyle = '#4CAF50'; // Green default
      }
      
      ctx.fillRect(x, y, barWidth - 1, barHeight);
      
      // Draw value on top of bar
      ctx.fillStyle = '#000';
      ctx.font = '12px Arial';
      ctx.fillText(value, x + barWidth/4, y - 5);
    });
  };
  
  const drawSearchVisualization = (ctx, step, canvas) => {
    if (!step || !step.array) return;
    
    const { array, current, left, right, found } = step;
    const boxSize = Math.floor(canvas.width / array.length);
    const boxHeight = 50;
    const startY = (canvas.height - boxHeight) / 2;
    
    array.forEach((value, index) => {
      const x = index * boxSize;
      const y = startY;
      
      // Draw box
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;
      
      // Color based on state
      if (found === index) {
        ctx.fillStyle = '#4CAF50'; // Green for found
      } else if (current === index) {
        ctx.fillStyle = '#FFC107'; // Yellow/amber for current
      } else if ((left !== undefined && index >= left) && (right !== undefined && index <= right)) {
        ctx.fillStyle = '#E1F5FE'; // Light blue for search range
      } else {
        ctx.fillStyle = '#F5F5F5'; // Light gray for eliminated
      }
      
      ctx.fillRect(x, y, boxSize, boxHeight);
      ctx.strokeRect(x, y, boxSize, boxHeight);
      
      // Draw value
      ctx.fillStyle = '#000';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(value, x + boxSize/2, y + boxHeight/2 + 5);
    });
  };
  
  const drawGraphVisualization = (ctx, step, canvas) => {
    if (!step || !step.nodes) return;
    
    const { nodes, edges, visited, current, path } = step;
    const nodeRadius = 20;
    
    // Center the graph
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Calculate node positions in a circle
    const nodeCount = nodes.length;
    const radius = Math.min(centerX, centerY) - nodeRadius - 10;
    
    // Draw edges first so they appear behind nodes
    if (edges) {
      edges.forEach(edge => {
        const [from, to, weight] = edge;
        
        // Calculate positions
        const fromAngle = (from / nodeCount) * 2 * Math.PI;
        const toAngle = (to / nodeCount) * 2 * Math.PI;
        
        const fromX = centerX + radius * Math.cos(fromAngle);
        const fromY = centerY + radius * Math.sin(fromAngle);
        const toX = centerX + radius * Math.cos(toAngle);
        const toY = centerY + radius * Math.sin(toAngle);
        
        // Draw line
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        
        // Style based on if it's in the path
        if (path && path.some(p => p[0] === from && p[1] === to || p[0] === to && p[1] === from)) {
          ctx.strokeStyle = '#FF5733'; // Red for path
          ctx.lineWidth = 3;
        } else {
          ctx.strokeStyle = '#CCCCCC'; // Gray for regular edges
          ctx.lineWidth = 1;
        }
        
        ctx.stroke();
        
        // Draw weight if provided
        if (weight !== undefined) {
          const midX = (fromX + toX) / 2;
          const midY = (fromY + toY) / 2;
          
          ctx.fillStyle = '#000';
          ctx.font = '12px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(weight, midX, midY);
        }
      });
    }
    
    // Draw nodes
    nodes.forEach((node, index) => {
      const angle = (index / nodeCount) * 2 * Math.PI;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      // Select color based on state
      if (current === index) {
        ctx.fillStyle = '#FFC107'; // Yellow/amber for current
      } else if (visited && visited.includes(index)) {
        ctx.fillStyle = '#4CAF50'; // Green for visited
      } else {
        ctx.fillStyle = '#FFFFFF'; // White for unvisited
      }
      
      // Draw circle
      ctx.beginPath();
      ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Draw label
      ctx.fillStyle = '#000';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(node, x, y + 5);
    });
  };

  return (
    <div className="visualizer-container bg-white p-4 rounded-lg shadow-md">
      <canvas 
        ref={canvasRef} 
        width={canvasSize.width} 
        height={canvasSize.height}
        className="border border-gray-300 rounded"
      />
    </div>
  );
};

export default Visualizer;