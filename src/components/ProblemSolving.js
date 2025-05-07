import MonacoEditor from '@monaco-editor/react';

const ProblemSolving = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl mb-4">Solve the Problem</h2>
      <MonacoEditor
        height="500px"
        defaultLanguage="javascript"
        defaultValue="// Write your solution here"
      />
      <button className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
        Submit Solution
      </button>
    </div>
  );
}

export default ProblemSolving;
