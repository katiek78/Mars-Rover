import { Plateau, Dimension, Position } from "./plateau-functions"
import { Vehicle, Rover } from "../vehicles/vehicle-functions";




export interface RectangularGrid extends Plateau {
  maxX: number;
  maxY: number;
};

export const createGrid = (
  maxX: number,
  maxY: number,
  vehicles: Array<Rover>,
  samples: Array<Position>
) => {
  return { maxX, maxY, vehicles, samples };
};

export const checkRectangularGridMovement = (vehicle: Pick<Vehicle, 'position' | 'orientation'>, grid: Pick<RectangularGrid, 'maxX' | 'maxY'>) => {
  switch (vehicle.orientation) {
    case "N":
      return vehicle.position.yPos + 1 < grid.maxY;
    case "E":
      return vehicle.position.xPos + 1 < grid.maxX;
    case "S":
      return vehicle.position.yPos - 1 >= 0;
    case "W":
      return vehicle.position.xPos - 1 >= 0;
  }
};