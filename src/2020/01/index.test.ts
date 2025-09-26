import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { writeFile, unlink, readFile } from 'fs/promises';
import path from 'node:path';
import { part1, part2, getInput, findPairWithSum } from './index';

describe('2020/01', () => {
	const testInput = '123\n456';
	const inputPath = path.resolve(__dirname, 'input.txt');

	beforeAll(async () => {
	});

	afterAll(async () => {
	});

	it('should find pair that sums to 2020', async () => {
		const input = [
			1721,
			979,
			366,
			299,
			675,
			1456
		];
		const expected = [1721, 299];
		const result = findPairWithSum(input, 2020);
		expect(result).toEqual(expected);	
	});

	it('part1 should return a number', async () => {
		const input = await getInput();
		const result = part1(input);
		expect(result).toBe(514579);
	});

	it('part2 should return a number', async () => {
		const input = await getInput();
		const result = part2(input);
		expect(typeof result).toBe('number');
	});

	// New: also test part1/part2 with example.txt if present
	it('part1 should return a number for example input', async () => {
		const examplePath = path.resolve(__dirname, 'example.txt');
		try {
			const input = await readFile(examplePath, 'utf-8');
			const result = part1(input);
			expect(typeof result).toBe('number');
		} catch (e) {
			// skip if example.txt does not exist
			if (e.code !== 'ENOENT') throw e;
		}
	});

	it('part2 should return a number for example input', async () => {
		const examplePath = path.resolve(__dirname, 'example.txt');
		try {
			const input = await readFile(examplePath, 'utf-8');
			const result = part2(input);
			expect(typeof result).toBe('number');
		} catch (e) {
			// skip if example.txt does not exist
			if (e.code !== 'ENOENT') throw e;
		}
	});
});
