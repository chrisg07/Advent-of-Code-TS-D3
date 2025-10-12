
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

export function parseSumPairPermutations(values: number[]): number[] {
	let sums = []

	for (let index = 0; index < values.length - 1; index++) {
		const first = values[index];
		
		for (let j = 1; j < values.length; j++) {
			const second = values[j];
			sums.push(first + second)
		}
	}

	return sums
}

export function part1(input: string, preambleLength: number): unknown {
	const nums = input.trim().split('\n').map(Number)

	for (let i = preambleLength; i < nums.length; i++) {
		let sums = parseSumPairPermutations(nums.slice(i - preambleLength, i))
		const element = nums[i];
		
		if (!sums.includes(element)) {
			return element
		}
	}

	return -1;
}

export function sumList(list: number[]): number {
	return list.reduce((a, b) => a + b)
}

export function part2(input: string, preambleLength: number): number {
	const nums = input.trim().split('\n').map(Number)

	let needle = 0
	for (let i = preambleLength; i < nums.length; i++) {
		let sums = parseSumPairPermutations(nums.slice(i - preambleLength, i))
		const element = nums[i];
		
		if (!sums.includes(element)) {
			needle = element
			break
		}
	}

	let range = nums.slice(0, 2)

	for (let i = 0; i < nums.length - 3; i++) {
		for (let j = i + 2; j < nums.length - 1; j++) {
			range = nums.slice(i, j)
			if (sumList(range) == needle) break
			if (sumList(range) > needle) break
		}
		if (sumList(range) == needle) break
		if (sumList(range) > needle) continue
	}

	range = range.sort()
	return range[0] + range[range.length - 1];
}

// Only run this block in Node.js
if (typeof process !== 'undefined' && process.release && process.release.name === 'node' && typeof require !== 'undefined' && require.main === module) {
  (async () => {
	const input = await getInput();
	console.log('Part 1:', part1(input));
	console.log('Part 2:', part2(input));
  })();
}
