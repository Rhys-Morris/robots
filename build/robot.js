"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ----- ROBOT CLASS -----
var Robot = /** @class */ (function () {
    function Robot(table) {
        this.commands = [];
        this.position = null;
        this.table = table;
    }
    Robot.prototype._validateMove = function (direction, currentCoords) {
        var x = currentCoords[0], y = currentCoords[1];
        var movingAxisPosition = ["south", "north"].includes(direction) ? y : x;
        var movingOnAxis = ["south", "north"].includes(direction) ? "y" : "x";
        var willFallFromTable = {
            east: 4,
            north: 4,
            south: 0,
            west: 0,
        };
        if (willFallFromTable[direction] === movingAxisPosition) {
            return [false];
        }
        // Check if will run into another robot
        movingOnAxis === "y"
            ? (y += Robot._moveIncrement[direction])
            : (x += Robot._moveIncrement[direction]);
        if (this.table.positions[y][x])
            return [false]; // Not null - robot present in this position
        return [true, [x, y]];
    };
    Robot.prototype.place = function (x, y, direction) {
        this.position = [x, y, direction];
        this.table.positions[y][x] = this; // Update table
        this.commands.push({
            type: "PLACE",
            input: [x, y, direction],
        });
    };
    Robot.prototype.move = function () {
        if (!this.position)
            return; // Type narrowing due to null initialization
        var _a = this.position, x = _a[0], y = _a[1], direction = _a[2];
        var _b = this._validateMove(direction, [x, y]), validated = _b[0], coords = _b[1];
        if (!validated) {
            console.log("Robot is unable to move in the indicated direction");
            return;
        }
        var _c = coords, newX = _c[0], newY = _c[1]; // Implement move
        this.position = [newX, newY, direction];
        this.table.updateTable([x, y], [newX, newY], this); // Update table
        this.commands.push({
            type: "MOVE",
        });
    };
    Robot.prototype.left = function () {
        if (!this.position)
            return; // Type narrowing due to null initialization
        var currentDirection = this.position[2];
        this.position[2] = Robot._rotateLeft[currentDirection];
        this.commands.push({
            type: "LEFT",
        });
    };
    Robot.prototype.right = function () {
        if (!this.position)
            return; // Type narrowing due to null initialization
        var currentDirection = this.position[2];
        this.position[2] = Robot._rotateRight[currentDirection];
        this.commands.push({
            type: "RIGHT",
        });
    };
    Robot.prototype.report = function () {
        if (!this.position)
            return; // Type narrowing due to null initialization
        var _a = this.position, x = _a[0], y = _a[1], direction = _a[2];
        console.log("Located at: " + x + ", " + y + ", " + direction.toUpperCase());
        this.commands.push({
            type: "REPORT",
        });
    };
    Robot._rotateRight = {
        east: "south",
        south: "west",
        west: "north",
        north: "east",
    };
    Robot._rotateLeft = {
        east: "north",
        south: "east",
        west: "south",
        north: "west",
    };
    Robot._moveIncrement = {
        east: 1,
        south: -1,
        west: -1,
        north: 1,
    };
    return Robot;
}());
exports.default = Robot;
