import Robot from "./robot";
import Table from "./table";

describe("Table Class", () => {
  // Initialize robot & table for tests
  const table = new Table();
  const robot = new Robot(table);

  test("It should update correctly", () => {
    table.updateTable([0, 0], [0, 1], robot);
    expect(table.positions[1][0]).toBe(robot);
  });
});
