import { describe, it, expect } from 'vitest';
import { part1, part2 } from './index';
import { getInput } from 'src/utils/utils';

const exampleInput = `3-5
10-14
16-20
12-18
20-20

1
5
8
11
17
32
`;

describe('2025/05', () => {
	it('part1 should return expected value for example case', async () => {
		const result = part1(exampleInput);
		expect(result).toBe(3);
	});

	it('part1 should return a number', async () => {
		const input = await getInput(import.meta.url);
		const result = part1(input);
		expect(result).toBe(643);
	});

	it('part2 should return expected value for example case', async () => {
		const result = part2(exampleInput);
		expect(result).toBe(14);
	});
	
	it('part2 should return a number', async () => {
		const input = await getInput(import.meta.url);
		const result = part2(input);
		expect(result).toBeLessThan(342018167474534);
		expect(result).not.toBe(342018167474518)
		expect(result).not.toBe(342018167474530)
		expect(result).toBe(342018167474526);
	});
});
