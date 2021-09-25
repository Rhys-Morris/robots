"use strict";
// ERROR DEFINITIONS
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlreadyPlacedError = exports.NotPlacedError = void 0;
var NotPlacedError = /** @class */ (function (_super) {
    __extends(NotPlacedError, _super);
    function NotPlacedError() {
        return _super.call(this, "Robot must be placed before issuing other commands") || this;
    }
    return NotPlacedError;
}(Error));
exports.NotPlacedError = NotPlacedError;
var AlreadyPlacedError = /** @class */ (function (_super) {
    __extends(AlreadyPlacedError, _super);
    function AlreadyPlacedError() {
        return _super.call(this, "Robot can only be placed on the table once") || this;
    }
    return AlreadyPlacedError;
}(Error));
exports.AlreadyPlacedError = AlreadyPlacedError;
