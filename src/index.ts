import Robot from "./robot";
import Table from "./table";
import { coordinate, direction, validatePlacement } from "./types";
import readlineSync from "readline-sync";

// ----- INITIALISE PROGRAM -----

const gameTable = new Table();
let currentRobot: Robot | null = null;
let robots: Robot[] = [];

if (process.env.NODE_ENV !== "test") {
  console.log(
    "Welcome to the Robot game! To learn how to play with your robots, please consult the README documentation in the source directory."
  );
  askForInput();
}

// ----- LOGIC FLOW -----

function askForInput() {
  const response = readlineSync.question("Awaiting input: ");
  if (response.toLowerCase() === "quit") {
    return;
  }
  mapInput(response, currentRobot, reportOnRobots, validatePlaceArguments);
  askForInput();
}

export function mapInput(
  input: string,
  robotToAction: Robot | null,
  reportFunc: (currentRobot: Robot | null, robots: Robot[]) => void,
  validatePlacement: validatePlacement
) {
  const [action, args] = input.toLowerCase().split(" ");
  // Account for no current robot
  if (!robotToAction && action !== "place") {
    console.log("Must place robot before issuing further commands");
    return;
  }
  switch (action) {
    case "place":
      const [x, y, direction] = args.split(",");
      const [validatedPlacement, error, data] = validatePlacement(
        x,
        y,
        direction
      );

      if (validatedPlacement) {
        if (!data) throw new Error("No data returned"); // Type narrow data as we don't return it for failed validations
        placeRobot(
          data.x as coordinate,
          data.y as coordinate,
          data.direction as direction,
          gameTable
        );
      } else {
        console.log(`Invalid robot placement: ${error}`);
      }
      break;
    case "move":
      robotToAction?.move();
      break;
    case "left":
      robotToAction?.left();
      break;
    case "right":
      robotToAction?.right();
      break;
    case "report":
      reportFunc(robotToAction, robots);
      break;
    case "robot":
      const robotToSelect = Number(args);
      if (
        Number.isNaN(args) ||
        robotToSelect < 1 ||
        robotToSelect > robots.length ||
        !robots.length
      ) {
        console.log("Robot selection is invalid");
        return;
      }
      currentRobot = robots[robotToSelect - 1]; // Convert from one-indexed to zero-indexed
      break;
    default:
      console.log(
        "Invalid command given, please consult documentation for valid commands"
      );
      return;
  }
}

// Validate placement of new robot is allowed
export function validatePlaceArguments(
  x: string | number,
  y: string | number,
  direction: string
): [boolean, string, { x: number; y: number; direction: string }?] {
  // Direction validation
  direction = direction.toLowerCase();
  const validDirections = ["east", "west", "north", "south"];
  if (!validDirections.includes(direction))
    return [false, "Direction is invalid"];

  // Co-ordinate validation
  x = Number(x);
  y = Number(y);
  if (Number.isNaN(x) || Number.isNaN(y))
    return [false, "x/y coordinates are invalid"];
  if (x < 0 || x > 4) return [false, "x/y coordinates are invalid"];
  if (y < 0 || y > 4) return [false, "x/y coordinates are invalid"];

  // Check position on table not occupied by robot already
  if (gameTable.positions[y][x])
    return [false, "Robot already at location selected"];

  return [true, "", { x, y, direction }];
}

export function placeRobot(
  x: coordinate,
  y: coordinate,
  direction: direction,
  gameTable: Table
) {
  const robot = new Robot(gameTable);
  robots.push(robot);
  robot.place(x, y, direction);
  if (!currentRobot) currentRobot = robot;
}

export function reportOnRobots(
  currentRobot: Robot | null,
  robots: Robot[]
): void {
  if (!currentRobot) {
    console.log("No robots on table");
    return;
  }
  const robotNumber = robots.indexOf(currentRobot) + 1;
  console.log(`Current robot is Robot ${robotNumber}`);
  currentRobot.report();
  console.log(
    `There ${robots.length === 1 ? "is" : "are"} currently ${
      robots.length
    } robot${robots.length === 1 ? "" : "s"} on the table`
  );
}
