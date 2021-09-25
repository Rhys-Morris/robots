TO DO

Check errors if method calling when no robot
Use the update board method on the table
Clean up code and typing
Write unit tests
Write readme
Screenshot solutions

# Robots

## Description

This program was created for a coding challenge outlined below.

> The application is a simulation of a toy robot moving on a square tabletop, of dimensions 5 units x 5 units.

> There are no other obstructions on the table surface.

> The robot is free to roam around the surface of the table, but must be prevented from falling to destruction. Any movement that would result in the robot falling from the table must be prevented, however further valid movement commands must still be allowed.

## Dependencies

`Node.js` - version BLAH was used for development

## Usage

Clone repository to your local machine.

Navigate to the directory via the command line.

To execute the program:

`node ./build/index.js`

## Commands

After launching the program the user will be prompted with "Awaiting input: " at the command line. 

Valid commands to the program are as follows:

- PLACE x,y,direction
    - A new robot is placed on the board at position x, position y facing in the direction given as the 3rd argument.
    - If placement is invalid the user will be alerted to this.
    - The co-ordinates (0,0) refer to the South-West corner of the table.
    - Valid x and y arguments are between 0 & 4.
    - Valid direction arguments are east, west, north & south
- REPORT
    - Report on the number of robot's on the table, the currently controlled robot, and its current position and direction.
- RIGHT
    - Rotate the currently controlled robot 90deg to the right.
    - Example:

    ```jsx
    robot.report() // (0,0,NORTH)
    robot.right()
    robot.report() // (0,0,EAST)
    ```

- LEFT
    - Rotate the currently controlled robot 90deg to the left.
    - Example:

    ```jsx
    robot.report() // (0,0,NORTH)
    robot.left()
    robot.report() // (0,0,WEST)
    ```

- MOVE
    - Move the robot forward 1 position in the direction it is facing.
    - If the robot would fall from the table, or run into another robot - the user is alerted and the robot remains in its current position
    - Example:

    ```jsx
    robot.report() // (0,0,NORTH)
    robot.move()
    robot.report() // (0,1,NORTH)
    ```

- ROBOT number
    - Switch the currently controlled robot to another robot.
    - Robot numbers are defined sequentially in the order they were placed i.e. the first robot placed is Robot 1, the second robot placed is Robot 2 etc.
    - Invalid input to number will maintain the current robot
    - Robots cannot be placed on top of other robots
- QUIT
    - Exit the program

If an invalid command is given, the user will be alerted and reprompted for input.