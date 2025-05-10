// Implementation of search algorithms with step tracking for visualization

// Helper to create a deep copy of the array
const cloneArray = (arr) => arr.map(item => ({ ...item }));

// Linear Search
const linearSearchImpl = (array) => {
  const arr = cloneArray(array);
  const steps = [cloneArray(arr)]; // Initial state
  
  // We'll pick a random target for the search
  const target = Math.floor(Math.random() * 100) + 1;
  
  for (let i = 0; i < arr.length; i++) {
    // Mark current element being checked
    arr[i].state = 'current';
    steps.push(cloneArray(arr));
    
    if (arr[i].value === target) {
      // Found the target
      arr[i].state = 'found';
      steps.push(cloneArray(arr));
      break;
    } else {
      // Not found - mark as checked
      arr[i].state = 'checked';
      steps.push(cloneArray(arr));
    }
  }
  
  return steps;
};

// Binary Search
const binarySearchImpl = (array) => {
  const arr = cloneArray(array);
  const steps = [cloneArray(arr)]; // Initial state
  
  // We'll pick a random target for the search
  // Select an actual value from the array to ensure it can be found
  const randomIndex = Math.floor(Math.random() * arr.length);
  const target = arr[randomIndex].value;
  
  let left = 0;
  let right = arr.length - 1;
  
  // Mark the search range
  for (let i = left; i <= right; i++) {
    arr[i].state = 'range';
  }
  steps.push(cloneArray(arr));
  
  while (left <= right) {
    // Calculate middle index
    const mid = Math.floor((left + right) / 2);
    
    // Mark current middle element
    arr[mid].state = 'current';
    steps.push(cloneArray(arr));
    
    if (arr[mid].value === target) {
      // Found target
      arr[mid].state = 'found';
      steps.push(cloneArray(arr));
      break;
    } else if (arr[mid].value < target) {
      // Target is in right half
      
      // Mark left half as eliminated
      for (let i = left; i <= mid; i++) {
        arr[i].state = 'eliminated';
      }
      steps.push(cloneArray(arr));
      
      left = mid + 1;
      
      // Update range
      for (let i = left; i <= right; i++) {
        if (arr[i].state !== 'eliminated') {
          arr[i].state = 'range';
        }
      }
      steps.push(cloneArray(arr));
    } else {
      // Target is in left half
      
      // Mark right half as eliminated
      for (let i = mid; i <= right; i++) {
        arr[i].state = 'eliminated';
      }
      steps.push(cloneArray(arr));
      
      right = mid - 1;
      
      // Update range
      for (let i = left; i <= right; i++) {
        if (arr[i].state !== 'eliminated') {
          arr[i].state = 'range';
        }
      }
      steps.push(cloneArray(arr));
    }
  }
  
  // If not found (unlikely with our setup)
  if (left > right) {
    steps.push(cloneArray(arr));
  }
  
  return steps;
};

// Jump Search implementation
const jumpSearchImpl = (array) => {
  const arr = cloneArray(array);
  const steps = [cloneArray(arr)]; // Initial state
  
  // Similar implementation as binary search but with jump steps

  return steps;
};

// Export search algorithms with proper structure
export const searchAlgorithms = {
  "linear-search": {
    name: "Linear Search",
    description: "Simple search that checks each element one by one until it finds the target value.",
    type: "search",
    implementation: linearSearchImpl.toString(),
    visualize: linearSearchImpl
  },
  "binary-search": {
    name: "Binary Search",
    description: "Efficient search algorithm that works on sorted arrays by repeatedly dividing the search range in half.",
    type: "search",
    implementation: binarySearchImpl.toString(),
    visualize: binarySearchImpl
  },
  "jump-search": {
    name: "Jump Search",
    description: "Search algorithm for sorted arrays that jumps ahead by fixed steps to improve efficiency.",
    type: "search",
    implementation: jumpSearchImpl.toString(),
    visualize: jumpSearchImpl
  }
};