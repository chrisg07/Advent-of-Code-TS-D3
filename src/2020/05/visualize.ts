import * as d3 from 'd3';
import { getInput, part2 } from './index';

async function getInputBrowser() {
  // Adjust the year and day as needed when copying this template
  // Example: /inputs/2020-01-input.txt
  const year = '2020';
  const day = '05';
  const res = await fetch(`/inputs/${year}-${day}-input.txt`);
  return res.text();
}

async function visualize() {
  // Use getInputBrowser() in browser, getInput() in Node if needed
  const input = typeof window !== 'undefined' ? await getInputBrowser() : await getInput();

  // TODO: Parse input and visualize with D3
  d3.select('#viz').append('div').text('Visualization goes here.');

  const passes = part2(input)
  const cellSize = 20;
  const width = 8 * cellSize;
  const height = 128 * cellSize;

  
  const svg = d3.select('#viz')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // Draw map
  svg.selectAll('rect.cell')
    .data(passes)
    .enter()
    .append('rect')
    .attr('class', 'cell')
    .attr('x', d => d.column * cellSize)
    .attr('y', d => d.row * cellSize)
    .attr('width', cellSize)
    .attr('height', cellSize)
    .attr('fill', d => d.cell === '#' ? '#444' : '#eee')
    .attr('stroke', '#ccc')
    .append('title')
    .text(d => `Row: ${d.row}, Col: ${d.column}, Seat ID: ${d.seatID}`);
}

visualize();
