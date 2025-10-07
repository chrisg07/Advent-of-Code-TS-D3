import * as d3 from 'd3';
import { getInput } from './index';

async function getInputBrowser() {
  // Adjust the year and day as needed when copying this template
  // Example: /inputs/2020-01-input.txt
  const year = '2020';
  const day = '07';
  const res = await fetch(`/inputs/${year}-${day}-input.txt`);
  return (await res.text()).trim();
}


import { parseNodes } from './index';

async function visualize() {
  const input = typeof window !== 'undefined' ? await getInputBrowser() : await getInput();
  const bagMap = parseNodes(input);
  function toD3(node) {
    return {
      name: node.value,
      children: node.children.map(child => toD3(bagMap[child.value]))
    };
  }
  const data = toD3(bagMap['shiny gold']);

  // ObservableHQ collapsible tree pattern
  const width = 928;
  const marginTop = 10;
  const marginRight = 10;
  const marginBottom = 10;
  const marginLeft = 40;

  const root = d3.hierarchy<any>(data);
  const dx = 10;
  const dy = (width - marginRight - marginLeft) / (1 + root.height);
  const tree = d3.tree<any>().nodeSize([dx, dy]);
  const diagonal = d3.linkHorizontal<any, any>().x((d: any) => d.y).y((d: any) => d.x);

  // Remove any previous SVG
  d3.select('#viz').selectAll('svg').remove();

  const svg = d3.select('#viz')
    .append('svg')
    .attr('width', width)
    .attr('height', dx)
    .attr('viewBox', [-marginLeft, -marginTop, width, dx])
    .attr('style', 'max-width: 100%; height: auto; font: 10px sans-serif; user-select: none;');

  const gLink = svg.append('g')
    .attr('fill', 'none')
    .attr('stroke', '#555')
    .attr('stroke-opacity', 0.4)
    .attr('stroke-width', 1.5);

  const gNode = svg.append('g')
    .attr('cursor', 'pointer')
    .attr('pointer-events', 'all');

  root.x0 = dy / 2;
  root.y0 = 0;
  root.descendants().forEach((d: any, i: number) => {
    d.id = i;
    d._children = d.children;
    if (d.depth && d.data.name.length !== 7) d.children = null;
  });

  function update(event: any, source: any) {
    const duration = event?.altKey ? 2500 : 250;
    const nodes = root.descendants().reverse();
    const links = root.links();
    tree(root);

    let left = root;
    let right = root;
    root.eachBefore((node: any) => {
      if (node.x < left.x) left = node;
      if (node.x > right.x) right = node;
    });

    const height = right.x - left.x + marginTop + marginBottom;

    const transition = svg.transition()
      .duration(duration)
      .attr('height', height)
      .attr('viewBox', [-marginLeft, left.x - marginTop, width, height])
      .tween('resize', (window as any).ResizeObserver ? null : () => () => svg.dispatch('toggle'));

    // Update the nodes…
    const node = gNode.selectAll('g')
      .data(nodes, (d: any) => d.id);

    // Enter any new nodes at the parent's previous position.
    const nodeEnter = node.enter().append('g')
      .attr('transform', (d: any) => `translate(${source.y0},${source.x0})`)
      .attr('fill-opacity', 0)
      .attr('stroke-opacity', 0)
      .on('click', (event: any, d: any) => {
        d.children = d.children ? null : d._children;
        update(event, d);
      });

    nodeEnter.append('circle')
      .attr('r', 2.5)
      .attr('fill', (d: any) => d._children ? '#555' : '#999')
      .attr('stroke-width', 10);

    nodeEnter.append('text')
      .attr('dy', '0.31em')
      .attr('x', (d: any) => d._children ? -6 : 6)
      .attr('text-anchor', (d: any) => d._children ? 'end' : 'start')
      .text((d: any) => d.data.name)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-width', 3)
      .attr('stroke', 'white')
      .attr('paint-order', 'stroke');

    // Transition nodes to their new position.
    const nodeUpdate = node.merge(nodeEnter).transition(transition)
      .attr('transform', (d: any) => `translate(${d.y},${d.x})`)
      .attr('fill-opacity', 1)
      .attr('stroke-opacity', 1);

    // Transition exiting nodes to the parent's new position.
    const nodeExit = node.exit().transition(transition).remove()
      .attr('transform', (d: any) => `translate(${source.y},${source.x})`)
      .attr('fill-opacity', 0)
      .attr('stroke-opacity', 0);

    // Update the links…
    const link = gLink.selectAll('path')
      .data(links, (d: any) => d.target.id);

    // Enter any new links at the parent's previous position.
    const linkEnter = link.enter().append('path')
      .attr('d', (d: any) => {
        const o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      });

    // Transition links to their new position.
    link.merge(linkEnter).transition(transition)
      .attr('d', diagonal);

    // Transition exiting links to the parent's new position.
    link.exit().transition(transition).remove()
      .attr('d', (d: any) => {
        const o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
      });

    // Stash the old positions for transition.
    root.eachBefore((d: any) => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

  update(null, root);
}

visualize();
