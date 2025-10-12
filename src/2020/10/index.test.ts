import { describe, it, expect } from 'vitest';
import { part1, part2, getInput } from './index';

const exampleInput = `16
10
15
5
1
11
7
19
6
12
4
`;

describe('2020/10', () => {
	it('part1 should return expected value for example case', async () => {
		const result = part1(exampleInput);
		expect(result).toBe(220);
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
