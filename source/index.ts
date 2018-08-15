const executionTime = (routine: Function, label?: string) => {
  return function (this: any, ...args: any[]) {
    const nowLabel = `${Date.now().toString()} ${routine.name || label}`;
    console.time(nowLabel);
    const result = routine.apply(this, args);
    console.timeEnd(nowLabel);
    return result;
  };
};

export default {
  executionTime,
};
