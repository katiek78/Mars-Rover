export type Vehicle = {
  name: string;
  type: VehicleType;
  position: Position,
  orientation: Orientation;
};
type VehicleType = "Rover"; //can be extended if other vehicle types need to be added
type Orientation = "N" | "E" | "S" | "W";
type Position = { xPos: number; yPos: number };


export const moveVehicleForward = (
  vehicle: Vehicle
) => {
    switch (vehicle.orientation) {
        case ( "N"):
            return { xPos: vehicle.position.xPos, yPos: vehicle.position.yPos + 1 };
        case ("E"):
            return { xPos: vehicle.position.xPos + 1, yPos: vehicle.position.yPos };
        case ("S"):
            return { xPos: vehicle.position.xPos, yPos: vehicle.position.yPos - 1 };
        case ("W"):
            return { xPos: vehicle.position.xPos - 1, yPos: vehicle.position.yPos };
    }
  
};
