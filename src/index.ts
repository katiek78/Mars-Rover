import { RectangularGrid, createGrid } from "./plateaus/grid-functions";
import { Position } from "./plateaus/plateau-functions";
import { print, yn, promptColour as prompt } from "./ui/console";
import {
  parseGridDimension,
  parseVehiclePosition,
  parseVehicleOrientation,
  parseMovementString,
  parseChoice,
} from "./ui/parse";
import {
  Rover,
  Vehicle,
  createRover,
  processAllVehicleInstructions,
  isRover
} from "./vehicles/vehicle-functions";

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
          rowString += grid.samples.filter((s) => s.xPos === j && s.yPos === i)
            .length
            ? "  R  ".yellow
            : "  R  ".green;
          found = true;
          break;
        }
      }
      if (!found)
        rowString += grid.samples.filter((s) => s.xPos === j && s.yPos === i)
          .length
          ? "  .  ".yellow
          : "  .  ".green;
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
      "Please specify the Rover's movements (M for forward / L for left / R for right / S to take sample): "
    );
    let roverMovements = parseMovementString(roverMovementInput);
    while (roverMovements === undefined) {
      roverMovementInput = prompt(
        "Invalid input. Please specify the Rover's movements (M for forward / L for left / R for right): "
      );
      roverMovements = parseMovementString(roverMovementInput);
    }

    const rover: Rover = createRover(position, orientation, 23, 10, 0);
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
    print(
      `${v.position.xPos} ${v.position.yPos} ${v.orientation} - Samples taken: ${isRover(v) ? v.samplesTaken : ''}/${isRover(v) ? v.sampleCapacity : ''}`
    );
  });
};

const printNewVehicles = (vehicles: Array<Vehicle>) => {
  print("--------------");
  print("New positions:");
  vehicles.forEach((v) =>
    print(
      `${v.position.xPos.toString()} ${v.position.yPos.toString()} ${
        v.orientation
      } - Samples taken: ${isRover(v) ? v.samplesTaken : ''}/${isRover(v) ? v.sampleCapacity : ''}`
    )
  );
};

const offerChoice = (grid: RectangularGrid) => {
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
      displayGrid(grid);
      offerChoice(grid);
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
