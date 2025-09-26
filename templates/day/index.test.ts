import { describe, it, expect } from 'vitest';
import { readFile, writeFile, unlink } from 'fs/promises';
import path from 'node:path';

describe('YEAR/DAY', () => {
	const testInput = 'Hello Advent of Code!';
	const inputPath = path.resolve(__dirname, 'input.txt');

	beforeAll(async () => {
		await writeFile(inputPath, testInput, 'utf-8');
	});

	afterAll(async () => {
		await unlink(inputPath).catch(() => {});
	});

	it('should read input.txt correctly', async () => {
		const input = await readFile(inputPath, 'utf-8');
		expect(input).toBe(testInput);
	});
});
