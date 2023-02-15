import {
  moveVehicleForward,
  rotateVehicle,
  processVehicleInstructions,
  processAllVehicleInstructions,
} from "./vehicle-functions";
import { Rover } from "./rover-functions";

import { createGrid, RectangularGrid } from "../plateaus/grid-functions";
import { Plateau } from "../plateaus/plateau-functions";

const ROVER1: Rover = {
  position: { xPos: 0, yPos: 0 },
  orientation: "N",
  cameras: 0,
  sampleCapacity: 10,
  samplesTaken: 0,
  photos: [],
};
const ROVER2: Rover = {
  position: { xPos: 3, yPos: 7 },
  orientation: "N",
  cameras: 17,
  sampleCapacity: 3,
  samplesTaken: 2,
  photos: [],
};
const ROVER3: Rover = {
  position: { xPos: 3, yPos: 8 },
  orientation: "W",
  cameras: 17,
  sampleCapacity: 3,
  samplesTaken: 2,
  photos: [],
};
const ROVER4: Rover = {
  position: { xPos: 3, yPos: 8 },
  orientation: "S",
  cameras: 17,
  sampleCapacity: 3,
  samplesTaken: 2,
  photos: [],
};
const ROVER5: Rover = {
  position: { xPos: 3, yPos: 8 },
  orientation: "E",
  cameras: 17,
  sampleCapacity: 3,
  samplesTaken: 2,
  photos: [],
};
const ROVER6: Rover = {
  position: { xPos: 0, yPos: 5 },
  orientation: "W",
  cameras: 17,
  sampleCapacity: 3,
  samplesTaken: 2,
  photos: [],
};
const ROVER7: Rover = {
  position: { xPos: 2, yPos: 0 },
  orientation: "S",
  cameras: 17,
  sampleCapacity: 3,
  samplesTaken: 2,
  photos: [],
};
const ROVER8: Rover = {
  position: { xPos: 8, yPos: 6 },
  orientation: "E",
  cameras: 23,
  sampleCapacity: 3,
  samplesTaken: 3,
  photos: [],
};
const grid: RectangularGrid = createGrid(8, 8, [ROVER1], []);
const grid2: RectangularGrid = createGrid(8, 8, [ROVER1, ROVER2], []);
const PLATEAU: Plateau = {
  vehicles: [],
  samples: [],
};

describe("moveVehicleForward", () => {
  test("Moves vehicle 1 square up if orientation is N", () => {
    expect(moveVehicleForward(ROVER1, grid)).toEqual({
      xPos: 0,
      yPos: 1,
    });
  });
  test("Moves vehicle 1 square to the left if orientation is W", () => {
    expect(moveVehicleForward(ROVER3, grid)).toEqual({
      xPos: 2,
      yPos: 8,
    });
  });
  test("Moves vehicle 1 square down if orientation is S", () => {
    expect(moveVehicleForward(ROVER4, grid)).toEqual({
      xPos: 3,
      yPos: 7,
    });
  });
  test("Moves vehicle 1 square to the right if orientation is E", () => {
    expect(moveVehicleForward(ROVER5, grid)).toEqual({
      xPos: 4,
      yPos: 8,
    });
  });
  test("Moves vehicle 1 square to the right if orientation is E", () => {
    expect(moveVehicleForward(ROVER5, grid)).toEqual({
      xPos: 4,
      yPos: 8,
    });
  });
  test("Does not move vehicle N if already at top of grid", () => {
    expect(moveVehicleForward(ROVER2, grid)).toEqual({
      xPos: 3,
      yPos: 7,
    });
  });
  test("Does not move vehicle W if already at left of grid", () => {
    expect(moveVehicleForward(ROVER6, grid)).toEqual({
      xPos: 0,
      yPos: 5,
    });
  });
  test("Does not move vehicle S if already at bottom of grid", () => {
    expect(moveVehicleForward(ROVER7, grid)).toEqual({
      xPos: 2,
      yPos: 0,
    });
  });
  test("Does not move vehicle E if already at right of grid", () => {
    expect(moveVehicleForward(ROVER8, grid)).toEqual({
      xPos: 8,
      yPos: 6,
    });
  });
  test("Does nothing if plateau is not a defined shape", () => {
    expect(moveVehicleForward(ROVER1, PLATEAU)).toEqual({
      xPos: 0,
      yPos: 0,
    });
  });
});

