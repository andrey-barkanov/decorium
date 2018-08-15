interface HistoryShape {
    callCount: number;
    average: number;
    entries: {
        took: number;
        date: Date;
    }[];
}
export interface TimeMeasuredFunction extends Function {
    history?: HistoryShape;
}
export declare const executionTime: (routine: Function, label?: string | undefined) => TimeMeasuredFunction;
export {};
