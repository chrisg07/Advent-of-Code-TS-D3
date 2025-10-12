import { describe, it, expect } from 'vitest';
import { part1, part2, getInput, parseSumPairPermutations, sumList } from './index';

const exampleInput = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576
`;

describe('2020/09', () => {
	it('should calculate the permutations of sums of pairs from a set of numbers', async () => {
		const result = parseSumPairPermutations([35, 20, 15, 25, 47]);
		expect(result.includes(55)).toBe(true)
		expect(result.includes(50)).toBe(true)
		expect(result.includes(60)).toBe(true)
		expect(result.includes(72)).toBe(true)
		expect(result.includes(40)).toBe(true)
		expect(result.includes(62)).toBe(true)
	});

	it('part1 should return expected value for example case', async () => {
		const result = part1(exampleInput, 5);
		expect(result).toBe(127);
	});

	it('part1 should return a number', async () => {
		const input = await getInput();
		const result = part1(input, 25);
		expect(result).toBe(85848519);
	});

	it('should calculate the total sum of a list of numbers', async () => {
		const result = sumList([15, 25, 47, 40]);
		expect(result).toBe(127)
	});

	it('part2 should return expected value for example case', async () => {
		const result = part2(exampleInput, 5);
		expect(result).toBe(62);
	});
	
	it('part2 should return a number', async () => {
		const input = await getInput();
		const result = part2(input, 25);
		expect(result).toBe(13414198);
	});
});
