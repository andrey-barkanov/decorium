"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var perf_hooks_1 = require("perf_hooks");
//
// TODO: cache execution time measures, calculate average, compare current with average.
//
exports.executionTime = function (routine, label) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var name = label || routine.name;
        var t1 = perf_hooks_1.performance.now();
        var result = routine.apply(this, args);
        var functionInstance = exports.executionTime;
        if (!functionInstance.cache) {
            functionInstance.cache = {
                callCount: 0,
                average: 0,
            };
        }
        var t2 = perf_hooks_1.performance.now() - t1;
        var average = functionInstance.cache.callCount === 0 ?
            t2 :
            ((functionInstance.cache.average / functionInstance.cache.callCount) + t2) / 2;
        functionInstance.cache.average = average;
        functionInstance.cache.callCount += 1;
        console.log("[" + name + "]: execution took " + (t2).toFixed(2) + "ms," +
            (" average is " + average.toFixed(2) + "ms."));
        return result;
    };
};
