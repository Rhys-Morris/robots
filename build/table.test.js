"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var robot_1 = __importDefault(require("./robot"));
var table_1 = __importDefault(require("./table"));
describe("Table Class", function () {
    // Initialize robot & table for tests
    var table = new table_1.default();
    var robot = new robot_1.default(table);
    test("It should update correctly", function () {
        table.updateTable([0, 0], [0, 1], robot);
        expect(table.positions[1][0]).toBe(robot);
    });
});
