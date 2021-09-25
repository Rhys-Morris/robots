"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var robot_1 = __importDefault(require("./robot"));
var table_1 = __importDefault(require("./table"));
describe("Robot Class", function () {
    // Initialize robot & table for tests
    var table = new table_1.default();
    var robot = new robot_1.default(table);
    // Spy on console.log
    var spy = jest.spyOn(console, "log").mockImplementation();
    beforeEach(function () {
        spy.mockClear();
    });
    test("Calling the Robot constructor should instantiate a new robot instance", function () {
        expect(robot).toBeInstanceOf(robot_1.default);
    });
    test("Should place correctly", function () {
        robot.place(0, 0, "north");
        expect(robot.position).toEqual([0, 0, "north"]);
        expect(robot.table.positions[0][0]).toBe(robot);
    });
    test("should rotate left correctly", function () {
        if (!robot.position)
            throw new Error();
        robot.left();
        expect(robot.position[2]).toEqual("west");
        robot.left();
        expect(robot.position[2]).toEqual("south");
        robot.left();
        expect(robot.position[2]).toEqual("east");
        robot.left();
        expect(robot.position[2]).toEqual("north");
    });
    test("should rotate right correctly", function () {
        if (!robot.position)
            throw new Error();
        robot.right();
        expect(robot.position[2]).toEqual("east");
        robot.right();
        expect(robot.position[2]).toEqual("south");
        robot.right();
        expect(robot.position[2]).toEqual("west");
        robot.right();
        expect(robot.position[2]).toEqual("north");
    });
    test("Should allow movement", function () {
        robot.move();
        expect(robot.position).toEqual([0, 1, "north"]);
        // Updated table correctly
        expect(robot.table.positions[0][0]).toBe(null);
        expect(robot.table.positions[1][0]).toBe(robot);
    });
    test("Should not allow movement off the table", function () {
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
        expect(console.log).toHaveBeenCalledWith("Robot is unable to move in the indicated direction");
    });
    test("Should not allow movement where another robot is positioned", function () {
        robot.position = [0, 0, "north"];
        robot.table.positions[0][1] = new robot_1.default(robot.table);
        robot.move();
        expect(robot.position).toEqual([0, 0, "north"]);
        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith("Robot is unable to move in the indicated direction");
    });
    test("Should report on position correctly", function () {
        robot.report();
        expect(console.log).toHaveBeenCalledTimes(1);
        expect(console.log).toHaveBeenCalledWith("Located at: 0, 0, NORTH");
    });
});
