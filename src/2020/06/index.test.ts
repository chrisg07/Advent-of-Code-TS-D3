import { describe, it, expect } from 'vitest';
import { part1, part2, getInput, parseGroups, createResponseMap, calculateUniqueYeses } from './index';

const exampleInput = `abc

a
b
c

ab
ac

a
a
a
a

b
`;

describe('2020/06', () => {
	it('should parse the correct amount of groups and responses', async () => {
		const result = parseGroups(exampleInput);
		expect(result.length).toBe(5);
		expect(result[0].length).toBe(1)
		expect(result[1].length).toBe(3)
	});

	it('should parse the correct map from a given list of responses', async () => {
		const result = createResponseMap(["abc"]);
		expect(result["a"]).toBe(1);
		expect(result["b"]).toBe(1);
		expect(result["c"]).toBe(1);
	});

	it('should parse the correct number of unique yes responses from a map of responses', async () => {
		const result = calculateUniqueYeses({"a": 1, "b": 1, "c": 1});
		expect(result).toBe(3);
	});

	it('part1 should return expected value for example case', async () => {
		const result = part1(exampleInput);
		expect(result).toBe(11);
	});

	it('part1 should return a number', async () => {
		const input = await getInput();
		const result = part1(input);
		expect(result).toBe(6612);
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
