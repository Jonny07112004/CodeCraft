import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QueueItem {
  value: number;
  priority: number;
}

const PriorityQueueVisualizer: React.FC = () => {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [priorityValue, setPriorityValue] = useState("");
  const [algorithmSteps, setAlgorithmSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(-1);

  // Enqueue operation
  const enqueue = () => {
    const value = parseInt(inputValue);
    const priority = parseInt(priorityValue);

    if (!isNaN(value) && !isNaN(priority)) {
      const steps = [
        `Step 1: Create a new item with value ${value} and priority ${priority}.`,
        `Step 2: Add the new item to the queue.`,
        `Step 3: Sort the queue based on priority.`,
        `enqueue(${value}, ${priority}): Item added to the queue.`
      ];
      setAlgorithmSteps(steps);
      setCurrentStep(0);

      setTimeout(() => {
        setCurrentStep(1);
        const updatedQueue = [...queue, { value, priority }];
        setTimeout(() => {
          setCurrentStep(2);
          updatedQueue.sort((a, b) => a.priority - b.priority);
          setQueue(updatedQueue);
          setTimeout(() => {
            setCurrentStep(3);
            setInputValue("");
            setPriorityValue("");
          }, 1000);
        }, 1000);
      }, 1000);
    }
  };

  // Dequeue operation
  const dequeue = () => {
    if (queue.length > 0) {
      const removedItem = queue[0]; // The element that will be removed
      const steps = [
        `Step 1: Check if the queue is not empty.`,
        `Step 2: Remove the highest priority item from the queue.`,
        `Step 3: Update the queue.`,
        `dequeue(): Item { value: ${removedItem.value}, priority: ${removedItem.priority} } removed from the queue.`
      ];
      setAlgorithmSteps(steps);
      setCurrentStep(0);

      setTimeout(() => {
        setCurrentStep(1);
        setTimeout(() => {
          setCurrentStep(2);
          setQueue(queue.slice(1));
          setTimeout(() => {
            setCurrentStep(3);
          }, 1000);
        }, 1000);
      }, 1000);
    }
  };

  // Peek operation
  const peek = () => {
    if (queue.length > 0) {
      const topItem = queue[0]; // The highest priority element
      const steps = [
        `Step 1: Check if the queue is not empty.`,
        `Step 2: Retrieve the highest priority item from the queue.`,
        `peek(): Highest priority item is { value: ${topItem.value}, priority: ${topItem.priority} }.`
      ];
      setAlgorithmSteps(steps);
      setCurrentStep(0);

      setTimeout(() => {
        setCurrentStep(1);
        setTimeout(() => {
          setCurrentStep(2);
        }, 1000);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-4">Priority Queue Visualization</h1>

      {/* Queue Display */}
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Queue</h2>
        <div className="flex space-x-2 border-2 border-gray-600 rounded-lg p-4">
          <AnimatePresence>
            {queue.map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-16 h-16 bg-blue-500 flex flex-col items-center justify-center rounded-lg shadow-md"
              >
                <span className="text-lg font-bold">{item.value}</span>
                <span className="text-sm">P: {item.priority}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Input and Buttons */}
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Controls</h2>
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
            placeholder="Enter a number"
          />
          <input
            type="number"
            value={priorityValue}
            onChange={(e) => setPriorityValue(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
            placeholder="Enter priority"
          />
          <button onClick={enqueue} className="px-6 py-2 bg-green-500 rounded-lg">
            Enqueue
          </button>
          <button onClick={dequeue} className="px-6 py-2 bg-red-500 rounded-lg">
            Dequeue
          </button>
          <button onClick={peek} className="px-6 py-2 bg-yellow-500 rounded-lg">
            Peek
          </button>
        </div>
      </div>

      {/* Algorithm Code Display */}
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Algorithm Steps</h2>
        <pre className="p-4 bg-gray-700 rounded-lg text-gray-300 font-mono whitespace-pre-wrap">
          {algorithmSteps.map((step, index) => (
            <div key={index} className={currentStep === index ? "text-yellow-300" : ""}>
              {step}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
};

export default PriorityQueueVisualizer;
