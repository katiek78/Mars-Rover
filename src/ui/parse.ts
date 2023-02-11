import { Grid, Dimension } from "../grid-functions";
import { VehicleType, ROVER_INSTRUCTIONS } from "../vehicle-functions";

export const parseGridDimension = (input: string): number | undefined => {
  return isNaN(parseInt(input)) ? undefined : parseInt(input);
};


export const parseVehiclePositionOnRectangularGrid = (input: string, grid: Grid, dimension: Dimension): number | undefined => {
    if (isNaN(parseInt(input))) return undefined;
    if (dimension === "X") {
        if (parseInt(input) > grid.maxX || parseInt(input) < 0) return undefined;        
    } else {
        if (parseInt(input) > grid.maxY || parseInt(input) < 0) return undefined;        
    }
    return parseInt(input);    
  };
  
export const parseMovementString = (vehicleType: VehicleType, input: string) => {
    if (vehicleType === "Rover") {
        return input.split("").filter(ch => typeof ch === "string" && ROVER_INSTRUCTIONS.includes(ch)).join("");
    }
    return input;
}