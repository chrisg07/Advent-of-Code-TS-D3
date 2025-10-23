export async function getInput(importMetaUrl: string) {
	// @ts-ignore
	if (typeof window !== 'undefined' && typeof fetch === 'function') {
		// Browser: fetch input.txt from same directory
		const res = await fetch('./input.txt');
		return res.text();
	} else {
		// Node.js: use fs/promises
		const { readFile } = await import('fs/promises');
		const path = await import('node:path');
		const { fileURLToPath } = await import('node:url');
		const callerDir = path.dirname(fileURLToPath(importMetaUrl));
		const inputPath = path.resolve(callerDir, 'input.txt');
		return readFile(inputPath, 'utf-8');
	}
}

export function parseNumbersFromString(input: string): number[] {
	const numberRegex = /(\d+\.?\d*|\.\d+)/g;
	const matches = input.matchAll(numberRegex);

	const extractedNumbers: number[] = [];
	for (const match of matches) {
		if (match[0]) {
			extractedNumbers.push(parseFloat(match[0]));
		}
	}

	return extractedNumbers;
}
