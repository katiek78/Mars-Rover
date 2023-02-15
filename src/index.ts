import { RectangularGrid, createGrid, isRectangular } from "./plateaus/grid-functions";
import { Plateau, Position } from "./plateaus/plateau-functions";
import { print, yn, promptColour as prompt } from "./ui/console";
import {
  parseGridDimension,
  parseVehiclePositionOnGrid,
  parseVehicleOrientation,
  parseInstructionList,
  parseChoice,
} from "./ui/parse";
import {
  Vehicle,  
  processAllVehicleInstructions,
} from "./vehicles/vehicle-functions";
import { Rover, createRover, isRover } from "./vehicles/rover-functions";

const getGrid = (): RectangularGrid => {
  let maxXInput = prompt(`Please specify the grid width (X): `);
  let maxX = parseGridDimension(maxXInput);
  while (maxX === undefined) {
    maxXInput = prompt(
      `Invalid input. Please specify the grid width (X) as a number: `
    );
    maxX = parseGridDimension(maxXInput);
  }

  let maxYInput = prompt(`Please specify the grid width (Y): `);
  let maxY = parseGridDimension(maxYInput);
  while (maxY === undefined) {
    maxYInput = prompt(
      `Invalid input. Please specify the grid width (Y) as a number: `
    );
    maxY = parseGridDimension(maxYInput);
  }

  return createGrid(maxX, maxY, [], []);
};

const displayGrid = (grid: RectangularGrid) => {
  print("");

  for (let i = grid.maxY - 1; i >= 0; i--) {
    let found = false;
    let rowString = "";
    for (let j = 0; j < grid.maxX; j++) {
      found = false;
      for (let v = 0; v < grid.vehicles.length; v++) {
        if (
          grid.vehicles[v].position.xPos === j &&
          grid.vehicles[v].position.yPos === i
        ) {
          /*
          
          rowString += grid.samples.filter((s) => s.xPos === j && s.yPos === i)
            .length
            ? "  R  ".blue
            : "  R  ".green;
            */
            const foundSample: boolean = grid.samples.filter((s) => s.xPos === j && s.yPos === i).length > 0;        
            let foundPhoto = false;
             for (let v = 0; v < grid.vehicles.length; v++) {
               const currentVehicle = grid.vehicles[v];
               if (!isRover(currentVehicle)) break;
               if (currentVehicle.photos.filter((p) => p.xPos === j && p.yPos === i).length > 0) {
                 foundPhoto = true;
                 break;
               }
             }
             if (foundSample && foundPhoto) {
               rowString += "  R  ".magenta;
             } else if (foundPhoto) {
               rowString += "  R  ".red;
             } else if (foundSample) {
               rowString += "  R  ".blue;
             } else rowString += "  R  ".green;


          found = true;
          break;
        }
      }
      if (!found) {       
        const foundSample: boolean = grid.samples.filter((s) => s.xPos === j && s.yPos === i).length > 0;        
         let foundPhoto = false;
          for (let v = 0; v < grid.vehicles.length; v++) {
            const currentVehicle = grid.vehicles[v];
            if (!isRover(currentVehicle)) break;
            if (currentVehicle.photos.filter((p) => p.xPos === j && p.yPos === i).length > 0) {
              foundPhoto = true;
              break;
            }
          }
          if (foundSample && foundPhoto) {
            rowString += "  *  ".magenta;
          } else if (foundPhoto) {
            rowString += "  *  ".red;
          } else if (foundSample) {
            rowString += "  *  ".blue;
          } else rowString += "  *  ".green;
      }
      
    }
    print(rowString);
  }
};

