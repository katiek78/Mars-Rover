import {
  moveVehicleForward,
  rotateVehicle,
  processVehicleInstructions,
} from "./vehicle-functions";
import { Rover, createRover } from "./rover-functions";

import { createGrid, RectangularGrid } from "../plateaus/grid-functions";
import { Plateau } from "../plateaus/plateau-functions";

const rover1: Rover = {
  position: { xPos: 0, yPos: 0 },
  orientation: "N",
  cameras: 0,
  sampleCapacity: 10,
  samplesTaken: 0,
};
const rover2: Rover = {
  /*name: "Rover2",
  vehicleType: "Rover",*/
  position: { xPos: 3, yPos: 8 },
  orientation: "N",
  cameras: 17,
  sampleCapacity: 3,
  samplesTaken: 2,
};
const rover3: Rover = {
  /*: "Rover3",
  vehicleType: "Rover",*/
  position: { xPos: 3, yPos: 8 },
  orientation: "W",
  cameras: 17,
  sampleCapacity: 3,
  samplesTaken: 2,
};
const rover4: Rover = {
  /*name: "Rover4",
  vehicleType: "Rover",*/
  position: { xPos: 3, yPos: 8 },
  orientation: "S",
  cameras: 17,
  sampleCapacity: 3,
  samplesTaken: 2,
};
const rover5: Rover = {
  /*name: "Rover5",
  vehicleType: "Rover",*/
  position: { xPos: 3, yPos: 8 },
  orientation: "E",
  cameras: 17,
  sampleCapacity: 3,
  samplesTaken: 2,
};
const rover6: Rover = {
  /*name: "Rover6",
  vehicleType: "Rover",*/
  position: { xPos: 0, yPos: 5 },
  orientation: "W",
  cameras: 17,
  sampleCapacity: 3,
  samplesTaken: 2,
};
const rover7: Rover = {
  /*name: "Rover7",
  vehicleType: "Rover",*/
  position: { xPos: 2, yPos: 0 },
  orientation: "S",
  cameras: 17,
  sampleCapacity: 3,
  samplesTaken: 2,
};
const rover8: Rover = {
  /*  name: "Rover8",
  vehicleType: "Rover",*/
  position: { xPos: 8, yPos: 6 },
  orientation: "E",
  cameras: 23,
  sampleCapacity: 3,
  samplesTaken: 3,
};
const grid: RectangularGrid = createGrid(8, 8, [rover1], []);
const PLATEAU: Plateau = {
  vehicles: [],
  samples: [],
};

describe("moveVehicleForward", () => {
  test("Moves vehicle 1 square up if orientation is N", () => {
    expect(moveVehicleForward(rover1, grid)).toEqual({
      xPos: 0,
      yPos: 1,
    });
  });
  test("Moves vehicle 1 square to the left if orientation is W", () => {
    expect(moveVehicleForward(rover3, grid)).toEqual({
      xPos: 2,
      yPos: 8,
    });
  });
  test("Moves vehicle 1 square down if orientation is S", () => {
    expect(moveVehicleForward(rover4, grid)).toEqual({
      xPos: 3,
      yPos: 7,
    });
  });
  test("Moves vehicle 1 square to the right if orientation is E", () => {
    expect(moveVehicleForward(rover5, grid)).toEqual({
      xPos: 4,
      yPos: 8,
    });
  });
  test("Moves vehicle 1 square to the right if orientation is E", () => {
    expect(moveVehicleForward(rover5, grid)).toEqual({
      xPos: 4,
      yPos: 8,
    });
  });
  test("Does not move vehicle N if already at top of grid", () => {
    expect(moveVehicleForward(rover2, grid)).toEqual({
      xPos: 3,
      yPos: 8,
    });
  });
  test("Does not move vehicle W if already at left of grid", () => {
    expect(moveVehicleForward(rover6, grid)).toEqual({
      xPos: 0,
      yPos: 5,
    });
  });
  test("Does not move vehicle S if already at bottom of grid", () => {
    expect(moveVehicleForward(rover7, grid)).toEqual({
      xPos: 2,
      yPos: 0,
    });
  });
  test("Does not move vehicle E if already at right of grid", () => {
    expect(moveVehicleForward(rover8, grid)).toEqual({
      xPos: 8,
      yPos: 6,
    });
  });
  test("Does nothing if plateau is not a defined shape", () => {
    expect(moveVehicleForward(rover1, PLATEAU)).toEqual({
      xPos: 0,
      yPos: 0,
    });
  });
});

