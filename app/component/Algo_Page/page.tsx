// pages/DataStructures.js
import React from 'react';
import Link from 'next/link';

const dataStructures = [
  'Array', 'Linked List', 'Stack', 'Queue', 
  'Binary Tree', 
  'Graph', 'Binary Search Tree'
];

const DataStructuresPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 p-6" >
      <h1 className="text-4xl font-bold text-white mb-8">Data Structures</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-4xl">
        {dataStructures.map((name, index) => (
          <Link href={`/${name.toLowerCase().replace(' ', '-')}`} key={index}>
            <button className="w-full py-4 px-6 bg-zinc-600 hover:bg-zinc-700 text-white rounded-lg font-medium transition duration-200">
              {name}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DataStructuresPage;
