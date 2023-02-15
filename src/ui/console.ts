import colors from "colors";
colors.enable();
export const prompt = require("prompt-sync")();

export function print(str: string): void {
  console.log(str.green);
  console.log();
}

export function yn(str: string) {
  return ["Y", "YES", "y", "yes", "true", true, "1", 1].includes(str);
}

export function promptColour(str: string) {
  return prompt(str.green);
}
