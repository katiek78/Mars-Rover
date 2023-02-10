import {
  Vehicle,
  moveVehicleForward,
  rotateVehicle,
} from "./vehicle-functions";

const Rover1: Vehicle = {
  name: "Rover1",
  type: "Rover",
  position: { xPos: 0, yPos: 0 },
  orientation: "N",
};
const Rover2: Vehicle = {
  name: "Rover2",
  type: "Rover",
  position: { xPos: 3, yPos: 8 },
  orientation: "N",
};
const Rover3: Vehicle = {
  name: "Rover3",
  type: "Rover",
  position: { xPos: 3, yPos: 8 },
  orientation: "W",
};
const Rover4: Vehicle = {
  name: "Rover4",
  type: "Rover",
  position: { xPos: 3, yPos: 8 },
  orientation: "S",
};
const Rover5: Vehicle = {
  name: "Rover5",
  type: "Rover",
  position: { xPos: 3, yPos: 8 },
  orientation: "E",
};

describe("moveVehicleForward", () => {
  test("Moves vehicle 1 square up if orientation is N", () => {
    expect(moveVehicleForward(Rover1)).toEqual({
      xPos: 0,
      yPos: 1,
    });
    expect(moveVehicleForward(Rover2)).toEqual({
      xPos: 3,
      yPos: 9,
    });
  });
  test("Moves vehicle 1 square to the left if orientation is W", () => {
    expect(moveVehicleForward(Rover3)).toEqual({
      xPos: 2,
      yPos: 8,
    });
  });
  test("Moves vehicle 1 square down if orientation is S", () => {
    expect(moveVehicleForward(Rover4)).toEqual({
      xPos: 3,
      yPos: 7,
    });
  });
  test("Moves vehicle 1 square to the right if orientation is E", () => {
    expect(moveVehicleForward(Rover5)).toEqual({
      xPos: 4,
      yPos: 8,
    });
  });
});

describe("rotateVehicle", () => {
  test("Changes vehicle's orientation anticlockwise if direction is L", () => {
    expect(rotateVehicle(Rover1, "L")).toEqual("W");
    expect(rotateVehicle(Rover3, "L")).toEqual("S");
    expect(rotateVehicle(Rover4, "L")).toEqual("E");
    expect(rotateVehicle(Rover5, "L")).toEqual("N");
  });
  test("Changes vehicle's orientation clockwise if direction is R", () => {
    expect(rotateVehicle(Rover1, "R")).toEqual("E");
    expect(rotateVehicle(Rover3, "R")).toEqual("N");
    expect(rotateVehicle(Rover4, "R")).toEqual("W");
    expect(rotateVehicle(Rover5, "R")).toEqual("S");
  });
});
