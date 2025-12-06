import { describe, it, expect } from 'vitest';
import { GridHelper } from './GridHelper';

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

const expandedNeighborRangeInput = `.....
.....
..@..
.....
.....
`;

describe('Grid helper', () => {
	it('should be able to return a string representation of the cells of the grid', async () => {
		const grid = new GridHelper(exampleInput);
        expect(grid.getGrid()).toEqual(exampleInput)
	});

    it('should be able to return the number of characters matching a value in the grid', async () => {
		const grid = new GridHelper(exampleInput);
        expect(grid.getCount("@")).toEqual(71)
	});

    it('should be able to return the number of neighbors within a configurable range of a cell', async () => {
		const grid = new GridHelper(expandedNeighborRangeInput, 1);
        const cell = grid.cells.filter(cell => cell.value === '@')[0]
        expect(cell.neighbors.length).toBe(8)
	});

    it('should be able to return the number of neighbors within a configurable range of a cell', async () => {
		const grid = new GridHelper(expandedNeighborRangeInput, 2);
        const cell = grid.cells.filter(cell => cell.value === '@')[0]
        expect(cell.neighbors.length).toBe(24)
	});
});
