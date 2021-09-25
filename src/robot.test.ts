import Robot from "./robot";
import Table from "./table";

describe("Robot Class", () => {
  // Initialize robot & table for tests
  const table = new Table();
  const robot = new Robot(table);

  // Spy on console.log
  const spy = jest.spyOn(console, "log").mockImplementation();
  beforeEach(() => {
    spy.mockClear();
  });

  test("Calling the Robot constructor should instantiate a new robot instance", () => {
    expect(robot).toBeInstanceOf(Robot);
  });

  test("Should place correctly", () => {
    robot.place(0, 0, "north");
    expect(robot.position).toEqual([0, 0, "north"]);
    expect(robot.table.positions[0][0]).toBe(robot);
  });

  test("should rotate left correctly", () => {
    if (!robot.position) throw new Error();
    robot.left();
    expect(robot.position[2]).toEqual("west");
    robot.left();
    expect(robot.position[2]).toEqual("south");
    robot.left();
    expect(robot.position[2]).toEqual("east");
    robot.left();
    expect(robot.position[2]).toEqual("north");
  });

  test("should rotate right correctly", () => {
    if (!robot.position) throw new Error();
    robot.right();
    expect(robot.position[2]).toEqual("east");
    robot.right();
    expect(robot.position[2]).toEqual("south");
    robot.right();
    expect(robot.position[2]).toEqual("west");
    robot.right();
    expect(robot.position[2]).toEqual("north");
  });

  test("Should allow movement", () => {
    robot.move();
    expect(robot.position).toEqual([0, 1, "north"]);
    // Updated table correctly
    expect(robot.table.positions[0][0]).toBe(null);
    expect(robot.table.positions[1][0]).toBe(robot);
  });

  test("Should not allow movement off the table", () => {
    robot.position = [0, 4, "north"];
    robot.move();
    expect(robot.position).toEqual([0, 4, "north"]);
    robot.position = [0, 0, "west"];
    robot.move();
    expect(robot.position).toEqual([0, 0, "west"]);
    robot.position = [0, 0, "south"];
    robot.move();
    expect(robot.position).toEqual([0, 0, "south"]);
    robot.position = [4, 4, "east"];
    robot.move();
    expect(robot.position).toEqual([4, 4, "east"]);
    expect(console.log).toHaveBeenCalledTimes(4);
    expect(console.log).toHaveBeenCalledWith(
      "Robot is unable to move in the indicated direction"
    );
  });

  test("Should not allow movement where another robot is positioned", () => {
    robot.position = [0, 0, "north"];
    robot.table.positions[0][1] = new Robot(robot.table);
    robot.move();
    expect(robot.position).toEqual([0, 0, "north"]);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(
      "Robot is unable to move in the indicated direction"
    );
  });

  test("Should report on position correctly", () => {
    robot.report();
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith("Located at: 0, 0, NORTH");
  });
});
