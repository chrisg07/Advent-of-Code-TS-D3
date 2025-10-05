import * as d3 from 'd3';



async function getInputBrowser() {
  const res = await fetch('/inputs/2020-03-input.txt');
  return res.text();
}

function parseMap(input: string): string[][] {
  return input.trim().split('\n').map(line => line.split(''));
}

function getPath(map: string[][], right: number, down: number) {
  const path: { row: number, col: number, isTree: boolean }[] = [];
  let col = 0;
  for (let row = 0; row < map.length; row += down) {
    const cell = map[row][col % map[0].length];
    path.push({ row, col: col % map[0].length, isTree: cell === '#' });
    col += right;
  }
  return path;
}

async function visualize() {
  const raw = await getInputBrowser();
  const map = parseMap(raw);
  const path = getPath(map, 3, 1); // Default slope

  const cellSize = 20;
  const width = map[0].length * cellSize;
  const height = map.length * cellSize;

  const svg = d3.select('#viz')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  // Draw map
  svg.selectAll('rect.cell')
    .data(map.flatMap((row, r) => row.map((cell, c) => ({ r, c, cell }))))
    .enter()
    .append('rect')
    .attr('class', 'cell')
    .attr('x', d => d.c * cellSize)
    .attr('y', d => d.r * cellSize)
    .attr('width', cellSize)
    .attr('height', cellSize)
    .attr('fill', d => d.cell === '#' ? '#444' : '#eee')
    .attr('stroke', '#ccc');

  // Animate path
  let i = 0;
  function step() {
    if (i >= path.length) return;
    const { row, col, isTree } = path[i];
    svg.append('circle')
      .attr('cx', col * cellSize + cellSize / 2)
      .attr('cy', row * cellSize + cellSize / 2)
      .attr('r', cellSize / 3)
      .attr('fill', isTree ? 'red' : 'lime')
      .attr('opacity', 0.7);
    i++;
    setTimeout(step, 200);
  }
  step();
}

visualize();