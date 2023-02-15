import { checkRectangularGridMovement, createGrid } from "./grid-functions";
import { Rover } from "../vehicles/rover-functions";

describe("createGrid", () => {
  const rover1: Rover = {
    position: { xPos: 0, yPos: 0 },
    orientation: "N",
    cameras: 0,
    sampleCapacity: 10,
    samplesTaken: 0,
    photos: []
  };

  test("Returns a Grid with the given dimensions", () => {
    expect(createGrid(9, 9, [], [])).toEqual({
      maxX: 9,
      maxY: 9,
      checkMovement: checkRectangularGridMovement,
      vehicles: [],
      samples: [],
    });
    expect(createGrid(3, 8, [rover1], [{ xPos: 1, yPos: 5 }])).toEqual({
      maxX: 3,
      maxY: 8,
      checkMovement: checkRectangularGridMovement,
      vehicles: [rover1],
      samples: [{ xPos: 1, yPos: 5 }],
    });
  });
});

describe("checkRectangularGridMovement", () => {
  test("Returns false if we are at top of grid and trying to move N", () => {
    expect(
      checkRectangularGridMovement(
        { position: { xPos: 3, yPos: 9 }, orientation: "N" },
        { maxX: 6, maxY: 10 }
      )
    ).toBeFalsy();
  });
  test("Returns false if we are at left of grid and trying to move W", () => {
    expect(
      checkRectangularGridMovement(
        { position: { xPos: 0, yPos: 9 }, orientation: "W" },
        { maxX: 6, maxY: 10 }
      )
    ).toBeFalsy();
  });
  test("Returns false if we are at bottom of grid and trying to move S", () => {
    expect(
      checkRectangularGridMovement(
        { position: { xPos: 3, yPos: 0 }, orientation: "S" },
        { maxX: 6, maxY: 10 }
      )
    ).toBeFalsy();
  });
  test("Returns false if we are at right of grid and trying to move E", () => {
    expect(
      checkRectangularGridMovement(
        { position: { xPos: 5, yPos: 9 }, orientation: "E" },
        { maxX: 6, maxY: 10 }
      )
    ).toBeFalsy();
  });
  test("Returns true if we are not reaching the edge", () => {
    expect(
      checkRectangularGridMovement(
        { position: { xPos: 5, yPos: 5 }, orientation: "N" },
        { maxX: 10, maxY: 10 }
      )
    ).toBeTruthy();
  });
});
