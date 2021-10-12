import { coordinateTuple, tableRow } from "./types";
import Robot from "./robot";

// ----- TABLE CLASS -----

class Table {
  positions: tableRow[];
  robots: Robot[];
  currentRobot: null | Robot;
  constructor() {
    // Define 5 x 5 grid - 0, 0 is representative of SW corner
    this.positions = [
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ];
    this.currentRobot = null;
    this.robots = [];
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

  printTable(): void {
    for (let i = 0; i < this.positions.length; i++) {
      if (i === 0) console.log("|   | 0 | 1 | 2 | 3 | 4 |"); // Print header row
      let row = "";
      for (let j = 0; j < this.positions[i].length; j++) {
        if (j === 0) row += `| ${i} `; // Print position indication at row start
        row += `| ${this.positions[i][j] === null ? "-" : "R"} `;
      }
      row += "|";
      console.log(row);
    }
  }
}

export default Table;
