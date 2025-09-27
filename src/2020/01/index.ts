import { readFile } from 'fs/promises';
import path from 'node:path';

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

export function findPairWithSum(input: number[], targetSum: number): number[] {
	for (let i = 0; i < input.length; i++) {
		for (let j = i + 1; j < input.length; j++) {
			if (input[i] + input[j] === targetSum) {
				return [input[i], input[j]];
			}
		}
	}
	return [];
}

export function part1(input: string): unknown {
	const numbers = input.split('\n').map(Number);
	const pair = findPairWithSum(numbers, 2020);
	if (pair.length === 2) {
		return pair[0] * pair[1];
	}
	return -1;
}

export function findTripletWithSum(input: number[], targetSum: number): number[] {
	for (let i = 0; i < input.length; i++) {
		for (let j = i + 1; j < input.length; j++) {
			for (let k = j + 1; k < input.length; k++) {
				if (input[i] + input[j] + input[k] === targetSum) {
					return [input[i], input[j], input[k]];
				}
			}
		}
	}
	return [];
}

export function part2(input: string): unknown {
	const numbers = input.split('\n').map(Number);
	const triplet = findTripletWithSum(numbers, 2020);
	if (triplet.length === 3) {
		return triplet[0] * triplet[1] * triplet[2];
	}
	return -1;
}

// Only run this block in Node.js
if (typeof process !== 'undefined' && process.release && process.release.name === 'node' && typeof require !== 'undefined' && require.main === module) {
  (async () => {
    const input = await getInput();
    console.log('Part 1:', part1(input));
    console.log('Part 2:', part2(input));
  })();
}
