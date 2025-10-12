
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

export type AdapterNode = {
	value: number,
	children: AdapterNode[]
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
