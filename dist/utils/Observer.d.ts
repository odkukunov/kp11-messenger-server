export interface Subscriber {
    onEvent(event: string, ...args: any): any;
}
export declare class Subject {
    protected subscribers: Array<Subscriber>;
    protected subscribe(subscriber: Subscriber): void;
    protected unsubscribe(subscriber: Subscriber): void;
    protected notify(event: string, ...args: any[]): Promise<void>;
}
