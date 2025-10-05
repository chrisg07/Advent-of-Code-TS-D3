import * as d3 from 'd3';
import { part1, part2, parseLine, getInput } from './index';

// similar approach to your [src/2020/01/visualize.ts](src/2020/01/visualize.ts)
async function getInputBrowser() {
  // fetch from public inputs (add 2020-02-input.txt to public/inputs/)
  const res = await fetch('./inputs/2020-02-input.txt');
  return res.text();
}

async function visualize() {
  const raw = await getInputBrowser();
  const entries = raw.trim().split('\n').map(l => parseLine(l));

  const container = d3.select('#viz').append('div').style('margin', '16px');

  container.append('h2').text('2020 — Day 02 — Passwords');

  // Table header
  const table = container.append('table').style('border-collapse', 'collapse').style('width', '100%');
  const thead = table.append('thead');
  thead.append('tr')
    .selectAll('th')
    .data(['Policy', 'Char', 'Password', 'Valid (policy1)', 'Valid (policy2)'])
    .enter()
    .append('th')
    .text(d => d)
    .style('text-align', 'left')
    .style('padding', '6px')
    .style('border-bottom', '1px solid #ccc');

  const tbody = table.append('tbody');

  // Render rows
  const rows = tbody.selectAll('tr')
    .data(entries)
    .enter()
    .append('tr')
    .style('background', (d: any, i: number) => i % 2 === 0 ? '#fafafa' : 'white');

  // Policy cell
  rows.append('td')
    .text(d => `${d.min}-${d.max}`)
    .style('padding', '6px')
    .style('border-bottom', '1px solid #eee');

  // Char cell
  rows.append('td')
    .text(d => d.char)
    .style('padding', '6px')
    .style('border-bottom', '1px solid #eee');

  // Password cell
  rows.append('td')
    .text(d => d.password)
    .style('padding', '6px')
    .style('border-bottom', '1px solid #eee')
    .style('font-family', 'monospace');

  // Valid (policy1)
  rows.append('td')
    .text(d => {
      const count = [...d.password].filter((c: string) => c === d.char).length;
      return (count >= d.min && count <= d.max) ? '✔' : '';
    })
    .style('padding', '6px')
    .style('border-bottom', '1px solid #eee')
    .style('color', d => {
      const count = [...d.password].filter((c: string) => c === d.char).length;
      return (count >= d.min && count <= d.max) ? 'green' : 'inherit';
    });

  // Valid (policy2)
  rows.append('td')
    .text(d => {
      const a = d.password[d.min - 1];
      const b = d.password[d.max - 1];
      const valid = (a === d.char) !== (b === d.char);
      return valid ? '✔' : '';
    })
    .style('padding', '6px')
    .style('border-bottom', '1px solid #eee')
    .style('color', d => {
      const a = d.password[d.min - 1];
      const b = d.password[d.max - 1];
      const valid = (a === d.char) !== (b === d.char);
      return valid ? 'green' : 'inherit';
    });

  // Summary
  const valid1 = entries.filter((d: any) => {
    const count = [...d.password].filter((c: string) => c === d.char).length;
    return count >= d.min && count <= d.max;
  }).length;
  const valid2 = entries.filter((d: any) => {
    const a = d.password[d.min - 1];
    const b = d.password[d.max - 1];
    return (a === d.char) !== (b === d.char);
  }).length;

  container.append('div').style('margin-top', '12px').html(`<strong>Valid (policy1):</strong> ${valid1} — <strong>Valid (policy2):</strong> ${valid2}`);
}

visualize();