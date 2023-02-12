
import {
    processTextInstructions
  } from "./main-operator-functions";

  describe("processTextInstructions", () => {
    const INSTRUCTIONS_NO_MOVEMENTS = 
    `8 8
1 2 N

3 3 E`;

    const INSTRUCTIONS_WITH_MOVEMENTS = 
    `8 8
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;
   
    test("Returns original vehicle positions if movement list is empty", () => {
      expect(processTextInstructions(INSTRUCTIONS_NO_MOVEMENTS)).toEqual(  
        `1 2 N
3 3 E`
      );   
    });
    test("Returns new vehicle positions if movement instructions are given", () => {
        expect(processTextInstructions(INSTRUCTIONS_WITH_MOVEMENTS)).toEqual(  
          `1 3 N
5 1 E`
        );   
      });
});
