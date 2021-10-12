import Robot from "./robot";

// ----- TYPE DEFINITIONS -----

type coordinate = 0 | 1 | 2 | 3 | 4;
type coordinateTuple = [coordinate, coordinate];
type direction = "east" | "west" | "north" | "south";

interface commands {
  type: "PLACE" | "MOVE" | "LEFT" | "RIGHT" | "REPORT";
  input?: [coordinate, coordinate, direction];
}

type tableCell = null | Robot;
type tableRow = [tableCell, tableCell, tableCell, tableCell, tableCell]; // Explicitly 5 cells per row

type validatePlacement = (
  x: string | number,
  y: string | number,
  direction: string
) => [boolean, string, { x: number; y: number; direction: string }?];

export {
  coordinate,
  coordinateTuple,
  direction,
  commands,
  tableRow,
  validatePlacement,
};
