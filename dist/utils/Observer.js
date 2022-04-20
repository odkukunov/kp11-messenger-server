"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subject = void 0;
class Subject {
    constructor() {
        this.subscribers = [];
    }
    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    }
    unsubscribe(subscriber) {
        const sub = this.subscribers.indexOf(subscriber);
        if (sub !== -1) {
            this.subscribers.splice(sub);
        }
    }
    async notify(event, ...args) {
        for (const subscriber of this.subscribers) {
            await subscriber.onEvent(event, ...args);
        }
    }
}
exports.Subject = Subject;
//# sourceMappingURL=Observer.js.map