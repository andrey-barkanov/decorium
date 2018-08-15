import { performance } from 'perf_hooks';

//
// TODO: cache execution time measures, calculate average, compare current with average.
//

export const executionTime = (routine: Function, label?: string) => {
  return function (this: any, ...args: any[]) {
    const name = label || routine.name;
    const t1 = performance.now();
    const result = routine.apply(this, args);

    const functionInstance = executionTime as any;

    if (!functionInstance.cache) {
      functionInstance.cache = {
        callCount: 0,
        average: 0,
      };
    }

    const t2 = performance.now() - t1;
    const average = functionInstance.cache.callCount === 0 ?
      t2 :
      ((functionInstance.cache.average / functionInstance.cache.callCount) + t2) / 2;

    functionInstance.cache.average = average;
    functionInstance.cache.callCount += 1;

    console.log(
      `[${name}]: execution took ${(t2).toFixed(2)}ms,` +
      ` average is ${average.toFixed(2)}ms.`);

    return result;
  };
};
