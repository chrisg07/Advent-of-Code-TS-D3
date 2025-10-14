import { describe, it, expect } from 'vitest';
import { part1, part2, getInput } from './index';

const exampleInput = `F10
N3
F7
R90
F11
`;

describe('2020/12', () => {
	it('part1 should return expected value for example case', async () => {
		const result = part1(exampleInput);
		expect(result).toBe(25);
	});

	it('part1 should return a number', async () => {
		const input = await getInput();
		const result = part1(input);
		expect(result).toBe(1687);
	});

	it('part2 should return expected value for example case', async () => {
		const result = part2(exampleInput);
		expect(result).toBe(286);
	});
	
	it('part2 should return a number', async () => {
		const input = await getInput();
		const result = part2(input);
		expect(result).toBe(20873);
	});
});
