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
    }
    Table.prototype.updateTable = function (oldPosition, newPosition, robot) {
        var oldX = oldPosition[0], oldY = oldPosition[1];
        var newX = newPosition[0], newY = newPosition[1];
        this.positions[oldY][oldX] = null;
        this.positions[newY][newX] = robot;
    };
    return Table;
}());
exports.default = Table;
