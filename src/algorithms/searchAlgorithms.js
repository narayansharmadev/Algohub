// Implementation of search algorithms with step tracking for visualization

// Helper to create a deep copy of the array
const cloneArray = (arr) => arr.map(item => ({ ...item }));

// Linear Search
export const linearSearch = (array, target) => {
  const arr = cloneArray(array);
  const steps = [cloneArray(arr)]; // Initial state
  
  for (let i = 0; i < arr.length; i++) {
    // Mark current element being examined
    arr[i].state = 'current';
    steps.push(cloneArray(arr));
    
    // Check if current element is the target
    if (arr[i].value === target) {
      arr[i].state = 'found';
      steps.push(cloneArray(arr));
      return { steps, found: true, index: i };
    }
    
    // Mark checked element
    arr[i].state = 'checked';
    steps.push(cloneArray(arr));
  }
  
  return { steps, found: false, index: -1 };
};

// Binary Search (requires a sorted array)
export const binarySearch = (array, target) => {
  const arr = cloneArray(array);
  const steps = [cloneArray(arr)]; // Initial state
  
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    // Mark the current subarray being searched
    for (let i = left; i <= right; i++) {
      arr[i].state = 'subarray';
    }
    steps.push(cloneArray(arr));
    
    const mid = Math.floor((left + right) / 2);
    
    // Mark the middle element
    arr[mid].state = 'current';
    steps.push(cloneArray(arr));
    
    // Check if target is found
    if (arr[mid].value === target) {
      arr[mid].state = 'found';
      steps.push(cloneArray(arr));
      return { steps, found: true, index: mid };
    }
    
    // If target is greater, ignore left half
    if (arr[mid].value < target) {
      // Mark elements we're eliminating
      for (let i = left; i <= mid; i++) {
        arr[i].state = 'eliminated';
      }
      steps.push(cloneArray(arr));
      
      left = mid + 1;
    } 
    // If target is smaller, ignore right half
    else {
      // Mark elements we're eliminating
      for (let i = mid; i <= right; i++) {
        arr[i].state = 'eliminated';
      }
      steps.push(cloneArray(arr));
      
      right = mid - 1;
    }
    
    // Reset states for next iteration
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].state !== 'eliminated') {
        arr[i].state = '';
      }
    }
  }
  
  // Target not found
  return { steps, found: false, index: -1 };
};

// Jump Search (requires a sorted array)
export const jumpSearch = (array, target) => {
  const arr = cloneArray(array);
  const steps = [cloneArray(arr)]; // Initial state
  
  const n = arr.length;
  const blockSize = Math.floor(Math.sqrt(n));
  
  let step = blockSize;
  let prev = 0;
  
  // Mark the first element
  arr[prev].state = 'current';
  steps.push(cloneArray(arr));
  
  // Finding the block where the target may be present
  while (prev < n && arr[Math.min(step, n) - 1].value < target) {
    // Mark elements we're jumping over
    for (let i = prev; i < Math.min(step, n); i++) {
      arr[i].state = 'checked';
    }
    
    prev = step;
    step += blockSize;
    
    if (prev < n) {
      // Mark the new element we're checking
      arr[prev].state = 'current';
      steps.push(cloneArray(arr));
    } else {
      // If prev is beyond array bounds, target is not in the array
      return { steps, found: false, index: -1 };
    }
  }
  
  // Linear search in the identified block
  for (let i = prev; i < Math.min(step, n); i++) {
    arr[i].state = 'searching';
    steps.push(cloneArray(arr));
    
    if (arr[i].value === target) {
      arr[i].state = 'found';
      steps.push(cloneArray(arr));
      return { steps, found: true, index: i };
    }
    
    arr[i].state = 'checked';
    steps.push(cloneArray(arr));
  }
  
  return { steps, found: false, index: -1 };
};

export const searchAlgorithms = {
    binarySearch,
    jumpSearch,
    linearSearch,
  };