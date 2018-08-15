interface HistoryShape {
    callCount: number;
    average: number;
    entries: {
        took: number;
        date: Date;
    }[];
}
interface ExecutionTimeMeasuredFunction extends Function {
    history?: HistoryShape;
}
export declare const executionTime: (routine: Function, label?: string | undefined) => ExecutionTimeMeasuredFunction;
export {};
