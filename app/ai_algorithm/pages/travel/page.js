'use client';
import React, { useState, useEffect } from 'react';

const cities = [
  { name: 'Oradea', x: 75, y: 40 },
  { name: 'Zerind', x: 80, y: 120 },
  { name: 'Arad', x: 75, y: 190 },
  { name: 'Timisoara', x: 70, y: 290 },
  { name: 'Lugoj', x: 180, y: 310 },
  { name: 'Mehadia', x: 180, y: 380 },
  { name: 'Drobeta', x: 180, y: 460 },
  { name: 'Craiova', x: 320, y: 460 },
  { name: 'Sibiu', x: 220, y: 180 },
  { name: 'Rimnicu Vilcea', x: 300, y: 250 },
  { name: 'Pitesti', x: 400, y: 310 },
  { name: 'Fagaras', x: 380, y: 150 },
  { name: 'Neamt', x: 570, y: 90 },
  { name: 'Iasi', x: 610, y: 135 },
  { name: 'Vaslui', x: 680, y: 210 },
  { name: 'Urziceni', x: 630, y: 380 },
  { name: 'Hirsova', x: 710, y: 390 },
  { name: 'Eforie', x: 730, y: 460 },
  { name: 'Bucharest', x: 520, y: 380 },
  { name: 'Giurgiu', x: 520, y: 450 },
];

const connections = [
  { from: 'Oradea', to: 'Zerind', distance: 71 },
  { from: 'Zerind', to: 'Oradea', distance: 71 },
  { from: 'Oradea', to: 'Sibiu', distance: 151 },
  { from: 'Sibiu', to: 'Oradea', distance: 151 },
  { from: 'Zerind', to: 'Arad', distance: 75 },
  { from: 'Arad', to: 'Zerind', distance: 75 },
  { from: 'Arad', to: 'Timisoara', distance: 118 },
  { from: 'Timisoara', to: 'Arad', distance: 118 },
  { from: 'Timisoara', to: 'Lugoj', distance: 111 },
  { from: 'Lugoj', to: 'Timisoara', distance: 111 },
  { from: 'Lugoj', to: 'Mehadia', distance: 70 },
  { from: 'Mehadia', to: 'Lugoj', distance: 70 },
  { from: 'Mehadia', to: 'Drobeta', distance: 75 },
  { from: 'Drobeta', to: 'Mehadia', distance: 75 },
  { from: 'Drobeta', to: 'Craiova', distance: 120 },
  { from: 'Craiova', to: 'Drobeta', distance: 120 },
  { from: 'Craiova', to: 'Rimnicu Vilcea', distance: 146 },
  { from: 'Rimnicu Vilcea', to: 'Craiova', distance: 146 },
  { from: 'Rimnicu Vilcea', to: 'Sibiu', distance: 80 },
  { from: 'Sibiu', to: 'Rimnicu Vilcea', distance: 80 },
  { from: 'Sibiu', to: 'Fagaras', distance: 99 },
  { from: 'Fagaras', to: 'Sibiu', distance: 99 },
  { from: 'Fagaras', to: 'Bucharest', distance: 212 },
  { from: 'Bucharest', to: 'Fagaras', distance: 212 },
  { from: 'Pitesti', to: 'Bucharest', distance: 101 },
  { from: 'Bucharest', to: 'Pitesti', distance: 101 },
  { from: 'Bucharest', to: 'Giurgiu', distance: 90 },
  { from: 'Giurgiu', to: 'Bucharest', distance: 90 },
  { from: 'Bucharest', to: 'Urziceni', distance: 85 },
  { from: 'Urziceni', to: 'Bucharest', distance: 85 },
  { from: 'Urziceni', to: 'Hirsova', distance: 98 },
  { from: 'Hirsova', to: 'Urziceni', distance: 98 },
  { from: 'Hirsova', to: 'Eforie', distance: 86 },
  { from: 'Eforie', to: 'Hirsova', distance: 86 },
  { from: 'Arad', to: 'Sibiu', distance: 140 },
  { from: 'Sibiu', to: 'Arad', distance: 140 },
  { from: 'Sibiu', to: 'Rimnicu Vilcea', distance: 80 },
  { from: 'Rimnicu Vilcea', to: 'Sibiu', distance: 80 },
  { from: 'Rimnicu Vilcea', to: 'Pitesti', distance: 97 },
  { from: 'Pitesti', to: 'Rimnicu Vilcea', distance: 97 },
  { from: 'Pitesti', to: 'Craiova', distance: 138 },
  { from: 'Craiova', to: 'Pitesti', distance: 138 },
  { from: 'Iasi', to: 'Neamt', distance: 87 },
  { from: 'Neamt', to: 'Iasi', distance: 87 },
  { from: 'Neamt', to: 'Vaslui', distance: 92 },
  { from: 'Vaslui', to: 'Neamt', distance: 92 },
  { from: 'Vaslui', to: 'Urziceni', distance: 142 },
  { from: 'Urziceni', to: 'Vaslui', distance: 142 },
];

