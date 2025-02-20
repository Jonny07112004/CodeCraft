import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MAX_QUEUE_SIZE = 10;

const QueueVisualizer: React.FC = () => {
  const [queue, setQueue] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [pseudoCode, setPseudoCode] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [error, setError] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Enqueue operation
  const enqueue = () => {
    if (isProcessing) return;
    setIsProcessing(true);

    const number = parseInt(inputValue);
    if (!isNaN(number)) {
      if (queue.length < MAX_QUEUE_SIZE) {
        const steps = [
          "Step 1: Check if the queue is full.",
          "Step 2: Add the element to the rear of the queue.",
          "Step 3: Update the queue size.",
          `Enqueue: Add element ${number} at the rear.`
        ];
        setPseudoCode(steps);
        setCurrentStep(0);

        setTimeout(() => {
          setCurrentStep(1);
          setQueue([...queue, number]);
          setTimeout(() => {
            setCurrentStep(2);
            setTimeout(() => {
              setCurrentStep(3);
              setInputValue("");
              setError("");
              setIsProcessing(false);
            }, 1000);
          }, 1000);
        }, 1000);
      } else {
        setError("Queue is full!");
        setIsProcessing(false);
      }
    } else {
      setError("Invalid input! Please enter a number.");
      setIsProcessing(false);
    }
  };

  // Dequeue operation
  const dequeue = () => {
    if (isProcessing) return;
    setIsProcessing(true);

    if (queue.length > 0) {
      const steps = [
        "Step 1: Check if the queue is empty.",
        "Step 2: Remove the element from the front of the queue.",
        "Step 3: Update the queue size.",
        "Dequeue: Remove element from the front."
      ];
      setPseudoCode(steps);
      setCurrentStep(0);

      setTimeout(() => {
        setCurrentStep(1);
        setTimeout(() => {
          setCurrentStep(2);
          setQueue(queue.slice(1)); // Remove the front element after animation
          setTimeout(() => {
            setCurrentStep(3);
            setError("");
            setIsProcessing(false);
          }, 1000);
        }, 1000);
      }, 1000);
    } else {
      setError("Queue is empty!");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-4">Queue Visualization</h1>
      <p className="text-lg text-gray-400 mb-8">
        Visualize how a queue works with interactive animations.
      </p>

      {/* Queue Display */}
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Queue</h2>
        <div className="flex space-x-2 border-2 border-gray-600 rounded-lg p-4 relative">
          {/* Front Label */}
          {queue.length > 0 && (
            <div className="absolute -top-6 left-0 text-sm text-yellow-300 font-semibold">
              Front
            </div>
          )}

          {/* Queue Elements */}
          <AnimatePresence>
            {queue.map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-14 h-14 bg-blue-500 text-white flex items-center justify-center rounded-lg shadow-md relative"
              >
                {item}
                {/* Highlight Front Element */}
                {index === 0 && (
                  <div className="absolute -bottom-6 text-yellow-300 font-semibold">
                    Front
                  </div>
                )}
                {/* Highlight Rear Element */}
                {index === queue.length - 1 && (
                  <div className="absolute -bottom-6 text-green-300 font-semibold">
                    Rear
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Rear Label */}
          {queue.length > 0 && (
            <div className="absolute -top-6 right-0 text-sm text-green-300 font-semibold">
              Rear
            </div>
          )}
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
            className="flex-1 px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a number"
            disabled={isProcessing}
          />
          <button
            onClick={enqueue}
            className="px-6 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition-all disabled:bg-gray-500"
            disabled={isProcessing || queue.length >= MAX_QUEUE_SIZE}
          >
            Enqueue
          </button>
          <button
            onClick={dequeue}
            className="px-6 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition-all disabled:bg-gray-500"
            disabled={isProcessing || queue.length === 0}
          >
            Dequeue
          </button>
        </div>
        {error && <div className="mt-4 text-red-400 text-sm">{error}</div>}
      </div>

      {/* Pseudo-code Display */}
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Pseudo-code</h2>
        <div className="p-4 bg-gray-700 rounded-lg">
          <code className="text-gray-300 font-mono whitespace-pre-wrap">
            {pseudoCode.map((step, index) => (
              <div key={index} className={currentStep === index ? "text-yellow-300" : ""}>
                {step}
              </div>
            ))}
          </code>
        </div>
      </div>
    </div>
  );
};

export default QueueVisualizer;
