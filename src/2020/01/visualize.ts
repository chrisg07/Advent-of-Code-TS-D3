import * as d3 from 'd3';
import { part1, part2 } from './index';

// Use fetch to load input.txt as text
async function getInputBrowser() {
  const res = await fetch('./inputs/2020-01-input.txt');
  return res.text();
}

// Example: visualize the numbers as a bar chart
async function visualize() {
  const input = await getInputBrowser();
  const numbers = input.split('\n').map(Number);

  const svgHeight = 200;
  const svgWidth = 500;

  const svg = d3.select('#viz')
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

  const maxValue = d3.max(numbers) ?? 1;
  const yScale = d3.scaleLinear()
    .domain([0, maxValue])
    .range([svgHeight, 0]);

  svg.selectAll('rect')
    .data(numbers)
    .enter()
    .append('rect')
    .attr('x', (d, i) => i * 30)
    .attr('y', d => yScale(d))
    .attr('width', 20)
    .attr('height', d => svgHeight - yScale(d))
    .attr('fill', 'steelblue');
}

visualize();