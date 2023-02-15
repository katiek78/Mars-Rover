import { RectangularGrid, isRectangular } from "../plateaus/grid-functions";
import { Plateau, Position } from "../plateaus/plateau-functions";
import { isRover} from "./rover-functions";

export const cloneDeep = require("lodash.clonedeep");

export interface Vehicle {
  position: Position;
  orientation: Orientation;
}

export const ORIENTATIONS = ["N", "E", "S", "W"] as const;
export type Orientation = typeof ORIENTATIONS[number];

export type Direction = "L" | "R";

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
  plateau: Plateau,
  vehicleIndex: number,
  instructionList: string
) => {
  let newPlateau: Plateau = cloneDeep(plateau);
  const movingVehicle: Vehicle = cloneDeep(newPlateau.vehicles[vehicleIndex]);
  for (let i = 0; i < instructionList.split("").length; i++) {    
    const instruction = instructionList[i];
    if (instruction === "L")
      movingVehicle.orientation = rotateVehicle(movingVehicle, "L");
    newPlateau.vehicles[vehicleIndex] = movingVehicle;
    if (instruction === "R")
      movingVehicle.orientation = rotateVehicle(movingVehicle, "R");
    newPlateau.vehicles[vehicleIndex] = movingVehicle;
    if (instruction === "M")
      movingVehicle.position = moveVehicleForward(movingVehicle, plateau);
    newPlateau.vehicles[vehicleIndex] = movingVehicle;
    if (instruction === "S") {        
      if (isRover(movingVehicle) && movingVehicle.samplesTaken + 1 <= movingVehicle.sampleCapacity) {
        movingVehicle.samplesTaken++;        
        newPlateau.samples.push(newPlateau.vehicles[vehicleIndex].position);
      }
    }
  };

  return newPlateau;
};

export function isOrientation(input: string): input is Orientation {
  return input === 'N' || input === 'E' || input === 'S' || input === 'W';
}
