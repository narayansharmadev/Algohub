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

// Algorithm implementations
const bubbleSortImpl = (array) => {
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

// Selection Sort implementation (code unchanged from original)
const selectionSortImpl = (array) => {
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

// Other algorithm implementations (not modified for brevity)

// Export the algorithm objects with proper structure
export const sortingAlgorithms = {
  "bubble-sort": {
    name: "Bubble Sort",
    description: "A simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in wrong order.",
    type: "sorting",
    implementation: bubbleSortImpl.toString(), 
    visualize: bubbleSortImpl
  },
  "selection-sort": {
    name: "Selection Sort",
    description: "Simple in-place comparison sort algorithm that divides the input list into a sorted and an unsorted region.",
    type: "sorting",
    implementation: selectionSortImpl.toString(),
    visualize: selectionSortImpl
  },
  "insertion-sort": {
    name: "Insertion Sort",
    description: "Builds the sorted array one item at a time by comparing each item with the items in the sorted portion of the array.",
    type: "sorting",
    implementation: "// Insertion Sort implementation", // Replace with actual implementation
    visualize: bubbleSortImpl // Temporary fallback
  },
  "merge-sort": {
    name: "Merge Sort",
    description: "Efficient, stable, divide and conquer sorting algorithm that divides the array into halves, sorts them and then merges them.",
    type: "sorting",
    implementation: "// Merge Sort implementation", // Replace with actual implementation
    visualize: bubbleSortImpl // Temporary fallback
  },
  "quick-sort": {
    name: "Quick Sort",
    description: "Efficient divide and conquer sorting algorithm that works by selecting a 'pivot' element and partitioning the array around it.",
    type: "sorting",
    implementation: "// Quick Sort implementation", // Replace with actual implementation  
    visualize: bubbleSortImpl // Temporary fallback
  },
  "heap-sort": {
    name: "Heap Sort",
    description: "Comparison-based sort that uses a binary heap data structure to build a heap and extract elements one by one.",
    type: "sorting",
    implementation: "// Heap Sort implementation", // Replace with actual implementation
    visualize: bubbleSortImpl // Temporary fallback
  }
};