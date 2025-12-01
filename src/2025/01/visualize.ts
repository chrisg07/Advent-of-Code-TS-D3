import * as d3 from 'd3';
import { getInput } from './index';

async function getInputBrowser() {
  // Adjust the year and day as needed when copying this template
  // Example: /inputs/2020-01-input.txt
  const year = '2025';
  const day = '01';
  const res = await fetch(`/inputs/${year}-${day}-input.txt`);
  return res.text();
}

async function visualize() {
  // Use getInputBrowser() in browser, getInput() in Node if needed
  const input = typeof window !== 'undefined' ? await getInputBrowser() : await getInput();

  // TODO: Parse input and visualize with D3
  d3.select('#viz').append('div').text('Visualization goes here.');
}

visualize();
