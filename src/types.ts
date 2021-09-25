// ----- TYPE DEFINITIONS -----

type coordinate = 0 | 1 | 2 | 3 | 4;
type coordinateTuple = [coordinate, coordinate];
type direction = "east" | "west" | "north" | "south";

interface commands {
  type: "PLACE" | "MOVE" | "LEFT" | "RIGHT" | "REPORT";
  input?: [coordinate, coordinate, direction];
}

interface Robot {
  commands: commands[];
  position: null | [coordinate, coordinate, direction];
  table: Table;
}

interface Table {
  positions: tableRow[];
  updateTable: (
    arg0: coordinateTuple,
    arg1: coordinateTuple,
    arg2: Robot
  ) => void;
}

type tableCell = null | Robot;
type tableRow = [tableCell, tableCell, tableCell, tableCell, tableCell]; // Explicitly 5 cells per row

export {
  coordinate,
  coordinateTuple,
  direction,
  commands,
  Robot,
  Table,
  tableRow,
};
