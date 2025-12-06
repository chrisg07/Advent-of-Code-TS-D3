import { describe, it, expect } from "vitest";
import { part1, part2 } from "./index";
import { getInput } from "src/utils/utils";

const exampleInput = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.
`;

describe("2025/04", () => {
  it("part1 should return expected value for example case", async () => {
    const result = part1(exampleInput);
    expect(result).toBe(13);
  });

  it("part1 should return a number", async () => {
    const input = await getInput(import.meta.url);
    const result = part1(input);
    expect(result).not.toBe(2492);
    expect(result).toBe(1409);
  });

  it("part2 should return expected value for example case", async () => {
    const result = part2(exampleInput);
    expect(result).toBe(43);
  });

  it("part2 should return a number", async () => {
    const input = await getInput(import.meta.url);
    const result = part2(input);
    expect(result).toBe(8366);
  });
});
