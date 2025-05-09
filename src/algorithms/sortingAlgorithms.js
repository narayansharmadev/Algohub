// Implementation of sorting algorithms with step tracking for visualization

// Color codes for different states:
// comparing: blue - elements being compared
// swapped: orange - elements that were just swapped
// sorted: green - elements in their final sorted position
// current: purple - current element being processed
// min: yellow - current minimum element
// pivot: red - pivot element in quicksort
// subarray: light gray - elements in the current subarray
// merging-left, merging-right: different shades of blue - elements being merged
// merged: teal - elements that have been merged

// Helper to create a deep copy of the array
const cloneArray = (arr) => arr.map(item => ({ ...item }));

// Bubble Sort
export const bubbleSort = (array) => {
  const arr = cloneArray(array);
  const steps = [cloneArray(arr)]; // Initial state
  
  let swapped;
  for (let i = 0; i < arr.length; i++) {
    swapped = false;
    
    for (let j = 0; j < arr.length - i - 1; j++) {
      // Mark elements being compared
      arr[j].state = 'comparing';
      arr[j + 1].state = 'comparing';
      steps.push(cloneArray(arr));
      
      if (arr[j].value > arr[j + 1].value) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
        
        // Mark as swapped
        arr[j].state = 'swapped';
        arr[j + 1].state = 'swapped';
        steps.push(cloneArray(arr));
      }
      
      // Reset state
      arr[j].state = '';
      arr[j + 1].state = '';
    }
    
    // Mark last element as sorted
    arr[arr.length - i - 1].state = 'sorted';
    steps.push(cloneArray(arr));
    
    if (!swapped) {
      // Mark all remaining elements as sorted
      for (let k = 0; k < arr.length - i - 1; k++) {
        if (arr[k].state !== 'sorted') {
          arr[k].state = 'sorted';
        }
      }
      steps.push(cloneArray(arr));
      break;
    }
  }
  
  return steps;
};

// Selection Sort
export const selectionSort = (array) => {
  const arr = cloneArray(array);
  const steps = [cloneArray(arr)]; // Initial state
  
  for (let i = 0; i < arr.length; i++) {
    // Mark current position
    arr[i].state = 'current';
    steps.push(cloneArray(arr));
    
    let minIndex = i;
    arr[minIndex].state = 'min';
    steps.push(cloneArray(arr));
    
    for (let j = i + 1; j < arr.length; j++) {
      // Mark element being compared
      arr[j].state = 'comparing';
      steps.push(cloneArray(arr));
      
      if (arr[j].value < arr[minIndex].value) {
        // Reset previous min
        arr[minIndex].state = '';
        
        // Update min index
        minIndex = j;
        arr[minIndex].state = 'min';
        steps.push(cloneArray(arr));
      } else {
        // Reset compared element
        arr[j].state = '';
      }
    }
    
    // Swap if needed
    if (minIndex !== i) {
      // Mark elements to be swapped
      arr[i].state = 'swapping';
      arr[minIndex].state = 'swapping';
      steps.push(cloneArray(arr));
      
      // Perform swap
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      steps.push(cloneArray(arr));
    }
    
    // Mark as sorted
    arr[i].state = 'sorted';
    
    // Reset other states
    for (let k = i + 1; k < arr.length; k++) {
      arr[k].state = '';
    }
    
    steps.push(cloneArray(arr));
  }
  
  return steps;
};

