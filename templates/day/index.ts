import { getInput } from '../../utils';

export function part1(input: string): unknown {
	// TODO: Implement Part 1 solution
	const lines = input.trim().split('\n')

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		
	}
	return input.length;
}

export function part2(input: string): unknown {
	// TODO: Implement Part 2 solution
	const lines = input.trim().split('\n')

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		
	}
	return input.length;
}

// Only run this block in Node.js
if (typeof process !== 'undefined' && process.release && process.release.name === 'node' && typeof require !== 'undefined' && require.main === module) {
  (async () => {
	const { resolve } = await import('node:path');
	const input = await getInput();
	console.log('Part 1:', part1(input));
	console.log('Part 2:', part2(input));
  })();
}
