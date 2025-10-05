
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
	input = input.trim()
	let treesEncountered = 0
	const forest = input.split('\n').map(line => line.trim())
	let x = 0
	for (let [y, rowOfTrees] of forest.entries()) {		
		if (y == 0) continue
		x += 3
		const boundedX = x % rowOfTrees.length
		const cell = forest[y].charAt(boundedX);
		console.log(`Position`, x, y, cell)
		if (cell == "#") {
			treesEncountered++
		}
	}
	return treesEncountered;
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
