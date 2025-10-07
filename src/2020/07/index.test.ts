import { describe, it, expect } from 'vitest';
import { part1, part2, getInput, parseNode } from './index';

const exampleInput = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.
`;

describe('2020/07', () => {
	it('should be able to parse node from line of input', async () => {
		const result = parseNode("light red bags contain 1 bright white bag, 2 muted yellow bags.");
		const node = {
			value: "light red",
			children: [
				{ value: "bright white", weight: 1},
				{ value: "muted yellow", weight: 2}
			]
		}
		expect(result).toEqual(node);
	});

	it('should be able to parse node from line of input', async () => {
		const result = parseNode("bright white bags contain 1 shiny gold bag.");
		const node = {
			value: "bright white",
			children: [
				{ value: "shiny gold", weight: 1}
			]
		}
		expect(result).toEqual(node);
	});

	it('should be able to parse node from line of input', async () => {
		const result = parseNode("faded blue bags contain no other bags.");
		const node = {
			value: "faded blue",
			children: []
		}
		expect(result).toEqual(node);
	});
	
	it('part1 should return expected value for example case', async () => {
		const result = part1(exampleInput);
		expect(result).toBe(4);
	});

	it('part1 should return a number', async () => {
		const input = await getInput();
		const result = part1(input);
		expect(result).toBe(274);
	});

	it('part2 should return expected value for example case', async () => {
		const result = part2(exampleInput);
		expect(result).toBe(32);
	});

	const exampleInputPart2 = `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`
	it('part2 should return expected value for example case', async () => {
		const result = part2(exampleInputPart2);
		expect(result).toBe(126);
	});
	
	it('part2 should return a number', async () => {
		const input = await getInput();
		const result = part2(input);
		expect(result).toBe(158730);
	});
});
