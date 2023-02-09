export type Vehicle = {
  name: string;
  type: VehicleType;
  position: { xPos: number; yPos: number },
  orientation: Orientation;
};
type VehicleType = "Rover"; //can be extended if other vehicle types need to be added
type Orientation = "N" | "E" | "S" | "W";
type Position = { xPos: number; yPos: number };


export const moveVehicleForward = (
  vehicle: Vehicle
) => {
  return { xPos: vehicle.position.xPos, yPos: vehicle.position.yPos + 1 };
};
