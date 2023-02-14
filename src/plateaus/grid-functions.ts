export type Dimension = "X" | "Y";
export type Position = { xPos: number; yPos: number };

export type Grid = {
  maxX: number;
  maxY: number;
  samples: Array<Position>;
};

export const createGrid = (maxX: number, maxY: number, samples: Array<Position>) => {
  return { maxX, maxY, samples };
};

