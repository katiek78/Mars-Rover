import { Grid, createGrid } from "./grid-functions";
import { print, yn, promptColour as prompt } from "./ui/console";
import {
  parseGridDimension,
  parseVehiclePosition,
  parseVehicleOrientation,
  parseMovementString,
  parseChoice,
} from "./ui/parse";
import {
  Vehicle,
  Rover,
  Position,
  createRover,
  processVehicleInstructions,
} from "./vehicle-functions";

const getGrid = (): Grid => {
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

  return createGrid(maxX, maxY);
};

const displayGrid = (grid: Grid, vehicles: Array<Vehicle>) => {
  print("");
  //for each grid line we go through and print . for no vehicle and R for a rover (with spaces)
  for (let i = grid.maxY - 1; i >= 0; i--) {
    let found = false;
    let rowString = "";
    for (let j = 0; j < grid.maxX; j++) {
      found = false;
      for (let v = 0; v < vehicles.length; v++) {
        if (
          vehicles[v].position.xPos === j &&
          vehicles[v].position.yPos === i
        ) {
          rowString += "  R  ";
          found = true;
          break;
        }
      }
      if (!found) rowString += "  .  ";
    }
    print(rowString);
  }
};

const getVehicleInstructions = (grid: Grid): Array<[Vehicle, string]> => {
  const vehicleInstructions: Array<[Vehicle, string]> = [];
  let vehicleCounter = 1;

  //Currently getVehicleDetails only gets Rover details but could be extended to allow other vehicle details to be obtained
  const getVehicleDetails = (): void => {
    print("");
    print(`Rover ${vehicleCounter}:`);
    let xPosInput = prompt(`Please specify the Rover's X position: `);
    let xPos = parseVehiclePosition(xPosInput, grid, "X");
    while (xPos === undefined) {
      xPosInput = prompt(
        `Invalid input. Please specify the Rover's X position (as a number) within the specified grid: `
      );
      xPos = parseGridDimension(xPosInput);
    }
    let yPosInput = prompt(`Please specify the Rover's Y position: `);
    let yPos = parseVehiclePosition(yPosInput, grid, "Y");
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
      "Please specify the Rover's movements (M for forward / L for left / R for right): "
    );
    let roverMovements = parseMovementString(roverMovementInput);
    while (roverMovements === undefined) {
      roverMovementInput = prompt(
        "Invalid input. Please specify the Rover's movements (M for forward / L for left / R for right): "
      );
      roverMovements = parseMovementString(roverMovementInput);
    }

    const rover: Rover = createRover(position, orientation, grid, 23);
    vehicleInstructions.push([rover, roverMovements]);
  };

  getVehicleDetails();

  while (yn(prompt("Do you want to add details for another Rover? "))) {
    vehicleCounter++;
    getVehicleDetails();
  }

  return vehicleInstructions;
};

const printGridAndVehicles = (
  grid: Grid,
  vehicleInstructions: Array<[Vehicle, string]>
) => {
  print("---------------------------------------");
  print("Grid dimensions and existing positions:");
  print(`${grid.maxX} ${grid.maxY}`);

  vehicleInstructions.forEach((vehicleMovement) => {
    const vehicle: Vehicle = vehicleMovement[0];
    print(
      `${vehicle.position.xPos} ${vehicle.position.yPos} ${vehicle.orientation}`
    );
  });
};

const processAllVehicleInstructions = (
  grid: Grid,
  vehicleInstructions: Array<[Vehicle, string]>
) => {
  return vehicleInstructions.map((vehicleInstruction) => {
    const vehicle: Vehicle = vehicleInstruction[0];
    const instructionList = vehicleInstruction[1];
    return processVehicleInstructions(vehicle, grid, instructionList);
  });
};

const printNewVehicles = (vehicles: Array<Vehicle>) => {
  print("--------------");
  print("New positions:");
  vehicles.forEach((v) =>
    print(
      `${v.position.xPos.toString()} ${v.position.yPos.toString()} ${
        v.orientation
      }`
    )
  );
};

const operateMarsVehicles = (): void => {
  console.clear();
  print("------------------------------------------------");
  print("| Welcome to the Mars Rover Operations Centre! |");
  print("------------------------------------------------");

  const grid = getGrid();
  const vehicleInstructions: Array<[Vehicle, string]> =
    getVehicleInstructions(grid);
  printGridAndVehicles(grid, vehicleInstructions);
  const vehicles: Array<Vehicle> = processAllVehicleInstructions(
    grid,
    vehicleInstructions
  );
  printNewVehicles(vehicles);

  print("What would you like to do next?");
  const OPTIONS = [
    "View vehicle positions",
    "Redefine grid, vehicles and movements",
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
      displayGrid(grid, vehicles);
      break;
    case 2:
      operateMarsVehicles();
  }
};

operateMarsVehicles();