// Insertion Sort
export const insertionSort = (array) => {
  const arr = cloneArray(array);
  const steps = [cloneArray(arr)]; // Initial state
  
  for (let i = 1; i < arr.length; i++) {
    // Mark current element
    arr[i].state = 'current';
    steps.push(cloneArray(arr));
    
    let key = arr[i];
    let j = i - 1;
    
    while (j >= 0 && arr[j].value > key.value) {
      // Mark element being compared
      arr[j].state = 'comparing';
      steps.push(cloneArray(arr));
      
      // Move element to the right
      arr[j + 1] = arr[j];
      arr[j + 1].state = 'swapped';
      steps.push(cloneArray(arr));
      
      j--;
    }
    
    // Place key in the correct position
    arr[j + 1] = key;
    arr[j + 1].state = 'inserted';
    steps.push(cloneArray(arr));
    
    // Mark sorted part
    for (let k = 0; k <= i; k++) {
      arr[k].state = 'sorted';
    }
    steps.push(cloneArray(arr));
  }
  
  return steps;
};

// Merge Sort
export const mergeSort = (array) => {
  const arr = cloneArray(array);
  const steps = [cloneArray(arr)]; // Initial state
  
  const mergeSortHelper = (arr, start, end) => {
    if (start >= end) return;
    
    const mid = Math.floor((start + end) / 2);
    
    // Mark subarrays
    for (let i = start; i <= mid; i++) {
      arr[i].state = 'left-subarray';
    }
    for (let i = mid + 1; i <= end; i++) {
      arr[i].state = 'right-subarray';
    }
    steps.push(cloneArray(arr));
    
    // Reset states before recursion
    for (let i = start; i <= end; i++) {
      arr[i].state = '';
    }
    
    mergeSortHelper(arr, start, mid);
    mergeSortHelper(arr, mid + 1, end);
    merge(arr, start, mid, end);
  };
  
  const merge = (arr, start, mid, end) => {
    // Mark the subarrays to be merged
    for (let i = start; i <= mid; i++) {
      arr[i].state = 'merging-left';
    }
    for (let i = mid + 1; i <= end; i++) {
      arr[i].state = 'merging-right';
    }
    steps.push(cloneArray(arr));
    
    const leftArr = arr.slice(start, mid + 1);
    const rightArr = arr.slice(mid + 1, end + 1);
    
    let i = 0, j = 0, k = start;
    
    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i].value <= rightArr[j].value) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      
      arr[k].state = 'merged';
      steps.push(cloneArray(arr));
      k++;
    }
    
    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      arr[k].state = 'merged';
      steps.push(cloneArray(arr));
      i++;
      k++;
    }
    
    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      arr[k].state = 'merged';
      steps.push(cloneArray(arr));
      j++;
      k++;
    }
    
    // Mark the entire subarray as sorted
    for (let i = start; i <= end; i++) {
      arr[i].state = 'sorted';
    }
    steps.push(cloneArray(arr));
  };
  
  mergeSortHelper(arr, 0, arr.length - 1);
  
  // Final state - all sorted
  for (let i = 0; i < arr.length; i++) {
    arr[i].state = 'sorted';
  }
  steps.push(cloneArray(arr));
  
  return steps;
};

