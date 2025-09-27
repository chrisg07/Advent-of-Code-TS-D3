import * as d3 from 'd3';
import { part1, findPairWithSum } from './index';

// Use fetch to load input.txt as text
async function getInputBrowser() {
  const res = await fetch('./inputs/2020-01-input.txt');
  return res.text();
}

// Example: visualize the numbers as a bar chart
async function visualize() {
  const input = await getInputBrowser();
  const numbers = input.split('\n').map(Number);

  // Find the pair
  const pair = findPairWithSum(numbers, 2020);

  const svgHeight = 200;
  const svgWidth = 500;
  const barWidth = 20;

  const maxValue = d3.max(numbers) ?? 1;
  const yScale = d3.scaleLinear()
    .domain([0, maxValue])
    .range([svgHeight, 0]);

  const svg = d3.select('#viz')
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight);

  svg.selectAll('rect')
    .data(numbers)
    .enter()
    .append('rect')
    .attr('x', (d, i) => i * (barWidth + 5))
    .attr('y', d => yScale(d))
    .attr('width', barWidth)
    .attr('height', d => svgHeight - yScale(d))
    .attr('fill', d => pair.includes(d) ? 'orange' : 'steelblue'); // Highlight the pair

  // Optionally, add text labels
  svg.selectAll('text')
    .data(numbers)
    .enter()
    .append('text')
    .attr('x', (d, i) => i * (barWidth + 5) + barWidth / 2)
    .attr('y', d => yScale(d) - 5)
    .attr('text-anchor', 'middle')
    .text(d => d)
    .attr('fill', d => pair.includes(d) ? 'orange' : 'black');
}

visualize();