
const AlgorithmsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="text-center p-8">
        <h1 className="text-3xl font-bold mb-6">Algorithms List</h1>
        <ul className="space-y-4">
          <li className="bg-white p-4 rounded-lg shadow-lg">
            <button className="text-xl font-semibold text-blue-600 hover:underline">Bubble Sort</button>
          </li>
          <li className="bg-white p-4 rounded-lg shadow-lg">
            <button className="text-xl font-semibold text-blue-600 hover:underline">Merge Sort</button>
          </li>
          {/* Add more algorithm items here */}
        </ul>
      </div>
    </div>
  );
}

export default AlgorithmsPage;
