export type Grid = {
   // name: string;  
    maxX: number;
    maxY: number;
  };


  export const createGrid = (maxX: number, maxY: number) => {
    return {maxX: maxX, maxY: maxY};
  }