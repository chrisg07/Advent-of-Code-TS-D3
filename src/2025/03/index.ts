import { getInput } from "../../utils";

export function part1(input: string): unknown {
  let answer = 0;
  const lines = input.trim().split("\n");
  const banks = lines.map((line) => line.split("").map(Number));
  const bankTotals: number[][] = [];

  for (let index = 0; index < banks.length; index++) {
    const bank = banks[index];
    bankTotals[index] = [];
    for (let i = 0; i < bank.length - 1; i++) {
      const leftBattery = bank[i];
      for (let j = i + 1; j < bank.length; j++) {
        const rightBattery = bank[j];
        const total = [leftBattery + "" + rightBattery + ""].map(Number)[0];
        bankTotals[index].push(total);
      }
    }
  }
  const maxTotals = bankTotals
    .map((totals) => totals.sort((a, b) => b - a))
    .map((totals) => totals[0]);
  answer = maxTotals.reduce((acc, val) => acc + val);

  return answer;
}

export function part2(input: string): unknown {
  console.time("2025 Day 3 Part 2");
  let answer = 0;
  const lines = input.trim().split("\n");
  const banks = lines.map((line) => line.split("").map(Number));
  const width = banks[0].length;
  const bankTotals: number[] = [];

  for (let i = 0; i < width; i++) {
    for (let j = i + 1; j < width; j++) {
      for (let k = j + 1; k < width; k++) {
        for (let l = k + 1; l < width; l++) {
          for (let m = l + 1; m < width; m++) {
            for (let n = m + 1; n < width; n++) {
              for (let o = n + 1; o < width; o++) {
                for (let p = o + 1; p < width; p++) {
                  for (let q = p + 1; q < width; q++) {
                    for (let r = q + 1; r < width; r++) {
                      for (let s = r + 1; s < width; s++) {
                        for (let t = s + 1; t < width; t++) {
                          for (const [index, bank] of banks.entries()) {
                            const total =
                              bank[i] * 100_000_000_000 +
                              bank[j] * 10_000_000_000 +
                              bank[k] * 1_000_000_000 +
                              bank[l] * 100_000_000 +
                              bank[m] * 10_000_000 +
                              bank[n] * 1_000_000 +
                              bank[o] * 100_000 +
                              bank[p] * 10_000 +
                              bank[q] * 1_000 +
                              bank[r] * 100 +
                              bank[s] * 10 +
                              bank[t];
                            if (!bankTotals[index]) bankTotals[index] = 0;
                            if (bankTotals[index] < total) {
                              bankTotals[index] = total;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  answer = bankTotals.reduce((acc, val) => acc + val);
  console.timeEnd("2025 Day 3 Part 2");
  return answer;
}

// Only run this block in Node.js
if (
  typeof process !== "undefined" &&
  process.release &&
  process.release.name === "node" &&
  typeof require !== "undefined" &&
  require.main === module
) {
  (async () => {
    const { resolve } = await import("node:path");
    const input = await getInput(import.meta.url);
    console.log("Part 1:", part1(input));
    console.log("Part 2:", part2(input));
  })();
}
