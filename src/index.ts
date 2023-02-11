import { Grid, createGrid } from "./grid-functions";
import { print, yn } from "./ui/console";
import {
  parseGridDimension,
  parseVehiclePosition,
  parseVehicleOrientation,
  parseMovementString
} from "./ui/parse";
import {
  Vehicle,
  Orientation,
  Position,
  createVehicle,
  processMovementString,
} from "./vehicle-functions";

const prompt = require("prompt-sync")(); //NOTE TO COACHES - wanted to use ES6 modules but not sure how to do that here
//const yn = require('yn');
//import yn from '../node_modules/yn';  //NOTE TO COACHES - neither of these worked, so had to write my own function

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

const getVehicleMovements = (grid: Grid): Array<[Vehicle, string]> => {
  const vehicleMovements: Array<[Vehicle, string]> = [];
  const getVehicleDetails = (): void => {
    print("Vehicle 1:");
    let xPosInput = prompt(`Please specify the vehicle's X position: `);
    let xPos = parseVehiclePosition(xPosInput, grid, "X");
    while (xPos === undefined) {
      xPosInput = prompt(
        `Invalid input. Please specify the vehicle's X position (as a number) within the specified grid: `
      );
      xPos = parseGridDimension(xPosInput);
    }
    let yPosInput = prompt(`Please specify the vehicle's Y position: `);
    let yPos = parseVehiclePosition(yPosInput, grid, "Y");
    while (yPos === undefined) {
      yPosInput = prompt(
        `Invalid input. Please specify the vehicle's Y position (as a number) within the specified grid: `
      );
      yPos = parseGridDimension(yPosInput);
    }
    const position: Position = { xPos, yPos };
    
	const vehicleType = "Rover"; //Can be extended in the future to allow user to choose vehicle type

	let orientationInput = prompt(
      "Please specify the vehicle's orientation (N/E/S/W): "
    );
	let orientation = parseVehicleOrientation(vehicleType, orientationInput);
	while (orientation === undefined) {
		orientationInput = prompt(
			"Invalid input. Please specify the vehicle's orientation (N/E/S/W): "
		  );
		orientation = parseVehicleOrientation(vehicleType, orientationInput);
	}

    let movementStringInput = prompt(
      "Please specify the vehicle's movements (M for forward / L for left / R for right): "
    );
	let movementString = parseMovementString(vehicleType, movementStringInput);
	while (movementString === undefined) {
		movementStringInput = prompt(
			"Invalid input. Please specify the vehicle's movements (M for forward / L for left / R for right): "
		  );
		  movementString = parseMovementString(vehicleType, movementStringInput); 
	}
		
	const vehicle: Vehicle = createVehicle(
      "",
      vehicleType,
      position,
      orientation,
      grid
    );
    vehicleMovements.push([vehicle, movementString]);
  };

  getVehicleDetails();

  while (yn(prompt("Do you want to add details for another vehicle? "))) {
    getVehicleDetails();
  }

  return vehicleMovements;
};

const printVehicleMovements = (grid: Grid, vehicleMovements: Array<[Vehicle, string]>): void => {
	print("---------------------------------------");
	print("Grid dimensions and existing positions:");
	print(`${grid.maxX} ${grid.maxY}`);

	vehicleMovements.forEach((vehicleMovement) => {
		const vehicle: Vehicle = vehicleMovement[0];
		print(
		`${vehicle.position.xPos} ${vehicle.position.yPos} ${vehicle.orientation}`
		);
	});

	print("--------------");
	print("New positions:");
	vehicleMovements.forEach((vehicleMovement) => {
		const vehicle: Vehicle = vehicleMovement[0];
		const movementString = vehicleMovement[1];
		const newVehicleData = processMovementString(vehicle, grid, movementString);
		print(
		`${newVehicleData.position.xPos.toString()} ${newVehicleData.position.yPos.toString()} ${
			newVehicleData.orientation
		}`
		);
	});
}

const operateMarsVehicles = (): void => {
  console.clear();
  print("------------------------------------------------");
  print("| Welcome to the Mars Rover Operations Centre! |");
  print("------------------------------------------------");

  const grid = getGrid();
  const vehicleMovements: Array<[Vehicle, string]> = getVehicleMovements(grid);
  printVehicleMovements(grid, vehicleMovements);
  
};

operateMarsVehicles();
