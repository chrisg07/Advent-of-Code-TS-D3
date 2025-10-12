
export async function getInput() {
	// @ts-ignore
	if (typeof window !== 'undefined' && typeof fetch === 'function') {
		// Browser: fetch input.txt from same directory
		const res = await fetch('./input.txt');
		return res.text();
	} else {
		// Node.js: use fs/promises
		const { readFile } = await import('fs/promises');
		const path = await import('node:path');
		const inputPath = path.resolve(__dirname, 'input.txt');
		return readFile(inputPath, 'utf-8');
	}
}

export function parseNumList(input: string): number[] {
	return input.trim().split("\n").map(Number)
}

export function countIncrementsOf(numbers: number[], delta: number): number {
	let occurrences = 0
	numbers = [0, ...numbers.sort((a, b) => a - b), numbers[numbers.length - 1] + 3] 
	
	for (let i = 0; i < numbers.length - 1; i++) {
		const first = numbers[i];
		const second = numbers[i + 1]
		
		if (second - first === delta) occurrences++
	}

	return occurrences
}

export function part1(input: string): unknown {
	const numbers = parseNumList(input)
	const spansOfOne = countIncrementsOf(numbers, 1)
	const spansOfThree = countIncrementsOf(numbers, 3)
	return spansOfOne * spansOfThree;
}

export type AdapterNode = {
	value: number,
	children: number[]
}

function getTotalChainsOfTree(node: AdapterNode, nodes: AdapterMap): number {
	let totalChains = 0

	if (node.children.length == 0) totalChains += 1
	for (const child of node.children) {
		const childNode = nodes[child]
		totalChains += getTotalChainsOfTree(childNode!, nodes)
	}

	return totalChains
}

interface AdapterMap {
  [key: number]: AdapterNode;
}

export function part2(input: string): unknown {
	let numbers = parseNumList(input)
	numbers = [0, ...numbers.sort((a, b) => a - b), numbers[numbers.length - 1] + 3] 
	let nodes: AdapterNode[] = numbers.map(num => ({value: num, children: []}))

	for (let node of nodes) {
		let children = []
		if (numbers.includes(node.value + 1)) {
			children.push(node.value + 1)
		}
		if (numbers.includes(node.value + 2)) {
			children.push(node.value + 2)
		}
		if (numbers.includes(node.value + 3)) {
			children.push(node.value + 3)
		}
		node.children = children
	}

	let nodeMap: AdapterMap = {}
	for (const node of nodes) {
		nodeMap[node.value] = node
	}

	const chains =  getTotalChainsOfTree(nodes[0], nodeMap)
	
	return chains;
}

// Only run this block in Node.js
if (typeof process !== 'undefined' && process.release && process.release.name === 'node' && typeof require !== 'undefined' && require.main === module) {
  (async () => {
	const input = await getInput();
	console.log('Part 1:', part1(input));
	console.log('Part 2:', part2(input));
  })();
}
