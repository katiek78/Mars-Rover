# Mars-Rover

## Introduction
This app is designed to allow a number of **Rovers** to be moved around the surface of Mars on a **plateau**. The instructions are entered via the console. The Rovers can also collect **samples** from the surface of Mars and take **photos**. The positions of the Rovers and any samples or photos taken can also be viewed.

## Assumptions
I have assumed that the plateau will be a rectangular grid (but the code is designed such that other plateau shapes can be implemented in the future).
I have assumed that all the vehicles are Rovers, but the code allows for other vehicles to be implemented.

## Using the app
The user is presented with a welcome screen:

![Screenshot of welcome screen](/assets/images/welcome.png)

They are then asked to enter grid dimensions (must be integers).

The user can then enter the position and instructions for each vehicle:
The position is a set of grid co-ordinates. Note that these start from 0, so if the grid height is 10, the maximum Y co-ordinate can be 9.
The instruction list should be a series of only the following characters:
L - rotates the vehicle 90° left (anti-clockwise)
R - rotates the vehicle 90° right (clockwise)
M - moves the vehicle forward by 1 grid line
S - instructs the vehicle to take a sample using its robot arm
P - instructs the vehicle to take a photo using one of its cameras

If the vehicle reaches the edge of the plateau, it is prevented from moving forward if this would cause it to leave the plateau.

If the vehicle's sample capacity is reached, it cannot carry any more samples and so no more samples can be taken.

If the vehicle has no cameras, it cannot take any photos.

The user can then view the positions of the vehicles, photos and samples as a grid of green asterisks. Samples are displayed in blue, photos are displayed in red, and any points where both a sample and a photo have been taken will be shown in magenta. Any grid points with Rovers will be indicated by the letter 'R' (combined with the appropriate colour).
For example, a blue 'R' on the grid means that a Rover is in this position AND a sample has been taken at that point.

![Screenshot of grid](/assets/images/grid.png)

## The code
### Files
The main file is index.ts: this is the top-level file that deals with the user input.
For anything related to the console itself, console.ts is used, while parse.ts parses the user input and ensures it is valid.

The logic is all stored in the vehicles and plateaus directories.
In the vehicles directory, there is a vehicle-functions.ts that contains everything relating to generic Mars vehicles. The rover-functions.ts file only includes the code linked specifically to Rovers.

While plateau-functions.ts takes care of generic plateau code, the grid-functions.ts file deals specifically with rectangular grids.

### Testing
Unit tests have been written for all the logic code.

### General approach
I have implemented Plateau as an interface, and RectangularGrid as an interface that extends it, to ensure that code would not need to be repeated if other plateau shapes are added.
Similarly, a Rover is an interface that extends the Vehicle interface.

For variables that can have only certain values, such as orientation (N/E/S/W), I have used the format: `const ORIENTATIONS = ['N', 'E', 'S' ,'W'] as const;`.
Each of these arrays then has a convenience type defined in the following way: `type Orientation = typeof ORIENTATIONS[number]`.
This helps to ensure that only valid values can be defined as Orientation, for example.

For each function, I have endeavoured to pass in only what information is required. The TypeScript syntax `Pick` has been used in some functions for this purpose. Rather than modifying variables such as the grid or rover directly, my approach has been to clone the object, modify it and re-assign.

## Ideas for the future
**Other plateau shapes** could be implemented. These would require different inputs (e.g. for a triangular plateau with equal sides, only one input would be needed). The movement limits would need to be calculated in different ways, so the plateau could have a different `checkMovement` function than the one used by the `RectangularGrid`.

**Other vehicles** could also be implemented, with different instruction strings (`ROVER_INSTRUCTIONS` currently specifies the allowed letters for its instruction list). For instance, some vehicles could just be used to move around the surface, whereas others might carry out blasting operations or only take photographs.

One major aim would be to add functionality to allow the user to **move the vehicles** that have already been defined. 