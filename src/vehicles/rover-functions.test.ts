import {
  Rover,
  createRover,
  isRover,
  isRoverInstruction,
} from "./rover-functions";
import { Vehicle } from "./vehicle-functions";

describe("createRover", () => {
  test("Creates a Rover with the given parameters", () => {
    const outputRover = {
      position: { xPos: 0, yPos: 0 },
      orientation: "N",
      cameras: 23,
      sampleCapacity: 10,
      samplesTaken: 1,
      photos: [],
    };

    const outputRover2 = {
      position: { xPos: 10, yPos: 10 },
      orientation: "S",
      cameras: 5,
      sampleCapacity: 0,
      samplesTaken: 0,
      photos: [{ xPos: 3, yPos: 5 }],
    };
    const outputRover3 = {
      position: { xPos: 10, yPos: 10 },
      orientation: "S",
      cameras: 5,
      sampleCapacity: 0,
      samplesTaken: 0,
      photos: [
        { xPos: 3, yPos: 5 },
        { xPos: 3, yPos: 7 },
      ],
    };
    expect(createRover({ xPos: 0, yPos: 0 }, "N", 23, 10, 1, [])).toEqual(
      outputRover
    );
    expect(
      createRover({ xPos: 10, yPos: 10 }, "S", 5, 0, 0, [{ xPos: 3, yPos: 5 }])
    ).toEqual(outputRover2);
    expect(
      createRover({ xPos: 10, yPos: 10 }, "S", 5, -1, 0, [
        { xPos: 3, yPos: 5 },
        { xPos: 3, yPos: 7 },
      ])
    ).toEqual(outputRover3);
  });
});

describe("isRover", () => {
  const ROVER1: Rover = {
    position: { xPos: 0, yPos: 0 },
    orientation: "N",
    cameras: 0,
    sampleCapacity: 10,
    samplesTaken: 0,
    photos: [],
  };

  const VEHICLE1: Vehicle = {
    position: { xPos: 0, yPos: 0 },
    orientation: "N",
  };

  test("Returns true if a vehicle is a Rover", () => {
    expect(isRover(ROVER1)).toBeTruthy();
  });
  test("Returns false if a vehicle is not a Rover", () => {
    expect(isRover(VEHICLE1)).toBeFalsy();
  });
});

describe("isRoverInstruction", () => {
  test("Returns true if an instruction is a Rover instruction", () => {
    expect(isRoverInstruction("L")).toBeTruthy();
    expect(isRoverInstruction("R")).toBeTruthy();
    expect(isRoverInstruction("M")).toBeTruthy();
    expect(isRoverInstruction("S")).toBeTruthy();
  });
  test("Returns false if an instruction is not a Rover instruction", () => {
    expect(isRoverInstruction("J")).toBeFalsy();
    expect(isRoverInstruction("")).toBeFalsy();
    expect(isRoverInstruction("SS")).toBeFalsy();
  });
});
