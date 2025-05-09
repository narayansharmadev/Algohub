import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  // Features to showcase on homepage
  const features = [
    {
      title: "Algorithm Visualizations",
      description: "Watch algorithms in action with step-by-step visual explanations",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      link: "/algorithms"
    },
    {
      title: "Interactive Problem Solving",
      description: "Solve coding problems and test your algorithm skills",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      link: "/problems"
    },
    {
      title: "Compete on Leaderboard",
      description: "Compare your solutions with others and climb the rankings",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      link: "/leaderboard"
    }
  ];

  return (
    <div className="text-center">
      {/* Hero Section */}
      <div className="py-20 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-lg shadow-lg mb-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to AlgoHub!</h1>
        <p className="text-xl mb-8">Visualize algorithms and solve problems interactively</p>
        <div className="flex justify-center space-x-4">
          <Link to="/algorithms" className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition shadow-md">
            Explore Algorithms
          </Link>
          <Link to="/problems" className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition shadow-md">
            Start Solving Problems
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-12">What You Can Do Here</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="flex justify-center text-blue-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="mb-4 text-gray-600">{feature.description}</p>
              <Link to={feature.link} className="text-blue-600 hover:underline font-medium">
                Get Started →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-100 p-10 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Ready to master algorithms?</h2>
        <p className="mb-6 text-gray-600">
          Join thousands of students and professionals improving their coding skills
        </p>
        <Link to="/algorithms" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md">
          Start Learning Now
        </Link>
      </div>
    </div>
  );
};

export default HomePage;