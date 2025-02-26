import React, { useState } from "react";
import { motion } from "framer-motion";

const LinkedListVisualizerC = () => {
  const [nodes, setNodes] = useState<number[]>([]);
  const [pseudoCodeSteps, setPseudoCodeSteps] = useState<string[]>([]);
  const [highlightedStep, setHighlightedStep] = useState<number | null>(null);
  const [tempIndex, setTempIndex] = useState<number | null>(null);
  const [listType, setListType] = useState<"singly" | "doubly" | "circular">("singly");

  // Function to get pseudo-code for each operation
  const getPseudoCodeSteps = (operation: string, value?: number, position?: number | string) => {
    switch (operation) {
      case "insert-start":
        return listType === "doubly"
          ? [
              `newNode = createNode(${value})`,
              `newNode.next = head`,
              `newNode.prev = NULL`,
              `if head != NULL: head.prev = newNode`,
              `head = newNode`
            ]
          : listType === "circular"
          ? [
              `newNode = createNode(${value})`,
              `newNode.next = head`,
              `if head != NULL:`,
              `  temp = head`,
              `  while temp.next != head: temp = temp.next`,
              `  temp.next = newNode`,
              `  newNode.next = head`,
              `head = newNode`
            ]
          : [
              `newNode = createNode(${value})`,
              `newNode.next = head`,
              `head = newNode`
            ];
      case "insert-end":
        return listType === "doubly"
          ? [
              `newNode = createNode(${value})`,
              `if head is NULL: head = newNode`,
              `else: temp = head`,
              `while temp.next != NULL: temp = temp.next`,
              `temp.next = newNode`,
              `newNode.prev = temp`
            ]
          : listType === "circular"
          ? [
              `newNode = createNode(${value})`,
              `if head is NULL:`,
              `  head = newNode`,
              `  newNode.next = newNode`,
              `else:`,
              `  temp = head`,
              `  while temp.next != head: temp = temp.next`,
              `  temp.next = newNode`,
              `  newNode.next = head`
            ]
          : [
              `newNode = createNode(${value})`,
              `if head is NULL: head = newNode`,
              `else: temp = head`,
              `while temp.next != NULL: temp = temp.next`,
              `temp.next = newNode`
            ];
      case "insert-index":
        return listType === "doubly"
          ? [
              `newNode = createNode(${value})`,
              `temp = head`,
              `for i = 0 to ${(position as number) - 1}: temp = temp.next`,
              `newNode.next = temp.next`,
              `newNode.prev = temp`,
              `if temp.next != NULL: temp.next.prev = newNode`,
              `temp.next = newNode`
            ]
          : listType === "circular"
          ? [
              `newNode = createNode(${value})`,
              `temp = head`,
              `for i = 0 to ${(position as number) - 1}: temp = temp.next`,
              `newNode.next = temp.next`,
              `temp.next = newNode`
            ]
          : [
              `newNode = createNode(${value})`,
              `temp = head`,
              `for i = 0 to ${(position as number) - 1}: temp = temp.next`,
              `newNode.next = temp.next`,
              `temp.next = newNode`
            ];
      case "delete-start":
        return listType === "doubly"
          ? [
              `if head == NULL: return`,
              `head = head.next`,
              `if head != NULL: head.prev = NULL`
            ]
          : listType === "circular"
          ? [
              `if head == NULL: return`,
              `if head.next == head: head = NULL`,
              `else:`,
              `  temp = head`,
              `  while temp.next != head: temp = temp.next`,
              `  temp.next = head.next`,
              `  head = head.next`
            ]
          : [
              `if head == NULL: return`,
              `head = head.next`
            ];
      case "delete-end":
        return listType === "doubly"
          ? [
              `if head == NULL: return`,
              `if head.next == NULL: head = NULL`,
              `else: temp = head`,
              `while temp.next.next != NULL: temp = temp.next`,
              `temp.next = NULL`
            ]
          : listType === "circular"
          ? [
              `if head == NULL: return`,
              `if head.next == head: head = NULL`,
              `else:`,
              `  temp = head`,
              `  while temp.next.next != head: temp = temp.next`,
              `  temp.next = head`
            ]
          : [
              `if head == NULL: return`,
              `if head.next == NULL: head = NULL`,
              `else: temp = head`,
              `while temp.next.next != NULL: temp = temp.next`,
              `temp.next = NULL`
            ];
      case "delete-index":
        return listType === "doubly"
          ? [
              `temp = head`,
              `for i = 0 to ${position as number- 1}: temp = temp.next`,
              `temp.next = temp.next.next`,
              `if temp.next != NULL: temp.next.prev = temp`
            ]
          : listType === "circular"
          ? [
              `temp = head`,
              `for i = 0 to ${position as number- 1}: temp = temp.next`,
              `temp.next = temp.next.next`
            ]
          : [
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

      {/* List Type Selector */}
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        <button
          className={`px-4 py-2 ${listType === "singly" ? "bg-green-500" : "bg-gray-500"} rounded`}
          onClick={() => setListType("singly")}
        >
          Singly Linked List
        </button>
        <button
          className={`px-4 py-2 ${listType === "doubly" ? "bg-blue-500" : "bg-gray-500"} rounded`}
          onClick={() => setListType("doubly")}
        >
          Doubly Linked List
        </button>
        <button
          className={`px-4 py-2 ${listType === "circular" ? "bg-purple-500" : "bg-gray-500"} rounded`}
          onClick={() => setListType("circular")}
        >
          Circular Linked List
        </button>
      </div>

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
      <div className="border-2 border-gray-400 rounded p-4 w-full flex items-center justify-start gap-8 overflow-x-auto">
        {nodes.length === 0 ? (
          <p className="text-gray-400">No nodes in the linked list.</p>
        ) : (
          nodes.map((value, index) => (
            <div key={index} className="flex items-center space-x-4 relative">
              <motion.div
                className={`w-20 h-20 flex flex-col items-center justify-center ${
                  tempIndex === index ? "bg-red-500" : "bg-blue-700"
                } text-white rounded shadow-md p-2`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <div className="text-lg font-bold">{value}</div>
                <div className="text-xs mt-1 text-gray-300">Data</div>
              </motion.div>
              {/* Arrows for connections */}
              {listType === "doubly" && (
                <>
                  <div className="w-4 h-4 border-l border-t border-white transform rotate-45"></div>
                  <div className="w-4 h-4 border-r border-t border-white transform rotate-45"></div>
                </>
              )}
              {listType === "singly" && index !== nodes.length - 1 && (
                <div className="w-4 h-4 border-r border-t border-white transform rotate-45"></div>
              )}
              {listType === "circular" && (
                <>
                  <div className="w-4 h-4 border-r border-t border-white transform rotate-45"></div>
                  {index === nodes.length - 1 && (
                    <div className="absolute left-[-20px] bottom-[-20px] w-4 h-4 border-l border-b border-white transform rotate-[135deg]"></div>
                  )}
                </>
              )}
              <div className="text-xs mt-1 text-gray-400">
                Index: {index} {tempIndex === index ? `(temp)` : ""}
              </div>
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

export default LinkedListVisualizerC;
