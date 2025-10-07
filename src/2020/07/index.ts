
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

type BagNode = {
	value: string,
	children: {value: string, weight: number}[]
}

export  function parseNode(line: string): BagNode {
	const lineParts = line.split("contain")
	const color = lineParts[0].substring(0, lineParts[0].length - 6)
	
	if (line.includes("no other bags")) {
		return {
			value: color,
			children: []
		}
	}

	const children: {value: string, weight: number}[] = []
	const childLineParts = lineParts[1].split(",").map(part => part.trim())
	for (const childPart of childLineParts) {
		const childNodeBag = {
			value: childPart.split("bag")[0].substring(2).trim(),
			weight: [childPart.substring(0, 1)].map(Number)[0]
		}
		children.push(childNodeBag)
	}

	return {
		value: color,
		children: children
	}
}

interface BagMap {
  [key: string]: BagNode;
}

function parseNodes(input: string): BagMap {
	const bagMap: BagMap = {}

	const lines = input.split("\n")
	for (const line of lines) {
		const node = parseNode(line)
		bagMap[node.value] = node
	}

	return bagMap
} 

let nodes: BagMap = {}

function treeContainsShinyGold(node: BagNode): boolean {
	if (node.children.length == 0) {
		return false
	}

	if (node.value == "shiny gold") return true
	
	for (const child of node.children) {
		if (treeContainsShinyGold(nodes[child.value])) return true
	}
	return false
}

export function part1(input: string): unknown {
	nodes = parseNodes(input.trim())

	let subTreesThatIncludeShinyGoldBag = 0
	for (const [key, value] of Object.entries(nodes)) {
		if (treeContainsShinyGold(nodes[value.value])) {
			subTreesThatIncludeShinyGoldBag++
		}
	}

	return subTreesThatIncludeShinyGoldBag - 1
}

function getTotalBagsOfTree(node: BagNode): number {
	let totalBags = 1
	if (node.children.length == 0) return 1
	for (const child of node.children) {
		totalBags += getTotalBagsOfTree(nodes[child.value]) * child.weight
	}
	return totalBags
}

export function part2(input: string): unknown {
	nodes = parseNodes(input.trim())
	let totalBags = getTotalBagsOfTree(nodes["shiny gold"])
	return totalBags - 1
}

// Only run this block in Node.js
if (typeof process !== 'undefined' && process.release && process.release.name === 'node' && typeof require !== 'undefined' && require.main === module) {
  (async () => {
	const input = await getInput();
	console.log('Part 1:', part1(input));
	console.log('Part 2:', part2(input));
  })();
}