describe("rotateVehicle", () => {
  test("Changes vehicle's orientation anticlockwise if direction is L", () => {
    expect(rotateVehicle(ROVER1, "L")).toEqual("W");
    expect(rotateVehicle(ROVER3, "L")).toEqual("S");
    expect(rotateVehicle(ROVER4, "L")).toEqual("E");
    expect(rotateVehicle(ROVER5, "L")).toEqual("N");
  });
  test("Changes vehicle's orientation clockwise if direction is R", () => {
    expect(rotateVehicle(ROVER1, "R")).toEqual("E");
    expect(rotateVehicle(ROVER3, "R")).toEqual("N");
    expect(rotateVehicle(ROVER4, "R")).toEqual("W");
    expect(rotateVehicle(ROVER5, "R")).toEqual("S");
  });
});

describe("processVehicleInstructions", () => {
  const OUTPUT_GRID = {
    ...grid,
    vehicles: [{ ...ROVER1, samplesTaken: 1 }],
    samples: [{ xPos: 0, yPos: 0 }],
  };

  const OUTPUT_GRID2 = {
    ...grid,
    vehicles: [{ ...ROVER1, samplesTaken: 2, position: { xPos: 0, yPos: 2 } }],
    samples: [
      { xPos: 0, yPos: 1 },
      { xPos: 0, yPos: 2 },
    ],
  };

  const OUTPUT_GRID3 = {
    ...grid,
    vehicles: [{ ...ROVER1, samplesTaken: 10 }],
    samples: [
      { xPos: 0, yPos: 0 },
      { xPos: 0, yPos: 0 },
      { xPos: 0, yPos: 0 },
      { xPos: 0, yPos: 0 },
      { xPos: 0, yPos: 0 },
      { xPos: 0, yPos: 0 },
      { xPos: 0, yPos: 0 },
      { xPos: 0, yPos: 0 },
      { xPos: 0, yPos: 0 },
      { xPos: 0, yPos: 0 },
    ],
  };

  const OUTPUT_GRID4 = {
    ...grid2,
    vehicles: [ROVER1, { ...ROVER2, photos: [{ xPos: 3, yPos: 7 }] }],
  };

  const OUTPUT_GRID5 = {
    ...grid2,
    vehicles: [ROVER1, { ...ROVER2, photos: [{ xPos: 3, yPos: 7 }] }],
  };

  const OUTPUT_GRID6 = {
    ...grid2,
    vehicles: [
      ROVER1,
      {
        ...ROVER2,
        orientation: "S",
        position: { xPos: 4, yPos: 5 },
        photos: [
          { xPos: 5, yPos: 7 },
          { xPos: 5, yPos: 6 },
        ],
        samplesTaken: 3,
      },
    ],
    samples: [{ xPos: 4, yPos: 6 }],
  };

  test("Returns original grid if instruction string is empty", () => {
    expect(processVehicleInstructions(grid, 0, "")).toEqual(grid);
  });
  test("Rotates vehicle clockwise if movement string is 'R'", () => {
    expect(processVehicleInstructions(grid, 0, "R")).toEqual({
      ...grid,
      vehicles: [{ ...ROVER1, orientation: "E" }],
    });
  });
  test("Rotates vehicle anticlockwise if movement string is 'L'", () => {
    expect(processVehicleInstructions(grid, 0, "L")).toEqual({
      ...grid,
      vehicles: [{ ...ROVER1, orientation: "W" }],
    });
  });
  test("Moves vehicle forward if movement string is 'M'", () => {
    expect(processVehicleInstructions(grid, 0, "M")).toEqual({
      ...grid,
      vehicles: [{ ...ROVER1, position: { xPos: 0, yPos: 1 } }],
    });
  });
  test("Moves vehicle through multiple orientations", () => {
    expect(processVehicleInstructions(grid, 0, "LL")).toEqual({
      ...grid,
      vehicles: [{ ...ROVER1, orientation: "S" }],
    });
  });
  test("Moves vehicle through multiple forward movements", () => {
    expect(processVehicleInstructions(grid, 0, "MMMM")).toEqual({
      ...grid,
      vehicles: [{ ...ROVER1, position: { xPos: 0, yPos: 4 } }],
    });
  });
  test("Moves vehicle through multiple orientations and forward movements", () => {
    expect(processVehicleInstructions(grid, 0, "RMMMMLMML")).toEqual({
      ...grid,
      vehicles: [
        { ...ROVER1, orientation: "W", position: { xPos: 4, yPos: 2 } },
      ],
    });
  });
  test("Increases samplesTaken if an 'S' is found and adds the sample to the grid", () => {
    expect(processVehicleInstructions(grid, 0, "S")).toEqual(OUTPUT_GRID);
  });
  test("Increases samplesTaken by the correct number of Ss found and adds the samples to the grid", () => {
    expect(processVehicleInstructions(grid, 0, "MSMS")).toEqual(OUTPUT_GRID2);
  });
  test("Stops taking samples when capacity is reached", () => {
    expect(processVehicleInstructions(grid, 0, "SSSSSSSSSSSSSSSSSS")).toEqual(
      OUTPUT_GRID3
    );
  });
  test("Does not add a photo to the array if instruction is 'P' but the vehicle has no cameras", () => {
    expect(processVehicleInstructions(grid, 0, "P")).toEqual(grid);
  });
  test("Adds a photo to the array if instruction is 'P'", () => {
    expect(processVehicleInstructions(grid2, 1, "P")).toEqual(OUTPUT_GRID4);
  });
  test("Adds multiple photos to the array if instruction is a string of Ps", () => {
    expect(processVehicleInstructions(grid2, 1, "P")).toEqual(OUTPUT_GRID5);
  });
  test("Correctly follows a mixture of all instructions", () => {
    expect(processVehicleInstructions(grid2, 1, "RMMPRMPRMSLM")).toEqual(
      OUTPUT_GRID6
    );
  });
});

