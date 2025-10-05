import { describe, it, expect } from 'vitest';
import { part1, part2, getInput } from './index';

const exampleInput = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#
`;

describe('2020/03', () => {
	it('part1 should return expected value for example case', async () => {
		const result = part1(exampleInput);
		expect(result).toBe(7);
	});

	it('part1 should return a number', async () => {
		const input = await getInput();
		const result = part1(input);
		expect(result).toBe(211);
	});

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
