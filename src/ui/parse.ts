import { RectangularGrid } from "../plateaus/grid-functions";
import { Dimension } from "../plateaus/plateau-functions";
import { isOrientation } from "../vehicles/vehicle-functions";
import { isRoverInstruction } from "../vehicles/rover-functions";

export const parseGridDimension = (input: string) => {
  return isNaN(parseInt(input)) ? undefined : parseInt(input);
};

export const parseVehiclePositionOnGrid = (
  input: string,
  grid: Pick<RectangularGrid, "maxX" | "maxY">,
  dimension: Dimension
) => {
  if (isNaN(parseInt(input)) || parseInt(input) < 0) return undefined;
  const dimensionProperty = dimension === "X" ? "maxX" : "maxY";
  if (parseInt(input) >= grid[dimensionProperty]) return undefined;
  return parseInt(input);
};

export const parseInstructionList = (input: string) => {
  return input
    .split("")
    .filter((ch) => isRoverInstruction(ch))
    .join("");
};

export const parseVehicleOrientation = (input: string) => {
  return isOrientation(input) ? input : undefined;
};

export const parseChoice = (input: string, options: String[]) => {
  if (
    isNaN(parseInt(input)) ||
    parseInt(input) < 0 ||
    parseInt(input) > options.length
  )
    return undefined;
  return parseInt(input);
};
