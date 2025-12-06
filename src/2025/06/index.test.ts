import { describe, it, expect } from "vitest";
import { part1, part2 } from "./index";
import { getInput } from "src/utils/utils";

const exampleInput = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  
`;

describe("2025/06", () => {
  it("part1 should return expected value for example case", async () => {
    const result = part1(exampleInput);
    expect(result).toBe(4277556n);
  });

  it("part1 should return a number", async () => {
    const input = await getInput(import.meta.url);
    const result = part1(input);
    expect(result).toBe(5227286044585n);
  });

  it("part2 should return expected value for example case", async () => {
    const result = part2(exampleInput);
    expect(result).toBe(3263827n);
  });

  it("part2 should return a number", async () => {
    const input = await getInput(import.meta.url);
    const result = part2(input);
    expect(result).toBe(10227753257799n);
  });
});
