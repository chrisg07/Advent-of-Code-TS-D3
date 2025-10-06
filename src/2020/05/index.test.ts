import { describe, it, expect } from 'vitest';
import { part1, part2, getInput, calculateBoardingPass, calculateRow, calculateColumn } from './index';

const exampleInput = `123
456
`;

describe('2020/05', () => {
	it('should be able to determine the associated row from a boarding pass', async () => {
		const result = calculateRow("BFFFBBF")
		expect(result).toBe(70)
	});

	it('should be able to determine the associated row from a boarding pass', async () => {
		const result = calculateColumn("RRR")
		expect(result).toBe(7)
	});

	it('should be able to determine the associated row and column from a boarding pass', async () => {
		const result = calculateBoardingPass("BFFFBBFRRR")
		expect(result.row).toBe(70)
		expect(result.column).toBe(7)
		expect(result.seatID).toBe(567)
	});

	it('should be able to determine the associated row and column from a boarding pass', async () => {
		const result = calculateBoardingPass("FFFBBBFRRR")
		expect(result.row).toBe(14)
		expect(result.column).toBe(7)
		expect(result.seatID).toBe(119)
	});

	// it('part1 should return expected value for example case', async () => {
	// 	const result = part1(exampleInput);
	// 	expect(result).toBe(0);
	// });

	it('part1 should return a number', async () => {
		const input = await getInput();
		const result = part1(input);
		expect(result).toBe(928);
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
