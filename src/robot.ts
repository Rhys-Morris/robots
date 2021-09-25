import {
  commands,
  coordinate,
  coordinateTuple,
  direction,
  Table,
} from "./types";

interface Robot {
  commands: commands[];
  position: null | [coordinate, coordinate, direction];
  table: Table;
}

// ----- ROBOT CLASS -----

class Robot {
  constructor(table: Table) {
    this.commands = [];
    this.position = null;
    this.table = table;
  }

  _rotateRight = {
    east: "south",
    south: "west",
    west: "north",
    north: "east",
  };

  _rotateLeft = {
    east: "north",
    south: "east",
    west: "south",
    north: "west",
  };

  _moveIncrement = {
    east: 1,
    south: -1,
    west: -1,
    north: 1,
  };

  // VALIDATIONS
  _validateMove(
    direction: direction,
    currentCoords: coordinateTuple
  ): [boolean, coordinateTuple?] {
    let [x, y] = currentCoords;
    const movingAxisPosition = ["south", "north"].includes(direction) ? y : x;
    const movingOnAxis = ["south", "north"].includes(direction) ? "y" : "x";
    const willFallFromTable = {
      east: 4,
      north: 4,
      south: 0,
      west: 0,
    };
    if (willFallFromTable[direction] === movingAxisPosition) {
      return [false];
    }
    // Check if will run into another robot
    movingOnAxis === "y"
      ? (y += this._moveIncrement[direction])
      : (x += this._moveIncrement[direction]);
    if (this.table.positions[y][x]) return [false]; // Not null - robot present
    return [true, [x, y]];
  }

  place(x: coordinate, y: coordinate, direction: direction) {
    this.position = [x, y, direction];
    // Update table
    this.table.positions[y][x] = this;
    this.commands.push({
      type: "PLACE",
      input: [x, y, direction],
    });
  }

  move() {
    if (!this.position) return; // Type narrowing due to null initialization
    let [x, y, direction] = this.position;
    const [validated, coords] = this._validateMove(direction, [x, y]);
    // Narrow type in case non-validated
    if (!validated) {
      console.log("Robot is unable to move in the indicated direction");
      return;
    }
    // Implement move
    const [newX, newY] = coords as coordinateTuple;
    this.position = [newX, newY, direction];

    // Update table
    this.table.updateTable([x, y], [newX, newY], this);

    this.commands.push({
      type: "MOVE",
    });
  }

  left() {
    if (!this.position) return; // Type narrowing due to null initialization
    const currentDirection = this.position[2];
    this.position[2] = this._rotateLeft[currentDirection] as direction;
    this.commands.push({
      type: "LEFT",
    });
  }

  right() {
    if (!this.position) return; // Type narrowing due to null initialization
    const currentDirection = this.position[2];
    this.position[2] = this._rotateRight[currentDirection] as direction;
    this.commands.push({
      type: "RIGHT",
    });
  }

  report() {
    if (!this.position) return; // Type narrowing due to null initialization
    const [x, y, direction] = this.position;
    console.log(`Located at: ${x}, ${y}, ${direction.toUpperCase()}`);
    this.commands.push({
      type: "REPORT",
    });
  }
}

export default Robot;
