import { describe, it, expect } from 'vitest';
import { part1, part2 } from './index';
import { getInput } from 'src/utils';

const exampleInput = `123
456
`;

describe('2025/05', () => {
	it('part1 should return expected value for example case', async () => {
		const result = part1(exampleInput);
		expect(result).toBe(0);
	});

	it('part1 should return a number', async () => {
		const input = await getInput(import.meta.url);
		const result = part1(input);
		expect(result).toBe(0);
	});

	it('part2 should return expected value for example case', async () => {
		const result = part2(exampleInput);
		expect(result).toBe(0);
	});
	
	it('part2 should return a number', async () => {
		const input = await getInput(import.meta.url);
		const result = part2(input);
		expect(result).toBe(0);
	});
});
