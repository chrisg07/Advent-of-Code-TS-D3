import { describe, it, expect } from 'vitest';
import { part1, part2, getInput, parseNumList, countIncrementsOf } from './index';

const exampleInput = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3
`;

describe('2020/10', () => {
	it('should count the differences of one in a list of numbers', async () => {
		const numbers = parseNumList(exampleInput)
		let result = countIncrementsOf(numbers, 1);
		expect(result).toBe(22);
		
		result = countIncrementsOf(numbers, 3);
		expect(result).toBe(10);
	});

	it('part1 should return expected value for example case', async () => {
		const result = part1(exampleInput);
		expect(result).toBe(220);
	});

	it('part1 should return a number', async () => {
		const input = await getInput();
		const result = part1(input);
		expect(result).toBe(2030);
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
