import { RectangularGrid, createGrid } from "../plateaus/grid-functions";
import { Rover, createRover, takeSample } from "./rover-functions";

describe("createRover", () => {
    test("Creates a Rover with the given parameters", () => {
      expect(createRover({ xPos: 0, yPos: 0 }, "N", 23, 10, 1)).toEqual({
        position: { xPos: 0, yPos: 0 },
        orientation: "N",
        cameras: 23,
        sampleCapacity: 10,
        samplesTaken: 1,
      });
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
    const grid: RectangularGrid = createGrid(8, 8, [rover1], []);
    const grid2: RectangularGrid = createGrid(8, 8, [rover2], []);
  
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
  