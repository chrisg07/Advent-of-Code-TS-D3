export class GridHelper {
  public cells: { value: string; neighbors: string[] }[] = [];
  private width;

  constructor(input: string, neighborRange: number) {
    this.width = input.split("\n")[0].length;
    const lines = input.trim().split("\n");
    const cells = lines.map((line) => line.split(""));
    const leftBound = neighborRange * -1;

    let neighborOffsets: [number, number][] = [];
    for (let i = leftBound; i <= neighborRange; i++) {
      for (let j = leftBound; j <= neighborRange; j++) {
        if (i != 0 || j != 0) {
          const neighborOffset: [number, number] = [i, j];
          neighborOffsets.push(neighborOffset);
        }
      }
    }

    for (let i = 0; i < cells.length; i++) {
      for (let j = 0; j < cells[i].length; j++) {
        const value = cells[i][j];

        let neighbors: string[] = [];
        for (const offset of neighborOffsets) {
          const neighborX = i + offset[0];
          const neighborY = j + offset[1];
          if (
            neighborX >= 0 &&
            neighborX < cells.length &&
            neighborY >= 0 &&
            neighborY < cells[neighborX].length
          ) {
            const neighboringCell = cells[neighborX][neighborY];
            neighbors.push(neighboringCell);
          }
        }
        this.cells.push({ value, neighbors });
      }
    }
  }

  public getGrid(): string {
    let grid = "";
    let lines = 0;
    for (const cell of this.cells) {
      grid += cell.value;
      if (grid.length != 0 && (grid.length - lines) % this.width === 0) {
        grid += "\n";
        lines++;
      }
    }
    return grid;
  }

  public getCount(char: string): number {
    let count = 0;
    for (const cell of this.cells) {
      if (cell.value === char) count++;
    }
    return count;
  }
}
