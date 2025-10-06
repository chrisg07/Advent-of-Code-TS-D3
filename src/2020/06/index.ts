
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

export function parseGroups(input: string): string[][] {
	const chunks = input.split(/\r?\n\r?\n/).map(chunk => chunk.trim())
	const responses = chunks.map(chunk => chunk.split(/\n/)).map(responses => responses.map(response => response.trim()))
	return responses
}

interface NumericalValueHashmap {
  [key: string]: number;
}

export function createResponseMap(responses: string[]): NumericalValueHashmap {
	const map: NumericalValueHashmap = {}

	for (const response of responses) {
		for (const char of response) {
			if (map[char] != undefined) {
				map[char]++
			} else {
				map[char] = 1
			}
		}
	}

	return map
}

export function calculateUniqueYeses(map: NumericalValueHashmap): number {
	const uniqueYeses = Object.keys(map).length
	return uniqueYeses
}

export function part1(input: string): unknown {
	const responses = parseGroups(input)
	const responseMaps = responses.map(responses => createResponseMap(responses))
	
	let score = 0
	for (const response of responseMaps) {
		const yeses = calculateUniqueYeses(response)
		score += yeses
	}
 	return score;
}

export function calculateConsensus(map: NumericalValueHashmap, numResponses: number): number {
	let timesConsensusReached = 0
	for (const [key, value] of Object.entries(map)) {
		if (value === numResponses) {
			timesConsensusReached++
		}
 	}
	return timesConsensusReached
}

export function part2(input: string): unknown {
	const responses = parseGroups(input)
	const responseMaps = responses.map(responses => createResponseMap(responses))
	
	let score = 0
	for (const [index, value] of responseMaps.entries()) {
		const consensusReached = calculateConsensus(value, responses[index].length)
		score += consensusReached
	}
 	return score;
}

// Only run this block in Node.js
if (typeof process !== 'undefined' && process.release && process.release.name === 'node' && typeof require !== 'undefined' && require.main === module) {
  (async () => {
	const input = await getInput();
	console.log('Part 1:', part1(input));
	console.log('Part 2:', part2(input));
  })();
}
