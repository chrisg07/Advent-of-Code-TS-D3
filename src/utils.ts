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