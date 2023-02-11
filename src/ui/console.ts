//import * as readline from 'node:readline';

export function print(str: string): void {
	console.log(str);
	console.log();
}

export function yn(str: string) {
    return (['Y', 'YES', 'y', 'yes', 'true', true, '1', 1].includes(str));
}