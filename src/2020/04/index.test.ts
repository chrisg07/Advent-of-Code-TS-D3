import { describe, it, expect } from 'vitest';
import { part1, part2, getInput, parsePassports, parsePairs } from './index';

const exampleInput = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in
`;

describe('2020/04', () => {
	it('should parse passports', async () => {
		const result = parsePassports(exampleInput);
		expect(result.length).toBe(4);
	});

	it('should parse pairs', async () => {
		const result = parsePassports(exampleInput);
		expect(result[0].pairs.length).toBe(8);
		expect(result[2].pairs.length).toBe(7);
	});

	it('part1 should return expected value for example case', async () => {
		const result = part1(exampleInput);
		expect(result).toBe(2);
	});

	it('part1 should return a number', async () => {
		const input = await getInput();
		const result = part1(input);
		expect(result).toBe(0);
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
