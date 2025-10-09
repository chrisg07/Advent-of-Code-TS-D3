import { describe, it, expect } from 'vitest';
import { part1, part2, getInput, parseInstructions } from './index';

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
	it('should parse an instruction from the input', async () => {
		const result = parseInstructions(exampleInput);
		expect(result[0]).toEqual({command: "nop", value: 0});
		expect(result[1]).toEqual({command: "acc", value: 1});
		expect(result[2]).toEqual({command: "jmp", value: 4});
	});
	
	it('part1 should return expected value for example case', async () => {
		const result = part1(exampleInput);
		expect(result).toBe(5);
	});

	it('part1 should return a number', async () => {
		const input = await getInput();
		const result = part1(input);
		expect(result).toBe(1384);
	});

	it('part2 should return expected value for example case', async () => {
		const result = part2(exampleInput);
		expect(result).toBe(8);
	});
	
	it('part2 should return a number', async () => {
		const input = await getInput();
		const result = part2(input);
		expect(result).toBe(761);
	});
});
