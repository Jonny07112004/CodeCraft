'use client';
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Link from 'next/link';

const MainApp: React.FC = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const algorithms = [
    {
      id: 1,
      title: "Breadth First Search (BFS)",
      icon: "fa-solid fa-layer-group",
      description: "Graph traversal algorithm that explores all vertices at the present depth before moving on to vertices at the next depth level.",
      imageUrl: "https://public.readdy.ai/ai/img_res/f3a5d6437a2dc69ba2ffade316626bc5.jpg",
      color: "#00FF9D",
      link:"/bfs"
    },
    {
      id: 2,
      title: "Depth First Search (DFS)",
      icon: "fa-solid fa-arrow-down-long",
      description: "Graph traversal algorithm that explores as far as possible along each branch before backtracking, ideal for maze solving and path finding.",
      imageUrl: "https://public.readdy.ai/ai/img_res/701eb0d11d8f8331f6503e845ae58ec5.jpg",
      color: "#00FF9D",
      link:"/bfs"
    },
    {
      id: 3,
      title: "A* Search Algorithm",
      icon: "fa-solid fa-star",
      description: "Efficient pathfinding algorithm that combines the benefits of Dijkstra's algorithm and Best-First Search using heuristic functions.",
      imageUrl: "https://public.readdy.ai/ai/img_res/fd2b92e0540f2fd656dc57bfd524e012.jpg",
      color: "#00FF9D",
      link:"/bfs"
    },
    {
      id: 4,
      title: "Min-Max Algorithm",
      icon: "fa-solid fa-chess",
      description: "Decision-making algorithm used in two-player games, which minimizes the possible loss for a worst case scenario while maximizing the potential gain.",
      imageUrl: "https://public.readdy.ai/ai/img_res/5b542319c962c1fab8a0459560aa1b4b.jpg",
      color: "#00FF9D",
      link:"/bfs"
    },
    {
      id: 5,
      title: "BFS vs DFS Comparison",
      icon: "fa-solid fa-code-compare",
      description: "Comparative analysis of Breadth-First Search and Depth-First Search algorithms, highlighting their strengths, weaknesses, and optimal use cases in different scenarios.",
      imageUrl: "https://public.readdy.ai/ai/img_res/c6784d7d09a651e0007d08f24eb5fb78.jpg",
      color: "#00FF9D",
      link:"/bfs"
    },
    {
      id: 6,
      title: "A* vs Dijkstra Comparison",
      icon: "fa-solid fa-code-compare",
      description: "Detailed comparison between A* and Dijkstra's algorithms, analyzing their performance, heuristic functions, and efficiency in pathfinding applications.",
      imageUrl: "https://public.readdy.ai/ai/img_res/e5394f4cf71df1c3cffa8f6614735870.jpg",
      color: "#00FF9D",
      link:"/bfs"
    },
    {
      id: 7,
      title: "N-Queens Problem",
      icon: "fa-solid fa-chess-queen",
      description: "Classic chess puzzle that involves placing N queens on an N×N chessboard so that no two queens threaten each other by sharing the same row, column, or diagonal.",
      imageUrl: "https://public.readdy.ai/ai/img_res/d2bfd1a9b4fa9a7f5ec2bd80efa82f71.jpg",
      color: "#00FF9D",
      link:"/bfs"
    },
    {
      id: 8,
      title: "Missionaries and Cannibals",
      icon: "fa-solid fa-people-group",
      description: "Classic river crossing puzzle where three missionaries and three cannibals must cross a river using a boat that can carry at most two people, ensuring missionaries are never outnumbered.",
      imageUrl: "https://public.readdy.ai/ai/img_res/a75b746030b4c0ac7b6a1f81362793db.jpg",
      color: "#00FF9D",
      link:"/bfs"
    },
    {
      id: 9,
      title: "Water Jugs Problem",
      icon: "fa-solid fa-glass-water",
      description: "Classic problem solving puzzle involving measuring specific amounts of water using two jugs of different capacities through filling, emptying, and transferring operations.",
      imageUrl: "https://public.readdy.ai/ai/img_res/e956c7fb48e3881270d42ed907a8ec4d.jpg",
      color: "#9D00FF",
      link:"/bfs"
    },
    {
      id: 10,
      title: "Traveling Salesman Problem",
      icon: "fa-solid fa-route",
      description: "Classic optimization problem that seeks to find the shortest possible route visiting each city exactly once and returning to the origin city.",
      imageUrl: "https://public.readdy.ai/ai/img_res/7b2acd4fd07dbbb15d4843636f19874d.jpg",
      color: "#00FF9D",
      link:"/bfs"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0A0A1A] to-black">
      <div className="h-[600px] relative overflow-hidden mb-16">
        <img
          src="https://public.readdy.ai/ai/img_res/8434016cceb089cdd5549491f7132ded.jpg"
          className={`w-full h-full object-cover transition-transform duration-1000 ${isLoaded ? 'scale-105' : 'scale-100'}`}
          alt="AI Hero"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/95">
          <div className="max-w-[1440px] mx-auto px-6 h-full flex flex-col justify-center items-center">
            <h1
              className={`text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00FF9D] via-[#00A3FF] to-[#FF00E5] mb-6 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} tracking-tight leading-none`}
              style={{
                textShadow: '0 0 20px rgba(0, 255, 157, 0.5)',
                transform: 'perspective(1000px) rotateX(10deg)',
                animation: 'float 6s ease-in-out infinite, shimmer 3s linear infinite',
                backgroundSize: '200% auto'
              }}
            >
              AI Algorithms
            </h1>
            <p className={`text-gray-300 text-xl max-w-2xl text-center transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{
                animation: 'pulse 4s ease-in-out infinite'
              }}>
              Explore fundamental computer science algorithms with interactive visualizations
            </p>
          </div>
        </div>
      </div>
      <div
        className="max-w-[1440px] mx-auto px-6 pb-24 relative"
        style={{
          perspective: '4000px',
          transformStyle: 'preserve-3d',
          animation: 'float-section 8s ease-in-out infinite',
          filter: 'contrast(1.1) saturate(1.2)',
          imageRendering: 'crisp-edges'
        }}
      >
        <h2
          className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00FF9D] via-[#00A3FF] to-[#FF00E5] mb-4 text-center transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          style={{
            transform: 'perspective(1000px) rotateX(10deg)',
            animation: 'float3d 6s ease-in-out infinite',
            textShadow: '0 0 20px rgba(0, 255, 157, 0.3)'
          }}
        >
          AI Algorithm Collection
        </h2>
        <p className={`text-gray-400 text-lg mb-12 text-center transform transition-all duration-1000 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Explore our comprehensive suite of advanced artificial intelligence algorithms
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[{
            id: 1,
            title: "BFS Modified",
            icon: "fa-solid fa-diagram-project",
            description: "An enhanced version of Breadth-First Search algorithm with advanced visualization capabilities. Features real-time node exploration, level-wise traversal tracking, and interactive path highlighting.",
            imageUrl: "https://public.readdy.ai/ai/img_res/1a812745cf0c0020976b67952f9f9126.jpg",
            color: "#00FF9D",
            features: [
              "Real-time node exploration",
              "Level-wise traversal tracking",
              "Interactive path highlighting",
              "Performance metrics display",
              "Custom graph input support",
              "Animation speed control",
              "Step-by-step execution",
              "Visual state management"
            ]
          }, ...algorithms.slice(1)].map((algorithm, index) => (
            <Card
              key={algorithm.id}
              className={`relative group bg-[#0A0A0A]/80 border-[#1A1A1A] hover:border-[${algorithm.color}] transition-all duration-500 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,157,0.2)] backdrop-blur-xl card-3d ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{
                transitionDelay: `${index * 100}ms`,
                transform: `perspective(1000px) rotateX(0deg)`,
                animation: `float-card-${index} 6s ease-in-out infinite`,
                animationDelay: `${index * 0.2}s`
              }}
            >
              <div className="p-8 flex flex-col items-center text-center">
                <div className={`w-20 h-20 rounded-full bg-[#1A1A1A] flex items-center justify-center mb-6 transform transition-transform duration-500 group-hover:scale-110 relative before:content-[''] before:absolute before:w-full before:h-full before:rounded-full before:bg-[${algorithm.color}] before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-20 icon-3d after:content-[''] after:absolute after:w-full after:h-full after:rounded-full after:border-2 after:border-[${algorithm.color}] after:opacity-0 after:transition-opacity after:duration-500 group-hover:after:opacity-50 after:animate-ping`}
                  style={{
                    animation: algorithm.id === 1 ? 'bfs-icon-animation 4s ease-in-out infinite' : `float-icon-${algorithm.id} 4s ease-in-out infinite`,
                    animationDelay: '0.2s'
                  }}
                >
                  <i className={`${algorithm.icon} text-4xl text-[${algorithm.color}] transition-all duration-500 group-hover:scale-110`}></i>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4 transition-colors duration-500 group-hover:text-[#00FF9D]">
                  {algorithm.title}
                </h3>
                <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                  {algorithm.description}
                </p>
                <div className="flex gap-4 w-full">
                  <Button
                    className={`!rounded-button flex-1 bg-[#1A1A1A] hover:bg-[${algorithm.color}]/20 text-white border border-[#333] hover:border-[${algorithm.color}] whitespace-nowrap text-sm transition-all duration-500 transform hover:scale-105 ${algorithm.id === 1 ? 'animate-pulse' : ''}`}
                    onClick={() => {
                      setSelectedAlgorithm(algorithm.title);
                      if (algorithm.id === 1) {
                        const dialog = document.createElement('dialog');
                        dialog.className = 'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center';
                        dialog.innerHTML = `
<div class="bg-[#0A0A0A] p-8 rounded-xl border border-[#1A1A1A] max-w-2xl w-full">
<h3 class="text-2xl font-bold text-[#00FF9D] mb-6">BFS Visualization Steps</h3>
<div class="space-y-4">
${['Start at root node', 'Visit all neighbors at current level', 'Queue unvisited neighbors', 'Move to next level', 'Repeat until all nodes visited', 'Track visited nodes', 'Build level-order traversal', 'Complete BFS traversal'].map((step, i) => `
<div class="flex items-center space-x-4 text-white">
<span class="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#00FF9D]">${i + 1}</span>
<p>${step}</p>
</div>
`).join('')}
</div>
<div class="mt-8 grid grid-cols-4 gap-4 bg-[#1A1A1A] p-4 rounded-xl">
${Array(16).fill('').map((_, i) => `
<div class="aspect-square bg-[#2A2A2A] rounded-lg flex items-center justify-center text-[#00FF9D] text-xl font-bold">
${i + 1}
</div>`).join('')}
</div>
<button class="mt-8 px-6 py-2 bg-[#1A1A1A] text-white rounded-full hover:bg-[#00FF9D]/20 border border-[#333] hover:border-[#00FF9D] transition-all"
onclick="this.closest('dialog').remove()">Close</button>
</div>
`;
                        document.body.appendChild(dialog);
                        dialog.showModal();
                      } else if (algorithm.id === 10) {
                        console.log("Starting BFS visualization");
                      }
                    }}
                  >
                    {algorithm.id === 1 ? 'Visualize BFS' : 'Access'}
                    {/*<Link  key={index} href={algorithm.link}></Link>*/}
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="!rounded-button flex-1 bg-transparent border-[#333] text-[#666] hover:bg-[#1A1A1A] hover:text-white whitespace-nowrap text-sm transition-all duration-500 transform hover:scale-105"
                      >
                        Info
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#0A0A0A] text-white border-[#1A1A1A] backdrop-blur-xl">
                      <DialogHeader>
                        <DialogTitle className={`text-2xl font-bold text-[${algorithm.color}]`}>
                          {algorithm.title}
                        </DialogTitle>
                        <DialogDescription className="text-gray-400 mt-4">
                          {algorithm.description}
                          {algorithm.id === 1 && (
                            <div className="mt-4 space-y-2">
                              <p className="text-[#00FF9D]">BFS Properties:</p>
                              <ul className="list-disc list-inside space-y-1">
                                <li>Complete algorithm</li>
                                <li>Optimal for unweighted graphs</li>
                                <li>Time complexity: O(V + E)</li>
                                <li>Space complexity: O(V)</li>
                                <li>Uses queue data structure</li>
                              </ul>
                            </div>
                          )}
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainApp;
