import {
    createGrid
  } from "./grid-functions";

describe("createGrid", () => {
    test("Returns a Grid with the given dimensions", () => {
      expect(createGrid(9, 9, [], [])).toEqual({maxX: 9, maxY: 9, vehicles: [], samples: []});     
    });
  });