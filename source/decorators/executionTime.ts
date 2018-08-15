import { performance } from 'perf_hooks';

interface HistoryShape {
  callCount: number;
  average: number;
  entries: { took: number; date: Date; }[];
}

export interface TimeMeasuredFunction extends Function {
  history?: HistoryShape;
}

export const executionTime =
  (routine: Function, label?: string): TimeMeasuredFunction => {
    const wrapped: TimeMeasuredFunction =
      function (this: any) {
        const name = label || routine.name;
        const t1 = performance.now();
        const result = routine.apply(this, arguments);
        const t2 = performance.now() - t1;

        if (!wrapped.history) {
          wrapped.history = {
            callCount: 0,
            average: 0,
            entries: [],
          };
        }

        wrapped.history.callCount += 1;
        wrapped.history.entries.push({ took: t2, date: new Date() });

        const average = wrapped.history.average =
          wrapped.history.entries.reduce((sum, item) => sum + item.took, 0) /
          wrapped.history.callCount;

        console.log(
          `[${name}]: execution took ${(t2).toFixed(2)}ms,` +
          ` average is ${average.toFixed(2)}ms, history: ${wrapped.history.entries.length} items.`);

        return result;
      };

    return wrapped;
  };
