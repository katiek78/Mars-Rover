import { print } from './ui/console';

const prompt = require('prompt-sync')();  //NOTE TO COACHES - wanted to use ES6 modules but not sure how

function operateMarsVehicles(): void {
	console.clear();
	print('------------------------------------------------');
	print('| Welcome to the Mars Rover Operations Centre! |');
	print('------------------------------------------------');

	const maxX = prompt(`Please specify the grid width (X)? `);
	const maxY = prompt(`Please specify the grid length (Y)? `);

	print(`${maxX} ${maxY}`);
}

operateMarsVehicles();
