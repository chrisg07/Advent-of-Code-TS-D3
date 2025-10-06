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
		const lines = chunk.split('\n')
		const pairs = []
		for (const line of lines) {
			const pairsFromLine = line.split(" ")
			pairs.push(...pairsFromLine)
		}
		return {pairs: pairs}
	})
}

export function part1(input: string): unknown {
	// const passports = parsePassports(input)
	
	const chunks = input.split(/\r?\n\r?\n/);
	console.log(chunks.length);
	
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

export function part2(input: string): unknown {
	// TODO: Implement Part 2 solution
	return input.length;
}

// Only run this block in Node.js
if (typeof process !== 'undefined' && process.release && process.release.name === 'node' && typeof require !== 'undefined' && require.main === module) {
  (async () => {
	const input = await getInput();
	console.log('Part 1:', part1(input));
	console.log('Part 2:', part2(input));
  })();
}
