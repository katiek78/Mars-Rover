import { Vehicle, Orientation } from "./vehicle-functions";
import { Position } from "../plateaus/plateau-functions";

export const ROVER_INSTRUCTIONS = ["L", "R", "M", "S", "P"] as const;
export type RoverInstruction = typeof ROVER_INSTRUCTIONS[number];

export interface Rover extends Vehicle {
  cameras: number;
  sampleCapacity: number;
  samplesTaken: number;
  photos: Array<Position>;
}

export const createRover = (
  position: Position,
  orientation: Orientation,
  cameras: number,
  sampleCapacity: number,
  samplesTaken: number,
  photos: Array<Position>
) => {
  return {
    position,
    orientation,
    cameras,
    sampleCapacity: sampleCapacity >= 0 ? sampleCapacity : 0,
    samplesTaken,
    photos
  };
};

export function isRover(vehicle: Vehicle): vehicle is Rover {
  return "sampleCapacity" in vehicle;
}

export function isRoverInstruction(str: string): str is RoverInstruction {
    return str === "L" || str === "R" || str === "M" || str === "S" || str === "P";
  }

