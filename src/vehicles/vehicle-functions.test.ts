import {  
  Rover,
  moveVehicleForward,
  rotateVehicle,
  createRover,
  processVehicleInstructions,
  takeSample
} from "./vehicle-functions";

import { Grid } from "../grid-functions";

const rover1: Rover = {
  /*name: "Rover1",
  vehicleType: "Rover",*/
  position: { xPos: 0, yPos: 0 },
  orientation: "N",
  cameras: 0,
  sampleCapacity: 10,
  samplesTaken: 0
};
const rover2: Rover = {
  /*name: "Rover2",
  vehicleType: "Rover",*/
  position: { xPos: 3, yPos: 8 },
  orientation: "N",
  cameras: 17,
  sampleCapacity: 3,
  samplesTaken: 2
};
const rover3: Rover = {
  /*: "Rover3",
  vehicleType: "Rover",*/
  position: { xPos: 3, yPos: 8 },
  orientation: "W",
  cameras: 17,
  sampleCapacity: 3,
  samplesTaken: 2
};
const rover4: Rover = {
  /*name: "Rover4",
  vehicleType: "Rover",*/
  position: { xPos: 3, yPos: 8 },
  orientation: "S",
  cameras: 17,
  sampleCapacity: 3,
  samplesTaken: 2
};
const rover5: Rover = {
  /*name: "Rover5",
  vehicleType: "Rover",*/
  position: { xPos: 3, yPos: 8 },
  orientation: "E",
  cameras: 17,
  sampleCapacity: 3,
  samplesTaken: 2
};
const rover6: Rover = {
  /*name: "Rover6",
  vehicleType: "Rover",*/
  position: { xPos: 0, yPos: 5 },
  orientation: "W",
  cameras: 17,
  sampleCapacity: 3,
  samplesTaken: 2
};
const rover7: Rover = {
  /*name: "Rover7",
  vehicleType: "Rover",*/
  position: { xPos: 2, yPos: 0 },
  orientation: "S",
  cameras: 17,
  sampleCapacity: 3,
  samplesTaken: 2
};
const rover8: Rover = {
/*  name: "Rover8",
  vehicleType: "Rover",*/
  position: { xPos: 8, yPos: 6 },
  orientation: "E",
  cameras: 23,
  sampleCapacity: 3,
  samplesTaken: 3
};
const GRID: Grid = {
  maxX: 8,
  maxY: 8,
} as const;

describe("moveVehicleForward", () => {
  test("Moves vehicle 1 square up if orientation is N", () => {
    expect(moveVehicleForward(rover1, GRID)).toEqual({
      xPos: 0,
      yPos: 1,
    });
  });
  test("Moves vehicle 1 square to the left if orientation is W", () => {
    expect(moveVehicleForward(rover3, GRID)).toEqual({
      xPos: 2,
      yPos: 8,
    });
  });
  test("Moves vehicle 1 square down if orientation is S", () => {
    expect(moveVehicleForward(rover4, GRID)).toEqual({
      xPos: 3,
      yPos: 7,
    });
  });
  test("Moves vehicle 1 square to the right if orientation is E", () => {
    expect(moveVehicleForward(rover5, GRID)).toEqual({
      xPos: 4,
      yPos: 8,
    });
  });
  test("Moves vehicle 1 square to the right if orientation is E", () => {
    expect(moveVehicleForward(rover5, GRID)).toEqual({
      xPos: 4,
      yPos: 8,
    });
  });
  test("Does not move vehicle N if already at top of grid", () => {
    expect(moveVehicleForward(rover2, GRID)).toEqual({
      xPos: 3,
      yPos: 8,
    });
  });
  test("Does not move vehicle W if already at left of grid", () => {
    expect(moveVehicleForward(rover6, GRID)).toEqual({
      xPos: 0,
      yPos: 5,
    });
  });
  test("Does not move vehicle S if already at bottom of grid", () => {
    expect(moveVehicleForward(rover7, GRID)).toEqual({
      xPos: 2,
      yPos: 0,
    });
  });
  test("Does not move vehicle E if already at right of grid", () => {
    expect(moveVehicleForward(rover8, GRID)).toEqual({
      xPos: 8,
      yPos: 6,
    });
  });
});

