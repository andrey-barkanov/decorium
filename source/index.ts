import { performance } from 'perf_hooks';

export const executionTime = (routine: Function, label?: string) => {
  return function (this: any, ...args: any[]) {
    const name = label || routine.name;
    const t1 = performance.now();
    const result = routine.apply(this, args);
    console.log(`[${name}]: execution took ${performance.now() - t1}ms.`);
    return result;
  };
};
