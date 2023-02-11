import { Grid, createGrid } from './grid-functions';
import { print, yn } from './ui/console';
import { parseGridDimension } from './ui/parse';
import { Vehicle, Orientation, Position, createVehicle, processMovementString } from './vehicle-functions';

const prompt = require('prompt-sync')();  //NOTE TO COACHES - wanted to use ES6 modules but not sure how to do that here
//const yn = require('yn');
//import yn from '../node_modules/yn';  //NOTE TO COACHES - neither of these worked, so had to write my own function


const getGrid = (): Grid => {
	let maxXInput = prompt(`Please specify the grid width (X): `);
	let maxX = parseGridDimension(maxXInput);
	while (maxX === undefined) {
		maxXInput = prompt(`Invalid input. Please specify the grid width (X) as a number: `);
		maxX = parseGridDimension(maxXInput);
	}

	let maxYInput = prompt(`Please specify the grid width (Y): `);
	let maxY = parseGridDimension(maxYInput);
	while (maxY === undefined) {
		maxYInput = prompt(`Invalid input. Please specify the grid width (Y) as a number: `);
		maxY = parseGridDimension(maxYInput);
	}

	return createGrid(maxX, maxY);
}

const operateMarsVehicles = (): void => {
	console.clear();
	print('------------------------------------------------');
	print('| Welcome to the Mars Rover Operations Centre! |');
	print('------------------------------------------------');

	const grid = getGrid();

	const vehicleMovements: Array<[Vehicle, string]> = [];
	
	const getVehicleDetails = (): void => {
		print("Vehicle 1:");
		const xPos = parseInt(prompt(`Please specify the vehicle's X position? `));
		const yPos = parseInt(prompt(`Please specify the vehicle's Y position? `));
		const position: Position = {xPos, yPos};
		const orientation: Orientation = prompt(`Please specify the vehicle's orientation (N/E/S/W)? `);
		const movementString = prompt("Please specify the vehicle's movement string (M for forward / L for left / R for right)? ");
		const vehicle: Vehicle = createVehicle("", "Rover", position, orientation, grid);
		vehicleMovements.push([vehicle, movementString]);
	}


	getVehicleDetails();

	while(yn(prompt("Do you want to add details for another vehicle? "))) {
		getVehicleDetails();
	}


	print("---------------------------------------");
	print("Grid dimensions and existing positions:");
	print(`${grid.maxX} ${grid.maxY}`);

	vehicleMovements.forEach(vehicleMovement => {
		const vehicle: Vehicle = vehicleMovement[0];		
		print(`${vehicle.position.xPos} ${vehicle.position.yPos} ${vehicle.orientation}`);		
	
	});

	print("--------------");
	print("New positions:");	
	vehicleMovements.forEach(vehicleMovement => {
		const vehicle: Vehicle = vehicleMovement[0];			
		const movementString = vehicleMovement[1];		
		const newVehicleData = processMovementString(vehicle, grid, movementString);	
		print(`${newVehicleData.position.xPos.toString()} ${newVehicleData.position.yPos.toString()} ${newVehicleData.orientation}`);
	
	});
}

operateMarsVehicles();

