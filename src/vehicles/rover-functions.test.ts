import { RectangularGrid, createGrid } from "../plateaus/grid-functions";
import { Rover, createRover, isRover, takeSample } from "./rover-functions";
import { Vehicle } from "./vehicle-functions";

describe("createRover", () => {
  test("Creates a Rover with the given parameters", () => {
    expect(createRover({ xPos: 0, yPos: 0 }, "N", 23, 10, 1)).toEqual({
      position: { xPos: 0, yPos: 0 },
      orientation: "N",
      cameras: 23,
      sampleCapacity: 10,
      samplesTaken: 1,
    });
    expect(createRover({ xPos: 10, yPos: 10 }, "S", 5, 0, 0)).toEqual({
        position: { xPos: 10, yPos: 10 },
        orientation: "S",
        cameras: 5,
        sampleCapacity: 0,
        samplesTaken: 0,
      });
    expect(createRover({ xPos: 10, yPos: 10 }, "S", 5, -1, 0)).toEqual({
        position: { xPos: 10, yPos: 10 },
        orientation: "S",
        cameras: 5,
        sampleCapacity: 0,
        samplesTaken: 0,
      });
  });
});

describe("isRover", () => {
  const rover1: Rover = {
    position: { xPos: 0, yPos: 0 },
    orientation: "N",
    cameras: 0,
    sampleCapacity: 10,
    samplesTaken: 0,
  };

  const vehicle1: Vehicle = {
    position: { xPos: 0, yPos: 0 },
    orientation: "N",
  };

  test("Returns true if a vehicle is a Rover", () => {
    expect(isRover(rover1)).toBeTruthy();
  });
  test("Returns false if a vehicle is not a Rover", () => {
    expect(isRover(vehicle1)).toBeFalsy();
  });
});

describe("takeSample", () => {
  const rover1: Rover = {
    position: { xPos: 0, yPos: 0 },
    orientation: "N",
    cameras: 0,
    sampleCapacity: 10,
    samplesTaken: 0,
  };
  const rover2: Rover = { ...rover1, samplesTaken: 10 };
  const rover3: Rover = { ...rover1, sampleCapacity: 0 };
  const rover4: Rover = { ...rover1, sampleCapacity: -1 };
  const grid: RectangularGrid = createGrid(8, 8, [rover1], []);
  const grid2: RectangularGrid = createGrid(8, 8, [rover2, rover3, rover4], []);

  test("Returns samplesTaken unchanged if sampleCapacity is not a positive integer", () => {
    expect(takeSample(grid2, 1)).toEqual(grid2);
    expect(takeSample(grid2, 2)).toEqual(grid2);
  });
  test("Returns samplesTaken unchanged if sampleCapacity is reached (samplesTaken would be greater than sampleCapacity)", () => {
    expect(takeSample(grid2, 0)).toEqual(grid2);
  });
  test("Returns samplesTaken increased by 1 if sampleCapacity is not reached", () => {
    expect(takeSample(grid, 0)).toEqual({
      ...grid,
      vehicles: [{ ...rover1, samplesTaken: 1 }],
      samples: [{ xPos: 0, yPos: 0 }],
    });
  });
});
