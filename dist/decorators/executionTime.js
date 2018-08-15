"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var perf_hooks_1 = require("perf_hooks");
exports.executionTime = function (routine, label) {
    var wrapped = function () {
        var name = label || routine.name;
        var t1 = perf_hooks_1.performance.now();
        var result = routine.apply(this, arguments);
        var t2 = perf_hooks_1.performance.now() - t1;
        if (!wrapped.history) {
            wrapped.history = {
                callCount: 0,
                average: 0,
                entries: [],
            };
        }
        wrapped.history.callCount += 1;
        wrapped.history.entries.push({ took: t2, date: new Date() });
        var average = wrapped.history.average =
            wrapped.history.entries.reduce(function (sum, item) { return sum + item.took; }, 0) /
                wrapped.history.callCount;
        console.log("[" + name + "]: execution took " + (t2).toFixed(2) + "ms," +
            (" average is " + average.toFixed(2) + "ms, history: " + wrapped.history.entries.length + " items."));
        return result;
    };
    return wrapped;
};