describe("processAllVehicleInstructions", () => {
  const OUTPUT_GRID = {
    ...grid,
    samples: [{ xPos: 0, yPos: 3 }],
    vehicles: [
      {
        ...ROVER1,
        samplesTaken: 1,
        position: { xPos: 0, yPos: 3 },
        orientation: "W",
      },
    ],
  };
  const OUTPUT_GRID2 = {
    ...OUTPUT_GRID,
    samples: [
      { xPos: 0, yPos: 3 },
      { xPos: 4, yPos: 7 },
    ],
    vehicles: [
      {
        ...ROVER1,
        samplesTaken: 1,
        position: { xPos: 0, yPos: 3 },
        orientation: "W",
      },
      {
        ...ROVER2,
        samplesTaken: 3,
        position: { xPos: 4, yPos: 7 },
        orientation: "E",
      },
    ],
  };
  test("Returns original plateau if instruction string array is empty", () => {
    expect(processAllVehicleInstructions(grid, [])).toEqual(grid);
  });
  test("Returns plateau with changes if instruction string array has one instruction list", () => {
    expect(
      processAllVehicleInstructions({ ...grid, vehicles: [ROVER1] }, ["MMMSL"])
    ).toEqual(OUTPUT_GRID);
  });
  test("Returns plateau with changes if instruction string array has multiple instruction lists", () => {
    expect(
      processAllVehicleInstructions({ ...grid, vehicles: [ROVER1, ROVER2] }, [
        "MMMSL",
        "RMS",
      ])
    ).toEqual(OUTPUT_GRID2);
  });
});
