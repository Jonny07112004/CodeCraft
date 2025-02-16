import React, { useState } from "react";
import { motion } from "framer-motion";

const LinkedListVisualizer = () => {
  const [nodes, setNodes] = useState<number[]>([]);

  // Add Node
  const addNode = (value: number, position: "start" | "end" | number = "end") => {
    const newNodes = [...nodes];
    if (position === "start") {
      newNodes.unshift(value); // Add at the beginning
    } else if (position === "end") {
      newNodes.push(value); // Add at the end
    } else if (typeof position === "number" && position >= 0 && position <= nodes.length) {
      newNodes.splice(position, 0, value); // Add at specific index
    }
    setNodes(newNodes);
  };

  // Delete Node
  const deleteNode = (position: "start" | "end" | number) => {
    const newNodes = [...nodes];
    if (position === "start") {
      newNodes.shift(); // Remove from the beginning
    } else if (position === "end") {
      newNodes.pop(); // Remove from the end
    } else if (typeof position === "number" && position >= 0 && position < nodes.length) {
      newNodes.splice(position, 1); // Remove at specific index
    }
    setNodes(newNodes);
  };

  return (
    <div className="w-full h-screen text-white flex flex-col items-center p-4 bg-gray-900">
      <h1 className="text-center text-2xl mb-4">Linked List Visualizer</h1>

      {/* Buttons for Insertions */}
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        <button
          className="px-4 py-2 bg-blue-500 rounded"
          onClick={() => addNode(Math.floor(Math.random() * 100), "start")}
        >
          Insert at Start
        </button>
        <button
          className="px-4 py-2 bg-green-500 rounded"
          onClick={() => addNode(Math.floor(Math.random() * 100), "end")}
        >
          Insert at End
        </button>
        <button
          className="px-4 py-2 bg-yellow-500 rounded"
          onClick={() => addNode(Math.floor(Math.random() * 100), 1)} // Insert at index 1
        >
          Insert at Index 1
        </button>
      </div>

      {/* Buttons for Deletions */}
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        <button
          className="px-4 py-2 bg-red-500 rounded"
          onClick={() => deleteNode("start")}
        >
          Delete from Start
        </button>
        <button
          className="px-4 py-2 bg-orange-500 rounded"
          onClick={() => deleteNode("end")}
        >
          Delete from End
        </button>
        <button
          className="px-4 py-2 bg-purple-500 rounded"
          onClick={() => deleteNode(1)} // Delete from index 1
        >
          Delete at Index 1
        </button>
      </div>

      {/* Visualization */}
      <div className="border-2 border-gray-400 rounded p-4 w-full flex items-center justify-start gap-4 overflow-x-auto">
        {nodes.length === 0 ? (
          <p className="text-gray-400">No nodes in the linked list.</p>
        ) : (
          nodes.map((value, index) => (
            <div key={index} className="flex items-center">
              {/* Node */}
              <motion.div
                className="w-20 h-20 flex items-center justify-center bg-blue-700 text-white rounded shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                {value}
              </motion.div>
              {/* Arrow */}
              {index < nodes.length - 1 && (
                <svg
                  width="50"
                  height="20"
                  className="mx-2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="0"
                    y1="10"
                    x2="40"
                    y2="10"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <polygon
                    points="40,5 50,10 40,15"
                    fill="white"
                  />
                </svg>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LinkedListVisualizer;
