export type Vehicle = {
  name: string;
  type: VehicleType;
  position: { xPos: number; yPos: number };
};
type VehicleType = "Rover"; //can be extended if other vehicle types need to be added
type Orientation = "N" | "E" | "S" | "W";
type Position = { xPos: number; yPos: number };

export const moveVehicleForward = (
  vehicle: Vehicle,
  orientation: Orientation,
  position: Position
) => {
  return { xPos: 0, yPos: 1 };
};
