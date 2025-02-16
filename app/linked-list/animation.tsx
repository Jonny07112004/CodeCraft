import React, { useState } from "react";
import { motion } from "framer-motion";

const LinkedListVisualizer = () => {
  const [nodes, setNodes] = useState<number[]>([]);
  const [pseudoCodeSteps, setPseudoCodeSteps] = useState<string[]>([]);
  const [highlightedStep, setHighlightedStep] = useState<number | null>(null);
  const [tempIndex, setTempIndex] = useState<number | null>(null);

  // Function to get pseudo-code for each operation
  const getPseudoCodeSteps = (operation: string, value?: number, position?: number | string) => {
    switch (operation) {
      case "insert-start":
        return [
          `newNode = createNode(${value})`,
          `newNode.next = head`,
          `head = newNode`
        ];
      case "insert-end":
        return [
          `newNode = createNode(${value})`,
          `if head is NULL: head = newNode`,
          `else: temp = head`,
          `while temp.next != NULL: temp = temp.next`,
          `temp.next = newNode`
        ];
      case "insert-index":
        return [
          `newNode = createNode(${value})`,
          `temp = head`,
          `for i = 0 to ${(position as number) - 1}: temp = temp.next`,
          `newNode.next = temp.next`,
          `temp.next = newNode`
        ];
      case "delete-start":
        return [
          `if head == NULL: return`,
          `head = head.next`
        ];
      case "delete-end":
        return [
          `if head == NULL: return`,
          `if head.next == NULL: head = NULL`,
          `else: temp = head`,
          `while temp.next.next != NULL: temp = temp.next`,
          `temp.next = NULL`
        ];
      case "delete-index":
        return [
          `temp = head`,
          `for i = 0 to ${position as number- 1}: temp = temp.next`,
          `temp.next = temp.next.next`
        ];
      case "search":
        return [
          `temp = head`,
          `while temp != NULL:`,
          `if temp.value == ${value}: return index`,
          `temp = temp.next`
        ];
      default:
        return [];
    }
  };

  // Simultaneous temp traversal and pseudo-code execution
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

  // Insert at Start
  const insertAtStart = (value: number) => {
    const steps = getPseudoCodeSteps("insert-start", value);
    setPseudoCodeSteps(steps);
    traverseAndHighlight(steps, 0, () => {
      setNodes([value, ...nodes]);
    });
  };

  // Insert at End
  const insertAtEnd = (value: number) => {
    const steps = getPseudoCodeSteps("insert-end", value);
    setPseudoCodeSteps(steps);
    traverseAndHighlight(steps, nodes.length - 1, () => {
      setNodes([...nodes, value]);
    });
  };

  // Insert at Index
  const insertAtIndex = (value: number, position: number) => {
    if (position < 0 || position > nodes.length) return;
    const steps = getPseudoCodeSteps("insert-index", value, position);
    setPseudoCodeSteps(steps);
    traverseAndHighlight(steps, position - 1, () => {
      const newNodes = [...nodes];
      newNodes.splice(position, 0, value);
      setNodes(newNodes);
    });
  };

  // Delete from Start
  const deleteFromStart = () => {
    if (nodes.length === 0) return;
    const steps = getPseudoCodeSteps("delete-start");
    setPseudoCodeSteps(steps);
    traverseAndHighlight(steps, 0, () => {
      setNodes(nodes.slice(1));
    });
  };

  // Delete from End
  const deleteFromEnd = () => {
    if (nodes.length === 0) return;
    const steps = getPseudoCodeSteps("delete-end");
    setPseudoCodeSteps(steps);
    traverseAndHighlight(steps, nodes.length - 2, () => {
      setNodes(nodes.slice(0, -1));
    });
  };

  // Delete from Index
  const deleteFromIndex = (position: number) => {
    if (position < 0 || position >= nodes.length) return;
    const steps = getPseudoCodeSteps("delete-index", undefined, position);
    setPseudoCodeSteps(steps);
    traverseAndHighlight(steps, position - 1, () => {
      const newNodes = [...nodes];
      newNodes.splice(position, 1);
      setNodes(newNodes);
    });
  };

  return (
    <div className="w-full h-screen text-white flex flex-col items-center p-4 bg-gray-900">
      <h1 className="text-center text-2xl mb-4">Linked List Visualizer</h1>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        <button className="px-4 py-2 bg-green-500 rounded" onClick={() => insertAtStart(Math.floor(Math.random() * 100))}>
          Insert at Start
        </button>
        <button className="px-4 py-2 bg-blue-500 rounded" onClick={() => insertAtEnd(Math.floor(Math.random() * 100))}>
          Insert at End
        </button>
        <button className="px-4 py-2 bg-yellow-500 rounded" onClick={() => insertAtIndex(Math.floor(Math.random() * 100), 1)}>
          Insert at Index 1
        </button>
        <button className="px-4 py-2 bg-red-500 rounded" onClick={deleteFromStart}>
          Delete from Start
        </button>
        <button className="px-4 py-2 bg-orange-500 rounded" onClick={deleteFromEnd}>
          Delete from End
        </button>
        <button className="px-4 py-2 bg-purple-500 rounded" onClick={() => deleteFromIndex(1)}>
          Delete at Index 1
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

      {/* Pseudo-code Display */}
      <div className="mt-6 w-[90%] md:w-[60%] bg-gray-800 p-4 rounded shadow-lg text-sm font-mono">
        <h2 className="text-lg mb-2 text-green-400">Pseudo-code:</h2>
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
