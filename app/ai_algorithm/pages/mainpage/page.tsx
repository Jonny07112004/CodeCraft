"use client";
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const App: React.FC = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: "",
    description: "",
  });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const algorithms = [
    {
      id: 1,
      title: "BFS (Breadth-First Search)",
      description:
        "A graph traversal algorithm that explores all vertices at the present depth before moving to vertices at the next depth level.",
      icon: "fa-diagram-project",
      link: "./bfs",
      //color: "#00FF9D",
    },
    {
      id: 2,
      title: "DFS (Depth-First Search)",
      description:
        "A graph traversal algorithm that explores as far as possible along each branch before backtracking.",
      icon: "fa-solid fa-arrow-down-long",
      link: "./dfs",
      //color: "#00A3FF",
    },
    {
      id: 3,
      title: "A* (A-Star) Algorithm",
      description:
        "A pathfinding algorithm that uses heuristics to find the shortest path between nodes in a graph.",
      icon: "fa-star",
      link: "./astar",
    },
    {
      id: 4,
      title: "Comparison of BFS and DFS",
      description: "What it shows: How BFS and DFS explore networks (graphs) visually.\n\nWhy we compare them: They both explore, but in different ways. Knowing the differences helps you pick the right tool for the job. BFS: best for shortest routes. DFS: best for seeing everything. Helps you learn how networks work.",
      icon: "fa-code-compare",
      link: "./bfs_dfs",
    },
    {
      "id": 5,
      "title": "Comparison of A* and Dijkstra's Algorithms",
      "description": [
        "What it shows: How A* and Dijkstra's algorithms find the shortest path in a graph visually.",
        "Why we compare them: They both find shortest paths, but A* is often faster using a heuristic.",
        "Knowing the differences helps you pick the most efficient pathfinding algorithm.",
        "A*: uses a heuristic to guide search.",
        "Dijkstra's: explores all possible paths from the start.",
        "Helps you understand how informed search differs from uninformed search in AI."
      ],
      "icon": "fa-route",
      "link": "./astart_diskatra",
    },
    {
      id: 6,
      title: "Minimax Algorithm",
      description:
        "Decision-making algorithm for minimizing possible loss in worst-case scenarios, commonly used in game theory.",
      icon: "fa-chess",
      link: "./minmax",
      color: "#FF00E5",
    },
    {
      id: 7,
      title: "Traveling Salesman Problem",
      description:
        "Optimization problem seeking the shortest possible route visiting each city exactly once and returning to the origin.",
      icon: "fa-route",
      link: "./travel",
    },
    {
      id: 8,
      title: "Water Jugs Problem",
      description:
        "Classic problem involving measuring a specific amount of water using jugs of different capacities.",
      icon: "fa-glass-water",
      link: "./jugs",
    },
    {
      id: 9,
      title: "N-Queens Problem",
      description:
        "Chess puzzle of placing N queens on an NxN chessboard so that no two queens threaten each other.",
      icon: "fa-chess-queen",
      link: "./queens",
    },
    {
      id: 10,
      title: "Missionaries and Cannibals",
      description:
        "River crossing puzzle demonstrating state space search and constraint satisfaction.",
      icon: "fa-people-group",
      link: "./missionarie",
    },
    {
      "id": 11,
      "title": "Tic-Tac-Toe Problem (MIN MAX ALGORITHM)",
      "description": "Tic-Tac-Toe is a classic two-player game on a 3x3 grid where players take turns placing 'X' or 'O' with the goal of getting three in a row. This problem demonstrates the use of the Minimax algorithm for decision-making and optimization in AI, allowing the AI to play optimally against a human player.",
      "icon": "fa-hashtag",
      "link": "./min-max-problem"
    }
  ];

  const [isSimulating, setIsSimulating] = useState(false);

  const handleTryNow = (algorithm: (typeof algorithms)[0]) => {
  };

  const handleAbout = (algorithm: (typeof algorithms)[0]) => {
    setDialogContent({
      title: algorithm.title,
      description: Array.isArray(algorithm.description) ? algorithm.description.join(' ') : algorithm.description,
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div
        className="absolute inset-0 bg-[url('https://public.readdy.ai/ai/img_res/5b3ed293e2f03215e76c76cd17475a28.jpg')] bg-cover bg-center opacity-20"
        style={{
          transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.001})`,
        }}
      />
      <div className="h-[600px] relative overflow-hidden mb-20">
        <div
          className="absolute inset-0 bg-[url('https://public.readdy.ai/ai/img_res/5c652b6dcddadd9c102aec5dae6035e6.jpg')] bg-cover bg-[center_right_-200px]"
          style={{
            transform: `translateY(${scrollY * 0.3}px) scale(${1 + scrollY * 0.0005})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(0,0,0,0.7)] to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,157,0.1)_0%,transparent_100%)] animate-pulse-slow"></div>
        <div
          className="container mx-auto px-4 relative h-full flex flex-col justify-center"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        >
          <h1 className="text-8xl font-bold mb-6 bg-gradient-to-r from-[#00FF9D] via-[#00A3FF] to-[#FF00E5] bg-clip-text text-transparent animate-float">
            AI Algorithm
          </h1>
          <p className="text-2xl text-[#00FF9D] max-w-2xl leading-relaxed transform hover:scale-105 transition-transform duration-500">
            Interactive demonstrations of fundamental computer science
            algorithms and problem-solving techniques
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <h2
          className="text-4xl font-bold mb-8 bg-gradient-to-r from-[#00FF9D] via-[#00A3FF] to-[#FF00E5] bg-clip-text text-transparent animate-pulse-slow"
          style={{
            transform: `translateX(${Math.min(0, -100 + scrollY * 0.5)}px) translateY(${Math.sin(scrollY * 0.01) * 10}px)`,
            opacity: Math.min(1, scrollY / 500),
          }}
        >
          Algorithm Collection
        </h2>
        <p className="text-xl text-[#666666] mb-16 animate-float">
          Explore our comprehensive suite of classical and modern algorithms
          with interactive visualizations
        </p>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 perspective-1000"
          style={{
            transform: `translateY(${Math.sin(scrollY * 0.02) * 5}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          {algorithms.map((algorithm, index) => (
            <Card
              key={algorithm.id}
              className="relative group bg-[#0A0A0A] hover:bg-[#1A1A1A] border border-[#1A1A1A] hover:border-[#00FF9D] transition-all duration-500 rounded-xl overflow-hidden transform hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,255,157,0.2)] hover:scale-105"
              style={{
                transform: `
perspective(1000px)
rotateX(0deg)
translateY(${Math.max(0, 100 - scrollY * 0.5)}px)
scale(${1 + Math.sin(scrollY * 0.01 + index) * 0.02})
`,
                opacity: Math.min(1, (scrollY - 200) / 500),
                transition: `all 0.5s ease-out ${index * 0.1}s`,
                animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
                animationDelay: `${index * 0.2}s`,}}
              onMouseMove={(e) => {
                const card = e.currentTarget;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                const distance = Math.sqrt(
                  Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2),
                );
                const maxDistance = Math.sqrt(
                  Math.pow(rect.width / 2, 2) + Math.pow(rect.height / 2, 2),
                );
                const glowIntensity = (1 - distance / maxDistance) * 0.5;
                card.style.transform = `
perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
scale(${1 + glowIntensity * 0.1})
`;
                card.style.boxShadow = `
0 0 ${30 + glowIntensity * 50}px ${glowIntensity * 0.7}px rgba(0, 255, 157, ${0.2 + glowIntensity * 0.3}),
inset 0 0 ${20 + glowIntensity * 30}px ${glowIntensity * 0.5}px rgba(0, 255, 157, ${0.1 + glowIntensity * 0.2})
`;
                card.style.borderColor = `rgba(0, 255, 157, ${0.3 + glowIntensity * 0.7})`;
              }}
              onMouseLeave={(e) => {
                const card = e.currentTarget;
                card.style.transform =
                  "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
                card.style.boxShadow = "none";
                card.style.borderColor = "#1A1A1A";
              }}
            >
              <div className="p-8 h-[360px] flex flex-col justify-between relative">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#00FF9D]/10 via-[#00A3FF]/10 to-[#FF00E5]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div>
                  <div
                    className="w-20 h-20 mb-6 mx-auto transform group-hover:scale-110 transition-transform duration-500"
                    style={{
                      animation: "spin 10s linear infinite",
                      animationDelay: `${index * 0.3}s`,
                    }}
                  >
                    <div className="w-full h-full rounded-full bg-[#1A1A1A] flex items-center justify-center border border-[#00FFFF]/30 group-hover:border-[#00FFFF] transition-all duration-500 shadow-[0_0_20px_rgba(0,255,255,0.2)]">
                      <i
                        className={`fas ${algorithm.icon} text-4xl text-[#00FFFF] transform group-hover:rotate-[360deg] transition-transform duration-1000`}
                      ></i>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center bg-gradient-to-r from-[#00FF9D] via-[#00A3FF] to-[#FF00E5] bg-clip-text text-transparent">
                    {algorithm.title}
                  </h3>
                  <p className="text-[#666666] text-sm text-center line-clamp-3 leading-relaxed">
                    {algorithm.description}
                  </p>
                </div>
                <div className="flex gap-4 mt-6">
                  <Link href={algorithm.link}>
                    <Button
                      className="!rounded-button flex-1 bg-[#00FF9D]/5 hover:bg-[#00FF9D]/10 text-[#00FF9D] border border-[#00FF9D] relative overflow-hidden group transition-all duration-500 hover:scale-105"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#00FF9D]/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                      <span className="absolute inset-0 bg-[#00FF9D]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Try Now
                        <i className="fas fa-arrow-right transform group-hover:translate-x-1 transition-transform duration-300"></i>
                      </span>
                    </Button>
                  </Link>
                  <Button
                    onClick={() => handleAbout(algorithm)}
                    className="!rounded-button flex-1 bg-[#00FFFF]/5 hover:bg-[#00FFFF]/10 text-[#00FFFF] border border-[#00FFFF] relative overflow-hidden group transition-all duration-500 hover:scale-105"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#00FFFF]/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                    <span className="absolute inset-0 bg-[#00FFFF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      About
                      <i className="fas fa-info-circle transform group-hover:rotate-12 transition-transform duration-300"></i>
                    </span>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#0A0A0A] text-white border-2 border-[#1A1A1A] shadow-[0_0_30px_rgba(0,255,157,0.2)]">
          <DialogHeader>
            <DialogTitle className="text-2xl bg-gradient-to-r from-[#00FF9D] via-[#00A3FF] to-[#FF00E5] bg-clip-text text-transparent font-bold flex items-center gap-3">
              {dialogContent.title}
              {isSimulating && (
                <div className="inline-block w-4 h-4 border-2 border-[#00FF9D] border-t-transparent rounded-full animate-spin"></div>
              )}
            </DialogTitle>
            <DialogDescription className="text-[#666666] mt-4 leading-relaxed">
              {dialogContent.description}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <style jsx global>{`
@keyframes float {
0% { transform: translateY(0px); }
50% { transform: translateY(-20px); }
100% { transform: translateY(0px); }
}
@keyframes glow {
0% { box-shadow: 0 0 5px rgba(0, 255, 157, 0.2); }
50% { box-shadow: 0 0 20px rgba(0, 255, 157, 0.4); }
100% { box-shadow: 0 0 5px rgba(0, 255, 157, 0.2); }
}
@keyframes spin {
from { transform: rotate(0deg); }
to { transform: rotate(360deg); }
}
@keyframes wave {
0% { transform: translateX(-100%); opacity: 0.2; }
50% { transform: translateX(0%); opacity: 1; }
100% { transform: translateX(100%); opacity: 0.2; }
}
@keyframes cardHover {
0% { transform: scale(1); box-shadow: 0 0 0 rgba(0, 255, 157, 0); }
50% { transform: scale(1.05); box-shadow: 0 0 30px rgba(0, 255, 157, 0.3); }
100% { transform: scale(1); box-shadow: 0 0 0 rgba(0, 255, 157, 0); }
}
.card-hover-effect {
animation: cardHover 2s ease-in-out infinite;
}
.animate-float {
animation: float 6s ease-in-out infinite;
}
.animate-pulse-slow {
animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
.animate-glow {
animation: glow 2s ease-in-out infinite;
}
.animate-wave {
animation: wave 3s ease-in-out infinite;
}
`}</style>
    </div>
  );
};
export default App;
