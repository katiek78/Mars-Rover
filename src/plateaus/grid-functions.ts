export type Dimension = "X" | "Y";

export type Grid = {
  // name: string;
  maxX: number;
  maxY: number;
};

export const createGrid = (maxX: number, maxY: number) => {
  return { maxX, maxY };
};

