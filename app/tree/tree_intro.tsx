'use client';
import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const App: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState("whole-tree");

    const treeOptions = [
        { id: "whole-tree", label: "The whole tree" },
        { id: "root-node", label: "Root node" },
        { id: "edges", label: "Edges" },
        { id: "nodes", label: "Nodes" },
        { id: "leaf-nodes", label: "Leaf nodes" },
        { id: "child-nodes", label: "Child nodes" },
        { id: "parent-nodes", label: "Parent nodes" },
        { id: "tree-height", label: "Tree height (h=2)" },
        { id: "tree-size", label: "Tree size (n=10)" }
    ];

    const TreeNode: React.FC<{ label: string; x: number; y: number; isHighlighted?: boolean }> = ({ label, x, y, isHighlighted }) => (
        <g transform={`translate(${x},${y})`}>
            <circle
                r="22"
                fill={isHighlighted ? "#3b82f6" : "#1f2937"}
                stroke={isHighlighted ? "#2563eb" : "#64748b"}
                strokeWidth="2.5"
                filter="drop-shadow(0 2px 3px rgba(0,0,0,0.1))"
            />
            <text
                fill={isHighlighted ? "#ffffff" : "#e5e7eb"}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="16px"
                fontWeight="600"
                style={{ userSelect: 'none' }}
            >
                {label}
            </text>
        </g>
    );

    const TreeEdge: React.FC<{ x1: number; y1: number; x2: number; y2: number; isHighlighted?: boolean }> = ({ x1, y1, x2, y2, isHighlighted }) => (
        <line
            x1={x1}
            y1={y1 + 22}
            x2={x2}
            y2={y2 - 22}
            stroke={isHighlighted ? "#3b82f6" : "#64748b"}
            strokeWidth={isHighlighted ? "3" : "2.5"}
            markerEnd={isHighlighted ? "url(#arrowhead-highlighted)" : "url(#arrowhead)"}
            filter="drop-shadow(0 1px 2px rgba(0,0,0,0.05))"
        />
    );

    return (
        <div className="min-h-screen bg-black text-white flex flex-col md:flex-row items-center justify-center p-4 gap-4 w-100vw">
            <div className="border-2 border-gray-800 p-4 rounded-lg w-full md:w-1/3 h-auto md:h-[80vh] flex flex-col items-center justify-center gap-4">
                <h1 className="text-4xl font-bold">Trees</h1>
                <p className="text-center">
                    The Tree data structure is similar to Linked Lists in that each node contains data and can be linked
                    to other nodes.
                </p>
                <p className="text-center">
                    We have previously covered data structures like Arrays, Linked Lists, Stacks, and Queues. These are all
                    linear structures, which means that each element follows directly after another in a sequence.
                    Trees, however, are different. In a Tree, a single element can have multiple 'next' elements,
                    allowing the data structure to branch out in various directions.
                </p>
                <p className="text-center">
                    The Tree data structure can be useful in many cases:
                </p>
                <ul className="list-disc list-inside pl-6">
                    <li>Hierarchical Data: File systems, organizational models, etc.</li>
                    <li>Databases: Used for quick data retrieval.</li>
                    <li>Routing Tables: Used for routing data in network algorithms.</li>
                    <li>Sorting/Searching: Used for sorting data and searching for data.</li>
                    <li>Priority Queues: Priority queue data structures are commonly implemented using trees, such as binary heaps.</li>
                </ul>
            </div>
            <div className="flex flex-col items-center justify-center gap-6 w-full md:w-2/3">
                <h1 className="text-5xl font-bold mb-4">Tree Terminology</h1>
                <Card className="p-7 w-full flex gap-12 bg-gray-800 text-white">
                    <div className="flex-1">
                        <RadioGroup
                            value={selectedOption}
                            onValueChange={setSelectedOption}
                            className="flex flex-col gap-4"
                        >
                            {treeOptions.map((option) => (
                                <div key={option.id} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option.id} id={option.id} className="bg-white" />
                                    <Label htmlFor={option.id} className="text-sm">
                                        {option.label}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <svg width="400" height="300" viewBox="0 0 400 300" className="w-full h-full max-w-xs md:max-w-none">
                            <defs>
                                <marker
                                    id="arrowhead"
                                    markerWidth="12"
                                    markerHeight="8"
                                    refX="10"
                                    refY="4"
                                    orient="auto"
                                >
                                    <polygon points="0 0, 12 4, 0 8" fill="#64748b" />
                                </marker>
                                <marker
                                    id="arrowhead-highlighted"
                                    markerWidth="12"
                                    markerHeight="8"
                                    refX="10"
                                    refY="4"
                                    orient="auto"
                                >
                                    <polygon points="0 0, 12 4, 0 8" fill="#3b82f6" />
                                </marker>
                            </defs>
                            {/* Edges */}
                            <TreeEdge x1={200} y1={40} x2={100} y2={120} isHighlighted={selectedOption === "edges" || selectedOption === "whole-tree" || selectedOption === "tree-height"} />
                            <TreeEdge x1={200} y1={40} x2={200} y2={120} isHighlighted={selectedOption === "edges" || selectedOption === "whole-tree"} />
                            <TreeEdge x1={200} y1={40} x2={300} y2={120} isHighlighted={selectedOption === "edges" || selectedOption === "whole-tree"} />
                            <TreeEdge x1={100} y1={120} x2={50} y2={200} isHighlighted={selectedOption === "edges" || selectedOption === "whole-tree" || selectedOption === "tree-height"} />
                            <TreeEdge x1={100} y1={120} x2={150} y2={200} isHighlighted={selectedOption === "edges" || selectedOption === "whole-tree"} />
                            <TreeEdge x1={300} y1={120} x2={200} y2={200} isHighlighted={selectedOption === "edges" || selectedOption === "whole-tree"} />
                            <TreeEdge x1={300} y1={120} x2={250} y2={200} isHighlighted={selectedOption === "edges" || selectedOption === "whole-tree"} />
                            <TreeEdge x1={300} y1={120} x2={300} y2={200} isHighlighted={selectedOption === "edges" || selectedOption === "whole-tree"} />
                            <TreeEdge x1={300} y1={120} x2={350} y2={200} isHighlighted={selectedOption === "edges" || selectedOption === "whole-tree"} />

                            {/* Root Level */}
                            <TreeNode
                                label="R"
                                x={200}
                                y={40}
                                isHighlighted={
                                    selectedOption === "whole-tree" ||
                                    selectedOption === "root-node" ||
                                    selectedOption === "nodes" ||
                                    selectedOption === "parent-nodes" ||
                                    selectedOption === "tree-size"
                                }
                            />

                            {/* Level 1 */}
                            <TreeNode
                                label="A"
                                x={100}
                                y={120}
                                isHighlighted={
                                    selectedOption === "whole-tree" ||
                                    selectedOption === "nodes" ||
                                    selectedOption === "parent-nodes" ||
                                    selectedOption === "tree-size"
                                }
                            />
                            <TreeNode
                                label="B"
                                x={200}
                                y={120}
                                isHighlighted={
                                    selectedOption === "whole-tree" ||
                                    selectedOption === "nodes" ||
                                    selectedOption === "leaf-nodes" ||
                                    selectedOption === "tree-size"
                                }
                            />
                            <TreeNode
                                label="C"
                                x={300}
                                y={120}
                                isHighlighted={
                                    selectedOption === "whole-tree" ||
                                    selectedOption === "nodes" ||
                                    selectedOption === "parent-nodes" ||
                                    selectedOption === "tree-size"
                                }
                            />

                            {/* Level 2 */}
                            <TreeNode
                                label="D"
                                x={50}
                                y={200}
                                isHighlighted={
                                    selectedOption === "whole-tree" ||
                                    selectedOption === "nodes" ||
                                    selectedOption === "leaf-nodes" ||
                                    selectedOption === "child-nodes" ||
                                    selectedOption === "tree-size"
                                }
                            />
                            <TreeNode
                                label="E"
                                x={150}
                                y={200}
                                isHighlighted={
                                    selectedOption === "whole-tree" ||
                                    selectedOption === "nodes" ||
                                    selectedOption === "leaf-nodes" ||
                                    selectedOption === "child-nodes" ||
                                    selectedOption === "tree-size"
                                }
                            />
                            <TreeNode
                                label="F"
                                x={200}
                                y={200}
                                isHighlighted={
                                    selectedOption === "whole-tree" ||
                                    selectedOption === "nodes" ||
                                    selectedOption === "leaf-nodes" ||
                                    selectedOption === "child-nodes" ||
                                    selectedOption === "tree-size"
                                }
                            />
                            <TreeNode
                                label="G"
                                x={250}
                                y={200}
                                isHighlighted={
                                    selectedOption === "whole-tree" ||
                                    selectedOption === "nodes" ||
                                    selectedOption === "leaf-nodes" ||
                                    selectedOption === "child-nodes" ||
                                    selectedOption === "tree-size"
                                }
                            />
                            <TreeNode
                                label="H"
                                x={300}
                                y={200}
                                isHighlighted={
                                    selectedOption === "whole-tree" ||
                                    selectedOption === "nodes" ||
                                    selectedOption === "leaf-nodes" ||
                                    selectedOption === "child-nodes" ||
                                    selectedOption === "tree-size"
                                }
                            />
                            <TreeNode
                                label="I"
                                x={350}
                                y={200}
                                isHighlighted={
                                    selectedOption === "whole-tree" ||
                                    selectedOption === "nodes" ||
                                    selectedOption === "leaf-nodes" ||
                                    selectedOption === "child-nodes" ||
                                    selectedOption === "tree-size"
                                }
                            />
                        </svg>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default App;
