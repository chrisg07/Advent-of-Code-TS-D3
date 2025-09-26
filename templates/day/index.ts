
import { readFile } from 'fs/promises';
import path from 'node:path';

async function main() {
	// Read input.txt from the same directory
	const inputPath = path.resolve(__dirname, 'input.txt');
	const input = await readFile(inputPath, 'utf-8');
	console.log(input);
}

main();
