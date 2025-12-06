import { describe, it, expect } from 'vitest';
import { getInput } from 'src/utils/utils';
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

describe('Grid helper', () => {
	it('should be able to return a string representation of the cells of the grid', async () => {
		const grid = new GridHelper(exampleInput);
        expect(grid.getGrid()).toEqual(exampleInput)
	});

    it('should be able to return the number of characters matching a value in the grid', async () => {
		const grid = new GridHelper(exampleInput);
        expect(grid.getCount("@")).toEqual(71)
	});
});
