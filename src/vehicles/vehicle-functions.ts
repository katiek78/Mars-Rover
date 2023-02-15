import { RectangularGrid, isRectangular } from "../plateaus/grid-functions";
import { Plateau, Position } from "../plateaus/plateau-functions";
import { takeSample } from "./rover-functions";

export const cloneDeep = require("lodash.clonedeep");

export interface Vehicle {
  position: Position;
  orientation: Orientation;
}

export const ORIENTATIONS = ["N", "E", "S", "W"] as const;
export type Orientation = typeof ORIENTATIONS[number];

export type Direction = "L" | "R";
export const ROVER_INSTRUCTIONS = ["L", "R", "M", "S"] as const;

export const moveVehicleForward = (
  vehicle: Pick<Vehicle, "position" | "orientation">,
  plateau: Plateau
) => {
  if (isRectangular(plateau)) {
    switch (vehicle.orientation) {
      case "N":
        return plateau.checkMovement(vehicle, plateau)
          ? { xPos: vehicle.position.xPos, yPos: vehicle.position.yPos + 1 }
          : vehicle.position;
      case "E":
        return plateau.checkMovement(vehicle, plateau)
          ? { xPos: vehicle.position.xPos + 1, yPos: vehicle.position.yPos }
          : vehicle.position;
      case "S":
        return plateau.checkMovement(vehicle, plateau)
          ? { xPos: vehicle.position.xPos, yPos: vehicle.position.yPos - 1 }
          : vehicle.position;
      case "W":
        return plateau.checkMovement(vehicle, plateau)
          ? { xPos: vehicle.position.xPos - 1, yPos: vehicle.position.yPos }
          : vehicle.position;
    }
  } else return vehicle.position;
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
  cameras: number,
  sampleCapacity: number,
  samplesTaken: number
) => {
  return { position, orientation, cameras, sampleCapacity, samplesTaken };
};

export const processAllVehicleInstructions = (
  grid: RectangularGrid,
  vehicleInstructions: Array<string>
) => {
  let newGrid = cloneDeep(grid);
  vehicleInstructions.forEach((vi, i) => {
    newGrid = processVehicleInstructions(newGrid, i, vi);
  });
  return newGrid;
};

export const processVehicleInstructions = (
  grid: RectangularGrid,
  vehicleIndex: number,
  instructionList: string
) => {
  let newGrid = cloneDeep(grid);
  let movingVehicle = structuredClone(newGrid.vehicles[vehicleIndex]);
  instructionList.split("").forEach((instruction) => {
    if (instruction === "L")
      movingVehicle.orientation = rotateVehicle(movingVehicle, "L");
    newGrid.vehicles[vehicleIndex] = movingVehicle;
    if (instruction === "R")
      movingVehicle.orientation = rotateVehicle(movingVehicle, "R");
    newGrid.vehicles[vehicleIndex] = movingVehicle;
    if (instruction === "M")
      movingVehicle.position = moveVehicleForward(movingVehicle, grid);
    newGrid.vehicles[vehicleIndex] = movingVehicle;
    if (instruction === "S") {
      newGrid = takeSample(newGrid, vehicleIndex);
    }
  });

  return newGrid;
};

export function isOrientation(input: string): input is Orientation {
  return input === 'N' || input === 'E' || input === 'S' || input === 'W';
}