const heuristic = (a, b) => {
  const cityA = cities.find(city => city.name === a);
  const cityB = cities.find(city => city.name === b);
  if (!cityA || !cityB) {
    throw new Error(`One or both cities not found: ${a}, ${b}`);
  }
  return Math.sqrt((cityA.x - cityB.x) ** 2 + (cityA.y - cityB.y) ** 2);
};

const aStar = (start, goal) => {
  const openSet = [];
  const cameFrom = {};
  const gScore = {};
  const fScore = {};

  cities.forEach(city => {
    gScore[city.name] = Infinity;
    fScore[city.name] = Infinity;
  });

  gScore[start] = 0;
  fScore[start] = heuristic(start, goal);

  openSet.push([fScore[start], start]);

  while (openSet.length > 0) {
    openSet.sort((a, b) => a[0] - b[0]);
    const current = openSet.shift()[1];

    if (current === goal) {
      const path = [];
      let currentCity = current;
      while (currentCity) {
        path.unshift(currentCity);
        currentCity = cameFrom[currentCity];
      }
      return path;
    }

    connections.forEach(conn => {
      if (conn.from === current) {
        const neighbor = conn.to;
        const tentativeGScore = gScore[current] + conn.distance;

        if (tentativeGScore < gScore[neighbor]) {
          cameFrom[neighbor] = current;
          gScore[neighbor] = tentativeGScore;
          fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, goal);

          if (!openSet.some(city => city[1] === neighbor)) {
            openSet.push([fScore[neighbor], neighbor]);
          }
        }
      }
    });
  }

  return null;
};

const findAllPaths = (start, goal) => {
  const paths = [];
  const uniquePaths = new Set();
  const visited = new Set();

  const dfs = (currentPath, currentCost) => {
    const currentCity = currentPath[currentPath.length - 1];
    if (currentCity === goal) {
      const pathString = currentPath.join(' -> ');
      if (!uniquePaths.has(pathString)) {
        uniquePaths.add(pathString);
        paths.push({ path: [...currentPath], cost: currentCost });
      }
      return;
    }
    visited.add(currentCity);

    connections.forEach(conn => {
      if (conn.from === currentCity && !visited.has(conn.to)) {
        dfs([...currentPath, conn.to], currentCost + conn.distance);
      }
    });

    visited.delete(currentCity);
  };

  dfs([start], 0);
  return paths;
};

