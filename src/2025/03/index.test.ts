import { describe, it, expect } from "vitest";
import { part1, part2 } from "./index";
import { getInput } from "src/utils";

const exampleInput = `987654321111111
811111111111119
234234234234278
818181911112111
`;

describe("2025/03", () => {
  it("part1 should return expected value for example case", async () => {
    const result = part1(exampleInput);
    expect(result).toBe(357);
  });

  it("part1 should return a number", async () => {
    const input = await getInput(import.meta.url);
    const result = part1(input);
    expect(result).toBe(17193);
  });

  it("part2 should return expected value for example case", async () => {
    const result = part2(exampleInput);
    expect(result).toBe(3121910778619);
  });

  //   it("part2 should return a number", async () => {
  //     const input = await getInput(import.meta.url);
  //     const result = part2(input);
  //     expect(result).toBe(0);
  //   });
});
