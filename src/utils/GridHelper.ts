
export class GridHelper {
  public cells: { value: string; neighbors: string[]; }[] = [];

  constructor(input: string) {
    const width = input.split("\n")[0].length;
    const lines = input.trim().split("\n");
    const line = lines.join("");

    for (let i = 0; i < line.length; i++) {
      const west = i % width != 0 ? i - 1 : -1;
      const east = (i + 1) % width != 0 ? i + 1 : -1;
      const north = i - width;
      const south = i + width;
      const northWest = i % width != 0 ? i - width - 1 : -1;
      const northEast = (i + 1) % width != 0 ? i - width + 1 : -1;
      const southWest = i % width != 0 ? i + width - 1 : -1;
      const southEast = (i + 1) % width != 0 ? i + width + 1 : -1;

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
}
