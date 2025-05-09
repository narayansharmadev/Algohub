const problems = [
    {
      id: 1,
      title: 'Two Sum',
      description: 'Given an array of integers, find two numbers that add up to a specific target.',
      difficulty: 'Easy',
      category: 'Array',
      starterCode: 'function twoSum(nums, target) {\n  // Write your code here\n}',
      testCases: [
        { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
        { input: [[3, 2, 4], 6], expected: [1, 2] }
      ],
      examples: [
        { input: '[2, 7, 11, 15], 9', output: '[0, 1]' },
        { input: '[3, 2, 4], 6', output: '[1, 2]' }
      ],
      constraints: ['The input array is non-empty.', 'The target sum exists.']
    },
    {
      id: 2,
      title: 'Valid Parentheses',
      description: 'Check if a given string of parentheses is valid.',
      difficulty: 'Medium',
      category: 'String',
      starterCode: 'function isValid(s) {\n  // Write your code here\n}',
      testCases: [
        { input: ['()'], expected: true },
        { input: ['(]'], expected: false }
      ],
      examples: [
        { input: '()', output: 'true' },
        { input: '(]', output: 'false' }
      ],
      constraints: ['The input string contains only parentheses characters.']
    }
  ];
  
  export default problems;