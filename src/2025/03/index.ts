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
  let answer = 0;
  const lines = input.trim().split("\n");
  const banks = lines.map((line) => line.split("").map(Number));
  const bankTotals: number[] = [];

  for (let index = 0; index < banks.length; index++) {
    const bank = banks[index];
    bankTotals[index] = 0;
    for (let i = 0; i < bank.length - 1; i++) {
      const bat1 = bank[i];
      for (let j = i + 1; j < bank.length; j++) {
        const bat2 = bank[j];
        for (let k = j + 1; k < bank.length; k++) {
          const bat3 = bank[k];
          for (let l = k + 1; l < bank.length; l++) {
            const bat4 = bank[l];
            for (let m = l + 1; m < bank.length; m++) {
              const bat5 = bank[m];
              for (let n = m + 1; n < bank.length; n++) {
                const bat6 = bank[n];
                for (let o = n + 1; o < bank.length; o++) {
                  const bat7 = bank[o];
                  for (let p = o + 1; p < bank.length; p++) {
                    const bat8 = bank[p];
                    for (let q = p + 1; q < bank.length; q++) {
                      const bat9 = bank[q];
                      for (let r = q + 1; r < bank.length; r++) {
                        const bat10 = bank[r];
                        for (let s = r + 1; s < bank.length; s++) {
                          const bat11 = bank[s];
                          for (let t = s + 1; t < bank.length; t++) {
                            const bat12 = bank[t];
                            const batteries = [
                              bat1,
                              bat2,
                              bat3,
                              bat4,
                              bat5,
                              bat6,
                              bat7,
                              bat8,
                              bat9,
                              bat10,
                              bat11,
                              bat12,
                            ];
                            const total = Number(batteries.join(""));
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
