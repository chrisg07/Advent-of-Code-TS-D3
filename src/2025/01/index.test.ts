import { describe, it, expect } from "vitest";
import { part1, part2 } from "./index";
import { getInput } from "src/utils";

const exampleInput = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82
`;

describe.only("2025/01", () => {
  it("part1 should return expected value for example case", async () => {
    const result = part1(exampleInput);
    expect(result).toBe(3);
  });

  it("part1 should return a number", async () => {
    const input = await getInput(import.meta.url);
    const result = part1(input);
    expect(result).toBe(0);
  });

  // it('part2 should return expected value for example case', async () => {
  // 	const result = part2(exampleInput);
  // 	expect(result).toBe(0);
  // });

  // it('part2 should return a number', async () => {
  // 	const input = await getInput(import.meta.url);
  // 	const result = part2(input);
  // 	expect(result).toBe(0);
  // });
});
