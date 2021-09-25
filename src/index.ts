import Robot from "./robot";
import Table from "./table";
import { coordinate, direction } from "./types";

// Set up user input
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.on("close", function () {
  console.log("\nThanks for playing!");
  process.exit(0);
});

// ----- INITIALISE PROGRAM -----

const gameTable = new Table();
let currentRobot: Robot | null = null;
let robots: Robot[] = [];

// Game rules
console.log(
  "Welcome to the Robot game! To learn how to play with your robots, please consult the README documentation in the source directory."
);
askForInput();

function askForInput() {
  rl.question("Awaiting command: ", function getInput(response: string): void {
    if (response.toLowerCase() === "quit") {
      rl.close();
      return;
    }
    mapInput(response);
    askForInput();
  });
}

// ----- LOGIC FLOW -----

function mapInput(input: string) {
  const [action, args] = input.split(" ");
  switch (action.toLowerCase()) {
    case "place":
      try {
        const [x, y, direction] = args.split(",");
        const [validatedPlacement, error, data] = validatePlaceArguments(
          x,
          y,
          direction
        );

        if (validatedPlacement) {
          if (!data) throw new Error("No data returned");
          placeRobot(
            data.x as coordinate,
            data.y as coordinate,
            data.direction as direction
          );
        } else {
          console.log(`Invalid robot placement: ${error}`);
        }
        break;
      } catch (e) {
        console.log("Invalid arguments to place robot on table");
        break;
      }
    case "move":
      currentRobot?.move();
      break;
    case "left":
      currentRobot?.left();
      break;
    case "right":
      currentRobot?.right();
      break;
    case "report":
      reportOnRobots();
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
      return;
  }
}

// Validate placement of new robot is allowed
function validatePlaceArguments(
  x: string | number,
  y: string | number,
  direction: string
): [boolean, string, { x: number; y: number; direction: string }?] {
  direction = direction.toLowerCase();
  const validDirections = ["east", "west", "north", "south"];
  if (!validDirections.includes(direction))
    return [false, "Direction is invalid"];
  x = Number(x);
  y = Number(y);
  if (Number.isNaN(x) || Number.isNaN(y))
    return [false, "x/y coordinates are invalid"];
  if (x < 0 || x > 4) return [false, "x/y coordinates are invalid"];
  if (y < 0 || y > 4) return [false, "x/y coordinates are invalid"];
  if (gameTable.positions[y][x])
    return [false, "Robot already at location selected"];
  return [true, "", { x, y, direction }];
}

function placeRobot(x: coordinate, y: coordinate, direction: direction) {
  const robot = new Robot(gameTable);
  robots.push(robot);
  robot.place(x, y, direction);
  if (!currentRobot) currentRobot = robot;
}

function reportOnRobots(): void {
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
