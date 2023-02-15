import { Vehicle, Orientation } from "./vehicle-functions";
import { Plateau, Position } from "../plateaus/plateau-functions";
import { cloneDeep } from "./vehicle-functions";

export const ROVER_INSTRUCTIONS = ["L", "R", "M", "S"] as const;

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

export const takeSample = (plateau: Plateau, vehicleIndex: number) => {
  const currentVehicle = plateau.vehicles[vehicleIndex];
  if (!isRover(currentVehicle)) return;
  if (currentVehicle.samplesTaken + 1 > currentVehicle.sampleCapacity) {
    return plateau;
  } else {
    const newPlateau = cloneDeep(plateau);
    newPlateau.vehicles[vehicleIndex].samplesTaken++;
    newPlateau.samples.push(newPlateau.vehicles[vehicleIndex].position);
    return newPlateau;
  }
};
