import { describe, it, expect } from 'vitest';
import { part1, part2, getInput } from './index';

const exampleInput = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6
`;

describe('2020/08', () => {
	it('part1 should return expected value for example case', async () => {
		const result = part1(exampleInput);
		expect(result).toBe(5);
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
