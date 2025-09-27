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

export function part2(input: string): unknown {
	// TODO: Implement Part 2 solution
	return input.length;
}

if (require.main === module) {
	(async () => {
		const input = await getInput();
		console.log('Part 1:', part1(input));
		console.log('Part 2:', part2(input));
	})();
}
