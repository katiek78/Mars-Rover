import { Rover } from "../vehicles/vehicle-functions"

export type Dimension = "X" | "Y";

export type Position = { xPos: number; yPos: number };

export interface Plateau {
    vehicles: Array<Rover>;
    samples: Array<Position>;
  }