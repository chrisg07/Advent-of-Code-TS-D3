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

type Password = {
	min: number;
	max: number;
	char: string;
	password: string;
};

export function parseLine(line: string): Password {
	const parts = line.split(' ');
	const minMaxParts = parts[0].split('-').map(Number)
	if (parts[1] == undefined) {
		console.log(parts)
	}
	const key = parts[1].charAt(0)
	const password = parts[2]

	return {
		min: minMaxParts[0],
		max: minMaxParts[1],
		char: key,
		password: password
	}
}

export function validatePassword(password: Password): boolean {
	let count = 0
	for (const char of password.password) {
		if (char === password.char) {
			count++
		}
	}
	return count >= password.min && count <= password.max
}

export function part1(input: string): unknown {
	input = input.trim()
	let count = 0
	for (const line of input.split('\n')) {
		const password = parseLine(line)
		const valid = validatePassword(password)
		if (valid) count++
	}
	return count;
}

export function validatePasswordPart2(password: Password): boolean {
	const validCharAtMin = password.password.charAt(password.min - 1) === password.char;
	const validCharAtMax = password.password.charAt(password.max - 1) === password.char;

	if (validCharAtMax && validCharAtMin) {
		return false
	}
	return (validCharAtMin && !validCharAtMax) || (!validCharAtMin && validCharAtMax)
}

export function part2(input: string): unknown {	
	input = input.trim()
	let count = 0
	for (const line of input.split('\n')) {
		const password = parseLine(line)
		const valid = validatePasswordPart2(password)
		if (valid) count++
	}
	return count;
}

// Only run this block in Node.js
if (typeof process !== 'undefined' && process.release && process.release.name === 'node' && typeof require !== 'undefined' && require.main === module) {
  (async () => {
	const input = await getInput();
	console.log('Part 1:', part1(input));
	console.log('Part 2:', part2(input));
  })();
}