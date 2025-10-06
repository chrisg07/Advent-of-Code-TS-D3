export async function getInput() {
	// @ts-ignore
	if (typeof window !== 'undefined' && typeof fetch === 'function') {
		// Browser: fetch input.txt from same directory
		const res = await fetch('./input.txt');
		return res.text();
	} else {
		// Node.js: use fs/promises
		const { readFile } = await import('fs/promises');
		const path = await import('node:path');
		const inputPath = path.resolve(__dirname, 'input.txt');
		return readFile(inputPath, 'utf-8');
	}
}

export  function parsePassports(input: string): {pairs: string[]}[] {
	const chunks = input.split(/\r?\n\r?\n/)
	return chunks.map(chunk => { 
		return parsePassport(chunk);
	})
}

function parsePassport(chunk: string) {
	const lines = chunk.split('\n');
	const pairs = [];
	for (const line of lines) {
		const pairsFromLine = line.split(" ").map(line => line.trim());
		pairs.push(...pairsFromLine);
	}
	return { pairs: pairs };
}

export function part1(input: string): number {
	const chunks = input.split(/\r?\n\r?\n/);
	let validPassports = 0
	for (const chunk of chunks) {
		const validBirthYear = chunk.includes('byr')
		const validIssueYear = chunk.includes('iyr')
		const validExpirationYear = chunk.includes('eyr')
		const validHeight = chunk.includes('hgt')
		const validHairColor = chunk.includes('hcl')
		const validEyeColor = chunk.includes('ecl')
		const validPassportID = chunk.includes('pid')
		const validCountryID = chunk.includes('cid')

		const validRequiredFields = validBirthYear && validExpirationYear && validEyeColor && validHairColor && validHeight && validIssueYear && validPassportID
		if (validRequiredFields) {
			validPassports++
		}
	}
	return validPassports;
}

export function validateBirthYear(passport: {pairs: string[]}): boolean {
	for (const pair of passport.pairs) {
		if (pair.includes('byr')) {
			const year = pair.split(":").map(Number)[1]
			return year >= 1920 && year <= 2002
		}
	}
	return false
}

export function validateIssueYear(passport: {pairs: string[]}): boolean {
	for (const pair of passport.pairs) {
		if (pair.includes('iyr')) {
			const year = pair.split(":").map(Number)[1]
			return year >= 2010 && year <= 2020
		}
	}
	return false
}

export function validateExpirationYear(passport: {pairs: string[]}): boolean {
	for (const pair of passport.pairs) {
		if (pair.includes('eyr')) {
			const year = pair.split(":").map(Number)[1]
			return year >= 2020 && year <= 2030
		}
	}
	return false
}

export function validateHeight(passport: {pairs: string[]}): boolean {
	for (const pair of passport.pairs) {
		if (pair.includes('hgt') && pair.includes('cm')) {
			const height = pair.split(":").map(part => part.substring(0, part.length - 2)).map(Number)[1]
			return height >= 150 && height <= 193
		} else if (pair.includes('hgt') && pair.includes('in')) {
			const height = pair.split(":").map(part => part.substring(0, part.length - 2)).map(Number)[1]
			return height >= 59 && height <= 76
		}
	}
	return false
}

export function validateHairColor(passport: {pairs: string[]}): boolean {
	for (const pair of passport.pairs) {
		if (pair.includes('hcl')) {
			const color = pair.split(":")[1]
			const startsWithOctothorpe = color.charAt(0) == "#"
			const validLength = color.length == 7
			const regexx = /[a-f0-9]/;
			const validChars = regexx.test(color.substring(1))

			return startsWithOctothorpe && validLength && validChars
		}
	}
	return false
}

export function validateEyeColor(passport: {pairs: string[]}): boolean {
	for (const pair of passport.pairs) {
		if (pair.includes('ecl')) {
			const color = pair.split(":")[1]
			return color == "amb" || color == "blu" || color == "grn" || color == "brn" || color == "gry" || color == "hzl" || color == "oth"
		}
	}
	return false
}

export function validatePassportID(passport: {pairs: string[]}): boolean {
	for (const pair of passport.pairs) {
		if (pair.includes('pid')) {
			const id = pair.split(":")[1]
			const validLength = id.length == 9
			const regexx = /[0-9]/;
			const validChars = regexx.test(id)	
			return validLength && validChars	
	}
	}
	return false
}

export function part2(input: string): unknown {
	const chunks = input.split(/\r?\n\r?\n/);
	let validPassports = []
	for (const chunk of chunks) {
		const validBirthYear = chunk.includes('byr')
		const validIssueYear = chunk.includes('iyr')
		const validExpirationYear = chunk.includes('eyr')
		const validHeight = chunk.includes('hgt')
		const validHairColor = chunk.includes('hcl')
		const validEyeColor = chunk.includes('ecl')
		const validPassportID = chunk.includes('pid')

		const validRequiredFields = validBirthYear && validExpirationYear && validEyeColor && validHairColor && validHeight && validIssueYear && validPassportID
		if (validRequiredFields) {
			validPassports.push(chunk)
		}
	}
	let passportPairs = validPassports.map(chunk => parsePassport(chunk))
	passportPairs = passportPairs.filter(pairs => {
		const validBirthYear = validateBirthYear(pairs)
		const validIssueYear = validateIssueYear(pairs)
		const validExpirationYear = validateExpirationYear(pairs)
		const validHeight = validateHeight(pairs)
		const validHairColor = validateHairColor(pairs)
		const validEyeColor = validateEyeColor(pairs)
		const validPassportID = validatePassportID(pairs)

		const validations = [
			{ name: 'Birth Year', valid: validBirthYear },
			{ name: 'Issue Year', valid: validIssueYear },
			{ name: 'Expiration Year', valid: validExpirationYear },
			{ name: 'Height', valid: validHeight },
			{ name: 'Hair Color', valid: validHairColor },
			{ name: 'Eye Color', valid: validEyeColor },
			{ name: 'Passport ID', valid: validPassportID },
		];
		const failed = validations.filter(v => !v.valid);
		const isValidPassport = failed.length === 0;
		return isValidPassport;
	})
	return passportPairs.length;
}

// Only run this block in Node.js
if (typeof process !== 'undefined' && process.release && process.release.name === 'node' && typeof require !== 'undefined' && require.main === module) {
  (async () => {
	const input = await getInput();
	console.log('Part 1:', part1(input));
	console.log('Part 2:', part2(input));
  })();
}
