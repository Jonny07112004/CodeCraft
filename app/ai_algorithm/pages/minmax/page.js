import React from "react";
import * as d3 from "d3";

const MinimaxTree = () => {
  React.useEffect(() => {
    const data = {
      name: "Root",
      children: [
        {
          name: "A",
          children: [
            { name: "C", children: [{ name: "C1" }, { name: "C2" }] },
            { name: "D", children: [{ name: "D1" }, { name: "D2" }] },
          ],
        },
        {
          name: "B",
          children: [
            { name: "E", children: [{ name: "E1" }, { name: "E2" }] },
            { name: "F", children: [{ name: "F1" }, { name: "F2" }] },
          ],
        },
      ],
    };

    const width = 900;
    const height = 500;
    const treeLayout = d3.tree().size([width, height - 100]);
    const root = d3.hierarchy(data);
    treeLayout(root);

    d3.select("#tree-container").select("svg").remove(); // Clear previous SVG

    const svg = d3
      .select("#tree-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(50, 50)");

    const linkGenerator = d3.linkVertical().x((d) => d.x).y((d) => d.y);
    
    svg
      .selectAll(".link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", linkGenerator)
      .attr("fill", "none")
      .attr("stroke", "#555");

    const nodes = svg
      .selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    nodes
      .append("circle")
      .attr("r", 15)
      .attr("fill", "#69b3a2");

    nodes
      .append("text")
      .attr("dy", "0.35em")
      .attr("x", (d) => (d.children ? -30 : 30))
      .attr("text-anchor", (d) => (d.children ? "end" : "start"))
      .text((d) => d.data.name)
      .style("font-size", "12px")
      .style("fill", "black");
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Minimax Algorithm with Alpha-Beta Pruning</h1>
      <div>
        <button>Start</button>
        <label>
          <input type="checkbox" /> Alpha-Beta Pruning
        </label>
      </div>
      <div id="tree-container"></div>
    </div>
  );
};

export default MinimaxTree;
