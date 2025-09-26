

import { readFile } from 'fs/promises';
import path from 'node:path';

export async function getInput() {
	const inputPath = path.resolve(__dirname, 'input.txt');
	return readFile(inputPath, 'utf-8');
}

export function findPairWithSum(input: number[], targetSum: number): number[] {
	for (let i = 0; i < input.length; i++) {
		for (let j = i + 1; j < input.length; j++) {
			if (input[i] + input[j] === targetSum) {
				return [input[i], input[j]];
			}
		}
	}
	return [];
}

export function part1(input: string): unknown {
	const numbers = input.split('\n').map(Number);
	const pair = findPairWithSum(numbers, 2020);
	if (pair.length === 2) {
		return pair[0] * pair[1];
	}
	return -1;
}

export function part2(input: string): unknown {
	// TODO: Implement Part 2 solution
	return input.length;
}

if (require.main === module) {
	(async () => {
		const input = await getInput();
		console.log('Part 1:', part1(input));
		console.log('Part 2:', part2(input));
	})();
}
