import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const StackVisualizer = () => {
  const [stack, setStack] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [pseudoCodeSteps, setPseudoCodeSteps] = useState<string[]>([]);
  const [highlightedStep, setHighlightedStep] = useState<number | null>(null);

  // Algorithm steps for operations
  const getAlgorithmSteps = (operation: string, value?: number) => {
    switch (operation) {
      case "push":
        return [
          "Algorithm Push(value):",
          "   1. Create a new node with given value.",
          "   2. Set newNode.next to top.",
          "   3. Update top to newNode."
        ];
      case "pop":
        return [
          "Algorithm Pop():",
          "   1. If stack is empty, return NULL.",
          "   2. Store top element in temp variable.",
          "   3. Update top to top.next.",
          "   4. Return temp."
        ];
      case "peek":
        return [
          "Algorithm Peek():",
          "   1. If stack is empty, return NULL.",
          "   2. Return top element."
        ];
      case "size":
        return [
          "Algorithm Size():",
          "   1. Initialize count = 0.",
          "   2. Traverse stack while node != NULL.",
          "   3. Increment count.",
          "   4. Return count."
        ];
      case "isEmpty":
        return [
          "Algorithm isEmpty():",
          "   1. If top == NULL, return true.",
          "   2. Else, return false."
        ];
      default:
        return [];
    }
  };

  // Step-by-step highlighting
  const highlightSteps = async (steps: string[], callback: () => void) => {
    for (let i = 0; i < steps.length; i++) {
      setHighlightedStep(i);
      await new Promise((resolve) => setTimeout(resolve, 600));
    }
    callback();
    setHighlightedStep(null);
  };

  // Push Operation
  const pushElement = () => {
    const number = parseInt(inputValue);
    if (!isNaN(number)) {
      const steps = getAlgorithmSteps("push", number);
      setPseudoCodeSteps(steps);
      highlightSteps(steps, () => {
        setStack([...stack, number]);
        setInputValue("");
      });
    }
  };

  // Pop Operation
  const popElement = () => {
    if (stack.length > 0) {
      const steps = getAlgorithmSteps("pop");
      setPseudoCodeSteps(steps);
      highlightSteps(steps, () => {
        setStack(stack.slice(0, -1));
      });
    }
  };

  // Peek Operation
  const peekElement = () => {
    if (stack.length > 0) {
      alert(`Top Element: ${stack[stack.length - 1]}`);
    } else {
      alert("Stack is empty!");
    }
  };

  // Size of Stack
  const sizeOfStack = () => {
    alert(`Stack Size: ${stack.length}`);
  };

  // Check if Stack is Empty
  const isStackEmpty = () => {
    alert(stack.length === 0 ? "Stack is Empty" : "Stack is NOT Empty");
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">📦 Stack Visualizer</h1>

      {/* Stack Display */}
      <div className="relative w-48 h-64 border-4 border-white flex flex-col-reverse items-center p-2 overflow-hidden rounded-lg bg-gray-800">
        <AnimatePresence>
          {stack.map((item, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-32 h-10 bg-blue-500 text-white flex items-center justify-center mb-1 rounded-lg shadow-md"
            >
              {item}
            </motion.div>
          ))}
        </AnimatePresence>
        {stack.length === 0 && (
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400">
            Stack is Empty
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="px-3 py-2 border rounded text-black w-24"
          placeholder="Value"
        />
        <button className="px-4 py-2 bg-green-500 rounded" onClick={pushElement}>
          Push
        </button>
        <button className="px-4 py-2 bg-red-500 rounded" onClick={popElement} disabled={stack.length === 0}>
          Pop
        </button>
        <button className="px-4 py-2 bg-yellow-500 rounded" onClick={peekElement} disabled={stack.length === 0}>
          Peek
        </button>
        <button className="px-4 py-2 bg-purple-500 rounded" onClick={sizeOfStack}>
          Size
        </button>
        <button className="px-4 py-2 bg-gray-500 rounded" onClick={isStackEmpty}>
          isEmpty
        </button>
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

export default StackVisualizer;
