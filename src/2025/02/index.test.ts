import { describe, it, expect } from "vitest";
import { part1, part2 } from "./index";
import { getInput } from "src/utils";

const exampleInput = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124
`;

describe("2025/02", () => {
  it("part1 should return expected value for example case", async () => {
    const result = part1(exampleInput);
    expect(result).toBe(1227775554);
  });

  it("part1 should return a number", async () => {
    const input = await getInput(import.meta.url);
    const result = part1(input);
    expect(result).toBe(12850231731);
  });

  it("part2 should return expected value for example case", async () => {
    const result = part2(exampleInput);
    expect(result).toBe(4174379265);
  });

  it("part2 should return a number", async () => {
    const input = await getInput(import.meta.url);
    const result = part2(input);
    expect(result).toBe(24774350322);
  });
});
