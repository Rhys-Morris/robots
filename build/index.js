"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var robot_1 = __importDefault(require("./robot"));
var table_1 = __importDefault(require("./table"));
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl.on("close", function () {
    console.log("\nThanks for playing!");
    process.exit(0);
});
// ----- INITIALISE PROGRAM -----
var gameTable = new table_1.default();
var currentRobot = null;
var robots = [];
// Game rules
console.log("Welcome to the Robot game! To learn how to play with your robots, please consult the README documentation in the source directory.");
askForInput();
function askForInput() {
    rl.question("Awaiting command: ", function getInput(response) {
        if (response.toLowerCase() === "quit") {
            rl.close();
            return;
        }
        mapInput(response);
        askForInput();
    });
}
// ----- LOGIC FLOW -----
function mapInput(input) {
    var _a = input.split(" "), action = _a[0], args = _a[1];
    switch (action.toLowerCase()) {
        case "place":
            try {
                var _b = args.split(","), x = _b[0], y = _b[1], direction = _b[2];
                var _c = validatePlaceArguments(x, y, direction), validatedPlacement = _c[0], error = _c[1], data = _c[2];
                if (validatedPlacement) {
                    if (!data)
                        throw new Error("No data returned");
                    placeRobot(data.x, data.y, data.direction);
                }
                else {
                    console.log("Invalid robot placement: " + error);
                }
                break;
            }
            catch (e) {
                console.log("Invalid arguments to place robot on table");
                break;
            }
        case "move":
            currentRobot === null || currentRobot === void 0 ? void 0 : currentRobot.move();
            break;
        case "left":
            currentRobot === null || currentRobot === void 0 ? void 0 : currentRobot.left();
            break;
        case "right":
            currentRobot === null || currentRobot === void 0 ? void 0 : currentRobot.right();
            break;
        case "report":
            reportOnRobots();
            break;
        case "robot":
            var robotToSelect = Number(args);
            if (Number.isNaN(args) ||
                robotToSelect < 1 ||
                robotToSelect > robots.length ||
                !robots.length) {
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
function validatePlaceArguments(x, y, direction) {
    direction = direction.toLowerCase();
    var validDirections = ["east", "west", "north", "south"];
    if (!validDirections.includes(direction))
        return [false, "Direction is invalid"];
    x = Number(x);
    y = Number(y);
    if (Number.isNaN(x) || Number.isNaN(y))
        return [false, "x/y coordinates are invalid"];
    if (x < 0 || x > 4)
        return [false, "x/y coordinates are invalid"];
    if (y < 0 || y > 4)
        return [false, "x/y coordinates are invalid"];
    if (gameTable.positions[y][x])
        return [false, "Robot already at location selected"];
    return [true, "", { x: x, y: y, direction: direction }];
}
function placeRobot(x, y, direction) {
    var robot = new robot_1.default(gameTable);
    robots.push(robot);
    robot.place(x, y, direction);
    if (!currentRobot)
        currentRobot = robot;
}
function reportOnRobots() {
    if (!currentRobot) {
        console.log("No robots on table");
        return;
    }
    var robotNumber = robots.indexOf(currentRobot) + 1;
    console.log("Current robot is Robot " + robotNumber);
    currentRobot.report();
    console.log("There " + (robots.length === 1 ? "is" : "are") + " currently " + robots.length + " robot" + (robots.length === 1 ? "" : "s") + " on the table");
}
