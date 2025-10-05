import * as d3 from 'd3';
import { part1, part2, getInput } from './index';

async function getInputBrowser() {
  const res = await fetch('./inputs/2020-03-input.txt');
  return res.text();
}

async function visualize() {
  const raw = await getInputBrowser();

  const container = d3.select('#viz').append('div').style('margin', '16px');

  container.append('h2').text('2020 — Day 03 — Toboggan Trajectory');
}


visualize();