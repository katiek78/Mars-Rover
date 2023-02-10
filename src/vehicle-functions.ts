export type Vehicle = {
  name: string;
  type: VehicleType;
  position: Position;
  orientation: Orientation;
};

const ORIENTATIONS = ["N", "E", "S", "W"] as const;
type VehicleType = "Rover"; //can be extended if other vehicle types need to be added
type Orientation = typeof ORIENTATIONS[number];
type Position = { xPos: number; yPos: number };
type Direction = "L" | "R";

export const moveVehicleForward = (vehicle: Vehicle) => {
  switch (vehicle.orientation) {
    case "N":
      return { xPos: vehicle.position.xPos, yPos: vehicle.position.yPos + 1 };
    case "E":
      return { xPos: vehicle.position.xPos + 1, yPos: vehicle.position.yPos };
    case "S":
      return { xPos: vehicle.position.xPos, yPos: vehicle.position.yPos - 1 };
    case "W":
      return { xPos: vehicle.position.xPos - 1, yPos: vehicle.position.yPos };
  }
};

export const rotateVehicle = (vehicle: Vehicle, direction: Direction) => {
  if (vehicle.orientation === "N" && direction == "L") return "W";
  if (vehicle.orientation === "W" && direction == "R") return "N";
  return direction === "L"
    ? ORIENTATIONS[ORIENTATIONS.indexOf(vehicle.orientation) - 1]
    : ORIENTATIONS[ORIENTATIONS.indexOf(vehicle.orientation) + 1];
};
