import { Plateau, Dimension, Position } from "./plateau-functions"
import { Vehicle, Rover } from "../vehicles/vehicle-functions";

export interface RectangularGrid extends Plateau {
  maxX: number;
  maxY: number;
  checkMovement: (vehicle: Pick<Vehicle, 'position' | 'orientation'>, grid: Pick<RectangularGrid, 'maxX' | 'maxY'>) => boolean;
};

export const createGrid = (
  maxX: number,
  maxY: number,  
  vehicles: Array<Rover>,
  samples: Array<Position>
) => {
  return { maxX, maxY, checkMovement: checkRectangularGridMovement, vehicles, samples };
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