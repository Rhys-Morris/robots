"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportOnRobots = exports.placeRobot = exports.validatePlaceArguments = exports.mapInput = void 0;
var robot_1 = __importDefault(require("./robot"));
var table_1 = __importDefault(require("./table"));
var readline_sync_1 = __importDefault(require("readline-sync"));
// ----- INITIALISE PROGRAM -----
var gameTable = new table_1.default();
var currentRobot = null;
var robots = [];
if (process.env.NODE_ENV !== "test") {
    console.log("Welcome to the Robot game! To learn how to play with your robots, please consult the README documentation in the source directory.");
    askForInput();
}
// ----- LOGIC FLOW -----
function askForInput() {
    var response = readline_sync_1.default.question("Awaiting input: ");
    if (response.toLowerCase() === "quit") {
        return;
    }
    mapInput(response, currentRobot, reportOnRobots, validatePlaceArguments);
    askForInput();
}
function mapInput(input, robotToAction, reportFunc, validatePlacement) {
    var _a = input.toLowerCase().split(" "), action = _a[0], args = _a[1];
    // Account for no current robot
    if (!robotToAction && action !== "place") {
        console.log("Must place robot before issuing further commands");
        return;
    }
    switch (action) {
        case "place":
            var _b = args.split(","), x = _b[0], y = _b[1], direction = _b[2];
            var _c = validatePlacement(x, y, direction), validatedPlacement = _c[0], error = _c[1], data = _c[2];
            if (validatedPlacement) {
                if (!data)
                    throw new Error("No data returned"); // Type narrow data as we don't return it for failed validations
                placeRobot(data.x, data.y, data.direction, gameTable);
            }
            else {
                console.log("Invalid robot placement: " + error);
            }
            break;
        case "move":
            robotToAction === null || robotToAction === void 0 ? void 0 : robotToAction.move();
            break;
        case "left":
            robotToAction === null || robotToAction === void 0 ? void 0 : robotToAction.left();
            break;
        case "right":
            robotToAction === null || robotToAction === void 0 ? void 0 : robotToAction.right();
            break;
        case "report":
            reportFunc(robotToAction, robots);
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
            console.log("Invalid command given, please consult documentation for valid commands");
            return;
    }
}
exports.mapInput = mapInput;
// Validate placement of new robot is allowed
function validatePlaceArguments(x, y, direction) {
    // Direction validation
    try {
        direction = direction.toLowerCase();
    }
    catch (e) {
        direction = "invalid";
    }
    var validDirections = ["east", "west", "north", "south"];
    if (!validDirections.includes(direction))
        return [false, "Direction is invalid"];
    // Co-ordinate validation
    x = Number(x);
    y = Number(y);
    if (Number.isNaN(x) || Number.isNaN(y))
        return [false, "x/y coordinates are invalid"];
    if (x < 0 || x > 4)
        return [false, "x/y coordinates are invalid"];
    if (y < 0 || y > 4)
        return [false, "x/y coordinates are invalid"];
    // Check position on table not occupied by robot already
    if (gameTable.positions[y][x])
        return [false, "Robot already at location selected"];
    return [true, "", { x: x, y: y, direction: direction }];
}
exports.validatePlaceArguments = validatePlaceArguments;
function placeRobot(x, y, direction, gameTable) {
    var robot = new robot_1.default(gameTable);
    robots.push(robot);
    robot.place(x, y, direction);
    if (!currentRobot)
        currentRobot = robot;
}
exports.placeRobot = placeRobot;
function reportOnRobots(currentRobot, robots) {
    if (!currentRobot) {
        console.log("No robots on table");
        return;
    }
    var robotNumber = robots.indexOf(currentRobot) + 1;
    console.log("Current robot is Robot " + robotNumber);
    currentRobot.report();
    console.log("There " + (robots.length === 1 ? "is" : "are") + " currently " + robots.length + " robot" + (robots.length === 1 ? "" : "s") + " on the table");
}
exports.reportOnRobots = reportOnRobots;
