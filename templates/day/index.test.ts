import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { writeFile, unlink } from 'fs/promises';
import path from 'node:path';
import { part1, part2, getInput } from './index';

describe('YEAR/DAY', () => {
	const testInput = '123\n456';
	const inputPath = path.resolve(__dirname, 'input.txt');

	beforeAll(async () => {
		await writeFile(inputPath, testInput, 'utf-8');
	});

	afterAll(async () => {
		await unlink(inputPath).catch(() => {});
	});

	it('part1 should return a number', async () => {
		const input = await getInput();
		const result = part1(input);
		expect(typeof result).toBe('number');
	});

	it('part2 should return a number', async () => {
		const input = await getInput();
		const result = part2(input);
		expect(typeof result).toBe('number');
	});
});
