// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface Disk {
  size: number;
  color: string;
}
const App: React.FC = () => {
  const [moves, setMoves] = useState<number>(0);
  const [selectedRod, setSelectedRod] = useState<number | null>(null);
  const [towers, setTowers] = useState<Disk[][]>([]);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [diskCount, setDiskCount] = useState<number>(5);
  const colors = [
    'bg-emerald-400',
    'bg-sky-400',
    'bg-amber-400',
    'bg-indigo-400',
    'bg-rose-400',
    'bg-teal-400',
    'bg-purple-400',
  ];
  const initializeTowers = () => {
    const initialTowers: Disk[][] = [[], [], []];
    for (let i = 1; i <= diskCount; i++) {
      initialTowers[0].push({
        size: i,
        color: colors[(i - 1) % colors.length],
      });
    }
    setTowers(initialTowers);
    setMoves(0);
    setGameWon(false);
    setSelectedRod(null);
  };
  useEffect(() => {
    initializeTowers();
  }, []);
  const handleRodClick = (rodIndex: number) => {
    if (selectedRod === null) {
      if (towers[rodIndex].length === 0) return;
      setSelectedRod(rodIndex);
    } else {
      if (selectedRod === rodIndex) {
        setSelectedRod(null);
        return;
      }
      const sourceRod = towers[selectedRod];
      const targetRod = towers[rodIndex];
      if (sourceRod.length === 0) {
        setSelectedRod(null);
        return;
      }
      const diskToMove = sourceRod[0];
      const targetTopDisk = targetRod[0];
      // Check if the move is valid (smaller disk on larger disk)
      if (targetRod.length > 0 && diskToMove.size > targetTopDisk.size) {
        setShowError(true);
        setTimeout(() => setShowError(false), 2000);
        setSelectedRod(null);
        return;
      }
      const newTowers = towers.map((rod, index) => {
        if (index === selectedRod) {
          return rod.slice(1);
        }
        if (index === rodIndex) {
          return [diskToMove, ...rod];
        }
        return rod;
      });
      setTowers(newTowers);
      setMoves(moves + 1);
      setSelectedRod(null);
      // Check win condition - all disks moved to the last rod
      if (rodIndex === 2 && newTowers[2].length === diskCount) {
        setGameWon(true);
      }
    }
  };
  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Tower of Hanoi</h1>
          <p className="text-lg text-gray-300">
            Move all disks from the first rod to the last rod. You can't place a larger disk on top of a smaller one.
          </p>
          {gameWon && (
            <div className="mt-4 p-4 bg-emerald-900/50 text-emerald-100 rounded-lg border border-emerald-800/50">
              Congratulations! You solved the puzzle in {moves} moves!
            </div>
          )}
          {showError && (
            <div className="mt-4 p-4 bg-rose-900/50 text-rose-100 rounded-lg border border-rose-800/50">
              Invalid move! You can't place a larger disk on a smaller one.
            </div>
          )}
        </div>
        <div className="flex justify-between items-center mb-8">
          <div className="text-xl font-semibold text-white">Moves: {moves}</div>
          <div className="flex items-center gap-4">
            <Select
              value={diskCount.toString()}
              onValueChange={(value) => {
                setDiskCount(Number(value));
                setTimeout(() => initializeTowers(), 0);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select disk count" />
              </SelectTrigger>
              <SelectContent>
                {[3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} Disks
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={initializeTowers} className="!rounded-button">
              Reset Game
            </Button>
          </div>
        </div>
        <Alert className="mb-4 bg-sky-950/50 border-sky-800/50 text-sky-100">
          <AlertTitle>Stack Operations</AlertTitle>
          <AlertDescription>
            Total operations performed: {moves}
          </AlertDescription>
        </Alert>
        <Card className="p-8 bg-slate-900/50 shadow-lg mb-8 border-slate-800">
          <div className="flex justify-around items-end h-[400px] relative">
            {towers.map((rod, rodIndex) => (
              <div
                key={rodIndex}
                className={`flex flex-col items-center cursor-pointer ${selectedRod === rodIndex ? 'opacity-75' : ''
                  }`}
                onClick={() => handleRodClick(rodIndex)}
              >
                <div className="relative w-4 h-[300px] bg-slate-700 rounded-t-lg">
                  <div className="absolute bottom-0 w-full">
                    {rod.map((disk, diskIndex) => (
                      <div
                        key={diskIndex}
                        className={`h-12 rounded-lg ${disk.color} transition-all duration-300`}
                        style={{
                          width: `${disk.size * 40}px`,
                          marginLeft: `-${(disk.size * 40 - 16) / 2}px`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div className="w-20 h-4 bg-slate-800 rounded-lg" />
                <div className="mt-4 text-xl font-semibold text-white">Stack {rodIndex + 1}</div>
              </div>
            ))}
          </div>
        </Card>
        <Collapsible className="mb-8">
          <CollapsibleTrigger className="w-full">
            <Button variant="outline" className="w-full !rounded-button">
              How to Play
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 p-4 bg-slate-900/50 rounded-lg shadow text-slate-100 border border-slate-800">
            <h3 className="text-xl font-semibold mb-4 text-white">Rules:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Only one disk can be moved at a time</li>
              <li>Each move consists of taking the upper disk from one of the rods and placing it on top of another rod</li>
              <li>No disk may be placed on top of a smaller disk</li>
              <li>The goal is to move all disks from the first rod to the last rod</li>
              <li>Click on a rod to select it, then click on another rod to move the top disk</li>
            </ul>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};
export default App
