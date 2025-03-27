// Initialize example graphs
document.addEventListener('DOMContentLoaded', function() {
    // Create Directed Graph Example
    const directedGraph = cytoscape({
      container: document.getElementById('directed-graph'),
      elements: [
        { data: { id: 'a' } },
        { data: { id: 'b' } },
        { data: { id: 'c' } },
        { data: { id: 'd' } },
        { data: { id: 'ab', source: 'a', target: 'b' } },
        { data: { id: 'bc', source: 'b', target: 'c' } },
        { data: { id: 'cd', source: 'c', target: 'd' } },
        { data: { id: 'da', source: 'd', target: 'a' } }
      ],
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#4361ee',
            'label': 'data(id)',
            'color': '#fff',
            'text-valign': 'center',
            'text-halign': 'center',
            'font-size': '12px'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#343a40',
            'target-arrow-color': '#343a40',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier'
          }
        }
      ],
      layout: {
        name: 'circle'
      }
    });
  
    // Create Undirected Graph Example
    const undirectedGraph = cytoscape({
      container: document.getElementById('undirected-graph'),
      elements: [
        { data: { id: 'a' } },
        { data: { id: 'b' } },
        { data: { id: 'c' } },
        { data: { id: 'd' } },
        { data: { id: 'ab', source: 'a', target: 'b' } },
        { data: { id: 'ac', source: 'a', target: 'c' } },
        { data: { id: 'bd', source: 'b', target: 'd' } },
        { data: { id: 'cd', source: 'c', target: 'd' } }
      ],
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#4361ee',
            'label': 'data(id)',
            'color': '#fff',
            'text-valign': 'center',
            'text-halign': 'center',
            'font-size': '12px'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#343a40',
            'curve-style': 'bezier'
          }
        }
      ],
      layout: {
        name: 'circle'
      }
    });
  
    // Create Cyclic Graph Example
    const cyclicGraph = cytoscape({
      container: document.getElementById('cyclic-graph'),
      elements: [
        { data: { id: 'a' } },
        { data: { id: 'b' } },
        { data: { id: 'c' } },
        { data: { id: 'd' } },
        { data: { id: 'ab', source: 'a', target: 'b' } },
        { data: { id: 'bc', source: 'b', target: 'c' } },
        { data: { id: 'cd', source: 'c', target: 'd' } },
        { data: { id: 'da', source: 'd', target: 'a' } }
      ],
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#4361ee',
            'label': 'data(id)',
            'color': '#fff',
            'text-valign': 'center',
            'text-halign': 'center',
            'font-size': '12px'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#343a40',
            'target-arrow-color': '#343a40',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier'
          }
        },
        {
          selector: 'edge[id="ab"], edge[id="bc"], edge[id="cd"], edge[id="da"]',
          style: {
            'line-color': '#f44336',
            'target-arrow-color': '#f44336'
          }
        }
      ],
      layout: {
        name: 'circle'
      }
    });
  
    // Create Acyclic Graph Example
    const acyclicGraph = cytoscape({
      container: document.getElementById('acyclic-graph'),
      elements: [
        { data: { id: 'a' } },
        { data: { id: 'b' } },
        { data: { id: 'c' } },
        { data: { id: 'd' } },
        { data: { id: 'e' } },
        { data: { id: 'ab', source: 'a', target: 'b' } },
        { data: { id: 'ac', source: 'a', target: 'c' } },
        { data: { id: 'bd', source: 'b', target: 'd' } },
        { data: { id: 'ce', source: 'c', target: 'e' } }
      ],
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#4361ee',
            'label': 'data(id)',
            'color': '#fff',
            'text-valign': 'center',
            'text-halign': 'center',
            'font-size': '12px'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#343a40',
            'target-arrow-color': '#343a40',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier'
          }
        }
      ],
      layout: {
        name: 'dagre'
      }
    });
  
    // Create Weighted Graph Example
    const weightedGraph = cytoscape({
      container: document.getElementById('weighted-graph'),
      elements: [
        { data: { id: 'a' } },
        { data: { id: 'b' } },
        { data: { id: 'c' } },
        { data: { id: 'd' } },
        { data: { id: 'ab', source: 'a', target: 'b', weight: 3 } },
        { data: { id: 'ac', source: 'a', target: 'c', weight: 5 } },
        { data: { id: 'bd', source: 'b', target: 'd', weight: 2 } },
        { data: { id: 'cd', source: 'c', target: 'd', weight: 8 } }
      ],
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#4361ee',
            'label': 'data(id)',
            'color': '#fff',
            'text-valign': 'center',
            'text-halign': 'center',
            'font-size': '12px'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 'data(weight)',
            'line-color': '#343a40',
            'label': 'data(weight)',
            'font-size': '10px',
            'color': '#000',
            'text-background-color': '#fff',
            'text-background-opacity': 0.7,
            'text-background-padding': '2px',
            'text-background-shape': 'rectangle',
            'curve-style': 'bezier'
          }
        }
      ],
      layout: {
        name: 'circle'
      }
    });
  
    // Create Graph with Loops Example
    const loopGraph = cytoscape({
      container: document.getElementById('loop-graph'),
      elements: [
        { data: { id: 'a' } },
        { data: { id: 'b' } },
        { data: { id: 'c' } },
        { data: { id: 'aa', source: 'a', target: 'a' } },
        { data: { id: 'ab', source: 'a', target: 'b' } },
        { data: { id: 'bc', source: 'b', target: 'c' } },
        { data: { id: 'cc', source: 'c', target: 'c' } }
      ],
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#4361ee',
            'label': 'data(id)',
            'color': '#fff',
            'text-valign': 'center',
            'text-halign': 'center',
            'font-size': '12px'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#343a40',
            'target-arrow-color': '#343a40',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier'
          }
        },
        {
          selector: 'edge[source = target]',
          style: {
            'curve-style': 'bezier',
            'control-point-distance': 40,
            'control-point-weight': 0.5,
            'line-color': '#f44336',
            'target-arrow-color': '#f44336'
          }
        }
      ],
      layout: {
        name: 'circle'
      }
    });
  
    // Create Interactive Graph
    const drawingBoard = cytoscape({
      container: document.getElementById('drawing-board'),
      elements: [],
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#4361ee',
            'label': 'data(id)',
            'color': '#fff',
            'text-valign': 'center',
            'text-halign': 'center',
            'font-size': '14px'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#343a40',
            'curve-style': 'bezier'
          }
        },
        {
          selector: 'edge.directed',
          style: {
            'target-arrow-color': '#343a40',
            'target-arrow-shape': 'triangle'
          }
        },
        {
          selector: 'edge.weighted',
          style: {
            'label': 'data(weight)',
            'font-size': '12px',
            'color': '#000',
            'text-background-color': '#fff',
            'text-background-opacity': 0.7,
            'text-background-padding': '2px',
            'text-background-shape': 'rectangle'
          }
        },
        {
          selector: 'edge[source = target]',
          style: {
            'curve-style': 'bezier',
            'control-point-distance': 50,
            'control-point-weight': 0.5
          }
        }
      ]
    });
  
    // Set up tooltips for example graphs
    const tooltip = document.getElementById('tooltip');
    const displayTooltip = (event, text) => {
      tooltip.textContent = text;
      tooltip.style.left = event.pageX + 10 + 'px';
      tooltip.style.top = event.pageY + 10 + 'px';
      tooltip.style.opacity = 1;
    };
  
    const hideTooltip = () => {
      tooltip.style.opacity = 0;
    };
  
    // Add tooltip event listeners to all graph displays
    document.querySelectorAll('.graph-display').forEach(display => {
      display.addEventListener('mouseover', function(event) {
        if (event.target === this) return;
        
        let text = '';
        switch(this.id) {
          case 'directed-graph':
            text = 'Directed Graph: Edges have a specific direction, shown by arrows.';
            break;
          case 'undirected-graph':
            text = 'Undirected Graph: Edges have no direction, representing symmetric relationships.';
            break;
          case 'cyclic-graph':
            text = 'Cyclic Graph: Contains at least one cycle (highlighted in red).';
            break;
          case 'acyclic-graph':
            text = 'Acyclic Graph: Contains no cycles, often used for hierarchical structures.';
            break;
          case 'weighted-graph':
            text = 'Weighted Graph: Each edge has a weight value, shown by thickness and labels.';
            break;
          case 'loop-graph':
            text = 'Graph with Loops: Contains self-loops where vertices connect to themselves (in red).';
            break;
        }
        displayTooltip(event, text);
      });
      
      display.addEventListener('mouseout', hideTooltip);
      display.addEventListener('mousemove', function(event) {
        if (tooltip.style.opacity === '1') {
          tooltip.style.left = event.pageX + 10 + 'px';
          tooltip.style.top = event.pageY + 10 + 'px';
        }
      });
    });
  
    // Variables for interactive tool
    let mode = 'view'; // view, addNode, addEdge, removeNode, removeEdge
    let sourceNode = null;
    let nodeCounter = 0;
    let isDirected = false;
    let isWeighted = false;
    let allowLoops = false;
  
    // Toggle switches
    document.getElementById('directed-toggle').addEventListener('change', function() {
      isDirected = this.checked;
      updateEdgeStyles();
    });
  
    document.getElementById('weighted-toggle').addEventListener('change', function() {
      isWeighted = this.checked;
      document.getElementById('edge-weight-input').style.display = isWeighted ? 'block' : 'none';
      updateEdgeStyles();
    });
  
    document.getElementById('loop-toggle').addEventListener('change', function() {
      allowLoops = this.checked;
    });
  
    // Function to update edge styles based on toggles
    function updateEdgeStyles() {
      if (isDirected) {
        drawingBoard.edges().addClass('directed');
      } else {
        drawingBoard.edges().removeClass('directed');
      }
  
      if (isWeighted) {
        drawingBoard.edges().addClass('weighted');
      } else {
        drawingBoard.edges().removeClass('weighted');
      }
    }
  
    // Control buttons
    document.getElementById('add-node-btn').addEventListener('click', function() {
      mode = 'addNode';
      resetButtonStyles();
      this.style.backgroundColor = '#4caf50';
    });
  
    document.getElementById('add-edge-btn').addEventListener('click', function() {
      mode = 'addEdge';
      resetButtonStyles();
      this.style.backgroundColor = '#4caf50';
    });
  
    document.getElementById('remove-node-btn').addEventListener('click', function() {
      mode = 'removeNode';
      resetButtonStyles();
      this.style.backgroundColor = '#4caf50';
    });
  
    document.getElementById('remove-edge-btn').addEventListener('click', function() {
      mode = 'removeEdge';
      resetButtonStyles();
      this.style.backgroundColor = '#4caf50';
    });
  
    document.getElementById('clear-graph-btn').addEventListener('click', function() {
      drawingBoard.elements().remove();
      updateGraphProperties();
    });
  
    // Function to reset button styles
    function resetButtonStyles() {
      document.getElementById('add-node-btn').style.backgroundColor = '';
      document.getElementById('add-edge-btn').style.backgroundColor = '';
      document.getElementById('remove-node-btn').style.backgroundColor = '';
      document.getElementById('remove-edge-btn').style.backgroundColor = '';
      document.getElementById('clear-graph-btn').style.backgroundColor = '';
    }
  
    // Function to update graph properties display
    function updateGraphProperties() {
      document.getElementById('vertex-count').textContent = drawingBoard.nodes().length;
      document.getElementById('edge-count').textContent = drawingBoard.edges().length;
      // Placeholder for isCyclic and isConnected logic
      document.getElementById('is-cyclic').textContent = 'No';
      document.getElementById('is-connected').textContent = 'No';
    }
  
    // Event listeners for drawing board interactions
    drawingBoard.on('click', 'node', function(event) {
      const targetNode = event.target;
      if (mode === 'addEdge' && sourceNode) {
        const edgeId = `e${sourceNode.id()}-${targetNode.id()}`;
        let weight = 1;
        if (isWeighted) {
          weight = parseInt(document.getElementById('weight-value').value, 10);
        }
        drawingBoard.add({
          group: 'edges',
          data: {
            id: edgeId,
            source: sourceNode.id(),
            target: targetNode.id(),
            weight: weight
          }
        });
        sourceNode = null;
        updateGraphProperties();
      } else if (mode === 'removeNode') {
        drawingBoard.remove(targetNode);
        updateGraphProperties();
      } else if (mode === 'removeEdge') {
        drawingBoard.edges().forEach(edge => {
          if (edge.source().id() === targetNode.id() || edge.target().id() === targetNode.id()) {
            drawingBoard.remove(edge);
          }
        });
        updateGraphProperties();
      }
    });
  
    drawingBoard.on('click', 'edge', function(event) {
      const targetEdge = event.target;
      if (mode === 'removeEdge') {
        drawingBoard.remove(targetEdge);
        updateGraphProperties();
      }
    });
  
    drawingBoard.on('click', function(event) {
      if (mode === 'addNode') {
        const pos = event.position;
        const nodeId = `n${++nodeCounter}`;
        drawingBoard.add({
          group: 'nodes',
          data: { id: nodeId },
          position: { x: pos.x, y: pos.y }
        });
        updateGraphProperties();
      } else if (mode === 'addEdge' && !sourceNode) {
        sourceNode = drawingBoard.nodes().has(event.target) ? event.target : null;
      }
    });
  
    // Initial update of graph properties
    updateGraphProperties();
  });