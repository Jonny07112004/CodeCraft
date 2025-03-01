'use client'
// pages/index.tsx
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';

cytoscape.use(dagre);

// Define types
type GraphType = 'directed' | 'undirected' | 'cyclic' | 'acyclic' | 'weighted' | 'loop';
type Mode = 'view' | 'addNode' | 'addEdge' | 'removeNode' | 'removeEdge';
type GraphElement = { data: { id: string; source?: string; target?: string; weight?: number } };

const GraphPropertiesVisualizer: React.FC = () => {
  // State for interactive graph
  const [elements, setElements] = useState<GraphElement[]>([]);
  const [mode, setMode] = useState<Mode>('view');
  const [nodeCounter, setNodeCounter] = useState(0);
  const [sourceNode, setSourceNode] = useState<string | null>(null);
  const [isDirected, setIsDirected] = useState(false);
  const [isWeighted, setIsWeighted] = useState(false);
  const [allowLoops, setAllowLoops] = useState(false);
  const [weight, setWeight] = useState(1);
  const [tooltip, setTooltip] = useState({ text: '', x: 0, y: 0, visible: false });
  const [graphProperties, setGraphProperties] = useState({
    vertices: 0,
    edges: 0,
    isCyclic: false,
    isConnected: false,
  });

  // Refs for cytoscape instances
  const drawingBoardRef = useRef<cytoscape.Core | null>(null);
  const exampleGraphsRef = useRef<Record<GraphType, cytoscape.Core | null>>({
    directed: null,
    undirected: null,
    cyclic: null,
    acyclic: null,
    weighted: null,
    loop: null,
  });

  // Example graph elements
  const exampleElements = {
    directed: [
      { data: { id: 'a' } },
      { data: { id: 'b' } },
      { data: { id: 'c' } },
      { data: { id: 'd' } },
      { data: { id: 'ab', source: 'a', target: 'b' } },
      { data: { id: 'bc', source: 'b', target: 'c' } },
      { data: { id: 'cd', source: 'c', target: 'd' } },
      { data: { id: 'da', source: 'd', target: 'a' } },
    ],
    undirected: [
      { data: { id: 'a' } },
      { data: { id: 'b' } },
      { data: { id: 'c' } },
      { data: { id: 'd' } },
      { data: { id: 'ab', source: 'a', target: 'b' } },
      { data: { id: 'ac', source: 'a', target: 'c' } },
      { data: { id: 'bd', source: 'b', target: 'd' } },
      { data: { id: 'cd', source: 'c', target: 'd' } },
    ],
    cyclic: [
      { data: { id: 'a' } },
      { data: { id: 'b' } },
      { data: { id: 'c' } },
      { data: { id: 'd' } },
      { data: { id: 'ab', source: 'a', target: 'b' } },
      { data: { id: 'bc', source: 'b', target: 'c' } },
      { data: { id: 'cd', source: 'c', target: 'd' } },
      { data: { id: 'da', source: 'd', target: 'a' } },
    ],
    acyclic: [
      { data: { id: 'a' } },
      { data: { id: 'b' } },
      { data: { id: 'c' } },
      { data: { id: 'd' } },
      { data: { id: 'e' } },
      { data: { id: 'ab', source: 'a', target: 'b' } },
      { data: { id: 'ac', source: 'a', target: 'c' } },
      { data: { id: 'bd', source: 'b', target: 'd' } },
      { data: { id: 'ce', source: 'c', target: 'e' } },
    ],
    weighted: [
      { data: { id: 'a' } },
      { data: { id: 'b' } },
      { data: { id: 'c' } },
      { data: { id: 'd' } },
      { data: { id: 'ab', source: 'a', target: 'b', weight: 3 } },
      { data: { id: 'ac', source: 'a', target: 'c', weight: 5 } },
      { data: { id: 'bd', source: 'b', target: 'd', weight: 2 } },
      { data: { id: 'cd', source: 'c', target: 'd', weight: 8 } },
    ],
    loop: [
      { data: { id: 'a' } },
      { data: { id: 'b' } },
      { data: { id: 'c' } },
      { data: { id: 'aa', source: 'a', target: 'a' } },
      { data: { id: 'ab', source: 'a', target: 'b' } },
      { data: { id: 'bc', source: 'b', target: 'c' } },
      { data: { id: 'cc', source: 'c', target: 'c' } },
    ],
  };

  // Styling for graphs
  const basicNodeStyle = {
    'background-color': '#6c5ce7',
    'label': 'data(id)',
    'color': '#fff',
    'text-valign': 'center',
    'text-halign': 'center',
    'font-size': '12px',
  };

  const basicEdgeStyle = {
    'width': 2,
    'line-color': '#888',
    'curve-style': 'bezier',
  };

  const directedEdgeStyle = {
    ...basicEdgeStyle,
    'target-arrow-color': '#888',
    'target-arrow-shape': 'triangle',
  };

  const weightedEdgeStyle = {
    ...basicEdgeStyle,
    'width': 2, // Default width, you can adjust as needed
    'label': 'data(weight)',
    'font-size': '10px',
    'color': '#000',
    'text-background-color': '#fff',
    'text-background-opacity': 0.7,
    'text-background-padding': '2px',
    'text-background-shape': 'rectangle',
  };

  const loopEdgeStyle = {
    ...directedEdgeStyle,
    'curve-style': 'bezier',
    'control-point-distance': 40,
    'control-point-weight': 0.5,
    'line-color': '#e74c3c',
    'target-arrow-color': '#e74c3c',
  };

  const cyclicEdgeStyle = {
    ...directedEdgeStyle,
    'line-color': '#e74c3c',
    'target-arrow-color': '#e74c3c',
  };

  // Function to update graph properties
  const updateGraphProperties = () => {
    if (!drawingBoardRef.current) return;

    const cy = drawingBoardRef.current;
    const vertices = cy.nodes().length;
    const edges = cy.edges().length;

    // Detect cycles (simplified algorithm)
    let isCyclic = false;

    if (vertices > 0 && edges > 0) {
      // A simple heuristic: if there are enough edges, there's likely a cycle
      if (edges >= vertices) {
        isCyclic = true;
      } else {
        // Or if there are self-loops
        cy.edges().forEach((edge: cytoscape.EdgeSingular) => {
          if (edge.source().id() === edge.target().id()) {
            isCyclic = true;
          }
        });
      }
    }

    // Check if graph is connected
    let isConnected = false;
    if (vertices > 0) {
      const components = cy.elements().components();
      isConnected = components.length === 1;
    }

    setGraphProperties({
      vertices,
      edges,
      isCyclic,
      isConnected,
    });
  };

  // Handle node clicks in the drawing board
  const handleNodeClick = (node: cytoscape.NodeSingular) => {
    if (mode === 'removeNode') {
      setElements(prev => prev.filter(el =>
        el.data.id !== node.id() &&
        el.data.source !== node.id() &&
        el.data.target !== node.id()
      ));
      setMode('view');
    } else if (mode === 'addEdge') {
      if (sourceNode === null) {
        setSourceNode(node.id());
      } else {
        if (sourceNode === node.id() && !allowLoops) {
          setSourceNode(null);
          return;
        }

        const edgeId = `e${sourceNode}-${node.id()}`;
        const newEdge = {
          data: {
            id: edgeId,
            source: sourceNode,
            target: node.id(),
            ...(isWeighted ? { weight } : {})
          }
        };

        setElements(prev => [...prev, newEdge]);
        setSourceNode(null);
        setMode('view');
      }
    }
  };

  // Handle edge clicks in the drawing board
  const handleEdgeClick = (edge: cytoscape.EdgeSingular) => {
    if (mode === 'removeEdge') {
      setElements(prev => prev.filter(el => el.data.id !== edge.id()));
      setMode('view');
    }
  };

  // Handle background clicks in the drawing board
  const handleBackgroundClick = (event: cytoscape.EventObject) => {
    if (mode === 'addNode') {
      const position = event.position;
      const newNodeId = `n${nodeCounter}`;

      const newNode = { data: { id: newNodeId } };
      setElements(prev => [...prev, newNode]);

      setTimeout(() => {
        if (drawingBoardRef.current) {
          const node = drawingBoardRef.current.getElementById(newNodeId);
          node.position(position);
        }
      }, 10);

      setNodeCounter(prev => prev + 1);
      setMode('view');
    } else if (mode === 'addEdge' && sourceNode !== null) {
      setSourceNode(null);
      setMode('view');
    }
  };

  // Clear the graph
  const clearGraph = () => {
    setElements([]);
    setSourceNode(null);
    setMode('view');
    setNodeCounter(0);
  };

  // Update styles when toggles change
  useEffect(() => {
    if (drawingBoardRef.current) {
      const cy = drawingBoardRef.current;

      // Update edge styles
      cy.edges().style({
        'width': isWeighted ? 'data(weight)' : 2,
        'target-arrow-shape': isDirected ? 'triangle' : 'none',
      });

      if (isWeighted) {
        cy.edges().style({
          'label': 'data(weight)',
          'font-size': '12px',
          'color': '#000',
          'text-background-color': '#fff',
          'text-background-opacity': 0.7,
          'text-background-padding': '2px',
          'text-background-shape': 'rectangle',
        });
      } else {
        cy.edges().style({
          'label': '',
        });
      }
    }

    // Update properties after style changes
    updateGraphProperties();
  }, [isDirected, isWeighted, allowLoops, elements]);

  // Component for the tooltip
  const Tooltip = () => (
    <div
      className="absolute bg-gray-800 bg-opacity-80 text-white p-2 rounded text-sm max-w-xs pointer-events-none transition-opacity duration-300"
      style={{
        left: `${tooltip.x}px`,
        top: `${tooltip.y}px`,
        opacity: tooltip.visible ? 1 : 0,
        zIndex: 100,
      }}
    >
      {tooltip.text}
    </div>
  );

  // Returns style description based on hover target
  const getTooltipText = (graphType: GraphType): string => {
    switch (graphType) {
      case 'directed':
        return 'Directed Graph: Edges have a specific direction, shown by arrows.';
      case 'undirected':
        return 'Undirected Graph: Edges have no direction, representing symmetric relationships.';
      case 'cyclic':
        return 'Cyclic Graph: Contains at least one cycle (highlighted in red).';
      case 'acyclic':
        return 'Acyclic Graph: Contains no cycles, often used for hierarchical structures.';
      case 'weighted':
        return 'Weighted Graph: Each edge has a weight value, shown by thickness and labels.';
      case 'loop':
        return 'Graph with Loops: Contains self-loops where vertices connect to themselves (in red).';
      default:
        return '';
    }
  };

  // Function to handle tooltip hover on graph examples
  const handleGraphHover = (graphType: GraphType, event: React.MouseEvent) => {
    setTooltip({
      text: getTooltipText(graphType),
      x: event.clientX + 10,
      y: event.clientY + 10,
      visible: true,
    });
  };

  // Function to hide tooltip
  const handleGraphLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  // Create GraphDisplay component for the examples
  const GraphDisplay = ({ type, title, description, useCases }: {
    type: GraphType,
    title: string,
    description: string,
    useCases: string
  }) => {
    // Get the appropriate style based on graph type
    const getStyles = () => {
      const styles = [
        { selector: 'node', style: basicNodeStyle },
        { selector: 'edge', style: type === 'undirected' ? basicEdgeStyle : directedEdgeStyle }
      ];

      if (type === 'weighted') {
        styles.push({ selector: 'edge', style: weightedEdgeStyle });
      } else if (type === 'loop') {
        styles.push({ selector: 'edge[source = target]', style: loopEdgeStyle });
      } else if (type === 'cyclic') {
        styles.push({
          selector: 'edge[id = "ab"], edge[id = "bc"], edge[id = "cd"], edge[id = "da"]',
          style: cyclicEdgeStyle
        });
      }

      return styles;
    };

    return (
      <div
        className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:translate-y-[-5px] hover:shadow-lg"
        onMouseMove={(e) => handleGraphHover(type, e)}
        onMouseLeave={handleGraphLeave}
      >
        <div className="bg-purple-600 text-white p-4 font-bold text-lg">
          {title}
        </div>
        <div className="h-56 w-full bg-gray-700 relative">
          <CytoscapeComponent
            elements={exampleElements[type]}
            stylesheet={getStyles()}
            style={{ width: '100%', height: '100%' }}
            layout={{ name: type === 'acyclic' ? 'dagre' : 'circle' }}
            cy={(cy: cytoscape.Core) => {
              exampleGraphsRef.current[type] = cy;
            }}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-purple-600 mb-2">{title}</h3>
          <p className="text-sm text-gray-300 mb-2">{description}</p>
          <p className="text-sm"><strong>Use Cases:</strong> {useCases}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Head>
        <title>Interactive Graph Properties Visualizer</title>
        <meta name="description" content="Learn about graph properties interactively" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-purple-600 text-white text-center py-6">
        <h1 className="text-3xl font-bold mb-2">Interactive Graph Properties Visualizer</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Explore different types of graphs, their properties, and create your own custom graphs
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Understanding Graph Theory</h2>
          <p className="text-gray-300">
            Graph theory is a mathematical discipline that studies relationships between objects.
            These relationships are represented using vertices (nodes) and edges.
            This interactive tool helps you explore various graph types and their properties.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Graph Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GraphDisplay
              type="directed"
              title="Directed Graph"
              description="A graph in which edges have directions. Each edge is represented by an arrow pointing from one vertex to another."
              useCases="Flow networks, dependencies, hierarchical structures."
            />

            <GraphDisplay
              type="undirected"
              title="Undirected Graph"
              description="A graph in which edges have no direction. The relationship between vertices is symmetric."
              useCases="Social networks, computer networks, molecular structures."
            />

            <GraphDisplay
              type="cyclic"
              title="Cyclic Graph"
              description="A graph that contains at least one cycle - a path that starts and ends at the same vertex."
              useCases="Circuit analysis, resource allocation, transportation networks."
            />

            <GraphDisplay
              type="acyclic"
              title="Acyclic Graph"
              description="A graph that does not contain any cycles. Often used to represent hierarchical structures."
              useCases="Task scheduling, file systems, project management."
            />

            <GraphDisplay
              type="weighted"
              title="Weighted Graph"
              description="A graph where edges have associated values or weights, often represented by edge thickness."
              useCases="Road networks, cost optimization, network flows."
            />

            <GraphDisplay
              type="loop"
              title="Graph with Loops"
              description="A graph containing self-loops - edges that connect vertices to themselves."
              useCases="State machines, recursive relationships, feedback systems."
            />
          </div>
        </section>

        <section className="bg-gray-800 rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-2xl font-bold mb-6">Graph Drawing Tool</h2>

          <div className="bg-gray-700 p-4 rounded-lg mb-4">
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isDirected}
                    onChange={() => setIsDirected(!isDirected)}
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
                <span>Directed Graph</span>
              </div>

              <div className="flex items-center gap-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isWeighted}
                    onChange={() => setIsWeighted(!isWeighted)}
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
                <span>Weighted Edges</span>
              </div>

              <div className="flex items-center gap-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={allowLoops}
                    onChange={() => setAllowLoops(!allowLoops)}
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
                <span>Allow Self-Loops</span>
              </div>
            </div>

            {isWeighted && (
              <div className="mb-4">
                <label htmlFor="weight-input" className="block mb-1 font-medium">Edge Weight:</label>
                <input
                  id="weight-input"
                  type="number"
                  min="1"
                  max="10"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="border border-gray-600 rounded p-2 w-32 bg-gray-800 text-white"
                />
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex gap-2">
              <button
                className={`px-4 py-2 rounded font-medium ${mode === 'addNode' ? 'bg-green-500 text-white' : 'bg-purple-600 text-white'}`}
                onClick={() => setMode('addNode')}
              >
                Add Vertex
              </button>
              <button
                className={`px-4 py-2 rounded font-medium ${mode === 'addEdge' ? 'bg-green-500 text-white' : 'bg-purple-600 text-white'}`}
                onClick={() => setMode('addEdge')}
              >
                Add Edge
              </button>
            </div>

            <div className="flex gap-2">
              <button
                className={`px-4 py-2 rounded font-medium ${mode === 'removeNode' ? 'bg-green-500 text-white' : 'bg-gray-600 text-white'}`}
                onClick={() => setMode('removeNode')}
              >
                Remove Vertex
              </button>
              <button
                className={`px-4 py-2 rounded font-medium ${mode === 'removeEdge' ? 'bg-green-500 text-white' : 'bg-gray-600 text-white'}`}
                onClick={() => setMode('removeEdge')}
              >
                Remove Edge
              </button>
            </div>

            <button
              className="px-4 py-2 rounded font-medium bg-gray-600 text-white"
              onClick={clearGraph}
            >
              Clear Graph
            </button>
          </div>

          <div className="relative h-96 w-full bg-gray-700 rounded-lg mb-4 border border-gray-600">
            <CytoscapeComponent
              elements={elements}
              stylesheet={[
                { selector: 'node', style: basicNodeStyle },
                { selector: 'edge', style: isDirected ? directedEdgeStyle : basicEdgeStyle },
                ...(isWeighted ? [{ selector: 'edge', style: weightedEdgeStyle }] : []),
                ...(allowLoops ? [{ selector: 'edge[source = target]', style: loopEdgeStyle }] : []),
              ]}
              style={{ width: '100%', height: '100%' }}
              layout={{ name: 'grid', rows: 1 }}
              cy={(cy: cytoscape.Core) => {
                drawingBoardRef.current = cy;
                cy.on('click', 'node', (event: cytoscape.EventObjectNode) => handleNodeClick(event.target));
                cy.on('click', 'edge', (event: cytoscape.EventObjectEdge) => handleEdgeClick(event.target));
                cy.on('click', (event: cytoscape.EventObject) => handleBackgroundClick(event));
              }}
            />
            <Tooltip />
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Graph Properties</h3>
            <ul className="space-y-2">
              <li><strong>Vertices:</strong> {graphProperties.vertices}</li>
              <li><strong>Edges:</strong> {graphProperties.edges}</li>
              <li><strong>Cyclic:</strong> {graphProperties.isCyclic ? 'Yes' : 'No'}</li>
              <li><strong>Connected:</strong> {graphProperties.isConnected ? 'Yes' : 'No'}</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white text-center py-4">
        <p>&copy; 2023 Graph Properties Visualizer. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default GraphPropertiesVisualizer;
