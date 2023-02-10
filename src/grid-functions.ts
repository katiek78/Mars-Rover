export type Grid = {
  // name: string;
  maxX: number;
  maxY: number;
};

export const createGrid = (maxX: number, maxY: number) => {
  return { maxX, maxY };
};

export const processTextInstructions = (instructionList: string) => {
    const instructionArray = instructionList.split('\n');
    
};