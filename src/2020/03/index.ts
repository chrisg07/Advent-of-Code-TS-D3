
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

function calculateTreesOnSlope(forest, deltaX, deltaY): number {
	let treesEncountered = 0
	let x = 0
	for (let y = 0; y < forest.length; y += deltaY) {		
		if (y == 0) continue
		x += deltaX
		const rowOfTrees = forest[y]
		const boundedX = x % rowOfTrees.length
		const cell = forest[y].charAt(boundedX);
		console.log(`Position`, x, y, cell)
		if (cell == "#") {
			treesEncountered++
		}
	}
	return treesEncountered
}

export function part1(input: string): unknown {
	input = input.trim()
	const forest = input.split('\n').map(line => line.trim())
	return calculateTreesOnSlope(forest, 3, 1)
}

export function part2(input: string): unknown {
	// TODO: Implement Part 2 solution
	return input.length;
}

// Only run this block in Node.js
if (typeof process !== 'undefined' && process.release && process.release.name === 'node' && typeof require !== 'undefined' && require.main === module) {
  (async () => {
	const input = await getInput();
	console.log('Part 1:', part1(input));
	console.log('Part 2:', part2(input));
  })();
}
