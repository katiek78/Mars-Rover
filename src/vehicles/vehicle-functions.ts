import { Grid, Position } from "../plateaus/grid-functions";

export interface Vehicle {
  position: Position;
  orientation: Orientation;  
}

export interface Rover extends Vehicle {
  cameras: number;
  sampleCapacity: number;
  samplesTaken: number;
}

export const ORIENTATIONS = ["N", "E", "S", "W"] as const;
export type Orientation = typeof ORIENTATIONS[number];

export type Direction = "L" | "R";
export const ROVER_INSTRUCTIONS = ["L", "R", "M", "S"] as const;

export const moveVehicleForward = (vehicle: Vehicle, grid: Grid) => {
  switch (vehicle.orientation) {
    case "N":
      return vehicle.position.yPos + 1 < grid.maxY
        ? { xPos: vehicle.position.xPos, yPos: vehicle.position.yPos + 1 }
        : vehicle.position;
    case "E":
      return vehicle.position.xPos + 1 < grid.maxX
        ? { xPos: vehicle.position.xPos + 1, yPos: vehicle.position.yPos }
        : vehicle.position;
    case "S":
      return vehicle.position.yPos - 1 >= 0
        ? { xPos: vehicle.position.xPos, yPos: vehicle.position.yPos - 1 }
        : vehicle.position;
    case "W":
      return vehicle.position.xPos - 1 >= 0
        ? { xPos: vehicle.position.xPos - 1, yPos: vehicle.position.yPos }
        : vehicle.position;
  }
};

export const rotateVehicle = (vehicle: Vehicle, direction: Direction) => {
  if (vehicle.orientation === "N" && direction == "L") return "W";
  if (vehicle.orientation === "W" && direction == "R") return "N";
  return direction === "L"
    ? ORIENTATIONS[ORIENTATIONS.indexOf(vehicle.orientation) - 1]
    : ORIENTATIONS[ORIENTATIONS.indexOf(vehicle.orientation) + 1];
};

export const createRover = (
  position: Position,
  orientation: Orientation,
  grid: Grid,
  cameras: number,
  sampleCapacity: number,
  samplesTaken: number
) => {
  return { position, orientation, grid, cameras, sampleCapacity, samplesTaken };
};

export const processVehicleInstructions = (
  vehicle: Rover,
  grid: Grid,
  movementString: string
) => {
  const movingVehicle = structuredClone(vehicle);
  movementString.split("").forEach((instruction) => {
    if (instruction === "L")
      movingVehicle.orientation = rotateVehicle(movingVehicle, "L");
    if (instruction === "R")
      movingVehicle.orientation = rotateVehicle(movingVehicle, "R");
    if (instruction === "M")
      movingVehicle.position = moveVehicleForward(movingVehicle, grid);
    if (instruction === "S")
      movingVehicle.samplesTaken = takeSample(movingVehicle, grid);
  });

  return movingVehicle;
};

export const takeSample = (rover: Rover, grid: Grid) => {  
  if (rover.samplesTaken + 1 > rover.sampleCapacity) {
    return rover.samplesTaken;
  } else return rover.samplesTaken + 1;
}