import { Vehicle, moveVehicleForward } from "./vehicle-functions";

describe("moveVehicleForward", () => {
  const Rover1: Vehicle = {
    name: "Rover1",
    type: "Rover",
    position: { xPos: 0, yPos: 0 },
  };
  test("Moves vehicle 1 square up if orientation is N", () => {
    expect(moveVehicleForward(Rover1, "N", { xPos: 0, yPos: 0 })).toEqual({
      xPos: 0,
      yPos: 1,
    });
  });
});
