import React, { useState } from 'react';
import ProblemCard from '../components/ProblemCard';
import CodeEditor from '../components/CodeEditor';
import problems from '../data/problems';

const ProblemSolver = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter problems based on search term and filters
  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = filterDifficulty === 'All' || problem.difficulty === filterDifficulty;
    const matchesCategory = filterCategory === 'All' || problem.category === filterCategory;

    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const categories = ['All', ...new Set(problems.map(p => p.category))];

  const handleSelectProblem = (problem) => {
    setSelectedProblem(problem);
    setCode(problem.starterCode || '// Write your solution here');
    setResult(null);
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleSubmit = () => {
    if (!selectedProblem) return;

    setIsSubmitting(true);
    setResult(null);

    setTimeout(() => {
      try {
        const solutionFunction = new Function(code + '\n return solution;')();
        const testResults = selectedProblem.testCases.map(testCase => {
          const { input, expected } = testCase;
          let output;
          let passed = false;

          try {
            output = solutionFunction(...input);
            passed = Array.isArray(expected) ? JSON.stringify(output) === JSON.stringify(expected) : output === expected;
          } catch (error) {
            output = `Error: ${error.message}`;
          }

          return { input, expected, output, passed };
        });

        const allPassed = testResults.every(test => test.passed);

        setResult({
          success: allPassed,
          message: allPassed ? 'All test cases passed!' : 'Some test cases failed',
          testResults
        });
      } catch (error) {
        setResult({
          success: false,
          message: `Error: ${error.message}`,
          testResults: []
        });
      } finally {
        setIsSubmitting(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h2 className="text-3xl font-bold mb-6">Algorithm Problems</h2>
      {selectedProblem ? (
        <div>
          <button className="mb-4 text-blue-600" onClick={() => setSelectedProblem(null)}>Back to Problems</button>
          <h3 className="text-xl font-bold">{selectedProblem.title}</h3>
          <CodeEditor initialCode={code} onCodeChange={handleCodeChange} />
          <button onClick={handleSubmit} className="mt-4 bg-green-600 text-white py-2 px-4 rounded">Submit</button>
          {result && (
            <div className={`mt-4 ${result.success ? 'text-green-600' : 'text-red-600'}`}>{result.message}</div>
          )}
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Search problems..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 mb-4"
          />
          {filteredProblems.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} onSelect={handleSelectProblem} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProblemSolver;
