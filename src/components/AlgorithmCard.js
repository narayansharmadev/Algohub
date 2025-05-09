// import React from 'react';
// import { Link , useParams} from 'react-router-dom';

// const AlgorithmCard = ({ algorithm }) => {
//     const { algorithmId } = useParams();
//     const { id, name, difficulty, description } = algorithm;

//     return (
//         <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden border border-gray-200">
//             <div className="p-6">
//                 <div className="flex justify-between items-start mb-2">
//                     <h4 className="text-xl font-semibold">{name}</h4>
//                     <span className={`text-sm px-2 py-1 rounded ${difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
//                             difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
//                                 'bg-red-100 text-red-800'
//                         }`}>
//                         {difficulty}
//                     </span>
//                 </div>
//                 <p className="text-gray-600 mb-4">{description}</p>
//                 <Link
//                     to={`/visualize/${id}`}
//                     className="w-full block text-center text-white bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg font-medium"
//                     onClick = {()=> {
//                         console.log("Algorithm ID:", id);
//                     }
//                     }
//                 >
//                     Visualize
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default AlgorithmCard;