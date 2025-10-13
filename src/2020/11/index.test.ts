import { describe, it, expect } from 'vitest';
import { part1, part2, getInput, calculateRound, calculateRoundPart2 } from './index';

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

const roundThreePartTwo = `#.LL.LL.L#
#LLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLL#
#.LLLLLL.L
#.LLLLL.L#
`

const roundFourPartTwo = `#.L#.##.L#
#L#####.LL
L.#.#..#..
##L#.##.##
#.##.#L.##
#.#####.#L
..#.#.....
LLL####LL#
#.L#####.L
#.L####.L#
`

const roundFivePartTwo = `#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##LL.LL.L#
L.LL.LL.L#
#.LLLLL.LL
..L.L.....
LLLLLLLLL#
#.LLLLL#.L
#.L#LL#.L#
`

const roundSixPartTwo = `#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##L#.#L.L#
L.L#.#L.L#
#.L####.LL
..#.#.....
LLL###LLL#
#.LLLLL#.L
#.L#LL#.L#
`

const roundSevenPartTwo = `#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##L#.#L.L#
L.L#.LL.L#
#.LLLL#.LL
..#.L.....
LLL###LLL#
#.LLLLL#.L
#.L#LL#.L#
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

	it('part 2 should be able to calculate state change for first turn', async () => {
		const result = calculateRoundPart2(exampleInput.trim().split("\n").join(""), 10);
		expect(result).toBe(roundTwo.trim().split("\n").join(""));
	});

	it('part 2 should be able to calculate state change for second turn', async () => {
		const result = calculateRoundPart2(roundTwo.trim().split("\n").join(""), 10);
		expect(result).toBe(roundThreePartTwo.trim().split("\n").join(""));
	});

	it('part 2 should be able to calculate state change for third turn', async () => {
		const result = calculateRoundPart2(roundThreePartTwo.trim().split("\n").join(""), 10);
		expect(result).toBe(roundFourPartTwo.trim().split("\n").join(""));
	});

	it('part 2 should be able to calculate state change for fourth turn', async () => {
		const result = calculateRoundPart2(roundFourPartTwo.trim().split("\n").join(""), 10);
		expect(result).toBe(roundFivePartTwo.trim().split("\n").join(""));
	});

	it('part 2 should be able to calculate state change for fifth turn', async () => {
		const result = calculateRoundPart2(roundFivePartTwo.trim().split("\n").join(""), 10);
		expect(result).toBe(roundSixPartTwo.trim().split("\n").join(""));
	});

	it('part 2 should be able to calculate state change for sixth turn', async () => {
		const result = calculateRoundPart2(roundSixPartTwo.trim().split("\n").join(""), 10);
		expect(result).toBe(roundSevenPartTwo.trim().split("\n").join(""));
	});

	it('part2 should return expected value for example case', async () => {
		const result = part2(exampleInput);
		expect(result).toBe(26);
	});
	
	it('part2 should return a number', async () => {
		const input = await getInput();
		const result = part2(input);
		expect(result).toBe(2124);
	});
});