describe("rotateVehicle", () => {
  test("Changes vehicle's orientation anticlockwise if direction is L", () => {
    expect(rotateVehicle(rover1, "L")).toEqual("W");
    expect(rotateVehicle(rover3, "L")).toEqual("S");
    expect(rotateVehicle(rover4, "L")).toEqual("E");
    expect(rotateVehicle(rover5, "L")).toEqual("N");
  });
  test("Changes vehicle's orientation clockwise if direction is R", () => {
    expect(rotateVehicle(rover1, "R")).toEqual("E");
    expect(rotateVehicle(rover3, "R")).toEqual("N");
    expect(rotateVehicle(rover4, "R")).toEqual("W");
    expect(rotateVehicle(rover5, "R")).toEqual("S");
  });
});

describe("processVehicleInstructions", () => {
  test("Returns original grid if instruction string is empty", () => {
    expect(processVehicleInstructions(grid, 0, "")).toEqual(grid);
  });
  test("Rotates vehicle clockwise if movement string is 'R'", () => {
    expect(processVehicleInstructions(grid, 0, "R")).toEqual({
      ...grid,
      vehicles: [{ ...rover1, orientation: "E" }],
    });
  });
  test("Rotates vehicle anticlockwise if movement string is 'L'", () => {
    expect(processVehicleInstructions(grid, 0, "L")).toEqual({
      ...grid,
      vehicles: [{ ...rover1, orientation: "W" }],
    });
  });
  test("Moves vehicle forward if movement string is 'M'", () => {
    expect(processVehicleInstructions(grid, 0, "M")).toEqual({
      ...grid,
      vehicles: [{ ...rover1, position: { xPos: 0, yPos: 1 } }],
    });
  });
  test("Moves vehicle through multiple orientations", () => {
    expect(processVehicleInstructions(grid, 0, "LL")).toEqual({
      ...grid,
      vehicles: [{ ...rover1, orientation: "S" }],
    });
  });
  test("Moves vehicle through multiple forward movements", () => {
    expect(processVehicleInstructions(grid, 0, "MMMM")).toEqual({
      ...grid,
      vehicles: [{ ...rover1, position: { xPos: 0, yPos: 4 } }],
    });
  });
  test("Moves vehicle through multiple orientations and forward movements", () => {
    expect(processVehicleInstructions(grid, 0, "RMMMMLMML")).toEqual({
      ...grid,
      vehicles: [
        { ...rover1, orientation: "W", position: { xPos: 4, yPos: 2 } },
      ],
    });
  });
  test("Increases samplesTaken if an 'S' is found and adds the sample to the grid", () => {
    expect(processVehicleInstructions(grid, 0, "S")).toEqual({
      ...grid,
      vehicles: [{ ...rover1, samplesTaken: 1 }],
      samples: [{ xPos: 0, yPos: 0 }],
    });
  });
  test("Increases samplesTaken by the correct number of Ss found and adds the samples to the grid", () => {
    expect(processVehicleInstructions(grid, 0, "MSMS")).toEqual({
      ...grid,
      vehicles: [
        { ...rover1, samplesTaken: 2, position: { xPos: 0, yPos: 2 } },
      ],
      samples: [
        { xPos: 0, yPos: 1 },
        { xPos: 0, yPos: 2 },
      ],
    });
  });
});
