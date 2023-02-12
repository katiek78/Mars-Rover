import {
  Vehicle,
  moveVehicleForward,
  rotateVehicle,
  createRover,
  processRoverMovements
} from "./vehicle-functions";

import { Grid } from "./grid-functions";

const rover1: Vehicle = {
  name: "Rover1",
  vehicleType: "Rover",
  position: { xPos: 0, yPos: 0 },
  orientation: "N",
};
const rover2: Vehicle = {
  name: "Rover2",
  vehicleType: "Rover",
  position: { xPos: 3, yPos: 8 },
  orientation: "N",
};
const rover3: Vehicle = {
  name: "Rover3",
  vehicleType: "Rover",
  position: { xPos: 3, yPos: 8 },
  orientation: "W",
};
const rover4: Vehicle = {
  name: "Rover4",
  vehicleType: "Rover",
  position: { xPos: 3, yPos: 8 },
  orientation: "S",
};
const rover5: Vehicle = {
  name: "Rover5",
  vehicleType: "Rover",
  position: { xPos: 3, yPos: 8 },
  orientation: "E",
};
const rover6: Vehicle = {
  name: "Rover6",
  vehicleType: "Rover",
  position: { xPos: 0, yPos: 5 },
  orientation: "W",
};
const rover7: Vehicle = {
  name: "Rover7",
  vehicleType: "Rover",
  position: { xPos: 2, yPos: 0 },
  orientation: "S",
};
const rover8: Vehicle = {
  name: "Rover8",
  vehicleType: "Rover",
  position: { xPos: 8, yPos: 6 },
  orientation: "E",
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
    expect(createRover("Buggy", "Rover", {xPos: 0, yPos: 0}, "N", GRID)).toEqual({
      name: "Buggy",
      vehicleType: "Rover",
      position: {xPos: 0, yPos: 0},
      orientation: "N",
      grid: GRID
    });
   
  });
});

describe("processMovementString", () => {
  test("Returns original vehicle position and orientation if movement string is empty", () => {
    expect(processRoverMovements(rover1, GRID, "")).toEqual({    
      position: { xPos: 0, yPos: 0 },
      orientation: "N",
    });   
  });
  test("Rotates vehicle clockwise if movement string is 'R'", () => {
    expect(processRoverMovements(rover1, GRID, "R")).toEqual({   
      position: { xPos: 0, yPos: 0 },
      orientation: "E",
    }); 
  });
  test("Rotates vehicle anticlockwise if movement string is 'L'", () => {
    expect(processRoverMovements(rover1, GRID, "L")).toEqual({      
      position: { xPos: 0, yPos: 0 },
      orientation: "W",
    }); 
  });
  test("Moves vehicle forward if movement string is 'M'", () => {
    expect(processRoverMovements(rover1, GRID, "M")).toEqual({      
      position: { xPos: 0, yPos: 1 },
      orientation: "N",
    }); 
  });  
  test("Moves vehicle through multiple orientations", () => {
    expect(processRoverMovements(rover1, GRID, "LL")).toEqual({      
      position: { xPos: 0, yPos: 0 },
      orientation: "S",
    }); 
  });  
  test("Moves vehicle through multiple forward movements", () => {
    expect(processRoverMovements(rover1, GRID, "MMMM")).toEqual({      
      position: { xPos: 0, yPos: 4 },
      orientation: "N",
    }); 
  });  
  test("Moves vehicle through multiple orientations and forward movements", () => {
    expect(processRoverMovements(rover1, GRID, "RMMMMLMML")).toEqual({      
      position: { xPos: 4, yPos: 2 },
      orientation: "W",
    }); 
  });  
});
