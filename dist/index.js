"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executionTime = function (routine, label) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var nowLabel = Date.now().toString() + " " + (routine.name || label);
        console.time(nowLabel);
        var result = routine.apply(this, args);
        console.timeEnd(nowLabel);
        return result;
    };
};
