import { Grid, Dimension } from "../grid-functions";

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
    //return (isNaN(parseInt(input)) || (dimension === "X" && (parseInt(input) > grid.maxX || parseInt(input) < 0 )) ? undefined : parseInt(input);
  };
  