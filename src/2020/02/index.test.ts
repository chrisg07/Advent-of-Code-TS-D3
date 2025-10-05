import { describe, it, expect } from 'vitest';
import { part1, part2, getInput, parseLine, validatePassword, validatePasswordPart2 } from './index';

const exampleInput = 
`1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc
`;

describe('2020/02', () => {
	it('should be able to parse line of input', async () => {
		const result = parseLine('1-3 a: abcde');
		expect(result).toEqual({ min: 1, max: 3, char: 'a', password: 'abcde' });
	});

	it('should be able to determine a valid password meets the requirements', async () => {
		const result = validatePassword({ min: 1, max: 3, char: 'a', password: 'abcde' });
		expect(result).toEqual(true);
	});

	it('should be able to determine an invalid password does not meet the requirements', async () => {
		const password = parseLine('1-3 b: cdefg');
		const result = validatePassword(password)
		expect(result).toEqual(false);
	});

	it('part1 should return expected value for example case', async () => {
		const result = part1(exampleInput);
		expect(result).toBe(2);
	});

	it('part1 should return a number', async () => {
		const input = await getInput();
		const result = part1(input);
		expect(result).toBe(465);
	});

	it('should report the password "1-3 a: abcde" as valid', async () => {
		const password = parseLine('1-3 a: abcde');
		const result = validatePasswordPart2(password)
		expect(result).toBe(true)
	})
	
	it('should report the password "1-3 b: cdefg" as invalid', async () => {
		const password = parseLine('1-3 b: cdefg');
		const result = validatePasswordPart2(password)
		expect(result).toBe(false)
	})

	it('should report the password "2-9 c: ccccccccc" as invalid', async () => {
		const password = parseLine('2-9 c: ccccccccc');
		const result = validatePasswordPart2(password)
		expect(result).toBe(false)
	})

	it('part2 should return expected value for example case', async () => {
		const result = part2(exampleInput);
		expect(result).toBe(1);
	});
	
	it('part2 should return a number', async () => {
		const input = await getInput();
		const result = part2(input);
		expect(result).toBe(294);
	});
});
