import { describe, it, expect } from "vitest";
import { part1, part2 } from "./index";
import { getInput } from "src/utils/utils";

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

const exampleInput2 = `R1000
`;

const exampleInput3 = `L1000
`;

const exampleInput4 = `R50
`;

const exampleInput5 = `L50
`;

describe.only("2025/01", () => {
  it("part1 should return expected value for example case", async () => {
    const result = part1(exampleInput);
    expect(result).toBe(3);
  });

  it("part1 should return a number", async () => {
    const input = await getInput(import.meta.url);
    const result = part1(input);
    expect(result).toBe(1097);
  });

  it("part2 should return expected value for example case", async () => {
    const result = part2(exampleInput);
    expect(result).toBe(6);
  });

  it("part2 should return expected value for example case 2", async () => {
    const result = part2(exampleInput2);
    expect(result).toBe(10);
  });

  it("part2 should return expected value for example case 3", async () => {
    const result = part2(exampleInput3);
    expect(result).toBe(10);
  });

  it("part2 should return expected value for example case 4", async () => {
    const result = part2(exampleInput4);
    expect(result).toBe(1);
  });

  it("part2 should return expected value for example case 5", async () => {
    const result = part2(exampleInput5);
    expect(result).toBe(1);
  });

  it("part2 should return a number", async () => {
    const input = await getInput(import.meta.url);
    const result = part2(input);
    expect(result).toBeGreaterThan(6984);
    expect(result).toBeLessThan(8081);
    expect(result).not.toBe(7106);
    expect(result).not.toBe(7112);
    expect(result).toBe(7101);
  });
});
