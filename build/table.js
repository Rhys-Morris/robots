"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ----- TABLE CLASS -----
var Table = /** @class */ (function () {
    function Table() {
        // Define 5 x 5 grid - 0, 0 is representative of SW corner
        this.positions = [
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
        ];
        this.currentRobot = null;
        this.robots = [];
    }
    Table.prototype.updateTable = function (oldPosition, newPosition, robot) {
        var oldX = oldPosition[0], oldY = oldPosition[1];
        var newX = newPosition[0], newY = newPosition[1];
        this.positions[oldY][oldX] = null;
        this.positions[newY][newX] = robot;
    };
    Table.prototype.printTable = function () {
        for (var i = 0; i < this.positions.length; i++) {
            if (i === 0)
                console.log("|   | 0 | 1 | 2 | 3 | 4 |"); // Print header row
            var row = "";
            for (var j = 0; j < this.positions[i].length; j++) {
                if (j === 0)
                    row += "| " + i + " "; // Print position indication at row start
                row += "| " + (this.positions[i][j] === null ? "-" : "R") + " ";
            }
            row += "|";
            console.log(row);
        }
    };
    return Table;
}());
exports.default = Table;
