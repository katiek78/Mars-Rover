import { Grid, Dimension } from "../grid-functions";
import {
  ROVER_INSTRUCTIONS,
  ORIENTATIONS,
  Orientation,
} from "../vehicle-functions";

export const parseGridDimension = (input: string): number | undefined => {
  return isNaN(parseInt(input)) ? undefined : parseInt(input);
};

export const parseVehiclePosition = (
  input: string,
  grid: Grid,
  dimension: Dimension
) => {
  if (isNaN(parseInt(input))) return undefined;
  const dimensionProperty = dimension === "X" ? "maxX" : "maxY";
  if (parseInt(input) >= grid[dimensionProperty] || parseInt(input) < 0)
    return undefined;
  return parseInt(input);
};

export const parseMovementString = (
  input: string
) => {  
    return input
      .split("")
      .filter((ch) => ROVER_INSTRUCTIONS.find((el) => el === ch) !== undefined)
      .join("");
};

export const parseVehicleOrientation = (  
  input: string
) => { 
    const legalOrientation = ORIENTATIONS.find((el) => el === input);
    if (legalOrientation === undefined) return undefined;
    const orientation: Orientation = legalOrientation;
    return orientation;  
};

export const parseChoice = (  
  input: string,
  options: String[]
) => { 
  if (isNaN(parseInt(input))) return undefined;
  if (parseInt(input) > options.length || parseInt(input) < 0)
    return undefined;
  return parseInt(input);
};
