// Implementation of graph algorithms with step tracking for visualization

// Breadth-First Search (BFS)
export const bfs = (graph, startNode) => {
    const steps = [];
    
    // Initialize: all nodes are unvisited
    const nodes = Object.keys(graph).map(id => ({
      id,
      state: id === startNode ? 'current' : 'unvisited'
    }));
    
    const edges = [];
    for (const nodeId in graph) {
      for (const neighbor of graph[nodeId]) {
        edges.push({
          from: nodeId,
          to: neighbor,
          state: 'unvisited'
        });
      }
    }
    
    // Record initial state
    steps.push({
      nodes: [...nodes],
      edges: [...edges]
    });
    
    // BFS algorithm
    const queue = [startNode];
    const visited = new Set([startNode]);
    
    while (queue.length > 0) {
      const currentNode = queue.shift();
      
      // Mark current node as processing
      updateNodeState(nodes, currentNode, 'processing');
      steps.push({
        nodes: [...nodes],
        edges: [...edges]
      });
      
      // Process neighbors
      for (const neighbor of graph[currentNode]) {
        // Mark edge as being examined
        updateEdgeState(edges, currentNode, neighbor, 'examining');
        steps.push({
          nodes: [...nodes],
          edges: [...edges]
        });
        
        if (!visited.has(neighbor)) {
          // Mark neighbor as discovered
          updateNodeState(nodes, neighbor, 'discovered');
          steps.push({
            nodes: [...nodes],
            edges: [...edges]
          });
          
          // Update edge state to tree edge
          updateEdgeState(edges, currentNode, neighbor, 'tree');
          steps.push({
            nodes: [...nodes],
            edges: [...edges]
          });
          
          visited.add(neighbor);
          queue.push(neighbor);
        } else {
          // Already visited neighbor, mark edge as cross edge
          updateEdgeState(edges, currentNode, neighbor, 'cross');
          steps.push({
            nodes: [...nodes],
            edges: [...edges]
          });
        }
      }
      
      // Mark current node as visited
      updateNodeState(nodes, currentNode, 'visited');
      steps.push({
        nodes: [...nodes],
        edges: [...edges]
      });
    }
    
    return steps;
  };
  
  // Depth-First Search (DFS)
  export const dfs = (graph, startNode) => {
    const steps = [];
    
    // Initialize: all nodes are unvisited
    const nodes = Object.keys(graph).map(id => ({
      id,
      state: id === startNode ? 'current' : 'unvisited'
    }));
    
    const edges = [];
    for (const nodeId in graph) {
      for (const neighbor of graph[nodeId]) {
        edges.push({
          from: nodeId,
          to: neighbor,
          state: 'unvisited'
        });
      }
    }
    
    // Record initial state
    steps.push({
      nodes: [...nodes],
      edges: [...edges]
    });
    
    // DFS helper function
    const dfsVisit = (node, visited) => {
      visited.add(node);
      
      // Mark current node as processing
      updateNodeState(nodes, node, 'processing');
      steps.push({
        nodes: [...nodes],
        edges: [...edges]
      });
      
      // Process neighbors
      for (const neighbor of graph[node]) {
        // Mark edge as being examined
        updateEdgeState(edges, node, neighbor, 'examining');
        steps.push({
          nodes: [...nodes],
          edges: [...edges]
        });
        
        if (!visited.has(neighbor)) {
          // Mark neighbor as discovered
          updateNodeState(nodes, neighbor, 'discovered');
          steps.push({
            nodes: [...nodes],
            edges: [...edges]
          });
          
          // Update edge state to tree edge
          updateEdgeState(edges, node, neighbor, 'tree');
          steps.push({
            nodes: [...nodes],
            edges: [...edges]
          });
          
          dfsVisit(neighbor, visited);
        } else {
          // Already visited neighbor, mark edge as back edge
          updateEdgeState(edges, node, neighbor, 'back');
          steps.push({
            nodes: [...nodes],
            edges: [...edges]
          });
        }
      }
      
      // Mark current node as visited
      updateNodeState(nodes, node, 'visited');
      steps.push({
        nodes: [...nodes],
        edges: [...edges]
      });
    };
    
    // Start DFS from startNode
    dfsVisit(startNode, new Set());
    
    return steps;
  };
  
  // Dijkstra's Algorithm
  export const dijkstra = (graph, startNode) => {
    const steps = [];
    
    // Initialize: all nodes with distances and states
    const nodes = Object.keys(graph).map(id => ({
      id,
      distance: id === startNode ? 0 : Infinity,
      state: 'unvisited'
    }));
    
    const edges = [];
    for (const nodeId in graph) {
      for (const [neighbor, weight] of graph[nodeId]) {
        edges.push({
          from: nodeId,
          to: neighbor,
          weight,
          state: 'unvisited'
        });
      }
    }
    
    // Record initial state
    steps.push({
      nodes: [...nodes],
      edges: [...edges]
    });
    
    // Set for unvisited nodes
    const unvisited = new Set(Object.keys(graph));
    
    // Mark start node as processing
    updateNodeState(nodes, startNode, 'processing');
    steps.push({
      nodes: [...nodes],
      edges: [...edges]
    });
    
    while (unvisited.size > 0) {
      // Get node with minimum distance
      let minNode = getMinDistanceNode(nodes, unvisited);
      
      if (minNode === null || getNodeDistance(nodes, minNode) === Infinity) {
        break; // No reachable nodes left
      }
      
      // Mark current node as processing
      updateNodeState(nodes, minNode, 'processing');
      steps.push({
        nodes: [...nodes],
        edges: [...edges]
      });
      
      // Remove node from unvisited set
      unvisited.delete(minNode);
      
      // Process neighbors
      for (const [neighbor, weight] of graph[minNode]) {
        if (unvisited.has(neighbor)) {
          // Mark edge as being examined
          updateEdgeState(edges, minNode, neighbor, 'examining');
          steps.push({
            nodes: [...nodes],
            edges: [...edges]
          });
          
          // Calculate new distance
          const distance = getNodeDistance(nodes, minNode) + weight;
          
          if (distance < getNodeDistance(nodes, neighbor)) {
            // Update distance
            updateNodeDistance(nodes, neighbor, distance);
            
            // Mark edge as shortest path
            updateEdgeState(edges, minNode, neighbor, 'shortest');
            steps.push({
              nodes: [...nodes],
              edges: [...edges]
            });
          } else {
            // Not a shorter path, reset edge state
            updateEdgeState(edges, minNode, neighbor, 'unvisited');
            steps.push({
              nodes: [...nodes],
              edges: [...edges]
            });
          }
        }
      }
      
      // Mark current node as visited
      updateNodeState(nodes, minNode, 'visited');
      steps.push({
        nodes: [...nodes],
        edges: [...edges]
      });
    }
    
    return steps;
  };
  
  // A* Search Algorithm
  export const aStar = (graph, startNode, endNode, heuristic) => {
    const steps = [];
    
    // Initialize nodes with f(n) = g(n) + h(n)
    const nodes = Object.keys(graph).map(id => ({
      id,
      g: id === startNode ? 0 : Infinity, // Cost from start to current
      h: heuristic(id, endNode), // Heuristic cost to goal
      f: id === startNode ? heuristic(id, endNode) : Infinity, // Total estimated cost
      parent: null, // For path reconstruction
      state: 'unvisited'
    }));
    
    const edges = [];
    for (const nodeId in graph) {
      for (const [neighbor, weight] of graph[nodeId]) {
        edges.push({
          from: nodeId,
          to: neighbor,
          weight,
          state: 'unvisited'
        });
      }
    }
    
    // Record initial state
    steps.push({
      nodes: [...nodes],
      edges: [...edges]
    });
    
    // Open and closed sets
    const openSet = new Set([startNode]);
    const closedSet = new Set();
    
    // Mark start node as processing
    updateNodeState(nodes, startNode, 'processing');
    steps.push({
      nodes: [...nodes],
      edges: [...edges]
    });
    
    while (openSet.size > 0) {
      // Get node with minimum f value
      const current = getMinFValueNode(nodes, openSet);
      
      // Check if we reached the end
      if (current === endNode) {
        // Mark end node as reached
        updateNodeState(nodes, current, 'found');
        steps.push({
          nodes: [...nodes],
          edges: [...edges]
        });
        
        // Highlight the path from start to end
        highlightPath(nodes, edges, steps);
        
        return steps;
      }
      
      // Move current from open to closed set
      openSet.delete(current);
      closedSet.add(current);
      
      // Mark current node as visited
      updateNodeState(nodes, current, 'visited');
      steps.push({
        nodes: [...nodes],
        edges: [...edges]
      });
      
      // Process neighbors
      for (const [neighbor, weight] of graph[current]) {
        if (closedSet.has(neighbor)) {
          continue; // Skip already evaluated neighbors
        }
        
        // Mark edge as being examined
        updateEdgeState(edges, current, neighbor, 'examining');
        steps.push({
          nodes: [...nodes],
          edges: [...edges]
        });
        
        // Calculate g score for this path
        const tentativeG = getNodeG(nodes, current) + weight;
        
        if (!openSet.has(neighbor)) {
          // Discovered a new node
          openSet.add(neighbor);
          
          // Mark neighbor as discovered
          updateNodeState(nodes, neighbor, 'discovered');
          steps.push({
            nodes: [...nodes],
            edges: [...edges]
          });
        } else if (tentativeG >= getNodeG(nodes, neighbor)) {
          continue; // This is not a better path
        }
        
        // This path is the best so far
        updateNodeParent(nodes, neighbor, current);
        updateNodeG(nodes, neighbor, tentativeG);
        updateNodeF(nodes, neighbor, tentativeG + getNodeH(nodes, neighbor));
        
        // Mark edge as part of current best path
        updateEdgeState(edges, current, neighbor, 'path');
        steps.push({
          nodes: [...nodes],
          edges: [...edges]
        });
      }
    }
    
    // No path found
    return steps;
  };
  
  // Helper functions for graph algorithms
  function updateNodeState(nodes, nodeId, state) {
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      node.state = state;
    }
  }
  
  function updateEdgeState(edges, from, to, state) {
    const edge = edges.find(e => e.from === from && e.to === to);
    if (edge) {
      edge.state = state;
    }
  }
  
  function getMinDistanceNode(nodes, unvisited) {
    let minNode = null;
    let minDistance = Infinity;
    
    for (const nodeId of unvisited) {
      const node = nodes.find(n => n.id === nodeId);
      if (node && node.distance < minDistance) {
        minDistance = node.distance;
        minNode = nodeId;
      }
    }
    
    return minNode;
  }
  
  function getNodeDistance(nodes, nodeId) {
    const node = nodes.find(n => n.id === nodeId);
    return node ? node.distance : Infinity;
  }
  
  function updateNodeDistance(nodes, nodeId, distance) {
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      node.distance = distance;
    }
  }
  
  function getMinFValueNode(nodes, openSet) {
    let minNode = null;
    let minF = Infinity;
    
    for (const nodeId of openSet) {
      const node = nodes.find(n => n.id === nodeId);
      if (node && node.f < minF) {
        minF = node.f;
        minNode = nodeId;
      }
    }
    
    return minNode;
  }
  
  function getNodeG(nodes, nodeId) {
    const node = nodes.find(n => n.id === nodeId);
    return node ? node.g : Infinity;
  }
  
  function getNodeH(nodes, nodeId) {
    const node = nodes.find(n => n.id === nodeId);
    return node ? node.h : 0;
  }
  
  function updateNodeParent(nodes, nodeId, parentId) {
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      node.parent = parentId;
    }
  }
  
  function updateNodeG(nodes, nodeId, g) {
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      node.g = g;
    }
  }
  
  function updateNodeF(nodes, nodeId, f) {
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      node.f = f;
    }
  }
  
  function highlightPath(nodes, edges, steps) {
    // Start from the end node and trace back to start
    let current = nodes.find(n => n.state === 'found');
    if (!current) return;
    
    const path = [];
    while (current && current.parent) {
      path.push({
        from: current.parent,
        to: current.id
      });
      current = nodes.find(n => n.id === current.parent);
    }
    
    // Mark all edges in the path
    for (const { from, to } of path) {
      updateEdgeState(edges, from, to, 'solution');
    }
    
    steps.push({
      nodes: [...nodes],
      edges: [...edges]
    });
  }

  export const graphAlgorithms = {
    aStar,
    bfs,
    dfs,
    dijkstra,
  };