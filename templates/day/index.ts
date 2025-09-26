

import { readFile } from 'fs/promises';
import path from 'node:path';

export async function getInput() {
	const inputPath = path.resolve(__dirname, 'input.txt');
	return readFile(inputPath, 'utf-8');
}

export function part1(input: string): unknown {
	// TODO: Implement Part 1 solution
	return input;
}

export function part2(input: string): unknown {
	// TODO: Implement Part 2 solution
	return input;
}

if (require.main === module) {
	(async () => {
		const input = await getInput();
		console.log('Part 1:', part1(input));
		console.log('Part 2:', part2(input));
	})();
}