const RomaniaMap = () => {
  const [startCity, setStartCity] = useState(null);
  const [endCity, setEndCity] = useState(null);
  const [path, setPath] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [traversalSteps, setTraversalSteps] = useState([]);
  const [possiblePaths, setPossiblePaths] = useState([]);
  const [highlightedPath, setHighlightedPath] = useState(null);
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false); // New state for disabling buttons

  const handleCityClick = (city) => {
    if (!startCity) {
      setStartCity(city);
    } else if (!endCity && city !== startCity) {
      setEndCity(city);
    }
  };

  const calculateShortestPath = () => {
    if (!startCity || !endCity || isRunning) return;
    setError('');
    setIsRunning(true); // Disable buttons when starting

    const path = aStar(startCity.name, endCity.name);
    if (path) {
      setPath([]);
      let cost = 0;
      const steps = [];
      for (let i = 1; i < path.length; i++) {
        const conn = connections.find(conn => (conn.from === path[i - 1] && conn.to === path[i]) || (conn.from === path[i] && conn.to === path[i - 1]));
        if (conn) {
          cost += conn.distance;
          steps.push(`${path[i - 1]} -> ${path[i]}: Cost is ${conn.distance}`);
        }
      }
      setTraversalSteps([]);
      setTotalCost(0);

      // Simulate traversal with delay
      path.forEach((city, index) => {
        setTimeout(() => {
          setPath((prevPath) => [...prevPath, city]);
        }, index * 1000);
      });
      steps.forEach((step, index) => {
        setTimeout(() => {
          setTraversalSteps((prevSteps) => [...prevSteps, step]);
          setTotalCost((prevCost) => prevCost + parseInt(step.split('Cost is ')[1]));
        }, index * 1000);
      });

      // Calculate all possible paths and highlight the shortest
      const allPaths = findAllPaths(startCity.name, endCity.name);
      setPossiblePaths([]);
      allPaths.forEach((route, index) => {
        setTimeout(() => {
          setPossiblePaths((prevPaths) => [...prevPaths, route]);
          // Highlight the shortest path when all paths are loaded
          if (index === allPaths.length - 1) {
            const shortestPath = allPaths.reduce((min, curr) => (curr.cost < min.cost ? curr : min), allPaths[0]);
            setHighlightedPath(shortestPath.path);
            setIsRunning(false); // Re-enable buttons when finished
          }
        }, (path.length + index) * 1000);
      });
    } else {
      setError('No path found.');
      setIsRunning(false); // Re-enable buttons if no path is found
    }
  };

  const handleRouteClick = (route) => {
    setHighlightedPath(route.path);
  };

  const reset = () => {
    if (isRunning) return; // Prevent reset while running
    setStartCity(null);
    setEndCity(null);
    setPath([]);
    setTotalCost(0);
    setTraversalSteps([]);
    setPossiblePaths([]);
    setHighlightedPath(null);
    setError('');
    setIsRunning(false);
  };

  const getRouteColor = (index) => {
    const colors = ['#FF6347', '#FFD700', '#32CD32', '#1E90FF', '#8A2BE2'];
    return colors[index % colors.length];
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Traveling Salesman Problem - Romania Map</h1>
      </header>
      <div style={styles.content}>
        <div style={styles.mapContainer}>
          <svg width="800" height="500" style={styles.svg}>
            {connections.map((conn, index) => {
              const city1 = cities.find((c) => c.name === conn.from);
              const city2 = cities.find((c) => c.name === conn.to);
              if (city1 && city2) {
                return (
                  <g key={index}>
                    <line
                      x1={city1.x}
                      y1={city1.y}
                      x2={city2.x}
                      y2={city2.y}
                      style={{
                        stroke: highlightedPath && highlightedPath.includes(conn.from) && highlightedPath.includes(conn.to)
                          ? getRouteColor(possiblePaths.findIndex(route => route.path === highlightedPath))
                          : '#555',
                        strokeWidth: highlightedPath && highlightedPath.includes(conn.from) && highlightedPath.includes(conn.to) ? 3 : 2,
                      }}
                    />
                    <text
                      x={((city1.x + city2.x) / 2).toFixed(0)}
                      y={((city1.y + city2.y) / 2).toFixed(0) - 10}
                      style={styles.distanceText}
                    >
                      {conn.distance}
                    </text>
                  </g>
                );
              }
              return null;
            })}
            {cities.map((city, index) => (
              <g key={index} onClick={() => handleCityClick(city)} style={{ cursor: 'pointer' }}>
                <circle
                  cx={city.x}
                  cy={city.y}
                  r="10"
                  style={{
                    fill: startCity === city ? '#32CD32' : endCity === city ? '#FF6347' : path.includes(city.name) ? '#FFD700' : '#1E90FF',
                    stroke: '#FFFFFF',
                    strokeWidth: 2,
                    transition: 'fill 0.3s',
                  }}
                />
                <text x={city.x} y={city.y - 15} style={styles.cityText}>
                  {city.name}
                </text>
              </g>
            ))}
          </svg>
          <div style={styles.buttonContainer}>
            <button
              onClick={calculateShortestPath}
              disabled={!startCity || !endCity || isRunning}
              style={{
                ...styles.startButton,
                ...(isRunning ? styles.buttonDisabled : {}),
              }}
            >
              Start
            </button>
            <button
              onClick={reset}
              disabled={isRunning}
              style={{
                ...styles.resetButton,
                ...(isRunning ? styles.buttonDisabled : {}),
              }}
            >
              Reset
            </button>
          </div>
          {error && <div style={styles.error}>{error}</div>}
        </div>
        <div style={styles.infoContainer}>
          <div style={styles.traversalSection}>
            <h2 style={styles.sectionTitle}>Traversal Steps</h2>
            <ul style={styles.list}>
              {traversalSteps.map((step, index) => (
                <li key={index} style={styles.listItem}>{step}</li>
              ))}
            </ul>
            <h3 style={styles.costTitle}>Total Cost: {totalCost}</h3>
          </div>
          <div style={styles.routesSection}>
            <h2 style={styles.sectionTitle}>Possible Routes</h2>
            <h3 style={styles.subTitle}>"Click the route to view possible routes"</h3>
            <ul style={styles.routesList}>
              {possiblePaths.map((route, index) => (
                <li
                  key={index}
                  onClick={() => handleRouteClick(route)}
                  style={{
                    ...styles.routeItem,
                    color: route.cost === totalCost ? '#FFD700' : '#CCCCCC', // Highlight shortest path in gold
                  }}
                >
                  Route {index + 1}: {route.path.join(' -> ')} - Cost: {route.cost}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Black theme styles with attractive colors for heading and buttons
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#1C2526',
    width: '100vw',
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#121212',
    padding: '10px 0',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  headerTitle: {
    margin: 0,
    fontFamily: 'Arial, sans-serif',
    fontSize: '24px',
    color: '#00FFFF',
    textShadow: '0 0 10px rgba(0, 255, 255, 0.7)',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    overflow: 'hidden',
  },
  mapContainer: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#1C2526',
  },
  svg: {
    border: '1px solid #333',
    borderRadius: '10px',
    backgroundColor: '#2E2E2E',
    overflow: 'hidden',
  },
  distanceText: {
    fill: '#AAAAAA',
    fontSize: '12px',
    pointerEvents: 'none',
    textAnchor: 'middle',
  },
  cityText: {
    fill: '#FFFFFF',
    fontSize: '16px',
    fontWeight: 'bold',
    pointerEvents: 'none',
    textAnchor: 'middle',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px',
  },
  startButton: {
    marginRight: '10px',
    padding: '4px 20px',
    fontSize: '16px',
    backgroundColor: '#FF1493',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
    boxShadow: '0 0 10px rgba(255, 20, 147, 0.5)',
  },
  resetButton: {
    padding: '4px 20px',
    fontSize: '16px',
    backgroundColor: '#00FF7F',
    color: '#000000',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
    boxShadow: '0 0 10px rgba(0, 255, 127, 0.5)',
  },
  buttonDisabled: {
    backgroundColor: '#555555',
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
  error: {
    color: '#FF5555',
    fontSize: '20px',
    margin: '10px',
  },
  infoContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '18px',
    color: '#CCCCCC',
    backgroundColor: '#212121',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
    overflow: 'hidden',
  },
  traversalSection: {
    flex: 1,
    overflowY: 'auto',
    marginBottom: '20px',
  },
  sectionTitle: {
    margin: '0 0 20px',
    fontSize: '24px',
    color: '#FF69B4',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    margin: '5px 0',
  },
  costTitle: {
    margin: '20px 0',
    fontSize: '24px',
    color: '#FFD700',
  },
  routesSection: {
    flex: 1,
    overflowY: 'auto',
  },
  subTitle: {
    margin: '20px 0',
    fontSize: '15px',
    color: '#FF69B4',
  },
  routesList: {
    listStyleType: 'none',
    padding: 0,
    maxHeight: '200px',
    overflowY: 'scroll',
  },
  routeItem: {
    margin: '5px 0',
    cursor: 'pointer',
    transition: 'color 0.3s',
  },
};

// Add hover effects for buttons
styles.startButton[':hover'] = {
  backgroundColor: '#FF69B4',
  transform: 'scale(1.05)',
};

styles.resetButton[':hover'] = {
  backgroundColor: '#7CFC00',
  transform: 'scale(1.05)',
};

export default RomaniaMap;