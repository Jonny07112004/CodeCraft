import React, { useState } from "react";
import { motion } from "framer-motion";

const LinkedListVisualizer = () => {
  const [nodes, setNodes] = useState<number[]>([]);
  const [pseudoCodeSteps, setPseudoCodeSteps] = useState<string[]>([]);
  const [highlightedStep, setHighlightedStep] = useState<number | null>(null);
  const [tempIndex, setTempIndex] = useState<number | null>(null);
  const [indexInput, setIndexInput] = useState<number | "">("");
  const [valueInput, setValueInput] = useState<number | "">("");
  const [customListInput, setCustomListInput] = useState<string>("");

  // Function to get algorithmic steps for each operation
  const getAlgorithmSteps = (operation: string, value?: number, position?: number) => {
    switch (operation) {
      case "insert-index":
        return [
          "Algorithm InsertAtIndex(value, position):",
          "   1. Create a new node with given value.",
          "   2. If position == 0:",
          "      a. Set newNode.next to head",
          "      b. Update head to newNode",
          "   3. Else:",
          "      a. Set temp to head",
          `      b. Traverse till index ${position as number- 1}`,
          "      c. Set newNode.next to temp.next",
          "      d. Set temp.next to newNode"
        ];
      case "delete-index":
        return [
          "Algorithm DeleteAtIndex(position):",
          "   1. If head is NULL, return.",
          "   2. If position == 0:",
          "      a. Update head to head.next",
          "   3. Else:",
          "      a. Set temp to head",
          `      b. Traverse till index ${position as number - 1}`,
          "      c. Set temp.next to temp.next.next"
        ];
      default:
        return [];
    }
  };

  // Traversal and step-by-step highlighting
  const traverseAndHighlight = async (steps: string[], targetIndex: number, callback: () => void) => {
    for (let i = 0; i < steps.length; i++) {
      setHighlightedStep(i);
      if (i >= 2 && i - 2 <= targetIndex) {
        setTempIndex(i - 2);
      }
      await new Promise((resolve) => setTimeout(resolve, 600));
    }
    callback();
    setHighlightedStep(null);
    setTempIndex(null);
  };

  // Insert at Specified Index
  const insertAtIndex = () => {
    if (indexInput === "" || valueInput === "" || indexInput < 0 || indexInput > nodes.length) return;
    const steps = getAlgorithmSteps("insert-index", valueInput, indexInput);
    setPseudoCodeSteps(steps);
    traverseAndHighlight(steps, indexInput - 1, () => {
      const newNodes = [...nodes];
      newNodes.splice(indexInput, 0, valueInput);
      setNodes(newNodes);
      setValueInput("");
      setIndexInput("");
    });
  };

  // Delete from Specified Index
  const deleteFromIndex = () => {
    if (indexInput === "" || indexInput < 0 || indexInput >= nodes.length) return;
    const steps = getAlgorithmSteps("delete-index", undefined, indexInput);
    setPseudoCodeSteps(steps);
    traverseAndHighlight(steps, indexInput - 1, () => {
      const newNodes = [...nodes];
      newNodes.splice(indexInput, 1);
      setNodes(newNodes);
      setIndexInput("");
    });
  };

  // Set Custom Linked List
  const setCustomLinkedList = () => {
    const customValues = customListInput.split(",").map((num) => parseInt(num.trim())).filter((num) => !isNaN(num));
    setNodes(customValues);
    setCustomListInput("");
  };

  return (
    <div className="w-full h-screen text-white flex flex-col items-center p-4 bg-gray-900">
      <h1 className="text-center text-2xl mb-4">Linked List Visualizer</h1>

      {/* Custom Linked List Input */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          value={customListInput}
          onChange={(e) => setCustomListInput(e.target.value)}
          className="px-2 py-1 border rounded text-black w-64"
          placeholder="Enter comma-separated values (e.g. 10, 20, 30)"
        />
        <button className="px-4 py-2 bg-blue-500 rounded" onClick={setCustomLinkedList}>
          Set Custom List
        </button>
      </div>

      {/* Insert/Delete at Index */}
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        <input
          type="number"
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value === "" ? "" : parseInt(e.target.value))}
          className="px-2 py-1 border rounded text-black w-20"
          placeholder="Value"
        />
        <input
          type="number"
          value={indexInput}
          onChange={(e) => setIndexInput(e.target.value === "" ? "" : parseInt(e.target.value))}
          className="px-2 py-1 border rounded text-black w-16"
          placeholder="Index"
        />
        <button className="px-4 py-2 bg-green-500 rounded" onClick={insertAtIndex}>
          Insert at Index
        </button>
        <button className="px-4 py-2 bg-red-500 rounded" onClick={deleteFromIndex}>
          Delete at Index
        </button>
      </div>

      {/* Visualization */}
      <div className="border-2 border-gray-400 rounded p-4 w-full flex items-center justify-start gap-4 overflow-x-auto">
        {nodes.length === 0 ? (
          <p className="text-gray-400">No nodes in the linked list.</p>
        ) : (
          nodes.map((value, index) => (
            <div key={index} className="flex flex-col items-center">
              <motion.div
                className={`w-20 h-20 flex items-center justify-center ${
                  tempIndex === index ? "bg-red-500" : "bg-blue-700"
                } text-white rounded shadow-md`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                {value}
              </motion.div>
              <span className="text-xs mt-1 text-gray-400">
                Index: {index} {tempIndex === index ? `(temp)` : ""}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Algorithm Display */}
      <div className="mt-6 w-[90%] md:w-[60%] bg-gray-800 p-4 rounded shadow-lg text-sm font-mono">
        <h2 className="text-lg mb-2 text-green-400">Algorithm:</h2>
        <pre className="whitespace-pre-wrap text-gray-300">
          {pseudoCodeSteps.map((step, i) => (
            <span key={i} className={i === highlightedStep ? "text-yellow-400 font-bold" : ""}>
              {step}{"\n"}
            </span>
          ))}
        </pre>
      </div>
    </div>
  );
};

export default LinkedListVisualizer;