const getVehicleInstructions = (grid: RectangularGrid) => {
  const roverInstructions: Array<string> = [];
  let vehicleCounter = 0;

  //Currently getVehicleDetails only gets Rover details but could be extended to allow other vehicle details to be obtained
  const getVehicleDetails = (): void => {
    print("");
    print(`Rover ${vehicleCounter + 1}:`);
    let xPosInput = prompt(`Please specify the Rover's X position: `);
    let xPos = parseVehiclePositionOnGrid(xPosInput, grid, "X");
    while (xPos === undefined) {
      xPosInput = prompt(
        `Invalid input. Please specify the Rover's X position (as a number) within the specified grid: `
      );
      xPos = parseGridDimension(xPosInput);
    }
    let yPosInput = prompt(`Please specify the Rover's Y position: `);
    let yPos = parseVehiclePositionOnGrid(yPosInput, grid, "Y");
    while (yPos === undefined) {
      yPosInput = prompt(
        `Invalid input. Please specify the Rover's Y position (as a number) within the specified grid: `
      );
      yPos = parseGridDimension(yPosInput);
    }
    const position: Position = { xPos, yPos };

    let orientationInput = prompt(
      "Please specify the Rover's orientation (N/E/S/W): "
    );
    let orientation = parseVehicleOrientation(orientationInput);
    while (orientation === undefined) {
      orientationInput = prompt(
        "Invalid input. Please specify the Rover's orientation (N/E/S/W): "
      );
      orientation = parseVehicleOrientation(orientationInput);
    }

    let roverMovementInput = prompt(
      "Please specify the Rover's movements (M for forward / L for left / R for right / S to take sample): "
    );
    let roverMovements = parseInstructionList(roverMovementInput);
    while (roverMovements === undefined) {
      roverMovementInput = prompt(
        "Invalid input. Please specify the Rover's movements (M for forward / L for left / R for right): "
      );
      roverMovements = parseInstructionList(roverMovementInput);
    }

    const rover: Rover = createRover(position, orientation, 23, 10, 0, []);
    grid.vehicles.push(rover);
    roverInstructions.push(roverMovements);
  };

  getVehicleDetails();

  while (yn(prompt("Do you want to add details for another Rover? "))) {
    vehicleCounter++;
    getVehicleDetails();
  }

  return roverInstructions;
};

const printGridAndVehicles = (grid: RectangularGrid) => {
  print("---------------------------------------");
  print("Grid dimensions and existing positions:");
  print(`${grid.maxX} ${grid.maxY}`);

  grid.vehicles.forEach((v) => {
    if (isRover(v)) {
      print(
        `${v.position.xPos} ${v.position.yPos} ${v.orientation} - Samples taken: ${v.samplesTaken}/${v.sampleCapacity}`
      );
    } else {
      print(`${v.position.xPos} ${v.position.yPos} ${v.orientation}`);
    }
  });
};

const printNewVehicles = (vehicles: Array<Vehicle>) => {
  print("--------------");
  print("New positions:");
  vehicles.forEach((v) => {
    if (isRover(v)) {
      print(
        `${v.position.xPos.toString()} ${v.position.yPos.toString()} ${
          v.orientation
        } - Samples taken: ${v.samplesTaken}/${v.sampleCapacity}`
      );
    } else {
      print(
        `${v.position.xPos.toString()} ${v.position.yPos.toString()} ${
          v.orientation
        }`
      );
    }
  });
};

const offerChoice = (plateau: Plateau) => {
  print("What would you like to do next?");  
  const OPTIONS = [
    "View vehicle positions",
    "Redefine grid, vehicles and movements",
    "Exit",
  ];
  OPTIONS.forEach((o, i) => print(`   ${i + 1} - ${o}`));
  let choice = parseChoice(
    prompt(
      `Please select a number between 1 and ${OPTIONS.length.toString()}: `
    ),
    OPTIONS
  );
  switch (choice) {
    case 1:
      if (isRectangular(plateau)) displayGrid(plateau);
      offerChoice(plateau);
      break;
    case 2:
      operateMarsVehicles();
      break;
    case 3:
      return;
  }
};

const welcome = (): void => {
  console.clear();
  print("------------------------------------------------");
  print("| Welcome to the Mars Rover Operations Centre! |");
  print("------------------------------------------------");
  operateMarsVehicles();
};

const operateMarsVehicles = (): void => {
  let grid = getGrid();
  const roverInstructions: Array<string> = getVehicleInstructions(grid);
  printGridAndVehicles(grid);
  grid = processAllVehicleInstructions(grid, roverInstructions);
  printNewVehicles(grid.vehicles);

  offerChoice(grid);
};

welcome();
