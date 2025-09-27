
import * as d3 from 'd3';
import { findPairWithSum } from './index';

async function getInputBrowser() {
  const res = await fetch('./inputs/2020-01-input.txt');
  return res.text();
}

async function visualize() {
  const input = await getInputBrowser();
  const numbers = input.split('\n').map(Number);
  const pair = findPairWithSum(numbers, 2020);

  // Display numbers in a grid and highlight the pair
  const gridCols = 20; // Adjust for desired columns
  const container = d3.select('#viz')
    .append('div')
    .style('display', 'grid')
    .style('grid-template-columns', `repeat(${gridCols}, 1fr)`)
    .style('gap', '12px')
    .style('margin', '24px 0');

  container.selectAll('div.cell')
    .data(numbers)
    .enter()
    .append('div')
    .attr('class', 'cell')
    .text(d => d)
    .style('display', 'flex')
    .style('align-items', 'center')
    .style('justify-content', 'center')
    .style('height', '40px')
    .style('width', '100%')
    .style('border-radius', '6px')
    .style('background', d => pair.includes(d) ? 'orange' : '#eee')
    .style('color', d => pair.includes(d) ? 'white' : 'black')
    .style('font-weight', d => pair.includes(d) ? 'bold' : 'normal')
    .style('font-size', '1.1em');
}

visualize();