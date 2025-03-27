"use client";
import React, { useEffect, useState, useCallback } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import debounce from "lodash/debounce";

cytoscape.use(dagre);

interface NodeElement {
  data: { id: string };
  position?: { x: number; y: number };
}

interface EdgeElement {
  data: { id: string; source: string; target: string; weight: number };
}

type GraphElement = NodeElement | EdgeElement;

const MSTVisualizer: React.FC = () => {
  const [elements, setElements] = useState<GraphElement[]>([]);
  const [algorithm, setAlgorithm] = useState<"prims" | "kruskals">("prims");
  const [animationSpeed, setAnimationSpeed] = useState<number>(500);
  const [highlightedEdges, setHighlightedEdges] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState<string>("");

  useEffect(() => {
    setElements([
      { data: { id: "A" }, position: { x: 100, y: 100 } },
      { data: { id: "B" }, position: { x: 250, y: 100 } },
      { data: { id: "C" }, position: { x: 100, y: 250 } },
      { data: { id: "D" }, position: { x: 250, y: 250 } },
      { data: { id: "E" }, position: { x: 100, y: 400 } },
      { data: { id: "F" }, position: { x: 250, y: 400 } },
      { data: { id: "G" }, position: { x: 400, y: 400 } },
      { data: { id: "H" }, position: { x: 400, y: 250 } },
      { data: { id: "I" }, position: { x: 400, y: 100 } },
      { data: { source: "A", target: "B", weight: 4, id: "AB" } },
      { data: { source: "A", target: "C", weight: 2, id: "AC" } },
      { data: { source: "B", target: "C", weight: 5, id: "BC" } },
      { data: { source: "B", target: "D", weight: 10, id: "BD" } },
      { data: { source: "C", target: "D", weight: 3, id: "CD" } },
      { data: { source: "C", target: "E", weight: 7, id: "CE" } },
      { data: { source: "D", target: "F", weight: 6, id: "DF" } },
      { data: { source: "E", target: "F", weight: 9, id: "EF" } },
      { data: { source: "F", target: "G", weight: 8, id: "FG" } },
      { data: { source: "G", target: "H", weight: 11, id: "GH" } },
      { data: { source: "H", target: "I", weight: 13, id: "HI" } },
      { data: { source: "I", target: "A", weight: 12, id: "IA" } },
    ]);
  }, []);

  const debounceSetHighlightedEdges = useCallback(
    debounce((edges: string[]) => setHighlightedEdges(edges), 100),
    []
  );

  const runPrimsAlgorithm = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setHighlightedEdges([]);
    setCurrentStep("Initializing with node A");

    const mstEdges: string[] = [];
    const visited = new Set<string>(["A"]);
    const availableEdges = [...elements.filter((el): el is EdgeElement => 'source' in el.data)];

    while (visited.size < elements.filter((el): el is NodeElement => !('source' in el.data)).length) {
      const validEdges = availableEdges
        .filter(edge => 
          (visited.has(edge.data.source) && !visited.has(edge.data.target)) ||
          (visited.has(edge.data.target) && !visited.has(edge.data.source))
        )
        .sort((a, b) => a.data.weight - b.data.weight);

      if (validEdges.length === 0) break;

      const nextEdge = validEdges[0];
      setCurrentStep(`Adding edge ${nextEdge.data.source}-${nextEdge.data.target} (weight: ${nextEdge.data.weight})`);
      visited.add(nextEdge.data.source);
      visited.add(nextEdge.data.target);
      mstEdges.push(nextEdge.data.id);
      
      debounceSetHighlightedEdges([...mstEdges]);
      await new Promise(resolve => setTimeout(resolve, animationSpeed));
    }
    setCurrentStep("Algorithm completed");
    setIsRunning(false);
  };

  const runKruskalsAlgorithm = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setHighlightedEdges([]);
    setCurrentStep("Sorting edges by weight");

    const mstEdges: string[] = [];
    const parent: Record<string, string> = {};
    const rank: Record<string, number> = {};

    const find = (node: string): string => {
      if (!parent[node]) parent[node] = node;
      return parent[node] === node ? node : (parent[node] = find(parent[node]));
    };

    const union = (a: string, b: string) => {
      const rootA = find(a);
      const rootB = find(b);
      if (rootA !== rootB) {
        if (!rank[rootA]) rank[rootA] = 0;
        if (!rank[rootB]) rank[rootB] = 0;
        if (rank[rootA] < rank[rootB]) parent[rootA] = rootB;
        else if (rank[rootA] > rank[rootB]) parent[rootB] = rootA;
        else { parent[rootB] = rootA; rank[rootA]++; }
      }
    };

    const edges = [...elements.filter((el): el is EdgeElement => 'source' in el.data)]
      .sort((a, b) => a.data.weight - b.data.weight);

    for (const edge of edges) {
      if (find(edge.data.source) !== find(edge.data.target)) {
        setCurrentStep(`Adding edge ${edge.data.source}-${edge.data.target} (weight: ${edge.data.weight})`);
        union(edge.data.source, edge.data.target);
        mstEdges.push(edge.data.id);
        debounceSetHighlightedEdges([...mstEdges]);
        await new Promise(resolve => setTimeout(resolve, animationSpeed));
      }
    }
    setCurrentStep("Algorithm completed");
    setIsRunning(false);
  };

  // Pseudocode and Time Complexity as constants
  const primsPseudocode = `Prim's Algorithm:
1. MST ← ∅
2. Pick an arbitrary vertex v
3. Visited ← {v}
4. While Visited ≠ V:
   a. Find min-weight edge e = (u, v) where u ∈ Visited, v ∉ Visited
   b. MST ← MST ∪ {e}
   c. Visited ← Visited ∪ {v}
5. Return MST

Time Complexity:
- Using adjacency list with binary heap: O(E log V)
- Where V = number of vertices, E = number of edges`;

  const kruskalsPseudocode = `Kruskal's Algorithm:
1. MST ← ∅
2. Sort all edges by weight
3. For each vertex v ∈ V:
   a. MakeSet(v)
4. For each edge e = (u, v) in sorted order:
   a. If Find(u) ≠ Find(v):
      i. MST ← MST ∪ {e}
      ii. Union(u, v)
5. Return MST

Time Complexity:
- Using disjoint-set with union by rank: O(E log V)
- Where V = number of vertices, E = number of edges`;

  const V = elements.filter((el): el is NodeElement => !('source' in el.data)).length;
  const E = elements.filter((el): el is EdgeElement => 'source' in el.data).length;

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 w-[100vw]">
      <div className="max-w-[1400px] mx-auto px-6">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">Minimum Spanning Tree Visualization</h1>
          <p className="text-lg text-gray-400 mt-2">
            Explore how Prim’s and Kruskal’s algorithms construct the Minimum Spanning Tree (MST).
          </p>
        </header>

        <div className="flex flex-row gap-8">
          <div className="w-[300px] flex-shrink-0">
            <Card className="bg-gray-800 border-gray-700 h-full">
              <CardHeader>
                <CardTitle className="text-white">Control Panel</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-gray-300 block mb-2">Choose Algorithm</label>
                  <Select
                    value={algorithm}
                    onValueChange={(value: "prims" | "kruskals") => setAlgorithm(value)}
                  >
                    <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                      <SelectValue placeholder="Select Algorithm" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 text-white border-gray-600">
                      <SelectItem value="prims">Prim's Algorithm</SelectItem>
                      <SelectItem value="kruskals">Kruskal's Algorithm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-gray-300 block mb-2">Animation Speed (ms)</label>
                  <Slider
                    value={[animationSpeed]}
                    onValueChange={(value) => setAnimationSpeed(value[0])}
                    min={100}
                    max={2000}
                    step={100}
                    className="text-gray-300"
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={algorithm === "prims" ? runPrimsAlgorithm : runKruskalsAlgorithm}
                    disabled={isRunning}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isRunning ? "Running..." : `Run ${algorithm === "prims" ? "Prim's" : "Kruskal's"}`}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setHighlightedEdges([]);
                      setCurrentStep("");
                    }}
                    disabled={isRunning}
                    className="text-gray-300 border-gray-600 hover:bg-gray-700"
                  >
                    Reset
                  </Button>
                </div>

                <div>
                  <label className="text-gray-300 block mb-2">Current Step</label>
                  <div className="text-sm text-gray-300 bg-gray-900 p-2 rounded">
                    {currentStep || "Not running"}
                  </div>
                </div>

                <div>
                  <label className="text-gray-300 block mb-2">Pseudocode & Complexity</label>
                  <pre className="text-sm text-gray-300 bg-gray-900 p-3 rounded whitespace-pre-wrap">
                    {algorithm === "prims" ? primsPseudocode : kruskalsPseudocode}
                  </pre>
                  <div className="text-sm text-gray-300 mt-2">
                    Current Graph: V = {V}, E = {E}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex-1">
            <Card className="bg-gray-800 border-gray-700 w-full">
              <CardHeader>
                <CardTitle className="text-white">Graph Visualization</CardTitle>
              </CardHeader>
              <CardContent>
                <CytoscapeComponent
                  elements={elements}
                  style={{ width: "100%", height: "600px", borderRadius: "8px", backgroundColor: "#1e293b" }}
                  layout={{
                    name: "preset",
                    animate: true,
                    animationDuration: 500,
                    fit: true,
                  }}
                  stylesheet={[
                    {
                      selector: "node",
                      style: {
                        "content": "data(id)",
                        "color": "#fff",
                        "background-color": "#6366f1",
                        "width": 40,
                        "height": 40,
                        "font-size": "20px",
                        "text-valign": "center",
                        "text-halign": "center",
                        "transition-property": "background-color",
                        "transition-duration": "0.3s",
                        "border-width": 2,
                        "border-color": "#4b5e9e",
                      }
                    },
                    {
                      selector: "edge",
                      style: {
                        "width": 2,
                        "line-color": "#94a3b8",
                        "curve-style": "bezier",
                        "label": "data(weight)",
                        "font-size": "22px",
                        "text-background-color": "#1e293b",
                        "text-background-opacity": 1,
                        "color": "#ffffff",
                        "text-background-padding": "4px",
                        "text-opacity": 1,
                        "transition-property": "line-color, width",
                        "transition-duration": "0.3s",
                      }
                    },
                    {
                      selector: highlightedEdges.map(id => `#${id}`).join(", "),
                      style: {
                        "line-color": "#f59e0b",
                        "width": 4,
                      }
                    }
                  ]}
                  cy={(cy) => {
                    cy.on("add remove", () => {
                      cy.layout({
                        name: "dagre",
                        rankDir: "LR",
                        nodeSep: 120,
                        edgeSep: 60,
                        rankSep: 180,
                        animate: true,
                        animationDuration: 500,
                        padding: 60,
                        fit: true,
                      }).run();
                    });
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MSTVisualizer;