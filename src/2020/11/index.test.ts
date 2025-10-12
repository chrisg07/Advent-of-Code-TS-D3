import { describe, it, expect } from 'vitest';
import { part1, part2, getInput, calculateRound } from './index';

const exampleInput = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL
`;

const roundTwo = `#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##
`

const roundThree = `#.LL.L#.##
#LLLLLL.L#
L.L.L..L..
#LLL.LL.L#
#.LL.LL.LL
#.LLLL#.##
..L.L.....
#LLLLLLLL#
#.LLLLLL.L
#.#LLLL.##
`
describe('2020/11', () => {
	it('should be able to calculate state change for first turn', async () => {
		const result = calculateRound(exampleInput.trim().split("\n").join(""), 10);
		expect(result).toBe(roundTwo.trim().split("\n").join(""));
	});

	it('should be able to calculate state change for second turn', async () => {
		const result = calculateRound(roundTwo.trim().split("\n").join(""), 10);
		expect(result).toBe(roundThree.trim().split("\n").join(""));
	});

	it('part1 should return expected value for example case', async () => {
		const result = part1(exampleInput);
		expect(result).toBe(37);
	});

	it('part1 should return a number', async () => {
		const input = await getInput();
		const result = part1(input);
		expect(result).toBe(2368);
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
