import { Vehicle, moveVehicleForward } from "./vehicle-functions";

describe("moveVehicleForward", () => {
  const Rover1: Vehicle = {
    name: "Rover1",
    type: "Rover",
    position: { xPos: 0, yPos: 0 },
    orientation: "N"
  };
  const Rover2: Vehicle = {
    name: "Rover1",
    type: "Rover",
    position: { xPos: 3, yPos: 8 },
    orientation: "N"
  };

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
});
