export class GridHelper {
  public cells: { value: string; neighbors: string[] }[] = [];
  private width;

  constructor(input: string) {
    this.width = input.split("\n")[0].length;
    const lines = input.trim().split("\n");
    const line = lines.join("");

    for (let i = 0; i < line.length; i++) {
      const west = i % this.width != 0 ? i - 1 : -1;
      const east = (i + 1) % this.width != 0 ? i + 1 : -1;
      const north = i - this.width;
      const south = i + this.width;
      const northWest = i % this.width != 0 ? i - this.width - 1 : -1;
      const northEast = (i + 1) % this.width != 0 ? i - this.width + 1 : -1;
      const southWest = i % this.width != 0 ? i + this.width - 1 : -1;
      const southEast = (i + 1) % this.width != 0 ? i + this.width + 1 : -1;

      const neighbors = [
        west,
        east,
        north,
        south,
        northWest,
        northEast,
        southWest,
        southEast,
      ];

      const validNeighbors = neighbors.filter(
        (index) => index >= 0 && index <= line.length
      );
      const neighborSymbols = validNeighbors.map((index) => line.charAt(index));
      this.cells.push({ value: line.charAt(i), neighbors: neighborSymbols });
    }
  }

  public getGrid(): string {
    let grid = "";
    let lines = 0
    for (const cell of this.cells) {
      grid += cell.value;
      if (grid.length != 0 && (grid.length - lines) % this.width === 0) {
        grid += "\n";
        lines++
      }
    }
    return grid;
  }

  public getCount(char: string): number {
    let count = 0
    for (const cell of this.cells) {
      if (cell.value === char) count++
    }
    return count
  }
}
