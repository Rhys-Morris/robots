import { coordinateTuple, Robot, tableRow } from "./types";

interface Table {
  positions: tableRow[];
}

// ----- TABLE CLASS -----

class Table {
  constructor() {
    // Define 5 x 5 grid - 0, 0 is representative of SW corner
    this.positions = [
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ];
  }

  updateTable(
    oldPosition: coordinateTuple,
    newPosition: coordinateTuple,
    robot: Robot
  ): void {
    const [oldX, oldY] = oldPosition;
    const [newX, newY] = newPosition;
    this.positions[oldY][oldX] = null;
    this.positions[newY][newX] = robot;
  }
}

export default Table;
