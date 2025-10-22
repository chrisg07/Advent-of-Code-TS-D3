import { describe, it, expect } from 'vitest';
import { part1, part2, getInput } from './index';

const exampleInput = `3   4
4   3
2   5
1   3
3   9
3   3
`;

describe('2024/01', () => {
	it('part1 should return expected value for example case', async () => {
		const result = part1(exampleInput);
		expect(result).toBe(11);
	});

	// it('part1 should return a number', async () => {
	// 	const input = await getInput();
	// 	const result = part1(input);
	// 	expect(result).toBe(0);
	// });

	// it('part2 should return expected value for example case', async () => {
	// 	const result = part2(exampleInput);
	// 	expect(result).toBe(0);
	// });
	
	// it('part2 should return a number', async () => {
	// 	const input = await getInput();
	// 	const result = part2(input);
	// 	expect(result).toBe(0);
	// });
});
