import {
  validatePlaceArguments,
  mapInput,
  placeRobot,
  reportOnRobots,
} from "./";
import Robot from "./robot";
import Table from "./table";

afterEach(() => {
  jest.clearAllMocks();
});

describe("validatePlaceArguments", () => {
  test("Handles invalid direction", () => {
    const [validated, error] = validatePlaceArguments(0, 0, "wrong");
    expect(validated).toBe(false);
    expect(error).toBe("Direction is invalid");
  });
  test("Handles invalid coordinates", () => {
    const [validated, error] = validatePlaceArguments("wrong", 0, "north");
    expect(validated).toBe(false);
    expect(error).toBe("x/y coordinates are invalid");
  });
  test("Handles out of bounds x coordinates", () => {
    const [validated, error] = validatePlaceArguments(-1, 0, "north");
    expect(validated).toBe(false);
    expect(error).toBe("x/y coordinates are invalid");
  });
  test("Handles out of bounds x coordinates", () => {
    const [validated, error] = validatePlaceArguments(5, 0, "north");
    expect(validated).toBe(false);
    expect(error).toBe("x/y coordinates are invalid");
  });
  test("Handles out of bounds y coordinates", () => {
    const [validated, error] = validatePlaceArguments(0, -1, "north");
    expect(validated).toBe(false);
    expect(error).toBe("x/y coordinates are invalid");
  });
  test("Handles out of bounds y coordinates", () => {
    const [validated, error] = validatePlaceArguments(0, 5, "north");
    expect(validated).toBe(false);
    expect(error).toBe("x/y coordinates are invalid");
  });
  // Already at position? - TO DO
  test("Handles valid arguments", () => {
    const [validated, , data] = validatePlaceArguments(0, 4, "north");
    expect(validated).toBe(true);
    expect(data).toEqual({ x: 0, y: 4, direction: "north" });
  });
});

describe("mapInput", () => {
  // Mock current robot
  const robot = new Robot(new Table());
  robot.left = jest.fn();
  robot.right = jest.fn();
  robot.move = jest.fn();
  // Mock report function
  const reportFunc = jest.fn();
  const validatePlaceArguments = jest.fn();
  // Spy on console.log
  const spyConsole = jest.spyOn(console, "log");

  test("it maps left correctly", () => {
    mapInput("left", robot, reportFunc, validatePlaceArguments);
    expect(robot.left).toHaveBeenCalledTimes(1);
  });

  test("it maps right correctly", () => {
    mapInput("right", robot, reportFunc, validatePlaceArguments);
    expect(robot.right).toHaveBeenCalledTimes(1);
  });

  test("it maps move correctly", () => {
    mapInput("move", robot, reportFunc, validatePlaceArguments);
    expect(robot.move).toHaveBeenCalledTimes(1);
  });
  test("it maps report correctly", () => {
    mapInput("report", robot, reportFunc, validatePlaceArguments);
    expect(reportFunc).toHaveBeenCalledTimes(1);
  });
  describe("changing robots", () => {
    test("it responds correctly when robot number is invalid", () => {
      mapInput("robot blue", robot, reportFunc, validatePlaceArguments);
      expect(spyConsole).toHaveBeenCalledTimes(1);
      expect(spyConsole).toHaveBeenCalledWith("Robot selection is invalid");
    });
  });
  test("it maps invalid commands correctly", () => {
    mapInput("nonsense", robot, reportFunc, validatePlaceArguments);
    expect(spyConsole).toHaveBeenCalledTimes(1);
    expect(spyConsole).toHaveBeenCalledWith(
      "Invalid command given, please consult documentation for valid commands"
    );
  });
});

describe("placeRobot", () => {
  // Set up game table
  const table = new Table();
  test("robot is placed correctly on table", () => {
    placeRobot(0, 0, "north", table);
    expect(table.positions[0][0]).toBeInstanceOf(Robot);
  });
});

describe("reportOnRobots", () => {
  // Spy on console.log
  const spyConsole = jest.spyOn(console, "log");

  test("reports correctly when no current robot", () => {
    reportOnRobots(null, []);
    expect(spyConsole).toHaveBeenCalledTimes(1);
    expect(spyConsole).toHaveBeenCalledWith("No robots on table");
  });
  test("reports correctly when 1 robot", () => {
    const robot = new Robot(new Table());
    robot.report = jest.fn();
    const robots = [robot];
    reportOnRobots(robot, robots);
    expect(robot.report).toHaveBeenCalledTimes(1);
    expect(spyConsole).toHaveBeenCalledTimes(2);
    expect(spyConsole).toHaveBeenCalledWith("Current robot is Robot 1");
    expect(spyConsole).toHaveBeenCalledWith(
      "There is currently 1 robot on the table"
    );
  });
  test("reports correctly when multiple robots", () => {
    const robot1 = new Robot(new Table());
    const robot2 = new Robot(new Table());
    const robot3 = new Robot(new Table());
    robot3.report = jest.fn();
    const robots = [robot1, robot2, robot3];
    reportOnRobots(robot3, robots);
    expect(robot3.report).toHaveBeenCalledTimes(1);
    expect(spyConsole).toHaveBeenCalledTimes(2);
    expect(spyConsole).toHaveBeenCalledWith("Current robot is Robot 3");
    expect(spyConsole).toHaveBeenCalledWith(
      "There are currently 3 robots on the table"
    );
  });
});