// Quick Sort
// Heap Sort
export const heapSort = (array) => {
  const arr = cloneArray(array);
  const steps = [cloneArray(arr)]; // Initial state
  
  // Build max heap
  const buildMaxHeap = (arr) => {
    const n = arr.length;
    
    // Starting from the last non-leaf node
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(arr, n, i);
    }
  };
  
  // Heapify a subtree rooted at index i
  const heapify = (arr, heapSize, i) => {
    let largest = i; // Initialize largest as root
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    // Mark the current node and its children
    arr[i].state = 'current';
    steps.push(cloneArray(arr));
    
    if (left < heapSize) {
      arr[left].state = 'comparing';
      steps.push(cloneArray(arr));
      
      if (arr[left].value > arr[largest].value) {
        // Reset previous largest
        arr[largest].state = '';
        largest = left;
        arr[largest].state = 'largest';
        steps.push(cloneArray(arr));
      } else {
        arr[left].state = '';
      }
    }
    
    if (right < heapSize) {
      arr[right].state = 'comparing';
      steps.push(cloneArray(arr));
      
      if (arr[right].value > arr[largest].value) {
        // Reset previous largest
        arr[largest].state = '';
        largest = right;
        arr[largest].state = 'largest';
        steps.push(cloneArray(arr));
      } else {
        arr[right].state = '';
      }
    }
    
    if (largest !== i) {
      // Mark nodes to be swapped
      arr[i].state = 'swapping';
      arr[largest].state = 'swapping';
      steps.push(cloneArray(arr));
      
      // Swap
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      steps.push(cloneArray(arr));
      
      // Reset states
      arr[i].state = '';
      arr[largest].state = '';
      
      // Recursively heapify the affected sub-tree
      heapify(arr, heapSize, largest);
    } else {
      // Reset state if no swap
      arr[i].state = '';
      steps.push(cloneArray(arr));
    }
  };
  
  // Build the heap
  buildMaxHeap(arr);
  
  // Extract elements from heap one by one
  for (let i = arr.length - 1; i > 0; i--) {
    // Move current root to end
    arr[0].state = 'swapping';
    arr[i].state = 'swapping';
    steps.push(cloneArray(arr));
    
    [arr[0], arr[i]] = [arr[i], arr[0]];
    steps.push(cloneArray(arr));
    
    // Mark sorted element
    arr[i].state = 'sorted';
    arr[0].state = '';
    steps.push(cloneArray(arr));
    
    // Call heapify on the reduced heap
    heapify(arr, i, 0);
  }
  
  // Mark the first element as sorted
  arr[0].state = 'sorted';
  steps.push(cloneArray(arr));
  
  return steps;
};

export const quickSort = (array) => {
  const arr = cloneArray(array);
  const steps = [cloneArray(arr)]; // Initial state
  
  const quickSortHelper = (arr, low, high) => {
    if (low < high) {
      // Mark subarray being sorted
      for (let i = low; i <= high; i++) {
        arr[i].state = 'subarray';
      }
      steps.push(cloneArray(arr));
      
      // Choose pivot (last element)
      arr[high].state = 'pivot';
      steps.push(cloneArray(arr));
      
      let pivotValue = arr[high].value;
      let i = low - 1;
      
      // Partition
      for (let j = low; j < high; j++) {
        // Mark current element being compared
        arr[j].state = 'comparing';
        steps.push(cloneArray(arr));
        
        if (arr[j].value <= pivotValue) {
          i++;
          
          // Mark elements to be swapped
          if (i !== j) {
            arr[i].state = 'swapping';
            arr[j].state = 'swapping';
            steps.push(cloneArray(arr));
            
            // Swap
            [arr[i], arr[j]] = [arr[j], arr[i]];
            steps.push(cloneArray(arr));
          }
        }
        
        // Reset states
        for (let k = low; k <= high; k++) {
          if (k !== high) { // Keep pivot marked
            arr[k].state = 'subarray';
          }
        }
      }
      
      // Swap pivot into position
      i++;
      arr[i].state = 'swapping';
      arr[high].state = 'swapping';
      steps.push(cloneArray(arr));
      
      [arr[i], arr[high]] = [arr[high], arr[i]];
      steps.push(cloneArray(arr));
      
      // Mark pivot in its final position
      arr[i].state = 'placed';
      steps.push(cloneArray(arr));
      
      // Reset states for next recursion
      for (let k = low; k <= high; k++) {
        if (k !== i) { // Keep pivot placed
          arr[k].state = '';
        }
      }
      
      // Recursively sort left and right partitions
      quickSortHelper(arr, low, i - 1);
      quickSortHelper(arr, i + 1, high);
    }
  };
  
  quickSortHelper(arr, 0, arr.length - 1);
  
  // Final state - all sorted
  for (let i = 0; i < arr.length; i++) {
    arr[i].state = 'sorted';
  }
  steps.push(cloneArray(arr));
  
  return steps;
};


export const sortingAlgorithms = {
    bubbleSort,
    selectionSort,
    insertionSort,
    mergeSort,
    quickSort,
    heapSort,
  };