describe("rotateVehicle", () => {
  test("Changes vehicle's orientation anticlockwise if direction is L", () => {
    expect(rotateVehicle(rover1, "L")).toEqual("W");
    expect(rotateVehicle(rover3, "L")).toEqual("S");
    expect(rotateVehicle(rover4, "L")).toEqual("E");
    expect(rotateVehicle(rover5, "L")).toEqual("N");
  });
  test("Changes vehicle's orientation clockwise if direction is R", () => {
    expect(rotateVehicle(rover1, "R")).toEqual("E");
    expect(rotateVehicle(rover3, "R")).toEqual("N");
    expect(rotateVehicle(rover4, "R")).toEqual("W");
    expect(rotateVehicle(rover5, "R")).toEqual("S");
  });
});

describe("createVehicle", () => {
  test("Creates a vehicle with the given parameters", () => {
    expect(createRover(/*"Buggy", "Rover",*/ {xPos: 0, yPos: 0}, "N", GRID, 23, 10, 1)).toEqual({
      /*name: "Buggy",
      vehicleType: "Rover",*/
      position: {xPos: 0, yPos: 0},
      orientation: "N",
      grid: GRID,
      cameras: 23,
      sampleCapacity: 10,
      samplesTaken: 1
    });
   
  });
});

describe("processVehicleInstructions", () => {
  test("Returns original vehicle position and orientation if movement string is empty", () => {
    expect(processVehicleInstructions(rover1, GRID, "")).toEqual({    
      position: { xPos: 0, yPos: 0 },
      orientation: "N",
      cameras: 0,
      sampleCapacity: 10,
      samplesTaken: 0
    });   
  });
  test("Rotates vehicle clockwise if movement string is 'R'", () => {
    expect(processVehicleInstructions(rover1, GRID, "R")).toEqual({   
      position: { xPos: 0, yPos: 0 },
      orientation: "E",
      cameras: 0,
      sampleCapacity: 10,
      samplesTaken: 0
    }); 
  });
  test("Rotates vehicle anticlockwise if movement string is 'L'", () => {
    expect(processVehicleInstructions(rover1, GRID, "L")).toEqual({      
      position: { xPos: 0, yPos: 0 },
      orientation: "W",
      cameras: 0,
      sampleCapacity: 10,
      samplesTaken: 0
    }); 
  });
  test("Moves vehicle forward if movement string is 'M'", () => {
    expect(processVehicleInstructions(rover1, GRID, "M")).toEqual({      
      position: { xPos: 0, yPos: 1 },
      orientation: "N",
      cameras: 0,
      sampleCapacity: 10,
      samplesTaken: 0
    }); 
  });  
  test("Moves vehicle through multiple orientations", () => {
    expect(processVehicleInstructions(rover1, GRID, "LL")).toEqual({      
      position: { xPos: 0, yPos: 0 },
      orientation: "S",
      cameras: 0,
      sampleCapacity: 10,
      samplesTaken: 0
    }); 
  });  
  test("Moves vehicle through multiple forward movements", () => {
    expect(processVehicleInstructions(rover1, GRID, "MMMM")).toEqual({      
      position: { xPos: 0, yPos: 4 },
      orientation: "N",
      cameras: 0,
      sampleCapacity: 10,
      samplesTaken: 0
    }); 
  });  
  test("Moves vehicle through multiple orientations and forward movements", () => {
    expect(processVehicleInstructions(rover1, GRID, "RMMMMLMML")).toEqual({      
      position: { xPos: 4, yPos: 2 },
      orientation: "W",
      cameras: 0,
      sampleCapacity: 10,
      samplesTaken: 0
    }); 
  });  
  test("Increases samplesTaken if an 'S' is found", () => {
    expect(processVehicleInstructions(rover1, GRID, "S")).toEqual({      
      position: { xPos: 0, yPos: 0 },
      orientation: "N",
      cameras: 0,
      sampleCapacity: 10,
      samplesTaken: 1
    }); 
  });  
});


describe("takeSample", () => {
  test("Returns samplesTaken unchanged if sampleCapacity is reached (samplesTaken would be greater than sampleCapacity)", () => {
    expect(takeSample(rover8, GRID)).toEqual(3);   
  });
  test("Returns samplesTaken increased by 1 if sampleCapacity is not reached", () => {
    expect(takeSample(rover1, GRID)).toEqual(1);   
  });
});
