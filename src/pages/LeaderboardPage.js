// src/pages/Leaderboard.js
import React, { useState, useEffect } from 'react';


const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  // Dummy data for leaderboard
  useEffect(() => {
    const fetchLeaderboard = async () => {  
      // Simulating a data fetch
      const dummyData = [
        { username: 'Alice', score: 98 },
        { username: 'Bob', score: 92 },
        { username: 'Charlie', score: 88 },
        { username: 'David', score: 85 },
        { username: 'Eve', score: 82 },
      ];
      setUsers(dummyData);
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-3xl font-bold text-center mb-6">Leaderboard</h2>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="text-lg font-semibold p-2">Rank</th>
              <th className="text-lg font-semibold p-2">Username</th>
              <th className="text-lg font-semibold p-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr 
                key={index} 
                className={`border-b ${index % 2 === 0 ? 'bg-gray-100' : ''}`}
              >
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{user.username}</td>
                <td className="p-2">{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
