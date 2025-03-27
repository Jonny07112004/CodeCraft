"use client";
import React, { useState, useEffect } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import cytoscape from "cytoscape";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast, Toaster } from "sonner"; // Import Toaster along with toast

const GraphVisualization: React.FC = () => {
  const [graphType, setGraphType] = useState("directed");
  const [elements, setElements] = useState<cytoscape.ElementDefinition[]>([]);
  const [adjacencyMatrix, setAdjacencyMatrix] = useState<{ labels: string[], matrix: number[][] }>({ labels: [], matrix: [] });

  const [newNode, setNewNode] = useState("");
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const [weight, setWeight] = useState("");

  // Function to check if a node exists
  const nodeExists = (id: string) => elements.some((el) => el.data.id === id && !el.data.source);

  // Function to check if an edge exists
  const edgeExists = (source: string, target: string) =>
    elements.some((el) => el.data.source === source && el.data.target === target);

  // Function to add a new node
  const addNode = () => {
    if (!newNode) {
      toast.error("Node name cannot be empty!");
      return;
    }
    if (nodeExists(newNode)) {
      toast.error(`Node "${newNode}" already exists!`);
      return;
    }

    setElements([...elements, { data: { id: newNode, label: newNode } }]);
    toast.success(`Node "${newNode}" added successfully!`);
    setNewNode("");
  };

  // Function to add an edge
  const addEdge = () => {
    if (!source || !target) {
      toast.error("Source and target must be filled!");
      return;
    }
    if (graphType === "loop" && source === target) {
      // Allow self-loops for "Graph with Loops"
      if (edgeExists(source, target)) {
        toast.error(`Edge "${source} → ${target}" already exists!`);
        return;
      }
      setElements([...elements, { data: { id: `${source}${target}`, source, target, label: "" } }]);
      toast.success(`Edge "${source} → ${target}" added successfully!`);
      setSource("");
      setTarget("");
      return;
    }
    if (source === target) {
      toast.error("Self-loops are not allowed for this graph type!");
      return;
    }
    if (!nodeExists(source) || !nodeExists(target)) {
      toast.error("Both source and target nodes must exist!");
      return;
    }
    if (edgeExists(source, target)) {
      toast.error(`Edge "${source} → ${target}" already exists!`);
      return;
    }
    if (graphType === "weighted") {
      if (!weight || isNaN(parseInt(weight))) {
        toast.error("Weight must be a valid number!");
        return;
      }
      setElements([...elements, { data: { id: `${source}${target}`, source, target, label: weight } }]);
    } else {
      setElements([...elements, { data: { id: `${source}${target}`, source, target, label: "1" } }]);
    }

    toast.success(`Edge "${source} → ${target}" added successfully!`);
    setSource("");
    setTarget("");
    setWeight("");
  };

  // Function to remove a node
  const removeNode = (nodeId: string) => {
    setElements(elements.filter((el) => el.data.id !== nodeId && el.data.source !== nodeId && el.data.target !== nodeId));
    toast.success(`Node "${nodeId}" removed!`);
  };

  // Function to generate adjacency matrix
  const generateAdjacencyMatrix = () => {
    const nodes = elements.filter((el) => !el.data.source).map((node) => node.data.id).filter((id): id is string => id !== undefined);
    const nodeIndexMap: { [key: string]: number } = {};
    nodes.forEach((node, index) => {
      nodeIndexMap[node] = index;
    });

    const matrixSize = nodes.length;
    const matrix = Array.from({ length: matrixSize }, () => Array(matrixSize).fill(0));

    elements.forEach((el) => {
      if (el.data.source && el.data.target) {
        const sourceIndex = nodeIndexMap[el.data.source];
        const targetIndex = nodeIndexMap[el.data.target];
        let weight: number;
        if (graphType === "weighted") {
          weight = !el.data.label || isNaN(parseInt(el.data.label)) ? 1 : parseInt(el.data.label);
        } else {
          weight = 1;
        }
        matrix[sourceIndex][targetIndex] = weight;

        if (graphType !== "directed") {
          matrix[targetIndex][sourceIndex] = weight;
        }
      }
    });

    setAdjacencyMatrix({ labels: nodes, matrix });
  };

  // Ensure the initial graph is rendered
  useEffect(() => {
    const initialElements = [
      { data: { id: "A", label: "A" } },
      { data: { id: "B", label: "B" } },
      { data: { id: "C", label: "C" } },
      { data: { id: "D", label: "D" } },
      { data: { id: "AB", source: "A", target: "B", label: "1" } },
      { data: { id: "BC", source: "B", target: "C", label: "1" } },
      { data: { id: "CD", source: "C", target: "D", label: "1" } },
    ];

    console.log("Initializing graph with elements:", initialElements);
    setElements(initialElements);
  }, []);

  // Update adjacency matrix whenever elements or graphType change
  useEffect(() => {
    generateAdjacencyMatrix();
  }, [elements, graphType]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Add Toaster component here to render toast notifications */}
      <Toaster richColors position="top-right" />
      <div className="max-w-6xl mx-auto">
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Graph Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                {/* Graph Display */}
                <CytoscapeComponent
                  elements={elements}
                  style={{ width: "100%", height: "600px", background: "#222" }}
                  layout={{
                    name: "cose",
                    idealEdgeLength: (edge) => 100,
                    nodeOverlap: 20,
                    refresh: 20,
                    fit: true,
                    padding: 30,
                    randomize: false,
                    componentSpacing: 70,
                    nodeRepulsion: (node) => 4000,
                    edgeElasticity: (edge) => 100,
                    nestingFactor: 0.1,
                    gravity: 0.25,
                    numIter: 1000,
                    animate: "end",
                    animationDuration: 500,
                    animationEasing: undefined,
                    boundingBox: undefined,
                    tile: true,
                  }}
                  cy={(cy) => {
                    console.log("Initializing Cytoscape with elements:", elements);
                    cy.style()
                      .selector("node")
                      .style({
                        "background-color": "#60a5fa",
                        label: "data(label)",
                        "text-valign": "center",
                        color: "white",
                        "font-size": "14px",
                      })
                      .selector("edge")
                      .style({
                        width: 3,
                        "line-color": "#f87171",
                        "target-arrow-shape": graphType === "directed" ? "triangle" : "none",
                        label: graphType === "weighted" ? "data(label)" : "",
                        "text-background-color": "white",
                        "text-background-opacity": 1,
                        "curve-style": "bezier",
                      });
                  }}
                />
              </div>

              {/* Controls */}
              <div className="space-y-4">
                <Select value={graphType} onValueChange={(value) => setGraphType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Graph Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="directed">Directed</SelectItem>
                    <SelectItem value="undirected">Undirected</SelectItem>
                    <SelectItem value="weighted">Weighted</SelectItem>
                    <SelectItem value="cyclic">Cyclic</SelectItem>
                    <SelectItem value="acyclic">Acyclic</SelectItem>
                    <SelectItem value="loop">Graph with Loops</SelectItem>
                  </SelectContent>
                </Select>

                {/* Add Node */}
                <div className="flex gap-2">
                  <Input value={newNode} onChange={(e) => setNewNode(e.target.value.toUpperCase())} placeholder="New Node (e.g., E)" />
                  <Button onClick={addNode} className="bg-green-500">Add Node</Button>
                </div>

                {/* Add Edge */}
                <div className="grid grid-cols-3 gap-2">
                  <Input value={source} onChange={(e) => setSource(e.target.value.toUpperCase())} placeholder="Source (e.g., A)" />
                  <Input value={target} onChange={(e) => setTarget(e.target.value.toUpperCase())} placeholder="Target (e.g., B)" />
                  {graphType === "weighted" && (
                    <Input value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight (e.g., 5)" />
                  )}
                  <Button onClick={addEdge} className="col-span-3 bg-blue-500">Add Edge</Button>
                </div>

                {/* Remove Node */}
                <div className="grid grid-cols-2 gap-2">
                  {elements.filter((el) => !el.data.source).map((node) => (
                    <Button key={node.data.id ?? "unknown"} onClick={() => removeNode(node.data.id ?? "")} className="bg-red-500">
                      Remove {node.data.id ?? "Unknown"}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Display Adjacency Matrix */}
            <div>
              <h3 className="text-lg font-semibold mb-2 text-white">Adjacency Matrix</h3>
              <pre className="bg-gray-800 p-4 rounded text-sm text-white">
                <div className="flex space-x-4">
                  <div className="w-16 font-bold"> </div>
                  {adjacencyMatrix.labels.map((label, index) => (
                    <div key={index} className="w-16 text-center font-bold text-lg">{label}</div>
                  ))}
                </div>
                {adjacencyMatrix.matrix.map((row, i) => (
                  <div key={i} className="flex space-x-4">
                    <div className="w-16 text-center font-bold text-lg">{adjacencyMatrix.labels[i]}</div>
                    {row.map((value, j) => (
                      <div key={j} className="w-16 text-center text-lg">{value}</div>
                    ))}
                  </div>
                ))}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GraphVisualization;