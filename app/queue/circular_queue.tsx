import React, { useState } from "react";
import { motion } from "framer-motion";

const MAX_QUEUE_SIZE = 10;

const CirQueueVisualizer: React.FC = () => {
  const [queue, setQueue] = useState<(number | null)[]>(Array(MAX_QUEUE_SIZE).fill(null));
  const [front, setFront] = useState<number>(-1);
  const [rear, setRear] = useState<number>(-1);
  const [size, setSize] = useState<number>(0);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [algorithmSteps, setAlgorithmSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(-1);

  // ** Enqueue Operation **
  const enqueueCircular = () => {
    const number = parseInt(inputValue);
    if (isNaN(number)) {
      setError("Invalid input! Enter a number.");
      return;
    }
    setError("");

    if (size === MAX_QUEUE_SIZE) {
      setError("Queue is full!");
      return;
    }

    const steps = [
      "Step 1: Check if the queue is full.",
      "Step 2: Calculate the new rear position.",
      `Step 3: Insert ${number} at the new rear position.`,
      "Step 4: Update the size of the queue.",
      `enqueue(${number}): Insert at the new rear position.`
    ];
    setAlgorithmSteps(steps);
    setCurrentStep(0);

    setTimeout(() => {
      setCurrentStep(1);
      let newRear = (rear + 1) % MAX_QUEUE_SIZE;
      setTimeout(() => {
        setCurrentStep(2);
        let newQueue = [...queue];
        newQueue[newRear] = number;
        setQueue(newQueue);
        setRear(newRear);
        setSize(size + 1);
        if (front === -1) setFront(0); // Set front if first element
        setTimeout(() => {
          setCurrentStep(3);
          setTimeout(() => {
            setCurrentStep(4);
            setInputValue("");
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  // ** Dequeue Operation **
  const dequeueCircular = () => {
    if (size === 0) {
      setError("Queue is empty!");
      return;
    }

    const steps = [
      "Step 1: Check if the queue is empty.",
      "Step 2: Remove the element at the front position.",
      "Step 3: Update the front position.",
      "Step 4: Update the size of the queue.",
      `dequeue(): Remove element from the front position.`
    ];
    setAlgorithmSteps(steps);
    setCurrentStep(0);

    setTimeout(() => {
      setCurrentStep(1);
      let newQueue = [...queue];
      newQueue[front] = null;
      let newFront = (front + 1) % MAX_QUEUE_SIZE;
      setTimeout(() => {
        setCurrentStep(2);
        setFront(size === 1 ? -1 : newFront);
        setRear(size === 1 ? -1 : rear);
        setSize(size - 1);
        setQueue(newQueue);
        setTimeout(() => {
          setCurrentStep(3);
          setTimeout(() => {
            setCurrentStep(4);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  const getFront = () => (size > 0 ? queue[front] : "None");
  const getRear = () => (size > 0 ? queue[rear] : "None");

  // ** Positioning elements in a circular pattern **
  const getCircularPosition = (index: number) => {
    const angle = (index / MAX_QUEUE_SIZE) * 2 * Math.PI; // Convert to radians
    const radius = 120; // Radius of the circular queue
    return {
      left: `calc(50% + ${Math.cos(angle) * radius}px - 1.5rem)`,
      top: `calc(50% + ${Math.sin(angle) * radius}px - 1.5rem)`,
    };
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-8">Circular Queue Visualization</h1>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Circular Queue Representation */}
        <div className="relative w-80 h-80 flex items-center justify-center">
          <div className="absolute w-80 h-80 border-4 border-gray-500 rounded-full"></div>
          {queue.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`absolute w-12 h-12 flex items-center justify-center rounded-full text-white font-bold ${
                item !== null ? "bg-blue-500" : "bg-gray-700"
              }`}
              style={getCircularPosition(index)}
            >
              {item !== null ? item : "-"}
              {index === front && <span className="absolute -top-6 text-yellow-300 text-xs">Front</span>}
              {index === rear && <span className="absolute -bottom-6 text-green-300 text-xs">Rear</span>}
            </motion.div>
          ))}
        </div>

        {/* Controls */}
        <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Controls</h2>
          <div className="flex flex-col space-y-4">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              placeholder="Enter a number"
            />
            <button
              onClick={enqueueCircular}
              className="px-6 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition disabled:bg-gray-400"
              disabled={size >= MAX_QUEUE_SIZE}
            >
              Enqueue
            </button>
            <button
              onClick={dequeueCircular}
              className="px-6 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition disabled:bg-gray-400"
              disabled={size === 0}
            >
              Dequeue
            </button>
          </div>
          {error && <div className="mt-4 text-red-400">{error}</div>}
        </div>

        {/* Front & Rear Information */}
        <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Front & Rear</h2>
          <div className="flex space-x-4">
            <div className="px-6 py-2 bg-yellow-400 text-black rounded-lg">Front: {getFront()}</div>
            <div className="px-6 py-2 bg-green-400 text-black rounded-lg">Rear: {getRear()}</div>
          </div>
        </div>

        {/* Algorithm Execution */}
        <div className="bg-gray-800 rounded-lg p-8 shadow-lg col-span-1 md:col-span-2 lg:col-span-3">
          <h2 className="text-2xl font-semibold mb-6">Live Algorithm Execution</h2>
          <pre className="bg-gray-700 text-white p-4 rounded-lg font-mono whitespace-pre-wrap">
            {algorithmSteps.map((step, index) => (
              <div key={index} className={currentStep === index ? "text-yellow-300" : ""}>
                {step}
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default CirQueueVisualizer;
