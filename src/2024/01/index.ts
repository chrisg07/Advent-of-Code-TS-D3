
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

export function part1(input: string): unknown {
	const lines = input.trim().split('\n')
	let left = []
	let right = []

	for (const line of lines) {
		const parts = line.split("   ")
		const leftPart = [parts[0].trim()].map(Number)[0]
		left.push(leftPart)
		const rightPart = [parts[1].trim()].map(Number)[0]
		right.push(rightPart)
	}
	left = left.sort((a, b) => a - b)
	right = right.sort((a, b) => a - b)

	let totalDelta = 0
	for (let i = 0; i < left.length; i++) {
		const leftVal = left[i];
		const rightVal = right[i];
		const delta = Math.abs(leftVal - rightVal)
		
		totalDelta += delta
	}
	
	return totalDelta;
}

interface FrequencyMap {
  [key: number]: number;
}

export function part2(input: string): unknown {
	const lines = input.trim().split('\n')
	let left = []
	let right: FrequencyMap = {}

	for (const line of lines) {
		const parts = line.split("   ")
		const leftPart = [parts[0].trim()].map(Number)[0]
		left.push(leftPart)
		const rightPart = [parts[1].trim()].map(Number)[0]
		
		if (right[rightPart]) right[rightPart]++
		else right[rightPart] = 1
	}

	let totalDelta = 0
	for (let i = 0; i < left.length; i++) {
		const leftVal = left[i];
		
		if (right[leftVal]) totalDelta += leftVal * right[leftVal]
	}
	
	return totalDelta;
}

// Only run this block in Node.js
if (typeof process !== 'undefined' && process.release && process.release.name === 'node' && typeof require !== 'undefined' && require.main === module) {
  (async () => {
	const input = await getInput();
	console.log('Part 1:', part1(input));
	console.log('Part 2:', part2(input));
  })();
}
