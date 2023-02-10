import { createGrid } from "./grid-functions";
import { ORIENTATIONS, createVehicle, processMovementString } from "./vehicle-functions";

export const processTextInstructions = (instructionList: string) => {
 
    const instructionArray = instructionList.split('\n');
    console.log(instructionArray);
    let output = "";
    
    //create grid
    const gridLine = instructionArray[0];
    const maxX = parseInt(gridLine.split(" ")[0]);
    const maxY = parseInt(gridLine.split(" ")[1]);
    const grid = createGrid(maxX, maxY);
        
    for (let line=1; line < instructionArray.length; line+= 2) {
     
        //create vehicle
        const vehicleDataLine = instructionArray[line];
        const xPos = parseInt(vehicleDataLine.split(" ")[0]);
        const yPos = parseInt(vehicleDataLine.split(" ")[1]);
        const orientation = ORIENTATIONS[ORIENTATIONS.indexOf(vehicleDataLine.split(" ")[2])];        
        if (ORIENTATIONS.indexOf(orientation) === -1) return null;
        if (isNaN(xPos) || isNaN(yPos)) return null;        
        const vehiclePosition = {xPos, yPos};
        const vehicle = createVehicle("", "Rover", vehiclePosition, orientation, grid);
        console.log(JSON.stringify(vehicle));

        //process movements for above vehicle
        if (line + 1 < instructionArray.length && instructionArray[line + 1] !== '') {
            const newVehicleData = processMovementString(vehicle, grid, instructionArray[line+1]);
            console.log(instructionArray[line+1]);
            output += `${line == 1 ? '' : '\n'}${newVehicleData.position.xPos} ${newVehicleData.position.yPos} ${newVehicleData.orientation}`;            
        } else {
            output += `${line == 1 ? '' : '\n'}${vehicle.position.xPos} ${vehicle.position.yPos} ${vehicle.orientation}`;
        }

        
    }

    return output;
};
    