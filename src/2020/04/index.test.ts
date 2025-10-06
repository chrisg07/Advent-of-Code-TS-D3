import { describe, it, expect } from 'vitest';
import { part1, part2, getInput, parsePassports, validateBirthYear, validateIssueYear, validateExpirationYear, validateHairColor, validateHeight, validateEyeColor, validatePassportID } from './index';

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

const examplePart2Input = `pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719
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
		expect(result).toBe(242);
	});

	it('should correctly validate a valid birth year', async () => {
		const result = validateBirthYear({pairs: ["byr:1980"]});
		expect(result).toBeTruthy();
	});

	it('should correctly validate a valid issue year', async () => {
		const result = validateIssueYear({pairs: ["iyr:2012"]});
		expect(result).toBeTruthy();
	});

	it('should correctly validate a valid expiration year', async () => {
		const result = validateExpirationYear({pairs: ["eyr:2030"]});
		expect(result).toBeTruthy();
	});

	it('should correctly validate a valid height in centimeters', async () => {
		const result = validateHeight({pairs: ["hgt:165cm"]});
		expect(result).toBeTruthy();
	});
	
	it('should correctly validate a valid hair color', async () => {
		const result = validateHairColor({pairs: ["hcl:#623a2f"]});
		expect(result).toBeTruthy();
	});

	it('should correctly validate a valid eye color', async () => {
		const result = validateEyeColor({pairs: ["ecl:grn"]});
		expect(result).toBeTruthy();
	});

	it('should correctly validate a valid passport id', async () => {
		const result = validatePassportID({pairs: ["pid:087499704"]});
		expect(result).toBeTruthy();
	});

	it('part2 should return expected value for example case', async () => {
		const result = part2(examplePart2Input);
		expect(result).toBe(4);
	});
	
	it('part2 should return a number', async () => {
		const input = await getInput();
		const result = part2(input);
		expect(result).toBe(186);
	});
});
