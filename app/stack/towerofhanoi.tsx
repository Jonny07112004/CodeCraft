import React, { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";

// Disk Component with animation
const AnimatedDisk = ({ position, size, color }: { position: [number, number, number]; size: number; color: string }) => {
  const { positionSpring } = useSpring({
    positionSpring: position,
    config: { mass: 1, tension: 200, friction: 20 },
  });

  return (
    <animated.mesh position={positionSpring}>
      <cylinderGeometry args={[size * 0.4, size * 0.4, 0.3, 32]} />
      <meshStandardMaterial color={color} />
    </animated.mesh>
  );
};

const TowerOfHanoi = () => {
  const [numDisks, setNumDisks] = useState(3);
  const [towers, setTowers] = useState<number[][]>([[], [], []]);
  const [steps, setSteps] = useState<string[]>([]);
  const [isSolving, setIsSolving] = useState(false);
  const [diskPositions, setDiskPositions] = useState<{ [key: number]: [number, number, number] }>({});

  // Initialize Disks
  const resetGame = () => {
    const initialTower = Array.from({ length: numDisks }, (_, i) => numDisks - i);
    setTowers([initialTower, [], []]);
    setSteps([]);
    setIsSolving(false);
  
    const newPositions: { [key: number]: [number, number, number] } = {};
    initialTower.forEach((disk, index) => {
      newPositions[disk] = [-3, -0.5 + index * 0.3, 0]; // Ensure valid positions
    });
  
    setDiskPositions(newPositions);
  };
  

  // Tower of Hanoi Recursive Solver
  const solveHanoi = (n: number, from: number, to: number, aux: number, stepsArr: string[], moveArr: any[]) => {
    if (n === 1) {
      stepsArr.push(`Move disk 1 from Rod ${from + 1} to Rod ${to + 1}`);
      moveArr.push([from, to, 1]);
      return;
    }
    solveHanoi(n - 1, from, aux, to, stepsArr, moveArr);
    stepsArr.push(`Move disk ${n} from Rod ${from + 1} to Rod ${to + 1}`);
    moveArr.push([from, to, n]);
    solveHanoi(n - 1, aux, to, from, stepsArr, moveArr);
  };

  // Animate Disk Movement
  const animateHanoi = async (moves: any[]) => {
    setIsSolving(true);
    for (const [from, to, disk] of moves) {
      await new Promise((resolve) => setTimeout(resolve, 500));

      setDiskPositions((prevPositions) => {
        if (!prevPositions[disk]) return prevPositions; // Prevent undefined access
        return {
          ...prevPositions,
          [disk]: [
            prevPositions[disk][0], // X position
            prevPositions[disk][1] + 1, // Y position (lifting up)
            prevPositions[disk][2], // Z position
          ],
        };
      });
      

      await new Promise((resolve) => setTimeout(resolve, 500));

      setDiskPositions((prevPositions) => ({
        ...prevPositions,
        [disk]: [to * 3 - 3, prevPositions[disk][1] + 1, prevPositions[disk][2]],
      }));

      await new Promise((resolve) => setTimeout(resolve, 500));

      setDiskPositions((prevPositions) => ({
        ...prevPositions,
        [disk]: [to * 3 - 3, -0.5 + towers[to].length * 0.3, prevPositions[disk][2]],
      }));

      setTowers((prevTowers) => {
        const newTowers = prevTowers.map((tower) => [...tower]);
        newTowers[from].pop();
        newTowers[to].push(disk);
        return newTowers;
      });
    }
    setIsSolving(false);
  };

  // Start the Solution
  const startSolving = () => {
    const stepsArr: string[] = [];
    const moveArr: any[] = [];
    solveHanoi(numDisks, 0, 2, 1, stepsArr, moveArr);
    setSteps(stepsArr);
    animateHanoi(moveArr);
  };

  return (
    <div className="flex flex-col items-center w-full h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl mb-4">Tower of Hanoi - 3D Visualization</h1>

      <div className="flex gap-4 mb-4">
        <input
          type="number"
          min="1"
          max="5"
          value={numDisks}
          onChange={(e) => setNumDisks(Math.min(5, Math.max(1, parseInt(e.target.value))))}
          className="px-2 py-1 text-black rounded"
        />
        <button onClick={resetGame} className="px-4 py-2 bg-blue-500 rounded">Reset</button>
        <button onClick={startSolving} disabled={isSolving} className="px-4 py-2 bg-green-500 rounded">
          Solve
        </button>
      </div>

      <div className="w-full h-[400px]">
        <Canvas>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} />
          <OrbitControls />

          {[...Array(3)].map((_, i) => (
            <mesh key={i} position={[i * 3 - 3, -1, 0]}>
              <cylinderGeometry args={[0.2, 0.2, 3, 32]} />
              <meshStandardMaterial color="red" />
            </mesh>
          ))}

          {Object.entries(diskPositions).map(([disk, position]) => (
            <AnimatedDisk key={disk} position={position as [number, number, number]} size={parseInt(disk)} color={["red", "blue", "green", "yellow", "purple"][parseInt(disk) - 1]} />
          ))}
        </Canvas>
      </div>

      <div className="mt-4 w-[80%] bg-gray-800 p-4 rounded">
        <h2 className="text-lg mb-2 text-green-400">Algorithm:</h2>
        <pre className="whitespace-pre-wrap text-gray-300">
          {`
ALGORITHM TowerOfHanoi(n, from, to, aux)
  IF n == 1 THEN
    Move disk 1 from Rod from to Rod to
  ELSE
    TowerOfHanoi(n-1, from, aux, to)
    Move disk n from Rod from to Rod to
    TowerOfHanoi(n-1, aux, to, from)
  END IF
END ALGORITHM
          `}
        </pre>
      </div>

      <div className="mt-4 w-[80%] bg-gray-700 p-4 rounded text-sm">
        <h2 className="text-lg mb-2 text-yellow-400">Steps:</h2>
        <ul>
          {steps.map((step, index) => (
            <li key={index} className="text-gray-300">
              {step}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TowerOfHanoi;
