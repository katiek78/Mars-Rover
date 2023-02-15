import { Vehicle, Orientation } from "./vehicle-functions";
import { Plateau, Position } from "../plateaus/plateau-functions";
import { cloneDeep } from "./vehicle-functions";

export const ROVER_INSTRUCTIONS = ["L", "R", "M", "S"] as const;
export type RoverInstruction = typeof ROVER_INSTRUCTIONS[number];

export interface Rover extends Vehicle {
  cameras: number;
  sampleCapacity: number;
  samplesTaken: number;
}

export const createRover = (
  position: Position,
  orientation: Orientation,
  cameras: number,
  sampleCapacity: number,
  samplesTaken: number
) => {
  return {
    position,
    orientation,
    cameras,
    sampleCapacity: sampleCapacity >= 0 ? sampleCapacity : 0,
    samplesTaken,
  };
};

export function isRover(vehicle: Vehicle): vehicle is Rover {
  return "sampleCapacity" in vehicle;
}

export function isRoverInstruction(str: string): str is RoverInstruction {
    return str === "L" || str === "R" || str === "M" || str === "S";
  }

