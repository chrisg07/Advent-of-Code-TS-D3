import { getInput } from '../../utils';

export function part1(input: string): unknown {
    let answer = 0
	const splitInput = input.trim().split('\n\n')
	
	const rangeStrings = splitInput[0].split('\n')
	const rangesList = rangeStrings.map(range => range.split('-'))
	const ranges = rangesList.map(ranges => ranges.map(Number))
	const leftRanges = ranges.map(range => range[0])
	const rightRanges = ranges.map(range => range[1])

	const ids = splitInput[1].split('\n').map(Number)

	for (let i = 0; i < ids.length; i++) {
		const id = ids[i];

		for (let j = 0; j < leftRanges.length; j++) {
			const left = leftRanges[j]
			const right = rightRanges[j]

			if (id >= left && id <= right) {
				console.log(id, " is fresh");
				answer++
				break
			}
		}
	}
	return answer;
}

export function part2(input: string): unknown {
	// TODO: Implement Part 2 solution
    let answer = 0
	const lines = input.trim().split('\n')

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		
	}
	return answer;
}

// Only run this block in Node.js
if (typeof process !== 'undefined' && process.release && process.release.name === 'node' && typeof require !== 'undefined' && require.main === module) {
  (async () => {
	const { resolve } = await import('node:path');
	const input = await getInput(import.meta.url);
	console.log('Part 1:', part1(input));
	console.log('Part 2:', part2(input));
  })();
}
