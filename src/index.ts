import { Grid, createGrid } from './grid-functions';
import { print } from './ui/console';
import { Vehicle, Orientation, Position, createVehicle, processMovementString } from './vehicle-functions';
const prompt = require('prompt-sync')();  //NOTE TO COACHES - wanted to use ES6 modules but not sure how to do that here

function operateMarsVehicles(): void {
	console.clear();
	print('------------------------------------------------');
	print('| Welcome to the Mars Rover Operations Centre! |');
	print('------------------------------------------------');

	const maxX = prompt(`Please specify the grid width (X)? `);
	const maxY = prompt(`Please specify the grid length (Y)? `);
	const grid: Grid = createGrid(maxX, maxY);

	print("Vehicle 1:");
	const xPos = parseInt(prompt(`Please specify the vehicle's X position? `));
	const yPos = parseInt(prompt(`Please specify the vehicle's Y position? `));
	const position: Position = {xPos, yPos};
	const orientation: Orientation = prompt(`Please specify the vehicle's orientation (N/E/S/W)? `);
	const movementString = prompt("Please specify the vehicle's movement string (M for forward / L for left / R for right)? ");
	const vehicle: Vehicle = createVehicle("", "Rover", position, orientation, grid);

	print("---------------------------------------");
	print("Grid dimensions and existing positions:");
	print(`${maxX} ${maxY}`);
	print(`${xPos} ${yPos} ${orientation}`);

	print("--------------");
	print("New positions:");
	const newVehicleData = processMovementString(vehicle, grid, movementString);	
	print(`${newVehicleData.position.xPos.toString()} ${newVehicleData.position.yPos.toString()} ${newVehicleData.orientation}`);

}

operateMarsVehicles();
