import { Grid, Dimension } from "../grid-functions";
import { VehicleType, ROVER_INSTRUCTIONS, ORIENTATIONS } from "../vehicle-functions";

export const parseGridDimension = (input: string): number | undefined => {
  return isNaN(parseInt(input)) ? undefined : parseInt(input);
};


export const parseVehiclePosition = (input: string, grid: Grid, dimension: Dimension): number | undefined => {
    if (isNaN(parseInt(input))) return undefined;
    const dimensionProperty = dimension === "X" ? "maxX" : "maxY";  
    if (parseInt(input) > grid[dimensionProperty] || parseInt(input) < 0) return undefined;
    return parseInt(input);    
  };
  
export const parseMovementString = (vehicleType: VehicleType, input: string) => {
    if (vehicleType === "Rover") {
        return input.split("").filter(ch => ROVER_INSTRUCTIONS.includes(ch)).join("");
    }
    return input;
}

export const parseVehicleOrientation = (vehicleType: VehicleType, input: string) => {
    if (vehicleType === "Rover") {
        return (ORIENTATIONS.includes(input)) ? input : undefined;
    }
    return input;
}