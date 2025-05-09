import React, { useState } from 'react';

const CodeEditor = ({ initialCode, onCodeChange, language = 'javascript' }) => {
  const [code, setCode] = useState(initialCode || '');

  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    if (onCodeChange) {
      onCodeChange(newCode);
    }
  }; 

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gray-800 px-4 py-2 text-gray-400 flex justify-between items-center">
        <span className="font-mono text-sm">{language.toUpperCase()}</span>
        <div className="flex space-x-2">
          <button 
            className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => onCodeChange && onCodeChange(code)}
          >
            Run
          </button>
          <button 
            className="px-3 py-1 text-xs bg-gray-700 text-white rounded hover:bg-gray-600 transition"
            onClick={() => setCode(initialCode || '')}
          >
            Reset
          </button>
        </div>
      </div>
      <textarea
        className="w-full h-80 bg-gray-900 text-gray-100 p-4 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={code}
        onChange={handleCodeChange}
        spellCheck="false"
      />
    </div>
  );
};

export default CodeEditor;