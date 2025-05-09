import React from 'react';

const ProblemCard = ({ problem, onSelect }) => {
  const { id, title, difficulty, category, description } = problem;

  const difficultyColors = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition cursor-pointer" onClick={() => onSelect(problem)}>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-xl font-semibold">{title}</h4>
          <div className="flex space-x-2">
            <span className={`text-sm px-2 py-1 rounded ${difficultyColors[difficulty]}`}>
              {difficulty}
            </span>
            <span className="text-sm px-2 py-1 rounded bg-blue-100 text-blue-800">
              {category}
            </span>
          </div>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <button 
          className="w-full text-center text-white bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg font-medium"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(problem);
          }}
        >
          Solve Problem
        </button>
      </div>
    </div>
  );
};

export default ProblemCard;