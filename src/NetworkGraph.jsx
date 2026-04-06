// src/NetworkGraph.jsx
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const NetworkGraph = ({ data, onNodeClick }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data) return;

    const width = 700;
    const height = 600;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "#0d0d12")
      .style("border", "1px solid #333")
      .style("border-radius", "12px");

    const simulation = d3.forceSimulation(data.nodes)
      .force("link", d3.forceLink(data.links).id(d => d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-500))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius(d => d.radius + 10));

    // Links
    const link = svg.append("g")
      .attr("stroke", "#444")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke-width", 2);

    // Nodes
    const node = svg.append("g")
      .selectAll("circle")
      .data(data.nodes)
      .join("circle")
      .attr("r", d => d.radius)
      .attr("fill", d => d.color)
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .style("cursor", "pointer")
      .call(drag(simulation));

    // Hover & Click Interaction
    node.on("mouseover", function(event, d) {
      d3.select(this).attr("stroke-width", 4).attr("stroke", "#fff");
    })
    .on("mouseout", function(event, d) {
      d3.select(this).attr("stroke-width", 1.5).attr("stroke", "#fff");
    })
    .on("click", (event, d) => {
      onNodeClick(d); // Pass data to App.jsx
    });

    // Labels
    const labels = svg.append("g")
      .selectAll("text")
      .data(data.nodes)
      .join("text")
      .text(d => d.id)
      .attr("font-size", "12px")
      .attr("fill", "#e0e0e0")
      .attr("dx", d => d.radius + 5)
      .attr("dy", 4)
      .style("pointer-events", "none");

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
      node.attr("cx", d => d.x).attr("cy", d => d.y);
      labels.attr("x", d => d.x).attr("y", d => d.y);
    });

    function drag(simulation) {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }
      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }
      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }
      return d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended);
    }
  }, [data, onNodeClick]);

  return <svg ref={svgRef}></svg>;
};

export default NetworkGraph;